"use client";

import { useEffect, useRef, useState } from "react";
import { LuDownload, LuMenu, LuX } from "react-icons/lu";
import { navLinks, profile, type SectionId } from "@/data/profile";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId>("inicio");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Borde y fondo al bajar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Marca en la navbar la sección que se está leyendo
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Menú móvil: Escape cierra y devuelve el foco al botón
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || open
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {/* Barra de progreso de lectura (solo CSS) */}
      <div aria-hidden="true" className="scroll-progress absolute inset-x-0 top-0 h-[3px] bg-accent" />

      <nav
        aria-label="Principal"
        className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#inicio"
          className="group flex items-center gap-3 rounded-full"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="relative grid size-10 place-items-center rounded-xl border-2 border-ink bg-primary font-display text-sm font-bold text-primary-foreground transition-transform duration-300 group-hover:-rotate-6"
          >
            AR
            <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-ink bg-accent" />
          </span>
          <span className="font-display text-base font-semibold tracking-tight">
            {profile.name}
            <span className="sr-only">, ir al inicio</span>
          </span>
        </a>

        {/* Escritorio */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "location" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active === link.id ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300",
                      active === link.id ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="mx-2 h-6 w-px bg-border" />
          <ThemeToggle />
          <a
            href={profile.cvPath}
            download={profile.cvFileName}
            className="ml-2 inline-flex h-11 items-center gap-2 rounded-full border-2 border-ink bg-accent px-4 font-display text-sm font-semibold text-accent-foreground shadow-hard-sm transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <LuDownload aria-hidden="true" className="size-4" />
            CV
            <span className="sr-only"> (descargar PDF)</span>
          </a>
        </div>

        {/* Móvil */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-11 items-center justify-center rounded-full border-2 border-ink bg-surface"
          >
            {open ? (
              <LuX aria-hidden="true" className="size-5" />
            ) : (
              <LuMenu aria-hidden="true" className="size-5" />
            )}
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </nav>

      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-border bg-background px-4 pb-6 pt-2 md:hidden"
      >
        <ul className="flex flex-col">
          {navLinks.map((link, index) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "location" : undefined}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-border py-4 font-display text-2xl font-semibold"
              >
                <span aria-hidden="true" className="text-sm font-medium text-accent-text">
                  0{index + 1}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.cvPath}
          download={profile.cvFileName}
          onClick={() => setOpen(false)}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-accent font-display font-semibold text-accent-foreground shadow-hard-sm"
        >
          <LuDownload aria-hidden="true" className="size-4" />
          Descargar CV
        </a>
      </div>
    </header>
  );
}
