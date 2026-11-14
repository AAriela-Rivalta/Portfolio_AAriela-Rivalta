import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "accent" | "primary" | "outline" | "ghost" | "band";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight transition-[transform,box-shadow,background-color,color] duration-200 ease-out select-none";

const variants: Record<Variant, string> = {
  // Naranja: el 10 % de la paleta. Solo para la acción principal.
  accent:
    "border-2 border-ink bg-accent text-accent-foreground shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  primary:
    "border-2 border-ink bg-primary text-primary-foreground shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
  outline:
    "border-2 border-ink bg-surface text-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm active:translate-x-0 active:translate-y-0 active:shadow-none",
  ghost: "text-foreground hover:bg-primary-soft",
  // Para usar sobre las bandas verdes
  band: "border-2 border-band-foreground/80 bg-transparent text-band-foreground hover:bg-band-foreground hover:text-band",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  children: ReactNode;
};

/** Link con aspecto de botón. Si es externo, abre en otra pestaña y lo anuncia. */
export function ButtonLink({
  href,
  variant = "outline",
  size = "md",
  external = false,
  className,
  children,
  ...rest
}: Props) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
    </a>
  );
}
