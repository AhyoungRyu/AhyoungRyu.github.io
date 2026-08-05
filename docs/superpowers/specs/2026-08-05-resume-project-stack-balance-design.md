# Resume project and technology balance design

## Goal

Make the main bilingual resume read as a software engineer's resume by showing the technologies used in each role and project, while restoring one representative project from TossBank, Lunit, and Zepl without turning the page back into a long portfolio.

## Scope

- Keep five projects on the main resume.
- Keep two Sendbird projects: AI Agent Messenger SDK and Chat UIKit Modernization.
- Add one project each from TossBank, Lunit, and Zepl.
- Keep AI Chatbot Performance as a quantified Sendbird experience highlight rather than a selected project row.
- Show a concise technology line in every main-page experience and project row.
- Use only the existing CakeResume-derived content and technology data already stored in `src/resume/content.ts`.
- Preserve Korean and English routes, project-detail routes, images, and print output.
- Keep both resume PDFs at two pages.

## Selected projects

The main page lists these projects in reverse chronological company order:

1. Sendbird, AI Agent Messenger SDK
2. Sendbird, Chat UIKit Modernization
3. TossBank, Personal Loan Product
4. Lunit, Digital Pathology Annotation Tools
5. Zepl, Notebook and Data Visualization Performance

The existing project IDs are the source of truth:

- `ai-agent-messenger`
- `chat-uikit-modernization`
- `tossbank-personal-loan`
- `lunit-annotation-tools`
- `zepl-performance`

## Information design

### Experience rows

Each experience keeps its current date, company logo, role, one-sentence summary, and two impact bullets. A technology line appears after the impact bullets.

- Label: `Tech` in both languages to avoid adding visual weight.
- Maximum visible technologies: six per experience.
- Source: the existing `Experience.technologies` array.
- Presentation: plain compact text separated by centered dots, not colored badges.
- Desktop: one line where space permits.
- Mobile: wrap naturally, with compact line height.
- Print: use a smaller size and keep the row together where possible.

### Project rows

Each selected project keeps its company and period, title, one-sentence summary, thumbnail, and detail link. A technology line appears between the summary and detail link.

- Maximum visible technologies: five per project.
- Source: the existing `Project.technologies` array.
- Presentation: the same compact plain-text treatment used by experience rows.
- Thumbnails remain at the current CakeResume-like desktop size of 282 by 159 pixels.

## Scroll and density constraints

Replacing the AI Chatbot project with three earlier-company projects adds two project rows net. To limit the increase:

- Do not add a separate skills section.
- Do not add new project prose to the home page.
- Keep one project summary sentence per row.
- Reduce project row vertical padding slightly if needed after rendered review.
- Keep technology lines typographically subordinate to outcomes and summaries.

## Data flow

`resumeContent` remains the only content source. `getResume()` selects the five project IDs and passes technologies through the localized view model. `ExperienceTimeline` and `SelectedProjects` render the compact technology lines. Project detail pages continue to use their existing complete technology arrays.

## Accessibility and localization

- Technology names stay in their canonical English form in both locales.
- The visual separator is decorative text and does not replace meaningful labels.
- Technology lines remain readable without color.
- Existing headings, links, alt text, and keyboard behavior remain unchanged.

## Verification

- Selector tests assert the exact five selected project IDs in order.
- Home-render tests assert technologies appear for both experience and project rows.
- Rendered-site checks continue to validate all localized routes and assets.
- PDF checks continue to require two pages and at least nine embedded color images per language.
- A final browser and print review checks density, wrapping, thumbnails, and the absence of horizontal overflow.

