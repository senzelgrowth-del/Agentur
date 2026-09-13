import { CANVA_API_BASE } from "./config";
import { refreshSession, revokeToken } from "./oauth";
import { clearSession, readSession, writeSession } from "./session";

/** Refresh a little before the real expiry so in-flight requests don't race it. */
const EXPIRY_SKEW_MS = 60_000;

export class CanvaAuthError extends Error {}

export class CanvaApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

export type CanvaDesign = {
  id: string;
  title?: string;
  page_count?: number;
  created_at?: number;
  updated_at?: number;
  thumbnail?: { url: string; width: number; height: number };
  urls?: { edit_url?: string; view_url?: string };
};

export type DesignList = {
  items: CanvaDesign[];
  continuation?: string;
};

export type ExportJob = {
  id: string;
  status: "in_progress" | "success" | "failed";
  urls?: string[];
  error?: { code: string; message: string };
};

export type ExportFormat = "png" | "jpg" | "pdf" | "mp4" | "gif" | "pptx";

/**
 * Returns a valid access token, refreshing it when it is about to expire.
 * Throws `CanvaAuthError` when there is no usable session, which callers turn
 * into a 401 so the UI can show the "connect" state again.
 */
async function accessToken(): Promise<string> {
  const session = await readSession();
  if (!session) {
    throw new CanvaAuthError("Not connected to Canva.");
  }

  if (session.expiresAt - EXPIRY_SKEW_MS > Date.now()) {
    return session.accessToken;
  }

  try {
    const refreshed = await refreshSession(session.refreshToken);
    await writeSession(refreshed);
    return refreshed.accessToken;
  } catch {
    await clearSession();
    throw new CanvaAuthError("The Canva session expired. Please reconnect.");
  }
}

async function canvaFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${CANVA_API_BASE}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${await accessToken()}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    await clearSession();
    throw new CanvaAuthError("Canva rejected the access token. Please reconnect.");
  }

  if (!response.ok) {
    throw new CanvaApiError(
      `Canva API ${path} failed: ${await response.text()}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}

export function getCurrentUser() {
  return canvaFetch<{ team_user: { user_id: string; team_id: string } }>("/users/me");
}

export function listDesigns(options: { query?: string; continuation?: string } = {}) {
  const params = new URLSearchParams();
  if (options.query) params.set("query", options.query);
  if (options.continuation) params.set("continuation", options.continuation);

  const suffix = params.size > 0 ? `?${params.toString()}` : "";

  return canvaFetch<DesignList>(`/designs${suffix}`);
}

export function getDesign(designId: string) {
  return canvaFetch<{ design: CanvaDesign }>(`/designs/${encodeURIComponent(designId)}`);
}

function createExport(designId: string, format: ExportFormat) {
  return canvaFetch<{ job: ExportJob }>("/exports", {
    method: "POST",
    body: JSON.stringify({ design_id: designId, format: { type: format } }),
  });
}

function getExport(exportId: string) {
  return canvaFetch<{ job: ExportJob }>(`/exports/${encodeURIComponent(exportId)}`);
}

/**
 * Starts an export and polls until Canva finishes rendering it.
 * Resolves with the download URLs (one per page), which are short-lived.
 */
export async function exportDesign(
  designId: string,
  format: ExportFormat,
  { attempts = 20, intervalMs = 1500 } = {},
): Promise<string[]> {
  const { job } = await createExport(designId, format);
  let current = job;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    if (current.status === "success") {
      return current.urls ?? [];
    }
    if (current.status === "failed") {
      throw new CanvaApiError(
        current.error?.message ?? "The Canva export failed.",
        502,
      );
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
    current = (await getExport(current.id)).job;
  }

  throw new CanvaApiError("The Canva export timed out.", 504);
}

/** Drops the local session and, when possible, revokes the token at Canva. */
export async function disconnect(): Promise<void> {
  const session = await readSession();
  await clearSession();

  if (session) {
    await revokeToken(session.refreshToken);
  }
}
