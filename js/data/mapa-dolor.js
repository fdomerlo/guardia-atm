/**
 * guardia-atm - Mapa Interactivo de Puntos Gatillo y Dolor Muscular Referido
 * Basado en Huff & Benoliel (2023) Fig. 1 y Simons, Travell & Simons.
 */

export const MUSCULOS_DOLOR = [
  {
    id: 'masetero-superficial',
    nombre: 'Masetero Superficial',
    grupo: 'Músculos Masticadores',
    zonaPalpacion: 'Cuerpo del músculo masetero, palpación bimanual en pinza desde el ángulo mandibular hasta el tercio medio.',
    dolorReferido: [
      'Molares inferiores (muy frecuente causa de falsa pulpitis o dolor dental no odontogénico)',
      'Molares superiores y reborde gingival',
      'Borde basal de la mandíbula',
      'Arco superciliar y ceja'
    ],
    sintomasAsociados: 'Limitación de la apertura bucal (trismus moderado), dolor al apretar los dientes en céntrica.',
    posicionEsquema: { x: 44.4, y: 59.4 },
    triggerPoint: { x: 355, y: 475, label: 'Masetero Superficial' },
    zonasReferidas: [
      { x: 325, y: 465, r: 26, label: 'Molares inferiores (falsa pulpitis)', icon: '🦷' },
      { x: 325, y: 442, r: 22, label: 'Molares superiores y encía', icon: '🦷' },
      { x: 264, y: 288, r: 22, label: 'Arco superciliar y ceja', icon: '⚡' },
      { x: 352, y: 520, r: 22, label: 'Borde basal de mandíbula', icon: '⚡' }
    ],
    zonaReferenciaSvg: 'molares-inf-sup',
    maniobraClinica: 'Palpar con dedo índice intraoral y pulgar extraoral comprimiendo las bandas tensas longitudinales.'
  },
  {
    id: 'masetero-profundo',
    nombre: 'Masetero Profundo',
    grupo: 'Músculos Masticadores',
    zonaPalpacion: 'Justo por debajo del arco cigomático, por delante del trago de la oreja.',
    dolorReferido: [
      'Oído (otalgia refleja profunda referida)',
      'Articulación Temporomandibular (simula artralgia o capsulitis de ATM)',
      'Tinnitus subjetivo unilateral'
    ],
    sintomasAsociados: 'Sensación de oído tapado o zumbido sin causa otorrinolaringológica.',
    posicionEsquema: { x: 49.4, y: 53.1 },
    triggerPoint: { x: 395, y: 425, label: 'Masetero Profundo' },
    zonasReferidas: [
      { x: 440, y: 380, r: 30, label: 'Oído (otalgia refleja y tinnitus)', icon: '👂' },
      { x: 415, y: 380, r: 24, label: 'Articulación Temporomandibular (ATM)', icon: '⚡' }
    ],
    zonaReferenciaSvg: 'oido-atm',
    maniobraClinica: 'Palpación digital plana directamente sobre el tercio superior del masetero mientras el paciente entreabre la boca.'
  },
  {
    id: 'temporal-anterior',
    nombre: 'Temporal (Porción Anterior)',
    grupo: 'Músculos Masticadores',
    zonaPalpacion: 'Fosa temporal anterior, por encima del tercio externo de la ceja (fibras verticales).',
    dolorReferido: [
      'Incisivos superiores anteriores (dientes 11, 12, 21, 22)',
      'Cefalea supraorbital y dolor retroocular frontal'
    ],
    sintomasAsociados: 'Cefalea opresiva frontal matutina por apretamiento nocturno.',
    posicionEsquema: { x: 40.6, y: 38.8 },
    triggerPoint: { x: 325, y: 310, label: 'Temporal Anterior' },
    zonasReferidas: [
      { x: 245, y: 438, r: 24, label: 'Incisivos superiores (11, 12, 21, 22)', icon: '🦷' },
      { x: 270, y: 280, r: 28, label: 'Cefalea supraorbital y retroocular', icon: '⚡' }
    ],
    zonaReferenciaSvg: 'incisivos-sup',
    maniobraClinica: 'Comprimir firmemente contra la escama del hueso temporal con las yemas de los dedos.'
  },
  {
    id: 'temporal-medio',
    nombre: 'Temporal (Porción Media)',
    grupo: 'Músculos Masticadores',
    zonaPalpacion: 'Zona temporal media superior al arco cigomático (fibras oblicuas).',
    dolorReferido: [
      'Caninos y premolares superiores del mismo lado',
      'Sien y zona lateral craneal'
    ],
    sintomasAsociados: 'Falso dolor dental en premolares que no responde a pruebas térmicas pulpares.',
    posicionEsquema: { x: 48.8, y: 33.1 },
    triggerPoint: { x: 390, y: 265, label: 'Temporal Medio' },
    zonasReferidas: [
      { x: 280, y: 440, r: 24, label: 'Caninos y premolares superiores', icon: '🦷' },
      { x: 350, y: 250, r: 28, label: 'Sien y región lateral craneal', icon: '⚡' }
    ],
    zonaReferenciaSvg: 'premolares-sup',
    maniobraClinica: 'Palpación plana ascendente siguiendo la dirección de las fibras musculares.'
  },
  {
    id: 'temporal-posterior',
    nombre: 'Temporal (Porción Posterior)',
    grupo: 'Músculos Masticadores',
    zonaPalpacion: 'Por encima y detrás del pabellón auricular (fibras horizontales).',
    dolorReferido: [
      'Molares superiores',
      'Región retroauricular y parietal lateral'
    ],
    sintomasAsociados: 'Dolor de cabeza detrás de la oreja que empeora al masticar chicle o alimentos duros.',
    posicionEsquema: { x: 58.1, y: 36.3 },
    triggerPoint: { x: 465, y: 290, label: 'Temporal Posterior' },
    zonasReferidas: [
      { x: 325, y: 442, r: 22, label: 'Molares superiores', icon: '🦷' },
      { x: 475, y: 360, r: 28, label: 'Zona retroauricular y parietal', icon: '⚡' }
    ],
    zonaReferenciaSvg: 'molares-sup-retro',
    maniobraClinica: 'Palpar detrás de la oreja mientras se le solicita al paciente que apriete los dientes.'
  },
  {
    id: 'pterigoideo-medial',
    nombre: 'Pterigoideo Medial (Interno)',
    grupo: 'Músculos Masticadores',
    zonaPalpacion: 'Palpación intraoral en la cara medial de la rama mandibular (por detrás de la tuberosidad) o palpación extraoral bajo el ángulo mandibular.',
    dolorReferido: [
      'Zona profunda retromandibular y cuello',
      'Base de la lengua y suelo de la boca',
      'Faringe (sensación dolorosa o molestia al deglutir alimentos o saliva)'
    ],
    sintomasAsociados: 'Trismus marcado, molestia faríngea sin signos de infección amigdalina.',
    posicionEsquema: { x: 48.8, y: 63.8 },
    triggerPoint: { x: 390, y: 510, label: 'Pterigoideo Medial' },
    zonasReferidas: [
      { x: 330, y: 500, r: 26, label: 'Faringe (deglución) y suelo de boca', icon: '👅' },
      { x: 405, y: 460, r: 24, label: 'Zona retromandibular y cuello', icon: '⚡' }
    ],
    zonaReferenciaSvg: 'faringe-suelo-boca',
    maniobraClinica: 'Enganchar el borde inferior del ángulo de la mandíbula con el dedo empujando hacia arriba y adentro.'
  },
  {
    id: 'pterigoideo-lateral',
    nombre: 'Pterigoideo Lateral (Externo)',
    grupo: 'Músculos Masticadores',
    zonaPalpacion: 'Palpación indirecta por detrás de la tuberosidad maxilar en fondo de surco superior, o mediante contracción resistida (protrusión y lateralidad contralateral forzada).',
    dolorReferido: [
      'Zona articular de ATM anterior',
      'Seno maxilar y pómulo (simula sinusitis maxilar)'
    ],
    sintomasAsociados: 'Sensación de alteración oclusal aguda (contacto prematuro anterior o posterior) por espasmo que tracciona el disco/cóndilo.',
    posicionEsquema: { x: 46.9, y: 50.0 },
    triggerPoint: { x: 375, y: 400, label: 'Pterigoideo Lateral' },
    zonasReferidas: [
      { x: 415, y: 380, r: 24, label: 'Zona articular de ATM anterior', icon: '⚡' },
      { x: 300, y: 380, r: 28, label: 'Seno maxilar y pómulo (simula sinusitis)', icon: '👃' }
    ],
    zonaReferenciaSvg: 'seno-maxilar-atm',
    maniobraClinica: 'Pedir al paciente que realice protrusión mandibular contra la resistencia firme de la mano del operador.'
  },
  {
    id: 'esternocleidomastoideo',
    nombre: 'Esternocleidomastoideo (ECM)',
    grupo: 'Músculos Cervicales',
    zonaPalpacion: 'Palpación en pinza a lo largo de todo el vientre muscular en el cuello anterior y lateral.',
    dolorReferido: [
      'Vértice craneal (cúspide de la cabeza)',
      'Región occipital y ceja',
      'Mejilla y ángulo de la mandíbula',
      'Oído y mareos posturales o desequilibrio'
    ],
    sintomasAsociados: 'Sensación de inestabilidad o mareo al girar el cuello, lagrimeo o coriza refleja.',
    posicionEsquema: { x: 56.3, y: 78.8 },
    triggerPoint: { x: 450, y: 630, label: 'Esternocleidomastoideo' },
    zonasReferidas: [
      { x: 440, y: 115, r: 35, label: 'Vértice craneal (coronilla)', icon: '⚡' },
      { x: 550, y: 320, r: 30, label: 'Región occipital', icon: '⚡' },
      { x: 265, y: 285, r: 24, label: 'Ceja y frente', icon: '⚡' },
      { x: 440, y: 380, r: 25, label: 'Oído (mareos y lagrimeo)', icon: '👂' }
    ],
    zonaReferenciaSvg: 'vertice-occipital-mejilla',
    maniobraClinica: 'Solicitar giro de cabeza contralateral y pinzar el músculo entre índice y pulgar.'
  },
  {
    id: 'trapecio-superior',
    nombre: 'Trapecio Superior',
    grupo: 'Músculos Cervicales y de Hombro',
    zonaPalpacion: 'Borde superior libre del trapecio en la unión del cuello con el hombro.',
    dolorReferido: [
      'Cuello posterolateral',
      'Apófisis mastoides detrás de la oreja',
      'Ángulo de la mandíbula',
      'Sien (patrón clásico de "signo de interrogación" que culmina en la fosa temporal)'
    ],
    sintomasAsociados: 'Tensión extrema en hombros, agravado por estrés o mala postura en el trabajo.',
    posicionEsquema: { x: 76.3, y: 93.8 },
    triggerPoint: { x: 610, y: 750, label: 'Trapecio Superior' },
    zonasReferidas: [
      { x: 520, y: 530, r: 30, label: 'Cuello posterolateral', icon: '⚡' },
      { x: 465, y: 385, r: 25, label: 'Apófisis mastoides', icon: '⚡' },
      { x: 360, y: 255, r: 26, label: 'Sien (patrón en "signo de interrogación")', icon: '⚡' }
    ],
    zonaReferenciaSvg: 'signo-interrogacion-sien',
    maniobraClinica: 'Pinzar la masa muscular carnosa del borde superior del hombro.'
  }
];

