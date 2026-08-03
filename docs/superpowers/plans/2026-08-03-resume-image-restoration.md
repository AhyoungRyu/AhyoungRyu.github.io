# Resume Image Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the CakeResume portrait, employer and school logos, and compact project imagery across the bilingual resume, PDFs, and public deployment without losing the compact reading experience.

**Architecture:** Add typed local image metadata to the existing resume content model, then pass that metadata through the existing selectors into focused presentational components. Store every published image under `public/images/resume`, render it through one reusable `ResumeImage` component, and use CSS-only responsive and print layouts so the static export needs no client-side image logic.

**Tech Stack:** TypeScript 5.9, React 19, vinext/Next.js static routes, Vitest and Testing Library, CSS, Playwright-based PDF generation, GitHub Pages, OpenAI Sites.

## Global Constraints

- Do not generate a portrait, employer logo, product interface, or project image.
- Do not hotlink published images; every public image request must resolve to a local `/images/resume/...` path.
- Desktop project thumbnails are exactly 282 by 159 CSS pixels with a 16:9 frame.
- Desktop employer logos use an 84 by 50 CSS-pixel containment box.
- The profile portrait uses a 120 by 120 CSS-pixel circular crop on desktop.
- Mobile thumbnails are full-width 16:9 frames capped at 320 pixels.
- The Korean home page stays below 3,600 CSS pixels at a 1440 by 900 viewport.
- Each localized PDF stays within three A4 pages.
- No carousel, lightbox, CMS, upload UI, image animation, or unrelated copy change.
- All high- and medium-severity findings from the independent review must be resolved before completion.

---

## File structure

- Create `public/images/resume/`: stable local portrait, logo, and project-image files.
- Modify `src/resume/types.ts`: define `ResumeImage` and add image fields to profile, experience, project, and education records.
- Modify `src/resume/content.ts`: map local image paths and localized alternative text to the existing records.
- Modify `src/resume/selectors.ts`: expose image metadata to home, archive, and project-detail view models.
- Create `src/resume/components/ResumeImage.tsx`: one reusable intrinsic-size image renderer.
- Modify `src/resume/components/ResumeHome.tsx`: render the portrait.
- Modify `src/resume/components/ExperienceTimeline.tsx`: render employer logos.
- Modify `src/resume/components/SelectedProjects.tsx`: render linked 282 by 159 thumbnails.
- Modify `src/resume/components/AdditionalRecord.tsx`: render the school logo.
- Modify `src/resume/components/ArchivePage.tsx`: render employer logos in the complete timeline.
- Modify `src/resume/components/ProjectDetail.tsx`: render primary and gallery images.
- Modify `app/globals.css`: desktop, mobile, fallback, and print image layouts.
- Modify `src/resume/__tests__/content.test.ts`: validate local image metadata and source coverage.
- Modify `src/resume/__tests__/selectors.test.ts`: validate image propagation.
- Modify `src/resume/__tests__/home-render.test.tsx`: validate the home portrait, four logos, school logo, and three thumbnails.
- Modify `src/resume/__tests__/detail-render.test.tsx`: validate project-detail primary and gallery images.
- Modify `src/resume/__tests__/print-links.test.tsx`: preserve print/PDF contract around images.

---

### Task 1: Local image assets and typed content model

**Files:**
- Create: `public/images/resume/profile-ahyoung-ryu.png`
- Create: `public/images/resume/logo-sendbird.png`
- Create: `public/images/resume/logo-tossbank.png`
- Create: `public/images/resume/logo-lunit.png`
- Create: `public/images/resume/logo-zepl-current.png`
- Create: `public/images/resume/logo-sookmyung.png`
- Create: `public/images/resume/project-ai-agent.png`
- Create: `public/images/resume/project-chat-uikit.png`
- Create: `public/images/resume/project-ai-chatbot.png`
- Create: `public/images/resume/project-tossbank.png`
- Create: `public/images/resume/project-lunit-annotation.png`
- Create: `public/images/resume/project-zeppelin-ui.png`
- Create: `public/images/resume/project-zepl-notebook.png`
- Create: `public/images/resume/project-zepl-visualization.png`
- Modify: `src/resume/types.ts`
- Modify: `src/resume/content.ts`
- Modify: `src/resume/validate.ts`
- Test: `src/resume/__tests__/content.test.ts`

