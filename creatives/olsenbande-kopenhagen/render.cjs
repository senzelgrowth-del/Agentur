// Meta-Ads-Creative „Olsenbande Reise nach Kopenhagen“ – Starshine Emotions
// Ausführen:  node render.cjs
// Ergebnis:   creative_1x1.png (1080 x 1080) und vorschau_25.png (270 x 270)

// ===== TEXTE (hier ändern) ==================================================
const ZEILE_1 = 'Olsenbande Reise nach Kopenhagen';
const ZEILE_2 = 'Mai 2027 · Bus ab Erfurt';
const PREIS = '965 €';
const PREIS_ALT = '999 €';
const BAND = 'Nur bis 31. Oktober buchen und 34 € sparen';
const BUTTON = 'Jetzt KOPENHAGEN schreiben';

// ===== DATEIEN ==============================================================
const HINTERGRUND = 'hintergrund.jpg';
const LOGO = 'logo.png';
const AUSGABE = 'creative_1x1.png';
const VORSCHAU = 'vorschau_25.png';
// ============================================================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function loadPlaywright() {
  try {
    return require('playwright');
  } catch {
    const globalRoot = execSync('npm root -g').toString().trim();
    return require(path.join(globalRoot, 'playwright'));
  }
}

const dir = __dirname;
const toUrl = (file) => 'file://' + path.join(dir, file);
const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const hasLogo = fs.existsSync(path.join(dir, LOGO));
const logoHtml = hasLogo
  ? `<img class="logo" src="${toUrl(LOGO)}" alt="">`
  : `<div class="logo logo-platzhalter">STARSHINE<br>EMOTIONS</div>`;

const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<style>
  /* Inter von Google Fonts, lokal abgelegt, damit das Rendern offline klappt */
  @font-face {
    font-family: 'Inter';
    src: url('${toUrl('fonts/Inter-latin.woff2')}') format('woff2');
    font-weight: 100 900;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1080px; height: 1080px; overflow: hidden; }
  body {
    position: relative;
    font-family: 'Inter', sans-serif;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }
  .bg {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
  }
  .shade {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom,
      rgba(0,0,0,.55) 0%, rgba(0,0,0,.70) 50%, rgba(0,0,0,.80) 100%);
  }
  .layout {
    position: absolute; inset: 0;
    padding: 56px;
    display: flex; flex-direction: column;
    justify-content: space-between;   /* gleichmäßige Abstände zwischen den Blöcken */
    align-items: flex-start;
  }
  .block { white-space: nowrap; }

  .logo { width: 120px; display: block; }
  .logo-platzhalter {
    font-size: 19px; font-weight: 700; line-height: 1.15; letter-spacing: .04em;
  }

  .zeile1 { font-size: 56px; font-weight: 700; line-height: 1.1; letter-spacing: -.02em; }
  .zeile2 { font-size: 44px; font-weight: 400; line-height: 1.2; opacity: .85; margin-top: 14px; }

  .preis-zeile { display: flex; align-items: baseline; gap: 32px; }
  .preis {
    font-size: 210px; font-weight: 800; line-height: .9; letter-spacing: -.04em;
    margin-left: -8px; /* optischer Ausgleich der Ziffer 9 an der Kante */
  }
  .preis-alt {
    font-size: 64px; font-weight: 400; color: #BDBDBD;
    text-decoration: line-through; text-decoration-thickness: 4px;
  }

  .band {
    align-self: stretch;
    margin: 0 -56px;
    padding: 28px 56px;
    background: #F5A623;
    color: #1F4E9C;
    font-size: 40px; font-weight: 700; line-height: 1.2; letter-spacing: -.015em;
  }

  .button {
    background: #1F4E9C;
    color: #fff;
    font-size: 38px; font-weight: 700; line-height: 1.2; letter-spacing: -.01em;
    padding: 24px 48px;
    border-radius: 14px;
  }
</style>
</head>
<body>
  <img class="bg" src="${toUrl(HINTERGRUND)}" alt="">
  <div class="shade"></div>
  <div class="layout">
    <div class="block" data-check>${logoHtml}</div>
    <div class="block" data-check>
      <div class="zeile1" data-text>${escapeHtml(ZEILE_1)}</div>
      <div class="zeile2" data-text>${escapeHtml(ZEILE_2)}</div>
    </div>
    <div class="block preis-zeile" data-check>
      <div class="preis" data-text>${escapeHtml(PREIS)}</div>
      <div class="preis-alt" data-text>${escapeHtml(PREIS_ALT)}</div>
    </div>
    <div class="block band" data-check><span data-text>${escapeHtml(BAND)}</span></div>
    <div class="block button" data-check data-text>${escapeHtml(BUTTON)}</div>
  </div>
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

  // Qualitätsprüfung: Überlauf, Ränder, Überlappungen
  const probleme = await page.evaluate(() => {
    const out = [];
    const font = getComputedStyle(document.body).fontFamily;
    if (!document.fonts.check('700 56px Inter')) out.push('Inter nicht geladen (' + font + ')');
    const blocks = [...document.querySelectorAll('[data-check]')].map((el) => el.getBoundingClientRect());
    blocks.forEach((r, i) => {
      if (r.top < 0 || r.bottom > 1080 || r.left < 0 || r.right > 1080)
        out.push(`Block ${i + 1} ragt über den Rand`);
      if (i > 0 && r.top < blocks[i - 1].bottom) out.push(`Block ${i + 1} überlappt Block ${i}`);
    });
    document.querySelectorAll('[data-text]').forEach((el) => {
      const r = el.getBoundingClientRect();
      // Texte dürfen nicht in den 56px-Rand laufen (Band-Hintergrund ausgenommen)
      if (r.right > 1080 - 56 + 0.5) out.push(`Text läuft in den Rand: "${el.textContent}" (rechts ${Math.round(r.right)}px)`);
      if (el.scrollWidth > el.clientWidth + 1) out.push(`Text abgeschnitten: "${el.textContent}"`);
    });
    const gaps = blocks.slice(1).map((r, i) => Math.round(r.top - blocks[i].bottom));
    return { out, gaps };
  });

  await page.screenshot({ path: path.join(dir, AUSGABE) });

  // Vorschau auf 25 % (270 x 270)
  const prev = await browser.newPage({ viewport: { width: 270, height: 270 } });
  await prev.setContent(
    `<body style="margin:0"><img src="data:image/png;base64,${fs.readFileSync(path.join(dir, AUSGABE)).toString('base64')}" style="width:270px;height:270px;display:block"></body>`
  );
  await prev.screenshot({ path: path.join(dir, VORSCHAU) });
  await browser.close();

  if (!hasLogo) console.warn(`Hinweis: ${LOGO} fehlt, Platzhalter-Schriftzug verwendet.`);
  console.log('Abstände zwischen den Blöcken (px):', probleme.gaps.join(', '));
  if (probleme.out.length) {
    console.error('PROBLEME:\n- ' + probleme.out.join('\n- '));
    process.exitCode = 1;
  } else {
    console.log(`OK: ${AUSGABE} und ${VORSCHAU} erstellt, keine Überläufe oder Überlappungen.`);
  }
})();
