"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, scrollToSection } from "@/lib/sections";
import { CONTACT } from "@/lib/contact";
import Logo from "@/components/Logo";

// Las entradas salen de NAV_LINKS, la misma lista de la que se dibuja la barra
// de escritorio. Estaban escritas a mano aquí y se habían desfasado: la barra
// tenía seis y este menú cinco, así que en un teléfono —donde este menú ES la
// única navegación, porque la barra horizontal no se muestra— la sección de
// Plantas no existía. Es justo la que lleva el plano del edificio.
//
// De paso los números se calculan solos. Antes, insertar una entrada obligaba
// a renumerar a mano las de abajo, que es la otra forma de que esto se
// desfase. Añadir o quitar una sección en lib/sections.ts ahora basta.
const MENU_LINKS = NAV_LINKS.map((seccion, i) => ({
  ...seccion,
  number: String(i + 1).padStart(2, "0"),
}));

const INFO_ITEMS = [
  { label: "Dirección",  value: CONTACT.projectAddress },
  {
    label: CONTACT.phones.length > 1 ? "Teléfonos" : "Teléfono",
    // Caben las dos en un renglón a 0.75rem; el separador es el mismo
    // punto medio que usa el resto del sitio.
    value: CONTACT.phones.map((t) => t.display).join("  ·  "),
  },
  { label: "Email",      value: CONTACT.email },
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
          {/* ── Navbar dentro del menú ──
              El logo lleva tamaño explícito en vez del `h-12` por defecto de
              Logo.tsx. A esa altura el lockup horizontal mide 218px de ancho:
              en una pantalla de 375 terminaba en x=244 y la palabra "Cerrar"
              empezaba en x=244 también —cero de hueco—, así que se leía
              "MALECÓNCERRAR" de corrido. Medido a 375 y a 360.

              `h-9 md:h-10` es el mismo tamaño que usa la barra en su estado
              compacto, que es sobre la que se abre este menú: además de
              resolver el choque, el logo ya no salta al abrir. */}
          <div className="flex shrink-0 items-center justify-between px-6 py-5 md:px-12">
            <button
              onClick={() => handleNavigate("hero")}
              className="flex flex-col items-start leading-none"
            >
              <Logo className="h-9 md:h-10" />
            </button>

            <button
              onClick={onClose}
              // Con la palabra escondida el botón se queda sin nombre
              // accesible en móvil, porque `display:none` lo saca del árbol.
              // El rótulo lo pone aquí, igual que en la barra.
              aria-label="Cerrar menú"
              className="group -m-2 flex items-center gap-3 p-2 text-[0.65rem] font-light uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-white"
            >
              {/* La palabra se esconde en pantallas estrechas, igual que hace
                  el botón "Menú" de la barra: la equis sola ya dice qué hace, y
                  son 68px que no hacen falta donde menos sobran. */}
              <span className="hidden sm:inline">Cerrar</span>
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
          {/* El cuerpo se desplaza en móvil. Con la sexta entrada el menú deja
              de caber en las pantallas cortas: a 375x667 el hueco son 481px y
              los enlaces piden 569, así que con el `overflow-hidden` de antes
              "Contacto" quedaba cortado por la mitad y no había forma de
              llegar a él. En escritorio el menú es de dos columnas y sigue
              sin desplazarse. */}
          <div className="grid flex-1 grid-cols-1 overflow-y-auto overscroll-contain lg:grid-cols-[1fr_420px] lg:overflow-hidden">
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
                    backgroundImage: "url('/images/renders/fachada-avenida.webp')",
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
              <span>Marbella · Cartagena de Indias · Colombia</span>
              <span>© {new Date().getFullYear()} Malecón Business Center — Todos los derechos reservados</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
