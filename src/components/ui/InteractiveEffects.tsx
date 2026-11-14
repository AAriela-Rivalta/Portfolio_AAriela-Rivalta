"use client";

import { useEffect } from "react";

/**
 * Un solo listener para todo el sitio: actualiza la posición del brillo de
 * las tarjetas con la clase "spotlight" (efecto inspirado en React Bits).
 * No renderiza nada.
 */
export function InteractiveEffects() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!target) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
