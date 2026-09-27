"""Erzeugt Kundenberichte (Wochen-/Monatsberichte) im einheitlichen SenzelGrowth-Design.

Aufruf:
    python3 reports/build_report.py reports/data/<kunde>_<jahr>-kw<nr>.json [ausgabe.pdf]

Inhalt kommt ausschließlich aus der JSON-Datei, das Layout ausschließlich aus
diesem Skript. Aufbau siehe reports/README.md.
"""

import json
import sys
from datetime import date
from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    CondPageBreak,
    Flowable,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parent
LOGO = ROOT.parent / "public" / "logo.jpg"

# --- Design-Tokens ---------------------------------------------------------

NAVY = HexColor("#0f2a4d")
NAVY_DEEP = HexColor("#0a1a33")
INK = HexColor("#1b2233")
MUTED = HexColor("#667085")
LINE = HexColor("#e3e7ee")
SURFACE = HexColor("#f5f7fa")
ACCENT = HexColor("#2f6fe0")

STATUS = {
    # key: (Label, Farbe, heller Hintergrund)
    "gut": ("Läuft gut", HexColor("#16865a"), HexColor("#e7f5ee")),
    "beobachten": ("Beobachten", HexColor("#b86e00"), HexColor("#fdf3e1")),
    "handeln": ("Handeln", HexColor("#c93b3b"), HexColor("#fbeaea")),
    "vorbereitung": ("In Vorbereitung", HexColor("#5b6b85"), HexColor("#edf0f5")),
}

FAZIT_ART = {
    "gut": ("Läuft", STATUS["gut"][1]),
    "problem": ("Hakt", STATUS["handeln"][1]),
    "fokus": ("Fokus", ACCENT),
}

PAGE_W, PAGE_H = A4
MARGIN_X = 18 * mm
CONTENT_W = PAGE_W - 2 * MARGIN_X
HEADER_H_FIRST = 46 * mm
HEADER_H = 16 * mm
FOOTER_H = 14 * mm

pdfmetrics.registerFont(TTFont("Sans", str(ROOT / "fonts" / "InstrumentSans-Regular.ttf")))
pdfmetrics.registerFont(TTFont("Sans-Bold", str(ROOT / "fonts" / "InstrumentSans-Bold.ttf")))
pdfmetrics.registerFont(TTFont("Sans-Italic", str(ROOT / "fonts" / "InstrumentSans-Italic.ttf")))
pdfmetrics.registerFontFamily("Sans", normal="Sans", bold="Sans-Bold", italic="Sans-Italic")


def style(name, **kw):
    base = dict(fontName="Sans", fontSize=9.5, leading=13.5, textColor=INK, alignment=TA_LEFT)
    base.update(kw)
    return ParagraphStyle(name, **base)


S = {
    "h2": style("h2", fontName="Sans-Bold", fontSize=13, leading=16, textColor=NAVY, spaceBefore=0, spaceAfter=0),
    "h3": style("h3", fontName="Sans-Bold", fontSize=10.5, leading=14, textColor=INK),
    "lead": style("lead", fontName="Sans-Bold", fontSize=15, leading=20, textColor=NAVY),
    "body": style("body"),
    "small": style("small", fontSize=8.5, leading=11.5, textColor=MUTED),
    "cell": style("cell", fontSize=9, leading=12.5),
    "cell_b": style("cell_b", fontName="Sans-Bold", fontSize=9.5, leading=12.5),
    "num": style("num", fontName="Sans-Bold", fontSize=11, leading=14, textColor=NAVY),
    "th": style("th", fontName="Sans-Bold", fontSize=7.5, leading=10, textColor=MUTED),
    "tag": style("tag", fontName="Sans-Bold", fontSize=8, leading=10),
}


def fmt_date(iso):
    d = date.fromisoformat(iso)
    return d.strftime("%d.%m.%Y")


