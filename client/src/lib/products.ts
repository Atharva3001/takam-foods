/*
 * TAKAM — shared product data
 * Single source of truth for products across Home, Catalog, and Product pages.
 * Videos: empty for now — add YouTube/Instagram embed URLs or /manus-storage video paths later.
 */

export interface Product {
  slug: string;
  marathi: string;
  english: string;
  tag: string;
  tagBg: string;
  shortDesc: string;
  funny: string;
  images: string[];
  videos: string[]; // embed URLs or video file URLs — placeholder-ready
  story: string[];
  benefits: { emoji: string; title: string; desc: string }[];
  howToEnjoy: string[];
  facts: { label: string; value: string }[];
  unit: string;
  price: string | null;
}

export const PHONE = "9371055473";

export const SITE_ASSETS = {
  logoA: "/manus-storage/takam_logo_A_transparent_98b6c4bc.png",
  logoC: "/manus-storage/takam_logo_C_transparent_3b00df00.png",
  heroBg: "/manus-storage/takam_hero_bg_cf60cea1.png",
  kitchen: "/manus-storage/takam_kitchen_illustration_3bcf49bb.png",
};

export const products: Product[] = [
  {
    slug: "ukadiche-modak",
    marathi: "उकडीचे मोदक",
    english: "Ukadiche Modak",
    tag: "⭐ आमचा Star",
    tagBg: "bg-mascot",
    shortDesc:
      "Steamed rice-flour dumplings stuffed with jaggery & coconut. The monsoon favorite that never goes out of style.",
    funny: '"Modak = love in dumpling form" 💚',
    images: [
      "/manus-storage/modak-2_be68325c.webp",
      "/manus-storage/modak-3_04201bb4.webp",
      "/manus-storage/modak-4_7386f529.webp",
      "/manus-storage/modak-5_f952e679.webp",
    ],
    videos: [],
    story: [
      "उकडीचे मोदक (Ukadiche Modak) is the monsoon darling of every Marathi household — a steamed dumpling made from rice flour, stuffed with a sweet filling of jaggery, coconut, and cardamom. Tradition says it's offered to Lord Ganesha during Ganesh Chaturthi, but honestly, we make it year-round because it's that good.",
      "At Takam, every modak is hand-shaped and steamed fresh to order. The rice flour is kneaded soft, the jaggery filling is made with real coconut and ghee, and each one is shaped with love. No molds, no shortcuts — just आजी's way.",
    ],
    benefits: [
      { emoji: "🍚", title: "Rice flour goodness", desc: "Easy to digest, light on the stomach — perfect for all ages." },
      { emoji: "🥥", title: "Real coconut & jaggery", desc: "Natural sweetness, no refined sugar — the traditional way." },
      { emoji: "💪", title: "Energy boost", desc: "Jaggery brings iron and minerals, perfect for monsoon season." },
      { emoji: "🏠", title: "Steamed, not fried", desc: "Healthy preparation — all the taste, none of the guilt." },
    ],
    howToEnjoy: [
      "Warm, straight from the steamer — the best way 🔥",
      "With a cup of hot chai during monsoon rains ☕",
      "As a dessert after lunch — light and satisfying",
    ],
    facts: [
      { label: "Texture", value: "Soft, fluffy, hand-shaped" },
      { label: "Taste", value: "Sweet, coconutty, cardamom-kissed" },
      { label: "Made from", value: "Rice flour, jaggery, coconut, ghee" },
      { label: "Best within", value: "1–2 days (eat warm for best taste)" },
    ],
    unit: "per piece",
    price: null,
  },
  {
    slug: "surali-vadi",
    marathi: "सुरळी वडी",
    english: "Surali Vadi",
    tag: "🌟 Signature चव",
    tagBg: "bg-peach",
    shortDesc:
      "Soft besan rolls, tadka on top, coriander confetti. Aaji-level softness, guaranteed.",
    funny: '"Roll model of all snacks" 😎',
    images: ["/manus-storage/surali-vadi-1_b095aed2.jpeg"],
    videos: [],
    story: [
      "सुरळी वडी (also called Khandvi's Marathi cousin) is the ultimate test of a home cook's skill — the besan batter must be cooked to the exact right consistency, spread paper-thin, and rolled into delicate spirals before it sets. One minute too long and it cracks; one minute too short and it won't roll.",
      "At Takam, every roll is made by hand the traditional way — slow-cooked besan and buttermilk batter, spread on the counter, rolled tight, and finished with a sizzling tadka of mustard seeds, sesame, fresh coriander, and coconut. No shortcuts, no mixes.",
    ],
    benefits: [
      { emoji: "🌱", title: "Protein-rich besan", desc: "Made from gram flour (besan), a good source of plant protein and fiber." },
      { emoji: "🥛", title: "Light on the stomach", desc: "Steam-cooked, not fried — a guilt-free snack for any time of day." },
      { emoji: "🌿", title: "Fresh tadka toppings", desc: "Coriander, coconut, sesame, and mustard tadka added fresh before delivery." },
      { emoji: "🏠", title: "Zero preservatives", desc: "Made fresh in small batches on order. What we eat at home is what you get." },
    ],
    howToEnjoy: [
      "As an evening snack with hot chai ☕",
      "As a starter at family gatherings — it disappears fast!",
      "In the tiffin box — stays soft for hours",
    ],
    facts: [
      { label: "Texture", value: "Soft, melt-in-mouth spirals" },
      { label: "Taste", value: "Savory, tangy, fresh tadka" },
      { label: "Made from", value: "Besan, buttermilk, fresh tadka" },
      { label: "Best within", value: "1–2 days (it never lasts that long 😄)" },
    ],
    unit: "per plate",
    price: null,
  },
  {
    slug: "gulab-jamun",
    marathi: "गुलाबजाम",
    english: "Gulab Jamun",
    tag: "🍯 Syrup मध्ये डुबकी",
    tagBg: "bg-mint",
    shortDesc:
      "Melt-in-mouth jamuns swimming happily in kesar syrup. Diet plans fear this.",
    funny: '"Gym kal se pakka" 🤙',
    images: ["/manus-storage/gulab-jamun-3_da46dfeb.jpeg"],
    videos: [],
    story: [
      "Some desserts are trends. Gulab Jamun is an emotion. Soft khoya dumplings, fried low and slow to a deep golden brown, then left to soak in cardamom-kissed sugar syrup until every bite oozes happiness.",
      "Takam's gulab jamuns are made the homemade way — real khoya, hand-rolled, no ready-made mix. That's why they're impossibly soft inside with that signature dark caramelized outside.",
    ],
    benefits: [
      { emoji: "🥛", title: "Real khoya", desc: "Made with genuine khoya (milk solids) — not powder mixes. You can taste the difference." },
      { emoji: "✋", title: "Hand-rolled", desc: "Each jamun rolled by hand for the perfect crack-free, soft texture." },
      { emoji: "🌸", title: "Aromatic syrup", desc: "Cardamom-infused syrup, balanced sweetness — never cloying." },
      { emoji: "🎉", title: "Celebration-ready", desc: "Perfect for pujas, parties, birthdays, or a random Tuesday. No occasion needed." },
    ],
    howToEnjoy: [
      "Slightly warm with a scoop of vanilla ice cream 🍨",
      "As the grand finale of a Sunday family lunch",
      "Straight from the box at midnight (we won't tell) 🤫",
    ],
    facts: [
      { label: "Texture", value: "Impossibly soft, syrup-soaked" },
      { label: "Taste", value: "Sweet, cardamom, caramelized" },
      { label: "Made from", value: "Khoya, flour, sugar, cardamom" },
      { label: "Best within", value: "3–4 days refrigerated" },
    ],
    unit: "per box",
    price: null,
  },
  {
    slug: "aliv-ladu",
    marathi: "अळीव लाडू",
    english: "Aliv Ladu",
    tag: "💪 Power चा गोळा",
    tagBg: "bg-peach",
    shortDesc:
      "Halim seeds + jaggery + dry fruits. The OG protein ball, invented before protein was cool.",
    funny: '"Superfood? आमच्याकडे आधीपासूनच आहे" ✨',
    images: ["/manus-storage/aalive-ladu-2_20c7ce00.jpeg"],
    videos: [],
    story: [
      "Long before 'superfood' was a marketing word, Marathi households were making अळीव लाडू — garden cress seed laddus — for new mothers, growing kids, and anyone who needed strength. It's ancestral nutrition science, disguised as a sweet.",
      "Takam's Aliv Ladu follows the classic recipe: halim (aliv) seeds soaked in coconut water or milk, cooked with jaggery, fresh coconut, and finished with dry fruits. Dense, chewy, and packed with goodness.",
    ],
    benefits: [
      { emoji: "🩸", title: "Iron powerhouse", desc: "Aliv (garden cress) seeds are among the richest plant sources of iron — traditionally given to boost hemoglobin." },
      { emoji: "💪", title: "Protein & fiber", desc: "Natural protein from seeds and dry fruits keeps you full and energized." },
      { emoji: "🍯", title: "Jaggery, not sugar", desc: "Sweetened with jaggery, which brings minerals along with sweetness." },
      { emoji: "🤱", title: "Traditional wellness", desc: "A time-honored recipe for new mothers, growing kids, and winter immunity." },
    ],
    howToEnjoy: [
      "One ladu with warm milk in the morning 🥛",
      "As a post-workout snack — the OG protein ball 💪",
      "For kids' tiffin — nutrition they'll actually eat happily",
    ],
    facts: [
      { label: "Texture", value: "Dense, chewy, nutty" },
      { label: "Taste", value: "Earthy jaggery sweetness" },
      { label: "Made from", value: "Aliv seeds, jaggery, coconut, dry fruits" },
      { label: "Best within", value: "7–10 days in airtight box" },
    ],
    unit: "per dozen",
    price: null,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
