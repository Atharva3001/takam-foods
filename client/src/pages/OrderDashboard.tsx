import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, CircleAlert, LogOut, PackagePlus, Plus, RefreshCw, Settings2, Trash2 } from "lucide-react";
import type { Order, Product } from "../../../server/dashboard-store";
import khavaModakImage from "../assets/khavaModakImage";

type Capacity = Product & { committed: number; remaining: number; stretchRemaining: number };
type DashboardData = { products: Product[]; orders: Order[] };
type OrderItemForm = { productId: string; quantityLabel: string };

const statuses: Order["status"][] = ["New", "Confirmed", "Preparing", "Ready", "Dispatched", "Out for Delivery", "Delivered", "Cancelled", "On Hold", "Delivery Failed / Returned"];
const paymentStatuses: Order["paymentStatus"][] = ["Pending", "Paid", "COD"];
const DATE_MIN = "2026-09-13";
const DATE_MAX = "2026-09-24";

const MODAK_PRICES: Record<string, Record<string, number>> = {
  "Ukadicha Modak": { "5 Pieces": 275, "7 Pieces": 385, "11 Pieces": 605, "21 Pieces": 1155 },
  "Dinka Modak": { "11 Pieces": 198, "21 Pieces": 378, "250 gm": 558, "500 gm": 1071, "1 kg": 2142 },
  "Paushtik Modak": { "11 Pieces": 99, "21 Pieces": 189, "250 gm": 279, "500 gm": 567, "1 kg": 1134 },
  "Dryfruit Modak": { "11 Pieces": 154, "21 Pieces": 294, "250 gm": 434, "500 gm": 819, "1 kg": 1638 },
  "Tilkund Modak": { "11 Pieces": 77, "21 Pieces": 147, "250 gm": 217, "500 gm": 441, "1 kg": 882 },
  "Nachani Modak": { "11 Pieces": 220, "21 Pieces": 420, "250 gm": 620, "500 gm": 1197, "1 kg": 2394 },
  "Gulkand Modak": { "11 Pieces": 77, "21 Pieces": 147, "250 gm": 217, "500 gm": 441, "1 kg": 882 },
  "Beet Modak": { "11 Pieces": 77, "21 Pieces": 147, "250 gm": 217, "500 gm": 378, "1 kg": 756 },
  "Khava Modak": { "11 Pieces": 242, "21 Pieces": 462, "250 gm": 651, "500 gm": 1260, "1 kg": 2520 },
};

const MODAK_DAYS: Record<string, string[]> = {
  "2026-09-14": ["Ukadicha Modak", "Dinka Modak", "Khava Modak", "Gulkand Modak"],
  "2026-09-15": ["Ukadicha Modak", "Paushtik Modak", "Khava Modak", "Beet Modak"],
  "2026-09-16": ["Ukadicha Modak", "Dryfruit Modak", "Nachani Modak", "Gulkand Modak"],
  "2026-09-17": ["Ukadicha Modak", "Tilkund Modak", "Dinka Modak", "Khava Modak"],
  "2026-09-18": ["Ukadicha Modak", "Nachani Modak", "Paushtik Modak", "Beet Modak"],
  "2026-09-19": ["Ukadicha Modak", "Dryfruit Modak", "Tilkund Modak", "Gulkand Modak"],
  "2026-09-20": ["Ukadicha Modak", "Dinka Modak", "Nachani Modak", "Khava Modak"],
  "2026-09-21": ["Ukadicha Modak", "Paushtik Modak", "Dryfruit Modak", "Beet Modak"],
  "2026-09-22": ["Ukadicha Modak", "Nachani Modak", "Tilkund Modak", "Gulkand Modak"],
  "2026-09-23": ["Ukadicha Modak", "Dinka Modak", "Paushtik Modak", "Khava Modak"],
  "2026-09-24": ["Ukadicha Modak", "Dryfruit Modak", "Nachani Modak", "Gulkand Modak"],
};

const DELIVERY_LOCATIONS = ["Singhgad Road", "Kothurd", "Deccan", "Nanded City", "Baner", "Pashan", "Baavdhan", "Other area"];

