// POST /api/fincas          — crear finca (Agropecuario, Admin, Superadmin)
// GET  /api/fincas          — listar fincas visibles para el usuario
import type { APIRoute } from "astro";
import { z } from "zod";
import {
  getAuthUser,
  json,
  unauthorized,
  forbidden,
  parseJsonBody,
} from "../../../backend/services/authz";
import {
  createFinca,
  listFincasForUser,
  FincaError,
} from "../../../backend/services/fincas";

const CreateFincaSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre de la finca debe tener al menos 2 caracteres.")
    .max(255, "El nombre es demasiado largo."),
  descripcion: z.string().trim().max(2000).optional().or(z.literal("")),
  ubicacion: z.string().trim().max(500).optional().or(z.literal("")),
});

export const GET: APIRoute = async ({ request }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const fincas = await listFincasForUser(user.id, user.role);
  return json({ fincas });
};

export const POST: APIRoute = async ({ request }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  if (user.role === "Campesino") {
    return forbidden(
      "Solo los Agropecuarios, Admins y Superadmins pueden crear fincas.",
    );
  }

  const body = await parseJsonBody(request);
  if (body === null) return json({ message: "Cuerpo JSON inválido." }, 400);

  const parsed = CreateFincaSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { message: parsed.error.issues[0]?.message || "Datos no válidos." },
      400,
    );
  }

  try {
    const finca = await createFinca(user.id, {
      nombre: parsed.data.nombre,
      descripcion: parsed.data.descripcion || null,
      ubicacion: parsed.data.ubicacion || null,
    });
    return json({ message: "Finca creada.", finca }, 201);
  } catch (err) {
    if (err instanceof FincaError)
      return json({ message: err.message }, err.status);
    console.error("[Fincas] Error creando finca:", err);
    return json({ message: "Error al crear la finca." }, 500);
  }
};
