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
add(
  "r6-km-3-vereinsausflug",
  `body{background:${KM.paper};color:${KM.ink}}
.ph{position:absolute;left:0;right:0;top:0;height:640px;background:url(${img("web-km-einritt.jpg")}) 50% 72%/cover}
.bus{position:absolute;left:50%;top:500px;transform:translateX(-50%);width:760px}
.tx{position:absolute;left:72px;right:72px;top:830px;text-align:center}
.label{color:${RUST};letter-spacing:.14em}
h1{font-family:'Alfa Slab One';font-weight:400;font-size:88px;line-height:1.04;margin-top:14px}
.sub{font-family:Roboto;font-weight:700;font-size:38px;margin-top:22px;line-height:1.3}`,
  `<div class="ph"></div><img class="bus" src="${png("web-starshine-bus.png")}">
<div class="tx"><div class="label">Karl-May-Spiele Bad Segeberg 2027</div><h1>Der perfekte<br>Vereinsausflug.</h1>
<div class="sub">Für Gruppen, Vereine &amp; Reisegemeinschaften – Bus, Hotel &amp; Ticket ab 399 € p. P.</div></div>`,
);

await render(posts, join(dir, "export"));