export const ZONAS_DOLOR_DENTAL_REFERIDO = [
  {
    dienteAfectado: 'Incisivos Superiores (11, 12, 21, 22)',
    musculoCausante: 'Temporal (Fibras Anteriores)',
    caracteristica: 'Prueba de vitalidad pulpar normal, percusión dental negativa. Al presionar la sien anterior se reproduce el dolor dental exacto.'
  },
  {
    dienteAfectado: 'Caninos y Premolares Superiores (13, 14, 15, 23, 24, 25)',
    musculoCausante: 'Temporal (Fibras Medias)',
    caracteristica: 'Dientes sanos o restauraciones en buen estado; palpación en la fosa temporal media dispara el dolor dental.'
  },
  {
    dienteAfectado: 'Molares Superiores (16, 17, 18, 26, 27, 28)',
    musculoCausante: 'Masetero Superficial (Porción Superior) y Temporal Posterior',
    caracteristica: 'Dolor sordo y difuso al apretar la mandíbula o masticar comidas consistentes.'
  },
  {
    dienteAfectado: 'Molares Inferiores (36, 37, 38, 46, 47, 48)',
    musculoCausante: 'Masetero Superficial (Porción Inferior)',
    caracteristica: 'Causa más común de odontalgia no odontogénica en guardia; el paciente solicita endodoncia en una pieza sin patología periapical.'
  },
  {
    dienteAfectado: 'Incisivos Inferiores (31, 32, 41, 42)',
    musculoCausante: 'Vientre Anterior del Músculo Digástrico',
    caracteristica: 'Dolor en dientes anteroinferiores exacerbado al tragar o abrir la boca contra resistencia.'
  }
];
