"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const cajaRef = useRef<HTMLDivElement>(null);

  // Arranca CENTRADO, no pegado al borde izquierdo. Ahora que el plano es más
  // ancho que la pantalla el punto de partida importa: el borde izquierdo del
  // plano general es mar abierto, así que al abrir el visor se veía agua y
  // palmeras y el edificio quedaba fuera de cuadro hasta arrastrar.
  //
  // Se llama también desde el `load` de la imagen: el ancho sale de la
  // proporción intrínseca del archivo, que no se conoce hasta que llega, y el
  // SVG pesa 2,2 MB. Si viene de caché el efecto de montaje ya acierta.
  const centrar = useCallback(() => {
    const caja = cajaRef.current;
    if (!caja) return;
    caja.scrollLeft = (caja.scrollWidth - caja.clientWidth) / 2;
    caja.scrollTop = (caja.scrollHeight - caja.clientHeight) / 2;
  }, []);

  useEffect(centrar, [centrar]);

  // Mientras el visor está abierto, la página de debajo no se mueve. En
  // táctil importa más que en escritorio: ahora que el plano se arrastra, al
  // llegar a su borde el gesto seguía de largo y lo que seguía desplazándose
  // era la página, así que al cerrar aparecías en otro sitio. El
  // `overscroll-contain` corta el encadenado; esto cierra el caso.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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

      {/* EL PLANO PUEDE SER MÁS GRANDE QUE EL VISOR, Y SE RECORRE.
          Antes la imagen iba en `w-full` dentro de un `max-w-6xl`: medía
          exactamente lo mismo que su contenedor, así que el `overflow-auto`
          no tenía nunca nada que desplazar. En escritorio daba igual porque el
          contenedor son 1267px; en un teléfono el resultado era que ampliar no
          amplificaba. Medido a 375: el plano pasaba de 323x186 en la página a
          340x196 en el visor —diecisiete píxeles— y no se podía arrastrar
          (`scrollWidth` del contenedor = su propio ancho).

          La regla es una sola y no necesita puntos de corte: el plano se
          muestra al mayor de dos tamaños, el que llena el ancho disponible o
          el que llena el alto del visor. Lo que sobre se recorre.

            375x812  → max(343, 617x1.737) = 1072 de ancho. Se arrastra
                       de lado; 3,3 veces lo que medía en la página, que es
                       lo que hace falta para leer los rótulos.
            812x375  → max(780, 285x1.737) = 780. Manda el ancho: en
                       apaisado, encajar por alto lo dejaría MÁS CHICO.
            1440x840 → max(1267, 638x1.737) = 1267. Igual que siempre.

          Y sirve para los planos verticales sin caso aparte: con `aspecto`
          0.44 el término del alto nunca gana, así que se ajustan por ancho y
          se recorren hacia abajo, que es como estaban. */}
      <div
        ref={cajaRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl overflow-auto overscroll-contain max-h-[76svh] md:max-h-[80vh]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={plano.src}
          alt={plano.label}
          onLoad={centrar}
          className="h-auto max-w-none"
          // 76svh y no 100: es el tope del contenedor de arriba en móvil, que
          // deja sitio para el botón de cerrar y el rótulo del pie.
          style={{ width: `max(100%, 76svh * ${plano.aspecto})` }}
        />
      </div>

      <div onClick={(e) => e.stopPropagation()} className="mt-6 text-center">
        <p className="rotulo text-champagne">{plano.label}</p>
        {/* Que se puede arrastrar no se ve solo: el plano llena la pantalla y
            no hay barra de desplazamiento en táctil. */}
        {plano.aspecto > 1 && (
          <p className="rotulo mt-2 text-white/40 [@media(hover:hover)]:hidden">
            Desliza para recorrer el plano
          </p>
        )}
      </div>
    </div>
  );
}
