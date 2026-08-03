import assert from "node:assert/strict";
import test from "node:test";

import {
  collectLocalResumeImagePaths,
  inspectRenderedHtml,
  expectedResumeRoutes,
  findMissingLocalAssets,
} from "../scripts/check-built-site.mjs";

test("defines every localized resume, archive, and project route", () => {
  assert.equal(expectedResumeRoutes.length, 20);
  assert.ok(expectedResumeRoutes.includes("/ko"));
  assert.ok(expectedResumeRoutes.includes("/en/archive"));
  assert.ok(
    expectedResumeRoutes.includes("/ko/projects/ai-agent-messenger"),
  );
  assert.ok(expectedResumeRoutes.includes("/en/projects/zepl-performance"));
});

test("accepts a localized, discoverable, starter-free page", () => {
  const html = `<!doctype html>
    <html lang="ko">
      <head>
        <title>류아영 · Senior Software Engineer</title>
        <link rel="canonical" href="/ko/" />
        <link rel="alternate" hreflang="ko" href="/ko/" />
        <link rel="alternate" hreflang="en" href="/en/" />
        <link rel="alternate" hreflang="x-default" href="/en/" />
        <meta property="og:image" content="/og.png" />
      </head>
      <body><main><h1>류아영</h1></main></body>
    </html>`;

  assert.deepEqual(inspectRenderedHtml(html, "ko"), []);
});

test("reports broken page contracts", () => {
  const html = `<!doctype html>
    <html lang="en">
      <head><title>Starter Project</title></head>
      <body><h1>One</h1><h1>Two</h1><a href="dummy">Bad link</a></body>
    </html>`;

  const issues = inspectRenderedHtml(html, "ko");
  assert.ok(issues.some((issue) => issue.includes("lang")));
  assert.ok(issues.some((issue) => issue.includes("exactly one h1")));
  assert.ok(issues.some((issue) => issue.includes("starter residue")));
  assert.ok(issues.some((issue) => issue.includes("dummy")));
  assert.ok(issues.some((issue) => issue.includes("hreflang")));
  assert.ok(issues.some((issue) => issue.includes("og:image")));
});

test("requires the compact document structure on resume home pages", () => {
  const html = `<!doctype html>
    <html lang="ko">
      <head>
        <title>류아영 · Senior Software Engineer</title>
        <link rel="canonical" href="/ko/" />
        <link rel="alternate" hreflang="ko" href="/ko/" />
        <link rel="alternate" hreflang="en" href="/en/" />
        <link rel="alternate" hreflang="x-default" href="/en/" />
        <meta property="og:image" content="/og.png" />
      </head>
      <body><main><h1>류아영</h1></main></body>
    </html>`;

  const issues = inspectRenderedHtml(html, "ko", "/ko");

  assert.ok(
    issues.some((issue) => issue.includes("compact resume home structure")),
  );
});

test("collects local resume assets and detects files missing from a build", async () => {
  const html = `<main>
    <img src="/images/resume/logo-sendbird.png" alt="Sendbird" />
    <img src="/images/resume/logo-sendbird.png" alt="Sendbird duplicate" />
    <img src="https://example.com/external.png" alt="External" />
    <img src="/images/resume/missing.png" alt="Missing" />
  </main>`;
  const assets = collectLocalResumeImagePaths(html);

  assert.deepEqual(assets, [
    "/images/resume/logo-sendbird.png",
    "/images/resume/missing.png",
  ]);
  assert.deepEqual(
    await findMissingLocalAssets(new URL("../public/", import.meta.url), assets),
    ["/images/resume/missing.png"],
  );
});