def esc(text):
    return (text or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


# --- Bausteine ---------------------------------------------------------------


class Pill(Flowable):
    """Farbige Status-Markierung mit Punkt und Label."""

    def __init__(self, key):
        super().__init__()
        self.label, self.fg, self.bg = STATUS[key]
        self.w = pdfmetrics.stringWidth(self.label, "Sans-Bold", 8) + 16
        self.h = 15

    def wrap(self, *_):
        return self.w, self.h

    def draw(self):
        c = self.canv
        c.setFillColor(self.bg)
        c.roundRect(0, 0, self.w, self.h, 7.5, stroke=0, fill=1)
        c.setFillColor(self.fg)
        c.circle(7, self.h / 2, 2.4, stroke=0, fill=1)
        c.setFont("Sans-Bold", 8)
        c.drawString(12, 4.6, self.label)


def section(title):
    return [CondPageBreak(40 * mm), Paragraph(esc(title), S["h2"]), Spacer(1, 3 * mm)]


def fazit_block(fazit):
    rows = []
    for p in fazit["punkte"]:
        label, color = FAZIT_ART[p["art"]]
        tag = Paragraph(label.upper(), style("t", parent=S["tag"], textColor=color))
        rows.append([tag, Paragraph(esc(p["text"]), S["body"])])
    t = Table(rows, colWidths=[18 * mm, CONTENT_W - 18 * mm - 10 * mm])
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (0, -1), 6.5),
                ("LINEBELOW", (0, 0), (-1, -2), 0.5, LINE),
            ]
        )
    )
    box = Table(
        [[Paragraph(esc(fazit["headline"]), S["lead"])], [Spacer(1, 2 * mm)], [t]],
        colWidths=[CONTENT_W],
    )
    box.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SURFACE),
                ("LINEBEFORE", (0, 0), (0, -1), 3, NAVY),
                ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("TOPPADDING", (0, 0), (-1, 0), 5 * mm),
                ("BOTTOMPADDING", (0, -1), (-1, -1), 4 * mm),
                ("TOPPADDING", (0, 1), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -2), 0),
            ]
        )
    )
    return [box]


def kampagnen_table(kampagnen):
    widths = [40 * mm, 40 * mm, 29 * mm, CONTENT_W - 109 * mm]
    head = [Paragraph(h, S["th"]) for h in ("KAMPAGNE", "KENNZAHL", "STATUS", "EINORDNUNG & NÄCHSTER SCHRITT")]
    rows = [head]
    for k in kampagnen:
        name = [Paragraph(esc(k["name"]), S["cell_b"])]
        if k.get("hinweis"):
            name.append(Paragraph(esc(k["hinweis"]), S["small"]))
        zahl = []
        if k.get("zahl"):
            zahl.append(Paragraph(esc(k["zahl"]), S["num"]))
        if k.get("zahl_info"):
            zahl.append(Paragraph("<br/>".join(esc(x) for x in k["zahl_info"].split(" · ")), S["small"]))
        if not zahl:
            zahl = [Paragraph("–", S["small"])]
        text = [Paragraph(esc(k["einordnung"]), S["cell"])]
        if k.get("naechster_schritt"):
            text.append(
                Paragraph(
                    f'<font color="{ACCENT.hexval().replace("0x", "#")}">→</font> <b>{esc(k["naechster_schritt"])}</b>',
                    S["cell"],
                )
            )
        rows.append([name, zahl, Pill(k["status"]), text])

    t = Table(rows, colWidths=widths, repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
                ("TOPPADDING", (0, 0), (-1, 0), 0),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 1.5 * mm),
                ("LINEBELOW", (0, 0), (-1, 0), 0.8, NAVY),
                ("LINEBELOW", (0, 1), (-1, -2), 0.5, LINE),
                ("TOPPADDING", (2, 1), (2, -1), 3 * mm - 1),
            ]
        )
    )
    return [t]


