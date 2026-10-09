/*
 * TAKAM - Navratri Specials
 * Sticker Bomb Bazaar theme, adapted for a festive fasting-food collection.
 */
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { MobileNav } from "@/components/MobileNav";
import { PHONE, SITE_ASSETS } from "@/lib/products";

const items = [
  { name: "उपवास गुलाबजाम", english: "Upvas Gulabjam", quantity: "125 ग्रॅम · 6-7 नग", price: 295, emoji: "🍮", tone: "bg-peach", note: "Soft, sweet & irresistible" },
  { name: "उपवास आप्पे", english: "Upvas Aappe", quantity: "150 ग्रॅम · 6-7 नग", price: 285, emoji: "🥘", tone: "bg-mint", note: "Crispy outside, soft inside" },
  { name: "उपवास इडली", english: "Upvas Idali", quantity: "45 ग्रॅम · 2 नग", price: 98, emoji: "🍘", tone: "bg-white", note: "Light, soft & wholesome" },
  { name: "उपवास ढोकळा", english: "Upvas Dhokala", quantity: "150 ग्रॅम · 6-7 नग", price: 285, emoji: "🟨", tone: "bg-mascot", note: "Fluffy, flavourful & filling" },
  { name: "लाल भोपळ्याचे गोड घारगे", english: "Sweet Lal Bhopala Gharge", quantity: "50 ग्रॅम · 2 नग", price: 105, emoji: "🎃", tone: "bg-peach", note: "Traditional taste, sweet twist" },
  { name: "लाल भोपळ्याचे तिखट घारगे", english: "Spicy Lal Bhopala Gharge", quantity: "50 ग्रॅम · 2 नग", price: 105, emoji: "🌶️", tone: "bg-mint", note: "Traditional taste, spicy kick" },
  { name: "ड्रायफ्रूट रोल", english: "Dry Fruit Roll", quantity: "250 ग्रॅम · 6-8 नग", price: 450, emoji: "🍫", tone: "bg-peach", note: "A rich, nutty festive bite" },
  { name: "डिंक लाडू", english: "Dink Ladoo", quantity: "250 ग्रॅम · 8-10 नग", price: 345, emoji: "🟤", tone: "bg-mascot", note: "A traditional homemade favourite" },
  { name: "अळीव लाडू", english: "Aaliv Ladoo", quantity: "250 ग्रॅम · 8-10 नग", price: 235, emoji: "🤎", tone: "bg-mint", note: "A classic homemade ladoo" },
  { name: "ड्रायफ्रूट लाडू", english: "Dry Fruit Ladoo", quantity: "250 ग्रॅम · 8-10 नग", price: 425, emoji: "🥜", tone: "bg-peach", note: "Loaded with nutty goodness" },
];

const whatsappUrl = (message: string) =>
  `https://wa.me/91${PHONE}?text=${encodeURIComponent(message)}`;

