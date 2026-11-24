// Runde 3: seriöse, hochwertige Einzelposts (4:5, 1080x1350) – je 2 pro Kampagne.
// Fotos stammen von den Landingpages auf starshine-emotions.com (src/web-*.jpg).
// Einheitlicher Aufbau: großes Foto oben, einfarbiges Textfeld in der Reisefarbe,
// Titel in DM Serif Display, eine Infozeile, Starshine-Logo. Keine Verläufe, keine Schatten.
// Aufruf: node creatives/organisch/render-r3.mjs
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

const W = 1080;
const H = 1350;
const rainbow = ["#e53b3b", "#f28c28", "#f7d23e", "#3cb371", "#3b82f6", "#8b5cf6"];

// Farbwelten je Reise: Textfeld, Schrift, Akzent, Trennlinie
const themes = {
  spartacus: { bg: "#14213d", fg: "#fffaf3", accent: "#f4b860", line: "rainbow" },
  karlmay: { bg: "#3b1d0e", fg: "#f5e4c3", accent: "#f2b544", line: "#c4561f" },
  schlager: { bg: "#241338", fg: "#fff7ee", accent: "#ffd166", line: "#ff6b6b" },
  danzig: { bg: "#1b1427", fg: "#fbf3e6", accent: "#f2c879", line: "#f2c879" },
  danzigLight: { bg: "#fbf6ee", fg: "#2a1a33", accent: "#e8711c", line: "#e8711c" },
};

const posts = [
  {
    name: "r3-spartacus-zwischen-den-kontinenten",
    theme: "spartacus",
    photo: "web-spartacus-schiff-insel.jpg",
    pos: "50% 60%",
    kicker: "Spartacus Gay Cruise 2027",
    title: "Zwischen den<br><em>Kontinenten</em>",
    info: "15.–22.10.2027 · Mallorca · Spanien · Marokko",
  },
  {
    name: "r3-spartacus-sonne-an-deck",
    theme: "spartacus",
    photo: "web-spartacus-oasis-pool.jpg",
    pos: "40% 55%",
    kicker: "Spartacus Gay Cruise 2027",
    title: "Sonne tanken,<br><em>du selbst sein</em>",
    info: "Vasco da Gama · Pool, Sauna &amp; Vollpension inklusive",
  },
  {
    name: "r3-karlmay-finale-am-kalkberg",
    theme: "karlmay",
    photo: "web-karlmay-feuerwerk.jpg",
    pos: "50% 45%",
    kicker: "Karl-May-Spiele Bad Segeberg 2027",
    title: "Das große Finale<br><em>am Kalkberg</em>",
    info: "19.07.2027 · Abendvorstellung mit Feuerwerk",
    credit: "Foto: Robin Schart",
  },
  {
    name: "r3-karlmay-sommer-im-wilden-westen",
    theme: "karlmay",
    photo: "web-karlmay-arena-tag.jpg",
    pos: "50% 60%",
    kicker: "Karl-May-Spiele Bad Segeberg 2027",
    title: "Ein Sommertag im<br><em>Wilden Westen</em>",
    info: "Busreise ab Erfurt · 2 Nächte HP · Ticket · 399 €",
    credit: "Foto: Robin Schart",
  },
  {
    name: "r3-schlager-eine-woche-auf-see",
    theme: "schlager",
    photo: "web-schlager-deck-party.jpg",
    pos: "50% 60%",
    kicker: "Schlager Seereise 2027",
    title: "Eine Woche<br>Schlager <em>auf See</em>",
    info: "Costa Deliziosa · Oktober 2027 · östliches Mittelmeer",
    credit: "Foto: Philipp Kumbier",
  },
  {
    name: "r3-schlager-jeden-abend-live",
    theme: "schlager",
    photo: "web-schlager-konzert.jpg",
    pos: "45% 50%",
    kicker: "Schlager Seereise 2027",
    title: "Jeden Abend<br><em>live dabei</em>",
    info: "Über 30 Schlagerstars an Bord · ab Triest oder Bari",
    credit: "Foto: Philipp Kumbier",
  },
  {
    name: "r3-danzig-silvester-feuerwerk",
    theme: "danzig",
    photo: "web-danzig-feuerwerk.jpg",
    pos: "50% 50%",
    kicker: "Silvester an der Ostsee",
    title: "Ins neue Jahr<br><em>in Danzig</em>",
    info: "30.12.2026 – 02.01.2027 · Galadinner mit Open Bar",
  },
  {
    name: "r3-danzig-heiko-andy",
    theme: "danzigLight",
    photo: "web-danzig-heiko-andy.jpg",
    pos: "50% 50%",
    kicker: "Silvester-Schlagergala in Danzig",
    title: "Mit <em>Heiko &amp; Andy</em><br>ins neue Jahr",
    info: "30.12.2026 – 02.01.2027 · ab 789 € p. P.",
  },
];

const PHOTO_H = 860;

const html = (p) => {
  const t = themes[p.theme];
  const line =
    t.line === "rainbow"
      ? `<div class="line">${rainbow.map((c) => `<i style="background:${c}"></i>`).join("")}</div>`
      : `<div class="line" style="background:${t.line}"></div>`;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Montserrat:wght@600;700;800&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:${t.bg}}
body{font-family:Montserrat,sans-serif;position:relative;color:${t.fg}}
.photo{position:absolute;left:0;right:0;top:0;height:${PHOTO_H}px;background:url(${img(p.photo)}) ${p.pos}/cover no-repeat}
.line{position:absolute;left:0;right:0;top:${PHOTO_H}px;height:10px;display:flex}
.line i{flex:1}
.panel{position:absolute;left:0;right:0;top:${PHOTO_H + 10}px;bottom:0;padding:50px 64px 0}
.kicker{font-weight:800;font-size:24px;letter-spacing:.22em;text-transform:uppercase;color:${t.accent}}
h1{font-family:'DM Serif Display',serif;font-weight:400;font-size:88px;line-height:1.02;margin-top:18px}
h1 em{font-style:italic;color:${t.accent}}
.info{font-weight:700;font-size:28px;margin-top:22px;opacity:.92}
.logo{position:absolute;right:56px;bottom:52px;width:150px;height:150px;border-radius:50%;object-fit:cover;border:5px solid ${t.fg === "#2a1a33" ? "#fff" : t.fg}}
.credit{position:absolute;right:16px;top:${PHOTO_H - 34}px;font-weight:600;font-size:15px;color:#fff;opacity:.8}
</style></head><body>
<div class="photo"></div>${line}
${p.credit ? `<div class="credit">${p.credit}</div>` : ""}
<div class="panel">
  <div class="kicker">${p.kicker}</div>
  <h1>${p.title}</h1>
  <div class="info">${p.info}</div>
</div>
<img class="logo" src="${img("starshine-logo.jpg")}">
</body></html>`;
};

const browser = await chromium.launch();
for (const p of posts) {
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.setContent(html(p), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const png = join(out, `${p.name}.png`);
  await page.screenshot({ path: png });
  await page.close();
  console.log("✓", p.name);
}
await browser.close();
