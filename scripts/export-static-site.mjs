import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  expectedResumeRoutes,
  inspectRenderedHtml,
} from "./check-built-site.mjs";

const defaultOrigin = "https://ahyoungryu.github.io";
const printEnhancement = `<script>
document.querySelectorAll(".text-button").forEach((button) => {
  button.addEventListener("click", () => window.print());
});
</script>`;

export function transformForStaticHosting(html, origin) {
  const normalizedOrigin = origin.replace(/\/+$/, "");

  return html
    .replace(
      /<link\b[^>]*\brel=["']modulepreload["'][^>]*>\s*/gi,
      "",
    )
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>\s*/gi, "")
    .replace(
      /http:\/\/(?:resume\.local|localhost:\d+)/g,
      normalizedOrigin,
    )
    .replace("</body>", `${printEnhancement}</body>`);
}

async function loadWorker(rootDirectory) {
  const workerUrl = pathToFileURL(
    path.join(rootDirectory, "dist/server/index.js"),
  );
  workerUrl.searchParams.set("static-export", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function render(worker, route) {
  return worker.fetch(
    new Request(`http://resume.local${route}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function redirectDocument(destination) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=${destination}" />
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${destination}" />
    <title>Ahyoung Ryu · Senior Software Engineer</title>
  </head>
  <body><p><a href="${destination}">Open the résumé</a></p></body>
</html>
`;
}

function sitemapDocument(origin) {
  const urls = expectedResumeRoutes
    .map((route) => `  <url><loc>${origin}${route}</loc></url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export async function exportStaticSite({
  rootDirectory = process.cwd(),
  origin = defaultOrigin,
} = {}) {
  const normalizedOrigin = origin.replace(/\/+$/, "");
  const outputDirectory = path.join(rootDirectory, "work/github-pages");
  const resolvedRoot = path.resolve(rootDirectory);
  const resolvedOutput = path.resolve(outputDirectory);

  if (!resolvedOutput.startsWith(`${resolvedRoot}${path.sep}work${path.sep}`)) {
    throw new Error("Static export directory must stay inside work/.");
  }

  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });
  await cp(path.join(rootDirectory, "dist/client"), outputDirectory, {
    recursive: true,
  });

  const worker = await loadWorker(rootDirectory);
  for (const route of expectedResumeRoutes) {
    const response = await render(worker, route);
    if (response.status !== 200) {
      throw new Error(`${route}: expected 200, received ${response.status}`);
    }

    const locale = route.split("/")[1];
    const html = transformForStaticHosting(
      await response.text(),
      normalizedOrigin,
    );
    const issues = inspectRenderedHtml(html, locale);
    if (issues.length > 0) {
      throw new Error(`${route}: ${issues.join("; ")}`);
    }

    const routeDirectory = path.join(
      outputDirectory,
      route.replace(/^\//, ""),
    );
    await mkdir(routeDirectory, { recursive: true });
    await writeFile(path.join(routeDirectory, "index.html"), html);
  }

  const englishUrl = `${normalizedOrigin}/en/`;
  await Promise.all([
    writeFile(path.join(outputDirectory, "index.html"), redirectDocument(englishUrl)),
    writeFile(path.join(outputDirectory, "404.html"), redirectDocument(englishUrl)),
    writeFile(
      path.join(outputDirectory, "robots.txt"),
      `User-agent: *\nAllow: /\nSitemap: ${normalizedOrigin}/sitemap.xml\n`,
    ),
    writeFile(
      path.join(outputDirectory, "sitemap.xml"),
      sitemapDocument(normalizedOrigin),
    ),
    writeFile(path.join(outputDirectory, ".nojekyll"), ""),
  ]);

  const sample = await readFile(
    path.join(outputDirectory, "en/index.html"),
    "utf8",
  );
  if (
    /http:\/\/(?:resume\.local|localhost:\d+)/.test(sample) ||
    sample.includes("self.__next_f") ||
    !sample.includes(`${normalizedOrigin}/en/`)
  ) {
    throw new Error("Static export contains unresolved runtime markup.");
  }

  return outputDirectory;
}

const invokedPath = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : "";

if (invokedPath === import.meta.url) {
  const outputDirectory = await exportStaticSite({
    origin: process.env.STATIC_SITE_ORIGIN ?? defaultOrigin,
  });
  process.stdout.write(
    `Exported ${expectedResumeRoutes.length} pages to ${outputDirectory}.\n`,
  );
}
