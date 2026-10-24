export interface BadgeStyle {
  label: string;
  class: string;
}

export interface HealthBadge extends BadgeStyle {
  icon: string;
}

const NO_DATA_BADGE =
  "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400 border-stone-300";

const NO_DATA_HEALTH_BADGE =
  "bg-stone-50 text-stone-600 dark:bg-stone-900/40 dark:text-stone-400 border-stone-200 dark:border-stone-700";

export function getPhBadge(ph: number): BadgeStyle {
  if (ph >= 6.0 && ph <= 6.8) {
    return {
      label: "Óptimo",
      class:
        "bg-lime-100 text-lime-800 dark:bg-lime-900/50 dark:text-lime-300 border-lime-300",
    };
  }
  if (ph >= 5.5 && ph <= 7.2) {
    return {
      label: "Atención",
      class:
        "bg-green-100 text-green-800 dark:bg-stone-900/50 dark:text-stone-300 border-green-300",
    };
  }
  return {
    label: "Crítico",
    class:
      "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border-rose-300",
  };
}

export function getProdBadge(prod: string): string {
  if (prod === "Alta") {
    return "bg-lime-100 text-lime-800 dark:bg-lime-900/50 dark:text-lime-300 border-lime-300";
  }
  if (prod === "Media") {
    return "bg-green-100 text-green-800 dark:bg-stone-900/50 dark:text-stone-300 border-green-300";
  }
  return "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border-rose-300";
}

export function getHealthBadge(sanidad: string): HealthBadge {
  if (sanidad === "Excelente" || sanidad === "Saludable") {
    return {
      icon: "🟢",
      label: sanidad,
      class:
        "bg-lime-50 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300 border-lime-200 dark:border-lime-800",
    };
  }
  if (sanidad === "Vulnerable") {
    return {
      icon: "🟡",
      label: sanidad,
      class:
        "bg-green-50 text-green-700 dark:bg-stone-900/40 dark:text-stone-300 border-green-200 dark:border-stone-800",
    };
  }
  return {
    icon: "🔴",
    label: sanidad,
    class:
      "bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-stone-800",
  };
}

export function getPhBadgeCompact(ph: number): string {
  if (ph >= 6.0 && ph <= 6.8) {
    return "bg-lime-100 text-lime-800 dark:bg-lime-950/60 dark:text-lime-300 border-lime-300";
  }
  if (ph >= 5.5 && ph <= 7.2) {
    return "bg-green-100 text-green-800 dark:bg-stone-950/60 dark:text-stone-300 border-green-300";
  }
  return "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300";
}

export function getHealthBadgeCompact(sanidad: string): string {
  if (sanidad === "Excelente" || sanidad === "Saludable") {
    return "bg-lime-100 text-lime-800 dark:bg-lime-950/60 dark:text-lime-300 border-lime-200";
  }
  if (sanidad === "Vulnerable") {
    return "bg-green-100 text-green-800 dark:bg-stone-950/60 dark:text-stone-300 border-green-200";
  }
  return "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200";
}

export { NO_DATA_BADGE, NO_DATA_HEALTH_BADGE };
