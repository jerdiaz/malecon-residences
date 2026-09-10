// Datos de contacto centralizados: el cambio se propaga solo a navbar, pie,
// mega menú, WhatsApp y redes.
//
// Confirmados por el cliente: dirección y correo.
//
// El 2026-09-10 se retiró la dirección de la oficina comercial (Cra. 3
// #46-110, Piso 14, Barrio Marbella) por pedido del cliente: "la otra no va
// más por ahora". Queda una sola dirección en todo el sitio, la del proyecto.
// Si vuelve a hacer falta, está en el historial de git.
//
// TODO: el teléfono +57 300 000 0000 es PLACEHOLDER — confirmado por el
// cliente el 2026-09-06, todavía no hay número definitivo. El de WhatsApp se
// mantiene igual al teléfono, así que hereda el mismo pendiente: hoy el botón
// flotante abre un chat con un número que no existe.

// Dirección del proyecto: la única que muestra el sitio. Partida en dos
// porque el pie y Ubicación la reparten en dos renglones; `projectAddress`
// las une para donde se necesite en una sola línea (mega menú, Google Maps).
const projectStreet = "Av. Santander K 2A 49-246, Manzana 3";
const projectCity = "Cartagena de Indias";
const projectAddress = `${projectStreet}, ${projectCity}`;

export const CONTACT = {
  phoneDisplay: "+57 300 000 0000",
  phoneTel: "+573000000000",
  whatsappNumber: "573000000000",
  whatsappMessage: "Hola, me interesa Malecón Business Center.",
  email: "info@maleconbusiness.com",
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
