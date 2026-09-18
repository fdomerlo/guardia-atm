/**
 * guardia-atm - Vademécum Clínico y Guía Farmacológica de Guardia
 * Basado en Huff & Benoliel (2023), págs. 41-43.
 */

import { FARMACOS, GRUPOS_FARMACOS } from '../data/farmacos.js';

export class DrugsView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeGroup = 'todos';
    this.searchQuery = '';
    this.selectedRiskProfile = {
      gastritis: false,
      cardiac: false,
      renal: false,
      elderly: false,
      pregnant: false
    };
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <section class="drugs-section">
        
        <!-- Header -->
        <div class="drugs-header-card">
          <div class="drugs-header-text">
            <h2>Vademécum de Guardia Odontológica</h2>
            <p>Posología de urgencia, riesgos orgánicos y advertencias de caja negra (Black Box Warnings) según Huff & Benoliel (2023).</p>
          </div>
        </div>

        <!-- Quick Safety Checker Widget -->
        <div class="card safety-checker-card">
          <div class="safety-checker-header" id="safetyCheckerToggle" role="button" tabindex="0">
            <div class="sch-left">
              <span class="safety-shield-icon">🛡️</span>
              <div>
                <h3>Verificador de Seguridad y Contraindicaciones</h3>
                <p>Seleccionar comorbilidades del paciente para filtrar fármacos seguros</p>
              </div>
            </div>
            <span class="chevron-icon" id="schChevron">▼</span>
          </div>

          <div class="safety-checker-body is-hidden" id="safetyCheckerBody">
            <div class="risk-checkboxes-grid">
              <label class="risk-chk-label">
                <input type="checkbox" id="chkGastritis"> Gastritis / Úlcera previa
              </label>
              <label class="risk-chk-label">
                <input type="checkbox" id="chkCardiac"> Cardiopatía / HTA severa
              </label>
              <label class="risk-chk-label">
                <input type="checkbox" id="chkRenal"> Falla renal / Creatinina elevada
              </label>
              <label class="risk-chk-label">
                <input type="checkbox" id="chkElderly"> Adulto mayor (> 65 años)
              </label>
              <label class="risk-chk-label">
                <input type="checkbox" id="chkPregnant"> Paciente embarazada
              </label>
            </div>

            <div id="safetyAdviceBox" class="safety-advice-box">
              <p>Selecciona una condición para ver las recomendaciones inmediatas.</p>
            </div>
          </div>
        </div>

        <!-- Filter bar -->
        <div class="filter-pills-bar" id="drugGroupPills">
          <button class="filter-pill active" data-group="todos">Todos los Fármacos</button>
          ${GRUPOS_FARMACOS.map(
            (g) => `<button class="filter-pill" data-group="${g.id}">${g.nombre.split(' (')[0]}</button>`
          ).join('')}
        </div>

        <!-- Search Bar -->
        <div class="search-input-wrap" style="margin: 12px 0;">
          <svg class="search-svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" id="drugSearchInput" placeholder="Buscar fármaco por nombre, dosis o indicación..." aria-label="Buscar fármaco">
        </div>

        <!-- Drugs Grid -->
        <div class="drugs-grid" id="drugsListContainer">
          <!-- Rendered dynamically -->
        </div>
      </section>
    `;

    this.attachEvents();
    this.renderDrugCards();
  }

  attachEvents() {
    const pills = this.container.querySelectorAll('#drugGroupPills .filter-pill');
    pills.forEach((p) => {
      p.addEventListener('click', () => {
        pills.forEach((b) => b.classList.remove('active'));
        p.classList.add('active');
        this.activeGroup = p.getAttribute('data-group');
        this.renderDrugCards();
      });
    });

    const search = document.getElementById('drugSearchInput');
    if (search) {
      search.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderDrugCards();
      });
    }

    // Safety checker toggle
    const toggle = document.getElementById('safetyCheckerToggle');
    const body = document.getElementById('safetyCheckerBody');
    const chevron = document.getElementById('schChevron');

    if (toggle && body) {
      toggle.addEventListener('click', () => {
        const isHidden = body.classList.contains('is-hidden');
        body.classList.toggle('is-hidden', !isHidden);
        chevron.textContent = isHidden ? '▲' : '▼';
      });
    }

    // Checkboxes
    const chks = ['chkGastritis', 'chkCardiac', 'chkRenal', 'chkElderly', 'chkPregnant'];
    chks.forEach((chkId) => {
      const el = document.getElementById(chkId);
      if (el) {
        el.addEventListener('change', () => this.updateSafetyAdvice());
      }
    });
  }

  updateSafetyAdvice() {
    const box = document.getElementById('safetyAdviceBox');
    if (!box) return;

    const gastritis = document.getElementById('chkGastritis')?.checked;
    const cardiac = document.getElementById('chkCardiac')?.checked;
    const renal = document.getElementById('chkRenal')?.checked;
    const elderly = document.getElementById('chkElderly')?.checked;
    const pregnant = document.getElementById('chkPregnant')?.checked;

    const advices = [];

    if (pregnant) {
      advices.push('🤰 <strong>EMBARAZO:</strong> Paracetamol es el analgésico de 1ª elección en cualquier trimestre. EVITAR estrictamente AINEs en el tercer trimestre (cierre prematuro del conducto arterioso e inhibición del parto).');
    }
    if (gastritis) {
      advices.push('⚠️ <strong>GASTRITIS / ÚLCERA:</strong> Evitar Ketorolac y Naproxeno. Si es imprescindible un AINE, usar Celecoxib 200 mg o Ibuprofeno a dosis bajas ASOCIADO A Pantoprazol 40 mg u Omeprazol 20 mg/día.');
    }
    if (cardiac) {
      advices.push('❤️ <strong>CARDIOPATÍA / RIESGO CV:</strong> Evitar Celecoxib y dosis altas de Ibuprofeno. Entre los AINEs, Naproxeno sódico tiene el perfil más neutro. Sumatriptán está CONTRAINDICADO en coronariopatía o HTA severa.');
    }
    if (renal) {
      advices.push('🧪 <strong>INSUFICIENCIA RENAL:</strong> Evitar todos los AINEs (riesgo de falla renal aguda y retención hidrosalina). Ajustar estrictamente las dosis de Gabapentina y Pregabalina según clearance de creatinina.');
    }
    if (elderly) {
      advices.push('👴 <strong>ADULTO MAYOR:</strong> Máxima precaución con relajantes musculares (Ciclobenzaprina causa sedación diurna y caídas; iniciar con 5 mg nocturnos). Reducir dosis máxima de Paracetamol a 2-3 g/día.');
    }

    if (advices.length === 0) {
      box.innerHTML = '<p>Selecciona una condición para ver las recomendaciones inmediatas.</p>';
    } else {
      box.innerHTML = `<ul class="safety-tips-list">${advices.map((a) => `<li>${a}</li>`).join('')}</ul>`;
    }
  }

  renderDrugCards() {
    const container = document.getElementById('drugsListContainer');
    if (!container) return;

    const filtered = FARMACOS.filter((f) => {
      if (this.activeGroup !== 'todos' && f.grupo !== this.activeGroup) return false;
      if (this.searchQuery) {
        const titleMatch = f.nombre.toLowerCase().includes(this.searchQuery);
        const groupMatch = f.grupo.toLowerCase().includes(this.searchQuery);
        const indMatch = f.indicaciones.some((ind) => ind.toLowerCase().includes(this.searchQuery));
        if (!titleMatch && !groupMatch && !indMatch) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<p class="empty-text">No se encontraron fármacos con ese criterio.</p>`;
      return;
    }

    container.innerHTML = filtered
      .map((f) => {
        const groupObj = GRUPOS_FARMACOS.find((g) => g.id === f.grupo);
        const groupName = groupObj ? groupObj.nombre : f.grupo;

        return `
        <article class="drug-card" id="drug-${f.id}">
          <div class="drug-card-top">
            <span class="drug-group-badge">${groupName}</span>
            <h3 class="drug-title">${f.nombre}</h3>
            <span class="drug-presentation">${f.presentacion}</span>
          </div>

          <div class="drug-dose-block">
            <div class="dose-row">
              <span class="dose-label">Posología en Guardia:</span>
              <strong class="dose-value">${f.posologiaGuardia}</strong>
            </div>
            <div class="dose-sub-row">
              <span><strong>Dosis Máxima:</strong> ${f.dosisMaxima}</span>
              <span><strong>Duración:</strong> ${f.duracionSugerida}</span>
            </div>
          </div>

          <div class="drug-indications-block">
            <h4>Indicaciones en Guardia:</h4>
            <ul>
              ${f.indicaciones.map((ind) => `<li>${ind}</li>`).join('')}
            </ul>
          </div>

          <!-- Riesgos Orgánicos -->
          <div class="drug-risks-accordion">
            <h4>Riesgos y Precauciones Orgánicas:</h4>
            <div class="risks-chips-grid">
              ${f.riesgos.gastrointestinal ? `<div class="risk-chip gi"><strong>GI:</strong> ${f.riesgos.gastrointestinal}</div>` : ''}
              ${f.riesgos.cardiovascular ? `<div class="risk-chip cv"><strong>CV:</strong> ${f.riesgos.cardiovascular}</div>` : ''}
              ${f.riesgos.renal ? `<div class="risk-chip renal"><strong>Renal:</strong> ${f.riesgos.renal}</div>` : ''}
              ${f.riesgos.hepatico ? `<div class="risk-chip hepatic"><strong>Hepático:</strong> ${f.riesgos.hepatico}</div>` : ''}
              ${f.riesgos.sedacion ? `<div class="risk-chip snc"><strong>SNC:</strong> ${f.riesgos.sedacion}</div>` : ''}
              ${f.riesgos.hematologico ? `<div class="risk-chip hemato"><strong>Hematológico:</strong> ${f.riesgos.hematologico}</div>` : ''}
            </div>
          </div>

          <!-- Black Box Warning -->
          ${f.blackBox ? `
            <div class="black-box-card">
              <div class="bb-header">
                <span class="bb-icon">⚠️</span>
                <span class="bb-title">FDA BLACK BOX WARNING</span>
              </div>
              <p class="bb-text">${f.blackBox}</p>
            </div>
          ` : ''}

          <!-- Perla Clínica -->
          ${f.perlasClinicas ? `
            <div class="drug-pearl-footer">
              <span class="pearl-badge-mini">PERLA DE GUARDIA</span>
              <p>${f.perlasClinicas}</p>
            </div>
          ` : ''}
        </article>
      `;
      })
      .join('');
  }
}
