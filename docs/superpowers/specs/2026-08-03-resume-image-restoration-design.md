# Resume Image Restoration

## Goal

Restore the personal and company imagery that made the CakeResume version feel recognizable, while preserving the compact, fast-scanning structure of the current bilingual resume. Images must clarify identity, employer, or product context; they must not turn the home page back into a long portfolio.

## Source of truth

- Korean CakeResume: `https://www.cake.me/resumes/ahyoung-ryu-kr`
- English CakeResume: `https://www.cake.me/resumes/ahyoung-ryu?locale=en`
- Official first-party company or product pages when a selected project has no matching CakeResume screenshot
- Existing structured resume content in `src/resume/content.ts`

No portrait, employer logo, product interface, or project image may be generated. CakeResume assets and clearly matching first-party assets will be downloaded into this repository so the published resume does not depend on CakeResume availability.

## Approaches considered

### A. Restore only the portrait and company logos

This would have the smallest layout impact, but it does not satisfy the request to show project imagery as thumbnails.

### B. Restore images at CakeResume scale

This is the selected approach. It restores the portrait, employer and school logos, and compact project thumbnails. Desktop project thumbnails use the CakeResume display size of approximately 282 by 159 pixels. The current document-like layout and concise copy remain intact.

### C. Use large portfolio-style screenshots

This would give the work more visual emphasis, but would substantially increase page height and recreate the scrolling problem that the compact redesign addressed.

## Asset inventory and provenance

The implementation will preserve these CakeResume assets locally:

- one profile photograph;
- one Sendbird logo;
- one TossBank logo;
- one Lunit logo;
- one Zepl logo reused across the three roles, matching the source resume;
- one Sookmyung Women's University logo;
- one Delight AI / Sendbird product visual;
- one TossBank visual;
- one Lunit Scope Annotation Tool screenshot;
- three Zepl or Apache Zeppelin visuals.

The three selected home projects are all Sendbird projects, while CakeResume contains only one clearly matching Sendbird product visual. Therefore:

1. AI Agent Messenger uses the existing CakeResume Delight AI visual.
2. Chat UIKit modernization uses a clearly corresponding image from an official Sendbird UIKit page when available.
3. AI Chatbot performance uses a clearly corresponding image from an official Sendbird AI chatbot page when available.
4. If a clearly matching first-party project image cannot be verified, the thumbnail frame uses the local Sendbird wordmark on a neutral background. It must not reuse an unrelated screenshot or imply that one product is another.

All original CakeResume project visuals remain available on the relevant project-detail pages even when that project is not one of the three home-page selections.

## Home-page layout

### Introduction

- Place the profile photograph beside the introduction, not above it.
- Display it at approximately 120 by 120 pixels on desktop with a circular crop, matching the understated scale of CakeResume.
- Keep the headline, summary, and contact links as the dominant content.

### Experience

- Keep the existing date and copy columns.
- Add a dedicated logo column on the right of each experience row.
- Use an 84 by 50 pixel containment box, matching the original CakeResume logo scale.
- Use `object-fit: contain` so wordmarks and square Zepl marks remain undistorted.
- Reuse the same verified Zepl mark for each role. The two CakeResume CDN
  entries originally recorded for these roles currently return byte-identical
  168×100 PNG files, so keeping two local filenames would imply a historical
  distinction that the source assets do not contain.
- Logos link to the same company URLs as the company names.

The logo column must not increase the row height beyond what the text already requires.

### Selected projects

- Keep the same three selected project rows and concise summaries.
- Add one thumbnail to the right side of every row.
- Desktop thumbnails render at 282 by 159 pixels with a 16:9 frame, matching CakeResume's visible screenshot size.
- Use a subtle one-pixel border and no promotional card shadow.
- Crop with `object-fit: cover` only when the image is photographic or a product screenshot. Use `object-fit: contain` for logo fallbacks.
- Keep the existing detail link and make the thumbnail link to the same project page.