**Interfaces:**
- Produces: `ResumeImage = { src: string; alt: LocalizedText; width: number; height: number; fit: "cover" | "contain" }`.
- Produces: required `Profile.portrait`, `Experience.logo`, and `Education.logo` fields plus optional `Project.thumbnail` and required `Project.gallery` arrays.

- [ ] **Step 1: Write the failing image-content tests**

Add assertions that collect every image from `resumeContent` and verify local paths and dimensions:

```ts
it("uses complete local image metadata", () => {
  const images = [
    resumeContent.profile.portrait,
    ...resumeContent.experiences.map((experience) => experience.logo),
    ...resumeContent.projects.flatMap((project) =>
      [project.thumbnail, ...project.gallery].filter(
        (image): image is NonNullable<typeof image> => image !== undefined,
      ),
    ),
    ...resumeContent.education.map((education) => education.logo),
  ];

  expect(images.every((image) => image.src.startsWith("/images/resume/"))).toBe(
    true,
  );
  expect(images.every((image) => image.width > 0 && image.height > 0)).toBe(
    true,
  );
  expect(images.every((image) => image.alt.ko && image.alt.en)).toBe(true);
});

it("assigns distinct thumbnails to the three selected Sendbird projects", () => {
  const selected = resumeContent.projects.filter((project) =>
    [
      "ai-agent-messenger",
      "chat-uikit-modernization",
      "ai-chatbot-performance",
    ].includes(project.id),
  );

  expect(new Set(selected.map((project) => project.thumbnail.src)).size).toBe(3);
});
```

- [ ] **Step 2: Run the focused test and confirm the red state**

Run: `npm test -- src/resume/__tests__/content.test.ts`

Expected: TypeScript or assertion failures because the image fields do not exist.

- [ ] **Step 3: Download the approved first-party assets**

Create `public/images/resume` and download the exact CakeResume sources recorded in the design review:

```text
profile-ahyoung-ryu.png  <- https://images.cakeresume.com/ahyoung-ryu/0de1efc9-550c-46f6-abc6-aa12af41da5b.png
logo-sendbird.png        <- https://images.cakeresume.com/OkRgP/ahyoung-ryu-kr/64446a38-136d-4a52-b639-7946af9dd4dc.png
logo-tossbank.png        <- https://images.cakeresume.com/OkRgP/ahyoung-ryu-kr/19ff1020-44d0-474c-ac44-cd2064fa2840.png
logo-lunit.png           <- https://images.cakeresume.com/OkRgP/ahyoung-ryu-kr/db32aa25-189b-4221-a435-a9713223fd16.png
logo-zepl-current.png    <- https://images.cakeresume.com/ahyoung-ryu/7a53baf5-1923-4f41-864a-83aef28c7fb0.png
logo-sookmyung.png       <- https://images.cakeresume.com/ahyoung-ryu/25d25ed6-100e-4f7e-90c4-c4a4cd48cfe9.png
project-ai-agent.png     <- https://images.cakeresume.com/OkRgP/ahyoung-ryu-kr/954f3760-a97a-4ce6-883f-4df29bfa2706.png
project-tossbank.png     <- https://images.cakeresume.com/OkRgP/ahyoung-ryu-kr/c094acdc-f025-425a-9641-7145f894a16b.png
project-lunit-annotation.png <- https://images.cakeresume.com/OkRgP/ahyoung-ryu-kr/49fd8c51-d99a-4980-84d3-0f950e4a54d9.png
project-zeppelin-ui.png  <- https://images.cakeresume.com/ahyoung-ryu/850af182-c4f9-493c-9afa-4ba135fa2739.png
project-zepl-notebook.png <- https://images.cakeresume.com/ahyoung-ryu/323be156-11ca-4260-819c-94d8c03b5067.png
project-zepl-visualization.png <- https://images.cakeresume.com/ahyoung-ryu/df62bd35-18d8-49dd-9509-faf60c7987bd.png
```

