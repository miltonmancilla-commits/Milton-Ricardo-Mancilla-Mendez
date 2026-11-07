import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeColors {
  id: string;
  name: string;
  category: 'corporativo' | 'oscuro' | 'alto-contraste' | 'estandar';
  description: string;
  primary: string;         // e.g. #00874D
  primaryHover: string;    // e.g. #006b3d
  primaryLight: string;    // e.g. #e6f6ee
  primaryBorder: string;   // e.g. #a3dec0
  primaryText: string;     // e.g. #005630
  accent: string;          // e.g. #D4E034
  accentText: string;      // e.g. #4d5402
  headerBg: string;        // e.g. #0b1f15
  headerSubBar: string;    // e.g. #06150e
  headerBorder: string;    // e.g. #163d2a
  badgeBg: string;         // e.g. #0d2e1d
  badgeText: string;       // e.g. #4ade80
  bodyBg: string;          // Background for whole page
  cardBg: string;          // Background for white/dark cards
  cardBorder: string;      // Border color for cards
  textMain: string;        // Main text color
  textMuted: string;       // Secondary text color
  isDark: boolean;
}

export const THEME_PRESETS: ThemeColors[] = [
  {
    id: 'modo-corporativo',
    name: 'Modo Corporativo (Verde CUN)',
    category: 'corporativo',
    description: 'Paleta corporativa oficial de la CUN con verde institucional, acento lima y superficies claras para gestión administrativa.',
    primary: '#00874D',
    primaryHover: '#006d3e',
    primaryLight: '#e6f7ef',
    primaryBorder: '#9fe0c1',
    primaryText: '#005430',
    accent: '#CADB2A',
    accentText: '#424803',
    headerBg: '#092116',
    headerSubBar: '#05140d',
    headerBorder: '#14402b',
    badgeBg: '#0d2e1f',
    badgeText: '#6ee7b7',
    bodyBg: '#f8fafc',
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',
    textMain: '#0f172a',
    textMuted: '#64748b',
    isDark: false
  },
  {
    id: 'modo-oscuro',
    name: 'Modo Oscuro (Dark Theme)',
    category: 'oscuro',
    description: 'Tema oscuro de alto confort visual para entornos con baja luminosidad. Reduce la fatiga visual en jornadas extensas.',
    primary: '#10b981',
    primaryHover: '#059669',
    primaryLight: '#064e3b',
    primaryBorder: '#047857',
    primaryText: '#6ee7b7',
    accent: '#38bdf8',
    accentText: '#0284c7',
    headerBg: '#030712',
    headerSubBar: '#090d16',
    headerBorder: '#1f2937',
    badgeBg: '#1f2937',
    badgeText: '#34d399',
    bodyBg: '#0b0f19',
    cardBg: '#111827',
    cardBorder: '#1f2937',
    textMain: '#f9fafb',
    textMuted: '#9ca3af',
    isDark: true
  },
  {
    id: 'modo-alto-contraste',
    name: 'Modo Alto Contraste (WCAG AAA)',
    category: 'alto-contraste',
    description: 'Relación de contraste extremo (> 7:1) diseñada para accesibilidad universal y usuarios con dificultades visuales (RNF-06).',
    primary: '#ffe500',
    primaryHover: '#e6ce00',
    primaryLight: '#262300',
    primaryBorder: '#ffe500',
    primaryText: '#000000',
    accent: '#00f0ff',
    accentText: '#000000',
    headerBg: '#000000',
    headerSubBar: '#000000',
    headerBorder: '#ffffff',
    badgeBg: '#000000',
    badgeText: '#ffe500',
    bodyBg: '#000000',
    cardBg: '#0a0a0a',
    cardBorder: '#ffffff',
    textMain: '#ffffff',
    textMuted: '#e5e5e5',
    isDark: true
  },
  {
    id: 'modo-ingenieria',
    name: 'Modo Ingeniería (Azul Sistemas)',
    category: 'estandar',
    description: 'Azul tecnológico institucional enfocado en sistemas distribuidos, estabilidad y redes.',
    primary: '#1d4ed8',
    primaryHover: '#1e40af',
    primaryLight: '#eff6ff',
    primaryBorder: '#bfdbfe',
    primaryText: '#1e3a8a',
    accent: '#0284c7',
    accentText: '#0369a1',
    headerBg: '#0b192c',
    headerSubBar: '#050d18',
    headerBorder: '#1e293b',
    badgeBg: '#172554',
    badgeText: '#60a5fa',
    bodyBg: '#f8fafc',
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',
    textMain: '#0f172a',
    textMuted: '#64748b',
    isDark: false
  },
  {
    id: 'modo-doctoral',
    name: 'Modo Doctoral (Carmesí Académico)',
    category: 'estandar',
    description: 'Paleta solemne en tonos vino tinto y granate de corte universitario tradicional.',
    primary: '#b91c1c',
    primaryHover: '#991b1b',
    primaryLight: '#fef2f2',
    primaryBorder: '#fecaca',
    primaryText: '#7f1d1d',
    accent: '#d97706',
    accentText: '#b45309',
    headerBg: '#210c0e',
    headerSubBar: '#140608',
    headerBorder: '#451a1d',
    badgeBg: '#450a0a',
    badgeText: '#fca5a5',
    bodyBg: '#f8fafc',
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',
    textMain: '#0f172a',
    textMuted: '#64748b',
    isDark: false
  },
  {
    id: 'modo-grafito',
    name: 'Modo Grafito (Minimalista)',
    category: 'estandar',
    description: 'Escala sobria de grises titánicos y grafito mate para un entorno limpio y enfocado.',
    primary: '#334155',
    primaryHover: '#1e293b',
    primaryLight: '#f1f5f9',
    primaryBorder: '#cbd5e1',
    primaryText: '#0f172a',
    accent: '#64748b',
    accentText: '#334155',
    headerBg: '#0f172a',
    headerSubBar: '#020617',
    headerBorder: '#1e293b',
    badgeBg: '#1e293b',
    badgeText: '#94a3b8',
    bodyBg: '#f8fafc',
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',
    textMain: '#0f172a',
    textMuted: '#64748b',
    isDark: false
  }
];

