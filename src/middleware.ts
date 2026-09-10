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

export const config = {
  // Todo menos los estáticos y el optimizador de imágenes: redirigir esos no
  // aporta nada y suma un salto a cada recurso de la página.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\..*).*)"],
};
