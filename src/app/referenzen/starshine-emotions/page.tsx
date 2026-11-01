import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/sections/FinalCta";
import { ReelPlayer } from "@/components/ui/ReelPlayer";
import { STARSHINE } from "@/lib/cases";

const title = "Case Study Starshine Emotions: 500+ Leads für ein Reisebüro";
const description =
  "Wie SenzelGrowth mit Content Creation, Meta Ads und laufender Kampagnenoptimierung über 500 Leads für das Reisebüro Starshine Emotions aus Erfurt generiert hat.";

export const metadata: Metadata = {
  title: `${title} | SenzelGrowth`,
  description,
  alternates: { canonical: `/referenzen/${STARSHINE.slug}` },
  openGraph: { title, description, url: `/referenzen/${STARSHINE.slug}`, type: "article", images: ["/opengraph-image.jpg"] },
};

export default function StarshineCase() {
  const s = STARSHINE;
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 lg:pt-40">
        <Container className="flex flex-col gap-16 lg:gap-20">
          <div className="flex flex-col gap-6">
            <Link href="/#ergebnisse" className="inline-flex w-fit items-center gap-2 text-sm text-muted hover:text-ink">
              <ArrowLeft size={15} /> Zurück zur Startseite
            </Link>
            <span className="text-sm font-medium tracking-wide text-accent-strong uppercase">Case Study</span>
            <h1 className="text-balance max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              {s.name}: {s.stats[0].value} Leads für ein Reisebüro aus {s.location}.
            </h1>
            <p className="text-sm text-muted">
              {s.industry} · {s.location} · Content Creation, Meta Ads, Chatbot
            </p>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {s.stats.map((st) => (
              <div key={st.label} className="theme-dark rounded-3xl border border-line-strong bg-navy-900 px-8 py-10">
                <dt className="sr-only">{st.label}</dt>
                <dd className="text-5xl font-semibold tracking-tight text-ink sm:text-6xl">{st.value}</dd>
                <dd className="mt-2 text-sm text-muted">{st.label}</dd>
              </div>
            ))}
          </dl>

          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Ausgangssituation</h2>
              <p className="text-lg leading-relaxed text-muted">{s.challenge}</p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Umsetzung</h2>
              <ul className="flex flex-col gap-5">
                {s.work.map((w) => (
                  <li key={w.title} className="flex gap-3">
                    <Check size={18} className="mt-1 shrink-0 text-accent-strong" />
                    <div>
                      <h3 className="font-semibold text-ink">{w.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{w.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="theme-light grid gap-10 rounded-3xl border border-line p-6 sm:p-10 lg:grid-cols-[14rem_1fr] lg:items-center">
            <div className="mx-auto w-full max-w-[14rem]">
              <ReelPlayer src={s.reel.src} poster={s.reel.poster} label={s.name} />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold tracking-tight text-ink">Ergebnis</h2>
              <p className="text-lg leading-relaxed text-muted">
                Insgesamt <span className="font-semibold text-ink">{s.stats[0].value} Leads</span> für Reisen und
                Events, bei durchschnittlich <span className="font-semibold text-ink">{s.stats[1].value}</span> pro
                Lead in den dokumentierten Meta-Kampagnen.
              </p>
              <figure className="flex flex-col gap-3 border-l-2 border-accent-strong pl-5">
                <blockquote className="text-lg leading-relaxed text-ink">„{s.quote.text}“</blockquote>
                <figcaption className="text-sm text-muted">
                  <span className="font-medium text-ink">{s.quote.author}</span> · {s.quote.role}
                </figcaption>
              </figure>
            </div>
          </section>
        </Container>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
