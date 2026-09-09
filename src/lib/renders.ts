export type RenderCategory = "exteriores" | "interiores";

export interface RenderItem {
  slug: string;
  src: string;
  label: string;
  category: RenderCategory;
}

export const CATEGORY_LABELS: Record<RenderCategory, string> = {
  exteriores: "Exteriores",
  interiores: "Interiores",
};

// Set completo de renders oficiales entregados por los arquitectos.
// El orden manda: define la secuencia del carrusel del home y de la grilla
// de /galeria. Al agregar una imagen basta con sumarla aquí — el carrusel
// arma los slides solo y /galeria genera su página de detalle.
export const RENDERS: RenderItem[] = [
  // ── Exteriores ────────────────────────────────────────────────────────────
  { slug: "fachada-principal",      src: "/images/renders/fachada-avenida.webp",        label: "Fachada principal",           category: "exteriores" },
  { slug: "frente-al-mar",          src: "/images/renders/frente-al-mar.webp",          label: "Frente al mar",               category: "exteriores" },
  { slug: "ingreso-principal",      src: "/images/renders/ingreso-principal.webp",      label: "Ingreso principal",           category: "exteriores" },
  { slug: "acceso-principal",       src: "/images/renders/acceso-principal.webp",       label: "Acceso principal",            category: "exteriores" },
  { slug: "acceso-vehicular",       src: "/images/renders/acceso-vehicular.webp",       label: "Acceso vehicular",            category: "exteriores" },
  { slug: "acceso-peatonal",        src: "/images/renders/acceso-peatonal.webp",        label: "Acceso peatonal",             category: "exteriores" },
  { slug: "detalle-de-fachada",     src: "/images/renders/detalle-fachada.webp",        label: "Detalle de fachada",          category: "exteriores" },
  { slug: "fachada-frontal",        src: "/images/renders/fachada-frontal.webp",        label: "Fachada frontal",             category: "exteriores" },
  { slug: "fachada-nocturna",       src: "/images/renders/fachada-nocturna.webp",       label: "Fachada nocturna",            category: "exteriores" },
  { slug: "fachada-en-modulos",     src: "/images/renders/fachada-modulos.webp",        label: "Fachada en módulos",          category: "exteriores" },
  { slug: "esquina",                src: "/images/renders/esquina-fachada.webp",        label: "La esquina",                  category: "exteriores" },
  { slug: "frontal-entre-palmeras", src: "/images/renders/frontal-palmeras.webp",       label: "Frontal entre palmeras",      category: "exteriores" },
  { slug: "locales-comerciales",    src: "/images/renders/locales-comerciales.webp",    label: "Locales comerciales",         category: "exteriores" },
  { slug: "oficinas-desde-la-calle", src: "/images/renders/oficinas-vidrio.webp",       label: "Oficinas desde la calle",     category: "exteriores" },
  { slug: "zona-de-estar",          src: "/images/renders/zona-estar.webp",             label: "Zona de estar",               category: "exteriores" },
  { slug: "plaza-al-atardecer",     src: "/images/renders/plaza-atardecer.webp",        label: "Plaza al atardecer",          category: "exteriores" },
  { slug: "atardecer",              src: "/images/renders/atardecer-mar.webp",          label: "Atardecer sobre el Caribe",   category: "exteriores" },
  { slug: "vista-al-caribe",        src: "/images/renders/vista-caribe.webp",           label: "Vista al Caribe",             category: "exteriores" },
  { slug: "el-malecon",             src: "/images/renders/malecon-playa.webp",          label: "El malecón",                  category: "exteriores" },
  { slug: "panoramica-zona-norte",  src: "/images/renders/panoramica-zona-norte.webp",  label: "Panorámica de la Zona Norte", category: "exteriores" },
  { slug: "vista-aerea",            src: "/images/renders/aerea-atardecer.webp",        label: "Vista aérea",                 category: "exteriores" },
  { slug: "vista-aerea-diurna",     src: "/images/renders/aerea-diurna.webp",           label: "Vista aérea diurna",          category: "exteriores" },
  { slug: "vista-aerea-nocturna",   src: "/images/renders/aerea-nocturna.webp",         label: "Vista aérea nocturna",        category: "exteriores" },
  { slug: "vista-aerea-en-contexto", src: "/images/renders/aerea-contexto.webp",        label: "El proyecto en su entorno",   category: "exteriores" },
  { slug: "vista-aerea-sobre-la-avenida", src: "/images/renders/aerea-avenida.webp",    label: "Sobre la avenida",            category: "exteriores" },

  // ── Interiores ────────────────────────────────────────────────────────────
  { slug: "lobby",                  src: "/images/renders/lobby-recepcion.webp",        label: "Lobby",                       category: "interiores" },
  { slug: "acceso-al-lobby",        src: "/images/renders/lobby-acceso.webp",           label: "Acceso al lobby",             category: "interiores" },
  { slug: "oficina-privada",        src: "/images/renders/oficina-privada.webp",        label: "Oficina privada",             category: "interiores" },
  { slug: "oficinas",               src: "/images/renders/oficina-open-space.webp",     label: "Oficinas",                    category: "interiores" },
  { slug: "rooftop",                src: "/images/renders/rooftop-bar.webp",            label: "Rooftop",                     category: "interiores" },
  { slug: "rooftop-al-atardecer",   src: "/images/renders/rooftop-atardecer.webp",      label: "Rooftop al atardecer",        category: "interiores" },
  { slug: "parqueadero",            src: "/images/renders/parqueadero.webp",            label: "Parqueadero",                 category: "interiores" },
  { slug: "rampa-del-parqueadero",  src: "/images/renders/parqueadero-rampa.webp",      label: "Rampa del parqueadero",       category: "interiores" },
];

/** Los que rotan en el carrusel del home. Las plantas viven en su propia
 *  sección, no en la galería. */
export const CAROUSEL_RENDERS = RENDERS;

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
