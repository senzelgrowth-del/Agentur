import { Layers } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const SCOPE = ["Content-Strategie", "Redaktionsplan", "Posts & Captions", "Reels", "Facebook & Instagram"];

export function References() {
  return (
    <section id="referenz" className="py-20 lg:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Referenz"
          title="Mit wem ich zusammenarbeite."
          description="Vertrauen entsteht durch echte Zusammenarbeit, nicht durch große Zahlen."
        />

        <div className="mx-auto grid w-full max-w-4xl gap-10 rounded-3xl border border-line-strong bg-navy-900/60 p-8 sm:p-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-teal">
              Laufende Zusammenarbeit
            </span>
            <h3 className="text-3xl font-semibold tracking-tight text-ink">YourMindz Health</h3>
            <p className="text-sm leading-relaxed text-muted">
              Mehrsprachige psychologische Beratung für Expats und internationale Familien.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <Layers size={22} className="mt-1 shrink-0 text-accent-strong" />
              <p className="text-lg leading-relaxed text-muted-strong">
                Für YourMindz Health entwickle ich den kompletten Social-Media-Auftritt: von der
                Positionierung über den Redaktionsplan bis zu fertigen Posts, Captions und kurzen
                Reels, die Vertrauen aufbauen und zum Erstgespräch führen.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {SCOPE.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted-strong"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
