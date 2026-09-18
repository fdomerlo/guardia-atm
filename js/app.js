/**
 * guardia-atm - Aplicación Principal y Enrutador
 * PWA para la Guardia del Hospital de la FOLP / UNLP
 * Basado en Huff & Benoliel (2023).
 */

import { SearchEngine } from './modules/search.js';
import { PWAManager } from './modules/pwa.js';
import { TriageModule } from './modules/triage.js';
import { PathologiesView } from './modules/pathologies-view.js';
import { DrugsView } from './modules/drugs-view.js';
import { ProceduresView } from './modules/procedures-view.js';
import { ReferralMapView } from './modules/referral-map-view.js';

class App {
  constructor() {
    this.currentView = 'triaje';
    this.searchEngine = new SearchEngine();
    this.init();
  }

  init() {
    // 1. Initialize PWA Service Worker & Install Listener
    PWAManager.init();

    // 2. Setup Theme (Dark / Light mode)
    this.setupTheme();

    // 3. Initialize Views
    this.pathologiesView = new PathologiesView('pathologiesViewContainer', 'modalSheetContainer');
    this.triageModule = new TriageModule('triageViewContainer', (pathologyId) => {
      this.navigateTo('patologias');
      this.pathologiesView.openDetail(pathologyId);
    });
    this.drugsView = new DrugsView('drugsViewContainer');
    this.proceduresView = new ProceduresView('proceduresViewContainer');
    this.referralMapView = new ReferralMapView('referralViewContainer');

    // 4. Setup Global Navigation
    this.setupNavigation();

    // 5. Setup Global Search Overlay
    this.setupGlobalSearch();

    // 6. Setup Info & Install Modal
    this.setupInfoModal();

    console.log('[Guardia ATM] Aplicación inicializada en modo 100% offline.');
  }

  setupTheme() {
    const savedTheme = localStorage.getItem('guardia_atm_theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const themeToggleBtn = document.getElementById('btnToggleTheme');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('guardia_atm_theme', newTheme);
        themeToggleBtn.innerHTML = isDark ? '🌙' : '☀️';
      });
      themeToggleBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    }
  }

  setupNavigation() {
    const navButtons = document.querySelectorAll('.bottom-nav-item');
    navButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetView = btn.getAttribute('data-view');
        this.navigateTo(targetView);
      });
    });

    // Handle hash navigation
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (['triaje', 'patologias', 'farmacos', 'maniobras', 'mapa'].includes(hash)) {
        this.navigateTo(hash, false);
      }
    });

    // Check initial hash
    const initialHash = window.location.hash.replace('#', '');
    if (['triaje', 'patologias', 'farmacos', 'maniobras', 'mapa'].includes(initialHash)) {
      this.navigateTo(initialHash, false);
    }
  }

  navigateTo(viewId, updateHash = true) {
    if (this.currentView === viewId && document.getElementById(`view-${viewId}`)?.classList.contains('active')) {
      return;
    }

    this.currentView = viewId;

    if (updateHash) {
      window.location.hash = viewId;
    }

    // Update bottom nav items
    document.querySelectorAll('.bottom-nav-item').forEach((item) => {
      const isCurrent = item.getAttribute('data-view') === viewId;
      item.classList.toggle('active', isCurrent);
      item.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });

    // Update view containers
    document.querySelectorAll('.view-container').forEach((vc) => {
      vc.classList.remove('active');
    });

    const activeContainer = document.getElementById(`view-${viewId}`);
    if (activeContainer) {
      activeContainer.classList.add('active');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupGlobalSearch() {
    const searchTrigger = document.getElementById('btnOpenGlobalSearch');
    const searchOverlay = document.getElementById('globalSearchOverlay');
    const searchClose = document.getElementById('btnCloseGlobalSearch');
    const searchInput = document.getElementById('globalSearchInput');
    const searchResults = document.getElementById('globalSearchResults');

    if (!searchTrigger || !searchOverlay || !searchInput || !searchResults) return;

    searchTrigger.addEventListener('click', () => {
      searchOverlay.classList.remove('is-hidden');
      searchInput.focus();
      document.body.classList.add('search-open');
    });

    const closeSearch = () => {
      searchOverlay.classList.add('is-hidden');
      searchInput.value = '';
      searchResults.innerHTML = '';
      document.body.classList.remove('search-open');
    };

    if (searchClose) searchClose.addEventListener('click', closeSearch);

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !searchOverlay.classList.contains('is-hidden')) {
        closeSearch();
      }
    });

    // Search input handler
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      if (q.length < 2) {
        searchResults.innerHTML = '<p class="search-hint">Escribe al menos 2 letras (ej. "clic", "trismus", "nelaton", "ibuprofeno", "arteritis", "K04").</p>';
        return;
      }

      const results = this.searchEngine.search(q);

      if (results.length === 0) {
        searchResults.innerHTML = `<p class="search-hint">No se encontraron coincidencias para "${q}".</p>`;
        return;
      }

      searchResults.innerHTML = `
        <div class="search-results-list">
          ${results.map((r) => `
            <div class="search-result-item" data-type="${r.tipo}" data-id="${r.id}">
              <div class="sr-top">
                <span class="sr-type-tag ${r.tipo}">${r.tipo.toUpperCase()}</span>
                ${r.cie10 ? `<span class="badge-cie">${r.cie10}</span>` : ''}
              </div>
              <h4 class="sr-title">${r.titulo}</h4>
              <p class="sr-desc">${r.subtitulo}</p>
            </div>
          `).join('')}
        </div>
      `;

      // Attach clicks to results
      searchResults.querySelectorAll('.search-result-item').forEach((item) => {
        item.addEventListener('click', () => {
          const type = item.getAttribute('data-type');
          const id = item.getAttribute('data-id');
          closeSearch();

          if (type === 'patologia') {
            this.navigateTo('patologias');
            this.pathologiesView.openDetail(id);
          } else if (type === 'farmaco') {
            this.navigateTo('farmacos');
            const targetEl = document.getElementById(`drug-${id}`);
            if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
          } else if (type === 'procedimiento') {
            this.navigateTo('maniobras');
            const targetEl = document.getElementById(`proc-${id}`);
            if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
          } else if (type === 'musculo') {
            this.navigateTo('mapa');
          } else if (type === 'bandera_roja') {
            this.navigateTo('triaje');
          }
        });
      });
    });
  }

  setupInfoModal() {
    const btnInfo = document.getElementById('btnOpenAppInfo');
    const modal = document.getElementById('appInfoModal');
    const closeBtn = document.getElementById('btnCloseAppInfo');
    const installBtn = document.getElementById('btnInstallFromInfo');

    if (!btnInfo || !modal) return;

    btnInfo.addEventListener('click', () => {
      modal.classList.remove('is-hidden');
      document.body.classList.add('modal-open');
    });

    const closeModal = () => {
      modal.classList.add('is-hidden');
      document.body.classList.remove('modal-open');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (installBtn) {
      installBtn.addEventListener('click', () => {
        PWAManager.promptInstall();
      });
    }

    // PWA Header install button
    const headerInstall = document.getElementById('btnInstallPwa');
    if (headerInstall) {
      headerInstall.addEventListener('click', () => {
        PWAManager.promptInstall();
      });
    }
  }
}

// Bootstrap on DOM ready with immediate fallback
function startApp() {
  if (!window.guardiaApp) {
    try {
      window.guardiaApp = new App();
    } catch (err) {
      console.error('[Guardia ATM] Error al inicializar:', err);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
