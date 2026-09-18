# Guardia ATM · Hospital Odontológico Universitario FOLP / UNLP

Aplicación Web Progresiva (PWA) de consulta clínica rápida, 100% mobile-first, 100% offline-first y en español para la **Guardia Odontológica y Servicio de Dolor Orofacial y ATM** del Hospital de la **Facultad de Odontología de la Universidad Nacional de La Plata (FOLP / UNLP)**.

Basada íntegramente en el manual clínico internacional de referencia:
> **Huff KD, Benoliel R.** *Clinical Handbook for Oral, Facial, and Head Pain*. **J Oral Facial Pain Headache** 2023;37(4):219–268. doi: [10.11607/ofph.3488](https://doi.org/10.11607/ofph.3488).

---

## 📱 Características Principales

- **100% Mobile-First y Ergonómica:** Diseñada específicamente para uso ágil con una sola mano en el sillón odontológico o box de guardia.
- **100% Offline-First:** Equipada con Service Worker nativo y Cache API. Funciona sin señal de internet ni consumo de datos en subsuelos y quirófanos.
- **Identidad Institucional FOLP / UNLP:**
  - Color Primario Institucional: `#003326` (Verde Bosque Sobrio FOLP)
  - Color de Acento: `#46A3B7` (Celeste/Turquesa FOLP)
  - Modo Noche / Oscuro de alto contraste para guardias nocturnas.
- **Triaje y Banderas Rojas (Red Flags):**
  - Alerta inmediata ante criterios de alarma vital o de derivación médica: Arteritis Temporal / Células Gigantes (riesgo de amaurosis súbita), Criterios SNOOP4 de cefaleas intracraneales, Angina de Ludwig y luxaciones mandibulares agudas.
  - Asistente de Decisión Rápida paso a paso por síntoma cardinal.
- **Compendio Clínico de Patologías:**
  - Más de 50 afecciones orofaciales organizadas según DC/TMD, ICHD-3 e ICOP.
  - Códigos CIE-10 (ICD-10) incorporados para registro en historia clínica.
  - Fichas completas: características, criterios diagnósticos, pruebas en sillón, conducta de urgencia, farmacoterapia de 1ª y 2ª línea, diagnósticos diferenciales y perlas clínicas de Huff & Benoliel.
- **Vademécum de Guardia y Verificador de Seguridad:**
  - AINEs, analgésicos no AINE, relajantes musculares, esteroides, neuropáticos y triptanes con posología exacta para adultos.
  - Advertencias de Caja Negra (*FDA Black Box Warnings*) y perfiles de riesgo orgánico (gastrointestinal, cardiovascular, renal y hepático).
  - Filtro interactivo de comorbilidades (gastritis, cardiopatía, falla renal, embarazo, adulto mayor).
- **Procedimientos y Maniobras Clínicas:**
  - Guía paso a paso de la **Maniobra de Nelatón** para luxación aguda de mandíbula (con técnica de protección digital del operador).
  - Infiltración de puntos gatillo miofasciales (masetero y temporal).
  - Bloqueos diagnósticos del nervio auriculotemporal y alveolar inferior.
  - Artrocentesis e infiltración articular de ATM.
  - Panel de interpretación de pruebas serológicas y de laboratorio (VSG, PCR, hemograma, perfil reumatológico).
- **Mapa Interactivo de Dolor Muscular Referido:**
  - Esquema anatómico interactivo de cabeza y cuello (Simons et al. / Huff & Benoliel Fig. 1).
  - Buscador inverso: *"¿Qué diente le duele al paciente?"* para identificar al instante falsas pulpitis odontálgicas de origen muscular.
- **Buscador Instantáneo Offline:**
  - Búsqueda en tiempo real indexada por patología, síntoma, fármaco, procedimiento o código CIE-10.
- **Favoritos y Marcadores:**
  - Almacenamiento local en el dispositivo para acceso inmediato a las consultas más frecuentes.

---

## 🚀 Cómo Ejecutar la Aplicación

Al ser una PWA sin dependencias pesadas de compilación en tiempo de ejecución, puede ejecutarse inmediatamente con cualquier servidor estático:

### Con Python:
```bash
python3 -m http.server 8080
```
Luego abrir en el navegador del teléfono celular o computadora: `http://localhost:8080` (o la IP local de la red Wi-Fi de guardia para compartirla entre los profesionales).

### Con Node / npx:
```bash
npx serve .
```

---

## 🌐 Despliegue en GitHub Pages (100% Listo)

La aplicación está completamente preparada para desplegarse como sitio estático y PWA en **GitHub Pages**:

1. En GitHub, ve a tu repositorio: `https://github.com/fdomerlo/guardia-atm`.
2. Dirígete a **Settings** > **Pages** (en el menú lateral izquierdo).
3. En **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** Selecciona `master` (o la rama que desees) y carpeta `/ (root)`.
   - Clic en **Save**.
4. En 1 o 2 minutos, GitHub publicará la app en:
   **`https://fdomerlo.github.io/guardia-atm/`**

> **Nota:** El archivo `.nojekyll` ya está incluido en la raíz para evitar interferencias de Jekyll y garantizar la entrega nativa del Service Worker (`sw.js`) y del manifiesto PWA (`manifest.webmanifest`).

## 📲 Cómo Instalar en el Celular (PWA)

1. Abrir la URL en el navegador del teléfono móvil (Chrome en Android o Safari en iPhone/iPad).
2. **En Android:** Aparecerá el banner de instalación o pulsar los tres puntos del menú vertical y seleccionar **"Instalar aplicación"** o **"Agregar a la pantalla principal"**.
3. **En iPhone / iPad:** Pulsar el botón **Compartir** (icono de cuadrado con flecha hacia arriba) y seleccionar **"Agregar al inicio"**.
4. La aplicación quedará instalada como una app nativa con su icono institucional, abrirá a pantalla completa sin barra de direcciones y funcionará siempre, incluso sin conexión a internet.

---

## 🏥 Hospital Odontológico Universitario - FOLP / UNLP
- **Dirección:** Calle 50 e/ 1 y 115, La Plata, Buenos Aires, Argentina.
- **Universidad Nacional de La Plata**
