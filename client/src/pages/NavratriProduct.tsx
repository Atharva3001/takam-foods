/*
 * TAKAM - Individual Navratri product detail pages
 * Product photos are placeholders for now and can be swapped when the owner supplies images.
 */
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { Link, useParams } from "wouter";
import { MobileNav } from "@/components/MobileNav";
import { PHONE, SITE_ASSETS } from "@/lib/products";
import NotFound from "@/pages/NotFound";

const items = [
  { slug: "upvas-gulabjam", name: "उपवास गुलाबजाम", english: "Upvas Gulabjam", quantity: "125 ग्रॅम · 6 नग", price: 104, emoji: "🍮", tone: "bg-peach", note: "Soft, sweet & irresistible", story: "उपवासाच्या मेन्यूमधला गोड, घरगुती treat. चविष्ट गुलाबजामचा आस्वाद सणासुदीच्या क्षणांसोबत घ्या.", facts: ["प्रमाण: 125 ग्रॅम", "6 नग", "किंमत: ₹104"] },
  { slug: "upvas-aappe", name: "उपवास आप्पे", english: "Upvas Aappe", quantity: "150 ग्रॅम · 7 नग", price: 65, emoji: "🥘", tone: "bg-mint", note: "Crispy outside, soft inside", story: "उपवासासाठी बनवलेले आप्पे - बाहेरून छान आणि आतून मऊ. चटणीसोबत snack म्हणून enjoy करा.", facts: ["प्रमाण: 150 ग्रॅम", "7 नग", "किंमत: ₹65"] },
  { slug: "upvas-idali", name: "उपवास इडली", english: "Upvas Idali", quantity: "44 ग्रॅम · 2 नग", price: 31, emoji: "🍘", tone: "bg-white", note: "Light, soft & wholesome", story: "उपवासाच्या वेळेसाठी हलका आणि मऊ पर्याय. दोन इडल्यांचा छोटा, सोयीस्कर portion.", facts: ["प्रमाण: 44 ग्रॅम", "2 नग", "किंमत: ₹31"] },
  { slug: "upvas-dhokala", name: "उपवास ढोकळा", english: "Upvas Dhokala", quantity: "200 ग्रॅम · 10 नग", price: 59, emoji: "🟨", tone: "bg-mascot", note: "Fluffy, flavourful & filling", story: "मऊ, स्पंजी आणि चविष्ट उपवास ढोकळा - घरगुती फराळाच्या ताटात छान भर घालणारा.", facts: ["प्रमाण: 200 ग्रॅम", "10 नग", "किंमत: ₹59"] },
  { slug: "sweet-lal-bhopala-gharge", name: "लाल भोपळ्याचे गोड घारगे", english: "Sweet Lal Bhopala Gharge", quantity: "2 नग", price: 58, emoji: "🎃", tone: "bg-peach", note: "Traditional taste, sweet twist", story: "लाल भोपळ्याच्या घारग्यांचा पारंपरिक गोड प्रकार - सणासुदीच्या घरगुती चवीची आठवण करून देणारा.", facts: ["प्रमाण: 2 नग", "किंमत: ₹58"] },
  { slug: "spicy-lal-bhopala-gharge", name: "लाल भोपळ्याचे तिखट घारगे", english: "Spicy Lal Bhopala Gharge", quantity: "2 नग", price: 59, emoji: "🌶️", tone: "bg-mint", note: "Traditional taste, spicy kick", story: "लाल भोपळ्याच्या घारग्यांचा तिखट पर्याय - ज्यांना उपवासात चटपटीत चव आवडते त्यांच्यासाठी.", facts: ["प्रमाण: 2 नग", "किंमत: ₹59"] },
  { slug: "upvas-dahi-wada", name: "उपवास दही वडे", english: "Upvas Dahi Wada", quantity: "45 ग्रॅम · 2 नग", price: 46, emoji: "🥣", tone: "bg-white", note: "Soft, tangy and refreshing", story: "दह्याची थंडगार चव आणि मऊ वडे - उपवासाच्या मेन्यूतील एक चविष्ट पर्याय.", facts: ["प्रमाण: 45 ग्रॅम", "2 नग", "किंमत: ₹46"] },
  { slug: "upvas-kachori", name: "उपवास कचोरी", english: "Upvas Kachori", quantity: "70 ग्रॅम · 2 नग", price: 56, emoji: "🥟", tone: "bg-peach", note: "A crisp, savoury fasting snack", story: "खमंग आणि कुरकुरीत उपवास कचोरी - छोट्या snack साठी छान पर्याय.", facts: ["प्रमाण: 70 ग्रॅम", "2 नग", "किंमत: ₹56"] },
  { slug: "upvas-medu-vada", name: "उपवास मेदू वडा", english: "Upvas Medu Vada", quantity: "45 ग्रॅम · 2 नग", price: 46, emoji: "🍩", tone: "bg-mint", note: "Golden, savoury and satisfying", story: "सोनेरी, चविष्ट उपवास मेदू वडा - गरमागरम snack म्हणून enjoy करा.", facts: ["प्रमाण: 45 ग्रॅम", "2 नग", "किंमत: ₹46"] },
  { slug: "dry-fruit-roll", name: "ड्रायफ्रूट रोल", english: "Dry Fruit Roll", quantity: "250 ग्रॅम · 8 नग", price: 461, emoji: "🍫", tone: "bg-peach", note: "A rich, nutty festive bite", story: "ड्रायफ्रूट्सची समृद्ध चव असलेला रोल - पाहुणचारासाठी किंवा स्वतःसाठी खास festive treat.", facts: ["प्रमाण: 250 ग्रॅम", "8 नग", "किंमत: ₹461"] },
  { slug: "dink-ladoo", name: "डिंक लाडू", english: "Dink Ladoo", quantity: "250 ग्रॅम · 8 नग", price: 357, emoji: "🟤", tone: "bg-mascot", note: "A traditional homemade favourite", story: "डिंक लाडू हा पारंपरिक घरगुती लाडू - सणासुदीच्या फराळात आणि कुटुंबासोबत शेअर करण्यासाठी छान पर्याय.", facts: ["प्रमाण: 250 ग्रॅम", "8 नग", "किंमत: ₹357"] },
  { slug: "aaliv-ladoo", name: "अळीव लाडू", english: "Aaliv Ladoo", quantity: "250 ग्रॅम · 8 नग", price: 242, emoji: "🤎", tone: "bg-mint", note: "A classic homemade ladoo", story: "अळीव लाडूची घरगुती चव - छोट्या portion मध्ये पारंपरिक फराळाचा आनंद.", facts: ["प्रमाण: 250 ग्रॅम", "8 नग", "किंमत: ₹242"] },
  { slug: "dry-fruit-ladoo", name: "ड्रायफ्रूट लाडू", english: "Dry Fruit Ladoo", quantity: "250 ग्रॅम · 8 नग", price: 433, emoji: "🥜", tone: "bg-peach", note: "Loaded with nutty goodness", story: "ड्रायफ्रूट्सची चव आणि लाडूचा familiar comfort - उत्सवात शेअर करायला किंवा भेट म्हणून द्यायला छान.", facts: ["प्रमाण: 250 ग्रॅम", "8 नग", "किंमत: ₹433"] },
  { slug: "upvas-combo", name: "उपवास कॉम्बो", english: "Upvas Combo", quantity: "1 कॉम्बो", price: 145, emoji: "🍮 🟨 🍘", tone: "bg-peach", note: "Three fasting favourites, one combo", story: "एका कॉम्बोमध्ये उपवासाचे तीन आवडीचे पदार्थ - गुलाबजाम, इडली आणि ढोकळा.", facts: ["2 उपवास गुलाबजाम", "2 उपवास इडली", "4 उपवास ढोकळे", "किंमत: ₹145"], combo: true },
];

