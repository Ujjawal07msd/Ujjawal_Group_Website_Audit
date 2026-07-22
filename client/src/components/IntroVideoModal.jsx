import React, { useRef, useEffect, useState } from "react";
import { X, Volume2, VolumeX, Sparkles, ShieldCheck, Play } from "lucide-react";

export function IntroVideoModal({ isOpen, onClose, logoImg, videoSrc }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false); // Default Sound ON
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !videoRef.current) return;

    const video = videoRef.current;
    video.currentTime = 0;
    video.muted = false;
    video.volume = 1.0;
    setIsMuted(false);

    // Initialize Web Audio API to boost & un-mute audio context
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume().catch(() => {});
        }
      }
    } catch (e) {
      console.warn("AudioContext init:", e);
    }

    // Try direct unmuted playback
    const playPromise = video.play();

    const forceUnlockSound = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        setIsMuted(false);
        videoRef.current.play().catch(() => {});
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("click", forceUnlockSound);
      window.removeEventListener("pointerdown", forceUnlockSound);
      window.removeEventListener("touchstart", forceUnlockSound);
      window.removeEventListener("keydown", forceUnlockSound);
      window.removeEventListener("focus", forceUnlockSound);
    };

    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Browser blocked unmuted autoplay on link refresh, waiting for first click/gesture:", err);
        // Play muted while waiting for first user click/tap/key to unlock audio
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});

        window.addEventListener("click", forceUnlockSound, { once: true });
        window.addEventListener("pointerdown", forceUnlockSound, { once: true });
        window.addEventListener("touchstart", forceUnlockSound, { once: true });
        window.addEventListener("keydown", forceUnlockSound, { once: true });
        window.addEventListener("focus", forceUnlockSound, { once: true });
      });
    }

    return () => {
      cleanup();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      if (!videoRef.current.muted) {
        videoRef.current.volume = 1.0;
        if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume().catch(() => {});
        }
      }
    }
  };

  const handleManualUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      setIsMuted(false);
      videoRef.current.play().catch(() => {});
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
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
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 animate-pulse"
                  : "bg-blue-600 text-white shadow-md shadow-blue-600/30 hover:bg-blue-500"
              }`}
              title={isMuted ? "Unmute Video Sound" : "Mute Video Sound"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span>Unmute Sound 🔊</span>
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

        {/* Clean Video Player Container */}
        <div
          onClick={handleManualUnmute}
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

          {/* Subtle sound unlock helper if muted on refresh */}
          {isMuted && (
            <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur px-3 py-1.5 rounded-xl border border-amber-500/40 text-amber-300 text-xs font-mono flex items-center gap-2 animate-pulse shadow-lg pointer-events-none">
              <VolumeX className="h-3.5 w-3.5 text-amber-400" />
              <span>Click video to unmute sound 🔊</span>
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
