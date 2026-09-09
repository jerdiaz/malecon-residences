"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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

// ── Tabs del panel derecho ─────────────────────────────────────────────────
const TABS = ["Foto", "Mapa", "Conexiones"] as const;
type Tab = typeof TABS[number];

// Mapa de conexiones — página 8 del brochure. El cliente lo pasó como
// captura de WhatsApp (no como archivo), así que esto es esa misma imagen,
// recortada a solo el panel del mapa (el título, los párrafos y la lista de
// abajo ya son texto real en la columna izquierda de esta sección, incluirlos
// otra vez como imagen habría sido redundante) y reexportada a WebP.
const MAPA_CONEXIONES_SRC = "/images/lote/mapa-conexiones.webp";

// ── URL del iframe de Google Maps ──────────────────────────────────────────
// Para obtener la URL correcta:
//   1. Abre Google Maps y navega hasta el lote
//   2. Clic en "Compartir" → "Insertar un mapa"
//   3. Copia la URL que aparece dentro de src="..."
//   4. Pégala aquí reemplazando el valor de MAP_EMBED_URL
const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=10.4441,-75.5127&t=k&z=17&ie=UTF8&iwloc=&output=embed";
// ──────────────────────────────────────────────────────────────────────────

export default function LocationSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Foto");

  return (
    <section
      id="ubicacion"
      className="relative min-h-screen w-full bg-ink scroll-mt-20"
    >
      <div className="grid min-h-screen grid-cols-1 items-stretch lg:grid-cols-2">

        {/* ── Columna de texto ── */}
        <div className="flex flex-col justify-center px-8 py-28 lg:px-16 xl:px-24">
          <Reveal>
            <p className="mb-6 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/80">
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
            <p className="max-w-md text-sm font-light leading-relaxed tracking-wide text-white/60 sm:text-base">
              La ubicación de Malecón Business Center ofrece conexión directa
              con los principales centros financieros, turísticos, logísticos e
              industriales de Cartagena, convirtiéndolo en un punto estratégico
              para empresas y profesionales.
            </p>
          </Reveal>

          <Reveal delay={800} variant="fade-up">
            <p className="mt-4 max-w-md text-sm font-light leading-relaxed tracking-wide text-white/60 sm:text-base">
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
              <p className="mb-5 text-[0.7rem] font-light uppercase tracking-[0.3em] text-bronze/90">
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
                    <span className="text-[0.7rem] font-light uppercase leading-relaxed tracking-[0.12em] text-white/60">
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
              <p className="mb-4 text-[0.7rem] font-light uppercase tracking-[0.3em] text-bronze/90">
                Ubicación
              </p>
              <p className="font-serif text-xl font-light leading-snug text-champagne">
                Malecón Business Center
              </p>
              <p className="mt-2 text-sm font-light leading-relaxed tracking-wide text-white/55">
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

        {/* ── Columna derecha: foto aérea + mapa ── */}
        <div className="relative flex items-center justify-center lg:h-full lg:items-start">
          {/* En móvil la caja guarda la proporción de la imagen (3840×2160) y
              se ve completa. En escritorio se sangra de lado a lado como los
              StoryBlock: con la columna de texto en 1264px, una caja 16/9
              dejaba 364px de azul vacío arriba y abajo del panel.
              El alto se topa en una pantalla en vez de seguir a la columna: al
              llenar los 1376px que mide la sección a 1024px solo quedaba
              visible el 21% del ancho de la foto —una tira de casas sin
              lectura—. Topado, el recorte va del 32% al 50%. Pegajoso además,
              como el panel de Plantas, la foto acompaña la lectura de la lista.
              El recorte es horizontal y centrado, así que el marcador —que va
              al 50% del ancho— sigue cayendo donde caía. */}
          <div className="relative aspect-[16/9] w-full overflow-hidden lg:aspect-auto lg:sticky lg:top-0 lg:h-screen">

          {/* Tabs — en escritorio bajan bajo el navbar: con el panel fijo
              arriba, a top-6 quedaban detrás de la barra (121px). */}
          <div className="absolute left-6 top-6 z-20 flex gap-1 lg:top-36">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-[0.6rem] font-light uppercase tracking-[0.25em] transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-bronze/90 text-ink"
                    : "bg-ink/60 text-white/60 backdrop-blur-sm hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Panel: Foto aérea real del terreno */}
          <AnimatePresence mode="wait">
            {activeTab === "Foto" && (
              <motion.div
                key="foto"
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/lote/terreno-aereo.jpg"
                  alt="Vista aérea del terreno — Zona Norte, Cartagena de Indias"
                  fill
                  // 165vh, no 50vw: ver la nota de `sizes` en BackgroundImage.
                  sizes="(max-width: 1024px) 100vw, 165vh"
                  className="object-cover object-center"
                  priority
                />
                {/* Velo inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

                {/* Marcador de ubicación */}
                <motion.div
                  className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="absolute -inset-4 animate-ping rounded-full bg-bronze/25" />
                  <span className="absolute -inset-2 rounded-full bg-bronze/35" />
                  <span className="relative block h-3 w-3 rounded-full bg-bronze shadow-[0_0_16px_rgba(176,141,87,0.9)]" />
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm bg-ink/80 px-3 py-1.5 text-[0.6rem] font-light uppercase tracking-[0.25em] text-champagne backdrop-blur-sm">
                    Malecón Business Center
                  </span>
                </motion.div>

                {/* Badge pie de foto */}
                <div className="absolute bottom-6 left-6">
                  <p className="text-[0.6rem] font-light uppercase tracking-[0.3em] text-white/50">
                    Foto aérea · Zona Norte · Cartagena de Indias
                  </p>
                </div>
              </motion.div>
            )}

            {/* Panel: Mapa embebido */}
            {activeTab === "Mapa" && (
              <motion.div
                key="mapa"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <iframe
                  src={MAP_EMBED_URL}
                  title="Ubicación Malecón Business Center"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Overlay con branding encima del mapa */}
                <div className="pointer-events-none absolute bottom-6 left-6">
                  <span className="rounded-sm bg-ink/80 px-3 py-1.5 text-[0.6rem] font-light uppercase tracking-[0.25em] text-champagne backdrop-blur-sm">
                    Malecón Business Center · Zona Norte
                  </span>
                </div>
              </motion.div>
            )}

            {/* Panel: mapa de conexiones (página 8 del brochure) — es una
                infografía, no una foto: los pines y la leyenda no pueden
                recortarse, así que va con object-contain sobre un fondo claro
                en vez de object-cover a sangre como en el panel de Foto. */}
            {activeTab === "Conexiones" && (
              <motion.div
                key="conexiones"
                className="absolute inset-0 bg-[#f5f2ec]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={MAPA_CONEXIONES_SRC}
                  alt="Mapa de conectividad de Malecón Business Center con la zona hotelera, zonas francas, centros comerciales, centros de convención y zonas residenciales cercanas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
