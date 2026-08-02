import { Film, Megaphone, Bot, ChevronRight, LucideIcon } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { FadeIn } from "../ui/FadeIn";
import { GlowOrbs } from "../ui/GlowOrbs";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
};

const SERVICES: Service[] = [
  {
    icon: Film,
    title: "Content",
    description: "Reels, Shorts und Longform, organisch oder mit Ads gepusht.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description: "Kampagnen auf Meta und Google für lokale Unternehmen und Selbständige.",
  },
  {
    icon: Bot,
    title: "KI-Automatisierung",
    description: "Ein Chatbot, der Anfragen sofort beantwortet, auch nachts.",
    badge: "Extra",
  },
];

const STEPS = [
  { number: "01", title: "Kennenlernen", description: "Kurzes, kostenloses Gespräch." },
  { number: "02", title: "Strategie", description: "Ein Plan für dein Unternehmen." },
  { number: "03", title: "Umsetzung", description: "Kampagnen gehen live." },
  { number: "04", title: "Reporting", description: "Monatliches Review der Ergebnisse." },
];

export function Services() {
  return (
    <section id="leistungen" className="relative overflow-hidden py-16 lg:py-20">
      <GlowOrbs preset="services" />
      <Container className="relative flex flex-col gap-10">
        <SectionHeading
          eyebrow="Leistungen"
          title="Was ich mache."
          description="Content und Marketing sind die Basis. KI-Automatisierung kommt als Extra dazu, wenn sie wirklich hilft."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.05}>
              <div className="group h-full rounded-xl border border-line bg-navy-900/60 p-6 transition-colors duration-300 hover:border-line-strong hover:bg-navy-900">
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-navy-800 text-accent-strong">
                    <service.icon size={17} />
                  </span>
                  <h3 className="text-base font-semibold text-ink">{service.title}</h3>
                  {service.badge && (
                    <span className="ml-auto shrink-0 rounded-full border border-line-strong px-2 py-0.5 text-[11px] font-medium text-accent-strong">
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-snug text-muted">{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <FadeIn className="flex items-center gap-3">
            <span className="shrink-0 text-xs font-medium tracking-wide text-accent-strong uppercase">
              Ablauf
            </span>
            <span className="h-px flex-1 bg-line" />
          </FadeIn>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {STEPS.map((step, i) => (
              <FadeIn
                key={step.number}
                delay={i * 0.05}
                className="flex flex-1 items-start gap-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong bg-navy-900 text-xs font-semibold text-accent-strong">
                  {step.number}
                </span>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm font-semibold text-ink">{step.title}</h4>
                  <p className="text-xs leading-snug text-muted">{step.description}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <ChevronRight
                    size={16}
                    className="mt-1 hidden shrink-0 text-line-strong sm:block"
                  />
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
