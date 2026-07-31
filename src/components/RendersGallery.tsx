"use client";

import { useEffect, useState } from "react";
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

  // El temporizador depende de `slide`, así que cualquier salto manual
  // reinicia la cuenta en vez de dejar el slide nuevo a medio tiempo.
  useEffect(() => {
    const timer = setTimeout(
      () => setSlide((prev) => (prev + 1) % SLIDES.length),
      AUTO_ADVANCE_MS
    );
    return () => clearTimeout(timer);
  }, [slide]);

  const go = (dir: 1 | -1) =>
    setSlide((prev) => (prev + dir + SLIDES.length) % SLIDES.length);

  const current = SLIDES[slide];
  const next = SLIDES[(slide + 1) % SLIDES.length];

  return (
    <section id="galeria" className="relative w-full bg-ink scroll-mt-20 py-28 lg:py-40">
      {/* Header — con más aire alrededor para una composición más exclusiva */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-20 lg:mb-28">
        <Reveal>
          <p className="mb-6 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/80">
            Galería
          </p>
        </Reveal>
        <h2 className="font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
          <SplitWords
            text="Espacios diseñados con altos estándares."
            delay={100}
            stagger={50}
          />
        </h2>
        <Reveal delay={500}>
          <p className="mt-8 max-w-lg text-sm font-light leading-relaxed tracking-wide text-white/50">
            {CAROUSEL_RENDERS.length} perspectivas del Malecón Business Center.
            Arquitectura contemporánea diseñada para la Zona Norte de Cartagena
            de Indias.
          </p>
        </Reveal>
      </div>

      {/* Carrusel — composición asimétrica sobre el set completo de renders */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="relative">
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
                  : "h-80 w-full sm:h-full sm:w-[65%] sm:translate-y-4"
              }
            />

            {/* Columna derecha — asimétrica: una más alargada y desplazada, otra más baja */}
            {current.length > 1 && (
              <div className="flex w-full flex-col gap-4 sm:w-[35%]">
                <RenderTile
                  render={current[1]}
                  sizes={SIZES_CHICA}
                  className={
                    current.length === 2
                      ? "h-64 w-full sm:h-full sm:-translate-y-6"
                      : "h-64 w-full sm:h-[58%] sm:-translate-y-6"
                  }
                />
                {current[2] && (
                  <RenderTile
                    render={current[2]}
                    sizes={SIZES_CHICA}
                    className="h-56 w-full sm:h-[42%] sm:mt-2"
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
                <PreloadTile render={next[1]} sizes={SIZES_CHICA} className="h-[58%] w-full" />
                {next[2] && (
                  <PreloadTile render={next[2]} sizes={SIZES_CHICA} className="h-[42%] w-full" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Barra de progreso — se llena mientras dura el slide activo */}
        <div className="mt-8 h-px w-full bg-white/10">
          <div
            key={slide}
            className="h-full bg-amber-500/80"
            style={{
              animation: `gallery-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
            }}
          />
        </div>

        {/* Controles + acceso a la galería completa */}
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
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

          <Link
            href="/galeria"
            className="group flex items-center gap-3 text-[0.65rem] font-light uppercase tracking-[0.3em] text-white/60 transition-colors duration-300 ease-silk hover:text-champagne"
          >
            Ver galería completa
            <span className="h-px w-8 bg-white/25 transition-all duration-500 ease-silk group-hover:w-12 group-hover:bg-bronze" />
          </Link>
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
        {/* Velo inferior — visible siempre en táctil; en desktop solo aparece al pasar el cursor */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-100 transition-opacity duration-700 ease-in-out [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100" />
        {/* Etiqueta — visible siempre en táctil; en desktop solo aparece al pasar el cursor */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-0 p-5 opacity-100 transition-all duration-700 ease-in-out [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
          <p className="text-[0.65rem] font-light uppercase tracking-[0.3em] text-champagne/90">
            {render.label}
          </p>
        </div>
      </div>
    </Link>
  );
}
