// Rendert die „Western-Sonnenuntergang“-Creatives für die Karl-May-Spiele-Reise
// in 1:1 (1080x1080) und 4:5 (1080x1350) – reduziert, ohne CTA-Button – sowie je ein PDF für den Canva-Import.
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
    headline: "Winnetou<br>reitet wieder!",
    sub: "Alexander Klaws live am Kalkberg",
  },
  {
    name: "08-auf-in-den-wilden-westen-1x1",
    width: 1080,
    height: 1080,
    photo: "buehne-daemmerung.jpg",
    pos: "80% 50%",
    headline: "Auf in den<br>Wilden Westen!",
    sub: "mit Alexander Klaws als Winnetou",
  },
];

const html = (c) => {
  const square = c.height === c.width;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Montserrat:wght@700;800;900&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${c.width}px;height:${c.height}px;overflow:hidden;background:${leather}}
body{font-family:Montserrat,sans-serif;color:${sand};position:relative}
.photo{position:absolute;inset:0;background:url(${img(c.photo)}) ${c.pos}/cover no-repeat;filter:saturate(1.15) contrast(1.05)}
/* Sonnenuntergangs-Tönung in Rost-Orange */
.tint{position:absolute;inset:0;background:linear-gradient(180deg,#e0702a 0%,${rust} 45%,#7a2e10 100%);mix-blend-mode:soft-light;opacity:.65}
.top{position:absolute;left:0;right:0;top:0;height:${square ? 520 : 640}px;
  background:linear-gradient(180deg,rgba(59,29,14,.9) 0%,rgba(59,29,14,.6) 55%,rgba(59,29,14,0) 100%)}
.bottom{position:absolute;left:0;right:0;bottom:0;height:${square ? 330 : 380}px;
  background:linear-gradient(0deg,rgba(59,29,14,.95) 0%,rgba(59,29,14,.75) 50%,rgba(59,29,14,0) 100%)}
/* sauberer schwarzer Rand um alle großen Schriften */
.stroke{-webkit-text-stroke:var(--s,4px) #000;paint-order:stroke fill}
.head{position:absolute;left:60px;right:60px;top:${square ? 64 : 84}px;text-align:center}
.kicker{font-weight:800;font-size:${square ? 21 : 23}px;letter-spacing:.34em;text-transform:uppercase;color:${gold};padding-left:.34em;--s:4px}
h1{font-family:'Alfa Slab One',serif;font-weight:400;font-size:${square ? 104 : 124}px;line-height:1.02;margin-top:${square ? 16 : 22}px;color:${gold};--s:${square ? 9 : 10}px}
.sub{font-weight:900;font-size:${square ? 34 : 40}px;margin-top:${square ? 14 : 20}px;color:${sand};--s:6px}
.foot{position:absolute;left:60px;right:60px;bottom:${square ? 56 : 72}px;text-align:center}
.rule{width:120px;height:3px;background:${gold};margin:0 auto ${square ? 20 : 24}px}
.facts{font-weight:900;font-size:${square ? 30 : 34}px;color:${sand};--s:5px}
.dates{font-weight:800;font-size:${square ? 26 : 29}px;margin-top:${square ? 12 : 14}px;color:${gold};--s:4px}
/* Preis-Sticker */
.sticker{position:absolute;${square ? "right:44px;top:410px" : "right:48px;top:560px"};width:${square ? 180 : 200}px;height:${square ? 180 : 200}px;border-radius:50%;
  background:${rust};border:5px solid #000;box-shadow:inset 0 0 0 7px ${gold};transform:rotate(-12deg);
  display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff;line-height:1}
.sticker .s1{font-weight:900;font-size:${square ? 19 : 21}px;letter-spacing:.06em;text-transform:uppercase}
.sticker .s2{font-family:'Alfa Slab One',serif;font-size:${square ? 54 : 60}px;margin:4px 0 2px;color:${sand};--s:5px}
.sticker .s3{font-weight:900;font-size:${square ? 19 : 21}px}
</style></head><body>
<div class="photo"></div><div class="tint"></div><div class="top"></div><div class="bottom"></div>
<div class="head">
  <div class="kicker stroke">Karl-May-Spiele Bad Segeberg 2027</div>
  <h1 class="stroke">${c.headline}</h1>
  <div class="sub stroke">${c.sub}</div>
</div>
<div class="sticker"><span class="s1">nur</span><span class="s2 stroke">399 €</span><span class="s3">p. P.</span></div>
<div class="foot">
  <div class="rule"></div>
  <div class="facts stroke">Bus ab Erfurt · 2 Nächte HP · Ticket inklusive</div>
  <div class="dates stroke">07.–09.07. &amp; 18.–20.07.2027 mit Feuerwerk</div>
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
