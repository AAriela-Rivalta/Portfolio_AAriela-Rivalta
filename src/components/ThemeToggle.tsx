"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import { cn } from "@/lib/utils";

/**
 * Alterna entre modo claro y oscuro. El estado vive en el atributo
 * data-theme de <html> (lo inicializa un script en layout.tsx antes de pintar),
 * así que el ícono y el texto se resuelven solo con CSS, sin parpadeos.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    root.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Sin acceso a localStorage (modo privado): el cambio vale para esta visita.
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full border-2 border-ink bg-surface text-foreground transition-transform duration-200 hover:-rotate-12 active:scale-95",
        className,
      )}
    >
      <LuMoon aria-hidden="true" className="size-5 dark:hidden" />
      <LuSun aria-hidden="true" className="hidden size-5 dark:block" />
      <span className="sr-only dark:hidden">Activar modo oscuro</span>
      <span className="sr-only hidden dark:inline">Activar modo claro</span>
    </button>
  );
}
