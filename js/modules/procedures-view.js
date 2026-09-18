/**
 * guardia-atm - Procedimientos, Maniobras e Interpretación de Laboratorio
 * Basado en Huff & Benoliel (2023), págs. 44-50.
 */

import { PROCEDIMIENTOS, PRUEBAS_LABORATORIO } from '../data/procedimientos.js';
import { renderScreenHeader } from './screen-header.js';

export class ProceduresView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeTab = 'maniobras';
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <section class="procedures-section">
        
        <!-- Screen Header Estético -->
        ${renderScreenHeader({
          category: 'Práctica Clínica en Box',
          title: 'Procedimientos y Laboratorio',
          subtitle: 'Técnicas de reducción articular, bloqueo anestésico diagnóstico e interpretación de reactantes (PCR/VSG).'
        })}

        <div class="screen-body">
          <!-- Tab Bar -->
          <div class="procedures-tab-bar">
            <button class="proc-tab-btn ${this.activeTab === 'maniobras' ? 'active' : ''}" data-tab="maniobras">
              💉 Maniobras e Infiltraciones
            </button>
            <button class="proc-tab-btn ${this.activeTab === 'laboratorio' ? 'active' : ''}" data-tab="laboratorio">
              🧪 Pruebas de Laboratorio
            </button>
          </div>

          <div id="proceduresTabContent">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </section>
    `;

    this.attachEvents();
    this.renderTabContent();
  }

  attachEvents() {
    const tabs = this.container.querySelectorAll('.proc-tab-btn');
    tabs.forEach((t) => {
      t.addEventListener('click', () => {
        tabs.forEach((b) => b.classList.remove('active'));
        t.classList.add('active');
        this.activeTab = t.getAttribute('data-tab');
        this.renderTabContent();
      });
    });
  }

  renderTabContent() {
    const content = document.getElementById('proceduresTabContent');
    if (!content) return;

    if (this.activeTab === 'maniobras') {
      content.innerHTML = `
        <div class="procedures-list">
          ${PROCEDIMIENTOS.map((proc) => `
            <article class="procedure-card" id="proc-${proc.id}">
              <div class="proc-card-header">
                <span class="proc-cat-badge">${proc.categoria}</span>
                <span class="proc-time-badge">⏱️ ${proc.tiempoEstimado}</span>
                <h3 class="proc-card-title">${proc.titulo}</h3>
                <p class="proc-card-indicacion"><strong>Indicación principal:</strong> ${proc.indicacion}</p>
              </div>

              <!-- Materiales -->
              <div class="proc-materials-box">
                <h4>Materiales Necesarios:</h4>
                <ul>
                  ${proc.materiales.map((m) => `<li>${m}</li>`).join('')}
                </ul>
              </div>

              <!-- Pasos Clínicos -->
              <div class="proc-steps-timeline">
                <h4>Técnica Paso a Paso:</h4>
                <div class="timeline-steps">
                  ${proc.pasos.map((s) => `
                    <div class="timeline-step-item">
                      <div class="step-number-circle">${s.paso}</div>
                      <div class="step-content">
                        <h5>${s.titulo}</h5>
                        <p>${s.descripcion}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Complicaciones y Perlas -->
              <div class="proc-footer-tips">
                <div class="proc-alert-warn">
                  <strong>⚠️ Alerta de Seguridad:</strong> ${proc.complicaciones}
                </div>
                <div class="proc-pearl-tip">
                  <strong>💡 Perla Clínica:</strong> ${proc.perlas}
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      `;
    } else {
      content.innerHTML = `
        <div class="lab-tests-view">
          <div class="lab-intro-banner">
            <h3>Panel de Laboratorio en Dolor Orofacial (Huff & Benoliel págs. 45-50)</h3>
            <p>Guía rápida para la solicitud e interpretación de análisis clínicos en la guardia odontológica hospitalaria.</p>
          </div>

          <div class="lab-cards-grid">
            ${PRUEBAS_LABORATORIO.map((lab) => `
              <div class="lab-card">
                <div class="lab-card-header">
                  <span class="lab-cat-badge">${lab.categoria}</span>
                  <h4 class="lab-title">${lab.nombre}</h4>
                </div>
                <div class="lab-body">
                  <div class="lab-row">
                    <strong>Cuándo solicitar en guardia:</strong>
                    <p>${lab.indicacionGuardia}</p>
                  </div>
                  <div class="lab-row">
                    <strong>Valores de referencia:</strong>
                    <p class="lab-val">${lab.valoresReferencia}</p>
                  </div>
                  <div class="lab-row lab-interp-box">
                    <strong>Interpretación clínica:</strong>
                    <p>${lab.interpretacion}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }
}
