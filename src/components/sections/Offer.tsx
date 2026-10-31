import { ArrowRight, CalendarDays, Clapperboard, Images, Megaphone, Target, LineChart, LucideIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { CALENDLY_URL } from "@/lib/content";

type Service = {
  name: string;
  claim: string;
  tiles: { icon: LucideIcon; label: string }[];
  fit: string;
};

const SERVICES: Service[] = [
  {
    name: "Content Creation",
    claim: "Professionell und regelmäßig präsent auf Social Media, ohne dass du Stunden investierst.",
    tiles: [
      { icon: CalendarDays, label: "Strategie & Redaktionsplan" },
      { icon: Clapperboard, label: "Reels & Kurzvideos" },
      { icon: Images, label: "Posts & Markenauftritt" },
    ],
    fit: "Für alle, die sichtbar sein wollen, aber keine Zeit dafür haben.",
  },
  {
    name: "Performance Marketing",
    claim: "Mit Meta Ads die richtigen Menschen erreichen und planbar Anfragen gewinnen.",
    tiles: [
      { icon: Megaphone, label: "Meta Ads" },
      { icon: Target, label: "Zielgruppen & Leads" },
      { icon: LineChart, label: "Optimierung & Auswertung" },
    ],
    fit: "Für alle, die wissen wollen, was ihr Werbebudget wirklich bringt.",
  },
];

export function Offer() {
  return (
    <section id="leistungen" className="py-20 lg:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Leistungen"
          title="Zwei Leistungen, ein Ziel: mehr Anfragen."
          description="Einzeln buchbar, am stärksten kombiniert: Content baut Vertrauen auf, Werbeanzeigen bringen ihn zu den richtigen Menschen."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {SERVICES.map((s) => (
            <article
              key={s.name}
              className="theme-dark flex flex-col gap-8 rounded-[2rem] border border-line-strong bg-[#0a0e1a] p-8 shadow-[0_24px_60px_-30px_rgba(10,14,26,0.6)] sm:p-10"
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-3xl font-semibold tracking-tight text-ink">{s.name}</h3>
                <p className="text-base leading-relaxed text-muted">{s.claim}</p>
              </div>
              <ul className="grid grid-cols-3 gap-3">
                {s.tiles.map((t) => (
                  <li key={t.label} className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white/[0.03] px-2 py-5 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] text-accent-strong">
                      <t.icon size={20} />
                    </span>
                    <span className="text-xs font-medium leading-snug text-ink sm:text-sm">{t.label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">{s.fit}</p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline"
                >
                  Anfragen <ArrowRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-muted">
          <span className="font-medium text-ink">Optional dazu: KI-Automatisierung.</span> Zum Beispiel ein
          Chatbot, der Anfragen auch nach Feierabend beantwortet. Nur, wenn es für dich wirklich sinnvoll ist.
        </p>
      </Container>
    </section>
  );
}
