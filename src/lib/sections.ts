/** Identificadores de sección compartidos entre la navegación y la página. */
export interface SectionLink {
  id: string;
  label: string;
  /** Si debe ocultarse en los enlaces de texto del navbar superior. */
  hideInNav?: boolean;
}

export const SECTIONS: SectionLink[] = [
  { id: "hero", label: "Inicio", hideInNav: true },
  { id: "manifesto", label: "Filosofía" },
  { id: "stats", label: "Cifras", hideInNav: true },
  { id: "amenities", label: "Amenidades" },
  { id: "explorer", label: "Residencias" },
  { id: "contact", label: "Contacto" },
];

/** Solo los enlaces que se muestran como texto en el navbar. */
export const NAV_LINKS: SectionLink[] = SECTIONS.filter((s) => !s.hideInNav);

/** Todos los ids de sección, en orden (referencia estable para observers). */
export const SECTION_IDS: string[] = SECTIONS.map((s) => s.id);

/** Identificador del contenedor con scroll-snap (definido en page.tsx). */
export const SCROLL_SHELL_ID = "scroll-shell";

/** Desplazamiento suave hacia una sección dentro del contenedor con snap. */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
