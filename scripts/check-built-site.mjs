import { access, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const projectSlugs = [
  "ai-agent-messenger",
  "chat-uikit-modernization",
  "ai-chatbot-performance",
  "tossbank-personal-loan",
  "compliance-single-source",
  "lunit-annotation-tools",
  "apache-zeppelin",
  "zepl-performance",
];

export const expectedResumeRoutes = ["ko", "en"].flatMap((locale) => [
  `/${locale}`,
  `/${locale}/archive`,
  ...projectSlugs.map((slug) => `/${locale}/projects/${slug}`),
]);

function countMatches(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

export function inspectRenderedHtml(html, expectedLocale, route = "") {
  const issues = [];
  const starterResidue =
    /Starter Project|Codex is working|react-loading-skeleton|codex-preview/i;

  if (!new RegExp(`<html[^>]+lang=["']${expectedLocale}["']`, "i").test(html)) {
    issues.push(`expected html lang="${expectedLocale}"`);
  }

  const h1Count = countMatches(html, /<h1\b/gi);
  if (h1Count !== 1) {
    issues.push(`expected exactly one h1, found ${h1Count}`);
  }

  if (starterResidue.test(html)) {
    issues.push("starter residue remains in rendered HTML");
  }

  if (/(?:href|src)=["'][^"']*(?:dummy|undefined|null)[^"']*["']/i.test(html)) {
    issues.push("dummy or unresolved URL found");
  }

  if (!/<link[^>]+rel=["']canonical["'][^>]*>/i.test(html)) {
    issues.push("canonical link is missing");
  }

  for (const locale of ["ko", "en", "x-default"]) {
    if (
      !new RegExp(
        `<link[^>]+rel=["']alternate["'][^>]+hreflang=["']${locale}["'][^>]*>`,
        "i",
      ).test(html)
    ) {
      issues.push(`hreflang="${locale}" is missing`);
    }
  }

  if (!/<meta[^>]+property=["']og:image["'][^>]*>/i.test(html)) {
    issues.push("og:image is missing");
  }

  if (/^\/(?:ko|en)\/?$/.test(route)) {
    const requiredHomeStructure = [
      /<header[^>]+class=["'][^"']*\bresume-header\b[^"']*["']/i,
      /<section[^>]+class=["'][^"']*\bintro-section\b[^"']*["']/i,
      /<section[^>]+id=["']experience["']/i,
      /<section[^>]+id=["']projects["']/i,
      /<section[^>]+id=["']record["']/i,
    ];

    if (requiredHomeStructure.some((pattern) => !pattern.test(html))) {
      issues.push("compact resume home structure is incomplete");
    }
  }

  return issues;
}

async function loadWorker(rootDirectory) {
  const workerPath = path.join(rootDirectory, "dist/server/index.js");
  const workerUrl = pathToFileURL(workerPath);
  workerUrl.searchParams.set("check", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function render(worker, route) {
  return worker.fetch(
    new Request(`http://resume.local${route}`, {
      headers: { accept: "text/html" },
      redirect: "manual",
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

export async function checkBuiltSite(rootDirectory = process.cwd()) {
  const worker = await loadWorker(rootDirectory);
  const failures = [];

  for (const route of expectedResumeRoutes) {
    const response = await render(worker, route);
    if (response.status !== 200) {
      failures.push(`${route}: expected 200, received ${response.status}`);
      continue;
    }

    if (!/^text\/html\b/i.test(response.headers.get("content-type") ?? "")) {
      failures.push(`${route}: response is not HTML`);
      continue;
    }

    const locale = route.split("/")[1];
    const issues = inspectRenderedHtml(await response.text(), locale, route);
    failures.push(...issues.map((issue) => `${route}: ${issue}`));
  }

  const rootResponse = await render(worker, "/");
  if (![307, 308].includes(rootResponse.status)) {
    failures.push(`/: expected a locale redirect, received ${rootResponse.status}`);
  } else if (
    !/^https?:\/\/[^/]+\/en\/?$|^\/en\/?$/.test(
      rootResponse.headers.get("location") ?? "",
    )
  ) {
    failures.push("/: expected redirect location /en");
  }

  const robotsResponse = await render(worker, "/robots.txt");
  const robots = await robotsResponse.text();
  if (
    robotsResponse.status !== 200 ||
    !robots.includes("Sitemap: http://resume.local/sitemap.xml")
  ) {
    failures.push("/robots.txt: host-aware sitemap declaration is missing");
  }

  const sitemapResponse = await render(worker, "/sitemap.xml");
  const sitemap = await sitemapResponse.text();
  if (
    sitemapResponse.status !== 200 ||
    !sitemap.includes("<loc>http://resume.local/ko</loc>") ||
    countMatches(sitemap, /<url>/g) !== expectedResumeRoutes.length
  ) {
    failures.push("/sitemap.xml: expected all 20 public routes");
  }

  for (const filename of [
    "resume-ahyoung-ryu-ko.pdf",
    "resume-ahyoung-ryu-en.pdf",
  ]) {
    try {
      await access(path.join(rootDirectory, "dist/client", filename));
    } catch {
      failures.push(`/${filename}: built PDF is missing`);
    }
  }

  try {
    const socialImage = await readFile(
      path.join(rootDirectory, "dist/client/og.png"),
    );
    const width = socialImage.readUInt32BE(16);
    const height = socialImage.readUInt32BE(20);
    if (width !== 1200 || height !== 630) {
      failures.push(`/og.png: expected 1200×630, received ${width}×${height}`);
    }
  } catch {
    failures.push("/og.png: built social card is missing or invalid");
  }

  if (failures.length > 0) {
    throw new Error(`Built-site contract failed:\n- ${failures.join("\n- ")}`);
  }
}

const invokedPath = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : "";

if (invokedPath === import.meta.url) {
  await checkBuiltSite();
  process.stdout.write(
    `Verified ${expectedResumeRoutes.length} localized routes, discovery files, social card, and two PDFs.\n`,
  );
}
