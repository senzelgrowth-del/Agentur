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
    price: "ab 700 €",
    unit: "pro Monat, individuell anpassbar",
    features: [
      "Erweiterter Content (Videos, Posts, Stories, Reels)",
      "Community Management",
      "DM-Automation Setup",
      "Performance-Analyse & Reporting",
      "Bis zu 2 Kanäle",
      "Wöchentlicher Check-in Call",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "ab 1.200 €",
    unit: "pro Monat, individuell anpassbar",
    features: [
      "Full-Service Content Management",
      "Ads Management (Meta, TikTok)",
      "Komplette DM-Automation",
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
                    ? "border-transparent bg-gradient-to-br from-white to-[#e8f0ff] shadow-[0_25px_70px_-20px_rgba(110,168,254,0.45)]"
                    : "border-line bg-navy-900/60"
                }`}
              >
                {pkg.highlight && (
                  <span className="w-fit rounded-full bg-navy-950/5 px-3 py-1 text-xs font-medium text-navy-700">
                    Beliebteste Wahl
                  </span>
                )}
                <div>
                  <h3 className={`text-lg font-semibold ${pkg.highlight ? "text-navy-950" : "text-ink"}`}>
                    {pkg.name}
                  </h3>
                  <p
                    className={`mt-2 text-3xl font-semibold tracking-tight ${
                      pkg.highlight ? "text-navy-950" : "text-ink"
                    }`}
                  >
                    {pkg.price}
                  </p>
                  <p className={`text-sm ${pkg.highlight ? "text-navy-600" : "text-muted"}`}>
                    {pkg.unit}
                  </p>
                </div>

                <ul className="flex flex-1 flex-col gap-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2.5 text-sm ${
                        pkg.highlight ? "text-navy-700" : "text-muted"
                      }`}
                    >
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${pkg.highlight ? "text-blue-600" : "text-accent-strong"}`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={CALENDLY_URL}
                  external
                  variant={pkg.highlight ? "dark" : "secondary"}
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
