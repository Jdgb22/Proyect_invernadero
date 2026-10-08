import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";

/**
 * Middleware global de Astro.
 * Intercepta todas las solicitudes HTTP al servidor antes de ser renderizadas o devueltas.
 *
 * Su función principal actual es la **protección de rutas**:
 * Verifica si el usuario intenta acceder a `/dashboard` u otras rutas privadas
 * y valida si existe una sesión activa mediante Auth.js. Si no hay sesión,
 * bloquea el acceso y redirige forzosamente al inicio (`/`).
 *
 * @see https://docs.astro.build/en/guides/middleware/
 */
export const onRequest = defineMiddleware(async (context, next) => {
  // Fix para que Auth.js funcione correctamente detrás de Cloudflare Tunnels u otros proxys
  const forwardedProto = context.request.headers.get("x-forwarded-proto");
  const forwardedHost =
    context.request.headers.get("x-forwarded-host") ||
    context.request.headers.get("host");

  if (forwardedProto && forwardedHost) {
    const originalUrl = new URL(context.request.url);
    if (originalUrl.protocol !== forwardedProto + ":") {
      const newUrl = new URL(context.request.url);
      newUrl.protocol = forwardedProto + ":";
      newUrl.host = forwardedHost;

      // Al reasignar context.request, Astro 4 propaga esta Request a Astro.request en las páginas.
      // Esto asegura que getSession en index.astro vea la URL con https:// y evalúe useSecureCookies = true
      context.request = new Request(newUrl.toString(), context.request);

      // También establecemos AUTH_URL para que las validaciones internas de origen CSRF de Auth.js confíen en esta URL
      process.env.AUTH_URL = `${forwardedProto}://${forwardedHost}/api/auth`;
    }
  }

  // Solo protegemos las rutas que empiezan con /dashboard o otras rutas privadas
  const isProtectedRoute = context.url.pathname.startsWith("/dashboard");

  if (isProtectedRoute) {
    const session = await getSession(context.request);

    // Si no hay sesión, redirigimos a la página de inicio (login)
    if (!session) {
      return context.redirect("/");
    }
  }

  // Continuar con la petición normal y capturar la respuesta
  const response = await next();

  // --- DEFENSA EN PROFUNDIDAD: SECURITY HEADERS ---
  // Evitar Clickjacking
  response.headers.set("X-Frame-Options", "DENY");
  // Evitar MIME-Sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");
  // Política estricta de Referrer
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // Forzar HTTPS (HSTS)
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );
  // Política base de CSP (Permite WebSockets para el dev server de Astro)
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: wss:; img-src 'self' data: https: blob:;",
  );

  return response;
});
