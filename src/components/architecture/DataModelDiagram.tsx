import React, { useState } from 'react';
import { Database, Key, Link as LinkIcon, ArrowRight, Shield, Layers } from 'lucide-react';

interface EntityField {
  name: string;
  type: string;
  isPk?: boolean;
  isFk?: boolean;
  fkRef?: string;
  description?: string;
}

interface EntityTable {
  name: string;
  schema: string;
  fields: EntityField[];
  description: string;
}

export const DataModelDiagram: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>('GRUPO');

  const tables: EntityTable[] = [
    {
      name: 'USUARIO',
      schema: 'seguridad',
      description: 'Credenciales individuales, control de acceso y estado de la cuenta en el sistema.',
      fields: [
        { name: 'id_usuario', type: 'UUID', isPk: true },
        { name: 'username', type: 'VARCHAR(60)', description: 'Único' },
        { name: 'password_hash', type: 'VARCHAR(255)', description: 'Argon2id' },
        { name: 'email', type: 'VARCHAR(120)', description: 'Institucional CUN' },
        { name: 'id_rol', type: 'UUID', isFk: true, fkRef: 'ROL.id_rol' },
        { name: 'estado', type: 'VARCHAR(20)' }
      ]
    },
    {
      name: 'ROL',
      schema: 'seguridad',
      description: 'Catálogo de roles del modelo RBAC (Admin, Coordinador, Docente, Estudiante).',
      fields: [
        { name: 'id_rol', type: 'UUID', isPk: true },
        { name: 'nombre_rol', type: 'VARCHAR(50)' },
        { name: 'descripcion', type: 'TEXT' }
      ]
    },
    {
      name: 'PERSONA',
      schema: 'seguridad',
      description: 'Información demográfica, identificación legal y contacto institucional.',
      fields: [
        { name: 'id_persona', type: 'UUID', isPk: true },
        { name: 'id_usuario', type: 'UUID', isFk: true, fkRef: 'USUARIO.id_usuario' },
        { name: 'documento', type: 'VARCHAR(30)', description: 'Cédula / TI' },
        { name: 'nombres', type: 'VARCHAR(100)' },
        { name: 'apellidos', type: 'VARCHAR(100)' },
        { name: 'telefono', type: 'VARCHAR(20)' },
        { name: 'tipo_persona', type: 'VARCHAR(20)' }
      ]
    },
    {
      name: 'PROGRAMA',
      schema: 'academico',
      description: 'Programas de pregrado/posgrado con registro calificado ante el MEN.',
      fields: [
        { name: 'id_programa', type: 'UUID', isPk: true },
        { name: 'nombre_programa', type: 'VARCHAR(150)' },
        { name: 'codigo_snies', type: 'VARCHAR(20)', description: 'Código MEN' },
        { name: 'estado', type: 'VARCHAR(20)' }
      ]
    },
    {
      name: 'ASIGNATURA',
      schema: 'academico',
      description: 'Materias que componen las mallas curriculares de los programas.',
      fields: [
        { name: 'id_asignatura', type: 'UUID', isPk: true },
        { name: 'id_programa', type: 'UUID', isFk: true, fkRef: 'PROGRAMA.id_programa' },
        { name: 'codigo_materia', type: 'VARCHAR(20)' },
        { name: 'nombre', type: 'VARCHAR(120)' },
        { name: 'creditos', type: 'INTEGER' },
        { name: 'semestre', type: 'INTEGER' }
      ]
    },
    {
      name: 'PERIODO_ACADEMICO',
      schema: 'academico',
      description: 'Periodos lectivos semestrales con fechas límites de matrícula y notas.',
      fields: [
        { name: 'id_periodo', type: 'UUID', isPk: true },
        { name: 'codigo_periodo', type: 'VARCHAR(20)' },
        { name: 'fecha_inicio', type: 'DATE' },
        { name: 'fecha_fin', type: 'DATE' },
        { name: 'estado', type: 'VARCHAR(20)' }
      ]
    },
    {
      name: 'GRUPO',
      schema: 'academico',
      description: 'Oferta concreta de una asignatura en un periodo con cupos y horario.',
      fields: [
        { name: 'id_grupo', type: 'UUID', isPk: true },
        { name: 'id_asignatura', type: 'UUID', isFk: true, fkRef: 'ASIGNATURA.id_asignatura' },
        { name: 'id_periodo', type: 'UUID', isFk: true, fkRef: 'PERIODO_ACADEMICO.id_periodo' },
        { name: 'id_docente', type: 'UUID', isFk: true, fkRef: 'PERSONA.id_persona' },
        { name: 'nombre_grupo', type: 'VARCHAR(50)' },
        { name: 'cupo_maximo', type: 'INTEGER', description: 'Capacidad aula' },
        { name: 'cupo_ocupado', type: 'INTEGER', description: 'Lock FOR UPDATE' },
        { name: 'horario_json', type: 'JSONB', description: 'Días, horas, aulas' }
      ]
    },
    {
      name: 'MATRICULA',
      schema: 'matriculas',
      description: 'Registro transaccional de inscripción del estudiante en un grupo específico.',
      fields: [
        { name: 'id_matricula', type: 'UUID', isPk: true },
        { name: 'id_estudiante', type: 'UUID', isFk: true, fkRef: 'PERSONA.id_persona' },
        { name: 'id_grupo', type: 'UUID', isFk: true, fkRef: 'GRUPO.id_grupo' },
        { name: 'fecha_matricula', type: 'TIMESTAMP' },
        { name: 'estado', type: 'VARCHAR(20)' }
      ]
    },
    {
      name: 'CALIFICACION',
      schema: 'calificaciones',
      description: 'Evaluación académica ponderada por cortes y estado de cierre evaluativo.',
      fields: [
        { name: 'id_calificacion', type: 'UUID', isPk: true },
        { name: 'id_matricula', type: 'UUID', isFk: true, fkRef: 'MATRICULA.id_matricula' },
        { name: 'corte_1', type: 'NUMERIC(3,2)', description: '30%' },
        { name: 'corte_2', type: 'NUMERIC(3,2)', description: '30%' },
        { name: 'corte_3', type: 'NUMERIC(3,2)', description: '40%' },
        { name: 'definitiva', type: 'NUMERIC(3,2)', description: 'Calculada' },
        { name: 'fecha_actualizacion', type: 'TIMESTAMP' }
      ]
    },
    {
      name: 'AUDITORIA',
      schema: 'logs',
      description: 'Pistas de auditoría inmutables (Append-Only) para cumplimiento legal y forense.',
      fields: [
        { name: 'id_log', type: 'BIGSERIAL', isPk: true },
        { name: 'id_usuario', type: 'UUID', isFk: true, fkRef: 'USUARIO.id_usuario' },
        { name: 'accion_realizada', type: 'VARCHAR(100)' },
        { name: 'tabla_afectada', type: 'VARCHAR(60)' },
        { name: 'id_registro_afectado', type: 'VARCHAR(50)' },
        { name: 'ip_origen', type: 'INET' },
        { name: 'timestamp', type: 'TIMESTAMP WITH TIME ZONE' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-600" />
            <span>Modelo de Datos Conceptual & Esquemas Relacionales (Sección 6.4)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Diseño normalizado en 3FN con segregación de esquemas lógicos y cumplimiento transaccional ACID en PostgreSQL.
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          10 Tablas · 5 Esquemas
        </span>
      </div>

      {/* Relationships banner */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
        <span className="font-bold text-slate-900 flex items-center gap-1.5">
          <LinkIcon className="w-3.5 h-3.5 text-emerald-600" />
          <span>Cardinalidades y Relaciones Clave del Negocio:</span>
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 font-mono text-[11px] text-slate-600">
          <div className="p-2 bg-white rounded border border-slate-200">
            <strong>USUARIO ↔ ROL:</strong> 1 : 1 (Un usuario tiene exactamente un rol asignado)
          </div>
          <div className="p-2 bg-white rounded border border-slate-200">
            <strong>PROGRAMA ↔ ASIGNATURA:</strong> 1 : N (Un programa contiene múltiples asignaturas)
          </div>
          <div className="p-2 bg-white rounded border border-slate-200">
            <strong>ASIGNATURA ↔ GRUPO:</strong> 1 : N (Una asignatura se oferta en múltiples grupos)
          </div>
          <div className="p-2 bg-white rounded border border-slate-200">
            <strong>ESTUDIANTE ↔ GRUPO:</strong> N : M (A través de la tabla relacional MATRICULA)
          </div>
          <div className="p-2 bg-white rounded border border-slate-200">
            <strong>MATRICULA ↔ CALIFICACION:</strong> 1 : 1 (Cada matrícula tiene su registro de notas)
          </div>
          <div className="p-2 bg-white rounded border border-slate-200">
            <strong>AUDITORIA:</strong> Inmutable (Sin llaves foráneas en cascada restrictivas)
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((tbl) => {
          const isSelected = selectedTable === tbl.name;
          return (
            <div
              key={tbl.name}
              onClick={() => setSelectedTable(tbl.name)}
              className={`rounded-xl border overflow-hidden cursor-pointer transition-all ${
                isSelected
                  ? 'border-emerald-600 ring-2 ring-emerald-500/30 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold block">
                    {tbl.schema}.
                  </span>
                  <h4 className="text-sm font-bold tracking-wide font-mono">{tbl.name}</h4>
                </div>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                  {tbl.fields.length} campos
                </span>
              </div>

              <div className="p-3 bg-slate-50/50 text-[11px] text-slate-600 border-b border-slate-100">
                {tbl.description}
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {tbl.fields.map((f, i) => (
                  <div key={i} className="px-3 py-1.5 flex items-center justify-between hover:bg-slate-50 font-mono">
                    <div className="flex items-center gap-1.5">
                      {f.isPk && (
                        <span title="Primary Key">
                          <Key className="w-3 h-3 text-amber-500" />
                        </span>
                      )}
                      {f.isFk && (
                        <span title={`Foreign Key -> ${f.fkRef}`}>
                          <LinkIcon className="w-3 h-3 text-blue-500" />
                        </span>
                      )}
                      <span className={`text-[11px] ${f.isPk ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                        {f.name}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-400">
                      <span>{f.type}</span>
                      {f.description && <span className="ml-1 text-emerald-700 font-sans">({f.description})</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
