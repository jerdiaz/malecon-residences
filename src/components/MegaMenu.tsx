"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/lib/sections";

const MENU_LINKS = [
  { id: "residencias", label: "El Proyecto",  number: "01" },
  { id: "galeria",     label: "Galería",      number: "02" },
  { id: "ubicacion",   label: "Ubicación",    number: "03" },
  { id: "amenities",   label: "Amenidades",   number: "04" },
  { id: "contact",     label: "Contacto",     number: "05" },
];

const INFO_ITEMS = [
  { label: "Dirección",  value: "Zona Norte, Cartagena de Indias" },
  { label: "Teléfono",   value: "+57 305 000 0000" },
  { label: "Email",      value: "info@maleconbc.com" },
  { label: "Entrega",    value: "2026 · Espacios exclusivos" },
];

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MegaMenu({ open, onClose }: MegaMenuProps) {
  // Bloquea el scroll de la página mientras el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNavigate = (id: string) => {
    onClose();
    // Pequeño delay para que la animación de cierre se vea antes de saltar
    setTimeout(() => scrollToSection(id), 350);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-ink"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ── Navbar dentro del menú ── */}
          <div className="flex shrink-0 items-center justify-between px-6 py-5 md:px-12">
            <button
              onClick={() => handleNavigate("hero")}
              className="flex flex-col items-start leading-none"
            >
              <span className="font-serif text-xl font-light tracking-[0.3em] text-white">
                MALECÓN
              </span>
              <span className="mt-1 text-[0.6rem] font-light uppercase tracking-[0.45em] text-bronze/80">
                Business Center
              </span>
            </button>

            <button
              onClick={onClose}
              className="group flex items-center gap-3 text-[0.65rem] font-light uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-white"
            >
              Cerrar
              <span className="relative flex h-8 w-8 items-center justify-center">
                <span className="absolute h-px w-5 rotate-45 bg-current transition-all duration-300" />
                <span className="absolute h-px w-5 -rotate-45 bg-current transition-all duration-300" />
              </span>
            </button>
          </div>

          {/* ── Divisor ── */}
          <motion.div
            className="mx-6 h-px shrink-0 bg-white/10 md:mx-12"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* ── Cuerpo ── */}
          <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[1fr_420px]">
            {/* Columna izquierda · Links grandes */}
            <nav className="flex flex-col justify-center px-6 py-10 md:px-12">
              {MENU_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => handleNavigate(link.id)}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.07,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex items-baseline gap-5 border-b border-white/[0.06] py-4 text-left transition-colors duration-300 hover:border-bronze/30 md:py-5"
                >
                  <span className="w-8 shrink-0 font-serif text-xs font-light tabular-nums text-bronze/50 transition-colors group-hover:text-bronze">
                    {link.number}
                  </span>
                  <span className="font-serif text-4xl font-extralight tracking-tight text-white transition-colors group-hover:text-champagne sm:text-5xl lg:text-[3.5rem]">
                    {link.label}
                  </span>
                  <span className="ml-auto translate-x-0 text-lg text-white/20 transition-all duration-400 group-hover:translate-x-2 group-hover:text-bronze">
                    →
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Columna derecha · Imagen + datos */}
            <div className="hidden lg:flex flex-col">
              {/* Imagen del proyecto */}
              <motion.div
                className="relative flex-1 overflow-hidden"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/renders/render-04.png')",
                  }}
                />
                <div className="absolute inset-0 bg-ink/30" />

                {/* Badge encima de la imagen */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-serif text-lg font-extralight italic text-white/90">
                    "Vivir entre el mar y el silencio."
                  </p>
                </div>
              </motion.div>

              {/* Info del proyecto */}
              <motion.div
                className="shrink-0 border-t border-white/10 px-8 py-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <dl className="space-y-3">
                  {INFO_ITEMS.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <dt className="w-20 shrink-0 text-[0.6rem] font-light uppercase tracking-[0.2em] text-white/35">
                        {item.label}
                      </dt>
                      <dd className="text-[0.75rem] font-light tracking-wide text-white/75">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </div>
          </div>

          {/* ── Footer del menú ── */}
          <motion.div
            className="shrink-0 border-t border-white/10 px-6 py-5 md:px-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex flex-col gap-2 text-[0.6rem] font-light uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:justify-between">
              <span>Zona Norte · Cartagena de Indias · Colombia</span>
              <span>© {new Date().getFullYear()} Malecón Business Center — Todos los derechos reservados</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
