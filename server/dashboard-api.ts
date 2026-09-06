import type { Express, Response } from "express";
import { nanoid } from "nanoid";
import { readDashboard, writeDashboard, type Order, type Product } from "./dashboard-store";
import { getProductionSchedule, productionTimetable } from "./production-timetable";

const capacityReleasingStatuses = new Set(["Cancelled", "Delivery Failed / Returned"]);

function sendError(res: Response, message: string, status = 400) {
  res.status(status).json({ error: message });
}

function ensureScheduledProducts(state: Awaited<ReturnType<typeof readDashboard>>, date: string) {
  const schedule = getProductionSchedule(date);
  if (!schedule) return { schedule: null, products: [] as Product[] };

  const products = schedule.products.map((spec) => {
    let product = state.products.find((item) => item.name.trim().toLowerCase() === spec.name.trim().toLowerCase());
    if (!product) {
      product = {
        id: nanoid(10),
        name: spec.name,
        unit: spec.unit,
        standardCapacity: spec.standardCapacity,
        stretchCapacity: spec.maxCapacity,
        active: true,
      };
      state.products.push(product);
    } else {
      // The timetable is the source of truth for scheduled production capacity.
      product.unit = spec.unit;
      product.standardCapacity = spec.standardCapacity;
      product.stretchCapacity = spec.maxCapacity;
    }
    return product;
  });

  return { schedule, products };
}