def schwerpunkt_block(sp):
    box = Table(
        [[Paragraph(esc(sp["titel"]), S["h3"])], [Paragraph(esc(sp["text"]), S["body"])]],
        colWidths=[CONTENT_W],
    )
    fg, bg = STATUS["handeln"][1], STATUS["handeln"][2]
    box.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), bg),
                ("LINEBEFORE", (0, 0), (0, -1), 3, fg),
                ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("TOPPADDING", (0, 0), (-1, 0), 4 * mm),
                ("TOPPADDING", (0, 1), (-1, 1), 1.5 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 0),
                ("BOTTOMPADDING", (0, -1), (-1, -1), 4 * mm),
            ]
        )
    )
    return [KeepTogether(box)]


def bullets(items):
    rows = [[Paragraph("•", style("b", textColor=ACCENT)), Paragraph(esc(i), S["body"])] for i in items]
    t = Table(rows, colWidths=[5 * mm, CONTENT_W - 5 * mm])
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 1.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
            ]
        )
    )
    return t


def schritte_table(schritte):
    has_owner = any(s.get("wer") for s in schritte)
    rows = []
    for i, s in enumerate(schritte, 1):
        num = Paragraph(str(i), style("n", fontName="Sans-Bold", fontSize=10, textColor=white, alignment=1))
        text = [Paragraph(esc(s["was"]), S["body"])]
        if has_owner and s.get("wer"):
            text.append(Paragraph(esc(s["wer"]) + (f" · bis {esc(s['bis'])}" if s.get("bis") else ""), S["small"]))
        rows.append([num, text])
    t = Table(rows, colWidths=[7 * mm, CONTENT_W - 7 * mm])
    cmds = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, -1), 0),
        ("RIGHTPADDING", (0, 0), (0, -1), 0),
        ("LEFTPADDING", (1, 0), (1, -1), 4 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 2.2 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2 * mm),
        ("TOPPADDING", (0, 0), (0, -1), 2.2 * mm + 0.5),
        ("LINEBELOW", (0, 0), (-1, -2), 0.5, LINE),
    ]
    t.setStyle(TableStyle(cmds))

    class Badges(Flowable):
        # Zeichnet runde Nummern-Badges hinter die Nummernspalte.
        def wrap(self, aw, ah):
            self.size = t.wrap(aw, ah)
            return self.size

        def draw(self):
            y = self.size[1]
            for h in t._rowHeights:
                self.canv.setFillColor(NAVY)
                self.canv.circle(3.5 * mm, y - 2.2 * mm - 3.5 * mm + 0.9 * mm, 3.1 * mm, stroke=0, fill=1)
                y -= h
            t.drawOn(self.canv, 0, 0)

    return [Badges()]


# --- Seitenrahmen ------------------------------------------------------------


def draw_footer(c, doc):
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.line(MARGIN_X, FOOTER_H, PAGE_W - MARGIN_X, FOOTER_H)
    c.setFont("Sans", 7.5)
    c.setFillColor(MUTED)
    c.drawString(MARGIN_X, FOOTER_H - 5 * mm, f"SenzelGrowth  ·  Ansprechpartner {doc.meta['ansprechpartner']}")
    c.drawRightString(PAGE_W - MARGIN_X, FOOTER_H - 5 * mm, f"Seite {doc.page}")


def draw_first(c, doc):
    m = doc.meta
    c.saveState()
    c.setFillColor(NAVY)
    c.rect(0, PAGE_H - HEADER_H_FIRST, PAGE_W, HEADER_H_FIRST, stroke=0, fill=1)
    c.setFillColor(NAVY_DEEP)
    c.rect(0, PAGE_H - HEADER_H_FIRST, PAGE_W, 1.2 * mm, stroke=0, fill=1)

    logo = 16 * mm
    if LOGO.exists():
        c.drawImage(str(LOGO), PAGE_W - MARGIN_X - logo, PAGE_H - 12 * mm - logo, logo, logo)

    c.setFillColor(HexColor("#9fb4d6"))
    c.setFont("Sans-Bold", 8)
    c.drawString(MARGIN_X, PAGE_H - 14 * mm, f"{m['typ'].upper()}  ·  KW {m['kw']}" if m.get("kw") else m["typ"].upper())
    c.setFillColor(white)
    c.setFont("Sans-Bold", 24)
    c.drawString(MARGIN_X, PAGE_H - 25 * mm, m["kunde"])
    c.setFillColor(HexColor("#c9d5ea"))
    c.setFont("Sans", 10)
    c.drawString(
        MARGIN_X,
        PAGE_H - 32 * mm,
        f"Zeitraum {fmt_date(m['zeitraum']['von'])} – {fmt_date(m['zeitraum']['bis'])}",
    )
    draw_footer(c, doc)
    c.restoreState()


