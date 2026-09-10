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
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  return [
    { url: SITE_URL, lastModified: ahora, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/galeria`,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...RENDERS.map((r) => ({
      url: `${SITE_URL}/galeria/${r.slug}`,
      lastModified: ahora,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
