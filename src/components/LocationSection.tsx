"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SplitWords from "@/components/ui/SplitWords";

const DISTANCES = [
  { place: "Aeropuerto Internacional Rafael Núñez", time: "8 min",  km: "5.2 km" },
  { place: "Centro Histórico · Ciudad Amurallada",  time: "12 min", km: "7.8 km" },
  { place: "Bocagrande · Zona Comercial",           time: "6 min",  km: "3.5 km" },
  { place: "La Boquilla · Playa Natural",           time: "4 min",  km: "2.1 km" },
];

// ── Tabs del panel derecho ─────────────────────────────────────────────────
const TABS = ["Foto", "Mapa"] as const;
type Tab = typeof TABS[number];

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
              text="En el corazón de la Zona Norte."
              delay={100}
              stagger={42}
            />
          </h2>

          <Reveal delay={600} variant="fade-up">
            <p className="max-w-md text-sm font-light leading-relaxed tracking-wide text-white/60 sm:text-base">
              La franja costera más exclusiva de Cartagena de Indias. Directamente
              sobre el Mar Caribe, entre la brisa constante y el paisaje sin igual
              de la ciudad amurallada al horizonte.
            </p>
          </Reveal>

          {/* Tabla de distancias */}
          <Reveal delay={1000}>
            <div className="mt-10">
              <p className="mb-5 text-[0.6rem] font-light uppercase tracking-[0.3em] text-white/35">
                Distancias clave
              </p>
              <div className="space-y-0">
                {DISTANCES.map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{
                      delay: 1.1 + i * 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-center justify-between border-b border-white/[0.07] py-3 last:border-b-0"
                  >
                    <span className="text-[0.75rem] font-light tracking-wide text-white/60">
                      {d.place}
                    </span>
                    <div className="ml-4 flex shrink-0 items-center gap-4">
                      <span className="font-serif text-sm font-light text-champagne">
                        {d.time}
                      </span>
                      <span className="text-[0.65rem] font-light text-white/30">
                        {d.km}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Columna derecha: foto aérea + mapa ── */}
        <div className="relative flex flex-col min-h-[60vw] lg:min-h-0">

          {/* Tabs */}
          <div className="absolute top-6 left-6 z-20 flex gap-1">
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
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
