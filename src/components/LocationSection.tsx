import { CONTACT } from "@/lib/contact";

// Reemplazan a la grilla de "Distancias clave", que anunciaba minutos y
// kilómetros que nadie había verificado. Esta lista la entregó el cliente y
// no trae tiempos: se listan los destinos, sin inventar la distancia.
//
// Actualizada contra "Conectividad que impulsa los negocios" (página 8 del
// brochure, la misma que ilustra el tab Conexiones): esa versión nombra los
// centros comerciales y separa Zona Portuaria de Zonas Francas, esta lista
// los tenía agrupados.
const CONEXIONES = [
  "Aeropuerto Internacional Rafael Núñez",
  "Centro Histórico",
  "Zona Norte con conexión a Barranquilla",
  "Zona Portuaria",
  "Zonas Francas",
  "Zona Hotelera",
  "Centros de Convenciones: Cartagena de Indias y Las Américas",
  "Centros Comerciales: La Serrezuela, Mall Plaza, Plaza Bocagrande, Nao",
  "Clínica Serena del Mar y Centro Comercial Las Ramblas",
];

// Mapa de conexiones — página 8 del brochure. Primero solo había una captura
// de WhatsApp del cliente (de ahí salió un recorte en WebP); después llegó el
// SVG real ("Portafolio MBC - Pág 8 Mapa.svg") y este es ese archivo, recortado
// a solo el panel del mapa cambiando el viewBox (sin tocar el contenido, así
// no se pierde nada) — el título, los párrafos y la lista de abajo ya son
// texto real en la columna izquierda, incluirlos otra vez habría sido
// redundante. Se le quitaron dos imágenes incrustadas que no se veían en la
// página (11MB → 354KB): una con una ruta rota a un archivo del cliente que
// no existe aquí, y otra que su propio clipPath dejaba fuera del área
// visible.
//
// En el diseño original el AGUA era la que no tenía relleno (se apoyaba en el
// fondo blanco de la página del brochure) y la tierra iba en un azul grisáceo
// — o sea, al revés de lo que se espera de un mapa. El cliente lo pidió
// invertido el 14 de septiembre, así que ahora el SVG pinta su propio mar y
// la tierra va en la crema del brochure.
//
// El panel de abajo repite ese mismo azul como fondo: el mapa se sirve con
// object-contain y sin esto el sobrante de los lados quedaría blanco,
// recortando el mar con un borde que no existe.
const MAPA_MAR = "#6ea9d2";
const MAPA_CONEXIONES_SRC = "/images/ubicacion/mapa-conexiones.svg";

