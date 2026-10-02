// Meta-Ads-Creative „Auf den Spuren der Olsenbande“ – Starshine Emotions
// Ausführen:            node render.cjs
// Mit anderem Foto:     FOTO=anderes.jpg node render.cjs
// Ergebnis:             creative_1x1.png (1080 x 1080) und vorschau_25.png (270 x 270)

// ===== TEXTE ================================================================
const KARTE_LABEL = 'FRÜHBUCHER';
const PREIS = '965 €';
const PREIS_ALT = '999 €';
const KARTE_FRIST = 'nur bis Ende Oktober';
const CTA_VORSATZ = 'Schreiben Sie uns';
const CTA_STICHWORT = '„Kopenhagen 2027“';

// ===== FARBEN (70er Kinopalette) ============================================
const CREME = '#F3E6C8';
const SENFGELB = '#E8A33D';
const ROSTROT = '#B5432A';
const DUNKELBRAUN = '#3A2418';

// ===== DATEIEN ==============================================================
const FOTO = process.env.FOTO || 'nyhavn.jpg';
const LOGO = 'logo.jpg';
const AUSGABE = 'creative_1x1.png';
const VORSCHAU = 'vorschau_25.png';

// ===== FEINEINSTELLUNG ======================================================
const FOTO_POSITION = '50% 50%';  // object-position: Ausschnitt der Häuserfassaden
const FOTO_ZOOM = 1.0;            // >1 vergrößert die Fassaden
const KORN_DECKKRAFT = 0.06;      // Filmkorn, max. 0.06
const VERLAUF_SCHWARZ = 0.6;      // unteres Viertel: transparent -> 60 % Schwarz
const KARTE_BREITE = 560;         // px
const KARTE_HOEHE = 330;          // px
const PREIS_GROESSE = 156;        // px, Preis auf der Kinokarte
const KARTE_SKALIERUNG = 0.86;    // Kinokarte insgesamt verkleinern (1 = Originalgröße)
const KARTE_DREHUNG = -6;         // Grad
const KARTE_RECHTS = 56;          // px Abstand Kinokarte zum rechten Rand
const KARTE_UNTEN = 335;          // px Abstand Kinokarte zum unteren Rand
const CTA_LINKS = 56;             // px Abstand CTA zum linken Rand
const CTA_OBEN = 56;              // px Abstand CTA zum oberen Rand
// ============================================================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function loadPlaywright() {
  try {
    return require('playwright');
  } catch {
    return require(path.join(execSync('npm root -g').toString().trim(), 'playwright'));
  }
}

const dir = __dirname;
const fotoPfad = path.resolve(dir, FOTO);
if (!fs.existsSync(fotoPfad)) {
  console.error(`Foto fehlt: ${fotoPfad}`);
  process.exit(1);
}
const url = (p) => 'file://' + path.resolve(dir, p);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Filmkorn als SVG-Rauschen
const korn = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`
)}`;

