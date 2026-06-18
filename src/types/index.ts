/**
 * Dominio de Malecón Residences — tipados estrictos para el inventario
 * del edificio boutique frente al mar (Zona Norte, Cartagena de Indias).
 */

/** Vistas disponibles desde la fachada del edificio. */
export type ApartmentView = "Mar Caribe" | "Ciénaga de la Virgen" | "Sunset View";

/** Estado comercial de cada unidad. */
export type ApartmentStatus = "disponible" | "reservado";

/** Colección / categoría de la residencia. */
export type ApartmentTier =
  | "Premium Collection"
  | "Exclusive Residence"
  | "Grand Penthouse";

/** Una unidad residencial dentro del edificio boutique. */
export interface Apartment {
  /** Identificador único de la unidad. */
  id: string;
  /** Piso físico (2 a 6). */
  floor: number;
  /** Número de unidad comercial (p. ej. "601"). */
  unitNumber: string;
  /** Área privada construida en metros cuadrados. */
  areaM2: number;
  /** Número de habitaciones. */
  bedrooms: number;
  /** Número de baños. */
  bathrooms: number;
  /** Orientación / vista principal. */
  view: ApartmentView;
  /** Disponibilidad comercial. */
  status: ApartmentStatus;
  /** Colección a la que pertenece la unidad. */
  tier: ApartmentTier;
}
