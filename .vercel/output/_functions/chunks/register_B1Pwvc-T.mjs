import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { t as pool } from "./client_DuhrWT4e.mjs";
import bcrypt from "bcryptjs";
//#region src/pages/api/auth/register.ts
var register_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
/**
* POST /api/auth/register
*
* Registra un nuevo usuario en PostgreSQL con contraseña hasheada (bcrypt).
*
* Body esperado (JSON):
*  - name:     string (opcional)
*  - email:    string (requerido)
*  - password: string (requerido)
*  - role:     'Super admin' | 'Admin' | 'Profesor' | 'Estudiante' | 'Usuario X'
*
* Respuestas:
*  - 201: Usuario registrado exitosamente
*  - 400: Email/contraseña faltantes o email ya registrado
*  - 500: Error interno de base de datos
*/
var VALID_ROLES = [
	"Super admin",
	"Admin",
	"Profesor",
	"Estudiante",
	"Usuario X"
];
var POST = async ({ request }) => {
	try {
		const { name, email, password, role } = await request.json();
		if (!email || !password) return new Response(JSON.stringify({ message: "El correo y la contraseña son obligatorios." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const assignedRole = VALID_ROLES.includes(role) ? role : "Usuario X";
		const cleanEmail = email.trim().toLowerCase();
		const cleanName = name?.trim() || cleanEmail.split("@")[0];
		if ((await pool.query("SELECT id FROM users WHERE LOWER(email) = $1", [cleanEmail])).rows.length > 0) return new Response(JSON.stringify({ message: "Este correo electrónico ya está registrado." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		try {
			const newUser = (await pool.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role", [
				cleanName,
				cleanEmail,
				hashedPassword,
				assignedRole
			])).rows[0];
			console.log(`[Register] Usuario registrado: ${newUser.email} (Rol: ${newUser.role})`);
			return new Response(JSON.stringify({
				message: "Usuario registrado exitosamente.",
				user: newUser
			}), {
				status: 201,
				headers: { "Content-Type": "application/json" }
			});
		} catch (insertError) {
			console.warn("[Register] Fallback: insertando sin columna role:", insertError.message);
			const newUser = {
				...(await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email", [
					cleanName,
					cleanEmail,
					hashedPassword
				])).rows[0],
				role: "Usuario X"
			};
			return new Response(JSON.stringify({
				message: "Usuario registrado (sin columna role).",
				user: newUser
			}), {
				status: 201,
				headers: { "Content-Type": "application/json" }
			});
		}
	} catch (error) {
		console.error("[Register] Error crítico en PostgreSQL:", error);
		return new Response(JSON.stringify({
			message: "Error interno en la base de datos.",
			error: error.message
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/register@_@ts
var page = () => register_exports;
//#endregion
export { page };
