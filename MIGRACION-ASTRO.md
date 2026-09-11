# Migración a Astro — plan de implementación

Evaluado el 2026-09-11 sobre el estado real del repo. No es una guía genérica:
los números salen de medir este código.

**Veredicto: viable, pero no todavía.** Este documento dice qué hay que tener
listo antes, cómo hacerla, y —más importante— en qué situaciones NO se debe
hacer.

---

## 1. Por qué tiene sentido considerarla

Dos problemas concretos que Astro resuelve por diseño.

### El sitio no necesita un servidor, pero depende de uno

Las 44 páginas se generan al compilar. El build no reporta **ninguna** ruta
dinámica: todo es `○ Static` o `● SSG`. Aun así se sirve con Next corriendo
como proceso Node bajo PM2 detrás de nginx. Si PM2 se cae, el sitio se cae.

Astro emite archivos que nginx sirve directo. Sin proceso, sin PM2.

### La caché de imágenes puede volver a desfasarse

El 2026-09-10 producción sirvió durante semanas renders que ya se habían
retirado del repo: 7 de cada 10 exteriores. La causa es que el optimizador de
Next cachea por *ruta + ancho + calidad* — **el contenido del archivo no entra
en la clave**— y `next.config.mjs` fija esa caché en un año.

Se parchó limpiando la caché en cada despliegue (ver `.github/workflows/deploy.yml`),
pero es un parche: la clase de error sigue existiendo.

`astro:assets` optimiza al compilar y escribe nombres con hash del contenido.
Si el render cambia, cambia el nombre. El problema deja de ser posible.

---

## 2. Por qué NO conviene hacerla hoy

### El ahorro de JavaScript sería marginal

El argumento de venta de Astro es "cero JavaScript salvo en islas". Medido
aquí, **27 de 39 archivos `.tsx` son componentes de cliente**. Casi todo sería
isla, así que enviarías React igual, más el runtime de Astro.

### Pero ese 27 está inflado, y ese es el hallazgo importante

Diez de esos componentes **no tienen ninguna interactividad propia**:

| Componente | Por qué es de cliente |
|---|---|
| Aliados, Amenidades, AmenidadesTexto, MapaConectividad, Ubicacion | importan `Reveal` |
| Partners | importa `Reveal` y `Marquee` |
| SocialLinks, WhatsAppButton, Marquee | ninguna razón — es marcado puro |

`Reveal` —47 líneas, framer-motion— envuelve **13 archivos**. Como es
componente de cliente, todo lo que lo importa se vuelve cliente. Es el vector
de contagio de casi toda la página.

**Consecuencia:** la superficie real de islas es mucho menor de lo que sugiere
el 27, y se puede reducir *sin migrar nada*. Ver el paso 0.

### El costo caro no es el código, es la reverificación

Buena parte de este sitio son valores afinados midiendo, no eligiendo:

- Las paradas del degradado del velo del hero (0.46 / 0.39 / 0 al 30%),
  calculadas fotograma a fotograma sobre el video
- La escala de cada plano en `src/lib/plantas.ts`, ajustada uno por uno
- El `sizes="165vh"` de los paneles verticales, que nace de que con
  `object-cover` el recorte lo manda el alto y no el ancho
- Los tres roles de texto (72 / 60 / 80%), con el techo puesto en 72 porque
  arriba de ahí el cuerpo brilla más que el champaña de los acentos
- El recorte de cada render en su sección

Migrar reabre todos esos valores para volver a comprobarlos. Es el grueso del
trabajo, y no se ve en ningún diff.

---

## 3. Qué debe estar listo ANTES de migrar

Cada punto es bloqueante. Sin ellos la migración es una mala idea aunque el
código esté listo.

### 3.1 Las tres vías de contacto tienen que funcionar

Hoy el formulario descarta los datos, el botón de WhatsApp abre un chat con un
número inexistente y las redes apuntan a dominios pelados. Ver
`SEO-PENDIENTES.md`.

**Por qué bloquea:** migrar no mueve ninguna de esas agujas. Dedicar semanas a
cambiar de framework mientras el sitio no puede recibir un solo prospecto es
invertir donde no duele.

### 3.2 Google Search Console creado y con al menos un mes de datos

