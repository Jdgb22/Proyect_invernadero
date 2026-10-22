import type { APIRoute } from "astro";
import { buildPlantsGridFromRecords } from "../../shared/plantMatrix";
import {
  getFincaAccess,
  canViewFincaData,
  json,
  unauthorized,
  forbidden,
} from "../../backend/services/authz";
import { resolveActiveFinca } from "../../backend/services/fincas";
import { getLecturasByFinca } from "../../backend/services/lecturas";
import { generateExcelBuffer } from "../../backend/services/excelExport";

const XLSX_MIME =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

function sanitizeFilename(text: string): string {
  return text.replace(/[^\wáéíóúÁÉÍÓÚñÑ-]+/g, "_").slice(0, 60) || "Finca";
}

const handler: APIRoute = async ({ request }) => {
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
    const plants = buildPlantsGridFromRecords(records);
    const buffer = await generateExcelBuffer(plants);

    const nowStr = new Date().toISOString().slice(0, 10);
    const filename = `${sanitizeFilename(ctx.finca.nombre)}_Mediciones_${nowStr}.xlsx`;

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": XLSX_MIME,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (err) {
    console.error("[ExportExcel] Error al generar el Excel:", err);
    return json(
      {
        error: "Error al exportar Excel",
        details: err instanceof Error ? err.message : String(err),
      },
      500,
    );
  }
};

export const GET = handler;
export const POST = handler;
