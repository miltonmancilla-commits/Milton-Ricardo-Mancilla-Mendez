import React, { useState } from 'react';
import { useSga } from '../../context/SgaContext';
import { useTheme } from '../../context/ThemeContext';
import { RoleType } from '../../types/sga';
import {
  Lock,
  User as UserIcon,
  Mail,
  Shield,
  Eye,
  EyeOff,
  X,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  GraduationCap,
  Sparkles,
  BookOpen,
  Layers,
  UserCheck
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    registerUser,
    usuarios,
    personas
  } = useSga();

  const { currentTheme } = useTheme();

  // Login form state
  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState<{ text: string; error?: boolean } | null>(null);

  // Register form state
  const [regNombres, setRegNombres] = useState('');
  const [regApellidos, setRegApellidos] = useState('');
  const [regDocumento, setRegDocumento] = useState('');
  const [regTelefono, setRegTelefono] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRol, setRegRol] = useState<RoleType>('ESTUDIANTE');
  const [regCodigo, setRegCodigo] = useState('');
  const [regEspecialidad, setRegEspecialidad] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [registerFeedback, setRegisterFeedback] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isAuthModalOpen) return null;

  // Quick autofill demo accounts
  const demoAccounts = [
    {
      label: 'Administrador',
      user: 'milton.mancilla',
      pass: 'admin123',
      role: 'ADMINISTRADOR',
      icon: <Shield className="w-3.5 h-3.5 text-indigo-500" />
    },
    {
      label: 'Coordinador',
      user: 'claudia.coordinacion',
      pass: 'coord123',
      role: 'COORDINADOR',
      icon: <Layers className="w-3.5 h-3.5 text-blue-500" />
    },
    {
      label: 'Docente',
      user: 'prof.milton',
      pass: 'docente123',
      role: 'DOCENTE',
      icon: <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
    },
    {
      label: 'Estudiante',
      user: 'carlos.restrepo',
      pass: 'estudiante123',
      role: 'ESTUDIANTE',
      icon: <UserCheck className="w-3.5 h-3.5 text-purple-500" />
    }
  ];

  const handleDemoFill = (user: string, pass: string) => {
    setLoginInput(user);
    setLoginPassword(pass);
    setLoginFeedback(null);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInput.trim() || !loginPassword) {
      setLoginFeedback({ text: 'Por favor complete todos los campos.', error: true });
      return;
    }

    const res = login(loginInput, loginPassword);
    if (!res.success) {
      setLoginFeedback({ text: res.message, error: true });
    } else {
      setLoginFeedback({ text: res.message, error: false });
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setLoginFeedback(null);
      }, 500);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterFeedback(null);

    if (regPassword !== regConfirmPassword) {
      setRegisterFeedback({ text: 'Las contraseñas ingresadas no coinciden.', error: true });
      return;
    }

    if (regPassword.length < 5) {
      setRegisterFeedback({ text: 'La contraseña debe tener al menos 5 caracteres.', error: true });
      return;
    }

    const res = registerUser({
      nombres: regNombres,
      apellidos: regApellidos,
      documento: regDocumento,
      telefono: regTelefono,
      email: regEmail,
      username: regUsername,
      password: regPassword,
      id_rol: regRol,
      codigo_estudiantil: regRol === 'ESTUDIANTE' ? regCodigo : undefined,
      especialidad: regRol !== 'ESTUDIANTE' ? regEspecialidad : undefined
    });

    if (!res.success) {
      setRegisterFeedback({ text: res.message, error: true });
    } else {
      setRegisterFeedback({ text: res.message, error: false });
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setRegisterFeedback(null);
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden transition-colors duration-200 flex flex-col max-h-[90vh]"
        style={{
          backgroundColor: currentTheme.cardBg,
          borderColor: currentTheme.cardBorder,
          color: currentTheme.textMain
        }}
      >
        {/* Header */}
        <div
          className="p-5 border-b flex items-center justify-between"
          style={{
            backgroundColor: currentTheme.headerBg,
            borderColor: currentTheme.headerBorder,
            color: '#ffffff'
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ring-1 ring-white/20"
              style={{ backgroundColor: currentTheme.primary }}
            >
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Acceso Seguro SGA CUN</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/20 text-white font-semibold">
                  RF-01 / RF-02
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Autenticación y Registro con Encriptación Criptográfica
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('login');
              setLoginFeedback(null);
            }}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-all flex items-center justify-center gap-2 ${
              authModalMode === 'login'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-800'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Iniciar Sesión</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthModalMode('register');
              setRegisterFeedback(null);
            }}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-all flex items-center justify-center gap-2 ${
              authModalMode === 'register'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-800'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Registrar Nuevo Usuario</span>
          </button>
        </div>

        {/* Body content with scroll */}
        <div className="p-6 overflow-y-auto space-y-5">
          {authModalMode === 'login' ? (
            /* ================= LOGIN VIEW ================= */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginFeedback && (
                <div
                  className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                    loginFeedback.error
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-300'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-300'
                  }`}
                >
                  {loginFeedback.error ? (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  )}
                  <span>{loginFeedback.text}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Usuario o Correo Institucional
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="ej. milton.mancilla o carlos.restrepo@cun.edu.co"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: currentTheme.primary }}
                className="w-full py-2.5 px-4 text-xs font-bold text-white rounded-lg hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Ingresar al Sistema SGA</span>
              </button>

              {/* Demo Quick Accounts Helper */}
              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Cuentas de Prueba Preconfiguradas</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">1-clic para auto-llenar</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {demoAccounts.map((acc) => (
                    <button
                      key={acc.role}
                      type="button"
                      onClick={() => handleDemoFill(acc.user, acc.pass)}
                      className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-emerald-500 bg-slate-50 dark:bg-slate-900/60 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 flex items-center gap-1.5">
                          {acc.icon}
                          {acc.label}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{acc.pass}</span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500 mt-1 truncate">
                        {acc.user}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-500">¿No tienes credenciales activas? </span>
                <button
                  type="button"
                  onClick={() => setAuthModalMode('register')}
                  className="text-xs font-semibold text-emerald-600 hover:underline"
                >
                  Regístrate aquí
                </button>
              </div>
            </form>
          ) : (
            /* ================= REGISTER VIEW ================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {registerFeedback && (
                <div
                  className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                    registerFeedback.error
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-300'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-300'
                  }`}
                >
                  {registerFeedback.error ? (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  )}
                  <span>{registerFeedback.text}</span>
                </div>
              )}

              {/* Personal Data */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nombres *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Milton Alejandro"
                    value={regNombres}
                    onChange={(e) => setRegNombres(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Mancilla Gómez"
                    value={regApellidos}
                    onChange={(e) => setRegApellidos(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Documento de Identidad *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej. 1019283746"
                    value={regDocumento}
                    onChange={(e) => setRegDocumento(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Teléfono Celular
                  </label>
                  <input
                    type="text"
                    placeholder="ej. +57 310 123 4567"
                    value={regTelefono}
                    onChange={(e) => setRegTelefono(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Correo Electrónico Institucional *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@cun.edu.co"
                    value={regEmail}
                    onChange={(e) => {
                      setRegEmail(e.target.value);
                      if (!regUsername && e.target.value.includes('@')) {
                        setRegUsername(e.target.value.split('@')[0]);
                      }
                    }}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Role selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Rol en el Sistema *
                  </label>
                  <select
                    value={regRol}
                    onChange={(e) => setRegRol(e.target.value as RoleType)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="ESTUDIANTE">Estudiante (Pregrado)</option>
                    <option value="DOCENTE">Docente de Asignatura</option>
                    <option value="COORDINADOR">Coordinador Académico</option>
                    <option value="ADMINISTRADOR">Administrador de Sistema</option>
                  </select>
                </div>

                <div>
                  {regRol === 'ESTUDIANTE' ? (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Código Estudiantil
                      </label>
                      <input
                        type="text"
                        placeholder="ej. 51903050 (Auto)"
                        value={regCodigo}
                        onChange={(e) => setRegCodigo(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Especialidad / Cargo
                      </label>
                      <input
                        type="text"
                        placeholder="ej. Sistemas Distribuidos"
                        value={regEspecialidad}
                        onChange={(e) => setRegEspecialidad(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Username & Password */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nombre de Usuario (Login ID) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej. nuevo.usuario"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Contraseña *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Mínimo 5 caracteres"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Confirmar Contraseña *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Repetir contraseña"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-start gap-2">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Seguridad RNF-11:</strong> La contraseña se transformará en un hash irreversible con algoritmo Argon2id y salt aleatorio de 128 bits. Registro trazable en bitácora de auditoría inmutable.
                </p>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: currentTheme.primary }}
                className="w-full py-2.5 px-4 text-xs font-bold text-white rounded-lg hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Registrar Usuario y Acceder</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
