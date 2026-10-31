"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

type Project = {
  name: string;
  field: string;
  since: string;
  description: string;
  scope: string[];
  reel?: { src: string; poster: string };
};

const PROJECTS: Project[] = [
  {
    name: "YourMindz Health",
    field: "Psychologische Beratung für Expats",
    since: "seit 2026",
    description:
      "Ruhige Reels und Posts, die ein sensibles Thema verständlich machen und zum kostenlosen Kennenlernen einladen.",
    scope: ["Reels", "Posts", "Redaktionsplan"],
    reel: { src: "/portfolio/yourmindz-reel.mp4", poster: "/portfolio/yourmindz-reel-poster.jpg" },
  },
  {
    name: "Starshine Emotions",
    field: "Reisebüro & Eventagentur, Erfurt",
    since: "seit April 2026",
    description:
      "Reels, Posts und Werbeanzeigen für Reisen und Events. Ziel sind Buchungsanfragen, nicht nur Reichweite.",
    scope: ["Reels", "Posts", "Meta- & Google-Ads"],
    reel: { src: "/portfolio/starshine-reel.mp4", poster: "/portfolio/starshine-reel-poster.jpg" },
  },
];

const MORE = [
  "Eigenen YouTube-Shorts-Kanal von null aufgebaut",
  "Meta-Kampagnen in Varianten getestet und laufend verbessert",
  "Extra: Chatbot, der Anfragen auch nach Feierabend beantwortet",
];

function Reel({ src, poster, label }: { src: string; poster: string; label: string }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-line bg-navy-950">
      <video
        ref={ref}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        controls={playing}
        className="h-full w-full object-cover"
      />
      {!playing && (
        <button
          onClick={() => {
            setPlaying(true);
            ref.current?.play();
          }}
          aria-label={`Reel für ${label} abspielen`}
          className="group absolute inset-0 flex items-center justify-center"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy-950 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-105">
            <Play size={20} fill="currentColor" className="ml-0.5" />
          </span>
        </button>
      )}
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 lg:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="Portfolio" title="Aktuelle Kundenprojekte." />

        <div className="grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              className="grid gap-6 rounded-3xl border border-line-strong bg-navy-900/60 p-6 sm:grid-cols-[11rem_1fr] sm:items-center"
            >
              {p.reel ? (
                <Reel src={p.reel.src} poster={p.reel.poster} label={p.name} />
              ) : null}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium text-teal">{p.since}</span>
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
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-2xl border border-line px-6 py-5">
          <p className="mb-3 text-xs font-medium tracking-wide text-accent-strong uppercase">Außerdem</p>
          <ul className="grid gap-2 text-sm text-muted sm:grid-cols-3">
            {MORE.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
