"use client";

import { useState } from "react";
import BackgroundImage from "@/components/ui/BackgroundImage";

interface Panel {
  id: string;
  heading: string;
  description: string;
  image: string;
  /** Alt de la foto. Son renders del proyecto, no decoración. */
  alt: string;
}

const PANELS: Panel[] = [
  {
    id: "oficinas",
    heading: "Oficinas",
    description: "Espacios de alta eficiencia para empresas de vanguardia.",
    image: "/images/renders/oficina-open-space.webp",
    alt: "Oficinas corporativas del Malecón Business Center en Cartagena de Indias",
  },
  {
    id: "locales",
    heading: "Locales",
    description: "Zonas comerciales premium en el epicentro de la Zona Norte.",
    image: "/images/renders/locales-comerciales.webp",
    alt: "Locales comerciales del Malecón Business Center sobre la Avenida Santander, Cartagena de Indias",
  },
  {
    id: "rooftop",
    heading: "Rooftop",
    description:
      "El escenario perfecto para cerrar tratos con vista al horizonte.",
    image: "/images/renders/rooftop-bar.webp",
    alt: "Rooftop del Malecón Business Center con vista al Mar Caribe, Cartagena de Indias",
  },
];

/**
 * Segunda vista — 3 columnas de igual ancho ("Fine Dining / Luxury Stays"
 * style, inspirado en burjkhalifa.ae). Al pasar el cursor (o tocar en
 * móvil) el panel no cambia de tamaño; solo se aclara su imagen y revela
 * su descripción debajo del título.
 */
export default function Pillars() {
  const [active, setActive] = useState<number | null>(null);

  const clearIfActive = (i: number) =>
    setActive((prev) => (prev === i ? null : prev));

  return (
    <section
      id="pillars"
      className="relative w-full overflow-hidden bg-ink min-h-screen md:h-screen"
    >
      <div className="relative flex min-h-screen flex-col md:h-screen md:flex-row">
        {PANELS.map((panel, i) => {
          const isActive = active === i;

          return (
            <button
              key={panel.id}
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => clearIfActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => clearIfActive(i)}
              onClick={() => setActive(i)}
              aria-label={panel.heading}
              className="group relative h-[33vh] w-full flex-1 overflow-hidden border-b border-white/5 text-left last:border-none md:h-full md:border-b-0 md:border-r"
            >
              {/* Imagen de fondo — la escala va en el contenedor para que
                  `next/image` pueda seguir sirviendo el corte adecuado */}
              <div className="absolute inset-0">
                <BackgroundImage
                  src={panel.image}
                  alt={panel.alt}
                  // 165vh, no 33vw: el panel es más vertical que el render
                  // y el recorte lo manda el alto (ver BackgroundImage).
                  sizes="(max-width: 768px) 100vw, 165vh"
                />
              </div>

              {/* Velo fijo: antes iba del 60% al 30% al pasar el cursor, y ese
                  aclarado se quitó a pedido — el único efecto al apuntar debe
                  ser que aparezca el texto.
                  45% y no el 30% del estado claro anterior: medido sobre las
                  tres fotos, al 30% la descripción de Oficinas queda en 4.0:1
                  —bajo el mínimo de 4.5— y sus zonas más claras en 2.6:1. A
                  45% la peor de las tres da 5.3:1, y sigue siendo bastante más
                  claro que el 60% en que descansaban antes.
                  En azul de marca y no en negro: el fundido que entra desde
                  arriba viene de `ink`, y con velo negro el empalme cruzaría de
                  azul a negro dentro de la misma sección. */}
              <div className="absolute inset-0 bg-ink-950/45" />

              {/* Contenido del panel */}
              <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10">
                {/* h2, no h3: estos tres paneles son secciones de primer nivel
                    de la página y venían antes del primer h2 del documento, así
                    que la jerarquía saltaba de h1 a h3. */}
                <h2 className="font-serif text-xl font-light uppercase tracking-[0.3em] text-white sm:text-2xl">
                  {panel.heading}
                </h2>
                <div
                  className={`grid transition-all ease-silk mt-4 grid-rows-[1fr] opacity-100 duration-500 delay-100 ${
                    isActive
                      ? ""
                      : "[@media(hover:hover)]:mt-0 [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:duration-150 [@media(hover:hover)]:delay-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`max-w-[80%] text-sm font-normal leading-relaxed text-sobrefoto transition-all ease-silk sm:max-w-xs translate-y-0 duration-500 delay-150 ${
                        isActive
                          ? ""
                          : "[@media(hover:hover)]:translate-y-4 [@media(hover:hover)]:duration-150 [@media(hover:hover)]:delay-0"
                      }`}
                    >
                      {panel.description}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
