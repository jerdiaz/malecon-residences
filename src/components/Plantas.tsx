"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SplitWords from "@/components/ui/SplitWords";
import { NIVELES, type Plano } from "@/lib/plantas";

/**
 * Plantas — versión simplificada: solo muestra el plano general.
 * Se eliminó la navegación por niveles y el selector de planos.
 */
export default function Plantas() {
  const [ampliado, setAmpliado] = useState(false);

  // Solo mostramos el primer nivel (General) con su primer plano
  const nivel = NIVELES[0];
  const plano = nivel.planos[0];

  return (
    <section id="plantas" className="relative w-full bg-ink scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-12">
        <Reveal>
          <p className="text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze">
            Plantas · La distribución
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 max-w-2xl text-balance font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl">
            <SplitWords text="Cada metro pensado con los más altos estándares" delay={200} stagger={50} />
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-16">
        {/* Plano general - ancho completo */}
        <div className="relative mx-auto max-w-7xl px-6 md:px-12">
          <div className="relative">
            <button
              onClick={() => setAmpliado(true)}
              aria-label={`Ampliar ${plano.label}`}
              className="w-full cursor-zoom-in"
            >
              <span
                className="block mx-auto"
                style={{
                  maxWidth: `${plano.escala * 100}%`,
                }}
              >
                <PlanoImg plano={plano} />
              </span>
            </button>
          </div>

          <div className="mt-6 flex items-baseline justify-between">
            <p className="text-[0.6rem] font-light uppercase tracking-[0.3em] text-champagne/80">
              {plano.label}
            </p>
          </div>
        </div>


      </div>

      {ampliado && (
        <Visor
          plano={plano}
          onCerrar={() => setAmpliado(false)}
        />
      )}
    </section>
  );
}

/** Los SVG se sirven tal cual: next/image no los optimiza y perderían el vector. */
function PlanoImg({ plano }: { plano: Plano }) {
  const posicion =
    plano.alinear === "abajo" ? "object-bottom" : "object-top";
  if (plano.vector) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={plano.src}
        alt={plano.label}
        loading="lazy"
        className={`h-full w-full object-contain ${posicion}`}
      />
    );
  }
  return (
    <Image
      src={plano.src}
      alt={plano.label}
      fill
      sizes="(max-width: 1024px) 100vw, 60vw"
      className={`object-contain ${posicion}`}
    />
  );
}

/** Superposición para leer un plano en grande. */
function Visor({
  plano,
  onCerrar,
}: {
  plano: Plano;
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

      <p
        onClick={(e) => e.stopPropagation()}
        className="mt-6 text-center text-[0.65rem] font-light uppercase tracking-[0.3em] text-champagne/90"
      >
        {plano.label}
      </p>
    </div>
  );
}
