import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { pool } from "../../../db/client";
import { getAuthUser } from "../../../backend/services/authz";
import { getFincaCookie } from "../../../backend/services/authz";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const session = await getSession(request);
    if (!session?.user) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await getAuthUser(request);
    if (!user) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return new Response(
        JSON.stringify({ error: "No se proporcionó ningún archivo válido." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const caption = (formData.get("caption") as string | null) || null;
    const takenAt = (formData.get("taken_at") as string | null) || null;

    let fincaId: number | null = null;
    const cookieId = Number(getFincaCookie(request));
    if (Number.isInteger(cookieId) && cookieId > 0) {
      fincaId = cookieId;
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type || "image/jpeg";
    const ext = mimeType.includes("png")
      ? "png"
      : mimeType.includes("webp")
        ? "webp"
        : mimeType.includes("gif")
          ? "gif"
          : mimeType.includes("avif")
            ? "avif"
            : "jpg";

    const filename = `${randomUUID()}.${ext}`;
    const uploadDir = join(process.cwd(), "public", "uploads", "gallery");
    await mkdir(uploadDir, { recursive: true });
    const filePath = join(uploadDir, filename);
    await writeFile(filePath, bytes);

    const url = `/uploads/gallery/${filename}`;

    const result = await pool.query(
      `INSERT INTO photos (filename, url, mime_type, size_bytes, caption, finca_id, user_id, taken_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8::timestamptz, NOW()))
       RETURNING id, url, filename`,
      [
        filename,
        url,
        mimeType,
        bytes.length,
        caption,
        fincaId,
        user.id,
        takenAt,
      ],
    );

    return new Response(JSON.stringify({ ok: true, photo: result.rows[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Error al guardar la foto en la galería." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
