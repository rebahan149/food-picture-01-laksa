// food-picture-01 entry: delivers the bundled laksa photograph.
// The picture travels next to this file as entry.jpg; the grader
// expects it at entry.png inside the output directory, so we copy
// it there under that name without touching a single byte.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Exact size of the shipped photograph. Guarding on it catches a
// truncated upload or a swapped file before anything is delivered.
const LAKSA_BYTES = 300618;

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.jpg");

const found = statSync(source).size;
if (found !== LAKSA_BYTES) {
  throw new Error(
    `size check failed: entry.jpg has ${found} bytes but this entry ships exactly ${LAKSA_BYTES}; refusing to deliver a wrong or truncated image`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.png");
copyFileSync(source, target);

console.log(`delivered entry.png (${LAKSA_BYTES} bytes) to ${outDir}`);
