/*
 * TAKAM — Sticker Bomb Bazaar theme
 * Product detail page (/product/:slug): polaroid gallery + video placeholder,
 * story, benefit sticker cards, how-to-enjoy, quick facts, order CTAs.
 * Red-orange only on ordering actions.
 */
import { useState } from "react";
import { Phone, MessageCircle, ArrowLeft, PlayCircle, ChevronRight } from "lucide-react";
import { Link, useParams } from "wouter";
import { getProduct, products, PHONE, SITE_ASSETS } from "@/lib/products";
import NotFound from "@/pages/NotFound";

function Tape({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute w-20 h-5 bg-mint/80 border-2 border-ink/20 ${className}`}
      style={{ clipPath: "polygon(3% 0, 97% 6%, 100% 100%, 0 94%)" }}
    />
  );
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug ?? "");
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return <NotFound />;

  const others = products.filter((p) => p.slug !== product.slug);
  const waText = encodeURIComponent(
    `नमस्कार टाकम! मला ${product.marathi} (${product.english}) order करायचं आहे 😋`
  );

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b-[3px] border-ink">
        <div className="container flex items-center justify-between py-2">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src={SITE_ASSETS.logoC}
              alt="टाकम badge"
              className="h-14 w-14 md:h-16 md:w-16 -rotate-6 drop-shadow-[3px_3px_0_rgba(30,27,22,0.35)]"
            />
            <span className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">टाकम</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 font-display font-bold">
            <Link href="/" className="hover:underline decoration-[3px] decoration-mascot underline-offset-4">Home</Link>
            <Link href="/catalog" className="hover:underline decoration-[3px] decoration-mint underline-offset-4">Catalog 📋</Link>
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

      <main className="flex-1">
        {/* ---------- Breadcrumb ---------- */}
        <div className="container pt-6">
          <p className="font-display font-bold text-sm text-muted-foreground flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/catalog" className="hover:underline">Catalog</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-ink">{product.marathi}</span>
          </p>
        </div>

        {/* ---------- Hero: gallery + intro ---------- */}
        <section className="py-8 md:py-14 relative">
          <div className="absolute top-6 right-[6%] sticker rotate-6 bg-peach px-3 py-1 font-display font-bold text-sm hidden lg:block">
            एकदम fresh! ✨
          </div>
          <div className="container grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Gallery */}
            <div className="space-y-5">
              <div className="relative -rotate-1">
                <div className="border-[3px] border-ink bg-white p-2.5 pb-4 shadow-[6px_6px_0_0_var(--ink)]">
                  <img
                    src={product.images[activeImage]}
                    alt={`${product.marathi} photo ${activeImage + 1}`}
                    className="w-full h-80 md:h-[26rem] object-cover border-2 border-ink/15 saturate-[1.15]"
                  />
                  <p className="text-center font-display font-bold text-xs mt-2 text-ink/60">
                    📸 straight from आमची kitchen
                  </p>
                </div>
                <Tape className="-top-2.5 left-10 -rotate-6" />
                <Tape className="-top-2.5 right-10 rotate-6" />
                <span
                  className={`absolute -bottom-3 -right-2 ${product.tagBg} border-[2.5px] border-ink rounded-full px-3 py-0.5 font-display font-bold text-sm rotate-3 shadow-[2px_2px_0_0_var(--ink)]`}
                >
                  {product.tag}
                </span>
              </div>

              {/* Thumbnails + video slot */}
              <div className="flex gap-3 flex-wrap pt-2">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    className={`border-[2.5px] border-ink rounded-xl overflow-hidden h-18 w-18 md:h-20 md:w-20 shadow-[3px_3px_0_0_var(--ink)] transition-transform ${
                      i === activeImage ? "ring-4 ring-mascot -rotate-2" : "opacity-70 hover:opacity-100 rotate-1"
                    }`}
                    aria-label={`View photo ${i + 1}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
                {product.videos.length === 0 && (
                  <div className="border-[2.5px] border-dashed border-ink/40 rounded-xl h-18 w-18 md:h-20 md:w-20 flex flex-col items-center justify-center text-center px-1 bg-white/60">
                    <PlayCircle className="h-5 w-5 text-ink/40" />
                    <span className="font-display font-bold text-[9px] leading-tight text-ink/40 mt-0.5">
                      Video लवकरच 🎬
                    </span>
                  </div>
                )}
                {product.videos.map((v) => (
                  <a
                    key={v}
                    href={v}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-[2.5px] border-ink rounded-xl h-18 w-18 md:h-20 md:w-20 flex items-center justify-center bg-mascot shadow-[3px_3px_0_0_var(--ink)]"
                  >
                    <PlayCircle className="h-7 w-7" />
                  </a>
                ))}
              </div>
            </div>

            {/* Intro + CTA */}
            <div className="space-y-6">
              <div>
                <h1 className="font-display font-extrabold leading-tight" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>
                  {product.marathi}
                </h1>
                <p className="font-display font-bold text-xl text-muted-foreground">{product.english}</p>
              </div>
              <p className="font-semibold text-lg leading-relaxed">{product.shortDesc}</p>
              <p className="font-bold italic text-muted-foreground">{product.funny}</p>

              <div className="flex items-center gap-3 flex-wrap">
                <span className="border-[2.5px] border-ink rounded-full bg-mint px-4 py-1.5 font-display font-bold -rotate-1">
                  {product.price ? `₹${product.price} ${product.unit}` : `₹ भाव? Call वर! 📞 (${product.unit})`}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <a
                  href={`tel:${PHONE}`}
                  className="sticker-btn bg-tomato text-primary-foreground px-7 py-3 text-lg flex items-center gap-2 -rotate-1"
                >
                  <Phone className="h-5 w-5" /> लगेच मागवा
                </a>
                <a
                  href={`https://wa.me/91${PHONE}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sticker-btn bg-white px-7 py-3 text-lg flex items-center gap-2 rotate-1"
                >
                  <MessageCircle className="h-5 w-5" /> WhatsApp करा
                </a>
              </div>

              {/* Quick facts */}
              <div className="sticker rotate-1 bg-white p-5 mt-4">
                <p className="font-display font-extrabold text-lg mb-3">Quick Facts 📌</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {product.facts.map((f) => (
                    <div key={f.label} className="flex flex-col">
                      <span className="font-display font-bold text-xs uppercase tracking-wide text-muted-foreground">{f.label}</span>
                      <span className="font-semibold text-sm">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Story ---------- */}
        <section className="py-12 md:py-16 bg-peach/40 relative">
          <div className="absolute top-6 left-[8%] sticker -rotate-6 bg-mascot px-3 py-1 font-display font-bold text-sm hidden lg:block">
            आजी approved ✅
          </div>
          <div className="container max-w-3xl">
            <div className="inline-block sticker -rotate-2 bg-white px-4 py-1.5 font-display font-bold text-sm mb-5">
              📖 ह्याची गोष्ट
            </div>
            <h2 className="font-display font-extrabold mb-5" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)" }}>
              {product.marathi} म्हणजे काय?
            </h2>
            <div className="space-y-4">
              {product.story.map((para) => (
                <p key={para.slice(0, 24)} className="font-semibold text-lg leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Benefits ---------- */}
        <section className="py-12 md:py-20 relative">
          <div className="absolute top-8 right-[7%] sticker rotate-6 bg-mint px-3 py-1 font-display font-bold text-sm hidden lg:block">
            चव + फायदे = टाकम 💯
          </div>
          <div className="container">
            <div className="text-center mb-10">
              <div className="inline-block sticker rotate-2 bg-mint px-4 py-1.5 font-display font-bold text-sm mb-4">
                💚 का खावं?
              </div>
              <h2 className="font-display font-extrabold -rotate-1" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                Benefits —{" "}
                <span className="relative inline-block rotate-1">
                  <span className="relative z-10">एकदम solid!</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-mascot -z-0 rotate-1" />
                </span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {product.benefits.map((b, i) => (
                <div
                  key={b.title}
                  className={`sticker bg-white p-5 space-y-2 ${i % 2 === 0 ? "-rotate-1" : "rotate-1 lg:translate-y-3"}`}
                >
                  <div className="text-3xl">{b.emoji}</div>
                  <p className="font-display font-extrabold text-lg leading-tight">{b.title}</p>
                  <p className="font-semibold text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- How to enjoy ---------- */}
        <section className="pb-12 md:pb-20">
          <div className="container max-w-3xl">
            <div className="sticker -rotate-1 bg-mascot p-7 md:p-9">
              <h2 className="font-display font-extrabold text-2xl md:text-3xl mb-4">कसं खायचं? 😋</h2>
              <ul className="space-y-2.5">
                {product.howToEnjoy.map((tip) => (
                  <li key={tip} className="font-semibold text-lg flex items-start gap-2.5">
                    <span className="font-display font-extrabold">→</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- Order CTA ---------- */}
        <section className="pb-14 md:pb-20">
          <div className="container max-w-3xl">
            <div className="sticker rotate-1 bg-white p-8 md:p-10 text-center space-y-5 relative">
              <img
                src={SITE_ASSETS.logoC}
                alt="टाकम stamp"
                className="absolute -top-8 -right-5 md:-right-8 h-18 w-18 md:h-22 md:w-22 rotate-12 drop-shadow-[3px_3px_0_rgba(30,27,22,0.3)]"
                style={{ height: "5rem", width: "5rem" }}
              />
              <h2 className="font-display font-extrabold text-2xl md:text-3xl">
                {product.marathi} पाहिजे? मग order करा की! 🔥
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`tel:${PHONE}`}
                  className="sticker-btn bg-tomato text-primary-foreground px-7 py-3 text-lg flex items-center gap-2 -rotate-1"
                >
                  <Phone className="h-5 w-5" /> {PHONE}
                </a>
                <a
                  href={`https://wa.me/91${PHONE}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sticker-btn bg-mint px-7 py-3 text-lg flex items-center gap-2 rotate-1"
                >
                  <MessageCircle className="h-5 w-5" /> WhatsApp करा
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Other products ---------- */}
        <section className="pb-16 md:pb-24">
          <div className="container">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-center mb-8 -rotate-1">
              अजून काही try करा 👇
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {others.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/product/${p.slug}`}
                  className={`sticker ${i % 2 === 0 ? "-rotate-1" : "rotate-1"} bg-white p-4 flex items-center gap-4 hover:no-underline`}
                >
                  <img
                    src={p.images[0]}
                    alt={p.english}
                    className="h-16 w-16 object-cover border-[2.5px] border-ink rounded-xl -rotate-2 shadow-[3px_3px_0_0_var(--ink)]"
                  />
                  <div className="min-w-0">
                    <p className="font-display font-extrabold text-lg leading-tight">{p.marathi}</p>
                    <p className="text-sm font-bold text-muted-foreground">{p.english}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 ml-auto shrink-0" />
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/catalog" className="font-display font-bold hover:underline decoration-[3px] decoration-mascot underline-offset-4 inline-flex items-center gap-1.5">
                <ArrowLeft className="h-4 w-4" /> पूर्ण Catalog बघा
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t-[3px] border-ink bg-ink text-cream relative overflow-hidden">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img src={SITE_ASSETS.logoC} alt="टाकम badge" className="h-16 w-16 md:h-20 md:w-20 -rotate-6" />
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
