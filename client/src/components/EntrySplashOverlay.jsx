import React from "react";
import { Sparkles, Play, ShieldCheck, Zap, Volume2, ArrowRight } from "lucide-react";

export function EntrySplashOverlay({ isOpen, onEnter }) {
  if (!isOpen) return null;

  const logoPng = "/assets/Ujjawal Groups Website Audit logo.png";

  return (
    <div
      onClick={onEnter}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#070a12] text-white selection:bg-blue-600 animate-fadeIn cursor-pointer"
    >
      {/* Background Radial Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative max-w-2xl w-full text-center space-y-8 glass-panel p-8 sm:p-12 border-blue-500/30 bg-slate-950/90 shadow-2xl rounded-3xl backdrop-blur-2xl">
        
        {/* Brand Logo & Tagline */}
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-xl hover:scale-105 transition-transform">
            <img
              src={logoPng}
              alt="Ujjawal Groups Website Audit Logo"
              className="h-16 w-auto object-contain rounded-xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>Ujjawal Groups Official Interactive Intro</span>
          </div>
        </div>

        {/* Welcome Headline */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight">
            Welcome to <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Ujjawal Groups</span> Website Audit AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Audit your website, analyze 15 empirical WAEF v2.0 parameters, eliminate WCAG penalties, and elevate your web quality to 95+ (Grade A+).
          </p>
        </div>

        {/* Main Trigger Button */}
        <div className="pt-2 flex flex-col items-center gap-3">
          <button
            onClick={onEnter}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-2xl shadow-blue-500/40 flex items-center justify-center gap-3 border border-blue-400/40 hover:scale-105 transition-all group"
          >
            <div className="p-1.5 rounded-xl bg-white/20 group-hover:scale-110 transition-transform">
              <Play className="h-5 w-5 fill-current" />
            </div>
            <span>ENTER PLATFORM & PLAY ANIMATION 🔊</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <span className="text-[11px] font-mono text-slate-400">
            Click anywhere to launch intro animation with full unmuted sound
          </span>
        </div>

        {/* Footer Attribution */}
        <div className="pt-6 border-t border-slate-800/80 text-xs text-slate-500 font-mono">
          Engineered by <strong>Ujjawal Sharma</strong> &bull; Ujjawal Groups &bull; WAEF v2.0 Platform
        </div>
      </div>
    </div>
  );
}
