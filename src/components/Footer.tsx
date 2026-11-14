import { LuArrowUp } from "react-icons/lu";
import { navLinks, profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-band-border bg-band text-band-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-lg border-2 border-band-foreground/70 font-display text-xs font-bold text-band-foreground"
          >
            AR
          </span>
          <p className="text-sm">
            © {profile.year} {profile.name} · {profile.role}
          </p>
        </div>

        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="transition-colors hover:text-band-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5 text-sm">
          <p>Hecho con Next.js, TypeScript y Tailwind CSS</p>
          <a
            href="#inicio"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-band-foreground/70 text-band-foreground transition-transform hover:-translate-y-1"
          >
            <LuArrowUp aria-hidden="true" className="size-4" />
            <span className="sr-only">Volver arriba</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
