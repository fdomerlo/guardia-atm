/**
 * guardia-atm - Módulo de Triaje y Banderas Rojas
 * Asistente de decisión rápida de guardia y alertas de derivación médica urgente.
 */

import { BANDERAS_ROJAS, ASISTENTE_TRIAJE_PREGUNTAS } from '../data/red-flags.js';
import { PATOLOGIAS } from '../data/patologias.js';
import { renderScreenHeader } from './screen-header.js';

export class TriageModule {
  constructor(containerId, onSelectPathology) {
    this.container = document.getElementById(containerId);
    this.onSelectPathology = onSelectPathology;
    this.currentStep = 'motivo_principal';
    this.history = [];
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <section class="triage-section">
        <!-- Screen Header Estético -->
        ${renderScreenHeader({
          category: 'Triaje y Urgencias',
          title: 'Triaje de Guardia Orofacial',
          subtitle: 'Evaluación rápida de dolor articular, muscular y criterios de derivación médica urgente (Huff & Benoliel 2023).'
        })}

        <!-- Banderas Rojas Accordion / Alert Banner -->
        <div class="card card-red-flags" id="redFlagsAccordion">
          <div class="card-header red-flag-header" id="redFlagsToggle" role="button" tabindex="0" aria-expanded="false">
            <div class="header-left">
              <span class="badge-alert-pulse">CRÍTICO</span>
              <h2 class="title-red-flags">Banderas Rojas (Derivación Médica Inmediata)</h2>
            </div>
            <span class="chevron-icon" id="rfChevron">▼</span>
          </div>
          
          <div class="red-flags-content is-hidden" id="rfContent">
            <p class="section-desc">Criterios de alarma clínica que exigen derivación urgente a guardia médica hospitalaria o resolución manual inmediata:</p>
            <div class="red-flags-grid">
              ${BANDERAS_ROJAS.map((br) => `
                <div class="red-flag-item" style="border-left-color: ${br.color};">
                  <div class="rf-title-row">
                    <h4>${br.titulo}</h4>
                    <span class="rf-cie-badge">${br.cie10}</span>
                  </div>
                  <span class="rf-severity">${br.gravedad}</span>
                  <ul class="rf-criteria-list">
                    ${br.criterios.map((c) => `<li>${c}</li>`).join('')}
                  </ul>
                  <div class="rf-action-box">
                    <strong>Conducta Inmediata:</strong>
                    <ul>
                      ${br.conducta.map((a) => `<li>${a}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Datos de Contacto de Derivación Hospitalaria -->
            <div class="hospital-contact-box">
              <h4>Derivación de Emergencias Hospitalarias (La Plata):</h4>
              <ul>
                <li><strong>Hospital Odontológico FOLP:</strong> Calle 50 e/ 1 y 115, La Plata.</li>
                <li><strong>Hospital Interzonal Gral. de Agudos San Martín:</strong> Calle 1 y 70, La Plata (Guardia Médica 24hs).</li>
                <li><strong>Hospital Interzonal Especializado Dr. Noel H. Sbarra:</strong> Calle 8 y 67.</li>
                <li><strong>Emergencias Médicas (SAME):</strong> 107</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Asistente Interactivo de Decisión Rápida -->
        <div class="card triage-assistant-card">
          <div class="assistant-header">
            <div class="assistant-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#006155" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <h2 class="assistant-title">Asistente de Triaje de Guardia</h2>
              <p class="assistant-subtitle">Algoritmo clínico guiado por síntoma cardinal en el sillón</p>
            </div>
          </div>

          <div id="triageQuestionContainer" class="triage-question-box">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </section>
    `;

    this.attachEventListeners();
    this.renderCurrentQuestion();
  }

  attachEventListeners() {
    const toggle = document.getElementById('redFlagsToggle');
    const content = document.getElementById('rfContent');
    const chevron = document.getElementById('rfChevron');

    if (toggle && content) {
      toggle.addEventListener('click', () => {
        const isHidden = content.classList.contains('is-hidden');
        if (isHidden) {
          content.classList.remove('is-hidden');
          chevron.textContent = '▲';
          toggle.setAttribute('aria-expanded', 'true');
        } else {
          content.classList.add('is-hidden');
          chevron.textContent = '▼';
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  renderCurrentQuestion() {
    const container = document.getElementById('triageQuestionContainer');
    if (!container) return;

    const questionData = ASISTENTE_TRIAJE_PREGUNTAS.find((q) => q.id === this.currentStep);
    if (!questionData) return;

    const isFirstStep = this.currentStep === 'motivo_principal';

    container.innerHTML = `
      <div class="triage-question-step">
        ${!isFirstStep ? `
          <button class="btn-back-step" id="btnTriageBack" aria-label="Volver a la pregunta anterior">
            ← Volver al motivo anterior
          </button>
        ` : ''}

        <h3 class="triage-question-title">${questionData.pregunta}</h3>

        <div class="triage-options-list">
          ${questionData.opciones.map((opt, idx) => `
            <button class="triage-option-btn ${opt.banderaRoja ? 'is-red-flag' : ''}" data-idx="${idx}">
              <div class="opt-text-wrap">
                <span class="opt-bullet">${idx + 1}</span>
                <span class="opt-label">${opt.texto}</span>
              </div>
              ${opt.banderaRoja ? '<span class="chip-alert">ALERTA</span>' : '<span class="opt-arrow">→</span>'}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    // Bind back button
    const backBtn = document.getElementById('btnTriageBack');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (this.history.length > 0) {
          this.currentStep = this.history.pop();
          this.renderCurrentQuestion();
        }
      });
    }

    // Bind option clicks
    const optionBtns = container.querySelectorAll('.triage-option-btn');
    optionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const selectedOpt = questionData.opciones[idx];

        if (selectedOpt.siguiente) {
          this.history.push(this.currentStep);
          this.currentStep = selectedOpt.siguiente;
          this.renderCurrentQuestion();
        } else if (selectedOpt.diagnosticoSugerido) {
          this.renderTriageResult(selectedOpt.diagnosticoSugerido, selectedOpt.banderaRoja);
        }
      });
    });
  }

  renderTriageResult(pathologyId, isRedFlag) {
    const container = document.getElementById('triageQuestionContainer');
    if (!container) return;

    const pathology = PATOLOGIAS.find((p) => p.id === pathologyId);
    if (!pathology) {
      container.innerHTML = `<p>Diagnóstico no encontrado. <button class="btn-primary" id="btnResetTriage">Reiniciar</button></p>`;
      return;
    }

    container.innerHTML = `
      <div class="triage-result-card ${isRedFlag ? 'is-red-flag-result' : ''}">
        <div class="result-badge-row">
          <span class="badge-result-title">DIAGNÓSTICO COMPATIBLE SUGERIDO</span>
          <span class="badge-cie">${pathology.cie10}</span>
        </div>

        <h3 class="result-pathology-name">${pathology.nombre}</h3>
        <p class="result-summary">${pathology.resumenCorto}</p>

        <div class="result-action-section">
          <h4>Conducta Inmediata en Guardia:</h4>
          <ul>
            ${pathology.conductaGuardia.slice(0, 3).map((act) => `<li>${act}</li>`).join('')}
          </ul>
        </div>

        <div class="result-drug-section">
          <h4>Farmacoterapia de 1ª Línea:</h4>
          <ul>
            ${pathology.farmacoterapia.primeraLinea.map((d) => `<li><strong>${d}</strong></li>`).join('')}
          </ul>
        </div>

        <div class="result-actions-footer">
          <button class="btn-primary btn-full-width" id="btnOpenFullFromTriage" data-id="${pathology.id}">
            Ver Ficha Clínica y Diagnóstico Completo →
          </button>
          <button class="btn-secondary btn-full-width" id="btnResetTriage">
            ↻ Nuevo Triaje
          </button>
        </div>
      </div>
    `;

    const openBtn = document.getElementById('btnOpenFullFromTriage');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        if (typeof this.onSelectPathology === 'function') {
          this.onSelectPathology(pathology.id);
        }
      });
    }

    const resetBtn = document.getElementById('btnResetTriage');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.currentStep = 'motivo_principal';
        this.history = [];
        this.renderCurrentQuestion();
      });
    }
  }
}
