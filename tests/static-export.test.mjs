import assert from "node:assert/strict";
import test from "node:test";

import { transformForStaticHosting } from "../scripts/export-static-site.mjs";

test("turns the rendered app shell into a portable static page", () => {
  const rendered = `<!doctype html>
    <html lang="en">
      <head>
        <link rel="canonical" href="http://resume.local/en/" />
        <link rel="modulepreload" href="/assets/runtime.js" />
      </head>
      <body>
        <h1>Ahyoung Ryu</h1>
        <button class="text-button" type="button">Print</button>
        <script src="/assets/runtime.js"></script>
        <script>self.__next_f.push("payload")</script>
      </body>
    </html>`;

  const transformed = transformForStaticHosting(
    rendered,
    "https://ahyoungryu.github.io",
  );

  assert.match(
    transformed,
    /href="https:\/\/ahyoungryu\.github\.io\/en\/"/,
  );
  assert.doesNotMatch(transformed, /modulepreload|runtime\.js|__next_f/);
  assert.match(transformed, /querySelectorAll\("\.text-button"\)/);
  assert.match(transformed, /window\.print\(\)/);
  assert.match(transformed, /<h1>Ahyoung Ryu<\/h1>/);
});
