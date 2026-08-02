import { FadeIn } from "./FadeIn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <FadeIn className={`flex flex-col gap-4 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <span className="text-sm font-medium tracking-wide text-accent-strong uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.15] tracking-tight text-ink">
        {title}
      </h2>
      {description && (
        <p className="text-balance text-lg leading-relaxed text-muted">
          {description}
        </p>
      )}
    </FadeIn>
  );
}
