import { useState, type FormEvent } from "react";
import { MessageCircle, ArrowLeft, PlayCircle, ChevronRight } from "lucide-react";
import { Link, useParams } from "wouter";
import { getProduct, products, PHONE, SITE_ASSETS } from "@/lib/products";
import { MobileNav } from "@/components/MobileNav";
import NotFound from "@/pages/NotFound";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const enquiryDays = Array.from({ length: 12 }, (_, index) => {
  const day = 13 + index;
  return `2026-09-${String(day).padStart(2, "0")}`;
});

function formatEnquiryDay(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}-${month}-${year}`;
}

function Tape({ className = "" }: { className?: string }) {
  return <div className={`absolute w-20 h-5 bg-mint/80 border-2 border-ink/20 ${className}`} style={{ clipPath: "polygon(3% 0, 97% 6%, 100% 100%, 0 94%)" }} />;
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug ?? "");
  const [activeImage, setActiveImage] = useState(0);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [quantity, setQuantity] = useState("");
  const [customQuantity, setCustomQuantity] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [showQuantityHint, setShowQuantityHint] = useState(false);

  if (!product) return <NotFound />;

  const others = products.filter((p) => p.slug !== product.slug);
  const isModak = product.slug.includes("modak");
  const quantityOptions = [
    ...(product.slug === "ukadiche-modak" ? [{ label: "7 Pieces", price: "₹210" }] : []),
    { label: "11 Pieces", price: "₹320" }, { label: "21 Pieces", price: "₹580" },
    { label: "250 gm", price: "₹320" }, { label: "500 gm", price: "₹590" }, { label: "1 kg", price: "₹1,100" },
    { label: "Custom", price: "Price on confirmation" },
  ];
  const deliveryOptions = ["Singhgad Road", "Kothrud", "Deccan", "Nanded City", "Baner", "Pashan", "Baavdhan", "Other area"];
  const selectedQuantity = quantityOptions.find((option) => option.label === quantity);
  const orderQuantity = quantity === "Custom" ? `Custom: ${customQuantity.trim()}` : quantity;
  const orderPrice = selectedQuantity?.price ?? "To confirm";
  const orderLocation = deliveryLocation === "Other area" ? `Other area: ${customLocation.trim()}` : deliveryLocation;
  const normalizedMobileNumber = mobileNumber.replace(/\D/g, "");
  const quantityMissing = !quantity || (quantity === "Custom" && !customQuantity.trim());
  const nameMissing = isModak && !name.trim();
  const mobileNumberMissing = isModak && !/^[6-9]\d{9}$/.test(normalizedMobileNumber);
  const selectedDayMissing = isModak && !selectedDay;
  const deliveryAddressMissing = isModak && (!deliveryLocation || (deliveryLocation === "Other area" && !customLocation.trim()));
  const orderIncomplete = quantityMissing;

  const waText = encodeURIComponent(
    `नमस्कार टाकम! मला ${product.marathi} (${product.english}) order करायचं आहे 😋${isModak ? `\nSelected Day: ${formatEnquiryDay(selectedDay)}\nQuantity: ${orderQuantity}\nName: ${name.trim()}\nMobile No: ${normalizedMobileNumber}\nDelivery Address: ${orderLocation}` : ""}`
  );

  const captureEnquiry = async () => {
    if (!isModak || nameMissing || mobileNumberMissing || selectedDayMissing || deliveryAddressMissing) return false;
    const response = await fetch("/api/dashboard/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: product.english,
        productSlug: product.slug,
        selectedDay,
        quantity: orderQuantity,
        name: name.trim(),
        mobileNumber: normalizedMobileNumber,
        deliveryAddress: orderLocation,
      }),
    });
    return response.ok;
  };

  const handleOrderSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nameMissing || mobileNumberMissing || selectedDayMissing || deliveryAddressMissing) return;
    const captured = await captureEnquiry();
    if (!captured) return;
    window.open(`https://wa.me/91${PHONE}?text=${waText}`, "_blank", "noopener,noreferrer");
    setIsOrderDialogOpen(false);
  };

  const isMascotSrc = (src: string) => src.includes("takam_modak_") || src.includes("ukadiche_modak_hero_mascot");
  const isMascotAsset = isMascotSrc(product.images[activeImage] ?? "");

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b-[3px] border-ink">
        <div className="container flex items-center justify-between py-2">
          <Link href="/" className="flex items-center gap-2.5"><img src={SITE_ASSETS.logoC} alt="टाकम badge" className="h-14 w-14 md:h-16 md:w-16 -rotate-6 drop-shadow-[3px_3px_0_rgba(30,27,22,0.35)]" /><span className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">टाकम</span></Link>
          <nav className="hidden md:flex items-center gap-6 font-display font-bold"><Link href="/" className="hover:underline">Home</Link><Link href="/ganapati-modak-special" className="hover:underline">गणपती Special 🙏</Link></nav>
          <MobileNav />
        </div>
      </header>

      <main className="flex-1">
        <div className="container pt-6"><p className="font-display font-bold text-sm text-muted-foreground flex items-center gap-1 flex-wrap"><Link href="/" className="hover:underline">Home</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/ganapati-modak-special" className="hover:underline">गणपती Special</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-ink">{product.marathi}</span></p></div>

        <section className="py-8 md:py-14 relative">
          <div className="absolute top-6 right-[6%] sticker rotate-6 bg-peach px-3 py-1 font-display font-bold text-sm hidden lg:block">एकदम fresh! ✨</div>
          <div className="container grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="space-y-5">
              <div className="relative -rotate-1"><div className="border-[3px] border-ink bg-white p-2.5 pb-4 shadow-[6px_6px_0_0_var(--ink)]"><img src={product.images[activeImage]} alt={`${product.marathi} photo ${activeImage + 1}`} decoding="async" fetchPriority="high" className={`w-full h-80 md:h-[26rem] border-2 border-ink/15 ${isMascotAsset ? "object-contain bg-mint/20 p-5" : "object-cover saturate-[1.15]"}`} /><p className="text-center font-display font-bold text-xs mt-2 text-ink/60">{isMascotAsset ? "✨ Modak चा official Takam avatar" : "📸 straight from आमची kitchen"}</p></div><Tape className="-top-2.5 left-10 -rotate-6" /><Tape className="-top-2.5 right-10 rotate-6" /></div>
              <div className="flex gap-3 flex-wrap pt-2">{product.images.map((img, i) => <button key={img} onClick={() => setActiveImage(i)} className={`border-[2.5px] border-ink rounded-xl overflow-hidden h-18 w-18 md:h-20 md:w-20 shadow-[3px_3px_0_0_var(--ink)] ${i === activeImage ? "ring-4 ring-mascot" : "opacity-70 hover:opacity-100"}`} aria-label={`View photo ${i + 1}`}><img src={img} alt="" loading="lazy" decoding="async" className={`h-full w-full ${isMascotSrc(img) ? "object-contain bg-mint/20 p-1" : "object-cover"}`} /></button>)}{product.videos.length === 0 && <div className="border-[2.5px] border-dashed border-ink/40 rounded-xl h-18 w-18 md:h-20 md:w-20 flex flex-col items-center justify-center text-center px-1 bg-white/60"><PlayCircle className="h-5 w-5 text-ink/40" /><span className="font-display font-bold text-[9px] text-ink/40">Video लवकरच 🎬</span></div>}</div>
            </div>

            <div className="space-y-6">
              <div><h1 className="font-display font-extrabold leading-tight" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>{product.marathi}</h1><p className="font-display font-bold text-xl text-muted-foreground">{product.english}</p></div>
              <p className="font-semibold text-lg leading-relaxed">{product.shortDesc}</p><p className="font-bold italic text-muted-foreground">{product.funny}</p>
              {isModak && <div className="sticker bg-mascot/80 p-4 -rotate-1 border-2 border-ink"><div className="flex flex-wrap gap-2 mb-2"><span className="bg-white border-2 border-ink rounded-full px-2.5 py-0.5 font-display font-bold text-xs">Made to Order</span><span className="bg-peach border-2 border-ink rounded-full px-2.5 py-0.5 font-display font-bold text-xs">Limited Quantity</span></div><p className="font-semibold text-sm leading-snug">Every Ganapati batch is made fresh to order. Quantities are limited, so confirm your enquiry early.</p></div>}
              {isModak && <div id="quantity-selection" className="sticker -rotate-1 bg-peach/55 p-4 md:p-5 space-y-3"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-display font-extrabold text-lg">किती पाहिजेत? 👀</p><span className="bg-white border-2 border-ink rounded-full px-2.5 py-0.5 font-display font-bold text-xs">Select quantity</span></div><div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">{quantityOptions.map((option) => <button type="button" key={option.label} onClick={() => setQuantity(option.label)} className={`border-[2.5px] border-ink px-3 py-2 font-display font-bold text-sm shadow-[2px_2px_0_0_var(--ink)] ${quantity === option.label ? "bg-mascot" : "bg-white hover:bg-mint/60"}`} aria-pressed={quantity === option.label}><span className="block">{option.label === "Custom" ? "Custom ✍️" : option.label}</span><span className="block text-xs font-bold text-muted-foreground">{option.price}</span></button>)}</div>{quantity === "Custom" && <label className="block space-y-1.5"><span className="font-display font-bold text-sm">तुमची quantity लिहा</span><input value={customQuantity} onChange={(event) => setCustomQuantity(event.target.value)} placeholder="उदा. 35 pieces / 1 kg" className="w-full border-[2.5px] border-ink bg-white px-3 py-2.5 font-semibold shadow-[2px_2px_0_0_var(--ink)] outline-none focus:ring-4 focus:ring-mascot" /></label>}<p className="font-bold text-xs text-muted-foreground">तुमची निवड: <span className="text-ink">{quantity === "Custom" && customQuantity.trim() ? customQuantity : quantity || "Select one"}</span>{quantity && <span className="text-ink"> · {orderPrice}</span>}</p></div>}

              <div className="flex flex-col items-start gap-2 pt-1"><button type="button" aria-disabled={orderIncomplete} onClick={() => { if (orderIncomplete) { setShowQuantityHint(true); document.getElementById("quantity-selection")?.scrollIntoView({ behavior: "smooth", block: "center" }); window.setTimeout(() => setShowQuantityHint(false), 2600); return; } setIsOrderDialogOpen(true); }} className={`sticker-btn bg-white px-7 py-3 text-lg flex items-center gap-2 rotate-1 ${orderIncomplete ? "cursor-not-allowed opacity-50" : ""}`}><MessageCircle className="h-5 w-5" /> Send Enquiry on WhatsApp</button>{orderIncomplete && <p role="status" className={`font-display font-bold text-sm text-tomato ${showQuantityHint ? "animate-bounce" : ""}`}>{showQuantityHint ? "First select a quantity above 👆" : "Select a quantity above to continue"}</p>}</div>

              <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}><DialogContent className="border-[3px] border-ink bg-cream shadow-[8px_8px_0_0_var(--ink)] p-5 sm:p-7 max-h-[90vh] overflow-y-auto"><DialogHeader className="text-left"><DialogTitle className="font-display text-2xl font-extrabold">Enquiry details ✍️</DialogTitle><DialogDescription className="font-semibold text-ink/70">We’ll save this enquiry to the dashboard, then open WhatsApp with the same details.</DialogDescription></DialogHeader><form onSubmit={handleOrderSubmit} className="space-y-4">
                <div className="sticker bg-mint/50 p-3"><p className="font-display font-bold">Modak name</p><p className="font-semibold">{product.english}</p></div>
                <label className="block space-y-1.5"><span className="font-display font-bold text-sm">Selected Day</span><select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)} required className="w-full border-[2.5px] border-ink bg-white px-3 py-2.5 font-semibold shadow-[2px_2px_0_0_var(--ink)] outline-none focus:ring-4 focus:ring-mascot"><option value="" disabled>Select day</option>{enquiryDays.map((day) => <option key={day} value={day}>{formatEnquiryDay(day)}</option>)}</select></label>
                <label className="block space-y-1.5"><span className="font-display font-bold text-sm">Quantity</span><input value={orderQuantity} readOnly className="w-full border-[2.5px] border-ink bg-white/70 px-3 py-2.5 font-semibold" /></label>
                <label className="block space-y-1.5"><span className="font-display font-bold text-sm">Name</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your name" autoComplete="name" required className="w-full border-[2.5px] border-ink bg-white px-3 py-2.5 font-semibold shadow-[2px_2px_0_0_var(--ink)] outline-none focus:ring-4 focus:ring-mascot" /></label>
                <label className="block space-y-1.5"><span className="font-display font-bold text-sm">Mobile No</span><input value={mobileNumber} onChange={(event) => setMobileNumber(event.target.value.replace(/[^0-9+\s-]/g, ""))} placeholder="10-digit mobile number" inputMode="tel" autoComplete="tel" maxLength={14} required className="w-full border-[2.5px] border-ink bg-white px-3 py-2.5 font-semibold shadow-[2px_2px_0_0_var(--ink)] outline-none focus:ring-4 focus:ring-mascot" />{mobileNumber.length > 0 && mobileNumberMissing && <span className="block text-xs font-bold text-tomato">Please enter a valid 10-digit mobile number.</span>}</label>
                <label className="block space-y-1.5"><span className="font-display font-bold text-sm">Delivery Address</span><select value={deliveryLocation} onChange={(event) => setDeliveryLocation(event.target.value)} required className="w-full border-[2.5px] border-ink bg-white px-3 py-2.5 font-semibold shadow-[2px_2px_0_0_var(--ink)] outline-none focus:ring-4 focus:ring-mascot"><option value="" disabled>Select area</option>{deliveryOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
                {deliveryLocation === "Other area" && <label className="block space-y-1.5"><span className="font-display font-bold text-sm">Full Delivery Address</span><textarea value={customLocation} onChange={(event) => setCustomLocation(event.target.value)} placeholder="House/flat, street, area, Pune" required rows={3} className="w-full border-[2.5px] border-ink bg-white px-3 py-2.5 font-semibold shadow-[2px_2px_0_0_var(--ink)] outline-none focus:ring-4 focus:ring-mascot" /></label>}
                <DialogFooter className="pt-2 sm:flex-row sm:justify-end"><DialogClose asChild><button type="button" className="border-[2.5px] border-ink bg-white px-4 py-2.5 font-display font-bold shadow-[2px_2px_0_0_var(--ink)]">Not yet</button></DialogClose><button type="submit" disabled={selectedDayMissing || deliveryAddressMissing || nameMissing || mobileNumberMissing} className="sticker-btn bg-tomato text-primary-foreground px-5 py-2.5 flex items-center justify-center gap-2 disabled:opacity-50"><MessageCircle className="h-4 w-4" /> Save & Continue to WhatsApp</button></DialogFooter>
              </form></DialogContent></Dialog>

              <div className="sticker rotate-1 bg-white p-5 mt-4"><p className="font-display font-extrabold text-lg mb-3">Quick Facts 📌</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">{product.facts.map((f) => <div key={f.label} className="flex flex-col"><span className="font-display font-bold text-xs uppercase tracking-wide text-muted-foreground">{f.label}</span><span className="font-semibold text-sm">{f.value}</span></div>)}</div></div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-peach/40 relative"><div className="container max-w-3xl"><div className="inline-block sticker -rotate-2 bg-white px-4 py-1.5 font-display font-bold text-sm mb-5">📖 ह्याची गोष्ट</div><h2 className="font-display font-extrabold mb-5" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)" }}>{product.marathi} म्हणजे काय?</h2><div className="space-y-4">{product.story.map((para) => <p key={para.slice(0, 24)} className="font-semibold text-lg leading-relaxed">{para}</p>)}</div></div></section>
        <section className="py-12 md:py-20 relative"><div className="container"><div className="text-center mb-10"><div className="inline-block sticker rotate-2 bg-mint px-4 py-1.5 font-display font-bold text-sm mb-4">💚 का खावं?</div><h2 className="font-display font-extrabold text-3xl">Benefits - एकदम solid!</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">{product.benefits.map((b, i) => <div key={b.title} className={`sticker bg-white p-5 space-y-2 ${i % 2 === 0 ? "-rotate-1" : "rotate-1"}`}><div className="text-3xl">{b.emoji}</div><p className="font-display font-extrabold text-lg leading-tight">{b.title}</p><p className="font-semibold text-sm leading-relaxed text-muted-foreground">{b.desc}</p></div>)}</div></div></section>
        <section className="pb-12 md:pb-20"><div className="container max-w-3xl"><div className="sticker -rotate-1 bg-mascot p-7 md:p-9"><h2 className="font-display font-extrabold text-2xl md:text-3xl mb-4">कसं खायचं? 😋</h2><ul className="space-y-2.5">{product.howToEnjoy.map((tip) => <li key={tip} className="font-semibold text-lg flex items-start gap-2.5"><span className="font-display font-extrabold">→</span>{tip}</li>)}</ul></div></div></section>
        <section className="pb-14 md:pb-20"><div className="container max-w-3xl"><div className="sticker rotate-1 bg-white p-8 md:p-10 text-center space-y-5"><h2 className="font-display font-extrabold text-2xl md:text-3xl">{product.marathi} पाहिजे? मग enquiry करा! 🔥</h2><button type="button" disabled={orderIncomplete} onClick={() => setIsOrderDialogOpen(true)} className={`sticker-btn bg-mint px-7 py-3 text-lg flex items-center gap-2 mx-auto ${orderIncomplete ? "opacity-50" : ""}`}><MessageCircle className="h-5 w-5" /> Send Enquiry on WhatsApp</button></div></div></section>
        <section className="pb-16 md:pb-24"><div className="container"><h2 className="font-display font-extrabold text-2xl md:text-3xl text-center mb-8">अजून काही try करा 👇</h2><div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">{others.map((p) => <Link key={p.slug} href={`/product/${p.slug}`} className="sticker bg-white p-4 flex items-center gap-4"><img src={p.images[0]} alt={p.english} className="h-16 w-16 object-cover border-[2.5px] border-ink rounded-xl" /><div className="min-w-0"><p className="font-display font-extrabold text-lg leading-tight">{p.marathi}</p><p className="text-sm font-bold text-muted-foreground">{p.english}</p></div><ChevronRight className="h-5 w-5 ml-auto shrink-0" /></Link>)}</div><div className="text-center mt-10"><Link href="/ganapati-modak-special" className="font-display font-bold hover:underline inline-flex items-center gap-1.5"><ArrowLeft className="h-4 w-4" /> सगळे Ganapati Modak बघा</Link></div></div></section>
      </main>

      <footer className="border-t-[3px] border-ink bg-ink text-cream"><div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6"><div className="flex items-center gap-4"><img src={SITE_ASSETS.logoC} alt="टाकम badge" className="h-16 w-16 md:h-20 md:w-20 -rotate-6" /><div><p className="font-display font-extrabold text-2xl md:text-3xl">टाकम</p><p className="text-sm opacity-80 font-semibold">घरगुती । चविष्ट । मस्त</p></div></div><p className="text-sm opacity-80 font-semibold text-center">Made with ❤️ in Maharashtra</p></div></footer>
    </div>
  );
}
