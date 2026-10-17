// Rendert die „Western-Sonnenuntergang“-Creatives für die Karl-May-Spiele-Reise
// in 1:1 (1080x1080) und 4:5 (1080x1350) sowie je ein PDF für den Canva-Import.
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

const usps = ["Bus ab Erfurt", "2 Nächte mit HP", "Ticket inklusive"];

// WhatsApp-Logo (vereinfachte Sprechblase mit Hörer)
const WA_ICON = `<svg viewBox="0 0 32 32"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 6.9L3 29l6.5-2c1.9 1 4.1 1.6 6.5 1.6 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.3c-2.1 0-4.1-.6-5.8-1.7l-.4-.3-3.9 1.2 1.2-3.7-.3-.4c-1.2-1.8-1.8-3.8-1.8-5.9C5 9.9 9.9 5.2 16 5.2s11 4.7 11 10.6-4.9 10.5-11 10.5zm6-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3z"/></svg>`;

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
.top{position:absolute;left:0;right:0;top:0;height:${square ? 620 : 860}px;
  background:linear-gradient(180deg,rgba(59,29,14,.92) 0%,rgba(59,29,14,.7) 55%,rgba(59,29,14,0) 100%)}
.bottom{position:absolute;left:0;right:0;bottom:0;height:${square ? 300 : 280}px;
  background:linear-gradient(0deg,rgba(59,29,14,.9) 0%,rgba(59,29,14,0) 100%)}
/* sauberer schwarzer Rand um alle großen Schriften */
.stroke{-webkit-text-stroke:var(--s,4px) #000;paint-order:stroke fill}
.wrap{position:absolute;left:60px;right:60px;top:${square ? 56 : 72}px;text-align:center}
.kicker{display:inline-block;font-weight:900;font-size:${square ? 20 : 22}px;letter-spacing:.22em;text-transform:uppercase;
  color:${leather};background:${sand};border:3px solid #000;border-radius:8px;padding:8px 16px 8px calc(16px + .22em)}
h1{font-family:'Alfa Slab One',serif;font-weight:400;font-size:${square ? 96 : 116}px;line-height:1.02;margin-top:${square ? 18 : 24}px;color:${gold};--s:${square ? 9 : 10}px}
.sub{font-weight:900;font-size:${square ? 34 : 40}px;margin-top:${square ? 12 : 18}px;color:${sand};--s:6px}
.usps{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:${square ? 22 : 32}px}
.usp{font-weight:800;font-size:${square ? 23 : 26}px;padding:10px 20px;border-radius:40px;background:rgba(59,29,14,.82);
  border:2.5px solid ${gold};color:${sand}}
.dates{display:flex;justify-content:center;gap:14px;margin-top:${square ? 18 : 24}px}
.date{font-weight:900;font-size:${square ? 25 : 28}px;padding:12px 22px;border-radius:12px;background:${sand};color:${leather};border:3px solid #000}
.date.fw{background:${rust};color:#fff}
.date small{display:block;font-size:.62em;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-top:2px}
.cta-row{position:absolute;left:0;right:0;bottom:${square ? 44 : 72}px;display:flex;justify-content:center}
.cta{display:flex;align-items:center;gap:14px;font-weight:900;font-size:${square ? 27 : 30}px;padding:${square ? "20px 40px" : "24px 46px"};
  border-radius:60px;background:#25d366;color:#fff;border:3px solid #000}
.cta svg{width:38px;height:38px;fill:#fff}
/* Preis-Sticker */
.sticker{position:absolute;${square ? "right:40px;bottom:130px" : "left:48px;top:700px"};width:${square ? 190 : 220}px;height:${square ? 190 : 220}px;border-radius:50%;
  background:${rust};border:5px solid #000;box-shadow:inset 0 0 0 7px ${gold};transform:rotate(-12deg);
  display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff;line-height:1}
.sticker .s1{font-weight:900;font-size:${square ? 20 : 23}px;letter-spacing:.06em;text-transform:uppercase}
.sticker .s2{font-family:'Alfa Slab One',serif;font-size:${square ? 58 : 68}px;margin:4px 0 2px;color:${sand};--s:5px}
.sticker .s3{font-weight:900;font-size:${square ? 20 : 23}px}
</style></head><body>
<div class="photo"></div><div class="tint"></div><div class="top"></div><div class="bottom"></div>
<div class="wrap">
  <div class="kicker">Karl-May-Spiele 2027 · „Unter Geiern“</div>
  <h1 class="stroke">${c.headline}</h1>
  <div class="sub stroke">${c.sub}</div>
  <div class="usps">${usps.map((u) => `<span class="usp">${u}</span>`).join("")}</div>
  <div class="dates">
    <div class="date">07.–09.07.2027<small>Nachmittagsvorstellung</small></div>
    <div class="date fw">18.–20.07.2027<small>mit Finale-Feuerwerk</small></div>
  </div>
</div>
<div class="sticker"><span class="s1">nur</span><span class="s2 stroke">399 €</span><span class="s3">p. P.</span></div>
<div class="cta-row"><div class="cta">${WA_ICON}Jetzt per WhatsApp anfragen</div></div>
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

  // Ein-Seiten-PDF des fertigen PNGs für den Canva-Import
  const pdfPage = await browser.newPage();
  await pdfPage.setContent(
    `<style>@page{size:${c.width}px ${c.height}px;margin:0}*{margin:0}img{display:block;width:${c.width}px;height:${c.height}px}</style>` +
      `<img src="data:image/png;base64,${readFileSync(png).toString("base64")}">`,
  );
  await pdfPage.pdf({ path: join(out, `${c.name}.pdf`), width: `${c.width}px`, height: `${c.height}px`, printBackground: true });
  await pdfPage.close();
  console.log("✓", c.name);
}
await browser.close();
