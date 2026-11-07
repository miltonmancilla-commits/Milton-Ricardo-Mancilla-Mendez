import React, { useState } from 'react';
import { useSga } from '../../context/SgaContext';
import {
  BookOpen,
  Users,
  CheckCircle2,
  Lock,
  Unlock,
  AlertCircle,
  Save,
  Award,
  Clock
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const {
    currentPersona,
    grupos,
    asignaturas,
    matriculas,
    personas,
    calificaciones,
    updateGrade,
    toggleCierreEvaluativo
  } = useSga();

  // Find groups assigned to this teacher or allow selecting any if viewing as teacher
  const teacherGrupos = grupos.filter(
    (g) => g.id_docente === currentPersona.id_persona || currentPersona.tipo_persona !== 'DOCENTE'
  );

  const [selectedGrupoId, setSelectedGrupoId] = useState<string>(
    teacherGrupos[0]?.id_grupo || grupos[0].id_grupo
  );

  const [feedback, setFeedback] = useState<{ text: string; error?: boolean } | null>(null);

  const selectedGrupo = grupos.find((g) => g.id_grupo === selectedGrupoId) || grupos[0];
  const selectedAsig = asignaturas.find((a) => a.id_asignatura === selectedGrupo.id_asignatura);

  // Enrolled students in this group
  const groupMatriculas = matriculas.filter(
    (m) => m.id_grupo === selectedGrupo.id_grupo && m.estado === 'MATRICULADO'
  );

  const handleGradeChange = (
    calificacionId: string,
    corte: 'corte_1' | 'corte_2' | 'corte_3',
    valStr: string
  ) => {
    const val = valStr.trim() === '' ? null : parseFloat(valStr);
    const res = updateGrade(calificacionId, corte, val);
    if (!res.success) {
      setFeedback({ text: res.message, error: true });
    } else {
      setFeedback({ text: 'Nota registrada y ponderada en tiempo real.' });
    }
  };

  const handleToggleLock = (calificacionId: string) => {
    const res = toggleCierreEvaluativo(calificacionId);
    setFeedback({ text: res.message, error: !res.success });
  };

  return (
    <div className="space-y-6">
      {/* Teacher Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-emerald-700 font-semibold">Portal Docente CUN</span>
              <span aria-hidden="true">·</span>
              <span>RF-04, RF-08, RF-12</span>
              <span aria-hidden="true">·</span>
              <span>Reglamento Estudiantil (Cortes: 30%, 30%, 40%)</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Registro de Calificaciones & Cierre Evaluativo
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Profesor: <strong>{currentPersona.nombres} {currentPersona.apellidos}</strong> · {currentPersona.especialidad || 'Docente de Planta'}
            </p>
          </div>

          {/* Group Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600">Grupo Asignado:</span>
            <select
              value={selectedGrupoId}
              onChange={(e) => setSelectedGrupoId(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {grupos.map((g) => {
                const asig = asignaturas.find((a) => a.id_asignatura === g.id_asignatura);
                return (
                  <option key={g.id_grupo} value={g.id_grupo}>
                    {asig?.codigo_materia} - {g.nombre_grupo}
                  </option>
                );
              })}
            </select>
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

      {/* Group info card & Grades table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>{selectedAsig?.nombre} ({selectedAsig?.codigo_materia})</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedGrupo.nombre_grupo} · {selectedGrupo.cupo_ocupado} estudiantes inscritos
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Corte 1: 30% · Corte 2: 30% · Corte 3: 40%</span>
            </div>
          </div>
        </div>

        {groupMatriculas.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No hay estudiantes matriculados en este grupo actualmente.
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Estudiante</th>
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3 text-center">Corte 1 (30%)</th>
                  <th className="py-2.5 px-3 text-center">Corte 2 (30%)</th>
                  <th className="py-2.5 px-3 text-center">Corte 3 (40%)</th>
                  <th className="py-2.5 px-3 text-center">Definitiva</th>
                  <th className="py-2.5 px-3 text-center">Estado</th>
                  <th className="py-2.5 px-3 text-center">Cierre</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {groupMatriculas.map((mat) => {
                  const est = personas.find((p) => p.id_persona === mat.id_estudiante);
                  const cal = calificaciones.find((c) => c.id_matricula === mat.id_matricula);
                  const isLocked = cal?.cierre_evaluativo;
                  const def = cal?.definitiva;
                  const isPassing = def !== null && def !== undefined && def >= 3.0;

                  return (
                    <tr key={mat.id_matricula} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-slate-900">
                          {est ? `${est.nombres} ${est.apellidos}` : 'Estudiante'}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">{est?.email}</div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                        {est?.codigo_estudiantil || 'N/A'}
                      </td>

                      {/* Corte 1 */}
                      <td className="py-2 px-3 text-center">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          disabled={isLocked}
                          value={cal?.corte_1 ?? ''}
                          onChange={(e) => handleGradeChange(cal!.id_calificacion, 'corte_1', e.target.value)}
                          placeholder="-"
                          className={`w-16 px-2 py-1 text-xs text-center font-mono rounded border ${
                            isLocked
                              ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                              : 'bg-white border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500'
                          }`}
                        />
                      </td>

                      {/* Corte 2 */}
                      <td className="py-2 px-3 text-center">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          disabled={isLocked}
                          value={cal?.corte_2 ?? ''}
                          onChange={(e) => handleGradeChange(cal!.id_calificacion, 'corte_2', e.target.value)}
                          placeholder="-"
                          className={`w-16 px-2 py-1 text-xs text-center font-mono rounded border ${
                            isLocked
                              ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                              : 'bg-white border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500'
                          }`}
                        />
                      </td>

                      {/* Corte 3 */}
                      <td className="py-2 px-3 text-center">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          disabled={isLocked}
                          value={cal?.corte_3 ?? ''}
                          onChange={(e) => handleGradeChange(cal!.id_calificacion, 'corte_3', e.target.value)}
                          placeholder="-"
                          className={`w-16 px-2 py-1 text-xs text-center font-mono rounded border ${
                            isLocked
                              ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                              : 'bg-white border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500'
                          }`}
                        />
                      </td>

                      {/* Definitiva */}
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-sm">
                        {def !== null && def !== undefined ? (
                          <span className={def >= 3.0 ? 'text-emerald-700' : 'text-red-600'}>
                            {def.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-normal text-xs">Pendiente</span>
                        )}
                      </td>

                      {/* Estado */}
                      <td className="py-2.5 px-3 text-center">
                        {def !== null && def !== undefined ? (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              isPassing
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {isPassing ? 'APROBADO' : 'REPROBADO'}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">EN CURSO</span>
                        )}
                      </td>

                      {/* Toggle Lock / Cierre Evaluativo */}
                      <td className="py-2.5 px-3 text-center">
                        {cal && (
                          <button
                            onClick={() => handleToggleLock(cal.id_calificacion)}
                            title={
                              isLocked
                                ? 'Reabrir corte evaluativo'
                                : 'Bloquear notas (Cierre Evaluativo)'
                            }
                            className={`p-1.5 rounded transition-colors ${
                              isLocked
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
