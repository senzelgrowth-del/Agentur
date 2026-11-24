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
  font("Serif", "InstrumentSerif-Regular.ttf"),
  font("Serif", "InstrumentSerif-Italic.ttf", "italic"),
  font("Sans", "InstrumentSans-Regular.ttf", "normal", 400),
  font("Sans", "InstrumentSans-Bold.ttf", "normal", 700),
  font("Poster", "BigShoulders-Bold.ttf", "normal", 700),
].join("\n");

// Typo-Skala (px). Nichts unter 30 px – auch auf dem Handy im Feed gut lesbar.
export const TYPE = { label: 30, info: 36, h2: 96, h1: 128, poster: 150 };

// Farbwelten je Reise – je eine Fläche, eine Schrift- und eine Akzentfarbe (aus den Fotos abgeleitet)
export const THEMES = {
  spartacus: { ink: "#13203a", paper: "#f6f1e8", accent: "#c9a66b", rainbow: true },
  karlmay: { ink: "#2e1a10", paper: "#efe3cc", accent: "#b5542a" },
  schlager: { ink: "#1f1530", paper: "#f7efe6", accent: "#e9b949" },
  danzig: { ink: "#17121f", paper: "#f5ecdd", accent: "#d8b26e" },
};

export const RAINBOW = ["#d94141", "#e8862e", "#e9c53a", "#3fa66a", "#3a7bd5", "#7d5bd0"];

export const imgFrom = (dir) => (f) =>
  `data:image/jpeg;base64,${readFileSync(join(dir, f)).toString("base64")}`;

export const LOGO = `data:image/jpeg;base64,${readFileSync(join(here, "..", "starshine-emotions-logo.jpg")).toString("base64")}`;

// Grundgerüst jeder Seite
export const page = (css, body) => `<!doctype html><html><head><meta charset="utf-8"><style>
${FONT_FACES}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{font-family:Sans,sans-serif;position:relative;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
.label{font-family:Sans;font-weight:700;font-size:${TYPE.label}px;letter-spacing:.14em;text-transform:uppercase}
.info{font-family:Sans;font-weight:400;font-size:${TYPE.info}px;line-height:1.35}
.serif{font-family:Serif;font-weight:400;letter-spacing:-.01em}
.logo{position:absolute;width:104px;height:104px;border-radius:50%;object-fit:cover}
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
