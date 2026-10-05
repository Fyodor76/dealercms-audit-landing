import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const assetSrc =
  "C:/Users/79536/.cursor/projects/c-Users-79536-Desktop-UDP-back-services/assets/c__Users_79536_AppData_Roaming_Cursor_User_workspaceStorage_c3e4a61f932a6553ab72ed2c7cc2c892_images_image-2ba2c937-80ab-4168-9251-de148ba326f2.png";
const src = assetSrc;
const outPng = path.join(root, "public", "hero-car.png");
const outJpg = path.join(root, "public", "hero-car.jpg");

// Close to left-panel ratio (~0.86), so cover barely side-crops
const W = 1000;
const H = 1160;

async function run() {
  const meta = await sharp(src).metadata();
  console.log("src", meta.width, meta.height, meta.format);

  const bgSvg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="0.15">
          <stop offset="0%" stop-color="#08162c"/>
          <stop offset="45%" stop-color="#0c2040"/>
          <stop offset="100%" stop-color="#163156"/>
        </linearGradient>
        <radialGradient id="haze" cx="30%" cy="38%" r="58%">
          <stop offset="0%" stop-color="rgba(150,175,210,0.2)"/>
          <stop offset="50%" stop-color="rgba(70,100,145,0.08)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="62%" stop-color="rgba(0,0,0,0)"/>
          <stop offset="100%" stop-color="rgba(8,18,36,0.18)"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <rect width="100%" height="100%" fill="url(#haze)"/>
      <rect width="100%" height="100%" fill="url(#floor)"/>
    </svg>
  `);

  // Soft left atmosphere from original negative space
  const leftHaze = await sharp(src)
    .extract({
      left: 0,
      top: 0,
      width: Math.floor(meta.width * 0.55),
      height: meta.height,
    })
    .resize(Math.floor(W * 0.72), H, { fit: "cover" })
    .blur(26)
    .modulate({ brightness: 0.72, saturation: 0.75 })
    .ensureAlpha()
    .toBuffer();

  // Building: smaller, darker, more blurred — stays behind car, less noisy
  const buildingW = 420;
  const softenedBuilding = await sharp(src)
    .extract({
      left: Math.floor(meta.width * 0.4),
      top: 0,
      width: Math.floor(meta.width * 0.6),
      height: Math.floor(meta.height * 0.72),
    })
    .resize(buildingW, Math.floor(H * 0.62), { fit: "cover", position: "right" })
    .modulate({ brightness: 0.62, saturation: 0.45 })
    .blur(2.2)
    .ensureAlpha()
    .toBuffer();

  // Smaller car — sits on the right, below center, clear of text zone
  const carMain = await sharp(src)
    .resize({
      width: 520,
      height: 640,
      fit: "inside",
    })
    .modulate({ brightness: 1.05, saturation: 0.88 })
    .ensureAlpha()
    .png()
    .toBuffer();

  const cm = await sharp(carMain).metadata();
  // Keep ~52% of width free for copy on the left
  const carLeft = Math.min(W - cm.width - 18, Math.floor(W * 0.5));
  const carTop = Math.round(H * 0.34);

  const vignette = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="v" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(6,16,40,0.5)"/>
          <stop offset="42%" stop-color="rgba(6,16,40,0.16)"/>
          <stop offset="70%" stop-color="rgba(6,16,40,0)"/>
        </linearGradient>
        <linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="78%" stop-color="rgba(0,0,0,0)"/>
          <stop offset="100%" stop-color="rgba(4,10,24,0.14)"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#v)"/>
      <rect width="100%" height="100%" fill="url(#b)"/>
    </svg>
  `);

  await sharp(bgSvg)
    .composite([
      { input: leftHaze, left: 0, top: 0 },
      {
        input: softenedBuilding,
        left: W - buildingW + 10,
        top: Math.floor(H * 0.08),
      },
      { input: carMain, left: carLeft, top: carTop },
      { input: vignette, left: 0, top: 0 },
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outJpg);

  await sharp(outJpg).png({ compressionLevel: 8 }).toFile(outPng);

  const out = await sharp(outPng).metadata();
  console.log(
    "out",
    out.width,
    out.height,
    "ratio",
    (out.width / out.height).toFixed(3),
    "car at",
    carLeft,
    carTop,
    "car size",
    cm.width,
    cm.height,
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
