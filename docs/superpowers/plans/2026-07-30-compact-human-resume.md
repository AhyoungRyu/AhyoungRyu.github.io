# Compact Human Resume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Korean and English portfolio-style home pages with compact, personal resume pages based on verified CakeResume facts.

**Architecture:** Keep the existing structured content, detail routes, archive routes, metadata, and PDF pipeline. Narrow the home-page selector, replace the profile rail with a compact header, render three project rows and one combined supporting-record section, then replace the home-page CSS while preserving detail and archive styling.

**Tech Stack:** TypeScript, React 19, vinext/Next-compatible routes, Vitest, Testing Library, CSS, Sites hosting

## Global Constraints

- Do not introduce career claims that are absent from CakeResume or `src/resume/content.ts`.
- Show four recent companies, at most two highlights per company, and exactly three selected projects on each home page.
- Retain Korean and English parity, language links, print actions, generated PDFs, project routes, and archive routes.
- Remove the capability section, numeric chapter treatment, technology tags on home experience entries, duplicated hero links, and marketing archive banner.
- Keep detail and archive page information architecture unchanged.
- Target 4,000 to 4,500px total height for `/ko/` at 1440 by 900 without reducing body text below 16px.
- Do not add dependencies, persistence, analytics, authentication, or a contact form.

---

### Task 1: Define the compact home-page data contract

**Files:**
- Modify: `src/resume/__tests__/selectors.test.ts`
- Modify: `src/resume/selectors.ts`
- Modify: `src/resume/content.ts`

**Interfaces:**
- Consumes: `resumeContent` and `Locale`
- Produces: `getResume(locale)` with four `experiences`, three `selectedProjects`, localized `profile.summary`, and `additionalRecord`

- [ ] **Step 1: Write failing selector tests**

Add assertions that name the observable home-page contract:

```ts
it("returns four compact experience entries with at most two highlights", () => {
  const resume = getResume("ko");
  expect(resume.experiences).toHaveLength(4);
  expect(resume.experiences.every((item) => item.highlights.length <= 2)).toBe(true);
});

it("returns three selected projects for each locale", () => {
  expect(getResume("ko").selectedProjects).toHaveLength(3);
  expect(getResume("en").selectedProjects).toHaveLength(3);
});

it("returns the supporting record used by the home page", () => {
  const record = getResume("ko").additionalRecord;
  expect(record.openSource).toContain("104");
  expect(record.teaching).toContain("11시간");
  expect(record.education[0].school).toBe("Sookmyung Women's University");
  expect(record.languages).toHaveLength(2);
});
```

- [ ] **Step 2: Run the selector test and verify RED**

Run: `npx vitest run src/resume/__tests__/selectors.test.ts`

Expected: FAIL because the current selector returns six projects, all six experience records, three highlights for recent roles, and no `additionalRecord`.

- [ ] **Step 3: Implement the minimal selector changes**

In `getResume(locale)`:

```ts
const homeExperiences = resumeContent.experiences.slice(0, 4).map((experience) => ({
  // existing mapped fields
  highlights: experience.highlights[locale].slice(0, 2),
}));

const selectedProjects = resumeContent.projects
  .filter((project) => project.selected)
  .slice(0, 3)
  .map(/* existing localization */);
```

Add localized supporting-record copy derived from CakeResume:

```ts
additionalRecord: {
  openSource: locale === "ko"
    ? "Apache Zeppelin 커미터·PMC로 활동하며 281명의 기여자 중 9번째로 많은 104개 커밋을 남겼습니다."
    : "As an Apache Zeppelin committer and PMC member, I made 104 commits, ranked ninth among 281 contributors.",
  teaching: locale === "ko"
    ? "Fast Campus에서 Apache Zeppelin 강의를 4회, 총 11시간 진행했고 ApacheCon Europe과 North America에서 발표했습니다."
    : "I taught an 11-hour Apache Zeppelin course at Fast Campus and spoke at ApacheCon Europe and North America.",
  education: /* existing localized education mapping */,
  languages: /* existing localized language mapping */,
}
```

Rewrite `profile.summary` in `content.ts`:

```ts
ko: "제 손으로 만든 제품이 실제 사용자의 문제를 해결할 때 가장 큰 보람을 느낍니다. 지금은 Sendbird에서 AI Agent Messenger SDK와 Chat UIKit을 개발하고 있습니다.",
en: "I care most about building products that solve a real problem for the people using them. I currently work on the AI Agent Messenger SDK and Chat UIKit at Sendbird.",
```

- [ ] **Step 4: Run selector and content tests and verify GREEN**

Run: `npx vitest run src/resume/__tests__/selectors.test.ts src/resume/__tests__/content.test.ts`

