/*
 * TAKAM — Sticker Bomb Bazaar theme (v2 after style review)
 * - Sticker-board chaos: overlaps, tilts, floating badges in EVERY section
 * - Product photos = polaroid stickers (tape, tilt, doodle badges)
 * - Red-orange #E85D3D ONLY on ordering CTAs; yellow/mint/peach for emphasis
 * - Loud brand chrome (big header wordmark, footer stamp)
 * - Minglish voice everywhere incl. nav + labels
 */
import { Phone, MessageCircle, Sparkles, Heart, Leaf, ChefHat, Star } from "lucide-react";
import { Link } from "wouter";

const PHONE = "9371055473";

const ASSETS = {
  logoA: "/manus-storage/takam_logo_A_transparent_98b6c4bc.png",
  logoC: "/manus-storage/takam_logo_C_transparent_3b00df00.png",
  suraliVadi: "/manus-storage/surali-vadi-1_b095aed2.jpeg",
  gulabJamun: "/manus-storage/gulab-jamun-3_da46dfeb.jpeg",
  alivLadu: "/manus-storage/aalive-ladu-2_20c7ce00.jpeg",
  heroBg: "/manus-storage/takam_hero_bg_cf60cea1.png",
  kitchen: "/manus-storage/takam_kitchen_illustration_3bcf49bb.png",
};

