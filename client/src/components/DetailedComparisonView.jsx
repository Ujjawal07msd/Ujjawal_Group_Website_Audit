import React from "react";
import {
  Download,
  Trophy,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Globe,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Zap,
  Smartphone,
  FileText
} from "lucide-react";
import { generateDetailedPdfReport, generateComparativePdfReport } from "../utils/pdfGenerator";

export function DetailedComparisonView({ compareData, onOpenCompareModal, onCloseCompare }) {
  if (!compareData || !compareData.reportA || !compareData.reportB) return null;

  const { reportA, reportB } = compareData;
  const domA = reportA.meta.domain;
  const domB = reportB.meta.domain;

  const scoreA = reportA.scores.finalWqi;
  const scoreB = reportB.scores.finalWqi;

  const winner = scoreA > scoreB ? reportA : scoreB > scoreA ? reportB : null;
  const isTie = scoreA === scoreB;
  const diff = Math.abs(Math.round((scoreA - scoreB) * 10) / 10);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner & Download Action Bar */}
      <div className="glass-panel p-6 border-indigo-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1.5 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-bold">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>WAEF v2.0 Comparative Audit Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Side-by-Side Website Comparison
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-mono">
            Comparing <span className="text-blue-400 font-bold">{domA}</span> vs <span className="text-indigo-400 font-bold">{domB}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => generateComparativePdfReport(reportA, reportB)}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/30 flex items-center gap-2 border border-blue-400/40 hover:scale-105 transition-all"
          >
            <Download className="h-4 w-4" />
            <span>Download Unified Comparative PDF (1 PDF) 📄</span>
          </button>

          <button
            onClick={onOpenCompareModal}
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-2 border border-slate-700"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Compare Different URLs</span>
          </button>

          {onCloseCompare && (
            <button
              onClick={onCloseCompare}
              className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-semibold text-xs rounded-xl border border-slate-800"
            >
              Close Comparison
            </button>
          )}
        </div>
      </div>

      {/* Benchmark Winner Showcase Banner */}
      <div className="glass-panel p-6 border-amber-500/30 bg-gradient-to-r from-slate-950 via-amber-950/20 to-slate-950 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-400 shrink-0">
              <Trophy className="h-8 w-8 animate-bounce" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Benchmark Quality Winner
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                {isTie ? (
                  <span>Both websites tied with an identical WQI score of {scoreA}/100!</span>
                ) : (
                  <span>
                    <strong className="text-amber-300">{winner.meta.domain}</strong> leads by{" "}
                    <span className="text-emerald-400 font-extrabold">+{diff} WQI Points</span>!
                  </span>
                )}
              </h3>
            </div>
          </div>

          {/* Individual PDF Download Shortcuts */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => generateDetailedPdfReport(reportA)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-blue-500 text-blue-400 hover:text-blue-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>PDF: {domA}</span>
            </button>
            <button
              onClick={() => generateDetailedPdfReport(reportB)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-indigo-500 text-indigo-400 hover:text-indigo-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>PDF: {domB}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side WQI Score Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Site A Card */}
        <div className={`glass-panel p-6 space-y-4 border-2 ${scoreA >= scoreB ? 'border-blue-500/50 shadow-blue-500/10' : 'border-slate-800'} relative`}>
          {scoreA > scoreB && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold font-mono">
              🏆 WINNER (+{diff})
            </div>
          )}
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-blue-400" />
            <div>
              <h3 className="font-extrabold text-white text-lg font-heading">{domA}</h3>
              <p className="text-xs text-slate-400 font-mono">SITE A &bull; {reportA.meta.auditedUrl}</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div>
              <div className="text-xs text-slate-400 font-mono uppercase font-bold">WQI SCORE</div>
              <div className="text-4xl font-extrabold text-blue-400 font-heading">
                {scoreA} <span className="text-sm text-slate-500 font-sans">/ 100</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 font-mono uppercase font-bold">GRADE</div>
              <div className="text-2xl font-extrabold text-white font-heading">
                Grade {reportA.scores.grade}
              </div>
              <div className="text-xs text-slate-400">{reportA.scores.interpretation}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-slate-500">Raw Score</div>
              <div className="font-bold text-white">{reportA.scores.rawWqi}</div>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-slate-500">Penalties</div>
              <div className="font-bold text-rose-400">-{reportA.scores.totalPenalties}</div>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-slate-500">Latency</div>
              <div className="font-bold text-amber-400">{reportA.crawlSummary.responseTimeMs}ms</div>
            </div>
          </div>
        </div>

        {/* Site B Card */}
        <div className={`glass-panel p-6 space-y-4 border-2 ${scoreB >= scoreA ? 'border-indigo-500/50 shadow-indigo-500/10' : 'border-slate-800'} relative`}>
          {scoreB > scoreA && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold font-mono">
              🏆 WINNER (+{diff})
            </div>
          )}
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-indigo-400" />
            <div>
              <h3 className="font-extrabold text-white text-lg font-heading">{domB}</h3>
              <p className="text-xs text-slate-400 font-mono">SITE B &bull; {reportB.meta.auditedUrl}</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div>
              <div className="text-xs text-slate-400 font-mono uppercase font-bold">WQI SCORE</div>
              <div className="text-4xl font-extrabold text-indigo-400 font-heading">
                {scoreB} <span className="text-sm text-slate-500 font-sans">/ 100</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 font-mono uppercase font-bold">GRADE</div>
              <div className="text-2xl font-extrabold text-white font-heading">
                Grade {reportB.scores.grade}
              </div>
              <div className="text-xs text-slate-400">{reportB.scores.interpretation}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-slate-500">Raw Score</div>
              <div className="font-bold text-white">{reportB.scores.rawWqi}</div>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-slate-500">Penalties</div>
              <div className="font-bold text-rose-400">-{reportB.scores.totalPenalties}</div>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-slate-500">Latency</div>
              <div className="font-bold text-amber-400">{reportB.crawlSummary.responseTimeMs}ms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Crawl Performance Side-by-Side Comparison */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="font-bold text-lg text-white font-heading flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-400" />
          Empirical Crawl & DOM Performance Metrics Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3">Audit Metric</th>
                <th className="p-3 text-blue-400">{domA}</th>
                <th className="p-3 text-indigo-400">{domB}</th>
                <th className="p-3 text-right">Advantage / Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr>
                <td className="p-3 font-semibold text-white">HTTPS SSL Encryption</td>
                <td className="p-3">
                  {reportA.crawlSummary.isHttps ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Active SSL (+2)</span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle className="h-4 w-4" /> Insecure (0)</span>
                  )}
                </td>
                <td className="p-3">
                  {reportB.crawlSummary.isHttps ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Active SSL (+2)</span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle className="h-4 w-4" /> Insecure (0)</span>
                  )}
                </td>
                <td className="p-3 text-right font-mono text-slate-400">Strict HTTPS Standard</td>
              </tr>

              <tr>
                <td className="p-3 font-semibold text-white">Mobile Viewport (375px) Horizontal Scroll</td>
                <td className="p-3">
                  {reportA.crawlSummary.mobileAudit?.hasHorizontalScroll ? (
                    <span className="text-rose-400 font-bold">Overflow ({reportA.crawlSummary.mobileAudit.scrollWidth}px)</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">PASS (375px Clean)</span>
                  )}
                </td>
                <td className="p-3">
                  {reportB.crawlSummary.mobileAudit?.hasHorizontalScroll ? (
                    <span className="text-rose-400 font-bold">Overflow ({reportB.crawlSummary.mobileAudit.scrollWidth}px)</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">PASS (375px Clean)</span>
                  )}
                </td>
                <td className="p-3 text-right font-mono text-slate-400">0px Horizontal Overflow</td>
              </tr>

              <tr>
                <td className="p-3 font-semibold text-white">Missing Image Alt Text Count</td>
                <td className="p-3 font-mono">
                  {reportA.crawlSummary.missingAltCount > 0 ? (
                    <span className="text-amber-400 font-bold">{reportA.crawlSummary.missingAltCount} missing</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">0 Missing (100% Coverage)</span>
                  )}
                </td>
                <td className="p-3 font-mono">
                  {reportB.crawlSummary.missingAltCount > 0 ? (
                    <span className="text-amber-400 font-bold">{reportB.crawlSummary.missingAltCount} missing</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">0 Missing (100% Coverage)</span>
                  )}
                </td>
                <td className="p-3 text-right font-mono text-slate-400">WCAG Level A Standard</td>
              </tr>

              <tr>
                <td className="p-3 font-semibold text-white">Response Latency (5-Sample Average)</td>
                <td className="p-3 font-mono text-blue-400 font-bold">{reportA.crawlSummary.responseTimeMs} ms</td>
                <td className="p-3 font-mono text-indigo-400 font-bold">{reportB.crawlSummary.responseTimeMs} ms</td>
                <td className="p-3 text-right font-mono font-bold">
                  {reportA.crawlSummary.responseTimeMs < reportB.crawlSummary.responseTimeMs ? (
                    <span className="text-blue-400">{domA} Faster (-{reportB.crawlSummary.responseTimeMs - reportA.crawlSummary.responseTimeMs}ms)</span>
                  ) : reportB.crawlSummary.responseTimeMs < reportA.crawlSummary.responseTimeMs ? (
                    <span className="text-indigo-400">{domB} Faster (-{reportA.crawlSummary.responseTimeMs - reportB.crawlSummary.responseTimeMs}ms)</span>
                  ) : (
                    <span className="text-slate-400">Equal Speed</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 15-Parameter Itemized Side-by-Side Comparison Table */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-lg text-white font-heading">
              15-Parameter Detailed WQI Comparison Table
            </h3>
            <p className="text-xs text-slate-400">
              Itemized WAEF v2.0 handbook breakdown across all 100 marks
            </p>
          </div>
          <button
            onClick={() => generateComparativePdfReport(reportA, reportB)}
            className="px-3.5 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1.5 shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Table to PDF</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3 text-center">#</th>
                <th className="p-3">Parameter Name</th>
                <th className="p-3 text-center">Weight</th>
                <th className="p-3 text-center text-blue-400">{domA}</th>
                <th className="p-3 text-center text-indigo-400">{domB}</th>
                <th className="p-3 text-center">Parameter Winner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {reportA.parameters.map((pA, idx) => {
                const pB = reportB.parameters[idx] || { parameterScore: 0 };
                const pDiff = Math.round((pA.parameterScore - pB.parameterScore) * 10) / 10;

                return (
                  <tr key={pA.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-mono font-bold text-center text-slate-400">{pA.id}</td>
                    <td className="p-3 font-semibold text-white">
                      <div>{pA.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{pA.standard}</div>
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-slate-400">{pA.weight} pts</td>
                    <td className="p-3 text-center font-mono font-bold text-blue-400 text-sm">{pA.parameterScore}</td>
                    <td className="p-3 text-center font-mono font-bold text-indigo-400 text-sm">{pB.parameterScore}</td>
                    <td className="p-3 text-center font-mono font-bold">
                      {pDiff > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 text-[10px]">
                          {domA} (+{pDiff})
                        </span>
                      ) : pDiff < 0 ? (
                        <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-[10px]">
                          {domB} (+{Math.abs(pDiff)})
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[10px]">Tied</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
