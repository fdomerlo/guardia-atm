/**
 * guardia-atm - Vista y Detalle de Patologías Clínicas
 * Basado en Huff & Benoliel (2023) y criterios DC/TMD, ICHD-3 e ICOP.
 */

import { PATOLOGIAS, CATEGORIAS_PATOLOGIAS } from '../data/patologias.js';
import { FavoritesManager } from './favorites.js';

export class PathologiesView {
  constructor(containerId, modalContainerId) {
    this.container = document.getElementById(containerId);
    this.modalContainer = document.getElementById(modalContainerId);
    this.activeFilter = 'todas';
    this.searchQuery = '';
    this.init();
  }

  init() {
    this.render();
    window.addEventListener('favorites-updated', () => {
      if (this.activeFilter === 'favoritos') {
        this.renderList();
      } else {
        this.updateFavIcons();
      }
    });
  }

  setFilter(filterId) {
    this.activeFilter = filterId;
    this.renderFilterPills();
    this.renderList();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <section class="pathologies-section">
        <div class="section-top-bar">
          <div class="search-input-wrap">
            <svg class="search-svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" id="pathologyLocalSearch" placeholder="Buscar por patología, síntoma o CIE-10..." aria-label="Buscar patología">
            <button class="clear-search-btn is-hidden" id="clearLocalSearch" aria-label="Limpiar búsqueda">✕</button>
          </div>
        </div>

        <!-- Filter Pills Scrollable Bar -->
        <div class="filter-pills-bar" id="categoryFilterBar">
          <!-- Rendered dynamically -->
        </div>

        <!-- Counter and Quick Filter row -->
        <div class="list-meta-row">
          <span id="pathologyCount" class="count-badge">Cargando patologías...</span>
          <button class="btn-text-filter ${this.activeFilter === 'urgencias' ? 'active' : ''}" id="btnFilterUrgencias">
            ⚡ Solo Urgencias de Guardia
          </button>
        </div>

        <!-- Pathologies Cards Grid -->
        <div class="pathologies-grid" id="pathologiesListContainer">
          <!-- Rendered dynamically -->
        </div>
      </section>
    `;

    this.renderFilterPills();
    this.renderList();
    this.attachEvents();
  }

  attachEvents() {
    const searchInput = document.getElementById('pathologyLocalSearch');
    const clearBtn = document.getElementById('clearLocalSearch');
    const urgenciasBtn = document.getElementById('btnFilterUrgencias');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        if (clearBtn) {
          clearBtn.classList.toggle('is-hidden', !this.searchQuery);
        }
        this.renderList();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          this.searchQuery = '';
          clearBtn.classList.add('is-hidden');
          this.renderList();
          searchInput.focus();
        }
      });
    }

    if (urgenciasBtn) {
      urgenciasBtn.addEventListener('click', () => {
        if (this.activeFilter === 'urgencias') {
          this.setFilter('todas');
        } else {
          this.setFilter('urgencias');
        }
      });
    }
  }

  renderFilterPills() {
    const bar = document.getElementById('categoryFilterBar');
    if (!bar) return;

    const filters = [
      { id: 'todas', label: 'Todas las Patologías' },
      { id: 'favoritos', label: '⭐ Guardados' },
      ...CATEGORIAS_PATOLOGIAS.map((c) => ({ id: c.id, label: c.nombre }))
    ];

    bar.innerHTML = filters
      .map(
        (f) => `
      <button class="filter-pill ${this.activeFilter === f.id ? 'active' : ''}" data-filter="${f.id}">
        ${f.label}
      </button>
    `
      )
      .join('');

    bar.querySelectorAll('.filter-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        this.setFilter(filter);
      });
    });
  }

  getFilteredList() {
    const favs = FavoritesManager.getFavorites();

    return PATOLOGIAS.filter((p) => {
      // Category filter
      if (this.activeFilter === 'favoritos') {
        if (!favs.includes(p.id)) return false;
      } else if (this.activeFilter === 'urgencias') {
        if (!p.esUrgenciaGuardia) return false;
      } else if (this.activeFilter !== 'todas') {
        if (p.categoria !== this.activeFilter) return false;
      }

      // Search text filter
      if (this.searchQuery) {
        const matchTitle = p.nombre.toLowerCase().includes(this.searchQuery);
        const matchCie = p.cie10.toLowerCase().includes(this.searchQuery);
        const matchSummary = p.resumenCorto.toLowerCase().includes(this.searchQuery);
        const matchDiag = p.criteriosDiagnosticos?.toLowerCase().includes(this.searchQuery);
        if (!matchTitle && !matchCie && !matchSummary && !matchDiag) return false;
      }

      return true;
    });
  }

  renderList() {
    const container = document.getElementById('pathologiesListContainer');
    const counter = document.getElementById('pathologyCount');
    if (!container) return;

    const list = this.getFilteredList();

    if (counter) {
      counter.textContent = `${list.length} patología${list.length === 1 ? '' : 's'}`;
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="empty-state-box">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <p>No se encontraron patologías con los filtros actuales.</p>
          <button class="btn-secondary" id="btnResetFilters">Ver todas las patologías</button>
        </div>
      `;
      const resetBtn = document.getElementById('btnResetFilters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.searchQuery = '';
          const s = document.getElementById('pathologyLocalSearch');
          if (s) s.value = '';
          this.setFilter('todas');
        });
      }
      return;
    }

    const favs = FavoritesManager.getFavorites();

    container.innerHTML = list
      .map((p) => {
        const isFav = favs.includes(p.id);
        const catObj = CATEGORIAS_PATOLOGIAS.find((c) => c.id === p.categoria);
        const catName = catObj ? catObj.nombre : p.categoria;

        return `
        <article class="pathology-card ${p.esUrgenciaGuardia ? 'is-urgent-card' : ''}" data-id="${p.id}">
          <div class="card-top-row">
            <span class="category-tag">${catName}</span>
            <div class="badges-group">
              ${p.esUrgenciaGuardia ? '<span class="badge-urgent">URGENCIA</span>' : ''}
              <span class="badge-cie">${p.cie10}</span>
              <button class="btn-fav-toggle ${isFav ? 'is-fav' : ''}" data-fav-id="${p.id}" aria-label="Guardar en favoritos">
                ${isFav ? '★' : '☆'}
              </button>
            </div>
          </div>

          <h3 class="card-pathology-title">${p.nombre}</h3>
          <p class="card-pathology-desc">${p.resumenCorto}</p>

          <div class="card-quick-rx">
            <span class="rx-label">1ª Línea de Guardia:</span>
            <span class="rx-text">${p.farmacoterapia?.primeraLinea?.[0] || 'Ver ficha clínica'}</span>
          </div>

          <div class="card-footer-action">
            <span class="view-link">Ver criterios clínicos y conducta →</span>
          </div>
        </article>
      `;
      })
      .join('');

    // Attach card clicks
    container.querySelectorAll('.pathology-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        // If clicking the fav button, do not open detail
        if (e.target.closest('.btn-fav-toggle')) return;
        const id = card.getAttribute('data-id');
        this.openDetail(id);
      });
    });

    // Attach fav buttons
    container.querySelectorAll('.btn-fav-toggle').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-fav-id');
        const isFav = FavoritesManager.toggleFavorite(id);
        btn.innerHTML = isFav ? '★' : '☆';
        btn.classList.toggle('is-fav', isFav);
      });
    });
  }

  updateFavIcons() {
    const favs = FavoritesManager.getFavorites();
    const btns = document.querySelectorAll('.btn-fav-toggle');
    btns.forEach((b) => {
      const id = b.getAttribute('data-fav-id');
      if (id) {
        const isFav = favs.includes(id);
        b.innerHTML = isFav ? '★' : '☆';
        b.classList.toggle('is-fav', isFav);
      }
    });
  }

  openDetail(pathologyId) {
    const p = PATOLOGIAS.find((item) => item.id === pathologyId);
    if (!p || !this.modalContainer) return;

    const isFav = FavoritesManager.isFavorite(p.id);
    const catObj = CATEGORIAS_PATOLOGIAS.find((c) => c.id === p.categoria);
    const catName = catObj ? catObj.nombre : p.categoria;

    this.modalContainer.innerHTML = `
      <div class="modal-backdrop" id="modalBackdrop">
        <div class="modal-sheet-dialog" role="dialog" aria-modal="true" aria-labelledby="modalPatTitle">
          
          <!-- Top Sticky Bar -->
          <div class="modal-header">
            <div class="modal-header-info">
              <span class="modal-category">${catName}</span>
              <h2 id="modalPatTitle" class="modal-title">${p.nombre}</h2>
              <div class="modal-tags-row">
                <span class="badge-cie">CIE-10: ${p.cie10}</span>
                ${p.esUrgenciaGuardia ? '<span class="badge-urgent">URGENCIA DE GUARDIA</span>' : ''}
              </div>
            </div>

            <div class="modal-header-actions">
              <button class="btn-modal-fav ${isFav ? 'is-fav' : ''}" id="modalFavBtn" aria-label="Favorito">
                ${isFav ? '★' : '☆'}
              </button>
              <button class="btn-modal-close" id="modalCloseBtn" aria-label="Cerrar ficha">✕</button>
            </div>
          </div>

          <!-- Modal Scrollable Content -->
          <div class="modal-body">
            
            <!-- Resumen -->
            <div class="detail-block detail-summary-box">
              <p>${p.resumenCorto}</p>
            </div>

            <!-- Criterios Diagnósticos -->
            <div class="detail-block">
              <h3 class="detail-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Criterios Diagnósticos (DC/TMD / ICHD-3 / ICOP)
              </h3>
              <p class="criteria-text">${p.criteriosDiagnosticos}</p>
            </div>

            <!-- Características Clínicas -->
            <div class="detail-block">
              <h3 class="detail-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Características Clínicas
              </h3>
              <ul class="detail-list">
                ${(p.caracteristicasClinicas || []).map((c) => `<li>${c}</li>`).join('')}
              </ul>
            </div>

            <!-- Pruebas Clínicas y Maniobras -->
            <div class="detail-block">
              <h3 class="detail-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Examen Físico y Pruebas en Sillón
              </h3>
              <ul class="detail-list">
                ${(p.pruebasClinicas || []).map((t) => `<li>${t}</li>`).join('')}
              </ul>
            </div>

            <!-- Conducta en Guardia Hospitalaria -->
            <div class="detail-block urgent-action-card">
              <h3 class="detail-section-title urgent-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                Conducta y Manejo Inmediato en Guardia
              </h3>
              <ul class="detail-list urgent-list">
                ${(p.conductaGuardia || []).map((act) => `<li><strong>${act}</strong></li>`).join('')}
              </ul>
            </div>

            <!-- Farmacoterapia -->
            <div class="detail-block rx-card">
              <h3 class="detail-section-title rx-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
                Farmacoterapia de Urgencia (Huff & Benoliel 2023)
              </h3>
              
              <div class="rx-group">
                <span class="rx-sub-badge first-line">1ª LÍNEA DE ELECCIÓN</span>
                <ul class="rx-list">
                  ${(p.farmacoterapia.primeraLinea || []).map((rx) => `<li>${rx}</li>`).join('')}
                </ul>
              </div>

              ${p.farmacoterapia.segundaLinea && p.farmacoterapia.segundaLinea.length > 0 && p.farmacoterapia.segundaLinea[0] !== 'No aplica' ? `
                <div class="rx-group">
                  <span class="rx-sub-badge second-line">2ª LÍNEA / ALTERNATIVA</span>
                  <ul class="rx-list">
                    ${p.farmacoterapia.segundaLinea.map((rx) => `<li>${rx}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              ${p.farmacoterapia.precauciones ? `
                <div class="rx-precaution-alert">
                  <strong>Precaución:</strong> ${p.farmacoterapia.precauciones}
                </div>
              ` : ''}
            </div>

            <!-- Tratamiento Ambulatorio / Derivación -->
            ${p.tratamientoAmbulatorio ? `
              <div class="detail-block">
                <h3 class="detail-section-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Tratamiento Ambulatorio Posterior
                </h3>
                <p class="ambulatory-text">${p.tratamientoAmbulatorio}</p>
              </div>
            ` : ''}

            <!-- Diagnóstico Diferencial Cruzado -->
            ${p.diagnosticoDiferencial && p.diagnosticoDiferencial.length > 0 ? `
              <div class="detail-block">
                <h3 class="detail-section-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
                  Diagnósticos Diferenciales (Click para ver ficha)
                </h3>
                <div class="differentials-chips-wrap">
                  ${p.diagnosticoDiferencial.map((diffId) => {
                    const diffPat = PATOLOGIAS.find((item) => item.id === diffId);
                    const name = diffPat ? diffPat.nombre : diffId;
                    return `<button class="chip-diff-link" data-diff-id="${diffId}">→ ${name}</button>`;
                  }).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Perlas Clínicas de Huff & Benoliel -->
            ${p.perlasHuffBenoliel ? `
              <div class="detail-block quote-pearl-card">
                <div class="pearl-badge">PERLA CLÍNICA HUFF & BENOLIEL (2023)</div>
                <p class="pearl-text">${p.perlasHuffBenoliel}</p>
              </div>
            ` : ''}

          </div>

          <!-- Bottom Close button -->
          <div class="modal-footer">
            <button class="btn-secondary btn-full-width" id="modalFooterClose">Cerrar Ficha</button>
          </div>

        </div>
      </div>
    `;

    document.body.classList.add('modal-open');

    // Attach events inside modal
    const closeBtn = document.getElementById('modalCloseBtn');
    const footerClose = document.getElementById('modalFooterClose');
    const backdrop = document.getElementById('modalBackdrop');
    const favBtn = document.getElementById('modalFavBtn');

    const closeModal = () => {
      this.modalContainer.innerHTML = '';
      document.body.classList.remove('modal-open');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (footerClose) footerClose.addEventListener('click', closeModal);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
      });
    }

    if (favBtn) {
      favBtn.addEventListener('click', () => {
        const isNow = FavoritesManager.toggleFavorite(p.id);
        favBtn.innerHTML = isNow ? '★' : '☆';
        favBtn.classList.toggle('is-fav', isNow);
      });
    }

    // Differential links
    this.modalContainer.querySelectorAll('.chip-diff-link').forEach((chip) => {
      chip.addEventListener('click', () => {
        const diffId = chip.getAttribute('data-diff-id');
        this.openDetail(diffId);
      });
    });
  }
}
