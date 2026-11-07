import React, { useState } from 'react';
import { ComponentDiagram } from './ComponentDiagram';
import { DeploymentDiagram } from './DeploymentDiagram';
import { DataModelDiagram } from './DataModelDiagram';
import { SequenceDiagram } from './SequenceDiagram';
import { TraceabilityMatrix } from './TraceabilityMatrix';
import { AiStudioEvidence } from './AiStudioEvidence';
import { ADR_DATA } from '../../data/mockDatabase';
import {
  BookOpen,
  Layers,
  Server,
  Database,
  ShieldAlert,
  GitBranch,
  Sparkles,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    'resumen' | 'requerimientos' | 'justificacion' | 'modelos' | 'trazabilidad' | 'spof_adr' | 'ai_evidence' | 'conclusiones'
  >('resumen');

  const [activeModelTab, setActiveModelTab] = useState<
    'componentes' | 'despliegue' | 'datos' | 'secuencia' | 'casos_uso'
  >('componentes');

  return (
    <div className="space-y-6">
      {/* Top navigation ribbon for the 8 major architecture topics */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-sm flex flex-wrap items-center gap-1">
        <button
          onClick={() => setActiveSection('resumen')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'resumen'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          1-3. Contexto & Objetivos
        </button>

        <button
          onClick={() => setActiveSection('requerimientos')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'requerimientos'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          4. Requerimientos (RF/RNF)
        </button>

        <button
          onClick={() => setActiveSection('justificacion')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'justificacion'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          5. Justificación de Estilo
        </button>

        <button
          onClick={() => setActiveSection('modelos')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'modelos'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          6. Modelos de Arquitectura
        </button>

        <button
          onClick={() => setActiveSection('trazabilidad')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'trazabilidad'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          7. Matriz Trazabilidad
        </button>

        <button
          onClick={() => setActiveSection('spof_adr')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'spof_adr'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          8. SPOF & Decisiones (ADR)
        </button>

        <button
          onClick={() => setActiveSection('ai_evidence')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'ai_evidence'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          9. Evidencia AI Studio
        </button>

        <button
          onClick={() => setActiveSection('conclusiones')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'conclusiones'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          10-11. Conclusiones & APA
        </button>
      </div>

      {/* SECTION 1 - 3: CONTEXTO, PROBLEMA, OBJETIVOS Y ALCANCE */}
      {activeSection === 'resumen' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-emerald-700 font-semibold">CUN · Ingeniería de Sistemas</span>
              <span aria-hidden="true">·</span>
              <span>Arquitectura de Software (Semanas 3, 4, 5 y 6)</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              1. Introducción y Descripción del Problema Operacional
            </h1>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              Las instituciones de educación superior enfrentan el reto constante de garantizar la integridad, disponibilidad y trazabilidad de sus operaciones académicas. En el caso analizado para la <strong>Corporación Unificada Nacional de Educación Superior (CUN)</strong>, la gestión histórica se apoya en archivos locales y aplicaciones desacopladas, lo que origina duplicidad de registros, inconsistencias en matrículas, lentitud en consultas y falta de pistas de auditoría verificables.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              Este informe presenta la propuesta arquitectónica de un <strong>Sistema de Gestión Académica (SGA)</strong> centralizado, robusto, escalable y accesible vía navegadores web, diseñado para resolver estas deficiencias operacionales bajo estándares rigurosos de ingeniería de software y con el apoyo crítico de herramientas de inteligencia artificial generativa (Google AI Studio).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>2. Objetivos del Proyecto</span>
              </h2>
              <div className="space-y-2 text-xs text-slate-700">
                <p className="font-semibold text-slate-900">2.1. Objetivo General:</p>
                <p className="leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200/70">
                  Diseñar y modelar la arquitectura de software para un Sistema de Gestión Académica (SGA) a partir del análisis riguroso de requerimientos funcionales y no funcionales, validando las decisiones técnicas mediante el uso crítico de Google AI Studio.
                </p>
                <p className="font-semibold text-slate-900 pt-2">2.2. Objetivos Específicos:</p>
                <ul className="space-y-1 list-disc pl-4 leading-relaxed text-slate-600">
                  <li>Especificar y clasificar los requerimientos funcionales (RF) y no funcionales (RNF).</li>
                  <li>Seleccionar y justificar un estilo arquitectónico óptimo evaluando atributos de calidad como rendimiento, mantenibilidad, consistencia e integridad transaccional.</li>
                  <li>Diseñar los modelos del sistema (casos de uso, componentes lógicos, despliegue físico, modelo de datos conceptual y secuencias críticas).</li>
                  <li>Establecer la matriz de trazabilidad y analizar riesgos técnicos, puntos únicos de falla (SPOF) y registros de decisiones arquitectónicas (ADR).</li>
                  <li>Documentar la interacción técnica con Google AI Studio, evidenciando análisis crítico frente a las sugerencias del modelo.</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>3. Alcance, Actores, Supuestos y Restricciones</span>
              </h2>
              <div className="space-y-3 text-xs text-slate-700">
                <div>
                  <strong className="text-slate-900">3.1. Alcance:</strong>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    Centraliza la administración de usuarios, programas académicos, mallas curriculares, grupos, asignación docente, matrículas en línea, registro de calificaciones, emisión de reportes y pistas de auditoría inmutables. No incluye pasarela de pagos ni integración externa LMS en esta primera fase.
                  </p>
                </div>
                <div>
                  <strong className="text-slate-900">3.2. Actores del Sistema (RBAC):</strong>
                  <div className="grid grid-cols-2 gap-2 mt-1 font-mono text-[11px]">
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                      <strong>Administrador:</strong> Parametrización y auditoría global.
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                      <strong>Coordinador:</strong> Catálogo, periodos, cupos y reportes.
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                      <strong>Docente:</strong> Listas de clase y notas por cortes.
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                      <strong>Estudiante:</strong> Matrícula, horario y calificaciones.
                    </div>
                  </div>
                </div>
                <div>
                  <strong className="text-slate-900">3.3. Supuestos & Restricciones:</strong>
                  <p className="text-slate-600 mt-0.5">
                    Concurrencia nominal pico de 300 usuarios concurrentes. Acceso exclusivamente mediante navegador web moderno con HTTPS / TLS 1.3. Base de datos relacional con cumplimiento ACID estricto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: REQUERIMIENTOS FUNCIONALES Y NO FUNCIONALES */}
      {activeSection === 'requerimientos' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h1 className="text-xl font-bold text-slate-900">
              4. Análisis y Clasificación de Requerimientos
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Catálogo de 12 Requerimientos Funcionales (RF) y 12 Requerimientos No Funcionales (RNF) que gobiernan las decisiones de diseño arquitectónico.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Functional Requirements */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>4.1. Requerimientos Funcionales (RF-01 al RF-12)</span>
                </h2>
                <span className="text-xs font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  12 Requerimientos
                </span>
              </div>

              <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
                {[
                  { id: 'RF-01', title: 'Autenticación', desc: 'Inicio y cierre de sesión seguro mediante credenciales individuales.' },
                  { id: 'RF-02', title: 'Roles y permisos (RBAC)', desc: 'Control de acceso granular basado en 4 roles: Administrador, Coordinador, Docente, Estudiante.' },
                  { id: 'RF-03', title: 'Gestión de estudiantes', desc: 'Registro, consulta, edición y desactivación lógica de estudiantes.' },
                  { id: 'RF-04', title: 'Gestión de docentes', desc: 'Registro, consulta, parametrización de perfil y desactivación de docentes.' },
                  { id: 'RF-05', title: 'Programas y asignaturas', desc: 'Creación y actualización de programas académicos, mallas curriculares, códigos, créditos y niveles.' },
                  { id: 'RF-06', title: 'Grupos y periodos', desc: 'Configuración de periodos lectivos, creación de grupos con cupos máximos, horarios y docentes asignados.' },
                  { id: 'RF-07', title: 'Matrícula académica concurrente', desc: 'Inscripción de materias en grupos con validación concurrente de cupos y prevención de duplicados.' },
                  { id: 'RF-08', title: 'Registro de calificaciones', desc: 'Captura y actualización de notas por parte de docentes según los cortes autorizados (30%, 30%, 40%).' },
                  { id: 'RF-09', title: 'Consulta de resultados', desc: 'Visualización en tiempo real de horarios, materias matriculadas y notas para estudiantes.' },
                  { id: 'RF-10', title: 'Reportes consolidados', desc: 'Generación de reportes de matriculados, consolidados académicos y ocupación de grupos con filtros por periodo/programa.' },
                  { id: 'RF-11', title: 'Búsqueda y filtros multicriterio', desc: 'Búsquedas optimizadas multicriterio por identificador, nombre, programa o estado.' },
                  { id: 'RF-12', title: 'Pistas de auditoría inmutables', desc: 'Registro transaccional inmutable de eventos críticos (logins, asignación de roles, matrículas, modificación de notas).' }
                ].map((rf) => (
                  <div key={rf.id} className="p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/50 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded text-[11px]">
                        {rf.id}
                      </span>
                      <strong className="text-slate-900">{rf.title}</strong>
                    </div>
                    <p className="text-slate-600 mt-1 leading-snug">{rf.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Non-Functional Requirements */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-blue-600" />
                  <span>4.2. Requerimientos No Funcionales (RNF-01 al RNF-12)</span>
                </h2>
                <span className="text-xs font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-bold">
                  12 Atributos
                </span>
              </div>

              <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
                {[
                  { id: 'RNF-01', title: 'Seguridad', desc: 'Contraseñas hasheadas mediante Argon2id/BCrypt; comunicaciones forzadas en HTTPS con TLS 1.3.' },
                  { id: 'RNF-02', title: 'Rendimiento transaccional', desc: 'El 95% de las consultas transaccionales debe responder en menos de 3 segundos bajo carga de 300 usuarios.' },
                  { id: 'RNF-03', title: 'Disponibilidad de servicio', desc: 'Disponibilidad mensual mínima del 99.5% (máximo ~3.6 horas de indisponibilidad no programada al mes).' },
                  { id: 'RNF-04', title: 'Escalabilidad horizontal', desc: 'Capacidad de escalado horizontal de la capa de cómputo en contenedores sin reingeniería.' },
                  { id: 'RNF-05', title: 'Mantenibilidad', desc: 'Arquitectura modular con bajo acoplamiento, alta cohesión y separación clara de responsabilidades.' },
                  { id: 'RNF-06', title: 'Usabilidad y accesibilidad', desc: 'Interfaz web responsiva, contraste conforme a WCAG 2.1 AA y navegación completa por teclado.' },
                  { id: 'RNF-07', title: 'Integridad y consistencia ACID', desc: 'Bloqueos a nivel de fila y transacciones ACID en matrículas y calificaciones para evitar inconsistencias.' },
                  { id: 'RNF-08', title: 'Interoperabilidad REST', desc: 'Exposición de servicios vía API RESTful documentada bajo estándar OpenAPI 3.0 (Swagger).' },
                  { id: 'RNF-09', title: 'Respaldo y recuperación', desc: 'Backups diarios automatizados en almacenamiento en frío con RPO < 24 horas y RTO < 2 horas.' },
                  { id: 'RNF-10', title: 'Trazabilidad de requerimientos', desc: 'Mapeo bidireccional entre requerimientos, módulos, endpoints y tablas de base de datos.' },
                  { id: 'RNF-11', title: 'Privacidad y mínimo privilegio', desc: 'Restricción estricta de visibilidad de datos personales según el principio de mínimo privilegio (RBAC).' },
                  { id: 'RNF-12', title: 'Compatibilidad de navegadores', desc: 'Soporte verificado en Chrome, Firefox, Safari y Edge en sus versiones estables recientes.' }
                ].map((rnf) => (
                  <div key={rnf.id} className="p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/50 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-800 bg-blue-100/70 px-1.5 py-0.5 rounded text-[11px]">
                        {rnf.id}
                      </span>
                      <strong className="text-slate-900">{rnf.title}</strong>
                    </div>
                    <p className="text-slate-600 mt-1 leading-snug">{rnf.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: JUSTIFICACIÓN DE ESTILO ARQUITECTÓNICO */}
      {activeSection === 'justificacion' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h1 className="text-xl font-bold text-slate-900">
              5. Selección y Justificación del Estilo Arquitectónico
            </h1>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              Se seleccionó el estilo de <strong>Monolito Modular Desacoplado con Backend API REST y Frontend SPA (Single Page Application)</strong>. Esta decisión se fundamenta en un análisis riguroso de compensaciones (trade-offs) frente a las características operacionales de la CUN (300 usuarios concurrentes, criticidad de transacciones ACID en matrículas y un equipo de ingeniería eficiente).
            </p>
          </div>

          {/* Comparative Trade-off Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border-2 border-red-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-red-100">
                <h3 className="text-sm font-bold text-red-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Descarte de Microservicios Distribuidos</span>
                </h3>
                <span className="text-[10px] font-mono bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">
                  NO RECOMENDADO
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  Para una escala de <strong>300 usuarios concurrentes</strong> y 12 requerimientos funcionales, una arquitectura de microservicios introduce sobrecostos operacionales críticos:
                </p>
                <ul className="space-y-2 list-disc pl-4 text-slate-600">
                  <li>
                    <strong>Latencia de red acumulativa:</strong> Cada transacción debe saltar a través de múltiples saltos HTTP/gRPC entre microservicios, aumentando la latencia p95.
                  </li>
                  <li>
                    <strong>Quiebre de consistencia ACID (RNF-07):</strong> Bases de datos políglotas independientes exigirían transacciones distribuidas con el patrón Saga o Two-Phase Commit, o caer en consistencia eventual, arriesgando sobrecupos ilegales en matrícula.
                  </li>
                  <li>
                    <strong>Sobrecosto en DevOps:</strong> Necesidad de mantener orquestadores como Kubernetes, service mesh (Istio), registros distribuidos y brokers como Apache Kafka, encareciendo la factura en la nube en más de un 400%.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-emerald-300 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ventaja Decisiva del Monolito Modular</span>
                </h3>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  ESTILO SELECCIONADO
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  El <strong>Monolito Modular</strong> organiza todo el código en módulos de dominio lógicos e independientes (Seguridad, Catálogo, Matrículas, Calificaciones, Reportes, Auditoría), ejecutándose en un único artefacto desplegable en contenedores Docker y compartiendo una base de datos relacional PostgreSQL:
                </p>
                <ul className="space-y-2 list-disc pl-4 text-slate-600">
                  <li>
                    <strong>Soporte ACID Nativo:</strong> Permite transacciones atómicas con bloqueos a nivel de fila (<code>SELECT ... FOR UPDATE</code>) sin intermediarios ni latencias de red.
                  </li>
                  <li>
                    <strong>Bajo Acoplamiento y Alta Cohesión (RNF-05):</strong> Evita el antipatrón de "lodo de espagueti" mediante contratos estrictos de interfaz entre módulos.
                  </li>
                  <li>
                    <strong>Migración Futura Sin Fricción:</strong> Si en el futuro la institución crece a decenas de miles de usuarios, cada módulo puede extraerse limpiamente como un microservicio autónomo sin reescribir la lógica de dominio.
                  </li>
                  <li>
                    <strong>Despliegue Simple y Económico:</strong> Basta con 2 contenedores Docker detrás de NGINX con un cluster PostgreSQL para cumplir el 99.5% de disponibilidad (RNF-03).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: MODELOS DEL SISTEMA */}
      {activeSection === 'modelos' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  6. Modelos de Arquitectura del Sistema (SGA)
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Vistas y diagramas formales del sistema: Casos de Uso, Componentes Lógicos, Despliegue Físico, Modelo Conceptual y Secuencias Críticas.
                </p>
              </div>

              {/* Subtabs for Section 6 */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setActiveModelTab('componentes')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeModelTab === 'componentes' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  6.2. Componentes (Lógico)
                </button>
                <button
                  onClick={() => setActiveModelTab('despliegue')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeModelTab === 'despliegue' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  6.3. Despliegue (Físico)
                </button>
                <button
                  onClick={() => setActiveModelTab('datos')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeModelTab === 'datos' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  6.4. Modelo de Datos
                </button>
                <button
                  onClick={() => setActiveModelTab('secuencia')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeModelTab === 'secuencia' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  6.5. Secuencia Matrícula
                </button>
                <button
                  onClick={() => setActiveModelTab('casos_uso')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeModelTab === 'casos_uso' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  6.1. Casos de Uso
                </button>
              </div>
            </div>
          </div>

          {/* Model Views */}
          {activeModelTab === 'componentes' && <ComponentDiagram />}
          {activeModelTab === 'despliegue' && <DeploymentDiagram />}
          {activeModelTab === 'datos' && <DataModelDiagram />}
          {activeModelTab === 'secuencia' && <SequenceDiagram />}
          {activeModelTab === 'casos_uso' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Modelo de Casos de Uso del Sistema (Sección 6.1)</span>
              </h3>
              <p className="text-xs text-slate-600">
                Relación de los 10 Casos de Uso fundamentales (CU-01 al CU-10) con los cuatro actores institucionales.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {[
                  { actor: 'Administrador', cases: ['CU-01: Autenticar / Cerrar Sesión', 'CU-02: Gestionar Usuarios y Roles', 'CU-03: Gestionar Estudiantes y Docentes', 'CU-04: Consultar Auditoría Global'] },
                  { actor: 'Coordinador Académico', cases: ['CU-01: Autenticar / Cerrar Sesión', 'CU-05: Configurar Periodos y Grupos', 'CU-06: Gestionar Programas y Materias', 'CU-07: Generar Reportes Consolidados'] },
                  { actor: 'Docente', cases: ['CU-01: Autenticar / Cerrar Sesión', 'CU-08: Registrar y Publicar Notas por Cortes', 'Consulta de listas de clase por grupo asignado'] },
                  { actor: 'Estudiante', cases: ['CU-01: Autenticar / Cerrar Sesión', 'CU-09: Matricular Asignaturas en Línea', 'CU-10: Consultar Horarios y Calificaciones Consolidadas'] }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                    <span className="text-xs font-bold font-mono text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                      Actor: {item.actor}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700 pl-4 list-disc">
                      {item.cases.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 7: MATRIZ DE TRAZABILIDAD */}
      {activeSection === 'trazabilidad' && <TraceabilityMatrix />}

      {/* SECTION 8: SPOF & ADRS */}
      {activeSection === 'spof_adr' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h1 className="text-xl font-bold text-slate-900">
              8. Análisis Crítico, Puntos Únicos de Falla (SPOF) y Registros de Decisiones (ADR)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Mitigación de riesgos de disponibilidad y documentación inmutable de decisiones técnicas de arquitectura.
            </p>
          </div>

          {/* SPOF Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center font-mono">
                  1
                </span>
                <h3 className="text-sm font-bold text-slate-900">SPOF 1: La Base de Datos Centralizada</h3>
              </div>
              <p className="text-xs text-slate-600">
                <strong>Riesgo:</strong> Si la instancia única de base de datos falla físicamente, todo el sistema queda fuera de línea, violando el 99.5% de disponibilidad (RNF-03).
              </p>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-950 mt-2">
                <strong>Mitigación:</strong> Despliegue de un cluster PostgreSQL con una réplica Standby síncrona en una zona de disponibilidad secundaria (Multi-AZ) y mecanismo de auto-failover en menos de 60 segundos.
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center font-mono">
                  2
                </span>
                <h3 className="text-sm font-bold text-slate-900">SPOF 2: Cuello de Botella en Reserva de Cupos</h3>
              </div>
              <p className="text-xs text-slate-600">
                <strong>Riesgo:</strong> Bloqueos a nivel de tabla durante matrículas masivas provocarían saturación del pool de conexiones y timeouts.
              </p>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-950 mt-2">
                <strong>Mitigación:</strong> El bloqueo pesimista se circunscribe <strong>exclusivamente a la fila del grupo que se está matriculando</strong> (ROW-LEVEL LOCK), liberándose inmediatamente tras el commit transaccional (&lt; 50 ms).
              </div>
            </div>
          </div>

          {/* Architectural Decision Records (ADRs) */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Registros de Decisiones de Arquitectura (ADR-01, ADR-02, ADR-03)</span>
            </h2>

            <div className="space-y-4">
              {ADR_DATA.map((adr) => (
                <div key={adr.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                        {adr.id}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{adr.titulo}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                        {adr.estado}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">{adr.fecha}</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-2 text-slate-700">
                    <p>
                      <strong>Contexto: </strong>
                      <span className="text-slate-600">{adr.contexto}</span>
                    </p>
                    <p>
                      <strong>Decisión: </strong>
                      <span className="text-slate-900 font-medium">{adr.decision}</span>
                    </p>
                    <div className="pt-2">
                      <strong className="text-slate-900">Consecuencias Evaluadas:</strong>
                      <ul className="list-disc pl-4 space-y-1 text-slate-600 mt-1">
                        {adr.consecuencias.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 9: EVIDENCIAS GOOGLE AI STUDIO */}
      {activeSection === 'ai_evidence' && <AiStudioEvidence />}

      {/* SECTION 10 & 11: CONCLUSIONES, RECOMENDACIONES Y APA */}
      {activeSection === 'conclusiones' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h1 className="text-xl font-bold text-slate-900">
              10. Conclusiones y Recomendaciones Técnicas
            </h1>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed text-justify">
              <h2 className="text-sm font-bold text-slate-900">10.1. Conclusiones:</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>
                  <strong>Costo-Eficiencia y Robustez:</strong> La adopción de un Monolito Modular demostró ser la alternativa arquitectónica más costo-eficiente, mantenible y robusta para las dimensiones operativas del SGA de la institución (300 usuarios concurrentes), garantizando escalabilidad sin la sobrecarga operativa de microservicios distribuidos.
                </li>
                <li>
                  <strong>Blindaje Transaccional:</strong> La integridad de los procesos de matrícula y calificaciones queda técnicamente blindada mediante transacciones ACID y bloqueos pesimistas a nivel de registro (<code>SELECT ... FOR UPDATE</code>), resolviendo de raíz las deficiencias de duplicidad e inconsistencia preexistentes.
                </li>
                <li>
                  <strong>Rol Crítico del Arquitecto Humano ante la IA:</strong> La incorporación de Google AI Studio aceleró la generación de especificaciones técnicas y esquemas de datos; sin embargo, se evidenció que la supervisión humana experta es imprescindible para corregir sesgos hacia la sobreingeniería (como el descarte de microservicios con Kafka/MongoDB propuesto inicialmente por el modelo) y validar el cumplimiento estricto de los atributos de calidad institucionales.
                </li>
              </ul>

              <h2 className="text-sm font-bold text-slate-900 pt-3">10.2. Recomendaciones:</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>
                  Implementar pruebas de carga continuas en entornos de pre-producción utilizando herramientas como Apache JMeter o k6 antes de cada ventana de matrícula masiva.
                </li>
                <li>
                  Evaluar a mediano plazo la incorporación de un caché distribuido (Redis) exclusivamente para consultas masivas de solo lectura (como horarios y catálogo de asignaturas), reduciendo aún más la carga sobre el nodo primario de base de datos.
                </li>
              </ul>
            </div>
          </div>

          {/* References in APA 7th Edition */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>11. Referencias Bibliográficas (Formato APA 7.ª Edición)</span>
            </h2>

            <div className="space-y-2.5 text-xs text-slate-700 font-mono leading-relaxed pl-6 -indent-6">
              <p>Bass, L., Clements, P., &amp; Kazman, R. (2021). <em>Software architecture in practice</em> (4.ª ed.). Addison-Wesley Professional.</p>
              <p>Google. (2024). <em>Google AI Studio Documentation &amp; Prompt Engineering Guide</em>. Google DeepMind. https://ai.google.dev/</p>
              <p>Kleppmann, M. (2017). <em>Designing data-intensive applications: The big ideas behind reliable, scalable, and maintainable systems</em>. O'Reilly Media.</p>
              <p>Newman, S. (2021). <em>Building microservices: Designing fine-grained systems</em> (2.ª ed.). O'Reilly Media.</p>
              <p>Richards, M., &amp; Ford, N. (2020). <em>Fundamentals of software architecture: An engineering approach</em>. O'Reilly Media.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
