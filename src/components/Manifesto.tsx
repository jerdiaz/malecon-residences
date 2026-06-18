import Reveal from "@/components/ui/Reveal";

/**
 * Manifiesto — sección de máximo "whitespace". Un texto sobrio y poético
 * sobre habitar el umbral entre el Caribe y la calma de la Zona Norte.
 */
export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative flex h-screen w-full snap-start items-center justify-center bg-ink px-6 pt-24"
    >
      {/* Acento tipográfico tenue de fondo */}
      <span
        aria-hidden
        className="pointer-events-none absolute select-none font-serif text-[28rem] font-extralight leading-none text-white/[0.015]"
      >
        N
      </span>

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="mb-12 text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/80">
            La filosofía
          </p>
        </Reveal>

        <Reveal delay={150}>
          <p className="text-balance font-serif text-2xl font-extralight leading-[1.6] tracking-wide text-white/90 sm:text-3xl md:text-4xl md:leading-[1.55]">
            Hay un lugar donde el mar deja de ser paisaje
            <span className="text-champagne"> y se vuelve rutina</span>. Donde el
            amanecer no se contempla: se habita.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mx-auto my-12 h-px w-16 bg-bronze/40" />
          <p className="mx-auto max-w-xl text-sm font-light leading-loose tracking-wide text-white/55 sm:text-base">
            En la Zona Norte de Cartagena, entre la brisa del Caribe y la quietud
            de la ciénaga, concebimos un refugio para quienes entienden que el
            lujo verdadero es el silencio, el espacio y el tiempo. Malecón
            Residences no es un edificio: es una forma de estar en el mundo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
