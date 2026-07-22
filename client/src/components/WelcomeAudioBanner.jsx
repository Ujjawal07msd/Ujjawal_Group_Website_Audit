import React, { useState } from "react";
import { Sparkles, Play, Volume2, ShieldCheck, Zap, ArrowRight, Radio } from "lucide-react";

export function WelcomeAudioBanner({ onPlayVideo }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleVoiceIntro = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = "Welcome to Ujjawal Groups Website Audit AI. Audit your website, uncover critical WQI parameters, and elevate your digital performance!";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Voice intro is not supported on this browser.");
    }
  };

  return (
    <div className="glass-panel p-6 my-6 border-blue-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden shadow-2xl">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Animated Title & Slogan */}
        <div className="space-y-2.5 text-center lg:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>Ujjawal Groups Official Brand Experience</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading leading-tight">
            Welcome to <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Ujjawal Groups</span> Website Audit AI
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Audit your website, analyze 15 empirical WAEF v2.0 parameters, eliminate WCAG penalties, and scale your web performance to 95+ (A+ Grade).
          </p>
        </div>

        {/* Right Side: High-Impact Trigger Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          
          {/* Voice Intro Synthesizer */}
          <button
            onClick={handleVoiceIntro}
            className={`px-4 py-3 rounded-2xl font-bold text-xs transition-all flex items-center gap-2.5 border ${
              isSpeaking
                ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-lg shadow-amber-500/20 animate-pulse"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
            }`}
          >
            <Radio className={`h-4 w-4 ${isSpeaking ? "text-amber-400 animate-spin" : "text-slate-400"}`} />
            <span>{isSpeaking ? "Speaking Audio Intro..." : "Hear Voice Intro 🎙️"}</span>
          </button>

          {/* Launch Animation & Music Video */}
          <button
            onClick={onPlayVideo}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-2xl shadow-2xl shadow-blue-500/30 flex items-center gap-3 border border-blue-400/40 hover:scale-105 transition-all"
          >
            <div className="p-1 rounded-lg bg-white/20">
              <Play className="h-4 w-4 fill-current" />
            </div>
            <span>Play Animation & Music 🔊</span>
          </button>
        </div>

      </div>
    </div>
  );
}
