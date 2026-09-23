export interface SectionLink {
  id: string;
  label: string;
  hideInNav?: boolean;
}

export const SECTIONS: SectionLink[] = [
  { id: "hero",        label: "Inicio",      hideInNav: true },
  { id: "pillars",     label: "Pilares",     hideInNav: true },
  { id: "residencias", label: "El Proyecto"                },
  { id: "porque",      label: "Por qué",     hideInNav: true },
  { id: "galeria",     label: "Galería"                   },
  { id: "entorno",     label: "Entorno",     hideInNav: true },
  { id: "ubicacion",   label: "Ubicación"                 },
  { id: "amenities",   label: "Amenidades"                },
  // Oculta en el menú por ahora: el menú definitivo está por definirse con la
  // diseñadora, y sumarle una séptima entrada al navbar sin esa decisión es
  // justo lo que lo dejaba sin espacio. El id vive aquí igual para que
  // useActiveSection sepa marcarla al pasar.
  { id: "cifras",      label: "Cifras",      hideInNav: true },
  { id: "plantas",     label: "Plantas"                   },
  { id: "aliados",     label: "Aliados",     hideInNav: true },
  // { id: "marcas", label: "Marcas", hideInNav: true }, // sección oculta por ahora
  { id: "contact",     label: "Contacto"                  },
];

export const NAV_LINKS: SectionLink[] = SECTIONS.filter((s) => !s.hideInNav);
export const SECTION_IDS: string[] = SECTIONS.map((s) => s.id);

/** Desplazamiento suave hacia una sección, respetando la altura del navbar fijo. */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  const offset = 70;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
