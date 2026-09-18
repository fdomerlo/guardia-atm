/**
 * guardia-atm - Procedimientos, Maniobras e Infiltraciones de Guardia
 * Basado en Huff & Benoliel (2023), págs. 44-50 y protocolos de guardia hospitalaria.
 */

export const PROCEDIMIENTOS = [
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

export const PRUEBAS_LABORATORIO = [
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
