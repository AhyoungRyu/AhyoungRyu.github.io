import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { resumeContent } from "../content";
import { validateResumeContent } from "../validate";

describe("resume content", () => {
  it("contains complete Korean and English localized copy", () => {
    expect(validateResumeContent(resumeContent)).toEqual([]);
  });

  it("rejects placeholder and malformed external links", () => {
    const broken = structuredClone(resumeContent);
    broken.projects[0].links = [{ label: "Broken", href: "http://dummy" }];

    expect(validateResumeContent(broken)).toContain(
      "projects.ai-agent-messenger.links contains a placeholder or malformed URL",
    );
  });

  it("rejects multiple current positions", () => {
    const broken = structuredClone(resumeContent);
    broken.experiences[1].end = null;

    expect(validateResumeContent(broken)).toContain(
      "experiences must contain exactly one current position",
    );
  });

  it("uses complete local image metadata", () => {
    const images = [
      resumeContent.profile.portrait,
      ...resumeContent.experiences.map((experience) => experience.logo),
      ...resumeContent.projects.flatMap((project) =>
        [project.thumbnail, ...project.gallery].filter(
          (image) => image !== undefined,
        ),
      ),
      ...resumeContent.education.map((education) => education.logo),
    ];

    expect(images.every((image) => image.src.startsWith("/images/resume/"))).toBe(
      true,
    );
    expect(images.every((image) => image.width > 0 && image.height > 0)).toBe(
      true,
    );
    expect(images.every((image) => image.alt.ko && image.alt.en)).toBe(true);
  });

  it("matches every image reference to a real, dimensionally accurate file", () => {
    const images = [
      resumeContent.profile.portrait,
      ...resumeContent.experiences.map((experience) => experience.logo),
      ...resumeContent.projects.flatMap((project) =>
        [project.thumbnail, ...project.gallery].filter(
          (image) => image !== undefined,
        ),
      ),
      ...resumeContent.education.map((education) => education.logo),
    ];
    const uniqueImages = [
      ...new Map(images.map((image) => [image.src, image])).values(),
    ];
    const hashes = uniqueImages.map((image) => {
      const filePath = path.join(process.cwd(), "public", image.src);

      expect(existsSync(filePath), `${image.src} must exist`).toBe(true);
      const file = readFileSync(filePath);
      expect(file.subarray(1, 4).toString("ascii")).toBe("PNG");
      expect(file.readUInt32BE(16), `${image.src} width`).toBe(image.width);
      expect(file.readUInt32BE(20), `${image.src} height`).toBe(image.height);

      return createHash("sha256").update(file).digest("hex");
    });

    expect(new Set(hashes).size, "distinct asset paths must not duplicate bytes").toBe(
      hashes.length,
    );
  });

  it("assigns distinct thumbnails to the five balanced home projects", () => {
    const selected = resumeContent.projects.filter((project) =>
      [
        "ai-agent-messenger",
        "chat-uikit-modernization",
        "tossbank-personal-loan",
        "lunit-annotation-tools",
        "zepl-performance",
      ].includes(project.id),
    );

    expect(new Set(selected.map((project) => project.thumbnail?.src)).size).toBe(
      5,
    );
  });

  it("rejects externally hosted resume images", () => {
    const broken = structuredClone(resumeContent);
    broken.profile.portrait.src = "https://images.example.com/portrait.png";

    expect(validateResumeContent(broken)).toContain(
      "profile.portrait must be a complete local resume image",
    );
  });
});
