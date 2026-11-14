import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** "band" cuando el encabezado va sobre una banda verde. */
  tone?: "default" | "band";
  className?: string;
};

/** Encabezado común a todas las secciones: número, etiqueta, título y bajada. */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  description,
  tone = "default",
  className,
}: Props) {
  const onBand = tone === "band";
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p
        className={cn(
          "flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.18em]",
          onBand ? "text-band-accent" : "text-accent-text",
        )}
      >
        <span aria-hidden="true">{index}</span>
        <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl",
          onBand ? "text-band-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-lg leading-relaxed",
            onBand ? "text-band-muted" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
