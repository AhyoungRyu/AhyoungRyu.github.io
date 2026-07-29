import { buildSitemapXml } from "@/src/resume/discovery";

export function GET(request: Request) {
  const origin = new URL(request.url).origin;

  return new Response(buildSitemapXml(origin), {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
