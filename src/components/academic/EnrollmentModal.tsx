import React, { useState } from 'react';
import { useSga } from '../../context/SgaContext';
import { useTheme } from '../../context/ThemeContext';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  PlusCircle,
  AlertCircle,
  CheckCircle2,
  Trash2,
  User as UserIcon,
  Search,
  Layers,
  X,
  AlertTriangle,
  Sparkles,
  Ticket
} from 'lucide-react';

export const EnrollmentModal: React.FC = () => {
  const {
    isEnrollModalOpen,
    setIsEnrollModalOpen,
    currentUser,
    currentPersona,
    personas,
    asignaturas,
    grupos,
    matriculas,
    enrollStudent,
    cancelEnrollment
  } = useSga();

  const { currentTheme } = useTheme();

  // If Admin or Coordinator, they can pick which student to enroll
  const isPrivileged = currentUser.id_rol === 'ADMINISTRADOR' || currentUser.id_rol === 'COORDINADOR';
  const students = personas.filter((p) => p.tipo_persona === 'ESTUDIANTE');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    isPrivileged ? students[0]?.id_persona || currentPersona.id_persona : currentPersona.id_persona
  );

  const activeStudent = personas.find((p) => p.id_persona === selectedStudentId) || currentPersona;

  // Active student matriculas
  const studentMatriculas = matriculas.filter(
    (m) => m.id_estudiante === activeStudent.id_persona && m.estado === 'MATRICULADO'
  );
  const enrolledGroupIds = new Set(studentMatriculas.map((m) => m.id_grupo));

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isEnrollModalOpen) return null;

  const handleEnroll = (grupoId: string) => {
    setFeedback(null);
    const res = enrollStudent(activeStudent.id_persona, grupoId);
    setFeedback({ text: res.message, error: !res.success });
  };

  const handleCancel = (matriculaId: string) => {
    setFeedback(null);
    const res = cancelEnrollment(matriculaId);
    setFeedback({ text: res.message, error: !res.success });
  };

  // Check schedule collision locally for quick badge preview
  const parseMin = (t: string) => {
    const parts = t.split(':').map(Number);
    return (parts[0] || 0) * 60 + (parts[1] || 0);
  };

  const getConflictWarning = (targetGrupoId: string) => {
    const target = grupos.find((g) => g.id_grupo === targetGrupoId);
    if (!target) return null;

    for (const mat of studentMatriculas) {
      const activeGrp = grupos.find((g) => g.id_grupo === mat.id_grupo);
      if (!activeGrp) continue;

      for (const enrolledSlot of activeGrp.horarios) {
        const eStart = parseMin(enrolledSlot.hora_inicio);
        const eEnd = parseMin(enrolledSlot.hora_fin);

        for (const targetSlot of target.horarios) {
          if (targetSlot.dia === enrolledSlot.dia) {
            const tStart = parseMin(targetSlot.hora_inicio);
            const tEnd = parseMin(targetSlot.hora_fin);

            if (tStart < eEnd && tEnd > eStart) {
              const enrolledAsig = asignaturas.find((a) => a.id_asignatura === activeGrp.id_asignatura);
              return `Cruce de horario el ${targetSlot.dia} con ${enrolledAsig?.nombre || activeGrp.nombre_grupo}`;
            }
          }
        }
      }
    }
    return null;
  };

  const filteredGrupos = grupos.filter((g) => {
    const asig = asignaturas.find((a) => a.id_asignatura === g.id_asignatura);
    const doc = personas.find((p) => p.id_persona === g.id_docente);
    const term = searchTerm.toLowerCase();

    return (
      g.nombre_grupo.toLowerCase().includes(term) ||
      (asig && asig.nombre.toLowerCase().includes(term)) ||
      (asig && asig.codigo_materia.toLowerCase().includes(term)) ||
      (doc && `${doc.nombres} ${doc.apellidos}`.toLowerCase().includes(term))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden transition-colors duration-200 flex flex-col max-h-[92vh]"
        style={{
          backgroundColor: currentTheme.cardBg,
          borderColor: currentTheme.cardBorder,
          color: currentTheme.textMain
        }}
      >
        {/* Header */}
        <div
          className="p-5 border-b flex items-center justify-between"
          style={{
            backgroundColor: currentTheme.headerBg,
            borderColor: currentTheme.headerBorder,
            color: '#ffffff'
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ring-1 ring-white/20"
              style={{ backgroundColor: currentTheme.primary }}
            >
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Módulo de Matrícula Académica en Línea</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/20 text-white font-semibold">
                  RF-07 ACID
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Inscripción de asignaturas con bloqueo de cupos en tiempo real y prevención de solapamientos
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEnrollModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback message banner */}
        {feedback && (
          <div
            className={`px-5 py-3 text-xs flex items-center gap-2 border-b ${
              feedback.error
                ? 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:border-rose-900/60 dark:text-rose-300'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-900/60 dark:text-emerald-300'
            }`}
          >
            {feedback.error ? (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            )}
            <span className="font-medium">{feedback.text}</span>
          </div>
        )}

        {/* Student Selector / Active student summary */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Estudiante que realiza la matrícula:
            </span>
            {isPrivileged ? (
              <select
                value={selectedStudentId}
                onChange={(e) => {
                  setSelectedStudentId(e.target.value);
                  setFeedback(null);
                }}
                className="px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {students.map((st) => (
                  <option key={st.id_persona} value={st.id_persona}>
                    {st.nombres} {st.apellidos} (Cod: {st.codigo_estudiantil || st.documento})
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {activeStudent.nombres} {activeStudent.apellidos} (Cód: {activeStudent.codigo_estudiantil || '51903019'})
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500">
              Asignaturas Inscritas: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{studentMatriculas.length}</strong>
            </span>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar asignatura o docente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-52"
              />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Active enrollments card list */}
          {studentMatriculas.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Materias Matriculadas Actualmente ({studentMatriculas.length})</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Periodo 2026-2</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {studentMatriculas.map((mat) => {
                  const grp = grupos.find((g) => g.id_grupo === mat.id_grupo);
                  const asig = grp ? asignaturas.find((a) => a.id_asignatura === grp.id_asignatura) : null;
                  const doc = grp ? personas.find((p) => p.id_persona === grp.id_docente) : null;

                  return (
                    <div
                      key={mat.id_matricula}
                      className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 flex flex-col justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                            {asig?.codigo_materia} · {asig?.nombre}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 font-semibold">
                            {mat.id_matricula}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                          {grp?.nombre_grupo}
                        </p>

                        <div className="mt-2 space-y-1">
                          {grp?.horarios.map((h, i) => (
                            <div
                              key={i}
                              className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1"
                            >
                              <Clock className="w-3 h-3 shrink-0" />
                              <span>{h.dia} {h.hora_inicio} - {h.hora_fin}</span>
                              <span className="text-slate-400 font-sans">({h.aula})</span>
                            </div>
                          ))}
                        </div>

                        {doc && (
                          <p className="text-[10px] text-slate-500 mt-1">
                            Docente: {doc.nombres} {doc.apellidos}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-mono text-[10px]">
                          Fecha: {mat.fecha_matricula}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleCancel(mat.id_matricula)}
                          className="flex items-center gap-1 text-rose-600 hover:text-rose-800 dark:text-rose-400 font-semibold text-xs hover:underline"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Cancelar Matrícula (Liberar Cupo)</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Available Offerings */}
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Oferta de Asignaturas y Grupos Disponibles</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Seleccione el grupo deseado. El sistema valida automáticamente prerrequisitos, cruce de horario y cupos atómicos.
              </p>
            </div>

            <div className="space-y-3">
              {filteredGrupos.map((grp) => {
                const asig = asignaturas.find((a) => a.id_asignatura === grp.id_asignatura);
                const doc = personas.find((p) => p.id_persona === grp.id_docente);
                const isEnrolled = enrolledGroupIds.has(grp.id_grupo);
                const conflict = getConflictWarning(grp.id_grupo);
                const isFull = grp.cupo_ocupado >= grp.cupo_maximo;
                const percent = Math.min(100, Math.round((grp.cupo_ocupado / grp.cupo_maximo) * 100));

                return (
                  <div
                    key={grp.id_grupo}
                    className={`p-4 rounded-xl border transition-all ${
                      isEnrolled
                        ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/20'
                        : conflict
                        ? 'border-amber-300 dark:border-amber-900/50 bg-amber-50/20'
                        : isFull
                        ? 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 opacity-70'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/50'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Left: Course & Schedule Details */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                            {asig?.codigo_materia || 'SGA-MAT'}
                          </span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {asig?.nombre}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            · {asig?.creditos} Créditos · Semestre {asig?.semestre}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                          {grp.nombre_grupo}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          {grp.horarios.map((h, i) => (
                            <div
                              key={i}
                              className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5 bg-slate-100/70 dark:bg-slate-800/80 px-2.5 py-1 rounded-md"
                            >
                              <Clock className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{h.dia} {h.hora_inicio} - {h.hora_fin}</span>
                              <span className="text-slate-400 font-sans">({h.aula})</span>
                            </div>
                          ))}
                        </div>

                        {doc && (
                          <p className="text-[11px] text-slate-500 flex items-center gap-1">
                            <UserIcon className="w-3 h-3 text-slate-400" />
                            <span>Docente: {doc.nombres} {doc.apellidos}</span>
                          </p>
                        )}

                        {/* Conflict warning banner */}
                        {conflict && !isEnrolled && (
                          <div className="mt-2 p-2 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-[11px] flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                            <span>{conflict}</span>
                          </div>
                        )}
                      </div>

                      {/* Right: Seats & Action */}
                      <div className="flex flex-col sm:items-end justify-between gap-3 shrink-0 sm:w-56">
                        {/* Cupo status */}
                        <div className="w-full text-right">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-slate-500 font-medium">Ocupación de Cupos:</span>
                            <span className="font-mono font-bold text-slate-900 dark:text-white">
                              {grp.cupo_ocupado} / {grp.cupo_maximo}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                percent >= 100
                                  ? 'bg-rose-500'
                                  : percent >= 80
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                              }`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                            <span>{grp.cupo_maximo - grp.cupo_ocupado} cupo(s) disponible(s)</span>
                            <span className={percent >= 100 ? 'text-rose-600 font-semibold' : 'text-emerald-600'}>
                              {percent >= 100 ? 'AGOTADO' : 'DISPONIBLE'}
                            </span>
                          </div>
                        </div>

                        {/* Button */}
                        <div>
                          {isEnrolled ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Ya Inscrito</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              disabled={isFull || !!conflict}
                              onClick={() => handleEnroll(grp.id_grupo)}
                              style={!isFull && !conflict ? { backgroundColor: currentTheme.primary } : {}}
                              className={`w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                                isFull || conflict
                                  ? 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
                                  : 'text-white hover:opacity-90'
                              }`}
                            >
                              <PlusCircle className="w-3.5 h-3.5" />
                              <span>Matricular Asignatura</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
