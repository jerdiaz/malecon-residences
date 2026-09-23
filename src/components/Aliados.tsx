"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Logo from "@/components/Logo";

// ─────────────────────────────────────────────────────────────────────────────
// ALIADOS — la página del brochure "Diseño y Visión Arquitectónica", que sigue
// con "Un proyecto construido sobre confianza".
//
// El cliente pidió el 14 de septiembre que esta sección quedara igual que esa
// página ("esta la cambiamos, debe quedar igual que el brochure"), con una
// excepción explícita: SIN el logo de Alianza Fiduciaria.
//
// El 22 de septiembre entró un segundo crédito, Promociones 0803 como
// estratega inmobiliario, así que el pie dejó de ser una firma centrada y pasó
// a ser una fila. La fiducia sigue fuera; cuando llegue su logo, es sumar una
// entrada más a CREDITOS y la fila se reacomoda sola.
//
// Distinto de "Marcas que han confiado en nosotros" (componente Partners, hoy
// oculto).
//
// Logo del arquitecto: el cliente lo pasó como foto (WhatsApp, 1201×369 JPEG)
// — se vectorizó con potrace (umbral a blanco/negro con ImageMagick y
// trazado), no era un archivo de diseño. El color real del logo es un navy
// (#292457, muestreado del propio JPEG) pensado para fondo blanco — sobre el
// panel oscuro de esta sección quedaba casi invisible (navy sobre navy). Se
// recoloreó a un crema claro (#f5f2ec), el mismo criterio que ya usa el logo
// del sitio en la navbar. El SVG con el navy original queda en git (commit del
// 10 de sept.) por si se necesita para fondo claro. Se sirve con <img>, no con
// next/image, para no perder el vector — mismo criterio que los planos de
// Plantas y el mapa de Ubicación.
// ─────────────────────────────────────────────────────────────────────────────

const ARCHITECT = {
  name: "Arq. Jorge Fernández",
  firm: "Fernández & Compañía Arquitectos Asociados",
  /** Ruta del logo dentro de /public. `null` mientras no lo tengamos. */
  logo: "/images/aliados/fernandez-logo.svg" as string | null,
};

/** El pie de la sección: quién es quién en el proyecto.
 *
 *  El logo de Promociones 0803 llegó en negro sobre blanco, que sobre el fondo
 *  oscuro de esta sección desaparecía. Se recoloreó la palabra a crema
 *  (#f5f2ec) dejando la P en su rojo de marca (#e51c22), que es el elemento
 *  que identifica al logo y sobre el fondo oscuro se lee sin problema. Mismo
 *  criterio que ya se usó con el logo del arquitecto. La textura desgastada
 *  del original vive en el canal alfa, no en el color, así que recolorear el
 *  RGB conservando ese alfa la deja intacta.
 *
 *  Falta la fiducia (Alianza): el logo que publican hoy en su web es la
 *  versión "40 años", branding conmemorativo que no conviene en un sitio de
 *  larga vida, y el lockup "Alianza Fiduciaria" del brochure ya no lo usan.
 *  Hay que pedirle el archivo al cliente. */
const CREDITOS = [
  { rol: "Promotora", tipo: "logo-sitio" as const },
  {
    rol: "Estratega inmobiliario",
    tipo: "imagen" as const,
    src: "/images/aliados/promociones-0803.webp",
    alt: "Logo de Promociones 0803, estratega inmobiliario del proyecto",
    width: 800,
    height: 361,
  },
];

/** Los proyectos que nombra el brochure, en dos renglones.
 *
 *  El orden ya no es el del brochure. Estefanía lo pidió el 2026-09-22: "los
 *  dos últimos de primero y abajo los residenciales". Va primero lo corporativo
 *  —que es lo que este proyecto vende— y debajo lo residencial.
 *
 *  Son dos listas y no una sola reordenada porque "abajo" pide un renglón
 *  propio: con un único `flex-wrap` el corte cae donde alcance el ancho, y en
 *  pantallas anchas los residenciales subirían a la misma línea.
 *
 *  Ojo con el historial: en septiembre se quitó de esta sección un portafolio
 *  del arquitecto agrupado por categorías (Oficinas y comercio / Desarrollos
 *  residenciales y mixtos) a pedido del cliente. Por eso los grupos van SIN
 *  rótulo: se separan por posición, que es lo que se pidió, y no se reintroduce
 *  el encabezado que se retiró. Esto NO es aquel portafolio: es la línea suelta
 *  que el propio brochure trae bajo la semblanza. */
const PROYECTOS_CORPORATIVOS = [
  "Torre empresarial Grupo Área",
  "Murano Trade Center",
];

const PROYECTOS_RESIDENCIALES = [
  "Murano Centro",
  "Ravello",
  "Claro de Luna",
  "Bella Luna",
  "Náutica",
];

