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
          
          <!-- Interactive SVG Head Diagram -->
          <div class="svg-diagram-wrapper">
            <svg class="head-anatomy-svg" viewBox="0 0 300 320" width="100%" height="auto" role="img" aria-label="Esquema anatómico de cabeza y puntos gatillo">
              <defs>
                <radialGradient id="triggerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#DC2626" stop-opacity="1"/>
                  <stop offset="60%" stop-color="#DC2626" stop-opacity="0.6"/>
                  <stop offset="100%" stop-color="#DC2626" stop-opacity="0"/>
                </radialGradient>
                <radialGradient id="referralGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#D97706" stop-opacity="0.8"/>
                  <stop offset="70%" stop-color="#D97706" stop-opacity="0.4"/>
                  <stop offset="100%" stop-color="#D97706" stop-opacity="0"/>
                </radialGradient>
              </defs>

              <!-- Stylized Lateral Head Silhouette -->
              <path d="M 90 280 Q 80 230 75 190 Q 70 140 100 80 Q 130 30 180 30 Q 230 30 250 80 Q 265 115 255 140 L 265 160 L 250 170 L 260 200 L 235 220 L 210 240 Q 170 255 150 280 Z" 
                    fill="#F1F5F9" stroke="#94A3B8" stroke-width="2.5" />

              <!-- Ear Outline -->
              <path d="M 125 150 C 115 140 115 180 125 190 C 130 185 130 155 125 150 Z" 
                    fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>

              <!-- Eye & Brow -->
              <path d="M 225 110 Q 240 108 250 115" fill="none" stroke="#64748B" stroke-width="2.5" stroke-linecap="round"/>
              <ellipse cx="238" cy="120" rx="6" ry="3.5" fill="#64748B"/>

              <!-- Mandibular Border & Angle Outline -->
              <path d="M 140 180 L 150 235 Q 185 245 225 225" 
                    fill="none" stroke="#64748B" stroke-width="2.5" stroke-dasharray="3 3"/>

              <!-- Zonas de Puntos Gatillo Dinámicas -->
              <!-- Masetero -->
              <ellipse cx="165" cy="210" rx="16" ry="24" fill="${this.selectedMuscleId.startsWith('masetero') ? '#006155' : '#E2E8F0'}" 
                       stroke="#006155" stroke-width="2" fill-opacity="${this.selectedMuscleId.startsWith('masetero') ? '0.4' : '0.1'}" />

              <!-- Temporal -->
              <path d="M 130 120 Q 160 80 200 90 Q 220 110 205 145 Q 170 140 145 150 Z" 
                    fill="${this.selectedMuscleId.startsWith('temporal') ? '#006155' : '#E2E8F0'}" 
                    stroke="#006155" stroke-width="2" fill-opacity="${this.selectedMuscleId.startsWith('temporal') ? '0.4' : '0.1'}" />

              <!-- Trapecio / Cuello -->
              <path d="M 85 240 Q 100 270 120 295 L 80 295 Z" 
                    fill="${this.selectedMuscleId === 'trapecio-superior' ? '#006155' : '#E2E8F0'}" 
                    stroke="#006155" stroke-width="2" fill-opacity="${this.selectedMuscleId === 'trapecio-superior' ? '0.4' : '0.1'}" />

              <!-- ECM -->
              <path d="M 125 195 L 105 285 L 120 285 L 140 205 Z" 
                    fill="${this.selectedMuscleId === 'esternocleidomastoideo' ? '#006155' : '#E2E8F0'}" 
                    stroke="#006155" stroke-width="2" fill-opacity="${this.selectedMuscleId === 'esternocleidomastoideo' ? '0.4' : '0.1'}" />

              <!-- Trigger Point Indicator Circle -->
              <circle cx="${(currentMuscle.posicionEsquema.x / 100) * 300}" 
                      cy="${(currentMuscle.posicionEsquema.y / 100) * 320}" 
                      r="16" fill="url(#triggerGlow)" />
              <circle cx="${(currentMuscle.posicionEsquema.x / 100) * 300}" 
                      cy="${(currentMuscle.posicionEsquema.y / 100) * 320}" 
                      r="6" fill="#DC2626" stroke="#FFFFFF" stroke-width="2" />
              <text x="${(currentMuscle.posicionEsquema.x / 100) * 300 + 10}" 
                    y="${(currentMuscle.posicionEsquema.y / 100) * 320 - 10}" 
                    font-size="11" font-weight="700" fill="#DC2626">✕ Trigger Point</text>
            </svg>
            <span class="svg-caption">✕ Punto Gatillo activo en <strong>${currentMuscle.nombre}</strong></span>
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
