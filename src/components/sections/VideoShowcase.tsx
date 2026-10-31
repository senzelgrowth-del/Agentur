"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function VideoShowcase() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section className="py-20 lg:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Vorstellung"
          title="Kurz zu mir, im Video."
          description="Wer ich bin und wie ich arbeite."
        />

        <div className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-3xl border border-line-strong bg-navy-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
          {/* preload="none": the video only downloads once someone presses play */}
          <video
            ref={videoRef}
            src="/videos/vorstellung-senzelgrowth.mp4"
            poster="/videos/vorstellung-poster.jpg"
            preload="none"
            controls={playing}
            playsInline
            className="h-full w-full object-cover"
          />

          {!playing && (
            <button
              onClick={handlePlay}
              aria-label="Vorstellungsvideo abspielen"
              className="group absolute inset-0 flex items-center justify-center"
            >
              <Image
                src="/videos/vorstellung-poster.jpg"
                alt="Viele Views, kaum Kunden? – Vorstellungsvideo von Celvin Senzel"
                fill
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="object-cover"
                priority={false}
              />
              <span className="absolute inset-0 bg-navy-950/10 transition-colors group-hover:bg-navy-950/0" />
              <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-white text-navy-950 shadow-[0_10px_40px_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover:scale-105">
                <Play size={28} fill="currentColor" className="ml-1" />
              </span>
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
