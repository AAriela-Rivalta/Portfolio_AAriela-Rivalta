import { profile } from "@/data/profile";
import { StackIcon } from "./ui/Icons";

/**
 * Cinta infinita con el stack (inspirada en "Logo Loop" de React Bits).
 * Es decorativa: el stack completo está en "Sobre mí", así que se oculta a
 * lectores de pantalla. Solo CSS; se pausa al pasar el mouse.
 */
export function StackMarquee() {
  const items = profile.stack.flatMap((group) => group.items);

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y-2 border-ink bg-band py-5 text-band-foreground"
    >
      <div className="marquee-track flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={`${copy}-${item.name}`}
                className="flex items-center gap-3 px-6 font-display text-lg font-semibold uppercase tracking-wide sm:text-xl"
              >
                <StackIcon name={item.icon} className="size-6 text-band-muted" />
                {item.name}
                <span className="pl-6 text-band-accent">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-band to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-band to-transparent" />
    </div>
  );
}
