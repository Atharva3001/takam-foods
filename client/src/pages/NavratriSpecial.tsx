/*
 * TAKAM - Navratri Specials
 * Sticker Bomb Bazaar theme, adapted for a festive fasting-food collection.
 */
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { MobileNav } from "@/components/MobileNav";
import { PHONE, SITE_ASSETS } from "@/lib/products";

const items = [
  { slug: "upvas-gulabjam", name: "उपवास गुलाबजाम", english: "Upvas Gulabjam", quantity: "125 ग्रॅम · 6 नग", price: 104, emoji: "🍮", image: "/images/navratri/upvas-gulabjam.JPG", tone: "bg-peach", note: "Soft, sweet & irresistible" },
  { slug: "upvas-aappe", name: "उपवास आप्पे", english: "Upvas Aappe", quantity: "150 ग्रॅम · 7 नग", price: 65, emoji: "🥘", image: "/images/navratri/upvas-aapee.jpeg", tone: "bg-mint", note: "Crispy outside, soft inside" },
  { slug: "upvas-idali", name: "उपवास इडली", english: "Upvas Idali", quantity: "44 ग्रॅम · 2 नग", price: 31, emoji: "🍘", image: "/images/navratri/upvas-idali.jpeg", tone: "bg-white", note: "Light, soft & wholesome" },
  { slug: "upvas-dhokala", name: "उपवास ढोकळा", english: "Upvas Dhokala", quantity: "200 ग्रॅम · 10 नग", price: 59, emoji: "🟨", image: "/images/navratri/upvas-dokhala.jpeg", tone: "bg-mascot", note: "Fluffy, flavourful & filling" },
  { slug: "sweet-lal-bhopala-gharge", name: "लाल भोपळ्याचे गोड घारगे", english: "Sweet Lal Bhopala Gharge", quantity: "2 नग", price: 58, emoji: "🎃", image: "/images/navratri/god-ghadage.JPG", tone: "bg-peach", note: "Traditional taste, sweet twist" },
  { slug: "spicy-lal-bhopala-gharge", name: "लाल भोपळ्याचे तिखट घारगे", english: "Spicy Lal Bhopala Gharge", quantity: "2 नग", price: 59, emoji: "🌶️", image: "/images/navratri/god-ghadage.JPG", tone: "bg-mint", note: "Traditional taste, spicy kick" },
  { slug: "upvas-dahi-wada", name: "उपवास दही वडे", english: "Upvas Dahi Wada", quantity: "45 ग्रॅम · 2 नग", price: 46, emoji: "🥣", image: "/images/navratri/upvaas-dahiwada.jpeg", tone: "bg-white", note: "Soft, tangy and refreshing" },
  { slug: "upvas-kachori", name: "उपवास कचोरी", english: "Upvas Kachori", quantity: "70 ग्रॅम · 2 नग", price: 56, emoji: "🥟", image: "/images/navratri/upvas-kachori.jpeg", tone: "bg-peach", note: "A crisp, savoury fasting snack" },
  { slug: "upvas-medu-vada", name: "उपवास मेदू वडा", english: "Upvas Medu Vada", quantity: "45 ग्रॅम · 2 नग", price: 46, emoji: "🍩", image: "/images/navratri/upvaas-meduwada.jpeg", tone: "bg-mint", note: "Golden, savoury and satisfying" },
  { slug: "dink-ladoo", name: "डिंक लाडू", english: "Dink Ladoo", quantity: "250 ग्रॅम · 8 नग", price: 357, emoji: "🟤", tone: "bg-mascot", note: "A traditional homemade favourite" },
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
        <section className="relative isolate overflow-hidden bg-[#211b18] py-12 text-cream md:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-tomato via-mascot to-mint" />
          <div className="pointer-events-none absolute -left-16 bottom-[-4rem] h-56 w-56 rounded-full border-[5px] border-ink bg-mascot md:h-72 md:w-72" />
          <div className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-full border-[5px] border-ink bg-tomato md:h-80 md:w-80" />
          <div className="pointer-events-none absolute left-[43%] top-12 hidden h-20 w-20 rotate-12 rounded-full border-2 border-peach/50 md:block" />
          <div className="container relative z-10 grid items-center gap-10 md:grid-cols-[1.05fr_.95fr]">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="sticker inline-block -rotate-2 bg-mascot px-4 py-1.5 font-display text-sm font-extrabold text-ink">🌼 नवरात्री विशेष</span>
                <span className="text-sm font-bold tracking-wide text-peach">उपवास मेन्यू · घरगुती चव</span>
              </div>
              <h1 className="font-display text-5xl font-extrabold leading-[.98] md:text-7xl lg:text-8xl">नवरात्रीची<br /><span className="text-mascot">उपवासाची</span><br />चविष्ट मेजवानी!</h1>
              <p className="max-w-xl text-base font-semibold leading-relaxed text-cream/85 md:text-xl">उपवासासाठी खास, घरगुती प्रेमाने तयार केलेले टाकमचे आवडीचे पदार्थ. मेन्यू पाहा, तुमचा आवडता पदार्थ निवडा आणि WhatsApp वर ऑर्डरची चौकशी करा.</p>
              <div className="flex flex-wrap gap-3 pt-1">
                <a href="#menu" className="sticker-btn inline-flex items-center gap-2 bg-mascot px-5 py-3 font-display text-lg font-extrabold text-ink">मेन्यू पाहा <ArrowRight className="h-5 w-5" /></a>
                <a href={whatsappUrl("नमस्कार टाकम! मला नवरात्रीच्या उपवास स्पेशल पदार्थांबद्दल माहिती हवी आहे.")} target="_blank" rel="noreferrer" className="sticker-btn inline-flex items-center gap-2 bg-tomato px-5 py-3 font-display text-lg font-bold text-white"><MessageCircle className="h-5 w-5" /> WhatsApp करा</a>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="sticker bg-peach px-3 py-1 font-display text-sm font-bold text-ink">घरगुती चव</span>
                <span className="sticker bg-mint px-3 py-1 font-display text-sm font-bold text-ink">ताजे बनवलेले</span>
                <span className="sticker bg-white px-3 py-1 font-display text-sm font-bold text-ink">प्रेमाने तयार</span>
              </div>
            </div>
            <div className="relative mx-auto flex min-h-[22rem] w-full max-w-lg items-center justify-center md:min-h-[30rem]">
              <div className="absolute h-64 w-64 rounded-full border-[5px] border-ink bg-peach md:h-80 md:w-80" />
              <div className="absolute h-72 w-72 rounded-full border-2 border-dashed border-mascot md:h-[22rem] md:w-[22rem]" />
              <div className="relative grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { name: "उपवास गुलाबजाम", image: "/images/navratri/upvas-gulabjam.JPG", tone: "bg-white -rotate-6" },
                  { name: "उपवास कचोरी", image: "/images/navratri/upvas-kachori.jpeg", tone: "bg-mascot rotate-3" },
                  { name: "उपवास दही वडे", image: "/images/navratri/upvaas-dahiwada.jpeg", tone: "bg-mint rotate-3" },
                  { name: "घारगे", image: "/images/navratri/god-ghadage.JPG", tone: "bg-peach -rotate-3" },
                ].map((product) => <div key={product.name} className={`sticker relative flex h-28 w-28 items-center justify-center overflow-hidden border-2 border-ink p-2 md:h-36 md:w-36 ${product.tone}`}><img src={product.image} alt={product.name} className="h-full w-full rounded-lg object-cover" loading="lazy" /></div>)}
              </div>
              <span className="sticker absolute bottom-1 right-0 rotate-3 bg-white px-4 py-2 font-display text-sm font-extrabold text-ink md:bottom-3">उपवासातही टाकमसोबत! ❤️</span>
              <span className="absolute left-2 top-8 text-3xl text-mascot" aria-hidden="true">✦</span>
              <span className="absolute right-3 top-10 text-3xl text-peach" aria-hidden="true">✧</span>
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
                  <div className={`relative flex aspect-video w-full items-center justify-center overflow-hidden border-2 border-ink/10 ${item.tone}`}>
                    {item.image ? <img src={item.image} alt={item.english} loading="lazy" className="h-full w-full object-contain" /> : <span className="text-8xl drop-shadow-md" aria-hidden="true">{item.emoji}</span>}
                    <span className="absolute right-2 top-2 rounded-full border-2 border-ink bg-white px-2 py-1 text-xs font-extrabold">Navratri Special</span>
                  </div>
                  <div className="pt-4">
                    <Link href={`/navratri/${item.slug}`} className="hover:underline"><h3 className="font-display text-2xl font-extrabold leading-tight">{item.name}</h3></Link>
                    <p className="mt-1 text-sm font-bold text-muted-foreground">{item.english}</p>
                    <p className="mt-2 text-sm font-semibold">{item.note}</p><Link href={`/navratri/${item.slug}`} className="mt-2 inline-block font-display text-sm font-extrabold underline decoration-2 underline-offset-4">View product details ↗</Link>
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
            <div className="sticker mx-auto max-w-4xl bg-white p-6 md:p-10">
              <div className="mx-auto max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="sticker inline-block -rotate-2 bg-mascot px-3 py-1 font-display text-sm font-bold">Combo deal ✨</span>
                  <span className="text-sm font-bold uppercase tracking-wide text-muted-foreground">उपवास स्पेशल</span>
                </div>
                <Link href="/navratri/upvas-combo" className="mt-3 inline-block hover:underline"><h2 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">उपवास कॉम्बो</h2></Link>
                <p className="mt-2"><Link href="/navratri/upvas-combo" className="font-display font-semibold underline underline-offset-4">कॉम्बोची सविस्तर माहिती ↗</Link></p>
                <div className="mt-6 rounded-xl border-2 border-ink/10 bg-cream/60 p-4 md:p-5">
                  <p className="text-base font-extrabold md:text-lg">एका कॉम्बोमध्ये</p>
                  <ul className="mt-3 grid gap-3 font-semibold sm:grid-cols-2">
                    <li className="flex items-start gap-2"><span className="font-extrabold text-tomato">✓</span><span>२ उपवास गुलाबजाम</span></li><li className="flex items-start gap-2"><span className="font-extrabold text-tomato">✓</span><span>२ उपवास इडली</span></li><li className="flex items-start gap-2"><span className="font-extrabold text-tomato">✓</span><span>४ उपवास ढोकळे</span></li>
                  </ul>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <span className="font-display text-4xl font-extrabold text-tomato">₹145</span>
                  <a href={whatsappUrl("नमस्कार टाकम! मला ₹145 चा उपवास कॉम्बो ऑर्डर करायचा आहे. कृपया availability confirm करा.")} target="_blank" rel="noreferrer" className="sticker-btn inline-flex items-center gap-2 bg-tomato px-5 py-3 font-display font-bold text-white"><MessageCircle className="h-5 w-5" /> कॉम्बो enquire करा</a>
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