Adding thumbnails may increase the home page height, but the target remains below 3,600 pixels at a 1440 by 900 desktop viewport. This preserves most of the compact redesign's improvement over the former 7,203-pixel page.

### Additional record

- Add the Sookmyung Women's University logo to the education fact without turning the section into a card.
- Do not add decorative images to languages, open source, or speaking entries on the home page.

## Project detail and archive pages

- Project detail pages display the relevant local source image beneath the project hero and above the story sections.
- The image may expand to the text column width, capped at 720 pixels, while preserving its source aspect ratio.
- Projects with multiple relevant CakeResume images may show a compact gallery after the main story; no carousel or JavaScript interaction is needed.
- The career archive uses the same employer logo treatment as the home experience list.
- Repeated assets share one local file rather than being duplicated.

## Responsive behavior

- At narrow widths, the portrait remains beside the first lines of the introduction when space allows and moves above the contact links when it does not.
- Company logos remain visible at approximately 72 by 44 pixels and align with the employer heading.
- Project rows become a single column: title and summary first, followed by a full-width 16:9 thumbnail capped at 320 pixels.
- No image may cause horizontal scrolling or reduce body text below the current size.

## Print and PDF

- Company and school logos remain visible in print.
- The portrait remains visible but may reduce to 84 by 84 pixels.
- Project thumbnails reduce to approximately 160 by 90 pixels and sit beside the project copy.
- Avoid splitting an image from its project title across pages.
- Keep each localized PDF within three A4 pages. If pagination exceeds three pages, reduce print-only image size and spacing before removing any image.

## Data and components

- Add reusable image metadata with local path, descriptive alternative text, intrinsic width, intrinsic height, and fit mode.
- Experiences reference employer-logo metadata rather than hard-coded paths in components.
- Projects reference a primary thumbnail and optional gallery images.
- Education references the school logo.
- A small shared image component applies the sizing and fit rules while preserving ordinary HTML image behavior in the static export.
- Korean and English pages reuse identical image assets and localize only alternative text where useful.

If an image cannot load, the adjacent company or project text remains complete and the fixed frame must not collapse the layout.

## Accessibility and performance

- Alternative text describes the company mark or the visible product interface without repeating the surrounding paragraph.
- Purely repeated logo occurrences may use empty alternative text when the company name is immediately adjacent.
- Every image includes intrinsic dimensions to prevent layout shift.
- Raster assets are optimized without visible degradation; source files are retained at sufficient resolution for high-density displays.
- No third-party image request is made by the published site.

## Testing and verification

Automated tests must verify:

- profile, company, school, and project image metadata references local files;
- every referenced image exists in `public`;
- every home experience renders its intended logo;
- exactly three selected project thumbnails render in both locales;
- project detail pages render the matching primary image and any configured gallery;
- images include width, height, and alternative text attributes;
- existing localized navigation, metadata, archive, and project routes remain valid.

Visual verification must cover:

- Korean and English home pages at desktop and mobile widths;
- logo alignment for wide wordmarks and square Zepl marks;
- the 282 by 159 pixel desktop thumbnail treatment;
- home-page height below the 3,600-pixel target;
- project-detail images;
- Korean and English PDF pagination and clipping;
- deployed GitHub Pages URLs after publishing.

## Independent review

After implementation and primary verification, a separate review agent will inspect the final diff, rendered desktop and mobile pages, image provenance, accessibility, performance, PDFs, and deployment result. The reviewer will not implement the feature. The primary agent will address all high- and medium-severity findings, rerun verification, and request a final review pass before reporting completion.

## Non-goals

- Do not recreate CakeResume's full timeline layout or branding.
- Do not add a CMS, image-upload UI, carousel, lightbox, or animation.
- Do not generate replacement logos or product screenshots.
- Do not use unrelated stock imagery.
- Do not materially expand the resume copy or change career claims.
