import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const nextDir = path.join(root, ".next");
const buildIdPath = path.join(nextDir, "BUILD_ID");
const chunksDir = path.join(nextDir, "static", "chunks");

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

if (!fs.existsSync(chunksDir)) {
  fail("Нет .next/static/chunks — CSS/JS не собраны. Пересоберите: npm run build.");
}

const cssChunks = fs
  .readdirSync(chunksDir)
  .filter((name) => name.endsWith(".css"));

if (cssChunks.length === 0) {
  fail("В .next/static/chunks нет CSS. Стили после старта будут 500/пустые.");
}

for (const name of cssChunks) {
  const full = path.join(chunksDir, name);
  const size = fs.statSync(full).size;
  if (size < 100) {
    fail(`CSS chunk слишком маленький/пустой: ${name} (${size} bytes)`);
  }
}

const publicHero = path.join(root, "public", "hero-showroom.png");
if (!fs.existsSync(publicHero)) {
  fail("Нет public/hero-showroom.png — фото на проде будет 404.");
}

console.log(
  `[verify-build] OK — build ${buildId}, css chunks: ${cssChunks.length}, hero ok`,
);
