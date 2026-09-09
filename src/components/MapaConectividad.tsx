"use client";

import Reveal from "@/components/ui/Reveal";
import {
  CATEGORIA_COLOR,
  LEYENDA,
  PUNTOS,
  DISTANCIAS_ESTRATEGICAS,
  type PuntoConectividad,
} from "@/lib/conectividad";
import { CONTACT } from "@/lib/contact";

// ─────────────────────────────────────────────────────────────────────────────
// PRUEBA — recreación de "Conectividad que impulsa los negocios" (página 8
// del brochure), a partir de una captura que pasó el cliente por chat.
//
// No hay archivo fuente para esta página (a diferencia de Amenidades, donde
// sí había un SVG del cliente): la costa, los pines y sus posiciones son una
// reconstrucción a mano — ver la nota completa en src/lib/conectividad.ts.
// Es una prueba para decidir el enfoque, no algo listo para producción.
//
// Paleta: crema/azul marino de las páginas del brochure, igual que en
// AmenidadesTexto — no el azul de marca del resto del sitio.
// ─────────────────────────────────────────────────────────────────────────────

const NAVY = "#1d2d51";
const CREAM = "#f5f2ec";
const AGUA = "#a9b7c8";

export default function MapaConectividad() {
  return (
    <section
      id="conectividad-prueba"
      className="relative w-full scroll-mt-20 py-24 md:py-32"
      style={{ backgroundColor: CREAM }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:px-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-12">
        {/* ── Columna de texto ── */}
        <div>
          <Reveal>
            <p
              className="text-[0.65rem] font-light uppercase tracking-[0.45em]"
              style={{ color: NAVY, opacity: 0.85 }}
            >
              Conectividad
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2
              className="mt-6 text-balance font-serif text-4xl font-extralight leading-[1.1] tracking-tight sm:text-5xl"
              style={{ color: NAVY }}
            >
              Conectividad que
              <span className="block font-light italic">
                impulsa los negocios
              </span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p
              className="mt-6 text-sm font-light leading-relaxed tracking-wide sm:text-base"
              style={{ color: NAVY, opacity: 0.9 }}
            >
              La ubicación de{" "}
              <span style={{ opacity: 1 }}>Malecón Business Center</span>{" "}
              permite conectar rápidamente con los principales centros
              financieros, turísticos, logísticos e industriales de Cartagena.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p
              className="mt-4 text-sm font-light leading-relaxed tracking-wide sm:text-base"
              style={{ color: NAVY, opacity: 0.9 }}
            >
              Su privilegiada ubicación frente al mar no solo ofrece vistas
              excepcionales, sino una exposición permanente para las empresas
              que buscan fortalecer su posicionamiento y visibilidad.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10">
              <p
                className="text-[0.7rem] font-semibold uppercase tracking-[0.25em]"
                style={{ color: NAVY, opacity: 0.95 }}
              >
                Distancias estratégicas
              </p>
              <ul className="mt-4 space-y-2">
                {DISTANCIAS_ESTRATEGICAS.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-2.5 text-sm font-light leading-relaxed tracking-wide"
                    style={{ color: NAVY, opacity: 0.85 }}
                  >
                    <span
                      aria-hidden
                      className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: NAVY, opacity: 0.55 }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-10 flex items-start gap-3">
              <IconPinAddress
                className="mt-0.5 h-5 w-5 shrink-0"
                style={{ color: NAVY }}
              />
              <p
                className="text-sm font-light leading-relaxed"
                style={{ color: NAVY, opacity: 0.9 }}
              >
                <span className="font-semibold" style={{ opacity: 1 }}>
                  Dirección Malecón Business Center:
                </span>
                <br />
                <span className="italic">
                  {CONTACT.projectStreet}
                </span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── Mapa ── */}
        <Reveal delay={200}>
          <div className="relative">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-sm sm:aspect-[16/10]"
              style={{ backgroundColor: AGUA }}
            >
              {/* Costa — forma estilizada, no una traza geográfica exacta */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                <path
                  d="M 100,0 L 100,100 L 68,100 L 60,88 L 63,78 L 55,68 L 58,58 L 50,52 L 47,44 L 52,36 L 46,28 L 50,18 L 44,8 L 48,0 Z"
                  fill={CREAM}
                  opacity={0.92}
                />
              </svg>

              {PUNTOS.map((p) => (
                <Marcador key={p.label} punto={p} />
              ))}
            </div>

            <p
              className="mt-3 text-[0.6rem] font-light italic leading-relaxed"
              style={{ color: NAVY, opacity: 0.55 }}
            >
              *Tiempo estimado sujeto a condición de vías y movilidad.
            </p>

            {/* Leyenda */}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {LEYENDA.map((l) => (
                <div key={l.categoria} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: CATEGORIA_COLOR[l.categoria] }}
                  />
                  <span
                    className="text-[0.65rem] font-light uppercase tracking-[0.1em]"
                    style={{ color: NAVY, opacity: 0.8 }}
                  >
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Un marcador sobre el mapa: punto de color + etiqueta, o ícono + etiqueta
     para los hitos de infraestructura ── */

/** Clases de posición según hacia qué lado se extiende la etiqueta del punto. */
const POSICION_ETIQUETA: Record<NonNullable<PuntoConectividad["labelDir"]>, string> = {
  bottom: "left-1/2 top-[calc(100%+3px)] -translate-x-1/2 text-center",
  top: "left-1/2 bottom-[calc(100%+3px)] -translate-x-1/2 text-center",
  left: "right-[calc(100%+5px)] top-1/2 -translate-y-1/2 text-right",
  right: "left-[calc(100%+5px)] top-1/2 -translate-y-1/2 text-left",
};

function Marcador({ punto }: { punto: PuntoConectividad }) {
  const color = CATEGORIA_COLOR[punto.categoria];
  const Icono = punto.icono ? ICONOS[punto.icono] : null;
  const esProyecto = punto.categoria === "proyecto";

  return (
    <div
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${punto.x}%`, top: `${punto.y}%` }}
    >
      <div className="flex items-center gap-1.5">
        {esProyecto ? (
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-white"
            style={{ backgroundColor: color }}
          >
            <IconTorre className="h-3 w-3 text-white" />
          </span>
        ) : Icono ? (
          <span
            className="flex h-4 w-4 items-center justify-center rounded-full"
            style={{ backgroundColor: NAVY }}
          >
            <Icono className="h-2.5 w-2.5" style={{ color: CREAM }} />
          </span>
        ) : (
          <span
            className="h-2 w-2 shrink-0 rounded-full ring-1 ring-white/70"
            style={{ backgroundColor: color }}
          />
        )}
      </div>

      <div
        className={`pointer-events-none absolute hidden w-max max-w-[5.5rem] leading-[1.1] md:block ${
          POSICION_ETIQUETA[punto.labelDir ?? "bottom"]
        }`}
        style={{ color: NAVY }}
      >
        {punto.minutos != null && (
          <p className="text-[0.45rem] font-semibold" style={{ opacity: 0.9 }}>
            {punto.minutos} min
          </p>
        )}
        {punto.proyectado && (
          <p className="text-[0.4rem] font-light italic" style={{ opacity: 0.7 }}>
            (Proyectado)
          </p>
        )}
        <p className="text-[0.45rem] font-light italic" style={{ opacity: 0.85 }}>
          {punto.label}
        </p>
      </div>
    </div>
  );
}

/* ── Íconos ── */

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconTorre({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11 2 6 8v13h5V2Z" opacity={0.85} />
      <path d="M13 5v16h5V9l-5-4Z" />
    </svg>
  );
}

function IconPinAddress({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} {...ICON_PROPS}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.2" />
    </svg>
  );
}

function IconAvion({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 16v-2l-8-5V4a1.5 1.5 0 0 0-3 0v5l-8 5v2l8-2.5V18l-2.5 2v1.5L12 21l4.5.5V20l-2.5-2v-4.5L21 16z" />
    </svg>
  );
}

function IconUniversidad({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 1 8l11 6 9-4.9V17h2V8L12 2Z" />
      <path d="M5 12.2V17c0 2 3 4 7 4s7-2 7-4v-4.8l-7 3.8-7-3.8Z" />
    </svg>
  );
}

function IconHospital({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} {...ICON_PROPS}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <line x1="12" y1="8" x2="12" y2="14" />
      <line x1="9" y1="11" x2="15" y2="11" />
    </svg>
  );
}

function IconHistorico({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} {...ICON_PROPS}>
      <path d="M4 21h16" />
      <path d="M5 21V10M9 21V10M15 21V10M19 21V10" />
      <path d="M3 10l9-6 9 6" />
    </svg>
  );
}

function IconCarretera({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} {...ICON_PROPS}>
      <path d="M6 21 10 3h4l4 18" />
      <line x1="12" y1="8" x2="12" y2="11" />
      <line x1="12" y1="14" x2="12" y2="17" />
    </svg>
  );
}

function IconPuerto({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} {...ICON_PROPS}>
      <path d="M3 17h18l-2 4H5l-2-4Z" />
      <path d="M6 17V9h4V6h4v3h4v8" />
    </svg>
  );
}

function IconIndustria({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} {...ICON_PROPS}>
      <path d="M3 21V11l5 3v-3l5 3v-3l5 3v7Z" />
      <line x1="3" y1="21" x2="21" y2="21" />
    </svg>
  );
}

const ICONOS: Record<
  NonNullable<PuntoConectividad["icono"]>,
  (props: { className?: string; style?: React.CSSProperties }) => React.ReactElement
> = {
  avion: IconAvion,
  universidad: IconUniversidad,
  hospital: IconHospital,
  historico: IconHistorico,
  carretera: IconCarretera,
  puerto: IconPuerto,
  industria: IconIndustria,
};
