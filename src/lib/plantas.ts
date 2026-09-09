export interface Plano {
  src: string;
  label: string;
  /** Proporción ancho/alto. Los planos van de 0.44 (zonas verticales) a 1.74
   *  (las páginas del brochure), así que el visor se adapta a cada uno. */
  aspecto: number;
  /** true = SVG con texto vectorial; se sirve tal cual, sin pasar por next/image */
  vector?: boolean;
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
  /** Render fotográfico del nivel. Va detrás del plano, atenuado: conecta el
   *  dibujo técnico con el espacio real y evita que la sección se sienta fría. */
  ambiente: string;
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
    ambiente: "/images/renders/aerea-contexto.webp",
    planos: [
      {
        src: "/images/plantas/planta-general.svg",
        label: "Planta general",
        aspecto: 1.737,
        vector: true,
      },
    ],
  },
  {
    id: "locales",
    label: "Locales",
    intro:
      "El nivel comercial, a pie de calle y con frente sobre la avenida del malecón.",
    ambiente: "/images/renders/locales-comerciales.webp",
    planos: [
      { src: "/images/plantas/locales-general.webp", label: "El nivel completo", aspecto: 1.509 },
      { src: "/images/plantas/locales-zona-a.webp", label: "Zona A", aspecto: 0.698 },
      { src: "/images/plantas/locales-zona-b.webp", label: "Zona B", aspecto: 1.427 },
      { src: "/images/plantas/locales-zona-c.webp", label: "Zona C", aspecto: 0.537 },
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
    ambiente: "/images/renders/oficina-open-space.webp",
    planos: [
      {
        src: "/images/plantas/plantas-por-zona.svg",
        label: "Oficinas por zona",
        aspecto: 1.737,
        vector: true,
      },
      { src: "/images/plantas/oficinas-zona-a.webp", label: "Zona A", aspecto: 0.444 },
      { src: "/images/plantas/oficinas-zona-b.webp", label: "Zona B", aspecto: 1.473 },
      { src: "/images/plantas/oficinas-zona-c.webp", label: "Zona C", aspecto: 0.553 },
      { src: "/images/plantas/oficinas-general.webp", label: "El nivel completo", aspecto: 1.509 },
    ],
    // Transcrito de la página 12 del brochure. Antes solo existía dentro de la
    // imagen; aquí se actualiza sin pedir arte nueva cuando cambie la oferta.
    inventario: {
      titulo: "Oficinas disponibles",
      unidad: "oficina",
      filas: [
        { area: "32.6", unidades: ["13", "15", "17", "19", "21"] },
        { area: "35.6", unidades: ["02", "03", "04", "05", "08", "09", "10", "11"] },
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
    ambiente: "/images/renders/rooftop-bar.webp",
    planos: [
      { src: "/images/plantas/cubierta.webp", label: "Planta de cubierta", aspecto: 1.509 },
    ],
  },
];
