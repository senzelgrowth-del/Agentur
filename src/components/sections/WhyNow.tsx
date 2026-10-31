import { Container } from "../ui/Container";

const STEPS = ["Braucht deine Leistung", "Sucht dich online", "Entscheidet sich"];

export function WhyNow() {
  return (
    <section id="warum" className="theme-light py-20 lg:py-28">
      <Container className="flex flex-col items-center gap-12 text-center">
        <div className="flex max-w-2xl flex-col gap-5">
          <span className="text-sm font-medium tracking-wide text-accent-strong uppercase">Warum jetzt</span>
          <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            Warum Social Media heute ein Muss ist.
          </h2>
          <p className="text-balance text-lg leading-relaxed text-muted">
            Bevor jemand anfragt, schaut er dich online an. Was er dort findet, entscheidet, ob er
            sich bei dir meldet oder beim Nächsten.
          </p>
        </div>

        {/* the customer's path, reduced to three words each */}
        <ol className="grid w-full max-w-3xl grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step} className="relative flex flex-col items-center gap-3 px-2">
              {i > 0 && <span className="absolute right-1/2 top-[7px] h-px w-full bg-line-strong" />}
              <span className="relative z-10 h-[15px] w-[15px] rounded-full border-2 border-ink bg-white" />
              <span className="text-sm font-medium text-ink sm:text-base">{step}</span>
            </li>
          ))}
        </ol>

        <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
          <div className="soft-shadow rounded-2xl border border-line bg-white p-6 text-left">
            <span className="text-xs font-medium tracking-wide text-teal uppercase">Mit Social Media</span>
            <p className="mt-2 text-lg leading-snug text-ink">Er sieht, wer du bist, fasst Vertrauen und fragt bei dir an.</p>
          </div>
          <div className="rounded-2xl border border-line p-6 text-left">
            <span className="text-xs font-medium tracking-wide text-muted uppercase">Ohne</span>
            <p className="mt-2 text-lg leading-snug text-muted">Er findet nichts und fragt beim Nächsten an, auch wenn du besser bist.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
