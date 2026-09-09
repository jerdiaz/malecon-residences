"use client";

import Reveal from "@/components/ui/Reveal";

// ─────────────────────────────────────────────────────────────────────────────
// AMENIDADES — la página 7 del brochure ("Portafolio MBC - Pág 7.svg", entrega
// del cliente del 9 de septiembre), servida tal cual: es el archivo real, con
// su propio texto, íconos y layout, no una recreación en Tailwind. Reemplaza
// a `Amenities.tsx`, que queda en el repo sin usarse — ver la nota junto a su
// import en page.tsx.
//
// El SVG del cliente trae una foto de fondo ("Escena 6.jpg") por un enlace
// relativo a una carpeta suya que no existe en este proyecto. Se encontró el
// archivo real, se convirtió a WebP a 2400px (mismo estándar que ya usan los
// SVG de Plantas en /public/images/plantas/) y se incrustó como base64 dentro
// de la copia que vive en /public/images/amenidades/pagina-7.svg — es la
// única edición hecha sobre el archivo del cliente; todo el resto (texto,
// íconos, layout) es exactamente el suyo.
//
// Igual que los planos vectoriales de Plantas: se sirve con <img>, no con
// next/image, para no perder el vector ni el texto interno.
// ─────────────────────────────────────────────────────────────────────────────

export default function Amenidades() {
  return (
    <section id="amenities" className="relative w-full scroll-mt-20 bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <p className="text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/90">
            Amenidades
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/amenidades/pagina-7.svg"
              alt="Amenidades de Malecón Business Center: tecnología, servicios, movilidad, sostenibilidad y bienestar corporativo"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
