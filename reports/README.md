# Kundenberichte

Alle Wochen- und Monatsberichte kommen aus **einer** Vorlage (`build_report.py`).
Pro Bericht schreibt man nur eine JSON-Datei in `data/`, das Design ist immer gleich.

```bash
pip install reportlab
python3 reports/build_report.py reports/data/starshine-emotions_2026-kw39.json
# -> reports/out/Wochenbericht_Starshine_Emotions_21-27-09-2026.pdf
```

## Wozu der Bericht da ist

Der Kunde soll in 30 Sekunden wissen: **Läuft es? Wo hakt es? Was passiert als Nächstes?**
Zahlen stehen nur da, wo sie eine dieser Fragen beantworten, und immer mit Einordnung.

## Aufbau (fest, in dieser Reihenfolge)

| Block | Feld | Regel |
|---|---|---|
| Fazit | `fazit.headline` + `fazit.punkte` | Eine Kernaussage als Satz. Dann je ein Punkt `gut` (läuft), `problem` (hakt), `fokus` (was wir jetzt tun). |
| Kampagnen-Status | `kampagnen[]` | **Jede Kampagne genau eine Zeile.** Neue/alte Version derselben Kampagne zusammenfassen (Hinweis in `hinweis`). |
| Schwerpunkt | `schwerpunkt` (optional) | Das eine Thema der Woche, das mehr Erklärung braucht (z.B. Engpass). |
| Weitere Abschnitte | `abschnitte[]` | z.B. Organischer Content. `punkte` oder `text`. |
| Nächste Schritte | `naechste_schritte[]` | Nach Priorität sortiert. `wer`/`bis` optional – nur angeben, wenn nicht alles bei uns liegt. |

### Kampagnen-Zeile

```json
{
  "name": "Kopenhagen (Traffic)",
  "hinweis": "2 Anzeigen aktiv",
  "zahl": "0,17 € / Klick",
  "zahl_info": "243 Klicks · 7.131 Aufrufe · 40,48 €",
  "status": "gut",
  "einordnung": "Günstiger Traffic, Klickrate 3,4 %.",
  "naechster_schritt": "Weiterlaufen lassen."
}
```

- `zahl`: **die eine** Kennzahl, die zum Ziel der Kampagne passt (Kosten pro Klick/Anfrage, CTR vs. Benchmark …). Leer lassen, wenn es keine aussagekräftige gibt.
- `zahl_info`: Rohwerte dahinter, mit ` · ` getrennt (wird untereinander gesetzt).
- `status`: `gut` · `beobachten` · `handeln` · `vorbereitung`
- `einordnung`: Was bedeutet die Zahl? `naechster_schritt`: Was folgt daraus?

Dateiname: `data/<kunde>_<jahr>-kw<nr>.json`. Generierte PDFs landen in `out/` (nicht eingecheckt).
Schrift: Instrument Sans (OFL, liegt in `fonts/`). Logo: `public/logo.jpg`.
