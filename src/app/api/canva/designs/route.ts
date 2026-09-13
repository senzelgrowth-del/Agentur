import type { NextRequest } from "next/server";

import { listDesigns } from "@/lib/canva/client";
import { canvaErrorResponse } from "@/lib/canva/http";

/** Lists the connected account's designs. Supports `query` and `continuation`. */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  try {
    const designs = await listDesigns({
      query: params.get("query") ?? undefined,
      continuation: params.get("continuation") ?? undefined,
    });

    return Response.json(designs);
  } catch (error) {
    return canvaErrorResponse(error);
  }
}
