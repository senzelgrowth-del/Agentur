import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { STARSHINE } from "@/lib/cases";

export function CaseTeaser() {
  const q = STARSHINE.quote;
  const [before, after] = q.text.split(q.highlight);
  return (
    <section id="ergebnisse" className="py-20 lg:py-28">
      <Container>
        <div className="theme-dark relative overflow-hidden rounded-3xl border border-line-strong bg-navy-900 px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(110,168,254,0.18) 0%, rgba(110,168,254,0) 65%)" }}
          />
          <div className="relative flex flex-col gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="text-sm font-medium tracking-wide text-accent-strong uppercase">Case Study</span>
              <h2 className="text-balance max-w-2xl text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl">
                {STARSHINE.name}: {STARSHINE.stats[0].value} Leads für ein Reisebüro aus {STARSHINE.location}.
              </h2>
              <p className="text-balance max-w-xl text-lg leading-relaxed text-muted">
                Content Creation, Meta Ads und laufende Optimierung aus einer Hand.
              </p>
            </div>

            <dl className="mx-auto grid w-full max-w-2xl gap-4 sm:grid-cols-2">
              {STARSHINE.stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-line bg-white/[0.03] px-6 py-8 text-center">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-5xl font-semibold tracking-tight text-ink sm:text-6xl">{s.value}</dd>
                  <dd className="mt-2 text-sm text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>

            <figure className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
              <blockquote className="text-balance text-xl leading-relaxed text-muted sm:text-2xl">
                „{before}
                <span className="text-ink">{q.highlight}</span>
                {after}“
              </blockquote>
              <figcaption className="text-sm text-muted">
                <span className="font-medium text-ink">{q.author}</span> · {q.role}
              </figcaption>
            </figure>

            <div className="flex justify-center">
              <Link
                href={`/referenzen/${STARSHINE.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-navy-950 transition-colors hover:bg-accent-strong"
              >
                Ganze Case Study ansehen <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