Expected: PASS with no validation errors.

- [ ] **Step 5: Commit the data-contract change**

```bash
git add src/resume/selectors.ts src/resume/content.ts src/resume/__tests__/selectors.test.ts
git commit -m "refactor: focus resume home content"
```

### Task 2: Replace the home-page structure

**Files:**
- Create: `src/resume/components/ResumeHeader.tsx`
- Create: `src/resume/components/AdditionalRecord.tsx`
- Modify: `src/resume/components/SiteShell.tsx`
- Modify: `src/resume/components/ResumeHome.tsx`
- Modify: `src/resume/components/SectionHeading.tsx`
- Modify: `src/resume/components/ExperienceTimeline.tsx`
- Modify: `src/resume/components/SelectedProjects.tsx`
- Modify: `src/resume/__tests__/home-render.test.tsx`
- Modify: `src/resume/__tests__/print-links.test.tsx`
- Delete: `src/resume/components/ProfileRail.tsx`
- Delete: `src/resume/components/Credibility.tsx`

**Interfaces:**
- Consumes: the compact `getResume(locale)` result from Task 1
- Produces: semantic home pages with `ResumeHeader`, compact experience rows, three project rows, and `AdditionalRecord`

- [ ] **Step 1: Write failing rendered-home tests**

Extend `home-render.test.tsx`:

```tsx
it("renders the personal introduction and compact section set", () => {
  const { container } = render(<ResumeHome locale="ko" />);
  expect(screen.getByRole("heading", { level: 1, name: "안녕하세요, 류아영입니다." })).toBeTruthy();
  expect(screen.queryByText("일하는 방식")).toBeNull();
  expect(container.querySelectorAll(".experience-item")).toHaveLength(4);
  expect(container.querySelectorAll(".project-row")).toHaveLength(3);
  expect(container.querySelector(".archive-banner")).toBeNull();
});

it("renders concrete supporting evidence without template residue", () => {
  render(<ResumeHome locale="ko" />);
  expect(screen.getByText(/104개 커밋/)).toBeTruthy();
  expect(screen.getByText(/총 11시간/)).toBeTruthy();
  expect(screen.queryByText("Explore →")).toBeNull();
});
```

Keep and update the English test to expect the understated archive link label `View the full archive`.

- [ ] **Step 2: Run the home tests and verify RED**

Run: `npx vitest run src/resume/__tests__/home-render.test.tsx src/resume/__tests__/print-links.test.tsx`

Expected: FAIL because the current page has the capability section, six project cards, profile rail, and archive banner.

- [ ] **Step 3: Implement `ResumeHeader`**

Create a header with:

```tsx
<header className="resume-header">
  <a className="header-name" href={`/${locale}/`}>{profile.name}</a>
  <nav aria-label={copy.nav}>
    <a href="#experience">{copy.experience}</a>
    <a href="#projects">{copy.projects}</a>
    <a href="#record">{copy.record}</a>
  </nav>
  <div className="header-actions">
    <PrintActions ... />
    <a href={`/${alternateLocale}/`} hrefLang={alternateLocale}>{copy.alternate}</a>
  </div>
</header>
```

Keep email, LinkedIn, and GitHub only in the introduction contact row so the header does not duplicate them.

- [ ] **Step 4: Implement compact content components**

`ExperienceTimeline`:

- render all four selector-provided entries without another slice;
- remove `item-mark`, technology tags, and project-link clusters;
- keep one company link, role/team, context sentence, two bullets, and the understated archive link.

`SelectedProjects`:

```tsx
<div className="project-list">
  {projects.map((project) => (
    <article className="project-row" key={project.id}>
      <div className="project-meta">{project.company} · {project.period}</div>
      <h3><a href={project.href}>{project.title}</a></h3>
      <p>{project.summary}</p>
      <a className="row-link" href={project.href}>{detailLabel}<span aria-hidden="true"> →</span></a>
    </article>
  ))}
</div>
```

`AdditionalRecord`:

- render open source and teaching as two factual paragraphs;
- render education and languages in a compact definition-list style;
- include one archive link.

- [ ] **Step 5: Assemble the new `ResumeHome`**

Use this order:

1. compact header from `SiteShell`;
2. introduction with greeting `h1`, role/location, personal summary, and contacts;
3. Experience;
4. Selected work;
5. Additional record.

Remove capability rendering, generic section descriptions, numeric section indexes, and archive banner. Keep JSON-LD unchanged apart from using the revised profile summary.

- [ ] **Step 6: Run rendered-home tests and verify GREEN**

Run: `npx vitest run src/resume/__tests__/home-render.test.tsx src/resume/__tests__/print-links.test.tsx`

