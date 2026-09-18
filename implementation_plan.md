# Guardia ATM - PWA para la Guardia Odontológica del Hospital Universitario FOLP / UNLP

Desarrollo de una Aplicación Web Progresiva (PWA) de consulta clínica rápida, 100% mobile-first, 100% offline-first y 100% en español, desarrollada a partir del manual clínico de referencia internacional *Clinical Handbook for Oral, Facial, and Head Pain* (Dr. Kevin D. Huff & Dr. Rafael Benoliel, *J Oral Facial Pain Headache* 2023) adaptada específicamente al flujo de trabajo de la **Guardia Odontológica del Hospital de la Facultad de Odontología de la Universidad Nacional de La Plata (FOLP / UNLP)**.

---

## 1. Identidad Visual y Estilo Clínico Institucional

La aplicación adoptará una estética médica, profesional, sobria y ergonómica, optimizada para uso con una sola mano en guardias hospitalarias:

- **Color Primario Institucional:** `#006155` (Verde institucional FOLP) — aplicado en barra de navegación, cabeceras principales, botones de acción primaria y elementos activos.
- **Color de Acento Institucional:** `#46A3B7` (Celeste/Turquesa institucional) — aplicado en badges de categoría, indicadores de selección, enlaces y gráficos de apoyo.
- **Paleta Clínica de Apoyo:**
  - **Rojo Urgencia / Banderas Rojas / Black Box Warnings:** `#DC2626` / Fondo `#FEF2F2` (alertas críticas como sospecha de Arteritis Temporal, Infección de espacios fasciales, ACV/SNOOP4).
  - **Ámbar Precaución / Riesgo Farmacológico:** `#D97706` / Fondo `#FFFBEB` (precauciones de AINEs en adultos mayores, interacciones, riesgo gastrointestinal/cardiovascular).
  - **Verde Éxito / 1ª Línea de Tratamiento:** `#059669` / Fondo `#ECFDF5`.
  - **Fondo Clínico Limpio:** `#F8FAFC` (Slate 50) y `#FFFFFF` en modo claro; `#0B131E` y `#152232` en **Modo Noche de Guardia** (alto contraste para turnos nocturnos).
- **Tipografía:** Pila nativa legible de alta densidad clínica (`system-ui`, `-apple-system`, `Segoe UI`, `Roboto`), respetando áreas seguras de interacción táctil ($\ge 44 \times 44$ px) y contraste WCAG AAA/AA.

---

## 2. Módulos Funcionales de la Aplicación

### A. Triaje y Asistente de Decisión Rápida (Inicio)
- **Banderas Rojas (Red Flags):** Acceso inmediato con un tap a criterios de alarma que exigen derivación médica urgente:
  - *Arteritis de Células Gigantes / Temporal (riesgo de amaurosis irreversible).*
  - *Cefaleas de riesgo según mnemotecnia SNOOP4 (ACV, hemorragia, masa).*
  - *Infecciones cervicofaciales difusas (Angina de Ludwig, celulitis orbitaria).*
  - *Luxación articular aguda (Bloqueo abierto irreducible).*
- **Asistente de Triaje en Guardia (Árbol de Decisión):** Flujo de 2 a 3 preguntas rápidas guiadas por síntoma cardinal del paciente:
  1. Mandíbula trabada / Trismus / Limitación de apertura.
  2. Dolor al masticar / Apretar los dientes.
  3. Chasquidos, clics o ruidos articulares.
  4. Dolor punzante / descarga eléctrica / lancinante.
  5. Dolor dental sin causa odontogénica aparente.
  6. Lesiones en mucosa o encía.
- **Acceso directo a Patologías Críticas de Guardia:** Luxación aguda de ATM, Bloqueo cerrado (desplazamiento sin reducción), Mialgia aguda/Espasmo muscular, Neuralgia del Trigémino, Pericoronaritis/Abscesos, Pulpitis aguda.

