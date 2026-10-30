"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const FEATURED_POSTS = [
  "/portfolio/yourmindz-post0-vorstellung.jpg",
  "/portfolio/yourmindz-post1-familie.jpg",
  "/portfolio/yourmindz-post3-kennenlernen.jpg",
];

const WORKS = [
  {
    category: "Content",
    image: "/results/youtube-revenue.jpg",
    title: "YouTube-Shorts-Kanal von null aufgebaut",
    description: "Tägliche Kurzvideos, aus denen über zwölf Monate ein eigener Kanal mit Einnahmen wurde.",
  },
  {
    category: "Anfrage-System",
    image: "/results/ki-chat-automatisierung.png",
    title: "Chatbot für Kundenanfragen",
    description: "Beantwortet Anfragen sofort und führt Interessenten weiter, auch nach Feierabend.",
  },
  {
    category: "Kampagnen",
    image: "/results/meta-ads-performance.png",
    title: "Meta-Kampagnen im Test",
    description: "Zwei Varianten parallel getestet und nach Kosten pro Anfrage optimiert.",
  },
];

export function Portfolio() {
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
    <section id="portfolio" className="py-20 lg:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="Portfolio" title="Ausgewählte Arbeiten." />

        {/* Featured client */}
        <div className="grid gap-8 rounded-3xl border border-line-strong bg-navy-900/60 p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-teal">
              Kundenprojekt · laufend
            </span>
            <h3 className="text-2xl font-semibold tracking-tight text-ink">YourMindz Health</h3>
            <p className="text-sm leading-relaxed text-muted">
              Psychologische Beratung für Expats und internationale Familien. Social-Media-Auftritt
              von der Positionierung bis zum fertigen Post, mit einem klaren Ziel: Interessenten
              zum kostenlosen Kennenlerngespräch führen.
            </p>
            <ul className="flex flex-wrap gap-2">
              {["Redaktionsplan", "Posts & Captions", "Reels"].map((item) => (
                <li key={item} className="rounded-full border border-line px-3 py-1 text-xs text-muted-strong">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {FEATURED_POSTS.map((src) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line">
                <Image src={src} alt="Social-Media-Post für YourMindz Health" fill sizes="(min-width: 1024px) 14rem, 30vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Further work, compact */}
        <div className="grid gap-4 sm:grid-cols-3">
          {WORKS.map((work, i) => (
            <button
              key={work.title}
              onClick={() => setOpenIndex(i)}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-navy-900/60 text-left transition-colors duration-300 hover:border-line-strong"
            >
              <div className="relative aspect-[16/10] w-full border-b border-line bg-navy-950 p-3">
                <Image src={work.image} alt={work.title} fill sizes="(min-width: 640px) 30vw, 90vw" className="object-contain" />
              </div>
              <div className="flex flex-col gap-1.5 p-5">
                <span className="text-xs font-medium text-accent-strong">{work.category}</span>
                <p className="text-base font-semibold leading-snug text-ink">{work.title}</p>
                <p className="text-sm leading-relaxed text-muted">{work.description}</p>
              </div>
            </button>
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
              <Image src={WORKS[openIndex].image} alt={WORKS[openIndex].title} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="flex flex-col gap-2 p-8">
              <span className="text-sm font-medium text-accent-strong">{WORKS[openIndex].category}</span>
              <p className="text-2xl font-semibold tracking-tight text-ink">{WORKS[openIndex].title}</p>
              <p className="text-sm leading-relaxed text-muted">{WORKS[openIndex].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