const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<style>
  /* Fraunces und Inter von Google Fonts, lokal abgelegt */
  @font-face { font-family: 'Fraunces'; src: url('${url('fonts/Fraunces-latin.woff2')}') format('woff2'); font-weight: 100 900; }
  @font-face { font-family: 'Inter'; src: url('${url('fonts/Inter-latin.woff2')}') format('woff2'); font-weight: 100 900; }

  :root {
    --creme: ${CREME}; --senf: ${SENFGELB}; --rost: ${ROSTROT}; --braun: ${DUNKELBRAUN};
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1080px; height: 1080px; overflow: hidden; }
  body { position: relative; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; background: var(--braun); }
  .ebene { position: absolute; inset: 0; }

  /* --- Foto mit 70er-Filmlook --- */
  .foto {
    width: 100%; height: 100%;
    object-fit: cover; object-position: ${FOTO_POSITION};
    transform: scale(${FOTO_ZOOM}); transform-origin: ${FOTO_POSITION};
    filter: sepia(.14) saturate(1.22) contrast(.94) brightness(1.03);
  }
  .waerme  { background: var(--senf); mix-blend-mode: soft-light; opacity: .22; }
  .schatten-blass { background: #3a2a20; mix-blend-mode: lighten; opacity: .55; } /* hebt nur die tiefsten Schatten leicht an */
  .korn { background-image: url("${korn}"); background-size: 300px; mix-blend-mode: overlay; opacity: ${KORN_DECKKRAFT}; }
  .verlauf { top: 75%; background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,${VERLAUF_SCHWARZ})); }


  /* --- Logo oben rechts, rund mit weichem Übergang --- */
  .logo-halo {
    position: absolute; right: 40px; top: 30px; width: 136px; height: 136px; border-radius: 50%;
    background: radial-gradient(circle, rgba(243,230,200,.88) 0%, rgba(243,230,200,.80) 52%, rgba(243,230,200,0) 71%);
    display: grid; place-items: center;
  }
  .logo {
    width: 100px; height: 100px; border-radius: 50%; object-fit: cover;
    -webkit-mask-image: radial-gradient(circle, #000 58%, rgba(0,0,0,.6) 66%, transparent 71%);
            mask-image: radial-gradient(circle, #000 58%, rgba(0,0,0,.6) 66%, transparent 71%);
    transform: scale(1.18); /* gleicht die weiche Kante aus, Inhalt bleibt ca. 100 px */
  }

  /* --- Kinokarte --- */
  .karte-wrap {
    position: absolute; right: ${KARTE_RECHTS}px; bottom: ${KARTE_UNTEN}px;
    transform: rotate(${KARTE_DREHUNG}deg) scale(${KARTE_SKALIERUNG}); transform-origin: 100% 100%;
    filter: drop-shadow(0 10px 18px rgba(30,15,5,.28)) drop-shadow(0 2px 3px rgba(30,15,5,.18));
  }
  .karte {
    --kerbe: 24px; --riss: 236px; --breite: ${KARTE_BREITE}px;
    position: relative; width: var(--breite); height: ${KARTE_HOEHE}px;
    background: var(--creme);
    border-radius: 10px;
    -webkit-mask: radial-gradient(circle var(--kerbe) at 0 var(--riss), transparent 98%, #000) left / 51% 100% no-repeat,
                  radial-gradient(circle var(--kerbe) at 100% var(--riss), transparent 98%, #000) right / 51% 100% no-repeat;
            mask: radial-gradient(circle var(--kerbe) at 0 var(--riss), transparent 98%, #000) left / 51% 100% no-repeat,
                  radial-gradient(circle var(--kerbe) at 100% var(--riss), transparent 98%, #000) right / 51% 100% no-repeat;
    color: var(--braun);
  }
  .rahmen { position: absolute; inset: 12px; border: 2px solid var(--rost); border-radius: 4px; }
  .rahmen::after { content: ''; position: absolute; inset: 5px; border: 1px solid var(--rost); opacity: .55; }
  .oben { position: absolute; left: 0; right: 0; top: 0; height: var(--riss); display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 10px; }
  .label { font-size: 24px; font-weight: 700; letter-spacing: .34em; margin-right: -.34em; color: var(--rost); }
  .preis-zeile { display: flex; align-items: baseline; gap: 10px; margin-top: 2px; }
  .preis { font-family: 'Fraunces', serif; font-weight: 900; font-size: ${PREIS_GROESSE}px; line-height: .92; letter-spacing: -.035em; color: var(--braun); font-variation-settings: 'SOFT' 100, 'WONK' 0, 'opsz' 144; }
  .preis-alt { font-size: 38px; font-weight: 700; color: var(--rost); text-decoration: line-through; text-decoration-thickness: 3px; }
  .riss { position: absolute; left: 30px; right: 30px; top: var(--riss); border-top: 3px dashed var(--rost); opacity: .85; }
  .unten { position: absolute; left: 0; right: 0; top: var(--riss); bottom: 12px; display: grid; place-items: center; font-size: 30px; font-weight: 700; letter-spacing: .03em; color: var(--braun); }

  /* --- CTA unten links --- */
  .cta { position: absolute; left: ${CTA_LINKS}px; top: ${CTA_OBEN}px; padding: 16px 22px; border-radius: 14px; background: var(--senf); color: var(--braun); font-size: 34px; font-weight: 700; line-height: 1.2; }
  .cta strong { font-weight: 800; letter-spacing: .02em; }
</style>
</head>
<body>
  <div class="ebene"><img class="foto" src="${url(fotoPfad)}" alt=""></div>
  <div class="ebene waerme"></div>
  <div class="ebene schatten-blass"></div>
  <div class="ebene verlauf"></div>
  <div class="ebene korn"></div>


  <div class="logo-halo" data-check="logo"><img class="logo" src="${url(LOGO)}" alt=""></div>

  <div class="karte-wrap" data-check="karte">
    <div class="karte">
      <div class="rahmen"></div>
      <div class="oben">
        <div class="label" data-text>${esc(KARTE_LABEL)}</div>
        <div class="preis-zeile" data-fit>
          <div class="preis" data-text>${esc(PREIS)}</div>
          <div class="preis-alt" data-text>${esc(PREIS_ALT)}</div>
        </div>
      </div>
      <div class="riss"></div>
      <div class="unten" data-text>${esc(KARTE_FRIST)}</div>
    </div>
  </div>

  <div class="cta" data-check="cta" data-text>${esc(CTA_VORSATZ)}<br><strong>${esc(CTA_STICHWORT)}</strong></div>
</body>
</html>`;

(async () => {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } });
  const htmlPath = path.join(dir, 'creative.html');
  fs.writeFileSync(htmlPath, html);
  process.on('exit', () => fs.rmSync(htmlPath, { force: true }));
  await page.goto('file://' + htmlPath);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');

  const pruefung = await page.evaluate(() => {
    const out = [];
    if (!document.fonts.check('900 120px Fraunces')) out.push('Fraunces nicht geladen');
    if (!document.fonts.check('700 32px Inter')) out.push('Inter nicht geladen');
    const box = {};
    document.querySelectorAll('[data-check]').forEach((el) => {
      const r = el.getBoundingClientRect();
      box[el.dataset.check] = r;
      if (r.left < 24 || r.top < 24 || r.right > 1060 || r.bottom > 1060)
        out.push(`${el.dataset.check} ragt zu nah an/über den Rand`);
    });
    const hit = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    const namen = Object.keys(box);
    namen.forEach((a, i) => namen.slice(i + 1).forEach((b) => { if (hit(box[a], box[b])) out.push(`${a} überlappt ${b}`); }));
    document.querySelectorAll('[data-text]').forEach((el) => {
      if (el.scrollWidth > el.clientWidth + 1) out.push(`Text abgeschnitten: "${el.textContent}"`);
    });
    // Preiszeile muss innerhalb des Kartenrahmens bleiben (ungedrehte Maße)
    const fit = document.querySelector('[data-fit]');
    if (fit.offsetWidth > document.querySelector(".karte").offsetWidth - 2 * 24) out.push(`Preiszeile zu breit für die Karte (${fit.offsetWidth}px)`);
    const k = box.karte;
    return { out, karte: `x ${Math.round(k.left)}–${Math.round(k.right)}, y ${Math.round(k.top)}–${Math.round(k.bottom)}` };
  });

  await page.screenshot({ path: path.join(dir, AUSGABE) });

  // Helligkeit der Fotofläche (oberhalb des Verlaufs) messen
  const b64 = fs.readFileSync(path.join(dir, AUSGABE)).toString('base64');
  const prev = await browser.newPage({ viewport: { width: 270, height: 270 } });
  await prev.setContent(`<body style="margin:0"><img id="i" src="data:image/png;base64,${b64}" style="width:270px;height:270px;display:block"></body>`);
  const helligkeit = await prev.evaluate(async () => {
    const img = document.getElementById('i');
    await img.decode();
    const c = document.createElement('canvas');
    c.width = 1080; c.height = 810;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, 1080, 1080);
    const d = ctx.getImageData(0, 0, 1080, 810).data;
    let sum = 0, sat = 0;
    for (let i = 0; i < d.length; i += 4) {
      const [r, g, b] = [d[i], d[i + 1], d[i + 2]];
      sum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
      sat += Math.max(r, g, b) - Math.min(r, g, b);
    }
    const n = d.length / 4;
    return { luma: Math.round(sum / n), farbigkeit: Math.round(sat / n) };
  });
  await prev.screenshot({ path: path.join(dir, VORSCHAU) });
  await browser.close();

  console.log(`Kinokarte (gedreht): ${pruefung.karte}`);
  console.log(`Fotofläche: mittlere Helligkeit ${helligkeit.luma}/255, Farbigkeit ${helligkeit.farbigkeit}/255`);
  if (helligkeit.luma < 90) pruefung.out.push('Foto wirkt zu dunkel (Helligkeit < 90)');
  if (pruefung.out.length) {
    console.error('PROBLEME:\n- ' + pruefung.out.join('\n- '));
    process.exitCode = 1;
  } else {
    console.log(`OK: ${AUSGABE} und ${VORSCHAU} erstellt, keine Überläufe oder Überlappungen.`);
  }
})();
