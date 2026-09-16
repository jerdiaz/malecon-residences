"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

/**
 * Puerta de registro — pedido del cliente del 15 de septiembre: la página
 * arranca oculta y solo se ve completa después de dejar nombre, correo y
 * celular.
 *
 * Cómo funciona
 * ─────────────
 * · Es una capa fija y opaca por encima de todo (z-100: sobre el navbar, el
 *   mega menú, el visor de plantas y el grano). Debajo la página se renderiza
 *   igual que siempre: Google y las redes siguen leyendo el HTML completo,
 *   así que el SEO y las previsualizaciones al compartir no cambian. Lo que
 *   se oculta es la vista, no el contenido.
 * · Al registrarse se guarda una marca en localStorage y la puerta no vuelve
 *   a salir en ese navegador. Borrar los datos del sitio la reactiva.
 * · Para que a quien ya se registró no le parpadee la puerta en cada visita,
 *   un script en línea lee la marca ANTES de que React arranque y pone
 *   `data-registrado` en <html>; globals.css oculta la puerta con ese
 *   atributo. Si el script no corre (JS deshabilitado), la puerta se queda
 *   cerrada: es el lado seguro, la página nunca se muestra sin registro.
 *
 * A dónde van los datos
 * ─────────────────────
 * A /api/registro (src/app/api/registro/route.ts), que los anota en una hoja
 * de Google. Este componente no sabe nada de la hoja: cuando el registro
 * pase al CRM, cambia la ruta y este archivo queda igual. En desarrollo, sin
 * la hoja configurada, la ruta imprime el registro en la consola del
 * servidor y responde OK. (El formulario de Contacto sigue sin enviar a
 * ninguna parte; ver la nota en Contact.tsx.)
 *
 * La casilla de autorización no estaba en el pedido, pero es obligatoria: la
 * Ley 1581 de 2012 exige consentimiento previo y expreso para tratar datos
 * personales en Colombia. Debería enlazar a la política de tratamiento de
 * datos, que hoy no existe (ver la misma nota en Contact.tsx).
 */

const CLAVE = "mbc-registro";

/** Corre antes de la hidratación. Ver la nota de arriba. */
const SCRIPT_SIN_PARPADEO = `try{if(localStorage.getItem(${JSON.stringify(CLAVE)}))document.documentElement.setAttribute("data-registrado","")}catch(e){}`;

interface Datos {
  nombre: string;
  email: string;
  celular: string;
}

const VACIO: Datos = { nombre: "", email: "", celular: "" };

