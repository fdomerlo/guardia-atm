/**
 * guardia-atm - Visualizador Interactivo de Dolor Muscular Referido
 * Basado en Huff & Benoliel (2023) Fig. 1 y Simons, Travell & Simons.
 */

import { MUSCULOS_DOLOR, ZONAS_DOLOR_DENTAL_REFERIDO } from '../data/mapa-dolor.js';

export class ReferralMapView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.selectedMuscleId = 'masetero-superficial';
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <section class="referral-map-section">
        
        <!-- Header -->
        <div class="map-intro-card">
          <h2>Mapa Interactivo de Dolor Referido Muscular</h2>
          <p>Patrones de referencia del dolor miofascial orofacial y cervical (Huff & Benoliel Fig. 1). Selecciona un músculo o consulta el buscador inverso por diente dolorido.</p>
        </div>

        <!-- Mode Toggle -->
        <div class="map-mode-toggle">
          <button class="map-toggle-btn active" id="btnModeMuscle">Por Músculo Masticador</button>
          <button class="map-toggle-btn" id="btnModeTooth">¿Qué Diente Duele? (Buscador Inverso)</button>
        </div>

        <!-- Container for View Modes -->
        <div id="mapModeContainer">
          <!-- Rendered dynamically -->
        </div>

      </section>
    `;

    this.attachEvents();
    this.renderMuscleMode();
  }

  attachEvents() {
    const btnMuscle = document.getElementById('btnModeMuscle');
    const btnTooth = document.getElementById('btnModeTooth');

    if (btnMuscle && btnTooth) {
      btnMuscle.addEventListener('click', () => {
        btnMuscle.classList.add('active');
        btnTooth.classList.remove('active');
        this.renderMuscleMode();
      });

      btnTooth.addEventListener('click', () => {
        btnTooth.classList.add('active');
        btnMuscle.classList.remove('active');
        this.renderToothMode();
      });
    }
  }

  renderMuscleMode() {
    const container = document.getElementById('mapModeContainer');
    if (!container) return;

    const currentMuscle = MUSCULOS_DOLOR.find((m) => m.id === this.selectedMuscleId) || MUSCULOS_DOLOR[0];

    container.innerHTML = `
      <div class="muscle-mode-layout">
        
        <!-- Muscle Pills Selector -->
        <div class="muscle-selector-chips">
          ${MUSCULOS_DOLOR.map(
            (m) => `
            <button class="muscle-chip ${m.id === this.selectedMuscleId ? 'active' : ''}" data-muscle-id="${m.id}">
              ${m.nombre}
            </button>
          `
          ).join('')}
        </div>

        <!-- Anatomical Schema and Card -->
        <div class="map-visual-card">
          
          <!-- Interactive Radiographic Anatomical Map Container -->
          <div class="anatomical-graphic-container">
            <div class="anatomical-stage">
              <!-- Base lateral head x-ray image -->
              <img src="./assets/mapa-anatomico.jpg" 
                   class="anatomical-xray-img" 
                   alt="Radiografía anatómica lateral de cráneo y cuello"
                   loading="eager">
              
              <!-- SVG Layer aligned on top of the 800x800 coordinate grid -->
              <svg class="anatomical-overlay-svg" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Esquema radiográfico con puntos gatillo y dolor referido">
                <defs>
                  <!-- Radial gradient for referred pain halos (intense fiery amber/orange) -->
                  <radialGradient id="referralHalos" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#FF3D00" stop-opacity="0.95"/>
                    <stop offset="35%" stop-color="#FF6D00" stop-opacity="0.75"/>
                    <stop offset="70%" stop-color="#FF9100" stop-opacity="0.35"/>
                    <stop offset="100%" stop-color="#FF3D00" stop-opacity="0"/>
                  </radialGradient>
                  
                  <!-- Radial gradient for active trigger point beacon -->
                  <radialGradient id="activeTriggerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#EF4444" stop-opacity="0.95"/>
                    <stop offset="50%" stop-color="#DC2626" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#991B1B" stop-opacity="0"/>
                  </radialGradient>
                </defs>

                <!-- Dotted connector lines from Trigger Point to Referred Pain Zones -->
                <g class="referral-connectors">
                  ${currentMuscle.zonasReferidas.map((z) => `
                    <line x1="${currentMuscle.triggerPoint.x}" y1="${currentMuscle.triggerPoint.y}"
                          x2="${z.x}" y2="${z.y}"
                          stroke="#FF7043" stroke-width="2.2" stroke-dasharray="5 5" stroke-opacity="0.7"
                          class="connector-line" />
                  `).join('')}
                </g>

                <!-- Glowing Referred Pain Zones (Halos) -->
                <g class="referral-halos">
                  ${currentMuscle.zonasReferidas.map((z) => `
                    <g class="referral-zone-group" title="${z.label}">
                      <!-- Outer pulsing glow -->
                      <circle cx="${z.x}" cy="${z.y}" r="${z.r * 1.5}" fill="url(#referralHalos)" class="halo-pulse-anim" />
                      <!-- Core bright spot -->
                      <circle cx="${z.x}" cy="${z.y}" r="${z.r * 0.7}" fill="#FF5722" fill-opacity="0.85" />
                      <circle cx="${z.x}" cy="${z.y}" r="3.5" fill="#FFFFFF" />
                      <!-- Mini label shadow + text -->
                      <text x="${z.x}" y="${z.y - z.r - 4}" 
                            text-anchor="middle" 
                            fill="#FFFFFF" 
                            font-size="11" 
                            font-weight="700" 
                            class="zone-svg-caption">${z.label.split('(')[0].trim()}</text>
                    </g>
                  `).join('')}
                </g>

                <!-- Inactive Trigger Points (Clickable cyan pins for quick muscle switching) -->
                <g class="inactive-trigger-points">
                  ${MUSCULOS_DOLOR.filter((m) => m.id !== currentMuscle.id).map((m) => `
                    <g class="pin-trigger-unselected" data-muscle-id="${m.id}" role="button" tabindex="0" aria-label="Músculo ${m.nombre}">
                      <circle cx="${m.triggerPoint.x}" cy="${m.triggerPoint.y}" r="16" fill="#00E5FF" fill-opacity="0.12" class="unselected-ping" />
                      <circle cx="${m.triggerPoint.x}" cy="${m.triggerPoint.y}" r="6" fill="#00E5FF" stroke="#FFFFFF" stroke-width="1.8" />
                    </g>
                  `).join('')}
                </g>

                <!-- Active Trigger Point (Selected muscle: High-contrast radar pulse + crosshair) -->
                <g class="active-trigger-point" transform="translate(${currentMuscle.triggerPoint.x}, ${currentMuscle.triggerPoint.y})">
                  <!-- Radar pulse waves -->
                  <circle cx="0" cy="0" r="36" fill="url(#activeTriggerGlow)" class="trigger-radar-ring" />
                  <circle cx="0" cy="0" r="18" fill="#DC2626" fill-opacity="0.35" stroke="#EF4444" stroke-width="2.5" class="trigger-beacon-ring" />
                  <circle cx="0" cy="0" r="8" fill="#DC2626" stroke="#FFFFFF" stroke-width="2.5" />
                  
                  <!-- Crosshair mark -->
                  <line x1="-14" y1="0" x2="-6" y2="0" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
                  <line x1="6" y1="0" x2="14" y2="0" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
                  <line x1="0" y1="-14" x2="0" y2="-6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
                  <line x1="0" y1="6" x2="0" y2="14" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />

                  <!-- Label callout tag -->
                  <g class="trigger-svg-label">
                    <rect x="14" y="-15" width="${currentMuscle.nombre.length * 8 + 26}" height="28" rx="6" 
                          fill="rgba(10, 20, 35, 0.88)" stroke="#EF4444" stroke-width="1.8" />
                    <text x="24" y="4" fill="#FFFFFF" font-size="12" font-weight="800" font-family="system-ui, sans-serif">
                      ✕ ${currentMuscle.nombre}
                    </text>
                  </g>
                </g>

              </svg>
            </div>

            <!-- Visual Legend Bar -->
            <div class="anatomical-legend-bar">
              <div class="legend-pill trigger-legend">
                <span class="legend-dot red-pulse"></span>
                <span class="legend-text"><strong>Punto Gatillo (Causa)</strong>: Palpación dolorosa</span>
              </div>
              <div class="legend-pill referral-legend">
                <span class="legend-dot orange-pulse"></span>
                <span class="legend-text"><strong>Dolor Referido (Síntoma)</strong>: Irradiación</span>
              </div>
            </div>

            <!-- Referred zones list pills -->
            <div class="referral-zones-pills">
              <span class="rz-title">Irradia dolor hacia:</span>
              <div class="rz-badges-flow">
                ${currentMuscle.zonasReferidas.map((z) => `
                  <span class="rz-pill">${z.icon || '📍'} ${z.label}</span>
                `).join('')}
              </div>
            </div>

          </div>

          <!-- Detailed Info for Selected Muscle -->
          <div class="muscle-detail-panel">
            <span class="muscle-group-tag">${currentMuscle.grupo}</span>
            <h3 class="muscle-name-heading">${currentMuscle.nombre}</h3>

            <div class="muscle-info-row">
              <h4>🎯 Localización y Palpación Clínica:</h4>
              <p>${currentMuscle.zonaPalpacion}</p>
            </div>

            <div class="muscle-info-row">
              <h4>🖐️ Maniobra en el Sillón:</h4>
              <p><em>${currentMuscle.maniobraClinica}</em></p>
            </div>

            <div class="muscle-info-row referral-target-box">
              <h4>💥 Zonas de Dolor Referido (A dónde viaja el dolor):</h4>
              <ul>
                ${currentMuscle.dolorReferido.map((r) => `<li><strong>${r}</strong></li>`).join('')}
              </ul>
            </div>

            <div class="muscle-info-row">
              <h4>⚠️ Síntomas Asociados:</h4>
              <p>${currentMuscle.sintomasAsociados}</p>
            </div>
          </div>

        </div>
      </div>
    `;

    // Attach chip clicks
    container.querySelectorAll('.muscle-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        this.selectedMuscleId = chip.getAttribute('data-muscle-id');
        this.renderMuscleMode();
      });
    });

    // Attach direct anatomical SVG pin clicks
    container.querySelectorAll('.pin-trigger-unselected').forEach((pin) => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const muscleId = pin.getAttribute('data-muscle-id');
        if (muscleId) {
          this.selectedMuscleId = muscleId;
          this.renderMuscleMode();
        }
      });
    });
  }

  renderToothMode() {
    const container = document.getElementById('mapModeContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="tooth-mode-layout">
        <div class="tooth-mode-banner">
          <h3>Buscador Inverso: Odontalgia No Odontogénica</h3>
          <p>Falsas pulpitis causadas por puntos gatillo en músculos masticadores. Si la pieza no tiene caries ni alteración pulpar demostrable, busca el diente afectado en esta tabla:</p>
        </div>

        <div class="tooth-cards-grid">
          ${ZONAS_DOLOR_DENTAL_REFERIDO.map(
            (item) => `
            <div class="tooth-referral-card">
              <div class="tooth-card-header">
                <span class="tooth-icon">🦷</span>
                <div>
                  <h4>${item.dienteAfectado}</h4>
                  <span class="tooth-culprit">Músculo Culpable: <strong>${item.musculoCausante}</strong></span>
                </div>
              </div>
              <p class="tooth-card-desc">${item.caracteristica}</p>
              <button class="btn-goto-muscle" data-muscle="${item.musculoCausante}">
                Ver Palpación del Músculo →
              </button>
            </div>
          `
          ).join('')}
        </div>
      </div>
    `;

    // Attach go to muscle buttons
    container.querySelectorAll('.btn-goto-muscle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const muscName = btn.getAttribute('data-muscle').toLowerCase();
        let targetId = 'masetero-superficial';
        if (muscName.includes('temporal')) {
          if (muscName.includes('anterior')) targetId = 'temporal-anterior';
          else if (muscName.includes('media')) targetId = 'temporal-medio';
          else targetId = 'temporal-posterior';
        } else if (muscName.includes('digástrico') || muscName.includes('digastrico')) {
          targetId = 'masetero-superficial';
        }

        this.selectedMuscleId = targetId;
        const btnMuscle = document.getElementById('btnModeMuscle');
        const btnTooth = document.getElementById('btnModeTooth');
        if (btnMuscle && btnTooth) {
          btnMuscle.classList.add('active');
          btnTooth.classList.remove('active');
        }
        this.renderMuscleMode();
      });
    });
  }
}
