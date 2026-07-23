import React, { useState } from "react";
import { Cpu, ShieldCheck, Zap, Globe, Plus, Minus, Sparkles, CheckCircle2, ArrowRight, X, FileCode, GitCompare, Layers, ExternalLink } from "lucide-react";

export function JuspayBentoShowcase({ onStartAudit, onOpenCompare, onOpenRoadmap, onSelectSample }) {
  const [activeModalCard, setActiveModalCard] = useState(null); // null or 1, 2, 3, 4

  const cardsData = [
    {
      id: 1,
      tag: "CRAWL PIPELINE",
      tagColor: "bg-emerald-50 text-[#00d294] border-emerald-200",
      btnColor: "group-hover:bg-[#00d294] group-hover:text-slate-950",
      accentColor: "text-[#00d294]",
      title: "5-Pass Live DOM Scraping & Network Latency",
      description: "Audits desktop DOM structural integrity, mobile 375px viewports, tablet layout, HTTPS SSL security, and 5-sample network response latency averages.",
      linkText: "5-Pass Scrape Execution",
      badge: "Pass 1 to 5 Scrape Active",
      details: {
        headline: "5-Pass Live Empirical Scraping Architecture",
        summary: "The WAEF v2.0 engine performs 5 separate automated scraping passes on every target URL to ensure zero subjective bias.",
        passes: [
          { name: "Pass 1: Desktop DOM Scrape", spec: "1280x800 Viewport", desc: "Analyzes H1-H6 hierarchy, title tags, meta descriptions, image ALT attributes, forms, and DOM node count." },
          { name: "Pass 2: Mobile Viewport Audit", spec: "375x667 Viewport", desc: "Tests meta viewport scaling, horizontal layout overflow (scrollWidth > 375px), and 48x48px touch targets." },
          { name: "Pass 3: Tablet Responsive Check", spec: "768x1024 Viewport", desc: "Verifies tablet breakpoint grid shifts, touch navigation drawer, and font leading ratios." },
          { name: "Pass 4: Security & Privacy Check", spec: "HTTPS / SSL / Privacy Policy", desc: "Inspects 256-bit SSL certificate validity, Privacy Policy links, Terms of Service, and OWASP headers." },
          { name: "Pass 5: 5-Sample Network Latency", spec: "Core Web Vitals Latency", desc: "Measures 5 consecutive HTTP fetch latency samples to calculate true server response time average." }
        ],
        actionLabel: "Run 5-Pass Demo Audit (Ujjawal Groups)",
        action: () => {
          setActiveModalCard(null);
          if (onSelectSample) onSelectSample("https://ujjawal-group-website-audit.vercel.app/");
        }
      }
    },
    {
      id: 2,
      tag: "EVALUATION MATRIX",
      tagColor: "bg-cyan-50 text-cyan-600 border-cyan-200",
      btnColor: "group-hover:bg-[#06b6d4] group-hover:text-white",
      accentColor: "text-cyan-600",
      title: "Itemized 15-Parameter WAEF v2.0 Handbook",
      description: "Evaluates accessibility, performance, mobile responsiveness, typography, security, and usability heuristics across all 100 marks.",
      linkText: "15 Parameters Evaluated",
      badge: "100 Marks Total",
      details: {
        headline: "Itemized 15-Parameter WAEF v2.0 Weight Distribution",
        summary: "Replaces vague subjective scores with 15 quantitatively weighted parameters (summing to 100 marks total).",
        parameters: [
          { name: "Navigation & Information Architecture", weight: "10 Marks", std: "Jakob's Law" },
          { name: "Mobile Responsiveness", weight: "10 Marks", std: "Google Mobile-Friendly" },
          { name: "Performance & Core Web Vitals", weight: "10 Marks", std: "Core Web Vitals" },
          { name: "Accessibility (WCAG Level AA)", weight: "10 Marks", std: "WCAG 2.2" },
          { name: "Visual Design & Aesthetics", weight: "8 Marks", std: "Visual Design Laws" },
          { name: "Content Quality & Clarity", weight: "8 Marks", std: "Content UX" },
          { name: "Homepage First Impression", weight: "7 Marks", std: "3-Second Rule" },
          { name: "Security & Trust Signals", weight: "7 Marks", std: "HTTPS / OWASP" },
          { name: "Brand Identity & Consistency", weight: "5 Marks", std: "Brand Guidelines" },
          { name: "Typography & Readability", weight: "5 Marks", std: "WCAG Readability" },
          { name: "Search & Findability", weight: "5 Marks", std: "IR Principles" },
          { name: "Forms & User Interaction", weight: "5 Marks", std: "Baymard Institute" },
          { name: "SEO & Technical Quality", weight: "5 Marks", std: "Google SEO" },
          { name: "Social Presence & Community", weight: "3 Marks", std: "Social Engagement" },
          { name: "Overall UX Heuristics", weight: "2 Marks", std: "Nielsen's 10 Laws" }
        ],
        actionLabel: "Explore Product Roadmap",
        action: () => {
          setActiveModalCard(null);
          if (onOpenRoadmap) onOpenRoadmap();
        }
      }
    },
    {
      id: 3,
      tag: "ACCESSIBILITY",
      tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      btnColor: "group-hover:bg-emerald-600 group-hover:text-white",
      accentColor: "text-emerald-600",
      title: "Zero WCAG Level AA Penalty Deductions",
      description: "Enforces 100% image alt text coverage and ARIA landmarks to eliminate penalties and score 96.5 (Grade A+ Industry Benchmark).",
      linkText: "WCAG Level AA Verified",
      badge: "0 Penalties Capped",
      details: {
        headline: "Official Handbook Chapter 7 Penalty System",
        summary: "Penalty points are verified through empirical checks and subtracted from the Raw WQI score (capped at 20 deduction points max).",
        penalties: [
          { code: "-10 Pts", title: "Missing HTTPS / Invalid SSL", desc: "Deducted if target domain serves over unencrypted HTTP." },
          { code: "-5 Pts", title: "Extremely Slow Load (> 6.0s)", desc: "Deducted if 5-pass average response time exceeds 6 seconds." },
          { code: "-5 Pts", title: "Major WCAG Alt Text Gap (> 35%)", desc: "Deducted if over 35% of images on page lack descriptive ALT text." },
          { code: "-3 Pts", title: "Missing Privacy Policy", desc: "Deducted if no Privacy Policy footer link is detected." },
          { code: "-2 Pts", title: "Mobile Horizontal Scroll", desc: "Deducted if page triggers horizontal scrolling on 375px screen." },
          { code: "-2 Pts", title: "Small Touch Targets (< 48px)", desc: "Deducted if clickable buttons fail the 48x48px mobile touch requirement." }
        ],
        actionLabel: "Audit IRCTC Govt Portal Demo (67.5 Grade C)",
        action: () => {
          setActiveModalCard(null);
          if (onSelectSample) onSelectSample("https://irctc.co.in");
        }
      }
    },
    {
      id: 4,
      tag: "BENCHMARKING",
      tagColor: "bg-orange-50 text-[#ff6b00] border-orange-200",
      btnColor: "group-hover:bg-[#ff6b00] group-hover:text-white",
      accentColor: "text-[#ff6b00]",
      title: "Side-by-Side URL Comparison & PDF",
      description: "Compare any two websites side-by-side and export 1 unified comparative PDF report with tailored AI improvement code solutions.",
      linkText: "Unified PDF Export",
      badge: "Side-by-Side Active",
      details: {
        headline: "Side-by-Side Dual URL Comparison Engine",
        summary: "Allows tech teams and stakeholders to audit two websites side-by-side, spot parameter-by-parameter differences, and export an executive PDF report.",
        features: [
          { name: "Parameter Score Diff Matrix", desc: "Renders side-by-side score bars comparing Domain A vs Domain B across all 15 parameters." },
          { name: "Crawl Latency Comparison", desc: "Plots 5-sample latency averages to determine which site loads faster under peak traffic." },
          { name: "Automated Winner Determination", desc: "Calculates total point delta (+13 pts) and highlights the WAEF Industry Leader." },
          { name: "Branded PDF Export", desc: "Exports a high-resolution, print-ready PDF report formatted for executive presentations." }
        ],
        actionLabel: "Launch Side-by-Side URL Comparison Modal",
        action: () => {
          setActiveModalCard(null);
          if (onOpenCompare) onOpenCompare();
        }
      }
    }
  ];

  const selectedCard = cardsData.find((c) => c.id === activeModalCard);

  return (
    <section className="my-12 space-y-8">
      {/* Header Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d294]/10 border border-[#00d294]/30 text-[#00d294] text-xs font-mono font-bold uppercase">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
          <span>RESULTS THAT DEFINE UJJAWAL GROUPS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
          Engineering Excellence in <span className="bg-gradient-to-r from-[#00d294] via-[#06b6d4] to-[#38bdf8] bg-clip-text text-transparent">Web Auditing</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-sans">
          Replaces subjective opinions with a reproducible 100-mark empirical evaluation engine. Click any card or <strong className="text-white">+</strong> icon to open deep-dive details.
        </p>
      </div>

      {/* Juspay-inspired Light Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="juspay-light-card p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group cursor-pointer transition-all hover:scale-[1.01]"
            onClick={() => setActiveModalCard(card.id)}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider rounded-full border ${card.tagColor}`}>
                  {card.tag}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalCard(card.id);
                  }}
                  title={`Click to expand ${card.title}`}
                  aria-label={`Expand details for ${card.title}`}
                  className={`p-2.5 rounded-full bg-slate-100 text-slate-800 transition-all ${card.btnColor} shadow-md`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 font-heading leading-tight group-hover:text-slate-950 transition-colors">
                {card.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {card.description}
              </p>
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                setActiveModalCard(card.id);
              }}
              className={`pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold ${card.accentColor} hover:underline`}
            >
              <span>{card.linkText}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Bento Card Deep-Dive Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalCard(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 border border-slate-700 text-[#00d294]">
                <Layers className="h-3.5 w-3.5 text-amber-400" />
                <span>{selectedCard.tag} DEEP-DIVE</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white font-heading">
                {selectedCard.details.headline}
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {selectedCard.details.summary}
              </p>
            </div>

            {/* Card 1: 5 Passes Breakdown */}
            {selectedCard.id === 1 && (
              <div className="space-y-3">
                {selectedCard.details.passes.map((p, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#00d294]" />
                        {p.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#00d294] bg-[#00d294]/10 px-2 py-0.5 rounded border border-[#00d294]/20">
                        {p.spec}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{p.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Card 2: 15 Parameters Grid */}
            {selectedCard.id === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedCard.details.parameters.map((param, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white text-[11px]">{param.name}</div>
                      <div className="text-[10px] text-slate-400">{param.std}</div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 rounded border border-cyan-500/20 shrink-0">
                      {param.weight}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Card 3: Penalty Rules */}
            {selectedCard.id === 3 && (
              <div className="space-y-2.5">
                {selectedCard.details.penalties.map((pen, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                    <span className="px-2.5 py-1 text-xs font-mono font-black text-rose-400 bg-rose-500/10 rounded border border-rose-500/30 shrink-0">
                      {pen.code}
                    </span>
                    <div>
                      <div className="font-bold text-white text-xs">{pen.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{pen.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Card 4: Comparison Features */}
            {selectedCard.id === 4 && (
              <div className="space-y-3">
                {selectedCard.details.features.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <div className="font-bold text-xs text-orange-400 flex items-center gap-2">
                      <GitCompare className="h-3.5 w-3.5" />
                      {feat.name}
                    </div>
                    <div className="text-[11px] text-slate-300">{feat.desc}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Trigger Button */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalCard(null)}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
              >
                Close
              </button>
              <button
                onClick={selectedCard.details.action}
                className="px-5 py-2.5 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-[#00d294] via-[#06b6d4] to-[#38bdf8] hover:opacity-90 rounded-xl shadow-lg flex items-center gap-2 transition-all"
              >
                <span>{selectedCard.details.actionLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
