"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { LuChevronLeft, LuChevronRight, LuMaximize2, LuX } from "react-icons/lu";
import type { ProjectMedia } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { TerminalPreview } from "./TerminalPreview";

type ImageMedia = Extract<ProjectMedia, { type: "image" }>;

type Props = {
  projectTitle: string;
  projectSlug: string;
  media: ProjectMedia[];
  /** "phones" muestra capturas de celular lado a lado (tarjetas chicas). */
  variant?: "carousel" | "phones";
};

/**
 * Galería de un proyecto.
 * - Carrusel: flechas, pestañas con el nombre de cada captura y teclado (← →).
 * - Las imágenes se pueden ampliar en un <dialog> nativo (Esc para cerrar).
 * - Si una imagen todavía no tiene `src`, muestra un placeholder.
 */
export function ProjectGallery({ projectTitle, projectSlug, media, variant = "carousel" }: Props) {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState<ImageMedia | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tabListRef = useRef<HTMLUListElement>(null);

  if (media.length === 0) return null;

  const openLightbox = (item: ImageMedia) => {
    setZoomed(item);
    dialogRef.current?.showModal();
  };
  const closeLightbox = () => dialogRef.current?.close();

  const lightbox = (
    <dialog
      ref={dialogRef}
      aria-label={zoomed ? `Captura ampliada: ${zoomed.caption}` : "Captura ampliada"}
      onClose={() => setZoomed(null)}
      onClick={(event) => {
        // Clic fuera de la imagen (sobre el fondo) cierra el lightbox
        if (event.target === event.currentTarget) closeLightbox();
      }}
      className="lightbox m-auto max-h-none max-w-none overflow-visible bg-transparent p-0 text-band-foreground"
    >
      {zoomed && (
        <figure className="flex flex-col items-center gap-4">
          <div
            className="relative overflow-hidden rounded-2xl border-2 border-band-foreground/30 bg-black"
            style={
              zoomed.orientation === "portrait"
                ? { height: "min(82vh, 900px)", aspectRatio: "39 / 80" }
                : { width: "min(92vw, 1200px)", aspectRatio: "16 / 10" }
            }
          >
            <Image src={zoomed.src} alt={zoomed.alt} fill sizes="92vw" className="object-contain" />
          </div>
          <figcaption className="font-display text-sm font-medium text-[#f2eadb]">{zoomed.caption}</figcaption>
        </figure>
      )}
      <button
        type="button"
        onClick={closeLightbox}
        className="fixed right-4 top-4 inline-flex size-12 items-center justify-center rounded-full border-2 border-[#f2eadb] bg-[#0d1b16] text-[#f2eadb] transition-transform hover:rotate-90"
      >
        <LuX aria-hidden="true" className="size-6" />
        <span className="sr-only">Cerrar</span>
      </button>
    </dialog>
  );

  // ---------------------------------------------------------------------------
  // Variante "phones": capturas de celular lado a lado
  // ---------------------------------------------------------------------------
  if (variant === "phones") {
    const phones = media.filter((m): m is ImageMedia => m.type === "image").slice(0, 3);
    const tilt = ["-rotate-6 translate-y-6", "z-10 -translate-y-1", "rotate-6 translate-y-6"];

    return (
      <>
        <ul className="group/phones flex items-start justify-center gap-3 sm:gap-4" aria-label={`Capturas de ${projectTitle}`}>
          {phones.map((item, i) => (
            <li
              key={item.caption}
              className={cn(
                "w-1/3 max-w-[150px] transition-transform duration-500 ease-out group-hover/phones:translate-y-0 group-hover/phones:rotate-0",
                phones.length === 3 ? tilt[i] : "",
              )}
            >
              <PhoneFrame
                item={item}
                projectSlug={projectSlug}
                onOpen={() => openLightbox(item)}
              />
            </li>
          ))}
        </ul>
        {lightbox}
      </>
    );
  }

  // ---------------------------------------------------------------------------
  // Variante "carousel": proyectos destacados
  // ---------------------------------------------------------------------------
  const total = media.length;
  const current = media[index];
  const go = (next: number) => {
    const target = (next + total) % total;
    setIndex(target);
    // Desplaza la tira de pestañas para que la activa quede centrada y visible
    const list = tabListRef.current;
    const tab = list?.children[target] as HTMLElement | undefined;
    if (list && tab) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      list.scrollTo({
        left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label={`Galería de ${projectTitle}. Usá las flechas del teclado para cambiar de vista.`}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-4"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border-2 border-ink bg-surface">
        <div key={index} className="absolute inset-0 animate-fade-up [animation-duration:450ms]">
          {current.type === "terminal" ? (
            <TerminalPreview title={current.title} lines={current.lines} />
          ) : current.src ? (
            <button
              type="button"
              onClick={() => openLightbox(current)}
              className="group/zoom relative block h-full w-full cursor-zoom-in"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-contain"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-surface px-3 py-1.5 text-xs font-semibold opacity-90 transition-opacity group-hover/zoom:opacity-100">
                <LuMaximize2 aria-hidden="true" className="size-3.5" />
                Ampliar
              </span>
            </button>
          ) : (
            <ImagePlaceholder caption={current.caption} projectSlug={projectSlug} />
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {total > 1 && (
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-surface transition-transform hover:-translate-x-0.5"
          >
            <LuChevronLeft aria-hidden="true" className="size-5" />
            <span className="sr-only">Vista anterior</span>
          </button>
        )}

        <ul ref={tabListRef} className="relative flex min-w-0 flex-1 gap-2 overflow-x-auto py-1 [scrollbar-width:thin]">
          {media.map((item, i) => (
            <li key={`${item.type}-${item.caption}`} className="shrink-0">
              <button
                type="button"
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
                className={cn(
                  "rounded-full border-2 px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors",
                  i === index
                    ? "border-ink bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted hover:border-ink hover:text-foreground",
                )}
              >
                {item.type === "terminal" ? item.title : item.caption}
              </button>
            </li>
          ))}
        </ul>

        {total > 1 && (
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-surface transition-transform hover:translate-x-0.5"
          >
            <LuChevronRight aria-hidden="true" className="size-5" />
            <span className="sr-only">Vista siguiente</span>
          </button>
        )}
      </div>

      <p className="flex items-baseline gap-2 text-sm text-muted">
        <span className="font-display font-semibold text-foreground">
          {index + 1}/{total}
        </span>
        {current.caption}
      </p>
      <p aria-live="polite" className="sr-only">
        Vista {index + 1} de {total}: {current.caption}
      </p>

      {lightbox}
    </div>
  );
}

function PhoneFrame({
  item,
  projectSlug,
  onOpen,
}: {
  item: ImageMedia;
  projectSlug: string;
  onOpen: () => void;
}) {
  const frame =
    "relative block aspect-[39/80] w-full overflow-hidden rounded-[1.4rem] border-[3px] border-ink bg-surface shadow-hard-sm";

  if (!item.src) {
    return (
      <div className={frame}>
        <ImagePlaceholder caption={item.caption} projectSlug={projectSlug} orientation="portrait" />
      </div>
    );
  }

  return (
    <button type="button" onClick={onOpen} className={cn(frame, "cursor-zoom-in")}>
      <Image src={item.src} alt={item.alt} fill sizes="150px" className="object-cover object-top" />
      <span className="sr-only">. Ampliar captura</span>
    </button>
  );
}
