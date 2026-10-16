// src/backend/services/rateLimit.ts
// Límite de tasa en memoria (sliding window) para endpoints sensibles.
// Nota: en serverless (Vercel) cada instancia tiene su propio mapa; es una
// línea base anti-abuso, no un límite global distribuido.

interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

interface RateLimitResult {
  ok: boolean;
  retryAfterSeconds: number;
}

/**
 * Registra un intento y decide si se permite.
 * @param key    clave lógica, p. ej. `register:1.2.3.4`
 * @param limit  máximo de peticiones en la ventana
 * @param windowSeconds tamaño de la ventana en segundos
 */
export function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  if (buckets.size > MAX_BUCKETS) {
    // Limpieza perezosa: elimina buckets vacíos para no crecer sin control
    for (const [k, b] of buckets) {
      b.hits = b.hits.filter((t) => now - t < windowMs);
      if (b.hits.length === 0) buckets.delete(k);
    }
  }

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { hits: [] };
    buckets.set(key, bucket);
  }

  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);

  if (bucket.hits.length >= limit) {
    const oldest = bucket.hits[0];
    const retryAfterMs = windowMs - (now - oldest);
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
    };
  }

  bucket.hits.push(now);
  return { ok: true, retryAfterSeconds: 0 };
}

/** Extrae la IP del cliente detrás de proxy (Vercel/Cloudflare). */
export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
