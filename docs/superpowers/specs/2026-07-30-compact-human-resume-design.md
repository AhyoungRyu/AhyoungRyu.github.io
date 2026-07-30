# Compact, Human Resume Home Redesign

## Goal

Replace the portfolio-style Korean and English home pages with compact resume pages that recruiters can scan in under one minute. Keep the detailed project and archive routes, but make the home page sound like Ahyoung Ryu and prioritize verified CakeResume facts over abstract positioning copy.

## Source of truth

- CakeResume Korean resume: `https://www.cake.me/resumes/ahyoung-ryu-kr`
- Existing structured content in `src/resume/content.ts`
- Current project detail and archive routes

No new career claim may be introduced unless it already exists in one of these sources. The redesign may shorten and translate existing material, but it must preserve dates, companies, roles, metrics, and project relationships.

## Approaches considered

### A. Keep the current layout and reduce spacing

This is the smallest change, but it leaves the main problem intact. The capability cards, repeated project cards, and marketing copy would still make the page feel generated and repetitive.

### B. Rebuild the home page as a compact resume

This is the selected approach. The home page becomes a document-first summary, while detailed project and archive pages continue to hold the complete record. It removes duplicated claims, gives real outcomes more visual weight, and keeps the bilingual and PDF features.

### C. Reproduce the CakeResume layout closely

This would recover its familiar density, but it would also preserve an older visual structure and create unnecessary resemblance to a third-party service. The new site should retain the useful facts and personal voice without copying the platform.

## Content and voice

### Introduction

The Korean page opens with "안녕하세요, 류아영입니다." and uses the personal value statement from CakeResume in a shortened form. The English page uses a direct first-person equivalent. Both versions retain the role, location, email, LinkedIn, GitHub, language switch, PDF download, and print action.

The introduction must avoid:

- abstract capability claims with no supporting fact;
- a forced list of three or four strengths;
- "from X to Y" career-range phrasing;
- marketing prompts such as "Looking for the complete record?";
- generic section descriptions that repeat the heading.

### Experience

Show the four most recent companies:

1. Sendbird
2. TossBank
3. Lunit
4. Zepl

Each entry shows the date, role, team when relevant, one short context sentence, and at most two outcome bullets. The strongest verified facts receive priority:

- Chat UIKit test coverage from 22.51% to 50% and about 30% fewer issue reports;
- AI Chatbot bundle reduction of about 25% and Lighthouse improvement of about 15%;
- sole front-end ownership of TossBank's personal-loan funnel;
- Lunit Annotation Tool rebuild in six weeks;
- Zepl notebook responsiveness improvement of 100 to 300%;
- Apache Zeppelin committer and PMC work remains available through the archive and project page.

Technology tags are removed from the home experience list. They remain on project detail pages and in the archive.

### Selected work

Show three compact project rows:

1. AI Agent Messenger SDK
2. Chat UIKit modernization
3. AI Chatbot Self-service performance

Each row contains company, period, title, one concrete sentence, and a detail link. The full six-project selection remains reachable through the archive and individual project routes.

### Additional record

Combine open source, teaching, education, and languages into one compact section. It highlights:

- Apache Zeppelin committer and PMC membership, 104 commits, and contributor rank 9 of 281 as recorded by CakeResume;
- the 11-hour Fast Campus course and ApacheCon talks;
- Sookmyung Women's University;
- Korean and English proficiency.

The page ends with one understated archive link. There is no large dark call-to-action banner.

## Layout

### Desktop

- Keep the warm paper palette and restrained green accent.
- Replace the wide sticky profile rail with a compact top header inside the reading column.
- Limit the reading column to approximately 980px.
- Target a total Korean home-page height of 4,000 to 4,500px at 1440 by 900, compared with the current 7,203px.
- Use small section headings, thin rules, and compact rows.
- Avoid equal-height presentation cards and oversized chapter numbers.

### Mobile

- Use a single column.
- Keep language and PDF actions visible near the top without a sticky full-width navigation bar.
- Keep body text at least 16px and touch targets at least 44px when an action is button-like.
- Do not force horizontal scrolling.

### Print

- Preserve the existing localized PDF and print routes.
- Hide navigation-only controls.
- Keep experience entries together when practical.
- Target two to three A4 pages per language.

## Component changes

- `ResumeHome` owns the compact section order and localized labels.
- `ProfileRail` becomes `ResumeHeader`, containing identity and utility links without duplicating the introduction.
- `ExperienceTimeline` renders compact entries with at most two highlights and no technology chips.
- `SelectedProjects` renders three horizontal project rows.
- `Credibility` is replaced by an `AdditionalRecord` component that combines open source, teaching, education, and languages.
- `SectionHeading` loses the numeric index and description support on the home page.
- Project detail and archive components keep their existing information architecture.

## Testing

Automated tests must verify:

- one `h1` per localized home page;
- Korean and English navigation, PDF, and language links;
- no capability section or marketing archive banner on the home page;
- exactly three selected home projects in both locales;
- no more than two highlights per home experience;
- CakeResume-derived human introduction copy appears in both locales;
- the compact additional record contains Apache Zeppelin, education, and languages;
- existing detail routes, archive routes, metadata, and content validation remain valid.

Production verification must include:

- lint;
- unit tests;
- contract tests;
- static export tests;
- production build and rendered-link check;
- generated Korean and English PDFs;
- desktop and mobile inspection of both localized home pages;
- deployed URL response and visual inspection.

## Non-goals

- Do not add a CMS, database, analytics, authentication, or contact form.
- Do not change project slugs or remove detail and archive routes.
- Do not copy CakeResume branding or its exact layout.
- Do not invent a new portrait, employer logo, or career metric.
