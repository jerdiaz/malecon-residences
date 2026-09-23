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
    <section id="plantas" className="relative w-full bg-ink scroll-mt-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12 aire-seccion-arriba">
        <Reveal>
          <p className="antetitulo text-bronze">
            Plantas · La distribución
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="titulo-seccion mt-6 max-w-2xl text-balance text-white">
            <SplitWords text="Cada metro " delay={200} stagger={50} />
            <span className="text-shimmer">pensado con los más altos estándares</span>
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-10">
        {/* Plano general - ancho completo */}
        <div className="relative mx-auto max-w-7xl px-6 md:px-12">
          <div className="relative">
            <button
              onClick={() => setAmpliado(true)}
              aria-label={`Ampliar ${plano.label}`}
              className="w-full cursor-zoom-in"
            >
              {/* `aspectRatio` reserva el hueco del plano antes de que cargue.
                  El SVG solo declara `viewBox`, sin ancho ni alto, así que no
                  tiene tamaño intrínseco: hasta que la imagen no llega, este
                  contenedor medía 0 y el `h-full` de dentro resolvía a 0
                  también. Con la proporción declarada de antemano el hueco
                  existe desde el primer pintado, así que no hay salto de
                  maquetación cuando entra el archivo —que pesa 2.2 MB— y la
                  sección mide lo mismo antes y después.

                  El alto medido con el hueco reservado es 750px, y sin él la
                  sección marcaba 379 (nada) contra 1110 (con el plano). Por
                  eso el tope de abajo hace falta.

                  `maxHeight: 52svh` es lo que hace que la sección quepa en una
                  pantalla: con el plano a 750px se iba a 1.3 pantallas; con el
                  tope cae a ~765px y entra entera. Encoger el plano cuesta
                  menos de lo que parece, porque aquí es un anticipo: se hace
                  clic y se abre en el visor a tamaño completo, así que lo que
                  importa es que se reconozca, no que se lea. */}
              <span
                className="block mx-auto"
                style={{
                  maxWidth: `${plano.escala * 100}%`,
                  aspectRatio: plano.aspecto,
                  maxHeight: "52svh",
                }}
              >
                <PlanoImg plano={plano} />
              </span>
            </button>
          </div>

          <div className="mt-6 flex items-baseline justify-between">
            <p className="rotulo text-champagne">
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
        className="rotulo mt-6 text-center text-champagne"
      >
        {plano.label}
      </p>
    </div>
  );
}
