import React, { useState } from 'react';
import { useSga } from '../../context/SgaContext';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  PlusCircle,
  AlertCircle,
  Trash2,
  Award
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentPersona,
    grupos,
    asignaturas,
    matriculas,
    calificaciones,
    personas,
    enrollStudent,
    cancelEnrollment,
    openEnrollModal,
    openScheduleModal
  } = useSga();

  const [activeSubTab, setActiveSubTab] = useState<'matricula' | 'mis_materias' | 'calificaciones' | 'horario'>('matricula');
  const [feedback, setFeedback] = useState<{ text: string; error?: boolean } | null>(null);

  // Active student matriculas
  const studentMatriculas = matriculas.filter(
    (m) => m.id_estudiante === currentPersona.id_persona && m.estado === 'MATRICULADO'
  );

  const enrolledGroupIds = new Set(studentMatriculas.map((m) => m.id_grupo));

  const handleEnroll = (grupoId: string) => {
    const res = enrollStudent(currentPersona.id_persona, grupoId);
    setFeedback({ text: res.message, error: !res.success });
  };

  const handleCancel = (matriculaId: string) => {
    const res = cancelEnrollment(matriculaId);
    setFeedback({ text: res.message, error: !res.success });
  };

  return (
    <div className="space-y-6">
      {/* Student Profile Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-emerald-700 font-semibold">Portal Estudiantil CUN</span>
              <span aria-hidden="true">·</span>
              <span>RF-07, RF-09</span>
              <span aria-hidden="true">·</span>
              <span>Periodo Académico 2026-2</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              {currentPersona.nombres} {currentPersona.apellidos}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Código Estudiantil: <strong className="font-mono text-slate-800">{currentPersona.codigo_estudiantil || '51903019'}</strong> · Ingeniería de Sistemas · Semestre 7
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveSubTab('matricula')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeSubTab === 'matricula'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Matrícula en Línea
            </button>
            <button
              onClick={() => setActiveSubTab('mis_materias')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeSubTab === 'mis_materias'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mis Asignaturas ({studentMatriculas.length})
            </button>
            <button
              onClick={() => setActiveSubTab('calificaciones')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeSubTab === 'calificaciones'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Calificaciones
            </button>
            <button
              onClick={() => setActiveSubTab('horario')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeSubTab === 'horario'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mi Horario Semanal
            </button>
          </div>
        </div>

        {feedback && (
          <div
            className={`mt-4 p-3 rounded-lg text-xs flex items-center justify-between ${
              feedback.error
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.error ? (
                <AlertCircle className="w-4 h-4 text-red-600" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
              <span>{feedback.text}</span>
            </div>
            <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-600">
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Subtab 1: Matrícula en Línea (RF-07) */}
      {activeSubTab === 'matricula' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>Oferta de Materias Disponibles para Inscripción (RF-07)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Inscripción con verificación inmediata de cupos mediante transacción ACID con SELECT FOR UPDATE.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {studentMatriculas.length} materias matriculadas en el periodo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {grupos.map((grupo) => {
              const asig = asignaturas.find((a) => a.id_asignatura === grupo.id_asignatura);
              const docente = personas.find((p) => p.id_persona === grupo.id_docente);
              const isAlreadyEnrolled = enrolledGroupIds.has(grupo.id_grupo);
              const isFull = grupo.cupo_ocupado >= grupo.cupo_maximo;
              const cuposDisponibles = Math.max(0, grupo.cupo_maximo - grupo.cupo_ocupado);

              return (
                <div
                  key={grupo.id_grupo}
                  className={`rounded-xl border p-4 transition-all ${
                    isAlreadyEnrolled
                      ? 'border-emerald-300 bg-emerald-50/30'
                      : isFull
                      ? 'border-slate-200 bg-slate-50/70 opacity-80'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-theme-primary-text bg-theme-primary-light px-2 py-0.5 rounded border border-theme-primary-border">
                        {asig?.codigo_materia}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">{asig?.nombre}</h3>
                      <p className="text-xs text-slate-600 font-medium">{grupo.nombre_grupo}</p>
                    </div>

                    <span className="text-[11px] font-mono text-slate-500">
                      {asig?.creditos} Créditos
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 space-y-1 mb-3 pt-2 border-t border-slate-100">
                    <p>
                      Docente:{' '}
                      <strong className="text-slate-700">
                        {docente ? `${docente.nombres} ${docente.apellidos}` : 'Por asignar'}
                      </strong>
                    </p>
                    <div className="text-[11px]">
                      {grupo.horarios.map((h, i) => (
                        <div key={i}>
                          {h.dia} {h.hora_inicio} - {h.hora_fin} ({h.aula})
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Seat availability status */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500">Cupos: </span>
                      <strong
                        className={`font-mono ${
                          cuposDisponibles === 0
                            ? 'text-red-600'
                            : cuposDisponibles === 1
                            ? 'text-amber-600'
                            : 'text-theme-primary'
                        }`}
                      >
                        {cuposDisponibles} disp. ({grupo.cupo_ocupado}/{grupo.cupo_maximo})
                      </strong>
                    </div>

                    {isAlreadyEnrolled ? (
                      <span className="text-xs font-semibold text-theme-primary flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Inscrita</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleEnroll(grupo.id_grupo)}
                        disabled={isFull}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          isFull
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-theme-primary hover:opacity-90 text-white shadow-sm'
                        }`}
                      >
                        {isFull ? 'Agotado' : 'Matricular'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtab 2: Mis Asignaturas & Horarios (RF-09) */}
      {activeSubTab === 'mis_materias' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Asignaturas Matriculadas (Semestre 2026-2)</span>
          </h2>

          {studentMatriculas.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No tienes asignaturas matriculadas actualmente. Ve a la pestaña "Matrícula en Línea".
            </div>
          ) : (
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              {studentMatriculas.map((mat) => {
                const grp = grupos.find((g) => g.id_grupo === mat.id_grupo);
                const asig = grp ? asignaturas.find((a) => a.id_asignatura === grp.id_asignatura) : null;
                const docente = grp ? personas.find((p) => p.id_persona === grp.id_docente) : null;

                return (
                  <div key={mat.id_matricula} className="p-4 hover:bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                          {asig?.codigo_materia}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{asig?.nombre}</h3>
                        <span className="text-xs text-slate-400 font-mono">({asig?.creditos} Créditos)</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 font-medium">{grp?.nombre_grupo}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Docente: <strong>{docente ? `${docente.nombres} ${docente.apellidos}` : 'Por asignar'}</strong>
                      </p>
                      <div className="mt-2 text-xs text-slate-500 flex items-center gap-3">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {grp?.horarios.map((h) => `${h.dia} ${h.hora_inicio}-${h.hora_fin} (${h.aula})`).join(' · ')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleCancel(mat.id_matricula)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancelar Materia</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Subtab 3: Libreta de Calificaciones en Tiempo Real (RF-09) */}
      {activeSubTab === 'calificaciones' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Sábana de Calificaciones & Desempeño Académico (RF-09)</span>
          </h2>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Asignatura</th>
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3 text-center">Corte 1 (30%)</th>
                  <th className="py-2.5 px-3 text-center">Corte 2 (30%)</th>
                  <th className="py-2.5 px-3 text-center">Corte 3 (40%)</th>
                  <th className="py-2.5 px-3 text-center">Definitiva</th>
                  <th className="py-2.5 px-3 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentMatriculas.map((mat) => {
                  const grp = grupos.find((g) => g.id_grupo === mat.id_grupo);
                  const asig = grp ? asignaturas.find((a) => a.id_asignatura === grp.id_asignatura) : null;
                  const cal = calificaciones.find((c) => c.id_matricula === mat.id_matricula);
                  const def = cal?.definitiva;
                  const isPassing = def !== null && def !== undefined && def >= 3.0;

                  return (
                    <tr key={mat.id_matricula} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{asig?.nombre}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">{asig?.codigo_materia}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-medium">
                        {cal?.corte_1 !== null && cal?.corte_1 !== undefined ? cal.corte_1.toFixed(1) : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-medium">
                        {cal?.corte_2 !== null && cal?.corte_2 !== undefined ? cal.corte_2.toFixed(1) : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-medium">
                        {cal?.corte_3 !== null && cal?.corte_3 !== undefined ? cal.corte_3.toFixed(1) : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-sm">
                        {def !== null && def !== undefined ? (
                          <span className={def >= 3.0 ? 'text-emerald-700' : 'text-red-600'}>
                            {def.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-normal text-xs">Pendiente</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {def !== null && def !== undefined ? (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              isPassing ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {isPassing ? 'APROBADO' : 'REPROBADO'}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">EN CURSO</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 4: Mi Horario Semanal Interactivo (RF-05, RF-09) */}
      {activeSubTab === 'horario' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Mi Horario Semanal de Clases (Periodo 2026-2)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Distribución de clases presenciales y virtuales de las {studentMatriculas.length} asignaturas matriculadas
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openEnrollModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Matricular Más Materias</span>
              </button>
            </div>
          </div>

          {studentMatriculas.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-2">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold text-slate-700">No tienes clases programadas en este momento</p>
              <p className="text-[11px] text-slate-400">
                Inscríbete a los grupos disponibles en la pestaña "Matrícula en Línea".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'] as const).map((dia) => {
                const classesOnDay = studentMatriculas.flatMap((mat) => {
                  const grp = grupos.find((g) => g.id_grupo === mat.id_grupo);
                  const asig = grp ? asignaturas.find((a) => a.id_asignatura === grp.id_asignatura) : null;
                  const doc = grp ? personas.find((p) => p.id_persona === grp.id_docente) : null;

                  const matchingSlots = (grp?.horarios || []).filter((h) => h.dia === dia);
                  return matchingSlots.map((slot) => ({
                    grupo: grp,
                    asignatura: asig,
                    docente: doc,
                    slot
                  }));
                });

                return (
                  <div
                    key={dia}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        {dia}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                        {classesOnDay.length} clase{classesOnDay.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {classesOnDay.length === 0 ? (
                      <p className="text-[11px] text-slate-400 italic py-4 text-center">
                        Día libre de clases
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {classesOnDay.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-lg border border-emerald-200/80 bg-emerald-50/40 hover:bg-emerald-50/70 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-1">
                              <span className="text-xs font-bold text-slate-900">
                                {item.asignatura?.nombre}
                              </span>
                              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                                {item.asignatura?.codigo_materia}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-600 mt-0.5">
                              {item.grupo?.nombre_grupo}
                            </p>

                            <div className="mt-2 flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-800">
                              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{item.slot.hora_inicio} - {item.slot.hora_fin}</span>
                            </div>

                            <div className="mt-1 text-[11px] text-slate-500">
                              Aula: {item.slot.aula}
                            </div>

                            {item.docente && (
                              <div className="mt-1 text-[10px] text-slate-400 border-t border-emerald-100 pt-1">
                                Docente: {item.docente.nombres} {item.docente.apellidos}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
