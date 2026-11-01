"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

// Portrait reel with a play overlay; preload="none" so nothing downloads until someone presses play.
export function ReelPlayer({ src, poster, label }: { src: string; poster: string; label: string }) {
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
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#05070d] shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-105">
            <Play size={20} fill="currentColor" className="ml-0.5" />
          </span>
        </button>
      )}
    </div>
  );
}
