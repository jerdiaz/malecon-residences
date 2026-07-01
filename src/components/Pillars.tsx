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
    image: "/images/hero/oficinas.jpeg",
  },
  {
    id: "locales",
    heading: "Locales",
    description: "Zonas comerciales premium en el epicentro de la Zona Norte.",
    image: "/images/hero/locales.jpeg",
  },
  {
    id: "business-hub",
    heading: "Business Hub",
    description:
      "El escenario perfecto para cerrar tratos con vista al horizonte.",
    image: "/images/hero/rooftop.jpeg",
  },
];

/**
 * Segunda vista — acordeón vertical de 3 columnas ("Vertical Expanding
 * Accordion"). Apiladas por defecto; al pasar el cursor (o al tocar en
 * móvil) el panel activo se expande revelando su descripción.
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
      <div className="relative flex min-h-screen flex-col md:h-screen md:flex-row">
        {PANELS.map((panel, i) => {
          const isActive = active === i;
          const isDimmed = active !== null && !isActive;

          return (
            <button
              key={panel.id}
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => clearIfActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => clearIfActive(i)}
              onClick={() => setActive((prev) => (prev === i ? null : i))}
              aria-label={panel.heading}
              className={`group relative w-full overflow-hidden border-b border-white/5 text-left transition-all duration-700 ease-out last:border-none md:h-full md:w-auto md:border-b-0 md:border-r ${
                isActive
                  ? "h-[46vh] md:flex-[2.2]"
                  : isDimmed
                  ? "h-[17vh] md:flex-[0.55]"
                  : "h-[28vh] md:flex-1"
              }`}
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
                <span className="mb-3 font-serif text-xs tabular-nums text-bronze/80">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-xl font-light uppercase tracking-[0.3em] text-white sm:text-2xl">
                  {panel.heading}
                </h3>
                <div
                  className={`grid transition-all ease-silk ${
                    isActive
                      ? "mt-4 grid-rows-[1fr] opacity-100 duration-500 delay-100"
                      : "grid-rows-[0fr] opacity-0 duration-150"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`max-w-[80%] text-sm font-light leading-relaxed tracking-wide text-white/75 transition-all ease-silk sm:max-w-xs ${
                        isActive
                          ? "translate-y-0 duration-500 delay-150"
                          : "translate-y-4 duration-150"
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
