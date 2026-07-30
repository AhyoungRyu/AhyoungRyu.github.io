import { describe, expect, it } from "vitest";
import {
  getArchive,
  getProject,
  getProjectSlugs,
  getResume,
} from "../selectors";

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

  it("returns four compact experience entries with at most two highlights", () => {
    const resume = getResume("ko");

    expect(resume.experiences).toHaveLength(4);
    expect(
      resume.experiences.every((experience) => experience.highlights.length <= 2),
    ).toBe(true);
  });

  it("limits the home page to three selected projects", () => {
    expect(getResume("ko").selectedProjects).toHaveLength(3);
    expect(getResume("en").selectedProjects).toHaveLength(3);
  });

  it("returns the supporting record used by the home page", () => {
    const record = getResume("ko").additionalRecord;

    expect(record.openSource).toContain("104개 커밋");
    expect(record.teaching).toContain("총 11시간");
    expect(record.education[0].school).toBe("Sookmyung Women's University");
    expect(record.languages).toHaveLength(2);
  });

  it("keeps the complete experience timeline in the archive", () => {
    expect(getArchive("ko").experiences).toHaveLength(6);
  });
});
