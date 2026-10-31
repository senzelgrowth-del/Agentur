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

        <p className="text-center text-sm text-muted">
          Kern meiner Arbeit sind Kurzvideos und Posts. Auf Wunsch kommen Werbeanzeigen oder
          automatische Antworten auf Anfragen dazu.
        </p>
      </Container>
    </section>
  );
}
