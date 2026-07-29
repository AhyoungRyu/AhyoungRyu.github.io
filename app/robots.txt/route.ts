import { buildRobotsText } from "@/src/resume/discovery";

export function GET(request: Request) {
  const origin = new URL(request.url).origin;

  return new Response(buildRobotsText(origin), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
