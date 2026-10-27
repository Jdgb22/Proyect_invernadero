/**
 * General shared utilities for formatting, escaping, and avatars.
 */

export function toScriptJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

const AVATAR_PALETTE = [
  "bg-emerald-500",
  "bg-lime-500",
  "bg-green-600",
  "bg-teal-500",
  "bg-amber-500",
  "bg-orange-500",
  "bg-sky-500",
  "bg-indigo-500",
];

export function avatarColorFor(name: string): string {
  const safeName = name || "";
  let hash = 0;
  for (let i = 0; i < safeName.length; i++) {
    hash = (hash * 31 + safeName.charCodeAt(i)) | 0;
  }
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}
