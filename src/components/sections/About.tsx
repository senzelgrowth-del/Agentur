import { Check } from "lucide-react";
import { Container } from "../ui/Container";

const PROMISES = [
  "Ein fester Ansprechpartner: Du sprichst immer mit mir.",
  "Ziel sind Anfragen, nicht Likes.",
  "Ehrliche Zahlen jeden Monat, auch wenn sie unbequem sind.",
];

const PROCESS = [
  { title: "Erstgespräch", text: "Kostenlos und unverbindlich. Wir klären, ob es passt." },
  { title: "Strategie", text: "Ziele, Zielgruppe und ein Plan für Content und Anzeigen." },
  { title: "Umsetzung", text: "Ich produziere, veröffentliche und betreue die Kampagnen." },
  { title: "Auswertung", text: "Jeden Monat gemeinsam auf Anfragen und Zahlen schauen." },
];

export function About() {
  return (
    <section id="ueber-mich" className="py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium tracking-wide text-accent-strong uppercase">Über mich</span>
          <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl">
            Du arbeitest direkt mit <span className="accent-serif text-[1.1em] text-[#163a6b]">mir</span> zusammen.
          </h2>
          <p className="text-lg leading-relaxed text-muted">
            Ich bin Celvin. Content mache ich seit über fünf Jahren, SenzelGrowth gibt es seit 2024. Ich
            habe selbst Kanäle aufgebaut, bevor ich anfing, anderen dabei zu helfen, und betreue jedes
            Projekt persönlich.
          </p>
          <ul className="flex flex-col gap-3">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-start gap-3 text-base text-ink">
                <Check size={18} className="mt-0.5 shrink-0 text-teal" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="font-mono text-sm text-muted">So läuft die Zusammenarbeit ab</h3>
          <ol className="flex flex-col">
            {PROCESS.map((step, i) => (
              <li key={step.title} className="flex gap-5 border-t border-line py-5 last:border-b">
                <span className="accent-serif w-8 shrink-0 text-3xl leading-none text-[#163a6b]">{i + 1}</span>
                <div>
                  <p className="font-semibold text-ink">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