### B. Compendio Clínico de Patologías (Huff & Benoliel 2023)
Clasificación organizada con pestañas y filtros por categoría anatómica/etiológica:
1. **Trastornos de la ATM:**
   - Artralgia (M26.62)
   - Artritis / Osteoartrosis (M26.62)
   - Desplazamiento discal con reducción (DDcR - M26.63)
   - DDcR con bloqueo intermitente (M26.63)
   - Desplazamiento discal sin reducción con limitación de apertura / Bloqueo cerrado agudo (M26.63)
   - Desplazamiento discal sin reducción sin limitación (M26.63)
   - Subluxación y Luxación mandibular aguda / Bloqueo abierto (M26.62)
   - Anquilosis fibrosa y ósea (M26.61)
   - Reabsorción condilar idiopática / Condilólisis (M26.69)
   - Fracturas condilares y trastornos del desarrollo (Aplasia, Hipoplasia, Hiperplasia)
2. **Trastornos Musculares (Masticatorios y Cervicales):**
   - Mialgia local (M79.1)
   - Dolor miofascial sin derivación (M79.1)
   - Dolor miofascial con dolor referido (M79.1) y mapa de puntos gatillo
   - Mialgia mediada centralmente (M79.1)
   - Miospasmo / Trismus agudo (M62.838)
   - Miositis (M60.9) y Tendinitis del temporal (M67.90)
   - Distonía oromandibular (G24) y Disquinesia orofacial (R27.0)
   - Contractura e hipertrofia muscular
3. **Dolor Dental (Odontogénico y No Odontogénico):**
   - Pulpitis reversible e irreversible (K04.0)
   - Síndrome del diente fisurado (K03.81)
   - Absceso periapical agudo (K04.7)
   - Dolor dental de origen miofascial (dolor dental referido de masetero/temporal)
   - Odontalgia neuropática / neuralgia dental
   - Disestesia oclusal
4. **Dolor Periodontal:**
   - Absceso gingival (K05.00)
   - Absceso periodontal (K05.20)
   - Pericoronaritis aguda (K05.22)
   - Periodontitis necrotizante / GUNA (A69.1)
5. **Dolor Mucocutáneo:**
   - Reacción alérgica (K12.1)
   - Candidiasis oral (B37.0)
   - Liquen plano oral (L43.9)
   - Pénfigo (L10.0) y Penfigoide de mucosas (L12.0)
   - Herpes simple labial e intraoral (B00.9)
   - Síndrome de boca urente / Glosodinia (K14.6)
   - Mucositis por radioterapia/quimioterapia
   - Lengua geográfica (K14.1) y Traumatismos
6. **Dolor Neuropático Orofacial:**
   - Neuralgia del Trigémino (Clásica, Secundaria, Idiopática - G50.0) + Flujograma ICHD-3
   - Neuralgia Glosofaríngea (G52.1)
   - Dolor neuropático trigeminal postraumático (PTNP - G89.0)
   - Dolor facial idiopático persistente (PIFP / atípico - G89.0)
   - Síndrome de dolor regional complejo (SDRC / Causalgia - G90.50)
7. **Cefaleas Primarias y Dolor Cervical:**
   - Migraña con aura (G43.1) y sin aura (G43.0)
   - Migraña orofacial (G44.00)
   - Cefalea tensional (G44.2)
   - Cefalea en racimos / Cluster (G44.00)
   - Hemicránea paroxística y SUNCT/SUNA (G44.08)
   - Cervicalgia (M54.2), Esguince cervical (S13.4) y dolor referido a cabeza/cara

*Ficha clínica de cada patología:*
- **Código CIE-10 (ICD-10)** para registro en historia clínica de guardia.
- **Características clínicas y criterios diagnósticos (DC/TMD e ICHD-3).**
- **Examen físico / Pruebas diagnósticas en el sillón odontológico.**
- **Conducta y tratamiento de urgencia en guardia vs. ambulatorio.**
- **Farmacoterapia recomendada (1ª y 2ª línea con posología).**
- **Diagnóstico diferencial con enlaces cruzados.**
- **Alertas clínicas y precauciones.**