def draw_later(c, doc):
    m = doc.meta
    c.saveState()
    c.setFont("Sans-Bold", 8)
    c.setFillColor(NAVY)
    c.drawString(MARGIN_X, PAGE_H - 10 * mm, m["kunde"].upper())
    c.setFont("Sans", 8)
    c.setFillColor(MUTED)
    label = f"{m['typ']} KW {m['kw']}" if m.get("kw") else m["typ"]
    c.drawRightString(PAGE_W - MARGIN_X, PAGE_H - 10 * mm, label)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.line(MARGIN_X, PAGE_H - 12.5 * mm, PAGE_W - MARGIN_X, PAGE_H - 12.5 * mm)
    draw_footer(c, doc)
    c.restoreState()


# --- Aufbau --------------------------------------------------------------------


def build(data, out):
    doc = BaseDocTemplate(
        str(out),
        pagesize=A4,
        title=f"{data['typ']} {data['kunde']}",
        author="SenzelGrowth",
        subject=f"Zeitraum {fmt_date(data['zeitraum']['von'])} – {fmt_date(data['zeitraum']['bis'])}",
    )
    doc.meta = data
    bottom = FOOTER_H + 6 * mm
    first = Frame(MARGIN_X, bottom, CONTENT_W, PAGE_H - HEADER_H_FIRST - 8 * mm - bottom, id="first", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    later = Frame(MARGIN_X, bottom, CONTENT_W, PAGE_H - HEADER_H - 4 * mm - bottom, id="later", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates(
        [
            PageTemplate(id="First", frames=[first], onPage=draw_first, autoNextPageTemplate="Later"),
            PageTemplate(id="Later", frames=[later], onPage=draw_later),
        ]
    )

    story = []
    story += fazit_block(data["fazit"])
    story.append(Spacer(1, 8 * mm))

    if data.get("kampagnen"):
        story += section("Kampagnen-Status")
        story += kampagnen_table(data["kampagnen"])
        story.append(Spacer(1, 6 * mm))

    if data.get("schwerpunkt"):
        story += schwerpunkt_block(data["schwerpunkt"])
        story.append(Spacer(1, 8 * mm))

    for a in data.get("abschnitte", []):
        block = [Paragraph(esc(a["titel"]), S["h2"]), Spacer(1, 3 * mm)]
        if a.get("text"):
            block.append(Paragraph(esc(a["text"]), S["body"]))
        if a.get("punkte"):
            block.append(bullets(a["punkte"]))
        story.append(KeepTogether(block))
        story.append(Spacer(1, 8 * mm))

    if data.get("naechste_schritte"):
        story.append(KeepTogether(section("Nächste Schritte")[1:] + schritte_table(data["naechste_schritte"])))

    doc.build(story)


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1])
    data = json.loads(src.read_text(encoding="utf-8"))
    if len(sys.argv) > 2:
        out = Path(sys.argv[2])
    else:
        von, bis = (date.fromisoformat(data["zeitraum"][k]) for k in ("von", "bis"))
        name = f"{data['typ']}_{data['kunde'].replace(' ', '_')}_{von:%d}-{bis:%d-%m-%Y}.pdf"
        out = ROOT / "out" / name
    out.parent.mkdir(parents=True, exist_ok=True)
    build(data, out)
    print(out)


if __name__ == "__main__":
    main()
