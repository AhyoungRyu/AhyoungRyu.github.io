import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeHome } from "../components/ResumeHome";

describe("ResumeHome", () => {
  it("renders one primary heading and localized navigation", () => {
    const { container } = render(<ResumeHome locale="ko" />);

    expect(container.querySelectorAll("h1")).toHaveLength(1);
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
    expect(screen.getByText("View full career archive")).toBeTruthy();
  });
});
