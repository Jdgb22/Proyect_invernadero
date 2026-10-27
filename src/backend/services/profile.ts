import { pool } from "../../db/client";

export interface ProfileUpdate {
  name?: string;
  image?: string | null;
}

export interface ProfileRecord {
  name: string | null;
  image: string | null;
}

export async function updateOwnProfile(
  userId: number,
  data: ProfileUpdate,
): Promise<ProfileRecord | null> {
  const fields: string[] = [];
  const values: unknown[] = [userId];

  if (data.name !== undefined) {
    values.push(data.name);
    fields.push(`name = $${values.length}`);
  }
  if (data.image !== undefined) {
    values.push(data.image || null);
    fields.push(`image = $${values.length}`);
  }
  if (fields.length === 0) {
    const current = await pool.query(
      "SELECT name, image FROM users WHERE id = $1",
      [userId],
    );
    return current.rows[0] ?? null;
  }

  fields.push("updated_at = NOW()");
  const res = await pool.query(
    `UPDATE users SET ${fields.join(", ")} WHERE id = $1 RETURNING name, image`,
    values,
  );
  return res.rows[0] ?? null;
}

export async function getOwnEmail(userId: number): Promise<string | null> {
  const res = await pool.query("SELECT email FROM users WHERE id = $1", [
    userId,
  ]);
  return res.rows[0]?.email ?? null;
}
