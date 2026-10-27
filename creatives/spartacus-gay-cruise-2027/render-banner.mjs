// Rendert ein allgemein einsetzbares Spartacus-Banner in 4:5 (1080x1350) und 1:1 (1080x1080)
// sowie je ein PDF für den Canva-Import.
// Aufruf: node creatives/spartacus-gay-cruise-2027/render-banner.mjs
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

// Playwright aus dem Projekt oder (Fallback) aus der globalen Installation laden
const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = require(join(execSync("npm root -g").toString().trim(), "playwright")));
}

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, "export");
mkdirSync(out, { recursive: true });

const img = (f) =>
  `data:image/jpeg;base64,${readFileSync(join(dir, "src", f)).toString("base64")}`;

// Allgemein einsetzbares Banner: Foto oben, dunkelblaues Markenband unten
// mit Name, Regenbogenlinie, Eckdaten und Starshine-Logo
const navy = "#14213d";
const cream = "#fffaf3";
const rainbowCss = "linear-gradient(90deg,#e53b3b,#f28c28,#f7d23e,#3cb371,#3b82f6,#8b5cf6)";
const creatives = [
  { name: "12-banner-allgemein-4x5", width: 1080, height: 1350, pos: "55% 45%" },
  { name: "13-banner-allgemein-1x1", width: 1080, height: 1080, pos: "55% 40%" },
];

const html = (c) => {
  const sq = c.width === c.height;
  const band = sq ? 330 : 380;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${c.width}px;height:${c.height}px;overflow:hidden;background:${navy}}
body{font-family:Montserrat,sans-serif;position:relative;color:${cream}}
.photo{position:absolute;left:0;right:0;top:0;bottom:${band}px;background:url(${img("sunset-deck.jpg")}) ${c.pos}/cover no-repeat}
.rb{position:absolute;left:0;right:0;bottom:${band}px;height:12px;background:${rainbowCss}}
.band{position:absolute;left:0;right:0;bottom:0;height:${band}px;background:${navy};display:flex;align-items:center;gap:40px;padding:0 ${sq ? 56 : 64}px}
.txt{flex:1}
.k{font-weight:800;font-size:${sq ? 22 : 24}px;letter-spacing:.3em;text-transform:uppercase;color:#f4b860}
h1{font-weight:900;font-size:${sq ? 76 : 86}px;line-height:1;letter-spacing:-.02em;margin-top:14px}
h1 span{background:${rainbowCss};-webkit-background-clip:text;color:transparent}
.info{font-weight:700;font-size:${sq ? 27 : 30}px;margin-top:${sq ? 18 : 22}px;color:rgba(255,250,243,.88)}
.logo{width:${sq ? 170 : 190}px;height:${sq ? 170 : 190}px;border-radius:50%;object-fit:cover;border:6px solid ${cream};flex:0 0 auto}
</style></head><body>
<div class="photo"></div><div class="rb"></div>
<div class="band">
  <div class="txt">
    <div class="k">15.–22. Oktober 2027</div>
    <h1>Spartacus<br>Gay Cruise <span>2027</span></h1>
    <div class="info">Mallorca · Spanien · Marokko</div>
  </div>
  <img class="logo" src="${img("starshine-logo.jpg")}">
</div>
</body></html>`;
};

const browser = await chromium.launch();
for (const c of creatives) {
  const page = await browser.newPage({ viewport: { width: c.width, height: c.height } });
  await page.setContent(html(c), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const png = join(out, `${c.name}.png`);
  await page.screenshot({ path: png });
  await page.close();

  // Ein-Seiten-PDF für den Canva-Import. Pillow schreibt die Seitengröße exakt
  // (1350 px = 1012,5 pt) – Chromium rundet auf ganze Punkt, Canva macht daraus 1351 px.
  execSync(
    `python3 -c "import sys; from PIL import Image; Image.open(sys.argv[1]).convert('RGB').save(sys.argv[2], resolution=96.0)" ` +
      `"${png}" "${join(out, `${c.name}.pdf`)}"`,
  );
  console.log("✓", c.name);
}
await browser.close();
