# Personal Resume Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a bilingual, content-driven personal resume site with concise localized home pages, detailed project and archive routes, and print/PDF output.

**Architecture:** Use the Sites vinext starter as a static, multi-route React site. Career facts live in TypeScript content modules, pure validation and selector functions normalize them for page components, and localized route components render the shared data. Print styles and a post-build PDF script produce localized artifacts from the same routes.

**Tech Stack:** TypeScript, React, vinext/Vite, Vitest, CSS, Playwright for PDF generation, GitHub-compatible source control, OpenAI Sites hosting.

## Global Constraints

- Hosting must not require recurring payment.
- Required locales are exactly `ko` and `en`.
- Every page must have exactly one `h1` and a matching root language.
- Career facts must not be duplicated inside UI components.
- The initial public routes are `/ko/`, `/en/`, `/ko/archive/`, `/en/archive/`, and localized `/projects/[slug]/` routes.
- External links copied from CakeResume must be corrected or omitted when their destination is not trustworthy.
- The visual system uses warm off-white, near-black, and one restrained green accent without stock imagery or decorative gradients.
- The page must work without client-side state for its core content.
- Browser print and generated PDFs must use the same localized data as the web pages.

---

### Task 1: Initialize the site and add the test boundary

**Files:**
- Create through initializer: `package.json`, `package-lock.json`, `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `.openai/hosting.json`
- Create: `vitest.config.ts`
- Create: `src/resume/__tests__/content.test.ts`
- Create: `src/resume/types.ts`
- Create: `src/resume/content.ts`
- Create: `src/resume/validate.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `ResumeContent`, `validateResumeContent(content): string[]`, and `resumeContent`.
- Consumes: none.

- [ ] **Step 1: Initialize the bundled Sites starter and keep its development server running**

Run the Sites initializer once against the project root, then run the starter's development command in a retained session.

- [ ] **Step 2: Write failing content-validation tests**

```ts
import { describe, expect, it } from "vitest";
import { resumeContent } from "../content";
import { validateResumeContent } from "../validate";

describe("resume content", () => {
  it("contains complete Korean and English localized copy", () => {
    expect(validateResumeContent(resumeContent)).toEqual([]);
  });

  it("rejects placeholder and malformed external links", () => {
    const broken = structuredClone(resumeContent);
    broken.projects[0].links = [{ label: "Broken", href: "http://dummy" }];
    expect(validateResumeContent(broken)).toContain(
      "projects.ai-agent-messenger.links contains a placeholder or malformed URL",
    );
  });

  it("rejects multiple current positions", () => {
    const broken = structuredClone(resumeContent);
    broken.experiences[1].end = null;
    expect(validateResumeContent(broken)).toContain(
      "experiences must contain exactly one current position",
    );
  });
});
```

- [ ] **Step 3: Run the focused test and confirm it fails because the content modules do not exist**

Run: `npm test -- src/resume/__tests__/content.test.ts`

Expected: FAIL because `../content` and `../validate` are missing.

- [ ] **Step 4: Add the minimal typed content and validator**

Define locale text, experience, project, publication, education, language, and profile types. Implement validation for locale parity, one current role, unique IDs/slugs, valid date ordering, and safe `https`, `mailto`, or internal URLs.

- [ ] **Step 5: Run the focused test and full test suite**

Run: `npm test -- src/resume/__tests__/content.test.ts`

Expected: PASS with three passing tests.

- [ ] **Step 6: Commit the initialized site and validated content boundary**

```bash
git add .
git commit -m "feat: initialize validated resume content"
```

### Task 2: Add localized selectors and route metadata

**Files:**
- Create: `src/resume/selectors.ts`
- Create: `src/resume/metadata.ts`
- Create: `src/resume/__tests__/selectors.test.ts`
- Create: `src/resume/__tests__/metadata.test.ts`

**Interfaces:**
- Consumes: `ResumeContent`, `Locale`, `resumeContent`.
- Produces: `getResume(locale)`, `getProject(locale, slug)`, `getProjectSlugs()`, `getArchive(locale)`, `buildLocaleMetadata(locale, path)`.

- [ ] **Step 1: Write failing selector tests**

```ts
import { describe, expect, it } from "vitest";
import { getProject, getProjectSlugs, getResume } from "../selectors";

describe("localized resume selectors", () => {
  it("returns equivalent selected project IDs for both locales", () => {
    expect(getResume("ko").selectedProjects.map((item) => item.id)).toEqual(
      getResume("en").selectedProjects.map((item) => item.id),
    );
  });

  it("returns stable project slugs and localized project copy", () => {
    expect(getProjectSlugs()).toContain("ai-agent-messenger");
    expect(getProject("ko", "ai-agent-messenger")?.title).not.toBe(
      getProject("en", "ai-agent-messenger")?.title,
    );
  });
});
```

