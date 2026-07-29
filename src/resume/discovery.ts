import { getProjectSlugs } from "./selectors";
import { locales } from "./types";

function normalizeOrigin(origin: string): string {
  return origin.replace(/\/+$/, "");
}

export function getPublicRoutes(): string[] {
  return locales.flatMap((locale) => [
    `/${locale}`,
    `/${locale}/archive`,
    ...getProjectSlugs().map((slug) => `/${locale}/projects/${slug}`),
  ]);
}

export function buildRobotsText(origin: string): string {
  const normalizedOrigin = normalizeOrigin(origin);
  return [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${normalizedOrigin}/sitemap.xml`,
    "",
  ].join("\n");
}

export function buildSitemapXml(origin: string): string {
  const normalizedOrigin = normalizeOrigin(origin);
  const urls = getPublicRoutes()
    .map((route) => `  <url><loc>${normalizedOrigin}${route}</loc></url>`)
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}
