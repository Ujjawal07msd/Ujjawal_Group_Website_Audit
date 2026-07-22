import React from "react";
import { Award, ExternalLink, ShieldCheck, CheckCircle2, Sparkles, Trophy } from "lucide-react";
import { WqiGauge } from "./WqiGauge";
import { ScoreSummaryCard } from "./ScoreSummaryCard";
import { ParameterBreakdown } from "./ParameterBreakdown";
import { PenaltyTracker } from "./PenaltyTracker";
import { DecisionMatrix } from "./DecisionMatrix";
import { LeaderBenchmark } from "./LeaderBenchmark";

export function GoldBenchmarkCaseStudy({ benchmarkReport }) {
  if (!benchmarkReport) {
    return <div className="p-8 text-center text-slate-400">Loading Gold Benchmark Case Study...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Gold Benchmark Header Banner */}
      <div className="glass-panel p-6 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-emerald-500/40 glow-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 mb-2">
              <Trophy className="h-3.5 w-3.5" /> Gold Standard Benchmark Case Study
            </div>
            <h2 className="text-3xl font-black text-white font-heading">Stripe.com Full Audit Showcase</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl font-medium">
              Stripe.com scores a near-perfect <strong>96.0 / 100 (Grade A+)</strong>, serving as the ultimate industry benchmark for visual design, developer UX, security, performance, and accessibility.
            </p>
          </div>

          <a
            href="https://stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
          >
            Visit Stripe.com <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Main Score Gauge */}
      <WqiGauge report={benchmarkReport} />

      {/* Quick Summary Cards */}
      <ScoreSummaryCard summary={benchmarkReport.crawlSummary} />

      {/* 15 Parameters Breakdown */}
      <ParameterBreakdown parameters={benchmarkReport.parameters} />

      {/* Decision Matrix */}
      <DecisionMatrix matrix={benchmarkReport.decisionMatrix} />

      {/* Global Leaders Comparison */}
      <LeaderBenchmark benchmarks={benchmarkReport.benchmarkComparison} targetDomain="Stripe.com (Gold Benchmark)" />

      {/* Auditor Reflection Note */}
      <div className="glass-panel p-6 bg-slate-950/90 border-slate-800 text-xs space-y-2">
        <h4 className="font-extrabold text-white text-sm flex items-center gap-2 font-heading">
          <Award className="h-4 w-4 text-emerald-400" /> Executive Benchmark Summary (WAEF v1.0)
        </h4>
        <p className="text-slate-300 leading-relaxed font-medium">
          Stripe.com exemplifies optimal engineering across all 15 parameters: 0 penalties, 100% image alt text coverage, 840ms page load speed, WCAG 2.2 Level AA accessibility compliance, and bank-grade SSL security. Websites audited on this platform are benchmarked directly against Stripe's 96.0 Grade A+ baseline.
        </p>
      </div>
    </div>
  );
}
