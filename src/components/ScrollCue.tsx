"use client";

import { scrollToSection } from "@/lib/sections";

/** Indicador sutil de scroll al pie del Hero. */
export default function ScrollCue() {
  return (
    <button
      onClick={() => scrollToSection("manifesto")}
      className="group absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      aria-label="Continuar"
    >
      <span className="text-[0.6rem] font-light uppercase tracking-[0.35em] text-white/50 transition-colors group-hover:text-white/80">
        Descubrir
      </span>
      <span className="relative h-12 w-px overflow-hidden bg-white/15">
        <span className="absolute inset-x-0 top-0 h-1/2 w-px animate-[fade-in_1.5s_ease-in-out_infinite] bg-bronze" />
      </span>
    </button>
  );
}
