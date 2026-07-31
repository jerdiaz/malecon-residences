export interface RenderItem {
  slug: string;
  src: string;
  label: string;
}

// Renders oficiales del proyecto (set entregado por los arquitectos).
// El orden importa: RendersGallery los agrupa de 3 en 3 y el primero de
// cada grupo es la foto grande del slide.
export const RENDERS: RenderItem[] = [
  // Slide 1 — la fachada y el acceso
  { slug: "fachada-principal",   src: "/images/renders/fachada-avenida.webp",         label: "Fachada principal" },
  { slug: "plaza-de-acceso",     src: "/images/renders/plaza-acceso.webp",            label: "Plaza de acceso" },
  { slug: "acceso-vehicular",    src: "/images/renders/acceso-vehicular.webp",        label: "Acceso vehicular" },

  // Slide 2 — el mar y el detalle arquitectónico
  { slug: "frente-al-mar",       src: "/images/renders/frente-al-mar.webp",           label: "Frente al mar" },
  { slug: "detalle-de-fachada",  src: "/images/renders/detalle-fachada.webp",         label: "Detalle de fachada" },
  { slug: "el-malecon",          src: "/images/renders/malecon-playa.webp",           label: "El malecón" },

  // Slide 3 — las vistas altas y el atardecer
  { slug: "vista-aerea",     src: "/images/renders/aerea-atardecer.webp", label: "Vista aérea" },
  { slug: "vista-al-caribe", src: "/images/renders/vista-caribe.webp",    label: "Vista al Caribe" },
  { slug: "atardecer",       src: "/images/renders/atardecer-mar.webp",   label: "Atardecer sobre el Caribe" },
];

export function getRenderBySlug(slug: string): RenderItem | undefined {
  return RENDERS.find((r) => r.slug === slug);
}
