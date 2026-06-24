"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

interface FormState {
  nombre: string;
  email: string;
  telefono: string;
}

const EMPTY: FormState = { nombre: "", email: "", telefono: "" };

/**
 * Contacto — formulario VIP minimalista para agendar una presentación privada.
 * Inputs de línea fina, sin ruido, con confirmación elegante al enviar.
 */
export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mockup: sin backend — se simula el envío con un estado de confirmación.
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full flex-col bg-ink scroll-mt-20"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 pt-28 pb-12">
        <Reveal>
          <p className="mb-5 text-center text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/90">
            Presentación privada
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-balance text-center font-serif text-4xl font-extralight leading-[1.1] tracking-tight text-white sm:text-5xl">
            Conozca lo que aún
            <span className="block font-light italic text-shimmer">
              no está a la vista
            </span>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mx-auto mt-5 max-w-md text-center text-sm font-light leading-relaxed tracking-wide text-white/60">
            Agende una cita reservada con nuestro equipo. Atendemos un número
            limitado de clientes por temporada.
          </p>
        </Reveal>

        {sent ? (
          <div className="mt-12 animate-fade-up text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-bronze/50 text-2xl text-champagne">
              ✓
            </div>
            <p className="font-serif text-2xl font-extralight text-white">
              Gracias, {form.nombre || "estimado cliente"}.
            </p>
            <p className="mx-auto mt-3 max-w-sm text-sm font-light leading-relaxed text-white/55">
              Hemos recibido su solicitud. Un asesor de Malecón Business Center
              se pondrá en contacto con usted de forma personal y discreta.
            </p>
            <button
              onClick={() => {
                setForm(EMPTY);
                setSent(false);
              }}
              className="mt-8 text-[0.65rem] font-light uppercase tracking-[0.25em] text-white/40 underline-offset-8 hover:text-champagne hover:underline"
            >
              Enviar otra solicitud
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2"
          >
            <Field
              label="Nombre completo"
              type="text"
              value={form.nombre}
              onChange={handleChange("nombre")}
              autoComplete="name"
              className="sm:col-span-2"
              required
            />
            <Field
              label="Correo electrónico"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              autoComplete="email"
              required
            />
            <Field
              label="Teléfono"
              type="tel"
              value={form.telefono}
              onChange={handleChange("telefono")}
              autoComplete="tel"
              required
            />

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden border border-white/15 py-5 text-[0.7rem] font-light uppercase tracking-[0.3em] text-white/90 transition-colors duration-500 ease-silk hover:border-bronze hover:text-champagne"
              >
                {/* Barrido de relleno al pasar el cursor */}
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-bronze/10 transition-transform duration-700 ease-silk group-hover:translate-x-0"
                />
                <span className="relative z-10">Agendar presentación</span>
                <span className="relative z-10 text-bronze transition-transform duration-500 ease-silk group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Pie */}
      <footer className="border-t border-white/5 px-6 py-6 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-[0.6rem] font-light uppercase tracking-[0.25em] text-white/30 sm:flex-row">
          <span className="font-serif text-sm tracking-[0.3em] text-white/60">
            MALECÓN <span className="text-bronze/70">·</span> BUSINESS CENTER
          </span>
          <span>Zona Norte · Cartagena de Indias · Colombia</span>
          <span>© {new Date().getFullYear()} — Todos los derechos reservados</span>
        </div>
      </footer>
    </section>
  );
}

/* ── Subcomponente: campo de línea fina ── */

interface FieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  className?: string;
  required?: boolean;
}

function Field({
  label,
  type,
  value,
  onChange,
  autoComplete,
  className = "",
  required,
}: FieldProps) {
  return (
    <label className={`group block ${className}`}>
      <span className="mb-3 block text-[0.6rem] font-light uppercase tracking-[0.3em] text-white/40 transition-colors duration-500 group-focus-within:text-amber-400">
        {label}
      </span>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          className="peer w-full border-b border-white/15 bg-transparent pb-3 font-light tracking-wide text-white outline-none placeholder:text-white/20"
        />
        {/* Línea ámbar que se pinta de izquierda a derecha al enfocar */}
        <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-amber-400 transition-all duration-500 ease-silk peer-focus:w-full" />
      </div>
    </label>
  );
}
