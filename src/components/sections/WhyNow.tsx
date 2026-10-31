import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const JOURNEY = [
  "Jemand braucht genau das, was du anbietest.",
  "Er googelt deinen Namen und schaut auf Instagram vorbei.",
  "Er sieht, wer du bist und wie du arbeitest, bevor er dich je gesprochen hat.",
];

export function WhyNow() {
  return (
    <section id="warum" className="py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            eyebrow="Warum jetzt"
            title="Die Entscheidung fällt, bevor du davon erfährst."
            description="Empfehlungen und ein guter Ruf bleiben wichtig. Aber ob jemand wirklich anfragt, entscheidet sich heute meist online, in wenigen Sekunden."
          />
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Dazu kommt: Kurzvideos werden auch Menschen gezeigt, die dich noch nicht kennen.
            Kein anderes Format bringt dich so günstig zu neuen Kunden.
          </p>
        </div>

        <ol className="relative flex flex-col gap-8 border-l border-line-strong pl-8">
          {JOURNEY.map((step, i) => (
            <li key={step} className="relative">
              <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full border border-line-strong bg-navy-800" />
              <span className="text-xs font-medium text-muted">Schritt {i + 1}</span>
              <p className="mt-1 text-lg leading-snug text-ink">{step}</p>
            </li>
          ))}

          <li className="relative">
            <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full bg-teal shadow-[0_0_14px_rgba(94,234,212,0.7)]" />
            <span className="text-xs font-medium text-muted">Dann gibt es zwei Möglichkeiten</span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <p className="rounded-2xl border border-teal/40 bg-teal/5 p-4 text-base leading-snug text-ink">
                Er findet dich, fasst Vertrauen und <span className="text-teal">fragt bei dir an.</span>
              </p>
              <p className="rounded-2xl border border-line p-4 text-base leading-snug text-muted">
                Er findet nichts und fragt beim Nächsten an. Auch wenn du eigentlich besser bist.
              </p>
            </div>
          </li>
        </ol>
      </Container>
    </section>
  );
}
