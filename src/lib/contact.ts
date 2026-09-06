// Datos de contacto centralizados: el cambio se propaga solo a navbar, pie,
// mega menú, WhatsApp y redes.
//
// Confirmados: dirección y correo.
// TODO: siguen siendo placeholder el teléfono y el número de WhatsApp.

const addressStreet = "Cra. 3 #46-110 a 46-2, Piso 14, Barrio Marbella";
const addressCity = "Cartagena de Indias, Bolívar";

export const CONTACT = {
  phoneDisplay: "+57 305 000 0000",
  phoneTel: "+573050000000",
  whatsappNumber: "573050000000",
  whatsappMessage: "Hola, me interesa Malecón Business Center.",
  email: "info@maleconbusiness.com",
  // Partida en dos porque el pie la muestra en dos renglones; `address` las
  // une para donde haga falta en una sola línea.
  addressStreet,
  addressCity,
  address: `${addressStreet}, ${addressCity}`,
} as const;
