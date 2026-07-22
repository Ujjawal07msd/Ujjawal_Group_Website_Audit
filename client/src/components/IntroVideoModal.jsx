import React, { useRef, useEffect, useState } from "react";
import { X, Volume2, VolumeX, ShieldCheck } from "lucide-react";

export function IntroVideoModal({ isOpen, onClose, logoImg, videoSrc }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !videoRef.current) return;

    const video = videoRef.current;
    video.currentTime = 0;
    video.muted = false;
    video.volume = 1.0;
    setIsMuted(false);

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
      console.warn("AudioContext:", e);
    }

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
    };

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});

        window.addEventListener("click", forceUnlockSound, { once: true });
        window.addEventListener("pointerdown", forceUnlockSound, { once: true });
        window.addEventListener("touchstart", forceUnlockSound, { once: true });
        window.addEventListener("keydown", forceUnlockSound, { once: true });
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Clean Modal Header */}
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
              <h3 className="font-bold text-lg text-white font-heading">
                Ujjawal Groups Website Audit
              </h3>
              <p className="text-xs text-slate-400">WAEF v2.0 Quality Index Evaluator</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all border border-slate-700"
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? <VolumeX className="h-4 w-4 text-amber-400" /> : <Volume2 className="h-4 w-4 text-blue-400" />}
            </button>

            <button
              onClick={onClose}
              className="p-2.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all border border-slate-700"
              title="Close Animation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Clean Video Player (100% Pure Video Display - Zero Overlays) */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc || "/assets/Ujjawal Groups Website Audit video.mp4"}
            playsInline
            autoPlay
            onEnded={onClose}
            className="w-full h-full object-contain"
          />
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
