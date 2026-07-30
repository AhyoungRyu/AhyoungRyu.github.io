import assert from "node:assert/strict";
import test from "node:test";

import {
  inspectRenderedHtml,
  expectedResumeRoutes,
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
