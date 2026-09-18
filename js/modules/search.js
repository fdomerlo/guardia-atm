/**
 * guardia-atm - Motor de Búsqueda Instantánea Offline
 * Indexa patologías, fármacos, procedimientos, puntos gatillo y banderas rojas.
 */

import { PATOLOGIAS } from '../data/patologias.js';
import { FARMACOS } from '../data/farmacos.js';
import { PROCEDIMIENTOS } from '../data/procedimientos.js';
import { MUSCULOS_DOLOR } from '../data/mapa-dolor.js';
import { BANDERAS_ROJAS } from '../data/red-flags.js';

export class SearchEngine {
  constructor() {
    this.index = [];
    this.buildIndex();
  }

  normalize(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  buildIndex() {
    this.index = [];

    // Patologías
    PATOLOGIAS.forEach((p) => {
      const searchTerms = [
        p.nombre,
        p.cie10,
        p.categoria,
        p.resumenCorto,
        p.criteriosDiagnosticos,
        ...(p.caracteristicasClinicas || []),
        ...(p.conductaGuardia || []),
        ...(p.farmacoterapia?.primeraLinea || [])
      ].join(' ');

      this.index.push({
        tipo: 'patologia',
        id: p.id,
        titulo: p.nombre,
        subtitulo: `CIE-10: ${p.cie10} · ${p.resumenCorto}`,
        categoria: p.categoria,
        esUrgencia: p.esUrgenciaGuardia,
        cie10: p.cie10,
        rawText: this.normalize(searchTerms)
      });
    });

    // Fármacos
    FARMACOS.forEach((f) => {
      const searchTerms = [
        f.nombre,
        f.grupo,
        f.presentacion,
        f.posologiaGuardia,
        f.perlasClinicas,
        ...(f.indicaciones || [])
      ].join(' ');

      this.index.push({
        tipo: 'farmaco',
        id: f.id,
        titulo: f.nombre,
        subtitulo: `Grupo: ${f.grupo.toUpperCase()} · ${f.posologiaGuardia}`,
        categoria: 'farmaco',
        esUrgencia: false,
        cie10: null,
        rawText: this.normalize(searchTerms)
      });
    });

    // Procedimientos
    PROCEDIMIENTOS.forEach((pr) => {
      const searchTerms = [
        pr.titulo,
        pr.categoria,
        pr.indicacion,
        pr.perlas,
        ...(pr.materiales || [])
      ].join(' ');

      this.index.push({
        tipo: 'procedimiento',
        id: pr.id,
        titulo: pr.titulo,
        subtitulo: `${pr.categoria} · ${pr.indicacion}`,
        categoria: 'procedimiento',
        esUrgencia: true,
        cie10: null,
        rawText: this.normalize(searchTerms)
      });
    });

    // Músculos
    MUSCULOS_DOLOR.forEach((m) => {
      const searchTerms = [
        m.nombre,
        m.grupo,
        m.zonaPalpacion,
        m.sintomasAsociados,
        ...(m.dolorReferido || [])
      ].join(' ');

      this.index.push({
        tipo: 'musculo',
        id: m.id,
        titulo: `Músculo: ${m.nombre}`,
        subtitulo: `Dolor referido a: ${m.dolorReferido.slice(0, 2).join(', ')}`,
        categoria: 'muscular',
        esUrgencia: false,
        cie10: null,
        rawText: this.normalize(searchTerms)
      });
    });

    // Banderas Rojas
    BANDERAS_ROJAS.forEach((br) => {
      const searchTerms = [
        br.titulo,
        br.gravedad,
        br.cie10,
        ...(br.criterios || []),
        ...(br.conducta || [])
      ].join(' ');

      this.index.push({
        tipo: 'bandera_roja',
        id: br.id,
        titulo: `ALERTA: ${br.titulo}`,
        subtitulo: br.gravedad,
        categoria: 'urgencia',
        esUrgencia: true,
        cie10: br.cie10,
        rawText: this.normalize(searchTerms)
      });
    });
  }

  search(query, maxResults = 25) {
    const norm = this.normalize(query);
    if (!norm || norm.length < 2) return [];

    const tokens = norm.split(/\s+/);

    const matches = this.index
      .map((item) => {
        let score = 0;
        const titleNorm = this.normalize(item.titulo);

        tokens.forEach((token) => {
          if (titleNorm.includes(token)) {
            score += 10;
            if (titleNorm.startsWith(token)) score += 5;
          } else if (item.cie10 && item.cie10.toLowerCase().includes(token)) {
            score += 15;
          } else if (item.rawText.includes(token)) {
            score += 3;
          }
        });

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    return matches.slice(0, maxResults);
  }
}
