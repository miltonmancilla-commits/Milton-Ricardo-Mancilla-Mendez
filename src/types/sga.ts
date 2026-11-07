export type RoleType = 'ADMINISTRADOR' | 'COORDINADOR' | 'DOCENTE' | 'ESTUDIANTE';

export interface User {
  id_usuario: string;
  username: string;
  email: string;
  password?: string;
  passwordHash?: string;
  id_rol: RoleType;
  estado: 'ACTIVO' | 'INACTIVO';
  id_persona: string;
}

export interface RegisterUserPayload {
  nombres: string;
  apellidos: string;
  documento: string;
  telefono: string;
  email: string;
  username: string;
  password: string;
  id_rol: RoleType;
  codigo_estudiantil?: string;
  especialidad?: string;
}

export interface CreateGrupoPayload {
  id_asignatura: string;
  id_periodo: string;
  id_docente: string;
  nombre_grupo: string;
  cupo_maximo: number;
  horarios: HorarioItem[];
}

export interface Persona {
  id_persona: string;
  documento: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  tipo_persona: 'ADMIN' | 'COORDINADOR' | 'DOCENTE' | 'ESTUDIANTE';
  email: string;
  codigo_estudiantil?: string;
  especialidad?: string;
}

export interface Programa {
  id_programa: string;
  nombre_programa: string;
  codigo_snies: string;
  nivel: 'PREGRADO' | 'POSGRADO' | 'TECNOLOGÍA';
  facultad: string;
  modalidad: 'VIRTUAL' | 'PRESENCIAL' | 'DISTANCIA';
  estado: 'ACTIVO' | 'INACTIVO';
  total_creditos: number;
}

export interface Asignatura {
  id_asignatura: string;
  id_programa: string;
  codigo_materia: string;
  nombre: string;
  creditos: number;
  semestre: number;
  tipo: 'OBLIGATORIA' | 'ELECTIVA';
}

export interface PeriodoAcademico {
  id_periodo: string;
  codigo_periodo: string;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: 'ACTIVO' | 'CERRADO' | 'PLANIFICACION';
}

export interface HorarioItem {
  dia: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';
  hora_inicio: string;
  hora_fin: string;
  aula: string;
}

export interface Grupo {
  id_grupo: string;
  id_asignatura: string;
  id_periodo: string;
  id_docente: string;
  nombre_grupo: string;
  cupo_maximo: number;
  cupo_ocupado: number;
  horarios: HorarioItem[];
  estado: 'ABIERTO' | 'CERRADO' | 'LLENO';
}

export interface Matricula {
  id_matricula: string;
  id_estudiante: string;
  id_grupo: string;
  fecha_matricula: string;
  estado: 'MATRICULADO' | 'CANCELADO' | 'EN_REVISION';
}

export interface Calificacion {
  id_calificacion: string;
  id_matricula: string;
  corte_1: number | null; // 30%
  corte_2: number | null; // 30%
  corte_3: number | null; // 40%
  definitiva: number | null;
  fecha_actualizacion: string;
  cierre_evaluativo: boolean;
}

export interface AuditoriaLog {
  id_log: string;
  id_usuario: string;
  nombre_usuario: string;
  rol: RoleType;
  accion_realizada: string;
  tabla_afectada: string;
  id_registro_afectado: string;
  ip_origen: string;
  timestamp: string;
  detalles?: string;
  checksum?: string;
}

export interface Requirement {
  id: string;
  tipo: 'RF' | 'RNF';
  nombre: string;
  descripcion: string;
  componente: string;
  mecanismo: string;
  validacion: string;
  categoria?: string;
  estado: 'VALIDADO' | 'IMPLEMENTADO' | 'EN_PROGRESO' | 'PENDIENTE';
  prioridad: 'CRITICA' | 'ALTA' | 'MEDIA' | 'BAJA';
  nivelCumplimiento: number; // 0 - 100 (%)
  casosPrueba?: string;
  responsable?: string;
}

export interface ArchitecturalDecisionRecord {
  id: string;
  titulo: string;
  estado: 'APROBADO' | 'PROPUESTO' | 'RECHAZADO';
  fecha: string;
  contexto: string;
  decision: string;
  consecuencias: string[];
  justificacion: string;
}