- [ ] **Step 2: Write failing metadata tests**

```ts
import { describe, expect, it } from "vitest";
import { buildLocaleMetadata } from "../metadata";

describe("localized metadata", () => {
  it("emits reciprocal Korean, English, and default alternates", () => {
    const metadata = buildLocaleMetadata("ko", "/");
    expect(metadata.alternates.languages).toEqual({
      ko: "/ko/",
      en: "/en/",
      "x-default": "/en/",
    });
  });
});
```

- [ ] **Step 3: Run the tests and confirm missing selectors and metadata are the failure**

Run: `npm test -- src/resume/__tests__/selectors.test.ts src/resume/__tests__/metadata.test.ts`

Expected: FAIL because the production modules are missing.

- [ ] **Step 4: Implement localized selectors and metadata builders**

Selectors merge shared facts with locale copy without mutating source content. Metadata includes title, description, canonical path, Open Graph locale, and reciprocal localized routes.

- [ ] **Step 5: Run focused and full tests**

Run: `npm test`

Expected: PASS.

- [ ] **Step 6: Commit the selector and metadata layer**

```bash
git add src/resume
git commit -m "feat: add localized resume selectors"
```

### Task 3: Build the localized resume home pages

**Files:**
- Create: `app/[locale]/page.tsx`
- Create: `app/[locale]/layout.tsx`
- Create: `src/resume/components/SiteShell.tsx`
- Create: `src/resume/components/ProfileRail.tsx`
- Create: `src/resume/components/ExperienceTimeline.tsx`
- Create: `src/resume/components/SelectedProjects.tsx`
- Create: `src/resume/components/Credibility.tsx`
- Create: `src/resume/components/SectionHeading.tsx`
- Create: `src/resume/components/ResumeHome.tsx`
- Create: `src/resume/__tests__/home-render.test.tsx`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Delete: `app/_sites-preview/**`

**Interfaces:**
- Consumes: `getResume(locale)` and `buildLocaleMetadata(locale, "/")`.
- Produces: localized static resume routes and reusable presentation components.

- [ ] **Step 1: Write a failing render test for document structure**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeHome } from "../components/ResumeHome";

