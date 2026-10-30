import { Clapperboard, MessageSquareMore, LineChart, LucideIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { GlowOrbs } from "../ui/GlowOrbs";

type Step = {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    icon: Clapperboard,
    number: "01",
    title: "Kurzvideos, die Vertrauen aufbauen",
    description:
      "Reels und Shorts, die zeigen, wer du bist und wie du arbeitest. Interessenten kennen dich, bevor sie anfragen.",
  },
  {
    icon: MessageSquareMore,
    number: "02",
    title: "Ein Anfrage-System, das mitarbeitet",
    description:
      "Automatische Antworten per DM und Chat, Vorqualifizierung und direkte Terminbuchung, auch nach Feierabend.",
  },
  {
    icon: LineChart,
    number: "03",
    title: "Messen und gezielt verstärken",
    description:
      "Monatliches Reporting zu Anfragen und Terminen. Läuft es, verstärken wir gezielt mit Meta-Ads.",
  },
];

export function Services() {
  return (
    <section id="system" className="relative overflow-hidden py-16 lg:py-20">
      <GlowOrbs preset="services" />
      <Container className="relative flex flex-col gap-10">
        <SectionHeading
          eyebrow="Das System"
          title="Reichweite allein bringt keine Termine."
          description="Die meisten haben kein Sichtbarkeits-, sondern ein Anfrage-Problem. Deshalb baue ich Content und Anfrage-System zusammen, aus einer Hand."
        />

        <ol className="grid gap-4 lg:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.number} className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-navy-900/60 p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong bg-navy-800 text-accent-strong">
                  <step.icon size={18} />
                </span>
                <span className="text-xs font-semibold text-muted">{step.number}</span>
              </div>
              <h3 className="text-lg font-semibold leading-snug text-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
