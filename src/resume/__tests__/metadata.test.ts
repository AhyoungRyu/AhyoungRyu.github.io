import { describe, expect, it } from "vitest";
import { buildLocaleMetadata } from "../metadata";

describe("localized metadata", () => {
  it("emits reciprocal Korean, English, and default alternates", () => {
    const metadata = buildLocaleMetadata("ko", "/");

    expect(metadata.alternates.languages).toEqual({
      ko: "/ko/",
      en: "/en/",
      "x-default": "/en/",
    });
  });

  it("keeps equivalent project paths across locale alternates", () => {
    const metadata = buildLocaleMetadata(
      "en",
      "/projects/ai-agent-messenger/",
    );

    expect(metadata.alternates.languages.ko).toBe(
      "/ko/projects/ai-agent-messenger/",
    );
    expect(metadata.alternates.languages.en).toBe(
      "/en/projects/ai-agent-messenger/",
    );
  });
});
