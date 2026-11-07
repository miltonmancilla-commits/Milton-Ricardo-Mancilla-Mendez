import {
  User,
  Persona,
  Programa,
  Asignatura,
  PeriodoAcademico,
  Grupo,
  Matricula,
  Calificacion,
  AuditoriaLog,
  Requirement,
  ArchitecturalDecisionRecord
} from '../types/sga';

export const INITIAL_PROGRAMAS: Programa[] = [
  {
    id_programa: 'PROG-01',
    nombre_programa: 'Ingeniería de Sistemas',
    codigo_snies: '10234',
    nivel: 'PREGRADO',
    facultad: 'Facultad de Ingeniería y Ciencias Básicas',
    modalidad: 'VIRTUAL',
    estado: 'ACTIVO',
    total_creditos: 160
  },
  {
    id_programa: 'PROG-02',
    nombre_programa: 'Administración de Empresas',
    codigo_snies: '10452',
    nivel: 'PREGRADO',
    facultad: 'Facultad de Ciencias Administrativas',
    modalidad: 'VIRTUAL',
    estado: 'ACTIVO',
    total_creditos: 154
  },
  {
    id_programa: 'PROG-03',
    nombre_programa: 'Comunicación Social y Medios Digitales',
    codigo_snies: '10891',
    nivel: 'PREGRADO',
    facultad: 'Facultad de Comunicación y Arte',
    modalidad: 'VIRTUAL',
    estado: 'ACTIVO',
    total_creditos: 148
  }
];

export const INITIAL_ASIGNATURAS: Asignatura[] = [
  {
    id_asignatura: 'ASIG-01',
    id_programa: 'PROG-01',
    codigo_materia: 'SGA-ARQ-501',
    nombre: 'Arquitectura de Software',
    creditos: 3,
    semestre: 7,
    tipo: 'OBLIGATORIA'
  },
  {
    id_asignatura: 'ASIG-02',
    id_programa: 'PROG-01',
    codigo_materia: 'SGA-BDA-601',
    nombre: 'Bases de Datos Avanzadas',
    creditos: 3,
    semestre: 6,
    tipo: 'OBLIGATORIA'
  },
  {
    id_asignatura: 'ASIG-03',
    id_programa: 'PROG-01',
    codigo_materia: 'SGA-SEC-801',
    nombre: 'Seguridad Informática y Criptografía',
    creditos: 3,
    semestre: 8,
    tipo: 'OBLIGATORIA'
  },
  {
    id_asignatura: 'ASIG-04',
    id_programa: 'PROG-01',
    codigo_materia: 'SGA-DEV-602',
    nombre: 'Desarrollo Web y Móvil Escalable',
    creditos: 4,
    semestre: 6,
    tipo: 'OBLIGATORIA'
  },
  {
    id_asignatura: 'ASIG-05',
    id_programa: 'PROG-01',
    codigo_materia: 'SGA-REQ-502',
    nombre: 'Ingeniería de Requisitos y Calidad',
    creditos: 3,
    semestre: 5,
    tipo: 'OBLIGATORIA'
  },
  {
    id_asignatura: 'ASIG-06',
    id_programa: 'PROG-01',
    codigo_materia: 'SGA-RED-401',
    nombre: 'Redes y Comunicaciones',
    creditos: 3,
    semestre: 4,
    tipo: 'OBLIGATORIA'
  }
];

export const INITIAL_PERIODOS: PeriodoAcademico[] = [
  {
    id_periodo: 'PER-2026-2',
    codigo_periodo: '2026-2',
    nombre: 'Periodo Académico 2026-B (Semestre 2)',
    fecha_inicio: '2026-08-01',
    fecha_fin: '2026-12-15',
    estado: 'ACTIVO'
  },
  {
    id_periodo: 'PER-2026-1',
    codigo_periodo: '2026-1',
    nombre: 'Periodo Académico 2026-A (Semestre 1)',
    fecha_inicio: '2026-02-01',
    fecha_fin: '2026-06-20',
    estado: 'CERRADO'
  }
];

export const INITIAL_PERSONAS: Persona[] = [
  {
    id_persona: 'PER-01',
    documento: '1019283746',
    nombres: 'Milton',
    apellidos: 'Mancilla',
    telefono: '+57 310 889 4432',
    tipo_persona: 'ADMIN',
    email: 'milton.mancilla@cun.edu.co',
    especialidad: 'Arquitecto de Software & Consultor Cloud'
  },
  {
    id_persona: 'PER-02',
    documento: '52839201',
    nombres: 'Claudia Marcela',
    apellidos: 'Peña Romero',
    telefono: '+57 312 445 6789',
    tipo_persona: 'COORDINADOR',
    email: 'claudia.pena@cun.edu.co',
    especialidad: 'Coordinación Académica Ingeniería de Sistemas'
  },
  {
    id_persona: 'PER-03',
    documento: '79201823',
    nombres: 'Roberto',
    apellidos: 'Gómez Alvarado',
    telefono: '+57 301 234 5678',
    tipo_persona: 'DOCENTE',
    email: 'roberto.gomez@cun.edu.co',
    especialidad: 'Infraestructura, Redes y Criptografía'
  },
  {
    id_persona: 'PER-04',
    documento: '63491022',
    nombres: 'Helena',
    apellidos: 'Villamizar Prada',
    telefono: '+57 315 987 6543',
    tipo_persona: 'DOCENTE',
    email: 'helena.villamizar@cun.edu.co',
    especialidad: 'Bases de Datos, Modelado SQL y Big Data'
  },
  {
    id_persona: 'PER-05',
    documento: '1020304050',
    nombres: 'Carlos Andrés',
    apellidos: 'Restrepo Gómez',
    telefono: '+57 320 555 1234',
    tipo_persona: 'ESTUDIANTE',
    email: 'carlos.restrepo@cun.edu.co',
    codigo_estudiantil: '51903019'
  },
  {
    id_persona: 'PER-06',
    documento: '1030405060',
    nombres: 'Laura Camila',
    apellidos: 'Morales Silva',
    telefono: '+57 318 777 9821',
    tipo_persona: 'ESTUDIANTE',
    email: 'laura.morales@cun.edu.co',
    codigo_estudiantil: '51903022'
  },
  {
    id_persona: 'PER-07',
    documento: '1040506070',
    nombres: 'Daniel Felipe',
    apellidos: 'Vargas Ortiz',
    telefono: '+57 311 333 4455',
    tipo_persona: 'ESTUDIANTE',
    email: 'daniel.vargas@cun.edu.co',
    codigo_estudiantil: '51903035'
  }
];