The second Zepl CDN entry originally noted for the earlier roles
(`482e438b-677c-49a3-bc6a-ad760f8347a6.png`) currently returns the exact same
168×100 PNG bytes as the retained Zepl source. Reuse one local Zepl asset for
all three roles instead of presenting duplicate files as different variants.

Download the two missing selected-project visuals from official Sendbird pages:

```text
project-chat-uikit.png <- https://static.sendbird.com/docs/uikit-react-overview-version-update@3x.png
project-ai-chatbot.png <- https://sendbird.imgix.net/cms/Tutorial-Cover_Create-a-low-code-AI-chatbot-widget.png
```

Record each file's actual pixel dimensions with `sips -g pixelWidth -g pixelHeight public/images/resume/*` and use those values as intrinsic metadata. Keep the files' original formats and do not stretch them during optimization.

- [ ] **Step 4: Add image types and content mappings**

Add the shared type:

```ts
export type ResumeImage = {
  src: string;
  alt: LocalizedText;
  width: number;
  height: number;
  fit: "cover" | "contain";
};
```

Extend the existing records with required profile, experience, and education image properties. Make `Project.thumbnail` optional and initialize every `Project.gallery` as an array so projects without a factual visual remain valid. Use `cover` for the portrait and screenshots, `contain` for logos. Assign the current Zepl mark to `zepl-frontend`, the classic Zepl mark to `zepl-engineer` and `zepl-intern`, and the Sendbird logo to all three Sendbird thumbnails only as the adjacent company logo—not as a thumbnail substitute now that official images are defined.

Map galleries by factual project relationship:

```text
ai-agent-messenger: project-ai-agent.png
chat-uikit-modernization: project-chat-uikit.png
ai-chatbot-performance: project-ai-chatbot.png
tossbank-personal-loan: project-tossbank.png
lunit-annotation-tools: project-lunit-annotation.png
apache-zeppelin: project-zeppelin-ui.png
zepl-performance: project-zepl-notebook.png + project-zepl-visualization.png
```

- [ ] **Step 5: Extend validation for image invariants**

Add validation errors when `src` is not local, dimensions are non-positive, localized alternative text is missing, or `fit` is not `cover`/`contain`.

- [ ] **Step 6: Run content and validation tests**

Run: `npm test -- src/resume/__tests__/content.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit typed assets**

```bash
git add public/images/resume src/resume/types.ts src/resume/content.ts src/resume/validate.ts src/resume/__tests__/content.test.ts
git commit -m "feat: add local resume image assets"
```

---

### Task 2: Reusable image renderer and selector propagation

**Files:**
- Create: `src/resume/components/ResumeImage.tsx`
- Modify: `src/resume/selectors.ts`
- Test: `src/resume/__tests__/selectors.test.ts`

**Interfaces:**
- Consumes: `ResumeImage` from Task 1.
- Produces: `ResumeImageView = Omit<ResumeImage, "alt"> & { alt: string }` in localized selector output.
- Produces: `<ResumeImage image={image} className="..." />`.

- [ ] **Step 1: Write failing selector tests**

```ts
it("localizes and propagates image metadata", () => {
  const resume = getResume("ko");

  expect(resume.profile.portrait.alt).toBe("류아영 프로필 사진");
  expect(resume.experiences.map((item) => item.logo.src)).toEqual([
    "/images/resume/logo-sendbird.png",
    "/images/resume/logo-tossbank.png",
    "/images/resume/logo-lunit.png",
    "/images/resume/logo-zepl-current.png",
  ]);
  expect(resume.selectedProjects).toHaveLength(3);
  expect(resume.selectedProjects.every((project) => project.thumbnail)).toBe(
    true,
  );
  expect(resume.additionalRecord.education[0].logo.src).toBe(
    "/images/resume/logo-sookmyung.png",
  );
});
```

Also assert that `getArchive("en")` exposes all role logos and `getProject("ko", "zepl-performance")` exposes one primary image plus its remaining gallery image.

- [ ] **Step 2: Run the selector tests and confirm the red state**

Run: `npm test -- src/resume/__tests__/selectors.test.ts`

Expected: FAIL because selectors do not expose image fields.

- [ ] **Step 3: Implement localized image projection**

Add one helper:

```ts
function localizedImage(image: ResumeImage, locale: Locale) {
  return {
    src: image.src,
    alt: text(image.alt, locale),
    width: image.width,
    height: image.height,
    fit: image.fit,
  };
}
```

Use it consistently for portrait, logos, galleries, and education, and guard the optional project thumbnail before localizing it.

- [ ] **Step 4: Implement the shared image component**

```tsx
import type { ComponentProps } from "react";

