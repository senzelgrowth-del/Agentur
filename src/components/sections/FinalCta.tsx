import { ArrowRight, Mail } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { GlowOrbs } from "../ui/GlowOrbs";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/content";

export function FinalCta() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="theme-dark relative overflow-hidden rounded-3xl border border-line-strong bg-navy-900 px-8 py-20 text-center sm:px-16">
          <GlowOrbs preset="cta" />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="text-balance max-w-2xl text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              Noch Fragen?
            </h2>
            <p className="max-w-xl text-balance text-lg leading-relaxed text-muted">
              Schreib mir einfach. Ich antworte dir persönlich, ohne Verkaufsdruck.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button href={`mailto:${CONTACT_EMAIL}?subject=Frage%20an%20SenzelGrowth`}>
                <Mail size={16} />
                Frage stellen
              </Button>
              <Button href={CALENDLY_URL} external variant="secondary">
                Erstgespräch buchen
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