export const INITIAL_USUARIOS: User[] = [
  {
    id_usuario: 'USR-01',
    username: 'milton.mancilla',
    email: 'milton.mancilla@cun.edu.co',
    password: 'admin123',
    passwordHash: 'argon2id$v=19$m=65536,t=3,p=4$c2FsdDEyOA$admin_hash_9a8f2',
    id_rol: 'ADMINISTRADOR',
    estado: 'ACTIVO',
    id_persona: 'PER-01'
  },
  {
    id_usuario: 'USR-02',
    username: 'claudia.coordinacion',
    email: 'claudia.pena@cun.edu.co',
    password: 'coord123',
    passwordHash: 'argon2id$v=19$m=65536,t=3,p=4$c2FsdDEyOA$coord_hash_b4e19',
    id_rol: 'COORDINADOR',
    estado: 'ACTIVO',
    id_persona: 'PER-02'
  },
  {
    id_usuario: 'USR-03',
    username: 'prof.milton',
    email: 'milton.mancilla.doc@cun.edu.co',
    password: 'docente123',
    passwordHash: 'argon2id$v=19$m=65536,t=3,p=4$c2FsdDEyOA$doc_hash_c72e1',
    id_rol: 'DOCENTE',
    estado: 'ACTIVO',
    id_persona: 'PER-01'
  },
  {
    id_usuario: 'USR-04',
    username: 'prof.helena',
    email: 'helena.villamizar@cun.edu.co',
    password: 'docente123',
    passwordHash: 'argon2id$v=19$m=65536,t=3,p=4$c2FsdDEyOA$doc_hash_d90f4',
    id_rol: 'DOCENTE',
    estado: 'ACTIVO',
    id_persona: 'PER-04'
  },
  {
    id_usuario: 'USR-05',
    username: 'carlos.restrepo',
    email: 'carlos.restrepo@cun.edu.co',
    password: 'estudiante123',
    passwordHash: 'argon2id$v=19$m=65536,t=3,p=4$c2FsdDEyOA$est_hash_e55a8',
    id_rol: 'ESTUDIANTE',
    estado: 'ACTIVO',
    id_persona: 'PER-05'
  },
  {
    id_usuario: 'USR-06',
    username: 'laura.morales',
    email: 'laura.morales@cun.edu.co',
    password: 'estudiante123',
    passwordHash: 'argon2id$v=19$m=65536,t=3,p=4$c2FsdDEyOA$est_hash_f12b7',
    id_rol: 'ESTUDIANTE',
    estado: 'ACTIVO',
    id_persona: 'PER-06'
  }
];

export const INITIAL_GRUPOS: Grupo[] = [
  {
    id_grupo: 'GRP-50101',
    id_asignatura: 'ASIG-01', // Arquitectura de Software
    id_periodo: 'PER-2026-2',
    id_docente: 'PER-01', // Milton Mancilla
    nombre_grupo: 'Grupo 50101 - Martes y Jueves (Noche)',
    cupo_maximo: 30,
    cupo_ocupado: 29, // ONLY 1 REMAINING SEAT - CRUCIAL FOR RACE CONDITION SIM
    horarios: [
      { dia: 'Martes', hora_inicio: '18:15', hora_fin: '20:00', aula: 'Virtual Aula 102 - Teams CUN' },
      { dia: 'Jueves', hora_inicio: '18:15', hora_fin: '20:00', aula: 'Virtual Aula 102 - Teams CUN' }
    ],
    estado: 'ABIERTO'
  },
  {
    id_grupo: 'GRP-50102',
    id_asignatura: 'ASIG-01', // Arquitectura de Software
    id_periodo: 'PER-2026-2',
    id_docente: 'PER-01',
    nombre_grupo: 'Grupo 50102 - Sábados Intensivo',
    cupo_maximo: 25,
    cupo_ocupado: 19,
    horarios: [
      { dia: 'Sábado', hora_inicio: '08:00', hora_fin: '12:00', aula: 'Virtual Aula 204 - CUN' }
    ],
    estado: 'ABIERTO'
  },
  {
    id_grupo: 'GRP-60101',
    id_asignatura: 'ASIG-02', // Bases de Datos Avanzadas
    id_periodo: 'PER-2026-2',
    id_docente: 'PER-04', // Helena Villamizar
    nombre_grupo: 'Grupo 60101 - Lunes y Miércoles',
    cupo_maximo: 30,
    cupo_ocupado: 26,
    horarios: [
      { dia: 'Lunes', hora_inicio: '18:15', hora_fin: '20:00', aula: 'Lab Virtual Cloud SQL' },
      { dia: 'Miércoles', hora_inicio: '18:15', hora_fin: '20:00', aula: 'Lab Virtual Cloud SQL' }
    ],
    estado: 'ABIERTO'
  },
  {
    id_grupo: 'GRP-80101',
    id_asignatura: 'ASIG-03', // Seguridad Informática
    id_periodo: 'PER-2026-2',
    id_docente: 'PER-03', // Roberto Gómez
    nombre_grupo: 'Grupo 80101 - Viernes',
    cupo_maximo: 25,
    cupo_ocupado: 22,
    horarios: [
      { dia: 'Viernes', hora_inicio: '18:15', hora_fin: '21:30', aula: 'Virtual Aula CyberSec' }
    ],
    estado: 'ABIERTO'
  },
  {
    id_grupo: 'GRP-60201',
    id_asignatura: 'ASIG-04', // Desarrollo Web
    id_periodo: 'PER-2026-2',
    id_docente: 'PER-01',
    nombre_grupo: 'Grupo 60201 - Martes y Jueves (Tarde)',
    cupo_maximo: 30,
    cupo_ocupado: 28,
    horarios: [
      { dia: 'Martes', hora_inicio: '16:00', hora_fin: '18:00', aula: 'Lab FullStack Node' },
      { dia: 'Jueves', hora_inicio: '16:00', hora_fin: '18:00', aula: 'Lab FullStack Node' }
    ],
    estado: 'ABIERTO'
  }
];

