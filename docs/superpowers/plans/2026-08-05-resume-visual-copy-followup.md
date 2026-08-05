# Resume visual and supporting-record follow-up implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove image-frame borders, enlarge experience dates, and turn the latest Apache Zeppelin contribution record into concise linked evidence.

**Architecture:** Extend the existing `additionalRecord` view model with one external URL and render it through the existing `AdditionalRecord` component. Keep visual changes in the current resume CSS and preserve all existing image components and routes.

**Tech Stack:** TypeScript, React 19, CSS, Vitest, Testing Library, Playwright-based PDF generation.

## Global Constraints

- Korean CakeResume is the canonical career source.
- Apache Zeppelin data must use the current verified values: 338 contributors, rank 9, and 104 contributions.
- The evidence URL is `https://github.com/apache/zeppelin/graphs/contributors`.
- Do not change image dimensions, fit behavior, or project selection.
- Keep both PDFs at exactly two pages with at least eleven embedded color images.

---

### Task 1: Add linked, concise supporting evidence

**Files:**
- Modify: `src/resume/__tests__/selectors.test.ts`
- Modify: `src/resume/__tests__/home-render.test.tsx`
- Modify: `src/resume/selectors.ts`
- Modify: `src/resume/components/AdditionalRecord.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `additionalRecord.openSourceHref: string`.
- Consumes: the same field in `AdditionalRecord` and renders one external link.

- [ ] Write selector and rendered-home tests that expect `338명`, `9위`, `104개 커밋`, concise Korean endings, and the exact GitHub contributors URL.
- [ ] Run `npm test -- src/resume/__tests__/selectors.test.ts src/resume/__tests__/home-render.test.tsx` and verify failure because the URL and current contributor count are absent.
- [ ] Update the Korean and English supporting copy and add `openSourceHref` to the selector output.
- [ ] Wrap the open-source paragraph in an external link using `target="_blank"` and `rel="noreferrer"`.
- [ ] Add a restrained underline-on-hover treatment without turning the paragraph into a button.
- [ ] Re-run the two focused test files and verify they pass.

### Task 2: Remove image borders and enlarge dates

**Files:**
- Modify: `app/globals.css`
- Modify: `src/resume/__tests__/home-render.test.tsx`

**Interfaces:**
- Keeps all component props and data unchanged.
- Changes only the computed presentation of `.experience-date` and image frames.

- [ ] Add a rendered-home assertion that the date element remains present and separately classed for styling.
- [ ] Change `.experience-date` to `0.78rem` and its mobile override to `0.76rem`.
- [ ] Remove borders from `.project-thumbnail-link`, `.project-primary-image-frame`, and `.project-gallery figure` while retaining overflow and backgrounds.
- [ ] Run the focused tests and `npm run lint`.

### Task 3: Regenerate and verify outputs

**Files:**
- Modify: `public/resume-ahyoung-ryu-ko.pdf`
- Modify: `public/resume-ahyoung-ryu-en.pdf`

**Interfaces:**
- Produces the existing stable PDF filenames.

- [ ] Run `npm run build && npm run pdf`.
- [ ] Run `npm run test:pdf` and confirm two pages and at least eleven color images in both files.
- [ ] Render all four PDF pages to PNG and inspect borders, date legibility, line wrapping, and pagination.
- [ ] Inspect the desktop and mobile web layouts for overflow and image framing.
- [ ] Run `npm run verify`, inspect `git diff --check`, and commit the exact changed files.
- [ ] Merge into `main`, run `npm run verify` again, push, and verify the public GitHub Pages deployment.

