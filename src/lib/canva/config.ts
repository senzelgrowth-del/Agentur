/**
 * Configuration for the Canva Connect API integration.
 *
 * All values come from the environment so that no credentials are ever part of
 * the bundle. See `.env.example` for the required variables.
 */

export const CANVA_AUTH_URL = "https://www.canva.com/api/oauth/authorize";
export const CANVA_TOKEN_URL = "https://api.canva.com/rest/v1/oauth/token";
export const CANVA_REVOKE_URL = "https://api.canva.com/rest/v1/oauth/revoke";
export const CANVA_API_BASE = "https://api.canva.com/rest/v1";

/** Scopes the integration asks for — read-only plus the export permission. */
export const CANVA_SCOPES = [
  "profile:read",
  "design:meta:read",
  "design:content:read",
  "asset:read",
] as const;

export type CanvaEnv = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  tokenSecret: string;
};

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Add it to .env.local (see .env.example).`,
    );
  }
  return value;
}

/**
 * Reads and validates the Canva environment. Throws when something is missing,
 * so route handlers can turn that into a clean 500 instead of a failed request
 * against Canva.
 */
export function getCanvaEnv(): CanvaEnv {
  return {
    clientId: required("CANVA_CLIENT_ID"),
    clientSecret: required("CANVA_CLIENT_SECRET"),
    redirectUri: required("CANVA_REDIRECT_URI"),
    tokenSecret: required("CANVA_TOKEN_SECRET"),
  };
}

/** True when the integration is configured at all — used to render hints in the UI. */
export function isCanvaConfigured(): boolean {
  return Boolean(
    process.env.CANVA_CLIENT_ID &&
      process.env.CANVA_CLIENT_SECRET &&
      process.env.CANVA_REDIRECT_URI &&
      process.env.CANVA_TOKEN_SECRET,
  );
}