export const INITIAL_MATRICULAS: Matricula[] = [
  {
    id_matricula: 'MAT-001',
    id_estudiante: 'PER-05', // Carlos Restrepo
    id_grupo: 'GRP-50101', // Arquitectura de Software
    fecha_matricula: '2026-08-03 09:14:22',
    estado: 'MATRICULADO'
  },
  {
    id_matricula: 'MAT-002',
    id_estudiante: 'PER-05', // Carlos Restrepo
    id_grupo: 'GRP-60101', // BD Avanzadas
    fecha_matricula: '2026-08-03 09:15:01',
    estado: 'MATRICULADO'
  },
  {
    id_matricula: 'MAT-003',
    id_estudiante: 'PER-06', // Laura Morales
    id_grupo: 'GRP-60101', // BD Avanzadas
    fecha_matricula: '2026-08-03 10:22:15',
    estado: 'MATRICULADO'
  },
  {
    id_matricula: 'MAT-004',
    id_estudiante: 'PER-07', // Daniel Vargas
    id_grupo: 'GRP-50101',
    fecha_matricula: '2026-08-04 14:30:11',
    estado: 'MATRICULADO'
  }
];

export const INITIAL_CALIFICACIONES: Calificacion[] = [
  {
    id_calificacion: 'CAL-001',
    id_matricula: 'MAT-001', // Carlos in Arquitectura
    corte_1: 4.6, // 30%
    corte_2: 4.8, // 30%
    corte_3: 4.5, // 40%
    definitiva: 4.62,
    fecha_actualizacion: '2026-10-20 16:45:00',
    cierre_evaluativo: false
  },
  {
    id_calificacion: 'CAL-002',
    id_matricula: 'MAT-002', // Carlos in BD Avanzadas
    corte_1: 4.2,
    corte_2: 4.0,
    corte_3: null,
    definitiva: null,
    fecha_actualizacion: '2026-09-28 11:20:15',
    cierre_evaluativo: false
  },
  {
    id_calificacion: 'CAL-003',
    id_matricula: 'MAT-003', // Laura in BD Avanzadas
    corte_1: 4.9,
    corte_2: 4.7,
    corte_3: null,
    definitiva: null,
    fecha_actualizacion: '2026-09-28 11:25:30',
    cierre_evaluativo: false
  },
  {
    id_calificacion: 'CAL-004',
    id_matricula: 'MAT-004', // Daniel in Arquitectura
    corte_1: 3.8,
    corte_2: 4.1,
    corte_3: 4.0,
    definitiva: 3.97,
    fecha_actualizacion: '2026-10-20 16:48:12',
    cierre_evaluativo: false
  }
];

export const INITIAL_AUDITORIA: AuditoriaLog[] = [
  {
    id_log: 'LOG-9481',
    id_usuario: 'USR-01',
    nombre_usuario: 'milton.mancilla',
    rol: 'ADMINISTRADOR',
    accion_realizada: 'AUTHENTICATE_SUCCESS',
    tabla_afectada: 'seguridad.usuario',
    id_registro_afectado: 'USR-01',
    ip_origen: '190.85.122.45',
    timestamp: '2026-10-28 18:05:12',
    detalles: 'Inicio de sesión seguro mediante credenciales individuales con validación RBAC',
    checksum: 'sha256:7f8a9e1b...'
  },
  {
    id_log: 'LOG-9482',
    id_usuario: 'USR-02',
    nombre_usuario: 'claudia.coordinacion',
    rol: 'COORDINADOR',
    accion_realizada: 'UPDATE_GRUPO_CUPO',
    tabla_afectada: 'academico.grupo',
    id_registro_afectado: 'GRP-50101',
    ip_origen: '190.85.122.88',
    timestamp: '2026-10-28 18:10:44',
    detalles: 'Parametrización de cupo máximo establecido en 30 plazas para periodo 2026-2',
    checksum: 'sha256:3d21fc98...'
  },
  {
    id_log: 'LOG-9483',
    id_usuario: 'USR-03',
    nombre_usuario: 'prof.milton',
    rol: 'DOCENTE',
    accion_realizada: 'RECORD_GRADES_BATCH',
    tabla_afectada: 'calificaciones.calificacion',
    id_registro_afectado: 'CAL-001',
    ip_origen: '186.28.19.102',
    timestamp: '2026-10-28 18:15:33',
    detalles: 'Registro de calificaciones corte 3 (40%) para grupo 50101 con recálculo de nota definitiva',
    checksum: 'sha256:ba991204...'
  },
  {
    id_log: 'LOG-9484',
    id_usuario: 'USR-05',
    nombre_usuario: 'carlos.restrepo',
    rol: 'ESTUDIANTE',
    accion_realizada: 'ENROLL_SUBJECT_ACID',
    tabla_afectada: 'matriculas.matricula',
    id_registro_afectado: 'MAT-001',
    ip_origen: '181.54.99.12',
    timestamp: '2026-10-28 18:22:05',
    detalles: 'Transacción de matrícula exitosa con SELECT FOR UPDATE y verificación de cupos concurrentes',
    checksum: 'sha256:ee041852...'
  }
];

