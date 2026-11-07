import React, { useState } from 'react';
import { useSga } from '../../context/SgaContext';
import {
  Layers,
  BookOpen,
  Calendar,
  Users,
  Clock,
  Download,
  Edit2,
  Check,
  X,
  AlertCircle,
  FileSpreadsheet,
  Plus,
  GraduationCap,
  CalendarDays
} from 'lucide-react';

export const CoordinatorDashboard: React.FC = () => {
  const {
    programas,
    asignaturas,
    periodos,
    grupos,
    personas,
    matriculas,
    updateGrupoCupo,
    openScheduleModal,
    openEnrollModal
  } = useSga();

  const [activeSubTab, setActiveSubTab] = useState<'grupos' | 'catalogo' | 'reportes'>('grupos');
  const [editingGrupoId, setEditingGrupoId] = useState<string | null>(null);
  const [tempCupo, setTempCupo] = useState<number>(30);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const startEditCupo = (id: string, currentCupo: number) => {
    setEditingGrupoId(id);
    setTempCupo(currentCupo);
    setFeedbackMsg(null);
  };

  const saveEditCupo = (id: string) => {
    const res = updateGrupoCupo(id, tempCupo);
    if (res.success) {
      setFeedbackMsg({ text: res.message });
      setEditingGrupoId(null);
    } else {
      setFeedbackMsg({ text: res.message, error: true });
    }
  };

  const exportEnrollmentReportCsv = () => {
    const headers = 'ID_Matricula,Estudiante,Codigo_Estudiante,Programa,Asignatura,Grupo,Fecha_Matricula,Estado\n';
    const rows = matriculas
      .map((m) => {
        const est = personas.find((p) => p.id_persona === m.id_estudiante);
        const grp = grupos.find((g) => g.id_grupo === m.id_grupo);
        const asig = grp ? asignaturas.find((a) => a.id_asignatura === grp.id_asignatura) : null;
        const prog = asig ? programas.find((pr) => pr.id_programa === asig.id_programa) : null;
        return `"${m.id_matricula}","${est ? `${est.nombres} ${est.apellidos}` : ''}","${est?.codigo_estudiantil || ''}","${prog?.nombre_programa || ''}","${asig?.nombre || ''}","${grp?.nombre_grupo || ''}","${m.fecha_matricula}","${m.estado}"`;
      })
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_consolidado_matriculas_cun_${new Date().toISOString().slice(0, 10)}.csv`);
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Coordinator Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-emerald-700 font-semibold">Coordinación Académica</span>
              <span aria-hidden="true">·</span>
              <span>RF-05, RF-06, RF-10</span>
              <span aria-hidden="true">·</span>
              <span>Ingeniería de Sistemas</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Gestión de Catálogo, Oferta de Grupos y Parametrización de Cupos
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Administración de periodos lectivos, creación de grupos con cupos máximos y emisión de consolidados.
            </p>
          </div>

          {/* Subtabs navigation */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveSubTab('grupos')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeSubTab === 'grupos'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Oferta & Cupos de Grupos
            </button>
            <button
              onClick={() => setActiveSubTab('catalogo')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeSubTab === 'catalogo'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Programas y Malla
            </button>
            <button
              onClick={() => setActiveSubTab('reportes')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeSubTab === 'reportes'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Reportes Consolidados
            </button>
          </div>
        </div>

        {feedbackMsg && (
          <div
            className={`mt-4 p-3 rounded-lg text-xs flex items-center justify-between ${
              feedbackMsg.error
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedbackMsg.error ? (
                <AlertCircle className="w-4 h-4 text-red-600" />
              ) : (
                <Check className="w-4 h-4 text-emerald-600" />
              )}
              <span>{feedbackMsg.text}</span>
            </div>
            <button onClick={() => setFeedbackMsg(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Subtab 1: Grupos y Cupos Máximos (RF-06) */}
      {activeSubTab === 'grupos' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Oferta de Grupos y Control de Cupos Concurrente (Periodo 2026-2)</span>
              </h2>
              <p className="text-xs text-slate-500">
                La parametrización de cupos y horarios impacta directamente en las transacciones con SELECT FOR UPDATE.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openScheduleModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Crear Grupo & Horarios</span>
              </button>

              <button
                type="button"
                onClick={openEnrollModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Matricular Alumno</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {grupos.map((grupo) => {
              const asig = asignaturas.find((a) => a.id_asignatura === grupo.id_asignatura);
              const docente = personas.find((p) => p.id_persona === grupo.id_docente);
              const isFull = grupo.cupo_ocupado >= grupo.cupo_maximo;
              const percent = Math.min(100, Math.round((grupo.cupo_ocupado / grupo.cupo_maximo) * 100));
              const isOnlyOneLeft = grupo.cupo_maximo - grupo.cupo_ocupado === 1;

              return (
                <div
                  key={grupo.id_grupo}
                  className={`rounded-xl border p-4 transition-all ${
                    isOnlyOneLeft
                      ? 'border-amber-400 bg-amber-50/20 shadow-sm'
                      : isFull
                      ? 'border-slate-300 bg-slate-50/60'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-theme-primary-text bg-theme-primary-light px-2 py-0.5 rounded border border-theme-primary-border">
                        {asig?.codigo_materia || grupo.id_grupo}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">
                        {asig?.nombre || 'Asignatura'}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">{grupo.nombre_grupo}</p>
                    </div>

                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                        isFull
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : isOnlyOneLeft
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                          : 'text-theme-primary-text bg-theme-primary-light border border-theme-primary-border'
                      }`}
                    >
                      {isFull ? 'LLENO' : isOnlyOneLeft ? '¡1 CUPO DISP!' : 'ABIERTO'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 space-y-1 mb-3 pt-2 border-t border-slate-100">
                    <p className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>Docente: </span>
                      <strong className="text-slate-700">
                        {docente ? `${docente.nombres} ${docente.apellidos}` : 'Por asignar'}
                      </strong>
                    </p>
                    <div className="flex items-start gap-1.5 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        {grupo.horarios.map((h, i) => (
                          <div key={i}>
                            {h.dia} {h.hora_inicio} - {h.hora_fin} ({h.aula})
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cupo status bar */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Ocupación de Cupo:</span>
                      <span className="font-mono font-bold text-slate-800">
                        {grupo.cupo_ocupado} / {grupo.cupo_maximo} ({percent}%)
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isFull
                            ? 'bg-red-500'
                            : isOnlyOneLeft
                            ? 'bg-amber-500'
                            : 'bg-theme-primary'
                        }`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>

                    {/* Edit Cupo Maximo Control */}
                    {editingGrupoId === grupo.id_grupo ? (
                      <div className="flex items-center gap-1.5 pt-2">
                        <input
                          type="number"
                          min={grupo.cupo_ocupado}
                          max={60}
                          value={tempCupo}
                          onChange={(e) => setTempCupo(parseInt(e.target.value) || grupo.cupo_ocupado)}
                          className="w-20 px-2 py-1 text-xs border border-slate-300 rounded font-mono text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <button
                          onClick={() => saveEditCupo(grupo.id_grupo)}
                          className="p-1 bg-theme-primary hover:opacity-90 text-white rounded text-xs"
                          title="Guardar nuevo cupo máximo"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingGrupoId(null)}
                          className="p-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs"
                          title="Cancelar"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] text-slate-400">
                          Disponibles: <strong>{Math.max(0, grupo.cupo_maximo - grupo.cupo_ocupado)}</strong>
                        </span>
                        <button
                          onClick={() => startEditCupo(grupo.id_grupo, grupo.cupo_maximo)}
                          className="text-[11px] text-theme-primary hover:underline font-medium flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Modificar Cupo</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtab 2: Catálogo de Programas y Asignaturas (RF-05) */}
      {activeSubTab === 'catalogo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Programas Académicos (CUN)</span>
            </h2>
            <div className="space-y-3">
              {programas.map((prog) => (
                <div key={prog.id_programa} className="p-3 border border-slate-200 rounded-lg hover:border-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-700 font-semibold">
                      SNIES: {prog.codigo_snies}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                      {prog.nivel}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 mt-1">{prog.nombre_programa}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{prog.facultad}</p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                    <span>{prog.total_creditos} Créditos</span>
                    <span aria-hidden="true">·</span>
                    <span>Modalidad {prog.modalidad}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Malla Curricular & Asignaturas (Ingeniería de Sistemas)</span>
            </h2>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Código</th>
                    <th className="py-2.5 px-3">Nombre Asignatura</th>
                    <th className="py-2.5 px-3">Semestre</th>
                    <th className="py-2.5 px-3">Créditos</th>
                    <th className="py-2.5 px-3">Carácter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {asignaturas.map((asig) => (
                    <tr key={asig.id_asignatura} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 font-mono font-semibold text-emerald-800">
                        {asig.codigo_materia}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-900">{asig.nombre}</td>
                      <td className="py-2.5 px-3 text-slate-600">Semestre {asig.semestre}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">{asig.creditos} Créditos</td>
                      <td className="py-2.5 px-3">
                        <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                          {asig.tipo}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Reportes Consolidados (RF-10) */}
      {activeSubTab === 'reportes' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Generador de Reportes y Consolidados Académicos (RF-10)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Consultas analíticas procesadas sobre réplica de lectura (Read-Only) para evitar contención de locks en el nodo primario.
              </p>
            </div>

            <button
              onClick={exportEnrollmentReportCsv}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Consolidado General (CSV)</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">ID Matrícula</th>
                  <th className="py-2.5 px-3">Estudiante</th>
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Asignatura</th>
                  <th className="py-2.5 px-3">Grupo</th>
                  <th className="py-2.5 px-3">Fecha Transacción</th>
                  <th className="py-2.5 px-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {matriculas.map((m) => {
                  const est = personas.find((p) => p.id_persona === m.id_estudiante);
                  const grp = grupos.find((g) => g.id_grupo === m.id_grupo);
                  const asig = grp ? asignaturas.find((a) => a.id_asignatura === grp.id_asignatura) : null;

                  return (
                    <tr key={m.id_matricula} className="hover:bg-slate-50/70">
                      <td className="py-2 px-3 font-mono text-[11px] text-slate-500">{m.id_matricula}</td>
                      <td className="py-2 px-3 font-medium text-slate-900">
                        {est ? `${est.nombres} ${est.apellidos}` : 'Estudiante'}
                      </td>
                      <td className="py-2 px-3 font-mono text-[11px] text-slate-600">
                        {est?.codigo_estudiantil || 'N/A'}
                      </td>
                      <td className="py-2 px-3 text-slate-800">{asig?.nombre || 'N/A'}</td>
                      <td className="py-2 px-3 text-slate-600">{grp?.nombre_grupo || 'N/A'}</td>
                      <td className="py-2 px-3 font-mono text-[11px] text-slate-500">{m.fecha_matricula}</td>
                      <td className="py-2 px-3">
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {m.estado}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
