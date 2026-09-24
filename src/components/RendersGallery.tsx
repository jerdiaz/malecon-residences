"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SplitWords from "@/components/ui/SplitWords";
import Reveal from "@/components/ui/Reveal";
import { CAROUSEL_RENDERS, chunk, type RenderItem } from "@/lib/renders";
import { blurFor } from "@/lib/blur";

// Ancho real de cada hueco. La grande ocupa el 65% de un contenedor que tope
// en 1280px, las chicas el 35%; sin esto el navegador pedía para las tres el
// corte de 1920px, siete veces más pesado del que cabe en las chicas.
const SIZES_GRANDE = "(max-width: 640px) 100vw, (max-width: 1280px) 65vw, 760px";
const SIZES_CHICA = "(max-width: 640px) 100vw, (max-width: 1280px) 35vw, 410px";

// Grupos de 3 por slide: 1 grande + 2 pequeñas. Se arman solos a partir del
// catálogo, así que sumar un render en lib/renders.ts basta para que aparezca.
const SLIDES = chunk(CAROUSEL_RENDERS, 3);

const AUTO_ADVANCE_MS = 5000;

export default function RendersGallery() {
  const [slide, setSlide] = useState(0);
  const carruselRef = useRef<HTMLDivElement>(null);
  const [avanza, setAvanza] = useState(false);

  // EL CARRUSEL SOLO AVANZA SOLO CUANDO SE VE ENTERO.
  // Antes el temporizador corría siempre, desde que cargaba la página. En un
  // teléfono eso lo hacía hostil: las tres fotos se apilan y el carrusel mide
  // 915px, más que la pantalla, así que hay que bajar por él para verlo —y
  // mientras se baja, cada 5 segundos las fotos cambiaban debajo del dedo—.
  // Para cuando se llegaba a las flechas, 1393px más abajo, el grupo había
  // dado tres o cuatro vueltas. Y seguía girando con la sección fuera de
  // pantalla, así que al volver se caía en un grupo cualquiera.
  //
  // La regla es una sola y no depende del ancho: avanza mientras esté visible
  // al menos el 95% del carrusel, descontando la barra fija de arriba.
  //   · En escritorio (560px de carrusel) se cumple mientras la sección está
  //     en pantalla: avanza como siempre, y se detiene al salir.
  //   · En un teléfono vertical (915px contra 742 de hueco) no se cumple
  //     nunca: no avanza solo, se pasa con el dedo o con las flechas.
  //
  // Tampoco avanza con `prefers-reduced-motion`: un carrusel que se mueve solo
  // es justo lo que esa preferencia pide evitar (WCAG 2.2.2).
  useEffect(() => {
    const el = carruselRef.current;
    if (!el) return;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)");
    let entero = false;
    const actualizar = () => setAvanza(entero && !reducido.matches);
    const observador = new IntersectionObserver(
      ([entrada]) => {
        entero = entrada.intersectionRatio >= 0.95;
        actualizar();
      },
      // -70px arriba: la barra fija tapa esa franja, y una foto debajo de
      // ella no se está viendo. Es el mismo desplazamiento de scrollToSection.
      { rootMargin: "-70px 0px 0px 0px", threshold: [0, 0.95] }
    );
    observador.observe(el);
    reducido.addEventListener("change", actualizar);
    return () => {
      observador.disconnect();
      reducido.removeEventListener("change", actualizar);
    };
  }, []);

  // El temporizador depende de `slide`, así que cualquier salto manual
  // reinicia la cuenta en vez de dejar el slide nuevo a medio tiempo. Y de
  // `avanza`: al volver a verse entero, la cuenta empieza de cero.
  useEffect(() => {
    if (!avanza) return;
    const timer = setTimeout(
      () => setSlide((prev) => (prev + 1) % SLIDES.length),
      AUTO_ADVANCE_MS
    );
    return () => clearTimeout(timer);
  }, [slide, avanza]);

  const go = (dir: 1 | -1) =>
    setSlide((prev) => (prev + dir + SLIDES.length) % SLIDES.length);

  // Deslizar con el dedo. Antes la única forma de cambiar de grupo eran las
  // dos flechas del pie, que en un teléfono quedan 1393px por debajo de la
  // primera foto; y es el gesto que cualquiera prueba primero sobre una foto.
  //
  // Solo cuenta un gesto claramente horizontal: al menos 48px de recorrido y
  // el doble de horizontal que de vertical. Todo lo demás es alguien bajando
  // por la página, y eso no debe cambiar la foto.
  const toque = useRef<{ x: number; y: number } | null>(null);
  const alEmpezarToque = (e: React.TouchEvent) => {
    const t = e.touches[0];
    toque.current = { x: t.clientX, y: t.clientY };
  };
  const alTerminarToque = (e: React.TouchEvent) => {
    const inicio = toque.current;
    toque.current = null;
    if (!inicio) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - inicio.x;
    const dy = t.clientY - inicio.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 2) return;
    go(dx < 0 ? 1 : -1);
  };

  const current = SLIDES[slide];
  const next = SLIDES[(slide + 1) % SLIDES.length];

  return (
    <section id="galeria" className="relative w-full bg-ink scroll-mt-16 aire-seccion">
      {/* Header. El margen inferior baja de 20/28 a 10/12: eran 196px de aire
          puro entre el encabezado y el carrusel, la pieza más cara de la
          sección después de las fotos, y las fotos no se tocan porque son el
          contenido. */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-10 lg:mb-12">
        <Reveal>
          <p className="antetitulo mb-6 text-bronze">
            Galería
          </p>
        </Reveal>
        <h2 className="titulo-seccion text-white">
          <SplitWords
            text="Espacios diseñados con altos estándares."
            delay={100}
            stagger={50}
          />
        </h2>
        <Reveal delay={500}>
          <p className="mt-8 max-w-lg text-sm font-normal leading-relaxed text-cuerpo">
            {CAROUSEL_RENDERS.length} perspectivas del Malecón Business Center.
            Arquitectura contemporánea diseñada para Marbella, Cartagena
            de Indias.
          </p>
        </Reveal>

        {/* El acceso a la galería completa va ARRIBA, bajo el párrafo, y no al
            final de la sección: el interés por ver más aparece mientras se
            baja, y si el enlace vive después del carrusel hay que pasar por
            todo para encontrarlo.

            Va como enlace de texto con filete y no como botón con recuadro.
            Esa es la forma que se probó antes y el cliente marcó: una caja de
            8 de relleno al lado del párrafo se leía como un bloque suelto
            flotando en el blanco. Además el recuadro costaba 187px con su
            margen; así son 48, y el acceso se queda donde tiene que estar.

            Alineado a la izquierda, siguiendo el párrafo. A la derecha ya se
            sabe qué pasa: comparte columna con el CTA del navbar y al
            desplazarse una caja pasa por debajo de la otra. */}
        <Reveal delay={700}>
          <Link
            href="/galeria"
            // `min-h-[44px]` con `mt-3` en vez de `mt-5`: medído en un
            // teléfono, este enlace tenía 24px de alto —es el único camino a
            // la galería completa y se quedaba a 20px del mínimo táctil—. La
            // caja crece hacia arriba y hacia abajo por igual, así que el
            // margen de arriba baja lo mismo para que el filete se quede
            // donde estaba.
            className="group mt-3 inline-flex min-h-[44px] items-center gap-3 text-[0.72rem] font-normal uppercase tracking-[0.16em] text-white/85 transition-colors duration-300 ease-silk hover:text-champagne"
          >
            <span className="border-b border-white/25 pb-1 transition-colors duration-300 group-hover:border-bronze">
              Ver galería completa
            </span>
            <span className="transition-transform duration-500 ease-silk group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>

      {/* Carrusel — rejilla alineada sobre el set completo de renders. Antes
          las piezas iban desplazadas en vertical (translate-y-4, -translate-y-6,
          mt-2) y la columna derecha partida en 58/42. Se enderezó: todas las
          fotos comparten borde superior e inferior y las dos pequeñas miden lo
          mismo. La jerarquía la sigue dando el ancho —65/35—, no el desorden. */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* `touch-pan-y touch-pinch-zoom`: el navegador se sigue ocupando del
            desplazamiento vertical y del zoom con dos dedos, y el gesto
            horizontal queda libre para el carrusel. Sin esto, en algunos
            navegadores un deslizamiento con algo de inclinación arrancaba el
            scroll de la página y el toque terminaba cancelado. */}
        <div
          ref={carruselRef}
          onTouchStart={alEmpezarToque}
          onTouchEnd={alTerminarToque}
          onTouchCancel={() => (toque.current = null)}
          className="relative touch-pan-y touch-pinch-zoom"
        >
          <div
            key={slide}
            className="flex animate-[fade-in_0.4s_ease-out] flex-col gap-4 sm:h-[65vh] sm:max-h-[560px] sm:flex-row"
          >
            {/* Foto grande — ocupa todo el ancho si el slide quedó con una sola */}
            <RenderTile
              render={current[0]}
              sizes={SIZES_GRANDE}
              className={
                current.length === 1
                  ? "h-80 w-full sm:h-full"
                  : "h-80 w-full sm:h-full sm:w-[65%]"
              }
            />

            {/* Columna derecha — dos piezas iguales, alineadas con la grande */}
            {current.length > 1 && (
              <div className="flex w-full flex-col gap-4 sm:w-[35%]">
                <RenderTile
                  render={current[1]}
                  sizes={SIZES_CHICA}
                  className={
                    current.length === 2
                      ? "h-64 w-full sm:h-full"
                      : "h-64 w-full sm:flex-1"
                  }
                />
                {current[2] && (
                  <RenderTile
                    render={current[2]}
                    sizes={SIZES_CHICA}
                    className="h-56 w-full sm:flex-1"
                  />
                )}
              </div>
            )}
          </div>

          {/* Precarga del slide siguiente — ocupa la misma caja pero invisible y
              detrás, así el navegador resuelve el mismo srcset y al avanzar la
              foto ya está en caché en vez de empezar a bajarse recién ahí. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 flex flex-col gap-4 overflow-hidden opacity-0 sm:flex-row"
          >
            <PreloadTile
              render={next[0]}
              sizes={SIZES_GRANDE}
              className={next.length === 1 ? "h-full w-full" : "h-full w-full sm:w-[65%]"}
            />
            {next.length > 1 && (
              <div className="flex w-full flex-col gap-4 sm:w-[35%]">
                <PreloadTile render={next[1]} sizes={SIZES_CHICA} className="w-full flex-1" />
                {next[2] && (
                  <PreloadTile render={next[2]} sizes={SIZES_CHICA} className="w-full flex-1" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Barra de progreso — se llena mientras dura el slide activo. Solo
            existe mientras el carrusel avanza: si no, se llenaba igual y
            anunciaba un cambio que no iba a llegar. Al reaparecer se monta de
            nuevo y arranca de cero, igual que el temporizador. Parada, queda
            el filete vacío, que hace de separador. */}
        <div className="mt-8 h-px w-full bg-white/10">
          {avanza && (
            <div
              key={slide}
              className="h-full bg-amber-500/80"
              style={{
                animation: `gallery-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
              }}
            />
          )}
        </div>

        {/* Controles del carrusel. El acceso a la galería completa no se
            repite aquí: vive una sola vez, arriba en el encabezado, que es
            donde hace falta — ver la nota de allí. */}
        <div className="mt-8 flex items-center gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Ver el grupo anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-300 ease-silk hover:border-bronze hover:text-champagne"
            >
              <Arrow className="h-3 w-3" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Ver el grupo siguiente"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-300 ease-silk hover:border-bronze hover:text-champagne"
            >
              <Arrow className="h-3 w-3 rotate-180" />
            </button>
            <p className="text-[0.65rem] font-light uppercase tracking-[0.3em] tabular-nums text-white/40">
              <span className="text-champagne">
                {String(slide + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(SLIDES.length).padStart(2, "0")}
            </p>

        </div>
      </div>
    </section>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M9 1L3 7L9 13"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Copia invisible del slide siguiente: solo existe para calentar la caché. */
function PreloadTile({
  render,
  sizes,
  className = "",
}: {
  render: RenderItem;
  sizes: string;
  className?: string;
}) {
  const blur = blurFor(render.src);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* alt vacío a propósito: esta es la copia invisible del slide siguiente,
          existe solo para calentar la caché y su contenedor va `aria-hidden`.
          Describirla duplicaría cada render para los lectores de pantalla. */}
      <Image
        src={render.src}
        alt=""
        fill
        sizes={sizes}
        className="object-cover"
        {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
      />
    </div>
  );
}

function RenderTile({
  render,
  sizes,
  className = "",
}: {
  render: RenderItem;
  sizes: string;
  className?: string;
}) {
  const blur = blurFor(render.src);

  return (
    <Link
      href={`/galeria/${render.slug}`}
      className={`group relative block overflow-hidden transition-all duration-700 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={render.src}
          alt={render.label}
          fill
          sizes={sizes}
          className="object-cover"
          {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
          style={{
            animation: "gallery-ken-burns 8000ms ease-out forwards",
          }}
        />
        {/* Velo inferior — ahora fijo. Antes en escritorio arrancaba en
            opacity-0 y solo entraba al pasar el cursor, igual que la etiqueta;
            se oscurece un punto más al apuntar, que es todo el efecto que
            queda. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent transition-opacity duration-700 ease-in-out [@media(hover:hover)]:opacity-90 [@media(hover:hover)]:group-hover:opacity-100" />
        {/* Etiqueta — siempre visible. Esto es el "salen en unas sí y en otras
            no" que anotó el cliente el 14 de septiembre: el carrusel avanza
            solo cada 5 segundos, así que el nombre únicamente aparecía en la
            foto que tuviera el cursor encima y las otras dos quedaban mudas. */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-champagne">
            {render.label}
          </p>
        </div>
      </div>
    </Link>
  );
}
