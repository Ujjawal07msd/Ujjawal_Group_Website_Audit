import React, { useRef, useEffect } from "react";
import { X, Volume2, VolumeX, Sparkles, ShieldCheck } from "lucide-react";

export function IntroVideoModal({ isOpen, onClose, logoImg, videoSrc }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = React.useState(true);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => console.log("Autoplay blocked:", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
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
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all"
              title={isMuted ? "Unmute Video" : "Mute Video"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-blue-400" />}
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
            >
              <span>Skip / Explore App</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc || "/assets/Ujjawal Groups Website Audit video.mp4"}
            playsInline
            autoPlay
            muted={isMuted}
            onEnded={onClose}
            className="w-full h-full object-contain"
          />

          {/* Overlay Watermark/Badge */}
          <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/70 backdrop-blur border border-slate-700/50 text-xs font-mono text-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>Ujjawal Groups Brand Intro</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-400">
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
