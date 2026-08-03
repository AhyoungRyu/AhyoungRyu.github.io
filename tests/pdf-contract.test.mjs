import assert from "node:assert/strict";
import test from "node:test";

import { inspectPdfBuffer } from "../scripts/check-pdfs.mjs";

test("counts page and color-image objects in a generated PDF", () => {
  const pdf = Buffer.from(`
    1 0 obj <</Type /Page>> endobj
    2 0 obj <</Type /Page>> endobj
    3 0 obj <</Type /Pages /Count 2>> endobj
    4 0 obj <</Subtype /Image /ColorSpace [/ICCBased 8 0 R]>> stream endstream endobj
    5 0 obj <</Subtype /Image /ColorSpace /DeviceGray>> stream endstream endobj
  `);

  assert.deepEqual(inspectPdfBuffer(pdf), {
    pages: 2,
    colorImages: 1,
  });
});
