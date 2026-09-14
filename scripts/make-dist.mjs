import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const distDir = path.join(root, "dist");

if (!fs.existsSync(outDir)) {
  console.error("Missing out/ — run next build with output: 'export' first.");
  process.exit(1);
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.renameSync(outDir, distDir);
console.log("Wrote dist/ from static export.");
