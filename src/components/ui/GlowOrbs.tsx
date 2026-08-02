"use client";

import { motion } from "framer-motion";

type Orb = {
  color: string;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  duration: number;
  delay?: number;
};

function Orb({ color, size, top, bottom, left, right, duration, delay = 0 }: Orb) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full blur-[100px]"
      style={{
        width: size,
        height: size,
        top,
        bottom,
        left,
        right,
        background: color,
      }}
      animate={{
        x: [0, 40, -20, 0],
        y: [0, -30, 20, 0],
        scale: [1, 1.15, 0.95, 1],
        opacity: [0.25, 0.4, 0.2, 0.25],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

const PRESETS: Record<string, Orb[]> = {
  hero: [
    { color: "var(--accent)", size: 480, top: "-8rem", left: "50%", duration: 18 },
    { color: "var(--violet)", size: 340, top: "2rem", right: "8%", duration: 22, delay: 2 },
  ],
  services: [
    { color: "var(--teal)", size: 320, top: "-4rem", right: "10%", duration: 20 },
  ],
  pricing: [
    { color: "var(--violet)", size: 360, top: "-2rem", left: "8%", duration: 24 },
    { color: "var(--accent)", size: 280, bottom: "-4rem", right: "12%", duration: 19, delay: 1.5 },
  ],
  cta: [
    { color: "var(--accent)", size: 320, top: "-6rem", left: "50%", duration: 16 },
    { color: "var(--violet)", size: 220, bottom: "-4rem", left: "20%", duration: 21, delay: 1 },
  ],
};

export function GlowOrbs({ preset }: { preset: keyof typeof PRESETS }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PRESETS[preset].map((orb, i) => (
        <Orb key={i} {...orb} />
      ))}
    </div>
  );
}
