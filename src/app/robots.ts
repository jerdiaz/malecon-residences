import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots.txt
 *
 * Declara el sitemap y abre el paso a los agentes de IA además de los
 * buscadores tradicionales, que es lo que pide la checklist: hoy una parte
 * del tráfico de descubrimiento llega por ChatGPT, Perplexity y similares,
 * y varios de esos rastreadores solo entran si se los nombra.
 *
 * Las rutas /preview-* son páginas de trabajo para comparar versiones de una
 * misma sección. No son contenido del sitio y no deben indexarse.
 */
export default function robots(): MetadataRoute.Robots {
  const bloqueadas = ["/preview-aliados", "/preview-amenidades", "/preview-conectividad"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: bloqueadas },
      // Buscadores tradicionales
      { userAgent: ["Googlebot", "Bingbot"], allow: "/", disallow: bloqueadas },
      // Buscadores y agentes de IA
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "FirecrawlAgent",
          "AndiBot",
          "ExaBot",
          "ClaudeBot",
          "Claude-User",
        ],
        allow: ["/", "/llms.txt"],
        disallow: bloqueadas,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
