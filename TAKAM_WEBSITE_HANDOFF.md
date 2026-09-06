# Takam Website Development Handoff

**Purpose:** This document is the complete continuation brief for another LLM or developer taking over the Takam website. Give this file to the next model together with the latest GitHub repository so it can continue work without needing the original chat history.

**Prepared for:** The Takam website continuation project  
**Latest GitHub repository:** `https://github.com/Atharva3001/takam-foods`  
**Latest verified GitHub branch:** `main`  
**Latest verified GitHub commit:** `18996dc` - `Fix GitHub image asset paths`  
**Current product/project name:** Takam - Homemade Marathi Delights  
**Primary live domain previously configured in Manus:** `takamfood-36suqhkw.manus.space`

---

## 1. Executive summary

Takam is a homemade Marathi food brand from Maharashtra. The website began as a broader homemade-snacks catalog and was later refocused around the Ganapati season and a collectible **Modak Gang** campaign. The current visual direction is a playful **Sticker Bomb Bazaar**: bold Marathi display typography, thick black outlines, hard offset shadows, tilted sticker panels, pastel peach and mint, mascot yellow accents, cream paper backgrounds, and Gen-Z Marathi-English copy.

The website currently has three important experiences: the homepage, a dedicated Ganapati Modak campaign hub, and individual product pages. The visible product catalog is intentionally centered on Modaks for the Ganapati season. The main conversion action is **WhatsApp enquiry only**. Users choose a quantity first; then a popup collects name, mobile number, and delivery area before opening a prefilled WhatsApp message. Direct phone-call CTAs and visible direct phone-number promotion were removed from the UI.

The latest work restored the Ukadiche Modak image in the homepage Ganapati collection and improved the disabled enquiry behavior. The latest GitHub work also fixed a site-wide image regression caused by mixing WebDev `/manus-storage/` URLs with GitHub `/images/` assets. The GitHub version must continue using `/images/...` references.

> The most important rule for continuation: **Do not blindly copy the WebDev source into the GitHub repository.** WebDev and GitHub use different asset URL conventions. WebDev uses managed `/manus-storage/...` paths; the GitHub-hosted copy uses committed files in `client/public/images/` and must reference them as `/images/...`.

---

## 2. Brand identity and creative direction

### 2.1 Brand positioning

**Brand:** Takam / टाकम  
**Category:** Homemade Marathi snacks and festive foods  
**Audience:** Young Maharashtrians and Gen-Z customers who want aaji-style homemade taste without overly traditional or uncle-style branding.  
**Brand promise:** Homemade, fresh, Marathi, funny, generous, and made with real ingredients rather than shortcuts.  
**Brand personality:** Goofy, proud, fresh.  
**Brand essence:** “Homemade Marathi snacks with zero uncle-ji energy.”

The brand should feel like an energetic local food drop rather than a formal restaurant, generic ecommerce store, or old-fashioned sweet shop. It should be culturally Marathi without becoming visually dated. The humor is a strategic differentiator.

### 2.2 Chosen design movement

The chosen direction is **Sticker Bomb Bazaar**. It is a contemporary sticker-culture and Y2K-revival flat-cartoon style, influenced by the Takam mascot logo, Indian truck-art irreverence, playful Duolingo-like character energy, and internet drop culture such as MSCHF. The site should feel like a tactile sticker board or a wall covered in collectible food stickers.

The three original brainstorm options were Sticker Bomb Bazaar, Retro Marathi Diner, and Pastel Pop Editorial. Only Sticker Bomb Bazaar was selected. Do not drift toward the other two directions unless the user explicitly requests a rebrand.

### 2.3 Core design principles

1. **Everything is a sticker.** Cards, buttons, badges, tags, and notices use thick near-black outlines, slight rotations, and hard offset shadows rather than soft blurred shadows.
2. **Humor comes first.** Copy should be witty Marathi-English Minglish. The visual system stays legible and the humor lives in headlines, badges, microcopy, and product personalities.
3. **Bold flat color, not gradients.** Texture comes from paper backgrounds, sprinkle/confetti marks, doodles, and overlapping panels. Avoid generic gradients on UI surfaces.
4. **Motion feels like bounce.** Interactions should feel like stickers being lifted, pressed, peeled, or nudged. Use short, physically intuitive motion and respect reduced-motion preferences.