const products = [
  {
    slug: "surali-vadi",
    marathi: "सुरळी वडी",
    english: "Surali Vadi",
    image: ASSETS.suraliVadi,
    tag: "⭐ आमचा Star",
    tagBg: "bg-mascot",
    desc: "Soft besan rolls, tadka on top, coriander confetti. Aaji-level softness, guaranteed.",
    funny: '"Roll model of all snacks" 😎',
    rotate: "-rotate-2",
    photoRotate: "rotate-2",
  },
  {
    slug: "gulab-jamun",
    marathi: "गुलाबजाम",
    english: "Gulab Jamun",
    image: ASSETS.gulabJamun,
    tag: "🍯 Syrup मध्ये डुबकी",
    tagBg: "bg-peach",
    desc: "Melt-in-mouth jamuns swimming happily in kesar syrup. Diet plans fear this.",
    funny: '"Gym kal se pakka" 🤙',
    rotate: "rotate-1 md:translate-y-6",
    photoRotate: "-rotate-2",
  },
  {
    slug: "aliv-ladu",
    marathi: "अळीव लाडू",
    english: "Aliv Ladu",
    image: ASSETS.alivLadu,
    tag: "💪 Power चा गोळा",
    tagBg: "bg-mint",
    desc: "Halim seeds + jaggery + dry fruits. The OG protein ball, invented before protein was cool.",
    funny: '"Superfood? आमच्याकडे आधीपासूनच आहे" ✨',
    rotate: "-rotate-1",
    photoRotate: "rotate-3",
  },
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
            <a href="#menu" className="hover:underline decoration-[3px] decoration-mascot underline-offset-4">खायला काय? 🍽️</a>
            <a href="#story" className="hover:underline decoration-[3px] decoration-mint underline-offset-4">आमची गोष्ट</a>
            <a href="#order" className="hover:underline decoration-[3px] decoration-peach underline-offset-4">भूक लागली?</a>
            <Link href="/catalog" className="hover:underline decoration-[3px] decoration-mascot underline-offset-4">Catalog 📋</Link>
          </nav>
          <a
            href={`tel:${PHONE}`}
            className="sticker-btn bg-tomato text-primary-foreground px-4 py-1.5 md:px-5 md:py-2 flex items-center gap-2 text-sm md:text-base -rotate-1"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Call करा!</span>
            <span className="sm:hidden">Call</span>
          </a>
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
                Authentic Marathi snacks, made at home with real ingredients and zero shortcuts. Swiggy कशाला? टाकम ला call करा! 😋
              </p>
              <div className="flex flex-wrap gap-4 pop-in" style={{ animationDelay: "180ms" }}>
                <a
                  href={`tel:${PHONE}`}
                  className="sticker-btn bg-tomato text-primary-foreground px-7 py-3 text-lg flex items-center gap-2 -rotate-1"
                >
                  <Phone className="h-5 w-5" /> लगेच Order करा
                </a>
                <a
                  href="#menu"
                  className="sticker-btn bg-mascot px-7 py-3 text-lg flex items-center gap-2 rotate-1"
                >
                  Menu बघा 👀
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
                alt="टाकम mascot — Surali Vadi with sunglasses"
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

        {/* ---------- Menu: sticker board ---------- */}
        <section id="menu" className="py-16 md:py-24 relative">
          {/* floating doodle badges */}
          <div className="absolute top-10 left-[6%] sticker rotate-6 bg-peach px-3 py-1 font-display font-bold text-sm hidden lg:block">
            फक्त fresh batch 🌿
          </div>
          <div className="absolute top-24 right-[5%] sticker -rotate-6 bg-mint px-3 py-1 font-display font-bold text-sm hidden lg:block">
            चव = जबरदस्त
          </div>

          <div className="container">
            <div className="text-center mb-14 md:mb-20 relative">
              <div className="inline-block sticker rotate-2 bg-peach px-4 py-1.5 font-display font-bold text-sm mb-4">
                🍽️ आजचा Menu
              </div>
              <h2 className="font-display font-extrabold -rotate-1" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
                काय काय आहे?{" "}
                <span className="relative inline-block rotate-1">
                  <span className="relative z-10">हे आहे!</span>
                  <span className="absolute bottom-1 left-0 w-full h-3.5 bg-mint -z-0 rotate-1" />
                </span>
              </h2>
              <p className="text-muted-foreground font-semibold text-lg mt-3 max-w-xl mx-auto">
                Small batch, big taste. Har item full घरगुती — no factory, no nonsense.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10 md:gap-6 lg:gap-10">
              {products.map((p, i) => (
                <div
                  key={p.english}
                  className={`sticker ${p.rotate} bg-white pop-in p-4 pb-5`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* polaroid photo (links to product page) */}
                  <Link href={`/product/${p.slug}`} className={`block relative ${p.photoRotate} mb-5 mx-1 mt-1 hover:no-underline`}>
                    <div className="border-[3px] border-ink bg-white p-2 pb-3 shadow-[5px_5px_0_0_var(--ink)]">
                      <img
                        src={p.image}
                        alt={`${p.marathi} (${p.english})`}
                        className="w-full h-48 lg:h-52 object-cover border-2 border-ink/15 saturate-[1.15]"
                      />
                      <p className="text-center font-display font-bold text-xs mt-1.5 text-ink/60">
                        📸 straight from आमची kitchen
                      </p>
                    </div>
                    <Tape className="-top-2.5 left-1/2 -translate-x-1/2 -rotate-3" />
                    <span
                      className={`absolute -bottom-3 -right-2 ${p.tagBg} border-[2.5px] border-ink rounded-full px-3 py-0.5 font-display font-bold text-sm rotate-3 shadow-[2px_2px_0_0_var(--ink)]`}
                    >
                      {p.tag}
                    </span>
                  </Link>

                  <div className="px-2 space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <Link href={`/product/${p.slug}`} className="hover:underline decoration-[3px] decoration-mascot underline-offset-4">
                        <h3 className="font-display font-extrabold text-2xl">{p.marathi}</h3>
                      </Link>
                      <span className="text-sm font-bold text-muted-foreground">{p.english}</span>
                    </div>
                    <p className="font-semibold text-[15px] leading-relaxed">{p.desc}</p>
                    <p className="text-sm font-bold text-muted-foreground italic">{p.funny}</p>
                    <div className="flex items-center justify-between pt-2">
                      <Link
                        href={`/product/${p.slug}`}
                        className="sticker-btn bg-mint px-3.5 py-1.5 text-sm font-display font-bold -rotate-1 inline-flex items-center gap-1"
                      >
                        अजून बघा 👀
                      </Link>
                      <a
                        href={`tel:${PHONE}`}
                        className="sticker-btn bg-tomato text-primary-foreground px-4 py-1.5 text-sm flex items-center gap-1.5"
                      >
                        <Phone className="h-3.5 w-3.5" /> मागवा
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center items-center gap-5 mt-14">
              <p className="sticker rotate-1 bg-white px-5 py-2 font-display font-bold text-muted-foreground inline-block">
                More items लवकरच येत आहेत... 👀 Follow the smell.
              </p>
              <Link href="/catalog" className="sticker-btn bg-mint px-6 py-2.5 font-display font-bold -rotate-1 inline-flex items-center gap-2">
                📋 पूर्ण Catalog बघा
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- Marquee divider ---------- */}
        <Marquee
          items={["सुरळी वडी", "गुलाबजाम", "अळीव लाडू", "Fresh Batch Daily", `Order: ${PHONE}`]}
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
                Takam started in a real home kitchen in Maharashtra — not a factory, not a cloud kitchen, just a stove, a family recipe book, and a lot of love (and ghee).
              </p>
              <p className="font-semibold text-lg leading-relaxed">
                Every batch is handmade in small quantities, using the same recipes our आजी used. No preservatives, no artificial colors — फक्त authentic Marathi chavi.
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
                Call or WhatsApp us to order. Fresh batches made on demand — जितकं fresh, तितकं भारी.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`tel:${PHONE}`}
                  className="sticker-btn bg-tomato text-primary-foreground px-7 py-3 text-lg flex items-center gap-2 -rotate-1"
                >
                  <Phone className="h-5 w-5" /> {PHONE}
                </a>
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
            Made with ❤️ (and lots of ghee) in Maharashtra
          </p>
          <a
            href={`tel:${PHONE}`}
            className="sticker-btn bg-mascot text-ink px-5 py-2 font-display font-bold text-lg -rotate-1"
          >
            📞 {PHONE}
          </a>
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
