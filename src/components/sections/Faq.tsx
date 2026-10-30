"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { FadeIn } from "../ui/FadeIn";

const FAQS = [
  {
    question: "Für wen ist SenzelGrowth geeignet?",
    answer:
      "Für Selbständige und Dienstleister, deren Kunden über ein Erstgespräch kommen, zum Beispiel Berater, Coaches, Therapeuten oder lokale Dienstleister.",
  },
  {
    question: "Wie läuft der Einstieg ab?",
    answer:
      "Wir sprechen erstmal kostenlos und unverbindlich. Danach entscheiden wir gemeinsam, ob's passt.",
  },
  {
    question: "Kann ich auch nur Content oder nur das Anfrage-System buchen?",
    answer:
      "Ja, beides funktioniert auch einzeln. Am meisten bringt es kombiniert, das besprechen wir im Gespräch.",
  },
  {
    question: "Wie lange dauert die Umsetzung?",
    answer:
      "Kommt auf den Umfang an. Nach dem Erstgespräch bekommst du einen realistischen Zeitplan.",
  },
  {
    question: "Wie wird der Erfolg gemessen?",
    answer:
      "Wir legen vorher klare Zahlen fest, zum Beispiel Leads oder Termine, und schauen sie uns im monatlichen Reporting gemeinsam an.",
  },
  {
    question: "Was kostet eine Zusammenarbeit?",
    answer:
      "Es gibt keine Festpreise. Meine Pakete starten ab 400 € im Monat und werden an deinen Bedarf angepasst.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="FAQ" title="Häufige Fragen." />

        <div className="mx-auto flex w-full max-w-2xl flex-col divide-y divide-line">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <FadeIn key={faq.question} delay={i * 0.03}>
                <div>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-base font-medium text-ink">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-muted transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 text-sm leading-relaxed text-muted">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
