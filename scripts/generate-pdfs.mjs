import { spawn } from "node:child_process";
import { once } from "node:events";
import { access, copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const baseUrl = process.env.RESUME_BASE_URL ?? "http://localhost:3002";
const outputDirectory = path.resolve("public");
const builtOutputDirectory = path.resolve("dist/client");

async function firstAccessiblePath(candidates) {
  for (const candidate of candidates.filter(Boolean)) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Continue to the next platform-specific browser location.
    }
  }

  throw new Error(
    "Google Chrome or Chromium was not found. Set CHROME_EXECUTABLE_PATH.",
  );
}

async function isReachable(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1_000) });
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForServer(url, attempts = 75) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    if (await isReachable(url)) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  throw new Error(`Resume server did not become ready at ${url}`);
}

async function stopServer(server) {
  if (!server || server.exitCode !== null) {
    return;
  }

  server.kill("SIGTERM");
  await Promise.race([
    once(server, "exit"),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);
}

async function ensureLocalServer() {
  if (await isReachable(`${baseUrl}/ko/`)) {
    return null;
  }

  const parsedUrl = new URL(baseUrl);
  if (!["localhost", "127.0.0.1"].includes(parsedUrl.hostname)) {
    throw new Error(`Resume server is unavailable at ${baseUrl}`);
  }

  const server = spawn("npm", ["run", "start"], {
    env: {
      ...process.env,
      PORT: parsedUrl.port || "3002",
    },
    stdio: "inherit",
  });
  try {
    await waitForServer(`${baseUrl}/ko/`);
    return server;
  } catch (error) {
    await stopServer(server);
    throw error;
  }
}

const chromeExecutable = await firstAccessiblePath([
  process.env.CHROME_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
]);

await mkdir(outputDirectory, { recursive: true });
const server = await ensureLocalServer();
let browser;

try {
  browser = await chromium.launch({
    executablePath: chromeExecutable,
    headless: true,
  });

  for (const locale of ["ko", "en"]) {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 900 },
    });

    try {
      await page.goto(`${baseUrl}/${locale}/`, {
        waitUntil: "networkidle",
      });
      await page.emulateMedia({ media: "print" });
      const filename = `resume-ahyoung-ryu-${locale}.pdf`;
      const outputPath = path.join(outputDirectory, filename);
      await page.pdf({
        path: outputPath,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: false,
      });
      try {
        await access(builtOutputDirectory);
      } catch {
        continue;
      }
      await copyFile(outputPath, path.join(builtOutputDirectory, filename));
    } finally {
      await page.close();
    }
  }
} finally {
  if (browser) {
    await browser.close();
  }
  await stopServer(server);
}
