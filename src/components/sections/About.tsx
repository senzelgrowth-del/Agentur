import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "../ui/Container";

const PROMISES = [
  "Ein fester Ansprechpartner: Du sprichst immer mit mir.",
  "Ziel sind Anfragen, nicht Likes.",
  "Ehrliche Zahlen jeden Monat, auch wenn sie unbequem sind.",
];

const PROCESS = [
  { title: "Erstgespräch", text: "Kostenlos und unverbindlich." },
  { title: "Strategie", text: "Ziele, Zielgruppe, Plan." },
  { title: "Umsetzung", text: "Content und Kampagnen." },
  { title: "Auswertung", text: "Monatlich, gemeinsam." },
];

export function About() {
  return (
    <section id="ueber-mich" className="py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="soft-shadow relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl border border-line">
          <Image
            src="/celvin-portrait.jpg"
            alt="Celvin Senzel, Gründer von SenzelGrowth"
            fill
            sizes="(min-width: 1024px) 24rem, 90vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-medium tracking-wide text-accent-strong uppercase">Über mich</span>
            <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl">
              Hi, ich bin Celvin.
            </h2>
            <p className="text-lg leading-relaxed text-muted">
              Content mache ich seit über fünf Jahren, SenzelGrowth gibt es seit 2024. Ich habe selbst
              Kanäle aufgebaut, bevor ich anfing, anderen dabei zu helfen. Jedes Projekt betreue ich
              persönlich, von der ersten Idee bis zur Auswertung.
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-start gap-3 text-base text-ink">
                <Check size={18} className="mt-0.5 shrink-0 text-teal" />
                {p}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 border-t border-line pt-6">
            <h3 className="text-sm font-medium tracking-wide text-accent-strong uppercase">So läuft die Zusammenarbeit ab</h3>
            <ol className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {PROCESS.map((step, i) => (
                <li key={step.title} className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-muted">0{i + 1}</span>
                  <span className="text-sm font-semibold text-ink">{step.title}</span>
                  <span className="text-sm leading-snug text-muted">{step.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
