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
