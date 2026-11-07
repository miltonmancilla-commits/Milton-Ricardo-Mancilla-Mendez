import React, { useState } from 'react';
import {
  Layers,
  Shield,
  BookOpen,
  UserCheck,
  Award,
  FileSpreadsheet,
  FileText,
  Database,
  ArrowDown,
  Lock,
  Server
} from 'lucide-react';

export const ComponentDiagram: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>('matriculas');

  const modules = [
    {
      id: 'seguridad',
      name: 'Módulo Seguridad & RBAC',
      icon: <Shield className="w-4 h-4 text-emerald-600" />,
      subcomponents: ['Auth Controller', 'Token Service (JWT)', 'Role-Based Interceptor'],
      description: 'Gestiona la autenticación de usuarios individuales (RF-01), emisión y validación de JSON Web Tokens con HMAC-SHA256 y control de acceso por roles (RF-02).',
      schema: 'seguridad (usuario, rol)'
    },
    {
      id: 'catalogo',
      name: 'Módulo Catálogo Académico',
      icon: <BookOpen className="w-4 h-4 text-blue-600" />,
      subcomponents: ['Programas Service', 'Asignaturas Controller', 'Mallas Curriculares Engine'],
      description: 'Mantenimiento del catálogo institucional de programas con código SNIES, asignaturas por semestres, créditos y prerrequisitos (RF-05).',
      schema: 'academico (programa, asignatura, periodo)'
    },
    {
      id: 'matriculas',
      name: 'Módulo Matrículas & Cupos',
      icon: <UserCheck className="w-4 h-4 text-amber-600" />,
      subcomponents: ['Enrollment Controller', 'Engine Validación Cupos', 'Pessimistic Lock Worker'],
      description: 'Ejecuta transacciones ACID de matrícula en línea bajo aislamiento Read Committed con SELECT FOR UPDATE a nivel de fila (RF-07, RNF-07).',
      schema: 'matriculas (matricula, grupo)'
    },
    {
      id: 'calificaciones',
      name: 'Módulo Calificaciones',
      icon: <Award className="w-4 h-4 text-purple-600" />,
      subcomponents: ['Grades Engine', 'Calculadora de Definitiva', 'Cierre Evaluativo Svc'],
      description: 'Captura y validación de notas por cortes (30%, 30%, 40%), recálculo instantáneo de nota definitiva y bloqueo post-cierre (RF-08).',
      schema: 'calificaciones (calificacion)'
    },
    {
      id: 'reportes',
      name: 'Módulo Reportes & Analytics',
      icon: <FileSpreadsheet className="w-4 h-4 text-indigo-600" />,
      subcomponents: ['Query Reporter', 'Consolidados Engine', 'Exportador CSV/PDF'],
      description: 'Generación de listados de estudiantes matriculados y estadísticas de ocupación dirigidas al nodo secundario Read-Only (RF-10).',
      schema: 'academico / matriculas (Vistas de solo lectura)'
    },
    {
      id: 'auditoria',
      name: 'Módulo Auditoría Transaccional',
      icon: <FileText className="w-4 h-4 text-rose-600" />,
      subcomponents: ['Audit Event Interceptor', 'Async Logger Worker', 'Integrity Checksum Calc'],
      description: 'Registro asíncrono e inmutable de eventos críticos (logins, modificaciones de notas, reservas de cupos) con IP y timestamp (RF-12, ADR-03).',
      schema: 'logs (auditoria)'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Modelo de Componentes: Vista Lógica (Sección 6.2)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Monolito Modular Desacoplado: Módulos independientes en un único contenedor y base de datos con esquemas segregados.
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          Arquitectura Monolito Modular
        </span>
      </div>

      {/* Visual Blueprint Stack */}
      <div className="space-y-4">
        {/* Tier 1: Presentation Layer */}
        <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>[CAPA 1: CLIENTE / PRESENTACIÓN]</span>
            <span className="text-emerald-400">RNF-06 · RNF-12</span>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center font-bold text-xs">
                SPA
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Frontend SPA (Single Page Application - React / Tailwind)</h4>
                <p className="text-xs text-slate-300">
                  Renderizado web responsivo accesible (WCAG AA), compatibilidad multi-navegador sin plugins cliente.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">Port 443 HTTPS / TLS 1.3</span>
          </div>
        </div>

        {/* Bus / Protocol link */}
        <div className="flex justify-center -my-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-[11px] font-mono text-slate-600 shadow-sm">
            <ArrowDown className="w-3.5 h-3.5 text-emerald-600" />
            <span>HTTPS / REST JSON + Bearer JWT (RF-01, RNF-08)</span>
          </div>
        </div>

        {/* Tier 2: Modular Application Backend */}
        <div className="p-4 bg-white rounded-xl border-2 border-emerald-600/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span className="font-bold text-emerald-800">[CAPA 2: APLICACIÓN - BACKEND MONOLÍTICO MODULAR]</span>
            <span className="text-slate-500">Docker Container (Node / Express / TypeScript)</span>
          </div>

          {/* Security Filter Gateway */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Lock className="w-4 h-4 text-emerald-600" />
              <strong className="text-slate-800">API Gateway & Security Filter:</strong>
              <span className="text-slate-600">Intercepta cabeceras Authorization, valida token JWT y filtra por claims RBAC.</span>
            </div>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
              RBAC GUARD
            </span>
          </div>

          {/* 6 Modular Domains Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {modules.map((m) => {
              const isSelected = selectedModule === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedModule(m.id)}
                  className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                      {m.icon}
                      <span>{m.name}</span>
                    </div>
                  </div>

                  <div className="space-y-1 mb-2">
                    {m.subcomponents.map((sub, i) => (
                      <div key={i} className="text-[11px] font-mono text-slate-600 flex items-center gap-1">
                        <span className="text-emerald-500">›</span>
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 pt-1.5 border-t border-slate-100">
                    Esquema: {m.schema}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed drawer for selected module */}
          {selectedModule && (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-800">
                Detalle del {modules.find((m) => m.id === selectedModule)?.name}:
              </span>
              <p className="text-slate-600">
                {modules.find((m) => m.id === selectedModule)?.description}
              </p>
            </div>
          )}
        </div>

        {/* Bus link to database */}
        <div className="flex justify-center -my-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-[11px] font-mono text-slate-600 shadow-sm">
            <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
            <span>Pool Transaccional HikariCP / pgBouncer (RNF-02, RNF-07)</span>
          </div>
        </div>

        {/* Tier 3: Persistence Layer (PostgreSQL) */}
        <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>[CAPA 3: PERSISTENCIA - POSTGRESQL 16 ENTERPRISE]</span>
            <span className="text-blue-400">ACID · Transacciones Aisladas</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
            <div className="p-2 bg-slate-800 rounded border border-slate-700">
              <Database className="w-3.5 h-3.5 mx-auto mb-1 text-emerald-400" />
              <div className="text-emerald-300 font-bold">seguridad</div>
              <div className="text-[10px] text-slate-400">usuario, rol</div>
            </div>
            <div className="p-2 bg-slate-800 rounded border border-slate-700">
              <Database className="w-3.5 h-3.5 mx-auto mb-1 text-blue-400" />
              <div className="text-blue-300 font-bold">academico</div>
              <div className="text-[10px] text-slate-400">programa, grupo</div>
            </div>
            <div className="p-2 bg-slate-800 rounded border border-slate-700">
              <Database className="w-3.5 h-3.5 mx-auto mb-1 text-amber-400" />
              <div className="text-amber-300 font-bold">matriculas</div>
              <div className="text-[10px] text-slate-400">matricula</div>
            </div>
            <div className="p-2 bg-slate-800 rounded border border-slate-700">
              <Database className="w-3.5 h-3.5 mx-auto mb-1 text-purple-400" />
              <div className="text-purple-300 font-bold">calificaciones</div>
              <div className="text-[10px] text-slate-400">calificacion</div>
            </div>
            <div className="p-2 bg-slate-800 rounded border border-slate-700">
              <Database className="w-3.5 h-3.5 mx-auto mb-1 text-rose-400" />
              <div className="text-rose-300 font-bold">logs</div>
              <div className="text-[10px] text-slate-400">auditoria</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
