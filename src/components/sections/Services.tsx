import { UserRound, Target, MessageCircleHeart, LucideIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

type Point = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const POINTS: Point[] = [
  {
    icon: UserRound,
    title: "Ein fester Ansprechpartner",
    description:
      "Du sprichst immer mit mir. Ich kenne dein Unternehmen und bin direkt erreichbar, ohne Ticketsystem und Weiterleiten.",
  },
  {
    icon: Target,
    title: "Ziel sind Anfragen, nicht Likes",
    description:
      "Jeder Beitrag hat einen klaren nächsten Schritt: anrufen, schreiben oder einen Termin buchen.",
  },
  {
    icon: MessageCircleHeart,
    title: "Ehrlich, auch wenn es unbequem ist",
    description:
      "Wir schauen jeden Monat gemeinsam auf echte Zahlen. Funktioniert etwas nicht, sage ich es, und wir ändern es.",
  },
];

const PROCESS = [
  { title: "Erstgespräch", text: "Kostenlos und unverbindlich. Wir klären, ob es passt." },
  { title: "Strategie", text: "Ziele, Zielgruppe und ein Plan für Content und Anzeigen." },
  { title: "Umsetzung", text: "Ich produziere, veröffentliche und betreue die Kampagnen." },
  { title: "Auswertung", text: "Jeden Monat gemeinsam auf Anfragen und Zahlen schauen." },
];

export function Services() {
  return (
    <section id="arbeitsweise" className="py-16 lg:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="Arbeitsweise" title="Drei Dinge, auf die du dich verlassen kannst." />

        <ul className="grid gap-4 lg:grid-cols-3">
          {POINTS.map((p) => (
            <li key={p.title} className="soft-shadow flex flex-col gap-3 rounded-2xl border border-line bg-white p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong bg-navy-800 text-accent-strong">
                <p.icon size={18} />
              </span>
              <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{p.description}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5">
          <h3 className="text-center text-sm font-medium tracking-wide text-accent-strong uppercase">So läuft die Zusammenarbeit ab</h3>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-xs font-semibold text-ink">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{step.title}</p>
                  <p className="text-sm leading-snug text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
