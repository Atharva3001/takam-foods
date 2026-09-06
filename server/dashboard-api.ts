import type { Express, Request, Response } from "express";
import { nanoid } from "nanoid";
import { readDashboard, writeDashboard, type Order, type Product } from "./dashboard-store";

const activeCapacityStatuses = new Set(["New", "Confirmed", "Preparing", "Ready"]);

function sendError(res: Response, message: string, status = 400) {
  res.status(status).json({ error: message });
}

export function registerDashboardApi(app: Express) {
  app.use((req, _res, next) => {
    if (req.path.startsWith("/api/dashboard")) next();
    else next();
  });

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

  app.get("/api/dashboard/capacity", async (req, res) => {
    const date = String(req.query.date || new Date().toISOString().slice(0, 10));
    const state = await readDashboard();
    const committed = new Map<string, number>();
    for (const order of state.orders) {
      if (order.productionDate !== date || !activeCapacityStatuses.has(order.status)) continue;
      for (const item of order.items) committed.set(item.productId, (committed.get(item.productId) || 0) + item.quantity);
    }
    res.json(state.products.filter((product) => product.active).map((product) => ({ ...product, committed: committed.get(product.id) || 0, remaining: Math.max(0, product.standardCapacity - (committed.get(product.id) || 0)), stretchRemaining: Math.max(0, product.stretchCapacity - (committed.get(product.id) || 0)) })));
  });
}
