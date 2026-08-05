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

  it("returns four compact experience entries with one supporting highlight", () => {
    const resume = getResume("ko");

    expect(resume.experiences).toHaveLength(4);
    expect(
      resume.experiences.every((experience) => experience.highlights.length === 1),
    ).toBe(true);
  });

  it("returns the balanced five-project home selection", () => {
    const expectedIds = [
      "ai-agent-messenger",
      "chat-uikit-modernization",
      "tossbank-personal-loan",
      "lunit-annotation-tools",
      "zepl-performance",
    ];

    expect(getResume("ko").selectedProjects.map((project) => project.id)).toEqual(
      expectedIds,
    );
    expect(getResume("en").selectedProjects.map((project) => project.id)).toEqual(
      expectedIds,
    );
  });

  it("returns two concrete home highlights for every selected project", () => {
    for (const locale of ["ko", "en"] as const) {
      const projects = getResume(locale).selectedProjects;

      expect(
        projects.every((project) => project.highlights.length === 2),
      ).toBe(true);
      expect(
        projects.every((project) =>
          project.highlights.every((highlight) => highlight.trim().length > 0),
        ),
      ).toBe(true);
    }

    const koreanProjects = getResume("ko").selectedProjects;
    expect(koreanProjects[1]?.highlights.join(" ")).toContain("약 30%");
    expect(koreanProjects[4]?.highlights.join(" ")).toContain("100~300%");
  });

  it("returns the supporting record used by the home page", () => {
    const record = getResume("ko").additionalRecord;

    expect(record.openSource).toContain("338명의 기여자");
    expect(record.openSource).toContain("9위");
    expect(record.openSource).toContain("104개 커밋");
    expect(record.openSource).toMatch(/남김\.$/);
    expect(record.openSourceHref).toBe(
      "https://github.com/apache/zeppelin/graphs/contributors",
    );
    expect(record.teaching).toContain("총 11시간");
    expect(record.teaching).toMatch(/발표함\.$/);
    expect(record.education[0].school).toBe("Sookmyung Women's University");
    expect(record.languages).toHaveLength(2);
  });

  it("keeps the complete experience timeline in the archive", () => {
    expect(getArchive("ko").experiences).toHaveLength(6);
  });

  it("localizes and propagates home image metadata", () => {
    const resume = getResume("ko");

    expect(resume.profile.portrait.alt).toBe("류아영 프로필 사진");
    expect(resume.experiences.map((item) => item.logo.src)).toEqual([
      "/images/resume/logo-sendbird.png",
      "/images/resume/logo-tossbank.png",
      "/images/resume/logo-lunit.png",
      "/images/resume/logo-zepl-current.png",
    ]);
    expect(resume.selectedProjects.every((project) => project.thumbnail)).toBe(
      true,
    );
    expect(resume.additionalRecord.education[0].logo.src).toBe(
      "/images/resume/logo-sookmyung.png",
    );
  });

  it("propagates archive logos and project galleries", () => {
    const archive = getArchive("en");
    const project = getProject("ko", "zepl-performance");

    expect(archive.experiences.every((experience) => experience.logo)).toBe(
      true,
    );
    expect(project?.thumbnail.src).toBe(
      "/images/resume/project-zepl-visualization.png",
    );
    expect(project?.gallery).toHaveLength(1);
  });
});
