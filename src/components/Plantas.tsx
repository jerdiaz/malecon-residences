"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SplitWords from "@/components/ui/SplitWords";
import { NIVELES, type Plano } from "@/lib/plantas";
import VisorImagen from "@/components/ui/VisorImagen";

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

                  SIN TOPE DE ALTO, a propósito. Se probó uno de `52svh` para
                  que la sección cupiera en una pantalla: funcionaba —771px
                  contra los 770 de objetivo— pero dejaba el plano en 759×437
                  flotando en medio de la sección, con aire muerto a los lados.
                  El cliente lo marcó: aquí lo que manda es que el plano se vea
                  grande.

                  El plano es apaisado (proporción 1.737), así que su alto y su
                  ancho se pagan el uno al otro: para que ocupe 750px de alto
                  necesita 1302 de ancho, y con eso la sección mide 1110px,
                  o sea 1.3 pantallas. No hay forma de tener las dos cosas en
                  una ventana de 840px; entre un plano grande y una sección
                  exacta, gana el plano. */}
              <span
                className="block mx-auto"
                style={{
                  maxWidth: `${plano.escala * 100}%`,
                  aspectRatio: plano.aspecto,
                }}
              >
                <PlanoImg plano={plano} />
              </span>
            </button>
          </div>

          <div className="mt-6 flex items-baseline justify-between gap-4">
            <p className="rotulo text-champagne">
              {plano.label}
            </p>
            {/* En escritorio el `cursor-zoom-in` del botón ya avisa de que el
                plano se amplía. En una pantalla táctil no hay cursor, así que
                no había absolutamente nada que lo dijera: el plano se veía a
                186px de alto y parecía todo lo que hay. Este rótulo solo
                aparece donde el puntero es grueso. */}
            <p className="rotulo text-white/40 [@media(hover:hover)]:hidden">
              Toca para ampliar
            </p>
          </div>
        </div>


      </div>

      {ampliado && (
        <VisorImagen
          src={plano.src}
          label={plano.label}
          aspecto={plano.aspecto}
          pista="Desliza para recorrer el plano"
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
