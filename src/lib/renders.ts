export interface RenderItem {
  slug: string;
  src: string;
  label: string;
}

export const RENDERS: RenderItem[] = [
  { slug: "fachada-principal",  src: "/images/renders/render-04.png", label: "Fachada principal" },
  { slug: "lobby-de-acceso",    src: "/images/renders/render-08.png", label: "Lobby de acceso" },
  { slug: "plaza-comercial",    src: "/images/renders/render-06.png", label: "Plaza comercial" },
  { slug: "detalle-de-fachada", src: "/images/renders/render-07.png", label: "Detalle de fachada" },
  { slug: "acceso-vehicular",   src: "/images/renders/render-09.png", label: "Acceso vehicular" },
  { slug: "vista-frontal",      src: "/images/renders/render-05.png", label: "Vista frontal" },
  { slug: "vista-aerea-sur",    src: "/images/renders/render-02.png", label: "Vista aérea sur" },
  { slug: "vista-aerea-norte",  src: "/images/renders/render-03.png", label: "Vista aérea norte" },
  { slug: "vista-aerea-compleja", src: "/images/renders/render-01.png", label: "Vista aérea compleja" },
];

export function getRenderBySlug(slug: string): RenderItem | undefined {
  return RENDERS.find((r) => r.slug === slug);
}
