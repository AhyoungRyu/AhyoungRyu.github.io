# Resume project and technology balance implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show concise technologies for every main-page role and project, and balance the selected work across Sendbird, TossBank, Lunit, and Zepl with exactly five projects.

**Architecture:** Keep `resumeContent` as the single source of truth. Update `getResume()` to select the approved five project IDs, add one reusable presentational component for compact technology lines, and use it in the existing experience and project rows. Preserve the existing detail routes and image model.

**Tech Stack:** TypeScript, React 19, Vitest, Testing Library, CSS, Playwright-based PDF generation, vinext static build.

## Global Constraints

- Main-page selected projects must be exactly `ai-agent-messenger`, `chat-uikit-modernization`, `tossbank-personal-loan`, `lunit-annotation-tools`, and `zepl-performance`, in that order.
- Experience technology lines show at most six items.
- Project technology lines show at most five items.
- Technology names remain canonical English names in Korean and English.
- Do not add a separate skills section or new resume claims.
- Keep project thumbnails at 282 by 159 pixels on desktop.
- Keep both generated resume PDFs at exactly two pages.

---

### Task 1: Select the balanced five-project set

**Files:**
- Modify: `src/resume/__tests__/selectors.test.ts`
- Modify: `src/resume/selectors.ts`

**Interfaces:**
- Consumes: `resumeContent.projects` and the existing localized project view model.
- Produces: `getResume(locale).selectedProjects` with the exact five approved project IDs and each project's existing `technologies` array.

- [ ] **Step 1: Write the failing selector test**

Replace the three-project expectation with a literal five-project expectation:

```ts
it("returns the balanced five-project home selection", () => {
  const expectedIds = [
    "ai-agent-messenger",
    "chat-uikit-modernization",
    "tossbank-personal-loan",
    "lunit-annotation-tools",
    "zepl-performance",
  ];

  expect(getResume("ko").selectedProjects.map((project) => project.id)).toEqual(
    expectedIds,
  );
  expect(getResume("en").selectedProjects.map((project) => project.id)).toEqual(
    expectedIds,
  );
});
```

- [ ] **Step 2: Run the selector test and verify RED**

Run: `npm test -- src/resume/__tests__/selectors.test.ts`

Expected: FAIL because the current selector returns the three Sendbird project IDs and still includes `ai-chatbot-performance`.

- [ ] **Step 3: Implement the five-project selection**

Change `homeProjectIds` in `getResume()` to:

```ts
const homeProjectIds = [
  "ai-agent-messenger",
  "chat-uikit-modernization",
  "tossbank-personal-loan",
  "lunit-annotation-tools",
  "zepl-performance",
];
```

Keep the existing filter, explicit sort, localization, technologies, href, company, and thumbnail mapping unchanged.

- [ ] **Step 4: Run the selector test and verify GREEN**

Run: `npm test -- src/resume/__tests__/selectors.test.ts`

Expected: all selector tests pass.

- [ ] **Step 5: Commit the selector change**

```bash
git add src/resume/selectors.ts src/resume/__tests__/selectors.test.ts
git commit -m "feat: balance selected resume projects"
```

### Task 2: Render compact technology lines

**Files:**
- Create: `src/resume/components/TechnologyLine.tsx`
- Modify: `src/resume/components/ExperienceTimeline.tsx`
- Modify: `src/resume/components/SelectedProjects.tsx`
- Modify: `src/resume/__tests__/home-render.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `technologies: string[]` already present on experience and project view models.
- Produces: `TechnologyLine({ technologies, limit }: { technologies: string[]; limit: number })` rendering a labeled, compact text line.

- [ ] **Step 1: Write failing home-render tests**

Update the compact section and image assertions, then add a technology assertion:

```tsx
it("renders five selected projects and their thumbnails", () => {
  const { container } = render(<ResumeHome locale="ko" />);

  expect(container.querySelectorAll(".project-row")).toHaveLength(5);
  expect(container.querySelectorAll(".project-thumbnail")).toHaveLength(5);
});

