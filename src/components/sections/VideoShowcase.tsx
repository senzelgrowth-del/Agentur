"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { FadeIn } from "../ui/FadeIn";

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
        <SectionHeading eyebrow="Vorstellung" title="Kurz zu mir, im Video." />

        <FadeIn delay={0.1}>
          <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl border border-line-strong bg-navy-900">
            <video
              ref={videoRef}
              src="/videos/vorstellung.mp4"
              controls={playing}
              playsInline
              className="h-full w-full object-cover"
            />

            {!playing && (
              <button
                onClick={handlePlay}
                aria-label="Video abspielen"
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-navy-900/40 text-muted transition-colors hover:bg-navy-900/20"
              >
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-line-strong bg-navy-800 text-accent-strong">
                  <Play size={24} fill="currentColor" />
                </span>
                <span className="text-sm">Video abspielen</span>
              </button>
            )}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
