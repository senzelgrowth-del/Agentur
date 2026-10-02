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

// ===== FARBEN ===============================================================
const CREME = '#F3E6C8';
const SENFGELB = '#E8A33D';
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
const HEADLINE_GROESSE = 110;     // px
const PREIS_GROESSE = 184;        // px
const RAND = 48;                  // px Außenabstand
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

const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<style>
  /* Fraunces und Inter von Google Fonts, lokal abgelegt */
  @font-face { font-family: 'Fraunces'; src: url('${url('fonts/Fraunces-latin.woff2')}') format('woff2'); font-weight: 100 900; }
  @font-face { font-family: 'Inter'; src: url('${url('fonts/Inter-latin.woff2')}') format('woff2'); font-weight: 100 900; }

  :root { --creme: ${CREME}; --senf: ${SENFGELB}; --rost: ${ROSTROT}; --braun: ${DUNKELBRAUN}; --wa: ${WHATSAPP_GRUEN}; --rand: ${RAND}px; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${BREITE}px; height: ${HOEHE}px; overflow: hidden; }
  body { position: relative; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; background: var(--braun); color: var(--braun); }

  /* Foto unverändert, nur auf das Format zugeschnitten */
  .foto { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: ${FOTO_POSITION}; }

  /* Headline im hellen Himmel */
  .headline { position: absolute; left: var(--rand); top: 40px;
    font-family: 'Fraunces', serif; font-weight: 900; font-size: ${HEADLINE_GROESSE}px; line-height: .9; letter-spacing: -.01em;
    font-variation-settings: 'SOFT' 50, 'WONK' 0, 'opsz' 144; color: var(--braun); }
  .headline .jahr { color: var(--rost); }

  /* Logo oben rechts, rund mit weichem Übergang */
  .logo-halo { position: absolute; right: 28px; top: 22px; width: 150px; height: 150px; border-radius: 50%;
    background: radial-gradient(circle, rgba(243,230,200,.92) 0%, rgba(243,230,200,.85) 52%, rgba(243,230,200,0) 71%);
    display: grid; place-items: center; }
  .logo { width: 110px; height: 110px; border-radius: 50%; object-fit: cover; transform: scale(1.18);
    -webkit-mask-image: radial-gradient(circle, #000 58%, rgba(0,0,0,.6) 66%, transparent 71%);
            mask-image: radial-gradient(circle, #000 58%, rgba(0,0,0,.6) 66%, transparent 71%); }

  /* Angebotskarte unten */
  .karte { position: absolute; left: var(--rand); right: var(--rand); bottom: var(--rand);
    background: var(--creme); border-radius: 28px; padding: 26px 40px 34px;
    box-shadow: 0 18px 40px rgba(30,15,5,.28); }
  .vorsatz { font-size: 38px; font-weight: 700; color: var(--braun); }
  .preis-zeile { display: flex; align-items: baseline; gap: 18px; margin-top: -4px; }
  .preis { font-family: 'Fraunces', serif; font-weight: 900; font-size: ${PREIS_GROESSE}px; line-height: .92; letter-spacing: -.035em;
    color: var(--rost); font-variation-settings: 'SOFT' 100, 'WONK' 0, 'opsz' 144; }
  .zusatz { font-size: 44px; font-weight: 700; color: var(--braun); }
  .leistungen { margin-top: 14px; padding-top: 16px; border-top: 3px solid rgba(58,36,24,.18);
    font-size: 38px; font-weight: 700; color: var(--braun); white-space: nowrap; }
  .leistungen .punkt { color: var(--senf); margin: 0 .35em; }
  .frist { display: inline-block; margin-top: 14px; padding: 8px 16px; border-radius: 10px;
    background: var(--senf); color: var(--braun); font-size: 32px; font-weight: 700; }
  .cta { display: block; margin-top: 22px; padding: 22px 0; border-radius: 18px; text-align: center;
    background: var(--wa); color: #fff; font-size: 42px; font-weight: 800; letter-spacing: -.01em; white-space: nowrap; }
</style>
</head>
<body>
  <img class="foto" src="${url(fotoPfad)}" alt="">

  <div class="headline" data-check="headline">
    <div data-text>${esc(HEADLINE_1)}</div>
    <div class="jahr" data-text>${esc(HEADLINE_2)}</div>
  </div>

  <div class="logo-halo" data-check="logo"><img class="logo" src="${url(LOGO)}" alt=""></div>

  <div class="karte" data-check="karte">
    <div class="vorsatz" data-text>${esc(PREIS_VORSATZ)}</div>
    <div class="preis-zeile">
      <div class="preis" data-text>${esc(PREIS)}</div>
      <div class="zusatz" data-text>${esc(PREIS_ZUSATZ)}</div>
    </div>
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

  const pruefung = await page.evaluate(([W, H]) => {
    const out = [];
    if (!document.fonts.check('900 120px Fraunces')) out.push('Fraunces nicht geladen');
    if (!document.fonts.check('700 32px Inter')) out.push('Inter nicht geladen');
    const box = {};
    document.querySelectorAll('[data-check]').forEach((el) => {
      const r = el.getBoundingClientRect();
      box[el.dataset.check] = r;
      if (r.left < 16 || r.top < 16 || r.right > W - 16 || r.bottom > H - 16) out.push(`${el.dataset.check} ragt zu nah an/über den Rand`);
    });
    const hit = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    const n = Object.keys(box);
    n.forEach((a, i) => n.slice(i + 1).forEach((b) => { if (hit(box[a], box[b])) out.push(`${a} überlappt ${b}`); }));
    // Headline-Zeilen dürfen das Logo nicht berühren
    document.querySelectorAll('.headline [data-text]').forEach((el) => {
      const r = el.getBoundingClientRect();
      const range = document.createRange(); range.selectNodeContents(el);
      const t = range.getBoundingClientRect();
      if (hit(t, box.logo)) out.push(`Headline "${el.textContent}" berührt das Logo`);
      if (t.right > W - 48) out.push(`Headline "${el.textContent}" zu breit`);
    });
    document.querySelectorAll('.karte [data-text]').forEach((el) => {
      const range = document.createRange(); range.selectNodeContents(el);
      const t = range.getBoundingClientRect();
      if (el.scrollWidth > el.clientWidth + 1 || t.right > box.karte.right - 20) out.push(`Text zu breit für die Karte: "${el.textContent}"`);
    });
    return { out, karteOben: Math.round(box.karte.top), headlineUnten: Math.round(box.headline.bottom) };
  }, [BREITE, HOEHE]);

  await page.screenshot({ path: path.join(dir, AUSGABE) });

  const b64 = fs.readFileSync(path.join(dir, AUSGABE)).toString('base64');
  const vw = Math.round(BREITE / 4), vh = Math.round(HOEHE / 4);
  const prev = await browser.newPage({ viewport: { width: vw, height: vh } });
  await prev.setContent(`<body style="margin:0"><img src="data:image/png;base64,${b64}" style="width:${vw}px;height:${vh}px;display:block"></body>`);
  await prev.screenshot({ path: path.join(dir, VORSCHAU) });
  await browser.close();

  console.log(`Headline endet bei y ${pruefung.headlineUnten}, Angebotskarte beginnt bei y ${pruefung.karteOben} (dazwischen freies Foto)`);
  if (pruefung.out.length) {
    console.error('PROBLEME:\n- ' + pruefung.out.join('\n- '));
    process.exitCode = 1;
  } else {
    console.log(`OK: ${AUSGABE} und ${VORSCHAU} erstellt, keine Überläufe oder Überlappungen.`);
  }
})();