### C. Vademécum Clínico y Guía Farmacológica de Guardia
- **AINEs:** Ibuprofeno, Naproxeno, Celecoxib, Meloxicam, Ketorolac, Diclofenac (dosis recomendadas en guardia, días máximos, riesgo GI vs. riesgo CV).
- **Analgésicos no AINE y Esteroides:** Paracetamol, Tramadol, Prednisona, Metilprednisolona (esquema Medrol).
- **Relajantes Musculares:** Ciclobenzaprina, Tizanidina, Baclofeno (dosis nocturna, sedación).
- **Fármacos Neuropáticos:** Carbamazepina (titulación), Oxcarbazepina, Gabapentina, Pregabalina, Amitriptilina.
- **Alertas de Seguridad:** Indicadores de *Riesgo* y advertencias de caja negra (*Black Box Warnings* del handbook).
- **Calculadora Rápida de Dosis Adulto / Intervalos de Guardia.**

### D. Procedimientos y Maniobras de Guardia
Guías paso a paso ilustradas y esquematizadas:
1. **Maniobra de Nelaton:** Reducción manual de la luxación aguda bilateral o unilateral de ATM (apoyo con gasa en molares inferiores, fuerza hacia abajo, atrás y arriba, vendaje de Barton preventivo).
2. **Infiltración de Puntos Gatillo Miofasciales (Trigger Point Injection):** Técnica para Masetero y Temporal superficial (mepivacaína 3% o lidocaína 2% sin vasoconstrictor vs. punción seca).
3. **Bloqueos Anestésicos Diagnósticos:** Nervio auriculotemporal, alveolar inferior, mentoniano.
4. **Artrocentesis de ATM:** Indicaciones de derivación o técnica de lavado con doble aguja y viscosuplementación/corticoide.
5. **Panel de Serología y Laboratorio:** Cuándo pedir en guardia (Hemograma, VSG/PCR para descartar arteritis de la temporal, factor reumatoideo, ANA, perfil tiroideo).

### E. Visualizador Interactivo de Dolor Referido Muscular (Mapa de Dolor)
- Basado en la Figura 1 de Simons / Huff & Benoliel:
  - Músculo Masetero (porción profunda y superficial $\rightarrow$ oído, molares superiores e inferiores, ceja).
  - Músculo Temporal (zonas anterior, media y posterior $\rightarrow$ incisivos, caninos, premolares y molares superiores, cefalea retroorbital).
  - Músculo Pterigoideo Medial (dolor profundo retromandibular y sublingual).
  - Músculo Pterigoideo Lateral (dolor articular en zona de ATM y maxilar superior).
  - Músculos Trapecio y Esternocleidomastoideo (referencia occipital, vértice craneal y ángulo mandibular).
- Interfaz interactiva donde el odontólogo selecciona la zona de dolor del paciente o el músculo palpado para ver la correspondencia inmediata.

### F. Buscador Instantáneo Offline y Favoritos
- Búsqueda en tiempo real indexada por: nombre de patología, código CIE-10, síntoma ("trismus", "chasquido", "neuralgia", "fuego"), fármaco o procedimiento.
- Sistema de Favoritos con persistencia en `localStorage` para guardar las fichas más consultadas durante la guardia.

### G. Capacidades PWA y Offline-First
- `manifest.webmanifest`: Modo `display: standalone`, tema `#006155`, iconos vectoriales SVG y PNG de alta resolución adaptables (maskable).
- Service Worker (`sw.js`): Estrategia de caché proactiva (*cache-first* con *stale-while-revalidate* para actualizaciones). Todo el contenido textual, esquemas, iconos y código queda almacenado en el dispositivo del profesional. La app funciona al 100% sin señal de internet en el subsuelo o boxes del hospital.
- Botón de instalación PWA en el menú para agregar a la pantalla de inicio de Android/iOS.
- Indicador de estado de conexión ("Modo Offline Hospitalario Activo").

---

## 3. Propuesta de Arquitectura Técnica

