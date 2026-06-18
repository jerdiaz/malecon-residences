"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

interface Amenity {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
}

const AMENITIES: Amenity[] = [
  {
    id: "pool",
    label: "Rooftop Infinity Pool",
    title: "Una lámina de agua sobre el Caribe",
    description:
      "En la cubierta, la piscina infinita disuelve el horizonte. El borde desaparece y el mar parece comenzar entre tus manos, mientras la ciudad antigua se enciende en la distancia.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "beach",
    label: "Private Beach Club",
    title: "Arena privada, ritmo propio",
    description:
      "Un club de playa exclusivo para residentes: cabañas de lino, servicio discreto y acceso directo a la orilla. El privilegio de un Caribe sin multitudes.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "spa",
    label: "Wellness Spa",
    title: "El cuerpo en pausa",
    description:
      "Un santuario de piedra, agua y penumbra. Circuitos termales, salas de tratamiento y una arquitectura pensada para el reposo absoluto de los sentidos.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "lounge",
    label: "VIP Lounge",
    title: "El arte de recibir",
    description:
      "Un salón privado de techos altos y materiales nobles para reuniones íntimas, catas y veladas. Hospitalidad curada, lejos de cualquier mirada.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80",
  },
];

/**
 * Galería de amenidades por pestañas. Al cambiar de tab, la imagen de fondo
 * realiza un fundido cruzado y el texto se reanima con un sutil fade-up.
 */
export default function Amenities() {
  const [active, setActive] = useState(0);
  const current = AMENITIES[active];

  return (
    <section
      id="amenities"
      className="relative h-screen w-full snap-start overflow-hidden bg-ink"
    >
      {/* Capas de fondo con fundido cruzado */}
      {AMENITIES.map((a, i) => (
        <div
          key={a.id}
          aria-hidden={i !== active}
          className={`animate-ken-burns absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-silk ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${a.image}')` }}
        />
      ))}
      <div className="veil absolute inset-0" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 md:px-12 md:pb-28">
        <Reveal>
          <p className="mb-10 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/90">
            Amenidades · La experiencia
          </p>
        </Reveal>

        <div className="max-w-2xl">
          {/* key fuerza el re-montaje para reanimar el texto */}
          <div key={current.id} className="animate-fade-up">
            <h2 className="text-balance font-serif text-4xl font-extralight leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              {current.title}
            </h2>
            <p className="mt-6 max-w-xl text-sm font-light leading-relaxed tracking-wide text-white/70 sm:text-base">
              {current.description}
            </p>
          </div>
        </div>

        {/* Pestañas */}
        <Reveal delay={200} className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-8">
          {AMENITIES.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setActive(i)}
              className={`group relative text-left text-xs font-light uppercase tracking-[0.2em] transition-colors duration-500 sm:text-sm ${
                i === active ? "text-champagne" : "text-white/45 hover:text-white/80"
              }`}
            >
              <span className="mr-3 font-serif text-[0.7rem] tabular-nums opacity-60">
                0{i + 1}
              </span>
              {a.label}
              <span
                className={`absolute -bottom-3 left-0 h-px bg-bronze transition-all duration-500 ease-silk ${
                  i === active ? "w-full" : "w-0 group-hover:w-1/2"
                }`}
              />
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