### 2.4 Color system

| Role | Color | Guidance |
|---|---|---|
| Cream paper | `#FFF8EF` approximately | Main page background; warm paper rather than sterile white. |
| Mascot yellow | `#F5C842` | Signature Takam color; highlights, stickers, selected quantity states, and strong accents. |
| Peach | `#FFCBA9` approximately | Homemade warmth, product panels, festive softness. |
| Mint | `#A8D5BA` approximately | Freshness, secondary accents, selected states, badges. |
| Ink | `#1E1B16` approximately | Main text, outlines, borders, hard shadows. |
| Tomato/chili red-orange | `#E85D3D` approximately | Reserved for primary ordering actions and urgent conversion moments. Do not use it as a general decorative color. |

The actual design tokens are maintained in `client/src/index.css`. Preserve those tokens rather than scattering new arbitrary colors through JSX.

### 2.5 Typography

The chosen display font is **Baloo 2**, including its Devanagari support. It is used for Marathi headlines, brand-like labels, buttons, and playful display text. The body font is **Nunito**, chosen for a friendly and readable feel. The hierarchy uses very large display headlines, chunky subheads, and comfortable body line-height.

Do not replace these with Inter or another generic SaaS font. If typography needs to change, first check whether the change reinforces the Sticker Bomb Bazaar philosophy.

### 2.6 Signature visual motifs

Use the following recurring motifs throughout the site:

- Die-cut sticker cards with thick black outlines and hard offset shadows.
- Slight rotations, generally between `-3deg` and `3deg`, with hover straightening.
- Scrolling marquee bands with phrases such as `घरगुती ✦ चविष्ट ✦ मस्त ✦ टाकम`.
- Sprinkle, coriander-fleck, steam, star, and doodle patterns.
- Polaroid-style product photography framed inside the sticker world.
- Floating mini-badges such as “एकदम fresh!”, “भाप्पा special”, and flavour personality labels.

### 2.7 Motion rules

Keep normal interaction transitions under 300ms. Buttons should squash on press. Sticker cards can lift and straighten on hover, with a slightly larger hard shadow. Entrance effects can use a small scale-up with staggered timing, but never make content inaccessible or slow. Use `prefers-reduced-motion` for non-essential animation. Avoid animating layout properties such as width, height, padding, or margin when transform and opacity are enough.

### 2.8 Logo and wordmark

The primary logo is the generated Takam mascot logo featuring a playful food character, sunglasses, and the Marathi wordmark `टाकम`. The circular badge version acts as a stamp, favicon-like mark, and decorative corner asset. The wordmark must remain distinctive and must not be replaced with a plain default-font text logo.

The current code uses `SITE_ASSETS.logoC` and related logo assets. Preserve the supplied logo artwork when possible.

---

## 3. Voice, language, and copy rules

### 3.1 Voice

The site uses **Minglish**: Marathi-English code-switching with funny, self-aware Gen-Z energy. The brand is not formal, corporate, or overly polished. It should sound like a funny homemade-food friend who knows Marathi culture and internet humor.

Good examples from the established direction include:

- `आजीच्या हातची चव. तुमच्या दारात.`
- `Swiggy कशाला? टाकमला WhatsApp करा!`
- `मोदक बोलतोय... ऐकणार का?`
- `घरगुती । चविष्ट । मस्त`
- `Premium आहे बाबा, पण attitude नाही.`
- `Size छोटा; ताकद मोठी.`

Use regular hyphens `-` instead of em dashes `—` everywhere in user-facing copy and source copy. This is an explicit user requirement.

### 3.2 Copy constraints

- Keep English process instructions in English so all customers can understand them.
- Keep Marathi flavour names accurate and consistent.
- Use funny product personalities, but never make unsupported health or nutrition claims.
- Prices currently visible in the product quantity selector are temporary indicative prices. The user will provide final pricing later. Do not present them as final unless updated by the user.
- Do not fabricate customer reviews, ratings, testimonials, or social proof.
- Do not reintroduce direct-call CTAs or a visible phone number across the site. The approved conversion route is WhatsApp enquiry.
- Do not use generic filler such as “Welcome to our website” or “Get started today.”
- Product photography must remain realistic. Enhancements may improve crop, exposure, warmth, sharpness, and clarity, but must not make real Modaks look synthetic.

---

## 4. Current website structure

