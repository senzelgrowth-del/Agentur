// Meta-Ads-Creative Variante B (leistungsorientiert) – Starshine Emotions
// Ausführen:            node render.cjs
// Mit anderem Foto:     FOTO=anderes.jpg node render.cjs
// Ergebnis:             creative_4x5.png (1080 x 1350) und vorschau_25.png (270 x 338)

// ===== TEXTE ================================================================
const HEADLINE_1 = 'KOPENHAGEN';
const HEADLINE_2 = '2027';
const PREIS_VORSATZ = '4 Tage ab';
const PREIS = '965 €';
const PREIS_ZUSATZ = 'p. P.';
const LEISTUNGEN = ['Hotel', 'Frühstück', 'Stadtprogramm'];
const FRIST = 'Frühbucherpreis bis 31. Oktober';
const CTA = 'WhatsApp: „Kopenhagen 2027“';

// ===== FARBEN (70er Palette) ================================================
const CREME = '#F3E6C8';
const SENFGELB = '#E8A33D';
const ORANGE = '#D9702B';
const ROSTROT = '#B5432A';
const DUNKELBRAUN = '#3A2418';
const WHATSAPP_GRUEN = '#1DA851';

// ===== DATEIEN ==============================================================
const FOTO = process.env.FOTO || 'nyhavn.jpg';
const LOGO = 'logo.jpg';
const AUSGABE = 'creative_4x5.png';
const VORSCHAU = 'vorschau_25.png';

// ===== FEINEINSTELLUNG ======================================================
const BREITE = 1080;
const HOEHE = 1350;
const FOTO_POSITION = '50% 50%';  // Ausschnitt; Foto bleibt sonst unverändert
const HEADLINE_GROESSE = 92;      // px, Titan One
const HEADLINE_OBEN = 22;         // px Abstand zum oberen Rand
// Häuserflächen im Nyhavn-Foto (Koordinaten im fertigen Creative); die Headline darf sie nicht berühren
const HAEUSER = [
  { left: 846, top: 112, right: 1080, bottom: 1350 }, // rechtes Haus mit Dach
  { left: 985, top: 70, right: 1030, bottom: 1350 },  // Schornstein
  { left: 190, top: 270, right: 880, bottom: 1350 },  // rotes Haus mit Dach
  { left: 0, top: 336, right: 200, bottom: 1350 },    // gelbes Haus links
];
const STICKER_DURCHMESSER = 420;  // px, Preis-Sticker
const STICKER_MITTE_Y = 800;      // px, vertikale Mitte des Stickers
const STICKER_DREHUNG = -7;       // Grad
const PREIS_GROESSE = 112;        // px
const FUSS_OBEN = 1000;           // px, ab hier beginnt der dunkle Fuß
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

// Gewellter Rand des Preis-Stickers (wie ein 70er Preisaufkleber)
function stickerSvg(d) {
  const c = d / 2, R = c - 12, A = 9, N = 26, pts = [];
  for (let i = 0; i <= 720; i++) {
    const t = (i / 720) * Math.PI * 2;
    const r = R + A * Math.cos(N * t);
    pts.push(`${(c + r * Math.cos(t)).toFixed(1)},${(c + r * Math.sin(t)).toFixed(1)}`);
  }
  return `<svg class="sticker-form" width="${d}" height="${d}" viewBox="0 0 ${d} ${d}">
    <polygon points="${pts.join(' ')}" fill="${SENFGELB}"/>
    <circle cx="${c}" cy="${c}" r="${R - 30}" fill="none" stroke="${DUNKELBRAUN}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>
  </svg>`;
}

