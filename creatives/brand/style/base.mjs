// Starshine-Stilpaket: lokale Schriften, Farbwelten je Reise und gemeinsame Render-Funktion.
// Alle Creative-Skripte sollen hierüber rendern, damit Typografie und Qualität einheitlich bleiben.
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));

// Playwright aus dem Projekt oder (Fallback) aus der globalen Installation laden
const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = require(join(execSync("npm root -g").toString().trim(), "playwright")));
}

export const W = 1080;
export const H = 1350;
export const MARGIN = 72;

// Schriften lokal eingebettet: keine Abhängigkeit von Google Fonts, identisches Ergebnis bei jedem Rendern
const font = (family, file, style = "normal", weight = 400) =>
  `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};src:url(data:font/ttf;base64,${readFileSync(
    join(here, "fonts", file),
  ).toString("base64")}) format('truetype')}`;
const FONT_FACES = [
  ...[600, 700, 800, 900].map((w) => font("Montserrat", `Montserrat-${w}.ttf`, "normal", w)),
  ...[600, 700].map((w) => font("Fredoka", `Fredoka-${w}.ttf`, "normal", w)),
  font("Alfa Slab One", "AlfaSlabOne-400.ttf"),
  font("DM Serif Display", "DMSerifDisplay-400.ttf"),
  ...[500, 700].map((w) => font("Roboto", `Roboto-${w}.ttf`, "normal", w)),
].join("\n");

// Typo-Skala (px). Nichts unter 30 px – auch auf dem Handy im Feed gut lesbar.
export const TYPE = { label: 30, info: 36, h2: 84, h1: 104 };

// Hausstil je Reise – abgeleitet aus den erfolgreichen Bestandsposts auf Facebook/Instagram
export const THEMES = {
  // Montserrat ExtraBold, Navy, Jahreszahl/Akzentwort im Regenbogen, helles Textfeld
  spartacus: { font: "Montserrat", weight: 800, ink: "#14213d", paper: "#ffffff", sub: "#4a5568" },
  // Alfa Slab One auf dunklem Lederbraun, Creme-Schrift, Roboto für Unterzeilen
  karlmay: { font: "Alfa Slab One", weight: 400, ink: "#2b1a12", paper: "#f6ead2", accent: "#e8a33d", subFont: "Roboto" },
  // Fredoka Bold weiß mit dunkler Kontur, Pink als Akzent, Preis-Schallplatte
  schlager: { font: "Fredoka", weight: 700, ink: "#1b1640", paper: "#ffffff", accent: "#e8508f" },
  // DM Serif Display auf Nachtblau, Champagner-Gold
  danzig: { font: "DM Serif Display", weight: 400, ink: "#1b1427", paper: "#fbf3e6", accent: "#f2c879" },
};

export const RAINBOW = ["#e53b3b", "#f28c28", "#f7d23e", "#3cb371", "#3b82f6", "#8b5cf6"];
export const RAINBOW_CSS = `linear-gradient(90deg,${RAINBOW.join(",")})`;

export const imgFrom = (dir) => (f) =>
  `data:image/jpeg;base64,${readFileSync(join(dir, f)).toString("base64")}`;

export const LOGO = `data:image/jpeg;base64,${readFileSync(join(here, "..", "starshine-emotions-logo.jpg")).toString("base64")}`;

// Grundgerüst jeder Seite
export const page = (css, body) => `<!doctype html><html><head><meta charset="utf-8"><style>
${FONT_FACES}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{font-family:Montserrat,sans-serif;position:relative;-webkit-font-smoothing:antialiased}
.label{font-weight:800;font-size:${TYPE.label}px;letter-spacing:.12em;text-transform:uppercase}
.info{font-weight:700;font-size:${TYPE.info}px;line-height:1.3}
.rb{background:${RAINBOW_CSS};-webkit-background-clip:text;color:transparent}
.logo{position:absolute;width:150px;height:150px;border-radius:50%;object-fit:cover}
${css}
</style></head><body>${body}</body></html>`;

export const rainbowRule = (css = "") =>
  `<div style="display:flex;${css}">${RAINBOW.map((c) => `<i style="flex:1;background:${c}"></i>`).join("")}</div>`;

// Rendert [{name, html}] als PNG nach outDir
export async function render(posts, outDir) {
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  for (const { name, html } of posts) {
    const p = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
    await p.setContent(html, { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: join(outDir, `${name}.png`) });
    await p.close();
    console.log("✓", name);
  }
  await browser.close();
}
