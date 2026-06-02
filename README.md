# La Francesa Export — Landing Page

Landing page de conversión para captar brand owners interesados en Private Label de galletas premium de quinua de La Francesa S.A.

**Conversión principal:** descarga del dossier comercial vía formulario con email gate.

---

## Estructura de archivos

```
landing-lafrancesa/
│
├── index.html                          ← Página principal
│
├── assets/
│   ├── css/
│   │   └── styles.css                  ← Estilos
│   │
│   ├── js/
│   │   └── script.js                   ← Interacciones + formulario
│   │
│   ├── images/                         ← Imágenes extraídas del brochure
│   │   ├── logo-lafrancesa.png
│   │   ├── favicon.png
│   │   ├── hero-cookies.jpg
│   │   ├── four-varieties.png
│   │   ├── private-label-pack.png
│   │   ├── andean-farmers.jpg
│   │   └── factory-illustration.jpg
│   │
│   └── dossier/
│       └── dossier-lafrancesa.pdf      ← REEMPLAZAR por el dossier real
│
└── README.md                           ← Este archivo
```

---

## Cómo subir al servidor

Esta landing es **HTML estático puro** — funciona en cualquier servidor sin configuración especial.

### Opción A — Hosting tradicional (cPanel, FTP)
1. Sube toda la carpeta `landing-lafrancesa/` al directorio raíz del dominio (normalmente `public_html/` o `www/`).
2. Asegúrate de que `index.html` quede directamente accesible en el dominio.
3. Listo. Se sirve desde `https://tudominio.com`.

### Opción B — Netlify / Vercel / Cloudflare Pages (recomendado)
1. Sube la carpeta como repositorio en GitHub.
2. Conecta el repo a Netlify, Vercel o Cloudflare Pages.
3. Sin build step, sin configuración. Se publica automáticamente.

### Opción C — Subdominio dedicado
Si la web actual de La Francesa ya existe, esto puede ir en un subdominio como `export.lafrancesa.com` o `partners.lafrancesa.com` para no mezclar con el sitio corporativo.

---

## Antes de publicar — checklist obligatorio

### 1. Reemplazar el dossier real
- El archivo `assets/dossier/dossier-lafrancesa.pdf` es actualmente una copia del brochure original.
- **Hay que crear el dossier comercial real** (12 páginas con: 4 fichas técnicas, packaging, logística, certificaciones, proceso de partnership) y reemplazar este archivo manteniendo el mismo nombre.

### 2. Conectar el formulario a un CRM o backend
El formulario actualmente:
- Valida campos en el frontend
- Loguea el lead en `console.log()`
- Inicia la descarga del PDF directamente

**Hay que conectarlo a un backend real**. En `assets/js/script.js` busca el bloque marcado como `// INTEGRACIÓN BACKEND:` y reemplázalo por una de estas opciones:

**Opción simple — Formspree, Basin, Getform** (sin código)
```js
fetch('https://formspree.io/f/TU_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  body: JSON.stringify(payload)
});
```

**Opción con CRM — HubSpot, Pipedrive, ActiveCampaign**
Cada uno tiene su endpoint de Forms API. Reemplazar el `fetch` por el endpoint correspondiente.

**Opción avanzada — endpoint propio**
Crear un endpoint `/api/leads` que reciba el JSON, lo guarde en base de datos y dispare un email de notificación al equipo de export.

### 3. Configurar Google Analytics / tracking
Añadir en `index.html` antes de `</head>` el script de GA4 / GTM:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

Eventos recomendados para trackear:
- `form_submit` (conversión)
- `dossier_download`
- `cta_click` (cada CTA)
- `scroll_depth` (25%, 50%, 75%, 100%)

### 4. Email de seguimiento automático
Cuando alguien descarga el dossier, debería:
- Recibir un email de bienvenida con el dossier adjunto (no solo descarga directa)
- Quedar registrado en el CRM con tag "lead frío" o "lead caliente" (según volumen indicado)
- Disparar notificación al equipo de export para llamar dentro de 24h

### 5. Revisar SEO y meta tags
En `index.html` ya están las meta tags base. Revisar y ajustar:
- `og:image` (añadir una imagen OG de 1200×630px para previews en redes)
- Schema.org JSON-LD para Organization
- Sitemap.xml + robots.txt

---

## Performance

- Imágenes ya optimizadas (WebP recomendado en futura iteración)
- CSS y JS minimalistas, sin frameworks pesados
- Cargas externas: solo Google Fonts
- Tiempo estimado de carga en 4G: < 2s

Para producción, recomendado:
- Habilitar gzip/brotli en el servidor
- Cache-control headers para `/assets/` (1 año)
- CDN si el tráfico es internacional (Cloudflare gratis es suficiente)

---

## Edición rápida

### Cambiar colores de marca
En `assets/css/styles.css`, sección `:root`:
```css
--accent: #E0521B;     /* Naranja de los CTAs */
--gold: #B68A3E;       /* Dorado de acentos */
--bg-deep: #1F1611;    /* Marrón oscuro de secciones */
```

### Cambiar copy
Todo el texto editable está en `index.html`. Buscar la sección por su comentario (`<!-- ============ HERO ============ -->`).

### Cambiar imágenes
Reemplazar archivos en `assets/images/` manteniendo nombres y proporciones similares.

---

## Soporte técnico

Esta landing fue construida como estructura modular. Cualquier desarrollador frontend puede:
- Convertirla a Webflow / Framer importando estructura
- Migrarla a un CMS (WordPress, Shopify) usando los bloques como referencia
- Extenderla con más secciones manteniendo el sistema visual

---

**Producto de Bolivia. Diseñado para conversión global.**
