import type { Apartment } from "@/types";

/**
 * Inventario simulado de Malecón Residences — un edificio boutique de 6 niveles
 * frente al mar en la Zona Norte de Cartagena. Dos unidades por planta (líneas
 * 01 y 02) entre los pisos 2 y 6, combinando las tres orientaciones de fachada.
 *
 * El orden del array refleja el inventario de norte a sur; el Explorer lo
 * reorganiza visualmente por planta (de la 6 a la 2) para emular la fachada.
 */
export const apartments: Apartment[] = [
  // — Nivel 6 · Grand Penthouse —
  {
    id: "ap-601",
    floor: 6,
    unitNumber: "601",
    areaM2: 342,
    bedrooms: 4,
    bathrooms: 5,
    view: "Sunset View",
    status: "disponible",
    tier: "Grand Penthouse",
  },
  {
    id: "ap-602",
    floor: 6,
    unitNumber: "602",
    areaM2: 318,
    bedrooms: 4,
    bathrooms: 4,
    view: "Mar Caribe",
    status: "reservado",
    tier: "Grand Penthouse",
  },

  // — Nivel 5 · Exclusive Residence —
  {
    id: "ap-501",
    floor: 5,
    unitNumber: "501",
    areaM2: 196,
    bedrooms: 3,
    bathrooms: 4,
    view: "Mar Caribe",
    status: "disponible",
    tier: "Exclusive Residence",
  },
  {
    id: "ap-502",
    floor: 5,
    unitNumber: "502",
    areaM2: 184,
    bedrooms: 3,
    bathrooms: 3,
    view: "Ciénaga de la Virgen",
    status: "disponible",
    tier: "Exclusive Residence",
  },

  // — Nivel 4 · Exclusive Residence —
  {
    id: "ap-401",
    floor: 4,
    unitNumber: "401",
    areaM2: 188,
    bedrooms: 3,
    bathrooms: 3,
    view: "Mar Caribe",
    status: "reservado",
    tier: "Exclusive Residence",
  },
  {
    id: "ap-402",
    floor: 4,
    unitNumber: "402",
    areaM2: 172,
    bedrooms: 3,
    bathrooms: 3,
    view: "Sunset View",
    status: "disponible",
    tier: "Exclusive Residence",
  },

  // — Nivel 3 · Premium Collection —
  {
    id: "ap-301",
    floor: 3,
    unitNumber: "301",
    areaM2: 142,
    bedrooms: 2,
    bathrooms: 2,
    view: "Ciénaga de la Virgen",
    status: "disponible",
    tier: "Premium Collection",
  },
  {
    id: "ap-302",
    floor: 3,
    unitNumber: "302",
    areaM2: 156,
    bedrooms: 2,
    bathrooms: 3,
    view: "Mar Caribe",
    status: "disponible",
    tier: "Premium Collection",
  },

  // — Nivel 2 · Premium Collection —
  {
    id: "ap-201",
    floor: 2,
    unitNumber: "201",
    areaM2: 138,
    bedrooms: 2,
    bathrooms: 2,
    view: "Mar Caribe",
    status: "reservado",
    tier: "Premium Collection",
  },
  {
    id: "ap-202",
    floor: 2,
    unitNumber: "202",
    areaM2: 128,
    bedrooms: 2,
    bathrooms: 2,
    view: "Sunset View",
    status: "disponible",
    tier: "Premium Collection",
  },
];

/** Pisos presentes en el inventario, ordenados de la cubierta al podio (6 → 2). */
export const floors: number[] = Array.from(
  new Set(apartments.map((a) => a.floor)),
).sort((a, b) => b - a);

/** Devuelve las unidades de un piso, ordenadas por número de unidad. */
export function unitsByFloor(floor: number): Apartment[] {
  return apartments
    .filter((a) => a.floor === floor)
    .sort((a, b) => a.unitNumber.localeCompare(b.unitNumber));
}