### 4.1 Routes

The current router is in `client/src/App.tsx`:

| Route | Component | Purpose |
|---|---|---|
| `/` | `Home.tsx` | Main brand homepage, hero, Modak collection, brand story, and general order CTA. |
| `/ganapati-modak-special` | `GanapatiSpecial.tsx` | Dedicated 11-day Ganapati Modak campaign hub with timetable and English ordering process. |
| `/product/:slug` | `ProductPage.tsx` | Reusable individual product page with gallery, product story, benefits, quantity selector, and WhatsApp enquiry flow. |
| `/404` | `NotFound.tsx` | Explicit not-found route. |
| fallback | `NotFound.tsx` | Final fallback. |

A scroll-to-top effect is implemented in `App.tsx`, so navigating from one product to another starts at the first fold rather than preserving the previous scroll position.

### 4.2 Homepage

`client/src/pages/Home.tsx` includes:

- Sticker Bomb Bazaar header with Takam logo and mobile hamburger navigation.
- Main hero with the approved mascot, Marathi headline, Minglish supporting copy, and a button that leads visitors to the Modak collection.
- Ganapati Modak collection section with image-backed cards for Ukadiche, Dink, Nachni, Dryfruit, Beet, Poshtik, Tilkund, and Gulkand.
- Ukadiche Modak is the first collection card and uses the mascot hero asset. It is the “OG Star” and must not revert to a text-only placeholder.
- Brand-story section about homemade Marathi food and Takam’s kitchen philosophy.
- General brand/product context sections and a WhatsApp CTA.
- Footer with Takam branding and Maharashtra positioning.

The homepage collection uses the image array declared locally in `Home.tsx`; product pages use the central data in `client/src/lib/products.ts`. Keep those two sources visually and semantically consistent when adding products.

### 4.3 Ganapati campaign hub

`client/src/pages/GanapatiSpecial.tsx` is the seasonal conversion hub. Its most important requirements are:

- The hero is mobile-first and should not overwhelm the first fold with too much text.
- The Modak characters are grouped in a large yellow circle or similarly strong visual composition.
- The hero should not carry immediate Schedule and WhatsApp buttons if that makes the first fold too dense. The timetable and ordering flow provide the conversion path below.
- All Modaks are **made to order** and available in **limited quantity**.
- Ukadiche Modak is available every day across the full 11-day Ganapati timetable because it is a crucial item.
- The timetable should show three variety options per day, with Ukadiche present every day. The remaining varieties rotate according to the existing schedule in the file.
- Each timetable Modak should link to its product page.
- The page contains a short, visually clear, English-only “How to Order” process.

Approved English ordering process:

1. Choose your Modak from the day-wise timetable.
2. Open that Modak’s page.
3. Select quantity and delivery area.
4. Send the enquiry to Takam on WhatsApp.
5. Wait for Takam’s WhatsApp confirmation and payment QR code.
6. Pay and receive final confirmation; delivery happens on the selected day.

This process may be shortened visually, but the meaning must remain intact.

### 4.4 Product pages

`client/src/pages/ProductPage.tsx` is a reusable template. It currently provides:

- Breadcrumb navigation.
- Gallery with a mascot hero first when available and real product photos after it.
- Full-image framing for mascot assets using `object-contain`; realistic food photography generally uses `object-cover` with restrained saturation enhancement.
- Product title in Marathi and English.
- Short description and funny character line.
- Made to Order and Limited Quantity notices.
- Quantity selector.
- Product story, benefits, how-to-enjoy section, quick facts, and related Modak links.
- Quantity-first WhatsApp enquiry flow.
- Popup for customer details.

The quantity selector is intentionally before the customer-details popup. The button should never open the popup without a valid quantity selection.

The latest behavior is that the CTA remains visibly present even if quantity is not selected. It is styled as unavailable but is still clickable. When clicked without a quantity, it scrolls back to the quantity selector and shows an explicit message such as `First select a quantity above` or `Select a quantity above to continue`. Preserve this behavior when refactoring.

### 4.5 Mobile navigation

`client/src/components/MobileNav.tsx` provides the hamburger menu. The mobile experience is a primary design constraint, not a later breakpoint adjustment. Maintain thumb-friendly buttons, readable Marathi, and an easy route back to Home and Ganapati Special.

---

## 5. Product lineup and personalities

