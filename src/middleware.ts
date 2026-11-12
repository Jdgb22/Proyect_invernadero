import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";
import { rateLimit, clientIp } from "./backend/services/rateLimit";

/**
 * Rutas de páginas que exigen sesión activa.
 * /dashboard no existe (protección muerta) — se reemplaza por las rutas reales.
 */
const PROTECTED_PAGES = [
  "/metrics",
  "/history",
  "/settings",
  "/farms",
  "/gallery",
  "/admin",
];

/** Prefijos de API que exigen sesión (además de los que autorizan internamente). */
const PROTECTED_API_PREFIXES = [
  "/api/farms",
  "/api/invitations",
  "/api/admin",
  "/api/farm",
  "/api/gallery",
  "/api/sync-sheets",
  "/api/export-excel",
];

/** Endpoints con límite de tasa por IP (intentos/min). */
const RATE_LIMITED: { prefix: string; limit: number; windowSeconds: number }[] =
  [
    { prefix: "/api/auth/register", limit: 10, windowSeconds: 300 },
    { prefix: "/api/auth/forgot-password", limit: 8, windowSeconds: 300 },
    { prefix: "/api/auth/reset-password", limit: 8, windowSeconds: 300 },
    { prefix: "/api/auth/callback/credentials", limit: 20, windowSeconds: 300 },
    { prefix: "/api/invitations/use", limit: 15, windowSeconds: 300 },
  ];

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(self *), microphone=(), geolocation=(self), payment=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-DNS-Prefetch-Control": "off",
  // CSP práctica: Astro inyecta scripts/estilos inline en dev; en producción
  // los procesados son externos pero se permite inline para no romper componentes.
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    // El Dashboard consulta clima (Open-Meteo) y calidad del aire (WAQI) desde el cliente.
    "connect-src 'self' https://api.open-meteo.com https://api.waqi.info",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; "),
};

function applySecurityHeaders(headers: Headers, isHttps: boolean): void {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    headers.set(k, v);
  }
  if (isHttps) {
    headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
  }
}

export const onRequest = defineMiddleware(async (context, next) => {
  // Fix para que Auth.js funcione correctamente detrás de Cloudflare Tunnels u otros proxys
  const forwardedProto = context.request.headers.get("x-forwarded-proto");
  const forwardedHost =
    context.request.headers.get("x-forwarded-host") ||
    context.request.headers.get("host");

  let isHttps =
    context.request.url.startsWith("https://") || forwardedProto === "https";

  if (forwardedProto && forwardedHost) {
    const originalUrl = new URL(context.request.url);
    if (originalUrl.protocol !== forwardedProto + ":") {
      const newUrl = new URL(context.request.url);
      newUrl.protocol = forwardedProto + ":";
      newUrl.host = forwardedHost;

      context.request = new Request(newUrl.toString(), context.request);
      process.env.AUTH_URL = `${forwardedProto}://${forwardedHost}/api/auth`;
    }
  }

  const { pathname } = context.url;

  // ---- Rate limiting para endpoints sensibles ----
  for (const rule of RATE_LIMITED) {
    if (pathname === rule.prefix || pathname.startsWith(rule.prefix + "/")) {
      const ip = clientIp(context.request);
      const result = rateLimit(
        `${rule.prefix}:${ip}`,
        rule.limit,
        rule.windowSeconds,
      );
      if (!result.ok) {
        const response = new Response(
          JSON.stringify({
            message: "Demasiados intentos. Intenta de nuevo en unos segundos.",
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": String(result.retryAfterSeconds),
            },
          },
        );
        applySecurityHeaders(response.headers, isHttps);
        return response;
      }
      break;
    }
  }

  // ---- Protección de rutas ----
  const isProtectedPage = PROTECTED_PAGES.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  const isProtectedApi = PROTECTED_API_PREFIXES.some((p) =>
    pathname.startsWith(p),
  );

  if (isProtectedPage || isProtectedApi) {
    const session = await getSession(context.request);
    if (!session) {
      if (isProtectedApi) {
        const response = new Response(
          JSON.stringify({ message: "No autenticado." }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
        applySecurityHeaders(response.headers, isHttps);
        return response;
      }
      // Página: conserva destino para volver tras login
      const redirectUrl = new URL(context.request.url);
      const destino = `${redirectUrl.pathname}${redirectUrl.search}`;
      const destinoParam =
        destino && destino !== "/"
          ? `?desde=${encodeURIComponent(destino)}`
          : "";
      const response = context.redirect(`/${destinoParam}`);
      applySecurityHeaders(response.headers, isHttps);
      return response;
    }
  }

  const response = await next();
  applySecurityHeaders(response.headers, isHttps);
  return response;
});
