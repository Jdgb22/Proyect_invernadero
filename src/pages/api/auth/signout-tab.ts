import type { APIRoute } from "astro";

export const prerender = false;

function buildClearCookiesHeaders(request: Request): Headers {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const isHttps =
    request.url.startsWith("https://") ||
    request.headers.get("x-forwarded-proto") === "https";

  const cookieHeader = request.headers.get("cookie") || "";
  const cookieNames = new Set<string>([
    "authjs.session-token",
    "__Secure-authjs.session-token",
    "authjs.csrf-token",
    "__Host-authjs.csrf-token",
    "authjs.callback-url",
    "__Secure-authjs.callback-url",
    "finca_activa",
  ]);

  for (const item of cookieHeader.split(";")) {
    const rawName = item.trim().split("=")[0];
    if (
      rawName &&
      (rawName.startsWith("authjs.session-token") ||
        rawName.startsWith("__Secure-authjs.session-token"))
    ) {
      cookieNames.add(rawName);
    }
  }

  for (const name of cookieNames) {
    const needsSecure =
      isHttps || name.startsWith("__Secure-") || name.startsWith("__Host-");
    const secureFlag = needsSecure ? "; Secure" : "";
    headers.append(
      "Set-Cookie",
      `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; HttpOnly; SameSite=Lax${secureFlag}`,
    );
  }

  return headers;
}

export const POST: APIRoute = async ({ request }) => {
  const headers = buildClearCookiesHeaders(request);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers,
  });
};

export const GET: APIRoute = async ({ request }) => {
  const headers = buildClearCookiesHeaders(request);
  headers.set("Location", "/");
  return new Response(null, {
    status: 302,
    headers,
  });
};
