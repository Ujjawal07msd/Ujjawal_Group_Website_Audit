import React from "react";
import { Trophy, Target, ShieldCheck } from "lucide-react";

export function LeaderBenchmark({ benchmarks, targetDomain }) {
  if (!benchmarks || benchmarks.length === 0) return null;

  const displayTarget = targetDomain || "Audited Site";

  return (
    <div className="glass-panel p-6 md:p-8 mb-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 shrink-0">
          <Target className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white font-heading">WAEF v1.0 Industry Benchmark Targets</h3>
          <p className="text-xs text-slate-400">
            Comparing <strong>{displayTarget}</strong> against official WAEF quality target benchmarks.
          </p>
        </div>
      </div>

      {/* Target Baseline Rows */}
      <div className="space-y-4">
        {benchmarks.map((b, idx) => (
          <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-300">
              <span className="font-heading">{b.metric}</span>
              <span className="text-blue-400 font-mono font-bold">{displayTarget}: {b.targetSite} pts</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
              {/* Target Site Score */}
              <div className="bg-blue-950/40 border border-blue-600/40 p-3 rounded-lg">
                <div className="text-[10px] text-blue-300 font-bold uppercase truncate">{displayTarget}</div>
                <div className="text-base font-black text-white mt-1 font-mono">{b.targetSite}</div>
              </div>

              {/* Grade A+ Benchmark Target */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                <div className="text-[10px] text-emerald-400 font-bold uppercase">Grade A+ Target</div>
                <div className="text-base font-bold text-emerald-400 mt-1 font-mono">{b.targetA}</div>
              </div>

              {/* Grade A Benchmark Target */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                <div className="text-[10px] text-blue-400 font-bold uppercase">Grade A Target</div>
                <div className="text-base font-bold text-blue-400 mt-1 font-mono">{b.targetB}</div>
              </div>

              {/* Grade B Benchmark Target */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                <div className="text-[10px] text-indigo-400 font-bold uppercase">Grade B Target</div>
                <div className="text-base font-bold text-indigo-400 mt-1 font-mono">{b.targetC}</div>
              </div>

              {/* Min Passing Standard */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                <div className="text-[10px] text-amber-400 font-bold uppercase">Min Pass</div>
                <div className="text-base font-bold text-amber-400 mt-1 font-mono">{b.minPass}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
