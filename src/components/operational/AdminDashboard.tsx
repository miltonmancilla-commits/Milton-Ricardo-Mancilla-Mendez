import React, { useState } from 'react';
import { useSga } from '../../context/SgaContext';
import {
  Shield,
  Server,
  Database,
  Users,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Activity,
  Terminal,
  UserPlus,
  KeyRound
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { usuarios, personas, auditoria, grupos, matriculas, openRegisterModal } = useSga();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('ALL');

  const filteredLogs = auditoria.filter((log) => {
    const matchesSearch =
      log.nombre_usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.accion_realizada.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.tabla_afectada.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.detalles && log.detalles.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesAction =
      filterAction === 'ALL' || log.accion_realizada.includes(filterAction);

    return matchesSearch && matchesAction;
  });

  const exportAuditCsv = () => {
    const headers = 'ID,Timestamp,Usuario,Rol,Accion,Tabla,Registro,IP,Detalles,Checksum\n';
    const rows = auditoria
      .map(
        (l) =>
          `"${l.id_log}","${l.timestamp}","${l.nombre_usuario}","${l.rol}","${l.accion_realizada}","${l.tabla_afectada}","${l.id_registro_afectado}","${l.ip_origen}","${l.detalles || ''}","${l.checksum || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `auditoria_sga_cun_${new Date().toISOString().slice(0, 10)}.csv`);
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-emerald-700 font-semibold">Módulo Seguridad & Parámetros</span>
              <span aria-hidden="true">·</span>
              <span>RF-01, RF-02, RF-12</span>
              <span aria-hidden="true">·</span>
              <span>RNF-01, RNF-03, RNF-04</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Panel de Control del Administrador de Arquitectura
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Supervisión de infraestructura monolítica modular, gestión de cuentas de usuario y auditoría transaccional inmutable.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportAuditCsv}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Pistas de Auditoría (CSV)</span>
            </button>
          </div>
        </div>

        {/* Infrastructure health telemetries (RNF-02, RNF-03, RNF-04) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-medium">Nodos Cómputo</span>
              <Server className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-lg font-bold text-slate-900">2 / 2 Activos</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Docker Node 01 & 02</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-medium">Cluster PostgreSQL</span>
              <Database className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-slate-900">Síncrono Multi-AZ</div>
            <div className="text-[11px] text-blue-600 font-medium mt-0.5 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              <span>Lag: 0 ms · Auto-Failover</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-medium">Concurrencia Pico</span>
              <Users className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-lg font-bold text-slate-900">300 Conexiones</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Pool HikariCP (Max: 50/nodo)
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-medium">Latencia Media Transac.</span>
              <Terminal className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-lg font-bold text-slate-900">42 ms</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
              p95 &lt; 2.1s (RNF-02 OK)
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column layout: User Registry and Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Users & RBAC */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Usuarios & Asignación de Roles (RBAC)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Control de acceso granular con claims JWT y encriptación de contraseñas (RF-01, RF-02)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                {usuarios.length} Cuentas
              </span>
              <button
                type="button"
                onClick={openRegisterModal}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Registrar Usuario</span>
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
            {usuarios.map((u) => {
              const persona = personas.find((p) => p.id_persona === u.id_persona);
              return (
                <div key={u.id_usuario} className="p-3 hover:bg-slate-50/80 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-900">
                        {persona ? `${persona.nombres} ${persona.apellidos}` : u.username}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">{u.email}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold font-mono tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {u.id_rol}
                      </span>
                      <p className="text-[10px] text-emerald-600 font-medium mt-0.5 flex items-center justify-end gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{u.estado}</span>
                      </p>
                    </div>
                  </div>
                  {persona && (
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-slate-500">
                      <span>Doc: {persona.documento}</span>
                      <span aria-hidden="true">·</span>
                      <span>{persona.telefono}</span>
                      {persona.codigo_estudiantil && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-emerald-700">Cod: {persona.codigo_estudiantil}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-lg text-xs text-amber-900 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>Restricción de Privacidad (RNF-11)</span>
            </div>
            <p className="text-[11px] text-amber-800">
              Las contraseñas se almacenan mediante hashes criptográficos Argon2id con salt aleatorio de 128 bits. Ningún administrador ni docente tiene acceso en claro a credenciales de alumnos.
            </p>
          </div>
        </div>

        {/* Right: Immutable Audit Trail (RF-12, RNF-10) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Pistas de Auditoría Inmutables (RF-12, RNF-10)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Logs de base de datos protegidos contra UPDATE/DELETE (Append-Only)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar en logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 w-44"
                />
              </div>

              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="px-2 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none"
              >
                <option value="ALL">Todas las Acciones</option>
                <option value="ENROLL">Matrículas</option>
                <option value="CALIFICACION">Calificaciones</option>
                <option value="AUTH">Autenticación</option>
                <option value="CUPO">Cupos</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[500px] border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-2.5 px-3">Timestamp / Log</th>
                  <th className="py-2.5 px-3">Usuario & Rol</th>
                  <th className="py-2.5 px-3">Acción Transaccional</th>
                  <th className="py-2.5 px-3">Tabla & Registro</th>
                  <th className="py-2.5 px-3">Detalles</th>
                  <th className="py-2.5 px-3 font-mono">IP / Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-400 text-xs">
                      No se encontraron registros de auditoría coincidentes.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id_log} className="hover:bg-slate-50/70">
                      <td className="py-2 px-3 whitespace-nowrap">
                        <div className="font-mono text-[11px] text-slate-800">{log.timestamp}</div>
                        <div className="font-mono text-[10px] text-slate-400">{log.id_log}</div>
                      </td>
                      <td className="py-2 px-3 whitespace-nowrap">
                        <div className="font-medium text-slate-900">{log.nombre_usuario}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{log.rol}</div>
                      </td>
                      <td className="py-2 px-3 whitespace-nowrap">
                        <span className="font-mono text-[11px] font-semibold text-theme-primary-text bg-theme-primary-light px-2 py-0.5 rounded border border-theme-primary-border">
                          {log.accion_realizada}
                        </span>
                      </td>
                      <td className="py-2 px-3 whitespace-nowrap font-mono text-[11px]">
                        <div className="text-slate-700">{log.tabla_afectada}</div>
                        <div className="text-[10px] text-slate-400">{log.id_registro_afectado}</div>
                      </td>
                      <td className="py-2 px-3 text-slate-600 max-w-xs text-[11px]">
                        {log.detalles}
                      </td>
                      <td className="py-2 px-3 whitespace-nowrap font-mono text-[10px] text-slate-400">
                        <div>{log.ip_origen}</div>
                        <div className="text-[9px] text-slate-300 truncate max-w-[80px]" title={log.checksum}>
                          {log.checksum}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
