import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { STARSHINE } from "@/lib/cases";

export function CaseTeaser() {
  const q = STARSHINE.quote;
  return (
    <section id="ergebnisse" className="py-20 lg:py-28">
      <Container>
        <div className="theme-dark relative overflow-hidden rounded-[2rem] border border-line-strong bg-[#0a0e1a] px-6 py-14 sm:px-12 lg:px-20 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-48 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(110,168,254,0.16) 0%, rgba(110,168,254,0) 65%)" }}
          />
          <div className="relative flex flex-col gap-14">
            <figure className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
              <blockquote className="text-balance text-2xl leading-snug text-muted-strong sm:text-[2rem] sm:leading-snug">
                „Ich muss wirklich immer wieder sagen: Es macht{" "}
                <span className="accent-font text-ink">richtig Spaß</span>, mit Dir
                zusammenzuarbeiten. […] Vielen Dank für die{" "}
                <span className="accent-font text-ink">großartige Zusammenarbeit</span>.“
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-white/5 text-lg font-semibold text-ink">
                  M
                </span>
                <span className="text-left">
                  <span className="block font-medium text-ink">{q.author}</span>
                  <span className="block text-sm text-muted">{STARSHINE.name}, {STARSHINE.industry}</span>
                </span>
              </figcaption>
            </figure>

            <dl className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-12">
              {STARSHINE.stats.map((p) => (
                <div key={p.label} className="flex flex-col items-center gap-2 text-center">
                  <dt className="sr-only">{p.label}</dt>
                  <dd className="bg-gradient-to-b from-white to-[#8fa3c7] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                    {p.value}
                  </dd>
                  <dd className="text-sm text-muted">{p.label}</dd>
                </div>
              ))}
            </dl>

            <div className="flex justify-center">
              <Link
                href={`/referenzen/${STARSHINE.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-navy-950 transition-colors hover:bg-accent-strong"
              >
                Case Study Starshine Emotions ansehen <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
