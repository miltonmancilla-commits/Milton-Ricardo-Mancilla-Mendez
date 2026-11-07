import React, { useState } from 'react';
import { useSga } from '../../context/SgaContext';
import {
  Cpu,
  Lock,
  Unlock,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Database,
  Terminal,
  Activity,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface ThreadResult {
  threadId: number;
  studentName: string;
  status: 'PENDING' | 'LOCKING' | 'SUCCESS' | 'REJECTED';
  responseTimeMs: number;
  message: string;
  sqlAction: string;
}

export const ConcurrencySimulator: React.FC = () => {
  const { addAuditoriaLog } = useSga();
  const [concurrencyLevel, setConcurrencyLevel] = useState<number>(50);
  const [isolationMode, setIsolationMode] = useState<'PESSIMISTIC_LOCK' | 'UNPROTECTED_RACE'>('PESSIMISTIC_LOCK');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [threads, setThreads] = useState<ThreadResult[]>([]);
  const [stats, setStats] = useState<{
    successful: number;
    rejected: number;
    overbooking: number;
    finalOccupancy: number;
    maxCapacity: number;
    p95Latency: number;
    completed: boolean;
  } | null>(null);

  const startSimulation = async () => {
    setIsRunning(true);
    setStats(null);

    const maxCapacity = 30;
    const initialOccupancy = 29; // Exactly 1 seat remaining
    let currentOccupancy = initialOccupancy;

    // Initialize thread pool
    const initialThreads: ThreadResult[] = Array.from({ length: concurrencyLevel }, (_, i) => ({
      threadId: i + 1,
      studentName: `Estudiante_Virtual_${String(i + 1).padStart(2, '0')}`,
      status: 'PENDING',
      responseTimeMs: 0,
      message: 'En espera en el pool de conexiones...',
      sqlAction: 'Awaiting connection'
    }));

    setThreads(initialThreads);

    let successCount = 0;
    let rejectedCount = 0;
    const latencies: number[] = [];

    if (isolationMode === 'PESSIMISTIC_LOCK') {
      // PESSIMISTIC LOCK: Serialized row-level lock (SELECT FOR UPDATE)
      for (let i = 0; i < concurrencyLevel; i++) {
        // Simulate row lock acquisition delay (10-35ms)
        const delay = Math.floor(15 + Math.random() * 20);
        await new Promise((r) => setTimeout(r, 20));

        const isWinner = currentOccupancy < maxCapacity;
        const latency = delay + (i * 8);
        latencies.push(latency);

        if (isWinner) {
          currentOccupancy++;
          successCount++;
          initialThreads[i] = {
            threadId: i + 1,
            studentName: initialThreads[i].studentName,
            status: 'SUCCESS',
            responseTimeMs: latency,
            message: '201 Created: Matrícula exitosa. Cupo asignado.',
            sqlAction: 'SELECT ... FOR UPDATE -> ROW LOCKED -> UPDATE cupo=30 -> COMMIT'
          };
        } else {
          rejectedCount++;
          initialThreads[i] = {
            threadId: i + 1,
            studentName: initialThreads[i].studentName,
            status: 'REJECTED',
            responseTimeMs: latency,
            message: '409 Conflict: Cupo agotado. Transacción abortada limpiamente.',
            sqlAction: 'SELECT ... FOR UPDATE -> Read cupo=30 (FULL) -> ROLLBACK'
          };
        }

        setThreads([...initialThreads]);
      }
    } else {
      // UNPROTECTED RACE CONDITION: All read at the same time, all see 29 < 30
      await new Promise((r) => setTimeout(r, 200));

      for (let i = 0; i < concurrencyLevel; i++) {
        const latency = Math.floor(40 + Math.random() * 60);
        latencies.push(latency);

        // Every thread simultaneously read initialOccupancy = 29 < 30, so all proceed!
        currentOccupancy++;
        successCount++;

        initialThreads[i] = {
          threadId: i + 1,
          studentName: initialThreads[i].studentName,
          status: 'SUCCESS',
          responseTimeMs: latency,
          message: '200 OK (Falsa sensación de éxito): Matrícula sobrecupo.',
          sqlAction: 'DIRTY READ: SELECT cupo=29 (No lock) -> UPDATE cupo=cupo+1'
        };
      }
      setThreads([...initialThreads]);
    }

    // Sort latencies to compute p95
    latencies.sort((a, b) => a - b);
    const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
    const overbooking = Math.max(0, currentOccupancy - maxCapacity);

    setStats({
      successful: successCount,
      rejected: rejectedCount,
      overbooking,
      finalOccupancy: currentOccupancy,
      maxCapacity,
      p95Latency: p95,
      completed: true
    });

    setIsRunning(false);

    addAuditoriaLog(
      'SIMULATION_CONCURRENCY_RUN',
      'sistema.simulador_acid',
      isolationMode,
      `Simulación ejecutada con ${concurrencyLevel} hilos. Modo: ${isolationMode}. Cupo final: ${currentOccupancy}/${maxCapacity}. Sobrecupos: ${overbooking}`
    );
  };

  const resetSim = () => {
    setThreads([]);
    setStats(null);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-amber-600 font-semibold">Simulador de Estrés & Transacciones ACID</span>
              <span aria-hidden="true">·</span>
              <span>RNF-07 (Integridad)</span>
              <span aria-hidden="true">·</span>
              <span>ADR-02 & Interacción 2 AI Studio</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">
              Laboratorio de Concurrencia: Prevención de Condiciones de Carrera
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Demostración interactiva de contención en base de datos PostgreSQL: qué ocurre cuando 50 estudiantes solicitan simultáneamente el <strong>único cupo disponible</strong> en el Grupo 50101 (Arquitectura de Software).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetSim}
              disabled={isRunning}
              className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
              title="Reiniciar simulador"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={startSimulation}
              disabled={isRunning}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all shadow-sm ${
                isRunning
                  ? 'bg-slate-400 cursor-not-allowed'
                  : isolationMode === 'PESSIMISTIC_LOCK'
                  ? 'bg-theme-primary hover:opacity-90'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isRunning ? 'Ejecutando Hilos...' : 'Iniciar Simulación'}</span>
            </button>
          </div>
        </div>

        {/* Configuration Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6 pt-6 border-t border-slate-100">
          {/* Mode Switcher */}
          <div className="md:col-span-7 space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-slate-500" />
              <span>Estrategia de Concurrencia de Base de Datos:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => !isRunning && setIsolationMode('PESSIMISTIC_LOCK')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isolationMode === 'PESSIMISTIC_LOCK'
                    ? 'border-theme-primary bg-theme-primary-light ring-1 ring-theme-primary'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-theme-primary-text">
                  <Lock className="w-3.5 h-3.5 text-theme-primary" />
                  <span>SELECT ... FOR UPDATE</span>
                </div>
                <p className="text-[11px] text-theme-primary-text mt-1 leading-tight">
                  Bloqueo pesimista a nivel de fila (RNF-07). Consistencia estricta ACID en Read Committed.
                </p>
              </button>

              <button
                type="button"
                onClick={() => !isRunning && setIsolationMode('UNPROTECTED_RACE')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isolationMode === 'UNPROTECTED_RACE'
                    ? 'border-red-500 bg-red-50/50 ring-1 ring-red-500'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-red-900">
                  <Unlock className="w-3.5 h-3.5 text-red-600" />
                  <span>Sin Bloqueo (Condición de Carrera)</span>
                </div>
                <p className="text-[11px] text-red-800 mt-1 leading-tight">
                  Lectura ingenua sin lock o NoSQL con consistencia eventual. Provoca sobrecupo descontrolado.
                </p>
              </button>
            </div>
          </div>

          {/* Thread Count Selector */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-slate-500" />
              <span>Hilos Concurrentes (Estudiantes Simultáneos):</span>
            </label>
            <div className="flex items-center gap-2">
              {[10, 25, 50, 100].map((count) => (
                <button
                  key={count}
                  type="button"
                  disabled={isRunning}
                  onClick={() => setConcurrencyLevel(count)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    concurrencyLevel === count
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {count} Hilos
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              Estado inicial del grupo: <strong>29 ocupados / 30 cupo máximo</strong> (Queda solo 1 cupo).
            </p>
          </div>
        </div>
      </div>

      {/* Results banner if completed */}
      {stats && (
        <div
          className={`rounded-xl border p-5 shadow-sm transition-all ${
            stats.overbooking === 0
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
              : 'bg-red-50/90 border-red-300 text-red-950'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {stats.overbooking === 0 ? (
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                )}
                <h3 className="text-base font-bold">
                  {stats.overbooking === 0
                    ? '¡Integridad Transaccional Preservada al 100%! (RNF-07 Válido)'
                    : `¡Fallo Crítico de Concurrencia! Sobrecupo Ilegal Detectado`}
                </h3>
              </div>
              <p className="text-xs leading-relaxed max-w-3xl">
                {stats.overbooking === 0
                  ? `El mecanismo de bloqueo pesimista SELECT FOR UPDATE serializó las ${concurrencyLevel} peticiones a nivel de fila. Exactamente 1 estudiante obtuvo el cupo final (201 Created), mientras que los ${stats.rejected} estudiantes restantes fueron rechazados limpiamente con 409 Conflict sin sobrepasar la capacidad física ni corromper el estado de la base de datos.`
                  : `Debido a la ausencia de bloqueo transaccional, todas las solicitudes leyeron simultáneamente el valor 29 y procedieron a matricularse. Se matricularon ${stats.successful} estudiantes, resultando en ${stats.overbooking} alumnos de sobrecupo (Capacidad: 30, Ocupación Real: ${stats.finalOccupancy}). Esta falla provocaría hacinamiento en aulas e inconsistencia en actas.`}
              </p>
            </div>

            {/* Metrics summary cards */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-white/80 backdrop-blur px-3 py-2 rounded-lg border border-slate-200/60 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Cupo Final</span>
                <p className="text-base font-mono font-bold text-slate-900">
                  {stats.finalOccupancy} / {stats.maxCapacity}
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur px-3 py-2 rounded-lg border border-slate-200/60 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Sobrecupos</span>
                <p
                  className={`text-base font-mono font-bold ${
                    stats.overbooking === 0 ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  +{stats.overbooking}
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur px-3 py-2 rounded-lg border border-slate-200/60 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500">Latencia p95</span>
                <p className="text-base font-mono font-bold text-slate-900">
                  {stats.p95Latency} ms
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Execution visualization: Threads Grid & SQL Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Threads Grid */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Pool de Hilos de Petición en Vivo ({threads.length})</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              {threads.filter((t) => t.status === 'SUCCESS').length} Éxitos ·{' '}
              {threads.filter((t) => t.status === 'REJECTED').length} Rechazos
            </span>
          </div>

          {threads.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-xs">
              Haz clic en "Iniciar Simulación" para ejecutar la prueba de concurrencia.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 max-h-[460px] overflow-y-auto p-1">
              {threads.map((t) => {
                const isSuccess = t.status === 'SUCCESS';
                const isRejected = t.status === 'REJECTED';

                return (
                  <div
                    key={t.threadId}
                    className={`p-2 rounded-lg border text-xs transition-all ${
                      isSuccess
                        ? 'border-emerald-300 bg-emerald-50/70 text-emerald-950 font-medium'
                        : isRejected
                        ? 'border-slate-200 bg-slate-50 text-slate-600'
                        : 'border-slate-200 bg-white text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                      <span>#Hilo {t.threadId}</span>
                      {isSuccess && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      {isRejected && <XCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                    </div>
                    <div className="truncate text-[10px] text-slate-700" title={t.studentName}>
                      {t.studentName}
                    </div>
                    <div className="text-[10px] font-mono mt-1 text-slate-500">
                      {t.responseTimeMs > 0 ? `${t.responseTimeMs} ms` : '...'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SQL Telemetry & Technical Details */}
        <div className="lg:col-span-5 bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-sm text-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Traza Técnica SQL en Motor PostgreSQL</span>
            </h2>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              READ COMMITTED
            </span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <p className="text-slate-400 text-[11px] mb-1">// Sentencia ejecutada con bloqueo de fila:</p>
              <pre className="p-3 bg-slate-950 rounded-lg text-emerald-300 overflow-x-auto border border-slate-800 text-[11px]">
{`-- 1. Transacción con bloqueo pesimista
BEGIN TRANSACTION;

SELECT cupo_ocupado, cupo_maximo 
FROM academico.grupo 
WHERE id_grupo = 'GRP-50101' 
FOR UPDATE; -- (ROW-LEVEL LOCK)

-- 2. Evaluación condicional atómica:
-- SI cupo_ocupado < cupo_maximo:
INSERT INTO matriculas.matricula (...) VALUES (...);
UPDATE academico.grupo SET cupo_ocupado = cupo_ocupado + 1;
INSERT INTO logs.auditoria (...) VALUES (...);
COMMIT; -- (Libera lock < 50ms)

-- DE LO CONTRARIO:
ROLLBACK; -- Retorna 409 Conflict`}
              </pre>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-lg space-y-1.5 text-[11px] border border-slate-700/60">
              <div className="text-white font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>¿Por qué no SERIALIZABLE ni Bloqueo Optimista?</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                El nivel <strong>SERIALIZABLE</strong> arrojaría excepciones SQL 40001 (serialization_failure) masivas, saturando al cliente con bucles de reintento.
              </p>
              <p className="text-slate-300 leading-relaxed">
                El <strong>Bloqueo Optimista</strong> (con campos version/timestamp) obligaría a 49 clientes a reintentar hasta 5 veces para terminar fallando, degradando el tiempo de respuesta p95 (RNF-02).
              </p>
              <p className="text-emerald-400 font-medium">
                Con SELECT FOR UPDATE, la decisión es inmediata y atómica: 1 ganador, 49 descartes limpios en &lt; 50 ms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
