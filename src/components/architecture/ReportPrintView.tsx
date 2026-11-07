import React from 'react';
import { Printer, Download, GraduationCap, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useSga } from '../../context/SgaContext';
import { REQUIREMENTS_DATA, ADR_DATA, AI_STUDIO_INTERACTIONS } from '../../data/mockDatabase';

export const ReportPrintView: React.FC = () => {
  const { setActiveTab } = useSga();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action toolbar (hidden during print) */}
      <div className="no-print bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('workbench')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al SGA Operacional</span>
          </button>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Vista de Impresión Oficial y Exportación en Formato PDF
            </h2>
            <p className="text-xs text-slate-500">
              Documento formal estructurado conforme a los requerimientos de la asignatura Arquitectura de Software CUN.
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir / Exportar a PDF</span>
        </button>
      </div>

      {/* Printable Sheet (Standard A4 / Executive styling) */}
      <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-md max-w-4xl mx-auto text-slate-900 text-xs leading-relaxed space-y-8 font-sans print:border-none print:shadow-none print:p-0">
        {/* Institutional Header */}
        <div className="border-b-2 border-theme-primary pb-6 text-center space-y-1.5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded bg-theme-primary text-white flex items-center justify-center font-bold text-sm">
              CUN
            </div>
            <span className="text-sm font-bold tracking-wider text-slate-900 uppercase">
              Corporación Unificada Nacional de Educación Superior
            </span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-slate-900 uppercase tracking-tight">
            INFORME TÉCNICO DE ARQUITECTURA DE SOFTWARE:<br />SISTEMA DE GESTIÓN ACADÉMICA (SGA)
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            Programa: <strong>Ingeniería de Sistemas / Educación Virtual</strong> · Asignatura: <strong>Arquitectura de Software (Semanas 3, 4, 5 y 6)</strong>
          </p>
          <p className="text-xs text-slate-500">
            Actividad: <strong>Diseño y modelado de la arquitectura de un SGA mediante Google AI Studio</strong>
          </p>
          <p className="text-[11px] text-slate-400 font-mono pt-1">
            Fecha de Presentación: Octubre 2026 · Bogotá D.C., Colombia
          </p>
        </div>

        {/* 1. INTRODUCCIÓN */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-emerald-900 uppercase border-b border-slate-200 pb-1">
            1. INTRODUCCIÓN Y DESCRIPCIÓN DEL PROBLEMA
          </h2>
          <p className="text-justify text-slate-800">
            Las instituciones de educación superior enfrentan el reto constante de garantizar la integridad, disponibilidad y trazabilidad de sus operaciones académicas. En el caso analizado, la gestión actual se apoya en archivos locales y aplicaciones desacopladas, lo que origina duplicidad de registros, inconsistencias en matrículas, lentitud en consultas y falta de pistas de auditoría.
          </p>
          <p className="text-justify text-slate-800">
            Este informe presenta la propuesta arquitectónica de un Sistema de Gestión Académica (SGA) centralizado, robusto, escalable y accesible vía navegadores web, diseñado para resolver estas deficiencias operacionales bajo estándares rigurosos de ingeniería de software y con el apoyo crítico de herramientas de inteligencia artificial generativa (Google AI Studio).
          </p>
        </section>

        {/* 2. OBJETIVOS */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-emerald-900 uppercase border-b border-slate-200 pb-1">
            2. OBJETIVOS
          </h2>
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900">2.1. Objetivo General</h3>
            <p className="text-justify text-slate-800">
              Diseñar y modelar la arquitectura de software para un Sistema de Gestión Académica (SGA) a partir del análisis riguroso de requerimientos funcionales y no funcionales, validando las decisiones técnicas mediante el uso crítico de Google AI Studio.
            </p>
            <h3 className="font-bold text-slate-900 pt-1">2.2. Objetivos Específicos</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-800">
              <li>Especificar y clasificar los requerimientos funcionales (RF) y no funcionales (RNF) del sistema.</li>
              <li>Seleccionar y justificar un estilo arquitectónico óptimo evaluando atributos de calidad como rendimiento, mantenibilidad, consistencia e integridad transaccional.</li>
              <li>Diseñar los modelos del sistema (casos de uso, componentes lógicos, despliegue físico, modelo de datos conceptual y secuencias críticas).</li>
              <li>Establecer la matriz de trazabilidad y analizar riesgos técnicos, puntos únicos de falla (SPOF) y registros de decisiones arquitectónicas (ADR).</li>
              <li>Documentar la interacción técnica con Google AI Studio, evidenciando análisis crítico frente a las sugerencias del modelo.</li>
            </ul>
          </div>
        </section>

        {/* 3. ALCANCE Y ACTORES */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-emerald-900 uppercase border-b border-slate-200 pb-1">
            3. ALCANCE, ACTORES, SUPUESTOS Y RESTRICCIONES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-800">
            <div>
              <h3 className="font-bold text-slate-900">3.1. Alcance:</h3>
              <p className="text-justify">
                Administración de usuarios, programas académicos, mallas curriculares, grupos, asignación docente, matrículas en línea, registro de calificaciones, emisión de reportes y pistas de auditoría inmutables. No incluye pasarela de pagos ni integración con LMS externas en esta fase.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">3.2. Actores del Sistema (RBAC):</h3>
              <ul className="list-disc pl-4 space-y-0.5">
                <li><strong>Administrador:</strong> Parametrización global y auditoría.</li>
                <li><strong>Coordinador:</strong> Catálogo, periodos, cupos y reportes.</li>
                <li><strong>Docente:</strong> Asignaturas y notas por cortes.</li>
                <li><strong>Estudiante:</strong> Matrícula en línea y notas.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. REQUERIMIENTOS */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-emerald-900 uppercase border-b border-slate-200 pb-1">
            4. ANÁLISIS DE REQUERIMIENTOS (RF y RNF)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900">4.1. Requerimientos Funcionales:</h3>
              <ol className="list-decimal pl-4 space-y-0.5 text-[11px] text-slate-700">
                <li><strong>RF-01:</strong> Autenticación individual segura.</li>
                <li><strong>RF-02:</strong> Roles y permisos RBAC granular.</li>
                <li><strong>RF-03:</strong> Gestión de estudiantes (CRUD y estado).</li>
                <li><strong>RF-04:</strong> Gestión de docentes y carga horaria.</li>
                <li><strong>RF-05:</strong> Programas, asignaturas y códigos SNIES.</li>
                <li><strong>RF-06:</strong> Grupos, periodos y cupos máximos.</li>
                <li><strong>RF-07:</strong> Matrícula académica concurrente ACID.</li>
                <li><strong>RF-08:</strong> Registro de notas por cortes (30/30/40).</li>
                <li><strong>RF-09:</strong> Consulta de resultados y horarios en vivo.</li>
                <li><strong>RF-10:</strong> Reportes consolidados exportables.</li>
                <li><strong>RF-11:</strong> Búsqueda y filtros multicriterio.</li>
                <li><strong>RF-12:</strong> Pistas de auditoría inmutables.</li>
              </ol>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900">4.2. Requerimientos No Funcionales:</h3>
              <ol className="list-decimal pl-4 space-y-0.5 text-[11px] text-slate-700">
                <li><strong>RNF-01:</strong> Seguridad (Argon2id, TLS 1.3, JWT).</li>
                <li><strong>RNF-02:</strong> Rendimiento (p95 &lt; 3s bajo 300 usuarios).</li>
                <li><strong>RNF-03:</strong> Disponibilidad mensual &gt;= 99.5%.</li>
                <li><strong>RNF-04:</strong> Escalabilidad horizontal en Docker.</li>
                <li><strong>RNF-05:</strong> Mantenibilidad (bajo acoplamiento).</li>
                <li><strong>RNF-06:</strong> Usabilidad y accesibilidad WCAG AA.</li>
                <li><strong>RNF-07:</strong> Integridad y consistencia ACID con Row Lock.</li>
                <li><strong>RNF-08:</strong> Interoperabilidad REST (OpenAPI 3.0).</li>
                <li><strong>RNF-09:</strong> Respaldo RPO &lt; 24h y RTO &lt; 2h.</li>
                <li><strong>RNF-10:</strong> Trazabilidad bidireccional completa.</li>
                <li><strong>RNF-11:</strong> Privacidad y principio de mínimo privilegio.</li>
                <li><strong>RNF-12:</strong> Compatibilidad multiplataforma web.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* 5. SELECCIÓN DE ARQUITECTURA */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-emerald-900 uppercase border-b border-slate-200 pb-1">
            5. SELECCIÓN Y JUSTIFICACIÓN DE LA ARQUITECTURA
          </h2>
          <p className="text-justify text-slate-800">
            Se seleccionó el estilo de <strong>Monolito Modular Desacoplado con Backend API REST y Frontend SPA</strong>.
          </p>
          <p className="text-justify text-slate-800">
            <strong>Frente a Microservicios:</strong> Para una concurrencia nominal de 300 usuarios, microservicios genera una latencia de red innecesaria y quebranta el requerimiento de integridad ACID (RNF-07) al requerir bases de datos distribuidas con consistencia eventual o patrones complejos como Saga. El Monolito Modular garantiza transacciones atómicas directas con PostgreSQL eliminando latencias internas.
          </p>
          <p className="text-justify text-slate-800">
            <strong>Frente a Arquitectura Tradicional no modular:</strong> El monolito modular evita el espagueti arquitectónico forzando que los dominios interactúen exclusivamente a través de contratos de interfaz, permitiendo migrar a microservicios en el futuro si la escala así lo demandara.
          </p>
        </section>

        {/* 6. MODELOS DEL SISTEMA */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-emerald-900 uppercase border-b border-slate-200 pb-1">
            6. MODELOS DEL SISTEMA
          </h2>

          <h3 className="font-bold text-slate-900 text-xs">6.2. Vista Lógica de Componentes:</h3>
          <pre className="p-3 bg-slate-50 border border-slate-200 rounded text-[10px] font-mono leading-tight">
{`+-----------------------------------------------------------------------------------+
|                          CAPA DE PRESENTACIÓN (CLIENTE)                           |
|       SPA Web (React / TypeScript / Tailwind) - Renderizado Responsivo (RNF-06)   |
+-----------------------------------------------------------------------------------+
                                         | HTTPS / REST (JSON) + Bearer JWT (RNF-01)
                                         v
+-----------------------------------------------------------------------------------+
|                       CAPA DE APLICACIÓN (BACKEND MODULAR)                        |
|  [ API GATEWAY / SECURITY FILTER ] -> Intercepta tokens JWT y valida RBAC         |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|  |   MÓDULO SEGURIDAD |  |  MÓDULO CATÁLOGO   |  |     MÓDULO MATRÍCULAS       |  |
|  | - Auth Controller  |  | - Programas Svc    |  | - Engine Validación Cupos   |  |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|  | MÓDULO CALIFICAC.  |  |  MÓDULO REPORTES   |  |      MÓDULO AUDITORÍA       |  |
|  | - Grades Engine    |  | - Query Reporter   |  | - Audit Event Interceptor   |  |
|  +--------------------+  +--------------------+  +-----------------------------+  |
+-----------------------------------------------------------------------------------+
                                         | Pool Transaccional (HikariCP)
                                         v
+-----------------------------------------------------------------------------------+
|                         CAPA DE PERSISTENCIA (POSTGRESQL)                         |
|   Esquemas: [seguridad] | [academico] | [matriculas] | [calificaciones] | [logs]  |
+-----------------------------------------------------------------------------------+`}
          </pre>

          <h3 className="font-bold text-slate-900 text-xs pt-2">6.5. Secuencia Crítica: Bloqueo Pesimista en Matrícula:</h3>
          <pre className="p-3 bg-slate-50 border border-slate-200 rounded text-[10px] font-mono leading-tight">
{`Estudiante           SPA Client          MatriculaService        PostgreSQL Database
    |                    |                      |                        |
    |-- 1. Matricular materia ----------------->|                        |
    |                    |-- 2. POST /api/v1/enrollments (JWT) --------->|
    |                    |                      |-- 3. BEGIN TRANSACTION |
    |                    |                      |-- 4. SELECT * FOR UPDATE ------>| (Row Lock)
    |                    |                      |<-- 5. Retorna fila ----|
    |                    |                      |-- 6. Valida cupo < max |
    |                    |                      |-- 7. INSERT matricula  |
    |                    |                      |-- 8. UPDATE cupo + 1   |
    |                    |                      |-- 9. INSERT auditoria  |
    |                    |                      |-- 10. COMMIT --------->| (Libera lock)
    |                    |<-- 11. 201 Created --|
    |<-- 12. Confirmación visual ---------------|`}
          </pre>
        </section>

        {/* 8. ADRs */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-emerald-900 uppercase border-b border-slate-200 pb-1">
            8. REGISTROS DE DECISIONES DE ARQUITECTURA (ADR)
          </h2>
          <div className="space-y-2 text-[11px]">
            {ADR_DATA.map((adr) => (
              <div key={adr.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <span className="font-bold font-mono text-slate-900">{adr.id}: {adr.titulo}</span>
                <p className="text-slate-700 mt-0.5"><strong>Decisión:</strong> {adr.decision}</p>
                <p className="text-slate-600 mt-0.5"><strong>Justificación:</strong> {adr.justificacion}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. AI STUDIO EVIDENCE */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-emerald-900 uppercase border-b border-slate-200 pb-1">
            9. EVIDENCIAS DEL USO CRÍTICO DE GOOGLE AI STUDIO
          </h2>
          <div className="space-y-2 text-[11px]">
            <div className="p-2.5 bg-amber-50/60 border border-amber-200 rounded">
              <span className="font-bold text-amber-950">Interacción 1: Propuesta de Microservicios rechazada y corregida</span>
              <p className="text-slate-700 mt-0.5">
                Google AI Studio sugirió microservicios políglotas con MongoDB y Kafka. El equipo humano rechazó la propuesta debido a la sobreingeniería y al riesgo de sobrecupo generado por la consistencia eventual, forzando la redirección hacia un Monolito Modular con PostgreSQL.
              </p>
            </div>
            <div className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded">
              <span className="font-bold text-emerald-950">Interacción 2: Concurrencia pesimista con SELECT FOR UPDATE aceptada</span>
              <p className="text-slate-700 mt-0.5">
                Google AI Studio modeló el aislamiento READ COMMITTED con SELECT FOR UPDATE a nivel de fila, solución técnicamente óptima que previene race conditions sin la sobrecarga de SERIALIZABLE.
              </p>
            </div>
          </div>
        </section>

        {/* 10. CONCLUSIONES */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-emerald-900 uppercase border-b border-slate-200 pb-1">
            10. CONCLUSIONES Y RECOMENDACIONES
          </h2>
          <p className="text-justify text-slate-800">
            La adopción del Monolito Modular demostró ser la alternativa más costo-eficiente y mantenible para la CUN, asegurando consistencia transaccional absoluta mediante bloqueos pesimistas a nivel de registro. La interacción con Google AI Studio aceleró el desarrollo pero ratificó la necesidad insustituible del criterio técnico del arquitecto humano para evitar la sobreingeniería.
          </p>
        </section>

        {/* 11. REFERENCIAS APA */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-emerald-900 uppercase border-b border-slate-200 pb-1">
            11. REFERENCIAS BIBLIOGRÁFICAS (APA 7.ª EDICIÓN)
          </h2>
          <div className="space-y-1 text-[11px] font-mono text-slate-600 pl-4 -indent-4">
            <p>Bass, L., Clements, P., &amp; Kazman, R. (2021). <em>Software architecture in practice</em> (4.ª ed.). Addison-Wesley Professional.</p>
            <p>Google. (2024). <em>Google AI Studio Documentation &amp; Prompt Engineering Guide</em>. Google DeepMind. https://ai.google.dev/</p>
            <p>Kleppmann, M. (2017). <em>Designing data-intensive applications</em>. O'Reilly Media.</p>
            <p>Newman, S. (2021). <em>Building microservices: Designing fine-grained systems</em> (2.ª ed.). O'Reilly Media.</p>
            <p>Richards, M., &amp; Ford, N. (2020). <em>Fundamentals of software architecture</em>. O'Reilly Media.</p>
          </div>
        </section>

        {/* Signature Box */}
        <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
          <div>
            <div className="w-48 mx-auto border-b border-slate-400 pb-1 font-semibold text-slate-800">
              Ing. Milton Mancilla
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Estudiante / Arquitecto de Software
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              milton.mancilla@cun.edu.co
            </p>
          </div>
          <div>
            <div className="w-48 mx-auto border-b border-slate-400 pb-1 font-semibold text-slate-800">
              Docente Evaluador CUN
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Programa Ingeniería de Sistemas
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              Arquitectura de Software - 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
