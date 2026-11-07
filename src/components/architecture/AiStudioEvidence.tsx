import React from 'react';
import { AI_STUDIO_INTERACTIONS } from '../../data/mockDatabase';
import {
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  Scale
} from 'lucide-react';

export const AiStudioEvidence: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Evidencias del Uso Crítico de Google AI Studio (Sección 9)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Documentación de la interacción técnica con el modelo generativo y demostración del criterio humano frente a sesgos de sobreingeniería.
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          Supervisión Humana Experta
        </span>
      </div>

      <div className="space-y-6">
        {AI_STUDIO_INTERACTIONS.map((item) => {
          const isAccepted = item.analisis_critico.estado.includes('ACEPTADA');

          return (
            <div
              key={item.id}
              className={`rounded-xl border shadow-sm overflow-hidden bg-white ${
                isAccepted ? 'border-emerald-300' : 'border-amber-300'
              }`}
            >
              {/* Header */}
              <div
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b ${
                  isAccepted
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50/60 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                    {item.id}
                  </span>
                  <h4 className="text-sm font-bold">{item.titulo}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded flex items-center gap-1 ${
                      isAccepted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}
                  >
                    {isAccepted ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5" />
                    )}
                    <span>{item.analisis_critico.estado}</span>
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-4 text-xs">
                {/* 1. Prompt */}
                <div className="space-y-1.5">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Prompt Formulado por el Equipo CUN a Google AI Studio:</span>
                  </div>
                  <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-200 text-slate-800 italic leading-relaxed">
                    "{item.prompt_usuario}"
                  </div>
                </div>

                {/* 2. Model Response */}
                <div className="space-y-1.5">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-purple-600" />
                    <span>Respuesta Generada por Google AI Studio:</span>
                  </div>
                  <div className="p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {item.respuesta_ia}
                  </div>
                </div>

                {/* 3. Human Critical Evaluation */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-emerald-600" />
                    <span>Evaluación y Criterio Técnico Humano:</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <p className="font-semibold text-slate-800">
                      Dictamen: {item.analisis_critico.motivo}
                    </p>
                    <ul className="space-y-1.5 pl-4 list-disc text-slate-700 leading-relaxed">
                      {item.analisis_critico.argumentos.map((arg, idx) => (
                        <li key={idx}>{arg}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
