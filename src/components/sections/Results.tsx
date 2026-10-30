"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { FadeIn } from "../ui/FadeIn";

const RESULTS = [
  {
    id: "leads",
    category: "Marketing",
    image: "/results/leads-dashboard.png",
    title: "Leadkampagne für ein lokales Unternehmen",
    description: "Eine laufende Kampagne, Monat für Monat auf mehr qualifizierte Anfragen optimiert.",
  },
  {
    id: "content",
    category: "Content",
    image: "/results/youtube-revenue.jpg",
    title: "YouTube-Shorts-Kanal von null aufgebaut",
    description: "Tägliche Kurzform-Videos, aus denen über zwölf Monate ein eigener Kanal mit Einnahmen entstanden ist.",
  },
  {
    id: "ki",
    category: "KI-Automatisierung",
    image: "/results/ki-chat-automatisierung.png",
    title: "Chatbot für Kundenanfragen",
    description: "Beantwortet Anfragen automatisch, auch außerhalb der Geschäftszeiten.",
  },
  {
    id: "meta-kosten",
    category: "Marketing",
    image: "/results/meta-ads-performance.png",
    title: "Meta-Kampagnen im direkten Vergleich",
    description: "Zwei parallele Kampagnen, getestet und nach Kosten pro Anfrage optimiert.",
  },
  {
    id: "whatsapp",
    category: "Zusammenarbeit",
    image: "/results/whatsapp-kommunikation.png",
    title: "Kurze Wege in der Kommunikation",
    description: "Fragen werden direkt beantwortet, alles Weitere klären wir im Call.",
  },
];

export function Results() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIndex(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  return (
    <section id="ergebnisse" className="py-20 lg:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Einblicke"
          title="Einblicke aus echten Projekten."
          description="Keine großen Versprechen, sondern Ausschnitte aus meiner Arbeit. Anonymisiert, aber echt. Zum Vergrößern anklicken."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESULTS.map((result, i) => (
            <FadeIn key={result.id} delay={(i % 3) * 0.05}>
              <button
                onClick={() => setOpenIndex(i)}
                className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-navy-900/60 text-left transition-colors duration-300 hover:border-line-strong"
              >
                <div className="relative aspect-[4/3] w-full border-b border-line bg-navy-950 p-4">
                  <Image
                    src={result.image}
                    alt={`${result.category} Ergebnis-Nachweis`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 90vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-8">
                  <span className="text-sm font-medium text-accent-strong">
                    {result.category}
                  </span>
                  <p className="text-lg font-semibold leading-snug tracking-tight text-ink">
                    {result.title}
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    {result.description}
                  </p>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </Container>

      {openIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setOpenIndex(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/90 p-6 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line-strong bg-navy-900"
            >
              <button
                onClick={() => setOpenIndex(null)}
                aria-label="Schließen"
                className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-navy-950/80 text-muted hover:text-ink"
              >
                <X size={18} />
              </button>
              <div className="relative aspect-[4/3] w-full bg-navy-950 p-6">
                <Image
                  src={RESULTS[openIndex].image}
                  alt={`${RESULTS[openIndex].category} Ergebnis-Nachweis`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-2 p-8">
                <span className="text-sm font-medium text-accent-strong">
                  {RESULTS[openIndex].category}
                </span>
                <p className="text-2xl font-semibold tracking-tight text-ink">
                  {RESULTS[openIndex].title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {RESULTS[openIndex].description}
                </p>
              </div>
            </div>
          </div>
      )}
    </section>
  );
}
