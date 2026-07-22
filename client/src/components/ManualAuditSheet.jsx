import React, { useState } from "react";
import { WAEF_PARAMETERS, PENALTY_RULES, getGrade } from "../data/waefData.js";
import { Calculator, RotateCcw, Award, CheckSquare } from "lucide-react";

export function ManualAuditSheet() {
  const [siteName, setSiteName] = useState("My Custom Site");
  const [scores, setScores] = useState({
    1: 5, 2: 7, 3: 9, 4: 6, 5: 5,
    6: 8, 7: 9, 8: 8, 9: 7, 10: 4,
    11: 4, 12: 6, 13: 4, 14: 3, 15: 2
  });

  const [activePenalties, setActivePenalties] = useState([]);

  const handleScoreChange = (paramId, value) => {
    const val = parseFloat(value) || 0;
    setScores((prev) => ({ ...prev, [paramId]: val }));
  };

  const togglePenalty = (penId) => {
    setActivePenalties((prev) =>
      prev.includes(penId) ? prev.filter((id) => id !== penId) : [...prev, penId]
    );
  };

  const handleReset = () => {
    const resetScores = {};
    WAEF_PARAMETERS.forEach((p) => (resetScores[p.id] = p.maxPoints));
    setScores(resetScores);
    setActivePenalties([]);
  };

  // Compute live scores
  let rawTotal = 0;
  WAEF_PARAMETERS.forEach((p) => {
    const obtained = scores[p.id] !== undefined ? scores[p.id] : p.maxPoints;
    const norm = (obtained / p.maxPoints) * p.weight;
    rawTotal += norm;
  });

  let totalPenalties = 0;
  PENALTY_RULES.forEach((pen) => {
    if (activePenalties.includes(pen.id)) {
      totalPenalties += Math.abs(pen.deduction || pen.deductionPerItem || 2);
    }
  });

  const cappedPenalties = Math.min(20, totalPenalties);
  const rawWqi = Math.round(rawTotal * 10) / 10;
  const finalWqi = Math.max(0, Math.round((rawTotal - cappedPenalties) * 10) / 10);
  const gradeInfo = getGrade(finalWqi);

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="glass-panel p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-2">
            <Calculator className="h-3.5 w-3.5" /> Chapter 10 Blank Audit Sheet
          </div>
          <h2 className="text-2xl font-black text-white">Manual WQI Audit Calculator</h2>
          <p className="text-xs text-slate-400">
            Manually enter evaluation scores for each parameter and check applicable penalty conditions.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Website Name"
            className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-semibold"
          />
          <button
            onClick={handleReset}
            className="px-3 py-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Live Computed WQI Score Gauge */}
      <div className="glass-panel p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className="h-16 w-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-xl"
            style={{ backgroundColor: gradeInfo.color }}
          >
            {gradeInfo.grade}
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Calculated WQI Score</div>
            <div className="text-3xl font-black text-white tracking-tight">
              {finalWqi} <span className="text-sm font-semibold text-slate-500">/ 100</span>
            </div>
            <div className="text-xs font-bold text-slate-300">{gradeInfo.label}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center min-w-[110px]">
            <div className="text-slate-500 font-medium">Raw Sum</div>
            <div className="text-base font-extrabold text-indigo-300">{rawWqi}</div>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center min-w-[110px]">
            <div className="text-slate-500 font-medium">Penalties</div>
            <div className={`text-base font-extrabold ${cappedPenalties > 0 ? "text-rose-400" : "text-emerald-400"}`}>
              -{cappedPenalties} pts
            </div>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center min-w-[130px]">
            <div className="text-slate-500 font-medium">Action</div>
            <div className="text-xs font-bold text-white truncate max-w-[120px]">{gradeInfo.action}</div>
          </div>
        </div>
      </div>

      {/* 15 Parameters Manual Input Sheet */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3">
          Parameter Score Entries (15 Parameters)
        </h3>

        <div className="space-y-3">
          {WAEF_PARAMETERS.map((param) => {
            const currentPoints = scores[param.id] !== undefined ? scores[param.id] : param.maxPoints;
            const normScore = Math.round(((currentPoints / param.maxPoints) * param.weight) * 10) / 10;

            return (
              <div
                key={param.id}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="h-7 w-7 rounded-lg bg-slate-800 text-indigo-400 font-bold text-xs flex items-center justify-center">
                    {param.id}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">{param.name}</div>
                    <div className="text-[11px] text-slate-400">Weight: {param.weight} marks • Standard: {param.standard}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Points:</span>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max={param.maxPoints}
                      value={currentPoints}
                      onChange={(e) => handleScoreChange(param.id, e.target.value)}
                      className="w-20 px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-bold text-center focus:outline-none focus:border-indigo-500"
                    />
                    <span className="text-xs text-slate-500">/ {param.maxPoints}</span>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <div className="text-xs font-black text-indigo-300">{normScore} pts</div>
                    <div className="text-[10px] text-slate-500">Weighted</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Penalty Toggles Sheet */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center justify-between">
          <span>Penalty Check Toggles (Chapter 7)</span>
          <span className="text-xs text-rose-400 font-normal">Active Deductions: -{cappedPenalties} pts</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PENALTY_RULES.map((pen) => {
            const isActive = activePenalties.includes(pen.id);
            const ded = Math.abs(pen.deduction || pen.deductionPerItem || 2);

            return (
              <div
                key={pen.id}
                onClick={() => togglePenalty(pen.id)}
                className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all flex items-center justify-between ${
                  isActive
                    ? "bg-rose-950/40 border-rose-600/60 text-white"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3 pr-2">
                  <div
                    className={`h-5 w-5 rounded flex items-center justify-center border ${
                      isActive ? "bg-rose-600 border-rose-500 text-white" : "border-slate-700 bg-slate-950"
                    }`}
                  >
                    {isActive && <CheckSquare className="h-3.5 w-3.5" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold">{pen.name}</div>
                    <div className="text-[10px] opacity-80">{pen.description}</div>
                  </div>
                </div>

                <span className="font-mono text-xs font-bold text-rose-400">-{ded} pts</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
