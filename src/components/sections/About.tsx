import Image from "next/image";
import { Container } from "../ui/Container";
import { FadeIn } from "../ui/FadeIn";

export function About() {
  return (
    <section id="ueber-mich" className="py-20 lg:py-28">
      <Container className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <FadeIn className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-line-strong bg-navy-900">
            <Image
              src="/celvin.png"
              alt="Celvin Senzel"
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover"
            />
          </div>
        </FadeIn>

        <div className="order-1 flex flex-col items-start gap-6 lg:order-2">
          <FadeIn>
            <span className="text-sm font-medium tracking-wide text-accent-strong uppercase">
              Über mich
            </span>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="text-balance text-3xl sm:text-4xl font-semibold leading-[1.15] tracking-tight text-ink">
              Hi, ich bin Celvin.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-col gap-4 text-lg leading-relaxed text-muted">
            <p>
              SenzelGrowth gibt es seit 2024, Content mache ich schon seit über
              5 Jahren. Ich habe selbst Kanäle aufgebaut, bevor ich anfing,
              anderen dabei zu helfen.
            </p>
            <p>
              Ich antworte schnell, wir checken uns regelmäßig ein, und wenn
              etwas nicht funktioniert, sage ich das auch so.
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
