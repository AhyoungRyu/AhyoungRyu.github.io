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
    expect(container.querySelectorAll(".project-row")).toHaveLength(3);
    expect(container.querySelector(".archive-banner")).toBeNull();
  });

  it("renders concrete supporting evidence without template residue", () => {
    render(<ResumeHome locale="ko" />);

    expect(screen.getByText(/104개 커밋/)).toBeTruthy();
    expect(screen.getByText(/총 11시간/)).toBeTruthy();
    expect(screen.queryByText("Explore →")).toBeNull();
  });
});