**Por qué bloquea:** una migración cambia el HTML de todas las páginas. Sin una
línea base de indexación y posiciones, si el tráfico cae después no hay forma
de saber si fue la migración o cualquier otra cosa. Estarías volando a ciegas
sobre un cambio que toca las 44 páginas a la vez.

### 3.3 Las versiones de cada sección, decididas

En el repo conviven alternativas sin resolver: `Amenidades` / `AmenidadesTexto`
/ `Amenities`, `Aliados` / `AliadosAlt`, `LocationSection` / `Ubicacion`, más
tres rutas `preview-*`. Son **698 líneas** —604 en componentes
y 94 en las rutas de prueba— que quizá no lleguen a la versión final.

**Por qué bloquea:** migrar código que se va a borrar es trabajo tirado, y
duplica la superficie a reverificar.

### 3.4 El paso 0 ejecutado y en producción

Ver la sección 4. Es trabajo que vale la pena **aunque nunca se migre**.

### 3.5 Acuerdo con quien más toca el repo

Hay otra persona subiendo cambios a `main` casi a diario. Una migración
congela ese trabajo o genera conflictos imposibles de resolver a mano.

**Requisito:** una ventana acordada en la que nadie más toque `main`, o la
migración en una rama con fecha de corte clara.

---

## 4. Paso 0 — lo que conviene hacer ya, se migre o no

Este bloque no es parte de la migración: **es trabajo que paga solo**, reduce
el bundle actual, y de paso deja la superficie de islas medida y pequeña.

### 4.1 Sacar `Reveal` de framer-motion

Reemplazar las 47 líneas de `src/components/ui/Reveal.tsx` por animación de
scroll en CSS (`animation-timeline: view()`, con `IntersectionObserver` como
respaldo en navegadores que no lo soporten).

**Efecto inmediato:** los 13 archivos que lo importan dejan de arrastrarse al
cliente. framer-motion baja de 6 usos a 3 (`MegaMenu`, `Plantas`, `StoryBlock`
y `SplitWords`).

**Efecto sobre la migración:** esos componentes pasan a ser `.astro` planos en
vez de islas.

### 4.2 Quitar `"use client"` donde no hace falta

Después de 4.1, revisar uno por uno. `SocialLinks`, `WhatsAppButton` y
`Marquee` no lo necesitan hoy mismo.

### 4.3 Poner hash de contenido en los nombres de los renders

`acceso-vehicular.webp` → `acceso-vehicular.a3f9c1.webp`, generado por script
desde el archivo fuente, con `src/lib/renders.ts` y `src/lib/blur.ts`
actualizados en el mismo paso.

**Efecto:** cierra estructuralmente el bug de la caché, sin depender de que el
despliegue limpie nada. Es el beneficio principal de Astro, conseguido sin
Astro.

### 4.4 Medir la línea base

Antes de tocar nada, guardar: peso del bundle por ruta, PageSpeed de la home y
de una ficha, y una captura de cada sección a 1920 y a 375. Sin eso no hay
forma de afirmar que la migración no rompió nada.

---

## 5. Plan de migración

Solo después de que la sección 3 esté completa.

### Fase 1 — Andamiaje (1-2 días)

- Proyecto Astro nuevo en una rama, con `@astrojs/react` y `@astrojs/tailwind`
- Copiar `tailwind.config.ts` tal cual: la paleta (`ink`, `ink-950`, `cuerpo`,
  `apoyo`, `sobrefoto`, `champagne`, `bronze`) y las utilidades propias
- Copiar `src/app/globals.css`: el velo, `.type-halo`, `.type-halo-strong`,
  las animaciones
- Portar las fuentes: `next/font/google` → `@fontsource` o la etiqueta `<link>`
  de Google Fonts. Ojo con `display: swap` y con los pesos que se usan
  (Cormorant Garamond 300/400/500, Jost 200/300/400/500)

### Fase 2 — Contenido estático (2-3 días)

Portar a `.astro` puro, sin React:

- `src/lib/*` migra tal cual — es TypeScript sin dependencias de Next
- Las secciones que el paso 0 dejó sin estado
- `StoryBlock`, con su prop `imageAlt`

