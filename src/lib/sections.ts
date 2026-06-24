export interface SectionLink {
  id: string;
  label: string;
  hideInNav?: boolean;
}

export const SECTIONS: SectionLink[] = [
  { id: "hero",        label: "Inicio",      hideInNav: true },
  { id: "residencias", label: "El Proyecto"                },
  { id: "galeria",     label: "Galería"                   },
  { id: "entorno",     label: "Entorno",     hideInNav: true },
  { id: "ubicacion",   label: "Ubicación",   hideInNav: true },
  { id: "amenities",   label: "Amenidades"                },
  { id: "contact",     label: "Contacto"                  },
];

export const NAV_LINKS: SectionLink[] = SECTIONS.filter((s) => !s.hideInNav);
export const SECTION_IDS: string[] = SECTIONS.map((s) => s.id);

/** Desplazamiento suave hacia una sección, respetando la altura del navbar fijo. */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  const offset = 80;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
