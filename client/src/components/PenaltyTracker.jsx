import React from "react";
import { AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";

export function PenaltyTracker({ penalties, totalPenalties }) {
  const hasPenalties = penalties && penalties.length > 0;

  return (
    <div className="glass-panel p-6 mb-8">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Penalty Deductions System</h3>
            <p className="text-xs text-slate-400">
              Critical failures override checklist scores (Chapter 7). Max penalty deduction is capped at 20 points.
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-black text-rose-400">-{totalPenalties} pts</div>
          <div className="text-[10px] text-slate-400">Total Deduction</div>
        </div>
      </div>

      {!hasPenalties ? (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <strong>Zero Penalties Applied:</strong> No critical failures (such as missing HTTPS, broken forms, or severe accessibility issues) were detected.
        </div>
      ) : (
        <div className="space-y-2">
          {penalties.map((p, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/50 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">{p.reason}</div>
                  <div className="text-slate-400 text-[11px]">Rule ID: {p.id}</div>
                </div>
              </div>

              <span className="font-mono font-black text-rose-400 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-lg">
                {p.deduction} pts
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
