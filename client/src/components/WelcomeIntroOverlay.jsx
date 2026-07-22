import React from "react";
import { Play, ShieldCheck, ArrowRight } from "lucide-react";

export function WelcomeIntroOverlay({ isOpen, onStart }) {
  if (!isOpen) return null;

  const logoPng = "/assets/Ujjawal Groups Website Audit logo.png";

  return (
    <div
      onClick={onStart}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#070a12] text-white selection:bg-blue-600 animate-fadeIn cursor-pointer"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-xl w-full text-center space-y-6 glass-panel p-8 sm:p-10 border-blue-500/30 bg-slate-950/90 shadow-2xl rounded-3xl backdrop-blur-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-xl hover:scale-105 transition-transform">
            <img
              src={logoPng}
              alt="Ujjawal Groups Website Audit Logo"
              className="h-14 w-auto object-contain rounded-xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Welcome Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading leading-tight">
            Welcome to <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Ujjawal Groups</span> Website Audit AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-sans">
            Empirical 5-Pass Web Scraping & 15-Parameter WAEF v2.0 Quality Index Platform.
          </p>
        </div>

        {/* Clean Launch Button */}
        <div className="pt-2 flex flex-col items-center gap-2">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm rounded-2xl shadow-2xl shadow-blue-500/40 flex items-center justify-center gap-3 border border-blue-400/40 hover:scale-105 transition-all group"
          >
            <div className="p-1 rounded-lg bg-white/20">
              <Play className="h-4 w-4 fill-current" />
            </div>
            <span>Launch Platform & Animation 🔊</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Clean Footer */}
        <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
          Engineered by <strong>Ujjawal Sharma</strong> &bull; Ujjawal Groups
        </div>
      </div>
    </div>
  );
}
