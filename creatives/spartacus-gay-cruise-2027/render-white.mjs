// Rendert Spartacus-Creatives im Look der Kundenvorlage (Foto oben, weißes Feld unten)
// in 4:5 (1080x1350) und 1:1 (1080x1080) sowie je ein PDF für den Canva-Import.
// Aufruf: node creatives/spartacus-gay-cruise-2027/render-white.mjs
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

// Look nach Kundenvorlage: Foto oben, Regenbogenlinie, weißes Textfeld unten
const navy = "#14213d";
const creatives = [
  { name: "06-sonnenuntergang-4x5", width: 1080, height: 1350, pos: "55% 50%", tagline: "Wenn die Sonne sinkt, beginnt die Party." },
  { name: "07-sonnenuntergang-1x1", width: 1080, height: 1080, pos: "55% 50%", tagline: "Wenn die Sonne sinkt, beginnt die Party." },
];

const html = (c) => {
  const sq = c.width === c.height;
  const panel = sq ? 290 : 330;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;800&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${c.width}px;height:${c.height}px;overflow:hidden;background:#fff}
body{font-family:Montserrat,sans-serif;position:relative}
.photo{position:absolute;left:0;right:0;top:0;bottom:${panel}px;background:url(${img("sunset-deck.jpg")}) ${c.pos}/cover no-repeat}
.rainbow{position:absolute;left:0;right:0;bottom:${panel}px;height:8px;
  background:linear-gradient(90deg,#e53b3b,#f28c28,#f7d23e,#3cb371,#3b82f6,#8b5cf6)}
.panel{position:absolute;left:0;right:0;bottom:0;height:${panel}px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
h1{font-weight:800;font-size:70px;line-height:1.05;color:${navy}}
h1 span{background:linear-gradient(90deg,#e53b3b,#f28c28,#f7d23e,#3cb371,#3b82f6,#8b5cf6);-webkit-background-clip:text;color:transparent}
.tag{font-weight:600;font-size:${sq ? 38 : 42}px;margin-top:${sq ? 18 : 22}px;color:#4a5568}
.date{font-weight:800;font-size:${sq ? 24 : 26}px;letter-spacing:.2em;text-transform:uppercase;margin-top:${sq ? 16 : 20}px;color:#c98a2b;padding-left:.2em}
</style></head><body>
<div class="photo"></div><div class="rainbow"></div>
<div class="panel">
  <h1>Spartacus Gay Cruise <span>2027</span></h1>
  <div class="tag">${c.tagline}</div>
  <div class="date">15.–22.10. · Mallorca · Spanien · Marokko</div>
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
