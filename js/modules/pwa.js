/**
 * guardia-atm - Módulo de Registro PWA y Modo Offline
 * Gestión del Service Worker, estado de conectividad y banner de instalación nativa.
 */

export class PWAManager {
  static deferredPrompt = null;

  static init() {
    this.registerServiceWorker();
    this.setupInstallPrompt();
    this.setupConnectivityMonitor();
  }

  static registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('./sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker registrado exitosamente con scope:', reg.scope);
          })
          .catch((err) => {
            console.warn('[PWA] Error al registrar Service Worker:', err);
          });
      });
    }
  }

  static setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      console.log('[PWA] Evento beforeinstallprompt capturado.');

      // Notify UI
      const installBtn = document.getElementById('btnInstallPwa');
      const installBanner = document.getElementById('pwaInstallBanner');

      if (installBtn) installBtn.classList.remove('is-hidden');
      if (installBanner) installBanner.classList.remove('is-hidden');
    });

    window.addEventListener('appinstalled', () => {
      console.log('[PWA] Aplicación instalada exitosamente en el dispositivo.');
      this.deferredPrompt = null;
      const installBtn = document.getElementById('btnInstallPwa');
      const installBanner = document.getElementById('pwaInstallBanner');
      if (installBtn) installBtn.classList.add('is-hidden');
      if (installBanner) installBanner.classList.add('is-hidden');
    });
  }

  static async promptInstall() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      console.log(`[PWA] Elección de instalación: ${outcome}`);
      this.deferredPrompt = null;
    } else {
      alert('Para instalar la aplicación:\n\n• En Android/Chrome: pulsa el menú (tres puntos) y elige "Instalar aplicación" o "Agregar a pantalla principal".\n\n• En iPhone/iPad (Safari): pulsa el botón Compartir y selecciona "Agregar al inicio".');
    }
  }

  static setupConnectivityMonitor() {
    const updateStatus = () => {
      const isOnline = navigator.onLine;
      const offlineBadge = document.getElementById('offlineIndicatorBadge');
      if (offlineBadge) {
        if (!isOnline) {
          offlineBadge.classList.remove('is-hidden');
          offlineBadge.textContent = '⚡ Modo Offline Activo · 100% Funcional';
        } else {
          offlineBadge.classList.add('is-hidden');
        }
      }
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus();
  }
}
