import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeHome } from "../components/ResumeHome";

describe("resume output actions", () => {
  it("links the Korean page to the Korean generated PDF", () => {
    render(<ResumeHome locale="ko" />);

    expect(
      screen.getByRole("link", { name: "PDF 다운로드" }).getAttribute("href"),
    ).toBe("/resume-ahyoung-ryu-ko.pdf");
  });

  it("links the English page to the English generated PDF", () => {
    render(<ResumeHome locale="en" />);

    expect(
      screen.getByRole("link", { name: "Download PDF" }).getAttribute("href"),
    ).toBe("/resume-ahyoung-ryu-en.pdf");
  });
});
