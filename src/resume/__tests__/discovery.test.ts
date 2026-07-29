import { describe, expect, it } from "vitest";
import { buildRobotsText, buildSitemapXml } from "../discovery";

describe("search discovery files", () => {
  it("builds host-aware robots text", () => {
    expect(buildRobotsText("https://resume.example")).toBe(
      [
        "User-agent: *",
        "Allow: /",
        "Sitemap: https://resume.example/sitemap.xml",
        "",
      ].join("\n"),
    );
  });

  it("lists both home pages, archives, and every project translation", () => {
    const xml = buildSitemapXml("https://resume.example");

    expect(xml).toContain("<loc>https://resume.example/ko</loc>");
    expect(xml).toContain("<loc>https://resume.example/en/archive</loc>");
    expect(xml).toContain(
      "<loc>https://resume.example/ko/projects/ai-agent-messenger</loc>",
    );
    expect(xml.match(/<url>/g)).toHaveLength(20);
  });
});
