"use client";

import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

// ─────────────────────────────────────────────────────────────────────────────
// MARCAS — logos de plantilla (placeholder)
// Reemplaza cada objeto por el logo real de la marca aliada:
//   name → nombre de la marca (accesible / alt)
//   Sube el logo a /public/images/partners y cambia el bloque <PlaceholderMark>
//   por <img src="/images/partners/tu-logo.svg" alt={p.name} ... />
// ─────────────────────────────────────────────────────────────────────────────
interface Partner {
  name: string;
}

const PARTNERS: Partner[] = [
  { name: "Marca 01" },
  { name: "Marca 02" },
  { name: "Marca 03" },
  { name: "Marca 04" },
  { name: "Marca 05" },
  { name: "Marca 06" },
  { name: "Marca 07" },
  { name: "Marca 08" },
];

/**
 * Aliados — "Marcas que han confiado en nosotros".
 * Marquee horizontal e infinito de logos (por ahora, plantillas). La pista
 * renderiza la lista dos veces para que el loop no tenga costura; se pausa
 * al pasar el cursor.
 */
export default function Partners() {
  return (
    <section
      id="marcas"
      className="relative w-full overflow-hidden bg-ink py-24 scroll-mt-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <p className="text-center text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/90">
            Confianza
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mx-auto mt-6 max-w-2xl text-balance text-center font-serif text-3xl font-extralight leading-[1.15] tracking-tight text-white sm:text-4xl">
            Marcas que han confiado
            <span className="block font-light italic text-shimmer">
              en nosotros
            </span>
          </h2>
        </Reveal>
      </div>

      {/* Pista del marquee — con máscaras de degradado en los bordes */}
      <div
        className="relative mt-16"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <Marquee pauseOnHover>
          {PARTNERS.map((p, i) => (
            <PlaceholderMark key={i} name={p.name} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* ── Logo de plantilla — reemplazar por el logo real de cada marca ── */

function PlaceholderMark({ name }: { name: string }) {
  return (
    <div
      aria-label={name}
      className="flex shrink-0 items-center gap-3 text-white/35 transition-colors duration-500 hover:text-champagne"
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect
          x="1"
          y="1"
          width="32"
          height="32"
          rx="6"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="17" cy="17" r="6" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="whitespace-nowrap font-serif text-lg font-light tracking-[0.2em]">
        {name}
      </span>
    </div>
  );
}
