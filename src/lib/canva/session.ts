import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

import { getCanvaEnv } from "./config";

const SESSION_COOKIE = "canva_session";
const OAUTH_COOKIE = "canva_oauth";

/** Canva refresh tokens are long-lived; the cookie outlives the access token on purpose. */
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;
/** The authorization request only has to survive the round trip to Canva. */
const OAUTH_MAX_AGE = 60 * 10;

export type CanvaSession = {
  accessToken: string;
  refreshToken: string;
  /** Unix timestamp in milliseconds at which the access token expires. */
  expiresAt: number;
};

export type OAuthRequest = {
  state: string;
  codeVerifier: string;
  /** Path inside this app to return to once the flow completes. */
  returnTo: string;
};

function key(): Buffer {
  return createHash("sha256").update(getCanvaEnv().tokenSecret).digest();
}

/** AES-256-GCM, packed as `iv.ciphertext.tag` in base64url. */
function encrypt(payload: unknown): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);

  return [iv, data, cipher.getAuthTag()]
    .map((part) => part.toString("base64url"))
    .join(".");
}

function decrypt<T>(value: string): T | null {
  try {
    const [iv, data, tag] = value.split(".");
    if (!iv || !data || !tag) return null;

    const decipher = createDecipheriv("aes-256-gcm", key(), Buffer.from(iv, "base64url"));
    decipher.setAuthTag(Buffer.from(tag, "base64url"));

    const json = Buffer.concat([
      decipher.update(Buffer.from(data, "base64url")),
      decipher.final(),
    ]).toString("utf8");

    return JSON.parse(json) as T;
  } catch {
    // A tampered, truncated or stale-secret cookie is treated as "not connected".
    return null;
  }
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
} as const;

export async function readSession(): Promise<CanvaSession | null> {
  const cookie = (await cookies()).get(SESSION_COOKIE);
  return cookie ? decrypt<CanvaSession>(cookie.value) : null;
}

export async function writeSession(session: CanvaSession): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, encrypt(session), {
    ...cookieOptions,
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function writeOAuthRequest(request: OAuthRequest): Promise<void> {
  (await cookies()).set(OAUTH_COOKIE, encrypt(request), {
    ...cookieOptions,
    maxAge: OAUTH_MAX_AGE,
  });
}

export async function consumeOAuthRequest(): Promise<OAuthRequest | null> {
  const store = await cookies();
  const cookie = store.get(OAUTH_COOKIE);
  store.delete(OAUTH_COOKIE);

  return cookie ? decrypt<OAuthRequest>(cookie.value) : null;
}
