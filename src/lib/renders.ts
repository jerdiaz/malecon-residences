export type RenderCategory = "exteriores" | "interiores" | "plantas";

export interface RenderItem {
  slug: string;
  src: string;
  label: string;
  category: RenderCategory;
}

export const CATEGORY_LABELS: Record<RenderCategory, string> = {
  exteriores: "Exteriores",
  interiores: "Interiores",
  plantas: "Plantas",
};

// Set completo de renders oficiales entregados por los arquitectos.
// El orden manda: define la secuencia del carrusel del home y de la grilla
// de /galeria. Al agregar una imagen basta con sumarla aquí — el carrusel
// arma los slides solo y /galeria genera su página de detalle.
export const RENDERS: RenderItem[] = [
  // ── Exteriores ────────────────────────────────────────────────────────────
  { slug: "fachada-principal",    src: "/images/renders/fachada-avenida.webp",         label: "Fachada principal",        category: "exteriores" },
  { slug: "frente-al-mar",        src: "/images/renders/frente-al-mar.webp",           label: "Frente al mar",            category: "exteriores" },
  { slug: "acceso-principal",     src: "/images/renders/acceso-principal.webp",        label: "Acceso principal",         category: "exteriores" },
  { slug: "plaza-de-acceso",      src: "/images/renders/plaza-acceso.webp",            label: "Plaza de acceso",          category: "exteriores" },
  { slug: "acceso-vehicular",     src: "/images/renders/acceso-vehicular.webp",        label: "Acceso vehicular",         category: "exteriores" },
  { slug: "acceso-peatonal",      src: "/images/renders/acceso-peatonal.webp",         label: "Acceso peatonal",          category: "exteriores" },
  { slug: "detalle-de-fachada",   src: "/images/renders/detalle-fachada.webp",         label: "Detalle de fachada",       category: "exteriores" },
  { slug: "fachada-frontal",      src: "/images/renders/fachada-frontal.webp",         label: "Fachada frontal",          category: "exteriores" },
  { slug: "fachada-nocturna",     src: "/images/renders/fachada-nocturna.webp",        label: "Fachada nocturna",         category: "exteriores" },
  { slug: "fachada-en-modulos",   src: "/images/renders/fachada-modulos.webp",         label: "Fachada en módulos",       category: "exteriores" },
  { slug: "esquina",              src: "/images/renders/esquina-fachada.webp",         label: "La esquina",               category: "exteriores" },
  { slug: "frontal-entre-palmeras", src: "/images/renders/frontal-palmeras.webp",      label: "Frontal entre palmeras",   category: "exteriores" },
  { slug: "locales-comerciales",  src: "/images/renders/locales-comerciales.webp",     label: "Locales comerciales",      category: "exteriores" },
  { slug: "oficinas-desde-la-calle", src: "/images/renders/oficinas-vidrio.webp",      label: "Oficinas desde la calle",  category: "exteriores" },
  { slug: "zona-de-estar",        src: "/images/renders/zona-estar.webp",              label: "Zona de estar",            category: "exteriores" },
  { slug: "plaza-al-atardecer",   src: "/images/renders/plaza-atardecer.webp",         label: "Plaza al atardecer",       category: "exteriores" },
  { slug: "atardecer",            src: "/images/renders/atardecer-mar.webp",           label: "Atardecer sobre el Caribe", category: "exteriores" },
  { slug: "vista-al-caribe",      src: "/images/renders/vista-caribe.webp",            label: "Vista al Caribe",          category: "exteriores" },
  { slug: "el-malecon",           src: "/images/renders/malecon-playa.webp",           label: "El malecón",               category: "exteriores" },
  { slug: "panoramica-zona-norte", src: "/images/renders/panoramica-zona-norte.webp",  label: "Panorámica de la Zona Norte", category: "exteriores" },
  { slug: "vista-aerea",          src: "/images/renders/aerea-atardecer.webp",         label: "Vista aérea",              category: "exteriores" },
  { slug: "vista-aerea-diurna",   src: "/images/renders/aerea-diurna.webp",            label: "Vista aérea diurna",       category: "exteriores" },
  { slug: "vista-aerea-nocturna", src: "/images/renders/aerea-nocturna-rooftop.webp",  label: "Vista aérea nocturna",     category: "exteriores" },

  // ── Interiores ────────────────────────────────────────────────────────────
  { slug: "oficinas",             src: "/images/renders/oficina-interior.webp",        label: "Oficinas",                 category: "interiores" },
  { slug: "lounge-de-trabajo",    src: "/images/renders/coworking-lounge.webp",        label: "Lounge de trabajo",        category: "interiores" },
  { slug: "rooftop",              src: "/images/renders/rooftop-pergola.webp",         label: "Rooftop",                  category: "interiores" },
  { slug: "terraza-del-rooftop",  src: "/images/renders/rooftop-terraza.webp",         label: "Terraza del rooftop",      category: "interiores" },
  { slug: "mirador-del-rooftop",  src: "/images/renders/rooftop-mirador.webp",         label: "Mirador del rooftop",      category: "interiores" },

  // ── Plantas ───────────────────────────────────────────────────────────────
  { slug: "planta-del-rooftop",   src: "/images/renders/planta-rooftop.webp",          label: "Planta del rooftop",       category: "plantas" },
  { slug: "planta-de-oficinas",   src: "/images/renders/planta-oficinas.webp",         label: "Planta de oficinas",       category: "plantas" },
  { slug: "planta-diafana",       src: "/images/renders/planta-diafana.webp",          label: "Planta diáfana",           category: "plantas" },
];

/** Los que rotan en el carrusel del home: las fotos, sin los planos. */
export const CAROUSEL_RENDERS = RENDERS.filter((r) => r.category !== "plantas");

export function getRenderBySlug(slug: string): RenderItem | undefined {
  return RENDERS.find((r) => r.slug === slug);
}

/** Render anterior y siguiente (circular) para navegar en la vista de detalle. */
export function getAdjacentRenders(
  slug: string,
): { prev: RenderItem; next: RenderItem; index: number; total: number } | undefined {
  const index = RENDERS.findIndex((r) => r.slug === slug);
  if (index === -1) return undefined;
  const total = RENDERS.length;
  return {
    prev: RENDERS[(index - 1 + total) % total],
    next: RENDERS[(index + 1) % total],
    index,
    total,
  };
}

export function getRendersByCategory(category: RenderCategory): RenderItem[] {
  return RENDERS.filter((r) => r.category === category);
}

/** Parte una lista en grupos de `size` (el último puede quedar incompleto). */
export function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}
