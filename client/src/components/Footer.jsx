import React, { useState } from "react";
import { ShieldCheck, ChevronDown, Mail, Globe, Lock, FileText, ExternalLink, Award, Heart } from "lucide-react";

export function Footer({ onOpenPrivacy, onOpenTerms, onOpenVideo }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const parentLogo = "/assets/Ujjawal Groups Parent logo.jpg";
  const logoPng = "/assets/Ujjawal Groups Website Audit logo.png";

  const faqs = [
    {
      q: "What is WAEF v2.0 and how is the WQI score calculated?",
      a: "WAEF v2.0 (Website Audit Evaluation Framework) evaluates websites across 15 core parameters worth 100 marks total. Scores are adjusted using quantitative rule deductions for issues like missing HTTPS, mobile horizontal scroll, slow latency, or WCAG accessibility failures."
    },
    {
      q: "Who owns and engineered Website Audit AI?",
      a: "Website Audit AI is engineered and maintained by Ujjawal Sharma under Ujjawal Groups. It uses automated 5-pass scraping algorithms and AI evaluators (ChatGPT, Gemini, Claude)."
    },
    {
      q: "How can I achieve a 95+ (A+) score on Website Audit AI?",
      a: "Ensure full mobile viewport responsiveness (375px), zero horizontal scroll, 100% alt text coverage, HTTPS SSL encryption, rich trust signals (testimonials, stats), and an expanded footer with privacy policy & terms."
    },
    {
      q: "Can I export PDF reports or share live audit links?",
      a: "Yes! Click the 'Export PDF Report' button in the audit summary card or use the 'Share Audit Report' button to copy a shareable report link."
    }
  ];

  return (
    <footer className="mt-16 bg-slate-950 border-t border-slate-800 text-slate-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* FAQ Accordion Section */}
        <div className="mb-12 pb-10 border-b border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-white font-heading">Frequently Asked Questions (FAQ)</h3>
            <p className="text-xs text-slate-400 mt-1">Everything you need to know about WAEF v2.0 handbook scoring & website audits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-panel p-4 border-slate-800/80 bg-slate-900/60 rounded-xl">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-3 text-xs font-bold text-white hover:text-blue-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${openFaqIndex === idx ? "rotate-180 text-blue-400" : "text-slate-500"}`} />
                </button>
                {openFaqIndex === idx && (
                  <p className="mt-2.5 text-xs text-slate-300 border-t border-slate-800/60 pt-2.5 leading-relaxed font-sans">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoPng}
                alt="Ujjawal Groups Website Audit Logo"
                className="h-10 w-auto object-contain rounded-md bg-slate-900 border border-slate-800 p-1"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
              <div>
                <h4 className="font-bold text-sm text-white font-heading">Website Audit AI</h4>
                <p className="text-[11px] text-blue-400 font-mono">Ujjawal Groups</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Official 5-Pass Empirical Web Scraping & 15-Parameter Quality Index Platform. Engineered by Ujjawal Sharma.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenVideo}
                className="px-3 py-1.5 text-xs font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1.5"
              >
                <span>Play Brand Intro Video</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation & Profiles */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-white font-mono mb-4">Audit Navigation</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#audit-form" className="hover:text-white transition-colors">Live 5-Pass AI Audit</a></li>
              <li><a href="#manual-sheet" className="hover:text-white transition-colors">Blank Audit Sheet</a></li>
              <li><a href="#schema" className="hover:text-white transition-colors">WAEF v2.0 Handbook Schema</a></li>
              <li>
                <a href="https://github.com/Ujjawal07msd" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1 text-blue-400">
                  GitHub Profile (@Ujjawal07msd) <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Standards */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-white font-mono mb-4">Legal & Compliance</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-white transition-colors flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5 text-emerald-400" /> Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenTerms} className="hover:text-white transition-colors flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5 text-blue-400" /> Terms of Service
                </button>
              </li>
              <li><span className="text-slate-500">WCAG 2.1 Level AA Compliant</span></li>
              <li><span className="text-slate-500">ISO 27001 Security Standard</span></li>
            </ul>
          </div>

          {/* Col 4: Corporate Parent Branding */}
          <div className="space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-white font-mono mb-2">Parent Organization</h5>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
              <img
                src={parentLogo}
                alt="Ujjawal Groups Parent"
                className="h-10 w-auto object-contain bg-white rounded p-0.5"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
              <div>
                <strong className="text-xs text-white block">Ujjawal Groups</strong>
                <span className="text-[11px] text-slate-400">Official Tech Division</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Empowering startups, developers, and enterprises with empirical web quality benchmarks.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Ownership */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Ujjawal Groups &bull; All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Engineered with precision by</span>
            <a href="https://github.com/Ujjawal07msd" target="_blank" rel="noreferrer" className="text-slate-300 font-bold hover:text-blue-400 hover:underline">
              Ujjawal Sharma
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
