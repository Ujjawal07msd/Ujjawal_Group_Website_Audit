import React from "react";
import { Sparkles, ArrowRight, Play, ShieldCheck, Zap, Globe, Award, CheckCircle2, Lock } from "lucide-react";

export function JuspayHeroOrbit({ onOpenVideo, onStartAuditScroll }) {
  const logoPng = "/assets/Ujjawal Groups Website Audit logo.png";

  return (
    <section className="relative my-8 overflow-hidden rounded-3xl bg-[#060912] border border-[#00d294]/20 p-6 sm:p-12 text-white shadow-2xl">
      {/* Background Radial Glow Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00d294]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#06b6d4]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Hero Copy & Juspay Typography */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d294]/10 border border-[#00d294]/30 text-[#00d294] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>WEBSITE QUALITY OPERATING SYSTEM</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-heading leading-[1.08]">
            Global Website <br />
            <span className="bg-gradient-to-r from-[#00d294] via-[#06b6d4] to-[#38bdf8] bg-clip-text text-transparent">
              Quality Audit OS
            </span>
          </h1>

          {/* Body Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-sans font-normal">
            Trusted by enterprises worldwide, Ujjawal Groups simplifies web performance orchestration, eliminates WCAG Level AA penalties, and delivers 95+ (Grade A+) benchmarks.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartAuditScroll}
              className="px-7 py-3.5 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-extrabold text-xs sm:text-sm rounded-full shadow-2xl shadow-orange-500/30 flex items-center gap-2.5 border border-orange-400/40 hover:scale-105 transition-all group"
            >
              <span>Audit Your Website</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenVideo}
              className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs sm:text-sm rounded-full border border-slate-700/80 transition-all flex items-center gap-2.5 hover:scale-105"
            >
              <div className="p-1 rounded-full bg-[#00d294]/20 text-[#00d294]">
                <Play className="h-3.5 w-3.5 fill-current" />
              </div>
              <span>Watch Brand Experience</span>
            </button>
          </div>
        </div>

        {/* Right Column: Juspay Interactive Orbit Graphic */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] flex items-center justify-center">
            
            {/* Outer Orbit Ring */}
            <div className="absolute inset-0 rounded-full border border-[#00d294]/30 animate-orbit pointer-events-none">
              {/* Revolving Node 1: 98.5 Score */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-900 border border-[#00d294]/50 text-[11px] font-mono text-[#00d294] font-bold shadow-lg flex items-center gap-1">
                <Award className="h-3 w-3" />
                <span>98.5 Score</span>
              </div>

              {/* Revolving Node 2: 5-Pass Scrape */}
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900 border border-[#06b6d4]/50 text-[11px] font-mono text-[#06b6d4] font-bold shadow-lg flex items-center gap-1">
                <Zap className="h-3 w-3" />
                <span>5-Pass Scrape</span>
              </div>

              {/* Revolving Node 3: 0 Penalties */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-900 border border-emerald-500/50 text-[11px] font-mono text-emerald-400 font-bold shadow-lg flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                <span>0 Penalties</span>
              </div>

              {/* Revolving Node 4: WCAG AA */}
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-900 border border-amber-500/50 text-[11px] font-mono text-amber-400 font-bold shadow-lg flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>WCAG AA</span>
              </div>
            </div>

            {/* Inner Orbit Glow Circle */}
            <div className="absolute w-[200px] h-[200px] rounded-full border border-[#00d294]/20 bg-[#00d294]/5 blur-[2px]"></div>

            {/* Center Core Node */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 rounded-full bg-slate-950 border-2 border-[#00d294]/60 shadow-2xl shadow-[#00d294]/20 text-center w-[160px] h-[160px]">
              <img
                src={logoPng}
                alt="Ujjawal Groups Seal"
                className="h-10 w-auto object-contain mb-1 rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
              <span className="text-[10px] font-mono font-bold text-[#00d294] tracking-wider">WAEF v2.0</span>
              <span className="text-xs font-extrabold text-white">Ujjawal Groups</span>
            </div>

          </div>
        </div>

      </div>

      {/* Marquee Enterprise Client Ticker & Metrics Grid */}
      <div className="mt-12 pt-8 border-t border-slate-800/80">
        
        {/* Enterprise Logos Marquee */}
        <div className="flex items-center justify-between gap-8 opacity-60 text-xs font-mono font-bold tracking-widest uppercase overflow-x-auto py-2 no-scrollbar">
          <span className="hover:opacity-100 transition-opacity">FLIPKART</span>
          <span>&bull;</span>
          <span className="hover:opacity-100 transition-opacity">ONEPLUS</span>
          <span>&bull;</span>
          <span className="hover:opacity-100 transition-opacity">GOOGLE</span>
          <span>&bull;</span>
          <span className="hover:opacity-100 transition-opacity">MICROSOFT</span>
          <span>&bull;</span>
          <span className="hover:opacity-100 transition-opacity">INDIGO</span>
          <span>&bull;</span>
          <span className="hover:opacity-100 transition-opacity">UJJAWAL GROUPS</span>
        </div>

        {/* 4-Column Stat Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 text-center sm:text-left">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60">
            <div className="text-xs text-slate-400 font-mono font-bold uppercase">Audits Executed</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">100+</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">Real-time Incrementing</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60">
            <div className="text-xs text-slate-400 font-mono font-bold uppercase">WAEF Parameters</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-heading mt-1">15</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">100 Marks Total</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60">
            <div className="text-xs text-slate-400 font-mono font-bold uppercase">Applied Penalties</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading mt-1">0 Pts</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Capped Deductions</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60">
            <div className="text-xs text-slate-400 font-mono font-bold uppercase">Benchmark Score</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading mt-1">98.5</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">Grade A+ (Verified)</div>
          </div>
        </div>

      </div>
    </section>
  );
}
