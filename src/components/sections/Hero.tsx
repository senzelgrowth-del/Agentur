import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { GlowOrbs } from "../ui/GlowOrbs";
import { CALENDLY_URL } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_20%,transparent_80%)]" />
      <GlowOrbs preset="hero" />

      {/* Mobile order: intro -> photo -> CTA. Desktop: intro + CTA left, photo right. */}
      <Container className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:self-end lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/80 px-4 py-1.5 font-mono text-xs text-ink sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-teal" />
            1:1 statt Agentur-Apparat
          </span>
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Content und Werbeanzeigen, die{" "}
            <span className="accent-serif text-[1.08em] text-[#163a6b]">Anfragen bringen.</span>
          </h1>
          <p className="max-w-xl text-balance text-lg leading-relaxed text-muted">
            Für Selbstständige und kleine Unternehmen: Ich erstelle deine Reels und Posts und sorge mit
            Meta Ads dafür, dass sie die richtigen Menschen erreichen.
          </p>
        </div>

        <figure className="soft-shadow relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-line bg-white lg:row-span-2 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/celvin-portrait.jpg"
              alt="Celvin Senzel, Gründer von SenzelGrowth"
              fill
              priority
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 font-mono text-xs text-ink backdrop-blur">
              Dein Ansprechpartner
            </span>
          </div>
          <figcaption className="flex items-center justify-between gap-3 px-6 py-5">
            <div>
              <p className="accent-serif text-3xl text-ink">Celvin Senzel</p>
              <p className="text-sm text-muted">Gründer von SenzelGrowth</p>
            </div>
            <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">seit 2024</span>
          </figcaption>
        </figure>

        <div className="flex flex-col items-center gap-6 lg:items-start lg:self-start">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 rounded-full bg-ink py-2 pl-7 pr-2 text-base font-medium text-white shadow-[0_14px_40px_-14px_rgba(10,14,26,0.6)] transition-colors hover:bg-[#163a6b]"
          >
            Kostenloses Erstgespräch
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink transition-transform group-hover:translate-x-0.5">
              <ArrowRight size={18} />
            </span>
          </a>
          <div className="flex flex-col items-center gap-1 text-sm lg:items-start">
            <p className="font-medium text-ink">Kostenlos &amp; 100 % unverbindlich</p>
            <p className="text-muted">Termin direkt online wählen · 2.000+ Leads generiert</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
