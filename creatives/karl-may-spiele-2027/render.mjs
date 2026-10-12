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
    // Reiter stehen unten im Bild – Headline deshalb direkt unter den Titel
    layout: "top",
    headline: "Alexander Klaws<br>als Winnetou",
    info: "3 Tage · Bus ab Erfurt · Hotel &amp; Ticket inklusive",
  },
  {
    name: "02-finale-feuerwerk",
    photo: "finale-feuerwerk.jpg",
    pos: "50% 55%",
    layout: "bottom",
    headline: "Das große Finale-Feuerwerk",
    info: "19.07.2027 · 20 Uhr · Bus ab Erfurt",
  },
  {
    name: "03-live-am-kalkberg",
    photo: "flyer-kalkberg.jpg",
    pos: "50% 0%",
    // Flyer füllen die untere Bildhälfte – Text, Preis und CTA deshalb komplett oben
    layout: "stack",
    headline: "Live am Kalkberg erleben",
    info: "07.–09.07. oder 18.–20.07.2027",
  },
  // Variante ohne Preis: größere Untertitel und WhatsApp-CTA
  {
    name: "04-gemeinsam-ins-abenteuer",
    photo: "reiter-buehne.jpg",
    pos: "50% 100%",
    layout: "top",
    whatsapp: true,
    headline: "Gemeinsam ins Abenteuer",
    info: "Gruppenreise ab Erfurt · 3 Tage",
  },
  {
    name: "05-freilichtbuehne-am-kalkberg",
    photo: "arena-tag.jpg",
    pos: "40% 50%",
    layout: "bottom",
    whatsapp: true,
    headline: "Die Freilichtbühne<br>am Kalkberg",
    info: "Bus ab Erfurt · 2 Nächte mit Halbpension",
  },
  {
    name: "06-zwei-termine-im-juli",
    photo: "buehne-daemmerung.jpg",
    pos: "85% 50%",
    layout: "bottom",
    whatsapp: true,
    headline: "Zwei Termine im Juli 2027",
    info: "07.–09.07. oder 18.–20.07.2027",
  },
];

const gold = "#f3c77a";

// WhatsApp-Logo (vereinfachte Sprechblase mit Hörer)
const WA_ICON = `<svg viewBox="0 0 32 32"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 6.9L3 29l6.5-2c1.9 1 4.1 1.6 6.5 1.6 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.3c-2.1 0-4.1-.6-5.8-1.7l-.4-.3-3.9 1.2 1.2-3.7-.3-.4c-1.2-1.8-1.8-3.8-1.8-5.9C5 9.9 9.9 5.2 16 5.2s11 4.7 11 10.6-4.9 10.5-11 10.5zm6-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3z"/></svg>`;

const html = (c) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Montserrat:wght@600;700;800;900&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;background:#140806}
body{font-family:Montserrat,sans-serif;color:#fff;position:relative}
.photo{position:absolute;inset:0;background:url(${img(c.photo)}) ${c.pos}/cover no-repeat}
.top{position:absolute;left:0;right:0;top:0;height:${{ top: 720, stack: 820 }[c.layout] ?? 480}px;
  background:linear-gradient(180deg,rgba(14,5,3,.88) 0%,rgba(14,5,3,.55) 60%,rgba(14,5,3,0) 100%)}
.bottom{position:absolute;left:0;right:0;bottom:0;height:${{ top: 300, stack: 0 }[c.layout] ?? 560}px;
  background:linear-gradient(0deg,rgba(14,5,3,.92) 0%,rgba(14,5,3,.7) 50%,rgba(14,5,3,0) 100%)}
.title{position:absolute;top:84px;left:0;right:0;text-align:center}
.kicker{font-weight:800;font-size:22px;letter-spacing:.45em;text-transform:uppercase;color:${gold};padding-left:.45em}
.brand{font-family:'Alfa Slab One',serif;font-size:98px;line-height:1.05;margin-top:16px;letter-spacing:.01em;color:#fff3dc;
  text-shadow:0 3px 0 rgba(120,30,10,.85),0 8px 30px rgba(0,0,0,.6)}
.tagline{font-weight:800;font-size:${c.whatsapp ? 42 : 34}px;margin-top:16px;text-shadow:0 2px 14px rgba(0,0,0,.6);color:${gold}}
.content{position:absolute;left:90px;right:90px;text-align:center;${c.layout === "bottom" ? "bottom:250px" : "top:420px"}}
h2{font-weight:900;font-size:58px;line-height:1.1;letter-spacing:-.005em;
  text-shadow:0 4px 24px rgba(0,0,0,.6)}
.info{font-weight:700;font-size:${c.whatsapp ? 30 : 24}px;letter-spacing:${c.whatsapp ? ".06em" : ".1em"};text-shadow:0 2px 12px rgba(0,0,0,.7);text-transform:uppercase;margin-top:20px;color:rgba(255,243,220,.88)}
.cta-row{position:absolute;left:0;right:0;bottom:84px;display:flex;justify-content:center;align-items:center;gap:32px}
.content .cta-row{position:static;margin-top:30px}
.price{font-weight:800;font-size:54px;color:${gold};line-height:1}
.cta.wa{display:flex;align-items:center;gap:14px;background:#25d366;color:#fff;font-size:28px;padding:22px 42px}
.cta.wa svg{width:36px;height:36px;fill:#fff}
.price em{font-style:normal;font-weight:700;font-size:22px;color:rgba(255,255,255,.85);margin-left:8px}
.cta{font-weight:800;font-size:26px;letter-spacing:.03em;padding:22px 40px;border-radius:60px;
  background:linear-gradient(180deg,#f7d58f,#e2a948);color:#2a0e06;box-shadow:0 10px 30px rgba(0,0,0,.45)}
</style></head><body>
<div class="photo"></div><div class="top"></div><div class="bottom"></div>
<div class="title">
  <div class="kicker">Bad Segeberg 2027</div>
  <div class="brand">Karl-May-Spiele</div>
  <div class="tagline">wo die Herzen wilder schlagen</div>
</div>
${(() => {
  const ctaRow = c.whatsapp
    ? `<div class="cta-row"><div class="cta wa">${WA_ICON}Jetzt per WhatsApp anfragen</div></div>`
    : `<div class="cta-row"><div class="price">399 €<em>p.P.</em></div><div class="cta">Jetzt entdecken →</div></div>`;
  const text = `<h2>${c.headline}</h2><div class="info">${c.info}</div>`;
  return c.layout === "stack"
    ? `<div class="content">${text}${ctaRow}</div>`
    : `<div class="content">${text}</div>${ctaRow}`;
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
