import React, { useState } from 'react';
import { useSga } from '../../context/SgaContext';
import { useTheme } from '../../context/ThemeContext';
import { HorarioItem } from '../../types/sga';
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  User as UserIcon,
  Layers,
  MapPin,
  CalendarDays,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ScheduleManagerModal: React.FC = () => {
  const {
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    asignaturas,
    periodos,
    personas,
    grupos,
    createGrupoConHorario
  } = useSga();

  const { currentTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<'crear' | 'cronograma'>('crear');

  // Form State
  const [selectedAsignatura, setSelectedAsignatura] = useState<string>(
    asignaturas[0]?.id_asignatura || ''
  );
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>(
    periodos[0]?.id_periodo || 'PER-2026-2'
  );
  
  // Teachers only
  const docentes = personas.filter(
    (p) => p.tipo_persona === 'DOCENTE' || p.tipo_persona === 'ADMIN'
  );
  const [selectedDocente, setSelectedDocente] = useState<string>(
    docentes[0]?.id_persona || ''
  );

  const [nombreGrupo, setNombreGrupo] = useState<string>('');
  const [cupoMaximo, setCupoMaximo] = useState<number>(30);

  // Dynamic schedule slots list
  const [horarios, setHorarios] = useState<HorarioItem[]>([
    {
      dia: 'Lunes',
      hora_inicio: '18:15',
      hora_fin: '20:00',
      aula: 'Virtual Aula 101 - Teams CUN'
    }
  ]);

  const [feedback, setFeedback] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isScheduleModalOpen) return null;

  const addHorarioSlot = () => {
    setHorarios((prev) => [
      ...prev,
      {
        dia: 'Miércoles',
        hora_inicio: '18:15',
        hora_fin: '20:00',
        aula: 'Virtual Aula 101 - Teams CUN'
      }
    ]);
  };

  const removeHorarioSlot = (index: number) => {
    if (horarios.length <= 1) return;
    setHorarios((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSlotField = (index: number, field: keyof HorarioItem, value: any) => {
    setHorarios((prev) =>
      prev.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const asig = asignaturas.find((a) => a.id_asignatura === selectedAsignatura);
    const generatedName =
      nombreGrupo.trim() ||
      `Grupo ${Math.floor(100 + Math.random() * 900)} - ${asig?.nombre.split(' ')[0] || 'Asignatura'}`;

    const res = createGrupoConHorario({
      id_asignatura: selectedAsignatura,
      id_periodo: selectedPeriodo,
      id_docente: selectedDocente,
      nombre_grupo: generatedName,
      cupo_maximo: cupoMaximo,
      horarios
    });

    if (!res.success) {
      setFeedback({ text: res.message, error: true });
    } else {
      setFeedback({ text: res.message, error: false });
      setTimeout(() => {
        setIsScheduleModalOpen(false);
        setFeedback(null);
        setNombreGrupo('');
      }, 700);
    }
  };

  const days: ('Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado')[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl rounded-2xl border shadow-2xl overflow-hidden transition-colors duration-200 flex flex-col max-h-[92vh]"
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
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Gestión de Grupos y Horarios Semanales</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/20 text-white font-semibold">
                  RF-05 / RF-06
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Programación de clases, asignación de docentes y validación de solapamiento horario
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsScheduleModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subtabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button
            type="button"
            onClick={() => setActiveTab('crear')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-all flex items-center justify-center gap-2 ${
              activeTab === 'crear'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-800'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Registrar Nuevo Grupo & Horarios</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cronograma')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-all flex items-center justify-center gap-2 ${
              activeTab === 'cronograma'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-800'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Parrilla Semanal de Horarios ({grupos.length} Grupos)</span>
          </button>
        </div>

        {/* Content area */}
        <div className="p-6 overflow-y-auto space-y-5">
          {activeTab === 'crear' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {feedback && (
                <div
                  className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                    feedback.error
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-300'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-300'
                  }`}
                >
                  {feedback.error ? (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  )}
                  <span>{feedback.text}</span>
                </div>
              )}

              {/* Course & Period */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Asignatura Académica *
                  </label>
                  <select
                    value={selectedAsignatura}
                    onChange={(e) => setSelectedAsignatura(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {asignaturas.map((asig) => (
                      <option key={asig.id_asignatura} value={asig.id_asignatura}>
                        {asig.codigo_materia} - {asig.nombre} ({asig.creditos} Créditos · Semestre {asig.semestre})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Docente Asignado *
                  </label>
                  <select
                    value={selectedDocente}
                    onChange={(e) => setSelectedDocente(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {docentes.map((doc) => (
                      <option key={doc.id_persona} value={doc.id_persona}>
                        {doc.nombres} {doc.apellidos} {doc.especialidad ? `(${doc.especialidad})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Group Name & Max Seats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nombre o Identificador del Grupo *
                  </label>
                  <input
                    type="text"
                    placeholder="ej. Grupo 50103 - Noche Virtual (Martes y Jueves)"
                    value={nombreGrupo}
                    onChange={(e) => setNombreGrupo(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Cupo Máximo (SELECT FOR UPDATE) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={80}
                    value={cupoMaximo}
                    onChange={(e) => setCupoMaximo(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              {/* Schedule Slots dynamic builder */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Franjas Horarias del Grupo ({horarios.length} bloque{horarios.length > 1 ? 's' : ''})</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Configure los días de clase semanal, horarios de inicio/fin y aulas
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addHorarioSlot}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Día/Horario</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {horarios.map((slot, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
                    >
                      {/* Day */}
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Día de Semana</label>
                        <select
                          value={slot.dia}
                          onChange={(e) => updateSlotField(index, 'dia', e.target.value)}
                          className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
                        >
                          {days.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Start Time */}
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Hora Inicio</label>
                        <input
                          type="time"
                          value={slot.hora_inicio}
                          onChange={(e) => updateSlotField(index, 'hora_inicio', e.target.value)}
                          className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                        />
                      </div>

                      {/* End Time */}
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Hora Fin</label>
                        <input
                          type="time"
                          value={slot.hora_fin}
                          onChange={(e) => updateSlotField(index, 'hora_fin', e.target.value)}
                          className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                        />
                      </div>

                      {/* Classroom / Virtual */}
                      <div className="sm:col-span-4">
                        <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Aula o Plataforma</label>
                        <input
                          type="text"
                          placeholder="ej. Aula Virtual Teams 102"
                          value={slot.aula}
                          onChange={(e) => updateSlotField(index, 'aula', e.target.value)}
                          className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                      </div>

                      {/* Delete */}
                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          disabled={horarios.length <= 1}
                          onClick={() => removeHorarioSlot(index)}
                          title="Eliminar franja"
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  style={{ backgroundColor: currentTheme.primary }}
                  className="px-5 py-2 text-xs font-bold text-white rounded-lg hover:opacity-90 transition-opacity shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Crear Grupo & Guardar Horarios</span>
                </button>
              </div>
            </form>
          ) : (
            /* ================= CRONOGRAMA SEMANAL ================= */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>Cronograma General de Horarios - Periodo 2026-2</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Visualización integral de todos los grupos y clases activas por día
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  Total de Grupos: {grupos.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {days.map((dia) => {
                  const groupsOnDay = grupos.filter((g) =>
                    g.horarios.some((h) => h.dia === dia)
                  );

                  return (
                    <div
                      key={dia}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-2.5"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                          {dia}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold">
                          {groupsOnDay.length} sesion{groupsOnDay.length !== 1 ? 'es' : ''}
                        </span>
                      </div>

                      {groupsOnDay.length === 0 ? (
                        <p className="text-[11px] text-slate-400 italic py-4 text-center">
                          Sin clases programadas este día
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {groupsOnDay.map((grp) => {
                            const asig = asignaturas.find((a) => a.id_asignatura === grp.id_asignatura);
                            const doc = personas.find((p) => p.id_persona === grp.id_docente);
                            const diaHorarios = grp.horarios.filter((h) => h.dia === dia);

                            return (
                              <div
                                key={grp.id_grupo}
                                className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 transition-colors"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                                    {asig?.nombre || grp.nombre_grupo}
                                  </span>
                                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shrink-0">
                                    {grp.cupo_ocupado}/{grp.cupo_maximo}
                                  </span>
                                </div>

                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  {grp.nombre_grupo}
                                </p>

                                <div className="mt-1.5 space-y-1">
                                  {diaHorarios.map((dh, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono font-medium"
                                    >
                                      <Clock className="w-3 h-3 shrink-0" />
                                      <span>
                                        {dh.hora_inicio} - {dh.hora_fin}
                                      </span>
                                      <span className="text-slate-400 font-sans">·</span>
                                      <span className="text-slate-500 font-sans truncate text-[10px]">
                                        {dh.aula}
                                      </span>
                                    </div>
                                  ))}
                                </div>

                                {doc && (
                                  <div className="mt-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1 text-[10px] text-slate-500">
                                    <UserIcon className="w-3 h-3 text-slate-400" />
                                    <span>
                                      Doc: {doc.nombres} {doc.apellidos}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
