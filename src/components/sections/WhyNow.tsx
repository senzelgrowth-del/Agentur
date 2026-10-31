import { Search, HeartHandshake, Megaphone, Users } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const REASONS = [
  {
    icon: Search,
    title: "Kunden schauen dich an, bevor sie anfragen",
    description:
      "Bevor jemand anruft oder bucht, wird gegoogelt und auf Instagram nachgesehen. Wer dort nichts findet, fragt beim Nächsten an.",
  },
  {
    icon: HeartHandshake,
    title: "Vertrauen entsteht vor dem ersten Gespräch",
    description:
      "In Kurzvideos sehen Interessenten, wer du bist und wie du arbeitest. Das erste Gespräch beginnt dann nicht bei null.",
  },
  {
    icon: Megaphone,
    title: "Reichweite ohne großes Werbebudget",
    description:
      "Kurzvideos werden auch Menschen gezeigt, die dir noch nicht folgen. Kein anderes Format bringt dich so günstig zu neuen Leuten.",
  },
  {
    icon: Users,
    title: "Deine Mitbewerber sind schon da",
    description:
      "Wer heute nicht sichtbar ist, überlässt die Aufmerksamkeit anderen. Auch dann, wenn er eigentlich besser ist.",
  },
];

export function WhyNow() {
  return (
    <section id="warum" className="py-16 lg:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Warum jetzt"
          title="Ohne Social Media geht es heute nicht mehr."
          description="Empfehlungen und ein guter Ruf bleiben wichtig. Aber die Entscheidung, ob jemand anfragt, fällt immer öfter online."
        />

        <ul className="grid gap-4 sm:grid-cols-2">
          {REASONS.map((r) => (
            <li key={r.title} className="flex gap-4 rounded-2xl border border-line bg-navy-900/60 p-6">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-navy-800 text-accent-strong">
                <r.icon size={18} />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-ink">{r.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{r.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
