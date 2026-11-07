import React, { useState } from 'react';
import { useSga } from '../context/SgaContext';
import { useTheme } from '../context/ThemeContext';
import { RoleType } from '../types/sga';
import {
  GraduationCap,
  Layers,
  Cpu,
  FileText,
  RotateCcw,
  Shield,
  UserCheck,
  BookOpen,
  User as UserIcon,
  Server,
  Palette,
  Table,
  Calendar,
  LogIn,
  LogOut,
  UserPlus,
  KeyRound,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentUser,
    currentPersona,
    quickSwitchRole,
    resetDatabase,
    openLoginModal,
    openRegisterModal,
    openScheduleModal,
    openEnrollModal,
    logout
  } = useSga();

  const { currentTheme, setIsColorModalOpen } = useTheme();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const roles: { role: RoleType; label: string; icon: React.ReactNode }[] = [
    { role: 'ADMINISTRADOR', label: 'Admin', icon: <Shield className="w-3.5 h-3.5" /> },
    { role: 'COORDINADOR', label: 'Coordinador', icon: <Layers className="w-3.5 h-3.5" /> },
    { role: 'DOCENTE', label: 'Docente', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { role: 'ESTUDIANTE', label: 'Estudiante', icon: <UserCheck className="w-3.5 h-3.5" /> }
  ];

  return (
    <header
      className="sticky top-0 z-40 border-b text-white shadow-md transition-colors duration-200"
      style={{
        backgroundColor: currentTheme.headerBg,
        borderColor: currentTheme.headerBorder
      }}
    >
      {/* Top micro-bar: Institutional CUN accreditation and subject details */}
      <div
        className="px-4 py-1.5 border-b flex flex-wrap items-center justify-between text-xs transition-colors duration-200"
        style={{
          backgroundColor: currentTheme.headerSubBar,
          borderColor: currentTheme.headerBorder
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="font-bold tracking-wide"
            style={{ color: currentTheme.accent }}
          >
            CUN
          </span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span className="text-slate-200">Corporación Unificada Nacional de Educación Superior</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span className="text-slate-300">Ingeniería de Sistemas (Modalidad Virtual)</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-200 font-medium">Asignatura: Arquitectura de Software</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span className="text-slate-400">Semanas 3, 4, 5 y 6</span>
        </div>
      </div>

      {/* Main navigation toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & system identification */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm ring-1 ring-white/20 transition-colors duration-200"
            style={{ backgroundColor: currentTheme.primary }}
          >
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white">SGA CUN</span>
              <span
                className="text-xs font-mono font-semibold px-2 py-0.5 rounded border transition-colors duration-200"
                style={{
                  backgroundColor: currentTheme.badgeBg,
                  color: currentTheme.badgeText,
                  borderColor: currentTheme.headerBorder
                }}
              >
                v1.0 ACID
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Sistema de Gestión Académica · Monolito Modular Desacoplado
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 bg-black/30 border border-white/10 rounded-lg backdrop-blur-xs">
          <button
            type="button"
            onClick={() => setActiveTab('workbench')}
            style={activeTab === 'workbench' ? { backgroundColor: currentTheme.primary } : {}}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'workbench'
                ? 'text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>SGA Operacional</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            style={activeTab === 'simulator' ? { backgroundColor: currentTheme.primary } : {}}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'simulator'
                ? 'text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Simulador Concurrencia</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('traceability')}
            style={activeTab === 'traceability' ? { backgroundColor: currentTheme.primary } : {}}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'traceability'
                ? 'text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Matriz Trazabilidad</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            style={activeTab === 'architecture' ? { backgroundColor: currentTheme.primary } : {}}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'architecture'
                ? 'text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Informe Arquitectura</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('report')}
            style={activeTab === 'report' ? { backgroundColor: currentTheme.primary } : {}}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'report'
                ? 'text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Documento Formal</span>
          </button>
        </div>

        {/* Right tools: Color Switcher, Enrollment & Schedule shortcuts, Auth/User, RBAC Role quick switcher */}
        <div className="flex items-center gap-2">
          {/* Quick Action: Matrícula en Línea */}
          <button
            type="button"
            onClick={openEnrollModal}
            title="Abrir módulo de matrícula académica (RF-07)"
            style={{ backgroundColor: currentTheme.primary }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-white rounded-lg hover:opacity-90 transition-all shadow-xs"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Matricular</span>
          </button>

          {/* Quick Action: Horarios */}
          <button
            type="button"
            onClick={openScheduleModal}
            title="Abrir gestión de grupos y horarios semanales (RF-05, RF-06)"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border border-white/20 hover:bg-white/10 text-white transition-all shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Horarios</span>
          </button>

          {/* Quick Theme Color Adjustment Button */}
          <button
            type="button"
            onClick={() => setIsColorModalOpen(true)}
            title="Ajustar colores de la aplicación (Personalizar paleta CUN)"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg transition-all border border-white/20 hover:bg-white/10 shadow-xs"
          >
            <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
            <span className="font-semibold text-slate-100 hidden xl:inline">Colores</span>
            <span
              className="w-2.5 h-2.5 rounded-full ring-1 ring-white/60 ml-0.5"
              style={{ backgroundColor: currentTheme.primary }}
              title={`Color activo: ${currentTheme.name}`}
            />
          </button>

          {/* Quick role switcher */}
          <div className="hidden lg:flex items-center gap-1 text-xs">
            <span className="text-slate-400 text-[11px] mr-0.5 hidden 2xl:inline">Rol:</span>
            {roles.map((r) => {
              const isCurrent = currentUser.id_rol === r.role;
              return (
                <button
                  key={r.role}
                  type="button"
                  title={`Cambiar vista al rol ${r.label}`}
                  onClick={() => quickSwitchRole(r.role)}
                  className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors ${
                    isCurrent
                      ? 'bg-white/20 text-white font-semibold border border-white/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {r.icon}
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Account / Auth Dropdown */}
          <div className="relative pl-1.5 border-l border-white/20">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 transition-colors text-left"
              title="Opciones de Cuenta y Autenticación"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold border border-white/20 shadow-xs"
                style={{ backgroundColor: currentTheme.primary }}
              >
                <UserIcon className="w-3.5 h-3.5" />
              </div>
              <div className="hidden sm:block text-left text-xs leading-tight">
                <p className="font-semibold text-white max-w-[110px] truncate">
                  {currentPersona.nombres.split(' ')[0]} {currentPersona.apellidos.split(' ')[0]}
                </p>
                <p className="text-[10px] font-mono text-slate-300">
                  {currentUser.id_rol}
                </p>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-300" />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xl py-2 z-50 animate-in fade-in duration-150"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {currentPersona.nombres} {currentPersona.apellidos}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 truncate">
                    {currentUser.email}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {currentUser.id_rol}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium">● Sesión Activa</span>
                  </div>
                </div>

                <div className="py-1 text-xs">
                  <button
                    type="button"
                    onClick={() => openLoginModal()}
                    className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5 text-blue-600" />
                    <span>Iniciar Sesión / Cambiar Cuenta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openRegisterModal()}
                    className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Registrar Nuevo Usuario</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openEnrollModal()}
                    className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Matrícula en Línea (RF-07)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openScheduleModal()}
                    className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-purple-600" />
                    <span>Gestión y Cronograma de Horarios</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reset button */}
          <button
            type="button"
            onClick={resetDatabase}
            title="Restablecer datos originales de la prueba"
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/10 rounded transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
