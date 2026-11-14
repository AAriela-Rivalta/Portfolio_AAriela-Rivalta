import type { TerminalLine } from "@/data/projects";
import { cn } from "@/lib/utils";

const tones: Record<NonNullable<TerminalLine["tone"]>, string> = {
  command: "text-[#f59a5e] font-semibold",
  muted: "text-[#9fb3a8]",
  success: "text-[#8fd4b0]",
  accent: "text-[#f3c9a2]",
  default: "text-[#ece4d4]",
};

/** Muestra la salida real de un programa de terminal con estilo de ventana. */
export function TerminalPreview({ title, lines }: { title: string; lines: TerminalLine[] }) {
  return (
    <div className="flex h-full flex-col bg-[#0b1713]">
      <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-4 py-3">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-[#f08a4b]" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-[#e9dfcb]/60" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-[#8fd4b0]/70" />
        <span className="ml-2 truncate font-mono text-xs text-[#9fb3a8]">{title}</span>
      </div>
      <div
        role="region"
        aria-label={`Salida de la terminal: ${title}`}
        tabIndex={0}
        className="min-h-0 flex-1 overflow-auto p-4 sm:p-5"
      >
        <pre className="whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed sm:text-[13px]">
          {lines.map((line, i) => (
            <span key={i} className={cn("block min-h-[1.2em]", tones[line.tone ?? "default"])}>
              {line.text}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
}
