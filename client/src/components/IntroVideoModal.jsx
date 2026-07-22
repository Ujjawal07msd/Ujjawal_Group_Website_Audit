import React, { useRef, useEffect, useState } from "react";
import { X, Volume2, VolumeX, Sparkles, ShieldCheck, Play } from "lucide-react";

export function IntroVideoModal({ isOpen, onClose, logoImg, videoSrc }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false); // Default sound ON
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      setIsMuted(false);
      setAutoplayBlocked(false);

      videoRef.current.play().catch((err) => {
        console.warn("Browser blocked unmuted autoplay, playing muted until user interaction:", err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          setAutoplayBlocked(true);
          videoRef.current.play().catch((e) => console.error("Playback failed:", e));
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const enableSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      setIsMuted(false);
      setAutoplayBlocked(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      if (!videoRef.current.muted) {
        setAutoplayBlocked(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            {logoImg ? (
              <img src={logoImg} alt="Ujjawal Groups Logo" className="h-9 w-auto object-contain rounded-md" />
            ) : (
              <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg text-white font-heading flex items-center gap-2">
                Ujjawal Groups Website Audit
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Official Animation
                </span>
              </h3>
              <p className="text-xs text-slate-400">Welcome to WAEF v2.0 Quality Index Evaluator Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                isMuted
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                  : "bg-blue-600 text-white shadow-md shadow-blue-600/30 hover:bg-blue-500"
              }`}
              title={isMuted ? "Unmute Video Sound" : "Mute Video Sound"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span>Unmute Sound</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>Sound ON</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all flex items-center gap-1.5 border border-slate-700"
            >
              <span>Skip / Explore App</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video Player Container */}
        <div
          onClick={() => {
            if (isMuted) enableSound();
          }}
          className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden cursor-pointer"
        >
          <video
            ref={videoRef}
            src={videoSrc || "/assets/Ujjawal Groups Website Audit video.mp4"}
            playsInline
            autoPlay
            onEnded={onClose}
            className="w-full h-full object-contain"
          />

          {/* Top Left Watermark/Badge */}
          <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur border border-slate-700/50 text-xs font-mono text-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>Ujjawal Groups Brand Intro</span>
          </div>

          {/* Autoplay Fallback Sound Overlay Banner */}
          {isMuted && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center transition-all group-hover:bg-black/20">
              <button
                onClick={enableSound}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-2xl shadow-2xl shadow-blue-500/50 flex items-center gap-3 border border-blue-400/40 animate-bounce"
              >
                <Volume2 className="h-5 w-5" />
                <span>Click Anywhere to Enable Video Sound 🔊</span>
              </button>
              <p className="text-xs text-slate-300 mt-2.5 font-mono bg-slate-950/80 px-3 py-1 rounded-md border border-slate-800">
                Browser audio policy requires 1 click to play full sound
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950/80 text-xs text-slate-400">
          <span>Engineered by <strong>Ujjawal Sharma</strong> &bull; Ujjawal Groups</span>
          <button
            onClick={onClose}
            className="text-blue-400 hover:underline font-semibold"
          >
            Continue to Live Audit Dashboard &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
