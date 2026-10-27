export const ROLE_LABELS: Record<string, string> = {
  Superadmin: "Superadmin",
  Admin: "Administrador de Cultivo",
  Agropecuario: "Dueño de Finca",
  Campesino: "Operario de Campo",
};

export const DEFAULT_ROLE_LABEL = "Operario de Campo";

export function roleLabel(role: unknown): string {
  return ROLE_LABELS[String(role ?? "")] || DEFAULT_ROLE_LABEL;
}
