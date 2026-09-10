"use client";

import Reveal from "@/components/ui/Reveal";

// ─────────────────────────────────────────────────────────────────────────────
// UBICACIÓN — la página 8 del brochure ("Conectividad que impulsa los
// negocios"), servida tal cual. Mismo tratamiento que Amenidades.tsx: la
// imagen real del cliente, no una recreación en Tailwind ni un mapa
// hecho a mano. Reemplaza a `LocationSection.tsx`, que queda en el repo sin
// usarse — ver la nota junto a su import en page.tsx.
//
// El cliente pasó esta página como captura de WhatsApp, no como archivo de
// diseño (a diferencia de la página 7, que sí llegó en SVG). El archivo real
// detrás de esa captura se encontró en
// ~/Downloads/WhatsApp Image 2026-09-09 at 13.23.03.jpeg (1600×900) y es la
// imagen que se usa aquí, reexportada a WebP calidad 92 — no una recreación.
//
// Antes de esto se probaron dos caminos que quedan en el repo sin usarse,
// por si hace falta volver a alguno:
//   · src/components/MapaConectividad.tsx + /preview-conectividad — un mapa
//     hecho a mano con SVG, sin archivo fuente disponible en ese momento.
//   · LocationSection.tsx — Foto / Mapa / Conexiones en tabs, con esta misma
//     imagen recortada solo al mapa y el resto del contenido como texto real.
// ─────────────────────────────────────────────────────────────────────────────

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="relative w-full scroll-mt-20 bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <p className="text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze">
            Ubicación
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ubicacion/pagina-8.webp"
              alt="Conectividad que impulsa los negocios: mapa con las distancias de Malecón Business Center a la zona hotelera, zonas francas, centros comerciales, centros de convención y zonas residenciales de Cartagena"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
