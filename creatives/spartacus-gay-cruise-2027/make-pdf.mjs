// Erzeugt aus den exportierten PNGs PDFs (1080x1350) für den Canva-Import:
// ein Sammel-PDF mit allen Creatives und je ein PDF pro Creative.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = require(join(execSync("npm root -g").toString().trim(), "playwright")));
}

const dir = dirname(fileURLToPath(import.meta.url));
const files = ["01-zwischen-den-kontinenten.png", "02-shows-djs-drag.png", "03-alles-inklusive.png"];
const imgTag = (f) =>
  `<img src="data:image/png;base64,${readFileSync(join(dir, "export", f)).toString("base64")}">`;
const style = "<style>@page{size:1080px 1350px;margin:0}*{margin:0}img{display:block;width:1080px;height:1350px;page-break-after:always}</style>";

const browser = await chromium.launch();
const page = await browser.newPage();
const writePdf = async (images, name) => {
  await page.setContent(style + images.map(imgTag).join(""));
  await page.pdf({ path: join(dir, "export", name), width: "1080px", height: "1350px", printBackground: true });
  console.log("✓", name);
};
await writePdf(files, "spartacus-gay-cruise-2027-creatives.pdf");
for (const f of files) await writePdf([f], f.replace(/\.png$/, ".pdf"));
await browser.close();