describe("ResumeHome", () => {
  it("renders one primary heading and localized navigation", () => {
    const { container } = render(<ResumeHome locale="ko" />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByRole("navigation", { name: "이력서 섹션" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/",
    );
  });
});
```

- [ ] **Step 2: Run the render test and confirm it fails because the home component is missing**

Run: `npm test -- src/resume/__tests__/home-render.test.tsx`

Expected: FAIL because `ResumeHome` does not exist.

- [ ] **Step 3: Implement the localized home components and global visual system**

Render the compact profile rail, professional summary, capability highlights, reverse-chronological experience, selected projects, credibility, education, languages, archive link, and print actions. Remove the starter preview skeleton and metadata.

- [ ] **Step 4: Run the render test and full tests**

Run: `npm test`

Expected: PASS.

- [ ] **Step 5: Run the production build**

Run: `npm run build`

Expected: exit code 0.

- [ ] **Step 6: Commit the localized resume pages**

```bash
git add app src package.json package-lock.json
git commit -m "feat: build bilingual resume pages"
```

### Task 4: Add project detail and archive routes

**Files:**
- Create: `app/[locale]/projects/[slug]/page.tsx`
- Create: `app/[locale]/archive/page.tsx`
- Create: `src/resume/components/ProjectDetail.tsx`
- Create: `src/resume/components/ArchivePage.tsx`
- Create: `src/resume/__tests__/detail-render.test.tsx`

**Interfaces:**
- Consumes: `getProject(locale, slug)`, `getProjectSlugs()`, `getArchive(locale)`.
- Produces: localized detail and archive pages with stable URLs.

- [ ] **Step 1: Write failing project and archive render tests**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArchivePage } from "../components/ArchivePage";
import { ProjectDetail } from "../components/ProjectDetail";

describe("detail routes", () => {
  it("renders a localized project with one h1 and evidence links", () => {
    const { container } = render(
      <ProjectDetail locale="ko" slug="ai-agent-messenger" />,
    );
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByText("Sendbird")).toBeTruthy();
  });

  it("preserves older career material in the archive", () => {
    render(<ArchivePage locale="en" />);
    expect(screen.getByText("Apache Zeppelin")).toBeTruthy();
    expect(screen.getByText("Speaking")).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run the focused test and confirm the components are missing**

Run: `npm test -- src/resume/__tests__/detail-render.test.tsx`

Expected: FAIL because the detail components do not exist.

- [ ] **Step 3: Implement project detail, previous/next navigation, and archive sections**

Project pages display context, problem, contributions, outcomes, technologies, and trustworthy references. The archive groups complete experience, open source, teaching, and speaking without duplicating facts.

- [ ] **Step 4: Run all tests and build**

Run: `npm test && npm run build`

Expected: both commands exit 0.

- [ ] **Step 5: Commit detail and archive routes**

```bash
git add app src
git commit -m "feat: add project and career archive routes"
```

### Task 5: Add print styling and generated PDFs

**Files:**
- Create: `scripts/generate-pdfs.mjs`
- Create: `src/resume/__tests__/print-links.test.tsx`
- Create after generation: `public/resume-ahyoung-ryu-ko.pdf`
- Create after generation: `public/resume-ahyoung-ryu-en.pdf`
- Modify: `app/globals.css`
- Modify: `package.json`

**Interfaces:**
- Consumes: healthy localized resume routes.
- Produces: `npm run pdf`, print-optimized pages, and two localized PDF files.

- [ ] **Step 1: Write a failing test for localized PDF and print actions**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeHome } from "../components/ResumeHome";

describe("resume output actions", () => {
  it("links the Korean page to the Korean generated PDF", () => {
    render(<ResumeHome locale="ko" />);
    expect(screen.getByRole("link", { name: "PDF 다운로드" })).toHaveAttribute(
      "href",
      "/resume-ahyoung-ryu-ko.pdf",
    );
  });
});
```

- [ ] **Step 2: Run the test and confirm the PDF action is missing**

Run: `npm test -- src/resume/__tests__/print-links.test.tsx`

Expected: FAIL because the localized PDF action is absent.

- [ ] **Step 3: Implement print actions, print CSS, and the PDF generator**

The generator accepts `RESUME_BASE_URL`, prints `/ko/` and `/en/` to A4 PDFs with background graphics, and writes deterministic filenames to `public/`.

- [ ] **Step 4: Run the tests, generate PDFs, and inspect their page counts**

Run: `npm test && npm run pdf`

Expected: tests pass and both PDF files exist with two to three pages each.

- [ ] **Step 5: Rebuild so the PDFs are included in the deployment output**

Run: `npm run build`

Expected: exit code 0 and both PDFs are present in the static output.

- [ ] **Step 6: Commit print and PDF output**

```bash
git add app src scripts public package.json package-lock.json
git commit -m "feat: add print-ready resume PDFs"
```

### Task 6: Add automated quality checks and verify the finished site

**Files:**
- Create: `scripts/check-built-site.mjs`
- Create: `src/resume/__tests__/built-site.test.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: production build output.
- Produces: `npm run check:site` and final verification evidence.

- [ ] **Step 1: Write a failing built-site contract test**

The test runs the built-site checker against a fixture missing an English route and asserts a non-zero result with a localized-route error.

- [ ] **Step 2: Run the focused test and confirm the checker is missing**

Run: `npm test -- src/resume/__tests__/built-site.test.ts`

Expected: FAIL because `check-built-site.mjs` does not exist.

- [ ] **Step 3: Implement the built-site checker**

The checker verifies expected localized routes, project routes, PDF files, one `h1` per HTML document, locale-specific `lang`, reciprocal alternate links, no `dummy` or malformed link values, and no references to the starter preview.

- [ ] **Step 4: Run the complete verification suite**

Run: `npm test && npm run build && npm run check:site`

Expected: all commands exit 0 with no failed checks.

- [ ] **Step 5: Inspect desktop, mobile, and rendered PDF output**

Use the running local site for one desktop and one mobile inspection per locale, and render the first and last pages of each PDF for visual inspection. Fix visible clipping, overflow, unreadable density, or broken navigation, then repeat the full verification suite.

- [ ] **Step 6: Commit final quality checks**

```bash
git add .
git commit -m "test: verify localized resume output"
```

### Task 7: Publish the validated site

**Files:**
- Modify: `.openai/hosting.json`
- Create through packaging: deployment archive outside the source tree

**Interfaces:**
- Consumes: the exact validated commit and production build.
- Produces: a saved Sites version and a production deployment URL.

- [ ] **Step 1: Confirm the worktree is clean and run fresh verification**

Run: `git status --short && npm test && npm run build && npm run check:site`

Expected: clean status before generated hosting metadata, then all verification commands exit 0.

- [ ] **Step 2: Create or reuse the Sites project and persist its project ID**

Read `.openai/hosting.json` first. Create the site only when no project ID exists.

- [ ] **Step 3: Commit and push the exact validated source**

Use the Sites-provided credential only for the push and use the resulting branch head as the version commit.

- [ ] **Step 4: Package and save one site version**

Run the Sites packaging helper and save a version using the exact commit and archive.

- [ ] **Step 5: Deploy privately when owner-only access is available**

Use private deployment when permitted. If publishing requires an open-world deployment, request explicit approval before changing visibility.

- [ ] **Step 6: Poll deployment status and open the successful URL**

Report the production URL only after the deployment status is `succeeded`.
