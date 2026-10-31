"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Play } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

type Project = {
  name: string;
  field: string;
  description: string;
  scope: string[];
  reel?: { src: string; poster: string };
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
  },
];

// Only anonymised or neutral material: no client names, no recognisable campaigns.
const MORE = [
  { image: "/portfolio/video-auswertung.jpg", caption: "Auswertung eines Kurzvideos", client: "Content" },
  { image: "/portfolio/kampagnen-verlauf.jpg", caption: "Verlauf einer Werbekampagne", client: "Kampagnen" },
  { image: "/portfolio/meta-kampagnen.jpg", caption: "Meta-Kampagnen im Vergleich", client: "Kampagnen" },
  { image: "/portfolio/lead-kampagne.jpg", caption: "Lead-Kampagne, anonymisiert", client: "Kampagnen" },
  { image: "/portfolio/google-ads-hinweis.jpg", caption: "Hinweis von Google zu einer Kampagne", client: "Kampagnen" },
  { image: "/results/ki-chat-automatisierung.png", caption: "Chatbot für Kundenanfragen", client: "Extra" },
];

const QUOTE = {
  text: "Ich muss wirklich immer wieder sagen: Es macht richtig Spaß, mit Dir zusammenzuarbeiten. […] Vielen Dank für die großartige Zusammenarbeit. Ich freue mich schon auf alles, was als Nächstes kommt!",
  author: "Mirco Braun",
  company: "Starshine Emotions",
};

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
  const [showMore, setShowMore] = useState(false);
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

        <figure className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <blockquote className="text-balance text-lg leading-relaxed text-muted-strong">
            „{QUOTE.text}“
          </blockquote>
          <figcaption className="text-sm text-muted">
            <span className="font-medium text-ink">{QUOTE.author}</span> · {QUOTE.company}
          </figcaption>
        </figure>

        <div className="flex justify-center">
          <button
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-white/5"
          >
            {showMore ? "Weniger anzeigen" : "Weitere Projekte anzeigen"}
            <ChevronDown size={16} className={`transition-transform ${showMore ? "rotate-180" : ""}`} />
          </button>
        </div>

        {showMore && (
          <div className="grid gap-4 sm:grid-cols-3">
            {MORE.map((m) => (
              <figure key={m.image} className="overflow-hidden rounded-2xl border border-line bg-navy-900/60">
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
