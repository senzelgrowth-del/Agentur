import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";
import { GlowOrbs } from "../ui/GlowOrbs";
import { CALENDLY_URL, PROOF } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_20%,transparent_80%)]" />
      <GlowOrbs preset="hero" />

      <Container className="relative flex flex-col items-center gap-8 text-center">
        <span className="inline-flex items-center rounded-full border border-line-strong bg-white px-4 py-1.5 text-sm text-muted-strong">
          Content Creation &amp; Performance Marketing
        </span>
        <FadeIn delay={0.05}>
          <h1 className="text-balance max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Social-Media-Content und Werbeanzeigen, die Anfragen bringen.
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="max-w-xl text-balance text-lg leading-relaxed text-muted">
            Für Selbstständige und kleine Unternehmen: Ich erstelle deine Reels
            und Posts und sorge mit Meta Ads dafür, dass sie die richtigen
            Menschen erreichen. Persönlich betreut, mit ehrlicher Auswertung
            jeden Monat.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="flex flex-col gap-4 sm:flex-row">
          <Button href={CALENDLY_URL} external>
            Erstgespräch vereinbaren
            <ArrowRight size={16} />
          </Button>
          <Button href="#ergebnisse" variant="secondary">
            Ergebnisse ansehen
          </Button>
        </FadeIn>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-strong">
          {["Ein fester Ansprechpartner", "Erstgespräch kostenlos & unverbindlich"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check size={15} className="text-teal" />
              {item}
            </li>
          ))}
        </ul>

        <dl className="mt-4 grid w-full max-w-3xl grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-white/70 py-5 soft-shadow">
          {PROOF.map((p) => (
            <div key={p.label} className="flex flex-col items-center gap-1 px-2">
              <dt className="sr-only">{p.label}</dt>
              <dd className="whitespace-nowrap text-xl font-semibold tracking-tight text-ink sm:text-4xl">{p.value}</dd>
              <dd className="text-center text-xs leading-snug text-muted sm:text-sm">{p.label}</dd>
            </div>
          ))}
        </dl>
        <Link href="/referenzen/starshine-emotions" className="-mt-4 inline-flex items-center gap-1.5 text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
          Wie die 500+ Leads entstanden sind <ArrowRight size={14} />
        </Link>
      </Container>
    </section>
  );
}
