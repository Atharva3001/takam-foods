import type { Express, Response } from "express";
import { nanoid } from "nanoid";
import { readDashboard, writeDashboard, type Order, type Product } from "./dashboard-store";
import { getProductionSchedule, productionTimetable } from "./production-timetable";
import { readEnquiries, writeEnquiries, type Enquiry, type EnquiryStatus } from "./enquiry-store";

const capacityReleasingStatuses = new Set(["Cancelled", "Delivery Failed / Returned"]);
const enquiryStatuses = new Set<EnquiryStatus>(["Enquiry Received", "Confirmed", "Rejected", "Cancelled"]);
const enquiryMinDate = "2026-09-13";
const enquiryMaxDate = "2026-09-24";

type CapacityViolation = { productId: string; productName: string; committed: number; requested: number; maxCapacity: number; standardCapacity: number };

function sendError(res: Response, message: string, status = 400) { res.status(status).json({ error: message }); }
function normaliseProductName(name: string) {
  return name.trim().toLowerCase()
    .replace(/ukadiche/g, "ukadicha")
    .replace(/dinka/g, "dink")
    .replace(/nachani/g, "nachni")
    .replace(/paushtik/g, "poshtik");
}
function findCapacityViolation(requested: Map<string, number>, committed: Map<string, number>, products: Product[]): CapacityViolation | undefined {
  let violation: CapacityViolation | undefined;
  requested.forEach((quantity, productId) => { if (violation) return; const product = products.find((item) => item.id === productId); if (!product) return; const committedQuantity = committed.get(productId) || 0; const total = committedQuantity + quantity; if (total > product.stretchCapacity) violation = { productId, productName: product.name, committed: committedQuantity, requested: quantity, maxCapacity: product.stretchCapacity, standardCapacity: product.standardCapacity }; });
  return violation;
}
function ensureScheduledProducts(state: Awaited<ReturnType<typeof readDashboard>>, date: string) {
  const schedule = getProductionSchedule(date); if (!schedule) return { schedule: null, products: [] as Product[] };
  const products = schedule.products.map((spec) => { let product = state.products.find((item) => normaliseProductName(item.name) === normaliseProductName(spec.name)); if (!product) { product = { id: nanoid(10), name: spec.name, unit: spec.unit, standardCapacity: spec.standardCapacity, stretchCapacity: spec.maxCapacity, active: true }; state.products.push(product); } else { product.unit = spec.unit; product.standardCapacity = spec.standardCapacity; product.stretchCapacity = spec.maxCapacity; } return product; });
  return { schedule, products };
}

const MODAK_PRICES: Record<string, { pieces: Record<string, number>; weights: Record<string, number> }> = {
  ukadicha: { pieces: { "5": 275, "7": 385, "11": 605, "21": 1155 }, weights: {} },
  khava: { pieces: { "11": 242, "21": 462 }, weights: { "0.25": 651, "0.5": 1260, "1": 2520 } },
  dink: { pieces: { "11": 198, "21": 378 }, weights: { "0.25": 558, "0.5": 1071, "1": 2142 } },
  gulkand: { pieces: { "11": 77, "21": 147 }, weights: { "0.25": 217, "0.5": 441, "1": 882 } },
  poshtik: { pieces: { "11": 99, "21": 189 }, weights: { "0.25": 279, "0.5": 567, "1": 1134 } },
  beet: { pieces: { "11": 77, "21": 147 }, weights: { "0.25": 217, "0.5": 378, "1": 756 } },
  dryfruit: { pieces: { "11": 154, "21": 294 }, weights: { "0.25": 434, "0.5": 819, "1": 1638 } },
  nachni: { pieces: { "11": 220, "21": 420 }, weights: { "0.25": 620, "0.5": 1197, "1": 2394 } },
  tilkund: { pieces: { "11": 77, "21": 147 }, weights: { "0.25": 217, "0.5": 441, "1": 882 } },
};

function normalisePriceProductName(name: string) {
  return normaliseProductName(name)
    .replace(/khava/g, "khava")
    .replace(/dry fruit/g, "dryfruit")
    .replace(/dryfruit/g, "dryfruit")
    .replace(/tilkund/g, "tilkund")
    .replace(/beet/g, "beet")
    .replace(/gulkand/g, "gulkand");
}

function priceForEnquiryQuantity(productName: string, quantity: string): number | null {
  const key = normalisePriceProductName(productName);
  const table = MODAK_PRICES[key];
  if (!table) return null;
  const valueMatch = quantity.match(/[0-9]+(?:\.[0-9]+)?/);
  if (!valueMatch) return null;
  const value = Number(valueMatch[0]);
  const normalized = quantity.toLowerCase();
  if (normalized.includes("piece") || normalized.includes("pcs")) return table.pieces[String(value)] ?? null;
  if (normalized.includes("gm")) return table.weights[String(value / 1000)] ?? null;
  if (normalized.includes("kg") || normalized.includes("kilo")) return table.weights[String(value)] ?? null;
  return null;
}