export default function RegistroGate() {
  // "abierto" en el servidor y en la primera pintura: la página nunca se
  // muestra sin pasar por aquí. El efecto de abajo la cierra si ya hay marca.
  const [abierto, setAbierto] = useState(true);
  const [datos, setDatos] = useState<Datos>(VACIO);
  const [autoriza, setAutoriza] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(CLAVE)) setAbierto(false);
    } catch {
      // Sin localStorage (modo privado estricto) la puerta se queda; se
      // puede registrar igual, solo que volverá a salir la próxima vez.
    }
  }, []);

  // Sin scroll de fondo mientras la puerta está puesta.
  useEffect(() => {
    if (!abierto) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  const cambiar =
    (campo: keyof Datos) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setDatos((prev) => ({ ...prev, [campo]: e.target.value }));

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);
    setError(null);

    // El cuerpo sale del formulario tal cual, no de `datos`: así viaja
    // también la trampa para bots (vacía, si es un humano) y los `name` de
    // los inputs son los que la ruta espera.
    const cuerpo: Record<string, string> = {};
    new FormData(e.currentTarget as HTMLFormElement).forEach((v, k) => {
      cuerpo[k] = String(v);
    });

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      try {
        localStorage.setItem(CLAVE, new Date().toISOString());
      } catch {
        // Ver el comentario del efecto de arriba.
      }
      setAbierto(false);
    } catch {
      setError(
        "No pudimos guardar tu registro. Revisa tu conexión e inténtalo de nuevo.",
      );
      setEnviando(false);
    }
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT_SIN_PARPADEO }} />
      <AnimatePresence>
        {abierto && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="registro-titulo"
            data-registro-gate
            // `initial={false}`: nada de entrada, la puerta ya está puesta
            // cuando llega la primera pintura. Solo se anima la salida.
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex overflow-y-auto bg-ink"
          >
            {/* Un resplandor suave en el centro, para que el fondo no sea una
                plancha. En el azul de marca, nunca en negro. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgb(30_50_83_/_0.55),_transparent_65%)]"
            />

            {/* `m-auto` y no `items-center` en el padre: centra cuando sobra
                sitio y, cuando el formulario es más alto que la pantalla
                (móvil apaisado, teclado abierto), lo apoya arriba y deja
                hacer scroll. Con `items-center` la parte de arriba se salía
                por el borde y no había forma de llegar a ella. */}
            <div className="relative m-auto w-full max-w-xl px-6 py-14 text-center sm:px-10">
              <Logo variant="stacked" className="mx-auto h-20 md:h-24" priority />

              <p className="mt-10 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze">
                Invitación privada
              </p>

              {/* h2 y no h1: el h1 de la página es el del hero, y este
                  título no debe competir con él en el esquema del documento. */}
              <h2
                id="registro-titulo"
                className="mt-5 text-balance font-serif text-3xl font-extralight leading-[1.15] tracking-tight text-white sm:text-4xl md:text-[2.75rem]"
              >
                ¿Quieres conocer el nuevo ícono corporativo de la ciudad de
                Cartagena?
              </h2>

              <p className="mx-auto mt-5 max-w-md text-sm font-normal leading-relaxed text-cuerpo">
                Regístrate y sé parte del grupo exclusivo que tendrá el
                privilegio de descubrirlo antes que nadie.
              </p>

              <form
                onSubmit={enviar}
                className="mt-10 grid grid-cols-1 gap-7 text-left sm:grid-cols-2"
              >
                {/* Trampa para bots: un humano nunca la ve ni la llena. Si
                    llega con contenido, la ruta descarta el envío. */}
                <input
                  type="text"
                  name="bot-field"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden
                />

                <Campo
                  label="Nombre completo"
                  type="text"
                  name="nombre"
                  value={datos.nombre}
                  onChange={cambiar("nombre")}
                  autoComplete="name"
                  className="sm:col-span-2"
                />
                <Campo
                  label="Correo electrónico"
                  type="email"
                  name="email"
                  value={datos.email}
                  onChange={cambiar("email")}
                  autoComplete="email"
                />
                <Campo
                  label="Celular"
                  type="tel"
                  name="celular"
                  value={datos.celular}
                  onChange={cambiar("celular")}
                  autoComplete="tel"
                  inputMode="tel"
                />

                <label className="flex cursor-pointer items-start gap-3 sm:col-span-2">
                  <input
                    type="checkbox"
                    name="autorizacion"
                    value="sí"
                    checked={autoriza}
                    onChange={(e) => setAutoriza(e.target.checked)}
                    required
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer accent-bronze"
                  />
                  <span className="text-xs font-light leading-relaxed text-apoyo">
                    Autorizo a Malecón Business Center el tratamiento de mis
                    datos personales para recibir información sobre el
                    proyecto.
                  </span>
                </label>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={enviando}
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden border border-white/15 py-5 text-[0.7rem] font-light uppercase tracking-[0.3em] text-white/90 transition-colors duration-500 ease-silk hover:border-bronze hover:text-champagne disabled:cursor-wait disabled:opacity-60"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -translate-x-full bg-bronze/10 transition-transform duration-700 ease-silk group-hover:translate-x-0"
                    />
                    <span className="relative z-10">
                      {enviando ? "Registrando…" : "Quiero descubrirlo"}
                    </span>
                    <span className="relative z-10 text-bronze transition-transform duration-500 ease-silk group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                  {error && (
                    <p
                      role="alert"
                      className="mt-4 text-center text-xs font-light leading-relaxed text-champagne"
                    >
                      {error}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Campo de línea fina — el mismo dibujo que los de Contacto ──
   Copiado y no importado: el de Contact.tsx es privado de ese archivo, y
   sacarlo a ui/ tocaba un componente con cambios pendientes de otra tarea. */

interface CampoProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  className?: string;
}

function Campo({
  label,
  type,
  name,
  value,
  onChange,
  autoComplete,
  inputMode,
  className = "",
}: CampoProps) {
  return (
    <label className={`group block ${className}`}>
      <span className="mb-3 block text-[0.6rem] font-light uppercase tracking-[0.3em] text-apoyo transition-colors duration-500 group-focus-within:text-amber-400">
        {label}
      </span>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          inputMode={inputMode}
          required
          className="peer w-full border-b border-white/15 bg-transparent pb-3 font-light tracking-wide text-white outline-none placeholder:text-white/20"
        />
        <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-amber-400 transition-all duration-500 ease-silk peer-focus:w-full" />
      </div>
    </label>
  );
}
