/** Une clases de Tailwind ignorando valores vacíos. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const PENDING_PREFIX = "COMPLETAR";

/** true si el dato falta o todavía dice "COMPLETAR: ...". */
export function isPending(value?: string | null): boolean {
  return !value || value.trim().toUpperCase().startsWith(PENDING_PREFIX);
}

/** Los avisos "COMPLETAR" solo se ven mientras desarrollás (npm run dev). */
export const showPendingNotes = process.env.NODE_ENV !== "production";
