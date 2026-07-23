import React from "react";
import { BookOpen, ExternalLink, ShieldAlert, Award, FileText, CheckCircle2 } from "lucide-react";
import { WqiGauge } from "./WqiGauge";
import { ScoreSummaryCard } from "./ScoreSummaryCard";
import { ParameterBreakdown } from "./ParameterBreakdown";
import { PenaltyTracker } from "./PenaltyTracker";
import { DecisionMatrix } from "./DecisionMatrix";
import { LeaderBenchmark } from "./LeaderBenchmark";

export function IrctcCaseStudy({ irctcReport }) {
  if (!irctcReport) {
    return <div className="p-8 text-center text-slate-400">Loading IRCTC Audit Benchmark...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Chapter 11 Header Banner */}
      <div className="glass-panel p-6 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-indigo-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
              <BookOpen className="h-3.5 w-3.5" /> Handbook Chapter 11 Case Study
            </div>
            <h2 className="text-2xl font-black text-white">IRCTC Website Full Audit Report</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Real-world benchmark audit of Indian Railway Catering and Tourism Corporation (IRCTC) evaluated using WAEF v1.0 framework by Ujjawal Sharma.
            </p>
          </div>

          <a
            href="https://www.irctc.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-indigo-400 text-xs font-semibold text-indigo-300 rounded-xl flex items-center gap-2 transition-all"
          >
            Visit IRCTC Website <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Main Score Gauge */}
      <WqiGauge report={irctcReport} />

      {/* Quick Summary Cards */}
      <ScoreSummaryCard summary={irctcReport.crawlSummary} />

      {/* 15 Parameters Breakdown */}
      <ParameterBreakdown parameters={irctcReport.parameters} />

      {/* Decision Matrix */}
      <DecisionMatrix matrix={irctcReport.decisionMatrix} />

      {/* Leader Benchmarks */}
      <LeaderBenchmark benchmarks={irctcReport.benchmarkComparison} targetDomain="IRCTC.co.in" />

      {/* Auditor Reflection Note */}
      <div className="glass-panel p-6 bg-slate-950/80 border-slate-800 text-xs space-y-2">
        <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
          <Award className="h-4 w-4 text-indigo-400" /> Executive Auditor Summary (WAEF v1.0)
        </h4>
        <p className="text-slate-300 leading-relaxed">
          While IRCTC successfully processes millions of daily bookings with strong security (HTTPS, OTP, SSL score 6.5/7), its total Website Quality Index (WQI = 67.5 / Grade C) reflects functional performance with usability bottlenecks in Visual Aesthetics (5/8), Navigation Architecture (7/10), and WCAG Accessibility (5.5/10).
        </p>
      </div>
    </div>
  );
}
