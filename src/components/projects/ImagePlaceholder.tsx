import { LuImage } from "react-icons/lu";
import { cn, showPendingNotes } from "@/lib/utils";

type Props = {
  caption: string;
  projectSlug: string;
  orientation?: "landscape" | "portrait";
  className?: string;
};

/**
 * Placeholder para capturas que todavía no están cargadas.
 * Dibuja el esqueleto de una interfaz con la paleta del sitio.
 */
export function ImagePlaceholder({ caption, projectSlug, orientation = "landscape", className }: Props) {
  const portrait = orientation === "portrait";

  return (
    <div
      role="img"
      aria-label={`Captura pendiente: ${caption}`}
      className={cn("relative flex h-full w-full items-center justify-center overflow-hidden bg-background-alt", className)}
    >
      <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-50" />

      {/* Esqueleto de interfaz */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute flex gap-3 rounded-xl border border-border bg-surface/80 p-3",
          portrait ? "inset-3" : "inset-4 sm:inset-6",
        )}
      >
        {!portrait && (
          <div className="hidden w-1/5 flex-col gap-2 rounded-lg bg-primary/10 p-2 sm:flex">
            <span className="h-3 w-3/4 rounded bg-primary/40" />
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="h-2 rounded bg-primary/20" />
            ))}
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="h-3 w-1/3 rounded bg-foreground/15" />
            <span className="size-5 rounded-full bg-accent/50" />
          </div>
          <div className={cn("grid gap-2", portrait ? "grid-cols-2" : "grid-cols-3")}>
            {[0, 1, 2].slice(0, portrait ? 2 : 3).map((i) => (
              <span key={i} className="h-10 rounded-lg bg-primary/15" />
            ))}
          </div>
          <div className="flex flex-1 items-end gap-2 rounded-lg bg-background p-3">
            {[40, 65, 50, 80, 60, 90, 70].slice(0, portrait ? 4 : 7).map((h, i) => (
              <span
                key={i}
                className={cn("flex-1 rounded-t", i % 3 === 1 ? "bg-accent/45" : "bg-primary/35")}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-4 flex max-w-xs flex-col items-center gap-1.5 rounded-2xl border-2 border-ink bg-surface px-5 py-4 text-center shadow-hard-sm">
        <LuImage aria-hidden="true" className="size-6 text-primary" />
        <p className="font-display font-semibold leading-snug">{caption}</p>
        <p className="text-xs text-muted">Captura próximamente</p>
        {showPendingNotes && (
          <p className="mt-1 font-mono text-[10px] leading-snug text-accent-text">
            [dev] subí la imagen a /public/projects/{projectSlug}/ y completá «src» en data/projects.ts
          </p>
        )}
      </div>
    </div>
  );
}
