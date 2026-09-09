"use client";

import Reveal from "@/components/ui/Reveal";

// ─────────────────────────────────────────────────────────────────────────────
// AMENIDADES — VERSIÓN B, para comparar contra Amenidades.tsx.
//
// Amenidades.tsx sirve la página 7 del brochure tal cual (el SVG del cliente,
// como imagen). Esta es la alternativa: el mismo contenido, palabra por
// palabra contra el SVG, pero recompuesto como texto real y seleccionable —
// que se reacomoda en móvil en vez de encogerse entero como una imagen.
//
// Dos ajustes sobre la primera versión de esta alternativa:
//   · Paleta: la crema (#e8dbc4) y el azul marino (#1d2d51) de la propia
//     página del brochure, no el azul de marca / champán del resto del
//     sitio — el shimmer champán-oro es ilegible sobre fondo claro, así que
//     esta versión no lo usa.
//   · Disposición: tres columnas en escritorio, igual a como están repartidas
//     las categorías en el brochure (Tecnología+Movilidad a la izquierda,
//     Servicios+Sostenibilidad al centro, Bienestar corporativo a la derecha
//     ocupando las dos filas por ser la lista más larga). Colapsa a una sola
//     columna en móvil: es la razón de ser de una versión en texto.
//
// Ver /preview-amenidades para las dos una debajo de la otra. Cuando se elija
// una, borrar este archivo (o Amenidades.tsx) y esa ruta de comparación.
// ─────────────────────────────────────────────────────────────────────────────

const NAVY = "#1d2d51";
const CREAM = "#e8dbc4";

interface AmenityGroup {
  label: string;
  icon: (props: { className?: string; style?: React.CSSProperties }) => React.ReactElement;
  items: string[];
  /** Posición en la cuadrícula de escritorio, calcada de la del brochure. */
  placement: string;
}

const GROUPS: AmenityGroup[] = [
  {
    label: "Tecnología",
    icon: IconTech,
    items: [
      "Edificio inteligente",
      "Sistemas integrados de seguridad",
      "Infraestructura tecnológica de última generación",
    ],
    placement: "md:col-start-1 md:row-start-1",
  },
  {
    label: "Servicios",
    icon: IconServices,
    items: [
      "Oferta gastronómica (sujeta a operador de Rooftop)",
      "Áreas comunes diseñadas para networking empresarial",
    ],
    placement: "md:col-start-2 md:row-start-1",
  },
  {
    label: "Movilidad",
    icon: IconMobility,
    items: [
      "Parqueaderos privados",
      "Parqueaderos para visitantes",
      "Estaciones de carga para vehículos eléctricos",
      "Bicicleteros y parqueaderos para scooters",
      "Zona automatizada para lavado de vehículos",
    ],
    placement: "md:col-start-1 md:row-start-2",
  },
  {
    label: "Sostenibilidad",
    icon: IconSustainability,
    items: [
      "Sostenibilidad ambiental*",
      "Sistemas para ahorro de agua",
      "Eficiencia energética en zonas comunes",
      "Diseño responsable con el medio ambiente",
    ],
    placement: "md:col-start-2 md:row-start-2",
  },
  {
    label: "Bienestar corporativo",
    icon: IconWellbeing,
    items: [
      "Rooftop panorámico frente al mar con ingreso independiente",
      "Salón social con vista al Caribe",
      "Business Lounge",
      "Sala de reuniones equipadas con video beam y mobiliario básico",
      "Espacios diseñados para promover productividad y bienestar",
    ],
    placement: "md:col-start-3 md:row-start-1 md:row-span-2",
  },
];

