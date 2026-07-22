import React, { useState } from "react";
import { GitCompare, X, ShieldCheck, ArrowRight, Zap, CheckCircle, AlertTriangle } from "lucide-react";

export function WebsiteComparisonModal({ isOpen, onClose, onRunCompare }) {
  const [urlA, setUrlA] = useState("https://stripe.com");
  const [urlB, setUrlB] = useState("https://irctc.co.in");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!urlA || !urlB) return;
    onRunCompare(urlA, urlB);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <GitCompare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white font-heading">Compare Two Websites (WAEF v2.0 Benchmark)</h3>
              <p className="text-xs text-slate-400">Evaluate two domains side-by-side across all 15 audit parameters.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono">
                Website A (Primary Target)
              </label>
              <input
                type="text"
                value={urlA}
                onChange={(e) => setUrlA(e.target.value)}
                placeholder="https://example.com"
                required
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono">
                Website B (Competitor / Benchmark)
              </label>
              <input
                type="text"
                value={urlB}
                onChange={(e) => setUrlB(e.target.value)}
                placeholder="https://competitor.com"
                required
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-3 font-mono">
            <Zap className="h-4 w-4 text-amber-400 shrink-0" />
            <span>Runs simultaneous 5-pass empirical scraping for both URLs and calculates relative Quality Index gap.</span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <span>Launch Side-by-Side Audit</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