### Fase 3 — Islas (3-5 días)

Solo lo que de verdad necesita JavaScript, con la directiva más barata que
sirva:

| Componente | Directiva sugerida | Nota |
|---|---|---|
| `Navbar` + `MegaMenu` | `client:load` | se ve desde el primer momento |
| `Hero` | `client:load` | maneja la carga diferida del video |
| `RendersGallery` | `client:visible` | carrusel con auto-avance |
| `Plantas` | `client:visible` | el más complejo, 394 líneas |
| `Pillars` | `client:visible` | acordeón |
| `Contact` | `client:visible` | formulario |
| `ScrollProgress`, `SectionNav`, `CustomCursor` | `client:idle` | adorno |

### Fase 4 — SEO (1-2 días)

Es la fase que más fácil se subestima. Todo lo de septiembre hay que rehacerlo
con otras APIs:

| Hoy en Next | En Astro |
|---|---|
| `metadata` y `generateMetadata` | etiquetas en el layout, o `astro-seo` |
| `src/app/sitemap.ts` (35 URL, 70 imágenes) | `@astrojs/sitemap` — **verificar que soporte imágenes** |
| `src/app/robots.ts` | archivo estático en `public/` |
| `src/app/llms.txt/route.ts` | endpoint estático de Astro |
| `src/components/SeoJsonLd.tsx` | igual, es un `<script>` |
| `src/middleware.ts` (www → no-www) | **se va a nginx** |
| `generateStaticParams` | `getStaticPaths` |

### Fase 5 — Imágenes (2-3 días)

La fase de más riesgo. `next/image` se usa en 11 archivos y hay lógica afinada:

- El `sizes="165vh"` de los paneles verticales
- `deviceSizes` recortado a 2048 en `next.config.mjs`
- Los placeholders de `src/lib/blur.ts`
- `object-contain` con `object-top` en los planos, y los SVG servidos como
  `<img>` plano para no perder el vector

Todo eso hay que reproducirlo con `astro:assets`, que tiene otro modelo.

### Fase 6 — Verificación (3-5 días)

Contra la línea base del paso 4.4, sección por sección, a 1920 / 1024 / 375.
Más: las 35 URL del sitemap respondiendo, los datos estructurados validando, la
redirección de www funcionando desde nginx, y el contraste de texto en los tres
roles.

**Total realista: 12 a 20 días de trabajo efectivo**, sin contar el paso 0.

---

## 6. Cuándo NO se debe migrar

Señales de alto. Si alguna se cumple, la respuesta es no.

1. **Si las vías de contacto siguen rotas.** No se cambia de framework mientras
   el sitio no puede recibir un prospecto.

2. **Si no hay Search Console con historia.** Sin línea base, una caída de
   tráfico después de la migración es indistinguible de cualquier otra causa.

3. **Si hay una campaña, lanzamiento o evento comercial en las siguientes
   cuatro semanas.** Una migración toca las 44 páginas a la vez.

4. **Si el argumento es "Astro es más moderno" o "pesa menos".** Medido aquí, el
   ahorro real es marginal mientras la página siga siendo animación en casi
   todas sus secciones. Si el objetivo es peso, el paso 0 da más por mucho menos.

5. **Si no hay una ventana acordada con el resto del equipo.**

6. **Si el paso 0 no se hizo.** Migrar 27 componentes de cliente en vez de los
   ~8 que de verdad lo necesitan multiplica el trabajo por tres.

7. **Si nadie va a poder dedicarle las fases 5 y 6 completas.** Una migración a
   medias —imágenes sin verificar, SEO a medio portar— deja el sitio peor que
   como estaba. Las fases 1 a 4 sin las dos últimas no son un avance: son una
   deuda.

---

## 7. El momento natural

Cuando se construyan las **páginas de aterrizaje por tema** que pide
`SEO-PENDIENTES.md` — `/oficinas-en-venta-cartagena` y similares.

Eso ya es una reestructuración de la arquitectura del sitio, con rutas y
contenido nuevos. Hacerla sobre Astro en vez de portar lo existente y *además*
construir lo nuevo, junta los dos trabajos en uno y justifica el costo de
reverificación, porque esas páginas nacen sin valores afinados que preservar.
