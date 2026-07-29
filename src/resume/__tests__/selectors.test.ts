import { describe, expect, it } from "vitest";
import { getProject, getProjectSlugs, getResume } from "../selectors";

describe("localized resume selectors", () => {
  it("returns equivalent selected project IDs for both locales", () => {
    expect(getResume("ko").selectedProjects.map((item) => item.id)).toEqual(
      getResume("en").selectedProjects.map((item) => item.id),
    );
  });

  it("returns stable project slugs and localized project copy", () => {
    expect(getProjectSlugs()).toContain("ai-agent-messenger");
    expect(getProject("ko", "ai-agent-messenger")?.summary).not.toBe(
      getProject("en", "ai-agent-messenger")?.summary,
    );
  });

  it("limits the home page to six selected projects", () => {
    expect(getResume("ko").selectedProjects).toHaveLength(6);
  });
});
