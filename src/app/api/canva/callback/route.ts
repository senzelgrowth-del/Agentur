import type { NextRequest } from "next/server";

import { exchangeCode } from "@/lib/canva/oauth";
import { consumeOAuthRequest, writeSession } from "@/lib/canva/session";

/**
 * Builds the redirect against the host the browser actually used. Next.js
 * normalises `request.url` in development, and redirecting to a different host
 * would drop the session cookie set on this very response.
 */
function redirectWith(
  request: NextRequest,
  path: string,
  params: Record<string, string>,
) {
  const host = request.headers.get("host") ?? request.nextUrl.host;
  const protocol =
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(":", "");
  const url = new URL(path, `${protocol}://${host}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return Response.redirect(url, 302);
}

/** Canva redirects back here with `code` and `state` after the user consents. */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const oauthRequest = await consumeOAuthRequest();
  const returnTo = oauthRequest?.returnTo ?? "/canva";

  const error = params.get("error");
  if (error) {
    return redirectWith(request, returnTo, {
      canva: "error",
      reason: params.get("error_description") ?? error,
    });
  }

  const code = params.get("code");
  const state = params.get("state");

  if (!oauthRequest || !code || !state || state !== oauthRequest.state) {
    return redirectWith(request, returnTo, {
      canva: "error",
      reason: "Invalid or expired authorization request. Please try again.",
    });
  }

  try {
    await writeSession(await exchangeCode(code, oauthRequest.codeVerifier));
    return redirectWith(request, returnTo, { canva: "connected" });
  } catch (cause) {
    return redirectWith(request, returnTo, {
      canva: "error",
      reason: cause instanceof Error ? cause.message : "Token exchange failed.",
    });
  }
}
