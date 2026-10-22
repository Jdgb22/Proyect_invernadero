export type ThemePreference = "light" | "dark" | "system";
export type TempUnit = "C" | "F";

export const THEME_STORAGE_KEY = "macollo-theme";
export const TEMP_UNIT_STORAGE_KEY = "macollo-temp-unit";
export const SYNC_MINUTES_STORAGE_KEY = "macollo-sync-minutes";
export const PREFERENCES_CHANGED_EVENT = "macollo:preferences-changed";
export const NOTIFY_CRITICAL_KEY = "macollo-notify-critical";
export const NOTIFY_WEEKLY_KEY = "macollo-notify-weekly";
export const NOTIFY_MAINTENANCE_KEY = "macollo-notify-maintenance";
export const WEEKLY_SUMMARY_LAST_KEY = "macollo-weekly-summary-last";

export const SYNC_OPTIONS = [1, 5, 15, 60] as const;
export const DEFAULT_SYNC_MINUTES = 5;

export interface PreferencesDetail {
  theme: ThemePreference;
  unit: TempUnit;
  syncMinutes: number;
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function read(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

export function getThemePreference(): ThemePreference {
  const value = read(THEME_STORAGE_KEY);
  return value === "light" || value === "dark" ? value : "system";
}

export function getTempUnit(): TempUnit {
  return read(TEMP_UNIT_STORAGE_KEY) === "F" ? "F" : "C";
}

function readFlag(key: string, fallback: boolean): boolean {
  const value = read(key);
  if (value === null) return fallback;
  return value === "1";
}

function writeFlag(key: string, value: boolean): void {
  write(key, value ? "1" : "0");
}

export function getNotifyCritical(): boolean {
  return readFlag(NOTIFY_CRITICAL_KEY, true);
}

export function getNotifyWeekly(): boolean {
  return readFlag(NOTIFY_WEEKLY_KEY, true);
}

export function getNotifyMaintenance(): boolean {
  return readFlag(NOTIFY_MAINTENANCE_KEY, false);
}

export function setNotifyPreference(
  kind: "critical" | "weekly" | "maintenance",
  enabled: boolean,
): void {
  const key =
    kind === "critical"
      ? NOTIFY_CRITICAL_KEY
      : kind === "weekly"
        ? NOTIFY_WEEKLY_KEY
        : NOTIFY_MAINTENANCE_KEY;
  writeFlag(key, enabled);
  notifyPreferencesChanged();
}

export function markWeeklySummarySent(): void {
  write(WEEKLY_SUMMARY_LAST_KEY, String(Date.now()));
}

export function getSyncMinutes(): number {
  const value = Number(read(SYNC_MINUTES_STORAGE_KEY));
  return (SYNC_OPTIONS as readonly number[]).includes(value)
    ? value
    : DEFAULT_SYNC_MINUTES;
}

export function getSyncIntervalMs(): number {
  return getSyncMinutes() * 60_000;
}

export function currentPreferences(): PreferencesDetail {
  return {
    theme: getThemePreference(),
    unit: getTempUnit(),
    syncMinutes: getSyncMinutes(),
  };
}

export function notifyPreferencesChanged(): void {
  if (!isBrowser()) return;
  window.dispatchEvent(
    new CustomEvent<PreferencesDetail>(PREFERENCES_CHANGED_EVENT, {
      detail: currentPreferences(),
    }),
  );
}

export function applyTheme(preference = getThemePreference()): boolean {
  if (!isBrowser()) return false;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = preference === "dark" || (preference === "system" && systemDark);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  return dark;
}

export function setThemePreference(preference: ThemePreference): void {
  write(THEME_STORAGE_KEY, preference);
  applyTheme(preference);
  notifyPreferencesChanged();
}

export function setSyncMinutes(minutes: number): void {
  const value = (SYNC_OPTIONS as readonly number[]).includes(minutes)
    ? minutes
    : DEFAULT_SYNC_MINUTES;
  write(SYNC_MINUTES_STORAGE_KEY, String(value));
  notifyPreferencesChanged();
}

const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "TEXTAREA",
  "NOSCRIPT",
  "TEMPLATE",
  "CODE",
]);

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

function toF(celsius: number): number {
  return round((celsius * 9) / 5 + 32);
}

function toC(fahrenheit: number): number {
  return round(((fahrenheit - 32) * 5) / 9);
}

const NUMBER = "(-?\\d+(?:[.,]\\d+)?)";
const RANGE_SEPARATOR = "([-–—])";

function convertText(text: string, unit: TempUnit): string {
  const source = unit === "F" ? "C" : "F";
  const target = unit === "F" ? "F" : "C";
  const convert = unit === "F" ? toF : toC;
  const parse = (raw: string) => Number(raw.replace(",", "."));

  const range = new RegExp(
    `${NUMBER}\\s*°\\s*${RANGE_SEPARATOR}\\s*${NUMBER}\\s*°${source}`,
    "g",
  );
  let result = text.replace(
    range,
    (_match, first, separator, second) =>
      `${convert(parse(first))}°${target} ${separator} ${convert(parse(second))}°${target}`,
  );

  const numeric = new RegExp(`${NUMBER}\\s*°${source}`, "g");
  result = result.replace(
    numeric,
    (_match, value) => `${convert(parse(value))}°${target}`,
  );

  return result.replaceAll(`°${source}`, `°${target}`);
}

export function applyTempUnitToDocument(unit = getTempUnit()): void {
  if (!isBrowser() || typeof NodeFilter === "undefined") return;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || SKIP_TAGS.has(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (parent.closest("[data-no-temp-convert]")) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue?.includes("°")
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    },
  );

  const nodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    nodes.push(node as Text);
    node = walker.nextNode();
  }

  for (const textNode of nodes) {
    const current = textNode.nodeValue ?? "";
    const next = convertText(current, unit);
    if (next !== current) textNode.nodeValue = next;
  }
}

export function convertTempValue(celsius: number): number {
  return getTempUnit() === "F" ? round((celsius * 9) / 5 + 32) : round(celsius);
}

export function convertTempDelta(celsiusDelta: number): number {
  return getTempUnit() === "F"
    ? round((celsiusDelta * 9) / 5)
    : round(celsiusDelta);
}

export function setTempUnit(unit: TempUnit): void {
  write(TEMP_UNIT_STORAGE_KEY, unit === "F" ? "F" : "C");
  applyTempUnitToDocument(unit);
  notifyPreferencesChanged();
}

export function onPreferencesChanged(
  callback: (detail: PreferencesDetail) => void,
): () => void {
  if (!isBrowser()) return () => {};
  const handler = (event: Event) => {
    callback((event as CustomEvent<PreferencesDetail>).detail);
  };
  window.addEventListener(PREFERENCES_CHANGED_EVENT, handler);
  return () => window.removeEventListener(PREFERENCES_CHANGED_EVENT, handler);
}

if (isBrowser()) {
  window.addEventListener("storage", (event) => {
    if (!event.key) return;
    if (event.key === THEME_STORAGE_KEY) {
      applyTheme();
    } else if (event.key === TEMP_UNIT_STORAGE_KEY) {
      applyTempUnitToDocument();
    } else if (
      event.key === SYNC_MINUTES_STORAGE_KEY ||
      event.key === NOTIFY_CRITICAL_KEY ||
      event.key === NOTIFY_WEEKLY_KEY ||
      event.key === NOTIFY_MAINTENANCE_KEY
    ) {
      notifyPreferencesChanged();
    }
  });
}
