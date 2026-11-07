import React, { createContext, useContext, useState, useEffect } from 'react';
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
  RoleType,
  RegisterUserPayload,
  CreateGrupoPayload,
  HorarioItem
} from '../types/sga';
import {
  INITIAL_PROGRAMAS,
  INITIAL_ASIGNATURAS,
  INITIAL_PERIODOS,
  INITIAL_PERSONAS,
  INITIAL_USUARIOS,
  INITIAL_GRUPOS,
  INITIAL_MATRICULAS,
  INITIAL_CALIFICACIONES,
  INITIAL_AUDITORIA
} from '../data/mockDatabase';

interface SgaContextType {
  // Navigation & Role
  activeTab: 'workbench' | 'simulator' | 'traceability' | 'architecture' | 'report';
  setActiveTab: (tab: 'workbench' | 'simulator' | 'traceability' | 'architecture' | 'report') => void;
  currentUser: User;
  currentPersona: Persona;
  setCurrentUserId: (id: string) => void;
  quickSwitchRole: (role: RoleType) => void;

  // Data
  programas: Programa[];
  asignaturas: Asignatura[];
  periodos: PeriodoAcademico[];
  personas: Persona[];
  usuarios: User[];
  grupos: Grupo[];
  matriculas: Matricula[];
  calificaciones: Calificacion[];
  auditoria: AuditoriaLog[];

  // Modals & UI States
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;

  isScheduleModalOpen: boolean;
  setIsScheduleModalOpen: (open: boolean) => void;
  openScheduleModal: () => void;

  isEnrollModalOpen: boolean;
  setIsEnrollModalOpen: (open: boolean) => void;
  openEnrollModal: () => void;

  // Operations
  login: (
    usernameOrEmail: string,
    password: string
  ) => { success: boolean; message: string; user?: User };

  logout: () => void;

  registerUser: (
    payload: RegisterUserPayload
  ) => { success: boolean; message: string; user?: User };

  createGrupoConHorario: (
    payload: CreateGrupoPayload
  ) => { success: boolean; message: string; grupo?: Grupo };

  updateHorariosGrupo: (
    grupoId: string,
    horarios: HorarioItem[]
  ) => { success: boolean; message: string };

  enrollStudent: (
    estudianteId: string,
    grupoId: string
  ) => { success: boolean; message: string; matricula?: Matricula };
  
  cancelEnrollment: (
    matriculaId: string
  ) => { success: boolean; message: string };

  updateGrade: (
    calificacionId: string,
    corte: 'corte_1' | 'corte_2' | 'corte_3',
    valor: number | null
  ) => { success: boolean; message: string };

  toggleCierreEvaluativo: (
    calificacionId: string
  ) => { success: boolean; message: string };

  updateGrupoCupo: (
    grupoId: string,
    nuevoCupoMaximo: number
  ) => { success: boolean; message: string };

  addAuditoriaLog: (
    accion: string,
    tabla: string,
    registroId: string,
    detalles: string
  ) => void;

  resetDatabase: () => void;
}

const SgaContext = createContext<SgaContextType | undefined>(undefined);

