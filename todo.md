# Site Image Loading Repair - Complete

The regression was caused by the GitHub synchronization copying WebDev `/manus-storage/` paths into the GitHub-hosted source, while the repository serves its assets from `/images/`. All source references were restored to `/images/`, every referenced image was verified in `client/public/images`, the production build passed, and the repair was pushed to `origin/main`.

Remote commit: `18996dc`

# LLM Website Handoff - Active

- [ ] Collect the latest Takam project architecture, brand direction, UX decisions, asset conventions, and GitHub status.
- [ ] Write a comprehensive continuation handoff document for another LLM.
- [ ] Review the handoff for accuracy and completeness.
- [ ] Deliver the handoff document with instructions for using it alongside the GitHub repository.

# Khava Modak and Ganapati Timetable Update - Active

- [ ] Read the supplied Modak schedule CSV and inspect the current timetable/product implementations.
- [ ] Add Khava Modak to the product data, related cards, and product route.
- [ ] Replace the timetable with the supplied schedule and update the festival range to 14 Sep - 24 Sep.
- [ ] Update Ukadiche quantities to add 5 Pieces first and remove 250 gm, 500 gm, and 1 kg.
- [ ] Validate desktop/mobile pages and save a checkpoint.

# Ganapati CTA and Date Badge Refinement - Active

- [ ] Restore the previous Ganapati CTA text.
- [ ] Move each calendar date into the yellow circle badge.
- [ ] Show Day 1 through Day 11 beneath each combo title.
- [ ] Validate desktop and mobile presentation and save a checkpoint.

# Standard Delivery CTA - Active

- [ ] Inspect homepage and product-page CTA sections.
- [ ] Add “Standard Delivery: Evening, 6 PM onwards” consistently to the homepage and every product page.
- [ ] Validate desktop/mobile placement and save a checkpoint.

# Modak Festival-Day Selector - Active

- [ ] Inspect current timetable and product order state.
- [ ] Add shared Modak availability data derived from the 14 Sep - 24 Sep schedule.
- [ ] Add available-day selection to every Modak product page.
- [ ] Include the selected date in WhatsApp enquiry details and validate it before opening WhatsApp.
- [ ] Validate representative product pages and save a checkpoint.

# Compact Festival-Day Dropdown - Active

- [ ] Replace the festival-day button grid with a compact dropdown.
- [ ] Preserve actual Festival Day labels, validation, dialog details, and WhatsApp message content.
- [ ] Validate mobile and desktop product pages and save a checkpoint.

# Legacy Product Removal - Active

- [ ] Find all Surali Vadi, Gulab Jamun, and Aaliv Ladu references.
- [ ] Remove their product records, homepage cards, legacy copy, and recommendation links.
- [ ] Validate the Modak collection, product routes, and production build.
- [ ] Save a checkpoint.

# Khava Artwork Background Fix - Active

- [ ] Replace the checkerboard transparency in the Khava mascot asset with a solid Takam-friendly background.
- [ ] Update all Khava asset references and verify the product, homepage, and timetable presentation.
- [ ] Save a checkpoint.

# Approximate Piece Counts - Active

- [ ] Add approximately 32, 60, and 120 pieces to the 250 gm, 500 gm, and 1 kg options for non-Ukadiche Modaks.
- [ ] Keep Ukadiche quantities unchanged.
- [ ] Validate representative product pages and save a checkpoint.

# Khava Embedded Checkerboard Cleanup - Active

- [ ] Clean the checkerboard from the Khava source artwork itself.
- [ ] Replace the asset used by the Khava product, homepage, and timetable views.
- [ ] Validate the rendered result and save a checkpoint.

# Modak Pricing Update - Active

- [ ] Read and validate the supplied Modak pricing CSV.
- [ ] Replace temporary prices for every Modak quantity option.
- [ ] Preserve piece-count notes and Ukadiche’s special quantity structure.
- [ ] Validate order summaries and save a checkpoint.

# Mobile Price Visibility - Active

- [ ] Increase price prominence on Modak quantity cards.
- [ ] Keep quantity labels and approximate piece notes readable.
- [ ] Validate mobile and desktop product pages and save a checkpoint.

# Green Price Badge and Best Deal - Active

- [ ] Change price badge background from yellow to green.
- [ ] Add a Best Deal tag to every 21 Pieces option.
- [ ] Validate mobile and desktop product pages and save a checkpoint.

# Live Site Publication Verification - Active

- [ ] Confirm checkpoint 544b8062 is the latest published Takam version.
- [ ] Verify the live domain and representative page responses.
- [ ] Report live status before GitHub synchronization.

# GitHub Synchronization - Active

- [ ] Synchronize the latest live-site source and assets into the takam-foods repository.
- [ ] Validate and push the complete state to main.
- [ ] Verify the remote commit.
