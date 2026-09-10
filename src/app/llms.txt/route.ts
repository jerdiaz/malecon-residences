import { CONTACT } from "@/lib/contact";
import { NIVELES } from "@/lib/plantas";
import { RENDERS } from "@/lib/renders";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt — resumen del sitio en texto plano para buscadores y agentes de IA.
 *
 * Va como ruta y no como archivo suelto en /public para que se arme de las
 * mismas fuentes que la página: si cambian la dirección, los niveles o el set
 * de renders, esto se actualiza solo en vez de quedar desfasado.
 *
 * A propósito NO incluye el teléfono: hoy es un placeholder (ver contact.ts) y
 * publicarlo aquí sería sembrar un dato falso justo donde se va a copiar tal
 * cual.
 */
export function GET() {
  const niveles = NIVELES.map((n) => `- **${n.label}**: ${n.intro}`).join("\n");
  const fichas = RENDERS.map(
    (r) => `- [${r.label}](${SITE_URL}/galeria/${r.slug})`,
  ).join("\n");

  const cuerpo = `# Malecón Business Center

> Centro de negocios frente al Mar Caribe, sobre la Avenida Santander en la
> Zona Norte de Cartagena de Indias, Colombia. Ofrece oficinas corporativas y
> locales comerciales en venta, con acabados premium y espacios boutique.

## Qué es

Malecón Business Center es un edificio de uso corporativo en construcción en
Cartagena de Indias. Reúne locales comerciales a pie de calle sobre la avenida
del malecón, una planta tipo de veinticuatro oficinas repartidas en tres zonas,
y una cubierta con terraza rooftop asomada al Caribe.

Está dirigido a empresas, profesionales independientes e inversionistas que
buscan oficina propia o un activo en renta en la zona de mayor proyección de
la ciudad.

## Ubicación

${CONTACT.projectAddress}

Conexión directa con el Aeropuerto Internacional Rafael Núñez, el Centro
Histórico, la Zona Hotelera, la Zona Portuaria y las Zonas Francas, los
centros de convenciones y la vía a Barranquilla.

## Distribución

${niveles}

## Páginas

- [Inicio](${SITE_URL}/)
- [Galería completa](${SITE_URL}/galeria)

## Renders del proyecto

${fichas}

## Contacto

- Correo: ${CONTACT.email}
- Sitio: ${SITE_URL}
`;

  return new Response(cuerpo, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
