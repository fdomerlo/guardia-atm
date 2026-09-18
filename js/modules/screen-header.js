/**
 * guardia-atm - Componente de Encabezado Estético por Pantalla
 * Reemplaza la barra superior fija tradicional con un diseño moderno, espacioso y responsive.
 */

export function renderScreenHeader({ category, title, subtitle, searchInputHtml = '' }) {
  const isDark = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark';
  
  return `
    <header class="screen-header" role="banner">
      <div class="screen-header-top">
        <div class="screen-brand">
          <img src="./assets/folp-logo.svg" alt="FOLP UNLP" class="screen-brand-logo" width="130" height="30" />
          <span class="screen-brand-badge">HOSPITAL</span>
        </div>
        <div class="screen-actions">
          <button class="screen-action-btn btn-open-search" aria-label="Buscador global" title="Búsqueda global (patologías, síntomas, fármacos)">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <button class="screen-action-btn btn-toggle-theme" aria-label="Cambiar modo oscuro/claro" title="Cambiar tema">
            ${isDark ? '☀️' : '🌙'}
          </button>
          <button class="screen-action-btn btn-open-info" aria-label="Información institucional" title="Información y Guía">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="screen-header-content">
        <span class="screen-category-badge">${category}</span>
        <h1 class="screen-title">${title}</h1>
        <p class="screen-subtitle">${subtitle}</p>
        ${searchInputHtml ? `<div class="screen-search-box">${searchInputHtml}</div>` : ''}
      </div>
    </header>
  `;
}
