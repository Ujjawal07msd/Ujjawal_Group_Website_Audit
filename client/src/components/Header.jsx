import React, { useState } from "react";
import { ShieldCheck, Cpu, ClipboardList, FileCode, Search, ChevronRight, Play, GitCompare, Sparkles, User, LogOut, CheckCircle2 } from "lucide-react";
import { WafSchemaModal } from "./WafSchemaModal";

export function Header({ activeTab, setActiveTab, onOpenVideo, onOpenCompare, currentUser, onOpenAuth, onLogout }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const logoPng = "/assets/Ujjawal Groups Website Audit logo.png";

  return (
    <>
      <header className="glass-panel sticky top-3 z-40 mx-auto max-w-7xl px-5 py-3.5 my-3 flex flex-wrap items-center justify-between gap-4 border border-slate-800/90 shadow-2xl bg-slate-950/90 backdrop-blur-xl">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={onOpenVideo}
            title="Click to play Ujjawal Groups intro animation video"
            className="relative group cursor-pointer flex items-center justify-center rounded-xl p-1 bg-slate-900 border border-slate-700/80 hover:border-blue-500/80 transition-all hover:scale-105"
          >
            <img
              src={logoPng}
              alt="Ujjawal Groups Website Audit Logo"
              className="h-11 w-auto max-w-[140px] object-contain rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
            {/* Play Badge Overlay */}
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-500 text-white rounded-full p-1 shadow-lg shadow-blue-500/50 flex items-center justify-center">
              <Play className="h-3 w-3 fill-current ml-0.5" />
            </div>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl text-white tracking-tight font-heading flex items-center gap-2">
                Website Audit AI
                <span className="text-xs px-2.5 py-0.5 font-bold rounded-md bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md font-sans">
                  Ujjawal Groups
                </span>
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-md bg-slate-900 text-blue-400 border border-blue-900/50 font-mono">
                WAEF v2.0 5-Pass
              </span>
            </div>
            
            {/* Breadcrumb Navigation & Intro Video trigger link */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
              <span>Ujjawal Sharma Edition</span>
              <ChevronRight className="h-3 w-3 text-slate-600" />
              <button
                onClick={onOpenVideo}
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 hover:underline"
              >
                <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
                Play Intro Animation
              </button>
            </div>
          </div>
        </div>

        {/* Global Audit Search Bar */}
        <div className="relative flex-1 max-w-xs hidden lg:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="search"
            name="q"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search WAEF parameters or rules..."
            aria-label="Search WAEF audit parameters"
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-950/90 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all font-mono"
          />
        </div>

        {/* Navigation Mode Tabs */}
        <nav aria-label="Main Audit Navigation" className="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("audit")}
            aria-label="Live AI Audit Tab"
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === "audit"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            Live AI Audit
          </button>

          <button
            onClick={() => setActiveTab("manual")}
            aria-label="Blank Audit Sheet Tab"
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === "manual"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <ClipboardList className="h-3.5 w-3.5" />
            Blank Sheet
          </button>

          <button
            onClick={onOpenCompare}
            aria-label="Compare Websites Mode"
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === "compare"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <GitCompare className="h-3.5 w-3.5 text-indigo-300" />
            Compare URLs
          </button>
        </nav>

        {/* Auth & GitHub Profile Buttons */}
        <div className="flex items-center gap-2">
          {/* User Sign In / Profile Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white hover:border-blue-500 transition-all text-xs font-bold"
              >
                <div className="h-6 w-6 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[10px] font-mono">
                  US
                </div>
                <span className="hidden sm:inline-block">{currentUser.name}</span>
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
              className="px-3.5 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition-all"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In / Sign Up</span>
            </button>
          )}

          {/* GitHub Profile Link (Ujjawal07msd) */}
          <a
            href="https://github.com/Ujjawal07msd"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Ujjawal Sharma's GitHub Profile (Ujjawal07msd)"
            className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-blue-500 rounded-xl transition-all flex items-center justify-center shadow-sm"
          >
            <svg className="h-4 w-4 fill-current text-slate-300 hover:text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          <button
            onClick={() => setIsModalOpen(true)}
            aria-label="Open Handbook Schema Modal"
            className="px-3 py-1.5 text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl flex items-center gap-1.5 transition-all"
          >
            <FileCode className="h-3.5 w-3.5 text-blue-400" />
            Handbook Schema
          </button>
        </div>
      </header>

      {/* Reference Handbook Modal */}
      <WafSchemaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
