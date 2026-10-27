import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { pool } from "../../../../db/client";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const session = await getSession(request);
    if (!session?.user) {
      return new Response("No autorizado", { status: 401 });
    }

    const id = params.id;
    if (!id) {
      return new Response("ID requerido", { status: 400 });
    }

    const res = await pool.query("SELECT * FROM photos WHERE id = $1 LIMIT 1", [
      id,
    ]);
    const photo = res.rows[0];
    if (!photo) {
      return new Response("Foto no encontrada", { status: 404 });
    }

    const possiblePaths = [
      photo.url?.startsWith("/")
        ? join(process.cwd(), "public", photo.url.slice(1))
        : null,
      photo.filename
        ? join(process.cwd(), "public", "uploads", photo.filename)
        : null,
      photo.filename
        ? join(process.cwd(), "public", "uploads", "gallery", photo.filename)
        : null,
      photo.filename
        ? join(process.cwd(), "public", "uploads", "galeria", photo.filename)
        : null,
      photo.filename ? join(process.cwd(), "uploads", photo.filename) : null,
    ].filter(Boolean) as string[];

    for (const filePath of possiblePaths) {
      try {
        const buffer = await readFile(filePath);
        const headers = new Headers();
        if (photo.mime_type) {
          headers.set("Content-Type", String(photo.mime_type));
        } else {
          const ext = (photo.filename || "").split(".").pop()?.toLowerCase();
          if (ext === "png") headers.set("Content-Type", "image/png");
          else if (ext === "webp") headers.set("Content-Type", "image/webp");
          else if (ext === "gif") headers.set("Content-Type", "image/gif");
          else if (ext === "avif") headers.set("Content-Type", "image/avif");
          else headers.set("Content-Type", "image/jpeg");
        }
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
        headers.set("Content-Length", buffer.length.toString());
        return new Response(buffer, { status: 200, headers });
      } catch (e) {
        continue;
      }
    }

    if (photo.url && photo.url.startsWith("http")) {
      return Response.redirect(photo.url, 302);
    }

    return new Response("Archivo no disponible", { status: 404 });
  } catch (error) {
    return new Response("Error interno", { status: 500 });
  }
};
