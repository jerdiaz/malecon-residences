export interface Plano {
  src: string;
  label: string;
  /** true = SVG con texto vectorial; se sirve tal cual, sin pasar por next/image */
  vector?: boolean;
}

export interface NivelPlantas {
  id: string;
  label: string;
  /** Frase corta que explica qué se está viendo en esa pestaña */
  intro: string;
  /** Planos del nivel, en el orden en que los recorre el carrusel. */
  planos: Plano[];
}

// Plantas del proyecto, agrupadas por nivel.
//
// Dos procedencias distintas que se complementan:
//   · Los SVG salen del brochure y llevan los datos —zonas, numeración de
//     oficinas, metrajes—. Se conservan en vector para que ese texto se lea
//     nítido al ampliar; solo se re-comprimieron los rasters que llevan dentro.
//   · Los WebP salen de la entrega de agosto: son el mismo edificio en render
//     limpio, sin anotaciones, a mayor resolución.
//
// La correspondencia entre planos y zonas está verificada: las proporciones de
// los `clipPath` del brochure coinciden con las de cada plano (Tipo 04 = Zona A,
// Tipo 02 = Zona B, Tipo 03 = Zona C). En los locales se aplicó la misma
// convención de numeración; conviene confirmarla con los arquitectos.
//
// El primero de cada nivel es el que abre: conviene que sea la vista que ubica
// al visitante antes de entrar en el detalle de cada zona.
export const NIVELES: NivelPlantas[] = [
  {
    id: "general",
    label: "General",
    intro:
      "El conjunto visto desde arriba, con las tres zonas —A, B y C— que organizan cada nivel.",
    planos: [
      { src: "/images/plantas/planta-general.svg", label: "Planta general", vector: true },
    ],
  },
  {
    id: "locales",
    label: "Locales",
    intro: "El nivel comercial, a pie de calle.",
    planos: [
      { src: "/images/plantas/locales-general.webp", label: "El nivel completo" },
      { src: "/images/plantas/locales-zona-a.webp", label: "Zona A" },
      { src: "/images/plantas/locales-zona-b.webp", label: "Zona B" },
      { src: "/images/plantas/locales-zona-c.webp", label: "Zona C" },
    ],
  },
  {
    id: "oficinas",
    label: "Oficinas",
    intro:
      "Planta tipo con la numeración de cada oficina, sus metrajes y la disponibilidad.",
    planos: [
      { src: "/images/plantas/plantas-por-zona.svg", label: "Oficinas por zona", vector: true },
      { src: "/images/plantas/oficinas-zona-a.webp", label: "Zona A" },
      { src: "/images/plantas/oficinas-zona-b.webp", label: "Zona B" },
      { src: "/images/plantas/oficinas-zona-c.webp", label: "Zona C" },
      { src: "/images/plantas/oficinas-general.webp", label: "El nivel completo" },
    ],
  },
  {
    id: "cubierta",
    label: "Cubierta",
    intro: "La cubierta, con la terraza del rooftop.",
    planos: [{ src: "/images/plantas/cubierta.webp", label: "Planta de cubierta" }],
  },
];
