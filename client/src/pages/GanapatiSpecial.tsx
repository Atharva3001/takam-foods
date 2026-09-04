/*
 * TAKAM - Ganapati Modak Special Page
 * Sticker Bomb Bazaar: playful paste-up layout, cream/mint/peach/mascot-yellow palette,
 * black ink outlines and hard shadows. Tomato remains reserved for order actions.
 */
import { ArrowRight, CalendarDays, ListOrdered, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { MobileNav } from "@/components/MobileNav";
import { PHONE, products, SITE_ASSETS } from "@/lib/products";

const ganapatiSlugs = [
  "ukadiche-modak",
  "dink-modak",
  "nachni-modak",
  "dryfruit-modak",
  "beet-modak",
  "poshtik-modak",
  "tilkund-modak",
  "gulkand-modak",
];

const ganapatiModaks = ganapatiSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is (typeof products)[number] => Boolean(product));

const elevenDayPlan = [
  { day: "१", name: "Opening aarti combo", slugs: ["ukadiche-modak", "dink-modak", "dryfruit-modak"], mood: "🙏 OG plus two favourites" },
  { day: "२", name: "Health buddy day", slugs: ["ukadiche-modak", "nachni-modak", "poshtik-modak"], mood: "🏋️ classic, earthy, full power" },
  { day: "३", name: "Festive VIP day", slugs: ["ukadiche-modak", "dryfruit-modak", "gulkand-modak"], mood: "👑 पाहुणे आले? VIP trio present" },
  { day: "४", name: "Pink pop day", slugs: ["ukadiche-modak", "beet-modak", "gulkand-modak"], mood: "💗 OG plus colour-code iconic" },
  { day: "५", name: "All-rounder day", slugs: ["ukadiche-modak", "poshtik-modak", "nachni-modak"], mood: "🦸 classic plus feel-good duo" },
  { day: "६", name: "Tiny but mighty day", slugs: ["ukadiche-modak", "tilkund-modak", "dink-modak"], mood: "🔥 छोटा दिसतो, trio भारी लागतो" },
  { day: "७", name: "Sweetheart day", slugs: ["ukadiche-modak", "gulkand-modak", "dryfruit-modak"], mood: "🌹 घरगुती प्रेमाचा Modak trio" },
  { day: "८", name: "Homecoming combo", slugs: ["ukadiche-modak", "nachni-modak", "tilkund-modak"], mood: "🏠 OG meets wholesome gang" },
  { day: "९", name: "Power trio day", slugs: ["ukadiche-modak", "dink-modak", "dryfruit-modak"], mood: "💪 ताकद, richness आणि festive swag" },
  { day: "१०", name: "Colour crush combo", slugs: ["ukadiche-modak", "beet-modak", "gulkand-modak"], mood: "✨ pretty outside, party inside" },
  { day: "११", name: "Bappa farewell mixed box", slugs: ["ukadiche-modak", "nachni-modak", "poshtik-modak"], mood: "🎊 OG plus two Takam gang stars" },
];

function getDayProducts(slugs: string[]) {
  return slugs
    .map((slug) => ganapatiModaks.find((product) => product.slug === slug))
    .filter((product): product is (typeof ganapatiModaks)[number] => Boolean(product));
}

