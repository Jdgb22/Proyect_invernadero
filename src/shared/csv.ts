import type { Productividad, Sanidad } from "./plantMatrix";

const NULL_TOKENS = new Set([
  "nd",
  "n/d",
  "na",
  "n/a",
  "-",
  "--",
  "null",
  "no tomada",
  "no medido",
  "pendiente",
  "",
]);

export function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  const cleanText = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const rawLines = cleanText.split("\n").filter((l) => l.trim().length > 0);

  if (rawLines.length === 0) return [];

  const firstLine = rawLines[0];
  const commaCount = (firstLine.match(/,/g) || []).length;
  const semiCount = (firstLine.match(/;/g) || []).length;
  const tabCount = (firstLine.match(/\t/g) || []).length;
  let delimiter = ",";
  if (semiCount > commaCount && semiCount > tabCount) delimiter = ";";
  else if (tabCount > commaCount && tabCount > semiCount) delimiter = "\t";

  for (const line of rawLines) {
    const row: string[] = [];
    let inQuotes = false;
    let currentToken = "";

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          currentToken += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        row.push(currentToken.trim());
        currentToken = "";
      } else {
        currentToken += char;
      }
    }
    row.push(currentToken.trim());
    lines.push(row);
  }

  return lines;
}

export function parseCsvNumber(val: string | undefined): number | null {
  if (!val) return null;
  const trimmed = val.trim().toLowerCase();
  if (NULL_TOKENS.has(trimmed)) return null;
  const cleaned = val.replace(",", ".").replace(/[^0-9.-]/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

export function isNullCell(val: string | undefined): boolean {
  return !val || NULL_TOKENS.has(val.trim().toLowerCase());
}

export function extractDateAndHour(rawVal: string | undefined): {
  fecha: string;
  hora: string;
} {
  if (!rawVal) return { fecha: "", hora: "" };
  const raw = rawVal.trim();

  let hora = "";
  const timeMatch = raw.match(
    /(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM|am|pm)?/i,
  );
  if (timeMatch) {
    let hh = parseInt(timeMatch[1], 10);
    const mm = timeMatch[2];
    const ampm = timeMatch[4]
      ? timeMatch[4].toUpperCase()
      : hh >= 12
        ? "PM"
        : "AM";
    if (hh > 12) hh -= 12;
    if (hh === 0) hh = 12;
    hora = `${String(hh).padStart(2, "0")}:${mm} ${ampm}`;
  }

  // 1. Fechas con nombre de mes en español o inglés (ej: 15-ene-2024, 15 de octubre de 2023, 15-nov-23)
  const SPANISH_MONTHS: Record<string, string> = {
    ene: "01",
    enero: "01",
    jan: "01",
    january: "01",
    feb: "02",
    febrero: "02",
    february: "02",
    mar: "03",
    marzo: "03",
    march: "03",
    abr: "04",
    abril: "04",
    apr: "04",
    april: "04",
    may: "05",
    mayo: "05",
    jun: "06",
    junio: "06",
    june: "06",
    jul: "07",
    julio: "07",
    july: "07",
    ago: "08",
    agosto: "08",
    aug: "08",
    august: "08",
    sep: "09",
    sept: "09",
    septiembre: "09",
    september: "09",
    oct: "10",
    octubre: "10",
    october: "10",
    nov: "11",
    noviembre: "11",
    november: "11",
    dic: "12",
    diciembre: "12",
    dec: "12",
    december: "12",
  };

  const textMonthMatch = raw.match(
    /(\d{1,2})\s*[-/. ]\s*(?:de\s+)?([a-zA-Zñáéíóú]+)\s*[-/. ]\s*(?:de\s+)?(\d{2,4})/i,
  );
  if (textMonthMatch) {
    const d = textMonthMatch[1].padStart(2, "0");
    const mStr = textMonthMatch[2]
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .slice(0, 3);
    const m = SPANISH_MONTHS[mStr];
    let y = textMonthMatch[3];
    if (y.length === 2) y = "20" + y;
    if (m) return { fecha: `${y}-${m}-${d}`, hora };
  }

  // 2. Formato ISO / YMD (YYYY-MM-DD o YYYY/MM/DD) con cualquier año de 4 dígitos
  const ymdMatch = raw.match(
    /\b((?:19|20)\d{2})[-/.](\d{1,2})[-/.](\d{1,2})\b/,
  );
  if (ymdMatch) {
    return {
      fecha: `${ymdMatch[1]}-${ymdMatch[2].padStart(2, "0")}-${ymdMatch[3].padStart(2, "0")}`,
      hora,
    };
  }

  // 3. Formato DMY o MDY con año de 4 dígitos (DD/MM/YYYY o MM/DD/YYYY)
  const dmyMatch = raw.match(
    /\b(\d{1,2})[-/.](\d{1,2})[-/.]((?:19|20)\d{2})\b/,
  );
  if (dmyMatch) {
    const p1 = parseInt(dmyMatch[1], 10);
    const p2 = parseInt(dmyMatch[2], 10);
    const y = dmyMatch[3];
    if (p1 > 12) {
      return {
        fecha: `${y}-${String(p2).padStart(2, "0")}-${String(p1).padStart(2, "0")}`,
        hora,
      };
    }
    if (p2 > 12) {
      return {
        fecha: `${y}-${String(p1).padStart(2, "0")}-${String(p2).padStart(2, "0")}`,
        hora,
      };
    }
    // Por defecto en español / Colombia: DD/MM/YYYY
    return {
      fecha: `${y}-${String(p2).padStart(2, "0")}-${String(p1).padStart(2, "0")}`,
      hora,
    };
  }

  // 4. Formato con año de 2 dígitos (ej: 15/05/23, 10/11/24, 5-1-24)
  const dmy2Match = raw.match(/\b(\d{1,2})[-/.](\d{1,2})[-/.](\d{2})\b/);
  if (dmy2Match) {
    const p1 = parseInt(dmy2Match[1], 10);
    const p2 = parseInt(dmy2Match[2], 10);
    const yy = parseInt(dmy2Match[3], 10);
    const y = String(yy < 50 ? 2000 + yy : 1900 + yy);
    if (p1 > 12) {
      return {
        fecha: `${y}-${String(p2).padStart(2, "0")}-${String(p1).padStart(2, "0")}`,
        hora,
      };
    }
    if (p2 > 12) {
      return {
        fecha: `${y}-${String(p1).padStart(2, "0")}-${String(p2).padStart(2, "0")}`,
        hora,
      };
    }
    return {
      fecha: `${y}-${String(p2).padStart(2, "0")}-${String(p1).padStart(2, "0")}`,
      hora,
    };
  }

  // 5. Serial numérico de Excel
  const numSerial = parseFloat(raw);
  if (!isNaN(numSerial) && numSerial > 30000 && numSerial < 70000) {
    const excelEpoch = new Date(1899, 11, 30);
    const dateObj = new Date(excelEpoch.getTime() + numSerial * 86400000);
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    return { fecha: `${y}-${m}-${d}`, hora };
  }

  return { fecha: raw.slice(0, 10), hora };
}

export function deriveSanidad(raw: string, phSuelo: number): Sanidad {
  const text = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (
    text.includes("crit") ||
    text.includes("mala") ||
    text.includes("enferma") ||
    text.includes("rojo")
  )
    return "Crítica";
  if (
    text.includes("vuln") ||
    text.includes("aten") ||
    text.includes("regular") ||
    text.includes("amarillo")
  )
    return "Vulnerable";
  if (
    text.includes("excel") ||
    text.includes("opt") ||
    text.includes("muy buena")
  )
    return "Excelente";

  if (phSuelo < 5.0 || phSuelo > 8.0) return "Crítica";
  if (phSuelo < 5.5 || phSuelo > 7.5) return "Vulnerable";
  if (phSuelo >= 6.0 && phSuelo <= 7.0) return "Excelente";
  return "Saludable";
}

export function deriveProductividad(raw: string): Productividad {
  const text = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (text.includes("baja") || text.includes("low") || text.includes("1"))
    return "Baja";
  if (text.includes("med") || text.includes("mid") || text.includes("2"))
    return "Media";
  return "Alta";
}