type ImageData = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit: "cover" | "contain";
};

type ResumeImageProps = Omit<
  ComponentProps<"img">,
  "src" | "alt" | "width" | "height"
> & {
  image: ImageData;
};

export function ResumeImage({ image, className, ...props }: ResumeImageProps) {
  return (
    <img
      {...props}
      alt={image.alt}
      className={className}
      height={image.height}
      loading="lazy"
      src={image.src}
      style={{ objectFit: image.fit }}
      width={image.width}
    />
  );
}
```

Allow the portrait caller to pass `loading="eager"`; all other callers keep lazy loading.

- [ ] **Step 5: Run selector tests**

Run: `npm test -- src/resume/__tests__/selectors.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit selector and component support**

```bash
git add src/resume/components/ResumeImage.tsx src/resume/selectors.ts src/resume/__tests__/selectors.test.ts
git commit -m "feat: expose localized resume images"
```

---

### Task 3: Home-page portrait, employer logos, and project thumbnails

**Files:**
- Modify: `src/resume/components/ResumeHome.tsx`
- Modify: `src/resume/components/ExperienceTimeline.tsx`
- Modify: `src/resume/components/SelectedProjects.tsx`
- Modify: `src/resume/components/AdditionalRecord.tsx`
- Modify: `app/globals.css`
- Test: `src/resume/__tests__/home-render.test.tsx`

**Interfaces:**
- Consumes: localized `portrait`, `logo`, `thumbnail`, and education `logo` fields from Task 2.
- Produces: `.profile-portrait`, `.experience-logo`, `.project-thumbnail`, and `.education-logo` visual contracts.

- [ ] **Step 1: Write failing home-render tests**

```ts
it("renders the local portrait and institutional marks", () => {
  const { container } = render(<ResumeHome locale="ko" />);

  expect(container.querySelector('.profile-portrait[src="/images/resume/profile-ahyoung-ryu.png"]')).toBeTruthy();
  expect(container.querySelectorAll(".experience-logo")).toHaveLength(4);
  expect(container.querySelector('.education-logo[src="/images/resume/logo-sookmyung.png"]')).toBeTruthy();
});

it("renders three distinct local project thumbnails", () => {
  const { container } = render(<ResumeHome locale="en" />);
  const thumbnails = Array.from(
    container.querySelectorAll<HTMLImageElement>(".project-thumbnail"),
  );

  expect(thumbnails).toHaveLength(3);
  expect(new Set(thumbnails.map((image) => image.src)).size).toBe(3);
  expect(thumbnails.every((image) => image.getAttribute("width"))).toBe(true);
  expect(thumbnails.every((image) => image.getAttribute("height"))).toBe(true);
});
```

- [ ] **Step 2: Run the home tests and confirm the red state**

Run: `npm test -- src/resume/__tests__/home-render.test.tsx`

Expected: FAIL because the image elements are absent.

- [ ] **Step 3: Render the portrait and logos**

Wrap the intro text and eager-loaded portrait in `.intro-layout`. Add each employer logo as a linked `.experience-logo-link` in the existing experience row. Add the school mark next to the education text without introducing a new card.

- [ ] **Step 4: Render linked selected-project thumbnails**

Extend `ProjectSummary` with the required selected-project `thumbnail`, render a `.project-thumbnail-link` to `project.href`, and use `ResumeImage` with `.project-thumbnail`. Move the existing `.row-link` into `.project-copy` below the summary so the three desktop columns remain date, copy, and thumbnail; the project title remains the primary accessible navigation label.

