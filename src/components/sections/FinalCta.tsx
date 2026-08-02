import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";
import { GlowOrbs } from "../ui/GlowOrbs";
import { CALENDLY_URL } from "@/lib/content";

export function FinalCta() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <FadeIn className="relative overflow-hidden rounded-3xl border border-line-strong bg-navy-900 px-8 py-20 text-center sm:px-16">
          <GlowOrbs preset="cta" />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="text-balance max-w-2xl text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.15] tracking-tight text-ink">
              Lass uns über dein Wachstum sprechen.
            </h2>
            <p className="max-w-xl text-balance text-lg leading-relaxed text-muted">
              In einem kurzen, kostenlosen Gespräch schauen wir, ob und wie
              ich dir helfen kann.
            </p>
            <Button href={CALENDLY_URL} external className="mt-2">
              Kostenloses Strategiegespräch buchen
              <ArrowRight size={16} />
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
