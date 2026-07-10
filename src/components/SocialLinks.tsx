"use client";

// ─────────────────────────────────────────────────────────────────────────────
// REDES SOCIALES Y CONTACTO — reemplaza los href por los enlaces reales.
// Los íconos van en gris tenue y se colorean con el color original de cada red
// al pasar el mouse, enfocar o tocar (hover / focus / active — móvil incluido).
// ─────────────────────────────────────────────────────────────────────────────

const PHONE = "+573001234567"; // TODO: número real de contacto

// Estados que disparan el color de marca (mouse, teclado y toque en móvil).
const ACTIVE = "group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100";

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-6">
      {/* Instagram — degradado original al activar */}
      <a
        href="https://instagram.com/" // TODO: perfil real
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="group relative block text-white/40 transition-colors duration-300"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <defs>
            <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#FEDA75" />
              <stop offset="25%" stopColor="#FA7E1E" />
              <stop offset="50%" stopColor="#D62976" />
              <stop offset="75%" stopColor="#962FBF" />
              <stop offset="100%" stopColor="#4F5BD5" />
            </linearGradient>
          </defs>
          {/* Base monocromática — se desvanece al activar */}
          <g
            stroke="currentColor"
            strokeWidth="1.7"
            fill="none"
            className={`transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 group-active:opacity-0`}
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
          </g>
          {/* Capa a color — aparece al activar */}
          <g
            stroke="url(#ig-grad)"
            strokeWidth="1.7"
            fill="none"
            className={`opacity-0 transition-opacity duration-300 ${ACTIVE}`}
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17" cy="7" r="0.9" fill="url(#ig-grad)" stroke="none" />
          </g>
        </svg>
      </a>

      {/* TikTok — glow cian/magenta original al activar */}
      <a
        href="https://tiktok.com/" // TODO: perfil real
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
        className="group relative block text-white/40 transition-colors duration-300 group-hover:text-white"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          {/* Base monocromática */}
          <path
            fill="currentColor"
            className={`transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 group-active:opacity-0`}
            d="M16.5 2h-2.9v13.6a2.55 2.55 0 1 1-2.55-2.55c.28 0 .56.05.8.13v-2.98a5.6 5.6 0 0 0-.8-.06 5.65 5.65 0 1 0 5.65 5.65V9.2a7.35 7.35 0 0 0 4 1.2V7.4a4.32 4.32 0 0 1-3-1.03A4.32 4.32 0 0 1 16.5 3.4V2Z"
          />
          {/* Capa blanca con glow de marca */}
          <path
            fill="#fff"
            style={{
              filter:
                "drop-shadow(1.4px 0 #25F4EE) drop-shadow(-1.4px 0 #FE2C55)",
            }}
            className={`opacity-0 transition-opacity duration-300 ${ACTIVE}`}
            d="M16.5 2h-2.9v13.6a2.55 2.55 0 1 1-2.55-2.55c.28 0 .56.05.8.13v-2.98a5.6 5.6 0 0 0-.8-.06 5.65 5.65 0 1 0 5.65 5.65V9.2a7.35 7.35 0 0 0 4 1.2V7.4a4.32 4.32 0 0 1-3-1.03A4.32 4.32 0 0 1 16.5 3.4V2Z"
          />
        </svg>
      </a>

      {/* Facebook — azul original al activar */}
      <a
        href="https://facebook.com/" // TODO: perfil real
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="group block text-white/40 transition-colors duration-300 group-hover:text-[#1877F2] hover:text-[#1877F2] focus-visible:text-[#1877F2] active:text-[#1877F2]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
        </svg>
      </a>

      {/* Contacto numérico — verde de llamada al activar */}
      <a
        href={`tel:${PHONE}`}
        aria-label="Llamar"
        className="group block text-white/40 transition-colors duration-300 hover:text-[#22C55E] focus-visible:text-[#22C55E] active:text-[#22C55E]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.28-.28.68-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1A17 17 0 0 1 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58.12.34.04.74-.24 1.02L6.6 10.8Z" />
        </svg>
      </a>
    </div>
  );
}