export default function Aliados() {
  return (
    <section
      id="aliados"
      className="relative w-full scroll-mt-16 bg-ink aire-seccion"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* ── Encabezado ── */}
        <Reveal>
          <p className="antetitulo text-bronze">
            Aliados
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="titulo-seccion mt-6 max-w-2xl text-balance text-white">
            Diseño y visión <span className="text-shimmer">arquitectónica</span>
          </h2>
        </Reveal>

        {/* ── Banda del arquitecto: firma a la izquierda, semblanza a la
             derecha, con el acento de bronce en la costura ── */}
        <Reveal delay={240}>
          <div className="mt-10 grid border-y border-white/10 md:grid-cols-[minmax(0,20rem)_1fr]">
            <div className="flex flex-col items-center justify-center gap-6 bg-white/[0.02] px-10 py-14">
              {/* El rótulo que encabeza el bloque en el brochure. Antes esta
                  columna era solo el logo y el nombre vivía al otro lado; en
                  la página impresa van juntos, y así el logo deja de flotar
                  sin pie. */}
              <p className="rotulo text-center text-bronze">
                Diseño y visión arquitectónica
              </p>
              <p className="text-center font-serif text-2xl font-extralight tracking-tight text-white sm:text-3xl">
                {ARCHITECT.name}
              </p>
              {/* El logo ya trae el nombre de la firma tipografiado, así que
                  no se repite como texto aparte debajo. */}
              <ArchitectMark />
            </div>

            <div className="border-t border-bronze/40 px-0 py-12 md:border-l md:border-t-0 md:px-12 md:py-14">
              <p className="max-w-2xl text-base font-normal leading-relaxed text-cuerpo xl:text-lg">
                Una de las mentes más influyentes en la evolución del paisaje
                urbano vertical y corporativo de{" "}
                <span className="text-white/85">Cartagena</span>.{" "}
                <span className="text-white/85">Malecón Business Center</span>{" "}
                representa la culminación de su genialidad creativa y su amor
                por la ciudad.
              </p>

              <div className="mt-8">
                <p className="rotulo text-bronze">
                  Algunos de sus proyectos
                </p>
                {/* En fila y con el punto de bronce delante de cada nombre,
                    no con filetes entre uno y otro: en el brochure es una
                    línea corrida separada por barras, pero al reacomodarse la
                    barra caía al principio del renglón siguiente, como si
                    faltara un nombre antes. El punto es un marcador, no un
                    separador, así que aguanta el salto de línea — y es el
                    mismo que usan las demás listas del sitio. */}
                <div className="mt-4 space-y-2.5">
                  {[PROYECTOS_CORPORATIVOS, PROYECTOS_RESIDENCIALES].map(
                    (grupo) => (
                      <ul
                        key={grupo[0]}
                        className="flex flex-wrap items-center gap-x-6 gap-y-2.5"
                      >
                        {grupo.map((p) => (
                          <li
                            key={p}
                            className="flex items-center gap-2.5 text-base font-normal leading-relaxed text-cuerpo"
                          >
                            <span
                              aria-hidden
                              className="h-1 w-1 shrink-0 rounded-full bg-bronze"
                            />
                            {p}
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Cierre: "Un proyecto construido sobre confianza" ── */}
        <Reveal delay={200} variant="fade-up">
          <div className="mx-auto mt-12 max-w-3xl text-center">
            <h3 className="font-serif text-3xl font-extralight leading-[1.15] tracking-tight text-white sm:text-4xl">
              Un proyecto construido sobre{" "}
              <span className="font-light italic">confianza</span>
            </h3>
            <p className="mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-cuerpo xl:text-lg">
              <span className="text-white/85">Malecón Business Center</span>{" "}
              cuenta con el respaldo de un equipo de profesionales con amplia
              trayectoria en el desarrollo de proyectos inmobiliarios de gran
              escala.
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-base font-normal leading-relaxed text-cuerpo xl:text-lg">
              Es la respuesta ejecutiva para empresas e inversionistas que
              buscan posicionarse en uno de los desarrollos corporativos más
              ambiciosos y de mayor valorización en{" "}
              <span className="text-white/85">Cartagena, Colombia</span>.
            </p>
          </div>
        </Reveal>

        {/* ── Créditos — el pie de la página del brochure, que pone los roles
             uno al lado del otro. Apilados en móvil, en fila desde sm. */}
        <Reveal delay={320}>
          <div className="mt-10 border-t border-white/10 pt-10">
            <div className="flex flex-col items-center justify-center gap-12 sm:flex-row sm:gap-20">
              {CREDITOS.map((c) => (
                <div
                  key={c.rol}
                  className="flex flex-col items-center gap-5"
                >
                  <p className="rotulo text-center text-bronze">{c.rol}</p>
                  {c.tipo === "logo-sitio" ? (
                    <Logo variant="stacked" className="h-20" />
                  ) : (
                    <Image
                      src={c.src}
                      alt={c.alt}
                      width={c.width}
                      height={c.height}
                      className="h-20 w-auto"
                    />
                  )}
                </div>
              ))}
            </div>
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
