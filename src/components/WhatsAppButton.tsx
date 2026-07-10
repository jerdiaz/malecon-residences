"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Botón flotante de WhatsApp — fijo abajo a la derecha en toda la página.
// TODO: reemplazar el número por el real (formato internacional, sin "+").
// ─────────────────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "573001234567";
const MESSAGE = "Hola, me interesa Malecón Business Center.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/30 transition-transform duration-300 ease-silk hover:scale-110 md:bottom-8 md:right-8"
    >
      {/* Halo pulsante */}
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40 [animation-duration:2.5s]" />
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="#fff"
        aria-hidden
        className="relative"
      >
        <path d="M12.04 2c-5.5 0-9.97 4.47-9.97 9.97 0 1.76.46 3.48 1.34 5L2 22l5.15-1.35a9.94 9.94 0 0 0 4.89 1.25c5.5 0 9.97-4.47 9.97-9.97S17.54 2 12.04 2zm0 18.2c-1.53 0-3.03-.41-4.34-1.19l-.31-.18-3.06.8.82-2.98-.2-.31a8.22 8.22 0 0 1-1.26-4.37c0-4.55 3.7-8.25 8.25-8.25s8.25 3.7 8.25 8.25-3.7 8.23-8.25 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14 0-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
      </svg>
    </a>
  );
}
