"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ReelPlayer } from "../ui/ReelPlayer";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

type Project = {
  name: string;
  field: string;
  description: string;
  scope: string[];
  reel?: { src: string; poster: string };
  caseHref?: string;
};

const PROJECTS: Project[] = [
  {
    name: "YourMindz Health",
    field: "Psychologische Beratung für Expats",
    description:
      "Ruhige Reels und Posts, die ein sensibles Thema verständlich machen und zum kostenlosen Kennenlernen einladen.",
    scope: ["Reels", "Posts", "Redaktionsplan", "Google Ads", "Google Analytics"],
    reel: { src: "/portfolio/yourmindz-reel.mp4", poster: "/portfolio/yourmindz-reel-poster.jpg" },
  },
  {
    name: "Starshine Emotions",
    field: "Reisebüro & Eventagentur, Erfurt",
    description:
      "Posts, Werbeanzeigen und ein Chatbot für Reisen und Events. Ziel sind Buchungsanfragen, nicht nur Reichweite.",
    scope: ["Posts", "Meta Ads", "Chatbot"],
    reel: { src: "/portfolio/starshine-reel.mp4", poster: "/portfolio/starshine-reel-poster.jpg" },
    caseHref: "/referenzen/starshine-emotions",
  },
];

// Only anonymised or neutral material: no client names, no recognisable campaigns.
const MORE = [
  { image: "/portfolio/instagram-wachstum.jpg", caption: "Instagram: +105 % Aufrufe in 28 Tagen", client: "Content" },
  { image: "/portfolio/video-auswertung.jpg", caption: "Auswertung eines Kurzvideos", client: "Content" },
  { image: "/portfolio/kampagnen-verlauf.jpg", caption: "Verlauf einer Werbekampagne", client: "Kampagnen" },
  { image: "/portfolio/meta-kampagnen.jpg", caption: "Meta-Kampagnen im Vergleich", client: "Kampagnen" },
  { image: "/portfolio/google-ads-hinweis.jpg", caption: "Hinweis von Google zu einer Kampagne", client: "Kampagnen" },
  { image: "/results/ki-chat-automatisierung.png", caption: "Chatbot für Kundenanfragen", client: "Extra" },
];

// Unedited client messages (WhatsApp screenshots from the feedback folder)
const FEEDBACK = [
  { image: "/portfolio/feedback-2.jpg", alt: "WhatsApp-Nachricht von Mirco Braun, Starshine Emotions: Es macht richtig Spaß, mit Dir zusammenzuarbeiten", who: "Mirco Braun · Starshine Emotions" },
  { image: "/portfolio/feedback-1.jpg", alt: "WhatsApp-Nachricht eines Kunden: Super Arbeit, danke!", who: "Kundenfeedback per WhatsApp" },
];

export function Portfolio() {
  const [showMore, setShowMore] = useState(false);
  return (
    <section id="portfolio" className="theme-light py-20 lg:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="Portfolio" title="Kundenprojekte." />

        <div className="grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              className="soft-shadow grid gap-6 rounded-3xl border border-line bg-navy-900 p-6 sm:grid-cols-[11rem_1fr] sm:items-center"
            >
              {p.reel ? (
                <ReelPlayer src={p.reel.src} poster={p.reel.poster} label={p.name} />
              ) : null}
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold tracking-tight text-ink">{p.name}</h3>
                <p className="text-sm text-muted-strong">{p.field}</p>
                <p className="text-sm leading-relaxed text-muted">{p.description}</p>
                <ul className="flex flex-wrap gap-2">
                  {p.scope.map((s) => (
                    <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-muted-strong">
                      {s}
                    </li>
                  ))}
                </ul>
                {p.caseHref && (
                  <Link href={p.caseHref} className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:underline">
                    Case Study ansehen <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-center text-sm font-medium tracking-wide text-accent-strong uppercase">Kundenfeedback, ungeschönt</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {FEEDBACK.map((f) => (
              <figure key={f.image} className="soft-shadow flex flex-col overflow-hidden rounded-2xl border border-line bg-navy-900">
                <div className="relative aspect-[16/7] w-full bg-[#efe9e1]">
                  <Image src={f.image} alt={f.alt} fill sizes="(min-width: 640px) 45vw, 90vw" className="object-contain" />
                </div>
                <figcaption className="border-t border-line px-5 py-3 text-sm text-muted">{f.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-navy-800"
          >
            {showMore ? "Weniger anzeigen" : "Weitere Projekte anzeigen"}
            <ChevronDown size={16} className={`transition-transform ${showMore ? "rotate-180" : ""}`} />
          </button>
        </div>

        {showMore && (
          <div className="grid gap-4 sm:grid-cols-3">
            {MORE.map((m) => (
              <figure key={m.image} className="soft-shadow overflow-hidden rounded-2xl border border-line bg-navy-900">
                <div className="relative aspect-[4/5] w-full bg-navy-950">
                  <Image src={m.image} alt={m.caption} fill sizes="(min-width: 640px) 30vw, 90vw" className="object-contain" />
                </div>
                <figcaption className="flex flex-col gap-0.5 border-t border-line px-5 py-4">
                  <span className="text-sm text-ink">{m.caption}</span>
                  <span className="text-xs text-muted">{m.client}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
