import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Lock,
  Unlock,
  Database,
  ArrowRight,
  ShieldAlert,
  Server,
  User,
  Monitor
} from 'lucide-react';

interface SequenceStep {
  step: number;
  from: 'Estudiante' | 'SPA Client' | 'MatriculaService' | 'PostgreSQL Database';
  to: 'Estudiante' | 'SPA Client' | 'MatriculaService' | 'PostgreSQL Database';
  action: string;
  sqlSnippet?: string;
  explanation: string;
  lockStatus: 'LIBRE' | 'BLOQUEANDO' | 'BLOQUEADO' | 'LIBERADO';
}

export const SequenceDiagram: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps: SequenceStep[] = [
    {
      step: 1,
      from: 'Estudiante',
      to: 'SPA Client',
      action: '1. Clic en "Matricular Asignatura" (id_grupo, bearer_token)',
      explanation: 'El estudiante confirma la selección de materia en el portal web SPA tras revisar horarios y créditos disponibles.',
      lockStatus: 'LIBRE'
    },
    {
      step: 2,
      from: 'SPA Client',
      to: 'MatriculaService',
      action: '2. POST /api/v1/enrollments { grupoId: "GRP-50101" }',
      explanation: 'La SPA despacha la solicitud HTTP REST sobre HTTPS TLS 1.3 adjuntando el JWT en la cabecera Authorization: Bearer.',
      lockStatus: 'LIBRE'
    },
    {
      step: 3,
      from: 'MatriculaService',
      to: 'PostgreSQL Database',
      action: '3. BEGIN TRANSACTION (Aislamiento: READ COMMITTED)',
      sqlSnippet: 'BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;',
      explanation: 'Se abre el contexto transaccional ACID en la conexión obtenida del pool HikariCP.',
      lockStatus: 'LIBRE'
    },
    {
      step: 4,
      from: 'MatriculaService',
      to: 'PostgreSQL Database',
      action: '4. SELECT * FROM grupo WHERE id_grupo = X FOR UPDATE',
      sqlSnippet: 'SELECT cupo_ocupado, cupo_maximo FROM academico.grupo WHERE id_grupo = $1 FOR UPDATE;',
      explanation: 'Paso crítico de la arquitectura: adquiere un bloqueo pesimista exclusivo a nivel de fila (Row-Level Lock). Cualquier otra solicitud que consulte este mismo grupo queda en espera ordenada.',
      lockStatus: 'BLOQUEANDO'
    },
    {
      step: 5,
      from: 'PostgreSQL Database',
      to: 'MatriculaService',
      action: '5. Retorna fila bloqueada: { cupo_ocupado: 29, cupo_maximo: 30 }',
      explanation: 'El motor relacional devuelve los valores consistentes garantizando que ninguna otra transacción los está modificando en paralelo.',
      lockStatus: 'BLOQUEADO'
    },
    {
      step: 6,
      from: 'MatriculaService',
      to: 'MatriculaService',
      action: '6. Valida regla de negocio: cupo_ocupado < cupo_maximo? [29 < 30 -> SÍ HAY CUPO]',
      explanation: 'El servicio valida la condición de disponibilidad. Si estuviera lleno (30 >= 30), ejecutaría ROLLBACK inmediato retornando 409 Conflict.',
      lockStatus: 'BLOQUEADO'
    },
    {
      step: 7,
      from: 'MatriculaService',
      to: 'PostgreSQL Database',
      action: '7. INSERT INTO matricula (id_matricula, id_estudiante, id_grupo, ...)',
      sqlSnippet: "INSERT INTO matriculas.matricula (id_matricula, id_estudiante, id_grupo, fecha_matricula, estado) VALUES ('MAT-901', 'PER-05', 'GRP-50101', NOW(), 'MATRICULADO');",
      explanation: 'Se crea el registro legal de la matrícula vinculando al estudiante con el grupo académico.',
      lockStatus: 'BLOQUEADO'
    },
    {
      step: 8,
      from: 'MatriculaService',
      to: 'PostgreSQL Database',
      action: '8. UPDATE grupo SET cupo_ocupado = cupo_ocupado + 1 WHERE id_grupo = X',
      sqlSnippet: 'UPDATE academico.grupo SET cupo_ocupado = cupo_ocupado + 1 WHERE id_grupo = $1;',
      explanation: 'Incremento atómico del contador de ocupación dentro del cerco de la transacción bloqueada.',
      lockStatus: 'BLOQUEADO'
    },
    {
      step: 9,
      from: 'MatriculaService',
      to: 'PostgreSQL Database',
      action: '9. INSERT INTO auditoria (id_log, usuario, accion, timestamp, ip)',
      sqlSnippet: "INSERT INTO logs.auditoria (id_usuario, accion_realizada, tabla_afectada, id_registro_afectado) VALUES ('USR-05', 'ENROLL_STUDENT_ACID', 'matriculas.matricula', 'MAT-901');",
      explanation: 'Pista de auditoría inmutable persistida con trazabilidad forense (RF-12).',
      lockStatus: 'BLOQUEADO'
    },
    {
      step: 10,
      from: 'MatriculaService',
      to: 'PostgreSQL Database',
      action: '10. COMMIT TRANSACTION',
      sqlSnippet: 'COMMIT;',
      explanation: 'La transacción se persiste de manera permanente en el WAL de PostgreSQL y se libera de inmediato el bloqueo a nivel de fila (duración total de lock < 50ms).',
      lockStatus: 'LIBERADO'
    },
    {
      step: 11,
      from: 'MatriculaService',
      to: 'SPA Client',
      action: '11. Retorna HTTP 201 Created { matriculaId: "MAT-901", estado: "MATRICULADO" }',
      explanation: 'Respuesta HTTP exitosa procesada en tiempo récord, muy por debajo de los 3 segundos exigidos en RNF-02.',
      lockStatus: 'LIBRE'
    },
    {
      step: 12,
      from: 'SPA Client',
      to: 'Estudiante',
      action: '12. Confirmación visual y actualización reactiva de horarios en pantalla',
      explanation: 'El portal estudiantil actualiza el horario semanal y confirma la plaza académica al alumno.',
      lockStatus: 'LIBRE'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const activeStepData = steps[currentStep - 1];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Diagrama de Secuencia: Transacción Crítica de Matrícula (Sección 6.5)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Flujo paso a paso con bloqueo pesimista SELECT FOR UPDATE y garantía transaccional ACID (RNF-07).
          </p>
        </div>

        {/* Playback controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep(1)}
            className="p-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
            title="Reiniciar al paso 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-medium disabled:opacity-50 transition-colors"
          >
            Anterior
          </button>
          <span className="text-xs font-mono font-bold text-slate-700 px-2">
            Paso {currentStep} de {steps.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold disabled:opacity-50 transition-colors shadow-sm"
          >
            Siguiente Paso
          </button>
        </div>
      </div>

      {/* Actors Header */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
        <div className={`p-3 rounded-lg border transition-all ${activeStepData.from === 'Estudiante' || activeStepData.to === 'Estudiante' ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
          <User className="w-4 h-4 mx-auto mb-1 text-slate-600" />
          <span>Estudiante</span>
        </div>
        <div className={`p-3 rounded-lg border transition-all ${activeStepData.from === 'SPA Client' || activeStepData.to === 'SPA Client' ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
          <Monitor className="w-4 h-4 mx-auto mb-1 text-slate-600" />
          <span>SPA Client (Browser)</span>
        </div>
        <div className={`p-3 rounded-lg border transition-all ${activeStepData.from === 'MatriculaService' || activeStepData.to === 'MatriculaService' ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
          <Server className="w-4 h-4 mx-auto mb-1 text-slate-600" />
          <span>MatriculaService (Backend)</span>
        </div>
        <div className={`p-3 rounded-lg border transition-all ${activeStepData.from === 'PostgreSQL Database' || activeStepData.to === 'PostgreSQL Database' ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
          <Database className="w-4 h-4 mx-auto mb-1 text-slate-600" />
          <span>PostgreSQL (Read Committed)</span>
        </div>
      </div>

      {/* Active Step Showcase Card */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
              {activeStepData.step}
            </span>
            <span className="text-sm font-bold text-slate-900 font-mono">
              {activeStepData.action}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Estado de Bloqueo:</span>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                activeStepData.lockStatus === 'BLOQUEADO' || activeStepData.lockStatus === 'BLOQUEANDO'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : activeStepData.lockStatus === 'LIBERADO'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {activeStepData.lockStatus}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {activeStepData.explanation}
        </p>

        {activeStepData.sqlSnippet && (
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-slate-400">Instrucción SQL ejecutada:</div>
            <pre className="p-3 bg-slate-900 text-emerald-300 rounded-lg text-xs font-mono overflow-x-auto border border-slate-800">
              {activeStepData.sqlSnippet}
            </pre>
          </div>
        )}
      </div>

      {/* All steps timeline summary */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-slate-700">Secuencia Completa (12 Pasos):</span>
        <div className="space-y-1 max-h-56 overflow-y-auto border border-slate-200 rounded-lg p-2 bg-slate-50">
          {steps.map((s) => (
            <div
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className={`p-2 rounded text-xs flex items-center justify-between cursor-pointer transition-all ${
                s.step === currentStep
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'hover:bg-slate-200/60 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="font-mono w-5 shrink-0">#{s.step}</span>
                <span className="truncate">{s.action}</span>
              </div>
              <span className="text-[10px] font-mono opacity-80 shrink-0 ml-2">
                {s.from} → {s.to}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
