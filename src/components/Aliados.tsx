"use client";

import Reveal from "@/components/ui/Reveal";

// ─────────────────────────────────────────────────────────────────────────────
// ALIADOS — "Diseño y visión arquitectónica". Contenido entregado por el
// cliente: el arquitecto líder del proyecto y el cierre sobre el equipo.
// Distinto de "Marcas que han confiado en nosotros" (componente Partners, hoy
// oculto).
//
// El portafolio de proyectos del arquitecto (Oficinas y comercio /
// Desarrollos residenciales y mixtos) se quitó a pedido del cliente. Sigue en
// el historial de git si hay que recuperarlo.
//
// Logo: el cliente lo pasó como foto (WhatsApp, 1201×369 JPEG) — se
// vectorizó con potrace (umbral a blanco/negro con ImageMagick y trazado),
// no era un archivo de diseño. El color real del logo es un navy
// (#292457, muestreado del propio JPEG) pensado para fondo blanco — sobre
// el panel oscuro de esta sección quedaba casi invisible (navy sobre
// navy). Se recoloreó a un crema claro (#f5f2ec), el mismo criterio que ya
// usa el logo del sitio en la navbar. El SVG con el navy original queda en
// git (commit del 10 de sept.) por si se necesita para fondo claro.
// Vive en /public/images/aliados/fernandez-logo.svg y se sirve con <img>, no
// con next/image, para no perder el vector — mismo criterio que los planos
// de Plantas y el mapa de Ubicación.
// ─────────────────────────────────────────────────────────────────────────────

const ARCHITECT = {
  name: "Arq. Jorge Fernández",
  firm: "Fernández & Compañía Arquitectos Asociados",
  /** Ruta del logo dentro de /public. `null` mientras no lo tengamos. */
  logo: "/images/aliados/fernandez-logo.svg" as string | null,
};

export default function Aliados() {
  return (
    <section
      id="aliados"
      className="relative w-full scroll-mt-20 bg-ink py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* ── Encabezado ── */}
        <Reveal>
          <p className="text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze">
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
              {/* El logo ya trae el nombre de la firma tipografiado, así que
                  no se repite como texto aparte debajo — antes, mientras
                  estaba pendiente, sí hacía falta ese texto de respaldo. */}
              <ArchitectMark />
            </div>

            <div className="border-t border-bronze/40 px-0 py-12 md:border-l md:border-t-0 md:px-12 md:py-14">
              <p className="text-[0.65rem] font-light uppercase tracking-[0.35em] text-bronze/80">
                Arquitecto
              </p>
              <p className="mt-4 font-serif text-2xl font-extralight tracking-tight text-white sm:text-3xl">
                {ARCHITECT.name}
              </p>
              <p className="mt-6 max-w-2xl text-sm font-normal leading-relaxed text-cuerpo sm:text-base">
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

        {/* ── Cierre ── */}
        <Reveal delay={200}>
          <div className="mx-auto mt-20 max-w-3xl space-y-5 text-center">
            <p className="text-sm font-normal leading-relaxed text-cuerpo sm:text-base">
              Reunimos la trayectoria de reconocidos arquitectos, ingenieros y
              especialistas de primer nivel para consolidar una propuesta de
              oficinas e inversión inmobiliaria que combina solidez, innovación
              y ubicación estratégica.
            </p>
            <p className="text-sm font-normal leading-relaxed text-cuerpo sm:text-base">
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
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={ARCHITECT.logo}
        alt={`Logo de ${ARCHITECT.firm}`}
        // El lockup real es apaisado (2216×564, ≈3.93:1) — nada que ver con
        // el 160×80 (2:1) que tenía el placeholder. w-full para que llene
        // la columna angosta (max 20rem, con padding de 2.5rem por lado —
        // 15rem es prácticamente el ancho útil completo) y h-auto respeta
        // esa proporción en vez de recortarla.
        className="h-auto w-full max-w-[15rem]"
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