export default function AmenidadesTexto() {
  return (
    <section
      id="amenities-texto"
      className="relative w-full scroll-mt-20 py-24 md:py-32"
      style={{ backgroundColor: CREAM }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* ── Encabezado ── */}
        <Reveal>
          <p
            className="text-[0.65rem] font-light uppercase tracking-[0.45em]"
            style={{ color: NAVY, opacity: 0.85 }}
          >
            Amenidades
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2
            className="mt-6 max-w-2xl text-balance font-serif text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl"
            style={{ color: NAVY }}
          >
            Un edificio preparado
            <span className="block font-light italic">
              para el futuro de los negocios
            </span>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p
            className="mt-6 max-w-2xl text-sm font-light leading-relaxed tracking-wide sm:text-base"
            style={{ color: NAVY, opacity: 0.9 }}
          >
            <span style={{ opacity: 1 }}>Malecón Business Center</span>{" "}
            incorpora amenidades y tecnologías inspiradas en los principales
            desarrollos corporativos internacionales.
          </p>
        </Reveal>

        {/* ── Categorías: tres columnas, igual disposición que el brochure ── */}
        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3 md:gap-y-14">
          {GROUPS.map((group, i) => {
            const Icon = group.icon;
            return (
              <Reveal
                key={group.label}
                delay={120 + i * 100}
                className={group.placement}
              >
                <div>
                  <div
                    className="flex items-center gap-3 border-b pb-3"
                    style={{ borderColor: `${NAVY}40` }}
                  >
                    <Icon className="h-5 w-5 shrink-0" style={{ color: NAVY }} />
                    <p
                      className="font-serif text-lg font-light italic leading-snug tracking-wide sm:text-xl"
                      style={{ color: NAVY }}
                    >
                      {group.label}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-2.5 text-sm font-light leading-relaxed tracking-wide sm:text-base"
                        style={{ color: NAVY, opacity: 0.92 }}
                      >
                        <span
                          aria-hidden
                          className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full"
                          style={{ backgroundColor: NAVY, opacity: 0.65 }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ── Nota al pie — aclaración del cliente sobre certificación ── */}
        <Reveal delay={160}>
          <p
            className="mt-10 max-w-2xl text-xs font-light leading-relaxed tracking-wide"
            style={{ color: NAVY, opacity: 0.65 }}
          >
            *Proyecto diseñado con criterios de sostenibilidad, sujeta al
            cumplimiento de los requisitos de la entidad certificadora.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Íconos — mismo trazo fino que el resto del sitio, en azul marino ── */

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconTech({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} {...ICON_PROPS}>
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <line x1="8" y1="20" x2="16" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </svg>
  );
}

function IconServices({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} {...ICON_PROPS}>
      <path d="M4 12a8 8 0 0 1 16 0" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <rect x="3" y="12" width="4" height="5" rx="1" />
      <rect x="17" y="12" width="4" height="5" rx="1" />
      <line x1="12" y1="3" x2="12" y2="5" />
    </svg>
  );
}

function IconMobility({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} {...ICON_PROPS}>
      <path d="M4 16l1.5-5A2 2 0 0 1 7.4 9.5h9.2a2 2 0 0 1 1.9 1.5L20 16" />
      <rect x="3" y="16" width="18" height="4" rx="1" />
      <circle cx="7.5" cy="20" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="20" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconSustainability({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} {...ICON_PROPS}>
      <path d="M12 21c-4-2-6-5.5-6-9.5C6 7 8.5 4 12 3c3.5 1 6 4 6 8.5 0 4-2 7.5-6 9.5z" />
      <path d="M12 21V9" />
    </svg>
  );
}

function IconWellbeing({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} {...ICON_PROPS}>
      <circle cx="12" cy="9" r="4" />
      <line x1="12" y1="1.5" x2="12" y2="3.5" />
      <line x1="4.5" y1="9" x2="6.5" y2="9" />
      <line x1="17.5" y1="9" x2="19.5" y2="9" />
      <line x1="6.8" y1="3.8" x2="8.2" y2="5.2" />
      <line x1="15.8" y1="5.2" x2="17.2" y2="3.8" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </svg>
  );
}
