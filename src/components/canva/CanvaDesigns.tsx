"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { CanvaDesign, ExportFormat } from "@/lib/canva/client";

const FORMATS: ExportFormat[] = ["png", "jpg", "pdf", "pptx"];

type Props = {
  onSessionLost: () => void;
};

type ListResponse = {
  items?: CanvaDesign[];
  continuation?: string;
  error?: string;
};

async function fetchDesigns(options: { search?: string; cursor?: string }) {
  const params = new URLSearchParams();
  if (options.search) params.set("query", options.search);
  if (options.cursor) params.set("continuation", options.cursor);

  const response = await fetch(`/api/canva/designs?${params.toString()}`);

  return { status: response.status, data: (await response.json()) as ListResponse };
}

export function CanvaDesigns({ onSessionLost }: Props) {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [designs, setDesigns] = useState<CanvaDesign[]>([]);
  const [continuation, setContinuation] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exports, setExports] = useState<Record<string, string[] | "pending">>({});

  // Loads the first page, and reloads it whenever the submitted search changes.
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const { status, data } = await fetchDesigns({ search });
      if (cancelled) return;

      setLoading(false);

      if (status === 401) {
        onSessionLost();
        return;
      }
      if (status >= 400) {
        setError(data.error ?? "Designs konnten nicht geladen werden.");
        return;
      }

      setError(null);
      setDesigns(data.items ?? []);
      setContinuation(data.continuation);
    })();

    return () => {
      cancelled = true;
    };
  }, [search, onSessionLost]);

  async function loadMore() {
    setLoading(true);

    const { status, data } = await fetchDesigns({ search, cursor: continuation });
    setLoading(false);

    if (status === 401) {
      onSessionLost();
      return;
    }
    if (status >= 400) {
      setError(data.error ?? "Designs konnten nicht geladen werden.");
      return;
    }

    setDesigns((previous) => [...previous, ...(data.items ?? [])]);
    setContinuation(data.continuation);
  }

  async function runExport(designId: string, format: ExportFormat) {
    setExports((previous) => ({ ...previous, [designId]: "pending" }));

    const response = await fetch(`/api/canva/designs/${designId}/export`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ format }),
    });
    const data = (await response.json()) as { urls?: string[]; error?: string };

    if (response.status === 401) {
      onSessionLost();
      return;
    }

    setExports((previous) => ({ ...previous, [designId]: data.urls ?? [] }));
    if (!response.ok) {
      setError(data.error ?? "Der Export ist fehlgeschlagen.");
    }
  }

  return (
    <div className="space-y-8">
      <form
        className="flex flex-wrap gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setLoading(true);
          setSearch(query);
        }}
      >
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Designs durchsuchen"
          className="min-w-0 flex-1 rounded-full border border-line-strong bg-navy-900 px-5 py-3 text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        <button
          type="submit"
          className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-navy-950 transition-colors hover:bg-accent-strong"
        >
          Suchen
        </button>
      </form>

      {error && (
        <p className="rounded-2xl border border-line-strong bg-navy-900 px-5 py-4 text-sm text-muted-strong">
          {error}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {designs.map((design) => {
          const result = exports[design.id];

          return (
            <article
              key={design.id}
              className="flex flex-col gap-4 rounded-2xl border border-line-strong bg-navy-900 p-4"
            >
              {design.thumbnail ? (
                <Image
                  src={design.thumbnail.url}
                  alt={design.title ?? "Canva Design"}
                  width={design.thumbnail.width}
                  height={design.thumbnail.height}
                  className="h-40 w-full rounded-xl object-cover"
                  unoptimized
                />
              ) : (
                <div className="h-40 w-full rounded-xl bg-navy-800" />
              )}

              <div className="flex-1">
                <h3 className="text-sm font-medium text-ink">
                  {design.title ?? "Ohne Titel"}
                </h3>
                {design.page_count != null && (
                  <p className="mt-1 text-xs text-muted">
                    {design.page_count} Seite{design.page_count === 1 ? "" : "n"}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {design.urls?.edit_url && (
                  <a
                    href={design.urls.edit_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line-strong px-4 py-2 text-xs text-ink transition-colors hover:bg-white/5"
                  >
                    In Canva öffnen
                  </a>
                )}
                {FORMATS.map((format) => (
                  <button
                    key={format}
                    type="button"
                    onClick={() => void runExport(design.id, format)}
                    disabled={result === "pending"}
                    className="rounded-full border border-line-strong px-4 py-2 text-xs text-muted-strong transition-colors hover:bg-white/5 disabled:opacity-50"
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>

              {result === "pending" && (
                <p className="text-xs text-muted">Export läuft …</p>
              )}
              {Array.isArray(result) && result.length > 0 && (
                <ul className="space-y-1 text-xs">
                  {result.map((url, index) => (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-strong"
                      >
                        Download {result.length > 1 ? `Seite ${index + 1}` : ""}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>

      {loading && <p className="text-sm text-muted">Wird geladen …</p>}

      {!loading && designs.length === 0 && !error && (
        <p className="text-sm text-muted">Keine Designs gefunden.</p>
      )}

      {continuation && !loading && (
        <button
          type="button"
          onClick={() => void loadMore()}
          className="rounded-full border border-line-strong px-6 py-3 text-sm text-ink transition-colors hover:bg-white/5"
        >
          Mehr laden
        </button>
      )}
    </div>
  );
}