```
guardia-atm/
├── index.html                    # Shell semántico, accesibilidad y estructura principal
├── manifest.webmanifest          # Manifiesto PWA para instalación nativa
├── sw.js                         # Service Worker para funcionamiento 100% offline
├── css/
│   ├── theme.css                 # Variables institucionales FOLP/UNLP, tipografía y dark mode
│   ├── layout.css                # Header hospitalario, barra de navegación móvil inferior, drawers
│   ├── components.css            # Tarjetas médicas, badges CIE-10, alertas, buscadores, modales
│   └── interactive.css           # Estilos del mapa muscular de dolor y flujogramas diagnósticos
├── js/
│   ├── app.js                    # Inicialización, enrutamiento ligero por vistas, manejo de estado
│   ├── data/
│   │   ├── patologias.js         # Base completa de patologías estructuradas (Huff & Benoliel 2023)
│   │   ├── farmacos.js           # Vademécum de guardia con dosis, riesgos y Black Box warnings
│   │   ├── procedimientos.js     # Maniobra de Nelaton, infiltraciones, bloqueos y serología
│   │   ├── red-flags.js          # Criterios SNOOP4, Arteritis temporal, luxaciones agudas
│   │   └── mapa-dolor.js         # Puntos gatillo miofasciales y patrones de dolor referido
│   └── modules/
│       ├── triage.js             # Lógica del asistente de guardia y banderas rojas
│       ├── pathologies-view.js   # Renderizado de fichas clínicas, filtros y diagnósticos cruzados
│       ├── drugs-view.js         # Renderizado de fármacos, alertas de seguridad y dosificación
│       ├── procedures-view.js    # Renderizado de maniobras clínicas paso a paso
│       ├── referral-map-view.js  # Visualizador interactivo de dolor muscular referido
│       ├── search.js             # Motor de búsqueda instantáneo offline con resaltado de términos
│       ├── favorites.js          # Guardado y gestión de marcadores en LocalStorage
│       └── pwa.js                # Registro de Service Worker y evento de instalación en pantalla de inicio
└── assets/
    ├── icons/                    # Iconos SVG y PNG de la aplicación con la identidad de la FOLP
    └── folp-logo.svg             # Emblema institucional de la FOLP / UNLP
```

---

## 4. User Review Required & Preguntas Abiertas

> [!NOTE]
> **Enfoque Tecnológico:** Se propone implementar la PWA con **Vanilla ES6+ y CSS Moderno modular** sin dependencias externas de tiempo de ejecución. Esto garantiza:
> 1. Carga instantánea (< 100 ms) en cualquier teléfono celular de guardia (gama baja a alta).
> 2. Cero fallos por empaquetado o dependencias externas.
> 3. Almacenamiento ultraliviano en el dispositivo (< 2 MB total con todo el contenido médico y esquemas).
> 4. Funcionamiento 100% autónomo y offline sin depender de servidores o CDNs.

### Preguntas para el usuario:
1. ¿Deseas agregar algún protocolo o dato de contacto específico de la guardia del Hospital Odontológico de la FOLP (por ejemplo, horarios de guardia, teléfono de derivación médica al Hospital San Martín / Rossi, o número de guardia central)?
2. ¿Prefieres que la vista inicial por defecto sea el **Triaje Rápido / Banderas Rojas** (recomendado para guardias de urgencia) o el **Catálogo Completo de Patologías**?

---

## 5. Plan de Verificación

### Pruebas Automatizadas y de Sintaxis
- Validación de sintaxis JavaScript ES6+ con Node.js (`node -c js/**/*.js`).
- Validación de integridad de los datos estructurados en `patologias.js`, `farmacos.js`, etc. (verificando que todos los códigos CIE-10, campos de diagnóstico y medicamentos estén completos sin campos nulos).
- Verificación de validez del `manifest.webmanifest` y del script del `sw.js`.

### Pruebas de Funcionamiento y UX Móvil
- **Prueba Offline:** Simulación de desconexión de red mediante servidor HTTP local con Service Worker activo; comprobación de que el 100% de las páginas, fichas, búsquedas y calculadoras funcionan sin conexión a internet.
- **Prueba de Instalabilidad PWA:** Verificación de que el evento `beforeinstallprompt` y los metadatos de PWA (theme-color, standalone, icons) cumplen los requisitos de Lighthouse PWA.
- **Prueba Responsive y Táctil:** Comprobación en viewport móvil (360x740, 390x844, 412x915) para verificar que la barra inferior no colisione con el gesture bar del sistema y que todos los botones táctiles tengan al menos 44px de altura.
- **Prueba de Búsqueda:** Verificación de búsqueda por palabras clave en español ("chasquido", "trismus", "nelaton", "ibuprofeno", "carbamazepina", "arteritis", "K04.0").