function priceForOrderQuantity(productName: string, quantity: number, unit: string): number | null {
  const key = normalisePriceProductName(productName);
  const table = MODAK_PRICES[key];
  if (!table || !Number.isFinite(quantity)) return null;
  if (unit === "pieces") return table.pieces[String(quantity)] ?? null;
  const rounded = Math.round(quantity * 1000) / 1000;
  if (rounded === 0.088) return table.pieces["11"] ?? null;
  if (rounded === 0.168) return table.pieces["21"] ?? null;
  return table.weights[String(rounded)] ?? null;
}

function repairMissingOrderAmounts(state: Awaited<ReturnType<typeof readDashboard>>) {
  let changed = false;
  for (const order of state.orders) {
    if (Number(order.amount) > 0) continue;
    let total = 0;
    let hasKnownPrice = false;
    for (const item of order.items) {
      const product = state.products.find((candidate) => candidate.id === item.productId);
      if (!product) continue;
      const price = priceForOrderQuantity(product.name, Number(item.quantity), product.unit);
      if (price !== null) {
        total += price;
        hasKnownPrice = true;
      }
    }
    if (hasKnownPrice) {
      order.amount = total;
      order.updatedAt = new Date().toISOString();
      changed = true;
    }
  }
  return changed;
}

function parseEnquiryQuantity(quantity: string, product: Product) {
  const value = Number((quantity.match(/[0-9]+(?:\.[0-9]+)?/) || [""])[0]);

  if (!Number.isFinite(value) || value <= 0) return NaN;

  const normalizedQuantity = quantity.toLowerCase();

  // Ukadicha is always tracked in pieces.
  if (product.unit === "pieces") {
    return value;
  }

  // All other Modaks are tracked in kg.
  if (normalizedQuantity.includes("gm")) {
    return value / 1000;
  }

  if (normalizedQuantity.includes("piece")) {
    // 1 piece = 8g = 0.008kg
    return value * 0.008;
  }

  // Already expressed in kg.
  return value;
}

