# Takam Website — Design Brainstorm

## Three Stylistic Approaches

### 1. Sticker Bomb Bazaar
Playful sticker-sheet aesthetic where every element looks like a die-cut sticker slapped onto a textured board. Loud, tactile, meme-adjacent.
**Probability:** 0.06

### 2. Retro Marathi Diner
1970s Indian sweet-shop signage meets modern Gen-Z irony — hand-painted-sign typography, halftone textures, and menu-board layouts.
**Probability:** 0.03

### 3. Pastel Pop Editorial
Clean editorial grid softened by pastel blocks and oversized quirky type; leans minimal, humor carried by copywriting only.
**Probability:** 0.08

---

## CHOSEN: Sticker Bomb Bazaar

**Design Movement:** Contemporary "sticker culture" / Y2K-revival flat cartoon design — same universe as the Takam logo (flat cartoon mascot, bold black outlines, pastel peach + mint). Influences: Duolingo's playfulness, MSCHF drops, Indian truck-art irreverence flattened into sticker form.

**Core Principles:**
1. Everything is a sticker: cards, buttons, and badges have thick black outlines, slight rotations (-3° to 3°), and hard offset shadows (no blur).
2. Humor first: copywriting is witty Marathi-English (Minglish) — the brand voice does the joking, the layout stays legible.
3. Bold flat color, zero gradients on UI surfaces (texture comes from dots/sprinkle patterns, not gradients).
4. Motion = bounce: things wobble, pop, and squash like stickers being peeled.

**Color Philosophy:**
The logo's pastel peach (#FFCBA9-ish) and mint (#A8D5BA-ish) are the brand pair — peach = warmth of homemade food, mint = freshness. Supported by cream paper background (#FFF8EF), mascot yellow (#F5C842) for accents, and near-black ink (#1E1B16) for outlines and text. One loud accent — tomato/chili red-orange (#E85D3D) — reserved for CTAs (order buttons) only, so ordering always pops.

**Layout Paradigm:**
Asymmetric "sticker board" — sections are tilted sticker panels overlapping a cream paper background with subtle dot-grid texture. Hero is split: left = big rotated headline stack + CTA, right = mascot logo popping out with floating mini-stickers (steam swirls, stars, "ekdum fresh!" badges). Product cards are tilted alternately like stickers slapped on. Marquee ticker strips (scrolling text bands) divide sections instead of straight lines.

**Signature Elements:**
1. Die-cut sticker cards: white sticker-edge border + black outline + hard offset shadow, each rotated slightly.
2. Scrolling marquee bands in mint/peach with Minglish phrases ("घरगुती ✦ चविष्ट ✦ मस्त ✦ टाकम").
3. Sprinkle/coriander-fleck confetti pattern echoing the mascot's garnish.

**Interaction Philosophy:**
Interactions feel like playing with stickers — hover lifts a card and straightens its rotation; buttons squash on press (scale 0.96); the mascot gently bobs. Nothing slower than 300ms.

**Animation:**
- Entrances: pop-in with slight overshoot (scale 0.9 → 1.02 → 1), staggered 60ms.
- Hover on sticker cards: rotate to 0°, translate -4px, shadow grows (150ms ease-out).
- Marquee bands scroll continuously (CSS animation, slow, pausable).
- Mascot idle bob: 3s gentle float loop.
- Respect prefers-reduced-motion.

**Typography System:**
- Display: "Baloo 2" (chubby, rounded, supports Devanagari!) for headlines — matches the logo's fat block letters.
- Body: "Nunito" for readable friendly body text.
- Devanagari: Baloo 2 covers Devanagari natively — perfect for टाकम, सुरळी वडी, etc.
- Hierarchy: massive display headlines (clamp 2.5–5rem, 800 weight), chunky subheads, roomy 1.6 line-height body.

**Brand Essence:** टाकम — homemade Marathi snacks with zero uncle-ji energy; for young Maharashtrians who crave aaji's food but live on memes. Personality: goofy, proud, fresh.

**Brand Voice:** Minglish, self-aware, food-pun heavy. Headlines joke, subtext reassures quality.
- Example 1: "आजीच्या हातची चव. तुमच्या दारात." (Aaji-approved taste, delivered to your door)
- Example 2: "Swiggy कशाला? टाकम ला call करा!"

**Wordmark & Logo:** Existing generated mascot logo (Surali Vadi with sunglasses + टाकम block text) is the primary mark; circular badge version used as favicon/stamp.

**Signature Brand Color:** Mascot Yellow #F5C842 — the Surali Vadi yellow, unmistakably Takam.

## Style Decisions
- Red-orange #E85D3D is reserved for primary ordering actions only; non-CTA emphasis must use mascot yellow, mint, peach, or black outlined sticker treatments.
- Product photography must be treated as part of the sticker world: warm, tactile, bordered/cutout (polaroid-style), and supported by doodles or badges rather than plain catalog framing.
- Every major section should include at least one unmistakable sticker-board gesture: rotation, overlap, die-cut edge, hard shadow, marquee strip, floating badge, or doodle motif.
- Minglish voice extends to UI chrome: nav labels, badges, and buttons speak Takam, not generic website.
