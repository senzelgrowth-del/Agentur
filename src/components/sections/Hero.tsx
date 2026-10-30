import { ArrowRight, Check } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";
import { GlowOrbs } from "../ui/GlowOrbs";
import { CALENDLY_URL } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_20%,transparent_80%)]" />
      <GlowOrbs preset="hero" />

      <Container className="relative flex flex-col items-center gap-8 text-center">
        <FadeIn>
          <span className="inline-flex items-center rounded-full border border-line-strong px-4 py-1.5 text-sm text-muted-strong">
            Für Selbständige & Dienstleister, die über ein Erstgespräch verkaufen
          </span>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="text-balance max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Aus Reichweite werden gebuchte Erstgespräche.
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="max-w-xl text-balance text-lg leading-relaxed text-muted">
            Ich verbinde Kurzvideos mit einem Anfrage-System, das Interessenten
            automatisch bis zum Termin führt. Alles aus einer Hand, ohne dass du
            Technik, Agentur und Freelancer koordinieren musst.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="flex flex-col gap-4 sm:flex-row">
          <Button href={CALENDLY_URL} external>
            Kostenloses Erstgespräch
            <ArrowRight size={16} />
          </Button>
          <Button href="#portfolio" variant="secondary">
            Portfolio ansehen
          </Button>
        </FadeIn>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-strong">
          {["Alles aus einer Hand", "Persönlicher Ansprechpartner", "Monatliches Reporting"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check size={15} className="text-teal" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
