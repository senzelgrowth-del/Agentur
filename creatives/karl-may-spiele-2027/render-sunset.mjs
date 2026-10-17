// Rendert die „Western-Sonnenuntergang“-Creatives für die Karl-May-Spiele-Reise
// in 1:1 (1080x1080) und 4:5 (1080x1350) – schlicht, ohne Verläufe, Schatten, Preis oder Button – sowie je ein PDF für den Canva-Import.
// Aufruf: node creatives/karl-may-spiele-2027/render-sunset.mjs
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

// Farbwelt: Rost-Orange, Sandbeige, Leder-Braun, Gold
const rust = "#c4561f";
const sand = "#f5e4c3";
const leather = "#3b1d0e";
const gold = "#f2b544";

const creatives = [
  {
    name: "07-winnetou-reitet-wieder-4x5",
    width: 1080,
    height: 1350,
    photo: "reiter-buehne.jpg",
    pos: "50% 100%",
    headline: "Winnetou<br>reitet wieder",
    info: "Mit Alexander Klaws · Busreise ab Erfurt · Juli 2027",
  },
  {
    name: "08-auf-in-den-wilden-westen-1x1",
    width: 1080,
    height: 1080,
    photo: "arena-tag.jpg",
    pos: "50% 72%",
    headline: "Auf in den Wilden Westen",
    info: "Busreise ab Erfurt · 07.–09.07. &amp; 18.–20.07.2027",
  },
];

// Bewusst schlicht: unbearbeitetes Foto, einfarbige Flächen, keine Verläufe,
// keine Schatten, kein Preis – nur Titel und eine Infozeile.
const html = (c) => {
  const square = c.height === c.width;
  const panel = square ? 360 : 480;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@600;700&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${c.width}px;height:${c.height}px;overflow:hidden;background:${sand}}
body{font-family:Montserrat,sans-serif;color:${leather};position:relative}
.panel{position:absolute;left:0;right:0;top:0;height:${panel}px;background:${sand};
  display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 70px}
.kicker{font-weight:700;font-size:${square ? 20 : 22}px;letter-spacing:.34em;text-transform:uppercase;color:${rust};padding-left:.34em}
h1{font-family:'Bebas Neue',sans-serif;font-weight:400;font-size:${square ? 112 : 132}px;line-height:.95;margin-top:${square ? 14 : 18}px;color:${leather}}
.info{font-weight:600;font-size:${square ? 26 : 28}px;margin-top:${square ? 14 : 18}px;color:${leather}}
.rule{position:absolute;left:0;right:0;top:${panel}px;height:8px;background:${rust}}
.photo{position:absolute;left:0;right:0;top:${panel + 8}px;bottom:0;background:url(${img(c.photo)}) ${c.pos}/cover no-repeat}
</style></head><body>
<div class="panel">
  <div class="kicker">Karl-May-Spiele Bad Segeberg</div>
  <h1>${c.headline}</h1>
  <div class="info">${c.info}</div>
</div>
<div class="rule"></div>
<div class="photo"></div>
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
