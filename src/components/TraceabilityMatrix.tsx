import React, { useState } from 'react';
import { REQUIREMENTS_DATA } from '../data/mockDatabase';
import { Requirement } from '../types/sga';
import { useTheme } from '../context/ThemeContext';
import {
  Table,
  CheckCircle2,
  Clock,
  AlertCircle,
  Shield,
  Layers,
  Search,
  Download,
  Filter,
  BarChart3,
  Award,
  ArrowUpDown,
  Check,
  Eye,
  X,
  FileCheck2,
  Activity,
  Zap,
  ChevronRight
} from 'lucide-react';

export const TraceabilityMatrix: React.FC = () => {
  const { currentTheme } = useTheme();

  // Filters & State
  const [filterType, setFilterType] = useState<'RF' | 'ALL'>('RF'); // Default to Functional Requirements as requested
  const [filterEstado, setFilterEstado] = useState<string>('ALL');
  const [filterPrioridad, setFilterPrioridad] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedReq, setSelectedReq] = useState<Requirement | null>(null);
  const [sortBy, setSortBy] = useState<'id' | 'cumplimiento' | 'prioridad'>('id');

  // Filtering
  const filtered = REQUIREMENTS_DATA.filter((r) => {
    const matchesType = filterType === 'ALL' || r.tipo === filterType;
    const matchesEstado = filterEstado === 'ALL' || r.estado === filterEstado;
    const matchesPrioridad = filterPrioridad === 'ALL' || r.prioridad === filterPrioridad;
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.componente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.mecanismo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.casosPrueba && r.casosPrueba.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesType && matchesEstado && matchesPrioridad && matchesSearch;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'cumplimiento') {
      return b.nivelCumplimiento - a.nivelCumplimiento;
    }
    if (sortBy === 'prioridad') {
      const pWeights: Record<string, number> = { CRITICA: 4, ALTA: 3, MEDIA: 2, BAJA: 1 };
      return (pWeights[b.prioridad] || 0) - (pWeights[a.prioridad] || 0);
    }
    return a.id.localeCompare(b.id);
  });

  // Analytics for RFs
  const rfOnly = REQUIREMENTS_DATA.filter((r) => r.tipo === 'RF');
  const totalRfs = rfOnly.length;
  const avgCompliance = Math.round(
    rfOnly.reduce((acc, curr) => acc + curr.nivelCumplimiento, 0) / (totalRfs || 1)
  );
  const validatedCount = rfOnly.filter((r) => r.estado === 'VALIDADO').length;
  const criticalCount = rfOnly.filter((r) => r.prioridad === 'CRITICA').length;
  const criticalValidated = rfOnly.filter((r) => r.prioridad === 'CRITICA' && r.estado === 'VALIDADO').length;

  // Export to CSV
  const handleExportCsv = () => {
    const headers = 'ID,Tipo,Nombre,Estado,Prioridad,Cumplimiento_Porcentaje,Componente,Mecanismo,Validacion,Casos_Prueba,Responsable\n';
    const rows = sorted
      .map(
        (r) =>
          `"${r.id}","${r.tipo}","${r.nombre}","${r.estado}","${r.prioridad}","${r.nivelCumplimiento}%","${r.componente}","${r.mecanismo.replace(/"/g, '""')}","${r.validacion.replace(/"/g, '""')}","${r.casosPrueba || ''}","${r.responsable || ''}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `matriz_trazabilidad_sga_cun_${new Date().toISOString().slice(0, 10)}.csv`);
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header card with contextual description */}
      <div
        className="p-6 rounded-2xl border shadow-sm transition-colors duration-200"
        style={{
          backgroundColor: currentTheme.cardBg,
          borderColor: currentTheme.cardBorder
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium">
              <span
                className="font-bold px-2 py-0.5 rounded text-[11px]"
                style={{
                  backgroundColor: currentTheme.primaryLight,
                  color: currentTheme.primaryText
                }}
              >
                CUN · Ingeniería de Sistemas
              </span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span className="opacity-80">Arquitectura de Software (Semanas 3 a 6)</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span className="font-mono text-[11px] opacity-70">ISO/IEC/IEEE 29148</span>
            </div>
            <h1 className="text-xl font-bold mt-1.5 flex items-center gap-2.5">
              <Table className="w-5 h-5" style={{ color: currentTheme.primary }} />
              <span>Matriz de Trazabilidad de Requerimientos Funcionales (SGA)</span>
            </h1>
            <p className="text-xs opacity-75 mt-1 max-w-3xl leading-relaxed">
              Mapeo bidireccional exhaustivo que vincula cada Requerimiento Funcional (RF-01 al RF-12) con su estado de implementación, nivel de prioridad operacional, porcentaje de cumplimiento y evidencia técnica de validación.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-xs transition-opacity hover:opacity-90"
              style={{ backgroundColor: currentTheme.primary }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Matriz (CSV)</span>
            </button>
          </div>
        </div>

        {/* KPI Analytics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-black/5 dark:border-white/10">
          {/* Card 1: Requerimientos Funcionales */}
          <div
            className="p-3.5 rounded-xl border transition-colors duration-200"
            style={{
              backgroundColor: currentTheme.isDark ? '#0d1322' : '#f8fafc',
              borderColor: currentTheme.cardBorder
            }}
          >
            <div className="flex items-center justify-between text-xs opacity-70 mb-1">
              <span className="font-semibold">Requerimientos RF</span>
              <FileCheck2 className="w-4 h-4" style={{ color: currentTheme.primary }} />
            </div>
            <div className="text-2xl font-bold">{totalRfs} / 12</div>
            <div className="text-[11px] font-medium opacity-80 mt-0.5">
              100% especificados y mapeados
            </div>
          </div>

          {/* Card 2: Nivel de Cumplimiento Global */}
          <div
            className="p-3.5 rounded-xl border transition-colors duration-200"
            style={{
              backgroundColor: currentTheme.isDark ? '#0d1322' : '#f8fafc',
              borderColor: currentTheme.cardBorder
            }}
          >
            <div className="flex items-center justify-between text-xs opacity-70 mb-1">
              <span className="font-semibold">Nivel Cumplimiento</span>
              <BarChart3 className="w-4 h-4" style={{ color: currentTheme.primary }} />
            </div>
            <div className="text-2xl font-bold">{avgCompliance}%</div>
            {/* Visual progress bar */}
            <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${avgCompliance}%`, backgroundColor: currentTheme.primary }}
              />
            </div>
          </div>

          {/* Card 3: Prioridad Crítica */}
          <div
            className="p-3.5 rounded-xl border transition-colors duration-200"
            style={{
              backgroundColor: currentTheme.isDark ? '#0d1322' : '#f8fafc',
              borderColor: currentTheme.cardBorder
            }}
          >
            <div className="flex items-center justify-between text-xs opacity-70 mb-1">
              <span className="font-semibold">Requerimientos Críticos</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {criticalValidated} / {criticalCount}
            </div>
            <div className="text-[11px] font-medium opacity-80 mt-0.5">
              100% con transacciones ACID
            </div>
          </div>

          {/* Card 4: Estado Validado */}
          <div
            className="p-3.5 rounded-xl border transition-colors duration-200"
            style={{
              backgroundColor: currentTheme.isDark ? '#0d1322' : '#f8fafc',
              borderColor: currentTheme.cardBorder
            }}
          >
            <div className="flex items-center justify-between text-xs opacity-70 mb-1">
              <span className="font-semibold">Estado de Validación</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {validatedCount} de {totalRfs}
            </div>
            <div className="text-[11px] font-medium opacity-80 mt-0.5">
              Tests automatizados aprobados
            </div>
          </div>
        </div>
      </div>

      {/* Control Ribbon: Search, Type Tabs, Filters & Sorters */}
      <div
        className="p-4 rounded-xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors duration-200"
        style={{
          backgroundColor: currentTheme.cardBg,
          borderColor: currentTheme.cardBorder
        }}
      >
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            placeholder="Buscar por código, nombre, módulo o prueba..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none transition-colors"
            style={{
              backgroundColor: currentTheme.isDark ? '#0d1322' : '#ffffff',
              borderColor: currentTheme.cardBorder,
              color: currentTheme.textMain
            }}
          />
        </div>

        {/* Center / Right: Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Toggle Type: RF only vs All */}
          <div
            className="flex items-center p-0.5 rounded-lg border"
            style={{ borderColor: currentTheme.cardBorder }}
          >
            <button
              type="button"
              onClick={() => setFilterType('RF')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                filterType === 'RF' ? 'shadow-xs' : 'opacity-70 hover:opacity-100'
              }`}
              style={
                filterType === 'RF'
                  ? { backgroundColor: currentTheme.primary, color: '#ffffff' }
                  : {}
              }
            >
              Requerimientos RF (12)
            </button>
            <button
              type="button"
              onClick={() => setFilterType('ALL')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                filterType === 'ALL' ? 'shadow-xs' : 'opacity-70 hover:opacity-100'
              }`}
              style={
                filterType === 'ALL'
                  ? { backgroundColor: currentTheme.primary, color: '#ffffff' }
                  : {}
              }
            >
              Todos (+ RNF)
            </button>
          </div>

          {/* Filter by Estado */}
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border focus:outline-none"
            style={{
              backgroundColor: currentTheme.isDark ? '#0d1322' : '#ffffff',
              borderColor: currentTheme.cardBorder,
              color: currentTheme.textMain
            }}
          >
            <option value="ALL">Todos los Estados</option>
            <option value="VALIDADO">Estado: VALIDADO</option>
            <option value="IMPLEMENTADO">Estado: IMPLEMENTADO</option>
            <option value="EN_PROGRESO">Estado: EN PROGRESO</option>
          </select>

          {/* Filter by Prioridad */}
          <select
            value={filterPrioridad}
            onChange={(e) => setFilterPrioridad(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border focus:outline-none"
            style={{
              backgroundColor: currentTheme.isDark ? '#0d1322' : '#ffffff',
              borderColor: currentTheme.cardBorder,
              color: currentTheme.textMain
            }}
          >
            <option value="ALL">Todas las Prioridades</option>
            <option value="CRITICA">Prioridad: CRÍTICA</option>
            <option value="ALTA">Prioridad: ALTA</option>
            <option value="MEDIA">Prioridad: MEDIA</option>
          </select>

          {/* Sorter */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1.5 text-xs rounded-lg border focus:outline-none"
            style={{
              backgroundColor: currentTheme.isDark ? '#0d1322' : '#ffffff',
              borderColor: currentTheme.cardBorder,
              color: currentTheme.textMain
            }}
          >
            <option value="id">Ordenar por Código (RF-01...)</option>
            <option value="cumplimiento">Ordenar por Cumplimiento (%)</option>
            <option value="prioridad">Ordenar por Prioridad</option>
          </select>
        </div>
      </div>

      {/* Main Traceability Table */}
      <div
        className="rounded-2xl border shadow-sm overflow-hidden transition-colors duration-200"
        style={{
          backgroundColor: currentTheme.cardBg,
          borderColor: currentTheme.cardBorder
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead
              className="font-bold border-b transition-colors duration-200"
              style={{
                backgroundColor: currentTheme.isDark ? '#080d1a' : '#f8fafc',
                borderColor: currentTheme.cardBorder,
                color: currentTheme.textMain
              }}
            >
              <tr>
                <th className="py-3 px-3.5 w-24">Código</th>
                <th className="py-3 px-3.5 min-w-[200px]">Requerimiento Funcional</th>
                <th className="py-3 px-3 w-28 text-center">Estado</th>
                <th className="py-3 px-3 w-28 text-center">Prioridad</th>
                <th className="py-3 px-3.5 w-36 text-center">Cumplimiento</th>
                <th className="py-3 px-3.5 min-w-[180px]">Componente Arquitectónico</th>
                <th className="py-3 px-3.5 min-w-[220px]">Mecanismo & Validación</th>
                <th className="py-3 px-3 text-center w-16">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/10 font-sans">
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs opacity-50">
                    No se encontraron requerimientos coincidentes con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                sorted.map((req) => {
                  const isCritica = req.prioridad === 'CRITICA';
                  const isAlta = req.prioridad === 'ALTA';
                  const isValidado = req.estado === 'VALIDADO';
                  const isImplementado = req.estado === 'IMPLEMENTADO';

                  return (
                    <tr
                      key={req.id}
                      onClick={() => setSelectedReq(req)}
                      className="hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      {/* Código */}
                      <td className="py-3 px-3.5 font-mono font-bold whitespace-nowrap">
                        <span
                          className="px-2 py-0.5 rounded text-[11px] border"
                          style={{
                            backgroundColor: currentTheme.primaryLight,
                            color: currentTheme.primaryText,
                            borderColor: currentTheme.primaryBorder
                          }}
                        >
                          {req.id}
                        </span>
                      </td>

                      {/* Nombre y descripción */}
                      <td className="py-3 px-3.5">
                        <div className="font-bold">{req.nombre}</div>
                        <div className="text-[11px] opacity-70 mt-0.5 line-clamp-2 leading-relaxed">
                          {req.descripcion}
                        </div>
                      </td>

                      {/* Estado */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono border ${
                            isValidado
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                              : isImplementado
                              ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
                              : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                          }`}
                        >
                          {isValidado && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                          {isImplementado && <Activity className="w-3 h-3 shrink-0" />}
                          {!isValidado && !isImplementado && <Clock className="w-3 h-3 shrink-0" />}
                          <span>{req.estado}</span>
                        </span>
                      </td>

                      {/* Prioridad */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                            isCritica
                              ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                              : isAlta
                              ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                              : 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30'
                          }`}
                        >
                          {isCritica && <Zap className="w-2.5 h-2.5" />}
                          <span>{req.prioridad}</span>
                        </span>
                      </td>

                      {/* Nivel de Cumplimiento con barra */}
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${req.nivelCumplimiento}%`,
                                backgroundColor:
                                  req.nivelCumplimiento === 100
                                    ? currentTheme.primary
                                    : '#f59e0b'
                              }}
                            />
                          </div>
                          <span className="font-mono font-bold text-xs">
                            {req.nivelCumplimiento}%
                          </span>
                        </div>
                      </td>

                      {/* Componente */}
                      <td className="py-3 px-3.5">
                        <span
                          className="font-mono text-[11px] px-2 py-1 rounded block truncate max-w-[200px] border"
                          style={{
                            backgroundColor: currentTheme.isDark ? '#080d1a' : '#f1f5f9',
                            borderColor: currentTheme.cardBorder
                          }}
                          title={req.componente}
                        >
                          {req.componente}
                        </span>
                        {req.responsable && (
                          <div className="text-[10px] opacity-60 mt-1">
                            Resp: {req.responsable}
                          </div>
                        )}
                      </td>

                      {/* Mecanismo y validación */}
                      <td className="py-3 px-3.5 text-[11px] leading-snug">
                        <div className="opacity-90">{req.mecanismo}</div>
                        {req.casosPrueba && (
                          <div className="font-mono text-[10px] mt-1 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Check className="w-3 h-3 shrink-0" />
                            <span>{req.casosPrueba}</span>
                          </div>
                        )}
                      </td>

                      {/* Detalle button */}
                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReq(req);
                          }}
                          className="p-1.5 rounded-lg opacity-60 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                          title="Ver trazabilidad completa"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep-Dive Requirement Modal Drawer */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="rounded-2xl border shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-5"
            style={{
              backgroundColor: currentTheme.cardBg,
              borderColor: currentTheme.cardBorder,
              color: currentTheme.textMain
            }}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between gap-3 border-b pb-4" style={{ borderColor: currentTheme.cardBorder }}>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono font-bold text-xs px-2.5 py-0.5 rounded border"
                    style={{
                      backgroundColor: currentTheme.primaryLight,
                      color: currentTheme.primaryText,
                      borderColor: currentTheme.primaryBorder
                    }}
                  >
                    {selectedReq.id}
                  </span>
                  <span className="text-xs font-mono opacity-70">
                    Tipo: {selectedReq.tipo === 'RF' ? 'Requerimiento Funcional' : 'Requerimiento No Funcional'}
                  </span>
                </div>
                <h3 className="text-base font-bold mt-1">{selectedReq.nombre}</h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReq(null)}
                className="p-1.5 rounded-lg opacity-60 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl border" style={{ borderColor: currentTheme.cardBorder }}>
                <span className="text-[10px] opacity-60 uppercase font-semibold">Estado</span>
                <p className="font-mono font-bold mt-0.5 text-emerald-600 dark:text-emerald-400">
                  {selectedReq.estado}
                </p>
              </div>

              <div className="p-2.5 rounded-xl border" style={{ borderColor: currentTheme.cardBorder }}>
                <span className="text-[10px] opacity-60 uppercase font-semibold">Prioridad</span>
                <p className="font-mono font-bold mt-0.5 text-amber-600 dark:text-amber-400">
                  {selectedReq.prioridad}
                </p>
              </div>

              <div className="p-2.5 rounded-xl border" style={{ borderColor: currentTheme.cardBorder }}>
                <span className="text-[10px] opacity-60 uppercase font-semibold">Cumplimiento</span>
                <p className="font-mono font-bold mt-0.5" style={{ color: currentTheme.primary }}>
                  {selectedReq.nivelCumplimiento}%
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1 text-xs">
              <span className="font-bold opacity-80">Descripción del Requerimiento:</span>
              <p className="p-3 rounded-xl border leading-relaxed" style={{ backgroundColor: currentTheme.isDark ? '#080d1a' : '#f8fafc', borderColor: currentTheme.cardBorder }}>
                {selectedReq.descripcion}
              </p>
            </div>

            {/* Traceability chain */}
            <div className="space-y-2 text-xs">
              <span className="font-bold opacity-80">Cadena de Trazabilidad End-to-End:</span>
              <div className="p-3.5 rounded-xl border space-y-2.5 text-[11px] font-mono" style={{ borderColor: currentTheme.cardBorder }}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                  <strong className="opacity-80">Componente Lógico:</strong>
                  <span>{selectedReq.componente}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                  <strong className="opacity-80">Mecanismo:</strong>
                  <span>{selectedReq.mecanismo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                  <strong className="opacity-80">Casos de Prueba:</strong>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedReq.casosPrueba || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                  <strong className="opacity-80">Evidencia / Validación:</strong>
                  <span className="font-sans leading-snug">{selectedReq.validacion}</span>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedReq(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xs hover:opacity-90"
                style={{ backgroundColor: currentTheme.primary }}
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
