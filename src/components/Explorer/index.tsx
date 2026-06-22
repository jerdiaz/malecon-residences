"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { apartments, floors, unitsByFloor } from "@/data/apartments";
import { scrollToSection } from "@/lib/sections";
import Reveal from "@/components/ui/Reveal";
import type { Apartment } from "@/types";

export default function Explorer() {
  const [activeId, setActiveId] = useState<string>(apartments[0].id);
  const active: Apartment = apartments.find((a) => a.id === activeId) ?? apartments[0];

  return (
    <section
      id="explorer"
      className="relative min-h-screen w-full overflow-hidden bg-ink scroll-mt-20"
    >
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-10 px-6 pb-10 pt-28 md:grid-cols-[1.15fr_1fr] md:gap-16 md:px-12">
        {/* ── Columna izquierda · Fachada abstracta ── */}
        <div className="flex min-h-0 flex-col">
          <Reveal>
            <p className="mb-2 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/90">
              Las residencias
            </p>
            <h2 className="mb-6 font-serif text-3xl font-extralight tracking-tight text-white sm:text-4xl">
              Diez unidades.{" "}
              <span className="text-champagne">Una fachada.</span>
            </h2>
          </Reveal>

          <div className="flex min-h-0 flex-1 flex-col justify-stretch gap-2">
            {floors.map((floor, floorIndex) => (
              <motion.div
                key={floor}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.05 }}
                transition={{ duration: 0.7, delay: floorIndex * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-1 items-stretch gap-3"
              >
                <div className="flex w-10 shrink-0 items-center justify-end">
                  <span className="font-serif text-sm font-light tabular-nums text-white/30">
                    {floor.toString().padStart(2, "0")}
                  </span>
                </div>

                <div className="grid flex-1 grid-cols-2 gap-3">
                  {unitsByFloor(floor).map((unit, unitIndex) => {
                    const isActive = unit.id === active.id;
                    const reserved = unit.status === "reservado";
                    return (
                      <motion.button
                        key={unit.id}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.05 }}
                        transition={{
                          duration: 0.55,
                          delay: floorIndex * 0.09 + unitIndex * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        onMouseEnter={() => setActiveId(unit.id)}
                        onFocus={() => setActiveId(unit.id)}
                        aria-pressed={isActive}
                        className={`group relative flex items-center justify-center overflow-hidden border transition-all duration-500 ease-silk ${
                          isActive ? "border-bronze bg-bronze/10" : "border-white/10 hover:border-white/30"
                        } ${reserved ? "opacity-45" : ""}`}
                      >
                        <span className="pointer-events-none absolute inset-0 flex justify-around opacity-40">
                          <span className="w-px bg-white/15" />
                          <span className="w-px bg-white/15" />
                          <span className="w-px bg-white/15" />
                        </span>
                        <span
                          className={`relative z-10 font-serif text-xs font-light tabular-nums tracking-wider transition-colors ${
                            isActive ? "text-champagne" : "text-white/40"
                          }`}
                        >
                          {unit.unitNumber}
                        </span>
                        {reserved && (
                          <span className="absolute right-1 top-1 z-10 text-[0.5rem] font-light uppercase tracking-widest text-white/40">
                            Reservado
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ))}

            <motion.div
              className="mt-1 h-px w-full bg-gradient-to-r from-bronze/40 via-white/10 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="mt-5 flex items-center gap-6 pl-[3.25rem] text-[0.6rem] font-light uppercase tracking-[0.25em] text-white/40">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.55)]" />
              Disponible
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white/25" />
              Reservado
            </span>
          </div>
        </div>

        {/* ── Columna derecha · Ficha técnica ── */}
        <div className="flex min-h-0 flex-col justify-center border-t border-white/5 pt-8 md:border-l md:border-t-0 md:pl-16 md:pt-0">
          <AnimatedCard active={active} />
        </div>
      </div>
    </section>
  );
}

function AnimatedCard({ active }: { active: Apartment }) {
  return (
    <motion.div
      key={active.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-6 flex items-center justify-between">
        <p className="text-[0.65rem] font-light uppercase tracking-[0.4em] text-bronze/90">
          {active.tier}
        </p>
        <StatusBadge status={active.status} />
      </div>

      <div className="flex items-end gap-4">
        <h3 className="font-serif text-6xl font-extralight leading-none text-white sm:text-7xl">
          {active.unitNumber}
        </h3>
        <span className="mb-2 text-sm font-light uppercase tracking-[0.2em] text-white/40">
          Piso {active.floor}
        </span>
      </div>

      <p className="mt-4 font-serif text-lg font-light italic text-champagne">
        Vista {active.view}
      </p>

      <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10">
        <Spec label="Área" value={`${active.areaM2}`} unit="m²" />
        <Spec label="Habitaciones" value={`${active.bedrooms}`} />
        <Spec label="Baños" value={`${active.bathrooms}`} />
      </dl>

      <button
        onClick={() => scrollToSection("contact")}
        disabled={active.status === "reservado"}
        className="group relative mt-10 flex w-full items-center justify-between overflow-hidden border border-white/15 px-7 py-5 text-left transition-colors duration-500 ease-silk hover:border-bronze disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/15"
      >
        {active.status !== "reservado" && (
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-bronze/10 transition-transform duration-700 ease-silk group-hover:translate-x-0"
          />
        )}
        <span className="relative z-10 text-[0.7rem] font-light uppercase tracking-[0.25em] text-white/90 group-hover:text-champagne">
          {active.status === "reservado" ? "Unidad reservada" : "Solicitar Dossier Privado"}
        </span>
        <span className="relative z-10 text-bronze transition-transform duration-500 ease-silk group-hover:translate-x-1">
          →
        </span>
      </button>

      <p className="mt-4 text-[0.65rem] font-light leading-relaxed tracking-wide text-white/35">
        Pasa el cursor sobre la fachada para explorar cada residencia.
      </p>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: Apartment["status"] }) {
  const available = status === "disponible";
  return (
    <span
      className={`flex items-center gap-2 text-[0.6rem] font-light uppercase tracking-[0.25em] ${
        available ? "text-amber-400/90" : "text-white/40"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          available ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.55)]" : "bg-white/30"
        }`}
      />
      {status}
    </span>
  );
}

function Spec({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="flex flex-col gap-2 bg-ink px-4 py-6">
      <span className="text-[0.55rem] font-light uppercase tracking-[0.2em] text-white/40">
        {label}
      </span>
      <span className="font-serif text-3xl font-extralight text-white">
        {value}
        {unit && <span className="ml-1 text-sm text-white/40">{unit}</span>}
      </span>
    </div>
  );
}
