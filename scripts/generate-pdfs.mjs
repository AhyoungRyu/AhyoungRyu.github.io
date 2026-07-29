import { access } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const baseUrl = process.env.RESUME_BASE_URL ?? "http://localhost:3002";
const chromeExecutable =
  process.env.CHROME_EXECUTABLE_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDirectory = path.resolve("public");

await access(chromeExecutable);

const browser = await chromium.launch({
  executablePath: chromeExecutable,
  headless: true,
});

try {
  for (const locale of ["ko", "en"]) {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 900 },
    });

    await page.goto(`${baseUrl}/${locale}/`, {
      waitUntil: "networkidle",
    });
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: path.join(outputDirectory, `resume-ahyoung-ryu-${locale}.pdf`),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });
    await page.close();
  }
} finally {
  await browser.close();
}
