import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const expectedPageCount = 2;
const expectedColorImageCount = 9;

export function inspectPdfBuffer(buffer) {
  const source = buffer.toString("latin1");
  const pages = [...source.matchAll(/\/Type\s*\/Page\b/g)].length;
  const imageObjects =
    source.match(
      /\d+\s+\d+\s+obj[\s\S]*?\/Subtype\s*\/Image[\s\S]*?endobj/g,
    ) ?? [];
  const colorImages = imageObjects.filter(
    (object) =>
      !/\/ColorSpace\s*\/DeviceGray\b/.test(object) &&
      !/\/ImageMask\s+true\b/.test(object),
  ).length;

  return { pages, colorImages };
}

export async function checkResumePdfs(rootDirectory = process.cwd()) {
  const failures = [];

  for (const locale of ["ko", "en"]) {
    const filename = `resume-ahyoung-ryu-${locale}.pdf`;
    const filePath = path.join(rootDirectory, "public", filename);

    try {
      const file = await readFile(filePath);
      const result = inspectPdfBuffer(file);

      if (result.pages !== expectedPageCount) {
        failures.push(
          `${filename}: expected ${expectedPageCount} pages, found ${result.pages}`,
        );
      }
      if (result.colorImages < expectedColorImageCount) {
        failures.push(
          `${filename}: expected at least ${expectedColorImageCount} embedded color images, found ${result.colorImages}`,
        );
      }
    } catch (error) {
      failures.push(`${filename}: ${error.message}`);
    }
  }

  if (failures.length > 0) {
    throw new Error(`PDF contract failed:\n- ${failures.join("\n- ")}`);
  }
}

const invokedPath = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : "";

if (invokedPath === import.meta.url) {
  await checkResumePdfs();
  process.stdout.write(
    `Verified two 2-page resume PDFs with at least ${expectedColorImageCount} embedded color images each.\n`,
  );
}
