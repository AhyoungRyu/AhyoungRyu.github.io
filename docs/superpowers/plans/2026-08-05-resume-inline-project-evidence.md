# Resume Inline Project Evidence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the home resume sufficient for a first-pass review by showing two concrete role and outcome statements for every selected project without requiring a detail-page click.

**Architecture:** Store the curated bilingual home evidence with each selected project in the canonical resume content. The selector passes it to the existing home project component, which renders a compact two-item list. Detail routes stay available through project titles and thumbnails, while standalone detail CTAs disappear.

**Tech Stack:** TypeScript, React, Vitest, Testing Library, CSS, vinext, Playwright-based PDF generation

## Global Constraints

- Keep the five selected projects and their current order.
- Show exactly two evidence statements per selected project.
- Use the latest Korean content as the factual source and keep English aligned with it.
- Do not expose `자세히 보기` or `Read details` on the home page.
- Keep project title and thumbnail links functional.
- Preserve eleven printable images and two-page Korean and English PDFs.
- Keep one supporting highlight in each home experience entry to avoid repeating the project evidence.
- Do not add dependencies or client state.
- Do not use em dashes or en dashes in newly written resume copy.

---

### Task 1: Add the selected-project evidence contract

**Files:**
- Modify: `src/resume/types.ts`
- Modify: `src/resume/content.ts`
- Modify: `src/resume/validate.ts`
- Modify: `src/resume/selectors.ts`
- Test: `src/resume/__tests__/selectors.test.ts`

**Interfaces:**
- Consumes: existing `Project`, `LocalizedText`, `Locale`, and `getResume(locale)` structures
- Produces: optional `Project.homeHighlights` with exactly two localized strings and `getResume(locale).selectedProjects[].highlights: string[]`

- [ ] **Step 1: Write the failing selector test**

Add a test that expects every selected project in both locales to expose exactly two non-empty `highlights`. Assert the specific Korean Chat UIKit issue reduction and Zepl performance result so the test checks real reviewer-facing evidence.

```ts
it("returns two concrete home highlights for every selected project", () => {
  for (const locale of ["ko", "en"] as const) {
    const projects = getResume(locale).selectedProjects;

    expect(projects.every((project) => project.highlights.length === 2)).toBe(
      true,
    );
    expect(
      projects.every((project) =>
        project.highlights.every((highlight) => highlight.trim().length > 0),
      ),
    ).toBe(true);
  }

  const koreanProjects = getResume("ko").selectedProjects;
  expect(koreanProjects[1]?.highlights.join(" ")).toContain("약 30%");
  expect(koreanProjects[4]?.highlights.join(" ")).toContain("100~300%");
});
```

- [ ] **Step 2: Run the selector test and verify RED**

Run: `npm test -- src/resume/__tests__/selectors.test.ts`

Expected: FAIL because selected project objects do not have `highlights`.

- [ ] **Step 3: Add the content and type contract**

Add the following optional field to `Project`:

```ts
homeHighlights?: Record<Locale, string[]>;
```

Add exactly two Korean and two English statements to each selected project. Use these facts:

```ts
homeHighlights: {
  ko: [
    "고객 환경에서 검증 가능한 React SDK API와 컴포넌트 구조를 설계·고도화함.",
    "초기 PoC와 실제 사용자 A/B 테스트를 지원해 제품 피드백 주기를 단축함.",
  ],
  en: [
    "Designed and evolved the React SDK API and component architecture for customer environments.",
    "Supported early PoCs and a live A/B test, shortening the product feedback cycle.",
  ],
}
```

Use equivalent curated pairs for Chat UIKit, TossBank, Lunit, and Zepl from the approved design specification. Extend validation so every `selected: true` project requires exactly two non-empty localized home highlights.

- [ ] **Step 4: Pass highlights through the selector**

Add this field to each mapped selected project:

```ts
highlights: project.homeHighlights?.[locale] ?? [],
```

- [ ] **Step 5: Run the selector test and verify GREEN**

Run: `npm test -- src/resume/__tests__/selectors.test.ts`

Expected: all selector tests pass.

### Task 2: Render all core project evidence on the home page

**Files:**
- Modify: `src/resume/components/SelectedProjects.tsx`
- Test: `src/resume/__tests__/home-render.test.tsx`

**Interfaces:**
- Consumes: `ProjectSummary.highlights: string[]`
- Produces: `.project-evidence` lists containing ten visible evidence items across five projects

- [ ] **Step 1: Write the failing home render test**

Add assertions for ten project evidence items, concrete Korean facts, absence of both detail labels, and retained title links.

