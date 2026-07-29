# Ahyoung Ryu — bilingual résumé

A bilingual Korean/English résumé, selected-project portfolio, and complete
career archive. The content lives in one typed source so both languages and the
downloadable PDFs stay aligned.

Public site: <https://ahyoungryu.github.io>

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The local site opens at the URL printed by the development server. `/` redirects
to `/en`; the Korean version starts at `/ko`.

## Content updates

Edit `src/resume/content.ts`. Every localized entry is validated by the test
suite, including project references, dates, required Korean/English copy, and
external URLs.

After changing résumé content:

```bash
npm test
npm run pdf
npm run verify
```

`npm run pdf` expects the local development server at
`http://localhost:3002`. Override it with `RESUME_BASE_URL` when needed.

After committing and pushing a verified change to `main`, GitHub Actions
publishes the updated static site automatically. GitHub Pages hosting is free.

## Commands

- `npm run dev` — start local development
- `npm test` — run content, selector, component, and metadata tests
- `npm run pdf` — regenerate the Korean and English PDFs
- `npm run verify` — lint, test, build, and inspect all rendered routes
- `npm run export:static` — prepare the public GitHub Pages build
- `npm run start` — serve the production build locally
