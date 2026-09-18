/**
 * guardia-atm - Banderas Rojas y Criterios de Alarma en Guardia
 * Basado en Huff & Benoliel (2023) y guías clínicas hospitalarias de urgencia.
 */

export const BANDERAS_ROJAS = [
  {
    id: 'arteritis-temporal',
    titulo: 'Arteritis de Células Gigantes / Arteritis Temporal',
    gravedad: 'CRÍTICA - RIESGO VITAL / PÉRDIDA VISUAL',
    icono: 'alert-triangle',
    color: '#DC2626',
    fondo: '#FEF2F2',
    criterios: [
      'Paciente mayor de 50 años (especialmente mujeres)',
      'Cefalea temporal o parietal de inicio reciente, punzante o quemante',
      'Claudicación mandibular (dolor o fatiga al masticar o hablar)',
      'Arteria temporal dolorosa, indurada, nodular o con pulso disminuido',
      'Alteraciones visuales: visión borrosa, diplopía o pérdida visual transitoria (amaurosis fugaz)'
    ],
    conducta: [
      'DERIVACIÓN MÉDICA INMEDIATA A GUARDIA CLÍNICA / OFTALMOLOGÍA.',
      'Solicitar VSG (Velocidad de Sedimentación Globular) y PCR urgente: habitualmente muy elevadas (VSG > 50 mm/h).',
      'NO demorar el inicio de corticoides sistémicos (Prednisona 60 mg/día) si la sospecha es alta para evitar ceguera irreversible.'
    ],
    cie10: 'M31.5'
  },
  {
    id: 'snoop4-cefaleas',
    titulo: 'Criterios SNOOP4 (Cefaleas de Riesgo Intracraneal)',
    gravedad: 'ALTA - DERIVACIÓN NEUROLÓGICA URGENTE',
    icono: 'brain',
    color: '#B91C1C',
    fondo: '#FEF2F2',
    criterios: [
      'S (Systemic): Fiebre, rigidez de nuca, pérdida de peso, antecedentes oncológicos o inmunodepresión.',
      'N (Neurologic): Focalidad neurológica (asimetría facial no habitual, debilidad motora, afasia, diplopía, alteración del estado de conciencia).',
      'O (Onset): Comienzo súbito en "estallido" o "trueno" (máxima intensidad en < 1 minuto) — descartar Hemorragia Subaracnoidea.',
      'O (Older): Inicio por primera vez en mayores de 50 años.',
      'P (Pattern/Progression): Cambio de patrón en cefalea previa, o empeoramiento con tos, maniobras de Valsalva o cambios posturales.'
    ],
    conducta: [
      'Derivación urgente a guardia médica hospitalaria.',
      'Requiere neuroimagen (TAC / RMN) o punción lumbar según criterio neurológico.',
      'NO prescribir triptanes si se sospecha accidente cerebrovascular o hemorragia.'
    ],
    cie10: 'G44.8'
  },
  {
    id: 'infeccion-fascial-profunda',
    titulo: 'Infección Odontogénica Difusa / Angina de Ludwig',
    gravedad: 'CRÍTICA - RIESGO DE ASFIXIA Y SEPSIS',
    icono: 'shield-alert',
    color: '#DC2626',
    fondo: '#FEF2F2',
    criterios: [
      'Tumefacción cervical o submandibular de consistencia leñosa, bilateral (Angina de Ludwig)',
      'Elevación y protrusión de la lengua con dificultad para deglutir (disfagia) o hablar (voz de papa caliente)',
      'Dificultad respiratoria o estridor',
      'Trismus severo (< 15 mm) de progresión rápida',
      'Fiebre alta (> 38.5°C), taquicardia o alteración del estado general'
    ],
    conducta: [
      'INTERNACIÓN INMEDIATA EN GUARDIA HOSPITALARIA / CIRUGÍA MAXILOFACIAL.',
      'Asegurar la vía aérea (posible necesidad de intubación o traqueostomía de urgencia).',
      'Antibioticoterapia endovenosa de amplio espectro (ej. Ampicilina/Sulbactam + Metronidazol) y drenaje quirúrgico de espacios comprometidos.'
    ],
    cie10: 'K12.2'
  },
  {
    id: 'luxacion-atm-aguda',
    titulo: 'Luxación Mandibular Aguda (Bloqueo Abierto Irreducible)',
    gravedad: 'MODERADA-ALTA - RESOLUCIÓN MANUAL INMEDIATA',
    icono: 'maximize-2',
    color: '#D97706',
    fondo: '#FFFBEB',
    criterios: [
      'Incapacidad súbita para cerrar la boca luego de apertura extrema (bostezo, procedimiento odontológico, vómito)',
      'Mordida abierta anterior con contacto solo en molares posteriores si es unilateral, o apertura fija completa si es bilateral',
      'Depresión palpable preauricular por el cóndilo desplazado por delante de la eminencia articular',
      'Dolor severo y espasmo secundario reflejo de músculos masetero y pterigoideos'
    ],
    conducta: [
      'Realizar de inmediato la Maniobra de Nelatón en el sillón de guardia.',
      'Si hay espasmo muscular muy intenso o paciente no colaborador, infiltración anestésica periarticular/pterigoidea o sedación intravenosa.',
      'Post-reducción: vendaje de Barton elástico por 24-48 hs, dieta líquida/blanda estricta y AINEs + relajante muscular.'
    ],
    cie10: 'S03.0 / M26.62'
  }
];

