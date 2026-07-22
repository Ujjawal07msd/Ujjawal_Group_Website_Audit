import React from "react";
import { Zap, Play, ShieldAlert, Sparkles, Globe } from "lucide-react";

export function SampleReportPreview({ onSelectSample }) {
  const samples = [
    {
      name: "Google Official",
      url: "https://google.com",
      expectedScore: "95.0",
      grade: "A+",
      badge: "Benchmark",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
    },
    {
      name: "IRCTC Next-Gen",
      url: "https://irctc.co.in",
      expectedScore: "34.0",
      grade: "F",
      badge: "Real Case Study",
      color: "border-rose-500/40 text-rose-400 bg-rose-500/10"
    },
    {
      name: "Stripe SaaS",
      url: "https://stripe.com",
      expectedScore: "92.5",
      grade: "A+",
      badge: "SaaS Leader",
      color: "border-blue-500/40 text-blue-400 bg-blue-500/10"
    },
    {
      name: "Apple Store",
      url: "https://apple.com",
      expectedScore: "89.0",
      grade: "A",
      badge: "E-Commerce",
      color: "border-indigo-500/40 text-indigo-400 bg-indigo-500/10"
    }
  ];

  return (
    <div className="glass-panel p-5 my-6 border-slate-800 bg-slate-950/70">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div>
          <h3 className="font-bold text-sm text-white font-heading flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            1-Click Sample Audit Previews (Instant Demo Mode)
          </h3>
          <p className="text-xs text-slate-400">Click any preset domain to launch a live 5-pass empirical audit immediately.</p>
        </div>
        <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
          WAEF v2.0 Presets
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {samples.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSample(item.url)}
            className="group flex flex-col justify-between p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/60 hover:bg-slate-900 transition-all text-left"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-bold text-xs text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-slate-400" />
                  {item.name}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.color}`}>
                  {item.badge}
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 truncate">{item.url}</p>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/60 text-xs">
              <span className="text-slate-400 font-mono">Expected: <strong className="text-white">{item.expectedScore}</strong> ({item.grade})</span>
              <span className="text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                Run <Play className="h-3 w-3 fill-current" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