const wa = (message: string) => `https://wa.me/91${PHONE}?text=${encodeURIComponent(message)}`;

export default function NavratriProduct() {
  const { slug } = useParams<{ slug: string }>();
  const item = items.find((product) => product.slug === slug);
  if (!item) return <NotFound />;

  const message = item.combo
    ? "नमस्कार टाकम! मला ₹145 चा उपवास कॉम्बो ऑर्डर करायचा आहे. कृपया availability confirm करा."
    : `नमस्कार टाकम! मला ${item.name} (₹${item.price}, ${item.quantity}) ऑर्डर करायचे आहे. कृपया availability confirm करा.`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-cream/95 backdrop-blur-sm">
        <div className="container flex items-center justify-between py-2">
          <Link href="/" className="flex items-center gap-2.5 hover:no-underline"><img src={SITE_ASSETS.logoC} alt="टाकम badge" className="h-14 w-14 -rotate-6 md:h-16 md:w-16" /><span className="font-display text-3xl font-extrabold md:text-4xl">टाकम</span></Link>
          <nav className="hidden items-center gap-5 font-display font-bold md:flex"><Link href="/navratri-special" className="hover:underline">Navratri Specials</Link><Link href="/ganapati-modak-special" className="hover:underline">गणपती Special 🙏</Link></nav>
          <MobileNav />
        </div>
      </header>
      <main>
        <div className="container pt-6 text-sm font-display font-bold text-muted-foreground"><Link href="/" className="hover:underline">Home</Link> / <Link href="/navratri-special" className="hover:underline">Navratri Specials</Link> / <span className="text-ink">{item.name}</span></div>
        <section className="py-8 md:py-14">
          <div className="container grid items-start gap-8 md:grid-cols-2 md:gap-12">
            <div className="sticker -rotate-1 bg-white p-3 md:p-5">
              <div className={`flex min-h-[20rem] items-center justify-center border-2 border-ink/10 md:min-h-[30rem] ${item.tone}`}>
                <span className="text-[10rem] md:text-[13rem]" role="img" aria-label={item.english}>{item.emoji}</span>
              </div>
              <p className="mt-3 text-center text-xs font-bold text-muted-foreground">Product photo coming soon - this placeholder will be replaced with your image.</p>
            </div>
            <div className="space-y-5">
              <span className="sticker inline-block -rotate-2 bg-mascot px-3 py-1 font-display text-sm font-bold">🌼 Navratri Special</span>
              <h1 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">{item.name}</h1>
              <p className="font-display text-xl font-bold text-muted-foreground">{item.english}</p>
              <p className="text-lg font-semibold leading-relaxed">{item.note}. {item.story}</p>
              <div className="sticker rotate-1 bg-mint/60 p-5">
                <p className="font-display text-4xl font-extrabold text-tomato">₹{item.price}</p>
                <p className="mt-1 text-lg font-bold">{item.quantity}</p>
                <p className="mt-3 text-sm font-semibold">Made to order · Availability is confirmed by TAKAM after enquiry.</p>
              </div>
              <div className="sticker bg-white p-5">
                <h2 className="font-display text-xl font-extrabold">या item बद्दल</h2>
                <ul className="mt-3 space-y-2 font-semibold">{item.facts.map((fact) => <li key={fact}>✓ {fact}</li>)}</ul>
                {item.combo && <p className="mt-3 font-semibold text-muted-foreground">२ उपवास गुलाबजाम + २ उपवास इडली + ४ उपवास ढोकळे</p>}
              </div>
              <a href={wa(message)} target="_blank" rel="noreferrer" className="sticker-btn inline-flex w-full items-center justify-center gap-2 bg-tomato px-5 py-4 font-display text-lg font-bold text-white"><MessageCircle className="h-5 w-5" /> WhatsApp वर enquiry करा</a>
              <p className="text-center text-sm font-bold text-muted-foreground">WhatsApp: {PHONE}</p>
            </div>
          </div>
        </section>
        <section className="bg-peach/30 py-12 md:py-16">
          <div className="container">
            <div className="mb-7 text-center"><Sparkles className="mx-auto h-7 w-7" /><h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">आणखी Navratri favourites</h2></div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {items.filter((other) => other.slug !== item.slug).slice(0, 8).map((other) => <Link key={other.slug} href={`/navratri/${other.slug}`} className="sticker bg-white p-3 hover:no-underline"><div className={`flex h-24 items-center justify-center text-5xl ${other.tone}`}>{other.emoji}</div><p className="mt-2 font-display font-extrabold leading-tight">{other.name}</p><p className="mt-1 font-display font-extrabold text-tomato">₹{other.price}</p></Link>)}
            </div>
            <div className="mt-8 text-center"><Link href="/navratri-special" className="inline-flex items-center gap-2 font-display font-bold hover:underline"><ArrowLeft className="h-4 w-4" /> सगळे Navratri पदार्थ पाहा</Link></div>
          </div>
        </section>
      </main>
      <footer className="border-t-[3px] border-ink bg-ink text-cream"><div className="container flex flex-col items-center justify-between gap-5 py-8 md:flex-row"><div className="flex items-center gap-3"><img src={SITE_ASSETS.logoC} alt="टाकम" className="h-14 w-14" /><div><p className="font-display text-2xl font-extrabold">टाकम</p><p className="text-sm font-semibold opacity-80">घरगुती • चविष्ट • मस्त</p></div></div><p className="text-sm font-semibold opacity-80">Made with ❤️ in Maharashtra</p><a href={wa("नमस्कार टाकम! मला Navratri Specials बद्दल माहिती हवी आहे.")} target="_blank" rel="noreferrer" className="font-display font-bold underline">WhatsApp: {PHONE}</a></div></footer>
    </div>
  );
}
