"use client";

import Reveal from "@/components/ui/Reveal";
import SplitWords from "@/components/ui/SplitWords";

// ─────────────────────────────────────────────────────────────────────────────
// CIFRAS — "Espacios diseñados para crecer", la página del brochure que habla
// de los metrajes. El cliente la echó en falta en la reunión del 14 de
// septiembre ("nos faltó la del brochure que habla de las cifras").
//
// Va como texto real, no como imagen: mismo criterio que AmenidadesTexto, y
// por el mismo motivo —se reacomoda en móvil en vez de encogerse entera—.
// Aquí además importa que los metrajes sean seleccionables y copiables: son el
// dato que un inversionista compara.
//
// Paleta: el ink del sitio, no la crema del brochure. La página impresa es
// navy sobre navy y encaja con el resto de secciones oscuras; Amenidades usa
// crema porque su página original lo es.
// ─────────────────────────────────────────────────────────────────────────────

/** Los seis renglones de la página, palabra por palabra contra el brochure.
 *  El séptimo —6.880 m² de oficinas premium— vive arriba como cifra
 *  protagonista, así que no se repite aquí. */
const ESPECIFICACIONES = [
  "Áreas desde 32,6 m² / 65,2 m² hasta pisos completos",
  "Diseño versátil para unir oficinas",
  "Altura libre en oficinas de 2,8 m",
  "Máximo aprovechamiento de iluminación natural",
  "Fachada flotante con reducción acústica y ventanería bronce con control solar*",
  "Eficiencia energética para zonas comunes",
];

const NOTA = "* Atenuación de intensidad lumínica.";

const CIERRE =
  "Cada oficina ha sido diseñada para adaptarse a la evolución de las empresas y responder a las nuevas dinámicas del trabajo corporativo.";

export default function Cifras() {
  return (
    <section
      id="cifras"
      className="relative w-full scroll-mt-20 bg-ink py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* ── Encabezado ── */}
        <Reveal>
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.2em] text-bronze">
            El edificio en cifras
          </p>
        </Reveal>
        <h2 className="mt-6 max-w-2xl text-balance font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl">
          <SplitWords text="Espacios diseñados para " delay={100} stagger={50} />
          <span className="font-light italic">crecer</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-[auto_1fr] lg:gap-x-24">
          {/* ── Cifra protagonista ──
               En la sans y no en la serif del resto de los títulos: a este
               cuerpo los números de la Cormorant se leen como ornamento y no
               como dato. Sin `tabular-nums` a propósito — ese ajuste alinea
               columnas de números, y en una cifra suelta separa los dígitos.
               Es la única de la sección: el resto de los metrajes viven en la
               lista, donde se comparan entre sí. */}
          <Reveal delay={200}>
            <div className="lg:border-r lg:border-white/10 lg:pr-24">
              <p className="font-sans text-5xl font-medium leading-none tracking-tight text-champagne sm:text-6xl">
                6.880 m²
              </p>
              <p className="mt-4 max-w-[14rem] text-base font-normal leading-relaxed text-cuerpo">
                de oficinas premium
              </p>
            </div>
          </Reveal>

          {/* ── El resto de la página, renglón por renglón ── */}
          <Reveal delay={320} variant="fade-up">
            <div>
              <ul className="space-y-4">
                {ESPECIFICACIONES.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-base font-normal leading-relaxed text-cuerpo xl:text-lg"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-bronze"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-[0.8rem] font-light italic leading-relaxed text-apoyo">
                {NOTA}
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── Cierre — el recuadro que la página del brochure pone abajo ── */}
        <Reveal delay={200} variant="fade-up">
          <blockquote className="mt-16 max-w-3xl border border-white/15 px-8 py-8 sm:px-10 sm:py-10">
            <p className="font-serif text-xl font-light italic leading-relaxed text-champagne sm:text-2xl">
              {CIERRE}
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
