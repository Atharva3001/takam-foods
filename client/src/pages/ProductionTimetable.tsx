import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, CircleAlert, RefreshCw } from "lucide-react";
import { Link } from "wouter";

type ProductionProduct = {
  id: string;
  name: string;
  unit: string;
  standardCapacity: number;
  stretchCapacity: number;
  committed: number;
  standardRemaining: number;
  maxRemaining: number;
};

type TimelineItem = { productName: string; quantity: number; cumulative: number };
type TimelineRow = { orderNumber: string; createdAt: string; items: TimelineItem[] };
type ProductionResponse = { date: string; schedule: { products: Array<{ name: string; range: string }> } | null; products: ProductionProduct[]; timeline: TimelineRow[]; availableDates: string[] };

const fallbackDates = ["2026-09-14","2026-09-15","2026-09-16","2026-09-17","2026-09-18","2026-09-19","2026-09-20","2026-09-21","2026-09-22","2026-09-23","2026-09-24"];
const formatDate = (date: string) => new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const formatTime = (value: string) => new Date(value).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

export default function ProductionTimetable() {
  const [date, setDate] = useState("2026-09-14");
  const [data, setData] = useState<ProductionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const response = await fetch(`/api/dashboard/production?date=${date}`);
      if (!response.ok) throw new Error("Unable to load production timetable");
      setData(await response.json());
    } finally { setLoading(false); }
  }
  useEffect(() => { load(); }, [date]);

  const dates = data?.availableDates?.length ? data.availableDates : fallbackDates;
  const totalCommitted = useMemo(() => data?.products.reduce((sum, p) => sum + p.committed, 0) || 0, [data]);

  return <main className="min-h-screen bg-background px-4 py-5 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/dashboard" className="mb-2 inline-flex items-center gap-1 text-sm font-bold underline decoration-2 underline-offset-4"><ArrowLeft size={16} /> Back to Order HQ</Link>
          <div className="flex flex-wrap items-center gap-3"><h1 className="font-display text-4xl font-extrabold tracking-tight">Production Timetable</h1><span className="rounded-full border-2 border-ink bg-mascot px-3 py-1 text-xs font-extrabold uppercase">Commitments</span></div>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">Scheduled modaks and how orders build the production commitment through the day.</p>
        </div>
        <button className="sticker-btn bg-mint px-4 py-2" onClick={load}><RefreshCw size={16} /> Refresh</button>
      </header>

      <section className="sticker mb-6 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm font-extrabold">Production date <select value={date} onChange={(e) => setDate(e.target.value)} className="ml-2 rounded-lg border-2 border-ink bg-white px-3 py-2 font-bold">{dates.map(d => <option key={d} value={d}>{formatDate(d)}</option>)}</select></label>
          <div className="text-sm font-extrabold">Total committed units: <span className="font-display text-2xl">{totalCommitted}</span></div>
        </div>
      </section>

      {data?.schedule === null ? <div className="sticker bg-peach p-8 font-bold">No timetable is configured for {formatDate(date)}.</div> : <>
        <section className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {data?.products.map((product) => {
            const percent = product.standardCapacity ? Math.min(100, product.committed / product.standardCapacity * 100) : 0;
            const full = product.committed >= product.stretchCapacity;
            const stretch = product.committed > product.standardCapacity;
            return <article key={product.id} className={`sticker p-5 ${full ? "bg-tomato/15" : stretch ? "bg-peach" : "bg-white"}`}>
              <div className="flex items-start justify-between gap-3"><div><h2 className="font-display text-2xl font-extrabold">{product.name}</h2><p className="text-sm font-bold">{product.unit} · {data.schedule?.products.find(p => p.name === product.name)?.range}</p></div>{full ? <CircleAlert className="text-tomato" /> : <CheckCircle2 />}</div>
              <div className="mt-5 flex items-end justify-between"><div><span className="font-display text-4xl font-extrabold">{product.committed}</span><span className="ml-1 font-bold">/ {product.standardCapacity}</span><p className="text-xs font-extrabold uppercase">committed</p></div><div className="text-right"><span className="font-display text-2xl font-extrabold">{product.maxRemaining}</span><p className="text-xs font-extrabold uppercase">max left</p></div></div>
              <div className="mt-3 h-4 overflow-hidden rounded-full border-2 border-ink bg-white"><div className={`h-full ${full ? "bg-tomato" : stretch ? "bg-mascot" : "bg-mint"}`} style={{ width: `${percent}%` }} /></div>
              <div className="mt-3 flex justify-between text-sm font-extrabold"><span>{full ? "FULL" : stretch ? "Stretch mode" : "Taking orders"}</span><span>{product.stretchCapacity} max</span></div>
            </article>;
          })}
        </section>

        <section className="sticker overflow-hidden bg-white p-4 sm:p-6">
          <div className="mb-4"><h2 className="font-display text-2xl font-extrabold">Commitment over time</h2><p className="text-sm font-semibold text-muted-foreground">Each row is an order timestamp; cumulative quantity shows how the production commitment grew during the day.</p></div>
          {loading && <p className="mb-3 text-xs font-bold">Loading…</p>}
          {data?.timeline.length ? <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="border-b-2 border-ink font-display text-base"><th className="p-3">Time</th><th className="p-3">Order</th><th className="p-3">New commitment</th><th className="p-3">Cumulative</th></tr></thead><tbody>{data.timeline.map(row => <tr key={`${row.orderNumber}-${row.createdAt}`} className="border-b border-black/20"><td className="p-3 font-bold">{formatTime(row.createdAt)}</td><td className="p-3 font-extrabold">{row.orderNumber}</td><td className="p-3">{row.items.map(item => `${item.productName} +${item.quantity}`).join(", ")}</td><td className="p-3 font-bold">{row.items.map(item => `${item.productName}: ${item.cumulative}`).join(" · ")}</td></tr>)}</tbody></table></div> : <div className="rounded-xl border-2 border-dashed border-ink p-8 text-center font-bold">No production commitments yet for this date.</div>}
        </section>
      </>}
    </div>
  </main>;
}
