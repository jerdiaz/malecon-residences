"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SplitWords from "@/components/ui/SplitWords";
import { NIVELES, type Plano } from "@/lib/plantas";

/**
 * Plantas — pestañas por nivel y, dentro de cada una, un carrusel de planos.
 *
 * Se eligió pestañas y no scroll porque son once planos: apilados harían la
 * sección interminable, y el visitante suele venir a mirar un nivel concreto.
 *
 * El carrusel NO avanza solo, a diferencia del de la galería: aquí la gente se
 * detiene a leer metrajes y numeración, y un cambio automático interrumpiría.
 */
export default function Plantas() {
  const [nivel, setNivel] = useState(0);
  const [indice, setIndice] = useState(0);
  const [ampliado, setAmpliado] = useState(false);

  const actual = NIVELES[nivel];
  const planos = actual.planos;
  const plano = planos[indice];
  const hayCarrusel = planos.length > 1;

  const irA = useCallback(
    (dir: 1 | -1) => setIndice((i) => (i + dir + planos.length) % planos.length),
    [planos.length]
  );

  const cambiarNivel = (i: number) => {
    setNivel(i);
    setIndice(0);
  };

  // Flechas del teclado: navegan el carrusel y también el visor ampliado
  useEffect(() => {
    if (!hayCarrusel && !ampliado) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAmpliado(false);
      else if (hayCarrusel && e.key === "ArrowLeft") irA(-1);
      else if (hayCarrusel && e.key === "ArrowRight") irA(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hayCarrusel, ampliado, irA]);

  // Con el visor abierto, el fondo no debe desplazarse
  useEffect(() => {
    document.body.style.overflow = ampliado ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [ampliado]);

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
                onClick={() => cambiarNivel(i)}
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

          {/* Visor del plano activo. Los planos tienen proporciones muy
              distintas —los de zona son verticales, los generales apaisados—,
              así que se encajan por contención dentro de una caja fija. */}
          <div className="relative mt-8">
            <button
              onClick={() => setAmpliado(true)}
              aria-label={`Ampliar ${plano.label}`}
              className="block h-[52vh] max-h-[560px] min-h-[300px] w-full cursor-zoom-in overflow-hidden border border-white/10 bg-ink/60 p-3 transition-colors duration-500 ease-silk hover:border-bronze/40"
            >
              <PlanoImg key={plano.src} plano={plano} contain />
            </button>

            {hayCarrusel && (
              <>
                <Flecha lado="izq" onClick={() => irA(-1)} label={`Anterior: ${planos[(indice - 1 + planos.length) % planos.length].label}`} />
                <Flecha lado="der" onClick={() => irA(1)} label={`Siguiente: ${planos[(indice + 1) % planos.length].label}`} />
              </>
            )}
          </div>

          {/* Pie del carrusel: nombre del plano y posición */}
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <p className="text-[0.65rem] font-light uppercase tracking-[0.3em] text-champagne/90">
              {plano.label}
            </p>
            {hayCarrusel && (
              <p className="shrink-0 text-[0.6rem] font-light uppercase tracking-[0.3em] tabular-nums text-white/35">
                {String(indice + 1).padStart(2, "0")} / {String(planos.length).padStart(2, "0")}
              </p>
            )}
          </div>

          {/* Miniaturas: sirven de índice y de salto directo */}
          {hayCarrusel && (
            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-6">
              {planos.map((p, i) => (
                <button
                  key={p.src}
                  onClick={() => setIndice(i)}
                  aria-label={p.label}
                  aria-current={i === indice}
                  className={`relative aspect-[4/3] overflow-hidden border bg-ink/60 p-1 transition-colors duration-400 ease-silk ${
                    i === indice
                      ? "border-bronze"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <PlanoImg plano={p} contain miniatura />
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

      {ampliado && (
        <Visor
          plano={plano}
          posicion={hayCarrusel ? `${indice + 1} / ${planos.length}` : null}
          onAnterior={hayCarrusel ? () => irA(-1) : undefined}
          onSiguiente={hayCarrusel ? () => irA(1) : undefined}
          onCerrar={() => setAmpliado(false)}
        />
      )}
    </section>
  );
}

function Flecha({
  lado,
  onClick,
  label,
}: {
  lado: "izq" | "der";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/70 text-white/70 backdrop-blur-sm transition-all duration-300 ease-silk hover:border-bronze hover:text-champagne md:h-12 md:w-12 ${
        lado === "izq" ? "left-3 md:left-5" : "right-3 md:right-5"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d={lado === "izq" ? "M9 1L3 7L9 13" : "M5 1L11 7L5 13"}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

/** Los SVG se sirven tal cual: `next/image` no los optimiza y perderían el vector. */
function PlanoImg({
  plano,
  contain,
  miniatura,
}: {
  plano: Plano;
  contain?: boolean;
  miniatura?: boolean;
}) {
  const ajuste = contain ? "object-contain" : "object-cover";

  return (
    <span className="relative block h-full w-full">
      {plano.vector ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={plano.src}
          alt={plano.label}
          loading="lazy"
          className={`h-full w-full ${ajuste}`}
        />
      ) : (
        <Image
          src={plano.src}
          alt={plano.label}
          fill
          sizes={
            miniatura
              ? "(max-width: 1024px) 25vw, 200px"
              : "(max-width: 1280px) 100vw, 1216px"
          }
          className={ajuste}
        />
      )}
    </span>
  );
}

/** Superposición para leer un plano en grande. */
function Visor({
  plano,
  posicion,
  onAnterior,
  onSiguiente,
  onCerrar,
}: {
  plano: Plano;
  posicion: string | null;
  onAnterior?: () => void;
  onSiguiente?: () => void;
  onCerrar: () => void;
}) {
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
        className="max-h-[80vh] w-full max-w-6xl overflow-auto"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={plano.src} alt={plano.label} className="h-auto w-full" />
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-5 flex items-center gap-6"
      >
        {onAnterior && (
          <button
            onClick={onAnterior}
            aria-label="Plano anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-300 hover:border-bronze hover:text-champagne"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        )}

        <p className="text-center text-[0.65rem] font-light uppercase tracking-[0.3em] text-champagne/90">
          {plano.label}
          {posicion && (
            <span className="ml-3 tabular-nums text-white/35">{posicion}</span>
          )}
        </p>

        {onSiguiente && (
          <button
            onClick={onSiguiente}
            aria-label="Plano siguiente"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-300 hover:border-bronze hover:text-champagne"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 1L11 7L5 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
