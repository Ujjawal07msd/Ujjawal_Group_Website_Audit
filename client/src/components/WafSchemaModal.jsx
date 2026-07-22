import React from "react";
import { X, BookOpen, Award, Layers } from "lucide-react";
import { WAEF_PARAMETERS, PENALTY_RULES, GRADE_SCALE } from "../data/waefData";

export function WafSchemaModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative border-indigo-500/30">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 mb-1">
              5-Pass Deep Audit Specification
            </div>
            <h2 className="text-2xl font-black text-white">Website Quality Index (WQI) — WAEF v2.0</h2>
            <p className="text-xs text-slate-400">Authoritative Handbook & Framework by Ujjawal Sharma, VIT Bhopal University (2026)</p>
          </div>
        </div>

        {/* 5-Pass Execution Summary */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 mb-6 space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-400" /> 5-Pass Multi-Sample Audit Pipeline
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px] text-slate-300 font-mono text-center">
            <div className="bg-slate-950 p-2 rounded border border-slate-800">Pass 1: Desktop DOM</div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800">Pass 2: Mobile 375px</div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800">Pass 3: Tablet 768px</div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800">Pass 4: Security/SSL</div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800">Pass 5: 5-Sample Latency</div>
          </div>
        </div>

        {/* Core Mathematical Model */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 mb-6 space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="h-4 w-4 text-indigo-400" /> Core WQI Mathematical Formulas
          </h3>
          <div className="font-mono text-xs text-indigo-300 space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div>Parameter Score = (Points Obtained / Maximum Points) × Weight</div>
            <div>Raw WQI = SUM of all 15 Parameter Scores (Out of 100 Marks)</div>
            <div>Final WQI = MAX(0, Raw WQI - MIN(20, Total Penalty Deductions))</div>
          </div>
        </div>

        {/* 15 Parameters Table */}
        <div className="mb-6 space-y-3">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
            15 Major Evaluation Parameters (100 Marks)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {WAEF_PARAMETERS.map((p) => (
              <div key={p.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">
                    {p.id}. {p.name}
                  </div>
                  <div className="text-[11px] text-slate-400">Standard: {p.standard}</div>
                </div>
                <span className="font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                  {p.weight} Marks
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Penalty Rules */}
        <div className="mb-6 space-y-3">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
            <span>Penalty System (Capped at 20 Points)</span>
            <span className="text-xs text-rose-400 font-normal">Direct Raw Score Deductions</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {PENALTY_RULES.map((pen) => (
              <div key={pen.id} className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/40 flex justify-between items-center">
                <span className="text-slate-300">{pen.name}</span>
                <span className="font-mono font-bold text-rose-400">-{Math.abs(pen.deduction || 2)} pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grading Scale */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
            Final Grade Scale
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
            {GRADE_SCALE.map((g) => (
              <div key={g.grade} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-black text-lg text-white" style={{ color: g.color }}>
                  Grade {g.grade}
                </div>
                <div className="text-[10px] text-slate-400 font-semibold">{g.min}-{g.max} pts</div>
                <div className="text-[10px] text-slate-300 mt-1 truncate">{g.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
