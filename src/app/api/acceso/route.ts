import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

/**
 * Acceso interno a la puerta de registro (RegistroGate.tsx).
 *
 * La gente de administración y el equipo comercial necesitan ver el sitio sin
 * dejar sus datos como si fueran prospectos. La puerta tiene al pie un enlace
 * "Acceso interno" que pide una clave; esta ruta la comprueba contra
 * ACCESO_EQUIPO_CLAVE (en el .env del VPS) y, si coincide, el navegador queda
 * marcado igual que si se hubiera registrado.
 *
 * Se comprueba aquí y no en el navegador porque todo lo que va en el bundle
 * es público: una clave en el código de la puerta la leería cualquiera.
 *
 * Lo que protege es un filtro de marketing, no datos, así que la defensa es
 * proporcional: comparación en tiempo constante y un tope de intentos por IP
 * en memoria (se reinicia con el proceso; suficiente para frenar a un script
 * tonto). Cambiar la clave es editar el .env y `pm2 restart malecon`.
 */

const MAX_INTENTOS = 10;
const VENTANA_MS = 10 * 60 * 1000;
const intentos = new Map<string, { n: number; desde: number }>();

function ipDe(req: Request): string {
  // nginx pone la IP real en X-Forwarded-For; sin proxy no hay cabecera.
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "desconocida";
}

function excedido(ip: string): boolean {
  const ahora = Date.now();
  const r = intentos.get(ip);
  if (!r || ahora - r.desde > VENTANA_MS) {
    intentos.set(ip, { n: 1, desde: ahora });
    return false;
  }
  r.n += 1;
  return r.n > MAX_INTENTOS;
}

function coincide(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  // timingSafeEqual exige el mismo largo; si difieren ya no coinciden, pero se
  // compara igual contra sí mismo para que el tiempo no delate el largo.
  return ba.length === bb.length ? timingSafeEqual(ba, bb) : (timingSafeEqual(ba, ba), false);
}

export async function POST(req: Request) {
  const esperada = process.env.ACCESO_EQUIPO_CLAVE;
  if (!esperada) {
    console.error("[api/acceso] Falta ACCESO_EQUIPO_CLAVE en el entorno");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const ip = ipDe(req);
  if (excedido(ip)) {
    console.warn("[api/acceso] Demasiados intentos desde", ip);
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let clave = "";
  try {
    const cuerpo = await req.json();
    clave = typeof cuerpo?.clave === "string" ? cuerpo.clave.trim() : "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!clave || !coincide(clave, esperada)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  intentos.delete(ip);
  return NextResponse.json({ ok: true });
}
