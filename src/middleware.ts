import { NextResponse, type NextRequest } from "next/server";

/**
 * Redirige www a la versión sin www, con 301.
 *
 * Va aquí y no en el servidor porque la configuración de nginx del VPS no
 * está versionada en este repo, y el sitio se despliega además a Netlify:
 * resolverlo en la aplicación lo deja igual en los dos, y viaja con el código.
 *
 * Sin esto, https://www.maleconbusiness.com respondía 200 y servía el sitio
 * completo por segunda vez — contenido duplicado para los buscadores.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (!host.startsWith("www.")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.host = host.slice(4);
  url.port = "";
  url.protocol = "https";
  return NextResponse.redirect(url, 301);
}

// El filtro va aquí y no en un `matcher` con expresión regular: la versión
// anterior llevaba `.*\..*` escrito en un string de JavaScript, donde `\.`
// se convierte en `.` y el patrón terminaba excluyendo TODAS las rutas. El
// resultado era que solo la home redirigía y las 34 páginas restantes seguían
// existiendo por duplicado en www. En código el filtro se lee y se prueba.
export const config = {
  matcher: "/((?!_next/).*)",
};
