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
});
