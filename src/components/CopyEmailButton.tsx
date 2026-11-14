"use client";

import { useEffect, useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";

/** Copia el mail al portapapeles y lo anuncia a lectores de pantalla. */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Si el navegador no permite copiar, el link mailto sigue disponible.
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-band-foreground/80 px-5 font-display text-sm font-semibold text-band-foreground transition-colors hover:bg-band-foreground hover:text-band"
      >
        {copied ? (
          <LuCheck aria-hidden="true" className="size-4 text-band-accent" />
        ) : (
          <LuCopy aria-hidden="true" className="size-4" />
        )}
        {copied ? "¡Copiado!" : "Copiar mail"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Mail copiado al portapapeles" : ""}
      </span>
    </>
  );
}
