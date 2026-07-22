import React from "react";
import { ListFilter, ArrowUpRight, ShieldAlert, Wrench, CheckCircle } from "lucide-react";

export function DecisionMatrix({ matrix }) {
  if (!matrix || matrix.length === 0) {
    return (
      <div className="glass-panel p-6 mb-8 text-center text-xs text-slate-400">
        No high-priority critical issues identified in decision matrix.
      </div>
    );
  }

  const priorityColors = {
    "P1 -- Fix Now": "bg-rose-500/20 text-rose-300 border-rose-500/40",
    "P2 -- Fix Soon": "bg-amber-500/20 text-amber-300 border-amber-500/40",
    "P3 -- Backlog": "bg-blue-500/20 text-blue-300 border-blue-500/40",
    "P4 -- Plan Redesign": "bg-purple-500/20 text-purple-300 border-purple-500/40"
  };

  return (
    <div className="glass-panel p-6 mb-8">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
        <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <ListFilter className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-white">Prioritised Decision Matrix</h3>
          <p className="text-xs text-slate-400">
            Actionable optimization roadmap categorized by Impact × Effort (Chapter 9 Methodology).
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px] bg-slate-900/50">
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Parameter / Category</th>
              <th className="py-3 px-4">Identified Issue & Action</th>
              <th className="py-3 px-4">Impact</th>
              <th className="py-3 px-4">Effort</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {matrix.map((item, idx) => {
              const priorityStyle = priorityColors[item.priority] || "bg-slate-800 text-slate-300 border-slate-700";

              return (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] border font-mono ${priorityStyle}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">{item.parameter}</td>
                  <td className="py-3.5 px-4 text-slate-300 max-w-md">{item.issue}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-300">{item.impact}</td>
                  <td className="py-3.5 px-4 text-slate-400">{item.effort}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