The central product source of truth is `client/src/lib/products.ts`. Current slugs are:

| Slug | Marathi name | English name | Personality/tagline direction |
|---|---|---|---|
| `ukadiche-modak` | उकडीचे मोदक | Ukadiche Modak | Our Star / The OG Star; traditional steamed Ganapati favourite. |
| `dink-modak` | डिंक मोदक | Dink Modak | `मी गोड आहे, पण weak नाही 💪` - strength coach. |
| `nachni-modak` | नाचणी मोदक | Nachni Modak | `Protein shake नाही, मीच पुरे 🏋` - health/gym buddy. |
| `dryfruit-modak` | ड्रायफ्रुट मोदक | Dryfruit Modak | `Premium आहे बाबा, पण attitude नाही 👑` - polished VIP. |
| `beet-modak` | बीट मोदक | Beet Modak | `Pink आहे म्हणून underestimate करू नको 💗` - bright pink icon. |
| `poshtik-modak` | पोष्टीक मोदक | Poshtik Modak | `Nutrition माझं middle name आहे 🦸` - all-rounder. |
| `tilkund-modak` | तीळकुंद मोदक | Tilkund Modak | `Size छोटा; ताकद मोठी 🔥` - tiny but mighty. |
| `gulkand-modak` | गुलकंद मोदक | Gulkand Modak | `मी नाही dessert; मी प्रेमपत्र आहे 🌹` - romantic sweetheart. |

Legacy/non-seasonal products remain in the product data for possible future use:

- `surali-vadi` - सुरळी वडी
- `gulab-jamun` - गुलाबजाम
- `aliv-ladu` - अळीव लाडू

The old catalog page was intentionally removed from the active route structure and should not be reintroduced without a deliberate product-strategy decision.

---

## 6. Quantity and WhatsApp ordering rules

### 6.1 Quantity options

All Modaks have these temporary indicative quantity options:

| Option | Current indicative price |
|---|---:|
| 11 Pieces | ₹320 |
| 21 Pieces | ₹580 |
| 250 gm | ₹320 |
| 500 gm | ₹590 |
| 1 kg | ₹1,100 |
| Custom | Price on confirmation |

Ukadiche additionally has:

| Option | Current indicative price |
|---|---:|
| 7 Pieces | ₹210 |

These prices are placeholders until the user supplies final prices. Keep the temporary state visually clear as “Indicative prices for now.”

### 6.2 Popup fields

After a valid quantity is selected and the user clicks the enquiry CTA, the popup collects:

- Name
- Mobile Number
- Delivery Area

Delivery dropdown options:

- Singhgad Road
- Kothurd
- Deccan
- Nanded City
- Baner
- Pashan
- Baavdhan
- Other area

If `Other area` is selected, show a custom-area input.

The mobile field validates an Indian 10-digit number beginning with 6-9. The WhatsApp text includes the product name, customer name, mobile number, selected quantity, indicative price, and delivery area.

### 6.3 Approved order journey

1. Customer chooses the Modak from the timetable.
2. Customer opens the linked product page.
3. Customer selects quantity.
4. Customer clicks the WhatsApp enquiry CTA.
5. Customer enters name, mobile number, and delivery area in the popup.
6. A prefilled WhatsApp message opens.
7. Takam confirms the order on WhatsApp and shares a QR code for payment.
8. Customer pays and receives final confirmation.
9. Order is delivered on the selected day.

Do not turn this into direct checkout or online payment unless the user explicitly requests a new commerce integration.

---

## 7. Asset system and image rules

### 7.1 Two environments, two image conventions

This is the most important technical handoff detail.

**Manus WebDev project:** references managed assets as `/manus-storage/<filename>`. The active project path is `/home/ubuntu/takam-website`. WebDev static asset originals are stored outside the project in `/home/ubuntu/webdev-static-assets/` and are managed by the WebDev asset lifecycle.

**GitHub-hosted repository:** references committed assets as `/images/<filename>`. The files live in `client/public/images/` in `/home/ubuntu/takam-foods-github`. The latest GitHub image repair changed all source references back to `/images/...` and verified 22 referenced images with zero missing files.

Never copy the WebDev source directly into the GitHub working copy without transforming asset URLs. That exact mistake caused a site-wide image outage after the previous sync.

### 7.2 Important GitHub image files