export default function GanapatiSpecial() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b-[3px] border-ink">
        <div className="container flex items-center justify-between py-2">
          <Link href="/" className="flex items-center gap-2.5 hover:no-underline">
            <img src={SITE_ASSETS.logoC} alt="टाकम badge" className="h-14 w-14 md:h-16 md:w-16 -rotate-6 drop-shadow-[3px_3px_0_rgba(30,27,22,0.35)]" />
            <span className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">टाकम</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 font-display font-bold">
            <a href="#collection" className="hover:underline decoration-[3px] decoration-mascot underline-offset-4">मोदक मंडळी</a>
            <a href="#schedule" className="hover:underline decoration-[3px] decoration-mint underline-offset-4">११ दिवसांचं schedule</a>
          </nav>
          <MobileNav />
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-ink text-cream py-8 md:py-20">
          <div className="absolute bottom-5 -left-10 h-52 w-52 rounded-full bg-peach rotate-6 border-[4px] border-ink" />
          <div className="container relative grid md:grid-cols-[1.05fr_.95fr] gap-5 md:gap-10 items-center">
            <div className="space-y-4 md:space-y-6 order-1 relative z-10">
              <div className="inline-block sticker bg-mascot text-ink px-3 py-1 font-display font-bold text-xs md:text-sm -rotate-2">🙏 Bappa special</div>
              <h1 className="font-display font-extrabold leading-[.94]" style={{ fontSize: "clamp(2.7rem, 12vw, 5.6rem)" }}>
                ११ दिवस.<br />
                <span className="text-mascot">८ मोदक.</span><br />
                Full Bappa energy.
              </h1>
              <p className="max-w-md text-base md:text-xl font-semibold text-cream/80">रोज fresh Modak trio. उकडीचे मोदक रोज available.</p>
              <div className="flex flex-wrap gap-2">
                <span className="sticker bg-mascot text-ink px-2.5 py-1 font-display font-bold text-xs -rotate-2">Made to Order</span>
                <span className="sticker bg-peach text-ink px-2.5 py-1 font-display font-bold text-xs rotate-2">Limited Quantity</span>
              </div>
            </div>
            <div className="relative min-h-[245px] sm:min-h-[290px] md:min-h-[390px] order-2 -mt-1 md:mt-0">
              <div className="absolute -top-20 right-[-18%] md:-top-28 md:right-[-12%] h-[23rem] w-[23rem] md:h-[34rem] md:w-[34rem] rounded-full bg-mascot/90 border-[5px] border-ink rotate-12 overflow-hidden" />
              <div className="absolute top-0 left-[6%] sticker bg-peach text-ink px-2.5 py-1 text-xs md:text-base font-display font-bold -rotate-6 z-20">fresh batch ✨</div>
              <div className="absolute top-7 right-[4%] sticker bg-mint text-ink px-2.5 py-1 text-xs md:text-base font-display font-bold rotate-6 z-20">modak gang!</div>
              <div className="absolute inset-0 z-10">
                {ganapatiModaks.slice(0, 6).map((product, index) => {
                  const placements = ["left-0 top-12 -rotate-12", "left-[28%] top-2 rotate-6", "right-0 top-16 rotate-12", "left-[10%] bottom-0 rotate-6", "left-[42%] bottom-1 -rotate-6", "right-[5%] bottom-0 rotate-3"];
                  return <img key={product.slug} src={product.images[0]} alt="" aria-hidden className={`absolute ${placements[index]} h-24 w-24 sm:h-28 sm:w-28 md:h-40 md:w-40 object-contain drop-shadow-[5px_5px_0_rgba(30,27,22,0.65)]`} />;
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="collection" className="py-16 md:py-24 relative">
          <div className="absolute top-7 left-[5%] sticker bg-mint px-3 py-1 font-display font-bold -rotate-6 hidden lg:block">हर flavourचा एक attitude 😌</div>
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-block sticker bg-peach px-4 py-1.5 font-display font-bold text-sm mb-4 rotate-2">✨ The full Modak roster</div>
              <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: "clamp(2.2rem, 4.8vw, 3.7rem)" }}>बाप्पाच्या plate वर,<br /><span className="relative inline-block -rotate-1"><span className="relative z-10">सगळी gang हवी!</span><span className="absolute bottom-1 left-0 h-4 w-full bg-mascot -z-0" /></span></h2>
              <p className="mt-4 text-lg font-semibold text-muted-foreground">उकडीच्या OG पासून गुलकंदाच्या sweetheart पर्यंत - प्रत्येक Modakचा स्वतःचा scene आहे.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
              {ganapatiModaks.map((product, index) => (
                <Link key={product.slug} href={`/product/${product.slug}`} className={`sticker bg-white p-3 md:p-4 hover:no-underline ${index % 3 === 0 ? "-rotate-2" : index % 3 === 1 ? "rotate-2" : "-rotate-1"}`}>
                  <div className="relative h-40 sm:h-48 md:h-52 flex justify-center items-center bg-peach/30 border-2 border-ink/10 overflow-hidden">
                    <img src={product.images[0]} alt={`${product.marathi} mascot`} className="h-[115%] w-full object-contain transition-transform duration-200 hover:scale-110" />
                    <span className="absolute top-2 right-2 bg-mascot border-2 border-ink rounded-full px-2 py-0.5 text-[10px] md:text-xs font-display font-bold -rotate-3">{product.tag}</span>
                  </div>
                  <div className="pt-3 px-1"><p className="font-display font-extrabold text-lg leading-tight">{product.marathi}</p><p className="font-bold text-xs text-muted-foreground">{product.english}</p><p className="mt-2 text-xs md:text-sm font-bold italic">{product.funny}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="schedule" className="py-16 md:py-24 bg-mint/30 relative overflow-hidden">
          <div className="absolute -top-8 right-[7%] sticker bg-mascot px-4 py-2 font-display font-extrabold rotate-6 hidden lg:block">रोज fresh, रोज special</div>
          <div className="container">
            <div className="grid md:grid-cols-[.7fr_1.3fr] gap-10 md:gap-14 items-start">
              <div className="md:sticky md:top-28 space-y-5">
                <div className="inline-block sticker bg-white px-4 py-1.5 font-display font-bold text-sm -rotate-2"><CalendarDays className="inline h-4 w-4 -mt-0.5" /> ११ दिवसांचं timetable</div>
                <h2 className="font-display font-extrabold leading-[1.02]" style={{ fontSize: "clamp(2.25rem, 4.8vw, 4rem)" }}>आज कोणता<br /><span className="text-tomato">Modak?</span></h2>
                <p className="text-lg font-semibold text-muted-foreground">उकडीचे मोदक रोज available आहेत. बाकीचे दोन flavours दिवसानुसार बदलतात; प्रत्येक batch Made to Order आहे आणि quantity Limited आहे.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="sticker bg-mascot text-ink px-3 py-1 font-display font-bold text-sm -rotate-2">Made to Order</span>
                  <span className="sticker bg-peach text-ink px-3 py-1 font-display font-bold text-sm rotate-2">Limited Quantity</span>
                </div>
                <a href={`https://wa.me/91${PHONE}?text=${encodeURIComponent("नमस्कार टाकम! मला आजचा Ganapati Modak batch confirm करायचा आहे 🙏")}`} target="_blank" rel="noopener noreferrer" className="sticker-btn bg-tomato text-primary-foreground px-5 py-3 font-display font-bold inline-flex items-center gap-2 -rotate-1"><MessageCircle className="h-5 w-5" /> आजचा batch confirm करा</a>
              </div>
              <div className="space-y-4">
                {elevenDayPlan.map((day, index) => {
                  const dayProducts = getDayProducts(day.slugs);
                  return (
                    <article key={day.day} className={`sticker bg-white p-4 md:p-5 flex gap-4 md:gap-5 items-center ${index % 2 ? "rotate-[.35deg]" : "-rotate-[.35deg]"}`}>
                      <div className="shrink-0 h-14 w-14 md:h-16 md:w-16 rounded-full bg-mascot border-[3px] border-ink flex flex-col items-center justify-center shadow-[3px_3px_0_0_var(--ink)]"><span className="font-display font-extrabold text-2xl leading-none">{day.day}</span><span className="font-bold text-[9px]">DAY</span></div>
                      <div className="min-w-0 flex-1"><div className="flex flex-wrap justify-between gap-x-4 gap-y-1"><h3 className="font-display font-extrabold text-xl md:text-2xl">{day.name}</h3><span className="font-bold text-xs md:text-sm text-muted-foreground">{day.mood}</span></div><div className="mt-3 flex flex-wrap gap-2">{dayProducts.map((product) => <Link key={product.slug} href={`/product/${product.slug}`} className="inline-flex items-center gap-1.5 bg-mint/50 border-2 border-ink rounded-full pl-1 pr-2.5 py-1 text-xs md:text-sm font-display font-bold hover:bg-mascot"><span className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-ink/20 bg-white flex items-center justify-center"><img src={product.images[0]} alt="" aria-hidden className={`h-full w-full ${product.images[0].includes("takam_modak_") ? "object-contain p-0.5" : "object-cover"}`} /></span>{product.marathi}</Link>)}</div></div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-peach/25 relative overflow-hidden">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <div className="inline-flex items-center gap-2 sticker bg-white px-4 py-1.5 font-display font-bold text-sm -rotate-2"><ListOrdered className="h-4 w-4" /> Simple steps. No confusion.</div>
              <h2 className="font-display font-extrabold mt-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>How to Order</h2>
              <p className="mt-3 text-lg font-semibold text-muted-foreground">Pick your day, send the enquiry, and we’ll take it from there.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-16">
              {[
                ["01", "Choose Your Modak", "Pick your Modak from the day-wise timetable."],
                ["02", "Open the Modak Page", "Click the Modak name in the timetable."],
                ["03", "Select Your Order", "Choose quantity and delivery area."],
                ["04", "Send Enquiry", "Your enquiry goes to Takam WhatsApp."],
                ["05", "Confirm & Pay", "After Takam confirms, use the shared QR code."],
                ["06", "Get Your Modak", "Payment done? Receive final confirmation and delivery on the selected day."],
              ].map(([number, title, copy], index) => (
                <div key={number} className={`sticker bg-white p-5 ${index % 3 === 0 ? "-rotate-1" : index % 3 === 1 ? "rotate-1" : "-rotate-2"}`}>
                  <div className="flex items-start gap-3"><span className="shrink-0 h-10 w-10 rounded-full bg-mascot border-[2.5px] border-ink flex items-center justify-center font-display font-extrabold">{number}</span><div><h3 className="font-display font-extrabold text-lg leading-tight">{title}</h3><p className="mt-1.5 text-sm font-semibold text-muted-foreground leading-snug">{copy}</p></div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="container"><div className="sticker max-w-4xl mx-auto bg-mascot p-8 md:p-12 text-center relative rotate-1"><img src={SITE_ASSETS.logoC} alt="टाकम stamp" className="absolute -top-9 -left-5 h-20 w-20 -rotate-12 drop-shadow-[3px_3px_0_rgba(30,27,22,.3)]" /><Sparkles className="h-8 w-8 mx-auto" /><h2 className="font-display font-extrabold mt-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>तुमचा दिवस निवडा.<br />बाकी आम्ही बघतो.</h2><p className="max-w-xl mx-auto mt-4 font-semibold text-lg">Fresh Ganapati batches, made in our home kitchen. Pre-order करून तुमचा favourite Modak reserve करा.</p><div className="mt-6 flex flex-wrap justify-center gap-4"><a href="#collection" className="sticker-btn bg-white px-6 py-3 text-lg inline-flex gap-2 items-center rotate-1">सगळे मोदक बघा <ArrowRight className="h-5 w-5" /></a></div></div></div>
        </section>
      </main>

      <footer className="border-t-[3px] border-ink bg-ink text-cream relative overflow-hidden"><div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10"><div className="flex items-center gap-4"><img src={SITE_ASSETS.logoC} alt="टाकम badge" className="h-16 w-16 -rotate-6" /><div><p className="font-display font-extrabold text-2xl">टाकम</p><p className="text-sm opacity-80 font-semibold">घरगुती । चविष्ट । मस्त</p></div></div><p className="text-sm opacity-80 font-semibold text-center">Made with ❤️ in Maharashtra</p></div></footer>
    </div>
  );
}
