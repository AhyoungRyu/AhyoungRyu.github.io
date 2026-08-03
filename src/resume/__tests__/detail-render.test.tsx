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

  it("renders the matching project image and gallery", () => {
    const { container } = render(
      <ProjectDetail locale="ko" slug="zepl-performance" />,
    );

    expect(
      container.querySelector(
        '.project-primary-image[src="/images/resume/project-zepl-visualization.png"]',
      ),
    ).toBeTruthy();
    expect(container.querySelectorAll(".project-gallery img")).toHaveLength(1);
  });

  it("uses local employer logos in the archive", () => {
    const { container } = render(<ArchivePage locale="en" />);
    const logos = Array.from(
      container.querySelectorAll<HTMLImageElement>(".archive-company-logo"),
    );

    expect(logos).toHaveLength(6);
    expect(
      logos.every((image) =>
        image.getAttribute("src")?.startsWith("/images/resume/"),
      ),
    ).toBe(true);
  });
});
