import React from 'react';
import { SgaProvider, useSga } from './context/SgaContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { ThemeColorModal } from './components/ThemeColorModal';
import { AdminDashboard } from './components/operational/AdminDashboard';
import { CoordinatorDashboard } from './components/operational/CoordinatorDashboard';
import { TeacherDashboard } from './components/operational/TeacherDashboard';
import { StudentDashboard } from './components/operational/StudentDashboard';
import { ConcurrencySimulator } from './components/simulator/ConcurrencySimulator';
import { TraceabilityMatrix } from './components/TraceabilityMatrix';
import { ArchitectureViewer } from './components/architecture/ArchitectureViewer';
import { ReportPrintView } from './components/architecture/ReportPrintView';
import { AuthModal } from './components/auth/AuthModal';
import { ScheduleManagerModal } from './components/academic/ScheduleManagerModal';
import { EnrollmentModal } from './components/academic/EnrollmentModal';
import { Shield, Layers, BookOpen, UserCheck, CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, currentUser, quickSwitchRole } = useSga();
  const { currentTheme } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col font-sans transition-colors duration-200"
      style={{
        backgroundColor: currentTheme.bodyBg,
        color: currentTheme.textMain
      }}
    >
      <Navbar />
      <ThemeColorModal />
      <AuthModal />
      <ScheduleManagerModal />
      <EnrollmentModal />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* If in Workbench mode, show active role indicator & quick workspace switcher */}
        {activeTab === 'workbench' && (
          <div
            className="mb-6 p-3.5 rounded-xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors duration-200"
            style={{
              backgroundColor: currentTheme.cardBg,
              borderColor: currentTheme.cardBorder
            }}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xs opacity-75 font-medium">Espacio de Trabajo Activo:</span>
              <span
                className="text-xs font-bold font-mono px-2.5 py-1 rounded shadow-xs"
                style={{
                  backgroundColor: currentTheme.primary,
                  color: currentTheme.isDark && currentTheme.id === 'modo-alto-contraste' ? '#000000' : '#ffffff'
                }}
              >
                {currentUser.id_rol}
              </span>
              <span className="text-xs opacity-70 hidden md:inline">
                · Evaluando Requerimientos Funcionales desde la perspectiva del actor
              </span>
            </div>

            {/* Quick switcher buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[11px] opacity-60 hidden lg:inline">Cambiar a:</span>
              <button
                onClick={() => quickSwitchRole('ADMINISTRADOR')}
                style={
                  currentUser.id_rol === 'ADMINISTRADOR'
                    ? {
                        backgroundColor: currentTheme.primary,
                        color: currentTheme.isDark && currentTheme.id === 'modo-alto-contraste' ? '#000000' : '#ffffff'
                      }
                    : { borderColor: currentTheme.cardBorder }
                }
                className={`px-2.5 py-1 rounded text-xs font-semibold border transition-all ${
                  currentUser.id_rol === 'ADMINISTRADOR'
                    ? 'shadow-sm'
                    : 'hover:opacity-80'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => quickSwitchRole('COORDINADOR')}
                style={
                  currentUser.id_rol === 'COORDINADOR'
                    ? {
                        backgroundColor: currentTheme.primary,
                        color: currentTheme.isDark && currentTheme.id === 'modo-alto-contraste' ? '#000000' : '#ffffff'
                      }
                    : { borderColor: currentTheme.cardBorder }
                }
                className={`px-2.5 py-1 rounded text-xs font-semibold border transition-all ${
                  currentUser.id_rol === 'COORDINADOR'
                    ? 'shadow-sm'
                    : 'hover:opacity-80'
                }`}
              >
                Coordinador
              </button>
              <button
                onClick={() => quickSwitchRole('DOCENTE')}
                style={
                  currentUser.id_rol === 'DOCENTE'
                    ? {
                        backgroundColor: currentTheme.primary,
                        color: currentTheme.isDark && currentTheme.id === 'modo-alto-contraste' ? '#000000' : '#ffffff'
                      }
                    : { borderColor: currentTheme.cardBorder }
                }
                className={`px-2.5 py-1 rounded text-xs font-semibold border transition-all ${
                  currentUser.id_rol === 'DOCENTE'
                    ? 'shadow-sm'
                    : 'hover:opacity-80'
                }`}
              >
                Docente
              </button>
              <button
                onClick={() => quickSwitchRole('ESTUDIANTE')}
                style={
                  currentUser.id_rol === 'ESTUDIANTE'
                    ? {
                        backgroundColor: currentTheme.primary,
                        color: currentTheme.isDark && currentTheme.id === 'modo-alto-contraste' ? '#000000' : '#ffffff'
                      }
                    : { borderColor: currentTheme.cardBorder }
                }
                className={`px-2.5 py-1 rounded text-xs font-semibold border transition-all ${
                  currentUser.id_rol === 'ESTUDIANTE'
                    ? 'shadow-sm'
                    : 'hover:opacity-80'
                }`}
              >
                Estudiante
              </button>
            </div>
          </div>
        )}

        {/* View Routing */}
        {activeTab === 'workbench' && (
          <>
            {currentUser.id_rol === 'ADMINISTRADOR' && <AdminDashboard />}
            {currentUser.id_rol === 'COORDINADOR' && <CoordinatorDashboard />}
            {currentUser.id_rol === 'DOCENTE' && <TeacherDashboard />}
            {currentUser.id_rol === 'ESTUDIANTE' && <StudentDashboard />}
          </>
        )}

        {activeTab === 'simulator' && <ConcurrencySimulator />}

        {activeTab === 'traceability' && <TraceabilityMatrix />}

        {activeTab === 'architecture' && <ArchitectureViewer />}

        {activeTab === 'report' && <ReportPrintView />}
      </main>

      {/* Institutional Footer */}
      <footer
        className="no-print mt-auto border-t text-slate-400 text-xs py-6 transition-colors duration-200"
        style={{
          backgroundColor: currentTheme.headerBg,
          borderColor: currentTheme.headerBorder
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-slate-200 font-semibold">
              Corporación Unificada Nacional de Educación Superior (CUN)
            </p>
            <p className="text-slate-400 text-[11px]">
              Programa de Ingeniería de Sistemas · Asignatura: Arquitectura de Software · Semanas 3, 4, 5 y 6
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>Autor: Ing. Milton Mancilla</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>milton.mancilla@cun.edu.co</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span style={{ color: currentTheme.accent }}>ACID Transaccional</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <SgaProvider>
        <AppContent />
      </SgaProvider>
    </ThemeProvider>
  );
}
