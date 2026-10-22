import type { APIRoute } from "astro";
import { z } from "zod";
import {
  getFincaAccess,
  canConnectSheets,
  json,
  unauthorized,
  forbidden,
  parseJsonBody,
} from "../../backend/services/authz";
import { resolveActiveFinca } from "../../backend/services/fincas";
import { insertLecturas } from "../../backend/services/lecturas";
import {
  fetchSheetRecords,
  SheetsSyncError,
} from "../../backend/services/sheetsSync";

const SyncRequestSchema = z.object({
  url: z.url("Debe ingresar una URL válida de Google Sheets o archivo CSV."),
});

export const POST: APIRoute = async ({ request }) => {
  const ctx = await resolveActiveFinca(request);
  if (!ctx) return unauthorized();
  if (!ctx.finca) {
    return json(
      {
        success: false,
        error: "Selecciona una finca activa antes de sincronizar mediciones.",
      },
      400,
    );
  }

  const access = await getFincaAccess(ctx.finca.id, ctx.user);
  if (!canConnectSheets(access)) {
    return forbidden(
      "Solo el dueño de la finca puede conectar y sincronizar Google Sheets.",
    );
  }

  const body = await parseJsonBody(request);
  const parsed = SyncRequestSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        success: false,
        error: parsed.error.issues[0]?.message || "Datos no válidos",
        details: parsed.error.issues,
      },
      400,
    );
  }

  try {
    const records = await fetchSheetRecords(parsed.data.url);

    let guardadas = 0;
    try {
      guardadas = await insertLecturas(ctx.finca.id, records, ctx.user.id);
    } catch (persistErr) {
      console.error("[Sync] No se pudieron guardar las lecturas:", persistErr);
    }

    return json({
      success: true,
      count: records.length,
      guardadas,
      records,
      message: `Se importaron exitosamente ${records.length} mediciones reales desde Google Sheets.`,
    });
  } catch (err) {
    if (err instanceof SheetsSyncError) {
      return json({ success: false, error: err.message }, err.status);
    }
    console.error("[Sync] Error inesperado:", err);
    return json(
      {
        success: false,
        error:
          "Ocurrió un error inesperado al procesar la sincronización con Google Sheets.",
        details: err instanceof Error ? err.message : String(err),
      },
      500,
    );
  }
};
