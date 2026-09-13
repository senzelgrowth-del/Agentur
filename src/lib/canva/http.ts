import { CanvaApiError, CanvaAuthError } from "./client";

/** Maps the integration's errors onto responses the /canva UI understands. */
export function canvaErrorResponse(error: unknown): Response {
  if (error instanceof CanvaAuthError) {
    return Response.json({ error: error.message, connected: false }, { status: 401 });
  }

  if (error instanceof CanvaApiError) {
    return Response.json({ error: error.message }, { status: error.status });
  }

  const message = error instanceof Error ? error.message : "Unexpected error.";
  return Response.json({ error: message }, { status: 500 });
}

/** Only same-origin paths may be used as a post-OAuth redirect target. */
export function safeReturnTo(value: string | null, fallback = "/canva"): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}