interface ThemeContextType {
  currentTheme: ThemeColors;
  setThemePreset: (presetId: string) => void;
  updateCustomColors: (colors: Partial<ThemeColors>) => void;
  isColorModalOpen: boolean;
  setIsColorModalOpen: (open: boolean) => void;
  resetDefaultTheme: () => void;
}

const STORAGE_KEY = 'sga_cun_theme_custom';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Match with known preset or fallback
        const preset = THEME_PRESETS.find((p) => p.id === parsed.id);
        if (preset) return preset;
        return { ...THEME_PRESETS[0], ...parsed };
      }
    } catch {
      // fallback
    }
    return THEME_PRESETS[0]; // Modo Corporativo by default
  });

  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  // Apply CSS custom variables and classes whenever currentTheme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', currentTheme.primary);
    root.style.setProperty('--color-primary-hover', currentTheme.primaryHover);
    root.style.setProperty('--color-primary-light', currentTheme.primaryLight);
    root.style.setProperty('--color-primary-border', currentTheme.primaryBorder);
    root.style.setProperty('--color-primary-text', currentTheme.primaryText);
    root.style.setProperty('--color-accent', currentTheme.accent);
    root.style.setProperty('--color-accent-text', currentTheme.accentText);
    root.style.setProperty('--color-header-bg', currentTheme.headerBg);
    root.style.setProperty('--color-header-subbar', currentTheme.headerSubBar);
    root.style.setProperty('--color-header-border', currentTheme.headerBorder);
    root.style.setProperty('--color-badge-bg', currentTheme.badgeBg);
    root.style.setProperty('--color-badge-text', currentTheme.badgeText);
    root.style.setProperty('--color-body-bg', currentTheme.bodyBg);
    root.style.setProperty('--color-card-bg', currentTheme.cardBg);
    root.style.setProperty('--color-card-border', currentTheme.cardBorder);
    root.style.setProperty('--color-text-main', currentTheme.textMain);
    root.style.setProperty('--color-text-muted', currentTheme.textMuted);

    // Toggle dark class
    if (currentTheme.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Set body background & text directly
    document.body.style.backgroundColor = currentTheme.bodyBg;
    document.body.style.color = currentTheme.textMain;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTheme));
    } catch {
      // ignore
    }
  }, [currentTheme]);

  const setThemePreset = (presetId: string) => {
    const found = THEME_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setCurrentTheme(found);
    }
  };

  const updateCustomColors = (colors: Partial<ThemeColors>) => {
    setCurrentTheme((prev) => ({
      ...prev,
      ...colors,
      id: 'custom'
    }));
  };

  const resetDefaultTheme = () => {
    setCurrentTheme(THEME_PRESETS[0]);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setThemePreset,
        updateCustomColors,
        isColorModalOpen,
        setIsColorModalOpen,
        resetDefaultTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
