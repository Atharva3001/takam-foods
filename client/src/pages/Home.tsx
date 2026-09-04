/*
 * TAKAM - Sticker Bomb Bazaar theme (v2 after style review)
 * - Sticker-board chaos: overlaps, tilts, floating badges in EVERY section
 * - Product photos = polaroid stickers (tape, tilt, doodle badges)
 * - Red-orange #E85D3D ONLY on ordering CTAs; yellow/mint/peach for emphasis
 * - Loud brand chrome (big header wordmark, footer stamp)
 * - Minglish voice everywhere incl. nav + labels
 */
import { MessageCircle, Sparkles, Heart, Leaf, ChefHat, Star } from "lucide-react";
import { Link } from "wouter";
import { MobileNav } from "@/components/MobileNav";

const PHONE = "9371055473";

const ASSETS = {
  logoA: "/images/takam_logo_A_transparent.webp",
  logoC: "/images/takam_logo_C_transparent.webp",
  suraliVadi: "/images/surali-vadi-1.jpeg",
  gulabJamun: "/images/gulab-jamun-3.jpeg",
  alivLadu: "/images/aalive-ladu-2.jpeg",
  heroBg: "/images/takam_hero_bg.webp",
  kitchen: "/images/takam_kitchen_illustration.webp",
};

const ganapatiModaks = [
  { slug: "dink-modak", marathi: "डिंक मोदक", english: "Dink Modak", image: "/images/takam_modak_dink_v2.webp", vibe: "💪 ताकद वाला", rotate: "-rotate-2" },
  { slug: "nachni-modak", marathi: "नाचणी मोदक", english: "Nachni Modak", image: "/images/takam_modak_nachni_v2.webp", vibe: "🏋️ Health buddy", rotate: "rotate-2" },
  { slug: "dryfruit-modak", marathi: "ड्रायफ्रुट मोदक", english: "Dryfruit Modak", image: "/images/takam_modak_dryfruit_v2.webp", vibe: "👑 Premium pick", rotate: "-rotate-1" },
  { slug: "beet-modak", marathi: "बीट मोदक", english: "Beet Modak", image: "/images/takam_modak_beet_v2.webp", vibe: "💗 Pink icon", rotate: "rotate-1" },
  { slug: "poshtik-modak", marathi: "पोष्टीक मोदक", english: "Poshtik Modak", image: "/images/takam_modak_poshtik_v2.webp", vibe: "🦸 All-rounder", rotate: "-rotate-2" },
  { slug: "tilkund-modak", marathi: "तीळकुंद मोदक", image: "/images/takam_modak_tilkund_v2.webp", english: "Tilkund Modak", vibe: "🔥 Tiny, mighty", rotate: "rotate-2" },
  { slug: "gulkand-modak", marathi: "गुलकंद मोदक", english: "Gulkand Modak", image: "/images/takam_modak_gulkand_v2.webp", vibe: "🌹 Sweetheart", rotate: "-rotate-1" },
];

function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = items.join("  ✦  ") + "  ✦  ";
  return (
    <div className={`marquee py-3 ${className}`}>
      <div className="marquee-track font-display font-bold text-lg tracking-wide">
        <span>{row}</span>
        <span>{row}</span>
      </div>
    </div>
  );
}

