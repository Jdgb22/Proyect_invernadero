import type { APIRoute } from "astro";
import {
  getFincaAccess,
  canViewFincaData,
  json,
  unauthorized,
  forbidden,
} from "../../backend/services/authz";
import { resolveActiveFinca } from "../../backend/services/farms";
import { getLecturasByFinca } from "../../backend/services/readings";
import { generateCsv } from "../../backend/services/csvExport";

function sanitizeFilename(text: string): string {
  return text.replace(/[^\wáéíóúÁÉÍÓÚñÑ-]+/g, "_").slice(0, 60) || "Finca";
}

export const GET: APIRoute = async ({ request }) => {
  const ctx = await resolveActiveFinca(request);
  if (!ctx) return unauthorized();
  if (!ctx.finca) {
    return json(
      { error: "Selecciona una finca activa antes de exportar." },
      400,
    );
  }

  const access = await getFincaAccess(ctx.finca.id, ctx.user);
  if (!canViewFincaData(access)) {
    return forbidden("No tienes acceso a los datos de esta finca.");
  }

  try {
    const records = await getLecturasByFinca(ctx.finca.id);
    const csv = generateCsv(records);
    const nowStr = new Date().toISOString().slice(0, 10);
    const filename = `${sanitizeFilename(ctx.finca.nombre)}_Historial_${nowStr}.csv`;

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (err) {
    console.error("[ExportCSV] Error al generar el CSV:", err);
    return json({ error: "Error al exportar CSV" }, 500);
  }
};