The GitHub repository includes optimized WebP assets such as:

- `takam_hero_bg.webp`
- `takam_kitchen_illustration.webp`
- `takam_logo_A_transparent.webp`
- `takam_logo_C_transparent.webp`
- `takam_modak_beet_v2.webp`
- `takam_modak_dink_v2.webp`
- `takam_modak_dryfruit_v2.webp`
- `takam_modak_gulkand_v2.webp`
- `takam_modak_nachni_v2.webp`
- `takam_modak_poshtik_v2.webp`
- `takam_modak_tilkund_v2.webp`
- `takam_ukadiche_modak_hero_mascot.webp`
- `takam_gulkand_gallery_plate.webp`
- `takam_gulkand_gallery_closeup.webp`
- `takam_gulkand_gallery_alt_plate.webp`
- Existing real-food photos such as `modak-2.webp`, `modak-3.webp`, `modak-4.webp`, `modak-5.webp`, `surali-vadi-1.jpeg`, `gulab-jamun-3.jpeg`, and `aalive-ladu-2.jpeg`.

Prefer optimized WebP for new web assets. Do not commit oversized source PNGs unless there is a specific print or transparency requirement.

### 7.3 Product photography treatment

Real food photos must remain believable. Safe treatment includes:

- Gentle crop adjustment.
- Exposure and white-balance correction.
- Mild contrast and sharpness improvement.
- Warm, appetizing color correction.
- Natural background cleanup.

Do not turn a real Modak into a plastic render or an obviously AI-generated object. The gallery should combine the mascot hero with realistic photos so customers understand both the campaign character and the actual food.

---

## 8. Social and packaging context

The website is part of a larger Takam Ganapati content system. The Modak characters are also used in Instagram posts, Reel covers, voiceovers, motion transitions, background music, and collectible packaging.

The established Reel format includes:

- A Takam logo intro.
- Modak character name on screen.
- A flavour-specific character voice in Marathi or Minglish depending on the asset.
- Ingredient motion graphics.
- A playful flavour-specific background track.
- A 6-10 second outro with Takam branding and an order CTA.
- Female voiceover where voiceover is requested.

The packaging system uses collectible lid stickers. Each Modak has its own visual theme and tagline. The Takam logo should be small in the corner, while contact details and other order information belong on the back of the box rather than the lid.

Relevant tagline set:

| Modak | Lid tagline |
|---|---|
| Dink | `मी गोड आहे, पण weak नाही 💪` |
| Nachni | `Protein shake नाही, मीच पुरे 🏋` |
| Dryfruit | `Premium आहे बाबा, पण attitude नाही 👑` |
| Beet | `Pink आहे म्हणून underestimate करू नको 💗` |
| Poshtik | `Nutrition माझं middle name आहे 🦸` |
| Tilkund | `Size छोटा; ताकद मोठी 🔥` |
| Gulkand | `मी नाही dessert; मी प्रेमपत्र आहे 🌹` |
| Ukadiche | Keep the previously approved unchanged tagline/sticker direction. |

Do not change the website into a packaging or social-media-only style. The website and packaging should feel like the same Takam universe.

---

## 9. Technical architecture

| Area | Current implementation |
|---|---|
| Framework | React 19 with TypeScript. |
| Build tool | Vite 7. |
| Styling | Tailwind CSS 4 plus custom CSS tokens in `client/src/index.css`. |
| Components | shadcn/ui primitives are available under `client/src/components/ui/`. |
| Routing | Wouter. |
| Theme | Light theme through `ThemeProvider`; the design is cream/pastel rather than dark. |
| Icons | `lucide-react`. |
| Notifications | Sonner/shadcn toaster is available. |
| Backend | None; this is a static frontend. |
| Payments | Not integrated. Payment is confirmed manually through WhatsApp and QR sharing. |
| Database | Not integrated. |
| Auth | Not integrated. |
| Deployment | Manus WebDev supports a live preview and checkpoint publishing; GitHub repository is also maintained for external continuation/hosting. |

Important source files:

- `client/src/App.tsx` - routes, theme provider, scroll reset.
- `client/src/index.css` - global design tokens, sticker styles, colors, typography support, marquee styles.
- `client/src/lib/products.ts` - product data, product image references, product copy, `PHONE`, `SITE_ASSETS`, and `getProduct`.
- `client/src/pages/Home.tsx` - homepage and homepage collection cards.
- `client/src/pages/GanapatiSpecial.tsx` - campaign hub, timetable, and ordering instructions.
- `client/src/pages/ProductPage.tsx` - reusable product detail page and quantity-first WhatsApp flow.
- `client/src/components/MobileNav.tsx` - responsive hamburger navigation.
- `ideas.md` - committed design brainstorm and style decisions.

Useful project scripts:

```bash
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
pnpm run dev
```

The standard validation sequence before committing is:

```bash
pnpm run check
pnpm run build
```

---

## 10. GitHub workflow and image-sync safety

The authoritative continuation repository is:

```text
https://github.com/Atharva3001/takam-foods
```

The GitHub CLI is already configured for the user. A safe continuation workflow is:

```bash
gh repo clone Atharva3001/takam-foods
cd takam-foods
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
```

Before changing image references, inspect whether the source is a WebDev copy or the GitHub-hosted copy. In GitHub, verify all image references with:

```bash
grep -Rho --exclude-dir=node_modules -E '/images/[^"'"'"' )}]+' client/src | sort -u
```

Then verify that each referenced file exists:

```bash
python3 - <<'PY'
import re
from pathlib import Path
refs = set()
for p in Path('client/src').rglob('*'):
    if p.is_file() and p.suffix in {'.ts', '.tsx', '.css', '.html'}:
        refs.update(re.findall(r'/images/([^"\\' )}]+)', p.read_text(encoding='utf-8')))
missing = [x for x in sorted(refs) if not (Path('client/public/images') / x).exists()]
print('references:', len(refs), 'missing:', len(missing))
if missing:
    print('\n'.join(missing))
    raise SystemExit(1)
PY
```

Do not use `git reset --hard` to recover from errors. Review the diff and use a deliberate corrective commit. If working in the Manus WebDev project, use the project checkpoint/rollback workflow instead of destructive Git operations.

Recent relevant commits:

| Commit | Meaning |
|---|---|
| `732d548` | Optimized Takam image delivery with WebP assets. |
| `9573cdc` | Synced Ganapati website updates and Gulkand gallery. |
| `14d2739` | Fixed Ukadiche homepage image and quantity guidance. |
| `18996dc` | Fixed GitHub image asset paths after the site-wide image regression. |

---

## 11. Completed development history

The project started as a PDF/product catalog request. The user first shared Marathi homemade products including Surali Vadi, Gulab Jamun, and Aliv Ladu, with pricing to be supplied later and the Takam contact number for ordering.

The user then decided a website would be more flexible than a PDF. The original website included a catalog, product pages, phone-based contact, and broader homemade products. A logo exploration followed. The user rejected overly traditional marks and chose a funny Gen-Z style based on the word Takam. The Surali Vadi was selected as the original USP/mascot direction. Variation work led to the current sticker-like mascot/logo family.

The catalog later expanded to include Ukadiche Modak as the main star item and then seven additional Ganapati flavours: Dink, Nachni, Dryfruit, Beet, Poshtik, Tilkund, and Gulkand. The user wanted separate product pages, multiple images, videos, benefits, and funny Modak personalities.

A Ganapati Special landing page and 11-day timetable were created. The timetable initially used limited Ukadiche days, but the user explicitly changed the requirement so Ukadiche must be available every day. The hub and product pages were then updated with Made to Order and Limited Quantity notices and a six-step English ordering process.

The ordering flow was simplified several times. Direct phone links and “lagech magva”/call-style CTAs were removed. Visible product prices were removed at one point, then temporary indicative prices were added after the user requested them, with final prices still pending. The final flow is quantity first, then a popup with Name, Mobile Number, and Delivery Area, then a prefilled WhatsApp enquiry.

The mobile experience was refined with a hamburger menu. Product-page navigation was fixed to start at the top of the page. Ukadiche’s hero framing was changed to preserve the full mascot using contain-style framing. The homepage Modak collection was later refocused on the Ganapati campaign.

The user produced a larger content engine around the Modaks: Marathi scripts, female voiceovers, ingredient motion graphics, intros, outros, CTA clips, background tracks, Reel covers, packaging boxes, background themes, and collectible lid stickers. The design system and personality rules in this document should keep all future assets visually consistent.