export function registerDashboardApi(app: Express) {
  app.get("/api/dashboard", async (_req, res) => {
  const state = await readDashboard();
  if (repairMissingOrderAmounts(state)) await writeDashboard(state);
  res.json(state);
});
  app.put("/api/dashboard", async (req, res) => { const body = req.body as { products?: Product[]; orders?: Order[] }; if (!Array.isArray(body.products) || !Array.isArray(body.orders)) return sendError(res, "Invalid dashboard payload"); await writeDashboard({ products: body.products, orders: body.orders }); res.json({ ok: true }); });
  app.get("/api/dashboard/enquiries", async (_req, res) => { const state = await readEnquiries(); state.enquiries.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); res.json(state.enquiries); });
  app.post("/api/dashboard/enquiries", async (req, res) => {
    const body = req.body as Partial<Enquiry>; const selectedDay = String(body.selectedDay || "");
    if (!body.productName || !body.productSlug || !selectedDay || !body.quantity || !body.name || !body.mobileNumber || !body.deliveryAddress) return sendError(res, "Product, selected day, quantity, name, mobile number and delivery address are required");
    if (selectedDay < enquiryMinDate || selectedDay > enquiryMaxDate) return sendError(res, "Selected day must be between 13 Sep 2026 and 24 Sep 2026", 409);
    const state = await readEnquiries(); const now = new Date().toISOString();
    const enquiry: Enquiry = { id: nanoid(12), enquiryNumber: `ENQ-${Date.now().toString().slice(-6)}`, createdAt: now, updatedAt: now, productName: body.productName.trim(), productSlug: body.productSlug.trim(), selectedDay, quantity: body.quantity.trim(), name: body.name.trim(), mobileNumber: body.mobileNumber.trim(), deliveryAddress: body.deliveryAddress.trim(), status: "Enquiry Received", source: "WhatsApp" };
    state.enquiries.push(enquiry); await writeEnquiries(state); res.status(201).json(enquiry);
  });
  app.patch("/api/dashboard/enquiries/:id", async (req, res) => {
    const enquiryState = await readEnquiries(); const enquiry = enquiryState.enquiries.find((item) => item.id === req.params.id); if (!enquiry) return sendError(res, "Enquiry not found", 404);
    const nextStatus = req.body.status as EnquiryStatus | undefined; if (nextStatus && !enquiryStatuses.has(nextStatus)) return sendError(res, "Invalid enquiry status");
    if (nextStatus === "Confirmed" && !enquiry.convertedOrderId) {
      const dashboardState = await readDashboard();
      const { schedule, products } = ensureScheduledProducts(dashboardState, enquiry.selectedDay);
      if (!schedule) return sendError(res, `No production timetable is configured for ${enquiry.selectedDay}`, 409);
      const product = products.find((item) => normaliseProductName(item.name) === normaliseProductName(enquiry.productName));
      if (!product) return sendError(res, `${enquiry.productName} is not scheduled for ${enquiry.selectedDay}`, 409);
      const quantity = parseEnquiryQuantity(enquiry.quantity, product);
      if (!Number.isFinite(quantity) || quantity <= 0) return sendError(res, `Could not read enquiry quantity "${enquiry.quantity}"`, 400);
      const requested = new Map<string, number>([[product.id, quantity]]); const committed = new Map<string, number>();
      for (const order of dashboardState.orders) { if (order.productionDate !== enquiry.selectedDay || capacityReleasingStatuses.has(order.status)) continue; for (const item of order.items) committed.set(item.productId, (committed.get(item.productId) || 0) + item.quantity); }
      const capacityViolation = findCapacityViolation(requested, committed, products);
      if (capacityViolation) return res.status(409).json({ error: `${capacityViolation.productName} cannot be confirmed because it would exceed the ${capacityViolation.maxCapacity} ${product.unit} daily limit`, ...capacityViolation });
      const now = new Date().toISOString();
      const order: Order = { id: nanoid(12), orderNumber: `TF-${Date.now().toString().slice(-6)}`, orderDate: now.slice(0, 10), productionDate: enquiry.selectedDay, customerName: enquiry.name, customerPhone: enquiry.mobileNumber, deliveryAddress: enquiry.deliveryAddress, items: [{ productId: product.id, quantity }], amount: priceForEnquiryQuantity(enquiry.productName, enquiry.quantity) ?? 0, paymentStatus: "Pending", status: "Confirmed", deliveryPerson: "", trackingNumber: "", actualDeliveryDate: "", notes: `Converted from ${enquiry.enquiryNumber}`, createdAt: now, updatedAt: now };
      dashboardState.orders.push(order); await writeDashboard(dashboardState); enquiry.convertedOrderId = order.id; enquiry.convertedOrderNumber = order.orderNumber;
    }
    Object.assign(enquiry, req.body, { updatedAt: new Date().toISOString() }); await writeEnquiries(enquiryState); res.json(enquiry);
  });
  app.delete("/api/dashboard/enquiries/:id", async (req, res) => { const state = await readEnquiries(); const index = state.enquiries.findIndex((item) => item.id === req.params.id); if (index === -1) return sendError(res, "Enquiry not found", 404); state.enquiries.splice(index, 1); await writeEnquiries(state); res.json({ ok: true }); });
  app.post("/api/dashboard/products", async (req, res) => { const { name, unit, standardCapacity, stretchCapacity } = req.body as Partial<Product>; if (!name || !unit || !Number.isFinite(standardCapacity) || !Number.isFinite(stretchCapacity)) return sendError(res, "Product name, unit and capacities are required"); const state = await readDashboard(); const product: Product = { id: nanoid(10), name: name.trim(), unit, standardCapacity: Number(standardCapacity), stretchCapacity: Math.max(Number(stretchCapacity), Number(standardCapacity)), active: true }; state.products.push(product); await writeDashboard(state); res.status(201).json(product); });
  app.patch("/api/dashboard/products/:id", async (req, res) => { const state = await readDashboard(); const product = state.products.find((item) => item.id === req.params.id); if (!product) return sendError(res, "Product not found", 404); Object.assign(product, req.body); product.standardCapacity = Number(product.standardCapacity); product.stretchCapacity = Math.max(Number(product.stretchCapacity), product.standardCapacity); await writeDashboard(state); res.json(product); });
  app.post("/api/dashboard/orders", async (req, res) => {
    const body = req.body as Partial<Order>; if (!body.customerName || !body.productionDate || !Array.isArray(body.items) || body.items.length === 0) return sendError(res, "Customer, production date and at least one item are required");
    const state = await readDashboard(); const { schedule, products } = ensureScheduledProducts(state, body.productionDate); if (!schedule) return sendError(res, "No production timetable is configured for this date", 409);
    const requested = new Map<string, number>(); for (const item of body.items) { const quantity = Number(item.quantity); const product = products.find((p) => p.id === item.productId); if (!product || !Number.isFinite(quantity) || quantity <= 0) return sendError(res, "Order contains an invalid scheduled product or quantity", 400); requested.set(product.id, (requested.get(product.id) || 0) + quantity); }
    const committed = new Map<string, number>(); for (const order of state.orders) { if (order.productionDate !== body.productionDate || capacityReleasingStatuses.has(order.status)) continue; for (const item of order.items) committed.set(item.productId, (committed.get(item.productId) || 0) + item.quantity); }
    const capacityViolation = findCapacityViolation(requested, committed, products); if (capacityViolation) return res.status(409).json({ error: `${capacityViolation.productName} is full for ${body.productionDate}`, ...capacityViolation });
    const now = new Date().toISOString(); const order: Order = { id: nanoid(12), orderNumber: body.orderNumber || `TF-${Date.now().toString().slice(-6)}`, orderDate: body.orderDate || now.slice(0, 10), productionDate: body.productionDate, customerName: body.customerName.trim(), customerPhone: body.customerPhone || "", deliveryAddress: body.deliveryAddress || "", items: body.items.map((item) => ({ productId: item.productId, quantity: Number(item.quantity) })), amount: Number(body.amount || 0), paymentStatus: body.paymentStatus || "Pending", status: body.status || "New", deliveryPerson: body.deliveryPerson || "", trackingNumber: body.trackingNumber || "", actualDeliveryDate: body.actualDeliveryDate || "", notes: body.notes || "", createdAt: now, updatedAt: now }; state.orders.push(order); await writeDashboard(state); res.status(201).json(order);
  });
  app.delete("/api/dashboard/orders/:id", async (req, res) => {
    const state = await readDashboard();
    const index = state.orders.findIndex((item) => item.id === req.params.id);
    if (index === -1) return sendError(res, "Order not found", 404);
    const [deletedOrder] = state.orders.splice(index, 1);
    await writeDashboard(state);
    res.json({ ok: true, order: deletedOrder });
  });
  app.patch("/api/dashboard/orders/:id", async (req, res) => { const state = await readDashboard(); const order = state.orders.find((item) => item.id === req.params.id); if (!order) return sendError(res, "Order not found", 404); Object.assign(order, req.body, { updatedAt: new Date().toISOString() }); await writeDashboard(state); res.json(order); });
  app.get("/api/dashboard/production", async (req, res) => {
    const date = String(req.query.date || new Date().toISOString().slice(0, 10)); const state = await readDashboard(); const { schedule, products } = ensureScheduledProducts(state, date); if (!schedule) return res.json({ date, schedule: null, products: [], timeline: [] });
    const committed = new Map<string, number>(); for (const order of state.orders) { if (order.productionDate !== date || capacityReleasingStatuses.has(order.status)) continue; for (const item of order.items) committed.set(item.productId, (committed.get(item.productId) || 0) + item.quantity); }
    const orders = state.orders.filter((order) => order.productionDate === date && !capacityReleasingStatuses.has(order.status)).sort((a, b) => a.createdAt.localeCompare(b.createdAt)); const running = new Map<string, number>();
    const timeline = orders.map((order) => ({ orderId: order.id, orderNumber: order.orderNumber, createdAt: order.createdAt, items: order.items.map((item) => { const product = products.find((p) => p.id === item.productId); const total = (running.get(item.productId) || 0) + item.quantity; running.set(item.productId, total); return { productId: item.productId, productName: product?.name || "Unknown product", quantity: item.quantity, cumulative: total }; }) }));
    await writeDashboard(state); res.json({ date, schedule, products: products.map((product) => ({ ...product, committed: committed.get(product.id) || 0, standardRemaining: Math.max(0, product.standardCapacity - (committed.get(product.id) || 0)), maxRemaining: Math.max(0, product.stretchCapacity - (committed.get(product.id) || 0)) })), timeline, availableDates: productionTimetable.map((day) => day.date) });
  });
  app.get("/api/dashboard/capacity", async (req, res) => {
    const date = String(req.query.date || new Date().toISOString().slice(0, 10)); const state = await readDashboard(); const { schedule, products } = ensureScheduledProducts(state, date); if (!schedule) return res.json([]); const committed = new Map<string, number>();
    for (const order of state.orders) { if (order.productionDate !== date || capacityReleasingStatuses.has(order.status)) continue; for (const item of order.items) committed.set(item.productId, (committed.get(item.productId) || 0) + item.quantity); }
    await writeDashboard(state); res.json(products.map((product) => ({ ...product, committed: committed.get(product.id) || 0, remaining: Math.max(0, product.standardCapacity - (committed.get(product.id) || 0)), stretchRemaining: Math.max(0, product.stretchCapacity - (committed.get(product.id) || 0)) })));
  });
}
