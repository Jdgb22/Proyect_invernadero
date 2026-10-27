import type { MetricRecord } from "./plantMatrix";

export function recordsStorageKey(scope: string): string {
  return `macollo_custom_history_records_${scope}`;
}

export function legacyRecordsStorageKey(scope: string): string {
  return `aquasens_custom_history_records_${scope}`;
}

export function sheetsUrlStorageKey(scope: string): string {
  return `macollo_google_sheet_url_${scope}`;
}

export function lastSyncStorageKey(scope: string): string {
  return `macollo_last_sync_time_${scope}`;
}

const REAL_ID_PREFIXES = ["MET-GS-", "MET-UPLOAD-"];

export function isRealRecord(record: unknown): boolean {
  if (!record || typeof record !== "object") return false;
  const id = (record as { id?: unknown }).id;
  return (
    typeof id === "string" &&
    REAL_ID_PREFIXES.some((prefix) => id.startsWith(prefix))
  );
}

export function purgeMockStorage(scope: string): void {
  if (typeof localStorage === "undefined") return;

  const keys = [recordsStorageKey(scope), legacyRecordsStorageKey(scope)];
  for (const key of keys) {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) continue;
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        localStorage.removeItem(key);
        continue;
      }
      const realOnly = parsed.filter(isRealRecord);
      if (realOnly.length === 0) {
        localStorage.removeItem(key);
      } else if (realOnly.length !== parsed.length) {
        localStorage.setItem(key, JSON.stringify(realOnly));
      }
    } catch {
      localStorage.removeItem(key);
    }
  }
}

export function recordKey(record: MetricRecord): string {
  return `${record.plantId}|${record.fila}|${record.columna}|${record.fecha}|${record.hora}`;
}

function timestampOf(record: MetricRecord): string {
  return `${record.fecha} ${record.hora}`;
}

export function mergeRecords(
  serverRecords: MetricRecord[],
  localRecords: MetricRecord[],
): MetricRecord[] {
  const merged = new Map<string, MetricRecord>();
  for (const record of serverRecords) merged.set(recordKey(record), record);
  for (const record of localRecords) {
    const key = recordKey(record);
    const current = merged.get(key);
    if (!current || timestampOf(record) >= timestampOf(current)) {
      merged.set(key, record);
    }
  }
  return Array.from(merged.values()).sort((a, b) =>
    timestampOf(a).localeCompare(timestampOf(b)),
  );
}

export function readStoredRecords(scope: string): MetricRecord[] {
  if (typeof localStorage === "undefined") return [];

  const raw =
    localStorage.getItem(recordsStorageKey(scope)) ||
    localStorage.getItem(legacyRecordsStorageKey(scope));
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as MetricRecord[]) : [];
  } catch {
    return [];
  }
}

export function writeStoredRecords(
  scope: string,
  records: MetricRecord[],
): void {
  if (typeof localStorage === "undefined") return;

  const serialized = JSON.stringify(records);
  localStorage.setItem(recordsStorageKey(scope), serialized);
  localStorage.setItem(legacyRecordsStorageKey(scope), serialized);
}
