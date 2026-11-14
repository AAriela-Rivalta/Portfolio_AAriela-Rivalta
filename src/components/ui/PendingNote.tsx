import { cn, isPending, showPendingNotes } from "@/lib/utils";

/**
 * Muestra un recuadro punteado con el texto "COMPLETAR: ..." solo en
 * desarrollo, para que veas qué datos faltan. En producción no se muestra.
 */
export function PendingNote({ value, className }: { value?: string; className?: string }) {
  if (!showPendingNotes || !isPending(value)) return null;
  return (
    <p
      className={cn(
        "rounded-lg border-2 border-dashed border-accent bg-accent/10 px-3 py-2 font-mono text-xs leading-relaxed text-foreground",
        className,
      )}
    >
      <span className="font-bold">[dev]</span> {value || "COMPLETAR: dato faltante"}
    </p>
  );
}
