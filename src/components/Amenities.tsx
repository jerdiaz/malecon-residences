"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

// ─────────────────────────────────────────────────────────────────────────────
// PLANTILLA DE AMENIDADES — editar aquí
//
// ⚠️ Las imágenes de "image" son RENDERS POR DEFECTO (placeholder), tomados
// del set genérico de fachadas/vistas aéreas que ya existe en /public/images/renders.
// Ninguna es la foto definitiva de cada amenidad — deben reemplazarse por
// fotografía/render específico de cada espacio (interior de oficina, sala de
// juntas, rooftop al atardecer, detalle de iluminación, etc.) antes de lanzar.
// ─────────────────────────────────────────────────────────────────────────────
interface Amenity {
  number: string;
  title: string;
  description: string;
  image: string;
}

const AMENITIES: Amenity[] = [
  {
    number: "01",
    title: "Smart Office",
    description:
      "Oficinas diseñadas para integrar tecnología, eficiencia y productividad.",
    image: "/images/renders/render-08.png", // TODO: reemplazar por render definitivo
  },
  {
    number: "02",
    title: "Espacios personalizables",
    description:
      "Adapta la distribución de tu oficina según las necesidades de tu empresa.",
    image: "/images/renders/render-07.png", // TODO: reemplazar por render definitivo
  },
  {
    number: "03",
    title: "Salas de juntas equipadas",
    description:
      "Espacios modernos para reuniones, presentaciones y encuentros de negocios.",
    image: "/images/renders/render-06.png", // TODO: reemplazar por render definitivo
  },
  {
    number: "04",
    title: "Rooftop empresarial",
    description:
      "Un espacio exclusivo para networking, reuniones informales y eventos corporativos con vistas privilegiadas.",
    image: "/images/renders/render-01.png", // TODO: reemplazar por render definitivo
  },
  {
    number: "05",
    title: "Iluminación inteligente",
    description:
      "Diseño lumínico que recrea la luz natural para brindar mayor confort y bienestar durante la jornada laboral.",
    image: "/images/renders/render-05.png", // TODO: reemplazar por render definitivo
  },
  {
    number: "06",
    title: "Arquitectura contemporánea",
    description:
      "Acabados premium y materiales de alta calidad que reflejan profesionalismo y exclusividad.",
    image: "/images/renders/render-04.png", // TODO: reemplazar por render definitivo
  },
  {
    number: "07",
    title: "Ubicación estratégica en Cartagena",
    description:
      "Conecta tu empresa con uno de los principales polos empresariales y de inversión del Caribe colombiano.",
    image: "/images/renders/render-02.png", // TODO: reemplazar por render definitivo
  },
  {
    number: "08",
    title: "Ambientes para el crecimiento empresarial",
    description:
      "Espacios que fortalecen la imagen corporativa y mejoran la experiencia de colaboradores y clientes.",
    image: "/images/renders/render-03.png", // TODO: reemplazar por render definitivo
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Amenities() {
  const [active, setActive] = useState(0);

  return (
    <section id="amenities" className="relative w-full bg-ink scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-12">
        <Reveal>
          <p className="text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/90">
            Amenidades · La experiencia
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 max-w-2xl text-balance font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl">
            Todo lo que su empresa
            <span className="block font-light italic text-shimmer">
              necesita para crecer
            </span>
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-16 lg:flex lg:items-start">
        {/* Columna izquierda — imagen sticky con crossfade */}
        <div className="relative h-[55vh] w-full overflow-hidden lg:sticky lg:top-0 lg:h-screen lg:w-[60%]">
          {AMENITIES.map((a, i) => (
            <div
              key={a.number}
              aria-hidden={i !== active}
              className={`animate-ken-burns absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-silk ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('${a.image}')` }}
            />
          ))}
          <div className="veil absolute inset-0" />

          {/* Aviso: render por defecto, no definitivo */}
          <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 rounded-sm bg-ink/70 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
            <span className="text-[0.6rem] font-light uppercase tracking-[0.2em] text-white/60">
              Render ilustrativo · imagen no definitiva
            </span>
          </div>
        </div>

        {/* Columna derecha — lista interactiva */}
        <div className="w-full px-6 py-14 md:px-12 lg:w-[40%] lg:py-24">
          <div className="lg:pr-4">
            {AMENITIES.map((a, i) => {
              const isActive = i === active;
              return (
                <button
                  key={a.number}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="block w-full border-t border-white/10 py-5 text-left last:border-b"
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      className={`font-serif text-xs tabular-nums transition-colors duration-500 ${
                        isActive ? "text-bronze" : "text-white/30"
                      }`}
                    >
                      {a.number}
                    </span>
                    <span
                      className={`font-serif text-lg font-light leading-snug transition-colors duration-500 sm:text-xl ${
                        isActive ? "text-champagne" : "text-white/40"
                      }`}
                    >
                      {a.title}
                    </span>
                  </span>

                  {/* Descripción — se despliega solo en el ítem activo */}
                  <div
                    className={`grid transition-all duration-500 ease-silk ${
                      isActive ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden pl-8">
                      <p className="text-sm font-light leading-relaxed tracking-wide text-white/55">
                        {a.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
