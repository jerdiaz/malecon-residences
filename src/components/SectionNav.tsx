"use client";

import { SECTIONS, SECTION_IDS, scrollToSection } from "@/lib/sections";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * Navegación lateral por puntos (lado derecho). Indica la sección activa y
 * permite saltar a cualquier pantalla. Se oculta en viewports pequeños.
 */
export default function SectionNav() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav
      aria-label="Navegación por secciones"
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-5 md:flex lg:right-9"
    >
      {SECTIONS.map((section) => {
        const isActive = section.id === active;
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center gap-3"
            aria-label={section.label}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Etiqueta — aparece al pasar el cursor */}
            <span
              className={`text-[0.6rem] font-light uppercase tracking-[0.25em] transition-all duration-500 ease-silk ${
                isActive
                  ? "text-champagne opacity-100"
                  : "text-white/50 opacity-0 group-hover:opacity-100"
              }`}
            >
              {section.label}
            </span>

            {/* Indicador */}
            <span
              className={`block rounded-full transition-all duration-500 ease-silk ${
                isActive
                  ? "h-px w-6 bg-champagne"
                  : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