const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<style>
  /* Titan One und Rubik von Google Fonts, lokal abgelegt */
  @font-face { font-family: 'Titan One'; src: url('${url('fonts/TitanOne-latin.woff2')}') format('woff2'); }
  @font-face { font-family: 'Rubik'; src: url('${url('fonts/Rubik-latin.woff2')}') format('woff2'); font-weight: 300 900; }

  :root { --creme: ${CREME}; --senf: ${SENFGELB}; --orange: ${ORANGE}; --rost: ${ROSTROT}; --braun: ${DUNKELBRAUN}; --wa: ${WHATSAPP_GRUEN}; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${BREITE}px; height: ${HOEHE}px; overflow: hidden; }
  body { position: relative; font-family: 'Rubik', sans-serif; -webkit-font-smoothing: antialiased; background: var(--braun); color: var(--braun); }

  /* Foto unverändert, nur auf das Format zugeschnitten */
  .foto { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: ${FOTO_POSITION}; }

  /* Headline mittig im hellen Himmel */
  .headline { position: absolute; left: 0; right: 0; top: ${HEADLINE_OBEN}px; text-align: center;
    font-family: 'Titan One', sans-serif; font-size: ${HEADLINE_GROESSE}px; line-height: .98; letter-spacing: .01em; color: var(--braun); }
  .headline .jahr { color: var(--rost); }

  /* Logo klein oben links, rund mit weichem Übergang */
  .logo-halo { position: absolute; left: 14px; top: 14px; width: 132px; height: 132px; border-radius: 50%;
    background: radial-gradient(circle, rgba(243,230,200,.92) 0%, rgba(243,230,200,.85) 52%, rgba(243,230,200,0) 71%);
    display: grid; place-items: center; }
  .logo { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; transform: scale(1.18);
    -webkit-mask-image: radial-gradient(circle, #000 58%, rgba(0,0,0,.6) 66%, transparent 71%);
            mask-image: radial-gradient(circle, #000 58%, rgba(0,0,0,.6) 66%, transparent 71%); }

  /* Dunkler Kino-Fuß mit 70er-Streifen */
  .fuss { position: absolute; left: 0; right: 0; top: ${FUSS_OBEN}px; bottom: 0; background: var(--braun); }
  .streifen { position: absolute; left: 0; right: 0; top: ${FUSS_OBEN - 36}px; height: 36px;
    background: linear-gradient(to bottom, var(--senf) 0 12px, var(--orange) 12px 24px, var(--rost) 24px 36px); }

  /* Preis-Sticker, mittig, leicht gedreht */
  .sticker { position: absolute; left: 50%; top: ${STICKER_MITTE_Y}px; width: ${STICKER_DURCHMESSER}px; height: ${STICKER_DURCHMESSER}px;
    transform: translate(-50%, -50%) rotate(${STICKER_DREHUNG}deg);
    filter: drop-shadow(0 10px 16px rgba(30,15,5,.35)); }
  .sticker-form { position: absolute; inset: 0; }
  .sticker-inhalt { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  .vorsatz { font-size: 36px; font-weight: 800; color: var(--braun); text-transform: uppercase; letter-spacing: .04em; }
  .preis { font-family: 'Titan One', sans-serif; font-size: ${PREIS_GROESSE}px; line-height: 1; color: var(--rost); margin: 2px 0 0; white-space: nowrap; }
  .zusatz { font-size: 34px; font-weight: 800; color: var(--braun); }

  /* Inhalt im Fuß, mittig */
  .fuss-inhalt { position: absolute; left: 0; right: 0; bottom: 42px; display: flex; flex-direction: column; align-items: center; text-align: center; }
  .leistungen { font-size: 46px; font-weight: 700; color: var(--creme); white-space: nowrap; }
  .leistungen .punkt { color: var(--senf); margin: 0 .4em; }
  .frist { margin-top: 14px; font-size: 38px; font-weight: 600; color: var(--senf); }

  /* CTA als Eintrittskarte mit Einkerbungen */
  .cta { margin-top: 30px; padding: 22px 64px; background: var(--wa); color: #fff; border-radius: 10px;
    font-size: 46px; font-weight: 800; white-space: nowrap;
    -webkit-mask: radial-gradient(circle 16px at 0 50%, transparent 98%, #000) left / 51% 100% no-repeat,
                  radial-gradient(circle 16px at 100% 50%, transparent 98%, #000) right / 51% 100% no-repeat;
            mask: radial-gradient(circle 16px at 0 50%, transparent 98%, #000) left / 51% 100% no-repeat,
                  radial-gradient(circle 16px at 100% 50%, transparent 98%, #000) right / 51% 100% no-repeat; }
</style>
</head>
<body>
  <img class="foto" src="${url(fotoPfad)}" alt="">

  <div class="headline" data-check="headline">
    <div data-text>${esc(HEADLINE_1)}</div>
    <div class="jahr" data-text>${esc(HEADLINE_2)}</div>
  </div>

  <div class="logo-halo" data-check="logo"><img class="logo" src="${url(LOGO)}" alt=""></div>

  <div class="streifen"></div>
  <div class="fuss"></div>

  <div class="sticker" data-check="sticker">
    ${stickerSvg(STICKER_DURCHMESSER)}
    <div class="sticker-inhalt">
      <div class="vorsatz" data-text>${esc(PREIS_VORSATZ)}</div>
      <div class="preis" data-text data-im-sticker>${esc(PREIS)}</div>
      <div class="zusatz" data-text>${esc(PREIS_ZUSATZ)}</div>
    </div>
  </div>

  <div class="fuss-inhalt" data-check="fuss">
    <div class="leistungen" data-text>${LEISTUNGEN.map(esc).join('<span class="punkt">•</span>')}</div>
    <div class="frist" data-text>${esc(FRIST)}</div>
    <div class="cta" data-text>${esc(CTA)}</div>
  </div>
</body>
</html>`;

(async () => {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: BREITE, height: HOEHE } });
  const htmlPath = path.join(dir, 'creative.html');
  fs.writeFileSync(htmlPath, html);
  process.on('exit', () => fs.rmSync(htmlPath, { force: true }));
  await page.goto('file://' + htmlPath);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');

  const pruefung = await page.evaluate(([W, H, D, PREIS_GR, HAEUSER]) => {
    const out = [];
    if (!document.fonts.check(`${PREIS_GR}px "Titan One"`)) out.push('Titan One nicht geladen');
    if (!document.fonts.check('700 32px Rubik')) out.push('Rubik nicht geladen');
    const textBox = (el) => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect(); };
    const hit = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    const box = {};
    document.querySelectorAll('[data-check]').forEach((el) => {
      if (el.dataset.check === 'headline' || el.dataset.check === 'fuss') {
        // Textzeilen statt der vollen Blockbreite messen
        const rs = [...el.querySelectorAll('[data-text]')].map(textBox);
        box[el.dataset.check] = { left: Math.min(...rs.map((r) => r.left)), right: Math.max(...rs.map((r) => r.right)),
          top: Math.min(...rs.map((r) => r.top)), bottom: Math.max(...rs.map((r) => r.bottom)) };
      } else box[el.dataset.check] = el.getBoundingClientRect();
    });
    Object.entries(box).forEach(([k, r]) => {
      if (r.left < 8 || r.top < 8 || r.right > W - 8 || r.bottom > H - 8) out.push(`${k} ragt zu nah an/über den Rand`);
    });
    // Headline-Text gegen Logo, Sticker gegen Fuß-Text
    document.querySelectorAll('.headline [data-text]').forEach((el) => {
      const t = textBox(el);
      if (hit(t, box.logo)) out.push(`Headline "${el.textContent}" berührt das Logo`);
      if (t.left < 40 || t.right > W - 40) out.push(`Headline "${el.textContent}" zu breit`);
    });
    // Exakte Buchstabenfläche der Headline gegen die Häuser prüfen
    const ctx = document.createElement('canvas').getContext('2d');
    document.querySelectorAll('.headline [data-text]').forEach((el) => {
      const cs = getComputedStyle(el);
      ctx.font = `${cs.fontSize} "Titan One"`;
      const m = ctx.measureText(el.textContent);
      const line = textBox(el);
      const content = m.fontBoundingBoxAscent + m.fontBoundingBoxDescent;
      const baseline = line.top + (line.height - content) / 2 + m.fontBoundingBoxAscent;
      const g = { left: line.left, right: line.right, top: baseline - m.actualBoundingBoxAscent, bottom: baseline + m.actualBoundingBoxDescent };
      HAEUSER.forEach((h, i) => { if (hit(g, h)) out.push(`Headline "${el.textContent}" überlappt Haus ${i + 1}`); });
      if (g.top < 20) out.push(`Headline "${el.textContent}" zu nah am oberen Rand`);
    });
    const stickerUnten = box.sticker.bottom, fussText = textBox(document.querySelector('.leistungen'));
    if (stickerUnten > fussText.top - 12) out.push('Sticker berührt die Leistungszeile');
    // Preis muss in den inneren Kreis passen
    const p = textBox(document.querySelector('[data-im-sticker]'));
    if (p.width > D - 2 * 46) /* innerer gestrichelter Kreis */ out.push(`Preis zu breit für den Sticker (${Math.round(p.width)}px)`);
    document.querySelectorAll('.fuss-inhalt [data-text]').forEach((el) => {
      const t = textBox(el);
      if (t.left < 24 || t.right > W - 24) out.push(`Text zu breit: "${el.textContent}"`);
    });
    return { out, sticker: `y ${Math.round(box.sticker.top)}–${Math.round(box.sticker.bottom)}`, fussText: Math.round(fussText.top) };
  }, [BREITE, HOEHE, STICKER_DURCHMESSER, PREIS_GROESSE, HAEUSER]);

  await page.screenshot({ path: path.join(dir, AUSGABE) });

  const b64 = fs.readFileSync(path.join(dir, AUSGABE)).toString('base64');
  const vw = Math.round(BREITE / 4), vh = Math.round(HOEHE / 4);
  const prev = await browser.newPage({ viewport: { width: vw, height: vh } });
  await prev.setContent(`<body style="margin:0"><img src="data:image/png;base64,${b64}" style="width:${vw}px;height:${vh}px;display:block"></body>`);
  await prev.screenshot({ path: path.join(dir, VORSCHAU) });
  await browser.close();

  console.log(`Sticker ${pruefung.sticker}, Leistungszeile beginnt bei y ${pruefung.fussText}`);
  if (pruefung.out.length) {
    console.error('PROBLEME:\n- ' + pruefung.out.join('\n- '));
    process.exitCode = 1;
  } else {
    console.log(`OK: ${AUSGABE} und ${VORSCHAU} erstellt, keine Überläufe oder Überlappungen.`);
  }
})();