it("renders limited technologies for every experience and project", () => {
  const { container } = render(<ResumeHome locale="en" />);
  const experienceTech = Array.from(
    container.querySelectorAll<HTMLElement>(".experience-item .technology-line"),
  );
  const projectTech = Array.from(
    container.querySelectorAll<HTMLElement>(".project-row .technology-line"),
  );

  expect(experienceTech).toHaveLength(4);
  expect(projectTech).toHaveLength(5);
  expect(experienceTech[0]?.textContent).toContain(
    "TechTypeScript · React · Vite · pnpm · Yarn Berry · GitHub Actions",
  );
  expect(experienceTech[0]?.textContent).not.toContain("CircleCI");
  expect(projectTech[0]?.textContent).toContain(
    "TechTypeScript · React · Vite · pnpm · CircleCI",
  );
});
```

Update the printable image expectation from 9 to 11 because the home page now contains the portrait, four company logos, five project thumbnails, and one school logo.

- [ ] **Step 2: Run the home-render test and verify RED**

Run: `npm test -- src/resume/__tests__/home-render.test.tsx`

Expected: FAIL because only three project rows render and no `.technology-line` elements exist.

- [ ] **Step 3: Add the reusable technology component**

Create `TechnologyLine.tsx`:

```tsx
type TechnologyLineProps = {
  technologies: string[];
  limit: number;
};

export function TechnologyLine({ technologies, limit }: TechnologyLineProps) {
  const visibleTechnologies = technologies.slice(0, limit);

  if (visibleTechnologies.length === 0) {
    return null;
  }

  return (
    <p className="technology-line">
      <span className="technology-label">Tech</span>
      <span>{visibleTechnologies.join(" · ")}</span>
    </p>
  );
}
```

- [ ] **Step 4: Pass and render experience technologies**

Add `technologies: string[]` to `ExperienceItem`, import `TechnologyLine`, and render `<TechnologyLine technologies={experience.technologies} limit={6} />` after the impact list.

- [ ] **Step 5: Render project technologies**

Import `TechnologyLine` in `SelectedProjects` and render `<TechnologyLine technologies={project.technologies} limit={5} />` between the summary and detail link.

- [ ] **Step 6: Add compact responsive and print styles**

Add shared styles:

```css
.technology-line {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.55rem;
  margin: 0.7rem 0 0;
  color: var(--muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.68rem;
  line-height: 1.45;
}

.technology-label {
  color: var(--accent);
  font-weight: 700;
}
```

Reduce `.project-row` vertical padding to `1.65rem 0 1.75rem`, keep `.project-thumbnail-link` at `282px` with `aspect-ratio: 16 / 9`, and add print overrides that use `5.8pt` technology text and compact margins.

- [ ] **Step 7: Run the home-render test and verify GREEN**

Run: `npm test -- src/resume/__tests__/home-render.test.tsx`

Expected: all home-render tests pass with four experience lines, five project lines, and eleven eagerly loaded printable images.

- [ ] **Step 8: Run all component and selector tests**

Run: `npm test -- src/resume/__tests__/selectors.test.ts src/resume/__tests__/home-render.test.tsx src/resume/__tests__/resume-image.test.tsx`

Expected: all selected tests pass.

- [ ] **Step 9: Commit the rendering change**

```bash
git add app/globals.css src/resume/components/TechnologyLine.tsx src/resume/components/ExperienceTimeline.tsx src/resume/components/SelectedProjects.tsx src/resume/__tests__/home-render.test.tsx
git commit -m "feat: show technologies across resume work"
```

### Task 3: Regenerate and verify the two-page outputs

**Files:**
- Modify: `scripts/check-pdfs.mjs`
- Modify: `public/resume-ahyoung-ryu-ko.pdf`
- Modify: `public/resume-ahyoung-ryu-en.pdf`

**Interfaces:**
- Consumes: the printable `/ko/` and `/en/` home routes.
- Produces: two A4, two-page PDFs containing all eleven main-page color images.

- [ ] **Step 1: Raise the PDF image contract and verify RED**

Change `expectedColorImageCount` in `scripts/check-pdfs.mjs` from `9` to `11`.

Run: `npm run test:pdf`

Expected: FAIL because the previously generated PDFs contain nine color images.

- [ ] **Step 2: Build and regenerate the PDFs**

Run: `npm run build && npm run pdf`

Expected: both PDF files are regenerated from the updated home routes.

- [ ] **Step 3: Verify PDF pagination and images**

Run: `npm run test:pdf`

Expected: PASS with both PDFs at two pages and at least eleven embedded color images each.

- [ ] **Step 4: Run the complete project verification**

Run: `npm run verify`

Expected: lint, Vitest, contract tests, static export tests, PDF checks, production build, and rendered-site checks all pass.

- [ ] **Step 5: Inspect the final diff and commit outputs**

Run: `git diff --check && git status --short`

Then commit:

```bash
git add scripts/check-pdfs.mjs public/resume-ahyoung-ryu-ko.pdf public/resume-ahyoung-ryu-en.pdf
git commit -m "docs: refresh balanced resume PDFs"
```

- [ ] **Step 6: Re-run verification after the final commit**

Run: `npm run verify && git status --short`

Expected: verification exits zero and the worktree is clean.

