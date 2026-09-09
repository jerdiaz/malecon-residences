"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SplitWords from "@/components/ui/SplitWords";
import { NIVELES, type Plano } from "@/lib/plantas";

/**
 * Plantas — visor por niveles. Cada pestaña abre con su plano principal a lo
 * ancho y, debajo, el detalle de cada zona.
 *
 * Se eligió pestañas y no scroll porque son once planos: apilados harían la
 * sección interminable, y además el visitante suele venir a mirar un nivel
 * concreto, no a recorrerlos todos.
 */
export default function Plantas() {
  const [nivel, setNivel] = useState(0);
  const [ampliado, setAmpliado] = useState<Plano | null>(null);

  const actual = NIVELES[nivel];

  return (
    <section id="plantas" className="relative w-full bg-ink scroll-mt-20 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <p className="mb-6 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/80">
            Plantas
          </p>
        </Reveal>
        <h2 className="font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
          <SplitWords text="Así se distribuye el edificio." delay={100} stagger={45} />
        </h2>
        <Reveal delay={450}>
          <p className="mt-8 max-w-lg text-sm font-light leading-relaxed tracking-wide text-white/50">
            Cada nivel se organiza en tres zonas. Explóralas para ver la
            distribución, los metrajes y la disponibilidad.
          </p>
        </Reveal>

        {/* Pestañas por nivel */}
        <Reveal delay={600}>
          <div
            role="tablist"
            aria-label="Niveles del edificio"
            className="mt-12 flex flex-wrap gap-2 border-b border-white/10 pb-px"
          >
            {NIVELES.map((n, i) => (
              <button
                key={n.id}
                role="tab"
                aria-selected={i === nivel}
                onClick={() => setNivel(i)}
                className={`-mb-px border-b px-5 py-3 text-[0.65rem] font-light uppercase tracking-[0.25em] transition-colors duration-400 ease-silk ${
                  i === nivel
                    ? "border-bronze text-champagne"
                    : "border-transparent text-white/45 hover:text-white/80"
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={actual.id} className="animate-[fade-in_0.4s_ease-out]">
          <p className="mt-8 max-w-xl text-sm font-light leading-relaxed tracking-wide text-white/55">
            {actual.intro}
          </p>

          {/* Plano principal del nivel */}
          <button
            onClick={() => setAmpliado(actual.principal)}
            aria-label={`Ampliar ${actual.principal.label}`}
            className="group mt-8 block w-full cursor-zoom-in overflow-hidden border border-white/10 bg-ink transition-colors duration-500 ease-silk hover:border-bronze/40"
          >
            <PlanoImg plano={actual.principal} sizes="(max-width: 1280px) 100vw, 1216px" />
          </button>

          {/* Detalles por zona */}
          {actual.detalles && (
            <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {actual.detalles.map((d) => (
                <button
                  key={d.src}
                  onClick={() => setAmpliado(d)}
                  aria-label={`Ampliar ${d.label}`}
                  className="group cursor-zoom-in overflow-hidden border border-white/10 bg-ink transition-colors duration-500 ease-silk hover:border-bronze/40"
                >
                  <PlanoImg plano={d} sizes="(max-width: 1024px) 50vw, 25vw" />
                  <span className="block px-4 py-3 text-left text-[0.6rem] font-light uppercase tracking-[0.25em] text-white/50 transition-colors duration-400 group-hover:text-champagne">
                    {d.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="mt-8 text-[0.6rem] font-light leading-relaxed tracking-wide text-white/30">
          Planos ilustrativos. Las especificaciones definitivas son las de los
          documentos técnicos y contractuales.
        </p>
      </div>

      {ampliado && <Visor plano={ampliado} onCerrar={() => setAmpliado(null)} />}
    </section>
  );
}

/** Los SVG se sirven tal cual: `next/image` no los optimiza y perderían el vector. */
function PlanoImg({ plano, sizes }: { plano: Plano; sizes: string }) {
  if (plano.vector) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={plano.src}
        alt={plano.label}
        loading="lazy"
        className="w-full transition-transform duration-700 ease-silk group-hover:scale-[1.01]"
      />
    );
  }
  return (
    <span className="relative block aspect-[3/2]">
      <Image
        src={plano.src}
        alt={plano.label}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-silk group-hover:scale-[1.03]"
      />
    </span>
  );
}

/** Superposición para leer un plano en grande. */
function Visor({ plano, onCerrar }: { plano: Plano; onCerrar: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={plano.label}
      onClick={onCerrar}
      className="fixed inset-0 z-[70] flex animate-[fade-in_0.25s_ease-out] flex-col items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-10"
    >
      <button
        onClick={onCerrar}
        aria-label="Cerrar"
        className="absolute right-5 top-5 flex items-center gap-3 text-[0.65rem] font-light uppercase tracking-[0.25em] text-white/60 transition-colors duration-300 hover:text-champagne md:right-10 md:top-8"
      >
        Cerrar
        <span className="relative flex h-8 w-8 items-center justify-center">
          <span className="absolute h-px w-5 rotate-45 bg-current" />
          <span className="absolute h-px w-5 -rotate-45 bg-current" />
        </span>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-6xl overflow-auto"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={plano.src} alt={plano.label} className="h-auto w-full" />
      </div>

      <p className="mt-5 text-[0.65rem] font-light uppercase tracking-[0.3em] text-champagne/90">
        {plano.label}
      </p>
    </div>
  );
}
