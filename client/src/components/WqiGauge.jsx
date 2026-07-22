import React from "react";
import { Award, AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export function WqiGauge({ report }) {
  if (!report || !report.scores) return null;

  const { finalWqi, rawWqi, totalPenalties, grade, interpretation, recommendedAction, gradeColor } = report.scores;

  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, finalWqi));
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="glass-panel p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden glow-card">
      {/* Grade Glow Ambient Light */}
      <div
        className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ backgroundColor: gradeColor }}
      ></div>

      {/* Radial WQI Gauge */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg className="w-52 h-52 transform -rotate-90">
          <circle
            cx="104"
            cy="104"
            r={radius}
            stroke="currentColor"
            strokeWidth="14"
            className="text-slate-900"
            fill="transparent"
          />
          <circle
            cx="104"
            cy="104"
            r={radius}
            stroke={gradeColor}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out drop-shadow-md"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-5xl font-black text-white tracking-tight font-heading">{finalWqi}</span>
          <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mt-0.5">Out of 100</span>
          <span className="text-[11px] text-slate-500 font-semibold">WQI Score</span>
        </div>
      </div>

      {/* Grade Details */}
      <div className="flex-1 text-center md:text-left space-y-3">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <span
            className="px-5 py-2 rounded-2xl font-black text-2xl text-white shadow-xl flex items-center gap-2"
            style={{ backgroundColor: gradeColor }}
          >
            <Award className="h-6 w-6" /> Grade {grade}
          </span>
          <span className="text-xl font-extrabold text-white font-heading">{interpretation}</span>
        </div>

        <p className="text-sm text-slate-300 font-medium">
          <strong>Recommended Action:</strong> {recommendedAction}
        </p>

        {/* Score Components breakdown */}
        <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs">
          <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <span className="text-slate-400 font-medium">Raw Checklist Score:</span>
            <strong className="text-indigo-300 font-mono font-bold text-sm">{rawWqi} / 100</strong>
          </div>
          <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
            <span className="text-slate-400 font-medium">Penalty Deductions:</span>
            <strong className={`font-mono font-bold text-sm ${totalPenalties > 0 ? "text-rose-400" : "text-emerald-400"}`}>
              -{totalPenalties} pts
            </strong>
          </div>
        </div>
      </div>

      {/* Target Site Details Card */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 text-xs w-full md:w-auto min-w-[240px] space-y-2 shrink-0">
        <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Target Website</div>
        <div className="text-white font-extrabold text-base truncate max-w-[220px] font-heading">{report.meta.domain}</div>
        <div className="text-slate-400 truncate max-w-[220px] font-mono text-[11px]">{report.meta.auditedUrl}</div>
        <div className="text-[11px] text-emerald-400 pt-2 border-t border-slate-800 flex items-center gap-1.5 font-semibold">
          <ShieldCheck className="h-4 w-4" /> WAEF v1.0 Validated
        </div>
      </div>
    </div>
  );
}
