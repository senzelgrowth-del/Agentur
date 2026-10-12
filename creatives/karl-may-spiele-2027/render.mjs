// Rendert die Meta-Ads-Creatives (4:5, 1080x1350) für die Karl-May-Spiele-Reise
// sowie je ein PDF pro Creative für den Canva-Import.
// Aufruf: node creatives/karl-may-spiele-2027/render.mjs
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
    name: "01-alexander-klaws-als-winnetou",
    photo: "winnetou-reiter.jpg",
    pos: "50% 100%",
    // Reiter stehen unten im Bild – Verkaufsargument deshalb direkt unter den Titel
    layout: "top",
    eyebrow: "Busreise ab Erfurt · 3 Tage",
    headline: "Alexander Klaws<br>als Winnetou",
    body: "2 Nächte im Good Morning Hotel Bad Oldesloe<br>mit Halbpension &amp; Eintritt am Kalkberg",
    chips: ["07.–09.07.2027", "18.–20.07.2027"],
    cta: "Jetzt entdecken",
  },
  {
    name: "02-finale-feuerwerk",
    photo: "finale-feuerwerk.jpg",
    pos: "50% 55%",
    layout: "bottom",
    eyebrow: "Abendvorstellung · 19.07.2027 · 20 Uhr",
    headline: "Mit großem<br>Finale-Feuerwerk",
    body: "Bus ab/bis Erfurt · 2 Nächte mit Halbpension · Eintritt inklusive",
    chips: ["18.–20.07.2027", "Ideal für Gruppen &amp; Vereine"],
    cta: "Jetzt entdecken",
  },
];

const gold = "#f3c77a";

const html = (c) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Rye&family=Playfair+Display:ital,wght@1,600;1,700&family=Montserrat:wght@500;600;700;800&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;background:#140806}
body{font-family:Montserrat,sans-serif;color:#fff;position:relative}
.photo{position:absolute;inset:0;background:url(${img(c.photo)}) ${c.pos}/cover no-repeat}
.top{position:absolute;left:0;right:0;top:0;height:${c.layout === "top" ? 900 : 520}px;
  background:linear-gradient(180deg,rgba(14,5,3,.9) 0%,rgba(14,5,3,${c.layout === "top" ? .5 : .7}) 55%,rgba(14,5,3,0) 100%)}
.bottom{position:absolute;left:0;right:0;bottom:0;height:${c.layout === "top" ? 330 : 720}px;
  background:linear-gradient(0deg,rgba(14,5,3,.95) 0%,rgba(14,5,3,.82) 45%,rgba(14,5,3,0) 100%)}
.frame{position:absolute;inset:28px;border:1.5px solid rgba(243,199,122,.45);border-radius:6px;pointer-events:none}
.title{position:absolute;top:70px;left:0;right:0;text-align:center}
.kicker{font-weight:700;font-size:22px;letter-spacing:.42em;text-transform:uppercase;color:${gold};padding-left:.42em}
.brand{font-family:Rye,serif;font-size:96px;line-height:1.05;margin-top:16px;color:#fff3dc;
  text-shadow:0 3px 0 rgba(120,30,10,.85),0 8px 30px rgba(0,0,0,.6)}
.tagline{font-family:'Playfair Display',serif;font-style:italic;font-weight:600;font-size:40px;margin-top:14px;color:${gold}}
.rule{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:22px}
.rule i{display:block;width:110px;height:1.5px;background:${gold};opacity:.8}
.rule b{width:10px;height:10px;background:${gold};transform:rotate(45deg)}
.content{position:absolute;left:80px;right:80px;text-align:center;${c.layout === "top" ? "top:430px" : "bottom:84px"}}
.eyebrow{font-weight:700;font-size:23px;letter-spacing:.22em;text-transform:uppercase;color:${gold}}
h2{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;font-size:70px;line-height:1.06;margin-top:14px;
  text-shadow:0 4px 24px rgba(0,0,0,.55)}
.body{font-weight:500;font-size:26px;line-height:1.42;margin-top:18px;color:rgba(255,255,255,.92)}
.chips{display:flex;justify-content:center;gap:14px;margin-top:24px;flex-wrap:wrap}
.chip{font-weight:600;font-size:23px;padding:10px 22px;border:1.5px solid rgba(243,199,122,.7);border-radius:40px;
  background:rgba(20,8,6,.45)}
.cta-row{position:absolute;left:0;right:0;bottom:${c.layout === "top" ? 84 : 0}px;display:flex;justify-content:center;align-items:center;gap:30px}
.content .cta-row{position:static;margin-top:34px}
.price{text-align:left;line-height:1.05}
.price small{display:block;font-weight:600;font-size:19px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.78)}
.price b{font-weight:800;font-size:58px;color:${gold}}
.price em{font-style:normal;font-weight:600;font-size:22px;color:rgba(255,255,255,.85);margin-left:8px}
.cta{font-weight:800;font-size:27px;letter-spacing:.03em;padding:24px 42px;border-radius:60px;
  background:linear-gradient(180deg,#f7d58f,#e2a948);color:#2a0e06;box-shadow:0 10px 30px rgba(0,0,0,.45)}
</style></head><body>
<div class="photo"></div><div class="top"></div><div class="bottom"></div><div class="frame"></div>
<div class="title">
  <div class="kicker">Bad Segeberg 2027</div>
  <div class="brand">Karl-May-Spiele</div>
  <div class="tagline">wo die Herzen wilder schlagen</div>
  <div class="rule"><i></i><b></b><i></i></div>
</div>
${(() => {
  const ctaRow = `<div class="cta-row"><div class="price"><small>Reisepreis</small><b>399 €</b><em>p.P.</em></div><div class="cta">${c.cta} →</div></div>`;
  const content = `<div class="eyebrow">${c.eyebrow}</div><h2>${c.headline}</h2><div class="body">${c.body}</div>
  <div class="chips">${c.chips.map((t) => `<span class="chip">${t}</span>`).join("")}</div>`;
  return c.layout === "top"
    ? `<div class="content">${content}</div>${ctaRow}`
    : `<div class="content">${content}${ctaRow}</div>`;
})()}
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
