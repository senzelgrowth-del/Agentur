import { Check } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";
import { GlowOrbs } from "../ui/GlowOrbs";
import { CALENDLY_URL } from "@/lib/content";

const PACKAGES = [
  {
    name: "Starter",
    audience: "Für den Einstieg: ein Kanal, regelmäßig und professionell bespielt.",
    price: "ab 400 €",
    unit: "pro Monat, individuell anpassbar",
    features: [
      "Grundlegende Content-Erstellung (Videos, Posts, Stories)",
      "Monatliche Planung & Strategie",
      "1 Social-Media-Kanal",
      "Monatliches Performance-Review",
      "Direkter E-Mail-Kontakt",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    audience: "Für mehr Präsenz: zwei Kanäle, Community und wöchentlicher Austausch.",
    price: "ab 700 €",
    unit: "pro Monat, individuell anpassbar",
    features: [
      "Erweiterter Content (Videos, Posts, Stories, Reels)",
      "Community Management",
      "Performance-Analyse & Reporting",
      "Bis zu 2 Kanäle",
      "Wöchentlicher Check-in Call",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    audience: "Content und Werbeanzeigen komplett aus einer Hand.",
    price: "ab 1.200 €",
    unit: "pro Monat, individuell anpassbar",
    features: [
      "Full-Service Content Management",
      "Ads Management (Meta, TikTok)",
      "Optional: automatische Antworten auf Anfragen",
      "Monatliches Reporting & Strategie-Call",
      "Persönlicher Ansprechpartner",
      "Priorität-Support, Antwort meist unter 2 Stunden",
    ],
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pakete" className="relative overflow-hidden py-20 lg:py-28">
      <GlowOrbs preset="pricing" />
      <Container className="relative flex flex-col gap-14">
        <SectionHeading
          eyebrow="Pakete"
          title="Keine Festpreise, sondern passende Pakete."
          description="Jedes Paket ist ein Ausgangspunkt. Der Umfang wird an dein Unternehmen und deine Ziele angepasst."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 0.05}>
              <div
                className={`flex h-full flex-col gap-6 rounded-2xl border p-8 ${
                  pkg.highlight
                    ? "theme-dark border-line-strong bg-navy-900 shadow-[0_25px_70px_-25px_rgba(10,14,26,0.55)]"
                    : "soft-shadow border-line bg-white"
                }`}
              >
                {pkg.highlight && (
                  <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-accent-strong">
                    Empfehlung
                  </span>
                )}
                <div>
                  <h3 className={`text-lg font-semibold text-ink`}>
                    {pkg.name}
                  </h3>
                  <p
                    className={`mt-2 text-3xl font-semibold tracking-tight ${
                      "text-ink"
                    }`}
                  >
                    {pkg.price}
                  </p>
                  <p className={`text-sm text-muted`}>
                    {pkg.unit}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-muted-strong">{pkg.audience}</p>
                <ul className="flex flex-1 flex-col gap-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2.5 text-sm ${
                        "text-muted"
                      }`}
                    >
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 text-accent-strong`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={CALENDLY_URL}
                  external
                  variant={pkg.highlight ? "primary" : "secondary"}
                  className="w-full"
                >
                  Paket anfragen
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
