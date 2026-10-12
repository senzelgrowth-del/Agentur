// Fasst die exportierten PNGs zu einem 3-seitigen PDF (1080x1350) zusammen, z. B. für den Canva-Import.
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
const pages = files
  .map((f) => `<img src="data:image/png;base64,${readFileSync(join(dir, "export", f)).toString("base64")}">`)
  .join("");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(`<style>@page{size:1080px 1350px;margin:0}*{margin:0}img{display:block;width:1080px;height:1350px;page-break-after:always}</style>${pages}`);
await page.pdf({ path: join(dir, "export", "spartacus-gay-cruise-2027-creatives.pdf"), width: "1080px", height: "1350px", printBackground: true });
await browser.close();
console.log("✓ PDF");
