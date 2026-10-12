// Rendert die Meta-Ads-Creatives (4:5, 1080x1350) für die Schlager Seereise 2027
// sowie je ein PDF pro Creative für den Canva-Import.
// Aufruf: node creatives/schlager-seereise-2027/render.mjs
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

const creatives = [
  {
    name: "01-ueber-30-schlagerstars",
    photo: "konzert-atrium.jpg",
    pos: "50% 50%",
    headline: "Über 30 Schlagerstars<br>live an Bord",
    info: "Semino Rossi · Stefan Mross · Patrick Lindner u.v.m.",
  },
  {
    name: "02-sonne-meer-schlager",
    photo: "sonnendeck-hafen.jpg",
    pos: "42% 50%",
    headline: "Sonne, Meer<br>&amp; Schlager pur",
    info: "Italien · Montenegro · Griechenland · Albanien",
  },
];

const sun = "#ffd166";
const coral = "#ff6b6b";

// WhatsApp-Logo (vereinfachte Sprechblase mit Hörer)
const WA_ICON = `<svg viewBox="0 0 32 32"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 6.9L3 29l6.5-2c1.9 1 4.1 1.6 6.5 1.6 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.3c-2.1 0-4.1-.6-5.8-1.7l-.4-.3-3.9 1.2 1.2-3.7-.3-.4c-1.2-1.8-1.8-3.8-1.8-5.9C5 9.9 9.9 5.2 16 5.2s11 4.7 11 10.6-4.9 10.5-11 10.5zm6-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3z"/></svg>`;

const html = (c) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Montserrat:wght@700;800;900&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;background:#0b1a33}
body{font-family:Montserrat,sans-serif;color:#fff;position:relative}
.photo{position:absolute;inset:0;background:url(${img(c.photo)}) ${c.pos}/cover no-repeat}
.top{position:absolute;left:0;right:0;top:0;height:520px;
  background:linear-gradient(180deg,rgba(8,20,45,.88) 0%,rgba(8,20,45,.6) 55%,rgba(8,20,45,0) 100%)}
.bottom{position:absolute;left:0;right:0;bottom:0;height:620px;
  background:linear-gradient(0deg,rgba(8,20,45,.94) 0%,rgba(8,20,45,.75) 50%,rgba(8,20,45,0) 100%)}
.title{position:absolute;top:80px;left:0;right:0;text-align:center}
.kicker{font-weight:800;font-size:22px;letter-spacing:.3em;text-transform:uppercase;color:${sun};padding-left:.3em}
.brand{font-family:'Lilita One',sans-serif;font-size:104px;line-height:1;margin-top:16px;color:#fff;
  text-shadow:0 5px 0 ${coral},0 10px 34px rgba(0,0,0,.5)}
.tagline{font-weight:800;font-size:42px;margin-top:20px;color:${sun};text-shadow:0 2px 14px rgba(0,0,0,.6)}
.content{position:absolute;left:80px;right:80px;bottom:240px;text-align:center}
h2{font-weight:900;font-size:62px;line-height:1.08;text-shadow:0 4px 24px rgba(0,0,0,.6)}
.info{font-weight:700;font-size:30px;line-height:1.35;margin-top:20px;color:rgba(255,255,255,.92);text-shadow:0 2px 12px rgba(0,0,0,.7)}
.cta-row{position:absolute;left:0;right:0;bottom:84px;display:flex;justify-content:center}
.cta{display:flex;align-items:center;gap:14px;font-weight:800;font-size:28px;padding:22px 42px;border-radius:60px;
  background:#25d366;color:#fff;box-shadow:0 10px 30px rgba(0,0,0,.45)}
.cta svg{width:36px;height:36px;fill:#fff}
</style></head><body>
<div class="photo"></div><div class="top"></div><div class="bottom"></div>
<div class="title">
  <div class="kicker">Costa Deliziosa · Oktober 2027</div>
  <div class="brand">Schlager Seereise</div>
  <div class="tagline">7 Nächte Mittelmeer mit Musik</div>
</div>
<div class="content"><h2>${c.headline}</h2><div class="info">${c.info}</div></div>
<div class="cta-row"><div class="cta">${WA_ICON}Jetzt per WhatsApp anfragen</div></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
for (const c of creatives) {
  await page.setContent(html(c), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const png = join(out, `${c.name}.png`);
  await page.screenshot({ path: png });

  // Ein-Seiten-PDF des fertigen PNGs für den Canva-Import
  const pdfPage = await browser.newPage();
  await pdfPage.setContent(
    `<style>@page{size:1080px 1350px;margin:0}*{margin:0}img{display:block;width:1080px;height:1350px}</style>` +
      `<img src="data:image/png;base64,${readFileSync(png).toString("base64")}">`,
  );
  await pdfPage.pdf({ path: join(out, `${c.name}.pdf`), width: "1080px", height: "1350px", printBackground: true });
  await pdfPage.close();
  console.log("✓", c.name);
}
await browser.close();
