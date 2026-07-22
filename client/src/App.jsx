import React, { useState } from "react";
import { Header } from "./components/Header";
import { UrlAuditForm } from "./components/UrlAuditForm";
import { WqiGauge } from "./components/WqiGauge";
import { ScoreSummaryCard } from "./components/ScoreSummaryCard";
import { ParameterBreakdown } from "./components/ParameterBreakdown";
import { PenaltyTracker } from "./components/PenaltyTracker";
import { DecisionMatrix } from "./components/DecisionMatrix";
import { ManualAuditSheet } from "./components/ManualAuditSheet";
import { generateDetailedPdfReport } from "./utils/pdfGenerator";
import { Download, AlertTriangle, ShieldCheck, FileText, Lock, Globe, Share2, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function App() {
  const [activeTab, setActiveTab] = useState("audit");
  const [isLoading, setIsLoading] = useState(false);
  const [auditStep, setAuditStep] = useState("");
  const [auditReport, setAuditReport] = useState(null);
  const [error, setError] = useState(null);

  // Legal Modal States
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // User Name Ownership (Ujjawal Sharma)
  const auditorName = "Ujjawal Sharma";

  // API Base URL (Express server running on port 5000)
  const API_BASE = "http://localhost:5000";

  // Run live URL audit
  const handleStartAudit = async (targetUrl, apiKey) => {
    setIsLoading(true);
    setError(null);
    setAuditReport(null);

    const steps = [
      "1/5 Pass 1: Desktop DOM & Structural Scrape...",
      "2/5 Pass 2: Mobile 375px Viewport Audit...",
      "3/5 Pass 3: Tablet 768px Viewport Audit...",
      "4/5 Pass 4: Security, HTTPS & Cookie Audit...",
      "5/5 Pass 5: 5-Sample Network Latency Audit & WAEF Calculation..."
    ];

    let stepIndex = 0;
    setAuditStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setAuditStep(steps[stepIndex]);
    }, 1200);

    try {
      const response = await fetch(`${API_BASE}/api/audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl, apiKey })
      });

      const data = await response.json();
      clearInterval(stepInterval);
      setIsLoading(false);

      if (data.success && data.report) {
        setAuditReport(data.report);
        if (data.report.scores.finalWqi >= 80) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
      } else {
        setError(data.error || "Failed to audit website. Please verify URL and server status.");
      }
    } catch (err) {
      clearInterval(stepInterval);
      setIsLoading(false);
      setError(`Backend Server Error: ${err.message}. Make sure backend server is running on port 5000.`);
    }
  };

  // Download Detailed PDF Report
  const handleDownloadPdf = () => {
    if (auditReport) {
      generateDetailedPdfReport(auditReport, auditorName);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 pb-16 px-4">
      {/* Top Fixed Container */}
      <div className="max-w-7xl mx-auto">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab 1: Live AI Audit Engine */}
        {activeTab === "audit" && (
          <main className="space-y-6">
            <UrlAuditForm onStartAudit={handleStartAudit} isLoading={isLoading} auditStep={auditStep} />

            {error && (
              <div className="glass-panel p-4 bg-rose-950/50 border-rose-600/50 text-rose-300 text-xs flex items-center justify-between gap-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="px-3 py-1 bg-rose-900 border border-rose-700 rounded-lg text-white font-semibold hover:bg-rose-800"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Audit Results View */}
            {auditReport && (
              <div className="space-y-6 animate-fadeIn">
                {/* Actions Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-sm font-bold text-white">
                      5-Pass Audit Complete for: <strong className="text-blue-400">{auditReport.meta.domain}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDownloadPdf}
                      aria-label="Download Detailed PDF Report"
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all"
                    >
                      <Download className="h-4 w-4" /> Download Detailed PDF Report
                    </button>
                  </div>
                </div>

                {/* Score Gauge */}
                <WqiGauge report={auditReport} />

                {/* Crawl Summary Metrics */}
                <ScoreSummaryCard summary={auditReport.crawlSummary} />

                {/* 15 Parameters Breakdown */}
                <ParameterBreakdown parameters={auditReport.parameters} />

                {/* Penalties Tracker */}
                <PenaltyTracker penalties={auditReport.penalties} totalPenalties={auditReport.scores.totalPenalties} />

                {/* Decision Matrix */}
                <DecisionMatrix matrix={auditReport.decisionMatrix} />
              </div>
            )}
          </main>
        )}

        {/* Tab 2: Manual Blank Sheet */}
        {activeTab === "manual" && (
          <main className="animate-fadeIn">
            <ManualAuditSheet />
          </main>
        )}

        {/* Footer Attribution & Copyright Ownership */}
        <footer className="mt-16 border-t border-slate-900 pt-8 pb-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-200 text-sm mb-1">
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                <span>Website Audit AI — WAEF v2.0</span>
              </div>
              <p className="text-slate-400">
                Official Website Quality Index (WQI) 5-Pass Audit Framework by <strong>{auditorName}</strong> (VIT Bhopal University)
              </p>
            </div>

            {/* Legal Links & Badges */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <a
                href="#privacy"
                onClick={(e) => { e.preventDefault(); setIsPrivacyOpen(true); }}
                className="hover:text-blue-400 transition-all flex items-center gap-1 text-slate-300"
              >
                <FileText className="h-3.5 w-3.5 text-blue-400" /> Privacy Policy
              </a>
              <a
                href="#terms"
                onClick={(e) => { e.preventDefault(); setIsTermsOpen(true); }}
                className="hover:text-blue-400 transition-all flex items-center gap-1 text-slate-300"
              >
                <Lock className="h-3.5 w-3.5 text-indigo-400" /> Terms of Service
              </a>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter Profile"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="border-t border-slate-900/60 pt-4 text-center text-slate-500 font-medium">
            Developed & Audited by <strong>{auditorName}</strong> (VIT Bhopal University) • © 2026 <strong>{auditorName}</strong>. All Rights Reserved.
          </div>
        </footer>
      </div>

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-2xl p-6 relative border-blue-500/30">
            <button onClick={() => setIsPrivacyOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-2">Privacy Policy & Data Security</h3>
            <p className="text-xs text-slate-300 space-y-2">
              Website Audit AI respects your privacy. When auditing URLs, only public DOM elements, HTML structure, and server response times are analyzed. No personal data or non-public server credentials are ever collected or stored.
            </p>
            <div className="mt-4 text-right">
              <button onClick={() => setIsPrivacyOpen(false)} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {isTermsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-2xl p-6 relative border-indigo-500/30">
            <button onClick={() => setIsTermsOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-2">Terms of Service & WAEF v2.0 License</h3>
            <p className="text-xs text-slate-300">
              The Website Audit & Evaluation Framework (WAEF v2.0) is authored by <strong>Ujjawal Sharma</strong> (VIT Bhopal University, 2026). All mathematical scoring formulas, parameter rules, and audit outputs are protected under copyright © 2026 Ujjawal Sharma.
            </p>
            <div className="mt-4 text-right">
              <button onClick={() => setIsTermsOpen(false)} className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
