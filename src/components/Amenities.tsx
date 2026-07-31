"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import Reveal from "@/components/ui/Reveal";
import BackgroundImage from "@/components/ui/BackgroundImage";

// ─────────────────────────────────────────────────────────────────────────────
// PLANTILLA DE AMENIDADES — editar aquí
//
// Las imágenes son renders OFICIALES del proyecto. La entrega del 30 de julio
// sumó los interiores, así que smart office, salas de juntas y rooftop ya se
// ilustran con su espacio real. Solo queda pendiente "espacios
// personalizables", que sigue usando una fachada: lleva `illustrative: true`
// y por eso muestra el aviso "Render ilustrativo". Quitar la bandera al
// reemplazarla por su render definitivo.
//
// ⚠️ Los "icon" son PLACEHOLDER genéricos — a futuro cada amenidad
// tendrá su propio ícono definitivo, reemplazar cuando estén listos.
// ─────────────────────────────────────────────────────────────────────────────
interface Amenity {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: ComponentType<{ className?: string }>;
  /** true = la imagen es una aproximación (falta el render del espacio real) */
  illustrative?: boolean;
}

const AMENITIES: Amenity[] = [
  {
    id: "smart-office",
    title: "Smart Office",
    description:
      "Oficinas diseñadas para integrar tecnología, eficiencia y productividad.",
    image: "/images/renders/oficina-interior.webp",
    icon: IconMonitor,
  },
  {
    id: "espacios-personalizables",
    title: "Espacios personalizables",
    description:
      "Adapta la distribución de tu oficina según las necesidades de tu empresa.",
    image: "/images/renders/fachada-modulos.webp", // TODO: reemplazar por interior/planta tipo
    icon: IconLayout,
    illustrative: true,
  },
  {
    id: "salas-de-juntas",
    title: "Salas de juntas equipadas",
    description:
      "Espacios modernos para reuniones, presentaciones y encuentros de negocios.",
    image: "/images/renders/coworking-lounge.webp",
    icon: IconPresentation,
  },
  {
    id: "rooftop-empresarial",
    title: "Rooftop empresarial",
    description:
      "Un espacio exclusivo para networking, reuniones informales y eventos corporativos con vistas privilegiadas.",
    image: "/images/renders/rooftop-terraza.webp",
    icon: IconRooftop,
  },
  {
    id: "iluminacion-inteligente",
    title: "Iluminación inteligente",
    description:
      "Diseño lumínico que recrea la luz natural para brindar mayor confort y bienestar durante la jornada laboral.",
    image: "/images/renders/plaza-atardecer.webp",
    icon: IconBulb,
  },
  {
    id: "arquitectura-contemporanea",
    title: "Arquitectura contemporánea",
    description:
      "Acabados premium y materiales de alta calidad que reflejan profesionalismo y exclusividad.",
    image: "/images/renders/detalle-fachada.webp",
    icon: IconBuilding,
  },
  {
    id: "ubicacion-estrategica",
    title: "Ubicación estratégica en Cartagena",
    description:
      "Conecta tu empresa con uno de los principales polos empresariales y de inversión del Caribe colombiano.",
    image: "/images/renders/aerea-diurna.webp",
    icon: IconPin,
  },
  {
    id: "crecimiento-empresarial",
    title: "Ambientes para el crecimiento empresarial",
    description:
      "Espacios que fortalecen la imagen corporativa y mejoran la experiencia de colaboradores y clientes.",
    image: "/images/renders/zona-estar.webp",
    icon: IconGrowth,
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
              key={a.id}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-opacity duration-1000 ease-silk ${
                i === active ? "animate-ken-burns opacity-100" : "opacity-0"
              }`}
            >
              <BackgroundImage
                src={a.image}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          ))}

          {/* Aviso — solo sobre las amenidades que aún no tienen su render propio */}
          <div
            className={`absolute bottom-6 left-6 z-10 flex items-center gap-2 rounded-sm bg-ink/70 px-3 py-1.5 backdrop-blur-sm transition-opacity duration-700 ease-silk ${
              AMENITIES[active].illustrative ? "opacity-100" : "opacity-0"
            }`}
          >
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
              const Icon = a.icon;
              return (
                <button
                  key={a.id}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="block w-full border-t border-white/10 py-5 text-left last:border-b"
                >
                  <span className="flex items-center gap-4">
                    <Icon
                      className={`h-5 w-5 shrink-0 transition-colors duration-500 ${
                        isActive ? "text-bronze" : "text-white/30"
                      }`}
                    />
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
                    <div className="overflow-hidden pl-9">
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

/* ── Íconos placeholder — trazo fino, consistente con el resto del sitio ── */

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconMonitor({ className }: { className?: string }) {
  return (
    <svg className={className} {...ICON_PROPS}>
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <line x1="8" y1="20" x2="16" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </svg>
  );
}

function IconLayout({ className }: { className?: string }) {
  return (
    <svg className={className} {...ICON_PROPS}>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="5" rx="1" />
      <rect x="13" y="10" width="8" height="11" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
    </svg>
  );
}

function IconPresentation({ className }: { className?: string }) {
  return (
    <svg className={className} {...ICON_PROPS}>
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <path d="M7 10l3-3 3 2 4-4" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </svg>
  );
}

function IconRooftop({ className }: { className?: string }) {
  return (
    <svg className={className} {...ICON_PROPS}>
      <circle cx="12" cy="10" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="4.2" y1="10" x2="6.2" y2="10" />
      <line x1="17.8" y1="10" x2="19.8" y2="10" />
      <line x1="6.5" y1="4.5" x2="8" y2="6" />
      <line x1="16" y1="6" x2="17.5" y2="4.5" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </svg>
  );
}

function IconBulb({ className }: { className?: string }) {
  return (
    <svg className={className} {...ICON_PROPS}>
      <path d="M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.4 1 2.5h6c0-1.1.4-1.9 1-2.5A6 6 0 0 0 12 3z" />
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="10" y1="21" x2="14" y2="21" />
    </svg>
  );
}

function IconBuilding({ className }: { className?: string }) {
  return (
    <svg className={className} {...ICON_PROPS}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <line x1="5" y1="9" x2="19" y2="9" />
      <line x1="5" y1="15" x2="19" y2="15" />
      <line x1="12" y1="3" x2="12" y2="21" />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg className={className} {...ICON_PROPS}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.2" />
    </svg>
  );
}

function IconGrowth({ className }: { className?: string }) {
  return (
    <svg className={className} {...ICON_PROPS}>
      <polyline points="3 17 9 11 13 15 21 6" />
      <polyline points="15 6 21 6 21 12" />
    </svg>
  );
}
