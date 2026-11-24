// Runde 6: 3 weitere Karl-May-Posts (4:5). Fakten laut Landingpage
// (Busreise ab Erfurt, 2 Nächte Good Morning Hotel Bad Oldesloe mit HP, Eintritt, 399 €,
// Vorstellungen 08.07. 15 Uhr und 19.07. 20 Uhr mit Feuerwerk, ideal für Gruppen & Vereine).
// Aufruf: node creatives/organisch/render-r6.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { page, render, imgFrom, THEMES, LOGO } from "../brand/style/base.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const img = imgFrom(join(dir, "src"));
const png = (f) => `data:image/png;base64,${readFileSync(join(dir, "src", f)).toString("base64")}`;
const { karlmay: KM } = THEMES;
const RUST = "#b5542a";
const logo = (css, size = 130) => `<img class="logo" src="${LOGO}" style="${css};width:${size}px;height:${size}px">`;

const posts = [];
const add = (name, css, body) => posts.push({ name, html: page(css, body) });

// 1 · Drei Tage im Überblick
const days = [
  ["Tag 1", "Mit dem Bus ab Erfurt nach Bad Oldesloe", "web-km-tag1", "50% 50%"],
  ["Tag 2", "Karl-May-Spiele am Kalkberg", "web-karlmay-arena-tag.jpg", "30% 70%"],
  ["Tag 3", "Frühstück &amp; entspannte Heimreise", "px-fruehstueck.jpg", "50% 50%"],
];
add(
  "r6-km-1-drei-tage",
  `body{background:${KM.paper};color:${KM.ink}}
.label{position:absolute;left:72px;top:70px;color:${RUST};letter-spacing:.14em}
h1{position:absolute;left:72px;right:72px;top:118px;font-family:'Alfa Slab One';font-weight:400;font-size:92px;line-height:1.04}
.row{position:absolute;left:72px;right:72px;height:270px;display:flex;gap:34px;align-items:center}
.pic{flex:0 0 330px;height:250px;border-radius:20px;background-size:cover}
.bus{background:#e8d7b6 url(${png("web-starshine-bus.png")}) 50% 55%/92% auto no-repeat}
.d{font-family:'Alfa Slab One';font-size:50px;color:${RUST}}
.t{font-family:Roboto;font-weight:700;font-size:42px;line-height:1.2;margin-top:8px}`,
  `<div class="label">Karl-May-Spiele Bad Segeberg 2027</div><h1>3 Tage<br>Wilder Westen.</h1>
${days
  .map(
    ([d, t, f, pos], i) =>
      `<div class="row" style="top:${380 + i * 300}px"><div class="pic ${f === "web-km-tag1" ? "bus" : ""}" style="${f === "web-km-tag1" ? "" : `background-image:url(${img(f)});background-position:${pos}`}"></div><div><div class="d">${d}</div><div class="t">${t}</div></div></div>`,
  )
  .join("")}`,
);

// 2 · Zwei Termine – Tag und Abend als Karten
add(
  "r6-km-2-zwei-termine",
  `body{background:${KM.ink};color:${KM.paper}}
.label{position:absolute;left:0;right:0;top:70px;text-align:center;color:${KM.accent};letter-spacing:.14em}
h1{position:absolute;left:0;right:0;top:118px;text-align:center;font-family:'Alfa Slab One';font-weight:400;font-size:84px;line-height:1;white-space:nowrap}
.cards{position:absolute;left:56px;right:56px;top:280px;bottom:64px;display:flex;gap:26px}
.c{flex:1;background:${KM.paper};color:${KM.ink};border-radius:24px;overflow:hidden;display:flex;flex-direction:column}
.c .ph{height:640px;background-size:cover}
.c .b{padding:30px 30px 0}
.c .dt{font-family:'Alfa Slab One';font-size:58px;line-height:1}
.c .s{font-family:Roboto;font-weight:700;font-size:40px;margin-top:18px;line-height:1.25}
.c .s em{font-style:normal;color:${RUST}}`,
  `<div class="label">Karl-May-Spiele Bad Segeberg 2027</div><h1>Zwei Termine im Juli</h1>
<div class="cards">
<div class="c"><div class="ph" style="background-image:url(${img("web-karlmay-arena-tag.jpg")});background-position:30% 60%"></div><div class="b"><div class="dt">07.–09.07.</div><div class="s">Vorstellung<br>08.07. · 15 Uhr<br><em>bei Tageslicht</em></div></div></div>
<div class="c"><div class="ph" style="background-image:url(${img("web-karlmay-feuerwerk.jpg")});background-position:50% 40%"></div><div class="b"><div class="dt">18.–20.07.</div><div class="s">Vorstellung<br>19.07. · 20 Uhr<br><em>mit Feuerwerk</em></div></div></div>
</div>`,
);

