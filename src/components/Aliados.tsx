"use client";

import Reveal from "@/components/ui/Reveal";

// ─────────────────────────────────────────────────────────────────────────────
// ALIADOS — aliados estratégicos del proyecto (distintos de "Marcas que han
// confiado en nosotros"). Reemplaza cada plantilla por el aliado real:
//   name  → nombre del aliado
//   role  → rol / categoría (constructora, banca, firma legal, etc.)
//   Para el logo real: sube el archivo a /public/images/aliados y cambia
//   <PlaceholderMark> por <img src="/images/aliados/tu-logo.svg" ... />
// ─────────────────────────────────────────────────────────────────────────────
interface Ally {
  name: string;
  role: string;
}

const ALLIES: Ally[] = [
  { name: "Aliado 01", role: "Constructora" },
  { name: "Aliado 02", role: "Entidad financiera" },
  { name: "Aliado 03", role: "Firma legal" },
];

/**
 * Aliados — nuestros aliados estratégicos, en una cuadrícula de 3 (por ahora,
 * plantillas). Presentación distinta al marquee de "Marcas que han confiado".
 */
export default function Aliados() {
  return (
    <section
      id="aliados"
      className="relative w-full bg-ink py-24 scroll-mt-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <p className="text-center text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/90">
            Aliados
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mx-auto mt-6 max-w-2xl text-balance text-center font-serif text-3xl font-extralight leading-[1.15] tracking-tight text-white sm:text-4xl">
            Nuestros aliados
            <span className="block font-light italic text-shimmer">
              estratégicos
            </span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
          {ALLIES.map((ally) => (
            <div
              key={ally.name}
              className="group flex flex-col items-center gap-5 bg-ink px-8 py-14 transition-colors duration-500 hover:bg-white/[0.02]"
            >
              <PlaceholderMark />
              <div className="text-center">
                <p className="font-serif text-lg font-light tracking-[0.15em] text-white/80 transition-colors duration-500 group-hover:text-champagne">
                  {ally.name}
                </p>
                <p className="mt-2 text-[0.6rem] font-light uppercase tracking-[0.3em] text-white/35">
                  {ally.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Logo de plantilla — reemplazar por el logo real de cada aliado ── */

function PlaceholderMark() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden
      className="text-white/30 transition-colors duration-500 group-hover:text-bronze"
    >
      <rect
        x="1"
        y="1"
        width="54"
        height="54"
        rx="10"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M18 34l10-14 10 14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="38" r="2" fill="currentColor" />
    </svg>
  );
}
