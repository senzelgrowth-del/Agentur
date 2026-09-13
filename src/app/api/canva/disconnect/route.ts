import { disconnect } from "@/lib/canva/client";
import { canvaErrorResponse } from "@/lib/canva/http";

/** Drops the local Canva session and revokes the refresh token. */
export async function POST() {
  try {
    await disconnect();
    return Response.json({ connected: false });
  } catch (error) {
    return canvaErrorResponse(error);
  }
}
