"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

// ─────────────────────────────────────────────────────────────────────────────
// ALIADOS — "Diseño y visión arquitectónica". Contenido entregado por el
// cliente: el arquitecto líder del proyecto, su portafolio en Cartagena y el
// cierre sobre el equipo. Distinto de "Marcas que han confiado en nosotros"
// (componente Partners, hoy oculto).
//
// ⚠️ LOGO PENDIENTE: el cliente lo dejó como archivo de Drive, todavía sin
// descargar. Al bajarlo, guardarlo en /public/images/aliados/ y poner la ruta
// en ARCHITECT.logo — el aviso de "logo pendiente" desaparece solo.
// ─────────────────────────────────────────────────────────────────────────────

const ARCHITECT = {
  name: "Arq. Jorge Fernández",
  firm: "Fernández & Compañía Arquitectos Asociados",
  /** Ruta del logo dentro de /public. `null` mientras no lo tengamos. */
  logo: null as string | null,
};

interface PortfolioGroup {
  label: string;
  projects: string[];
}

const PORTFOLIO: PortfolioGroup[] = [
  {
    label: "Oficinas y comercio",
    projects: [
      "Malecón Business Center",
      "Murano Trade Center",
      "Torre Empresarial Grupo Área",
    ],
  },
  {
    label: "Desarrollos residenciales y mixtos",
    projects: [
      "Murano Centro",
      "Ravello",
      "Claro de Luna",
      "Bella Luna",
      "Náutica",
    ],
  },
];

/** El proyecto propio se marca aparte dentro del portafolio. */
const OWN_PROJECT = "Malecón Business Center";

export default function Aliados() {
  return (
    <section
      id="aliados"
      className="relative w-full scroll-mt-20 bg-ink py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* ── Encabezado ── */}
        <Reveal>
          <p className="text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/90">
            Aliados
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-6 max-w-2xl text-balance font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl">
            Diseño y visión
            <span className="block font-light italic text-shimmer">
              arquitectónica
            </span>
          </h2>
        </Reveal>

        {/* ── Banda del arquitecto: firma a la izquierda, semblanza a la
             derecha, con el acento de bronce en la costura ── */}
        <Reveal delay={240}>
          <div className="mt-16 grid border-y border-white/10 md:grid-cols-[minmax(0,20rem)_1fr]">
            <div className="flex flex-col items-center justify-center gap-6 bg-white/[0.02] px-10 py-14">
              <ArchitectMark />
              <p className="text-center font-serif text-lg font-light leading-snug tracking-[0.1em] text-champagne">
                {ARCHITECT.firm}
              </p>
            </div>

            <div className="border-t border-bronze/40 px-0 py-12 md:border-l md:border-t-0 md:px-12 md:py-14">
              <p className="text-[0.65rem] font-light uppercase tracking-[0.35em] text-bronze/80">
                Arquitecto
              </p>
              <p className="mt-4 font-serif text-2xl font-extralight tracking-tight text-white sm:text-3xl">
                {ARCHITECT.name}
              </p>
              <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed tracking-wide text-white/60 sm:text-base">
                Líder e impulsor en la transformación del paisaje urbano
                vertical y corporativo de{" "}
                <span className="text-white/85">Cartagena de Indias</span>, el{" "}
                <span className="text-white/85">{ARCHITECT.name}</span> imprime
                en <span className="text-white/85">Malecón Business Center</span>{" "}
                la cúspide de su trayectoria profesional, diseño vanguardista y
                visión urbanística.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Portafolio: filas separadas por hairlines, no tarjetas ── */}
        <Reveal delay={120}>
          <p className="mt-20 text-[0.65rem] font-light uppercase tracking-[0.35em] text-bronze/80">
            Portafolio de proyectos emblemáticos en Cartagena
          </p>
        </Reveal>

        <div className="mt-8 border-t border-white/10">
          {PORTFOLIO.map((group, i) => (
            <Reveal key={group.label} delay={200 + i * 120}>
              <div className="group grid gap-5 border-b border-white/10 py-10 transition-[padding] duration-500 ease-silk md:grid-cols-[minmax(0,17rem)_1fr] md:gap-12 md:py-12 md:hover:pl-5">
                <p className="font-serif text-lg font-light leading-snug tracking-wide text-white/85 transition-colors duration-500 group-hover:text-champagne">
                  {group.label}
                </p>
                <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-3">
                  {group.projects.map((project, j) => (
                    <li key={project} className="flex items-baseline gap-3">
                      {j > 0 && (
                        <span aria-hidden className="text-bronze/50">
                          ·
                        </span>
                      )}
                      <span
                        className={
                          project === OWN_PROJECT
                            ? "text-sm font-light tracking-wide text-champagne sm:text-base"
                            : "text-sm font-light tracking-wide text-white/55 sm:text-base"
                        }
                      >
                        {project}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Cierre ── */}
        <Reveal delay={200}>
          <div className="mx-auto mt-20 max-w-3xl space-y-5 text-center">
            <p className="text-sm font-light leading-relaxed tracking-wide text-white/60 sm:text-base">
              Reunimos la trayectoria de reconocidos arquitectos, ingenieros y
              especialistas de primer nivel para consolidar una propuesta de
              oficinas e inversión inmobiliaria que combina solidez, innovación
              y ubicación estratégica.
            </p>
            <p className="text-sm font-light leading-relaxed tracking-wide text-white/60 sm:text-base">
              <span className="text-white/85">Malecón Business Center</span> es
              la respuesta ejecutiva para empresas e inversionistas que buscan
              posicionarse en uno de los desarrollos corporativos más ambiciosos
              y de mayor valorización en{" "}
              <span className="text-white/85">Cartagena, Colombia</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Logo de la firma — real si ya lo tenemos, aviso honesto si no ── */

function ArchitectMark() {
  if (ARCHITECT.logo) {
    return (
      <Image
        src={ARCHITECT.logo}
        alt={`Logo de ${ARCHITECT.firm}`}
        width={160}
        height={80}
        className="h-20 w-auto object-contain"
      />
    );
  }

  return (
    <div className="flex h-20 w-full max-w-[10rem] flex-col items-center justify-center gap-2 border border-dashed border-white/20 px-3 text-center">
      <span className="text-[0.55rem] font-light uppercase tracking-[0.25em] text-white/35">
        Logo pendiente
      </span>
      <span className="text-[0.55rem] font-light leading-tight tracking-wide text-white/25">
        Fernández &amp; Compañía
      </span>
    </div>
  );
}
