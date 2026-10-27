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

  const ymdMatch = raw.match(/\b(202\d)[-/.](\d{1,2})[-/.](\d{1,2})\b/);
  if (ymdMatch) {
    return {
      fecha: `${ymdMatch[1]}-${ymdMatch[2].padStart(2, "0")}-${ymdMatch[3].padStart(2, "0")}`,
      hora,
    };
  }

  const dmyMatch = raw.match(/\b(\d{1,2})[-/.](\d{1,2})[-/.](202\d)\b/);
  if (dmyMatch) {
    return {
      fecha: `${dmyMatch[3]}-${dmyMatch[2].padStart(2, "0")}-${dmyMatch[1].padStart(2, "0")}`,
      hora,
    };
  }

  const numSerial = parseFloat(raw);
  if (!isNaN(numSerial) && numSerial > 40000 && numSerial < 60000) {
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

  if (phSuelo < 5.2 || phSuelo > 7.8) return "Crítica";
  if (phSuelo < 5.8 || phSuelo > 7.2) return "Vulnerable";
  if (phSuelo >= 6.2 && phSuelo <= 6.7) return "Excelente";
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