export const REQUIREMENTS_DATA: Requirement[] = [
  // Functional Requirements (RF-01 to RF-12)
  {
    id: 'RF-01',
    tipo: 'RF',
    nombre: 'Autenticación Individual Segura',
    descripcion: 'Inicio y cierre de sesión seguro mediante credenciales individuales y validación de hash criptográfico.',
    componente: 'Security / Auth Module',
    mecanismo: 'Autenticación stateless con JWT (HMAC-SHA256) y contraseñas hasheadas con Argon2id/BCrypt.',
    validacion: 'Pruebas de penetración, validación de expiración de sesión y tests de autenticación 401/403.',
    categoria: 'Seguridad',
    estado: 'VALIDADO',
    prioridad: 'CRITICA',
    nivelCumplimiento: 100,
    casosPrueba: 'CP-AUTH-01 / CP-AUTH-02',
    responsable: 'Equipo Seguridad TI'
  },
  {
    id: 'RF-02',
    tipo: 'RF',
    nombre: 'Control de Acceso Basado en Roles (RBAC)',
    descripcion: 'Control de acceso granular basado en 4 roles estrictos: Administrador, Coordinador, Docente, Estudiante.',
    componente: 'API Gateway / Security Filter',
    mecanismo: 'Filtro interceptor de solicitudes HTTP validando claims del JWT y permisos de endpoints.',
    validacion: 'Pruebas unitarias de autorización con matrices de acceso cruzado entre roles.',
    categoria: 'Seguridad',
    estado: 'VALIDADO',
    prioridad: 'CRITICA',
    nivelCumplimiento: 100,
    casosPrueba: 'CP-RBAC-01 a CP-RBAC-04',
    responsable: 'Equipo Arquitectura'
  },
  {
    id: 'RF-03',
    tipo: 'RF',
    nombre: 'Gestión Integral de Estudiantes',
    descripcion: 'Registro, consulta, edición y desactivación lógica de estudiantes vinculados a sus programas.',
    componente: 'Academic Management / Student Controller',
    mecanismo: 'Transacciones CRUD con borrado lógico (soft-delete) y validación de unicidad de documento SNIES.',
    validacion: 'Verificación de integridad referencial en tablas persona y matricula.',
    categoria: 'Académico',
    estado: 'IMPLEMENTADO',
    prioridad: 'ALTA',
    nivelCumplimiento: 95,
    casosPrueba: 'CP-EST-01 / CP-EST-02',
    responsable: 'Módulo Registro Académico'
  },
  {
    id: 'RF-04',
    tipo: 'RF',
    nombre: 'Gestión de Docentes y Asignación',
    descripcion: 'Registro, consulta, parametrización de perfil y asignación de carga horaria docente.',
    componente: 'Academic Management / Faculty Svc',
    mecanismo: 'Mapeo de docentes con historial académico y validación de traslape de horarios.',
    validacion: 'Tests automáticos de detección de conflicto horario para el mismo docente.',
    categoria: 'Académico',
    estado: 'IMPLEMENTADO',
    prioridad: 'ALTA',
    nivelCumplimiento: 95,
    casosPrueba: 'CP-DOC-01 / CP-DOC-03',
    responsable: 'Módulo Talento Académico'
  },
  {
    id: 'RF-05',
    tipo: 'RF',
    nombre: 'Catálogo de Programas y Asignaturas',
    descripcion: 'Creación y actualización de programas académicos, mallas curriculares, códigos SNIES, créditos y niveles.',
    componente: 'Catalog Module',
    mecanismo: 'Esquema jerárquico Programa -> Asignaturas -> Semestres con reglas de prerequisitos.',
    validacion: 'Auditoría de integridad de créditos acumulados según lineamientos del MEN.',
    categoria: 'Académico',
    estado: 'VALIDADO',
    prioridad: 'ALTA',
    nivelCumplimiento: 100,
    casosPrueba: 'CP-CAT-01 / CP-SNIES-02',
    responsable: 'Coordinación Curricular'
  },
  {
    id: 'RF-06',
    tipo: 'RF',
    nombre: 'Grupos, Periodos y Cupos Máximos',
    descripcion: 'Configuración de periodos lectivos, creación de grupos con cupos máximos, horarios semanales y docentes.',
    componente: 'Group Scheduling Svc',
    mecanismo: 'Control de parametrización de cupos por aula y horario_json estructurado.',
    validacion: 'Verificación de consistencia de cupos previo al inicio de inscripciones.',
    categoria: 'Académico',
    estado: 'VALIDADO',
    prioridad: 'CRITICA',
    nivelCumplimiento: 100,
    casosPrueba: 'CP-GRP-01 / CP-CAP-02',
    responsable: 'Coordinación Académica'
  },
  {
    id: 'RF-07',
    tipo: 'RF',
    nombre: 'Matrícula Académica Concurrente',
    descripcion: 'Inscripción de materias en grupos con validación concurrente de cupos y prevención de duplicados o sobrecupo.',
    componente: 'Enrollment Module / Engine Cupos',
    mecanismo: 'Transacción ACID con SELECT ... FOR UPDATE (bloqueo pesimista de fila en aislamiento Read Committed).',
    validacion: 'Test de estrés con JMeter simulando 50 hilos concurrentes compitiendo por 1 último cupo.',
    categoria: 'Transaccional',
    estado: 'VALIDADO',
    prioridad: 'CRITICA',
    nivelCumplimiento: 100,
    casosPrueba: 'CP-ACID-JMETERSIM-50H',
    responsable: 'Engine Transaccional'
  },
  {
    id: 'RF-08',
    tipo: 'RF',
    nombre: 'Registro y Cierre de Calificaciones',
    descripcion: 'Captura y actualización de notas por cortes autorizados (30%, 30%, 40%) y cálculo de nota definitiva.',
    componente: 'Grades Module / Grades Engine',
    mecanismo: 'Fórmulas matemáticas de ponderación con validación de rangos (0.0 a 5.0) y flag de cierre evaluativo.',
    validacion: 'Pruebas de cálculo aritmético de definitivas y bloqueo de edición post-cierre.',
    categoria: 'Académico',
    estado: 'VALIDADO',
    prioridad: 'ALTA',
    nivelCumplimiento: 100,
    casosPrueba: 'CP-NOTAS-CALC / CP-CIERRE-01',
    responsable: 'Módulo Calificaciones'
  },
  {
    id: 'RF-09',
    tipo: 'RF',
    nombre: 'Consulta de Resultados en Tiempo Real',
    descripcion: 'Visualización en tiempo real de horarios, materias matriculadas y notas consolidadas para estudiantes.',
    componente: 'Student Portal Svc',
    mecanismo: 'Queries optimizadas con índices compuestos sobre (id_estudiante, id_periodo).',
    validacion: 'Tiempos de respuesta menores a 250 ms en consultas individuales de notas.',
    categoria: 'Consulta',
    estado: 'VALIDADO',
    prioridad: 'MEDIA',
    nivelCumplimiento: 100,
    casosPrueba: 'CP-PORTAL-TIME-250MS',
    responsable: 'Portal Estudiantil'
  },
  {
    id: 'RF-10',
    tipo: 'RF',
    nombre: 'Emisión de Reportes Consolidados',
    descripcion: 'Generación de reportes de matriculados, consolidados académicos y ocupación de grupos con filtros.',
    componente: 'Reporting Module / Query Reporter',
    mecanismo: 'Motor de consultas analíticas sobre réplica de lectura (Read-Only) con exportación CSV/PDF.',
    validacion: 'Validación de no afectación del nodo primario de escritura durante generación de reportes.',
    categoria: 'Reportes',
    estado: 'IMPLEMENTADO',
    prioridad: 'MEDIA',
    nivelCumplimiento: 90,
    casosPrueba: 'CP-REP-CSV / CP-READONLY-LAG',
    responsable: 'Analytics & Reporting'
  },
  {
    id: 'RF-11',
    tipo: 'RF',
    nombre: 'Búsquedas y Filtros Multicriterio',
    descripcion: 'Búsquedas optimizadas multicriterio por identificador, nombre, código, programa o estado.',
    componente: 'Search Engine Module',
    mecanismo: 'Indexación trigram (pg_trgm) o índices B-Tree sobre campos de búsqueda frecuente.',
    validacion: 'Planes de ejecución EXPLAIN ANALYZE confirmando escaneo de índices (Index Scan).',
    categoria: 'Búsqueda',
    estado: 'IMPLEMENTADO',
    prioridad: 'MEDIA',
    nivelCumplimiento: 95,
    casosPrueba: 'CP-SEARCH-TRGM-INDEX',
    responsable: 'Módulo Búsquedas'
  },
  {
    id: 'RF-12',
    tipo: 'RF',
    nombre: 'Pistas de Auditoría Inmutables',
    descripcion: 'Registro transaccional inmutable de eventos críticos (logins, roles, matrículas, notas, cupos).',
    componente: 'Audit Module / Async Logger',
    mecanismo: 'Inserción append-only en esquema logs con timestamp, IP, hash y trigger/worker asíncrono.',
    validacion: 'Verificación de inmutabilidad: permisos de base de datos impiden UPDATE o DELETE en tabla auditoria.',
    categoria: 'Auditoría',
    estado: 'VALIDADO',
    prioridad: 'CRITICA',
    nivelCumplimiento: 100,
    casosPrueba: 'CP-AUDIT-IMMUTABLE-TEST',
    responsable: 'Seguridad & Cumplimiento'
  },
  // Non-Functional Requirements (RNF-01 to RNF-12)
  {
    id: 'RNF-01',
    tipo: 'RNF',
    nombre: 'Seguridad y Cifrado',
    descripcion: 'Contraseñas hasheadas mediante Argon2id/BCrypt; comunicaciones forzadas en HTTPS con TLS 1.3.',
    componente: 'Capa de Seguridad / WAF / TLS',
    mecanismo: 'Terminación TLS en Edge y almacenamiento criptográfico seguro de credenciales.',
    validacion: 'Calificación A+ en SSL Labs y verificación de hashes en base de datos.',
    categoria: 'Seguridad',
    estado: 'VALIDADO',
    prioridad: 'CRITICA',
    nivelCumplimiento: 100,
    casosPrueba: 'SEC-TLS-1.3-CHECK',
    responsable: 'Infraestructura Cloud'
  },
  {
    id: 'RNF-02',
    tipo: 'RNF',
    nombre: 'Rendimiento Transaccional',
    descripcion: 'El 95% de las consultas transaccionales debe responder en menos de 3 segundos bajo carga de 300 usuarios concurrentes.',
    componente: 'Backend Modular / Pool HikariCP',
    mecanismo: 'Optimización de índices, pool de conexiones pre-establecido y queries con bajo lock-time.',
    validacion: 'Prueba de carga con 300 usuarios concurrentes: p95 medido en 2.1 segundos.',
    categoria: 'Rendimiento',
    estado: 'VALIDADO',
    prioridad: 'CRITICA',
    nivelCumplimiento: 100,
    casosPrueba: 'PERF-P95-300USERS-2.1S',
    responsable: 'Backend Performance'
  },
  {
    id: 'RNF-03',
    tipo: 'RNF',
    nombre: 'Disponibilidad de Servicio',
    descripcion: 'Disponibilidad mensual mínima del 99.5% (máximo ~3.6 horas de indisponibilidad no programada al mes).',
    componente: 'Cluster PostgreSQL & Redundancia',
    mecanismo: 'Réplica síncrona Standby en zona de disponibilidad secundaria con auto-failover < 60s.',
    validacion: 'Simulación de caída intencionada del nodo primario y recuperación automática del standby.',
    categoria: 'Disponibilidad',
    estado: 'VALIDADO',
    prioridad: 'CRITICA',
    nivelCumplimiento: 100,
    casosPrueba: 'HA-FAILOVER-TEST-60S',
    responsable: 'DevOps / SRE'
  },
  {
    id: 'RNF-04',
    tipo: 'RNF',
    nombre: 'Escalabilidad Horizontal',
    descripcion: 'Capacidad de escalado horizontal de la capa de cómputo (Docker containers) sin reingeniería.',
    componente: 'Load Balancer NGINX / Docker Nodes',
    mecanismo: 'Backend stateless: sesiones manejadas con JWT sin estado compartido en memoria de servidor.',
    validacion: 'Despliegue de nodos adicionales detrás de NGINX sin pérdida de sesiones de usuario.',
    categoria: 'Escalabilidad',
    estado: 'VALIDADO',
    prioridad: 'ALTA',
    nivelCumplimiento: 100,
    casosPrueba: 'DOCKER-SCALE-HORIZ-TEST',
    responsable: 'DevOps'
  },
  {
    id: 'RNF-05',
    tipo: 'RNF',
    nombre: 'Mantenibilidad y Bajo Acoplamiento',
    descripcion: 'Arquitectura modular con bajo acoplamiento, alta cohesión y separación clara de responsabilidades.',
    componente: 'Monolito Modular Desacoplado',
    mecanismo: 'Límites de dominio limpios: comunicación entre módulos exclusivamente por contratos de interfaz.',
    validacion: 'Métricas de acoplamiento eferente/aferente y análisis estático de dependencias.',
    categoria: 'Arquitectura',
    estado: 'VALIDADO',
    prioridad: 'ALTA',
    nivelCumplimiento: 95,
    casosPrueba: 'ARCH-COUPLING-STATIC-ANALYSIS',
    responsable: 'Arquitecto Principal'
  },
  {
    id: 'RNF-06',
    tipo: 'RNF',
    nombre: 'Usabilidad y Accesibilidad',
    descripcion: 'Interfaz web responsiva, contraste conforme a WCAG 2.1 AA y navegación por teclado accesible.',
    componente: 'Frontend SPA (React / Tailwind)',
    mecanismo: 'Diseño responsive sin desbordamientos, roles ARIA y contraste de color > 4.5:1.',
    validacion: 'Auditoría Google Lighthouse de Accesibilidad > 92/100.',
    categoria: 'Usabilidad',
    estado: 'VALIDADO',
    prioridad: 'ALTA',
    nivelCumplimiento: 96,
    casosPrueba: 'LIGHTHOUSE-A11Y-AUDIT',
    responsable: 'Frontend Team'
  },
  {
    id: 'RNF-07',
    tipo: 'RNF',
    nombre: 'Integridad y Consistencia Transaccional',
    descripcion: 'Bloqueos a nivel de fila y transacciones ACID en matrículas y calificaciones para evitar inconsistencias.',
    componente: 'Enrollment Engine / PostgreSQL',
    mecanismo: 'SELECT FOR UPDATE circunscrito a la fila del grupo específico liberado tras COMMIT.',
    validacion: 'Cero sobrecupos en ejecución masiva simultánea de inscripciones al límite.',
    categoria: 'Integridad',
    estado: 'VALIDADO',
    prioridad: 'CRITICA',
    nivelCumplimiento: 100,
    casosPrueba: 'TEST-RACE-COND-LOCK-ROW',
    responsable: 'Data Integrity Team'
  },
  {
    id: 'RNF-08',
    tipo: 'RNF',
    nombre: 'Interoperabilidad REST',
    descripcion: 'Exposición de servicios vía API RESTful estándar documentada bajo OpenAPI 3.0 (Swagger).',
    componente: 'API Gateway & Controllers',
    mecanismo: 'Uso de verbos HTTP estándar (GET, POST, PUT, DELETE) con payloads JSON estructurados.',
    validacion: 'Generación y validación de contrato Swagger / OpenAPI con schemas completos.',
    categoria: 'Interoperabilidad',
    estado: 'VALIDADO',
    prioridad: 'ALTA',
    nivelCumplimiento: 100,
    casosPrueba: 'SWAGGER-VALIDATION-3.0',
    responsable: 'API Gateway Svc'
  },
  {
    id: 'RNF-09',
    tipo: 'RNF',
    nombre: 'Respaldo y Recuperación (RPO/RTO)',
    descripcion: 'Backups diarios automatizados en almacenamiento en frío con RPO < 24 horas y RTO < 2 horas.',
    componente: 'PostgreSQL WAL & Cloud Storage',
    mecanismo: 'Volcado diario pg_dump + archivado continuo de Write-Ahead Logs (WAL) en bucket S3/GCS.',
    validacion: 'Pruebas periódicas de restauración en entorno de contingencia cronometrando RTO.',
    categoria: 'Respaldo',
    estado: 'VALIDADO',
    prioridad: 'ALTA',
    nivelCumplimiento: 100,
    casosPrueba: 'DISASTER-RECOVERY-SIM-RTO',
    responsable: 'DBA / Cloud Infra'
  },
  {
    id: 'RNF-10',
    tipo: 'RNF',
    nombre: 'Trazabilidad de Requerimientos',
    descripcion: 'Mapeo bidireccional entre requerimientos, módulos, endpoints y tablas de base de datos.',
    componente: 'Documentación & Matriz Trace',
    mecanismo: 'Etiquetado en código fuente y matriz de trazabilidad mantenida en el repositorio.',
    validacion: 'Verificación de cobertura del 100% de RFs en endpoints y pruebas de integración.',
    categoria: 'Trazabilidad',
    estado: 'VALIDADO',
    prioridad: 'CRITICA',
    nivelCumplimiento: 100,
    casosPrueba: 'TRACE-MATRIX-100PCT-COVERAGE',
    responsable: 'QA & Compliance'
  },
  {
    id: 'RNF-11',
    tipo: 'RNF',
    nombre: 'Privacidad y Mínimo Privilegio',
    descripcion: 'Restricción estricta de visibilidad de datos personales según el principio de mínimo privilegio (RBAC).',
    componente: 'Security Filter & Data Layer',
    mecanismo: 'Filtrado de campos sensibles (hashes, teléfonos de estudiantes para otros alumnos).',
    validacion: 'Verificación de payloads de respuesta para perfiles de estudiante vs docente vs admin.',
    categoria: 'Privacidad',
    estado: 'VALIDADO',
    prioridad: 'ALTA',
    nivelCumplimiento: 100,
    casosPrueba: 'DATA-PRIVACY-RBAC-PAYLOADS',
    responsable: 'Security & Legal'
  },
  {
    id: 'RNF-12',
    tipo: 'RNF',
    nombre: 'Compatibilidad Multi-Navegador',
    descripcion: 'Soporte verificado en Chrome, Firefox, Safari y Edge en versiones estables recientes sin plugins.',
    componente: 'SPA Web Client Bundle',
    mecanismo: 'Compilación estándar ES2022 con polyfills y compatibilidad CSS Grid/Flexbox.',
    validacion: 'Pruebas automatizadas en matriz de navegadores de BrowserStack/Playwright.',
    categoria: 'Compatibilidad',
    estado: 'VALIDADO',
    prioridad: 'MEDIA',
    nivelCumplimiento: 100,
    casosPrueba: 'PLAYWRIGHT-MULTI-BROWSER',
    responsable: 'QA Frontend'
  }
];

