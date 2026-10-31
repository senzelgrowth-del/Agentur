import { ArrowRight, Check } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { CALENDLY_URL } from "@/lib/content";

const SERVICES = [
  {
    name: "Content Creation",
    claim: "Professionell und regelmäßig präsent auf Social Media.",
    problem: "Du weißt, dass du posten solltest, aber dir fehlen Zeit, Plan und Ideen.",
    items: [
      "Content-Strategie und Redaktionsplan",
      "Reels, Kurzvideos und Posts",
      "Konzeption, Schnitt und Veröffentlichung",
      "Einheitlicher Markenauftritt",
    ],
    fit: "Für Selbstständige und kleine Unternehmen, die sichtbar sein wollen, ohne selbst Stunden in Social Media zu stecken.",
  },
  {
    name: "Performance Marketing",
    claim: "Die richtigen Menschen erreichen und Anfragen gewinnen.",
    problem: "Deine Inhalte sind gut, aber es kommen zu wenige Anfragen.",
    items: [
      "Meta Ads auf Facebook und Instagram",
      "Zielgruppen- und Kampagnenstrategie",
      "Leadgenerierung",
      "Laufende Optimierung und Auswertung",
    ],
    fit: "Für Unternehmen, die planbar neue Anfragen gewinnen wollen und wissen möchten, was ihr Werbebudget bringt.",
  },
];

export function Offer() {
  return (
    <section id="leistungen" className="theme-light py-20 lg:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Leistungen"
          title="Zwei Leistungen, ein Ziel: mehr Anfragen."
          description="Einzeln buchbar, am stärksten kombiniert: Content baut Vertrauen auf, Werbeanzeigen bringen ihn zu den richtigen Menschen."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {SERVICES.map((s) => (
            <article key={s.name} className="soft-shadow flex flex-col gap-6 rounded-3xl border border-line bg-white p-8 sm:p-10">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold tracking-tight text-ink">{s.name}</h3>
                <p className="text-lg leading-snug text-muted-strong">{s.claim}</p>
              </div>
              <p className="rounded-xl bg-navy-800 px-4 py-3 text-sm leading-relaxed text-muted">
                <span className="font-medium text-ink">Das Problem: </span>
                {s.problem}
              </p>
              <ul className="flex flex-col gap-3">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-ink">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent-strong" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-line pt-5 text-sm leading-relaxed text-muted">{s.fit}</p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline"
              >
                {s.name} anfragen <ArrowRight size={15} />
              </a>
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
