"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import BackgroundImage from "@/components/ui/BackgroundImage";

// ─────────────────────────────────────────────────────────────────────────────
// ALIADOS — VERSIÓN B (alternativa para comparar contra Aliados.tsx).
//
// Mismo contenido, otra composición: banda dividida con un render a sangre por
// el borde izquierdo de la pantalla, y el portafolio como índice numerado en
// dos columnas en vez de filas anchas.
//
// ⚠️ LOGO PENDIENTE: igual que en la versión A, ARCHITECT.logo es null
// mientras el archivo siga en el Drive del cliente.
// ─────────────────────────────────────────────────────────────────────────────

const ARCHITECT = {
  name: "Arq. Jorge Fernández",
  firm: "Fernández & Compañía Arquitectos Asociados",
  logo: null as string | null,
};

/** Render que acompaña la banda. Un detalle de fachada, no la torre completa:
 *  la sección habla de diseño, no de la ubicación. */
const IMAGE = "/images/renders/detalle-fachada.webp";

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

const OWN_PROJECT = "Malecón Business Center";

export default function AliadosAlt() {
  return (
    <section id="aliados-alt" className="relative w-full scroll-mt-20 bg-ink">
      {/* ── Banda: render a sangre a la izquierda, semblanza a la derecha ── */}
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-[45%_1fr]">
        <div className="relative order-2 min-h-[60vw] overflow-hidden lg:order-none lg:min-h-[38rem]">
          <BackgroundImage
            src={IMAGE}
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          {/* Veil en degradado: pesado abajo, donde va la firma; casi limpio
              arriba, para no apagar el render. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-8 md:p-12">
            <ArchitectMark />
            <p className="font-serif text-base font-light leading-snug tracking-[0.1em] text-champagne">
              {ARCHITECT.firm}
            </p>
          </div>
        </div>

        <div className="order-1 flex items-center px-6 py-20 md:px-12 lg:order-none lg:px-16 lg:py-28 xl:px-24">
          <div className="max-w-xl">
            <Reveal>
              <p className="text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/90">
                Aliados
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 text-balance font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl">
                Diseño y visión
                <span className="block font-light italic text-shimmer">
                  arquitectónica
                </span>
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-10 text-[0.65rem] font-light uppercase tracking-[0.35em] text-bronze/80">
                Arquitecto
              </p>
              <p className="mt-3 font-serif text-2xl font-extralight tracking-tight text-white sm:text-3xl">
                {ARCHITECT.name}
              </p>
              <p className="mt-6 text-sm font-light leading-relaxed tracking-wide text-white/60 sm:text-base">
                Líder e impulsor en la transformación del paisaje urbano
                vertical y corporativo de{" "}
                <span className="text-white/85">Cartagena de Indias</span>, el{" "}
                <span className="text-white/85">{ARCHITECT.name}</span> imprime
                en <span className="text-white/85">Malecón Business Center</span>{" "}
                la cúspide de su trayectoria profesional, diseño vanguardista y
                visión urbanística.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Portafolio: índice numerado en dos columnas ── */}
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:px-12 md:pb-32">
        <Reveal>
          <p className="text-[0.65rem] font-light uppercase tracking-[0.35em] text-bronze/80">
            Portafolio de proyectos emblemáticos en Cartagena
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-2 md:gap-16">
          {PORTFOLIO.map((group, i) => (
            <Reveal key={group.label} delay={160 + i * 140}>
              <div>
                <div className="flex items-baseline gap-5">
                  <span className="font-serif text-2xl font-extralight leading-none text-bronze/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-serif text-lg font-light leading-snug tracking-wide text-white/85">
                    {group.label}
                  </p>
                </div>
                <ul className="mt-6 md:pl-[3.1rem]">
                  {group.projects.map((project) => (
                    <li
                      key={project}
                      className="border-b border-white/10 py-4 text-sm font-light tracking-wide transition-[padding] duration-500 ease-silk hover:pl-3 sm:text-base"
                    >
                      <span
                        className={
                          project === OWN_PROJECT
                            ? "text-champagne"
                            : "text-white/55"
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
          <div className="mt-20 grid gap-6 border-t border-white/10 pt-14 md:grid-cols-2 md:gap-16">
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
        height={72}
        className="h-16 w-auto object-contain"
      />
    );
  }

  return (
    <div className="flex h-16 w-full max-w-[9rem] flex-col items-center justify-center gap-1.5 border border-dashed border-white/25 px-3 text-center">
      <span className="text-[0.55rem] font-light uppercase tracking-[0.25em] text-white/40">
        Logo pendiente
      </span>
      <span className="text-[0.55rem] font-light leading-tight tracking-wide text-white/30">
        Fernández &amp; Compañía
      </span>
    </div>
  );
}
