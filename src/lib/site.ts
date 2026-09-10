// Identidad del sitio en un solo lugar: de aquí salen las canónicas, el
// sitemap, el robots y los metadatos de compartir.
//
// El dominio va sin www a propósito. Hasta el 2026-09-10 la versión con www
// respondía 200 en vez de redirigir, así que el sitio entero existía por
// duplicado en dos dominios. Lo corrige el middleware; esta constante define
// cuál de los dos es el bueno.
export const SITE_URL = "https://maleconbusiness.com";

export const SITE_NAME = "Malecón Business Center";

/** Imagen por defecto al compartir en redes y en WhatsApp. */
export const SITE_OG_IMAGE = "/images/renders/fachada-avenida.webp";