- [ ] **Step 5: Add compact desktop and mobile CSS**

Use these stable layout contracts:

```css
.intro-layout { display: grid; grid-template-columns: minmax(0, 1fr) 120px; gap: 32px; }
.profile-portrait { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; }
.experience-item { grid-template-columns: 150px minmax(0, 1fr) 84px; }
.experience-logo-link { width: 84px; height: 50px; align-self: start; }
.experience-logo { width: 100%; height: 100%; object-fit: contain; }
.project-row { grid-template-columns: 130px minmax(0, 1fr) 282px; }
.project-thumbnail-link { width: 282px; aspect-ratio: 16 / 9; }
.project-thumbnail { width: 100%; height: 100%; border: 1px solid var(--line); }
```

At `max-width: 760px`, return all content to one column, cap `.project-thumbnail-link` at 320px, keep the company logo beside the employer heading, and prevent horizontal overflow.

- [ ] **Step 6: Run home tests and lint the touched files**

Run: `npm test -- src/resume/__tests__/home-render.test.tsx && npm run lint`

Expected: PASS.

- [ ] **Step 7: Commit the home imagery**

```bash
git add src/resume/components/ResumeHome.tsx src/resume/components/ExperienceTimeline.tsx src/resume/components/SelectedProjects.tsx src/resume/components/AdditionalRecord.tsx app/globals.css src/resume/__tests__/home-render.test.tsx
git commit -m "feat: restore imagery on resume home"
```

---

### Task 4: Archive, project-detail, and print imagery

**Files:**
- Modify: `src/resume/components/ArchivePage.tsx`
- Modify: `src/resume/components/ProjectDetail.tsx`
- Modify: `app/globals.css`
- Test: `src/resume/__tests__/detail-render.test.tsx`
- Test: `src/resume/__tests__/print-links.test.tsx`

**Interfaces:**
- Consumes: archive logos plus project `thumbnail` and `gallery` from Task 2.
- Produces: `.archive-company-logo`, `.project-primary-image`, `.project-gallery`, and print sizing rules.

- [ ] **Step 1: Write failing detail and archive tests**

```ts
it("renders the matching project image and gallery", () => {
  const { container } = render(
    <ProjectDetail locale="ko" slug="zepl-performance" />,
  );

  expect(container.querySelector(".project-primary-image")).toBeTruthy();
  expect(container.querySelectorAll(".project-gallery img")).toHaveLength(1);
});

it("uses local employer logos in the archive", () => {
  const { container } = render(<ArchivePage locale="en" />);
  expect(container.querySelectorAll(".archive-company-logo")).toHaveLength(6);
  expect(
    Array.from(container.querySelectorAll<HTMLImageElement>(".archive-company-logo")).every(
      (image) => image.getAttribute("src")?.startsWith("/images/resume/"),
    ),
  ).toBe(true);
});
```

- [ ] **Step 2: Run detail tests and confirm the red state**

Run: `npm test -- src/resume/__tests__/detail-render.test.tsx src/resume/__tests__/print-links.test.tsx`

Expected: FAIL because detail and archive images are absent.

- [ ] **Step 3: Render archive logos**

Add the same linked `ResumeImage` employer mark to every archive timeline entry. Preserve all existing dates, summaries, and highlight lists.

- [ ] **Step 4: Render detail primary image and gallery**

Place the primary image immediately after `.project-hero`. Render remaining images in `.project-gallery` after `.project-story`. Do not create a carousel or client state.

- [ ] **Step 5: Add detail and print CSS**

Cap `.project-primary-image-frame` at 720px. Use intrinsic ratio for detail images. In `@media print`, keep logos, set the portrait to 84 by 84, set thumbnails to 160 by 90, remove nonessential borders, and apply `break-inside: avoid` to project image/title groupings.

- [ ] **Step 6: Run detail, print, and complete unit suites**

Run: `npm test -- src/resume/__tests__/detail-render.test.tsx src/resume/__tests__/print-links.test.tsx && npm test`

