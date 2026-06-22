"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SplitWords from "@/components/ui/SplitWords";

const DISTANCES = [
  { place: "Aeropuerto Internacional Rafael Núñez", time: "8 min",  km: "5.2 km" },
  { place: "Centro Histórico · Ciudad Amurallada",  time: "12 min", km: "7.8 km" },
  { place: "Bocagrande · Zona Comercial",           time: "6 min",  km: "3.5 km" },
  { place: "La Boquilla · Playa Natural",           time: "4 min",  km: "2.1 km" },
];

const HIGHLIGHTS = [
  { value: "0 m",  label: "al mar" },
  { value: "280",  label: "metros de playa" },
  { value: "12°C", label: "brisa permanente" },
];

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

          {/* Highlights */}
          <Reveal delay={800}>
            <div className="mt-12 grid grid-cols-3 gap-px overflow-hidden border border-white/10">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="flex flex-col gap-1 bg-ink/80 px-5 py-5">
                  <span className="font-serif text-2xl font-extralight text-champagne sm:text-3xl">
                    {h.value}
                  </span>
                  <span className="text-[0.6rem] font-light uppercase tracking-[0.2em] text-white/40">
                    {h.label}
                  </span>
                </div>
              ))}
            </div>
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

        {/* ── Columna de imagen aérea ── */}
        <motion.div
          className="relative min-h-[50vw] overflow-hidden lg:min-h-0"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Vista aérea de costa caribeña */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&q=80')",
            }}
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Velo inferior */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

          {/* Marcador de ubicación */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Anillo exterior pulsante */}
            <span className="absolute -inset-4 animate-ping rounded-full bg-bronze/20" />
            <span className="absolute -inset-2 rounded-full bg-bronze/30" />
            {/* Punto central */}
            <span className="relative block h-3 w-3 rounded-full bg-bronze shadow-[0_0_16px_rgba(176,141,87,0.9)]" />
            {/* Etiqueta */}
            <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm bg-ink/80 px-3 py-1.5 text-[0.6rem] font-light uppercase tracking-[0.25em] text-champagne backdrop-blur-sm">
              Malecón Residences
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
