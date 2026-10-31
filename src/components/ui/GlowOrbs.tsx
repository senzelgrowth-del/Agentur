// Static, GPU-friendly background glow: plain radial gradients, no blur filter, no animation.
type Orb = {
  color: string;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

const PRESETS: Record<string, Orb[]> = {
  hero: [
    { color: "110,168,254", size: 900, top: "-28rem", left: "calc(50% - 450px)" },
    { color: "167,139,250", size: 620, top: "-6rem", right: "-6rem" },
  ],
  services: [{ color: "94,234,212", size: 620, top: "-14rem", right: "0%" }],
  pricing: [
    { color: "167,139,250", size: 680, top: "-12rem", left: "-6rem" },
    { color: "110,168,254", size: 560, bottom: "-14rem", right: "0%" },
  ],
  cta: [
    { color: "110,168,254", size: 640, top: "-20rem", left: "calc(50% - 320px)" },
    { color: "167,139,250", size: 420, bottom: "-14rem", left: "10%" },
  ],
};

export function GlowOrbs({ preset }: { preset: keyof typeof PRESETS }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PRESETS[preset].map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
            background: `radial-gradient(circle, rgba(${orb.color},0.22) 0%, rgba(${orb.color},0) 65%)`,
          }}
        />
      ))}
    </div>
  );
}