Expected: PASS with one `h1`, valid localized navigation, visible PDF links, four experiences, and three project rows.

- [ ] **Step 7: Run the complete unit suite**

Run: `npm test`

Expected: all Vitest files pass.

- [ ] **Step 8: Commit the structural change**

```bash
git add src/resume/components src/resume/__tests__
git commit -m "feat: rebuild resume home for fast scanning"
```

### Task 3: Make the visual system document-first

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/site-contract.test.mjs`

**Interfaces:**
- Consumes: class names introduced in Task 2
- Produces: responsive desktop, mobile, and print layout with no horizontal overflow

- [ ] **Step 1: Add a failing rendered contract for compact pages**

Extend the generated-site inspection in `scripts/check-built-site.mjs` and its fixture in `tests/site-contract.test.mjs` so `/ko` and `/en` report issues when they lack:

```html
<header class="resume-header">
<section class="intro-section">
<section id="experience">
<section id="projects">
<section id="record">
```

Do not test exact prose or CSS source. Test the rendered page contract.

- [ ] **Step 2: Run the contract test and verify RED**

Run: `npm run test:contracts`

Expected: FAIL because the test fixture and current rendered contract do not yet include the compact resume structure.

- [ ] **Step 3: Replace home-page CSS**

Implement:

- `.site-shell` as one centered column, maximum 980px;
- `.resume-header` as a compact wrapping header;
- `.intro-section` with 64 to 88px desktop vertical padding and no viewport-based minimum height;
- `.resume-section` with 56 to 72px vertical padding;
- `.section-heading h2` between 28 and 38px;
- experience rows using a 150px date column and compact 32 to 40px vertical padding;
- `.project-row` as a four-column desktop row that collapses cleanly below 760px;
- `.additional-grid` with two supporting columns and compact education/language rows;
- mobile horizontal padding of 20px and body copy of at least 16px;
- print rules that hide `.resume-header`, preserve compact sections, and avoid forced card breaks.

Retain the existing detail/archive selectors and add scoped compatibility styles where those routes still use older classes.

- [ ] **Step 4: Build and run rendered contracts**

Run: `npm run build && npm run test:contracts && node scripts/check-built-site.mjs`

Expected: build exits 0 and all localized routes satisfy the rendered contract.

- [ ] **Step 5: Generate and inspect PDFs**

Run: `npm run pdf`

Expected: both PDF files are regenerated and contain two to three pages.

Render both PDFs and inspect all pages for clipped text, overlap, and blank pages.

- [ ] **Step 6: Commit the visual change**

```bash
git add app/globals.css tests/site-contract.test.mjs scripts/check-built-site.mjs public/resume-ahyoung-ryu-ko.pdf public/resume-ahyoung-ryu-en.pdf
git commit -m "style: compact bilingual resume layout"
```

### Task 4: Social preview, complete verification, and deployment

**Files:**
- Modify: `public/og.png`
- Modify: `app/(resume)/[locale]/layout.tsx` only if social metadata needs adjustment

**Interfaces:**
- Consumes: validated source and existing Sites `project_id`
- Produces: one saved Sites version and a successful production deployment

- [ ] **Step 1: Create one matching social preview**

Generate one landscape social card using the finished cream, near-black, and green visual system. It must contain only:

- `Ahyoung Ryu`
- `Senior Software Engineer`
- `Resume / Seoul`

Inspect the generated text. Retry only once if text is missing or incorrect. Save the validated image as `public/og.png`.

- [ ] **Step 2: Run the full verification suite**

Run: `npm run verify`

Expected: lint, Vitest, contract tests, static export tests, build, and rendered-route checks all exit 0.

- [ ] **Step 3: Inspect desktop and mobile pages**

At 1440 by 900 and 390 by 844, inspect both `/ko/` and `/en/` for:

- one-screen introduction without excessive empty space;
- four readable experience entries;
- exactly three project rows;
- no clipped text or horizontal overflow;
- usable language and PDF actions;
- Korean home height between 4,000 and 4,500px at desktop size.

- [ ] **Step 4: Commit the exact verified source**

```bash
git add public/og.png app
git commit -m "chore: refresh resume social preview"
```

If `app` did not change, stage and commit only `public/og.png`.

- [ ] **Step 5: Push, save, and deploy the Sites version**

Reuse `project_id` from `.openai/hosting.json`. Push the verified commit, package the exact build, save a version with its commit SHA, deploy that saved version, and poll until status is `succeeded`.

- [ ] **Step 6: Verify production**

Open the deployed URL and confirm `/ko/`, `/en/`, one project detail route, both archive routes, and both PDF links return successfully. Inspect the deployed Korean home at desktop size to confirm it matches the verified local version.