The site was optimized to WebP for performance. A later Gulkand update added three enhanced real product photos to the Gulkand gallery while keeping the mascot hero first. The final GitHub image-path regression was caused by mixing `/manus-storage/` and `/images/` conventions; it was repaired in commit `18996dc`.

---

## 12. Known pending work

The user’s main outstanding website/content requests are:

1. Replace the temporary indicative quantity prices with final prices once supplied.
2. Continue adding real product photos for the remaining Modak varieties, using restrained realistic enhancement.
3. Complete Reel packages for any remaining flavours, especially Gulkand and Ukadiche if not already finalized.
4. Continue syncing meaningful website updates to `Atharva3001/takam-foods`.
5. Consider adding a lightweight availability/status indicator to the timetable, but do not overcomplicate the first-fold mobile experience.
6. Consider adding an analytics event for quantity selection and WhatsApp enquiry clicks if measurable conversion data is needed.
7. Keep all order fulfillment manual through WhatsApp unless the user explicitly approves a full commerce/payment integration.

---

## 13. Recommended continuation instructions for another LLM

The next LLM should begin by cloning or opening `Atharva3001/takam-foods`, reading this handoff file and `ideas.md`, and inspecting `client/src/lib/products.ts`, `Home.tsx`, `GanapatiSpecial.tsx`, and `ProductPage.tsx`. It should run `pnpm install --frozen-lockfile`, `pnpm run check`, and `pnpm run build` before editing.

The next LLM should preserve the current visual direction rather than redesigning the site from scratch. Any proposed change should answer: **Does this reinforce or dilute Sticker Bomb Bazaar?** It should favor mobile-first clarity, real product imagery, short Minglish copy, hard sticker shadows, playful rotations, and a strong but uncluttered Ganapati conversion journey.

Before changing product data, inspect whether the change affects the homepage collection, the timetable, the product page, the WhatsApp message, the Reel/packaging personality, or all of them. `products.ts` is the data source of truth for product pages, while `Home.tsx` has a separate homepage collection array that must be kept in sync.

Before adding or changing images, determine the target environment. Use `/manus-storage/...` only in the Manus WebDev project. Use `/images/...` plus a committed file in `client/public/images/` in the GitHub repository. Test every new image reference with a script or direct existence check.

Never fabricate reviews or testimonials. Never alter real product photos so aggressively that they stop looking real. Never silently turn temporary prices into final prices. Never restore the old catalog page or phone-call CTA without user approval.

---

## 14. Suggested context prompt for the next LLM

The following prompt can be pasted together with this file and the GitHub repository:

> You are continuing the Takam website project. First read `TAKAM_WEBSITE_HANDOFF.md` and `ideas.md`, then inspect the existing code before making changes. Takam is a homemade Marathi food brand with a playful Gen-Z Sticker Bomb Bazaar identity. Preserve the existing visual system: cream paper, mascot yellow, peach, mint, near-black ink outlines, hard offset shadows, tilted sticker cards, Baloo 2/Nunito typography, Marathi-English Minglish copy, and the existing mascot/logo assets. The current focus is the Ganapati Modak campaign with Ukadiche, Dink, Nachni, Dryfruit, Beet, Poshtik, Tilkund, and Gulkand Modaks. The primary ordering flow is quantity-first WhatsApp enquiry with a Name/Mobile/Delivery Area popup. Ukadiche is available every day in the 11-day timetable. Use real product photos realistically. In the GitHub repository, all image references must use `/images/...` and must resolve to files in `client/public/images/`; do not copy WebDev `/manus-storage/...` paths into GitHub. Run `pnpm run check` and `pnpm run build` before committing. Do not fabricate reviews, ratings, testimonials, or final prices. Ask for clarification only when the requirement cannot be inferred from this handoff.

---

## 15. Final handoff checklist

Before beginning new work, confirm that the next LLM has:

- This handoff document.
- The latest repository at `Atharva3001/takam-foods`.
- `ideas.md`.
- Access to `client/src/lib/products.ts`, `Home.tsx`, `GanapatiSpecial.tsx`, and `ProductPage.tsx`.
- Awareness of the `/images/` versus `/manus-storage/` distinction.
- The current user requirement that final prices are still pending.
- The current user requirement that the public ordering route is WhatsApp only.
- The current user requirement that product photos remain realistic.

This document is intended to replace the need to replay the full previous chat history for ordinary website continuation work.
