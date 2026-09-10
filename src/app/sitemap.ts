import type { MetadataRoute } from "next";
import { RENDERS } from "@/lib/renders";
import { SITE_URL } from "@/lib/site";

/**
 * sitemap.xml — 35 URL: la home, el índice de galería y las 33 fichas.
 *
 * Se genera del mismo catálogo que arma la galería (`RENDERS`), así que al
 * sumar o quitar un render el sitemap se mantiene solo. Las rutas /preview-*
 * quedan fuera a propósito: son páginas de trabajo, no contenido.
 *
 * `lastModified` sale de la fecha de compilación, que es lo más honesto que
 * se puede afirmar sin llevar un registro por página.
 *
 * Cada entrada declara además sus imágenes. En este sitio no es un extra: los
 * renders son el producto, y son lo que puede aparecer en Google Imágenes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  const absoluta = (ruta: string) => `${SITE_URL}${ruta}`;

  return [
    {
      url: SITE_URL,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 1,
      // Las que se ven sin desplazarse o en las secciones principales.
      images: [
        absoluta("/images/oficinas-zona-norte-cartagena.webp"),
        absoluta("/images/renders/acceso-vehicular.webp"),
        absoluta("/images/renders/fachada-nocturna.webp"),
        absoluta("/images/renders/malecon-playa.webp"),
      ],
    },
    {
      url: `${SITE_URL}/galeria`,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 0.8,
      images: RENDERS.map((r) => absoluta(r.src)),
    },
    ...RENDERS.map((r) => ({
      url: `${SITE_URL}/galeria/${r.slug}`,
      lastModified: ahora,
      changeFrequency: "yearly" as const,
      priority: 0.5,
      images: [absoluta(r.src)],
    })),
  ];
}
