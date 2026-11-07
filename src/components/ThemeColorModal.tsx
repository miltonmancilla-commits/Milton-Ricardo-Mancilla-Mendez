import React, { useState } from 'react';
import { useTheme, THEME_PRESETS, ThemeColors } from '../context/ThemeContext';
import {
  Palette,
  Check,
  RotateCcw,
  X,
  Sparkles,
  Sliders,
  Eye,
  Moon,
  Sun,
  ShieldCheck,
  Zap,
  Building2,
  CheckCircle2,
  Monitor
} from 'lucide-react';

export const ThemeColorModal: React.FC = () => {
  const {
    currentTheme,
    setThemePreset,
    updateCustomColors,
    isColorModalOpen,
    setIsColorModalOpen,
    resetDefaultTheme
  } = useTheme();

  const [activeTabFilter, setActiveTabFilter] = useState<'TODOS' | 'CORPORATIVO' | 'OSCURO' | 'ALTO_CONTRASTE'>('TODOS');

  if (!isColorModalOpen) return null;

  const handleSelectPreset = (id: string) => {
    setThemePreset(id);
  };

  const filteredPresets = THEME_PRESETS.filter((preset) => {
    if (activeTabFilter === 'CORPORATIVO') return preset.category === 'corporativo';
    if (activeTabFilter === 'OSCURO') return preset.category === 'oscuro';
    if (activeTabFilter === 'ALTO_CONTRASTE') return preset.category === 'alto-contraste';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="rounded-2xl border shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col transition-all duration-200"
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
            backgroundColor: currentTheme.isDark ? '#080d1a' : '#f8fafc',
            borderColor: currentTheme.cardBorder
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
              style={{ backgroundColor: currentTheme.primary }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold">
                  Selector de Paletas & Personalización de Colores
                </h2>
                <span
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                  style={{
                    backgroundColor: currentTheme.primaryLight,
                    color: currentTheme.primaryText,
                    borderColor: currentTheme.primaryBorder
                  }}
                >
                  {currentTheme.name}
                </span>
              </div>
              <p className="text-xs opacity-70">
                Selecciona paletas predefinidas institucionales o ajusta variables dinámicas de color en tiempo real
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsColorModalOpen(false)}
            className="p-2 rounded-lg opacity-60 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Segmented Mode Selector (User's primary requirement: Modo Corporativo, Modo Oscuro, Modo Alto Contraste) */}
          <div
            className="p-4 rounded-xl border space-y-3"
            style={{
              backgroundColor: currentTheme.isDark ? '#050811' : '#f1f5f9',
              borderColor: currentTheme.cardBorder
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 opacity-90">
                <Monitor className="w-4 h-4" style={{ color: currentTheme.primary }} />
                <span>Selector Rápido de Modos Principales</span>
              </span>
              <span className="text-[11px] opacity-60">Cambio dinámico instantáneo</span>
            </div>

            {/* 3 Prominent Featured Mode Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* 1. Modo Corporativo */}
              <button
                type="button"
                onClick={() => handleSelectPreset('modo-corporativo')}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  currentTheme.id === 'modo-corporativo'
                    ? 'ring-2 shadow-md'
                    : 'hover:scale-[1.01]'
                }`}
                style={{
                  backgroundColor: currentTheme.id === 'modo-corporativo' ? '#e6f7ef' : (currentTheme.isDark ? '#111827' : '#ffffff'),
                  borderColor: currentTheme.id === 'modo-corporativo' ? '#00874D' : currentTheme.cardBorder,
                  color: currentTheme.id === 'modo-corporativo' ? '#005430' : currentTheme.textMain
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <Building2 className="w-4 h-4 text-[#00874D]" />
                    <span>Modo Corporativo</span>
                  </div>
                  {currentTheme.id === 'modo-corporativo' && (
                    <span className="w-4 h-4 rounded-full bg-[#00874D] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] opacity-80 leading-snug mb-2">
                  Verde oficial CUN + acento lima institucional.
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#00874D] border border-black/20" title="Verde CUN" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#CADB2A] border border-black/20" title="Lima CUN" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#092116] border border-black/20" title="Bosque CUN" />
                  <span className="text-[10px] font-mono ml-auto opacity-70">Oficial CUN</span>
                </div>
              </button>

              {/* 2. Modo Oscuro */}
              <button
                type="button"
                onClick={() => handleSelectPreset('modo-oscuro')}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  currentTheme.id === 'modo-oscuro'
                    ? 'ring-2 shadow-md'
                    : 'hover:scale-[1.01]'
                }`}
                style={{
                  backgroundColor: currentTheme.id === 'modo-oscuro' ? '#1f2937' : (currentTheme.isDark ? '#111827' : '#ffffff'),
                  borderColor: currentTheme.id === 'modo-oscuro' ? '#10b981' : currentTheme.cardBorder,
                  color: currentTheme.id === 'modo-oscuro' ? '#34d399' : currentTheme.textMain
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <Moon className="w-4 h-4 text-[#10b981]" />
                    <span>Modo Oscuro</span>
                  </div>
                  {currentTheme.id === 'modo-oscuro' && (
                    <span className="w-4 h-4 rounded-full bg-[#10b981] text-black flex items-center justify-center font-bold">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] opacity-80 leading-snug mb-2">
                  Baja fatiga visual, fondo oscuro y acentos cian.
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] border border-white/20" title="Esmeralda" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#38bdf8] border border-white/20" title="Cian" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#0b0f19] border border-white/20" title="Dark Canvas" />
                  <span className="text-[10px] font-mono ml-auto opacity-70">Dark Theme</span>
                </div>
              </button>

              {/* 3. Modo Alto Contraste */}
              <button
                type="button"
                onClick={() => handleSelectPreset('modo-alto-contraste')}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  currentTheme.id === 'modo-alto-contraste'
                    ? 'ring-2 shadow-md'
                    : 'hover:scale-[1.01]'
                }`}
                style={{
                  backgroundColor: currentTheme.id === 'modo-alto-contraste' ? '#000000' : (currentTheme.isDark ? '#111827' : '#ffffff'),
                  borderColor: currentTheme.id === 'modo-alto-contraste' ? '#ffe500' : currentTheme.cardBorder,
                  color: currentTheme.id === 'modo-alto-contraste' ? '#ffe500' : currentTheme.textMain
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <Zap className="w-4 h-4 text-[#ffe500]" />
                    <span>Modo Alto Contraste</span>
                  </div>
                  {currentTheme.id === 'modo-alto-contraste' && (
                    <span className="w-4 h-4 rounded-full bg-[#ffe500] text-black flex items-center justify-center font-bold">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
                <p className="text-[11px] opacity-80 leading-snug mb-2">
                  Contraste extremo WCAG 2.1 AAA (RNF-06).
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ffe500] border border-black/20" title="Amarillo AAA" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#00f0ff] border border-black/20" title="Cian Eléctrico" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#000000] border border-white/40" title="Negro Puro" />
                  <span className="text-[10px] font-mono ml-auto opacity-70">WCAG AAA</span>
                </div>
              </button>
            </div>

            {/* Quick dropdown select for power users */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-black/10 dark:border-white/10 text-xs">
              <label htmlFor="theme-dropdown-select" className="font-semibold opacity-80">
                Selección Directa por Lista Desplegable:
              </label>
              <select
                id="theme-dropdown-select"
                value={currentTheme.id}
                onChange={(e) => handleSelectPreset(e.target.value)}
                className="px-3 py-1.5 rounded-lg border text-xs font-semibold focus:outline-none transition-colors"
                style={{
                  backgroundColor: currentTheme.cardBg,
                  borderColor: currentTheme.cardBorder,
                  color: currentTheme.textMain
                }}
              >
                {THEME_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Full Palette Explorer with Filter Chips */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                <span>Explorador Completo de Paletas ({THEME_PRESETS.length})</span>
              </h3>

              {/* Category Filter */}
              <div className="flex items-center gap-1 p-1 rounded-lg border" style={{ borderColor: currentTheme.cardBorder }}>
                <button
                  type="button"
                  onClick={() => setActiveTabFilter('TODOS')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded transition-all ${
                    activeTabFilter === 'TODOS' ? 'font-bold shadow-xs' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={activeTabFilter === 'TODOS' ? { backgroundColor: currentTheme.primary, color: '#ffffff' } : {}}
                >
                  Todas
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabFilter('CORPORATIVO')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded transition-all ${
                    activeTabFilter === 'CORPORATIVO' ? 'font-bold shadow-xs' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={activeTabFilter === 'CORPORATIVO' ? { backgroundColor: currentTheme.primary, color: '#ffffff' } : {}}
                >
                  Corporativo
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabFilter('OSCURO')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded transition-all ${
                    activeTabFilter === 'OSCURO' ? 'font-bold shadow-xs' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={activeTabFilter === 'OSCURO' ? { backgroundColor: currentTheme.primary, color: '#ffffff' } : {}}
                >
                  Oscuro
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabFilter('ALTO_CONTRASTE')}
                  className={`px-2 py-0.5 text-[11px] font-medium rounded transition-all ${
                    activeTabFilter === 'ALTO_CONTRASTE' ? 'font-bold shadow-xs' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={activeTabFilter === 'ALTO_CONTRASTE' ? { backgroundColor: currentTheme.primary, color: '#ffffff' } : {}}
                >
                  Alto Contraste
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {filteredPresets.map((preset) => {
                const isSelected = currentTheme.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'ring-2 shadow-sm'
                        : 'hover:border-slate-400 opacity-90 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: isSelected ? (preset.isDark ? '#1a2234' : preset.primaryLight) : currentTheme.cardBg,
                      borderColor: isSelected ? preset.primary : currentTheme.cardBorder
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold leading-tight">{preset.name}</span>
                        {isSelected && (
                          <span
                            className="w-4 h-4 rounded-full text-white flex items-center justify-center shrink-0 ml-1"
                            style={{ backgroundColor: preset.primary }}
                          >
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] opacity-70 leading-snug mb-2 line-clamp-2">
                        {preset.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 pt-2 border-t border-black/5 dark:border-white/10">
                      <div
                        className="w-4 h-4 rounded-md shadow-xs border border-black/10"
                        style={{ backgroundColor: preset.primary }}
                        title="Primario"
                      />
                      <div
                        className="w-4 h-4 rounded-md shadow-xs border border-black/10"
                        style={{ backgroundColor: preset.accent }}
                        title="Acento"
                      />
                      <div
                        className="w-4 h-4 rounded-md shadow-xs border border-black/10"
                        style={{ backgroundColor: preset.headerBg }}
                        title="Encabezado"
                      />
                      <span className="text-[10px] font-mono opacity-60 ml-auto">
                        {preset.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Reactive Preview Panel */}
          <div
            className="p-4 rounded-xl border space-y-2.5 transition-colors duration-200"
            style={{
              backgroundColor: currentTheme.bodyBg,
              borderColor: currentTheme.cardBorder
            }}
          >
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                <span>Vista Previa de Componentes React (Variables Aplicadas):</span>
              </span>
              <span
                className="font-mono text-[10px] px-2 py-0.5 rounded"
                style={{
                  backgroundColor: currentTheme.cardBg,
                  color: currentTheme.primary,
                  borderColor: currentTheme.cardBorder
                }}
              >
                Canvas: {currentTheme.bodyBg}
              </span>
            </div>

            <div
              className="p-3.5 rounded-lg border flex flex-wrap items-center gap-3 transition-colors duration-200"
              style={{
                backgroundColor: currentTheme.cardBg,
                borderColor: currentTheme.cardBorder
              }}
            >
              {/* Primary action button */}
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-xs transition-opacity"
                style={{ backgroundColor: currentTheme.primary }}
              >
                Botón Principal Transaccional
              </button>

              {/* Secondary tag */}
              <span
                className="px-2.5 py-1 rounded-md text-xs font-bold font-mono border"
                style={{
                  backgroundColor: currentTheme.primaryLight,
                  color: currentTheme.primaryText,
                  borderColor: currentTheme.primaryBorder
                }}
              >
                Tag: SGA-ARQ-501 (ACID)
              </span>

              {/* Accent banner */}
              <span
                className="px-2.5 py-1 rounded-md text-xs font-bold font-mono"
                style={{
                  backgroundColor: currentTheme.accent,
                  color: currentTheme.accentText
                }}
              >
                Acento: ¡1 Cupo Restante!
              </span>

              <span className="text-xs font-medium ml-auto" style={{ color: currentTheme.textMuted }}>
                Texto atenuado ({currentTheme.textMuted})
              </span>
            </div>
          </div>

          {/* Custom Hex Color Fine-Tuning */}
          <div className="space-y-3 pt-2 border-t border-black/10 dark:border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 opacity-70" />
              <span>Ajuste Fino de Código Hexadecimal</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Primary Color */}
              <div
                className="p-3 rounded-xl border space-y-1.5"
                style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.cardBorder }}
              >
                <label className="text-xs font-semibold block">Color Primario</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentTheme.primary}
                    onChange={(e) => {
                      const color = e.target.value;
                      updateCustomColors({
                        primary: color,
                        primaryHover: color,
                        primaryLight: color + '20',
                        primaryBorder: color + '50',
                        primaryText: color
                      });
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={currentTheme.primary}
                    onChange={(e) => {
                      const color = e.target.value;
                      if (color.startsWith('#')) {
                        updateCustomColors({
                          primary: color,
                          primaryHover: color,
                          primaryLight: color + '20',
                          primaryBorder: color + '50',
                          primaryText: color
                        });
                      }
                    }}
                    className="w-full px-2 py-1 text-xs font-mono rounded-md border"
                    style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.cardBorder }}
                  />
                </div>
              </div>

              {/* Accent Color */}
              <div
                className="p-3 rounded-xl border space-y-1.5"
                style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.cardBorder }}
              >
                <label className="text-xs font-semibold block">Color de Acento</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentTheme.accent}
                    onChange={(e) => updateCustomColors({ accent: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={currentTheme.accent}
                    onChange={(e) => {
                      if (e.target.value.startsWith('#')) {
                        updateCustomColors({ accent: e.target.value });
                      }
                    }}
                    className="w-full px-2 py-1 text-xs font-mono rounded-md border"
                    style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.cardBorder }}
                  />
                </div>
              </div>

              {/* Header Color */}
              <div
                className="p-3 rounded-xl border space-y-1.5"
                style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.cardBorder }}
              >
                <label className="text-xs font-semibold block">Encabezado (Barra Superior)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentTheme.headerBg}
                    onChange={(e) => updateCustomColors({ headerBg: e.target.value, headerSubBar: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={currentTheme.headerBg}
                    onChange={(e) => {
                      if (e.target.value.startsWith('#')) {
                        updateCustomColors({ headerBg: e.target.value, headerSubBar: e.target.value });
                      }
                    }}
                    className="w-full px-2 py-1 text-xs font-mono rounded-md border"
                    style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.cardBorder }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-4 border-t flex items-center justify-between"
          style={{
            backgroundColor: currentTheme.isDark ? '#080d1a' : '#f8fafc',
            borderColor: currentTheme.cardBorder
          }}
        >
          <button
            type="button"
            onClick={resetDefaultTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-lg hover:opacity-80 transition-colors"
            style={{ borderColor: currentTheme.cardBorder }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Modo Corporativo</span>
          </button>

          <button
            type="button"
            onClick={() => setIsColorModalOpen(false)}
            className="px-4 py-2 text-white rounded-lg text-xs font-semibold shadow-xs hover:opacity-90 transition-opacity"
            style={{ backgroundColor: currentTheme.primary }}
          >
            Listo, Aplicar Paleta
          </button>
        </div>
      </div>
    </div>
  );
};