/** Washi-tape strip for polaroid photos */
function Tape({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute w-20 h-5 bg-mint/80 border-2 border-ink/20 ${className}`}
      style={{ clipPath: "polygon(3% 0, 97% 6%, 100% 100%, 0 94%)" }}
    />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* ---------- Header: loud brand chrome ---------- */}
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b-[3px] border-ink">
        <div className="container flex items-center justify-between py-2">
          <a href="#top" className="flex items-center gap-2.5">
            <img
              src={ASSETS.logoC}
              alt="टाकम badge"
              decoding="async"
              fetchPriority="high"
              className="h-14 w-14 md:h-16 md:w-16 -rotate-6 drop-shadow-[3px_3px_0_rgba(30,27,22,0.35)]"
            />
            <span className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">
              टाकम
              <span className="ml-2 hidden lg:inline-block bg-mascot border-[2.5px] border-ink rounded-full px-2.5 py-0 text-xs align-middle rotate-2">
                खमंग HQ
              </span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 font-display font-bold">
            <a href="#story" className="hover:underline decoration-[3px] decoration-mint underline-offset-4">आमची गोष्ट</a>
            <Link href="/ganapati-modak-special" className="hover:underline decoration-[3px] decoration-peach underline-offset-4">गणपती Special 🙏</Link>
          </nav>
          <MobileNav />
        </div>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section
          className="relative"
          style={{
            backgroundImage: `url(${ASSETS.heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container grid md:grid-cols-2 gap-10 items-center py-14 md:py-20">
            {/* Left: headline stack */}
            <div className="space-y-6">
              <div className="inline-block sticker -rotate-2 bg-mint px-4 py-1.5 font-display font-bold text-sm pop-in">
                💯 घरगुती • Homemade • No uncle-ji energy
              </div>
              <h1
                className="font-display font-extrabold leading-[1.05] text-ink pop-in"
                style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)", animationDelay: "60ms" }}
              >
                आजीच्या हातची चव.
                <br />
                <span className="relative inline-block -rotate-1">
                  <span className="relative z-10">तुमच्या दारात.</span>
                  <span className="absolute bottom-1.5 left-0 w-full h-4 md:h-5 bg-mascot -z-0 -rotate-1" />
                </span>
              </h1>
              <p className="text-lg md:text-xl font-semibold text-muted-foreground max-w-md pop-in" style={{ animationDelay: "120ms" }}>
                Authentic Marathi snacks, made at home with real ingredients and zero shortcuts. Swiggy कशाला? टाकमला WhatsApp करा! 😋
              </p>
              <div className="flex flex-wrap gap-4 pop-in" style={{ animationDelay: "180ms" }}>
                <a
                  href="#modaks"
                  className="sticker-btn bg-mascot px-7 py-3 text-lg flex items-center gap-2 rotate-1"
                >
                  मोदक बघा 👀
                </a>
              </div>
            </div>

            {/* Right: mascot + floating stickers */}
            <div className="relative flex justify-center items-center">
              <div className="absolute -top-4 right-6 sticker rotate-3 bg-peach px-3 py-1 font-display font-bold text-sm hidden md:block z-10">
                एकदम fresh! ✨
              </div>
              <div className="absolute top-1/3 -left-2 sticker -rotate-6 bg-mascot px-3 py-1 font-display font-bold text-sm hidden lg:block z-10">
                खमंग 🔥
              </div>
              <div className="absolute bottom-2 left-8 sticker -rotate-2 bg-white px-3 py-1 font-display font-bold text-sm hidden md:block z-10">
                Made with ❤️ in Maharashtra
              </div>
              <img
                src={ASSETS.logoA}
                alt="टाकम mascot - Surali Vadi with sunglasses"
                decoding="async"
                fetchPriority="high"
                className="w-72 md:w-[26rem] mascot-bob drop-shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* ---------- Marquee divider ---------- */}
        <Marquee
          items={["घरगुती", "चविष्ट", "मस्त", "टाकम", "100% Homemade", "Marathi Pride"]}
          className="bg-mascot -rotate-1 scale-x-105 relative z-10"
        />

        {/* ---------- Ganapati Modak collection ---------- */}
        <section id="modaks" className="py-16 md:py-24 bg-mint/25 relative overflow-hidden">
          <div className="absolute top-9 left-[6%] sticker -rotate-6 bg-mascot px-3 py-1 font-display font-bold text-sm hidden lg:block">
            बाप्पा special 🙏
          </div>
          <div className="absolute top-14 right-[7%] sticker rotate-6 bg-peach px-3 py-1 font-display font-bold text-sm hidden lg:block">
            7 flavours. Full feels. ✨
          </div>
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
              <div className="inline-block sticker -rotate-2 bg-white px-4 py-1.5 font-display font-bold text-sm mb-4">
                🙏 Ganapati Modak Collection
              </div>
              <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: "clamp(2rem, 4.7vw, 3.5rem)" }}>
                मोदक बोलतोय... <span className="relative inline-block rotate-1"><span className="relative z-10">ऐकणार का?</span><span className="absolute bottom-1 left-0 h-3.5 w-full bg-mascot -z-0" /></span>
              </h2>
              <p className="mt-3 font-semibold text-lg text-muted-foreground">
                सात flavours, सात personalities - Ganapati season साठी full Takam energy.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 max-w-6xl mx-auto">
              {ganapatiModaks.map((modak, i) => (
                <Link
                  key={modak.slug}
                  href={`/product/${modak.slug}`}
                  className={`sticker ${modak.rotate} bg-white p-3 md:p-4 hover:no-underline group`}
                  style={{ animationDelay: `${i * 65}ms` }}
                >
                  <div className="relative h-36 sm:h-44 md:h-48 flex items-center justify-center rounded-lg bg-peach/25 border-2 border-ink/10 overflow-hidden">
                    <img src={modak.image} alt={`${modak.marathi} mascot`} loading="lazy" decoding="async" className="h-[115%] w-full object-contain transition-transform duration-200 group-hover:scale-110" />
                    <span className="absolute bottom-1.5 right-1.5 border-2 border-ink rounded-full bg-mascot px-2 py-0.5 font-display font-bold text-[10px] md:text-xs -rotate-3">
                      {modak.vibe}
                    </span>
                  </div>
                  <div className="pt-3 px-1">
                    <p className="font-display font-extrabold text-base md:text-lg leading-tight">{modak.marathi}</p>
                    <p className="font-bold text-xs text-muted-foreground">{modak.english}</p>
                  </div>
                </Link>
              ))}
              <Link href="/product/ukadiche-modak" className="sticker rotate-2 bg-mascot p-3 md:p-4 flex flex-col justify-between hover:no-underline">
                <div className="text-4xl md:text-5xl">✨</div>
                <div>
                  <p className="font-display font-extrabold text-base md:text-lg leading-tight">उकडीचे मोदक</p>
                  <p className="font-bold text-xs">The OG Star</p>
                </div>
              </Link>
            </div>

            <div className="text-center mt-11 flex flex-wrap justify-center gap-4">
              <Link href="/ganapati-modak-special" className="sticker-btn bg-mascot px-6 py-2.5 font-display font-bold inline-flex items-center gap-2 -rotate-1">
                🗓️ ११ दिवसांचं schedule बघा
              </Link>
              <a href="#order" className="sticker-btn bg-white px-6 py-2.5 font-display font-bold inline-flex items-center gap-2 rotate-1">
                🙏 Modak order करा
              </a>
            </div>
          </div>
        </section>

        {/* ---------- Marquee divider ---------- */}
        <Marquee
          items={["उकडीचे मोदक", "डिंक मोदक", "नाचणी मोदक", "ड्रायफ्रुट मोदक", "बीट मोदक", "गुलकंद मोदक", "Ganapati Special"]}
          className="bg-mint rotate-1 scale-x-105 relative z-10"
        />

        {/* ---------- Story ---------- */}
        <section id="story" className="py-16 md:py-24 bg-peach/40 relative">
          <div className="absolute top-8 right-[8%] sticker rotate-6 bg-mascot px-3 py-1 font-display font-bold text-sm hidden lg:block">
            आजी approved ✅
          </div>
          <div className="container grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="relative order-2 md:order-1">
              <div className="relative -rotate-2">
                <div className="border-[3px] border-ink bg-white p-2.5 pb-4 shadow-[6px_6px_0_0_var(--ink)]">
                  <img
                    src={ASSETS.kitchen}
                    alt="Takam home kitchen illustration"
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover border-2 border-ink/15"
                  />
                </div>
                <Tape className="-top-2.5 left-8 -rotate-6" />
                <Tape className="-top-2.5 right-8 rotate-6" />
              </div>
              <div className="absolute -bottom-5 -right-2 md:-right-5 sticker rotate-2 bg-mascot px-4 py-2 font-display font-extrabold">
                Since forever, basically 🍳
              </div>
            </div>
            <div className="space-y-5 order-1 md:order-2">
              <div className="inline-block sticker -rotate-2 bg-white px-4 py-1.5 font-display font-bold text-sm">
                📖 आमची गोष्ट
              </div>
              <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
                टाकम म्हणजे काय? <br />
                <span className="relative inline-block -rotate-1">
                  <span className="relative z-10">Taste. Overloaded. 🔥</span>
                  <span className="absolute bottom-1 left-0 w-full h-3.5 bg-mascot -z-0" />
                </span>
              </h2>
              <p className="font-semibold text-lg leading-relaxed">
                Takam started in a real home kitchen in Maharashtra - not a factory, not a cloud kitchen, just a stove, a family recipe book, and a lot of love (and ghee).
              </p>
              <p className="font-semibold text-lg leading-relaxed">
                Every batch is handmade in small quantities, using the same recipes our आजी used. No preservatives, no artificial colors - फक्त authentic Marathi chavi.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: ChefHat, label: "हाताने बनवलेलं", rot: "-rotate-2" },
                  { icon: Leaf, label: "No Preservatives", rot: "rotate-1" },
                  { icon: Heart, label: "Family Recipes", rot: "-rotate-1" },
                ].map(({ icon: Icon, label, rot }) => (
                  <div key={label} className={`sticker ${rot} bg-white p-3 text-center space-y-1.5`}>
                    <Icon className="h-6 w-6 mx-auto" />
                    <p className="font-display font-bold text-xs md:text-sm leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Order CTA ---------- */}
        <section id="order" className="py-16 md:py-24 relative">
          <div className="absolute top-10 left-[10%] sticker -rotate-6 bg-peach px-3 py-1 font-display font-bold text-sm hidden lg:block">
            <Star className="h-4 w-4 inline -mt-0.5" /> पहिली order = पहिलं प्रेम
          </div>
          <div className="container">
            <div className="sticker bg-mascot max-w-3xl mx-auto p-8 md:p-12 text-center space-y-6 rotate-1 relative">
              <img
                src={ASSETS.logoC}
                alt="टाकम stamp"
                className="absolute -top-8 -left-6 md:-left-10 h-20 w-20 md:h-24 md:w-24 -rotate-12 drop-shadow-[3px_3px_0_rgba(30,27,22,0.3)]"
              />
              <Sparkles className="h-8 w-8 mx-auto" />
              <h2 className="font-display font-extrabold leading-tight" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
                भूक लागली? <br className="md:hidden" /> मग वाट कसली बघताय!
              </h2>
              <p className="font-semibold text-lg max-w-md mx-auto">
                WhatsApp us to order. Fresh batches made on demand - जितकं fresh, तितकं भारी.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`https://wa.me/91${PHONE}?text=${encodeURIComponent("नमस्कार टाकम! मला order करायचं आहे 😋")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sticker-btn bg-white px-7 py-3 text-lg flex items-center gap-2 rotate-1"
                >
                  <MessageCircle className="h-5 w-5" /> WhatsApp करा
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer: stamp identity ---------- */}
      <footer className="border-t-[3px] border-ink bg-ink text-cream relative overflow-hidden">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={ASSETS.logoC}
              alt="टाकम badge"
              className="h-16 w-16 md:h-20 md:w-20 -rotate-6"
            />
            <div>
              <p className="font-display font-extrabold text-2xl md:text-3xl">टाकम</p>
              <p className="text-sm opacity-80 font-semibold">घरगुती । चविष्ट । मस्त</p>
            </div>
          </div>
          <p className="text-sm opacity-80 font-semibold text-center">
            Made with ❤️ in Maharashtra
          </p>

        </div>
        {/* big ghost wordmark */}
        <p
          className="absolute -bottom-7 right-4 font-display font-extrabold text-cream/10 select-none pointer-events-none leading-none"
          style={{ fontSize: "7rem" }}
          aria-hidden
        >
          टाकम
        </p>
      </footer>
    </div>
  );
}
