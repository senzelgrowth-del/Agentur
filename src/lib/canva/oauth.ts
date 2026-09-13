import { createHash, randomBytes } from "node:crypto";

import {
  CANVA_AUTH_URL,
  CANVA_REVOKE_URL,
  CANVA_SCOPES,
  CANVA_TOKEN_URL,
  getCanvaEnv,
} from "./config";
import type { CanvaSession } from "./session";

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope?: string;
};

/** Canva requires PKCE (S256) for the authorization code flow. */
export function createPkcePair(): { verifier: string; challenge: string } {
  const verifier = randomBytes(64).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");

  return { verifier, challenge };
}

export function createState(): string {
  return randomBytes(24).toString("base64url");
}

export function buildAuthorizeUrl(state: string, codeChallenge: string): string {
  const { clientId, redirectUri } = getCanvaEnv();

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: CANVA_SCOPES.join(" "),
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    state,
  });

  return `${CANVA_AUTH_URL}?${params.toString()}`;
}

function basicAuthHeader(): string {
  const { clientId, clientSecret } = getCanvaEnv();
  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
}

async function requestToken(body: URLSearchParams): Promise<CanvaSession> {
  const response = await fetch(CANVA_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Canva token request failed (${response.status}): ${detail}`);
  }

  const token = (await response.json()) as TokenResponse;

  return {
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
    expiresAt: Date.now() + token.expires_in * 1000,
  };
}

export function exchangeCode(code: string, codeVerifier: string): Promise<CanvaSession> {
  const { redirectUri } = getCanvaEnv();

  return requestToken(
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      code_verifier: codeVerifier,
      redirect_uri: redirectUri,
    }),
  );
}

/** Canva rotates refresh tokens, so the returned session must always be persisted. */
export function refreshSession(refreshToken: string): Promise<CanvaSession> {
  return requestToken(
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  );
}

/** Best effort — a failed revoke must not stop us from dropping the local session. */
export async function revokeToken(token: string): Promise<void> {
  try {
    await fetch(CANVA_REVOKE_URL, {
      method: "POST",
      headers: {
        Authorization: basicAuthHeader(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ token }),
      cache: "no-store",
    });
  } catch {
    // ignored on purpose
  }
}
