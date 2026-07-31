interface LogoProps {
  /** true = el segundo renglón se ilumina cuando el contenedor padre (con clase "group") recibe hover */
  hoverEffect?: boolean;
}

export default function Logo({ hoverEffect = false }: LogoProps) {
  return (
    <>
      <span className="font-serif text-xl font-light tracking-[0.3em] text-white">
        MALECÓN
      </span>
      <span
        className={`mt-1 text-[0.6rem] font-light uppercase tracking-[0.45em] text-bronze/80 ${
          hoverEffect ? "transition-colors group-hover:text-champagne" : ""
        }`}
      >
        Business Center
      </span>
    </>
  );
}
