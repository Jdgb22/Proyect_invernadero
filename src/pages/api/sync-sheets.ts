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
import { resolveActiveFinca } from "../../backend/services/farms";
import { insertLecturas } from "../../backend/services/readings";
import {
  fetchSheetRecords,
  SheetsSyncError,
  normalizeGoogleSheetUrl,
} from "../../backend/services/sheetsSync";
import { pool } from "../../db/client";

let hasCheckedFincasSheetsCol = false;
async function ensureFincasSheetsColumn() {
  if (hasCheckedFincasSheetsCol) return;
  try {
    await pool.query(
      "ALTER TABLE fincas ADD COLUMN IF NOT EXISTS sheets_url TEXT;",
    );
    hasCheckedFincasSheetsCol = true;
  } catch {
    hasCheckedFincasSheetsCol = true;
  }
}

const SyncRequestSchema = z.object({
  url: z.string().trim().optional(),
});

export const GET: APIRoute = async ({ request }) => {
  const ctx = await resolveActiveFinca(request);
  if (!ctx) return unauthorized();
  if (!ctx.finca) {
    return json({ success: false, error: "Sin finca activa" }, 400);
  }

  await ensureFincasSheetsColumn();
  const res = await pool.query("SELECT sheets_url FROM fincas WHERE id = $1", [
    ctx.finca.id,
  ]);
  const sheetsUrl = res.rows[0]?.sheets_url || null;
  return json({ success: true, sheetsUrl });
};

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
      "No tienes permisos para sincronizar Google Sheets en esta finca.",
    );
  }

  await ensureFincasSheetsColumn();

  const body = (await parseJsonBody(request)) || {};
  const parsed = SyncRequestSchema.safeParse(body);
  let targetUrl = parsed.success && parsed.data.url ? parsed.data.url : null;

  // Si no se envió url en el body, consultar la URL guardada para esta finca en la BD
  if (!targetUrl) {
    const res = await pool.query(
      "SELECT sheets_url FROM fincas WHERE id = $1",
      [ctx.finca.id],
    );
    targetUrl = res.rows[0]?.sheets_url || null;
  }

  if (!targetUrl) {
    return json(
      {
        success: false,
        needsUrl: true,
        error:
          "No hay una hoja de Google Sheets enlazada a esta finca. Por favor ingresa el enlace de Google Sheets o Google Drive.",
      },
      400,
    );
  }

  try {
    const records = await fetchSheetRecords(targetUrl);

    // Guardar la URL en la finca para que quede configurada permanentemente
    try {
      await pool.query(
        "UPDATE fincas SET sheets_url = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
        [targetUrl, ctx.finca.id],
      );
    } catch (saveErr) {
      console.warn("[Sync] No se pudo persistir sheets_url en finca:", saveErr);
    }

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
      sheetsUrl: targetUrl,
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
