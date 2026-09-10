import { CONTACT } from "@/lib/contact";
import { SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/lib/site";

/**
 * Datos estructurados de la home (JSON-LD).
 *
 * Se declara solo lo que se puede sostener. Quedan fuera a propósito:
 *
 *   · `telephone` — hoy es un placeholder (ver contact.ts). Publicarlo aquí lo
 *     mete en el grafo de conocimiento de Google como si fuera real.
 *   · `geo` — las coordenadas que traía el mapa embebido nunca se verificaron
 *     contra la dirección, y una lat/lon equivocada manda a la gente a otro
 *     punto de la ciudad.
 *   · `openingHours`, `priceRange`, `aggregateRating` — no hay dato.
 *
 * Un `LocalBusiness` completo, con horarios y teléfono, es lo que pide la hoja
 * de Google Business Profile de la checklist, y depende de que exista antes
 * ese perfil.
 */
export default function SeoJsonLd() {
  const datos = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "es-CO",
        publisher: { "@id": `${SITE_URL}/#organizacion` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organizacion`,
        name: SITE_NAME,
        url: SITE_URL,
        email: CONTACT.email,
        logo: `${SITE_URL}/icon-fallback.png`,
        image: `${SITE_URL}${SITE_OG_IMAGE}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.projectStreet,
          addressLocality: "Cartagena de Indias",
          addressRegion: "Bolívar",
          addressCountry: "CO",
        },
      },
      {
        "@type": "Place",
        "@id": `${SITE_URL}/#proyecto`,
        name: SITE_NAME,
        url: SITE_URL,
        description:
          "Centro de negocios con oficinas corporativas y locales comerciales frente al Mar Caribe, sobre la Avenida Santander en la Zona Norte de Cartagena de Indias.",
        image: `${SITE_URL}${SITE_OG_IMAGE}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.projectStreet,
          addressLocality: "Cartagena de Indias",
          addressRegion: "Bolívar",
          addressCountry: "CO",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  );
}
