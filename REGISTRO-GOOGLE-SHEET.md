# Registro de la puerta de entrada → Google Sheets

La puerta de registro del sitio (`src/components/RegistroGate.tsx`) envía
nombre, correo y celular a `/api/registro`, y esa ruta agrega una fila a una
hoja de Google con la API de Sheets y una cuenta de servicio. Es el mismo
esquema que usa tooli-chatbot para sus registros, con la misma cuenta de
servicio.

Es una solución "por ahora": el cliente va a usar un CRM más adelante. Ese
día se cambia `guardarEnHoja` en `src/app/api/registro/route.ts` y nada más.

## Estado actual (15 de septiembre de 2026)

Todo lo de abajo ya está hecho. Queda como referencia para rehacerlo o para
mover el registro a otra hoja.

- **Hoja:** [MaleconBusinessDB](https://docs.google.com/spreadsheets/d/1ro8jEzTdUfnPohlEZJgUY1iQW03AUXTieLgum0ntyck/edit),
  dueño `estebanmanuel600@gmail.com`, compartida como editor con la cuenta de
  servicio. Pestaña `Registros`, encabezados y zona horaria Bogotá
  configurados por API. (Hubo una columna "Origen" con la página desde la
  que se registraba; se quitó el mismo día por pedido del cliente.)
- **VPS:** `/home/ubuntu/malecon-residences/.env` con las dos variables,
  permisos `600`. Probado: la ruta en modo producción escribe en la hoja.
- **Pendiente:** el código de la puerta llega al VPS con el próximo push a
  `main` (el workflow instala `googleapis` y recompila).

## 1. Crear la hoja

1. Entra a [sheets.new](https://sheets.new) con la cuenta de Google que va a
   ser dueña de los registros (idealmente una cuenta de la empresa, no
   personal: si la persona se va, los registros se quedan).
2. Ponle nombre, por ejemplo **Registros Malecón Business Center**.
3. Renombra la primera pestaña (abajo a la izquierda, "Hoja 1") a
   **Registros** — exactamente así, con mayúscula. La ruta escribe en
   `Registros!A:E`; si la pestaña se llama distinto, la API responde
   "Unable to parse range" y nada se guarda.
4. En la fila 1 escribe los encabezados, una columna cada uno:

   | A | B | C | D | E |
   |---|---|---|---|---|
   | Fecha | Nombre | Correo | Celular | Autorización de datos |

   Opcional: negrita y *Ver → Inmovilizar → 1 fila*.

## 2. Compartir la hoja con la cuenta de servicio

Botón **Compartir** (arriba a la derecha) y agregar como **Editor**:

```
tooli-sheets-reader@crucial-minutia-489517-c8.iam.gserviceaccount.com
```

Es la cuenta de servicio que ya usa tooli-chatbot. Desmarca "Notificar" si
aparece; a esa dirección no le llega correo. Sin este paso la API responde
403 y nada se guarda.

## 3. Copiar el ID de la hoja

Es el tramo largo de la URL, entre `/d/` y `/edit`:

```
https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz0123456789/edit
                                      └──────────── este es el ID ────────────┘
```

## 4. Variables de entorno en el VPS

La ruta lee dos variables:

- `GOOGLE_SERVICE_ACCOUNT_JSON` — el JSON de la cuenta de servicio en **una
  sola línea**. Es el mismo valor que tiene tooli-chatbot en su `.env`; se
  copia tal cual.
- `REGISTRO_SHEET_ID` — el ID del paso 3.

Van en un archivo `.env` en la carpeta de la app en el VPS (la que usa
`deploy.yml`, `VPS_APP_PATH`). Next lo lee solo al arrancar; no hay que
tocar PM2 ni el workflow. El archivo está en `.gitignore`, así que el
`git reset --hard` de cada despliegue no lo toca.

```bash
cd "$VPS_APP_PATH"
cat > .env <<'EOF'
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"crucial-minutia-489517-c8",...}
REGISTRO_SHEET_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz0123456789
EOF
chmod 600 .env
pm2 restart malecon
```

Con `chmod 600` solo el usuario del servidor puede leer el archivo: el JSON
contiene una llave privada.

**En local** no hace falta nada: sin las variables, la ruta imprime el
registro en la consola del servidor de desarrollo y responde OK, para poder
probar la puerta sin tocar la hoja. Si quieres probar contra la hoja real,
crea un `.env.local` con las dos variables (ver `.env.example`); también
está en `.gitignore`.

## 5. Probar

Entra al sitio en una ventana de incógnito, llena la puerta y envía. En la
hoja debe aparecer la fila en unos segundos, con la fecha en hora de Bogotá.

Si no aparece, el visitante igual entra (ver "Qué pasa si falla") y el
motivo está en el log:

```bash
pm2 logs malecon --lines 100 | grep "api/registro"
```

- `Falta GOOGLE_SERVICE_ACCOUNT_JSON o REGISTRO_SHEET_ID` → paso 4.
- `Unable to parse range` → la pestaña no se llama `Registros` (paso 1.3).
- `The caller does not have permission` (403) → la hoja no está compartida
  con la cuenta de servicio (paso 2).
- `Requested entity was not found` (404) → el ID está mal (paso 3).

## Qué pasa si falla

La ruta **nunca le cierra la puerta al visitante** por un problema nuestro.
Si falta la configuración o la API de Google no responde, escribe el
registro completo en el log con el prefijo `NO GUARDADO EN LA HOJA` y deja
pasar. Un registro en el log se recupera; un visitante que vio un error y se
fue, no.

Para recuperar registros que hayan caído ahí:

```bash
pm2 logs malecon --lines 5000 --nostream | grep "NO GUARDADO EN LA HOJA"
```

Cada línea trae el registro en JSON. PM2 rota los logs; conviene revisar
esto después del primer despliegue y cada vez que se cambie algo de la hoja.

## Qué guarda cada fila

| Columna | Contenido |
|---|---|
| Fecha | `15/09/2026, 20:03`, hora de Bogotá |
| Nombre | Tal como lo escribió la persona |
| Correo | En minúsculas |
| Celular | Tal como lo escribió, guardado como texto (no lo convierte en número) |
| Autorización de datos | Siempre "sí": la casilla es obligatoria para enviar |

No hay eliminación de duplicados: si alguien se registra dos veces desde dos
navegadores, salen dos filas. Se depura en la hoja o lo hará el CRM.
