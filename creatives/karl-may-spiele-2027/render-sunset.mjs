// Rendert die „Western-Sonnenuntergang“-Creatives für die Karl-May-Spiele-Reise
// in 1:1 (1080x1080) und 4:5 (1080x1350) – reduziert, ohne CTA-Button und ohne Schatten/Konturen – sowie je ein PDF für den Canva-Import.
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
    sub: "<b>Alexander Klaws</b> live am Kalkberg",
  },
  {
    name: "08-auf-in-den-wilden-westen-1x1",
    width: 1080,
    height: 1080,
    photo: "buehne-daemmerung.jpg",
    pos: "80% 50%",
    headline: "Auf in den<br>Wilden Westen",
    sub: "mit <b>Alexander Klaws</b> als Winnetou",
  },
];

const html = (c) => {
  const square = c.height === c.width;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@500;600;700;800&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${c.width}px;height:${c.height}px;overflow:hidden;background:${leather}}
body{font-family:Montserrat,sans-serif;color:${sand};position:relative}
.photo{position:absolute;left:0;right:0;top:0;bottom:${square ? 220 : 250}px;background:url(${img(c.photo)}) ${c.pos}/cover no-repeat;filter:saturate(1.1) contrast(1.05)}
/* Sonnenuntergangs-Tönung in Rost-Orange */
.tint{position:absolute;left:0;right:0;top:0;bottom:${square ? 220 : 250}px;background:linear-gradient(180deg,#e0702a 0%,${rust} 50%,#7a2e10 100%);mix-blend-mode:soft-light;opacity:.6}
/* ruhiger Verlauf für gute Lesbarkeit – keine Schatten, keine Konturen */
.top{position:absolute;left:0;right:0;top:0;height:${square ? 660 : 720}px;
  background:linear-gradient(180deg,rgba(43,21,10,.95) 0%,rgba(43,21,10,.85) 55%,rgba(43,21,10,0) 100%)}
.fade{position:absolute;left:0;right:0;bottom:${square ? 220 : 250}px;height:160px;
  background:linear-gradient(0deg,${leather} 0%,rgba(59,29,14,0) 100%)}
.head{position:absolute;left:70px;right:70px;top:${square ? 70 : 90}px;text-align:center}
.kicker{font-weight:700;font-size:${square ? 20 : 22}px;letter-spacing:.38em;text-transform:uppercase;color:${gold};padding-left:.38em}
h1{font-family:'Bebas Neue',sans-serif;font-weight:400;font-size:${square ? 150 : 176}px;line-height:.9;letter-spacing:.01em;margin-top:${square ? 22 : 28}px;color:${sand}}
.sub{font-weight:600;font-size:${square ? 32 : 36}px;margin-top:${square ? 18 : 24}px;color:${sand}}
.sub b{font-weight:800;color:${gold}}
/* Info-Leiste */
.bar{position:absolute;left:0;right:0;bottom:0;height:${square ? 220 : 250}px;background:${leather};border-top:3px solid ${gold};
  display:flex;align-items:center;padding:0 70px}
.col{flex:1}
.col + .col{border-left:2px solid rgba(242,181,68,.35);padding-left:56px;margin-left:56px;flex:0 0 auto}
.label{font-weight:700;font-size:${square ? 17 : 18}px;letter-spacing:.28em;text-transform:uppercase;color:${gold}}
.line{font-weight:700;font-size:29px;margin-top:10px;color:${sand};white-space:nowrap}
.line span{font-weight:600;color:${gold}}
.price{font-family:'Bebas Neue',sans-serif;font-size:${square ? 96 : 108}px;line-height:.9;color:${gold};margin-top:6px}
.price small{font-family:Montserrat,sans-serif;font-weight:700;font-size:${square ? 24 : 26}px;color:${sand};margin-left:8px}
.incl{font-weight:500;font-size:${square ? 19 : 20}px;color:rgba(245,228,195,.85);margin-top:8px}
</style></head><body>
<div class="photo"></div><div class="tint"></div><div class="top"></div><div class="fade"></div>
<div class="head">
  <div class="kicker">Karl-May-Spiele Bad Segeberg 2027</div>
  <h1>${c.headline}</h1>
  <div class="sub">${c.sub}</div>
</div>
<div class="bar">
  <div class="col">
    <div class="label">Termine</div>
    <div class="line">07.–09.07.2027</div>
    <div class="line">18.–20.07.2027 <span>· mit Feuerwerk</span></div>
  </div>
  <div class="col">
    <div class="label">Reisepreis</div>
    <div class="price">399 €<small>p. P.</small></div>
    <div class="incl">Bus ab Erfurt · 2 Nächte HP · Ticket</div>
  </div>
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