export const ADR_DATA: ArchitecturalDecisionRecord[] = [
  {
    id: 'ADR-01',
    titulo: 'Selección de Monolito Modular sobre Microservicios',
    estado: 'APROBADO',
    fecha: '2026-10-15',
    contexto: 'El Sistema de Gestión Académica (SGA) para la CUN debe atender una concurrencia nominal pico de 300 usuarios concurrentes durante periodos de matrícula y cierre evaluativo. Se requiere consistencia ACID estricta en la asignación de cupos y un costo operativo sostenible para el equipo de desarrollo institucional.',
    decision: 'Implementar una arquitectura de Monolito Modular Desacoplado con Backend RESTful y Frontend SPA. El código fuente se estructura en módulos de dominio lógicos independientes (Seguridad, Catálogo, Matrículas, Calificaciones, Reportes, Auditoría), ejecutándose en un único artefacto desplegable en contenedores Docker y compartiendo una base de datos relacional PostgreSQL con esquemas segregados.',
    consecuencias: [
      'Se elimina la latencia de red interna inherente a llamadas RPC/HTTP inter-microservicios.',
      'Garantía nativa de transacciones ACID en la reserva de cupos sin requerir patrones complejos como Saga o Two-Phase Commit.',
      'Despliegue y monitoreo altamente simplificado, reduciendo costos de infraestructura en la nube.',
      'Permite una futura transición sin fricción hacia microservicios en caso de que la demanda supere decenas de miles de usuarios, gracias al desacoplamiento estricto de interfaces entre módulos.'
    ],
    justificacion: 'La sugerencia inicial de desplegar microservicios con Kafka y MongoDB incurría en sobreingeniería crítica y arriesgaba inconsistencias por consistencia eventual, inaceptable para la validez de matrículas académicas.'
  },
  {
    id: 'ADR-02',
    titulo: 'Mecanismo de Concurrencia Pesimista en Cupos (SELECT FOR UPDATE)',
    estado: 'APROBADO',
    fecha: '2026-10-18',
    contexto: 'Durante el último día de matrícula, múltiples estudiantes compiten simultáneamente por el último cupo disponible en asignaturas críticas (condición de carrera o race condition). Si dos o más solicitudes leen cupo_ocupado = 29 a la vez, ambas procederían a matricularse, causando sobrecupo ilegal.',
    decision: 'Adoptar un mecanismo de bloqueo pesimista a nivel de fila mediante la sentencia SQL: SELECT cupo_ocupado, cupo_maximo FROM academico.grupo WHERE id_grupo = :id FOR UPDATE bajo el nivel de aislamiento READ COMMITTED de PostgreSQL.',
    consecuencias: [
      'Garantiza que solo una transacción examine y modifique el cupo del grupo en un instante de tiempo dado.',
      'El bloqueo se circunscribe exclusivamente a la fila del grupo en cuestión (Row-Level Lock), impidiendo cuellos de botella en otros grupos.',
      'La duración del bloqueo es ultracorta (< 50 milisegundos), liberándose inmediatamente al ejecutar COMMIT.',
      'Evita los reintentos frustrantes y excepciones masivas que provocaría un bloqueo optimista (Optimistic Locking) bajo alta contención.'
    ],
    justificacion: 'Asegura consistencia transaccional absoluta y respuesta determinista (201 Matrícula Exitosa para el primero, 409 Cupo Agotado para los subsecuentes).'
  },
  {
    id: 'ADR-03',
    titulo: 'Auditoría Transaccional Asíncrona Desacoplada del Hilo de Respuesta',
    estado: 'APROBADO',
    fecha: '2026-10-22',
    contexto: 'El requerimiento RNF-02 exige que el 95% de las consultas transaccionales responda en menos de 3 segundos, mientras que RF-12 y RNF-10 exigen el registro inmutable de auditoría para cada evento crítico (logins, asignación de roles, matrículas, notas).',
    decision: 'Publicar los eventos de auditoría a un buffer en memoria o worker asíncrono interno una vez confirmado el commit de la transacción principal, ejecutando la inserción física en la tabla logs.auditoria fuera del hilo HTTP que retorna la respuesta al cliente.',
    consecuencias: [
      'La experiencia del usuario final no se ve degradada por la latencia del insert de auditoría.',
      'Se mantiene el cumplimiento estricto de latencia p95 < 2.1s bajo 300 usuarios concurrentes.',
      'La tabla de auditoría posee permisos a nivel de base de datos que revocan privilegios de UPDATE y DELETE a todos los usuarios de aplicación, garantizando inmutabilidad legal.'
    ],
    justificacion: 'Equilibrio óptimo entre alto rendimiento y trazabilidad jurídica de operaciones académicas.'
  }
];

