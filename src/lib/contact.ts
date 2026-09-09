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

// La de arriba es la oficina comercial; el proyecto se levanta en otro punto
// de la ciudad. Son dos direcciones distintas a propósito: el pie y el mega
// menú muestran dónde atienden, y la seccion de Ubicación dónde se construye.
const projectStreet = "Av. Santander K 2A 49-246, Manzana 3";
const projectCity = "Cartagena de Indias";
const projectAddress = `${projectStreet}, ${projectCity}`;

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
  projectStreet,
  projectCity,
  projectAddress,
  // TODO: Estefanía va a mandar el enlace de Google Maps del lote. Mientras
  // tanto esto abre una búsqueda por la dirección: cae en la zona correcta
  // pero no clava el punto exacto ni trae la ficha del proyecto.
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    projectAddress,
  )}`,
} as const;
