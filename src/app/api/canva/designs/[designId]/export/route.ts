import type { NextRequest } from "next/server";

import { exportDesign, type ExportFormat } from "@/lib/canva/client";
import { canvaErrorResponse } from "@/lib/canva/http";

const FORMATS: ExportFormat[] = ["png", "jpg", "pdf", "mp4", "gif", "pptx"];

function isFormat(value: unknown): value is ExportFormat {
  return typeof value === "string" && FORMATS.includes(value as ExportFormat);
}

/** Exports a design and waits for Canva to render it. Returns the download URLs. */
export async function POST(
  request: NextRequest,
  context: RouteContext<"/api/canva/designs/[designId]/export">,
) {
  const { designId } = await context.params;
  const body = (await request.json().catch(() => ({}))) as { format?: unknown };
  const format = body.format ?? "png";

  if (!isFormat(format)) {
    return Response.json(
      { error: `Unsupported format. Use one of: ${FORMATS.join(", ")}.` },
      { status: 400 },
    );
  }

  try {
    return Response.json({ urls: await exportDesign(designId, format) });
  } catch (error) {
    return canvaErrorResponse(error);
  }
}
