import type { MetricRecord } from "../../shared/plantMatrix";
import { parseCSV } from "../../shared/csv";
import {
  buildRecordsFromRows,
  findHeaderRowIndex,
  indexHeaders,
  type HeaderIndex,
} from "../../shared/recordsParser";

export { buildRecordsFromRows, findHeaderRowIndex, indexHeaders };
export type { HeaderIndex };

export function normalizeGoogleSheetUrl(inputUrl: string): string {
  const url = inputUrl.trim();

  // Enlace directo de Google Drive /file/d/FILE_ID/...
  const driveFileMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    const fileId = driveFileMatch[1];
    return `https://docs.google.com/spreadsheets/d/${fileId}/export?format=csv`;
  }

  // Enlace directo de Google Drive open?id=FILE_ID
  const driveIdMatch = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  if (url.includes("drive.google.com") && driveIdMatch && driveIdMatch[1]) {
    const fileId = driveIdMatch[1];
    return `https://docs.google.com/spreadsheets/d/${fileId}/export?format=csv`;
  }

  if (url.includes("/spreadsheets/d/e/")) {
    if (url.includes("output=csv")) return url;
    if (url.includes("/pubhtml"))
      return url.replace("/pubhtml", "/pub?output=csv");
    if (url.includes("/pub"))
      return url.includes("?") ? `${url}&output=csv` : `${url}?output=csv`;
    return url;
  }

  const sheetMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (sheetMatch && sheetMatch[1] && sheetMatch[1] !== "e") {
    const sheetId = sheetMatch[1];

    let gid = "0";
    const gidMatch = url.match(/[#&?]gid=([0-9]+)/);
    if (gidMatch && gidMatch[1]) gid = gidMatch[1];

    if (url.includes("/pub") && url.includes("output=csv")) return url;
    if (url.includes("/export") && url.includes("format=csv")) return url;

    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  }

  return url;
}

export async function fetchSheetRecords(url: string): Promise<MetricRecord[]> {
  const targetUrl = normalizeGoogleSheetUrl(url);

  const response = await fetch(targetUrl, {
    headers: {
      "User-Agent": "Macollo-Greenhouse-Sync/2.0",
      Accept: "text/csv,text/plain,*/*",
    },
  });

  if (!response.ok) {
    throw new SheetsSyncError(
      `No se pudo acceder a Google Sheets / Drive (HTTP ${response.status}). Asegúrese de que el documento tenga permisos de lectura "Cualquier persona con el enlace puede ver" o esté "Publicado en la web como CSV".`,
      422,
    );
  }

  const rows = parseCSV(await response.text());
  if (rows.length < 2) {
    throw new SheetsSyncError(
      "El documento descargado está vacío o no contiene filas de datos.",
      422,
    );
  }

  const records = buildRecordsFromRows(rows);
  if (records.length === 0) {
    throw new SheetsSyncError(
      "No se pudieron extraer registros válidos del archivo de Google Sheets / Drive. Verifique las columnas del documento.",
      422,
    );
  }

  return records;
}

export class SheetsSyncError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "SheetsSyncError";
  }
}