export default function LocationSection() {
  return (
    <section
      id="ubicacion"
      className="relative min-h-pantalla w-full bg-ink scroll-mt-16"
    >
      {/* El mapa se lleva mas ancho que el texto: es el contenido de la
            seccion y su proporcion es vertical, asi que en pantallas altas
            el ancho de columna es lo que le pone techo al tamano. 43/57 deja
            la columna de texto en una medida de lectura comoda. */}
        <div className="grid min-h-pantalla grid-cols-1 items-stretch lg:grid-cols-[minmax(0,43fr)_minmax(0,57fr)]">

        {/* ── Columna de texto ── */}
        <div className="flex flex-col justify-center px-8 py-28 lg:px-16 xl:px-24">
          <p className="antetitulo mb-6 text-bronze">
            La ubicación
          </p>

          <h2 className="titulo-seccion mb-8 text-white">
            ¿Por qué elegir un centro de negocios en Cartagena?
          </h2>

          <p className="max-w-md text-sm font-normal leading-relaxed text-cuerpo sm:text-base">
            La ubicación de Malecón Business Center ofrece conexión directa
            con los principales centros financieros, turísticos, logísticos e
            industriales de Cartagena, convirtiéndolo en un punto estratégico
            para empresas y profesionales.
          </p>

          <p className="mt-4 max-w-md text-sm font-normal leading-relaxed text-cuerpo sm:text-base">
            Ubicado frente al mar, sobre la Avenida Santander, el proyecto
            combina conectividad, visibilidad y acceso a las principales zonas
            de la ciudad, fortaleciendo el posicionamiento de las empresas que
            eligen establecerse en Malecón Business Center Cartagena.
          </p>

          {/* Conexiones estratégicas — lista de filas con filete, el mismo
              idioma que usan Plantas y la galería. Se probó a dos columnas y
              a 1024px cada celda quedaba de 168px: cuatro y cinco renglones
              por destino, con filas de alturas dispares. El filete de cierre
              va en el contenedor: cada fila solo lleva el de arriba. */}
          <div className="mt-10 max-w-lg">
            <p className="rotulo mb-5 text-bronze">
              Conexiones estratégicas
            </p>
            <div className="border-b border-white/10">
              {CONEXIONES.map((lugar, i) => (
                <div
                  key={lugar}
                  className="flex items-baseline gap-4 border-t border-white/10 py-2.5"
                >
                  <span className="font-serif text-[0.7rem] tabular-nums text-bronze/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.7rem] font-normal uppercase leading-relaxed tracking-[0.12em] text-cuerpo">
                    {lugar}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dirección del proyecto + Google Maps */}
          <div className="mt-10">
            <p className="rotulo mb-4 text-bronze">
              Ubicación
            </p>
            <p className="font-serif text-xl font-light leading-snug text-champagne">
              Malecón Business Center
            </p>
            <p className="mt-2 text-sm font-light leading-relaxed tracking-wide text-apoyo">
              {CONTACT.projectStreet}
              <br />
              {CONTACT.projectCity}
            </p>
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-4 border border-white/20 px-8 py-4 text-[0.7rem] font-light uppercase tracking-[0.25em] text-white/80 transition-all duration-500 ease-silk hover:border-bronze hover:text-champagne"
            >
              Ver en Google Maps
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        {/* ── Columna derecha: mapa de conexiones (página 8 del brochure) ──
            Antes había tabs (Foto aérea / Google Maps / Conexiones); el
            cliente pidió dejar solo el diseño de Conexiones. El iframe de
            Google Maps ya no se usa en ningún lado. La foto aérea
            (public/images/lote/terreno-aereo.jpg) queda sin referenciar en
            el código — el archivo sigue en public/ por si se necesita
            recuperar este panel.
            Mismo criterio de tamaño que tenían los otros paneles: en móvil
            aspect-[16/9], en escritorio se sangra de lado a lado y queda
            pegajoso (sticky) para acompañar la lectura de la lista. Es una
            infografía vectorial, no una foto: los pines y la leyenda no
            pueden recortarse (object-contain, no object-cover), y el fondo
            del panel repite el azul del mar del propio SVG para que el
            sobrante no se vea como un borde — ver la nota junto a
            MAPA_CONEXIONES_SRC. Se sirve con <img>, no con next/image: es
            un SVG y next/image no lo optimiza, con fill perdería el
            vector. */}
        <div
          className="relative aspect-[16/9] w-full overflow-hidden lg:aspect-auto lg:sticky lg:top-16 lg:h-pantalla"
          style={{ backgroundColor: MAPA_MAR }}
        >
          {/* Ya no hace falta reservarle sitio a la barra con relleno: el panel
              se pega en `lg:top-16`, o sea POR DEBAJO de ella, y mide
              `lg:h-pantalla` —la ventana menos esos mismos 4rem—. El hueco que
              queda es exactamente el visible, así que el mapa lo puede llenar
              entero.

              Antes se reservaban 133px por arriba. Ese número es el alto de la
              barra en su estado ALTO, el del hero; mientras este panel está
              pegado la barra siempre está en su estado compacto, que mide 71px
              —medido en cinco puntos a lo largo de la sección—. Reservar 133
              costaba unos 60px de alto de mapa, que en ventanas de 900px es
              justo lo que le pone techo.

              Queda un relleno mínimo para que el mapa no apoye en los bordes y
              se lea como cortado. Solo desde lg, que es donde el panel es
              pegajoso; en móvil va en flujo normal y la barra no lo pisa. */}
          <div className="absolute inset-0 flex items-center justify-center p-4 lg:px-4 lg:py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MAPA_CONEXIONES_SRC}
              alt="Mapa de conectividad de Malecón Business Center con la zona hotelera, zonas francas, centros comerciales, centros de convención y zonas residenciales cercanas"
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
