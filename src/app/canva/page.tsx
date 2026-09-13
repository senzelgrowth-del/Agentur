import type { Metadata } from "next";

import { CanvaPanel } from "@/components/canva/CanvaPanel";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { isCanvaConfigured } from "@/lib/canva/config";
import { readSession } from "@/lib/canva/session";

export const metadata: Metadata = {
  title: "Canva — SenzelGrowth",
  description: "Canva-Designs verbinden, durchsuchen und exportieren.",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ canva?: string; reason?: string }>;

export default async function CanvaPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { canva, reason } = await searchParams;
  const configured = isCanvaConfigured();
  const session = configured ? await readSession() : null;

  const notice =
    canva === "connected"
      ? { kind: "connected" as const, message: "Canva wurde erfolgreich verbunden." }
      : canva === "error"
        ? {
            kind: "error" as const,
            message: reason ?? "Die Verbindung mit Canva ist fehlgeschlagen.",
          }
        : undefined;

  return (
    <>
      <Navbar />
      <main className="flex-1 py-24">
        <Container className="space-y-10">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Canva</h1>
            <p className="max-w-2xl text-sm text-muted">
              Designs aus dem verbundenen Canva-Konto durchsuchen und als PNG, JPG, PDF
              oder PPTX exportieren.
            </p>
          </header>

          <CanvaPanel
            configured={configured}
            initiallyConnected={Boolean(session)}
            notice={notice}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
