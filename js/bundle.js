/**
 * Guardia ATM - Universal Bundle
 * Compilado para compatibilidad completa con file:// y http://
 */

(function () {
  "use strict";


  /* === File: js/data/red-flags.js === */
/**
 * guardia-atm - Banderas Rojas y Criterios de Alarma en Guardia
 * Basado en Huff & Benoliel (2023) y guías clínicas hospitalarias de urgencia.
 */

const BANDERAS_ROJAS = [
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

const ASISTENTE_TRIAJE_PREGUNTAS = [
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


  /* === File: js/data/farmacos.js === */
/**
 * guardia-atm - Vademécum Clínico y Guía Farmacológica de Guardia
 * Basado en Huff & Benoliel (2023), págs. 41-43 y guías farmacológicas hospitalarias.
 */

const GRUPOS_FARMACOS = [
  { id: 'aines', nombre: 'AINEs (Antiinflamatorios No Esteroides)', color: '#006155' },
  { id: 'analgesicos', nombre: 'Analgésicos y Esteroides', color: '#46A3B7' },
  { id: 'relajantes', nombre: 'Relajantes Musculares', color: '#2563EB' },
  { id: 'neuropaticos', nombre: 'Fármacos para Dolor Neuropático', color: '#7C3AED' },
  { id: 'triptanes', nombre: 'Triptanes y Cefaleas Agudas', color: '#D97706' }
];

const FARMACOS = [
  {
    id: 'ibuprofeno',
    nombre: 'Ibuprofeno',
    grupo: 'aines',
    presentacion: 'Comprimidos de 400 mg y 600 mg; suspensión 4%',
    posologiaGuardia: '400 mg a 600 mg por vía oral cada 8 horas, junto con las comidas.',
    dosisMaxima: '2400 mg/día en adultos.',
    duracionSugerida: '3 a 7 días en procesos agudos.',
    indicaciones: [
      'Artralgiadel polo lateral de ATM',
      'Mialgia aguda masticatoria y dolor postoperatorio',
      'Pulpitis reversible / inflamación odontogénica aguda',
      'Pericoronaritis y dolor periodontal'
    ],
    riesgos: {
      gastrointestinal: 'Moderado. Indicar protector gástrico (Pantoprazol u Omeprazol) si el tratamiento supera 5 días o en mayores de 60 años.',
      cardiovascular: 'Aumenta el riesgo de trombosis CV con uso prolongado o dosis altas (> 1200 mg/día).',
      renal: 'Riesgo de nefrotoxicidad; evitar en deshidratación o insuficiencia renal.'
    },
    blackBox: 'Todos los AINEs aumentan el riesgo de eventos trombóticos cardiovasculares graves (infarto, ACV) y de úlcera péptica o hemorragia digestiva alta.',
    perlasClinicas: 'Es el AINE de primera elección en guardia por su excelente relación costo/beneficio y amplio margen terapéutico.',
    primeraLineaPara: ['artralgia', 'mialgia-local', 'pulpitis-reversible', 'pericoronaritis']
  },
  {
    id: 'naproxeno',
    nombre: 'Naproxeno Sódico',
    grupo: 'aines',
    presentacion: 'Comprimidos de 275 mg y 550 mg',
    posologiaGuardia: '550 mg por vía oral cada 12 horas con las comidas.',
    dosisMaxima: '1100 mg/día.',
    duracionSugerida: '5 a 10 días.',
    indicaciones: [
      'Osteoartritis y artralgia moderada a severa de ATM',
      'Dolor muscular persistente o bruxismo agudo de guardia',
      'Cefalea tensional y profilaxis en migraña menstrual'
    ],
    riesgos: {
      gastrointestinal: 'Alto riesgo de gastritis erosiva o pirosis; asociar siempre a protector gástrico.',
      cardiovascular: 'Considerado el AINE con perfil cardiovascular más neutro/seguro entre los no selectivos.',
      renal: 'Contraindicado en clearance de creatinina < 30 mL/min.'
    },
    blackBox: 'Riesgo de sangrado gastrointestinal oculto y daño renal agudo en pacientes añosos o polimedicados.',
    perlasClinicas: 'Excelente para pacientes con riesgo cardiovascular previo en quienes el ibuprofeno o coxibs están desaconsejados.',
    primeraLineaPara: ['osteoartritis', 'dolor-miofascial-referido']
  },
  {
    id: 'meloxicam',
    nombre: 'Meloxicam',
    grupo: 'aines',
    presentacion: 'Comprimidos de 7.5 mg y 15 mg',
    posologiaGuardia: '7.5 mg a 15 mg por vía oral una sola vez al día.',
    dosisMaxima: '15 mg/día.',
    duracionSugerida: '7 a 14 días.',
    indicaciones: [
      'Trastornos articulares crónicos agudizados de ATM',
      'Artritis reumatoidea o degenerativa de cóndilo mandibular'
    ],
    riesgos: {
      gastrointestinal: 'Menor que naproxeno a dosis de 7.5 mg/día por selectividad COX-2 preferencial.',
      cardiovascular: 'Moderado; evitar en antecedentes de cardiopatía isquémica.',
      renal: 'Vigilar en pacientes que toman diuréticos o IECA.'
    },
    blackBox: 'Riesgo cardiovascular aumentado similar a otros inhibidores COX-2.',
    perlasClinicas: 'La toma única diaria facilita enormemente el cumplimiento en pacientes poco constantes.',
    primeraLineaPara: ['osteoartritis']
  },
  {
    id: 'celecoxib',
    nombre: 'Celecoxib',
    grupo: 'aines',
    presentacion: 'Cápsulas de 100 mg y 200 mg',
    posologiaGuardia: '100 mg a 200 mg por vía oral cada 12 a 24 horas.',
    dosisMaxima: '400 mg/día.',
    duracionSugerida: '7 a 14 días.',
    indicaciones: [
      'Dolor de ATM en pacientes con antecedentes de úlcera gástrica o intolerancia severa a AINEs clásicos'
    ],
    riesgos: {
      gastrointestinal: 'Bajo riesgo de daño mucoso directo gástrico.',
      cardiovascular: 'Mayor riesgo trombótico relativo; rigurosamente contraindicado en postoperatorio de bypass coronario.',
      renal: 'No usar en falla renal moderada-severa.'
    },
    blackBox: 'Contraindicado en pacientes con alergia demostrada a sulfonamidas (sulfas). Riesgo trombótico arterial aumentado.',
    perlasClinicas: 'Elegir siempre que el paciente tenga gastritis previa pero no antecedentes cardíacos.',
    primeraLineaPara: ['artralgia']
  },
  {
    id: 'ketorolac',
    nombre: 'Ketorolac Trometamina',
    grupo: 'aines',
    presentacion: 'Comprimidos sublinguales / orales de 10 mg y 20 mg; ampollas de 30 mg / 60 mg IM/IV',
    posologiaGuardia: '10 mg a 20 mg vía oral o sublingual cada 6 horas según dolor agudo severo.',
    dosisMaxima: '40 mg/día por vía oral; 90 mg/día parenteral.',
    duracionSugerida: 'MÁXIMO ABSOLUTO DE 5 DÍAS (contraindicado su uso crónico).',
    indicaciones: [
      'Dolor agudo severo en guardia postraumático o luxación mandibular reducida',
      'Pulpitis irreversible aguda previo a endodoncia de urgencia',
      'Cirugía del tercer molar complicada'
    ],
    riesgos: {
      gastrointestinal: 'MUY ELEVADO. Es el AINE con mayor índice de sangrado digestivo agudo y perforación gástrica.',
      cardiovascular: 'No exceder dosis ni días.',
      renal: 'Alto riesgo de necrosis papilar y falla renal aguda si el paciente está hipovolémico.'
    },
    blackBox: 'ADVERTENCIA DE CAJA NEGRA: No usar por más de 5 días bajo ninguna circunstancia. No asociar con otros AINEs ni con aspirina.',
    perlasClinicas: 'Potente analgésico de rescate en guardia odontológica, pero debe suspenderse a las 48-72 hs y rotar a ibuprofeno o paracetamol.',
    primeraLineaPara: ['luxacion-abierta', 'pulpitis-irreversible']
  },
  {
    id: 'paracetamol',
    nombre: 'Paracetamol (Acetaminofén)',
    grupo: 'analgesicos',
    presentacion: 'Comprimidos de 500 mg, 650 mg y 1000 mg',
    posologiaGuardia: '500 mg a 1000 mg por vía oral cada 6 a 8 horas con agua.',
    dosisMaxima: '3000 mg a 4000 mg/día en adultos (reducir a 2000 mg/d en ancianos o desnutrición).',
    duracionSugerida: 'Hasta control de síntomas.',
    indicaciones: [
      'Dolor articular o muscular en pacientes con contraindicación absoluta para AINEs (embarazadas, úlcera activa, anticoagulados)',
      'Dolor leve a moderado odontogénico',
      'Coadyuvante combinado con AINEs o relajantes musculares'
    ],
    riesgos: {
      gastrointestinal: 'Excelente tolerancia gástrica.',
      cardiovascular: 'Seguro en hipertensión y cardiopatía.',
      renal: 'Seguro a dosis habituales.',
      hepatico: 'HEPATOTOXICIDAD severa por sobredosis (> 4 g/día) o consumo simultáneo con alcohol.'
    },
    blackBox: 'Riesgo de falla hepática fulminante por sobredosificación accidental al asociar productos comerciales combinados.',
    perlasClinicas: 'Fármaco de máxima seguridad para mujeres embarazadas en cualquier trimestre de gestación que consultan en la guardia.',
    primeraLineaPara: ['artralgia', 'mialgia-local']
  },
  {
    id: 'prednisona',
    nombre: 'Prednisona / Metilprednisolona (Medrol)',
    grupo: 'analgesicos',
    presentacion: 'Prednisona comp. 20 mg y 50 mg; Metilprednisolona Dose Pack 4 mg',
    posologiaGuardia: 'Pauta descendente: Medrol Dose Pack (24 mg día 1, reduciendo 4 mg/día hasta completar 6 días) o Prednisona 40 mg/d reduciendo gradualmente.',
    dosisMaxima: 'Según protocolo descendente corto.',
    duracionSugerida: '6 a 10 días continuos máximo sin supresión brusca.',
    indicaciones: [
      'Artritis aguda severa de ATM refractaria a AINEs',
      'Miositis inflamatoria aguda o edema facial severo postraumático',
      'Sospecha de Arteritis Temporal de células gigantes (iniciar Prednisona 60 mg/día URGENTE)'
    ],
    riesgos: {
      gastrointestinal: 'Riesgo de hemorragia gástrica; asociar siempre inhibidor de bomba de protones.',
      endocrino: 'Aumento de glucemia en diabéticos; retención hidrosalina e hipertensión arterial.',
      psiquiatrico: 'Insomnio, euforia o labilidad emocional.'
    },
    blackBox: 'Enmascaramiento de infecciones fúngicas o bacterianas graves; no usar si hay infección activa no controlada.',
    perlasClinicas: 'El Medrol Dose Pack ofrece una posología preimpresa muy segura y clara para el paciente que egresa de la guardia.',
    primeraLineaPara: ['arteritis-temporal', 'osteoartritis']
  },
  {
    id: 'tramadol',
    nombre: 'Tramadol (Clorhidrato)',
    grupo: 'analgesicos',
    presentacion: 'Gotas (100 mg/mL = aprox. 2.5 mg por gota); comprimidos de 50 mg',
    posologiaGuardia: '25 mg a 50 mg por vía oral cada 8 horas (o 20 a 40 gotas cada 8 hs).',
    dosisMaxima: '300 mg a 400 mg/día.',
    duracionSugerida: '3 a 5 días como rescate analgésico.',
    indicaciones: [
      'Dolor severo agudo de guardia refractario a AINEs y paracetamol',
      'Dolor óseo postraumático o fractura condilar en espera de resolución quirúrgica'
    ],
    riesgos: {
      sistemaNervioso: 'Sedación, mareos intensos, náuseas y vómitos frecuentes (recomendar antiemético preventivo como metoclopramida).',
      adicion: 'Potencial de dependencia y abuso (opioide menor).',
      interacciones: 'Riesgo de síndrome serotoninérgico al asociar con antidepresivos (ISRS, tricíclicos).'
    },
    blackBox: 'Riesgo de adicción, abuso, depresión respiratoria y convulsiones si se administra con fármacos que bajan el umbral convulsivo.',
    perlasClinicas: 'Huff & Benoliel desaconsejan el uso rutinario de opioides en dolor orofacial no oncológico; reservar exclusivamente para rescates agudos severos.',
    primeraLineaPara: ['fractura-condilar']
  },
  {
    id: 'ciclobenzaprina',
    nombre: 'Ciclobenzaprina',
    grupo: 'relajantes',
    presentacion: 'Comprimidos de 5 mg y 10 mg',
    posologiaGuardia: '5 mg a 10 mg por vía oral exclusivamente por la noche antes de dormir (nocte).',
    dosisMaxima: '30 mg/día (se desaconseja superar 10 mg nocturnos en pacientes ambulatorios).',
    duracionSugerida: '7 a 14 días.',
    indicaciones: [
      'Miospasmo / Trismus agudo doloroso',
      'Dolor miofascial masticatorio con contractura muscular asociada',
      'Bruxismo agudo de guardia con dolor al despertar'
    ],
    riesgos: {
      sedacion: 'Muy intensa. Advertir al paciente no conducir ni manejar maquinaria peligrosa.',
      anticolinergico: 'Boca seca (xerostomía), estreñimiento, retención urinaria, taquicardia.',
      cardiovascular: 'Contraindicada en arritmias, bloqueo cardíaco, insuficiencia cardíaca o infarto reciente (estructura tricíclica).'
    },
    blackBox: 'No combinar con IMAO (Inhibidores de la Monoamino Oxidasa) ni administrar en los 14 días posteriores a su suspensión.',
    perlasClinicas: 'Iniciar siempre con 5 mg antes de dormir; 10 mg suele provocar resaca sedativa marcada a la mañana siguiente.',
    primeraLineaPara: ['miospasmo', 'dolor-miofascial-referido']
  },
  {
    id: 'tizanidina',
    nombre: 'Tizanidina',
    grupo: 'relajantes',
    presentacion: 'Comprimidos de 2 mg y 4 mg',
    posologiaGuardia: '2 mg a 4 mg por vía oral nocturna, o cada 12 horas.',
    dosisMaxima: '24 mg/día (empezar muy bajo).',
    duracionSugerida: '7 a 14 días.',
    indicaciones: [
      'Espasticidad muscular masticatoria y cervical',
      'Miospasmo agudo severo posterior a luxación o trismus'
    ],
    riesgos: {
      cardiovascular: 'Hipotensión arterial marcada y bradicardia por acción agonista alfa-2 adrenérgica central.',
      hepatico: 'Monitorear transaminasas si se usa por más de 1 mes.',
      sedacion: 'Somnolencia diurna.'
    },
    blackBox: 'Interacción mayor con inhibidores de CYP1A2 (Ciprofloxacina, Fluvoxamina): elevación de hasta 10 veces los niveles plasmáticos de tizanidina.',
    perlasClinicas: 'Excelente alternativa a la ciclobenzaprina en pacientes con tolerancia a relajantes pero vigilar tensión arterial.',
    primeraLineaPara: ['miospasmo']
  },
  {
    id: 'carbamazepina',
    nombre: 'Carbamazepina',
    grupo: 'neuropaticos',
    presentacion: 'Comprimidos de 200 mg y 400 mg',
    posologiaGuardia: 'Dosis de inicio en guardia: 100 mg a 200 mg 1 o 2 veces al día con comidas. Titular subiendo 100 mg cada 2-3 días hasta respuesta (400-800 mg/d en 2 o 3 tomas).',
    dosisMaxima: '1200 mg/día.',
    duracionSugerida: 'Tratamiento continuo con seguimiento por neurología/dolor.',
    indicaciones: [
      'NEURALGIA DEL TRIGÉMINO (Gold Standard de 1ª línea según Huff & Benoliel 2023)',
      'Neuralgia del glosofaríngeo'
    ],
    riesgos: {
      hematologico: 'Agranulocitosis, leucopenia y anemia aplásica (realizar hemograma basal y de control).',
      cutaneo: 'Síndrome de Stevens-Johnson / Necrólisis epidérmica tóxica (asociado al alelo HLA-B*1502 en descendientes asiáticos).',
      sistemaNervioso: 'Ataxia, somnolencia, mareos, visión doble (diplopía).',
      hepatico: 'Inductor enzimático potente del citocromo P450 (múltiples interacciones).'
    },
    blackBox: 'ADVERTENCIA DE CAJA NEGRA: Anemia aplásica y agranulocitosis potencialmente mortales. Reacciones cutáneas graves (Stevens-Johnson).',
    perlasClinicas: 'La respuesta positiva (alivio sustancial del dolor en 24-48 hs) confirma prácticamente el diagnóstico de Neuralgia del Trigémino clásica.',
    primeraLineaPara: ['neuralgia-trigemino', 'neuralgia-glosofaringeo']
  },
  {
    id: 'oxcarbazepina',
    nombre: 'Oxcarbazepina',
    grupo: 'neuropaticos',
    presentacion: 'Comprimidos de 300 mg y 600 mg',
    posologiaGuardia: '150 mg a 300 mg por vía oral dos veces al día, incrementando gradualmente hasta 600 a 1200 mg/día.',
    dosisMaxima: '1200 mg a 1800 mg/día.',
    duracionSugerida: 'Mantenimiento neurológico ambulatorio.',
    indicaciones: [
      'Neuralgia del Trigémino (alternativa de primera línea con menor carga de interacciones que carbamazepina)'
    ],
    riesgos: {
      metabolico: 'HIPONATREMIA (vigilar sodio plasmático, especialmente en ancianos o en combinación con diuréticos).',
      sedacion: 'Menor sedación que carbamazepina pero posible somnolencia inicial.'
    },
    blackBox: 'Reacciones de hipersensibilidad cutánea grave en pacientes portadores de HLA-B*1502.',
    perlasClinicas: 'Fármaco moderno de elección en pacientes que no toleran carbamazepina por mareo o náuseas.',
    primeraLineaPara: ['neuralgia-trigemino']
  },
  {
    id: 'gabapentina',
    nombre: 'Gabapentina',
    grupo: 'neuropaticos',
    presentacion: 'Cápsulas de 300 mg y 400 mg',
    posologiaGuardia: 'Titulación: 300 mg por la noche el día 1; 300 mg cada 12 h el día 2; 300 mg cada 8 h el día 3 (900 mg/día). Puede titularse hasta 1800 mg/d.',
    dosisMaxima: '2400 mg/día.',
    duracionSugerida: 'Uso crónico con supervisión médica.',
    indicaciones: [
      'Dolor neuropático trigeminal postraumático (post-implante, post-cirugía)',
      'Neuralgia postherpética en rama V1/V2/V3',
      'Dolor facial idiopático persistente y síndrome de boca urente resistente'
    ],
    riesgos: {
      sistemaNervioso: 'Somnolencia, mareo, inestabilidad en la marcha (ataxia).',
      renal: 'Eliminación 100% renal: ajustar estrictamente la dosis según clearance de creatinina.'
    },
    blackBox: 'Riesgo de depresión respiratoria grave si se asocia con opioides u otros depresores del SNC.',
    perlasClinicas: 'Excelente perfil de seguridad sin interacciones hepáticas por el citocromo P450.',
    primeraLineaPara: ['dolor-neuropatico-postraumatico', 'herpes-simple']
  },
  {
    id: 'pregabalina',
    nombre: 'Pregabalina',
    grupo: 'neuropaticos',
    presentacion: 'Cápsulas de 75 mg y 150 mg',
    posologiaGuardia: '75 mg por vía oral por la noche antes de dormir; puede aumentarse a 75 mg cada 12 horas a la semana.',
    dosisMaxima: '300 mg a 600 mg/día.',
    duracionSugerida: 'Tratamiento ambulatorio especializado.',
    indicaciones: [
      'Dolor neuropático periférico orofacial',
      'Fibromialgia con repercusión en dolor orofacial y masticatorio'
    ],
    riesgos: {
      general: 'Aumento de peso, edema periférico en miembros inferiores, somnolencia marcada.',
      renal: 'Ajuste renal obligatorio.'
    },
    blackBox: 'Riesgo de dependencia psicológica y síndrome de abstinencia ante suspensión brusca (retirar en forma gradual).',
    perlasClinicas: 'Farmacocinética lineal más predecible que la gabapentina, con dosificación 2 veces al día.',
    primeraLineaPara: ['dolor-neuropatico-postraumatico']
  },
  {
    id: 'amitriptilina',
    nombre: 'Amitriptilina',
    grupo: 'neuropaticos',
    presentacion: 'Comprimidos de 10 mg, 25 mg y 75 mg',
    posologiaGuardia: 'Dosis analgésica central: 10 mg a 25 mg por vía oral estrictamente por la noche al acostarse.',
    dosisMaxima: '50 mg a 75 mg/día como analgésico orofacial (dosis mucho menores que las antidepresivas de 150 mg).',
    duracionSugerida: 'Mínimo 4 a 8 semanas para evaluar respuesta analgésica central.',
    indicaciones: [
      'Dolor miofascial crónico y mialgia mediada centralmente',
      'Profilaxis de cefalea tensional crónica y migraña comórbida',
      'Dolor facial atípico / Síndrome de boca urente (Glosodinia)'
    ],
    riesgos: {
      anticolinergico: 'Sequedad de boca intensa, visión borrosa, aumento de apetito, estreñimiento.',
      cardiovascular: 'Prolongación del intervalo QT, hipotensión ortostática, taquicardia refleja. Realizar ECG en mayores de 50 años.',
      oftalmologico: 'Contraindicada en glaucoma de ángulo cerrado.'
    },
    blackBox: 'Aumento del riesgo de ideación y conductas suicidas en menores de 24 años al inicio del tratamiento antidepresivo.',
    perlasClinicas: 'Mejora la arquitectura del sueño no-REM y modula las vías descendentes inhibitorias del dolor.',
    primeraLineaPara: ['mialgia-local', 'dolor-miofascial-referido', 'boca-urente']
  },
  {
    id: 'sumatriptan',
    nombre: 'Sumatriptán',
    grupo: 'triptanes',
    presentacion: 'Comprimidos de 50 mg; ampollas SC 6 mg; spray nasal 20 mg',
    posologiaGuardia: '50 mg a 100 mg por vía oral en cuanto comience la fase de dolor de la migraña; puede repetirse a las 2 horas si recurre el dolor.',
    dosisMaxima: '200 mg/día vía oral; 12 mg/día vía SC.',
    duracionSugerida: 'Uso exclusivo por crisis aguda (máximo 2 a 3 días por semana para evitar cefalea por abuso de medicación).',
    indicaciones: [
      'Crisis de migraña aguda moderada a severa (con o sin aura)',
      'Migraña orofacial aguda',
      'Cefalea en racimos / Cluster (en spray nasal o inyección SC de 6 mg)'
    ],
    riesgos: {
      cardiovascular: 'Vasoconstricción coronaria y periférica; sensación de opresión torácica ("sensación triptán").',
      contraindicaciones: 'RIGUROSAMENTE CONTRAINDICADO en cardiopatía isquémica, infarto previo, angina de pecho, ACV previo, hipertensión arterial descontrolada o claudicación periférica.'
    },
    blackBox: 'No administrar simultáneamente con ergotamínicos ni dentro de las 24 horas de haber tomado otro triptán o ergotamina.',
    perlasClinicas: 'Para cefalea en racimos en guardia, la administración de oxígeno al 100% en máscara reservorio a 12 L/min por 15 minutos junto con sumatriptán SC aborta el ataque rápidamente.',
    primeraLineaPara: ['migrana-orofacial', 'cefalea-racimos']
  }
];


  /* === File: js/data/procedimientos.js === */
/**
 * guardia-atm - Procedimientos, Maniobras e Infiltraciones de Guardia
 * Basado en Huff & Benoliel (2023), págs. 44-50 y protocolos de guardia hospitalaria.
 */

const PROCEDIMIENTOS = [
  {
    id: 'maniobra-nelaton',
    titulo: 'Maniobra de Nelatón (Reducción de Luxación Aguda de ATM)',
    categoria: 'Maniobras de Guardia',
    icono: 'move',
    tiempoEstimado: '3 a 5 minutos',
    indicacion: 'Luxación condilar anterior bilateral o unilateral aguda (el cóndilo ha sobrepasado la eminencia articular y la mandíbula queda fija en máxima apertura / bloqueo abierto).',
    materiales: [
      'Guantes quirúrgicos descartables',
      'Gasas estériles gruesas para envolver los pulgares del operador (PROTECCIÓN OBLIGATORIA)',
      'Venda elástica de 5 a 10 cm para vendaje de Barton posterior',
      'Anestésico local (Mepivacaína 2-3% o Lidocaína 2%) por si se requiere infiltración de maseteros/pterigoideos en caso de trismus severo'
    ],
    pasos: [
      {
        paso: 1,
        titulo: 'Posicionamiento del Paciente y Operador',
        descripcion: 'Sentar al paciente con la cabeza firmemente apoyada contra el cabezal del sillón o contra una pared sólida para evitar que retroceda la cabeza. El operador se para de frente al paciente a la altura adecuada.'
      },
      {
        paso: 2,
        titulo: 'Protección de los Pulgares del Odontólogo',
        descripcion: 'Envolver ambos pulgares con gasas abundantes. ALERTA: Cuando la mandíbula reduce, los músculos masticadores se cierran súbitamente con fuerza refleja extrema; sin gasas, los pulgares del profesional pueden sufrir mordeduras severas.'
      },
      {
        paso: 3,
        titulo: 'Ubicación de los Dedos',
        descripcion: 'Colocar los pulgares sobre las caras oclusales de los molares inferiores (o sobre la cresta ósea mandibular por detrás del último molar), mientras los otros cuatro dedos de cada mano abrazan firmemente la base y el ángulo de la mandíbula por fuera.'
      },
      {
        paso: 4,
        titulo: 'Vector de Fuerza Tridimensional (Abajo, Atrás y Arriba)',
        descripcion: '1) Ejercer una fuerza firme, constante y progresiva HACIA ABAJO con los pulgares para desenganchar los cóndilos de la eminencia articular anterior. 2) Una vez descendido el cóndilo, empujar la mandíbula HACIA ATRÁS. 3) Guiar el mentón suavemente HACIA ARRIBA. Se sentirá un chasquido o resalto nítido cuando los cóndilos vuelven a la fosa glenoidea.'
      },
      {
        paso: 5,
        titulo: 'Cuidados Inmediatos Post-Reducción',
        descripcion: 'Colocar un vendaje mentoniano elástico de tipo Barton por 24 a 48 horas para limitar aperturas amplias. Prohibir abrir la boca más de 15-20 mm, evitar bostezos sin sujetarse el mentón con la mano. Prescribir dieta blanda estricta durante 2 semanas, AINEs (Ibuprofeno 600 mg c/8h) y relajante muscular nocturno.'
      }
    ],
    complicaciones: 'Dificultad por espasmo severo de maseteros (infiltrar 1 mL de anestésico local en maseteros o pterigoideos si no reduce), avulsión ungueal del operador si no usa gasas protectoras.',
    perlas: 'Pedir al paciente que respire hondo y exhale relajando los hombros en el momento del empuje inferior.'
  },
  {
    id: 'infiltracion-puntos-gatillo',
    titulo: 'Infiltración de Puntos Gatillo Miofasciales (Trigger Point Injection)',
    categoria: 'Infiltraciones',
    icono: 'crosshair',
    tiempoEstimado: '5 a 10 minutos',
    indicacion: 'Dolor miofascial con banda tensa palpable hiperirritable en músculo masetero o temporal que reproduce el dolor referido habitual del paciente.',
    materiales: [
      'Jeringa de 3 mL a 5 mL con aguja fina calibre 27G o 30G (1/2 o 1 pulgada)',
      'Anestésico local SIN vasoconstrictor (Mepivacaína al 3% o Lidocaína al 1-2%). NUNCA usar vasoconstrictor en músculo',
      'Antiséptico (alcohol al 70% o clorhexidina al 2%)',
      'Gasas estériles'
    ],
    pasos: [
      {
        paso: 1,
        titulo: 'Palpación y Localización de la Banda Tensa',
        descripcion: 'Realizar palpación en pinza (bimanual para masetero superficial y profundo; plana contra el cráneo para el músculo temporal). Localizar el nódulo o punto de máxima sensibilidad que reproduce el dolor familiar y el reflejo de sobresalto (jump sign).'
      },
      {
        paso: 2,
        titulo: 'Asepsia de la Piel',
        descripcion: 'Limpiar cuidadosamente la zona cutánea con antiséptico. Mantener inmovilizado el punto gatillo entre los dedos índice y mayor de la mano no dominante.'
      },
      {
        paso: 3,
        titulo: 'Inserción y Respuesta de Espasmo Local (Twitch)',
        descripcion: 'Introducir la aguja en un ángulo de 30° a 45° directamente hacia el punto gatillo. La penetración en el foco suele provocar una sacudida refleja muscular breve (local twitch response).'
      },
      {
        paso: 4,
        titulo: 'Aspiración Obligatoria e Infiltración en Abanico',
        descripcion: 'ASPIRAR SIEMPRE para descartar inyección intravascular (especialmente cerca de la arteria facial o transversa). Infiltrar de 0.2 mL a 0.5 mL de la solución anestésica. Retirar parcialmente la aguja y redirigir suavemente en abanico si la banda es amplia.'
      },
      {
        paso: 5,
        titulo: 'Elongación Pasiva Post-Infiltración',
        descripcion: 'Inmediatamente luego de retirar la aguja, realizar compresión hemostática durante 1 minuto y solicitar al paciente apertura bucal suave progresiva para elongar las fibras musculares infiltradas. Aplicar calor húmedo.'
      }
    ],
    complicaciones: 'Hematoma facial por lesión de vaso superficial, paresia facial transitoria si se infiltra demasiado cerca de ramas del nervio facial VII (se resuelve en 1-2 horas), dolor residual en el sitio de punción.',
    perlas: 'Huff & Benoliel destacan que la eficacia analgésica se debe tanto a la disrupción mecánica del foco contráctil por la aguja como al efecto anestésico sobre los nociceptores.'
  },
  {
    id: 'bloqueo-auriculotemporal',
    titulo: 'Bloqueo Anestésico del Nervio Auriculotemporal',
    categoria: 'Bloqueos Diagnósticos',
    icono: 'shield',
    tiempoEstimado: '5 minutos',
    indicacion: 'Diferenciación diagnóstica entre dolor articular de ATM vs dolor muscular/neuropático. Alivio inmediato de artralgia aguda severa en guardia.',
    materiales: [
      'Jeringa carpule con aguja corta 27G o 30G',
      'Tubo de anestésico local: Lidocaína 2% o Mepivacaína 2-3%',
      'Antiséptico'
    ],
    pasos: [
      {
        paso: 1,
        titulo: 'Referencia Anatómica',
        descripcion: 'Palpar el polo lateral del cóndilo mandibular y la arteria temporal superficial (inmediatamente por delante del trago de la oreja).'
      },
      {
        paso: 2,
        titulo: 'Inserción de la Aguja',
        descripcion: 'Introducir la aguja aproximadamente 1 cm por delante del trago, justo por detrás del cuello del cóndilo mandibular, en dirección ligeramente medial y anterior.'
      },
      {
        paso: 3,
        titulo: 'Aspiración e Inyección',
        descripcion: 'Aspirar meticulosamente para evitar inyección en los vasos temporales superficiales. Inyectar lentamente entre 0.5 mL y 1.0 mL de anestésico.'
      },
      {
        paso: 4,
        titulo: 'Evaluación de la Respuesta Diagnóstica',
        descripcion: 'A los 5-10 minutos, evaluar el alivio del dolor preauricular durante los movimientos mandibulares. Si el dolor desaparece por completo, se confirma el origen articular o de la cápsula de la ATM.'
      }
    ],
    complicaciones: 'Inyección intravascular inadvertida, parálisis transitoria del párpado (rama temporal del VII) que revierte con la duración del anestésico.',
    perlas: 'Prueba de oro para confirmar si el dolor facial es de la cápsula articular o si proviene de músculos masticadores.'
  },
  {
    id: 'artrocentesis-atm',
    titulo: 'Artrocentesis y Lavado Articular de ATM',
    categoria: 'Procedimientos Avanzados',
    icono: 'droplet',
    tiempoEstimado: '20 a 30 minutos',
    indicacion: 'Desplazamiento discal sin reducción con limitación severa de apertura (bloqueo cerrado agudo < 25 mm) que no responde a manipulación manual, o sinovitis aguda persistente refractaria.',
    materiales: [
      '2 agujas calibre 18G a 21G',
      'Solución fisiológica o Ringer Lactato (100 a 200 mL)',
      'Equipo de perfusión y llave de 3 vías',
      'Corticosteroide intraarticular (Triamcinolona 10-20 mg) o Ácido Hialurónico de alto peso molecular'
    ],
    pasos: [
      {
        paso: 1,
        titulo: 'Trazado de la Línea Trago-Canto Externo',
        descripcion: 'Trazar la línea de Holmlund-Hellsing entre el centro del trago y el canto externo del ojo.'
      },
      {
        paso: 2,
        titulo: 'Punto Posterior de Entrada',
        descripcion: 'Marcar el punto a 10 mm por delante del trago y 2 mm por debajo de la línea canto-trago (foco del espacio articular superior).'
      },
      {
        paso: 3,
        titulo: 'Infiltración del Espacio Articular Superior',
        descripcion: 'Insertar la primera aguja hacia el techo de la fosa glenoidea, aspirar e inyectar 2-3 mL de solución salina distendiendo la cápsula (se observa abombamiento de la aguja con reflujo).'
      },
      {
        paso: 4,
        titulo: 'Inserción de la Segunda Aguja de Salida y Lavado',
        descripcion: 'Insertar la segunda aguja a 20 mm por delante del trago y 10 mm por debajo de la línea para permitir el flujo continuo. Lavar con 100-200 mL de solución salina a presión suave eliminando mediadores inflamatorios y liberando adherencias discales.'
      },
      {
        paso: 5,
        titulo: 'Inyección Terapéutica Final',
        descripcion: 'Infiltrar 1 mL de corticoide (Triamcinolona 10-20 mg) o Ácido Hialurónico para regeneración de la viscosidad articular.'
      }
    ],
    complicaciones: 'Hemartrosis, lesión del nervio auriculotemporal o facial, perforación de la base del cráneo (extremar cuidado respetando las referencias anatómicas).',
    perlas: 'En guardia, si el paciente no tiene disponibilidad quirúrgica inmediata, realizar primero la manipulación manual de movilización condilar bajo anestesia local antes de programar artrocentesis.'
  }
];

const PRUEBAS_LABORATORIO = [
  {
    id: 'vsg-pcr',
    nombre: 'VSG (Eritrosedimentación) y PCR Cuantitativa',
    categoria: 'Inflamación y Urgencias',
    indicacionGuardia: 'OBLIGATORIA ante sospecha de Arteritis de la Temporal / Células Gigantes en pacientes > 50 años con cefalea temporal y dolor masticatorio.',
    valoresReferencia: 'VSG normal: < 20-30 mm/h. En arteritis suele ser > 50 mm/h e incluso > 100 mm/h. PCR elevada (> 10 mg/L).',
    interpretacion: 'Una VSG y PCR normales prácticamente descartan la arteritis temporal (alto valor predictivo negativo). Ante elevación franca, iniciar corticoides inmediatamente.'
  },
  {
    id: 'hemograma-completo',
    nombre: 'Hemograma Completo con Fórmula Leucocitaria',
    categoria: 'Hematología',
    indicacionGuardia: 'Infecciones orofaciales agudas (pericoronaritis, abscesos, celulitis), neutropenia previa al uso de carbamazepina, sospecha de leucemia o discrasias.',
    valoresReferencia: 'Leucocitos 4.000 - 10.000/mm³; Neutrófilos 55-70%. Plaquetas 150.000 - 450.000/mm³.',
    interpretacion: 'Leucocitosis con desviación a la izquierda indica infección bacteriana aguda difusa. Monitorear neutrófilos antes y durante el tratamiento con carbamazepina (riesgo de agranulocitosis).'
  },
  {
    id: 'perfil-reumatologico',
    nombre: 'Perfil Reumatológico (FR, Anti-CCP, ANA, HLA-B27)',
    categoria: 'Inmunología y Autoinmunidad',
    indicacionGuardia: 'Sospecha de artritis inflamatoria sistémica que afecta la ATM (Artritis Reumatoidea, Lupus, Espondilitis Anquilosante).',
    valoresReferencia: 'Factor Reumatoideo (FR) cuantitativo, Anticuerpos anti-péptido citrulinado (Anti-CCP), Anticuerpos Antinucleares (ANA).',
    interpretacion: 'La afección bilateral de ATM con dolor articular inflamatorio y rigidez matutina prolongada (> 30 min) orienta a patología autoinmune sistémica.'
  },
  {
    id: 'hepatograma-renal',
    nombre: 'Función Renal (Urea, Creatinina) y Enzimas Hepáticas (GOT/GPT)',
    categoria: 'Bioquímica Clínica',
    indicacionGuardia: 'Previo a prescribir AINEs a dosis plenas en pacientes con comorbilidades, ancianos, o en politerapia farmacológica de dolor.',
    valoresReferencia: 'Creatinina 0.7 - 1.3 mg/dL. Clearance > 60 mL/min. Transaminasas normales.',
    interpretacion: 'Creatinina > 1.5 mg/dL desaconseja el uso de AINEs clásicos; rotar a paracetamol o medidas físicas/infiltrativas locales.'
  }
];


  /* === File: js/data/mapa-dolor.js === */
/**
 * guardia-atm - Mapa Interactivo de Puntos Gatillo y Dolor Muscular Referido
 * Basado en Huff & Benoliel (2023) Fig. 1 y Simons, Travell & Simons.
 */

const MUSCULOS_DOLOR = [
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

const ZONAS_DOLOR_DENTAL_REFERIDO = [
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


  /* === File: js/data/patologias.js === */
/**
 * guardia-atm - Base de Datos de Patologías de ATM y Dolor Orofacial
 * Basado en Huff & Benoliel (2023), criterios DC/TMD, ICHD-3 e ICOP.
 */

const CATEGORIAS_PATOLOGIAS = [
  { id: 'atm', nombre: 'Trastornos de la ATM', icono: 'activity', color: '#006155' },
  { id: 'musculares', nombre: 'Trastornos Musculares', icono: 'user', color: '#46A3B7' },
  { id: 'dentales', nombre: 'Dolor Dental y Oclusal', icono: 'smile', color: '#2563EB' },
  { id: 'periodontales', nombre: 'Dolor Periodontal', icono: 'shield', color: '#059669' },
  { id: 'mucocutaneo', nombre: 'Dolor Mucocutáneo', icono: 'droplet', color: '#D97706' },
  { id: 'neuropatico', nombre: 'Dolor Neuropático', icono: 'zap', color: '#7C3AED' },
  { id: 'cefaleas', nombre: 'Cefaleas y Dolor Cervical', icono: 'cloud-lightning', color: '#DC2626' }
];

const PATOLOGIAS = [
  // ==========================================
  // 1. TRASTORNOS DE LA ARTICULACIÓN TEMPOROMANDIBULAR (ATM)
  // ==========================================
  {
    id: 'artralgia',
    nombre: 'Artralgia de la ATM',
    categoria: 'atm',
    cie10: 'M26.62',
    esUrgenciaGuardia: true,
    resumenCorto: 'Dolor de origen articular en la ATM modificado por el movimiento o función mandibular.',
    caracteristicasClinicas: [
      'Dolor localizado en la zona articular preauricular (delante del trago) durante el reposo o la función.',
      'Aumenta con la masticación de alimentos duros, bostezos o apertura amplia.',
      'Suele ser autolimitado y rara vez incapacitante de forma aislada.',
      'Frecuentemente unilateral pero puede presentarse bilateral.'
    ],
    criteriosDiagnosticos: 'Criterio DC/TMD: Historia de dolor en la articulación en los últimos 30 días Y confirmación clínica de dolor familiar al palpar el polo lateral de la ATM (con 0.5 kg de presión) o polo posterior (1.0 kg), o dolor con los movimientos mandibulares (apertura o excursiones).',
    pruebasClinicas: [
      'Palpación del polo lateral condilar con boca entreabierta (0.5 kg de presión digital).',
      'Palpación retrocondilar intraauricular mientras el paciente abre y cierra la boca.',
      'Movilización dinámica: apertura máxima pasiva asistida.',
      'Rx panorámica o CBCT para descartar cambios óseos erosivos.'
    ],
    conductaGuardia: [
      'Tranquilizar al paciente explicando el curso benigno y autolimitado del cuadro.',
      'Prescripción de reposo articular: dieta blanda (evitar alimentos chiclosos, tostadas, carnes duras).',
      'Regla de autocuidado: "Labios juntos, dientes separados" (evitar contacto dental diurno).',
      'Aplicación de calor húmedo tibio durante 15-20 minutos, 2 a 3 veces al día.',
      'AINEs por vía oral durante 5 a 7 días.'
    ],
    tratamientoAmbulatorio: 'Dispositivo oclusal de estabilización (placa miorrelajante de descarga) de uso nocturno si coexiste con bruxismo del sueño. Fisioterapia articular suave. Derivación al servicio de ATM si no resuelve en 3-4 semanas.',
    farmacoterapia: {
      primeraLinea: ['Ibuprofeno 600 mg c/ 8 h con comidas por 5-7 días', 'Paracetamol 1 g c/ 8 h (si intolerancia a AINEs)'],
      segundaLinea: ['Naproxeno sódico 550 mg c/ 12 h con protector gástrico', 'Celecoxib 200 mg/día (si antecedentes de gastritis)'],
      precauciones: 'No mantener AINEs por más de 14 días continuos sin control médico.'
    },
    diagnosticoDiferencial: ['osteoartritis', 'mialgia-local', 'desplazamiento-con-reduccion', 'arteritis-temporal'],
    perlasHuffBenoliel: 'Huff & Benoliel enfatizan: "Los ruidos articulares indoloros NO requieren tratamiento". La artralgia puede acompañar a cualquier otro trastorno de la ATM, pero la presencia de dolor articular solo indica inflamación de la sinovial o cápsula.'
  },
  {
    id: 'osteoartritis',
    nombre: 'Osteoartritis / Artrosis de ATM',
    categoria: 'atm',
    cie10: 'M26.62',
    esUrgenciaGuardia: false,
    resumenCorto: 'Proceso degenerativo óseo articular de la ATM acompañado de inflamación sinovial y crepitación.',
    caracteristicasClinicas: [
      'Dolor articular sordo y constante que empeora al final del día o tras masticar.',
      'Ruido característico de "crepitación" (roce de papel de lija, crujido fino o arena dentro de la articulación).',
      'Rigidez articular matutina breve (< 30 minutos).',
      'Posible alteración oclusal secundaria (mordida abierta anterior ipsilateral o pérdida de altura posterior en fases avanzadas).'
    ],
    criteriosDiagnosticos: 'DC/TMD: Criterios clínicos de artralgia más presencia de crepitación palpable o audible en al menos uno de los movimientos mandibulares Y confirmación radiográfica en CBCT (aplanamiento del cóndilo, osteofitos, erosión cortical o esclerosis subcondral).',
    pruebasClinicas: [
      'Palpación articular dinámica auscultando la crepitación durante apertura y cierre.',
      'Tomografía Cone Beam (CBCT) de cortes sagitales y coronales de ATM (estudio de elección).',
      'Laboratorio: solicitar VSG, PCR y Factor Reumatoideo si el cuadro es bilateral para descartar artritis inflamatoria sistémica.'
    ],
    conductaGuardia: [
      'Explicar el proceso de remodelación ósea (generalmente se estabiliza con el tiempo).',
      'AINEs con pauta analgésica regular durante 10 a 14 días.',
      'Termoterapia (calor húmedo 15 min 3 veces al día) y dieta suave de consistencia papilla/puré.',
      'Interconsulta programada con especialista en ATM/Cirugía Maxilofacial.'
    ],
    tratamientoAmbulatorio: 'Placa oclusal de estabilización nocturna. Kinesioterapia mandibular. Si el dolor es persistente y refractario, considerar artrocentesis o viscosuplementación con ácido hialurónico intraarticular.',
    farmacoterapia: {
      primeraLinea: ['Meloxicam 15 mg/día por vía oral una toma diaria por 10-14 días', 'Naproxeno 550 mg c/ 12 h con protector gástrico'],
      segundaLinea: ['Prednisona o Metilprednisolona (Medrol Dose Pack) en brotes agudos severos', 'Infiltración intraarticular de corticoides o ácido hialurónico'],
      precauciones: 'Vigilar función renal y gástrica en pacientes mayores con uso continuado de AINEs.'
    },
    diagnosticoDiferencial: ['artralgia', 'desplazamiento-sin-reduccion-limitacion', 'reabsorcion-condilar'],
    perlasHuffBenoliel: 'Los cambios radiológicos degenerativos no deben ser la única base para decidir tratamientos agresivos; muchos cóndilos aplanados funcionan de forma asintomática y adaptada.'
  },
  {
    id: 'desplazamiento-con-reduccion',
    nombre: 'Desplazamiento Discal con Reducción (DDcR)',
    categoria: 'atm',
    cie10: 'M26.63',
    esUrgenciaGuardia: false,
    resumenCorto: 'El disco articular se encuentra adelantado en reposo y se reposiciona sobre el cóndilo al abrir la boca produciendo un clic.',
    caracteristicasClinicas: [
      'Chasquido o "clic" articular nítido durante la apertura de la boca.',
      'Chasquido recíproco al cerrar la boca (el disco vuelve a desplazarse hacia adelante justo antes del cierre completo).',
      'Desviación en forma de "S" en la apertura bucal que se corrige al entrar el disco en posición.',
      'Habitualmente indoloro a menos que se complique con artralgia sinovial.'
    ],
    criteriosDiagnosticos: 'DC/TMD: Ruido de clic, pop o snap en la ATM en al menos 1 de 3 aperturas o movimientos excursivos repetidos, con chasquido de cierre recíproco.',
    pruebasClinicas: [
      'Palpación digital bimanual sobre el polo lateral durante apertura máxima.',
      'Prueba de reducción en protrusión: si el paciente abre y cierra desde protrusión, el clic suele desaparecer.',
      'RMN de ATM (estándar de oro si se requiere visualización de la posición del menisco).'
    ],
    conductaGuardia: [
      'TRANQUILIZAR AL PACIENTE: Es la condición articular más prevalente en la población general (hasta un 30%) y en su mayoría no progresa a bloqueo.',
      'NO requiere tratamiento quirúrgico ni farmacológico si el clic no genera dolor.',
      'Indicar evitar "provocar el clic intencionalmente" (tics o manías mandibulares para escuchar el ruido).',
      'Evitar masticar chicle o abrir en exceso.'
    ],
    tratamientoAmbulatorio: 'Educación y observación periódica. Placa oclusal de reposicionamiento anterior solo en casos seleccionados con dolor o bloqueos intermitentes repetidos, seguida de placa estabilizadora.',
    farmacoterapia: {
      primeraLinea: ['Sin fármacos de rutina', 'AINEs (Ibuprofeno 400 mg c/8h) solo si asocia artralgia dolorosa'],
      segundaLinea: ['No aplica'],
      precauciones: 'No prescribir relajantes musculares pesados por simples ruidos articulares sin espasmo.'
    },
    diagnosticoDiferencial: ['desplazamiento-con-reduccion-bloqueo', 'desplazamiento-sin-reduccion-limitacion', 'artralgia'],
    perlasHuffBenoliel: '"Pain-free noises do not need treatment". El sonido articular solo representa una relación biomecánica alterada pero adaptada.'
  },
  {
    id: 'desplazamiento-con-reduccion-bloqueo',
    nombre: 'DDcR con Bloqueo Intermitente',
    categoria: 'atm',
    cie10: 'M26.63',
    esUrgenciaGuardia: true,
    resumenCorto: 'Desplazamiento discal con episodios transitorios donde el disco no reduce y la mandíbula se "traba" momentáneamente.',
    caracteristicasClinicas: [
      'El paciente relata que al abrir la boca la mandíbula se "traba" momentáneamente, pero logra abrir realizando una maniobra de movimiento lateral o empuje manual.',
      'Episodios frecuentes de limitación transitoria al despertar por la mañana.',
      'Ansiedad marcada del paciente ante el temor de quedarse trabado de forma permanente.'
    ],
    criteriosDiagnosticos: 'DC/TMD: Criterios de DDcR más el antecedente positivo de incapacidad temporal para abrir completamente la boca que el propio paciente logra desbloquear de forma espontánea o con movimientos guiados.',
    pruebasClinicas: [
      'Examen de apertura bucal dinámica; observar la dificultad de traslación del cóndilo.',
      'Verificar si hay hiperlaxitud articular o signos de bruxismo.'
    ],
    conductaGuardia: [
      'Enseñar al paciente la técnica de auto-desbloqueo suave: lateralizar suavemente la mandíbula hacia el lado contralateral sin forzar la apertura abrupta.',
      'Dieta blanda estricta para evitar la compresión del disco en posición adelantada.',
      'Calor húmedo preauricular y ejercicios de apertura suave dentro del rango no doloroso.',
      'Derivación prioritaria para confección de placa oclusal anterior o de descompresión.'
    ],
    tratamientoAmbulatorio: 'Férula de reposicionamiento anterior para uso nocturno temporal, con conversión a placa de estabilización una vez controlados los episodios de bloqueo. Terapia kinesiológica.',
    farmacoterapia: {
      primeraLinea: ['Ibuprofeno 600 mg c/ 8 h por 5 días si hay sinovitis asociada', 'Ciclobenzaprina 5 mg por la noche si hay apretamiento muscular'],
      segundaLinea: ['Naproxeno 550 mg c/ 12 h'],
      precauciones: 'Evitar que el paciente fuerce bruscamente la apertura, ya que puede transformar el cuadro en un bloqueo cerrado permanente.'
    },
    diagnosticoDiferencial: ['desplazamiento-sin-reduccion-limitacion', 'luxacion-abierta', 'miospasmo'],
    perlasHuffBenoliel: 'El entrenamiento de conciencia ("awareness training") y evitar el bruxismo diurno previenen la progresión hacia un desplazamiento discal sin reducción.'
  },
  {
    id: 'desplazamiento-sin-reduccion-limitacion',
    nombre: 'Desplazamiento Discal sin Reducción con Limitación (Bloqueo Cerrado Agudo)',
    categoria: 'atm',
    cie10: 'M26.63',
    esUrgenciaGuardia: true,
    resumenCorto: 'URGENCIA DE GUARDIA: El menisco queda atrapado por delante del cóndilo impidiendo la apertura (boca trabada cerrada < 25-30 mm).',
    caracteristicasClinicas: [
      'Inicio agudo: el paciente nota que la mandíbula "se trabó" y no puede abrir la boca más de 20-30 mm.',
      'Refiere que tenía un chasquido previo en esa articulación que desapareció súbitamente justo cuando ocurrió el bloqueo.',
      'Dolor severo preauricular al intentar forzar la apertura bucal.',
      'Deflexión marcada de la mandíbula hacia el lado afectado durante la apertura (no hay traslación del cóndilo comprometido).',
      'Lateralidad contralateral muy disminuida o abolida; lateralidad hacia el mismo lado preservada.'
    ],
    criteriosDiagnosticos: 'DC/TMD: Apertura máxima activa con dolor < 35 mm con sensación de tope duro ("hard end-feel") Y desaparición de clic previo Y limitación de movimientos de lateralidad contralateral.',
    pruebasClinicas: [
      'Medición milimétrica de apertura máxima interincisal (< 35 mm, a menudo 20-25 mm).',
      'Tope terminal: intentar apertura pasiva suave (tope duro inextensible indica disco atrapado; tope elástico blando orienta a causa muscular).',
      'RMN de ATM confirma disco luxado anterior sin reducción.'
    ],
    conductaGuardia: [
      'MANIPULACIÓN MANUAL DE URGENCIA: Si el bloqueo es de evolución muy aguda (< 24-48 horas), intentar la descompresión condilar bajo anestesia local de polo lateral o bloqueo auriculotemporal.',
      'Maniobra: El odontólogo tracciona hacia abajo la rama mandibular ipsilateral mientras pide al paciente mover suavemente la mandíbula hacia el lado contralateral.',
      'Si no reduce: NO forzar violentamente para evitar desgarros del ligamento retrodiscal.',
      'Indicar dieta blanda absoluta, analgésicos AINEs potentes, calor húmedo y derivación urgente a cirugía maxilofacial para artrocentesis precoz.'
    ],
    tratamientoAmbulatorio: 'Artrocentesis de ATM bajo lavado a presión para lisar adherencias y movilizar el menisco. Kinesiología de distensión articular progresiva. Placa miorrelajante.',
    farmacoterapia: {
      primeraLinea: ['Ketorolac 10-20 mg sublingual en guardia por dolor agudo', 'Ibuprofeno 600 mg c/ 8 h + Omeprazol 20 mg/día'],
      segundaLinea: ['Metilprednisolona (Medrol Dose Pack) pauta descendente corta de 6 días', 'Ciclobenzaprina 5-10 mg nocturna'],
      precauciones: 'La ventana de oro para desbloquear manualmente o con artrocentesis son los primeros días tras el bloqueo.'
    },
    diagnosticoDiferencial: ['miospasmo', 'luxacion-abierta', 'anquilosis', 'fractura-condilar'],
    perlasHuffBenoliel: 'Huff & Benoliel: "Range of motion may improve over 3 to 4 months with self-care alone as the retrodiscal tissue adapts and becomes a pseudodisc, but acute early manual mobilization or arthrocentesis restores normal mechanics".'
  },
  {
    id: 'desplazamiento-sin-reduccion-sin-limitacion',
    nombre: 'Desplazamiento Discal sin Reducción sin Limitación de Apertura',
    categoria: 'atm',
    cie10: 'M26.63',
    esUrgenciaGuardia: false,
    resumenCorto: 'Fase crónica de desplazamiento discal donde los ligamentos posteriores se han adaptado permitiendo apertura normal (> 40 mm).',
    caracteristicasClinicas: [
      'Antecedente de haber tenido la mandíbula trabada meses o años atrás con limitación que fue cediendo progresivamente.',
      'Apertura bucal recuperada (> 40 mm), pero sin el chasquido original.',
      'Puede presentar dolor sordo leve o ser asintomático.',
      'Ligera desviación al final del movimiento de apertura.'
    ],
    criteriosDiagnosticos: 'DC/TMD: Historia de bloqueo cerrado previo resuelto, apertura máxima actual $\\ge 40$ mm, ausencia de clics articulares y RMN con disco desplazado sin reducción.',
    pruebasClinicas: ['Medición de apertura (> 40 mm), palpación de polo lateral.'],
    conductaGuardia: ['Educación del paciente sobre la adaptación del pseudodisco. No requiere procedimientos invasivos de urgencia.'],
    tratamientoAmbulatorio: 'Control periódico y placa estabilizadora si asocia mialgia o apretamiento.',
    farmacoterapia: {
      primeraLinea: ['Paracetamol 500-1000 mg o Ibuprofeno 400 mg a demanda'],
      segundaLinea: ['No aplica'],
      precauciones: 'Evitar cirugías o maniobras forzadas en un sistema que ya se encuentra adaptado y funcional.'
    },
    diagnosticoDiferencial: ['osteoartritis', 'desplazamiento-con-reduccion'],
    perlasHuffBenoliel: 'El tejido retrodiscal bilaminar sufre metaplasia fibrosa transformándose en un tejido funcional similar al fibrocartílago.'
  },
  {
    id: 'luxacion-abierta',
    nombre: 'Luxación Mandibular Aguda / Bloqueo Abierto (Open Lock)',
    categoria: 'atm',
    cie10: 'S03.0',
    esUrgenciaGuardia: true,
    resumenCorto: 'EMERGENCIA MÁXIMA DE GUARDIA: Los cóndilos se traban por delante de la eminencia articular y el paciente no puede cerrar la boca.',
    caracteristicasClinicas: [
      'El paciente ingresa a la guardia con la boca completamente abierta, incapaz de juntar los labios o contactar los dientes.',
      'Ocurre típicamente tras un bostezo amplio, vómito, risa exagerada o apertura prolongada en el sillón odontológico.',
      'Salivación profusa (sialorrea) por incapacidad para deglutir normalmente.',
      'Dolor severo y angustia intensa.',
      'Depresión o vacío palpable en la piel justo delante del trago (la fosa glenoidea está vacía).',
      'Si es bilateral: mordida abierta anterior masiva con mandíbula prognática. Si es unilateral: mentón desviado hacia el lado sano con contacto prematuro en últimos molares del lado afectado.'
    ],
    criteriosDiagnosticos: 'DC/TMD y clínico de urgencia: Imposibilidad mecánica absoluta de cerrar la boca tras apertura extrema con depresión preauricular palpable bilateral o unilateral.',
    pruebasClinicas: [
      'Examen visual y palpación preauricular inmediata.',
      'Rx panorámica si hay antecedente traumático previo para descartar fractura de cuello condilar antes de traccionar.'
    ],
    conductaGuardia: [
      'REALIZAR INMEDIATAMENTE LA MANIOBRA DE NELATÓN EN EL SILLÓN.',
      'Proteger obligatoriamente los pulgares con gasas abundantes.',
      'Vector de fuerza: Hacia ABAJO (tracción inferior sostenida), hacia ATRÁS y hacia ARRIBA.',
      'Si el paciente tiene espasmo maseterino extremo que impide la reducción: infiltrar 1 a 2 mL de mepivacaína al 3% en maseteros y pterigoideos, o solicitar sedación ligera médica en guardia.',
      'Post-reducción: Colocar vendaje mentoniano de Barton con venda elástica por 24-48 horas. Indicar estrictamente dieta líquida/blanda por 14 días y prohibir aperturas bucales > 15 mm.'
    ],
    tratamientoAmbulatorio: 'Ejercicios isométricos mandibulares para reforzar la cápsula articular. Si los episodios de luxación recidivante son frecuentes: evaluación por cirugía maxilofacial para eminectomía o inyección de toxina botulínica en el vientre inferior del pterigoideo lateral.',
    farmacoterapia: {
      primeraLinea: ['Ketorolac 10 mg sublingual o Ibuprofeno 600 mg c/ 8 h por 5 días', 'Ciclobenzaprina 5 mg nocturna por 7 días para yugular el espasmo maseterino'],
      segundaLinea: ['Tizanidina 2 mg c/ 12 h'],
      precauciones: 'No permitir que el paciente intente morder alimentos sólidos en las primeras dos semanas.'
    },
    diagnosticoDiferencial: ['desplazamiento-sin-reduccion-limitacion', 'fractura-condilar', 'miospasmo'],
    perlasHuffBenoliel: 'La pronta reducción manual en los primeros 30-60 minutos es clave; cuanto más tiempo pasa, más se contracturan los maseteros y más difícil resulta la maniobra sin anestesia general.'
  },
  {
    id: 'subluxacion-atm',
    nombre: 'Subluxación e Hipermovilidad Mandibular',
    categoria: 'atm',
    cie10: 'M26.62',
    esUrgenciaGuardia: false,
    resumenCorto: 'El cóndilo se traslada más allá de la cresta de la eminencia articular pero el paciente logra cerrar la boca por sus propios medios.',
    caracteristicasClinicas: [
      'El paciente siente un resalto momentáneo o "salto" al final de la apertura máxima.',
      'Apertura bucal excesiva (> 50-55 mm).',
      'No queda trabado de forma fija (a diferencia de la luxación verdadera).',
      'Asociado con frecuencia a hiperlaxitud ligamentosa generalizada (Criterios de Beighton).'
    ],
    criteriosDiagnosticos: 'DC/TMD: Apertura bucal amplia con resalto final visible o palpable y retorno espontáneo a la posición de cierre sin maniobra externa del profesional.',
    pruebasClinicas: ['Medición de apertura (> 50 mm), maniobra de Beighton (hiperextensión de pulgar, codos, rodillas).'],
    conductaGuardia: ['Instruir al paciente sobre la limitación voluntaria de aperturas excesivas (bostezar con el puño bajo el mentón).'],
    tratamientoAmbulatorio: 'Ejercicios de estabilización y control neuromuscular (técnica de Rocabado).',
    farmacoterapia: {
      primeraLinea: ['No requiere fármacos'],
      segundaLinea: ['No aplica'],
      precauciones: 'Evitar alimentos voluminosos (hamburguesas gigantes, manzanas enteras) que obliguen a abrir en exceso.'
    },
    diagnosticoDiferencial: ['luxacion-abierta', 'desplazamiento-con-reduccion'],
    perlasHuffBenoliel: 'Es una variación fisiológica de hipermovilidad que solo requiere tratamiento restrictivo si causa episodios repetidos de luxación completa.'
  },
  {
    id: 'anquilosis-atm',
    nombre: 'Anquilosis Fibrosa y Ósea de la ATM',
    categoria: 'atm',
    cie10: 'M26.61',
    esUrgenciaGuardia: false,
    resumenCorto: 'Fusión fibrosa u ósea entre el cóndilo mandibular y la fosa temporal con inmovilidad mandibular severa.',
    caracteristicasClinicas: [
      'Apertura bucal severamente limitada de evolución crónica (< 10-15 mm en anquilosis ósea).',
      'Ausencia total o casi total de movimientos de lateralidad y protrusión.',
      'Antecedente de traumatismo mandibular severo en la infancia o artritis séptica neonatal/infantil.',
      'Asimetría facial marcada si ocurrió durante el crecimiento (micrognatia o perfil en "pájaro").'
    ],
    criteriosDiagnosticos: 'DC/TMD: Limitación mandibular extrema no reducible y visualización tomográfica de puente óseo o masa fibrótica obliterando el espacio articular.',
    pruebasClinicas: ['Tomografía computada 3D de alta resolución de ambas ATMs.'],
    conductaGuardia: ['No intentar forzar la apertura bajo ninguna circunstancia en la guardia (riesgo de fractura mandibular). Derivar a Cirugía Maxilofacial.'],
    tratamientoAmbulatorio: 'Cirugía de desbridamiento/artroplastia de brecha o colocación de prótesis total aloplástica de ATM.',
    farmacoterapia: {
      primeraLinea: ['Analgésicos a demanda'],
      segundaLinea: ['No aplica'],
      precauciones: 'Manejo complejo de la vía aérea en caso de intubación.'
    },
    diagnosticoDiferencial: ['desplazamiento-sin-reduccion-limitacion', 'contractura-muscular', 'neoplasia'],
    perlasHuffBenoliel: 'Diferenciar rigurosamente la anquilosis fibrosa (pequeño juego elástico de 1-2 mm) de la anquilosis ósea completa (cero movilidad).'
  },
  {
    id: 'reabsorcion-condilar',
    nombre: 'Reabsorción Condilar Idiopática / Condilólisis',
    categoria: 'atm',
    cie10: 'M26.69',
    esUrgenciaGuardia: false,
    resumenCorto: 'Pérdida progresiva y rápida de volumen y altura del cóndilo mandibular de causa inmunológica o vascular.',
    caracteristicasClinicas: [
      'Típica en mujeres jóvenes (15 a 35 años).',
      'Desarrollo progresivo de mordida abierta anterior progresiva con contacto exclusivo en molares posteriores.',
      'Retrusión del mentón (mandíbula que se "va hacia atrás").',
      'Dolor articular variable, a veces escaso o ausente pese a la gran destrucción ósea visible.'
    ],
    criteriosDiagnosticos: 'Evidencia seriada en CBCT de disminución progresiva de la altura condilar en ausencia de infección o trauma previo.',
    pruebasClinicas: ['CBCT seriada cada 6 a 12 meses, centellograma óseo con SPECT para evaluar actividad metabólica activa.'],
    conductaGuardia: ['Derivación para estudio reumatológico y maxilofacial programado.'],
    tratamientoAmbulatorio: 'Estabilización oclusal, fármacos antirreabsortivos bajo indicación médica, eventual reemplazo articular una vez detenida la fase activa.',
    farmacoterapia: {
      primeraLinea: ['AINEs en brotes inflamatorios'],
      segundaLinea: ['Manejo especializado con reumatología'],
      precauciones: 'No realizar ortodoncia ni cirugía ortognática mientras la reabsorción esté activa.'
    },
    diagnosticoDiferencial: ['osteoartritis', 'artritis-reumatoidea'],
    perlasHuffBenoliel: 'Huff & Benoliel aconsejan seguimiento con CBCT seriada anual para determinar la detención de la reabsorción antes de cualquier intervención definitiva.'
  },
  {
    id: 'fractura-condilar',
    nombre: 'Fractura de Cóndilo Mandibular / Proceso Articular',
    categoria: 'atm',
    cie10: 'S02.6',
    esUrgenciaGuardia: true,
    resumenCorto: 'Fractura traumática del cuello o cabeza condilar con mordida alterada y dolor severo.',
    caracteristicasClinicas: [
      'Antecedente de golpe o traumatismo directo o indirecto (caída sobre el mentón).',
      'Dolor preauricular agudo e hinchazón inmediata.',
      'Contacto prematuro en los molares del lado fracturado y mordida abierta anterior/lateral contralateral.',
      'Desviación mandibular marcada hacia el lado de la fractura al intentar abrir la boca.',
      'Otorragia o laceración del conducto auditivo externo si la cabeza condilar impactó posteriormente.'
    ],
    criteriosDiagnosticos: 'Clínico de guardia traumática y confirmación por Rx panorámica de mandíbula o TAC facial con cortes coronales y 3D.',
    pruebasClinicas: ['Inspección de simetría facial, palpación preauricular, inspección del meato auditivo externo con otoscopio, TAC de macizo facial.'],
    conductaGuardia: [
      'Inmovilización preventiva con vendaje de Barton.',
      'Calmar el dolor con analgésicos potentes (Ketorolac IM/VO o Tramadol).',
      'Dieta líquida estricta.',
      'Derivación inmediata a Cirugía y Traumatología Bucomaxilofacial del Hospital.'
    ],
    tratamientoAmbulatorio: 'Manejo conservador con bloqueo intermaxilar elástico y fisioterapia temprana vs reducción abierta y fijación interna con placas de osteosíntesis.',
    farmacoterapia: {
      primeraLinea: ['Ketorolac 20 mg VO o 30 mg IM en guardia', 'Ibuprofeno 600 mg c/ 8 h + Tramadol 50 mg de rescate'],
      segundaLinea: ['Amoxicilina/Clavulánico 875/125 mg c/ 12 h si hay herida comunicante con oído o piel'],
      precauciones: 'Descartar traumatismo encefalocraneano (TEC) y lesión cervical asociada antes de manipular al paciente.'
    },
    diagnosticoDiferencial: ['luxacion-abierta', 'artralgia', 'desplazamiento-sin-reduccion-limitacion'],
    perlasHuffBenoliel: 'En fracturas en niños pequeños, priorizar la movilización funcional precoz para evitar la anquilosis fibrosa u ósea de la ATM.'
  },

  // ==========================================
  // 2. TRASTORNOS MUSCULARES (MASTICATORIOS Y CERVICALES)
  // ==========================================
  {
    id: 'mialgia-local',
    nombre: 'Mialgia Local Masticatoria',
    categoria: 'musculares',
    cie10: 'M79.1',
    esUrgenciaGuardia: false,
    resumenCorto: 'Dolor sordo y continuo en el cuerpo del músculo masticador sin dolor referido a distancia.',
    caracteristicasClinicas: [
      'Dolor muscular continuo, no pulsátil, de intensidad leve a moderada en mejillas o sienes.',
      'Empeora al masticar, apretar los dientes o con el estrés.',
      'Fatiga muscular o cansancio mandibular al despertar por la mañana.',
      'Dolor circunscrito exclusivamente a la zona anatómica del músculo masetero o temporal palpado.'
    ],
    criteriosDiagnosticos: 'DC/TMD: Confirmación de dolor familiar durante la palpación de masetero o temporal (1.0 kg de presión sostenida por 2 segundos) limitado a la zona de contacto del examinador, sin extenderse más allá del límite muscular.',
    pruebasClinicas: ['Palpación manual de masetero (porción superficial y profunda) y temporal a 1 kg de presión.'],
    conductaGuardia: [
      'Educación del paciente: control del apretamiento diurno voluntario e involuntario.',
      'Técnicas de calor húmedo tibio 15 min 2 veces al día.',
      'Automasaje suave en círculos sobre las fibras musculares.',
      'AINEs por vía oral por 5 a 7 días.'
    ],
    tratamientoAmbulatorio: 'Placa oclusal de descarga nocturna. Terapia cognitivo-conductual para reducción del estrés.',
    farmacoterapia: {
      primeraLinea: ['Ibuprofeno 400-600 mg c/ 8 h por 5 días', 'Paracetamol 1 g c/ 8 h'],
      segundaLinea: ['Naproxeno sódico 550 mg c/ 12 h'],
      precauciones: 'Los analgésicos solos no resuelven el problema si el paciente continúa apretando los dientes de forma sostenida.'
    },
    diagnosticoDiferencial: ['dolor-miofascial-referido', 'artralgia', 'odontalgia-miofascial'],
    perlasHuffBenoliel: 'La mialgia local es el trastorno muscular más frecuente; no genera dolor en dientes ni en la cabeza fuera de la zona palpada.'
  },
  {
    id: 'dolor-miofascial-referido',
    nombre: 'Dolor Miofascial con Dolor Referido (Puntos Gatillo)',
    categoria: 'musculares',
    cie10: 'M79.1',
    esUrgenciaGuardia: true,
    resumenCorto: 'Bandas tensas musculares hiperirritables (puntos gatillo) que al palpar reproducen dolor referido a distancia en dientes, oído o cabeza.',
    caracteristicasClinicas: [
      'Nódulo doloroso o banda tensa hiperirritable palpable dentro del músculo.',
      'Al comprimir el punto gatillo (por 5 segundos con 1 kg de fuerza), el paciente siente un dolor vivo que se irradia hacia un diente sano, oído, sien o cuello.',
      'Presencia del signo de salto ("jump sign") o respuesta de sacudida local ("twitch").',
      'Puede simular perfectamente pulpitis dental, cefalea tensional o dolor de oído.'
    ],
    criteriosDiagnosticos: 'DC/TMD: Dolor familiar en masetero/temporal que durante la palpación sostenida (5 segundos a 1 kg) se irradia a una zona de referencia anatómica que excede los límites del músculo examinado.',
    pruebasClinicas: [
      'Palpación en pinza de masetero y palpación plana de fosa temporal (ver mapa de dolor referido).',
      'Comprobación de dientes libres de caries en la zona del dolor dental referido.'
    ],
    conductaGuardia: [
      'Identificar y mostrar al paciente el punto gatillo responsable para disipar la creencia de que tiene un diente infectado.',
      'Infiltración en guardia del punto gatillo con anestésico local sin vasoconstrictor (Mepivacaína 3% o Lidocaína 1-2%, 0.5 mL) o punción seca.',
      'Aplicación de calor húmedo inmediatamente después de la punción y elongación pasiva suave de la mandíbula.',
      'AINEs + Relajante muscular nocturno por 7 a 10 días.'
    ],
    tratamientoAmbulatorio: 'Fisioterapia especializada en dolor orofacial (terapia manual, punción seca, spray and stretch). Férula oclusal plana.',
    farmacoterapia: {
      primeraLinea: ['Ibuprofeno 600 mg c/ 8 h', 'Ciclobenzaprina 5 mg nocturna por 7-10 días'],
      segundaLinea: ['Tizanidina 2 mg nocturna', 'Amitriptilina 10-25 mg por la noche si el dolor es crónico'],
      precauciones: 'NUNCA realizar endodoncia en un diente sano hasta no haber descartado un punto gatillo miofascial activo en masetero o temporal.'
    },
    diagnosticoDiferencial: ['odontalgia-miofascial', 'pulpitis-reversible', 'pulpitis-irreversible', 'neuralgia-trigemino', 'cefalea-tensional'],
    perlasHuffBenoliel: 'El masetero es el principal imitador de dolor en molares inferiores, y el temporal es el gran imitador de dolor en incisivos y premolares superiores.'
  },
  {
    id: 'miospasmo',
    nombre: 'Miospasmo / Trismus Muscular Agudo',
    categoria: 'musculares',
    cie10: 'M62.838',
    esUrgenciaGuardia: true,
    resumenCorto: 'Contracción muscular involuntaria, súbita, continua y tónica con limitación severa de apertura (trismus doloroso duro).',
    caracteristicasClinicas: [
      'Inicio agudo y repentino; la mandíbula queda dura y rígida.',
      'Limitación marcada de apertura bucal (< 20 mm).',
      'Músculo masetero o pterigoideo medial endurecido como una piedra a la palpación.',
      'Dolor severo continuo que se exacerba con cualquier intento de abrir la boca.',
      'Ocurre con frecuencia luego de punciones anestésicas tronculares mandibulares (daño/hematoma en pterigoideo medial), extracciones complejas o sobrecarga aguda.'
    ],
    criteriosDiagnosticos: 'DC/TMD: Contracción muscular tónica involuntaria evidente con dolor intenso y reducción repentina del rango de movimiento mandibular.',
    pruebasClinicas: ['Palpación extraoral del masetero (abultado y tenso) e intraoral del espacio pterigomandibular.'],
    conductaGuardia: [
      'Diferenciar inmediatamente de infección profunda del cuello (descartar celulitis, flemón o Angina de Ludwig: no debe haber fiebre ni piso de boca elevado).',
      'Aplicar calor húmedo continuo.',
      'Infiltración local de anestésico sin vasoconstrictor directamente en el vientre del músculo espasmado para romper el arco reflejo.',
      'Prescribir relajante muscular central potente + AINEs a dosis plenas.',
      'Ejercicios pasivos suaves asistidos.'
    ],
    tratamientoAmbulatorio: 'Kinesioterapia mandibular gradual. Si el trismus fue post-anestesia (inyección en pterigoideo medial), control estricto a las 48-72 hs.',
    farmacoterapia: {
      primeraLinea: ['Ciclobenzaprina 5-10 mg nocturna por 7 días', 'Ibuprofeno 600 mg c/ 8 h por 5-7 días'],
      segundaLinea: ['Tizanidina 2-4 mg c/ 12 h', 'Diazepam 5 mg nocturno en espasmo refractario agudo'],
      precauciones: 'Advertir al paciente sobre somnolencia intensa con relajantes musculares; no conducir.'
    },
    diagnosticoDiferencial: ['desplazamiento-sin-reduccion-limitacion', 'infeccion-fascial-profunda', 'pericoronaritis'],
    perlasHuffBenoliel: 'El miospasmo post-anestesia troncular suele deberse a espasmo o hematoma del pterigoideo medial; la aplicación de calor húmedo y relajantes musculares es el pilar terapéutico.'
  },
  {
    id: 'miositis',
    nombre: 'Miositis Inflamatoria Masticatoria',
    categoria: 'musculares',
    cie10: 'M60.9',
    esUrgenciaGuardia: true,
    resumenCorto: 'Inflamación aguda del músculo con dolor constante, edema y calor local por traumatismo o infección vecina.',
    caracteristicasClinicas: [
      'Dolor muscular continuo moderado a severo.',
      'Hinchazón localizada sobre el masetero o mejilla con aumento de temperatura local.',
      'Trismus importante.',
      'Puede ser de origen traumático o secundaria a extensión de una infección pericoronaria/dental vecina.'
    ],
    criteriosDiagnosticos: 'Presencia de signos cardinales de inflamación (rubor, calor, tumor, dolor) sobre la masa muscular masticatoria.',
    pruebasClinicas: ['Palpación, control de temperatura corporal, ecografía de partes blandas o CBCT si hay sospecha de cuerpo extraño/absceso.'],
    conductaGuardia: [
      'Si hay componente infeccioso vecino: tratar la causa odontogénica y prescribir antibióticos (Amoxicilina/Clavulánico).',
      'Si es inflamatoria/traumática: AINEs o corticoides sistémicos (Prednisona 20-40 mg/d por 5 días). Dieta blanda.'
    ],
    tratamientoAmbulatorio: 'Seguimiento clínico hasta resolución del edema y recuperación de apertura bucal.',
    farmacoterapia: {
      primeraLinea: ['Ibuprofeno 600 mg c/ 8 h por 7 días', 'Prednisona 20-40 mg/día en pauta corta descendente'],
      segundaLinea: ['Amoxicilina/Clavulánico 875/125 mg c/ 12 h si hay foco infeccioso adyacente'],
      precauciones: 'Descartar siempre absceso de espacio facial profundo antes de administrar corticoides puros.'
    },
    diagnosticoDiferencial: ['infeccion-fascial-profunda', 'miospasmo', 'absceso-periapical'],
    perlasHuffBenoliel: 'La miositis presenta calor y tumefacción local evidentes sobre la masa muscular, a diferencia de la mialgia funcional común.'
  },
  {
    id: 'distonia-oromandibular',
    nombre: 'Distonía Oromandibular',
    categoria: 'musculares',
    cie10: 'G24',
    esUrgenciaGuardia: false,
    resumenCorto: 'Contracciones musculares involuntarias espasmódicas que causan movimientos repetitivos o posturas anormales de mandíbula o lengua.',
    caracteristicasClinicas: [
      'Espasmos involuntarios repetitivos de apertura forzada, cierre apretado o lateralización mandibular.',
      'Dificultad marcada para hablar (disartria) y masticar.',
      'Puede mejorar transitoriamente con "trucos sensitivos" (tocar la barbilla o morder un palillo).',
      'Frecuentemente idiopática o inducida por fármacos neurolépticos/antipsicóticos (discinesia tardía).'
    ],
    criteriosDiagnosticos: 'Evaluación neurológica y orofacial especializada.',
    pruebasClinicas: ['Evaluación de movimientos mandibulares involuntarios y antecedentes farmacológicos.'],
    conductaGuardia: ['Identificar si el paciente comenzó recientemente un neuroléptico (metoclopramida, haloperidol, risperidona). Derivación a Neurología.'],
    tratamientoAmbulatorio: 'Inyección de toxina botulínica en músculos masticadores afectados por neurólogo/especialista. Baclofeno o Clonazepam.',
    farmacoterapia: {
      primeraLinea: ['Toxina botulínica intramuscular'],
      segundaLinea: ['Clonazepam 0.5 mg tid', 'Baclofeno 5-10 mg tid'],
      precauciones: 'No intentar corregir la mordida con desgastes oclusales.'
    },
    diagnosticoDiferencial: ['miospasmo', 'disquinesia-orofacial', 'epilepsia']
  },

  // ==========================================
  // 3. DOLOR DENTAL ODONTOGÉNICO Y NO ODONTOGÉNICO
  // ==========================================
  {
    id: 'pulpitis-reversible',
    nombre: 'Pulpitis Reversible',
    categoria: 'dentales',
    cie10: 'K04.0',
    esUrgenciaGuardia: false,
    resumenCorto: 'Dolor dental agudo provocado por estímulos térmicos (frío/dulce) que cesa segundos después de retirar el estímulo.',
    caracteristicasClinicas: [
      'Dolor agudo provocado por frío, dulce o aire.',
      'Cesa inmediatamente (menos de 10-15 segundos) al retirar el estímulo.',
      'No hay dolor espontáneo nocturno.',
      'Caries, restauración desadaptada o exposición dentinaria cervical.'
    ],
    criteriosDiagnosticos: 'Respuesta hiperreactiva breve a la prueba de frío con cloruro de etilo; percusión dental negativa o leve.',
    pruebasClinicas: ['Prueba de frío (spray de frío en torunda de algodón), percusión vertical y horizontal, radiografía periapical.'],
    conductaGuardia: [
      'Eliminación de la caries bajo anestesia local.',
      'Colocación de base cavitaria protectora y sellado provisorio o restauración directa.',
      'AINEs por vía oral si hay molestia residual.'
    ],
    tratamientoAmbulatorio: 'Restauración definitiva y control de vitalidad a las 4 semanas.',
    farmacoterapia: {
      primeraLinea: ['Ibuprofeno 400 mg VO según necesidad'],
      segundaLinea: ['Paracetamol 500 mg']
    },
    diagnosticoDiferencial: ['pulpitis-irreversible', 'diente-fisurado']
  },
  {
    id: 'pulpitis-irreversible',
    nombre: 'Pulpitis Irreversible Aguda',
    categoria: 'dentales',
    cie10: 'K04.0',
    esUrgenciaGuardia: true,
    resumenCorto: 'URGENCIA FRECUENTE: Dolor dental espontáneo, punzante y pulsátil intenso que aumenta con el calor y no cede.',
    caracteristicasClinicas: [
      'Dolor severo, espontáneo, que despierta al paciente durante la noche.',
      'Dolor prolongado que persiste por minutos u horas tras el estímulo térmico.',
      'El calor exacerba el dolor intensamente; a menudo el frío lo alivia temporalmente en fases avanzadas.',
      'Dolor pulsátil, difícil de localizar con exactitud por el paciente (dolor referido a la arcada opuesta o sien).'
    ],
    criteriosDiagnosticos: 'Respuesta exagerada y prolongada a la prueba térmica con dolor espontáneo continuo.',
    pruebasClinicas: ['Prueba de frío/calor, percusión dental (positiva si la inflamación llegó al ligamento periapical), radiografía periapical.'],
    conductaGuardia: [
      'TRATAMIENTO OPERATORIO DE URGENCIA OBLIGATORIO: Apertura cameral, pulpectomía de urgencia o extirpación pulpar bajo anestesia troncular e infiltrativa profunda.',
      'Lavado con hipoclorito de sodio, medicación tópica con hidróxido de calcio o pasta antibiótica/corticoide y sellado provisorio estanco.',
      'Prescripción de AINEs potentes.',
      'ALERTA: Los antibióticos sistémicos NO están indicados para la pulpitis irreversible no diseminada.'
    ],
    tratamientoAmbulatorio: 'Endodoncia completa programada y rehabilitación coronal.',
    farmacoterapia: {
      primeraLinea: ['Ibuprofeno 600 mg c/ 8 h + Paracetamol 500 mg c/ 8 h (combinación analgésica sinérgica)', 'Ketorolac 10 mg sublingual de rescate en guardia'],
      segundaLinea: ['Tramadol 50 mg si dolor refractario'],
      precauciones: 'Los analgésicos no calman la pulpitis si no se realiza la apertura de la cámara pulpar para descomprimir.'
    },
    diagnosticoDiferencial: ['absceso-periapical', 'odontalgia-miofascial', 'neuralgia-trigemino']
  },
  {
    id: 'diente-fisurado',
    nombre: 'Síndrome del Diente Fisurado',
    categoria: 'dentales',
    cie10: 'K03.81',
    esUrgenciaGuardia: true,
    resumenCorto: 'Dolor agudo punzante que aparece exclusivamente al masticar y liberar la presión (dolor al soltar la mordida).',
    caracteristicasClinicas: [
      'Dolor punzante agudo al masticar alimentos duros o fibrosos.',
      'Dolor característico "de rebote" al descomprimir la mordida ("rebound pain").',
      'Molestia con bebidas frías de duración variable.',
      'Pieza dentaria con cúspide socavada por restauración de amalgama o resina amplia sin corona protectora.'
    ],
    criteriosDiagnosticos: 'Reproducción del dolor exacto al presionar y soltar una cúspide individual con dispositivo Tooth Slooth o rodillo de algodón.',
    pruebasClinicas: ['Test de mordida cúspide por cúspide (Tooth Slooth), transiluminación con luz LED diagnóstica, tinción con azul de metileno.'],
    conductaGuardia: [
      'Identificar la cúspide comprometida.',
      'Alivio oclusal de urgencia: desoclusión de la cúspide con fresa fina para eliminar contactos prematuros en máxima intercuspidación y excursiones.',
      'Si el dolor es severo: banda ortodóncica de contención o corona provisoria cementada para estabilizar la flexión cuspídea.'
    ],
    tratamientoAmbulatorio: 'Corona de cobertura total o incrustación cuspídea adhesiva. Si la fisura alcanza la pulpa: endodoncia previa a la corona.',
    farmacoterapia: {
      primeraLinea: ['Ibuprofeno 400-600 mg c/ 8 h'],
      segundaLinea: ['Paracetamol 1 g']
    },
    diagnosticoDiferencial: ['pulpitis-reversible', 'absceso-periodontal']
  },
  {
    id: 'absceso-periapical',
    nombre: 'Absceso Periapical Agudo',
    categoria: 'dentales',
    cie10: 'K04.7',
    esUrgenciaGuardia: true,
    resumenCorto: 'Colección purulenta en el periápice con dolor severo, sensación de diente "crecido" y tumefacción vestibular.',
    caracteristicasClinicas: [
      'Dolor intenso, continuo, pulsátil.',
      'El paciente siente el diente "más largo o extruido" y no puede contactar los dientes.',
      'Sensibilidad extrema al menor roce o percusión.',
      'Tumefacción en el fondo de surco vestibular adyacente a la pieza; en fases avanzadas, fístula o celulitis facial.'
    ],
    criteriosDiagnosticos: 'Necrosis pulpar demostrada (frío negativo), dolor insoportable a la percusión vertical y ensanchamiento radiográfico del ligamento periodontal apical o radiolucidez periapical.',
    pruebasClinicas: ['Percusión suave, palpación del fondo de surco (fluctuación), vitalidad pulpar negativa, radiografía periapical.'],
    conductaGuardia: [
      'DESCOMPRESIÓN Y DRENAJE: Apertura cameral para drenar exudado a través del conducto, y/o incisión y drenaje transmucoso si hay colección purulenta fluctuante en fondo de surco.',
      'Alivio oclusal de la pieza.',
      'Antibióticos si hay signos de diseminación (fiebre, celulitis difusa, adenopatías o trismus): Amoxicilina 500-875 mg c/ 8-12 h (o Amoxicilina/Clavulánico).'
    ],
    tratamientoAmbulatorio: 'Tratamiento de conducto radicular completo.',
    farmacoterapia: {
      primeraLinea: ['Ibuprofeno 600 mg c/ 8 h + Paracetamol 1 g c/ 8 h', 'Amoxicilina 875 mg c/ 12 h (si hay celulitis/afectación sistémica)'],
      segundaLinea: ['Clindamicina 300 mg c/ 8 h (en alérgicos a penicilinas)']
    },
    diagnosticoDiferencial: ['absceso-periodontal', 'infeccion-fascial-profunda']
  },
  {
    id: 'odontalgia-miofascial',
    nombre: 'Odontalgia Miofascial (Dolor Dental Referido)',
    categoria: 'dentales',
    cie10: 'M79.1',
    esUrgenciaGuardia: false,
    resumenCorto: 'Dolor dental continuo en una pieza completamente sana, originado por puntos gatillo en masetero o temporal.',
    caracteristicasClinicas: [
      'El paciente consulta en guardia exigiendo endodoncia o extracción en un molar o premolar.',
      'La pieza dental está libre de caries, sin bolsas periodontales y sin antecedentes de trauma.',
      'Las pruebas de vitalidad pulpar son normales.',
      'Al comprimir el punto gatillo en el masetero o temporal ipsilateral, el dolor del diente SE DISPARA O REPRODUCE exactamente.'
    ],
    criteriosDiagnosticos: 'Diente clínicamente sano con prueba pulpar normal donde la palpación muscular reproduce el dolor dental y la infiltración anestésica del músculo elimina el dolor de la pieza.',
    pruebasClinicas: ['Examen dental completo negativo, palpación sistemática de masetero y temporal, prueba diagnóstica con bloqueo anestésico local intraoral (el dolor dental NO desaparece si se anestesia el diente, pero SÍ desaparece si se infiltra el músculo).'],
    conductaGuardia: [
      'PROHIBIDO TOCAR EL DIENTE: No trepanar ni extraer piezas sanas.',
      'Mostrar al paciente la correlación entre la compresión del músculo y su dolor dental.',
      'Infiltrar el punto gatillo muscular en guardia o aplicar frío/estiramiento y calor húmedo.',
      'Prescribir AINEs y relajante muscular.'
    ],
    tratamientoAmbulatorio: 'Terapia miofascial y placa oclusal de descarga.',
    farmacoterapia: {
      primeraLinea: ['Ibuprofeno 600 mg c/ 8 h', 'Ciclobenzaprina 5 mg nocturna por 7 días'],
      segundaLinea: ['Amitriptilina 10-25 mg por la noche']
    },
    diagnosticoDiferencial: ['pulpitis-irreversible', 'diente-fisurado', 'neuralgia-trigemino'],
    perlasHuffBenoliel: 'Causa número 1 de tratamientos de conducto innecesarios e iatrogenia dental en guardias. Regla de oro: si la pieza no tiene signos radiológicos ni biológicos, pensar en masetero.'
  },
  {
    id: 'disestesia-oclusal',
    nombre: 'Disestesia Oclusal (Oclusión Fantasma)',
    categoria: 'dentales',
    cie10: 'F45.8',
    esUrgenciaGuardia: false,
    resumenCorto: 'Sensación persistente y angustiante de que la mordida "no encaja", sin ninguna discrepancia oclusal objetivable.',
    caracteristicasClinicas: [
      'El paciente refiere que sus dientes no cierran bien, que un diente golpea antes que otro o que la mordida cambió de golpe.',
      'Inspección oclusal y papel de articular muestran contactos simétricos y normales.',
      'Antecedente de múltiples consultas odontológicas y desgastes oclusales previos que no brindaron alivio o empeoraron la obsesión.',
      'Frecuente comorbilidad con ansiedad, depresión o trastorno obsesivo-compulsivo.'
    ],
    criteriosDiagnosticos: 'Sensación subjetiva molesta de desalineación oclusal desproporcionada que persiste por más de 6 meses en ausencia de alteración biomecánica real.',
    pruebasClinicas: ['Análisis oclusal con papel de articular fino de 8-12 micrones (mostrar al paciente los contactos armoniosos).'],
    conductaGuardia: [
      'REGLA DE ORO DE GUARDIA: NO REALIZAR NINGÚN AJUSTE OCLUSAL NI DESGASTE EN EL SILLÓN.',
      'Explicar que el sistema sensorial trigeminal está sobreamplificando las sensaciones propioceptivas normales.',
      'Derivación a especialista en dolor orofacial y salud mental.'
    ],
    tratamientoAmbulatorio: 'Fármacos moduladores centrales (antidepresivos tricíclicos o ISRS/IRSN) y psicoterapia cognitivo-conductual.',
    farmacoterapia: {
      primeraLinea: ['No prescribir AINEs'],
      segundaLinea: ['Amitriptilina 10-25 mg/noche o Duloxetina (bajo seguimiento)'],
      precauciones: 'Cualquier desgaste oclusal selectivo fija la obsesión del paciente y perpetúa el cuadro.'
    },
    diagnosticoDiferencial: ['desplazamiento-con-reduccion', 'miospasmo']
  },

  // ==========================================
  // 4. DOLOR PERIODONTAL
  // ==========================================
  {
    id: 'pericoronaritis',
    nombre: 'Pericoronaritis Aguda del Tercer Molar',
    categoria: 'periodontales',
    cie10: 'K05.22',
    esUrgenciaGuardia: true,
    resumenCorto: 'Inflamación e infección aguda del capuchón mucoso que cubre un tercer molar semiincluido con trismus y dolor.',
    caracteristicasClinicas: [
      'Dolor agudo en la zona retromolar inferior que se irradia al oído y faringe.',
      'Limitación dolorosa de la apertura bucal (trismus por cercanía al masetero y pterigoideo interno).',
      'Capuchón mucoso sobre el tercer molar intensamente enrojecido, edematoso y doloroso al roce.',
      'Dolor exquisito al ocluir si el tercer molar superior antagonista muerde sobre el capuchón inflamado.',
      'Supuración purulenta bajo el capuchón a la presión suave, halitosis y adenopatía submandibular dolorosa.'
    ],
    criteriosDiagnosticos: 'Visualización directa del capuchón retromolar inflamado sobre pieza semiincluida con dolor a la palpación y exudado.',
    pruebasClinicas: ['Inspección oral cuidadosa, palpación del fondo de surco, radiografía panorámica.'],
    conductaGuardia: [
      'IRRIGACIÓN PROFUNDA BAJO EL CAPUCHÓN: Lavado profuso con jeringa y aguja roma utilizando clorhexidina al 0.12% o solución salina tibia para desalojar restos de comida y placa.',
      'Alivio oclusal inmediato: si la cúspide del tercer molar superior contacta y traumatiza el capuchón inferior, desgastar la cúspide antagonista (o extraer el molar superior si está extruido y no funcional).',
      'Antibióticos si hay signos sistémicos (fiebre, trismus severo < 20 mm o adenopatía marcada): Amoxicilina 875 mg c/ 12 h + Metronidazol 500 mg c/ 8 h por 7 días.',
      'Enjuagues tibios con clorhexidina 0.12% o agua tibia con sal 3 veces al día en domicilio.'
    ],
    tratamientoAmbulatorio: 'Odontectomía o exodoncia del tercer molar retenido una vez resuelta la fase aguda infecciosa.',
    farmacoterapia: {
      primeraLinea: ['Ibuprofeno 600 mg c/ 8 h con comidas', 'Enjuague con clorhexidina 0.12% 15 mL por 30 segundos cada 12 h'],
      segundaLinea: ['Amoxicilina 875 mg c/ 12 h (o Clindamicina 300 mg c/ 8 h en alérgicos) si hay trismus o celulitis']
    },
    diagnosticoDiferencial: ['absceso-periodontal', 'infeccion-fascial-profunda', 'miospasmo']
  },
  {
    id: 'absceso-periodontal',
    nombre: 'Absceso Periodontal Agudo',
    categoria: 'periodontales',
    cie10: 'K05.20',
    esUrgenciaGuardia: true,
    resumenCorto: 'Infección purulenta localizada en los tejidos periodontales con bolsa periodontal profunda y movilidad dental.',
    caracteristicasClinicas: [
      'Tumefacción gingival ovoide dolorosa en la cara lateral de la raíz de la pieza dental.',
      'Dolor sordo y pulsátil constante.',
      'Diente con movilidad aumentada y percusión lateral muy positiva.',
      'Supuración evidente por el margen gingival al presionar suavemente la encía.',
      'La pieza dental suele responder POSITIVA a las pruebas de vitalidad pulpar (a diferencia del absceso periapical, salvo compromiso endoperiodontal).'
    ],
    criteriosDiagnosticos: 'Bolsa periodontal profunda con supuración, vitalidad pulpar positiva y tumefacción lateral radiográfica.',
    pruebasClinicas: ['Sondaje periodontal cuidadoso, pruebas de vitalidad pulpar, radiografía periapical.'],
    conductaGuardia: [
      'Drenaje a través de la bolsa periodontal mediante curetaje suave con cureta Gracey bajo anestesia local.',
      'Irrigación profusa con solución salina o clorhexidina.',
      'Ajuste oclusal suave si el diente está extruido.',
      'AINEs y enjuagues antisépticos.'
    ],
    tratamientoAmbulatorio: 'Terapia periodontal básica completa (raspado y alisado radicular programado).',
    farmacoterapia: {
      primeraLinea: ['Ibuprofeno 400-600 mg c/ 8 h', 'Clorhexidina 0.12% colutorio'],
      segundaLinea: ['Metronidazol 500 mg c/ 8 h o Amoxicilina si hay fiebre/compromiso ganglionar']
    },
    diagnosticoDiferencial: ['absceso-periapical', 'absceso-gingival', 'diente-fisurado']
  },
  {
    id: 'absceso-gingival',
    nombre: 'Absceso Gingival',
    categoria: 'periodontales',
    cie10: 'K05.00',
    esUrgenciaGuardia: false,
    resumenCorto: 'Infección dolorosa aguda limitada a la encía marginal o papilar por impacto de cuerpo extraño (ej. espina, grano de choclo, cerda de cepillo).',
    caracteristicasClinicas: [
      'Tumefacción eritematosa localizada en la encía libre o papila interdental.',
      'Dolor punzante de inicio súbito.',
      'Sin bolsa periodontal previa ni compromiso de soporte óseo.',
      'Diente firme sin movilidad.'
    ],
    criteriosDiagnosticos: 'Inspección de encía marginal con identificación y retiro del cuerpo extraño causal.',
    pruebasClinicas: ['Exploración con sonda fina del margen gingival.'],
    conductaGuardia: [
      'Remoción del cuerpo extraño bajo anestesia tópica o local suave.',
      'Lavado con antiséptico y compresión suave con gasa.'
    ],
    tratamientoAmbulatorio: 'Higiene oral suave en la zona.',
    farmacoterapia: {
      primeraLinea: ['Paracetamol o Ibuprofeno a demanda', 'Enjuague con clorhexidina']
    },
    diagnosticoDiferencial: ['absceso-periodontal']
  },
  {
    id: 'guna',
    nombre: 'Gingivitis / Periodontitis Ulceronecrotizante Aguda (GUNA / PUNA)',
    categoria: 'periodontales',
    cie10: 'A69.1',
    esUrgenciaGuardia: true,
    resumenCorto: 'Infección bacteriana dolorosísima con necrosis de papilas gingivales interdentales (decapitadas), sangrado y fetidez.',
    caracteristicasClinicas: [
      'Dolor gingival agudo y urente muy intenso que impide el cepillado o comer.',
      'Papilas interdentales ulceradas, "decapitadas" o en sacabocados, cubiertas por una pseudomembrana grisácea.',
      'Sangrado gingival espontáneo profuso al menor roce.',
      'Sabor metálico desagradable y halitosis fétida característica ("olor a necrosis").',
      'Factores predisponentes: estrés emocional severo, tabaquismo, mala nutrición, inmunosupresión (sospechar VIH).'
    ],
    criteriosDiagnosticos: 'Triada clásica: dolor gingival agudo + necrosis de papilas interdentales + sangrado espontáneo.',
    pruebasClinicas: ['Inspección gingival completa; descartar linfadenopatías y fiebre. Solicitar hemograma y serología VIH si es atípica o recurrente.'],
    conductaGuardia: [
      'Debridamiento ultrasónico muy suave o con torunda de algodón embebida en agua oxigenada diluida (1:1 con agua tibia) para remover pseudomembranas sin dañar tejidos.',
      'Prescripción de enjuagues con clorhexidina 0.12% o buches con peróxido de hidrógeno al 1.5%.',
      'Antibiótico sistémico obligatorio: Metronidazol 500 mg c/ 8 h durante 7 días (espectro contra espiroquetas y anaerobios estrictos).',
      'Analgésicos potentes.'
    ],
    tratamientoAmbulatorio: 'Seguimiento periodontal completo a las 48-72 hs y raspado meticuloso.',
    farmacoterapia: {
      primeraLinea: ['Metronidazol 500 mg c/ 8 h por 7 días', 'Ibuprofeno 600 mg c/ 8 h', 'Clorhexidina 0.12% enjuagues bid'],
      segundaLinea: ['Amoxicilina/Clavulánico 875/125 mg c/ 12 h (si no tolera metronidazol)']
    },
    diagnosticoDiferencial: ['herpes-simple', 'estomatitis-aftosa', 'leucemia-aguda']
  },

  // ==========================================
  // 5. DOLOR MUCOCUTÁNEO
  // ==========================================
  {
    id: 'herpes-simple',
    nombre: 'Infección por Herpes Simplex (VHS-1) Labial e Intraoral',
    categoria: 'mucocutaneo',
    cie10: 'B00.9',
    esUrgenciaGuardia: false,
    resumenCorto: 'Vesículas dolorosas en racimo sobre base eritematosa en labio o encía queratinizada precedidas de prurito/ardor.',
    caracteristicasClinicas: [
      'Pródromo de 6 a 24 horas con sensación de hormigueo, calor, picazón o quemazón en el labio o encía.',
      'Aparición de vesículas pequeñas llenas de líquido claro agrupadas "en racimo".',
      'Las vesículas se rompen rápidamente dejando úlceras superficiales dolorosas que luego forman costras amarillentas en 5 a 10 días.',
      'Localización intraoral: se presenta casi exclusivamente sobre MUCOSA QUERATINIZADA ADHERIDA (encía adherida o paladar duro), a diferencia de las aftas.'
    ],
    criteriosDiagnosticos: 'Clínico típico de lesiones vesiculo-costrosas en labio o paladar con pródromo.',
    pruebasClinicas: ['Inspección visual.'],
    conductaGuardia: [
      'Iniciar antivirales orales en las primeras 24-48 horas del brote (en pródromo o fase vesicular precoz) para reducir duración.',
      'Instruir al paciente sobre bioseguridad: NO tocarse los ojos (riesgo de queratoconjuntivitis herpética grave) ni besar a bebés o inmunodeprimidos.',
      'Analgésicos y anestésicos tópicos (Lidocaína viscosa al 2%) si hay dolor intraoral para comer.'
    ],
    tratamientoAmbulatorio: 'Protector labial con filtro solar UV si el sol es el factor desencadenante.',
    farmacoterapia: {
      primeraLinea: ['Valaciclovir 2 g po cada 12 h por 1 solo día (2 tomas en 24 hs)', 'Famciclovir 1500 mg en dosis única'],
      segundaLinea: ['Aciclovir 400 mg 5 veces al día por 5 días', 'Penciclovir tópico al 1% cada 2 horas']
    },
    diagnosticoDiferencial: ['estomatitis-aftosa', 'herpes-zoster', 'alergia-contacto'],
    perlasHuffBenoliel: 'El Herpes Zóster suele ser unilateral estricto a lo largo de un dermatoma, mucho más doloroso y rara vez recidiva, a diferencia del simple.'
  },
  {
    id: 'estomatitis-aftosa',
    nombre: 'Estomatitis Aftosa Recurrente (Aftas)',
    categoria: 'mucocutaneo',
    cie10: 'K12.0',
    esUrgenciaGuardia: false,
    resumenCorto: 'Úlceras redondas dolorosas con fondo amarillento y halo eritematoso sobre mucosa móvil no queratinizada.',
    caracteristicasClinicas: [
      'Úlceras redondeadas u ovales de 2 a 8 mm con fondo cubierto por fibrina grisácea y halo rojo brillante.',
      'Dolor quemante intenso provocado por el contacto con alimentos ácidos, salados o calientes.',
      'Localización: MUCOSA MÓVIL NO QUERATINIZADA (carrillos, fondo de surco, vientre de lengua, mucosa labial interna). NUNCA en encía adherida.',
      'Cura espontánea sin cicatriz en 7 a 14 días.'
    ],
    criteriosDiagnosticos: 'Inspección clínica y antecedentes de brotes recurrentes autolimitados.',
    conductaGuardia: [
      'Alivio sintomático inmediato con anestésico tópico (Lidocaína gel al 2% o Benzocaína tópica antes de las comidas).',
      'Corticoides tópicos para acelerar la cicatrización: Triamcinolona al 0.1% en orabase aplicada 3-4 veces al día tras secar la lesión con gasa.'
    ],
    tratamientoAmbulatorio: 'Descartar deficiencia de hierro, ácido fólico, vitamina B12 o enfermedad celíaca si los brotes son continuos.',
    farmacoterapia: {
      primeraLinea: ['Triamcinolona acetónida 0.1% en orabase tópica tid-qid', 'Lidocaína viscosa 2% tópica antes de comer'],
      segundaLinea: ['Fluocinonida 0.05% gel']
    },
    diagnosticoDiferencial: ['herpes-simple', 'guna', 'liquen-plano']
  },
  {
    id: 'boca-urente',
    nombre: 'Síndrome de Boca Urente / Glosodinia',
    categoria: 'mucocutaneo',
    cie10: 'K14.6',
    esUrgenciaGuardia: false,
    resumenCorto: 'Sensación persistente de quemazón o ardor intenso en lengua o labios sin ninguna alteración mucosa visible.',
    caracteristicasClinicas: [
      'Sensación de quemazón, escaldado o ardor profundo ("como si se hubiera quemado con café hirviendo").',
      'Afecta con mayor frecuencia los dos tercios anteriores y bordes de la lengua, labios y paladar anterior.',
      'Evolución típica diaria: ausente o leve al despertar, va aumentando progresivamente en intensidad durante la tarde hasta alcanzar el máximo por la noche.',
      'Inspección clínica de la mucosa oral COMPLETAMENTE NORMAL.',
      'Puede asociar sequedad subjetiva (xerostomía) y sabor metálico o alterado (disgeusia).',
      'Común en mujeres peri o postmenopáusicas; etiología neuropática de fibras finas C.'
    ],
    criteriosDiagnosticos: 'ICOP/DC: Dolor urente intraoral continuo por más de 3 meses, sin lesiones mucosas causales ni alteraciones en pruebas de laboratorio.',
    pruebasClinicas: ['Inspección oral minuciosa (descartar candidiasis eritematosa o lengua geográfica), solicitar hemograma, glucemia, ferritina, vitamina B12 y perfil tiroideo.'],
    conductaGuardia: [
      'TRANQUILIZAR AL PACIENTE: Aclarar enfáticamente que NO ES CÁNCER (la "cancerofobia" es común y agrava el dolor).',
      'Enjuague con Clonazepam: disolver un comprimido de 0.5 mg en saliva, hacer buches durante 3 minutos y escupir ("swish and spit") 2 a 3 veces al día (reduce la quemazón sin provocar somnolencia sistémica).',
      'Evitar alimentos irritantes (canela, menta fuerte, alcohol, picantes) y pastas dentales con laurilsulfato de sodio.'
    ],
    tratamientoAmbulatorio: 'Manejo especializado con Neurología/Dolor Orofacial: Clonazepam oral, Gabapentina o Amitriptilina a dosis bajas.',
    farmacoterapia: {
      primeraLinea: ['Clonazepam 0.5 mg buche y escupir 3 veces al día', 'Lidocaína tópica al 2%'],
      segundaLinea: ['Amitriptilina 10-25 mg nocturna', 'Gabapentina 300 mg/día'],
      precauciones: 'Los AINEs clásicos no tienen ninguna eficacia en la glosodinia por ser un dolor neuropático central/periférico.'
    },
    diagnosticoDiferencial: ['candidiasis', 'lengua-geografica', 'dolor-neuropatico-postraumatico'],
    perlasHuffBenoliel: 'Huff & Benoliel recomiendan el protocolo de Clonazepam "swish and spit", que reduce los riesgos sistémicos sobre hígado, riñón, apnea del sueño y sedación diurna.'
  },
  {
    id: 'candidiasis',
    nombre: 'Candidiasis Oral (Eritematosa y Pseudomembranosa)',
    categoria: 'mucocutaneo',
    cie10: 'B37.0',
    esUrgenciaGuardia: false,
    resumenCorto: 'Infección fúngica por Candida albicans con placas blancas desprendibles o eritema difuso bajo prótesis/lengua.',
    caracteristicasClinicas: [
      'Forma pseudomembranosa: placas blanquecinas como "leche cortada" que se desprenden al raspado con gasa dejando una base roja sangrante.',
      'Forma eritematosa (estomatitis subprotética / glositis romboidal): mucosa intensamente roja y sensible bajo prótesis removibles o dorso de lengua.',
      'Queilitis angular (boqueras en comisuras labiales).',
      'Sensación de escozor, ardor y alteración del gusto.'
    ],
    criteriosDiagnosticos: 'Desprendimiento de placas al raspado o eritema simétrico bajo la base de la prótesis.',
    conductaGuardia: [
      'Prescripción de antifúngicos tópicos (Nistatina) o sistémicos (Fluconazol).',
      'Instruir sobre higiene de prótesis: retirar por la noche y sumergir en solución antiséptica (clorhexidina o hipoclorito diluido).'
    ],
    tratamientoAmbulatorio: 'Rebase o cambio de prótesis si están desadaptadas. Descartar diabetes o inmunodepresión.',
    farmacoterapia: {
      primeraLinea: ['Nistatina suspensión oral 100.000 UI/mL: 4 a 6 mL 4 veces al día por 14 días (retener en boca y tragar)', 'Miconazol gel oral'],
      segundaLinea: ['Fluconazol 100 mg/día por vía oral durante 7 a 14 días (en casos resistentes o eritematosos extensos)']
    },
    diagnosticoDiferencial: ['liquen-plano', 'leucoplasia', 'boca-urente']
  },
  {
    id: 'liquen-plano',
    nombre: 'Liquen Plano Oral (Forma Reticular y Erosiva)',
    categoria: 'mucocutaneo',
    cie10: 'L43.9',
    esUrgenciaGuardia: false,
    resumenCorto: 'Trastorno inflamatorio autoinmune crónico con estrías blancas de Wickham y úlceras dolorosas eritematosas.',
    caracteristicasClinicas: [
      'Líneas o redes blanquecinas arboriformes simétricas (Estrías de Wickham) bilaterales en cara interna de carrillos.',
      'Forma erosiva: áreas eritematosas ulceradas muy dolorosas al masticar o cepillarse los dientes.',
      'Gingivitis descamativa crónica.',
      'Carácter recidivante y crónico.'
    ],
    criteriosDiagnosticos: 'Clínico y biopsia con estudio histopatológico.',
    conductaGuardia: [
      'Alivio del dolor en guardia con corticoides tópicos potentes.',
      'Evitar traumatismos locales y eliminar irritantes mecánicos (bordes filosos de dientes o prótesis).'
    ],
    tratamientoAmbulatorio: 'Seguimiento semestral por especialista en patología bucal (monitoreo de lesiones potencialmente malignas).',
    farmacoterapia: {
      primeraLinea: ['Clobetasol propionato 0.05% o Fluocinonida 0.05% tópica 2 a 4 veces al día', 'Lidocaína viscosa al 2% para comer'],
      segundaLinea: ['Prednisona oral en tandas cortas si hay brote erosivo generalizado']
    },
    diagnosticoDiferencial: ['candidiasis', 'penfigoide', 'alergia-contacto']
  },

  // ==========================================
  // 6. DOLOR NEUROPÁTICO OROFACIAL
  // ==========================================
  {
    id: 'neuralgia-trigemino',
    nombre: 'Neuralgia del Trigémino Clásica (Tic Douloureux)',
    categoria: 'neuropatico',
    cie10: 'G50.0',
    esUrgenciaGuardia: true,
    resumenCorto: 'URGENCIA POR DOLOR EXTREMO: Paroxismos de descarga eléctrica o puñalada de segundos en rama V2 o V3 desencadenados por estímulos mínimos.',
    caracteristicasClinicas: [
      'Dolor de intensidad máxima, lancinante, fulgurante, como un "choque eléctrico o relámpago".',
      'Duración breve: desde fracciones de segundo hasta 2 minutos como máximo.',
      'Comienzo y finalización súbitos y abruptos.',
      'Distribución estrictamente unilateral que sigue una o más ramas del nervio trigémino (V2 maxilar o V3 mandibular con mayor frecuencia; V1 oftálmica < 5%).',
      'Desencadenado por estímulos inocuos sobre zonas gatillo ("trigger zones"): tocarse la cara, lavarse los dientes, hablar, masticar, afeitarse o una brisa de aire.',
      'Presencia de un período refractario inmediatamente después del ataque durante el cual el estímulo no genera dolor.',
      'Entre los ataques, el paciente suele estar completamente asintomático (o con dolor sordo de fondo en la variante continua).'
    ],
    criteriosDiagnosticos: 'ICHD-3 / ICOP: Al menos 3 ataques de dolor facial unilateral con las características mencionadas, sin déficit sensitivo neurológico objetivable clínicamente.',
    pruebasClinicas: [
      'Examen neurológico de pares craneales: evaluar sensibilidad táctil y dolorosa en V1, V2 y V3 (si hay anestesia o hipoestesia, SOSPECHAR NEURALGIA SECUNDARIA por compresión tumoral o esclerosis múltiple).',
      'Reflejo corneal (debe estar preservado).',
      'RMN cerebral de alta resolución con secuencias 3D FIESTA/CISS: para detectar conflicto neurovascular (asa de la arteria cerebelosa anteroinferior o posteroinferior comprimiendo la raíz del V par) o placas desmielinizantes.'
    ],
    conductaGuardia: [
      'CALMAR LA DESESPERACIÓN DEL PACIENTE: Explicar el origen neuropático del dolor.',
      'ALERTA OBLIGATORIA: Los AINEs, el paracetamol y los antibióticos TIENEN EFICACIA CERO en la neuralgia del trigémino.',
      'FÁRMACO DE PRIMERA LÍNEA EN GUARDIA: Iniciar Carbamazepina 100-200 mg 1 o 2 veces al día con comidas, subiendo gradualmente hasta 400-800 mg/día.',
      'Alternativa moderna: Oxcarbazepina 150-300 mg c/ 12 h (mejor tolerada).',
      'Si el paciente ingresa con crisis subintrantes incontrolables ("status trigeminal"): derivar a guardia neurológica para infusión intravenosa de Fenitoína o Fentanilo/Lidocaína IV o bloqueo del nervio periférico con Bupivacaína al 0.5%.'
    ],
    tratamientoAmbulatorio: 'Control hematológico periódico (hemograma y función hepática por riesgo de agranulocitosis con carbamazepina). Si hay falla farmacológica o intolerancia: derivación a neurocirugía para descompresión microvascular de Jannetta o rizotomía percutánea con balón/glicerol/radiofrecuencia.',
    farmacoterapia: {
      primeraLinea: ['Carbamazepina 200 mg VO c/ 12 h (titular gradualmente)', 'Oxcarbazepina 300 mg VO c/ 12 h'],
      segundaLinea: ['Baclofeno 5-10 mg tid (asociado a carbamazepina)', 'Gabapentina 300-600 mg tid', 'Pregabalina 75-150 mg bid'],
      precauciones: 'BLACK BOX WARNING en Carbamazepina: agranulocitosis y necrólisis epidérmica tóxica (Stevens-Johnson). Realizar hemograma basal.'
    },
    diagnosticoDiferencial: ['odontalgia-miofascial', 'pulpitis-irreversible', 'neuralgia-glosofaringeo', 'cefalea-racimos', 'arteritis-temporal'],
    perlasHuffBenoliel: 'Huff & Benoliel (Fig. 2): La respuesta positiva casi inmediata a la carbamazepina no solo trata la crisis sino que actúa como confirmación diagnóstica en centros que no disponen de RMN de urgencia.'
  },
  {
    id: 'neuralgia-glosofaringeo',
    nombre: 'Neuralgia del Glosofaríngeo (IX Par)',
    categoria: 'neuropatico',
    cie10: 'G52.1',
    esUrgenciaGuardia: true,
    resumenCorto: 'Dolor paroxístico punzante severo en la base de la lengua, fosa amigdalina, faringe o ángulo mandibular disparado al deglutir.',
    caracteristicasClinicas: [
      'Dolor lancinante similar a la neuralgia del trigémino pero ubicado en la región posterior de la lengua, amígdala o conducto auditivo profundo.',
      'Desencadenado al tragar saliva o alimentos, toser, hablar o bostezar.',
      'Puede asociar bradicardia severa, síncope o desmayo por estimulación refleja del nervio vago (complicación grave).'
    ],
    criteriosDiagnosticos: 'ICHD-3: Paroxismos unilaterales de dolor en la distribución del IX par disparados por la deglución.',
    pruebasClinicas: ['Aplicar anestésico tópico (spray de lidocaína) en la amígdala y base de lengua: si el dolor al tragar desaparece temporalmente, confirma el diagnóstico.'],
    conductaGuardia: [
      'Iniciar Carbamazepina u Oxcarbazepina al igual que en la neuralgia trigeminal.',
      'Monitorear pulso y tensión arterial ante riesgo de síncope vasovagal asociado a la deglución.',
      'Derivación a Neurología.'
    ],
    farmacoterapia: {
      primeraLinea: ['Carbamazepina 200 mg bid', 'Oxcarbazepina 300 mg bid'],
      segundaLinea: ['Gabapentina 300-600 mg tid']
    },
    diagnosticoDiferencial: ['neuralgia-trigemino', 'sindrome-eagle']
  },
  {
    id: 'dolor-neuropatico-postraumatico',
    nombre: 'Dolor Neuropático Trigeminal Postraumático (PTNP)',
    categoria: 'neuropatico',
    cie10: 'G89.0',
    esUrgenciaGuardia: false,
    resumenCorto: 'Dolor continuo urente y punzante en territorio del nervio alveolar inferior o mentoniano tras extracción, implante o cirugía.',
    caracteristicasClinicas: [
      'Dolor continuo con componente quemante, hormigueo (parestesia) o dolor ante estímulos táctiles suaves (alodinia).',
      'Antecedente claro de traumatismo quirúrgico previo (extracción de tercer molar, colocación de implante dental, sobreobturación de endodoncia en conducto dentario).',
      'Sensación de labio o mentón adormecido pero a la vez intensamente doloroso ("anesthesia dolorosa").',
      'Persiste por más de 3 a 6 meses después de la cicatrización tisular normal.'
    ],
    criteriosDiagnosticos: 'ICHD-3/ICOP: Dolor facial o intraoral continuo unilateral con antecedentes de lesión nerviosa traumática demostrada y signos de hipoestesia o alodinia.',
    pruebasClinicas: ['Test neurosensorial: prueba de pinchazo (pinprick), tacto ligero con mota de algodón, discriminación térmica (frío/calor).'],
    conductaGuardia: [
      'Si el traumatismo es hiperagudo (< 24-48 horas, ej: implante colocado en el conducto dentario): DERIVACIÓN QUIRÚRGICA URGENTE para desentornillar o retirar el implante y descomprimir el nervio.',
      'Si el implante comprime el nervio: administrar Metilprednisolona (Medrol) en dosis altas de inmediato para reducir el edema intraneural.',
      'Si es crónico: educar sobre el dolor neuropático y prescribir moduladores centrales.'
    ],
    tratamientoAmbulatorio: 'Seguimiento por especialista en dolor neuropático. Terapia con Gabapentina o Pregabalina y parches de Lidocaína tópica.',
    farmacoterapia: {
      primeraLinea: ['Gabapentina 300 mg/noche (titular a 900-1800 mg/d)', 'Pregabalina 75 mg nocturna'],
      segundaLinea: ['Amitriptilina 10-25 mg por la noche', 'Duloxetina 30-60 mg/día']
    },
    diagnosticoDiferencial: ['neuralgia-trigemino', 'pulpitis-irreversible', 'dolor-facial-idiopatico']
  },
  {
    id: 'dolor-facial-idiopatico',
    nombre: 'Dolor Facial Idiopático Persistente (PIFP / Dolor Facial Atípico)',
    categoria: 'neuropatico',
    cie10: 'G89.0',
    esUrgenciaGuardia: false,
    resumenCorto: 'Dolor facial profundo, sordo y mal delimitado que no sigue trayectos nerviosos anatómicos y no responde a analgésicos comunes.',
    caracteristicasClinicas: [
      'Dolor continuo presente durante la mayor parte del día, sordo, punzante o quemante.',
      'Localización mal definida (a menudo en el maxilar superior o pómulo), no respeta las fronteras de las ramas nerviosas periféricas.',
      'Sin hallazgos clínicos ni radiológicos que justifiquen el síntoma.',
      'El paciente con frecuencia ha tenido múltiples extracciones dentales, endodoncias o cirugías exploratorias sin ningún éxito.'
    ],
    criteriosDiagnosticos: 'ICHD-3/ICOP: Dolor facial persistente de más de 3 meses de duración sin déficit neurológico ni causa local orgánica detectable.',
    pruebasClinicas: ['Descarte exhaustivo mediante tomografía y examen orofacial.'],
    conductaGuardia: [
      'NO REALIZAR NINGUNA CIRUGÍA DENTAL NI RETRATAMIENTO: El dolor no es de causa odontogénica y cualquier procedimiento empeorará el cuadro.',
      'Contención empática del paciente y derivación a equipo multidisciplinario de dolor crónico.'
    ],
    tratamientoAmbulatorio: 'Antidepresivos tricíclicos (Amitriptilina) o duales (Duloxetina/Venlafaxina) y terapia psicológica.',
    farmacoterapia: {
      primeraLinea: ['Amitriptilina 10-25 mg por la noche'],
      segundaLinea: ['Duloxetina 30-60 mg/día', 'Pregabalina 75-150 mg/día']
    },
    diagnosticoDiferencial: ['odontalgia-miofascial', 'dolor-neuropatico-postraumatico', 'migrana-orofacial']
  },

  // ==========================================
  // 7. CEFALEAS PRIMARIAS Y DOLOR CERVICAL
  // ==========================================
  {
    id: 'migrana-orofacial',
    nombre: 'Migraña Orofacial y Migraña Clásica',
    categoria: 'cefaleas',
    cie10: 'G44.00',
    esUrgenciaGuardia: true,
    resumenCorto: 'Dolor pulsátil unilateral moderado a severo en maxilares, mandíbula o sien, con fotofobia, náuseas y empeoramiento con el movimiento.',
    caracteristicasClinicas: [
      'Crisis recurrentes de 4 a 72 horas de duración.',
      'Dolor de cualidad pulsátil o latiente de intensidad moderada a severa.',
      'Localización en zona maxilar, mandibular o retroocular además de la sien.',
      'Acompañado típicamente de náuseas, vómitos, intolerancia a la luz (fotofobia) y a los ruidos (fonofobia).',
      'El dolor empeora claramente con la actividad física rutinaria (caminar, subir escaleras).',
      'Puede estar precedida por un aura visual (luces destellantes, escotomas) en un 25-30% de los casos.'
    ],
    criteriosDiagnosticos: 'ICHD-3/ICOP: Al menos 5 crisis que cumplen criterios de duración, características del dolor y síntomas asociados acompañantes.',
    pruebasClinicas: ['Descartar signos meníngeos o banderas rojas intracraneales (SNOOP4). Examen neurológico normal.'],
    conductaGuardia: [
      'Ubicar al paciente en un box tranquilo con luz tenue y poco ruido ambiental.',
      'Tratamiento abortivo de crisis aguda en guardia: Triptanes por vía oral (Sumatriptán 50-100 mg) o analgésicos AINEs a dosis plenas si se administra precozmente.',
      'Antieméticos si hay náuseas (Metoclopramida 10 mg VO o IM).'
    ],
    tratamientoAmbulatorio: 'Profilaxis si las crisis superan los 3-4 episodios por mes (Propranolol, Topiramato, Amitriptilina o anticuerpos anti-CGRP).',
    farmacoterapia: {
      primeraLinea: ['Sumatriptán 50-100 mg VO precoz en crisis', 'Ibuprofeno 600 mg o Naproxeno 550 mg VO'],
      segundaLinea: ['Ketorolac parenteral en guardia', 'Antagonistas CGRP (Gepantes: Rimegepant)']
    },
    diagnosticoDiferencial: ['pulpitis-irreversible', 'cefalea-tensional', 'arteritis-temporal', 'cefalea-racimos'],
    perlasHuffBenoliel: 'Huff & Benoliel subrayan que la migraña puede manifestarse como dolor exclusivamente facial en la arcada dentaria inferior o maxilar sin cefalea craneal evidente (Migraña Orofacial de la ICOP).'
  },
  {
    id: 'cefalea-tensional',
    nombre: 'Cefalea de Tipo Tensional',
    categoria: 'cefaleas',
    cie10: 'G44.2',
    esUrgenciaGuardia: false,
    resumenCorto: 'Dolor opresivo bilateral en "banda o casco", no pulsátil, de intensidad leve a moderada, asociado a contractura cervical.',
    caracteristicasClinicas: [
      'Dolor de cualidad opresiva ("sensación de vincha o casco apretado").',
      'Ubicación bilateral: frontal, temporal u occipital.',
      'Intensidad leve a moderada que no impide las tareas cotidianas.',
      'NO empeora con la actividad física común.',
      'NO hay náuseas ni vómitos característicos.',
      'Fuerte asociación con dolor miofascial de cuello (trapecio, ECM) y músculos masticadores.'
    ],
    criteriosDiagnosticos: 'ICHD-3: Episodios de dolor opresivo bilateral sin náuseas ni agravamiento por el ejercicio.',
    pruebasClinicas: ['Palpación de la musculatura pericraneal y cervical (puntos hipersensibles en trapecios y sienes).'],
    conductaGuardia: [
      'Manejo del dolor con analgésicos simples (Paracetamol o Ibuprofeno).',
      'Calor local en cuello y hombros, técnicas de relajación y respiración.',
      'Evitar el abuso crónico de analgésicos (riesgo de cefalea por sobreuso).'
    ],
    tratamientoAmbulatorio: 'Kinesiología cervical y corrección ergonómica. Si es crónica: Amitriptilina 10-25 mg nocturna.',
    farmacoterapia: {
      primeraLinea: ['Paracetamol 1000 mg o Ibuprofeno 400-600 mg'],
      segundaLinea: ['Naproxeno 550 mg'],
      precauciones: 'Advertir al paciente no consumir más de 2-3 dosis semanales de analgésicos combinados.'
    },
    diagnosticoDiferencial: ['migrana-orofacial', 'dolor-miofascial-referido', 'cervicalgia']
  },
  {
    id: 'cefalea-racimos',
    nombre: 'Cefalea en Racimos / Cluster Headache',
    categoria: 'cefaleas',
    cie10: 'G44.00',
    esUrgenciaGuardia: true,
    resumenCorto: 'DOLOR EXTREMO ("Cefalea del Suicidio"): Dolor periocular estrictamente unilateral con lagrimeo, ojo rojo y congestión nasal.',
    caracteristicasClinicas: [
      'Ataques de dolor atroz, penetrante, desgarrante ("como un clavo ardiendo en el ojo").',
      'Duración: 15 a 180 minutos.',
      'Frecuencia: desde 1 ataque cada dos días hasta 8 ataques por día, frecuentemente en horarios fijos nocturnos.',
      'Signos autonómicos craneales ipsilaterales: inyección conjuntival (ojo rojo), lagrimeo copioso, congestión o goteo nasal (rinorrea), miosis/ptosis (Síndrome de Horner transitorio) y sudoración facial.',
      'Inquietud motora marcada: a diferencia del paciente con migraña que se acuesta a oscuras, el paciente con cefalea en racimos camina desesperado, se golpea o no puede estar quieto.'
    ],
    criteriosDiagnosticos: 'ICHD-3: Al menos 5 ataques de dolor unilateral severo orbitario o temporal con al menos un signo autonómico ipsilateral y sensación de agitación.',
    pruebasClinicas: ['Inspección ocular y nasal durante la crisis.'],
    conductaGuardia: [
      'TRATAMIENTO DE URGENCIA EN GUARDIA HOSPITALARIA: Oxígeno al 100% mediante máscara con reservorio a flujo alto (10 a 15 litros/minuto) durante 15 a 20 minutos (yugula la crisis en más del 70% de los pacientes).',
      'Sumatriptán 6 mg por vía subcutánea (acción en 5-10 minutos) o spray nasal.',
      'Derivación neurológica urgente.'
    ],
    tratamientoAmbulatorio: 'Profilaxis precoz con Verapamilo a dosis ascendentes con control cardiológico (ECG), corticoides orales en pauta corta puente o litio.',
    farmacoterapia: {
      primeraLinea: ['Oxígeno al 100% a 12-15 L/min por máscara reservorio', 'Sumatriptán 6 mg SC'],
      segundaLinea: ['Zolmitriptán spray nasal 5 mg', 'Prednisona oral 60-80 mg/día como puente'],
      precauciones: 'Los AINEs comunes y los opioides no son efectivos debido al rápido inicio del dolor.'
    },
    diagnosticoDiferencial: ['neuralgia-trigemino', 'migrana-orofacial', 'arteritis-temporal', 'glaucoma-agudo']
  },
  {
    id: 'arteritis-temporal',
    nombre: 'Arteritis de Células Gigantes / Arteritis Temporal',
    categoria: 'cefaleas',
    cie10: 'M31.5',
    esUrgenciaGuardia: true,
    resumenCorto: 'EMERGENCIA MÉDICA CRÍTICA: Vasculitis en mayores de 50 años con dolor temporal, claudicación mandibular y riesgo de ceguera irreversible.',
    caracteristicasClinicas: [
      'Paciente mayor de 50 años (generalmente > 65 años).',
      'Cefalea de reciente comienzo, localizada en zona temporal o parietal, intensa, punzante o quemante.',
      'CLAUDICACIÓN MANDIBULAR PATOGNOMÓNICA: Dolor o fatiga intensa en los músculos maseteros al masticar que obliga al paciente a detenerse tras pocos bocados (por isquemia de las arterias maxilares/faciales).',
      'Arteria temporal engrosada, nodular, tortuosa, dolorosa a la palpación y con pulso atenuado o ausente.',
      'SÍNTOMAS OCULARES DE ALARMA: Pérdida visual transitoria (amaurosis fugaz), visión borrosa o diplopía. Puede llevar a ceguera bilateral irreversible en horas o días si no se trata.',
      'Síntomas constitucionales asociados: astenia, fiebre baja vespertina, pérdida de peso o dolores articulares en hombros y caderas (Polimialgia Reumática).'
    ],
    criteriosDiagnosticos: 'Criterios del Colegio Americano de Reumatología (ACR): Edad > 50 años, cefalea nueva localizada, arteria temporal anómala, VSG > 50 mm/h y biopsia de arteria temporal positiva para vasculitis necrotizante granulomatosa.',
    pruebasClinicas: [
      'Palpación cuidadosa de ambas arterias temporales superficiales.',
      'SOLICITUD URGENTE DE LABORATORIO: VSG (Eritrosedimentación) y PCR cuantitativa. En la inmensa mayoría, la VSG supera los 50 mm/h e incluso los 100 mm/h.',
      'Biopsia de arteria temporal (programada por cirugía/oftalmología).'
    ],
    conductaGuardia: [
      'DERIVACIÓN MÉDICA INMEDIATA A GUARDIA GENERAL / OFTALMOLOGÍA / REUMATOLOGÍA.',
      'NO DEMORAR EL INICIO DE CORTICOIDES SISTÉMICOS: La administración inmediata de corticoides (Prednisona 60 mg/día vía oral o Metilprednisolona 1 g IV en caso de síntomas visuales) previene la ceguera permanente y NO invalida la biopsia si se realiza en los primeros 7-14 días.',
      'Internación en guardia médica hospitalaria.'
    ],
    tratamientoAmbulatorio: 'Manejo reumatológico prolongado con corticoides y agentes biológicos (Tocilizumab).',
    farmacoterapia: {
      primeraLinea: ['Prednisona 60 mg/día por vía oral de inmediato ante sospecha clínica fundamentada', 'Metilprednisolona 1000 mg IV si hay síntomas visuales activos'],
      segundaLinea: ['Tocilizumab (anti-IL6) bajo control reumatológico']
    },
    diagnosticoDiferencial: ['mialgia-local', 'artralgia', 'cefalea-tensional', 'neuralgia-trigemino'],
    perlasHuffBenoliel: 'Huff & Benoliel: "Giant cell arteritis is a medical emergency. Ischemic optic neuropathy can develop suddenly, leading to irreversible visual loss. The hallmark jaw claudication must prompt immediate ESR/CRP testing".'
  },
  {
    id: 'cervicalgia',
    nombre: 'Cervicalgia y Esguince Cervical con Referencia Facial',
    categoria: 'cefaleas',
    cie10: 'M54.2',
    esUrgenciaGuardia: false,
    resumenCorto: 'Dolor y rigidez en cuello y hombros que irradia a la región occipital, mastoidea, ángulo mandibular y sien.',
    caracteristicasClinicas: [
      'Dolor sordo en la nuca y columna cervical que empeora con posturas fijas prolongadas o movimientos del cuello.',
      'Contractura marcada de los músculos paravertebrales cervicales, esplenios y trapecios.',
      'Dolor referido hacia la cabeza (cefalea cervicogénica), ángulo mandibular y oído.',
      'Antecedente de traumatismo cervical por latigazo ("whiplash") en accidentes de tránsito o sobrecarga postural.'
    ],
    criteriosDiagnosticos: 'Dolor en el cuello con limitación del rango articular cervical que reproduce la sintomatología craneofacial.',
    pruebasClinicas: ['Examen de movilidad cervical (flexión, extensión, rotación e inclinaciones), palpación de apófisis espinosas y musculatura cervical, Rx de columna cervical si hubo trauma.'],
    conductaGuardia: [
      'Descartar compromiso radicular severo o fractura vertebral en antecedentes traumáticos.',
      'Termoterapia húmeda cervical, AINEs y relajantes musculares nocturnos.',
      'Ejercicios posturales suaves.'
    ],
    tratamientoAmbulatorio: 'Kinesioterapia y fisiatría. Terapia miofascial cervical.',
    farmacoterapia: {
      primeraLinea: ['Ibuprofeno 600 mg c/ 8 h + Ciclobenzaprina 5 mg nocturna'],
      segundaLinea: ['Naproxeno 550 mg c/ 12 h']
    },
    diagnosticoDiferencial: ['dolor-miofascial-referido', 'cefalea-tensional']
  }
];


  /* === File: js/modules/favorites.js === */
/**
 * guardia-atm - Módulo de Favoritos y Marcadores
 * Almacenamiento local persistente (LocalStorage) para acceso rápido en guardia.
 */

const STORAGE_KEY = 'guardia_atm_favoritos_v1';

class FavoritesManager {
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


  /* === File: js/modules/search.js === */
/**
 * guardia-atm - Motor de Búsqueda Instantánea Offline
 * Indexa patologías, fármacos, procedimientos, puntos gatillo y banderas rojas.
 */





class SearchEngine {
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


  /* === File: js/modules/pwa.js === */
/**
 * guardia-atm - Módulo de Registro PWA y Modo Offline
 * Gestión del Service Worker, estado de conectividad y banner de instalación nativa.
 */

class PWAManager {
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


  /* === File: js/modules/triage.js === */
/**
 * guardia-atm - Módulo de Triaje y Banderas Rojas
 * Asistente de decisión rápida de guardia y alertas de derivación médica urgente.
 */


class TriageModule {
  constructor(containerId, onSelectPathology) {
    this.container = document.getElementById(containerId);
    this.onSelectPathology = onSelectPathology;
    this.currentStep = 'motivo_principal';
    this.history = [];
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <section class="triage-section">
        <!-- Hospital Header Badge -->
        <div class="hospital-banner-card">
          <div class="hospital-banner-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v20M2 12h20"/>
            </svg>
          </div>
          <div class="hospital-banner-info">
            <span class="hospital-tag">FOLP · UNLP</span>
            <h3>Guardia de Dolor Orofacial y ATM</h3>
            <p>Hospital Odontológico Universitario · Guía Rápida para Profesionales y Alumnos</p>
          </div>
        </div>

        <!-- Banderas Rojas Accordion / Alert Banner -->
        <div class="card card-red-flags" id="redFlagsAccordion">
          <div class="card-header red-flag-header" id="redFlagsToggle" role="button" tabindex="0" aria-expanded="false">
            <div class="header-left">
              <span class="badge-alert-pulse">CRÍTICO</span>
              <h2 class="title-red-flags">Banderas Rojas (Derivación Médica Inmediata)</h2>
            </div>
            <span class="chevron-icon" id="rfChevron">▼</span>
          </div>
          
          <div class="red-flags-content is-hidden" id="rfContent">
            <p class="section-desc">Criterios de alarma clínica que exigen derivación urgente a guardia médica hospitalaria o resolución manual inmediata:</p>
            <div class="red-flags-grid">
              ${BANDERAS_ROJAS.map((br) => `
                <div class="red-flag-item" style="border-left-color: ${br.color};">
                  <div class="rf-title-row">
                    <h4>${br.titulo}</h4>
                    <span class="rf-cie-badge">${br.cie10}</span>
                  </div>
                  <span class="rf-severity">${br.gravedad}</span>
                  <ul class="rf-criteria-list">
                    ${br.criterios.map((c) => `<li>${c}</li>`).join('')}
                  </ul>
                  <div class="rf-action-box">
                    <strong>Conducta Inmediata:</strong>
                    <ul>
                      ${br.conducta.map((a) => `<li>${a}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Datos de Contacto de Derivación Hospitalaria -->
            <div class="hospital-contact-box">
              <h4>Derivación de Emergencias Hospitalarias (La Plata):</h4>
              <ul>
                <li><strong>Hospital Odontológico FOLP:</strong> Calle 50 e/ 1 y 115, La Plata.</li>
                <li><strong>Hospital Interzonal Gral. de Agudos San Martín:</strong> Calle 1 y 70, La Plata (Guardia Médica 24hs).</li>
                <li><strong>Hospital Interzonal Especializado Dr. Noel H. Sbarra:</strong> Calle 8 y 67.</li>
                <li><strong>Emergencias Médicas (SAME):</strong> 107</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Asistente Interactivo de Decisión Rápida -->
        <div class="card triage-assistant-card">
          <div class="assistant-header">
            <div class="assistant-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#006155" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <h2 class="assistant-title">Asistente de Triaje de Guardia</h2>
              <p class="assistant-subtitle">Algoritmo clínico guiado por síntoma cardinal en el sillón</p>
            </div>
          </div>

          <div id="triageQuestionContainer" class="triage-question-box">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </section>
    `;

    this.attachEventListeners();
    this.renderCurrentQuestion();
  }

  attachEventListeners() {
    const toggle = document.getElementById('redFlagsToggle');
    const content = document.getElementById('rfContent');
    const chevron = document.getElementById('rfChevron');

    if (toggle && content) {
      toggle.addEventListener('click', () => {
        const isHidden = content.classList.contains('is-hidden');
        if (isHidden) {
          content.classList.remove('is-hidden');
          chevron.textContent = '▲';
          toggle.setAttribute('aria-expanded', 'true');
        } else {
          content.classList.add('is-hidden');
          chevron.textContent = '▼';
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  renderCurrentQuestion() {
    const container = document.getElementById('triageQuestionContainer');
    if (!container) return;

    const questionData = ASISTENTE_TRIAJE_PREGUNTAS.find((q) => q.id === this.currentStep);
    if (!questionData) return;

    const isFirstStep = this.currentStep === 'motivo_principal';

    container.innerHTML = `
      <div class="triage-question-step">
        ${!isFirstStep ? `
          <button class="btn-back-step" id="btnTriageBack" aria-label="Volver a la pregunta anterior">
            ← Volver al motivo anterior
          </button>
        ` : ''}

        <h3 class="triage-question-title">${questionData.pregunta}</h3>

        <div class="triage-options-list">
          ${questionData.opciones.map((opt, idx) => `
            <button class="triage-option-btn ${opt.banderaRoja ? 'is-red-flag' : ''}" data-idx="${idx}">
              <div class="opt-text-wrap">
                <span class="opt-bullet">${idx + 1}</span>
                <span class="opt-label">${opt.texto}</span>
              </div>
              ${opt.banderaRoja ? '<span class="chip-alert">ALERTA</span>' : '<span class="opt-arrow">→</span>'}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    // Bind back button
    const backBtn = document.getElementById('btnTriageBack');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (this.history.length > 0) {
          this.currentStep = this.history.pop();
          this.renderCurrentQuestion();
        }
      });
    }

    // Bind option clicks
    const optionBtns = container.querySelectorAll('.triage-option-btn');
    optionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const selectedOpt = questionData.opciones[idx];

        if (selectedOpt.siguiente) {
          this.history.push(this.currentStep);
          this.currentStep = selectedOpt.siguiente;
          this.renderCurrentQuestion();
        } else if (selectedOpt.diagnosticoSugerido) {
          this.renderTriageResult(selectedOpt.diagnosticoSugerido, selectedOpt.banderaRoja);
        }
      });
    });
  }

  renderTriageResult(pathologyId, isRedFlag) {
    const container = document.getElementById('triageQuestionContainer');
    if (!container) return;

    const pathology = PATOLOGIAS.find((p) => p.id === pathologyId);
    if (!pathology) {
      container.innerHTML = `<p>Diagnóstico no encontrado. <button class="btn-primary" id="btnResetTriage">Reiniciar</button></p>`;
      return;
    }

    container.innerHTML = `
      <div class="triage-result-card ${isRedFlag ? 'is-red-flag-result' : ''}">
        <div class="result-badge-row">
          <span class="badge-result-title">DIAGNÓSTICO COMPATIBLE SUGERIDO</span>
          <span class="badge-cie">${pathology.cie10}</span>
        </div>

        <h3 class="result-pathology-name">${pathology.nombre}</h3>
        <p class="result-summary">${pathology.resumenCorto}</p>

        <div class="result-action-section">
          <h4>Conducta Inmediata en Guardia:</h4>
          <ul>
            ${pathology.conductaGuardia.slice(0, 3).map((act) => `<li>${act}</li>`).join('')}
          </ul>
        </div>

        <div class="result-drug-section">
          <h4>Farmacoterapia de 1ª Línea:</h4>
          <ul>
            ${pathology.farmacoterapia.primeraLinea.map((d) => `<li><strong>${d}</strong></li>`).join('')}
          </ul>
        </div>

        <div class="result-actions-footer">
          <button class="btn-primary btn-full-width" id="btnOpenFullFromTriage" data-id="${pathology.id}">
            Ver Ficha Clínica y Diagnóstico Completo →
          </button>
          <button class="btn-secondary btn-full-width" id="btnResetTriage">
            ↻ Nuevo Triaje
          </button>
        </div>
      </div>
    `;

    const openBtn = document.getElementById('btnOpenFullFromTriage');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        if (typeof this.onSelectPathology === 'function') {
          this.onSelectPathology(pathology.id);
        }
      });
    }

    const resetBtn = document.getElementById('btnResetTriage');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.currentStep = 'motivo_principal';
        this.history = [];
        this.renderCurrentQuestion();
      });
    }
  }
}


  /* === File: js/modules/pathologies-view.js === */
/**
 * guardia-atm - Vista y Detalle de Patologías Clínicas
 * Basado en Huff & Benoliel (2023) y criterios DC/TMD, ICHD-3 e ICOP.
 */


class PathologiesView {
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


  /* === File: js/modules/drugs-view.js === */
/**
 * guardia-atm - Vademécum Clínico y Guía Farmacológica de Guardia
 * Basado en Huff & Benoliel (2023), págs. 41-43.
 */

class DrugsView {
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


  /* === File: js/modules/procedures-view.js === */
/**
 * guardia-atm - Procedimientos, Maniobras e Interpretación de Laboratorio
 * Basado en Huff & Benoliel (2023), págs. 44-50.
 */

class ProceduresView {
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


  /* === File: js/modules/referral-map-view.js === */
/**
 * guardia-atm - Visualizador Interactivo de Dolor Muscular Referido
 * Basado en Huff & Benoliel (2023) Fig. 1 y Simons, Travell & Simons.
 */

class ReferralMapView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.selectedMuscleId = 'masetero-superficial';
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <section class="referral-map-section">
        
        <!-- Header -->
        <div class="map-intro-card">
          <h2>Mapa Interactivo de Dolor Referido Muscular</h2>
          <p>Patrones de referencia del dolor miofascial orofacial y cervical (Huff & Benoliel Fig. 1). Selecciona un músculo o consulta el buscador inverso por diente dolorido.</p>
        </div>

        <!-- Mode Toggle -->
        <div class="map-mode-toggle">
          <button class="map-toggle-btn active" id="btnModeMuscle">Por Músculo Masticador</button>
          <button class="map-toggle-btn" id="btnModeTooth">¿Qué Diente Duele? (Buscador Inverso)</button>
        </div>

        <!-- Container for View Modes -->
        <div id="mapModeContainer">
          <!-- Rendered dynamically -->
        </div>

      </section>
    `;

    this.attachEvents();
    this.renderMuscleMode();
  }

  attachEvents() {
    const btnMuscle = document.getElementById('btnModeMuscle');
    const btnTooth = document.getElementById('btnModeTooth');

    if (btnMuscle && btnTooth) {
      btnMuscle.addEventListener('click', () => {
        btnMuscle.classList.add('active');
        btnTooth.classList.remove('active');
        this.renderMuscleMode();
      });

      btnTooth.addEventListener('click', () => {
        btnTooth.classList.add('active');
        btnMuscle.classList.remove('active');
        this.renderToothMode();
      });
    }
  }

  renderMuscleMode() {
    const container = document.getElementById('mapModeContainer');
    if (!container) return;

    const currentMuscle = MUSCULOS_DOLOR.find((m) => m.id === this.selectedMuscleId) || MUSCULOS_DOLOR[0];

    container.innerHTML = `
      <div class="muscle-mode-layout">
        
        <!-- Muscle Pills Selector -->
        <div class="muscle-selector-chips">
          ${MUSCULOS_DOLOR.map(
            (m) => `
            <button class="muscle-chip ${m.id === this.selectedMuscleId ? 'active' : ''}" data-muscle-id="${m.id}">
              ${m.nombre}
            </button>
          `
          ).join('')}
        </div>

        <!-- Anatomical Schema and Card -->
        <div class="map-visual-card">
          
          <!-- Interactive Radiographic Anatomical Map Container -->
          <div class="anatomical-graphic-container">
            <div class="anatomical-stage">
              <!-- Base lateral head x-ray image -->
              <img src="./assets/mapa-anatomico.jpg" 
                   class="anatomical-xray-img" 
                   alt="Radiografía anatómica lateral de cráneo y cuello"
                   loading="eager">
              
              <!-- SVG Layer aligned on top of the 800x800 coordinate grid -->
              <svg class="anatomical-overlay-svg" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Esquema radiográfico con puntos gatillo y dolor referido">
                <defs>
                  <!-- Radial gradient for referred pain halos (intense fiery amber/orange) -->
                  <radialGradient id="referralHalos" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#FF3D00" stop-opacity="0.95"/>
                    <stop offset="35%" stop-color="#FF6D00" stop-opacity="0.75"/>
                    <stop offset="70%" stop-color="#FF9100" stop-opacity="0.35"/>
                    <stop offset="100%" stop-color="#FF3D00" stop-opacity="0"/>
                  </radialGradient>
                  
                  <!-- Radial gradient for active trigger point beacon -->
                  <radialGradient id="activeTriggerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#EF4444" stop-opacity="0.95"/>
                    <stop offset="50%" stop-color="#DC2626" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#991B1B" stop-opacity="0"/>
                  </radialGradient>
                </defs>

                <!-- Dotted connector lines from Trigger Point to Referred Pain Zones -->
                <g class="referral-connectors">
                  ${currentMuscle.zonasReferidas.map((z) => `
                    <line x1="${currentMuscle.triggerPoint.x}" y1="${currentMuscle.triggerPoint.y}"
                          x2="${z.x}" y2="${z.y}"
                          stroke="#FF7043" stroke-width="2.2" stroke-dasharray="5 5" stroke-opacity="0.7"
                          class="connector-line" />
                  `).join('')}
                </g>

                <!-- Glowing Referred Pain Zones (Halos) -->
                <g class="referral-halos">
                  ${currentMuscle.zonasReferidas.map((z) => `
                    <g class="referral-zone-group" title="${z.label}">
                      <!-- Outer pulsing glow -->
                      <circle cx="${z.x}" cy="${z.y}" r="${z.r * 1.5}" fill="url(#referralHalos)" class="halo-pulse-anim" />
                      <!-- Core bright spot -->
                      <circle cx="${z.x}" cy="${z.y}" r="${z.r * 0.7}" fill="#FF5722" fill-opacity="0.85" />
                      <circle cx="${z.x}" cy="${z.y}" r="3.5" fill="#FFFFFF" />
                      <!-- Mini label shadow + text -->
                      <text x="${z.x}" y="${z.y - z.r - 4}" 
                            text-anchor="middle" 
                            fill="#FFFFFF" 
                            font-size="11" 
                            font-weight="700" 
                            class="zone-svg-caption">${z.label.split('(')[0].trim()}</text>
                    </g>
                  `).join('')}
                </g>

                <!-- Inactive Trigger Points (Clickable cyan pins for quick muscle switching) -->
                <g class="inactive-trigger-points">
                  ${MUSCULOS_DOLOR.filter((m) => m.id !== currentMuscle.id).map((m) => `
                    <g class="pin-trigger-unselected" data-muscle-id="${m.id}" role="button" tabindex="0" aria-label="Músculo ${m.nombre}">
                      <circle cx="${m.triggerPoint.x}" cy="${m.triggerPoint.y}" r="16" fill="#00E5FF" fill-opacity="0.12" class="unselected-ping" />
                      <circle cx="${m.triggerPoint.x}" cy="${m.triggerPoint.y}" r="6" fill="#00E5FF" stroke="#FFFFFF" stroke-width="1.8" />
                    </g>
                  `).join('')}
                </g>

                <!-- Active Trigger Point (Selected muscle: High-contrast radar pulse + crosshair) -->
                <g class="active-trigger-point" transform="translate(${currentMuscle.triggerPoint.x}, ${currentMuscle.triggerPoint.y})">
                  <!-- Radar pulse waves -->
                  <circle cx="0" cy="0" r="36" fill="url(#activeTriggerGlow)" class="trigger-radar-ring" />
                  <circle cx="0" cy="0" r="18" fill="#DC2626" fill-opacity="0.35" stroke="#EF4444" stroke-width="2.5" class="trigger-beacon-ring" />
                  <circle cx="0" cy="0" r="8" fill="#DC2626" stroke="#FFFFFF" stroke-width="2.5" />
                  
                  <!-- Crosshair mark -->
                  <line x1="-14" y1="0" x2="-6" y2="0" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
                  <line x1="6" y1="0" x2="14" y2="0" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
                  <line x1="0" y1="-14" x2="0" y2="-6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
                  <line x1="0" y1="6" x2="0" y2="14" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />

                  <!-- Label callout tag -->
                  <g class="trigger-svg-label">
                    <rect x="14" y="-15" width="${currentMuscle.nombre.length * 8 + 26}" height="28" rx="6" 
                          fill="rgba(10, 20, 35, 0.88)" stroke="#EF4444" stroke-width="1.8" />
                    <text x="24" y="4" fill="#FFFFFF" font-size="12" font-weight="800" font-family="system-ui, sans-serif">
                      ✕ ${currentMuscle.nombre}
                    </text>
                  </g>
                </g>

              </svg>
            </div>

            <!-- Visual Legend Bar -->
            <div class="anatomical-legend-bar">
              <div class="legend-pill trigger-legend">
                <span class="legend-dot red-pulse"></span>
                <span class="legend-text"><strong>Punto Gatillo (Causa)</strong>: Palpación dolorosa</span>
              </div>
              <div class="legend-pill referral-legend">
                <span class="legend-dot orange-pulse"></span>
                <span class="legend-text"><strong>Dolor Referido (Síntoma)</strong>: Irradiación</span>
              </div>
            </div>

            <!-- Referred zones list pills -->
            <div class="referral-zones-pills">
              <span class="rz-title">Irradia dolor hacia:</span>
              <div class="rz-badges-flow">
                ${currentMuscle.zonasReferidas.map((z) => `
                  <span class="rz-pill">${z.icon || '📍'} ${z.label}</span>
                `).join('')}
              </div>
            </div>

          </div>

          <!-- Detailed Info for Selected Muscle -->
          <div class="muscle-detail-panel">
            <span class="muscle-group-tag">${currentMuscle.grupo}</span>
            <h3 class="muscle-name-heading">${currentMuscle.nombre}</h3>

            <div class="muscle-info-row">
              <h4>🎯 Localización y Palpación Clínica:</h4>
              <p>${currentMuscle.zonaPalpacion}</p>
            </div>

            <div class="muscle-info-row">
              <h4>🖐️ Maniobra en el Sillón:</h4>
              <p><em>${currentMuscle.maniobraClinica}</em></p>
            </div>

            <div class="muscle-info-row referral-target-box">
              <h4>💥 Zonas de Dolor Referido (A dónde viaja el dolor):</h4>
              <ul>
                ${currentMuscle.dolorReferido.map((r) => `<li><strong>${r}</strong></li>`).join('')}
              </ul>
            </div>

            <div class="muscle-info-row">
              <h4>⚠️ Síntomas Asociados:</h4>
              <p>${currentMuscle.sintomasAsociados}</p>
            </div>
          </div>

        </div>
      </div>
    `;

    // Attach chip clicks
    container.querySelectorAll('.muscle-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        this.selectedMuscleId = chip.getAttribute('data-muscle-id');
        this.renderMuscleMode();
      });
    });

    // Attach direct anatomical SVG pin clicks
    container.querySelectorAll('.pin-trigger-unselected').forEach((pin) => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const muscleId = pin.getAttribute('data-muscle-id');
        if (muscleId) {
          this.selectedMuscleId = muscleId;
          this.renderMuscleMode();
        }
      });
    });
  }

  renderToothMode() {
    const container = document.getElementById('mapModeContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="tooth-mode-layout">
        <div class="tooth-mode-banner">
          <h3>Buscador Inverso: Odontalgia No Odontogénica</h3>
          <p>Falsas pulpitis causadas por puntos gatillo en músculos masticadores. Si la pieza no tiene caries ni alteración pulpar demostrable, busca el diente afectado en esta tabla:</p>
        </div>

        <div class="tooth-cards-grid">
          ${ZONAS_DOLOR_DENTAL_REFERIDO.map(
            (item) => `
            <div class="tooth-referral-card">
              <div class="tooth-card-header">
                <span class="tooth-icon">🦷</span>
                <div>
                  <h4>${item.dienteAfectado}</h4>
                  <span class="tooth-culprit">Músculo Culpable: <strong>${item.musculoCausante}</strong></span>
                </div>
              </div>
              <p class="tooth-card-desc">${item.caracteristica}</p>
              <button class="btn-goto-muscle" data-muscle="${item.musculoCausante}">
                Ver Palpación del Músculo →
              </button>
            </div>
          `
          ).join('')}
        </div>
      </div>
    `;

    // Attach go to muscle buttons
    container.querySelectorAll('.btn-goto-muscle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const muscName = btn.getAttribute('data-muscle').toLowerCase();
        let targetId = 'masetero-superficial';
        if (muscName.includes('temporal')) {
          if (muscName.includes('anterior')) targetId = 'temporal-anterior';
          else if (muscName.includes('media')) targetId = 'temporal-medio';
          else targetId = 'temporal-posterior';
        } else if (muscName.includes('digástrico') || muscName.includes('digastrico')) {
          targetId = 'masetero-superficial';
        }

        this.selectedMuscleId = targetId;
        const btnMuscle = document.getElementById('btnModeMuscle');
        const btnTooth = document.getElementById('btnModeTooth');
        if (btnMuscle && btnTooth) {
          btnMuscle.classList.add('active');
          btnTooth.classList.remove('active');
        }
        this.renderMuscleMode();
      });
    });
  }
}


  /* === File: js/app.js === */
/**
 * guardia-atm - Aplicación Principal y Enrutador
 * PWA para la Guardia del Hospital de la FOLP / UNLP
 * Basado en Huff & Benoliel (2023).
 */







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


})();
