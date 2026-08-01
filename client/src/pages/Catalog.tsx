/*
 * TAKAM — Sticker Bomb Bazaar theme
 * Catalog page: sticker-styled product table (name, price/qty),
 * same chrome as Home (header, marquee, footer). Red-orange only on order CTAs.
 */
import { Phone, MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { MobileNav } from "@/components/MobileNav";

const PHONE = "9371055473";

const ASSETS = {
  logoC: "/images/takam_logo_C_transparent.png",
  suraliVadi: "/images/surali-vadi-1.jpeg",
  gulabJamun: "/images/gulab-jamun-3.jpeg",
  alivLadu: "/images/aalive-ladu-2.jpeg",
};

const catalog = [
  {
    slug: "ukadiche-modak",
    marathi: "उकडीचे मोदक",
    english: "Ukadiche Modak",
    image: "/images/modak-new.jpeg",
    note: "⭐ आमचा Star item",
  },
  {
    slug: "surali-vadi",
    marathi: "सुरळी वडी",
    english: "Surali Vadi",
    image: ASSETS.suraliVadi,
    note: "🌟 Signature चव",
  },
  {
    slug: "gulab-jamun",
    marathi: "गुलऺबजाम",
    english: "Gulab Jamun",
    image: ASSETS.gulabJamun,
    note: "🍯 Syrup मध्ये डुबकी",
  },
  {
    slug: "aliv-ladu",
    marathi: "अळीव लाडू",
    english: "Aliv Ladu",
    image: ASSETS.alivLadu,
    note: "💪 Power चा गोळा",
  },
];

export default function Catalog() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b-[3px] border-ink">
        <div className="container flex items-center justify-between py-2">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src={ASSETS.logoC}
              alt="टाकम badge"
              className="h-14 w-14 md:h-16 md:w-16 -rotate-6 drop-shadow-[3px_3px_0_rgba(30,27,22,0.35)]"
            />
            <span className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">टाकम</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 font-display font-bold">
            <Link href="/" className="hover:underline decoration-[3px] decoration-mascot underline-offset-4">Home</Link>
            <span className="underline decoration-[3px] decoration-mint underline-offset-4">Catalog 📋</span>
          </nav>
          <MobileNav phone={PHONE} />
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
        {/* ---------- Page title ---------- */}
        <section className="py-12 md:py-16 relative">
          <div className="absolute top-8 left-[8%] sticker -rotate-6 bg-peach px-3 py-1 font-display font-bold text-sm hidden lg:block">
            फक्त fresh batch 🌿
          </div>
          <div className="absolute top-16 right-[7%] sticker rotate-6 bg-mint px-3 py-1 font-display font-bold text-sm hidden lg:block">
            घरगुती guarantee ✅
          </div>
          <div className="container text-center">
            <div className="inline-block sticker rotate-2 bg-mascot px-4 py-1.5 font-display font-bold text-sm mb-4">
              📋 Product Catalog
            </div>
            <h1 className="font-display font-extrabold -rotate-1" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}>
              पूर्ण{" "}
              <span className="relative inline-block rotate-1">
                <span className="relative z-10">यादी</span>
                <span className="absolute bottom-1 left-0 w-full h-4 bg-mint -z-0 rotate-1" />
              </span>{" "}
              — एका जागी!
            </h1>
            <p className="text-muted-foreground font-semibold text-lg mt-3 max-w-xl mx-auto">
              All Takam items with price & quantity. भाव विचारायला call किंवा WhatsApp करा!
            </p>
          </div>
        </section>

        {/* ---------- Catalog table ---------- */}
        <section className="pb-16 md:pb-24">
          <div className="container max-w-4xl">
            <div className="sticker rotate-0 bg-white overflow-hidden p-0">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-mascot border-b-[3px] border-ink font-display text-lg">
                      <th className="text-left px-6 py-4 font-extrabold">#</th>
                      <th className="text-left px-6 py-4 font-extrabold">Item</th>
                      <th className="text-left px-6 py-4 font-extrabold">Product Name</th>
                      <th className="text-right px-6 py-4 font-extrabold">Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalog.map((item, i) => (
                      <tr key={item.english} className={`border-b-2 border-ink/10 ${i % 2 === 1 ? "bg-cream/60" : ""}`}>
                        <td className="px-6 py-4 font-display font-extrabold text-xl text-muted-foreground">{i + 1}</td>
                        <td className="px-6 py-4">
                          <Link href={`/product/${item.slug}`}>
                            <img
                              src={item.image}
                              alt={item.english}
                              className={`h-16 w-16 object-cover border-[2.5px] border-ink rounded-xl ${i % 2 === 0 ? "-rotate-2" : "rotate-2"} shadow-[3px_3px_0_0_var(--ink)]`}
                            />
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/product/${item.slug}`} className="hover:underline decoration-[3px] decoration-mascot underline-offset-4">
                            <p className="font-display font-extrabold text-xl">{item.marathi}</p>
                          </Link>
                          <p className="text-sm font-bold text-muted-foreground">{item.english} · {item.note}</p>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <a
                            href={`tel:${PHONE}`}
                            className="sticker-btn bg-tomato text-primary-foreground px-4 py-1.5 text-sm inline-flex items-center gap-1.5"
                          >
                            <Phone className="h-3.5 w-3.5" /> मागवा
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile stacked list */}
              <div className="md:hidden divide-y-2 divide-ink/10">
                {catalog.map((item, i) => (
                  <div key={item.english} className={`flex items-center gap-4 p-4 ${i % 2 === 1 ? "bg-cream/60" : ""}`}>
                    <Link href={`/product/${item.slug}`} className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.english}
                        className={`h-16 w-16 object-cover border-[2.5px] border-ink rounded-xl ${i % 2 === 0 ? "-rotate-2" : "rotate-2"} shadow-[3px_3px_0_0_var(--ink)]`}
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.slug}`}>
                        <p className="font-display font-extrabold text-lg leading-tight">{item.marathi}</p>
                      </Link>
                      <p className="text-xs font-bold text-muted-foreground">{item.english} · {item.note}</p>

                    </div>
                    <a
                      href={`tel:${PHONE}`}
                      className="sticker-btn bg-tomato text-primary-foreground p-2.5 shrink-0"
                      aria-label={`Order ${item.english}`}
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center mt-8">
              <span className="sticker rotate-1 bg-white px-5 py-2 font-display font-bold text-muted-foreground inline-block">
                More items लवकरच येत आहेत... 👀
              </span>
            </p>

            {/* Order strip */}
            <div className="sticker -rotate-1 bg-mascot mt-12 p-6 md:p-8 text-center space-y-4">
              <h2 className="font-display font-extrabold text-2xl md:text-3xl">Order द्यायची आहे?</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`tel:${PHONE}`}
                  className="sticker-btn bg-tomato text-primary-foreground px-6 py-2.5 text-base flex items-center gap-2 -rotate-1"
                >
                  <Phone className="h-4 w-4" /> {PHONE}
                </a>
                <a
                  href={`https://wa.me/91${PHONE}?text=${encodeURIComponent("नमस्कार टाकम! मला order करायचं आहे 😋")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sticker-btn bg-white px-6 py-2.5 text-base flex items-center gap-2 rotate-1"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp करा
                </a>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link href="/" className="font-display font-bold hover:underline decoration-[3px] decoration-mascot underline-offset-4 inline-flex items-center gap-1.5">
                <ArrowLeft className="h-4 w-4" /> परत Home ला जा
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t-[3px] border-ink bg-ink text-cream relative overflow-hidden">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img src={ASSETS.logoC} alt="टाकम badge" className="h-16 w-16 md:h-20 md:w-20 -rotate-6" />
            <div>
              <p className="font-display font-extrabold text-2xl md:text-3xl">टाकम</p>
              <p className="text-sm opacity-80 font-semibold">घरगुती । चविष्ट । मस्त</p>
            </div>
          </div>
          <p className="text-sm opacity-80 font-semibold text-center">
            Made with ❤️ in Maharashtra
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