```ts
it("shows project role and outcome evidence without a detail CTA", () => {
  const { container } = render(<ResumeHome locale="ko" />);

  expect(container.querySelectorAll(".project-evidence li")).toHaveLength(10);
  expect(screen.getByText(/고객 이슈를 약 30% 줄임/)).toBeTruthy();
  expect(screen.getByText(/상호작용 속도를 100~300% 개선/)).toBeTruthy();
  expect(screen.queryByText("자세히 보기")).toBeNull();
  expect(screen.queryByText("Read details")).toBeNull();
  expect(
    screen
      .getByRole("link", { name: "AI Agent Messenger SDK" })
      .getAttribute("href"),
  ).toBe("/ko/projects/ai-agent-messenger/");
});
```

- [ ] **Step 2: Run the home render test and verify RED**

Run: `npm test -- src/resume/__tests__/home-render.test.tsx`

Expected: FAIL because evidence lists are missing and the detail CTA still renders.

- [ ] **Step 3: Implement the compact evidence list**

Add `highlights: string[]` to `ProjectSummary`, remove `detailLabel` and the `.row-link` anchor, and render:

```tsx
<ul className="project-evidence">
  {project.highlights.map((highlight) => (
    <li key={highlight}>{highlight}</li>
  ))}
</ul>
```

Keep the title and thumbnail anchors. Change the thumbnail accessible label to `${project.title} 프로젝트 기록 보기` in Korean and `${project.title} project record` in English without rendering a standalone CTA.

- [ ] **Step 4: Run the home render test and verify GREEN**

Run: `npm test -- src/resume/__tests__/home-render.test.tsx`

Expected: all home render tests pass.

### Task 3: Increase information density without hiding content

**Files:**
- Modify: `app/globals.css`
- Test: `src/resume/__tests__/home-render.test.tsx`

**Interfaces:**
- Consumes: `.project-row`, `.project-copy`, `.project-evidence`, and `.project-thumbnail-link`
- Produces: a compact desktop, mobile, and print layout with all evidence visible

- [ ] **Step 1: Confirm the structural behavior test is GREEN**

Run: `npm test -- src/resume/__tests__/home-render.test.tsx`

Expected: five `.project-evidence` lists are in normal document flow, ten items are visible, and `.row-link` is absent.

- [ ] **Step 2: Add compact evidence styles**

Use a small two-item list with muted text and accent bullets. Widen the desktop document from 980px to 1120px, reduce project row and section padding, keep one supporting highlight per experience, and reduce the desktop thumbnail width from 282px to 224px. Keep mobile text at or above 0.84rem. In print, render evidence at 6.5pt with tight leading and preserve `break-inside: avoid`.

- [ ] **Step 3: Run focused tests and build**

Run: `npm test -- src/resume/__tests__/home-render.test.tsx && npm run build`

Expected: tests pass and build exits successfully.

### Task 4: Humanize and verify the complete resume

**Files:**
- Modify if needed: `src/resume/content.ts`
- Regenerate: `public/resume-ahyoung-ryu-ko.pdf`
- Regenerate: `public/resume-ahyoung-ryu-en.pdf`

**Interfaces:**
- Consumes: final Korean and English home copy
- Produces: validated web builds and refreshed two-page PDFs

- [ ] **Step 1: Audit new copy for AI-writing patterns**

Check the ten Korean and ten English highlight statements for inflated claims, repeated sentence shapes, promotional language, vague attribution, forced groups of three, em dashes, and en dashes. Preserve factual numbers and technical nouns.

- [ ] **Step 2: Run the complete source verification**

Run: `npm run verify`

Expected: lint, 37 or more unit tests, contract tests, static export tests, PDF checks, and rendered-site checks all pass.

- [ ] **Step 3: Regenerate and verify PDFs**

Run: `npm run build && npm run pdf && npm run test:pdf`

Expected: Korean and English PDFs each have two pages and at least eleven embedded color images.

- [ ] **Step 4: Inspect all four PDF pages**

Render both PDFs to PNG at 144 DPI. Confirm all project evidence is readable, no row is clipped, images remain visible, and the supporting record stays on page two.

- [ ] **Step 5: Re-run fresh final verification**

Run: `npm run verify`

Expected: every check passes after the final PDF files are generated.

- [ ] **Step 6: Commit, push, and deploy**

Commit the validated source and PDFs. Push the exact main branch state to GitHub Pages and the configured Sites project. Wait for both deployments to succeed, then verify the public Korean and English pages contain ten visible evidence items and no standalone detail CTA.
