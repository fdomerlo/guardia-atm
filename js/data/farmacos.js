/**
 * guardia-atm - Vademécum Clínico y Guía Farmacológica de Guardia
 * Basado en Huff & Benoliel (2023), págs. 41-43 y guías farmacológicas hospitalarias.
 */

export const GRUPOS_FARMACOS = [
  { id: 'aines', nombre: 'AINEs (Antiinflamatorios No Esteroides)', color: '#006155' },
  { id: 'analgesicos', nombre: 'Analgésicos y Esteroides', color: '#46A3B7' },
  { id: 'relajantes', nombre: 'Relajantes Musculares', color: '#2563EB' },
  { id: 'neuropaticos', nombre: 'Fármacos para Dolor Neuropático', color: '#7C3AED' },
  { id: 'triptanes', nombre: 'Triptanes y Cefaleas Agudas', color: '#D97706' }
];

export const FARMACOS = [
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
