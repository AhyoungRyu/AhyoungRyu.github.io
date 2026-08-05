# Resume visual and supporting-record follow-up design

## Goal

Remove decorative borders from resume imagery, improve the legibility of experience dates, and make the supporting-record copy shorter and verifiable.

## Source and copy

- The Korean CakeResume remains the canonical career source.
- Current GitHub data from `apache/zeppelin` reports 338 contributors; `AhyoungRyu` is ninth with 104 contributions.
- The open-source record links to `https://github.com/apache/zeppelin/graphs/contributors` so readers can inspect the current ranking.
- Korean supporting-record sentences use concise nominal endings: `활동`, `남김`, `진행`, and `발표함` rather than repeated formal past-tense endings.
- English preserves the same current facts in concise sentences.

## Visual changes

- Remove the one-pixel border from home project thumbnails.
- Remove the one-pixel border from project-detail primary-image and gallery frames.
- Keep image cropping, dimensions, background color, and responsive behavior unchanged.
- Increase the main experience date from `0.7rem` to `0.78rem`.
- Increase the mobile experience date to `0.76rem` while preserving the existing grid.
- Keep print pagination at two pages; adjust only if the rendered PDF review finds overflow.

## Verification

- Home rendering exposes a real external link around the Apache Zeppelin record.
- Korean copy contains the current `338명`, `9위`, `104개 커밋`, `남김`, and `발표함` wording.
- CSS no longer draws borders on the three image-frame selectors.
- Desktop and mobile screenshots show no overflow.
- Both PDFs remain two pages with at least eleven color images.

