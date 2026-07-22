import React, { useState } from "react";
import { CheckCircle2, AlertCircle, XCircle, ChevronDown, ChevronUp, Info, Award, Filter } from "lucide-react";

export function ParameterBreakdown({ parameters }) {
  const [expandedId, setExpandedId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");

  if (!parameters || parameters.length === 0) return null;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredParams = parameters.filter((param) => {
    if (filterCategory === "all") return true;
    if (filterCategory === "ux") return [1, 2, 3, 4, 5, 9, 15].includes(param.id);
    if (filterCategory === "tech") return [6, 7, 8, 10, 11].includes(param.id);
    if (filterCategory === "seo") return [12, 13, 14].includes(param.id);
    return true;
  });

  return (
    <div className="glass-panel p-6 md:p-8 mb-8 glow-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-2xl font-black text-white font-heading">15 Major Evaluation Parameters</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Standardized WAEF v1.0 parameters out of 100 total marks. Click any row to expand checklist items.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilterCategory("all")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterCategory === "all" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            All (15)
          </button>
          <button
            onClick={() => setFilterCategory("ux")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterCategory === "ux" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Design & UX
          </button>
          <button
            onClick={() => setFilterCategory("tech")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterCategory === "tech" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Performance & Access
          </button>
          <button
            onClick={() => setFilterCategory("seo")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterCategory === "seo" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            SEO & Security
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredParams.map((param) => {
          const isExpanded = expandedId === param.id;
          const scorePct = (param.parameterScore / param.weight) * 100;

          const progressBg =
            scorePct >= 80 ? "from-emerald-500 to-teal-400" : scorePct >= 50 ? "from-amber-500 to-yellow-400" : "from-rose-500 to-pink-500";

          return (
            <div
              key={param.id}
              className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all"
            >
              {/* Parameter Bar */}
              <div
                onClick={() => toggleExpand(param.id)}
                className="p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-[260px]">
                  <span className="h-8 w-8 rounded-xl bg-slate-950 text-indigo-400 font-extrabold text-xs flex items-center justify-center border border-slate-800 shrink-0">
                    {param.id}
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-white flex flex-wrap items-center gap-2 font-heading">
                      {param.name}
                      <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 bg-slate-950 rounded-md border border-slate-800">
                        {param.standard}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 font-medium">{param.description}</p>
                  </div>
                </div>

                {/* Score Bar */}
                <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="w-36 hidden md:block">
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold mb-1">
                      <span>Score Ratio</span>
                      <span className="font-mono">{Math.round(scorePct)}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${progressBg}`}
                        style={{ width: `${scorePct}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <div className="text-base font-black text-white font-mono">
                      {param.parameterScore} <span className="text-xs text-slate-500 font-normal">/ {param.weight}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Marks</div>
                  </div>

                  <div className="text-slate-400 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>
              </div>

              {/* Checklist Detail View */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 bg-slate-950/60 space-y-3 animate-fadeIn">
                  {param.notes && (
                    <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 flex items-start gap-2.5">
                      <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Auditor Observations:</strong> {param.notes}
                      </div>
                    </div>
                  )}

                  <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                    Standardized Checklist Verification:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {param.checklist.map((item, idx) => {
                      const isFull = item.status === "Yes";
                      const isPartial = item.status === "Partial";

                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs"
                        >
                          <div className="flex items-center gap-2.5 pr-2">
                            {isFull ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                            ) : isPartial ? (
                              <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                            ) : (
                              <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                            )}
                            <span className="text-slate-300 font-medium">{item.text}</span>
                          </div>
                          <span
                            className={`font-mono font-bold px-2.5 py-0.5 rounded-md text-[11px] shrink-0 ${
                              isFull
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : isPartial
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            }`}
                          >
                            {item.obtained} / {item.max}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