export const SgaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'workbench' | 'simulator' | 'traceability' | 'architecture' | 'report'>('workbench');
  
  // Data states
  const [programas, setProgramas] = useState<Programa[]>(INITIAL_PROGRAMAS);
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>(INITIAL_ASIGNATURAS);
  const [periodos, setPeriodos] = useState<PeriodoAcademico[]>(INITIAL_PERIODOS);
  const [personas, setPersonas] = useState<Persona[]>(INITIAL_PERSONAS);
  const [usuarios, setUsuarios] = useState<User[]>(INITIAL_USUARIOS);
  const [grupos, setGrupos] = useState<Grupo[]>(INITIAL_GRUPOS);
  const [matriculas, setMatriculas] = useState<Matricula[]>(INITIAL_MATRICULAS);
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>(INITIAL_CALIFICACIONES);
  const [auditoria, setAuditoria] = useState<AuditoriaLog[]>(INITIAL_AUDITORIA);

  // Modals & UI States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState<boolean>(false);

  const openLoginModal = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  const openScheduleModal = () => {
    setIsScheduleModalOpen(true);
  };

  const openEnrollModal = () => {
    setIsEnrollModalOpen(true);
  };

  // Active user (default: Admin Milton Mancilla)
  const [currentUserId, setCurrentUserIdState] = useState<string>('USR-01');

  const currentUser = usuarios.find((u) => u.id_usuario === currentUserId) || usuarios[0];
  const currentPersona =
    personas.find((p) => p.id_persona === currentUser.id_persona) || personas[0];

  const setCurrentUserId = (id: string) => {
    const user = usuarios.find((u) => u.id_usuario === id);
    if (user) {
      setCurrentUserIdState(id);
      addAuditoriaLog(
        'SESSION_SWITCH',
        'seguridad.usuario',
        user.id_usuario,
        `Cambio de contexto de usuario a: ${user.username} (${user.id_rol})`
      );
    }
  };

  const quickSwitchRole = (role: RoleType) => {
    const targetUser = usuarios.find((u) => u.id_rol === role);
    if (targetUser) {
      setCurrentUserId(targetUser.id_usuario);
    }
  };

  const addAuditoriaLog = (
    accion: string,
    tabla: string,
    registroId: string,
    detalles: string
  ) => {
    const now = new Date();
    const formatted = now.toISOString().replace('T', ' ').substring(0, 19);
    const newLog: AuditoriaLog = {
      id_log: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      id_usuario: currentUser ? currentUser.id_usuario : 'ANONYMOUS',
      nombre_usuario: currentUser ? currentUser.username : 'Invitado',
      rol: currentUser ? currentUser.id_rol : 'ESTUDIANTE',
      accion_realizada: accion,
      tabla_afectada: tabla,
      id_registro_afectado: registroId,
      ip_origen: '190.85.122.' + Math.floor(10 + Math.random() * 80),
      timestamp: formatted,
      detalles,
      checksum: 'sha256:' + Math.random().toString(36).substring(2, 10) + '...'
    };
    setAuditoria((prev) => [newLog, ...prev]);
  };

  // RF-01: Autenticación con Usuario y Contraseña
  const login = (usernameOrEmail: string, password: string) => {
    const cleanInput = usernameOrEmail.trim().toLowerCase();
    const user = usuarios.find(
      (u) =>
        u.username.toLowerCase() === cleanInput ||
        u.email.toLowerCase() === cleanInput
    );

    if (!user) {
      addAuditoriaLog(
        'AUTH_LOGIN_FAILED',
        'seguridad.usuario',
        cleanInput,
        `Intento de acceso fallido: Usuario o correo '${cleanInput}' inexistente.`
      );
      return { success: false, message: 'Usuario o correo electrónico no encontrado.' };
    }

    if (user.estado !== 'ACTIVO') {
      addAuditoriaLog(
        'AUTH_LOGIN_BLOCKED',
        'seguridad.usuario',
        user.id_usuario,
        `Intento de acceso rechazado: Usuario ${user.username} se encuentra inactivo.`
      );
      return { success: false, message: 'Su cuenta está inactiva. Comuníquese con la mesa de ayuda CUN.' };
    }

    if (user.password && user.password !== password) {
      addAuditoriaLog(
        'AUTH_LOGIN_FAILED_CREDENTIALS',
        'seguridad.usuario',
        user.id_usuario,
        `Fallo de autenticación: Contraseña inválida para ${user.username}`
      );
      return { success: false, message: 'Contraseña incorrecta. Por favor intente de nuevo.' };
    }

    // Login successful
    setCurrentUserIdState(user.id_usuario);
    setIsAuthModalOpen(false);

    addAuditoriaLog(
      'AUTH_LOGIN_SUCCESS',
      'seguridad.usuario',
      user.id_usuario,
      `Sesión iniciada correctamente por credenciales para ${user.username} (Rol: ${user.id_rol})`
    );

    return {
      success: true,
      message: `¡Bienvenido(a) al SGA CUN, ${user.username}!`,
      user
    };
  };

  const logout = () => {
    addAuditoriaLog(
      'AUTH_LOGOUT',
      'seguridad.usuario',
      currentUser.id_usuario,
      `Cierre de sesión formal del usuario ${currentUser.username}`
    );
    // Switch to first student or open login
    openLoginModal();
  };

  // RF-02: Registro de Nuevos Usuarios
  const registerUser = (payload: RegisterUserPayload) => {
    const cleanEmail = payload.email.trim().toLowerCase();
    const cleanUsername = payload.username.trim().toLowerCase();
    const cleanDoc = payload.documento.trim();

    if (!payload.nombres.trim() || !payload.apellidos.trim()) {
      return { success: false, message: 'Debe ingresar nombres y apellidos completos.' };
    }
    if (!cleanDoc) {
      return { success: false, message: 'El número de documento es obligatorio.' };
    }
    if (!cleanEmail.includes('@')) {
      return { success: false, message: 'Ingrese una dirección de correo válida.' };
    }
    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, message: 'El nombre de usuario debe contener al menos 3 caracteres.' };
    }
    if (!payload.password || payload.password.length < 5) {
      return { success: false, message: 'La contraseña debe contener al menos 5 caracteres.' };
    }

    if (usuarios.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'El correo electrónico ya se encuentra registrado.' };
    }
    if (usuarios.some((u) => u.username.toLowerCase() === cleanUsername)) {
      return { success: false, message: 'El nombre de usuario ya existe. Elija otro nombre de usuario.' };
    }
    if (personas.some((p) => p.documento === cleanDoc)) {
      return { success: false, message: 'El número de documento ya está asociado a otra cuenta.' };
    }

    const newPersonaId = `PER-${Math.floor(100 + Math.random() * 900)}`;
    const newUserId = `USR-${Math.floor(100 + Math.random() * 900)}`;

    const newPersona: Persona = {
      id_persona: newPersonaId,
      documento: cleanDoc,
      nombres: payload.nombres.trim(),
      apellidos: payload.apellidos.trim(),
      telefono: payload.telefono.trim() || '+57 300 000 0000',
      tipo_persona: payload.id_rol === 'ADMINISTRADOR' ? 'ADMIN' : payload.id_rol,
      email: cleanEmail,
      codigo_estudiantil:
        payload.id_rol === 'ESTUDIANTE'
          ? payload.codigo_estudiantil || `5190${Math.floor(1000 + Math.random() * 9000)}`
          : undefined,
      especialidad: payload.id_rol !== 'ESTUDIANTE' ? payload.especialidad : undefined
    };

    const newUser: User = {
      id_usuario: newUserId,
      username: cleanUsername,
      email: cleanEmail,
      password: payload.password,
      passwordHash: `argon2id$v=19$m=65536,t=3,p=4$c2FsdDEyOA$${Math.random().toString(36).substring(2, 10)}`,
      id_rol: payload.id_rol,
      estado: 'ACTIVO',
      id_persona: newPersonaId
    };

    setPersonas((prev) => [...prev, newPersona]);
    setUsuarios((prev) => [...prev, newUser]);
    setCurrentUserIdState(newUserId);
    setIsAuthModalOpen(false);

    addAuditoriaLog(
      'USER_REGISTRATION',
      'seguridad.usuario',
      newUserId,
      `Nuevo usuario registrado en la plataforma: ${newUser.username} (${newUser.id_rol}). Documento: ${newPersona.documento}`
    );

    return {
      success: true,
      message: `¡Usuario ${newUser.username} registrado exitosamente! Ha iniciado sesión con rol ${newUser.id_rol}.`,
      user: newUser
    };
  };

  // RF-05 & RF-06: Creación de Grupos y Parametrización de Horarios
  const createGrupoConHorario = (payload: CreateGrupoPayload) => {
    if (!payload.nombre_grupo.trim()) {
      return { success: false, message: 'El nombre del grupo es obligatorio.' };
    }
    if (payload.cupo_maximo <= 0) {
      return { success: false, message: 'El cupo máximo debe ser mayor a 0.' };
    }
    if (!payload.horarios || payload.horarios.length === 0) {
      return { success: false, message: 'Debe especificar al menos un bloque de horario para el grupo.' };
    }

    const parseMinutes = (timeStr: string) => {
      const parts = timeStr.split(':').map(Number);
      return (parts[0] || 0) * 60 + (parts[1] || 0);
    };

    // Validar cruce de horario para el docente asignado
    for (const newSlot of payload.horarios) {
      const startMin = parseMinutes(newSlot.hora_inicio);
      const endMin = parseMinutes(newSlot.hora_fin);

      if (startMin >= endMin) {
        return {
          success: false,
          message: `La hora de fin (${newSlot.hora_fin}) debe ser posterior a la de inicio (${newSlot.hora_inicio}) el día ${newSlot.dia}.`
        };
      }

      for (const existingGrp of grupos) {
        if (existingGrp.id_docente === payload.id_docente) {
          for (const exSlot of existingGrp.horarios) {
            if (exSlot.dia === newSlot.dia) {
              const exStart = parseMinutes(exSlot.hora_inicio);
              const exEnd = parseMinutes(exSlot.hora_fin);
              if (startMin < exEnd && endMin > exStart) {
                const doc = personas.find((p) => p.id_persona === payload.id_docente);
                return {
                  success: false,
                  message: `Conflicto docente: ${doc ? `${doc.nombres} ${doc.apellidos}` : 'El docente'} ya tiene clase programada en el grupo "${existingGrp.nombre_grupo}" el día ${newSlot.dia} de ${exSlot.hora_inicio} a ${exSlot.hora_fin}.`
                };
              }
            }
          }
        }
      }
    }

    const newGrupoId = `GRP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newGrupo: Grupo = {
      id_grupo: newGrupoId,
      id_asignatura: payload.id_asignatura,
      id_periodo: payload.id_periodo,
      id_docente: payload.id_docente,
      nombre_grupo: payload.nombre_grupo.trim(),
      cupo_maximo: payload.cupo_maximo,
      cupo_ocupado: 0,
      horarios: payload.horarios,
      estado: 'ABIERTO'
    };

    setGrupos((prev) => [...prev, newGrupo]);
    setIsScheduleModalOpen(false);

    addAuditoriaLog(
      'CREAR_GRUPO_HORARIOS',
      'academico.grupo',
      newGrupoId,
      `Grupo "${newGrupo.nombre_grupo}" creado con cupo ${newGrupo.cupo_maximo} y horarios: ${payload.horarios.map((h) => `${h.dia} ${h.hora_inicio}-${h.hora_fin} (${h.aula})`).join(', ')}`
    );

    return {
      success: true,
      message: `Grupo "${newGrupo.nombre_grupo}" registrado con sus horarios satisfactoriamente.`,
      grupo: newGrupo
    };
  };

  const updateHorariosGrupo = (grupoId: string, horarios: HorarioItem[]) => {
    const grp = grupos.find((g) => g.id_grupo === grupoId);
    if (!grp) return { success: false, message: 'Grupo no encontrado.' };

    setGrupos((prev) =>
      prev.map((g) => (g.id_grupo === grupoId ? { ...g, horarios } : g))
    );

    addAuditoriaLog(
      'ACTUALIZAR_HORARIOS_GRUPO',
      'academico.grupo',
      grupoId,
      `Horarios del grupo "${grp.nombre_grupo}" actualizados (${horarios.length} franjas horarias).`
    );

    return { success: true, message: 'Horarios actualizados exitosamente.' };
  };

  // RF-07: Matrícula académica atómica con validación estricta de cupos y cruces de horario
  const enrollStudent = (estudianteId: string, grupoId: string) => {
    const targetGrupo = grupos.find((g) => g.id_grupo === grupoId);
    if (!targetGrupo) {
      return { success: false, message: 'Grupo no encontrado en el catálogo académico.' };
    }

    // Check duplicate
    const alreadyEnrolled = matriculas.some(
      (m) =>
        m.id_estudiante === estudianteId &&
        m.id_grupo === grupoId &&
        m.estado === 'MATRICULADO'
    );
    if (alreadyEnrolled) {
      return {
        success: false,
        message: 'El estudiante ya cuenta con matrícula activa en este grupo.'
      };
    }

    // Check if already enrolled in the SAME course under a different group
    const alreadyEnrolledInSameSubject = matriculas.some((m) => {
      if (m.id_estudiante !== estudianteId || m.estado !== 'MATRICULADO') return false;
      const otherGrp = grupos.find((g) => g.id_grupo === m.id_grupo);
      return otherGrp && otherGrp.id_asignatura === targetGrupo.id_asignatura;
    });
    if (alreadyEnrolledInSameSubject) {
      return {
        success: false,
        message: 'El estudiante ya está matriculado en esta misma asignatura en otro grupo.'
      };
    }

    // Check seats (SELECT cupo_ocupado, cupo_maximo FROM grupo FOR UPDATE)
    if (targetGrupo.cupo_ocupado >= targetGrupo.cupo_maximo) {
      addAuditoriaLog(
        'ENROLLMENT_REJECTED_FULL',
        'academico.grupo',
        grupoId,
        `Intento de matrícula fallido por cupo agotado (${targetGrupo.cupo_ocupado}/${targetGrupo.cupo_maximo})`
      );
      return {
        success: false,
        message: `Cupo agotado (${targetGrupo.cupo_ocupado}/${targetGrupo.cupo_maximo}). La transacción fue abortada para garantizar consistencia.`
      };
    }

    // Validation: Schedule conflict check with other enrolled subjects of the student
    const parseMinutes = (t: string) => {
      const parts = t.split(':').map(Number);
      return (parts[0] || 0) * 60 + (parts[1] || 0);
    };

    const activeStudentMats = matriculas.filter(
      (m) => m.id_estudiante === estudianteId && m.estado === 'MATRICULADO'
    );

    for (const mat of activeStudentMats) {
      const activeGrp = grupos.find((g) => g.id_grupo === mat.id_grupo);
      if (!activeGrp) continue;

      for (const enrolledSlot of activeGrp.horarios) {
        const eStart = parseMinutes(enrolledSlot.hora_inicio);
        const eEnd = parseMinutes(enrolledSlot.hora_fin);

        for (const targetSlot of targetGrupo.horarios) {
          if (targetSlot.dia === enrolledSlot.dia) {
            const tStart = parseMinutes(targetSlot.hora_inicio);
            const tEnd = parseMinutes(targetSlot.hora_fin);

            if (tStart < eEnd && tEnd > eStart) {
              const asigTarget = asignaturas.find((a) => a.id_asignatura === targetGrupo.id_asignatura);
              const asigEnrolled = asignaturas.find((a) => a.id_asignatura === activeGrp.id_asignatura);

              addAuditoriaLog(
                'ENROLLMENT_REJECTED_SCHEDULE_CONFLICT',
                'academico.grupo',
                grupoId,
                `Intento de matrícula fallido por cruce horario entre "${asigTarget?.nombre}" y "${asigEnrolled?.nombre}" el día ${targetSlot.dia} (${targetSlot.hora_inicio}-${targetSlot.hora_fin})`
              );

              return {
                success: false,
                message: `Cruce de horario: La clase del grupo (${targetSlot.dia} ${targetSlot.hora_inicio} a ${targetSlot.hora_fin}) coincide con su asignatura ya inscrita "${asigEnrolled?.nombre || activeGrp.nombre_grupo}".`
              };
            }
          }
        }
      }
    }

    // Process enrollment
    const newMatriculaId = `MAT-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    const newMatricula: Matricula = {
      id_matricula: newMatriculaId,
      id_estudiante: estudianteId,
      id_grupo: grupoId,
      fecha_matricula: now,
      estado: 'MATRICULADO'
    };

    // Update group seats
    setGrupos((prev) =>
      prev.map((g) => {
        if (g.id_grupo === grupoId) {
          const newOccupancy = g.cupo_ocupado + 1;
          return {
            ...g,
            cupo_ocupado: newOccupancy,
            estado: newOccupancy >= g.cupo_maximo ? 'LLENO' : 'ABIERTO'
          };
        }
        return g;
      })
    );

    // Add enrollment
    setMatriculas((prev) => [...prev, newMatricula]);

    // Create empty grade record
    const newGradeId = `CAL-${Math.floor(100 + Math.random() * 900)}`;
    const newCalificacion: Calificacion = {
      id_calificacion: newGradeId,
      id_matricula: newMatriculaId,
      corte_1: null,
      corte_2: null,
      corte_3: null,
      definitiva: null,
      fecha_actualizacion: now,
      cierre_evaluativo: false
    };
    setCalificaciones((prev) => [...prev, newCalificacion]);

    // Audit log
    addAuditoriaLog(
      'ENROLL_STUDENT_SUCCESS',
      'matriculas.matricula',
      newMatriculaId,
      `Matrícula confirmada en grupo ${targetGrupo.nombre_grupo}. Cupos restantes: ${targetGrupo.cupo_maximo - (targetGrupo.cupo_ocupado + 1)}`
    );

    return {
      success: true,
      message: `¡Matrícula exitosa! Asignatura inscrita correctamente en el grupo ${targetGrupo.nombre_grupo}.`,
      matricula: newMatricula
    };
  };

  const cancelEnrollment = (matriculaId: string) => {
    const mat = matriculas.find((m) => m.id_matricula === matriculaId);
    if (!mat) return { success: false, message: 'Matrícula no encontrada.' };

    setMatriculas((prev) =>
      prev.map((m) => (m.id_matricula === matriculaId ? { ...m, estado: 'CANCELADO' } : m))
    );

    // Release seat
    setGrupos((prev) =>
      prev.map((g) => {
        if (g.id_grupo === mat.id_grupo) {
          const newOccupancy = Math.max(0, g.cupo_ocupado - 1);
          return {
            ...g,
            cupo_ocupado: newOccupancy,
            estado: newOccupancy < g.cupo_maximo ? 'ABIERTO' : g.estado
          };
        }
        return g;
      })
    );

    addAuditoriaLog(
      'CANCEL_ENROLLMENT',
      'matriculas.matricula',
      matriculaId,
      `Cancelación de matrícula ${matriculaId}. Cupo liberado en grupo ${mat.id_grupo}.`
    );

    return { success: true, message: 'Matrícula cancelada y cupo liberado exitosamente.' };
  };

  // RF-08: Calificaciones y cálculo de definitiva (30% + 30% + 40%)
  const updateGrade = (
    calificacionId: string,
    corte: 'corte_1' | 'corte_2' | 'corte_3',
    valor: number | null
  ) => {
    const target = calificaciones.find((c) => c.id_calificacion === calificacionId);
    if (!target) return { success: false, message: 'Registro de calificación no encontrado.' };
    if (target.cierre_evaluativo) {
      return {
        success: false,
        message: 'No se pueden modificar notas. El grupo se encuentra en estado de Cierre Evaluativo Definitivo.'
      };
    }

    if (valor !== null && (valor < 0.0 || valor > 5.0)) {
      return { success: false, message: 'La nota debe estar entre 0.0 y 5.0 según reglamento CUN.' };
    }

    const updatedCortes = {
      corte_1: corte === 'corte_1' ? valor : target.corte_1,
      corte_2: corte === 'corte_2' ? valor : target.corte_2,
      corte_3: corte === 'corte_3' ? valor : target.corte_3
    };

    let definitiva: number | null = null;
    if (
      updatedCortes.corte_1 !== null &&
      updatedCortes.corte_2 !== null &&
      updatedCortes.corte_3 !== null
    ) {
      const calc =
        updatedCortes.corte_1 * 0.3 +
        updatedCortes.corte_2 * 0.3 +
        updatedCortes.corte_3 * 0.4;
      definitiva = Math.round(calc * 100) / 100;
    }

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    setCalificaciones((prev) =>
      prev.map((c) =>
        c.id_calificacion === calificacionId
          ? {
              ...c,
              [corte]: valor,
              definitiva,
              fecha_actualizacion: now
            }
          : c
      )
    );

    addAuditoriaLog(
      'UPDATE_CALIFICACION',
      'calificaciones.calificacion',
      calificacionId,
      `Modificación de nota en ${corte.toUpperCase()}: ${valor ?? 'N/A'}. Definitiva calculada: ${definitiva ?? 'Pendiente'}`
    );

    return { success: true, message: 'Calificación actualizada y calculada con éxito.' };
  };

  const toggleCierreEvaluativo = (calificacionId: string) => {
    const target = calificaciones.find((c) => c.id_calificacion === calificacionId);
    if (!target) return { success: false, message: 'Registro no encontrado.' };

    const newState = !target.cierre_evaluativo;
    setCalificaciones((prev) =>
      prev.map((c) =>
        c.id_calificacion === calificacionId ? { ...c, cierre_evaluativo: newState } : c
      )
    );

    addAuditoriaLog(
      newState ? 'CIERRE_EVALUATIVO_ACTIVADO' : 'CIERRE_EVALUATIVO_REABIERTO',
      'calificaciones.calificacion',
      calificacionId,
      `Estado de cierre evaluativo cambiado a: ${newState ? 'CERRADO (Solo Lectura)' : 'ABIERTO'}`
    );

    return {
      success: true,
      message: `Cierre evaluativo ${newState ? 'aplicado (notas blindadas)' : 'reabierto'}.`
    };
  };

  const updateGrupoCupo = (grupoId: string, nuevoCupoMaximo: number) => {
    const target = grupos.find((g) => g.id_grupo === grupoId);
    if (!target) return { success: false, message: 'Grupo no encontrado.' };
    if (nuevoCupoMaximo < target.cupo_ocupado) {
      return {
        success: false,
        message: `El nuevo cupo máximo (${nuevoCupoMaximo}) no puede ser menor a los estudiantes ya matriculados (${target.cupo_ocupado}).`
      };
    }

    setGrupos((prev) =>
      prev.map((g) =>
        g.id_grupo === grupoId
          ? {
              ...g,
              cupo_maximo: nuevoCupoMaximo,
              estado: target.cupo_ocupado >= nuevoCupoMaximo ? 'LLENO' : 'ABIERTO'
            }
          : g
      )
    );

    addAuditoriaLog(
      'PARAMETRIZAR_CUPO_GRUPO',
      'academico.grupo',
      grupoId,
      `Cupo máximo ajustado de ${target.cupo_maximo} a ${nuevoCupoMaximo}`
    );

    return { success: true, message: 'Cupo máximo actualizado correctamente.' };
  };

  const resetDatabase = () => {
    setProgramas(INITIAL_PROGRAMAS);
    setAsignaturas(INITIAL_ASIGNATURAS);
    setPeriodos(INITIAL_PERIODOS);
    setPersonas(INITIAL_PERSONAS);
    setUsuarios(INITIAL_USUARIOS);
    setGrupos(INITIAL_GRUPOS);
    setMatriculas(INITIAL_MATRICULAS);
    setCalificaciones(INITIAL_CALIFICACIONES);
    setAuditoria(INITIAL_AUDITORIA);
    addAuditoriaLog(
      'SYSTEM_RESET',
      'sistema.database',
      'ALL',
      'Restablecimiento general de datos a estado semilla inicial'
    );
  };

  return (
    <SgaContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentUser,
        currentPersona,
        setCurrentUserId,
        quickSwitchRole,
        programas,
        asignaturas,
        periodos,
        personas,
        usuarios,
        grupos,
        matriculas,
        calificaciones,
        auditoria,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openLoginModal,
        openRegisterModal,
        isScheduleModalOpen,
        setIsScheduleModalOpen,
        openScheduleModal,
        isEnrollModalOpen,
        setIsEnrollModalOpen,
        openEnrollModal,
        login,
        logout,
        registerUser,
        createGrupoConHorario,
        updateHorariosGrupo,
        enrollStudent,
        cancelEnrollment,
        updateGrade,
        toggleCierreEvaluativo,
        updateGrupoCupo,
        addAuditoriaLog,
        resetDatabase
      }}
    >
      {children}
    </SgaContext.Provider>
  );
};

export const useSga = () => {
  const context = useContext(SgaContext);
  if (!context) {
    throw new Error('useSga debe ser utilizado dentro de un SgaProvider');
  }
  return context;
};
