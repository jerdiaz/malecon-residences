// Datos de contacto centralizados: el cambio se propaga solo a navbar, pie,
// mega menú, WhatsApp y redes.
//
// Confirmados por el cliente: dirección y correo.
//
// El 2026-09-10 se retiró la dirección de la OFICINA COMERCIAL (Cra. 3
// #46-110, Piso 14, Barrio Marbella) por pedido del cliente: "la otra no va
// más por ahora". Queda una sola dirección en todo el sitio, la del proyecto.
// Si vuelve a hacer falta, está en el historial de git. No confundirlas: las
// dos están en Marbella, pero la de abajo es la del lote.
//
// Las dos líneas oficiales, entregadas por el cliente el 2026-09-22. Sustituyen
// al placeholder +57 300 000 0000, que estuvo en producción hasta hoy y hacía
// que el botón de WhatsApp abriera un chat con un número inexistente.
//
// Van las dos a la vista, por pedido del cliente ("los dos que salgan en el
// footer").
//
// TODO: falta definir CUÁL de las dos atiende WhatsApp; el cliente lo dirá.
// Mientras tanto `whatsappNumber` apunta a la primera — provisional, pero un
// número real y atendido es mejor que el que no existía. Cuando lo confirme,
// se cambia esa sola línea.

// Dirección del proyecto: la única que muestra el sitio. Partida en dos
// porque el pie y Ubicación la reparten en dos renglones; `projectAddress`
// las une para donde se necesite en una sola línea (mega menú, Google Maps).
//
// El barrio se sumó el 14 de septiembre por pedido del cliente ("completar con
// MARBELLA"). Va dentro de `projectStreet` y no como campo aparte a propósito:
// así entra también en el `streetAddress` del JSON-LD —schema.org no tiene
// campo de barrio, y la convención es incluirlo en la calle— y de paso afina
// la búsqueda de Google Maps, que hoy cae en la zona pero no clava el punto.
const projectStreet = "Av. Santander K 2A 49-246, Manzana 3, Barrio Marbella";
const projectCity = "Cartagena de Indias";
const projectAddress = `${projectStreet}, ${projectCity}`;

/** Las dos líneas, en el orden en que se muestran. */
const phones = [
  { display: "+57 324 583 3087", tel: "+573245833087" },
  { display: "+57 324 583 3148", tel: "+573245833148" },
] as const;

export const CONTACT = {
  phones,
  // Para los sitios donde solo cabe una (el icono de llamar del pie).
  phoneDisplay: phones[0].display,
  phoneTel: phones[0].tel,
  whatsappNumber: "573245833087",
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
