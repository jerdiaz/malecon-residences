export interface Plano {
  src: string;
  label: string;
  /** Proporción ancho/alto. Los planos van de 0.44 (zonas verticales) a 1.74
   *  (las páginas del brochure), así que el visor se adapta a cada uno. */
  aspecto: number;
  /** Cuánto de la caja ocupa este plano, de 0 a 1.
   *
   *  Se afina plano por plano mirando cómo queda, no con una regla general:
   *  los verticales se ajustan por altura y llegan a tocar los bordes, mientras
   *  a los apaisados les sobra alto y pueden ir al 100%. Si uno se ve chico o
   *  apretado, se cambia solo su número. */
  escala: number;
  /** true = SVG con texto vectorial; se sirve tal cual, sin pasar por next/image */
  vector?: boolean;
  /** Contra qué borde de la caja se apoya el plano, por defecto "arriba"
   *  (pegado al título de la sección al entrar). Los planos muy apaisados
   *  (aspecto > ~1.6) sobran de alto una vez encajados por ancho, y arriba
   *  esa sobra cae entre la imagen y el rótulo de abajo, que queda flotando
   *  lejos de lo que rotula. "abajo" apoya el plano contra ese rótulo en su
   *  lugar. */
  alinear?: "arriba" | "abajo";
}

/** Una fila del inventario: el área y las unidades que la tienen. */
export interface Disponibilidad {
  area: string;
  unidades: string[];
}

export interface NivelPlantas {
  id: string;
  label: string;
  /** Frase corta que explica qué se está viendo en ese nivel */
  intro: string;
  planos: Plano[];
  /** Inventario comercial, cuando el nivel lo tiene. */
  inventario?: {
    titulo: string;
    filas: Disponibilidad[];
    /** Etiqueta de lo que se lista en cada fila: "oficinas", "locales"… */
    unidad: string;
  };
}

// Plantas del proyecto, agrupadas por nivel.
//
// Dos procedencias que se complementan:
//   · Los SVG salen del brochure y llevan los datos. Se conservan en vector
//     para que su texto se lea nítido al ampliar; solo se re-comprimieron los
//     rasters que llevan dentro.
//   · Los WebP salen de la entrega de agosto: el mismo edificio en render
//     limpio, sin anotaciones y a mayor resolución.
//
// Correspondencia de zonas verificada contra los `clipPath` del brochure:
// Tipo 04 = Zona A, Tipo 02 = Zona B, Tipo 03 = Zona C. En los locales se
// aplicó la misma convención; conviene confirmarla con los arquitectos.
export const NIVELES: NivelPlantas[] = [
  {
    id: "general",
    label: "General",
    intro:
      "El conjunto visto desde arriba. Tres zonas —A, B y C— organizan cada nivel del edificio.",
    planos: [
      {
        src: "/images/plantas/planta-general.svg",
        label: "Planta general",
        aspecto: 1.737,
        // 1.07 desborda a propósito la caja para comerse el margen lateral y
        // llegar al ancho completo de la columna. El techo es 1.075: más allá,
        // el `overflow-hidden` de la columna empieza a cortar el plano.
        escala: 1.07,
        vector: true,
        alinear: "abajo",
      },
    ],
  },
  {
    id: "locales",
    label: "Locales",
    intro:
      "El nivel comercial, a pie de calle y con frente sobre la avenida del malecón.",
    planos: [
      {
        src: "/images/plantas/locales-general.webp",
        label: "El nivel completo",
        aspecto: 1.509,
        escala: 1,
      },
      {
        src: "/images/plantas/locales-zona-a.webp",
        label: "Zona A",
        aspecto: 0.698,
        escala: 0.94,
      },
      {
        src: "/images/plantas/locales-zona-b.webp",
        label: "Zona B",
        aspecto: 1.427,
        escala: 1,
      },
      {
        src: "/images/plantas/locales-zona-c.webp",
        label: "Zona C",
        aspecto: 0.537,
        escala: 0.94,
      },
    ],
    inventario: {
      titulo: "Locales disponibles",
      unidad: "local",
      filas: [
        { area: "84.1", unidades: ["Local 2"] },
        { area: "81.9", unidades: ["Local 3"] },
        { area: "117.5", unidades: ["Local 4"] },
      ],
    },
  },
  {
    id: "oficinas",
    label: "Oficinas",
    intro:
      "La planta tipo, con veinticuatro oficinas repartidas entre las tres zonas.",
    planos: [
      {
        src: "/images/plantas/plantas-por-zona.svg",
        // Recortado a los planos: la leyenda de metrajes que traía la página
        // ahora vive como tipografía en la columna, y sacarla del dibujo
        // permite que las tres zonas se vean un 50% más grandes.
        label: "Oficinas por zona",
        aspecto: 1.632,
        escala: 1,
        vector: true,
      },
      {
        src: "/images/plantas/oficinas-zona-a.webp",
        label: "Zona A",
        aspecto: 0.444,
        escala: 0.94,
      },
      {
        src: "/images/plantas/oficinas-zona-b.webp",
        label: "Zona B",
        aspecto: 1.473,
        escala: 1,
      },
      {
        src: "/images/plantas/oficinas-zona-c.webp",
        label: "Zona C",
        aspecto: 0.553,
        escala: 0.94,
      },
      {
        src: "/images/plantas/oficinas-general.webp",
        label: "El nivel completo",
        aspecto: 1.509,
        escala: 1,
      },
    ],
    // Transcrito de la página 12 del brochure. Antes solo existía dentro de la
    // imagen; aquí se actualiza sin pedir arte nueva cuando cambie la oferta.
    inventario: {
      titulo: "Oficinas disponibles",
      unidad: "oficina",
      filas: [
        { area: "32.6", unidades: ["13", "15", "17", "19", "21"] },
        {
          area: "35.6",
          unidades: ["02", "03", "04", "05", "08", "09", "10", "11"],
        },
        { area: "36.0", unidades: ["07"] },
        { area: "40.6", unidades: ["14", "16", "18", "20", "22"] },
        { area: "49.2", unidades: ["06"] },
        { area: "68.2", unidades: ["01", "12"] },
        { area: "136.4", unidades: ["23"] },
        { area: "138.0", unidades: ["24"] },
      ],
    },
  },
  {
    id: "cubierta",
    label: "Cubierta",
    intro: "La cubierta, con la terraza del rooftop asomada al Caribe.",
    planos: [
      {
        src: "/images/plantas/cubierta.webp",
        label: "Planta de cubierta",
        aspecto: 1.509,
        escala: 1,
      },
    ],
  },
];