export default function NavratriSpecial() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-cream/95 backdrop-blur-sm">
        <div className="container flex items-center justify-between py-2">
          <Link href="/" className="flex items-center gap-2.5 hover:no-underline">
            <img src={SITE_ASSETS.logoC} alt="टाकम badge" className="h-14 w-14 -rotate-6 md:h-16 md:w-16" />
            <span className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">टाकम</span>
          </Link>
          <nav className="hidden items-center gap-6 font-display font-bold md:flex">
            <a href="#menu" className="underline-offset-4 hover:underline">मेन्यू</a>
            <a href="#combo" className="underline-offset-4 hover:underline">उपवास कॉम्बो</a>
          </nav>
          <MobileNav />
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-ink py-12 text-cream md:py-20">
          <div className="absolute -left-12 bottom-0 h-48 w-48 rounded-full border-[4px] border-ink bg-mascot md:h-64 md:w-64" />
          <div className="absolute -right-12 -top-10 h-52 w-52 rotate-12 rounded-full border-[4px] border-ink bg-tomato md:h-72 md:w-72" />
          <div className="container relative z-10 grid items-center gap-8 md:grid-cols-[1.1fr_.9fr]">
            <div className="space-y-5">
              <span className="sticker inline-block -rotate-2 bg-mascot px-3 py-1 font-display text-sm font-bold text-ink">🌼 Navratri Specials</span>
              <h1 className="font-display text-6xl font-extrabold leading-[.92] md:text-8xl">उपवासाची<br /><span className="text-mascot">चविष्ट</span><br />मेजवानी!</h1>
              <p className="max-w-xl text-lg font-semibold text-cream/85 md:text-xl">उपवासासाठी खास, घरगुती प्रेमाने तयार केलेले TAKAM चे Navratri specials. तुमचे आवडते पदार्थ निवडा आणि WhatsApp वर enquiry पाठवा.</p>
              <div className="flex flex-wrap gap-3">
                <a href="#menu" className="sticker-btn inline-flex items-center gap-2 bg-mascot px-5 py-3 font-display text-lg font-bold text-ink">मेन्यू पाहा <ArrowRight className="h-5 w-5" /></a>
                <a href={whatsappUrl("नमस्कार टाकम! मला Navratri Specials बद्दल माहिती हवी आहे.")} target="_blank" rel="noreferrer" className="sticker-btn inline-flex items-center gap-2 bg-tomato px-5 py-3 font-display text-lg font-bold text-white"><MessageCircle className="h-5 w-5" /> WhatsApp करा</a>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="sticker bg-peach px-3 py-1 font-display text-sm font-bold text-ink">Freshly Made</span>
                <span className="sticker bg-mint px-3 py-1 font-display text-sm font-bold text-ink">Pure Ingredients</span>
                <span className="sticker bg-white px-3 py-1 font-display text-sm font-bold text-ink">Made with Love</span>
              </div>
            </div>
            <div className="relative mx-auto flex min-h-72 w-full max-w-lg items-center justify-center md:min-h-[26rem]">
              <div className="absolute h-64 w-64 rotate-6 rounded-full border-[5px] border-ink bg-peach md:h-80 md:w-80" />
              <div className="relative grid grid-cols-2 gap-3">
                {["🍮", "🥘", "🍘", "🎃"].map((emoji, i) => <div key={emoji} className={`sticker flex h-28 w-28 items-center justify-center text-6xl md:h-36 md:w-36 ${["bg-white -rotate-6", "bg-mascot rotate-6", "bg-mint rotate-3", "bg-peach -rotate-3"][i]}`}>{emoji}</div>)}
              </div>
              <span className="sticker absolute bottom-4 right-0 rotate-6 bg-white px-3 py-2 font-display font-extrabold text-ink">उपवासातही टाकमसोबत! ❤️</span>
            </div>
          </div>
        </section>

        <section id="menu" className="py-14 md:py-20">
          <div className="container">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <span className="sticker inline-block rotate-2 bg-mint px-4 py-1.5 font-display text-sm font-bold">✨ The Navratri menu</span>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight md:text-6xl">उपवासाचे favourites,<br />एकाच ठिकाणी!</h2>
              <p className="mt-3 text-lg font-semibold text-muted-foreground">प्रत्येक पदार्थासोबत standard quantity आणि किंमत दिली आहे.</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <article key={item.english} className={`sticker bg-white p-4 md:p-5 ${index % 3 === 0 ? "-rotate-1" : index % 3 === 1 ? "rotate-1" : "-rotate-[.5deg]"}`}>
                  <div className={`relative flex h-40 items-center justify-center overflow-hidden border-2 border-ink/10 ${item.tone}`}>
                    <span className="text-8xl drop-shadow-md" aria-hidden="true">{item.emoji}</span>
                    <span className="absolute right-2 top-2 rounded-full border-2 border-ink bg-white px-2 py-1 text-xs font-extrabold">Navratri Special</span>
                  </div>
                  <div className="pt-4">
                    <h3 className="font-display text-2xl font-extrabold leading-tight">{item.name}</h3>
                    <p className="mt-1 text-sm font-bold text-muted-foreground">{item.english}</p>
                    <p className="mt-2 text-sm font-semibold">{item.note}</p>
                    <div className="mt-4 flex items-end justify-between gap-3 border-t-2 border-dashed border-ink/20 pt-3">
                      <div><p className="font-display text-2xl font-extrabold text-tomato">₹{item.price}</p><p className="text-sm font-bold text-muted-foreground">{item.quantity}</p></div>
                      <a href={whatsappUrl(`नमस्कार टाकम! मला ${item.name} (₹${item.price}, ${item.quantity}) ऑर्डर करायचे आहे. कृपया details सांगा.`)} target="_blank" rel="noreferrer" className="sticker-btn bg-mascot px-3 py-2 font-display text-sm font-bold text-ink">Enquire ↗</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="combo" className="bg-mint/35 py-14 md:py-20">
          <div className="container">
            <div className="sticker mx-auto grid max-w-5xl items-center gap-6 bg-white p-5 md:grid-cols-[.8fr_1.2fr] md:p-8">
              <div className="flex min-h-52 items-center justify-center border-2 border-ink/10 bg-peach text-8xl">🍮 🟨 🍘</div>
              <div>
                <span className="sticker inline-block -rotate-2 bg-mascot px-3 py-1 font-display text-sm font-bold">Combo deal ✨</span>
                <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">उपवास कॉम्बो</h2>
                <p className="mt-2 text-lg font-semibold">एका कॉम्बोमध्ये:</p>
                <ul className="mt-3 space-y-2 font-bold">
                  <li>✓ २ गुलाबजाम</li><li>✓ ४ ढोकळे</li><li>✓ २ इडल्या</li><li>✓ नारळाची चटणी</li>
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <span className="font-display text-4xl font-extrabold text-tomato">₹350</span>
                  <a href={whatsappUrl("नमस्कार टाकम! मला ₹350 चा उपवास कॉम्बो ऑर्डर करायचा आहे. कृपया availability confirm करा.")} target="_blank" rel="noreferrer" className="sticker-btn inline-flex items-center gap-2 bg-tomato px-5 py-3 font-display font-bold text-white"><MessageCircle className="h-5 w-5" /> कॉम्बो enquire करा</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container">
            <div className="sticker mx-auto max-w-4xl rotate-1 bg-mascot p-7 text-center md:p-12">
              <Sparkles className="mx-auto h-8 w-8" />
              <h2 className="mt-3 font-display text-4xl font-extrabold md:text-6xl">या Navratri ला,<br />घरगुती चव निवडा!</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold">तुमचा favourite पदार्थ निवडा आणि order details WhatsApp वर पाठवा. Order confirmation आणि availability साठी आमच्याशी संपर्क साधा.</p>
              <a href={whatsappUrl("नमस्कार टाकम! मला Navratri Specials ऑर्डर करायचे आहेत.")} target="_blank" rel="noreferrer" className="sticker-btn mt-6 inline-flex items-center gap-2 bg-white px-6 py-3 font-display text-lg font-bold"><MessageCircle className="h-5 w-5" /> WhatsApp: {PHONE}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-[3px] border-ink bg-ink text-cream">
        <div className="container flex flex-col items-center justify-between gap-5 py-8 md:flex-row">
          <div className="flex items-center gap-3"><img src={SITE_ASSETS.logoC} alt="टाकम" className="h-14 w-14" /><div><p className="font-display text-2xl font-extrabold">टाकम</p><p className="text-sm font-semibold opacity-80">घरगुती • चविष्ट • मस्त</p></div></div>
          <p className="text-center text-sm font-semibold opacity-80">Made with ❤️ in Maharashtra</p>
          <a href={whatsappUrl("नमस्कार टाकम! मला Navratri Specials बद्दल माहिती हवी आहे.")} target="_blank" rel="noreferrer" className="font-display font-bold underline">WhatsApp: {PHONE}</a>
        </div>
      </footer>
    </div>
  );
}
