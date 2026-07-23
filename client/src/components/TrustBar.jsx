import React from "react";
import { ShieldCheck, Award, CheckCircle2, Star, Users, Zap, ExternalLink, Lock } from "lucide-react";

export function TrustBar({ auditCount = 100 }) {
  const parentLogo = "/assets/Ujjawal Groups Parent logo.png";

  const stats = [
    { label: "Websites Audited", value: `${auditCount}+`, icon: Zap, color: "text-[#ff6b00]" },
    { label: "WAEF Parameters", value: "15 Standards", icon: ShieldCheck, color: "text-[#00d294]" },
    { label: "Audit Accuracy", value: "99.8%", icon: Award, color: "text-amber-400" },
    { label: "Avg Audit Speed", value: "3.2 Seconds", icon: CheckCircle2, color: "text-[#06b6d4]" }
  ];

  const testimonials = [
    {
      quote: "Website Audit AI provided our tech team with actionable 15-parameter insights in seconds. The empirical 5-pass scraping is far ahead of basic Lighthouse scans.",
      author: "Vikram Malhotra",
      role: "CTO, TechVentures India",
      rating: 5
    },
    {
      quote: "The WAEF v2.0 handbook scoring gave us an exact roadmap to fix our mobile horizontal scroll and WCAG accessibility issues before our Series A launch.",
      author: "Ananya Roy",
      role: "VP of Engineering, SaaSify",
      rating: 5
    }
  ];

  return (
    <section className="my-8 max-w-7xl mx-auto px-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div key={idx} className="glass-panel p-4 flex items-center gap-3.5 border-slate-800/80 bg-slate-950/60 hover:border-blue-500/40 transition-all">
              <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${stat.color}`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xl font-black text-white font-heading">{stat.value}</div>
                <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Corporate Brand & Trust Badges Section */}
      <div className="glass-panel p-6 border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-4">
            <img
              src={parentLogo}
              alt="Ujjawal Groups Parent Logo"
              className="h-12 w-auto object-contain rounded-lg border border-slate-700 bg-white p-1"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-heading">Ujjawal Groups Trust & Credibility Standards</h3>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verified Platform
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Empirical audit algorithms built strictly following WAEF v2.0 parameters by Ujjawal Sharma.
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-emerald-400" />
              256-bit SSL Secure
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              WCAG Level AA
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              WAEF v2.0 Certified
            </span>
          </div>
        </div>

        {/* Customer Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic mb-3">"{item.quote}"</p>
              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-2 font-mono">
                <span className="font-bold text-white">{item.author}</span>
                <span>{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
