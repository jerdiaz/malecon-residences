"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SplitWords from "@/components/ui/SplitWords";
import { CONTACT } from "@/lib/contact";

// Reemplazan a la grilla de "Distancias clave", que anunciaba minutos y
// kilómetros que nadie había verificado. Esta lista la entregó el cliente y
// no trae tiempos: se listan los destinos, sin inventar la distancia.
//
// Actualizada contra "Conectividad que impulsa los negocios" (página 8 del
// brochure, la misma que ilustra el tab Conexiones): esa versión nombra los
// centros comerciales y separa Zona Portuaria de Zonas Francas, esta lista
// los tenía agrupados.
const CONEXIONES = [
  "Aeropuerto Internacional Rafael Núñez",
  "Centro Histórico",
  "Zona Norte con conexión a Barranquilla",
  "Zona Portuaria",
  "Zonas Francas",
  "Zona Hotelera",
  "Centros de Convenciones: Cartagena de Indias y Las Américas",
  "Centros Comerciales: La Serrezuela, Mall Plaza, Plaza Bocagrande, Nao",
  "Clínica Serena del Mar y Centro Comercial Las Ramblas",
];

// Mapa de conexiones — página 8 del brochure. Primero solo había una captura
// de WhatsApp del cliente (de ahí salió un recorte en WebP); después llegó el
// SVG real ("Portafolio MBC - Pág 8 Mapa.svg") y este es ese archivo, recortado
// a solo el panel del mapa cambiando el viewBox (sin tocar el contenido, así
// no se pierde nada) — el título, los párrafos y la lista de abajo ya son
// texto real en la columna izquierda, incluirlos otra vez habría sido
// redundante. Se le quitaron dos imágenes incrustadas que no se veían en la
// página (11MB → 354KB): una con una ruta rota a un archivo del cliente que
// no existe aquí, y otra que su propio clipPath dejaba fuera del área
// visible.
//
// El "terreno" del mapa es transparente a propósito en el diseño original
// (se apoya en el fondo blanco de la página completa) — sin un fondo claro
// detrás, las etiquetas de los pines quedan ilegibles. Por eso el panel de
// abajo lo pone sobre bg-white, no sobre el azul de marca del sitio.
const MAPA_CONEXIONES_SRC = "/images/ubicacion/mapa-conexiones.svg";

export default function LocationSection() {
  return (
    <section
      id="ubicacion"
      className="relative min-h-screen w-full bg-ink scroll-mt-20"
    >
      <div className="grid min-h-screen grid-cols-1 items-stretch lg:grid-cols-2">

        {/* ── Columna de texto ── */}
        <div className="flex flex-col justify-center px-8 py-28 lg:px-16 xl:px-24">
          <Reveal>
            <p className="mb-6 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze">
              La ubicación
            </p>
          </Reveal>

          <h2 className="mb-8 font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            <SplitWords
              text="¿Por qué elegir un centro de negocios en Cartagena?"
              delay={100}
              stagger={42}
            />
          </h2>

          <Reveal delay={600} variant="fade-up">
            <p className="max-w-md text-sm font-normal leading-relaxed text-cuerpo sm:text-base">
              La ubicación de Malecón Business Center ofrece conexión directa
              con los principales centros financieros, turísticos, logísticos e
              industriales de Cartagena, convirtiéndolo en un punto estratégico
              para empresas y profesionales.
            </p>
          </Reveal>

          <Reveal delay={800} variant="fade-up">
            <p className="mt-4 max-w-md text-sm font-normal leading-relaxed text-cuerpo sm:text-base">
              Ubicado frente al mar, sobre la Avenida Santander, el proyecto
              combina conectividad, visibilidad y acceso a las principales zonas
              de la ciudad, fortaleciendo el posicionamiento de las empresas que
              eligen establecerse en Malecón Business Center Cartagena.
            </p>
          </Reveal>

          {/* Conexiones estratégicas — lista de filas con filete, el mismo
              idioma que usan Plantas y la galería. Se probó a dos columnas y
              a 1024px cada celda quedaba de 168px: cuatro y cinco renglones
              por destino, con filas de alturas dispares. El filete de cierre
              va en el contenedor: cada fila solo lleva el de arriba. */}
          <Reveal delay={1000}>
            <div className="mt-10 max-w-lg">
              <p className="mb-5 text-[0.7rem] font-light uppercase tracking-[0.3em] text-bronze">
                Conexiones estratégicas
              </p>
              <div className="border-b border-white/10">
                {CONEXIONES.map((lugar, i) => (
                  <motion.div
                    key={lugar}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      delay: 1.1 + i * 0.07,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-baseline gap-4 border-t border-white/10 py-2.5"
                  >
                    <span className="font-serif text-[0.7rem] tabular-nums text-bronze/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.7rem] font-normal uppercase leading-relaxed tracking-[0.12em] text-cuerpo">
                      {lugar}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Dirección del proyecto + Google Maps */}
          <Reveal delay={1200}>
            <div className="mt-10">
              <p className="mb-4 text-[0.7rem] font-light uppercase tracking-[0.3em] text-bronze">
                Ubicación
              </p>
              <p className="font-serif text-xl font-light leading-snug text-champagne">
                Malecón Business Center
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed tracking-wide text-apoyo">
                {CONTACT.projectStreet}
                <br />
                {CONTACT.projectCity}
              </p>
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-4 border border-white/20 px-8 py-4 text-[0.7rem] font-light uppercase tracking-[0.25em] text-white/80 transition-all duration-500 ease-silk hover:border-bronze hover:text-champagne"
              >
                Ver en Google Maps
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── Columna derecha: mapa de conexiones (página 8 del brochure) ──
            Antes había tabs (Foto aérea / Google Maps / Conexiones); el
            cliente pidió dejar solo el diseño de Conexiones. El iframe de
            Google Maps ya no se usa en ningún lado. La foto aérea
            (public/images/lote/terreno-aereo.jpg) queda sin referenciar en
            el código — el archivo sigue en public/ por si se necesita
            recuperar este panel.
            Mismo criterio de tamaño que tenían los otros paneles: en móvil
            aspect-[16/9], en escritorio se sangra de lado a lado y queda
            pegajoso (sticky) para acompañar la lectura de la lista. Es una
            infografía vectorial, no una foto: los pines y la leyenda no
            pueden recortarse (object-contain, no object-cover), y va sobre
            bg-white porque el "terreno" del mapa es transparente en el
            diseño original — ver la nota junto a MAPA_CONEXIONES_SRC. Se
            sirve con <img>, no con next/image: es un SVG y next/image no
            lo optimiza, con fill perdería el vector. */}
        <Reveal delay={200}>
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-white lg:aspect-auto lg:sticky lg:top-0 lg:h-screen">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MAPA_CONEXIONES_SRC}
                alt="Mapa de conectividad de Malecón Business Center con la zona hotelera, zonas francas, centros comerciales, centros de convención y zonas residenciales cercanas"
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