Expected: PASS.

- [ ] **Step 7: Commit detail and print imagery**

```bash
git add src/resume/components/ArchivePage.tsx src/resume/components/ProjectDetail.tsx app/globals.css src/resume/__tests__/detail-render.test.tsx src/resume/__tests__/print-links.test.tsx
git commit -m "feat: add project and archive imagery"
```

---

### Task 5: Full verification, PDFs, and visual correction

**Files:**
- Modify if required by verified defects: `app/globals.css`
- Regenerate: `public/resume-ahyoung-ryu-ko.pdf`
- Regenerate: `public/resume-ahyoung-ryu-en.pdf`

**Interfaces:**
- Consumes: completed local image implementation.
- Produces: verified static build and regenerated localized PDFs.

- [ ] **Step 1: Run the full automated verification**

Run: `npm run verify`

Expected: lint, Vitest, contract tests, static export tests, production build, and rendered-link checks all PASS.

- [ ] **Step 2: Generate localized PDFs**

Run: `npm run pdf`

Expected: both PDF files regenerate successfully.

- [ ] **Step 3: Verify PDF page counts and rendered pages**

Use `pdfinfo` to confirm each file has no more than three pages. Render every page to PNG and inspect for clipped images, broken aspect ratios, orphaned headings, or blank pages.

- [ ] **Step 4: Inspect local desktop and mobile pages**

Build and serve the static site, then inspect Korean and English home pages at 1440 by 900 and 390 by 844. Measure the Korean desktop document height with `document.documentElement.scrollHeight` and require a value below 3,600. Confirm the desktop thumbnail bounding box is 282 by 159 CSS pixels and that mobile has no horizontal overflow.

- [ ] **Step 5: Correct verified visual defects and rerun affected checks**

Only adjust image sizing, spacing, cropping, and print rules that fail the explicit criteria above. Rerun `npm run verify`, regenerate PDFs after print changes, and repeat the relevant screenshot measurements.

- [ ] **Step 6: Commit verified PDFs and layout corrections**

```bash
git add app/globals.css public/resume-ahyoung-ryu-ko.pdf public/resume-ahyoung-ryu-en.pdf
git commit -m "fix: verify resume image layouts"
```

---

### Task 6: Independent review and publication

**Files:**
- Modify only if required by review findings: files named by the reviewer.

**Interfaces:**
- Consumes: fully verified implementation from Task 5.
- Produces: reviewer-approved commit and publicly verified deployments.

- [ ] **Step 1: Dispatch an independent reviewer**

Give a fresh review agent the design spec, implementation plan, final diff, local URLs, generated PDFs, and the requirement to inspect source provenance, accessibility, responsive layout, print output, and build/deployment risks. The reviewer reports findings only and does not edit files.

- [ ] **Step 2: Resolve all high- and medium-severity findings**

For every finding, reproduce it, add or update a regression test when practical, implement the smallest correction, and rerun the focused test before the full suite.

- [ ] **Step 3: Request the final independent review pass**

Provide the reviewer with the correction commit and verification evidence. Continue until no high- or medium-severity finding remains.

- [ ] **Step 4: Run final verification from a clean state**

Run: `npm run verify && npm run pdf`

Expected: all commands PASS and both PDFs remain within three pages.

- [ ] **Step 5: Push and verify GitHub Pages**

Push the current branch to the configured GitHub remote, wait for the Pages workflow to succeed, and inspect:

```text
https://ahyoungryu.github.io/ko/
https://ahyoungryu.github.io/en/
```

Confirm local image requests return successfully and the public rendering matches the approved layout.

- [ ] **Step 6: Publish the corresponding Sites build**

Use the existing `.openai/hosting.json` project, save a new version, and verify the returned deployment URL. Preserve the existing public GitHub Pages URLs as the no-login handoff because the Sites workspace URL may remain authentication-gated.

- [ ] **Step 7: Report completion with review evidence**

Report the deployed URLs, commit, automated verification result, PDF page counts, measured page height and thumbnail dimensions, and the independent review outcome.