// 3 · Gruppen & Vereine – mit dem Starshine-Bus
// 3 · Vereinsausflug: klassischer Reiseprospekt auf Weiß – Bus-Grafik als Overlay,
// verspielte Farben, bewusst leicht unperfekt (gezackte Kanten, Versatz, schiefe Elemente)
const C = { rust: "#c8532a", mustard: "#f2b632", teal: "#2a9d8f", sky: "#7cc4e8", ink: "#2b1a12" };
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
// unregelmäßige Blob-Form als Polygon (handgemacht wirkend)
const blob = (n = 26, j = 0.07) =>
  `polygon(${Array.from({ length: n }, (_, k) => {
    const a = (2 * Math.PI * k) / n, r = 0.5 - j / 2 + rnd() * j;
    return `${(50 + r * 100 * Math.cos(a)).toFixed(1)}% ${(50 + r * 100 * Math.sin(a)).toFixed(1)}%`;
  }).join(",")})`;
const rough = (n = 30) =>
  `polygon(${Array.from({ length: n * 2 }, (_, k) => {
    const a = (Math.PI * k) / n, r = k % 2 ? 44 + rnd() * 3 : 50;
    return `${(50 + r * Math.cos(a)).toFixed(1)}% ${(50 + r * Math.sin(a)).toFixed(1)}%`;
  }).join(",")})`;
const spark = (css, col, size = 54) => `<span style="position:absolute;${css};color:${col};font-size:${size}px;line-height:1">★</span>`;
add(
  "r6-km-3-vereinsausflug",
  `body{background:#fff;color:${C.ink}}
.tag{position:absolute;left:70px;top:70px;background:${C.teal};color:#fff;font-weight:800;font-size:30px;letter-spacing:.08em;padding:14px 28px;transform:rotate(-2.5deg);border-radius:6px}
.h1{position:absolute;left:66px;top:150px;font-family:'Alfa Slab One';font-size:132px;line-height:1;color:${C.rust};text-shadow:7px 6px 0 ${C.mustard};transform:rotate(-1.5deg)}
.h2{position:absolute;left:72px;top:300px;font-family:'Alfa Slab One';font-size:64px;line-height:1}
.wave{position:absolute;left:70px;top:378px}
.back{position:absolute;left:150px;top:430px;width:820px;height:640px;background:${C.mustard};clip-path:${blob(30, 0.09)};transform:rotate(4deg)}
.ph{position:absolute;left:110px;top:450px;width:840px;height:590px;clip-path:${blob(28, 0.06)};background:url(${img("web-karlmay-arena-tag.jpg")}) 30% 68%/cover}
.bus{position:absolute;left:40px;top:850px;width:640px;transform:rotate(-3deg)}
.price{position:absolute;right:50px;top:820px;width:260px;height:260px;background:${C.rust};clip-path:${rough()};transform:rotate(9deg);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.price b{font-family:'Alfa Slab One';font-weight:400;font-size:70px;line-height:1}
.price span{font-family:Roboto;font-weight:700;font-size:30px}
.f{position:absolute;left:72px;bottom:64px}
.f h2{font-family:'Alfa Slab One';font-weight:400;font-size:54px;line-height:1}
.f p{font-family:Roboto;font-weight:700;font-size:36px;margin-top:12px;line-height:1.3}
.f p span{background:${C.sky};padding:0 8px}`,
  `<div class="tag">KARL-MAY-SPIELE BAD SEGEBERG 2027</div>
<div class="h1">Gemeinsam</div><div class="h2">in den Wilden Westen!</div>
<svg class="wave" width="640" height="30" viewBox="0 0 640 30"><path d="M4 18 C 60 4, 110 28, 170 15 S 280 6, 340 17 S 450 28, 520 13 S 600 10, 636 19" fill="none" stroke="${C.teal}" stroke-width="9" stroke-linecap="round"/></svg>
<div class="back"></div><div class="ph"></div>
${spark("right:80px;top:180px;transform:rotate(14deg)", C.mustard, 70)}${spark("right:170px;top:300px;transform:rotate(-12deg)", C.teal, 44)}${spark("left:60px;top:500px;transform:rotate(-8deg)", C.rust, 52)}${spark("right:90px;top:420px;transform:rotate(20deg)", C.sky, 60)}
<img class="bus" src="${png("web-starshine-bus.png")}">
<div class="price"><span>nur</span><b>399 €</b><span>p. P.</span></div>
<div class="f"><h2>Der Vereinsausflug 2027</h2><p>Bus ab Erfurt · Hotel mit HP · Ticket<br><span>07.–09.07.</span> &amp; <span>18.–20.07.2027</span></p></div>`,
);

await render(posts, join(dir, "export"));
