"use client";

import { useState } from "react";

interface Panel {
  id: string;
  heading: string;
  description: string;
  image: string;
}

const PANELS: Panel[] = [
  {
    id: "oficinas",
    heading: "Oficinas",
    description: "Espacios de alta eficiencia para empresas de vanguardia.",
    // Fachada acristalada con los interiores de oficina iluminados: es lo que
    // mejor lee en el recorte vertical estrecho de estos paneles.
    image: "/images/renders/oficinas-vidrio.webp",
  },
  {
    id: "locales",
    heading: "Locales",
    description: "Zonas comerciales premium en el epicentro de la Zona Norte.",
    image: "/images/renders/locales-comerciales.webp",
  },
  {
    id: "rooftop",
    heading: "Rooftop",
    description:
      "El escenario perfecto para cerrar tratos con vista al horizonte.",
    // Única toma del set donde se ve el rooftop (terraza y mobiliario).
    image: "/images/renders/aerea-nocturna-rooftop.webp",
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
      className="relative w-full overflow-hidden bg-[#090d11] min-h-screen md:h-screen"
    >
      {/* Fundido de entrada — disuelve la costura con el final del Hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-[#090d11] to-transparent md:h-40" />

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
              {/* Imagen de fondo */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-silk ${
                  isActive ? "scale-105" : "scale-100"
                }`}
                style={{ backgroundImage: `url('${panel.image}')` }}
              />

              {/* Overlay oscuro — se aclara al activar */}
              <div
                className={`absolute inset-0 transition-colors duration-700 ease-out ${
                  isActive ? "bg-black/30" : "bg-black/60"
                }`}
              />

              {/* Contenido del panel */}
              <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10">
                <h3 className="font-serif text-xl font-light uppercase tracking-[0.3em] text-white sm:text-2xl">
                  {panel.heading}
                </h3>
                <div
                  className={`grid transition-all ease-silk mt-4 grid-rows-[1fr] opacity-100 duration-500 delay-100 ${
                    isActive
                      ? ""
                      : "[@media(hover:hover)]:mt-0 [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:duration-150 [@media(hover:hover)]:delay-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`max-w-[80%] text-sm font-light leading-relaxed tracking-wide text-white/75 transition-all ease-silk sm:max-w-xs translate-y-0 duration-500 delay-150 ${
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
