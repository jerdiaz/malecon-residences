// Datos de contacto centralizados: el cambio se propaga solo a navbar, pie,
// mega menú, WhatsApp y redes.
//
// Confirmados por el cliente: dirección y correo.
//
// TODO: el teléfono +57 300 000 0000 es PLACEHOLDER — confirmado por el
// cliente el 2026-09-06, todavía no hay número definitivo. El de WhatsApp se
// mantiene igual al teléfono, así que hereda el mismo pendiente: hoy el botón
// flotante abre un chat con un número que no existe.

const addressStreet = "Cra. 3 #46-110 a 46-2, Piso 14, Barrio Marbella";
const addressCity = "Cartagena de Indias, Bolívar";

export const CONTACT = {
  phoneDisplay: "+57 300 000 0000",
  phoneTel: "+573000000000",
  whatsappNumber: "573000000000",
  whatsappMessage: "Hola, me interesa Malecón Business Center.",
  email: "info@maleconbusiness.com",
  // Partida en dos porque el pie la muestra en dos renglones; `address` las
  // une para donde haga falta en una sola línea.
  addressStreet,
  addressCity,
  address: `${addressStreet}, ${addressCity}`,
} as const;