export function registerDashboardApi(app: Express) {
  app.get("/api/dashboard", async (_req, res) => {
    res.json(await readDashboard());
  });

  app.put("/api/dashboard", async (req, res) => {
    const body = req.body as { products?: Product[]; orders?: Order[] };
    if (!Array.isArray(body.products) || !Array.isArray(body.orders)) return sendError(res, "Invalid dashboard payload");
    await writeDashboard({ products: body.products, orders: body.orders });
    res.json({ ok: true });
  });

  app.post("/api/dashboard/products", async (req, res) => {
    const { name, unit, standardCapacity, stretchCapacity } = req.body as Partial<Product>;
    if (!name || !unit || !Number.isFinite(standardCapacity) || !Number.isFinite(stretchCapacity)) return sendError(res, "Product name, unit and capacities are required");
    const state = await readDashboard();
    const product: Product = { id: nanoid(10), name: name.trim(), unit, standardCapacity: Number(standardCapacity), stretchCapacity: Math.max(Number(stretchCapacity), Number(standardCapacity)), active: true };
    state.products.push(product);
    await writeDashboard(state);
    res.status(201).json(product);
  });

  app.patch("/api/dashboard/products/:id", async (req, res) => {
    const state = await readDashboard();
    const product = state.products.find((item) => item.id === req.params.id);
    if (!product) return sendError(res, "Product not found", 404);
    Object.assign(product, req.body);
    product.standardCapacity = Number(product.standardCapacity);
    product.stretchCapacity = Math.max(Number(product.stretchCapacity), product.standardCapacity);
    await writeDashboard(state);
    res.json(product);
  });

  app.post("/api/dashboard/orders", async (req, res) => {
    const body = req.body as Partial<Order>;
    if (!body.customerName || !body.productionDate || !Array.isArray(body.items) || body.items.length === 0) return sendError(res, "Customer, production date and at least one item are required");
    const state = await readDashboard();
    const { schedule, products } = ensureScheduledProducts(state, body.productionDate);
    if (!schedule) return sendError(res, "No production timetable is configured for this date", 409);

    const requested = new Map<string, number>();
    for (const item of body.items) {
      const quantity = Number(item.quantity);
      const product = products.find((p) => p.id === item.productId);
      if (!product || !Number.isFinite(quantity) || quantity <= 0) return sendError(res, "Order contains an invalid scheduled product or quantity", 400);
      requested.set(product.id, (requested.get(product.id) || 0) + quantity);
    }

    const committed = new Map<string, number>();
    for (const order of state.orders) {
      if (order.productionDate !== body.productionDate || capacityReleasingStatuses.has(order.status)) continue;
      for (const item of order.items) committed.set(item.productId, (committed.get(item.productId) || 0) + item.quantity);
    }
    for (const [productId, quantity] of requested) {
      const product = products.find((p) => p.id === productId)!;
      const total = (committed.get(productId) || 0) + quantity;
      if (total > product.stretchCapacity) {
        return res.status(409).json({ error: `${product.name} is full for ${body.productionDate}`, productId, productName: product.name, committed: committed.get(productId) || 0, requested: quantity, maxCapacity: product.stretchCapacity, standardCapacity: product.standardCapacity });
      }
    }

    const now = new Date().toISOString();
    const order: Order = {
      id: nanoid(12),
      orderNumber: body.orderNumber || `TF-${Date.now().toString().slice(-6)}`,
      orderDate: body.orderDate || now.slice(0, 10),
      productionDate: body.productionDate,
      customerName: body.customerName.trim(), customerPhone: body.customerPhone || "", deliveryAddress: body.deliveryAddress || "",
      items: body.items.map((item) => ({ productId: item.productId, quantity: Number(item.quantity) })), amount: Number(body.amount || 0),
      paymentStatus: body.paymentStatus || "Pending", status: body.status || "New", deliveryPerson: body.deliveryPerson || "", trackingNumber: body.trackingNumber || "", actualDeliveryDate: body.actualDeliveryDate || "", notes: body.notes || "", createdAt: now, updatedAt: now,
    };
    state.orders.push(order);
    await writeDashboard(state);
    res.status(201).json(order);
  });

  app.patch("/api/dashboard/orders/:id", async (req, res) => {
    const state = await readDashboard();
    const order = state.orders.find((item) => item.id === req.params.id);
    if (!order) return sendError(res, "Order not found", 404);
    Object.assign(order, req.body, { updatedAt: new Date().toISOString() });
    await writeDashboard(state);
    res.json(order);
  });

  app.get("/api/dashboard/production", async (req, res) => {
    const date = String(req.query.date || new Date().toISOString().slice(0, 10));
    const state = await readDashboard();
    const { schedule, products } = ensureScheduledProducts(state, date);
    if (!schedule) return res.json({ date, schedule: null, products: [], timeline: [] });

    const committed = new Map<string, number>();
    for (const order of state.orders) {
      if (order.productionDate !== date || capacityReleasingStatuses.has(order.status)) continue;
      for (const item of order.items) committed.set(item.productId, (committed.get(item.productId) || 0) + item.quantity);
    }

    const orders = state.orders
      .filter((order) => order.productionDate === date && !capacityReleasingStatuses.has(order.status))
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    const running = new Map<string, number>();
    const timeline = orders.map((order) => ({
      orderId: order.id,
      orderNumber: order.orderNumber,
      createdAt: order.createdAt,
      items: order.items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        const total = (running.get(item.productId) || 0) + item.quantity;
        running.set(item.productId, total);
        return { productId: item.productId, productName: product?.name || "Unknown product", quantity: item.quantity, cumulative: total };
      }),
    }));

    await writeDashboard(state);
    res.json({
      date,
      schedule,
      products: products.map((product) => ({ ...product, committed: committed.get(product.id) || 0, standardRemaining: Math.max(0, product.standardCapacity - (committed.get(product.id) || 0)), maxRemaining: Math.max(0, product.stretchCapacity - (committed.get(product.id) || 0)) })),
      timeline,
      availableDates: productionTimetable.map((day) => day.date),
    });
  });

  app.get("/api/dashboard/capacity", async (req, res) => {
    const date = String(req.query.date || new Date().toISOString().slice(0, 10));
    const state = await readDashboard();
    const { schedule, products } = ensureScheduledProducts(state, date);
    if (!schedule) return res.json([]);

    const committed = new Map<string, number>();
    for (const order of state.orders) {
      if (order.productionDate !== date || capacityReleasingStatuses.has(order.status)) continue;
      for (const item of order.items) committed.set(item.productId, (committed.get(item.productId) || 0) + item.quantity);
    }
    await writeDashboard(state);
    res.json(products.map((product) => ({ ...product, committed: committed.get(product.id) || 0, remaining: Math.max(0, product.standardCapacity - (committed.get(product.id) || 0)), stretchRemaining: Math.max(0, product.stretchCapacity - (committed.get(product.id) || 0)) })));
  });
}
