/**
 * guardia-atm - Módulo de Favoritos y Marcadores
 * Almacenamiento local persistente (LocalStorage) para acceso rápido en guardia.
 */

const STORAGE_KEY = 'guardia_atm_favoritos_v1';

export class FavoritesManager {
  static getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading favorites from localStorage:', e);
      return [];
    }
  }

  static isFavorite(id) {
    const list = this.getFavorites();
    return list.includes(id);
  }

  static toggleFavorite(id) {
    const list = this.getFavorites();
    const index = list.indexOf(id);
    let isNowFav = false;

    if (index >= 0) {
      list.splice(index, 1);
      isNowFav = false;
    } else {
      list.push(id);
      isNowFav = true;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('favorites-updated', { detail: { id, isFavorite: isNowFav } }));
    } catch (e) {
      console.warn('Error saving favorites to localStorage:', e);
    }

    return isNowFav;
  }
}
