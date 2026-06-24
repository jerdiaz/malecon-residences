"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

// ─────────────────────────────────────────────────────────────────────────────
// PLANTILLA DE AMENIDADES — editar aquí
// Agrega, elimina o modifica los objetos de este arreglo.
// Cada amenidad tiene:
//   label       → nombre corto que aparece en la barra de tabs (ej. "Rooftop Pool")
//   title       → título grande que aparece en pantalla (ej. "Una lámina de agua")
//   description → párrafo descriptivo debajo del título
//   image       → URL o ruta local de la imagen de fondo (ej. "/images/renders/render-04.png")
// ─────────────────────────────────────────────────────────────────────────────
interface Amenity {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
}

const AMENITIES: Amenity[] = [
  {
    id: "amenidad-1",
    label: "Nombre amenidad 1",                        // TODO: editar
    title: "Título de la primera amenidad",            // TODO: editar
    description:
      "Descripción de la amenidad. Explica la experiencia, los materiales, la atmósfera. Aproximadamente dos o tres frases que transmitan el valor de este espacio para el residente.",  // TODO: editar
    image: "/images/renders/render-06.png",            // TODO: reemplazar con imagen real
  },
  {
    id: "amenidad-2",
    label: "Nombre amenidad 2",                        // TODO: editar
    title: "Título de la segunda amenidad",            // TODO: editar
    description:
      "Descripción de la amenidad. Explica la experiencia, los materiales, la atmósfera. Aproximadamente dos o tres frases que transmitan el valor de este espacio para el residente.",  // TODO: editar
    image: "/images/renders/render-08.png",            // TODO: reemplazar con imagen real
  },
  {
    id: "amenidad-3",
    label: "Nombre amenidad 3",                        // TODO: editar
    title: "Título de la tercera amenidad",            // TODO: editar
    description:
      "Descripción de la amenidad. Explica la experiencia, los materiales, la atmósfera. Aproximadamente dos o tres frases que transmitan el valor de este espacio para el residente.",  // TODO: editar
    image: "/images/renders/render-09.png",            // TODO: reemplazar con imagen real
  },
  {
    id: "amenidad-4",
    label: "Nombre amenidad 4",                        // TODO: editar
    title: "Título de la cuarta amenidad",             // TODO: editar
    description:
      "Descripción de la amenidad. Explica la experiencia, los materiales, la atmósfera. Aproximadamente dos o tres frases que transmitan el valor de este espacio para el residente.",  // TODO: editar
    image: "/images/renders/render-07.png",            // TODO: reemplazar con imagen real
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Amenities() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const current = AMENITIES[active];

  return (
    <section
      id="amenities"
      className="relative min-h-screen w-full overflow-hidden bg-ink scroll-mt-20"
    >
      {/* Fondos con fundido cruzado */}
      {AMENITIES.map((a, i) => (
        <div
          key={a.id}
          aria-hidden={i !== active}
          className={`animate-ken-burns absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-silk ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${a.image}')` }}
        />
      ))}
      <div className="veil absolute inset-0" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-20 md:px-12 md:pb-28">
        <Reveal>
          <p className="mb-10 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/90">
            Amenidades · La experiencia
          </p>
        </Reveal>

        <div className="max-w-2xl overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                center: { opacity: 1, x: 0 },
                exit:  (d: number) => ({ opacity: 0, x: d * -60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-balance font-serif text-4xl font-extralight leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                {current.title}
              </h2>
              <p className="mt-6 max-w-xl text-sm font-light leading-relaxed tracking-wide text-white/70 sm:text-base">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={200} className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {AMENITIES.map((a, i) => (
              <button
                key={a.id}
                onClick={() => navigate(i)}
                className={`group relative text-left text-xs font-light uppercase tracking-[0.2em] transition-colors duration-500 sm:text-sm ${
                  i === active ? "text-champagne" : "text-white/45 hover:text-white/80"
                }`}
              >
                <span className="mr-3 font-serif text-[0.7rem] tabular-nums opacity-60">
                  0{i + 1}
                </span>
                {a.label}
                <motion.span
                  className="absolute -bottom-3 left-0 h-px bg-bronze"
                  initial={false}
                  animate={{ width: i === active ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </button>
            ))}

            {/* Flechas de navegación */}
            <div className="ml-auto flex items-center gap-4">
              <button
                onClick={() => navigate((active - 1 + AMENITIES.length) % AMENITIES.length)}
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/60 transition-all duration-300 hover:border-bronze hover:text-champagne"
                aria-label="Anterior"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
              <button
                onClick={() => navigate((active + 1) % AMENITIES.length)}
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/60 transition-all duration-300 hover:border-bronze hover:text-champagne"
                aria-label="Siguiente"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 1L11 7L5 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
