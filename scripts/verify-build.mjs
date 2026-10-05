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

function collectCss(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectCss(full));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".css")) {
      results.push(full);
    }
  }
  return results;
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

const cssFiles = collectCss(staticDir);
if (cssFiles.length === 0) {
  fail(
    "В .next/static нет CSS (ни css/, ни chunks/). Стили после старта будут пустые.",
  );
}

for (const full of cssFiles) {
  const size = fs.statSync(full).size;
  if (size < 100) {
    fail(`CSS слишком маленький/пустой: ${path.relative(root, full)} (${size} bytes)`);
  }
}

const publicHero = path.join(root, "public", "hero-showroom.png");
if (!fs.existsSync(publicHero)) {
  fail("Нет public/hero-showroom.png — фото на проде будет 404.");
}

console.log(
  `[verify-build] OK — build ${buildId}, css files: ${cssFiles.length}, hero ok`,
);
for (const full of cssFiles) {
  console.log(`  - ${path.relative(root, full)}`);
}
