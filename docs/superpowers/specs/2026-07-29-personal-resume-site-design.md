# Personal Resume Site Design

## Goal

Build a self-owned bilingual resume website for Ahyoung Ryu that replaces the paid CakeResume editing workflow. A single, validated content source must generate:

- a concise Korean resume;
- a concise English resume;
- detailed project pages;
- a complete career archive;
- print-ready Korean and English PDF output.

The public site must require no recurring hosting payment. A custom domain is optional and therefore outside the required zero-cost scope.

## Audience and success criteria

The primary readers are recruiters, hiring managers, and engineers evaluating Ahyoung Ryu's career history. The main page must be understandable in under one minute while preserving access to the detailed evidence currently stored in CakeResume.

The project is successful when:

- `/ko/` and `/en/` contain equivalent localized resumes;
- recent experience is prominent and older experience is available without dominating the first page;
- every project has a stable shareable URL;
- one content update is reflected across summaries, detail pages, archive pages, and PDFs;
- the site works at mobile and desktop widths;
- builds reject missing required content and malformed internal links;
- the deployed site can be maintained by editing local content files and pushing to `main`.

## Information architecture

### Resume home pages

Routes:

- `/ko/`
- `/en/`

Each home page contains:

1. Header with name, role, location, contact links, language switch, and PDF action.
2. A specific professional summary focused on senior front-end engineering, SDK/product architecture, performance, quality, and technical leadership.
3. Four capability highlights.
4. Reverse-chronological experience cards.
5. Four to six selected projects.
6. Open-source and speaking highlights.
7. Education and languages.

The desktop layout uses a compact sticky profile/navigation rail and a wide reading column. The mobile layout becomes one column with a compact sticky top navigation.

### Project detail pages

Routes:

- `/ko/projects/[slug]/`
- `/en/projects/[slug]/`

Each project page contains the company, period, role, context, problem, contributions, outcomes, technology, and verified external references. Previous and next project links support sequential browsing.

### Career archive

Routes:

- `/ko/archive/`
- `/en/archive/`

The archive preserves the full historical record, including older Zepl work, Apache Zeppelin documentation and engineering contributions, teaching, and speaking. Entries remain concise enough to scan, with outbound links grouped separately.

### Print and PDF

The localized resume routes provide a print action and dedicated print styling. Navigation, decorative elements, and archive-only details disappear in print. A build script generates:

- `public/resume-ahyoung-ryu-ko.pdf`
- `public/resume-ahyoung-ryu-en.pdf`

The target is two to three A4 pages per language. The PDF files are generated from the same localized content as the web pages.

## Content architecture

Shared, non-translated facts are stored once:

- stable IDs and slugs;
- dates and current-role state;
- companies and external URLs;
- technology tags;
- project-to-company relationships;
- image paths;
- publication URLs.

Localized copy is stored by locale:

- role names;
- summaries;
- capability labels;
- project context, contributions, and outcomes;
- presentation descriptions.

Long-form project bodies are stored as localized Markdown. Structured career and project metadata is validated at build time. Missing translations, invalid date ranges, duplicate current roles, duplicate slugs, and malformed internal links fail validation.

## Visual direction

The visual tone is editorial, calm, and senior rather than template-like. It uses:

- warm off-white backgrounds and near-black text;
- one restrained green accent that nods to the current CakeResume page without copying it;
- strong Korean and Latin typography with generous line height;
- thin rules, numbered sections, and restrained project tags;
- minimal animation and full support for reduced-motion preferences;
- no stock illustrations or decorative gradients.

The hero avoids excessive empty space. Quantified outcomes and project names receive more emphasis than technology lists.

## Components and boundaries

- `SiteShell`: document metadata, global navigation, language switch, footer.
- `ProfileRail`: identity, contact, section navigation, PDF action.
- `ExperienceTimeline`: company chronology and selected outcomes.
- `SelectedProjects`: project summaries and detail links.
- `ProjectDetail`: full project narrative.
- `ArchiveSections`: historical projects, open source, teaching, and speaking.
- `PrintActions`: browser print and generated PDF links.
- `content`: the only source of resume facts and localized prose.
- `validation`: pure functions that validate content relationships and route data.

Components consume normalized content objects and do not contain career facts directly.

## Accessibility and document semantics

- Each page has exactly one `h1`.
- The root `lang` matches the route locale.
- Headings follow a consistent hierarchy.
- Keyboard-visible focus states are provided.
- Links use descriptive accessible names.
- Images have meaningful alternative text or are marked decorative.
- Color contrast meets WCAG AA.
- A skip link targets the main content.
- Project navigation and language switching do not rely on color alone.

## SEO and sharing

Each localized page includes:

- a localized title and description;
- canonical URL;
- reciprocal `hreflang` links for Korean, English, and `x-default`;
- Open Graph title, description, image, and locale;
- `ProfilePage` and `Person` JSON-LD;
- sitemap and robots metadata.

Project pages use localized metadata and stable canonical URLs.

## Testing and verification

Automated tests cover:

- content schema and relationship validation;
- locale parity;
- route generation;
- date formatting;
- selected-project limits;
- metadata and `hreflang` generation;
- malformed internal and placeholder URL rejection.

Build verification includes:

- unit tests;
- TypeScript checking;
- production static build;
- local link crawl;
- accessibility checks on Korean and English home pages;
- desktop and mobile visual inspection;
- print/PDF generation and page rendering inspection.

## Deployment

The primary deployment target is GitHub Pages through GitHub Actions. The repository is static, and each push to `main` builds and deploys the site. The site initially uses the generated GitHub Pages URL. A custom domain can be added later without changing the architecture.

If GitHub Pages cannot be connected from the current environment, the complete deployable repository and workflow remain the deliverable, and the exact remaining account-side action is reported.

## Out of scope

- a database or server;
- authentication;
- a web-based CMS;
- analytics or tracking by default;
- a contact form;
- paid hosting or domain purchase;
- automatic machine translation;
- copying CakeResume branding or platform controls.
