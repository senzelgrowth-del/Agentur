"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { CanvaDesigns } from "./CanvaDesigns";

type Props = {
  configured: boolean;
  initiallyConnected: boolean;
  notice?: { kind: "connected" | "error"; message: string };
};

export function CanvaPanel({ configured, initiallyConnected, notice }: Props) {
  const router = useRouter();
  const [connected, setConnected] = useState(initiallyConnected);

  // Stable identity: CanvaDesigns uses it as an effect dependency.
  const handleSessionLost = useCallback(() => setConnected(false), []);

  if (!configured) {
    return (
      <div className="rounded-2xl border border-line-strong bg-navy-900 p-6 text-sm text-muted-strong">
        <p className="text-ink">Die Canva-Integration ist noch nicht konfiguriert.</p>
        <p className="mt-2">
          Hinterlege <code>CANVA_CLIENT_ID</code>, <code>CANVA_CLIENT_SECRET</code>,{" "}
          <code>CANVA_REDIRECT_URI</code> und <code>CANVA_TOKEN_SECRET</code> in den
          Umgebungsvariablen (siehe <code>.env.example</code>).
        </p>
      </div>
    );
  }

  async function disconnect() {
    await fetch("/api/canva/disconnect", { method: "POST" });
    setConnected(false);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      {notice && (
        <p
          className={`rounded-2xl border px-5 py-4 text-sm ${
            notice.kind === "connected"
              ? "border-line-strong bg-navy-900 text-muted-strong"
              : "border-line-strong bg-navy-900 text-ink"
          }`}
        >
          {notice.message}
        </p>
      )}

      {connected ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted">Canva-Konto verbunden.</p>
            <button
              type="button"
              onClick={() => void disconnect()}
              className="rounded-full border border-line-strong px-6 py-3 text-sm text-ink transition-colors hover:bg-white/5"
            >
              Verbindung trennen
            </button>
          </div>
          <CanvaDesigns onSessionLost={handleSessionLost} />
        </>
      ) : (
        <div className="rounded-2xl border border-line-strong bg-navy-900 p-6">
          <p className="text-sm text-muted-strong">
            Verbinde dein Canva-Konto, um Designs zu durchsuchen und zu exportieren.
          </p>
          <a
            href="/api/canva/connect?returnTo=/canva"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-navy-950 transition-colors hover:bg-accent-strong"
          >
            Mit Canva verbinden
          </a>
        </div>
      )}
    </div>
  );
}
