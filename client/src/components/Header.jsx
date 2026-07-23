import React, { useState } from "react";
import { ShieldCheck, Cpu, ClipboardList, FileCode, Search, ChevronRight, Play, GitCompare, Sparkles, User, LogOut, CheckCircle2 } from "lucide-react";
import { WafSchemaModal } from "./WafSchemaModal";

export function Header({ activeTab, setActiveTab, onOpenVideo, onOpenCompare, currentUser, onOpenAuth, onLogout, serverStatus = "offline", onOpenRoadmap }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const logoPng = "/assets/Ujjawal Groups Website Audit logo.png";

  return (
    <>
      <header className="glass-panel sticky top-2 z-40 mx-auto max-w-7xl px-3 sm:px-5 py-2.5 my-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border border-slate-800/90 shadow-2xl bg-slate-950/95 backdrop-blur-xl">
        {/* Top Header Row: Brand & Mobile Auth */}
        <div className="flex items-center justify-between gap-2.5">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={onOpenVideo}
              title="Click to play Ujjawal Groups intro animation video"
              className="relative group cursor-pointer flex items-center justify-center rounded-xl p-1 bg-slate-900 border border-slate-700/80 hover:border-[#00d294] transition-all shrink-0"
            >
              <img
                src={logoPng}
                alt="Ujjawal Groups Logo"
                className="h-8 sm:h-10 w-auto max-w-[110px] sm:max-w-[140px] object-contain rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-[#ff6b00] hover:bg-[#e05e00] text-white rounded-full p-0.5 sm:p-1 shadow-md flex items-center justify-center">
                <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current ml-0.5" />
              </div>
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="font-extrabold text-base sm:text-lg text-white tracking-tight font-heading flex items-center gap-1.5 truncate">
                  Website Audit AI
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 font-black rounded-md bg-gradient-to-r from-[#00d294] to-[#06b6d4] text-slate-950 shadow-md font-sans shrink-0">
                    Ujjawal Groups
                  </span>
                </h1>
                
                {serverStatus === "online" ? (
                  <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-sm shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                ) : (
                  <span
                    title="Live Node.js crawler server offline. Running instant WAEF v2.0 Client Fallback Mode."
                    className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1 shadow-sm shrink-0 cursor-help"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                    Client Mode
                  </span>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5">
                <span>Ujjawal Sharma Edition</span>
                <ChevronRight className="h-3 w-3 text-slate-600" />
                <button
                  onClick={onOpenVideo}
                  className="text-[#00d294] hover:text-emerald-300 font-semibold flex items-center gap-1 hover:underline"
                >
                  <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
                  Intro Video
                </button>
              </div>
            </div>
          </div>

          {/* Quick Mobile Auth Button */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            {currentUser ? (
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="h-8 w-8 rounded-xl bg-slate-900 border border-slate-700 text-white flex items-center justify-center font-bold text-xs"
              >
                US
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-2.5 py-1 text-xs font-bold bg-[#ff6b00] text-white rounded-lg shadow flex items-center gap-1"
              >
                <User className="h-3 w-3" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Audit Search Bar (Desktop Only) */}
        <div className="relative flex-1 max-w-xs hidden lg:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="search"
            name="q"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search WAEF parameters or rules..."
            aria-label="Search WAEF audit parameters"
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-950/90 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00d294] transition-all font-mono"
          />
        </div>

        {/* Navigation Mode Tabs Bar (Horizontal Scrollable on Mobile) */}
        <div className="flex items-center justify-between gap-2 border-t md:border-t-0 border-slate-800/60 pt-2 md:pt-0">
          <nav aria-label="Main Audit Navigation" className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800/80 overflow-x-auto scrollbar-none w-full md:w-auto">
            <button
              onClick={() => setActiveTab("audit")}
              aria-label="Live AI Audit Tab"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 ${
                activeTab === "audit"
                  ? "bg-gradient-to-r from-[#00d294] to-[#06b6d4] text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>Live AI Audit</span>
            </button>

            <button
              onClick={() => setActiveTab("manual")}
              aria-label="Blank Audit Sheet Tab"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 ${
                activeTab === "manual"
                  ? "bg-gradient-to-r from-[#00d294] to-[#06b6d4] text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <ClipboardList className="h-3.5 w-3.5" />
              <span>Blank Sheet</span>
            </button>

            <button
              onClick={onOpenCompare}
              aria-label="Compare Websites Mode"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 ${
                activeTab === "compare"
                  ? "bg-[#ff6b00] text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <GitCompare className="h-3.5 w-3.5 text-amber-300" />
              <span>Compare URLs</span>
            </button>
          </nav>

          {/* Desktop Auth & Social Action Icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Desktop Auth Button */}
            <div className="hidden md:block">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white hover:border-[#00d294] transition-all text-xs font-bold"
                  >
                    <div className="h-5 w-5 rounded-lg bg-[#00d294] flex items-center justify-center text-slate-950 font-bold text-[9px] font-mono">
                      US
                    </div>
                    <span>{currentUser.name}</span>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-fadeIn text-xs">
                      <div className="px-3 py-2 border-b border-slate-800 font-mono">
                        <div className="font-bold text-white">{currentUser.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
                      </div>
                      <button
                        onClick={() => { onLogout(); setIsProfileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 text-rose-400 hover:bg-slate-800 rounded-lg flex items-center gap-2 mt-1"
                      >
                        <LogOut className="h-3.5 w-3.5" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="px-3 py-1.5 text-xs font-bold bg-[#ff6b00] hover:bg-[#e05e00] text-white rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* GitHub Link */}
            <a
              href="https://github.com/Ujjawal07msd"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Ujjawal Sharma's GitHub"
              aria-label="Visit Ujjawal Sharma's GitHub"
              className="p-1.5 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-[#00d294] rounded-lg transition-all flex items-center justify-center"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/ujjawalsharma0804/"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Ujjawal Sharma's LinkedIn"
              aria-label="Visit Ujjawal Sharma's LinkedIn"
              className="p-1.5 text-[#0a66c2] hover:text-white bg-slate-900 border border-slate-800 hover:border-[#0a66c2] rounded-lg transition-all flex items-center justify-center"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>

            {/* Roadmap Modal Button */}
            <button
              onClick={onOpenRoadmap}
              aria-label="Open Product Roadmap Modal"
              className="px-2.5 py-1 text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-[#00d294] text-slate-300 hover:text-white rounded-lg flex items-center gap-1 transition-all shrink-0"
            >
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span className="hidden sm:inline-block">Roadmap</span>
            </button>

            {/* Handbook Schema Modal Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              aria-label="Open Handbook Schema Modal"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-lg transition-all shrink-0"
            >
              <FileCode className="h-3 w-3 text-[#00d294]" />
              <span>Schema</span>
            </button>
          </div>
        </div>
      </header>

      {/* Reference Handbook Modal */}
      <WafSchemaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
