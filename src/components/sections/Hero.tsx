import { ArrowRight } from "lucide-react";
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
            Content & Marketing für lokale Unternehmen und Selbständige
          </span>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="text-balance max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Content und Marketing, das dir neue Kunden bringt.
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="max-w-xl text-balance text-lg leading-relaxed text-muted">
            Organisch oder bezahlt, kurze Clips oder lange Videos: Ich baue
            Content und Kampagnen, die zu deinem Unternehmen passen.
            KI-Automatisierung kommt dazu, wo sie wirklich Zeit spart.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="flex flex-col gap-4 sm:flex-row">
          <Button href={CALENDLY_URL} external>
            Kostenloses Strategiegespräch
            <ArrowRight size={16} />
          </Button>
          <Button href="#ergebnisse" variant="secondary">
            Ergebnisse ansehen
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
