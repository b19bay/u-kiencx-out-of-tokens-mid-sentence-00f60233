import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Error: token budget exhausted mid-sentence. The rest of this message has been repossessed to cover the debt.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 140 || LINE.trim().length === 0) {
  console.error("entry line fails the 1-140 character gate");
  process.exit(1);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("entry line must be a single line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Read-back: what landed on disk must be byte-identical to the line, and
// the line is exactly 108 characters (verified against wc -c output).
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== LINE) {
  console.error("read-back mismatch: entry.txt differs from the line");
  process.exit(1);
}
if (LINE.length !== 108) {
  console.error(`expected 108 characters, got ${LINE.length}`);
  process.exit(1);
}
