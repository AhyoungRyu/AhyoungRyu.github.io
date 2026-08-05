import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeHome } from "../components/ResumeHome";

describe("ResumeHome", () => {
  it("renders one primary heading and localized navigation", () => {
    const { container } = render(<ResumeHome locale="ko" />);

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "안녕하세요, 류아영입니다.",
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("navigation", { name: "이력서 섹션" }),
    ).toBeTruthy();
    expect(
      screen
        .getAllByRole("link", { name: "English" })
        .every((link) => link.getAttribute("href") === "/en/"),
    ).toBe(true);
  });

  it("renders the selected evidence and archive entry point", () => {
    render(<ResumeHome locale="en" />);

    expect(screen.getAllByText("AI Agent Messenger SDK").length).toBeGreaterThan(
      0,
    );
    expect(screen.getByText("View the full archive")).toBeTruthy();
  });

  it("renders the compact home section set", () => {
    const { container } = render(<ResumeHome locale="ko" />);

    expect(screen.queryByText("일하는 방식")).toBeNull();
    expect(container.querySelectorAll(".experience-item")).toHaveLength(4);
    expect(container.querySelectorAll(".project-row")).toHaveLength(5);
    expect(container.querySelector(".archive-banner")).toBeNull();
  });

  it("renders limited technologies for every experience and project", () => {
    const { container } = render(<ResumeHome locale="en" />);
    const experienceTech = Array.from(
      container.querySelectorAll<HTMLElement>(
        ".experience-item .technology-line",
      ),
    );
    const projectTech = Array.from(
      container.querySelectorAll<HTMLElement>(".project-row .technology-line"),
    );

    expect(experienceTech).toHaveLength(4);
    expect(projectTech).toHaveLength(5);
    expect(experienceTech[0]?.textContent).toContain(
      "TechTypeScript · React · Vite · pnpm · Yarn Berry · GitHub Actions",
    );
    expect(experienceTech[0]?.textContent).not.toContain("CircleCI");
    expect(projectTech[0]?.textContent).toContain(
      "TechTypeScript · React · Vite · pnpm · CircleCI",
    );
  });

  it("renders concrete supporting evidence without template residue", () => {
    render(<ResumeHome locale="ko" />);

    expect(screen.getByText(/104개 커밋/)).toBeTruthy();
    expect(screen.getByText(/총 11시간/)).toBeTruthy();
    expect(screen.queryByText("Explore →")).toBeNull();
  });

  it("renders the local portrait and institutional marks", () => {
    const { container } = render(<ResumeHome locale="ko" />);

    expect(
      container.querySelector(
        '.profile-portrait[src="/images/resume/profile-ahyoung-ryu.png"]',
      ),
    ).toBeTruthy();
    expect(container.querySelectorAll(".experience-logo")).toHaveLength(4);
    expect(
      container.querySelector(
        '.education-logo[src="/images/resume/logo-sookmyung.png"]',
      ),
    ).toBeTruthy();
  });

  it("renders five distinct local project thumbnails", () => {
    const { container } = render(<ResumeHome locale="en" />);
    const thumbnails = Array.from(
      container.querySelectorAll<HTMLImageElement>(".project-thumbnail"),
    );

    expect(thumbnails).toHaveLength(5);
    expect(
      new Set(thumbnails.map((image) => image.getAttribute("src"))).size,
    ).toBe(5);
    expect(thumbnails.every((image) => image.getAttribute("width"))).toBe(true);
    expect(thumbnails.every((image) => image.getAttribute("height"))).toBe(
      true,
    );
  });

  it("eagerly loads every image required by the printable home page", () => {
    const { container } = render(<ResumeHome locale="ko" />);
    const printableImages = Array.from(
      container.querySelectorAll<HTMLImageElement>(
        ".profile-portrait, .experience-logo, .project-thumbnail, .education-logo",
      ),
    );

    expect(printableImages).toHaveLength(11);
    expect(
      printableImages.every((image) => image.getAttribute("loading") === "eager"),
    ).toBe(true);
  });
});