export const ASISTENTE_TRIAJE_PREGUNTAS = [
  {
    id: 'motivo_principal',
    pregunta: '¿Cuál es el motivo principal de consulta en la guardia?',
    opciones: [
      {
        texto: 'Mandíbula trabada / No puede abrir o no puede cerrar la boca',
        icono: 'lock',
        siguiente: 'tipo_bloqueo'
      },
      {
        texto: 'Dolor agudo en la zona de la articulación (delante del oído)',
        icono: 'activity',
        siguiente: 'caracter_articular'
      },
      {
        texto: 'Dolor muscular facial / mejilla / sien / dolor al masticar',
        icono: 'user',
        siguiente: 'caracter_muscular'
      },
      {
        texto: 'Dolor punzante tipo descarga eléctrica / lancinante breve',
        icono: 'zap',
        siguiente: 'caracter_neuropatico'
      },
      {
        texto: 'Dolor dental que persiste pese a no encontrar causa clara en la pieza',
        icono: 'smile',
        siguiente: 'caracter_dental_no_odon'
      },
      {
        texto: 'Cefalea intensa / dolor de cabeza asociado a dolor orofacial',
        icono: 'cloud-lightning',
        siguiente: 'caracter_cefalea'
      },
      {
        texto: 'Lesiones, aftas, quemazón o úlceras en mucosa oral o lengua',
        icono: 'droplet',
        siguiente: 'caracter_mucosa'
      }
    ]
  },
  {
    id: 'tipo_bloqueo',
    pregunta: '¿En qué posición se encuentra trabada la mandíbula?',
    opciones: [
      {
        texto: 'Boca completamente abierta: no puede cerrar (quedó trabado al bostezar o abrir mucho)',
        diagnosticoSugerido: 'luxacion-abierta',
        banderaRoja: true
      },
      {
        texto: 'Boca cerrada: no puede abrir más de 20-25 mm (bloqueo cerrado súbito, antes tenía chasquidos que desaparecieron)',
        diagnosticoSugerido: 'desplazamiento-sin-reduccion-limitacion'
      },
      {
        texto: 'Boca cerrada con dolor muscular severo / trismus tras extracción de muela de juicio o anestesia troncular',
        diagnosticoSugerido: 'miospasmo'
      }
    ]
  },
  {
    id: 'caracter_articular',
    pregunta: '¿Qué características tiene el dolor en la articulación (ATM)?',
    opciones: [
      {
        texto: 'Dolor al mover la mandíbula o masticar, con chasquido (clic) que reduce al abrir la boca',
        diagnosticoSugerido: 'desplazamiento-con-reduccion'
      },
      {
        texto: 'Dolor localizado a la palpación del polo lateral, sin chasquidos evidentes, inflamatorio',
        diagnosticoSugerido: 'artralgia'
      },
      {
        texto: 'Dolor sordo persistente con crepitación ósea (sensación de arena o roce) y antecedentes de artrosis',
        diagnosticoSugerido: 'osteoartritis'
      }
    ]
  },
  {
    id: 'caracter_muscular',
    pregunta: '¿Qué se encuentra en la palpación muscular (masetero, temporal)?',
    opciones: [
      {
        texto: 'Dolor muscular que al palpar reproduce dolor en otra zona (dientes, oído, ceja)',
        diagnosticoSugerido: 'dolor-miofascial-referido'
      },
      {
        texto: 'Dolor limitado exclusivamente al cuerpo del músculo palpado, sin dolor a distancia',
        diagnosticoSugerido: 'mialgia-local'
      },
      {
        texto: 'Contracción sostenida e involuntaria muy dolorosa, mandíbula dura como una piedra',
        diagnosticoSugerido: 'miospasmo'
      }
    ]
  },
  {
    id: 'caracter_neuropatico',
    pregunta: '¿Cómo describe el paciente este dolor tipo choque eléctrico?',
    opciones: [
      {
        texto: 'Paroxismos de pocos segundos, intensísimos, desencadenados al lavarse los dientes, tocarse la cara o afeitarse',
        diagnosticoSugerido: 'neuralgia-trigemino'
      },
      {
        texto: 'Dolor ardiente o punzante continuo en encía/labio posterior a una cirugía, implante o endodoncia previa',
        diagnosticoSugerido: 'dolor-neuropatico-postraumatico'
      },
      {
        texto: 'Dolor paroxístico en la garganta, base de la lengua o amígdala al tragar saliva o alimentos',
        diagnosticoSugerido: 'neuralgia-glosofaringeo'
      }
    ]
  },
  {
    id: 'caracter_dental_no_odon',
    pregunta: '¿Cuál es la presentación del dolor dental sin causa local aparente?',
    opciones: [
      {
        texto: 'Dolor dental que aumenta al apretar dientes o palpar masetero/temporal (dolor referido)',
        diagnosticoSugerido: 'odontalgia-miofascial'
      },
      {
        texto: 'Sensación de que los dientes "no encajan bien" con angustia y múltiples ajustes oclusales previos',
        diagnosticoSugerido: 'disestesia-oclusal'
      },
      {
        texto: 'Dolor dental punzante breve tras estímulo cutáneo facial (neuralgia en rama dentaria)',
        diagnosticoSugerido: 'neuralgia-trigemino'
      }
    ]
  },
  {
    id: 'caracter_cefalea',
    pregunta: '¿Cómo se presenta la cefalea en el paciente?',
    opciones: [
      {
        texto: 'Unilateral, pulsátil, con náuseas, fotofobia y empeoramiento con actividad física (o en región maxilofacial)',
        diagnosticoSugerido: 'migrana-orofacial'
      },
      {
        texto: 'Opresiva en banda ("casco"), bilateral, de intensidad leve-moderada, no pulsátil',
        diagnosticoSugerido: 'cefalea-tensional'
      },
      {
        texto: 'Dolor periocular agudísimo con lagrimeo, ojo rojo y congestión nasal del mismo lado',
        diagnosticoSugerido: 'cefalea-racimos'
      },
      {
        texto: 'Mayor de 50 años con dolor temporal continuo, claudicación al masticar y alteración visual',
        diagnosticoSugerido: 'arteritis-temporal',
        banderaRoja: true
      }
    ]
  },
  {
    id: 'caracter_mucosa',
    pregunta: '¿Qué tipo de lesión mucosa o dolor presenta?',
    opciones: [
      {
        texto: 'Quemazón continua en lengua o paladar sin ninguna lesión visible, peor a la tarde/noche',
        diagnosticoSugerido: 'boca-urente'
      },
      {
        texto: 'Vesículas que se rompen en racimo en labio o encía queratinizada, con hormigueo previo',
        diagnosticoSugerido: 'herpes-simple'
      },
      {
        texto: 'Papilas gingivales ulceradas y decapitadas, sangrado espontáneo, dolor severo y fetidez',
        diagnosticoSugerido: 'guna'
      },
      {
        texto: 'Placas blanquecinas que desprenden al raspado dejando base eritematosa',
        diagnosticoSugerido: 'candidiasis'
      }
    ]
  }
];
