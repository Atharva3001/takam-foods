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

export interface GanapatiScheduleDay {
  day: string;
  date: string;
  name: string;
  slugs: string[];
  mood: string;
}

export const GANAPATI_SCHEDULE: GanapatiScheduleDay[] = [
  { day: "१", date: "14 Sep", name: "Opening aarti combo", slugs: ["ukadiche-modak", "dink-modak", "khava-modak", "gulkand-modak"], mood: "🙏 Bappa entry with the creamy gang" },
  { day: "२", date: "15 Sep", name: "Pink welcome day", slugs: ["ukadiche-modak", "poshtik-modak", "khava-modak", "beet-modak"], mood: "💗 feel-good, creamy, colour pop" },
  { day: "३", date: "16 Sep", name: "Festive VIP day", slugs: ["ukadiche-modak", "dryfruit-modak", "nachni-modak", "gulkand-modak"], mood: "👑 richness, earthy energy and rose" },
  { day: "४", date: "17 Sep", name: "Power and comfort day", slugs: ["ukadiche-modak", "tilkund-modak", "dink-modak", "khava-modak"], mood: "🔥 tiny, mighty and creamy" },
  { day: "५", date: "18 Sep", name: "Earthy colour day", slugs: ["ukadiche-modak", "nachni-modak", "poshtik-modak", "beet-modak"], mood: "🏋️ grounded, hearty and bright" },
  { day: "६", date: "19 Sep", name: "Premium sweetheart day", slugs: ["ukadiche-modak", "dryfruit-modak", "tilkund-modak", "gulkand-modak"], mood: "🌹 festive VIP meets tiny rebel" },
  { day: "७", date: "20 Sep", name: "Strength coach day", slugs: ["ukadiche-modak", "dink-modak", "nachni-modak", "khava-modak"], mood: "💪 power, earthy vibes and comfort" },
  { day: "८", date: "21 Sep", name: "Feel-good VIP day", slugs: ["ukadiche-modak", "poshtik-modak", "dryfruit-modak", "beet-modak"], mood: "🦸 balanced, premium and pink" },
  { day: "९", date: "22 Sep", name: "Tiny sweetheart day", slugs: ["ukadiche-modak", "nachni-modak", "tilkund-modak", "gulkand-modak"], mood: "✨ earthy, mighty and dreamy" },
  { day: "१०", date: "23 Sep", name: "Power comfort combo", slugs: ["ukadiche-modak", "dink-modak", "poshtik-modak", "khava-modak"], mood: "🎊 Bappa farewell warm-up" },
  { day: "११", date: "24 Sep", name: "Bappa farewell mixed box", slugs: ["ukadiche-modak", "dryfruit-modak", "nachni-modak", "gulkand-modak"], mood: "🙏 final day, full Takam gang energy" },
];

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
    slug: "khava-modak",
    marathi: "खवा मोदक",
    english: "Khava Modak",
    tag: "🥛 Creamy classic",
    tagBg: "bg-peach",
    shortDesc: "Rich khava goodness in a festive Modak avatar - creamy, comforting, and Bappa-ready.",
    funny: '"Creamy आहे, boring नाही!" 🥛',
    images: ["/images/takam_modak_khava.webp"],
    videos: [],
    story: [
      "खवा मोदक brings the rich, creamy comfort of homemade khava into the Ganapati Modak gang. It is festive, indulgent, and made for the person who says - एक अजून घेऊ का?",
      "At Takam, every Khava Modak is made to order in small batches so the texture stays soft, rich, and celebration-ready.",
    ],
    benefits: [
      { emoji: "🥛", title: "Creamy khava vibe", desc: "A rich, comforting Modak for classic sweet lovers." },
      { emoji: "🎊", title: "Festive favourite", desc: "A celebration-ready addition to the Ganapati Modak spread." },
      { emoji: "✋", title: "Made in small batches", desc: "Freshly prepared to order with Takam's homemade touch." },
      { emoji: "💛", title: "Comfort-food energy", desc: "The creamy classic of the new Modak lineup." },
    ],
    howToEnjoy: [
      "Serve as part of your Ganapati naivedya platter 🙏",
      "Pair with warm chai for a creamy festive break ☕",
      "Share it with the family - or keep one extra for yourself",
    ],
    facts: [
      { label: "Flavour vibe", value: "Creamy, rich, festive" },
      { label: "Campaign role", value: "The creamy classic" },
      { label: "Collection", value: "Ganapati Modak specials" },
      { label: "Details", value: "Ingredients on request" },
    ],
    unit: "per box",
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
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
