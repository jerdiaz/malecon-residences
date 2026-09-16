import { NextResponse } from "next/server";
import { google } from "googleapis";

/**
 * Destino del formulario de registro (RegistroGate.tsx).
 *
 * Recibe nombre, correo y celular, los valida y agrega una fila a una hoja de
 * Google con la API de Sheets y una cuenta de servicio — el mismo esquema que
 * usa tooli-chatbot (src/services/registroService.ts allá). Cómo se crea y
 * se comparte la hoja está en REGISTRO-GOOGLE-SHEET.md, en la raíz del repo.
 *
 * Este es el único punto de integración: cuando el registro pase al CRM
 * (decisión del cliente, 15 de septiembre: "por ahora" va a Google Sheets),
 * se cambia `guardarEnHoja` y nada más. La puerta no sabe a dónde van los
 * datos.
 *
 * Variables de entorno (en el .env del VPS; ver .env.example):
 *   GOOGLE_SERVICE_ACCOUNT_JSON — el JSON de la cuenta de servicio, en una
 *                                 sola línea. El mismo que usa tooli-chatbot.
 *   REGISTRO_SHEET_ID           — el ID de la hoja (el tramo largo de su URL).
 *
 * Nunca se le cierra la puerta al visitante por un problema nuestro: si falta
 * la configuración o la hoja no responde, el registro se escribe completo en
 * el log del servidor con el prefijo "NO GUARDADO EN LA HOJA" y se responde
 * OK. Los registros se recuperan con `pm2 logs malecon`; un visitante que ve
 * un error y se va no se recupera.
 */

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Estructura de la pestaña "Registros" — crear a mano, ver la guía:
 *  A: Fecha · B: Nombre · C: Correo · D: Celular · E: Autorización */
const RANGO = "Registros!A:E";

interface Registro {
  nombre: string;
  email: string;
  celular: string;
  autorizacion: string;
}

function texto(v: unknown, max = 200): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function fechaBogota(): string {
  return new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

async function guardarEnHoja(registro: Registro): Promise<void> {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const spreadsheetId = process.env.REGISTRO_SHEET_ID;
  if (!json || !spreadsheetId) {
    throw new Error(
      "Falta GOOGLE_SERVICE_ACCOUNT_JSON o REGISTRO_SHEET_ID en el entorno",
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(json),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  // RAW y no USER_ENTERED: así "3001234567" queda como texto y no como el
  // número 3.001.234.567, y la fecha queda tal cual se escribió.
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: RANGO,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          fechaBogota(),
          registro.nombre,
          registro.email,
          registro.celular,
          registro.autorizacion,
        ],
      ],
    },
  });
}

export async function POST(req: Request) {
  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Trampa para bots: el formulario lleva un campo que ningún humano ve. Si
  // llega lleno, se responde OK sin guardar nada, para no darle pistas.
  if (texto(cuerpo["bot-field"])) {
    return NextResponse.json({ ok: true });
  }

  const nombre = texto(cuerpo.nombre);
  const email = texto(cuerpo.email).toLowerCase();
  const celular = texto(cuerpo.celular, 40);
  if (!nombre || !CORREO.test(email) || celular.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const registro: Registro = {
    nombre,
    email,
    celular,
    autorizacion: "sí",
  };

  const configurado =
    !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON && !!process.env.REGISTRO_SHEET_ID;

  if (!configurado && process.env.NODE_ENV !== "production") {
    console.info("[api/registro] Sin hoja configurada; en local se daría por guardado:", registro);
    return NextResponse.json({ ok: true });
  }

  try {
    await guardarEnHoja(registro);
    console.info("[api/registro] Guardado en la hoja:", registro.nombre, registro.email);
  } catch (err) {
    console.error("[api/registro] NO GUARDADO EN LA HOJA:", JSON.stringify(registro), "—", err);
  }

  return NextResponse.json({ ok: true });
}
