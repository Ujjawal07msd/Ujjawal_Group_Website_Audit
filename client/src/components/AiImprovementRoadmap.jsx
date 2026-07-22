import React from "react";
import { Sparkles, CheckCircle2, AlertOctagon, Terminal, ArrowUpRight, Copy, Check } from "lucide-react";

export function AiImprovementRoadmap({ report }) {
  const [copiedId, setCopiedId] = React.useState(null);

  if (!report) return null;

  const penalties = report.scores?.penalties || [];
  const lowParams = (report.parameters || []).filter(p => p.parameterScore < (p.weight * 0.7));

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-panel p-6 my-6 border-slate-800 bg-slate-950/80">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white font-heading flex items-center gap-2">
              AI-Generated Improvement Roadmap & Actionable Fixes
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold">
                WAEF AI Agent
              </span>
            </h3>
            <p className="text-xs text-slate-400">Step-by-step technical fixes to raise {report.meta?.domain}'s WQI score above 90+ (A+ Grade).</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-5">
        {/* Priority P0 Fixes */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[11px] font-extrabold uppercase rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono">
                Priority P0 &bull; Critical Security & Mobile Fixes
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">Estimated WQI Impact: +12.5 Points</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong className="text-white block mb-0.5">Mobile Viewport Horizontal Scroll Prevention</strong>
                <p className="text-slate-400 text-[11px]">Enforce strict 375px mobile viewport containment to eliminate horizontal scroll deductions (-2 pts).</p>
                <div className="mt-2 p-2 bg-black rounded font-mono text-[11px] text-blue-300 flex items-center justify-between">
                  <code>html, body &#123; max-width: 100vw; overflow-x: hidden; &#125;</code>
                  <button onClick={() => handleCopy("html, body { max-width: 100vw; overflow-x: hidden; }", "code1")} className="text-slate-400 hover:text-white">
                    {copiedId === "code1" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </li>

            <li className="flex items-start gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong className="text-white block mb-0.5">WCAG Level AA Accessibility & Alt Text Coverage</strong>
                <p className="text-slate-400 text-[11px]">Ensure all `&lt;img&gt;` elements have descriptive `alt` tags and ARIA labels on button components (-5 pts deduction avoided).</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Priority P1 Fixes */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="px-2.5 py-0.5 text-[11px] font-extrabold uppercase rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono">
              Priority P1 &bull; Trust Signals & UX Hierarchy
            </span>
            <span className="text-xs font-mono text-slate-400">Estimated WQI Impact: +6.0 Points</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <strong className="text-white block mb-1">Add Trust Signals & Reviews</strong>
              <p className="text-slate-400 text-[11px]">Incorporate customer logos, client testimonials, security seals, and live usage counters.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <strong className="text-white block mb-1">Expand Footer Navigation</strong>
              <p className="text-slate-400 text-[11px]">Include About, Terms, Privacy Policy, FAQ accordion, Contact, and Social links.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
