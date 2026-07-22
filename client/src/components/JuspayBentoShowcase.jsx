import React from "react";
import { Cpu, ShieldCheck, Zap, Globe, Plus, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export function JuspayBentoShowcase({ onStartAudit }) {
  return (
    <section className="my-12 space-y-8">
      {/* Header Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
          <span>RESULTS THAT DEFINE UJJAWAL GROUPS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
          Engineering Excellence in <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Web Auditing</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-sans">
          Replaces subjective opinions with a reproducible 100-mark empirical evaluation engine.
        </p>
      </div>

      {/* Juspay-inspired Light Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Bento 1: 5-Pass Scraping Engine */}
        <div className="juspay-light-card p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                CRAWL PIPELINE
              </span>
              <div className="p-2 rounded-full bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Plus className="h-4 w-4" />
              </div>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 font-heading leading-tight">
              5-Pass Live DOM Scraping & Network Latency
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Audits desktop DOM structural integrity, mobile 375px viewports, tablet layout, HTTPS SSL security, and 5-sample network response latency averages.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-blue-600">
            <span>5-Pass Scrape Execution</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Bento 2: 15 WAEF Parameters */}
        <div className="juspay-light-card p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">
                EVALUATION MATRIX
              </span>
              <div className="p-2 rounded-full bg-slate-100 text-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Plus className="h-4 w-4" />
              </div>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 font-heading leading-tight">
              Itemized 15-Parameter WAEF v2.0 Handbook
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Evaluates accessibility, performance, mobile responsiveness, typography, security, and usability heuristics across all 100 marks.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-indigo-600">
            <span>15 Parameters Evaluated</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Bento 3: Zero Penalties */}
        <div className="juspay-light-card p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                ACCESSIBILITY
              </span>
              <div className="p-2 rounded-full bg-slate-100 text-slate-700 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Plus className="h-4 w-4" />
              </div>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 font-heading leading-tight">
              Zero WCAG Level AA Penalty Deductions
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Enforces 100% image alt text coverage and ARIA landmarks to eliminate penalties and score 98.5 (Grade A+ Industry Benchmark).
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-emerald-600">
            <span>WCAG Level AA Verified</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Bento 4: URL Comparison */}
        <div className="juspay-light-card p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider rounded-full bg-purple-50 text-purple-600 border border-purple-200">
                BENCHMARKING
              </span>
              <div className="p-2 rounded-full bg-slate-100 text-slate-700 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Plus className="h-4 w-4" />
              </div>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 font-heading leading-tight">
              Side-by-Side URL Comparison & PDF
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Compare any two websites side-by-side and export 1 unified comparative PDF report with tailored AI improvement code solutions.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-purple-600">
            <span>Unified PDF Export</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </section>
  );
}