function today() { return new Date().toISOString().slice(0, 10); }
function formatQuantity(value: number, unit: string) {
  if (unit === "pieces") return String(Math.round(value));
  return value.toFixed(3).replace(/\.0+$/, "").replace(/(\.\d*?[1-9])0+$/, "$1");
}
function displayRange(product: Product) {
  return product.unit === "kg" ? "500gm–1KG" : product.name === "Ukadicha Modak" ? "50–70 Pieces" : `${formatQuantity(product.standardCapacity, product.unit)}–${formatQuantity(product.stretchCapacity, product.unit)} ${product.unit}`;
}
function imageForProduct(name: string) {
  const images: Record<string, string> = {
    "Ukadicha Modak": "/images/takam_ukadiche_modak_hero_mascot.webp",
    "Dinka Modak": "/images/takam_modak_dink_v2.webp",
    "Nachani Modak": "/images/takam_modak_nachni_v2.webp",
    "Dryfruit Modak": "/images/takam_modak_dryfruit_v2.webp",
    "Beet Modak": "/images/takam_modak_beet_v2.webp",
    "Paushtik Modak": "/images/takam_modak_poshtik_v2.webp",
    "Poshtik Modak": "/images/takam_modak_poshtik_v2.webp",
    "Tilkund Modak": "/images/takam_modak_tilkund_v2.webp",
    "Gulkand Modak": "/images/takam_modak_gulkand_v2.webp",
    "Khava Modak": khavaModakImage,
  };
  return images[name];
}

function quantityOptions(productName: string) {
  return productName === "Ukadicha Modak"
    ? ["5 Pieces", "7 Pieces", "11 Pieces", "21 Pieces"]
    : ["11 Pieces", "21 Pieces", "250 gm", "500 gm", "1 kg"];
}

function quantityValue(label: string, unit: string) {
  if (unit === "pieces") return Number(label.match(/\d+/)?.[0] || 0);
  if (label.includes("Pieces")) return Number(label.match(/\d+/)?.[0] || 0) * 0.008;
  if (label.includes("gm")) return Number(label.match(/\d+/)?.[0] || 0) / 1000;
  return Number(label.match(/\d+(?:\.\d+)?/)?.[0] || 0);
}

