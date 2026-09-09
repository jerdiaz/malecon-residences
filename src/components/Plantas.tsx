"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SplitWords from "@/components/ui/SplitWords";
import { NIVELES, type Plano } from "@/lib/plantas";

/**
 * Plantas — mismo esqueleto que Amenidades: el visual queda fijo a la izquierda
 * y la lista editorial se recorre a la derecha.
 *
 * Se descartó la barra de pestañas que tenía antes: es lenguaje de aplicación
 * web y desentonaba con el resto del sitio, que elige siempre por lista serif.
 *
 * El plano va sobre el azul de marca, sin fotografía detrás: se probó con el
 * render del nivel atenuado y competían: un plano es información que se lee y
 * una foto es atmósfera que se contempla, y superpuestos no ganaba ninguno.
 */
export default function Plantas() {
  const [nivel, setNivel] = useState(0);
  const [indice, setIndice] = useState(0);
  const [ampliado, setAmpliado] = useState(false);

  const actual = NIVELES[nivel];
  const planos = actual.planos;
  const plano = planos[indice];
  const variosPlanos = planos.length > 1;

  const irA = useCallback(
    (dir: 1 | -1) =>
      setIndice((i) => (i + dir + planos.length) % planos.length),
    [planos.length],
  );

  const elegirNivel = (i: number) => {
    if (i === nivel) return;
    setNivel(i);
    setIndice(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAmpliado(false);
      else if (variosPlanos && e.key === "ArrowLeft") irA(-1);
      else if (variosPlanos && e.key === "ArrowRight") irA(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variosPlanos, irA]);

  useEffect(() => {
    document.body.style.overflow = ampliado ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ampliado]);

  return (
    <section id="plantas" className="relative w-full bg-ink scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-12">
        <Reveal>
          <p className="text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/90">
            Plantas · La distribución
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 max-w-2xl text-balance font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl">
            <SplitWords text="Cada metro," delay={200} stagger={50} />
            <span className="block font-light italic text-shimmer">
              pensado de antemano
            </span>
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-16 lg:flex lg:items-start">
        {/* ── Izquierda: el plano, fijo mientras se recorre la columna ── */}
        <div className="relative h-[60vh] w-full overflow-hidden lg:sticky lg:top-0 lg:h-screen lg:w-[60%]">
          {/* El plano, flotando sin marco.
              El relleno va en esta capa y los planos se apilan dentro de la caja
              interior: si fueran `absolute inset-0` directamente aquí, se
              posicionarían contra la caja de relleno y lo ignorarían, quedando
              pegados a los bordes y por debajo del navbar.
              Arriba se reserva más espacio porque el navbar mide 105px. */}
          <div className="absolute inset-0 px-6 pb-14 pt-24 md:px-10 md:pb-14 md:pt-28">
            <div className="relative h-full w-full">
              {planos.map((p, i) => (
                <button
                  key={p.src}
                  onClick={() => setAmpliado(true)}
                  aria-label={`Ampliar ${p.label}`}
                  tabIndex={i === indice ? 0 : -1}
                  // Ocupa toda la caja y es la imagen la que se contiene dentro.
                  // Con `absolute` + solo aspect-ratio el botón colapsaba a 0x0:
                  // no tenía tamaño intrínseco del que partir.
                  className={`absolute inset-0 cursor-zoom-in transition-opacity duration-[900ms] ease-silk ${
                    i === indice
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  <span
                    className="absolute left-1/2 top-0 block -translate-x-1/2"
                    style={{
                      width: `${p.escala * 100}%`,
                      height: `${p.escala * 100}%`,
                    }}
                  >
                    <PlanoImg plano={p} />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-6 left-8 right-8 flex items-baseline justify-between gap-4 md:left-14 md:right-14">
            <p className="text-[0.6rem] font-light uppercase tracking-[0.3em] text-champagne/80">
              {plano.label}
            </p>
            {variosPlanos && (
              <p className="shrink-0 text-[0.6rem] font-light uppercase tracking-[0.3em] tabular-nums text-white/35">
                {String(indice + 1).padStart(2, "0")} /{" "}
                {String(planos.length).padStart(2, "0")}
              </p>
            )}
          </div>
        </div>

        {/* ── Derecha: niveles, planos e inventario ── */}
        <div className="w-full px-6 py-14 md:px-12 lg:w-[40%] lg:py-24">
          <div className="lg:pr-4">
            {NIVELES.map((n, i) => {
              const activo = i === nivel;
              return (
                <button
                  key={n.id}
                  // Solo clic, a diferencia de Amenidades. Allí la lista es lo
                  // último de la columna y elegir al pasar el cursor funciona;
                  // aquí debajo van el índice de planos y el inventario, así que
                  // bajar el puntero cruzaba los otros niveles y cambiaba la
                  // planta sin que el visitante lo pidiera.
                  onClick={() => elegirNivel(i)}
                  aria-pressed={activo}
                  className="group block w-full border-t border-white/10 py-5 text-left last:border-b"
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      className={`font-serif text-[0.7rem] tabular-nums transition-colors duration-500 ${
                        activo
                          ? "text-bronze"
                          : "text-white/25 group-hover:text-bronze/60"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-serif text-lg font-light leading-snug transition-colors duration-500 sm:text-xl ${
                        activo
                          ? "text-champagne"
                          : "text-white/40 group-hover:text-white/75"
                      }`}
                    >
                      {n.label}
                    </span>
                  </span>

                  <div
                    className={`grid transition-all duration-500 ease-silk ${
                      activo
                        ? "mt-2 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden pl-9">
                      <p className="text-sm font-light leading-relaxed tracking-wide text-white/55">
                        {n.intro}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}

            {variosPlanos && (
              <div className="mt-12">
                <p className="mb-4 text-[0.65rem] font-light uppercase tracking-[0.3em] text-bronze/90">
                  Planos
                </p>
                {planos.map((p, i) => (
                  <button
                    key={p.src}
                    onClick={() => setIndice(i)}
                    aria-current={i === indice}
                    className="group flex w-full items-baseline gap-4 border-t border-white/[0.07] py-3 text-left last:border-b"
                  >
                    <span
                      className={`font-serif text-[0.7rem] tabular-nums transition-colors duration-400 ${
                        i === indice ? "text-bronze" : "text-white/20"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[0.7rem] font-light uppercase tracking-[0.2em] transition-colors duration-400 ${
                        i === indice
                          ? "text-champagne"
                          : "text-white/40 group-hover:text-white/70"
                      }`}
                    >
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* El dato comercial como tipografía, no dentro de un JPEG */}
            {actual.inventario && (
              <div className="mt-12">
                <p className="mb-5 text-[0.65rem] font-light uppercase tracking-[0.3em] text-bronze/90">
                  {actual.inventario.titulo}
                </p>
                {actual.inventario.filas.map((f, i) => (
                  <motion.div
                    key={f.area}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-baseline gap-5 border-t border-white/[0.07] py-4 last:border-b"
                  >
                    <span className="flex w-28 shrink-0 items-baseline font-serif text-2xl font-extralight leading-none text-champagne">
                      {f.area}
                      <span className="ml-1.5 font-sans text-[0.6rem] font-light uppercase tracking-[0.15em] text-bronze/70">
                        m²
                      </span>
                    </span>
                    <span className="text-[0.7rem] font-light leading-relaxed tracking-[0.12em] text-white/45">
                      {f.unidades.join(" · ")}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            <p className="mt-10 text-[0.6rem] font-light leading-relaxed tracking-wide text-white/25">
              Planos e imágenes ilustrativos. Las especificaciones definitivas
              son las de los documentos técnicos y contractuales.
            </p>
          </div>
        </div>
      </div>

      {ampliado && (
        <Visor
          plano={plano}
          posicion={variosPlanos ? `${indice + 1} / ${planos.length}` : null}
          onAnterior={variosPlanos ? () => irA(-1) : undefined}
          onSiguiente={variosPlanos ? () => irA(1) : undefined}
          onCerrar={() => setAmpliado(false)}
        />
      )}
    </section>
  );
}

/** Los SVG se sirven tal cual: next/image no los optimiza y perderían el vector. */
function PlanoImg({ plano }: { plano: Plano }) {
  // Sin reglas generales: cuánto ocupa cada plano lo decide su propia `escala`
  // en lib/plantas.ts, afinada mirando cómo queda cada uno.
  if (plano.vector) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={plano.src}
        alt={plano.label}
        loading="lazy"
        className="h-full w-full object-contain object-top"
      />
    );
  }
  return (
    <Image
      src={plano.src}
      alt={plano.label}
      fill
      sizes="(max-width: 1024px) 100vw, 60vw"
      className="object-contain object-top"
    />
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
      className="fixed inset-0 z-[70] flex animate-[fade-in_0.3s_ease-out] flex-col items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-10"
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
        className="mt-6 flex items-center gap-6"
      >
        {onAnterior && <FlechaVisor lado="izq" onClick={onAnterior} />}
        <p className="text-center text-[0.65rem] font-light uppercase tracking-[0.3em] text-champagne/90">
          {plano.label}
          {posicion && (
            <span className="ml-3 tabular-nums text-white/35">{posicion}</span>
          )}
        </p>
        {onSiguiente && <FlechaVisor lado="der" onClick={onSiguiente} />}
      </div>
    </div>
  );
}

function FlechaVisor({
  lado,
  onClick,
}: {
  lado: "izq" | "der";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={lado === "izq" ? "Plano anterior" : "Plano siguiente"}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-300 ease-silk hover:border-bronze hover:text-champagne"
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
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
