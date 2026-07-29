import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArchivePage } from "../components/ArchivePage";
import { ProjectDetail } from "../components/ProjectDetail";

describe("detail routes", () => {
  it("renders a localized project with one h1 and evidence links", () => {
    const { container } = render(
      <ProjectDetail locale="ko" slug="ai-agent-messenger" />,
    );

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByText("Sendbird")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Delight AI" })).toBeTruthy();
  });

  it("preserves older career material in the archive", () => {
    render(<ArchivePage locale="en" />);

    expect(screen.getByRole("heading", { name: "Career archive" })).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        name: "Apache Zeppelin Official Documentation",
      }),
    ).toBeTruthy();
    expect(screen.getByText("Teaching & Speaking")).toBeTruthy();
  });
});
