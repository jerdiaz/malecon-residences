import ScrollCue from "@/components/ScrollCue";
import Marquee from "@/components/ui/Marquee";

const TICKER_ITEMS = [
  "Zona Norte · Cartagena de Indias",
  "10 Residencias Exclusivas",
  "Frente al Mar Caribe",
  "6 Niveles Boutique",
  "280 m de Playa Privada",
  "Entrega 2026",
];

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Fondo */}
      <div
        className="animate-ken-burns absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=80')",
        }}
      />
      <div className="veil absolute inset-0" />

      {/* Línea decorativa superior */}
      <div className="absolute left-6 right-6 top-24 z-10 h-px bg-white/10 md:left-12 md:right-12" />

      {/* Contenido central */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p
          className="mb-8 animate-fade-in text-[0.65rem] font-light uppercase tracking-[0.45em] text-bronze/90 opacity-0"
          style={{ animationDelay: "0.2s" }}
        >
          Zona Norte · Cartagena de Indias
        </p>

        <h1 className="max-w-5xl text-balance font-serif text-5xl font-extralight leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          <span
            className="block animate-fade-up opacity-0"
            style={{ animationDelay: "0.35s" }}
          >
            Vivir entre el mar
          </span>
          <span
            className="block animate-fade-up opacity-0"
            style={{ animationDelay: "0.6s" }}
          >
            <span className="text-shimmer font-light italic">y el silencio</span>
          </span>
        </h1>

        <p
          className="mt-10 max-w-xl animate-fade-up text-sm font-light leading-relaxed tracking-wide text-white/70 opacity-0 sm:text-base"
          style={{ animationDelay: "0.9s" }}
        >
          Una colección boutique de residencias de súper lujo frente al Mar
          Caribe. Diez unidades irrepetibles. Una sola dirección.
        </p>
      </div>

      <ScrollCue />

      {/* Marquee ticker inferior */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 pb-2 pt-3">
        <Marquee items={TICKER_ITEMS} />
      </div>
    </section>
  );
}
