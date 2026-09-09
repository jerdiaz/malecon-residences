// ─────────────────────────────────────────────────────────────────────────────
// CONECTIVIDAD — datos del mapa "Conectividad que impulsa los negocios"
// (página 8 del brochure), transcritos a mano de una captura que pasó el
// cliente por chat — no hay un SVG fuente para esta página como sí lo hay
// para Amenidades, así que esto es una RECONSTRUCCIÓN, no una copia exacta.
// Las posiciones (x/y) son porcentajes sobre el lienzo del mapa, calculados
// mirando la imagen: aproximados, no medidos sobre un vector. Si el cliente
// consigue el archivo original, esto se reemplaza por algo pixel-perfect.
//
// Se dejaron fuera los puntos de color sin etiqueta que trae la imagen
// original (más manchas de "Zonas Francas" repartidas por el mapa, sin
// texto): sin una etiqueta que las explique quedan como ruido decorativo.
// Si hacen falta, es agregar una entrada más a PUNTOS.
// ─────────────────────────────────────────────────────────────────────────────

export type Categoria =
  | "hotelera"
  | "francas"
  | "comerciales"
  | "convenciones"
  | "residenciales"
  | "infraestructura"
  | "proyecto";

export const CATEGORIA_COLOR: Record<Categoria, string> = {
  hotelera: "#d1467e",
  francas: "#e2483f",
  comerciales: "#4a90c2",
  convenciones: "#c3d24f",
  residenciales: "#f0c94a",
  infraestructura: "#1d2d51",
  proyecto: "#1d2d51",
};

export const LEYENDA: { categoria: Categoria; label: string }[] = [
  { categoria: "hotelera", label: "Zona Hotelera" },
  { categoria: "francas", label: "Zonas Francas" },
  { categoria: "comerciales", label: "Centros Comerciales" },
  { categoria: "convenciones", label: "Centros de Convención" },
  { categoria: "residenciales", label: "Zonas Residenciales" },
];

export interface PuntoConectividad {
  label: string;
  /** Minutos estimados desde el proyecto. Ausente = sin dato (ej. "Proyectado"). */
  minutos?: number;
  /** true = desarrollo aún no construido, como marca la imagen original. */
  proyectado?: boolean;
  categoria: Categoria;
  /** Ícono a mostrar en vez del punto de color, para los hitos de infraestructura. */
  icono?: "avion" | "universidad" | "hospital" | "historico" | "carretera" | "puerto" | "industria";
  /** Posición en % sobre el lienzo del mapa (0-100), aproximada. */
  x: number;
  y: number;
  /** Lado hacia el que se extiende la etiqueta. "bottom" por defecto —
   *  solo hace falta fijarlo donde el punto está apretado contra otros. */
  labelDir?: "top" | "bottom" | "left" | "right";
}

export const PUNTOS: PuntoConectividad[] = [
  // ── El proyecto ──
  { label: "Malecón Business Center", categoria: "proyecto", x: 54, y: 48, labelDir: "right" },

  // ── Infraestructura y conexiones ──
  {
    label: "Aeropuerto Internacional Rafael Núñez",
    minutos: 5,
    categoria: "infraestructura",
    icono: "avion",
    x: 61,
    y: 43,
    labelDir: "left",
  },
  {
    label: "Nuevo Aeropuerto Internacional de Bayunca",
    proyectado: true,
    categoria: "infraestructura",
    icono: "avion",
    x: 95,
    y: 42,
    labelDir: "left",
  },
  {
    label: "Zona Norte (Conexión directa Vía al Mar Barranquilla)",
    minutos: 5,
    categoria: "infraestructura",
    icono: "carretera",
    x: 65,
    y: 32,
    labelDir: "right",
  },
  {
    label: "Centro Histórico",
    minutos: 10,
    categoria: "infraestructura",
    icono: "historico",
    x: 53,
    y: 57,
    labelDir: "right",
  },
  {
    label: "Universidad de Los Andes Sede Caribe",
    categoria: "infraestructura",
    icono: "universidad",
    x: 84,
    y: 19,
    labelDir: "left",
  },
  {
    label: "Hospital Serena del Mar",
    minutos: 10,
    categoria: "infraestructura",
    icono: "hospital",
    x: 92,
    y: 24,
    labelDir: "bottom",
  },
  {
    label: "Principales Puertos",
    minutos: 15,
    categoria: "francas",
    icono: "puerto",
    x: 58,
    y: 73,
  },
  {
    label: "Mamonal (Zona Industrial)",
    minutos: 30,
    categoria: "francas",
    icono: "industria",
    x: 62,
    y: 85,
  },

  // ── Zona hotelera ──
  { label: "Zona Hotelera Centro", minutos: 10, categoria: "hotelera", x: 48, y: 53 },
  { label: "Zona Hotelera Bocagrande", minutos: 15, categoria: "hotelera", x: 51, y: 64 },

  // ── Centros comerciales ──
  {
    label: "Centro Comercial Las Ramblas",
    minutos: 10,
    categoria: "comerciales",
    x: 66,
    y: 6,
    labelDir: "left",
  },
  {
    label: "Centro Comercial Kristal Malls",
    proyectado: true,
    categoria: "comerciales",
    x: 88,
    y: 8,
    labelDir: "bottom",
  },

  // ── Zonas residenciales ──
  {
    label: "Conjunto Residencial Barcelona de Indias",
    categoria: "residenciales",
    x: 71,
    y: 4,
    labelDir: "bottom",
  },
  { label: "Zona Residencial Los Morros", categoria: "residenciales", x: 50, y: 14, labelDir: "bottom" },
  {
    label: "Centro Residencial Serena del Mar",
    categoria: "residenciales",
    x: 80,
    y: 26,
    labelDir: "top",
  },
];

// Lista larga de la columna de texto — más detallada que la que había en
// LocationSection.tsx (esa no traía los centros comerciales por nombre ni
// separaba Zona Portuaria de Zonas Francas). Si se integra esta versión,
// conviene actualizar también CONEXIONES en LocationSection.tsx con esta.
export const DISTANCIAS_ESTRATEGICAS = [
  "Aeropuerto Internacional Rafael Núñez",
  "Centro Histórico",
  "Zona Norte con conexión a Barranquilla",
  "Zona Portuaria",
  "Zonas Francas",
  "Zona Hotelera",
  "Centros de Convenciones: Cartagena de Indias y Las Américas",
  "Centros Comerciales: La Serrezuela, Mall Plaza, Plaza Bocagrande, Nao",
  "Clínica Serena del Mar y Centro Comercial Las Ramblas",
];