export default function OrderDashboard() {
  const [date, setDate] = useState(today() < DATE_MIN || today() > DATE_MAX ? "2026-09-14" : today());
  const [data, setData] = useState<DashboardData>({ products: [], orders: [] });
  const [capacity, setCapacity] = useState<Capacity[]>([]);
  const [tab, setTab] = useState<"capacity" | "orders" | "products">("capacity");
  const [search, setSearch] = useState("");
  const [showOrder, setShowOrder] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() {
    const [dashboard, cap] = await Promise.all([
      fetch("/api/dashboard").then((r) => r.json()),
      fetch(`/api/dashboard/capacity?date=${date}`).then((r) => r.json()),
    ]);
    setData(dashboard); setCapacity(cap);
  }
  useEffect(() => { load(); }, [date]);

  const filteredOrders = useMemo(() => data.orders.filter((o) => `${o.orderNumber} ${o.customerName} ${o.customerPhone}`.toLowerCase().includes(search.toLowerCase())), [data.orders, search]);
  const totals = useMemo(() => ({ orders: data.orders.length, open: data.orders.filter((o) => !["Delivered", "Cancelled", "Delivery Failed / Returned"].includes(o.status)).length, delivered: data.orders.filter((o) => o.status === "Delivered").length, sales: data.orders.reduce((sum, o) => sum + o.amount, 0) }), [data.orders]);

  async function patchOrder(id: string, patch: Partial<Order>) {
    setSaving(true);
    await fetch(`/api/dashboard/orders/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
    await load(); setSaving(false);
  }

  async function deleteOrder(order: Order) {
    if (!window.confirm(`Delete ${order.orderNumber} for ${order.customerName}?\n\nThis will also release its Modak quantity from production capacity.`)) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/dashboard/orders/${order.id}`, { method: "DELETE" });
      if (!response.ok) { const body = await response.json().catch(() => ({})); window.alert(body.error || "Could not delete the order."); return; }
      await load();
    } finally { setSaving(false); }
  }

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/dashboard";
  }

  return <main className="min-h-screen bg-background px-4 py-5 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/" className="mb-2 inline-flex items-center gap-1 text-sm font-bold underline decoration-2 underline-offset-4"><ArrowLeft size={16} /> Back to Takam Foods</Link>
          <div className="flex items-center gap-3"><h1 className="font-display text-4xl font-extrabold tracking-tight">Order HQ</h1><span className="rounded-full border-2 border-ink bg-mascot px-3 py-1 text-xs font-extrabold uppercase">Made to order</span></div>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">Live production capacity, orders & delivery at a glance.</p>
        </div>
        <div className="flex flex-wrap gap-2"><button className="sticker-btn bg-mint px-4 py-2" onClick={load}><RefreshCw size={16} /> Refresh</button><button className="sticker-btn bg-tomato px-4 py-2 text-white" onClick={() => setShowOrder(true)}><Plus size={17} /> Add order</button><button className="sticker-btn bg-white px-4 py-2" onClick={signOut}><LogOut size={16} /> Sign out</button></div>
      </header>

      <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Orders" value={totals.orders} tone="bg-peach" /><Stat label="Open orders" value={totals.open} tone="bg-mint" /><Stat label="Delivered" value={totals.delivered} tone="bg-mascot" /><Stat label="Sales" value={`₹${totals.sales.toLocaleString("en-IN")}`} tone="bg-white" />
      </section>

      <div className="mb-5 flex flex-wrap items-center gap-2 border-b-2 border-ink pb-3">
        {([["capacity", "Today's capacity"], ["orders", "Orders"], ["products", "Products"]] as const).map(([key, label]) => <button key={key} onClick={() => setTab(key)} className={`sticker-btn px-4 py-2 ${tab === key ? "bg-ink text-white" : "bg-white"}`}>{label}</button>)}
        {tab === "capacity" && <label className="ml-auto flex items-center gap-2 text-sm font-extrabold">Production date <input type="date" min={DATE_MIN} max={DATE_MAX} value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border-2 border-ink bg-white px-3 py-2 font-bold" /></label>}
      </div>

      {tab === "capacity" && <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {capacity.length === 0 && <Empty title="No production scheduled" text="Choose a date from 13 Sep to 24 Sep to view the scheduled modaks." action={() => setDate("2026-09-14")} />}
        {capacity.map((p) => <CapacityCard key={p.id} product={p} />)}
        <button onClick={() => setShowProduct(true)} className="sticker flex min-h-52 flex-col items-center justify-center border-dashed bg-white/60 p-6 text-center hover:bg-peach/30"><Settings2 size={30} /><span className="mt-2 font-display text-xl font-extrabold">Add / edit capacity</span><span className="text-sm font-semibold text-muted-foreground">Set standard and stretch limits</span></button>
      </section>}

      {tab === "orders" && <section className="sticker overflow-hidden p-4 sm:p-6"><div className="mb-4 flex flex-col gap-3 sm:flex-row"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search order, customer or phone…" className="w-full rounded-xl border-2 border-ink bg-white px-4 py-3 font-semibold" /><button onClick={() => setShowOrder(true)} className="sticker-btn shrink-0 bg-tomato px-4 py-2 text-white"><Plus size={16} /> Add order</button></div><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead><tr className="border-b-2 border-ink font-display text-base"><th className="p-3">Order</th><th className="p-3">Customer</th><th className="p-3">Production</th><th className="p-3">Items</th><th className="p-3">Amount</th><th className="p-3">Status</th><th className="p-3">Payment</th><th className="p-3">Action</th></tr></thead><tbody>{filteredOrders.map((o) => <tr key={o.id} className="border-b border-black/20"><td className="p-3 font-extrabold">{o.orderNumber}<div className="text-xs font-semibold text-muted-foreground">{o.orderDate}</div></td><td className="p-3"><div className="font-bold">{o.customerName}</div><div className="text-xs">{o.customerPhone}</div></td><td className="p-3 font-bold">{o.productionDate}</td><td className="p-3">{o.items.map((i) => { const product = data.products.find(p => p.id === i.productId); return `${product?.name || "Product"} × ${formatQuantity(i.quantity, product?.unit || "pieces")}`; }).join(", ")}</td><td className="p-3 font-bold">₹{o.amount.toLocaleString("en-IN")}</td><td className="p-3"><select value={o.status} onChange={(e) => patchOrder(o.id, { status: e.target.value as Order["status"] })} className="rounded-lg border-2 border-ink bg-white px-2 py-1 font-bold">{statuses.map(s => <option key={s}>{s}</option>)}</select></td><td className="p-3"><select value={o.paymentStatus} onChange={(e) => patchOrder(o.id, { paymentStatus: e.target.value as Order["paymentStatus"] })} className="rounded-lg border-2 border-ink bg-white px-2 py-1 font-bold">{paymentStatuses.map(s => <option key={s}>{s}</option>)}</select></td></tr>)}{filteredOrders.length === 0 && <tr><td colSpan={8} className="p-10 text-center font-bold text-muted-foreground">No orders found.</td></tr>}</tbody></table></div>{saving && <p className="mt-3 text-xs font-bold">Saving…</p>}</section>}

      {tab === "products" && <ProductList products={data.products} onAdd={() => setShowProduct(true)} onSaved={load} />}
    </div>

    {showOrder && <OrderModal products={data.products.filter(p => p.active)} defaultDate={date} onClose={() => setShowOrder(false)} onSaved={async () => { setShowOrder(false); await load(); }} />}
    {showProduct && <ProductModal onClose={() => setShowProduct(false)} onSaved={async () => { setShowProduct(false); await load(); }} />}
  </main>;
}

function Stat({ label, value, tone }: { label: string; value: string | number; tone: string }) { return <div className={`sticker ${tone} p-5`}><div className="text-sm font-extrabold uppercase tracking-wide">{label}</div><div className="mt-1 font-display text-4xl font-extrabold">{value}</div></div>; }

function CapacityCard({ product }: { product: Capacity }) {
  const used = product.standardCapacity ? Math.min(100, product.committed / product.standardCapacity * 100) : 0;
  const full = product.committed >= product.stretchCapacity;
  const stretch = product.committed > product.standardCapacity;
  const image = imageForProduct(product.name);
  const committed = formatQuantity(product.committed, product.unit);
  const standard = formatQuantity(product.standardCapacity, product.unit);
  const remaining = formatQuantity(product.remaining, product.unit);
  const stretchRemaining = formatQuantity(product.stretchRemaining, product.unit);
  const stretchCapacity = formatQuantity(product.stretchCapacity, product.unit);
  return <article className={`sticker overflow-hidden ${full ? "bg-tomato/15" : stretch ? "bg-peach" : "bg-white"}`}>
    {image && <div className="h-32 border-b-2 border-ink bg-mint/20"><img src={image} alt={product.name} loading="lazy" className="h-full w-full object-contain p-3" /></div>}
    <div className="p-5"><div className="flex items-start justify-between gap-3"><div><h2 className="font-display text-2xl font-extrabold">{product.name}</h2><p className="text-sm font-bold">Production range · {displayRange(product)}</p></div>{full ? <CircleAlert className="text-tomato" /> : <CheckCircle2 />}</div>
      <div className="mt-5 flex items-end justify-between"><div><span className="font-display text-4xl font-extrabold">{committed}</span><span className="ml-1 font-bold">/ {standard} {product.unit}</span><p className="text-xs font-extrabold uppercase">committed</p></div><div className="text-right"><span className="font-display text-2xl font-extrabold">{full ? "0" : remaining} {product.unit}</span><p className="text-xs font-extrabold uppercase">standard left</p></div></div>
      <div className="mt-3 h-4 overflow-hidden rounded-full border-2 border-ink bg-white"><div className={`h-full ${full ? "bg-tomato" : stretch ? "bg-mascot" : "bg-mint"}`} style={{ width: `${used}%` }} /></div>
      <div className="mt-3 flex items-center justify-between text-sm font-extrabold"><span>{full ? "FULL" : stretch ? `Stretch mode · ${stretchRemaining} ${product.unit} left` : "Taking orders"}</span><span>{stretchCapacity} {product.unit} max</span></div>
    </div></article>;
}

function Empty({ title, text, action }: { title: string; text: string; action: () => void }) { return <div className="sticker bg-peach p-8"><PackagePlus size={32} /><h2 className="mt-3 font-display text-2xl font-extrabold">{title}</h2><p className="mt-1 text-sm font-semibold">{text}</p><button onClick={action} className="sticker-btn mt-5 bg-white px-4 py-2">View Sep 14</button></div>; }

function ProductList({ products, onAdd, onSaved }: { products: Product[]; onAdd: () => void; onSaved: () => void }) { return <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.map(p => <div className="sticker p-5" key={p.id}><div className="flex justify-between gap-3"><div><h2 className="font-display text-2xl font-extrabold">{p.name}</h2><p className="font-semibold">{displayRange(p)}</p></div><span className="rounded-full border-2 border-ink bg-mint px-2 py-1 text-xs font-extrabold">{p.active ? "ACTIVE" : "OFF"}</span></div><div className="mt-4 grid grid-cols-2 gap-2 text-sm"><div className="rounded-lg bg-peach p-3"><b>{formatQuantity(p.standardCapacity, p.unit)}</b><br />standard/day</div><div className="rounded-lg bg-mascot p-3"><b>{formatQuantity(p.stretchCapacity, p.unit)}</b><br />stretch max</div></div><button onClick={async () => { await fetch(`/api/dashboard/products/${p.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: !p.active }) }); onSaved(); }} className="sticker-btn mt-4 w-full bg-white px-3 py-2">{p.active ? "Pause product" : "Activate product"}</button></div>)}<button onClick={onAdd} className="sticker flex min-h-48 items-center justify-center bg-white p-6 font-display text-xl font-extrabold"><Plus /> Add product</button></section>; }

function OrderModal({ products, defaultDate, onClose, onSaved }: { products: Product[]; defaultDate: string; onClose: () => void; onSaved: () => void }) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [productionDate, setProductionDate] = useState(defaultDate);
  const [items, setItems] = useState<OrderItemForm[]>([{ productId: "", quantityLabel: "" }]);
  const [amount, setAmount] = useState(0);
  const [payment, setPayment] = useState<Order["paymentStatus"]>("Pending");
  const [status, setStatus] = useState<Order["status"]>("New");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const availableProductNames = MODAK_DAYS[productionDate] || [];
  const availableProducts = products.filter((product) => availableProductNames.includes(product.name));

  useEffect(() => {
    setItems((current) => current.map((item) => {
      const stillAvailable = availableProducts.some((product) => product.id === item.productId);
      if (stillAvailable) return item;
      const first = availableProducts[0];
      return { productId: first?.id || "", quantityLabel: first ? quantityOptions(first.name)[0] : "" };
    }));
  }, [productionDate, products]);

  useEffect(() => {
    let total = 0;
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (product && item.quantityLabel) total += MODAK_PRICES[product.name]?.[item.quantityLabel] || 0;
    }
    setAmount(total);
  }, [items, products]);

  function updateItem(index: number, patch: Partial<OrderItemForm>) {
    setItems((current) => current.map((item, i) => i === index ? { ...item, ...patch } : item));
  }

  function addItem() {
    const first = availableProducts[0];
    if (!first) return;
    setItems((current) => [...current, { productId: first.id, quantityLabel: quantityOptions(first.name)[0] }]);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    const normalizedPhone = phone.replace(/\D/g, "");
    if (!customerName.trim() || !/^[6-9]\d{9}$/.test(normalizedPhone)) {
      setError("Please enter a valid customer name and 10-digit mobile number.");
      return;
    }
    if (!productionDate || !availableProducts.length || !items.every((item) => item.productId && item.quantityLabel)) {
      setError("Please select a production day, Modak and quantity.");
      return;
    }
    if (!deliveryLocation || (deliveryLocation === "Other area" && !customLocation.trim())) {
      setError("Please select a delivery location.");
      return;
    }

    setBusy(true);
    const payloadItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      return { productId: product.id, quantity: quantityValue(item.quantityLabel, product.unit) };
    });

    try {
      const response = await fetch("/api/dashboard/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          customerPhone: normalizedPhone,
          productionDate,
          deliveryAddress: deliveryLocation === "Other area" ? `Other area: ${customLocation.trim()}` : deliveryLocation,
          amount,
          paymentStatus: payment,
          status,
          items: payloadItems,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Could not save order.");
      await onSaved();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not save order.");
      setBusy(false);
    }
  }

  return <Modal title="Add order" onClose={onClose}>
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Customer name"><input required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer name" /></Field>
        <Field label="Mobile no."><input required inputMode="numeric" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" /></Field>
      </div>

      <div className="sticker bg-peach/50 p-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Production day"><input required type="date" min={DATE_MIN} max={DATE_MAX} value={productionDate} onChange={(e) => setProductionDate(e.target.value)} /></Field>
          <Field label="Delivery location"><select required value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)}><option value="">Select area</option>{DELIVERY_LOCATIONS.map((location) => <option key={location}>{location}</option>)}</select></Field>
        </div>
        {deliveryLocation === "Other area" && <Field label="Area / locality"><input required value={customLocation} onChange={(e) => setCustomLocation(e.target.value)} placeholder="Enter area" /></Field>}
      </div>

      <Field label="Modak & quantity">
        <div className="space-y-3">
          {items.map((item, index) => {
            const product = products.find((p) => p.id === item.productId);
            const options = product ? quantityOptions(product.name) : [];
            const itemPrice = product && item.quantityLabel ? MODAK_PRICES[product.name]?.[item.quantityLabel] || 0 : 0;
            return <div className="rounded-xl border-2 border-ink bg-white p-3" key={`${index}-${item.productId}`}>
              <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr_auto] sm:items-end">
                <Field label="Modak"><select required value={item.productId} onChange={(e) => { const next = products.find((p) => p.id === e.target.value); updateItem(index, { productId: e.target.value, quantityLabel: next ? quantityOptions(next.name)[0] : "" }); }}><option value="">Select Modak</option>{availableProducts.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></Field>
                <Field label="Quantity"><select required value={item.quantityLabel} onChange={(e) => updateItem(index, { quantityLabel: e.target.value })}>{options.map((option) => <option key={option}>{option}</option>)}</select></Field>
                <button type="button" disabled={items.length === 1} onClick={() => setItems((current) => current.filter((_, i) => i !== index))} className="h-10 rounded-lg border-2 border-ink px-3 font-bold disabled:opacity-30">×</button>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm font-extrabold"><span>{product ? `${product.name} · ${item.quantityLabel || "Select quantity"}` : "Select a Modak"}</span><span>{itemPrice ? `₹${itemPrice.toLocaleString("en-IN")}` : "—"}</span></div>
            </div>;
          })}
          <button type="button" disabled={!availableProducts.length} onClick={addItem} className="text-sm font-extrabold underline disabled:opacity-40">+ Add another Modak</button>
          {!availableProducts.length && <p className="text-sm font-bold text-tomato">No Modaks are scheduled for this day.</p>}
        </div>
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Total amount"><div className="flex h-11 items-center rounded-xl border-2 border-ink bg-mascot px-3 font-display text-xl font-extrabold">₹{amount.toLocaleString("en-IN")}</div></Field>
        <Field label="Payment"><select value={payment} onChange={(e) => setPayment(e.target.value as Order["paymentStatus"])}>{paymentStatuses.map((s) => <option key={s}>{s}</option>)}</select></Field>
        <Field label="Status"><select value={status} onChange={(e) => setStatus(e.target.value as Order["status"])}>{statuses.map((s) => <option key={s}>{s}</option>)}</select></Field>
      </div>

      {error && <p className="rounded-xl border-2 border-ink bg-tomato/15 p-3 text-sm font-bold">{error}</p>}
      <div className="flex justify-end gap-2 pt-1"><button type="button" onClick={onClose} className="sticker-btn bg-white px-4 py-2">Cancel</button><button disabled={busy} className="sticker-btn bg-tomato px-5 py-2 text-white">{busy ? "Saving…" : "Save order"}</button></div>
    </form>
  </Modal>;
}

function ProductModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) { const [name, setName] = useState(""); const [unit, setUnit] = useState("pieces"); const [standard, setStandard] = useState(""); const [stretch, setStretch] = useState(""); const [busy, setBusy] = useState(false); return <Modal title="Product capacity" onClose={onClose}><form onSubmit={async e => { e.preventDefault(); setBusy(true); await fetch("/api/dashboard/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, unit, standardCapacity: Number(standard), stretchCapacity: Number(stretch) }) }); await onSaved(); }} className="space-y-4"><Field label="Product name"><input required placeholder="Ukadiche Modak" value={name} onChange={e => setName(e.target.value)} /></Field><div className="grid gap-4 sm:grid-cols-3"><Field label="Unit"><select value={unit} onChange={e => setUnit(e.target.value)}><option>pieces</option><option>kg</option><option>packs</option><option>boxes</option></select></Field><Field label="Standard / day"><input required type="number" min="0" value={standard} onChange={e => setStandard(e.target.value)} /></Field><Field label="Stretch max / day"><input required type="number" min="0" value={stretch} onChange={e => setStretch(e.target.value)} /></Field></div><p className="rounded-xl border-2 border-ink bg-mint p-3 text-sm font-bold">Example: standard 50 pieces/day, stretch up to 70 pieces/day. Weight-based modaks display as 500gm–1KG.</p><div className="flex justify-end gap-2"><button type="button" onClick={onClose} className="sticker-btn bg-white px-4 py-2">Cancel</button><button disabled={busy} className="sticker-btn bg-tomato px-5 py-2 text-white">Save product</button></div></form></Modal>; }

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) { return <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-3 sm:items-center"><div className="sticker max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-cream p-5 sm:p-7"><div className="mb-5 flex items-center justify-between"><h2 className="font-display text-3xl font-extrabold">{title}</h2><button onClick={onClose} className="rounded-full border-2 border-ink bg-white px-3 py-1 text-xl font-bold">×</button></div>{children}</div></div>; }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-sm font-extrabold"><span className="mb-1 block">{label}</span>{children}</label>; }