import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeImage } from "../components/ResumeImage";

const image = {
  src: "/images/resume/logo-sendbird.png",
  alt: "Sendbird logo",
  width: 168,
  height: 100,
  fit: "contain" as const,
};

describe("ResumeImage", () => {
  it("renders intrinsic dimensions and lazy loading by default", () => {
    render(<ResumeImage image={image} />);

    const rendered = screen.getByRole("img", { name: "Sendbird logo" });
    expect(rendered.getAttribute("src")).toBe(image.src);
    expect(rendered.getAttribute("width")).toBe("168");
    expect(rendered.getAttribute("height")).toBe("100");
    expect(rendered.getAttribute("loading")).toBe("lazy");
    expect(rendered.getAttribute("style")).toContain("object-fit: contain");
  });

  it("allows the portrait to opt into eager loading", () => {
    render(<ResumeImage image={image} loading="eager" />);

    expect(
      screen.getByRole("img", { name: "Sendbird logo" }).getAttribute("loading"),
    ).toBe("eager");
  });
});
