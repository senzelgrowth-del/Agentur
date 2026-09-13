import type { NextRequest } from "next/server";

import { canvaErrorResponse, safeReturnTo } from "@/lib/canva/http";
import { buildAuthorizeUrl, createPkcePair, createState } from "@/lib/canva/oauth";
import { writeOAuthRequest } from "@/lib/canva/session";

/** Starts the Canva OAuth flow: stores state + PKCE verifier, then redirects. */
export async function GET(request: NextRequest) {
  try {
    const state = createState();
    const { verifier, challenge } = createPkcePair();
    const returnTo = safeReturnTo(request.nextUrl.searchParams.get("returnTo"));

    await writeOAuthRequest({ state, codeVerifier: verifier, returnTo });

    return Response.redirect(buildAuthorizeUrl(state, challenge), 302);
  } catch (error) {
    return canvaErrorResponse(error);
  }
}
