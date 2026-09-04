/*
 * TAKAM - shared product data
 * Single source of truth for products across Home, Ganapati, and Product pages.
 * Videos: empty for now - add YouTube/Instagram embed URLs or /manus-storage video paths later.
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
  videos: string[]; // embed URLs or video file URLs - placeholder-ready
  story: string[];
  benefits: { emoji: string; title: string; desc: string }[];
  howToEnjoy: string[];
  facts: { label: string; value: string }[];
  unit: string;
  price: string | null;
}

export const PHONE = "9371055473";

export const SITE_ASSETS = {
  logoA: "/images/takam_logo_A_transparent.webp",
  logoC: "/images/takam_logo_C_transparent.webp",
  heroBg: "/images/takam_hero_bg.webp",
  kitchen: "/images/takam_kitchen_illustration.webp",
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
      "/images/takam_ukadiche_modak_hero_mascot.webp",
      "/images/modak-2.webp",
      "/images/modak-3.webp",
      "/images/modak-4.webp",
      "/images/modak-5.webp",
    ],
    videos: [],
    story: [
      "उकडीचे मोदक (Ukadiche Modak) is the monsoon darling of every Marathi household - a steamed dumpling made from rice flour, stuffed with a sweet filling of jaggery, coconut, and cardamom. Tradition says it's offered to Lord Ganesha during Ganesh Chaturthi, but honestly, we make it year-round because it's that good.",
      "At Takam, every modak is hand-shaped and steamed fresh to order. The rice flour is kneaded soft, the jaggery filling is made with real coconut and ghee, and each one is shaped with love. No molds, no shortcuts - just आजी's way.",
    ],
    benefits: [
      { emoji: "🍚", title: "Rice flour goodness", desc: "Easy to digest, light on the stomach - perfect for all ages." },
      { emoji: "🥥", title: "Real coconut & jaggery", desc: "Natural sweetness, no refined sugar - the traditional way." },
      { emoji: "💪", title: "Energy boost", desc: "Jaggery brings iron and minerals, perfect for monsoon season." },
      { emoji: "🏠", title: "Steamed, not fried", desc: "Healthy preparation - all the taste, none of the guilt." },
    ],
    howToEnjoy: [
      "Warm, straight from the steamer - the best way 🔥",
      "With a cup of hot chai during monsoon rains ☕",
      "As a dessert after lunch - light and satisfying",
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
    slug: "dink-modak",
    marathi: "डिंक मोदक",
    english: "Dink Modak",
    tag: "💪 ताकद वाला",
    tagBg: "bg-mascot",
    shortDesc: "Old-school festive energy, now in a Modak mood. Dink brings the warm, strong character.",
    funny: '"मी गोड आहे, पण weak नाही!" 💪',
    images: ["/images/takam_modak_dink_v2.webp"],
    videos: [],
    story: [
      "डिंक मोदक is the power-packed elder of the Takam Ganapati collection - traditional in spirit, loud in personality.",
      "Its Reel character is the friendly strength coach: a little Modak with big festival energy and zero boring vibes.",
    ],
    benefits: [
      { emoji: "🎊", title: "Festive favourite", desc: "A traditional-feeling choice for a Ganapati celebration spread." },
      { emoji: "💪", title: "Strong character", desc: "The bold, warm personality in the Modak squad." },
      { emoji: "👨‍👩‍👧‍👦", title: "Made for sharing", desc: "A conversation-starting special for family visits and festive gifting." },
      { emoji: "✨", title: "Limited-season vibe", desc: "One of Takam's Ganapati collection specials." },
    ],
    howToEnjoy: ["Serve as part of your Ganapati naivedya platter 🙏", "Pair with chai during a cosy festive catch-up ☕", "Share the power-Modak energy with the family"],
    facts: [
      { label: "Flavour vibe", value: "Warm, traditional, bold" },
      { label: "Campaign role", value: "The strength coach" },
      { label: "Collection", value: "Ganapati Modak specials" },
      { label: "Details", value: "Ingredients on request" },
    ],
    unit: "",
    price: null,
  },
  {
    slug: "nachni-modak",
    marathi: "नाचणी मोदक",
    english: "Nachni Modak",
    tag: "🏋️ Health buddy",
    tagBg: "bg-mint",
    shortDesc: "Earthy ragi energy in festive Modak form. The gym buddy of the Ganapati squad.",
    funny: '"Protein shake नाही, मीच पुरे!" 🏋️',
    images: ["/images/takam_modak_nachni_v2.webp"],
    videos: [],
    story: [
      "नाचणी मोदक gives a familiar grain a fun festive avatar - earthy, grounded, and confidently different.",
      "For Reels, this character is Takam's cheerful health buddy: no lectures, just good Modak energy.",
    ],
    benefits: [
      { emoji: "🌾", title: "Earthy flavour", desc: "A distinctive ragi-inspired flavour profile for the festive table." },
      { emoji: "🏋️", title: "Health-buddy vibe", desc: "The sporty character of the seven-flavour lineup." },
      { emoji: "🎊", title: "Festive ready", desc: "A fun alternative for people who like exploring Modak flavours." },
      { emoji: "✨", title: "Seasonal special", desc: "Part of Takam's Ganapati Modak collection." },
    ],
    howToEnjoy: ["Bring it to a festive snack spread", "Enjoy it with warm chai ☕", "Let the health-buddy character introduce it on your Reel"],
    facts: [
      { label: "Flavour vibe", value: "Earthy, grounded, festive" },
      { label: "Campaign role", value: "The gym buddy" },
      { label: "Collection", value: "Ganapati Modak specials" },
      { label: "Details", value: "Ingredients on request" },
    ],
    unit: "",
    price: null,
  },
  {
    slug: "dryfruit-modak",
    marathi: "ड्रायफ्रुट मोदक",
    english: "Dryfruit Modak",
    tag: "👑 Premium pick",
    tagBg: "bg-peach",
    shortDesc: "Festive dry-fruit richness with big VIP energy. The polished one in the Modak gang.",
    funny: '"Premium आहे बाबा, पण attitude नाही." 👑',
    images: ["/images/takam_modak_dryfruit_v2.webp"],
    videos: [],
    story: [
      "ड्रायफ्रुट मोदक is the celebration-ready VIP of the lineup - festive, generous, and meant for a special plate.",
      "Its social character has calm confidence: polished on the outside, full of festive charm inside.",
    ],
    benefits: [
      { emoji: "👑", title: "Festive premium", desc: "A special-occasion flavour built for a more celebratory Modak box." },
      { emoji: "🎁", title: "Gift-ready mood", desc: "A natural pick for visiting family and festive exchanges." },
      { emoji: "🥳", title: "Party personality", desc: "The sophisticated, sunglasses-wearing mascot in the squad." },
      { emoji: "✨", title: "Seasonal special", desc: "Part of Takam's Ganapati Modak collection." },
    ],
    howToEnjoy: ["Make it the centrepiece of a festive dessert plate", "Share it after a family meal", "Use its VIP mascot for a premium-style Reel cover"],
    facts: [
      { label: "Flavour vibe", value: "Festive, rich, celebratory" },
      { label: "Campaign role", value: "The festive VIP" },
      { label: "Collection", value: "Ganapati Modak specials" },
      { label: "Details", value: "Ingredients on request" },
    ],
    unit: "",
    price: null,
  },
  {
    slug: "beet-modak",
    marathi: "बीट मोदक",
    english: "Beet Modak",
    tag: "💗 Pink icon",
    tagBg: "bg-peach",
    shortDesc: "The naturally bold pink personality of the collection. Sweet, stylish, and impossible to ignore.",
    funny: '"Pink आहे म्हणून underestimate करू नको." 💗',
    images: ["/images/takam_modak_beet_v2.webp"],
    videos: [],
    story: [
      "बीट मोदक brings the colour pop to Takam's Ganapati collection - a playful twist with serious festival presence.",
      "Its on-camera personality is the style icon: soft smile, strong confidence, and a completely scroll-stopping look.",
    ],
    benefits: [
      { emoji: "💗", title: "Colour-pop character", desc: "The visually bold flavour in the Modak lineup." },
      { emoji: "📸", title: "Camera-ready", desc: "Built to stand out in a festive box, post, or Reel cover." },
      { emoji: "🎊", title: "New-flavour energy", desc: "A cheerful option for curious Modak fans." },
      { emoji: "✨", title: "Seasonal special", desc: "Part of Takam's Ganapati Modak collection." },
    ],
    howToEnjoy: ["Put it front and centre on your festive plate", "Feature its pink character in a Reel cover", "Share it with the friend who picks the boldest flavour first"],
    facts: [
      { label: "Flavour vibe", value: "Playful, bold, bright" },
      { label: "Campaign role", value: "The pink icon" },
      { label: "Collection", value: "Ganapati Modak specials" },
      { label: "Details", value: "Ingredients on request" },
    ],
    unit: "",
    price: null,
  },
  {
    slug: "poshtik-modak",
    marathi: "पोष्टीक मोदक",
    english: "Poshtik Modak",
    tag: "🦸 All-rounder",
    tagBg: "bg-mint",
    shortDesc: "The feel-good all-rounder of the festive Modak box - cheerful, hearty, and ready to save snack time.",
    funny: '"Nutrition माझं middle name आहे." 🦸',
    images: ["/images/takam_modak_poshtik_v2.webp"],
    videos: [],
    story: [
      "पोष्टीक मोदक is the caring superhero of this festive lineup - the flavour that turns a snack moment into a feel-good moment.",
      "On Instagram, it wears a tiny cape and arrives with a simple message: good food can still have a fun personality.",
    ],
    benefits: [
      { emoji: "🦸", title: "All-rounder energy", desc: "The supportive, feel-good mascot of the Modak collection." },
      { emoji: "🎊", title: "Festive sharing", desc: "A cheerful special for family and celebration tables." },
      { emoji: "🌟", title: "Friendly flavour", desc: "The one that keeps the Modak squad together." },
      { emoji: "✨", title: "Seasonal special", desc: "Part of Takam's Ganapati Modak collection." },
    ],
    howToEnjoy: ["Add it to a mixed Modak platter", "Use its superhero story as a light-hearted Reel", "Share a feel-good bite with the family"],
    facts: [
      { label: "Flavour vibe", value: "Hearty, cheerful, balanced" },
      { label: "Campaign role", value: "The all-rounder" },
      { label: "Collection", value: "Ganapati Modak specials" },
      { label: "Details", value: "Ingredients on request" },
    ],
    unit: "",
    price: null,
  },
  {
    slug: "tilkund-modak",
    marathi: "तीळकुंद मोदक",
    english: "Tilkund Modak",
    tag: "🔥 Tiny, mighty",
    tagBg: "bg-mascot",
    shortDesc: "Sesame-led festive energy with a tiny-but-mighty personality. Small size, big entrance.",
    funny: '"Size छोटा; ताकद मोठी." 🔥',
    images: ["/images/takam_modak_tilkund_v2.webp"],
    videos: [],
    story: [
      "तीळकुंद मोदक is the pocket rocket of the collection - subtle sesame character with a spirited festival attitude.",
      "For content, it is the lovable rebel who knows it is small but refuses to be overlooked.",
    ],
    benefits: [
      { emoji: "🔥", title: "Bold personality", desc: "The tiny-but-mighty character in Takam's Modak squad." },
      { emoji: "🌰", title: "Sesame spotlight", desc: "A distinctive festive profile for sesame fans." },
      { emoji: "🎊", title: "Conversation starter", desc: "A flavour name and mascot designed to make people curious." },
      { emoji: "✨", title: "Seasonal special", desc: "Part of Takam's Ganapati Modak collection." },
    ],
    howToEnjoy: ["Add it to a variety platter", "Let its fire pose lead a short Reel", "Offer it as a small but memorable festive bite"],
    facts: [
      { label: "Flavour vibe", value: "Nutty, playful, spirited" },
      { label: "Campaign role", value: "The tiny rebel" },
      { label: "Collection", value: "Ganapati Modak specials" },
      { label: "Details", value: "Ingredients on request" },
    ],
    unit: "",
    price: null,
  },
  {
    slug: "gulkand-modak",
    marathi: "गुलकंद मोदक",
    english: "Gulkand Modak",
    tag: "🌹 Sweetheart",
    tagBg: "bg-peach",
    shortDesc: "Rose-preserve charm in Modak form. Soft, dreamy, and absolutely festival-date material.",
    funny: '"मी नाही dessert; मी प्रेमपत्र आहे." 🌹',
    images: [
      "/images/takam_modak_gulkand_v2.webp",
      "/images/takam_gulkand_gallery_plate.webp",
      "/images/takam_gulkand_gallery_closeup.webp",
      "/images/takam_gulkand_gallery_alt_plate.webp",
    ],
    videos: [],
    story: [
      "गुलकंद मोदक is the poet of the Takam Ganapati collection - rose-forward, charming, and a little dramatic in the best way.",
      "Its content character treats every bite like a love letter to festive mithai.",
    ],
    benefits: [
      { emoji: "🌹", title: "Romantic flavour", desc: "The soft, rose-inspired personality of the collection." },
      { emoji: "💌", title: "Reel-ready story", desc: "A natural character for a charming, talk-to-camera flavour introduction." },
      { emoji: "🎊", title: "Festive surprise", desc: "A different pick for people looking beyond the familiar." },
      { emoji: "✨", title: "Seasonal special", desc: "Part of Takam's Ganapati Modak collection." },
    ],
    howToEnjoy: ["Share on a festive dessert plate", "Use the poet mascot for a sweet Reel reveal", "Offer it to the rose-lover in your group"],
    facts: [
      { label: "Flavour vibe", value: "Floral, sweet, dreamy" },
      { label: "Campaign role", value: "The romantic poet" },
      { label: "Collection", value: "Ganapati Modak specials" },
      { label: "Details", value: "Ingredients on request" },
    ],
    unit: "",
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
    images: ["/images/surali-vadi-1.jpeg"],
    videos: [],
    story: [
      "सुरळी वडी (also called Khandvi's Marathi cousin) is the ultimate test of a home cook's skill - the besan batter must be cooked to the exact right consistency, spread paper-thin, and rolled into delicate spirals before it sets. One minute too long and it cracks; one minute too short and it won't roll.",
      "At Takam, every roll is made by hand the traditional way - slow-cooked besan and buttermilk batter, spread on the counter, rolled tight, and finished with a sizzling tadka of mustard seeds, sesame, fresh coriander, and coconut. No shortcuts, no mixes.",
    ],
    benefits: [
      { emoji: "🌱", title: "Protein-rich besan", desc: "Made from gram flour (besan), a good source of plant protein and fiber." },
      { emoji: "🥛", title: "Light on the stomach", desc: "Steam-cooked, not fried - a guilt-free snack for any time of day." },
      { emoji: "🌿", title: "Fresh tadka toppings", desc: "Coriander, coconut, sesame, and mustard tadka added fresh before delivery." },
      { emoji: "🏠", title: "Zero preservatives", desc: "Made fresh in small batches on order. What we eat at home is what you get." },
    ],
    howToEnjoy: [
      "As an evening snack with hot chai ☕",
      "As a starter at family gatherings - it disappears fast!",
      "In the tiffin box - stays soft for hours",
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
    images: ["/images/gulab-jamun-3.jpeg"],
    videos: [],
    story: [
      "Some desserts are trends. Gulab Jamun is an emotion. Soft khoya dumplings, fried low and slow to a deep golden brown, then left to soak in cardamom-kissed sugar syrup until every bite oozes happiness.",
      "Takam's gulab jamuns are made the homemade way - real khoya, hand-rolled, no ready-made mix. That's why they're impossibly soft inside with that signature dark caramelized outside.",
    ],
    benefits: [
      { emoji: "🥛", title: "Real khoya", desc: "Made with genuine khoya (milk solids) - not powder mixes. You can taste the difference." },
      { emoji: "✋", title: "Hand-rolled", desc: "Each jamun rolled by hand for the perfect crack-free, soft texture." },
      { emoji: "🌸", title: "Aromatic syrup", desc: "Cardamom-infused syrup, balanced sweetness - never cloying." },
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
    images: ["/images/aalive-ladu-2.jpeg"],
    videos: [],
    story: [
      "Long before 'superfood' was a marketing word, Marathi households were making अळीव लाडू - garden cress seed laddus - for new mothers, growing kids, and anyone who needed strength. It's ancestral nutrition science, disguised as a sweet.",
      "Takam's Aliv Ladu follows the classic recipe: halim (aliv) seeds soaked in coconut water or milk, cooked with jaggery, fresh coconut, and finished with dry fruits. Dense, chewy, and packed with goodness.",
    ],
    benefits: [
      { emoji: "🩸", title: "Iron powerhouse", desc: "Aliv (garden cress) seeds are among the richest plant sources of iron - traditionally given to boost hemoglobin." },
      { emoji: "💪", title: "Protein & fiber", desc: "Natural protein from seeds and dry fruits keeps you full and energized." },
      { emoji: "🍯", title: "Jaggery, not sugar", desc: "Sweetened with jaggery, which brings minerals along with sweetness." },
      { emoji: "🤱", title: "Traditional wellness", desc: "A time-honored recipe for new mothers, growing kids, and winter immunity." },
    ],
    howToEnjoy: [
      "One ladu with warm milk in the morning 🥛",
      "As a post-workout snack - the OG protein ball 💪",
      "For kids' tiffin - nutrition they'll actually eat happily",
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
