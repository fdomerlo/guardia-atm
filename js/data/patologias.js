/**
 * guardia-atm - Base de Datos de Patologías de ATM y Dolor Orofacial
 * Basado en Huff & Benoliel (2023), criterios DC/TMD, ICHD-3 e ICOP.
 */

export const CATEGORIAS_PATOLOGIAS = [
  { id: 'atm', nombre: 'Trastornos de la ATM', icono: 'activity', color: '#006155' },
  { id: 'musculares', nombre: 'Trastornos Musculares', icono: 'user', color: '#46A3B7' },
  { id: 'dentales', nombre: 'Dolor Dental y Oclusal', icono: 'smile', color: '#2563EB' },
  { id: 'periodontales', nombre: 'Dolor Periodontal', icono: 'shield', color: '#059669' },
  { id: 'mucocutaneo', nombre: 'Dolor Mucocutáneo', icono: 'droplet', color: '#D97706' },
  { id: 'neuropatico', nombre: 'Dolor Neuropático', icono: 'zap', color: '#7C3AED' },
  { id: 'cefaleas', nombre: 'Cefaleas y Dolor Cervical', icono: 'cloud-lightning', color: '#DC2626' }
];

export const PATOLOGIAS = [
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
