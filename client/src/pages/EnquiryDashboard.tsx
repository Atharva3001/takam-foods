import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, MessageCircle, RefreshCw, Trash2 } from "lucide-react";

type Enquiry = {
  id: string;
  enquiryNumber: string;
  createdAt: string;
  productName: string;
  selectedDay: string;
  quantity: string;
  name: string;
  mobileNumber: string;
  deliveryAddress: string;
  status: "Enquiry Received" | "Confirmed" | "Rejected" | "Cancelled";
  convertedOrderNumber?: string;
};

const statuses: Enquiry["status"][] = ["Enquiry Received", "Confirmed", "Rejected", "Cancelled"];

export default function EnquiryDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const response = await fetch("/api/dashboard/enquiries");
    if (response.ok) setEnquiries(await response.json());
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const updateStatus = async (id: string, status: Enquiry["status"]) => {
    const response = await fetch(`/api/dashboard/enquiries/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    const data = await response.json().catch(() => null);
    if (response.ok) {
      setEnquiries((items) => items.map((item) => item.id === id ? { ...item, ...data } : item));
      return;
    }
    window.alert(data?.error || "Could not update enquiry");
  };

  const deleteEnquiry = async (id: string, enquiryNumber: string) => {
    if (!window.confirm(`Delete ${enquiryNumber}? This cannot be undone.`)) return;
    const response = await fetch(`/api/dashboard/enquiries/${id}`, { method: "DELETE" });
    if (response.ok) setEnquiries((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-cream text-ink p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><Link href="/dashboard" className="font-display font-bold inline-flex items-center gap-1 mb-2"><ArrowLeft className="h-4 w-4" /> Back to dashboard</Link><h1 className="font-display text-4xl font-extrabold">WhatsApp Enquiries</h1><p className="font-semibold text-ink/60">Every website enquiry is saved here before WhatsApp opens.</p></div>
          <button onClick={() => void load()} className="sticker-btn bg-white px-4 py-2 flex items-center gap-2"><RefreshCw className="h-4 w-4" /> Refresh</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="sticker bg-mascot p-4"><p className="text-sm font-bold">Total</p><p className="font-display text-3xl font-extrabold">{enquiries.length}</p></div>
          <div className="sticker bg-peach p-4"><p className="text-sm font-bold">New</p><p className="font-display text-3xl font-extrabold">{enquiries.filter((e) => e.status === "Enquiry Received").length}</p></div>
          <div className="sticker bg-mint p-4"><p className="text-sm font-bold">Confirmed</p><p className="font-display text-3xl font-extrabold">{enquiries.filter((e) => e.status === "Confirmed").length}</p></div>
          <div className="sticker bg-white p-4"><p className="text-sm font-bold">Rejected / Cancelled</p><p className="font-display text-3xl font-extrabold">{enquiries.filter((e) => e.status === "Rejected" || e.status === "Cancelled").length}</p></div>
        </div>

        <div className="sticker bg-white overflow-hidden">
          {loading ? <div className="p-8 text-center font-bold">Loading enquiries…</div> : enquiries.length === 0 ? <div className="p-8 text-center"><p className="font-display text-2xl font-extrabold">No enquiries yet</p><p className="font-semibold text-ink/60 mt-1">Website WhatsApp enquiries will appear here automatically.</p></div> : <div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-ink text-cream"><tr><th className="p-3">Enquiry</th><th className="p-3">Modak</th><th className="p-3">Customer</th><th className="p-3">Day</th><th className="p-3">Qty</th><th className="p-3">Address</th><th className="p-3">Status</th><th className="p-3">Action</th></tr></thead><tbody>{enquiries.map((enquiry) => <tr key={enquiry.id} className="border-b-2 border-ink/10 align-top"><td className="p-3 whitespace-nowrap"><p className="font-display font-bold">{enquiry.enquiryNumber}</p><p className="text-xs text-ink/50">{new Date(enquiry.createdAt).toLocaleString()}</p></td><td className="p-3"><p className="font-bold">{enquiry.productName}</p><p className="text-xs text-ink/50">Website → WhatsApp</p></td><td className="p-3"><p className="font-bold">{enquiry.name}</p><a href={`tel:${enquiry.mobileNumber}`} className="text-sm underline">{enquiry.mobileNumber}</a></td><td className="p-3 whitespace-nowrap">{enquiry.selectedDay.split("-").reverse().join("-")}</td><td className="p-3 font-bold">{enquiry.quantity}</td><td className="p-3 min-w-48">{enquiry.deliveryAddress}</td><td className="p-3"><select value={enquiry.status} onChange={(event) => void updateStatus(enquiry.id, event.target.value as Enquiry["status"])} className="border-2 border-ink bg-white px-2 py-1.5 font-bold"><option>{statuses[0]}</option><option>{statuses[1]}</option><option>{statuses[2]}</option><option>{statuses[3]}</option></select>{enquiry.status === "Enquiry Received" && <p className="text-xs font-bold text-tomato mt-1 flex items-center gap-1"><MessageCircle className="h-3 w-3" /> Needs review</p>}{enquiry.status === "Confirmed" && enquiry.convertedOrderNumber && <p className="text-xs font-bold text-mint-foreground mt-1 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {enquiry.convertedOrderNumber} added to Orders</p>}</td><td className="p-3"><button type="button" onClick={() => void deleteEnquiry(enquiry.id, enquiry.enquiryNumber)} className="sticker-btn bg-peach px-3 py-2 text-sm"><Trash2 className="h-4 w-4" /> Delete</button></td></tr>)}</tbody></table></div>}
        </div>
      </div>
    </div>
  );
}