export const AI_STUDIO_INTERACTIONS = [
  {
    id: 1,
    titulo: 'Interacción 1: Selección del Estilo Arquitectónico',
    fecha: 'Octubre 2026',
    prompt_usuario: `Actúa como un arquitecto de software empresarial sénior. Con base en los siguientes requerimientos de un Sistema de Gestión Académica (300 usuarios concurrentes, necesidad de transacciones ACID en matrículas de asignaturas y equipo de desarrollo pequeño), diseña la arquitectura recomendada y realiza un análisis de compensaciones (trade-offs) entre Microservicios y Monolito Modular.`,
    respuesta_ia: `Recomiendo una arquitectura de microservicios distribuida compuesta por:
1. Microservicio de Autenticación (Auth Service)
2. Microservicio de Catálogo Académico
3. Microservicio de Matrículas e Inscripciones
4. Microservicio de Calificaciones y Reportes

Bases de Datos: Desplegar bases de datos políglotas independientes, utilizando MongoDB (NoSQL) para el servicio de matrículas con el fin de maximizar el throughput y absorber picos de alta concurrencia.
Comunicación: Utilizar Apache Kafka como bus de eventos para sincronizar eventos de matrícula con calificaciones mediante consistencia eventual.
Orquestación: Desplegar en cluster Kubernetes (EKS/GKE) con Istio Service Mesh.`,
    analisis_critico: {
      estado: 'RECHAZADA Y CORREGIDA POR EL EQUIPO HUMANO',
      motivo: 'Incurre en sobreingeniería severa (Over-Engineering) y viola requerimientos de consistencia transaccional.',
      argumentos: [
        'Vulneración de RNF-07: Una base de datos NoSQL con consistencia eventual y Kafka introduce el riesgo de "fantasma de cupos" o sobrecupo durante matrículas simultáneas.',
        'Sobrecostos desproporcionados: Desplegar Kubernetes, Kafka e Istio para una carga pico estimada en 300 usuarios concurrentes eleva los costos operativos mensuales en más de un 400% sin beneficio real.',
        'Complejidad innecesaria: Requiere coordinar transacciones distribuidas con el patrón Saga y compensaciones complejas de reversión de matrículas.',
        'Resolución adoptada: Se forzó al modelo a replantear la solución hacia un Monolito Modular con PostgreSQL relacional y esquemas separados.'
      ]
    }
  },
  {
    id: 2,
    titulo: 'Interacción 2: Prevención de Condiciones de Carrera en Matrícula',
    fecha: 'Octubre 2026',
    prompt_usuario: `Redefine el diseño asumiendo un Monolito Modular con PostgreSQL. Modela la secuencia técnica y el código SQL de aislamiento para que 50 solicitudes simultáneas para un único cupo disponible no causen sobrecupo ni cuelguen la base de datos.`,
    respuesta_ia: `Para resolver la contención concurrente de cupos en PostgreSQL, la solución óptima es utilizar una transacción atómica con nivel de aislamiento READ COMMITTED y bloqueo pesimista a nivel de fila (Row-Level Lock):

BEGIN TRANSACTION;
SELECT cupo_ocupado, cupo_maximo 
FROM academico.grupo 
WHERE id_grupo = :id 
FOR UPDATE;

-- Lógica de negocio en aplicación:
IF cupo_ocupado < cupo_maximo THEN
    INSERT INTO matriculas.matricula (id_matricula, id_estudiante, id_grupo, ...) VALUES (...);
    UPDATE academico.grupo SET cupo_ocupado = cupo_ocupado + 1 WHERE id_grupo = :id;
    INSERT INTO logs.auditoria (...) VALUES (...);
    COMMIT;
    -- Retorna 201 Created al estudiante
ELSE
    ROLLBACK;
    -- Retorna 409 Conflict ("Cupo agotado")
END IF;`,
    analisis_critico: {
      estado: 'ACEPTADA E INTEGRADA',
      motivo: 'Solución técnica matemáticamente sólida, eficiente y precisa.',
      argumentos: [
        'El uso de SELECT FOR UPDATE asegura que los 50 hilos formen una cola ordenada a nivel de registro, evaluando el cupo de forma determinista sin race conditions.',
        'Aislamiento READ COMMITTED es superior a SERIALIZABLE en este caso, pues SERIALIZABLE arrojaría errores 40001 (serialization_failure) que obligarían a implementar costosos reintentos en cliente.',
        'El bloqueo de fila solo afecta al grupo consultado, permitiendo que matrículas en otros grupos continúen en paralelo sin bloqueo mutuo.',
        'Se adoptó directamente en el componente MatriculaService y se modeló en el diagrama de secuencia oficial (Sección 6.5).'
      ]
    }
  }
];
