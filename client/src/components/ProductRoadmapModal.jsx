import React from "react";
import { X, CheckCircle2, Clock, Sparkles, Rocket, ShieldCheck, Cpu, Code } from "lucide-react";

export function ProductRoadmapModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const phases = [
    {
      phase: "Phase 1 (Active & Live)",
      status: "Completed",
      badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      icon: CheckCircle2,
      items: [
        "Quantitative WAEF v2.0 15-Parameter Audit Engine",
        "5-Pass Empirical Web Scraping (1280px & 375px viewports)",
        "Accessibility & WCAG Level AA Penalty Detector",
        "Side-by-Side URL Comparison Mode (Google vs Example)",
        "PDF Report Generator & 1-Click Shareable Links",
        "Schema.org JSON-LD, Robots.txt & Sitemap.xml SEO Package"
      ]
    },
    {
      phase: "Phase 2 (In Active Development)",
      status: "In Progress",
      badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      icon: Clock,
      items: [
        "AI-Powered Score Prediction Engine (Estimated Gain +13 pts)",
        "LocalStorage Recent Audit History Log & Analytics",
        "Lighthouse Latency Sparklines & Core Web Vitals Graphs",
        "Multi-User Authentication & Saved Projects",
        "Dark / Light UI Theme Customization"
      ]
    },
    {
      phase: "Phase 3 (Upcoming Horizon)",
      status: "Planned",
      badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      icon: Rocket,
      items: [
        "Automated Scheduled Weekly Audits with Email Alerts",
        "Public REST API for Developer Integration",
        "Team Collaboration & Organization Workspaces",
        "CI/CD Build Pipeline Quality Gate Webhooks"
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel p-6 md:p-8 bg-slate-950/95 border-slate-800 shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-[#00d294] to-[#06b6d4] text-slate-950">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white font-heading flex items-center gap-2">
                Product Roadmap 2026
                <span className="text-xs px-2.5 py-0.5 font-mono font-bold bg-slate-900 text-[#00d294] rounded-md border border-emerald-500/30">
                  WAEF v2.0
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Official development trajectory engineered by Ujjawal Sharma & Ujjawal Groups.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Product Roadmap Modal"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Roadmap Phases Grid */}
        <div className="space-y-6">
          {phases.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div key={idx} className="glass-panel p-5 bg-slate-900/70 border-slate-800/80 rounded-2xl">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <IconComp className="h-5 w-5 text-indigo-400" />
                    <h4 className="text-sm font-extrabold text-white font-heading">{p.phase}</h4>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border uppercase ${p.badgeBg}`}>
                    {p.status}
                  </span>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                  {p.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                      <span className="text-[#00d294] font-bold mt-0.5">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Feedback or Feature Request?</span>
          <a
            href="https://github.com/Ujjawal07msd/Ujjawal_Group_Website_Audit/issues"
            target="_blank"
            rel="noreferrer"
            className="text-[#00d294] font-bold hover:underline"
          >
            Submit GitHub Issue &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
