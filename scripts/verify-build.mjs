import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const nextDir = path.join(root, ".next");
const buildIdPath = path.join(nextDir, "BUILD_ID");
const staticDir = path.join(nextDir, "static");

function fail(message) {
  console.error(`\n[verify-build] ${message}\n`);
  process.exit(1);
}

if (!fs.existsSync(nextDir)) {
  fail("Нет папки .next. Сначала успешно выполните npm run build.");
}

if (!fs.existsSync(buildIdPath)) {
  fail("Нет .next/BUILD_ID — сборка неполная или сломана. Пересоберите: npm run build.");
}

const buildId = fs.readFileSync(buildIdPath, "utf8").trim();
if (!buildId) {
  fail(".next/BUILD_ID пустой. Пересоберите: npm run build.");
}

if (!fs.existsSync(staticDir)) {
  fail("Нет .next/static — CSS/JS не собраны. Пересоберите: npm run build.");
}

const cssChunks = fs
  .readdirSync(path.join(staticDir, "chunks"), { withFileTypes: true })
  .flatMap((entry) => {
    if (entry.isFile() && entry.name.endsWith(".css")) {
      return [entry.name];
    }
    return [];
  });

if (cssChunks.length === 0) {
  fail("В .next/static/chunks нет CSS. Стили после старта будут 500/пустые.");
}

console.log(`[verify-build] OK — build ${buildId}, css chunks: ${cssChunks.length}`);
