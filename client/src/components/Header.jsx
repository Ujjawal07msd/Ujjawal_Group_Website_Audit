import React, { useState } from "react";
import { ShieldCheck, Cpu, ClipboardList, BookOpen, FileCode, Search, ChevronRight } from "lucide-react";
import { WafSchemaModal } from "./WafSchemaModal";

export function Header({ activeTab, setActiveTab }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <header className="glass-panel sticky top-4 z-40 mx-auto max-w-7xl px-6 py-4 my-4 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 shrink-0">
            <ShieldCheck className="h-6 w-6" aria-label="Website Audit AI Logo" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl text-white tracking-tight font-heading">Website Audit AI</h1>
              <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                WAEF v2.0 5-Pass Edition
              </span>
            </div>
            
            {/* Breadcrumb Navigation Indicator */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-0.5">
              <span>Home</span>
              <ChevronRight className="h-3 w-3 text-slate-600" />
              <span className="text-blue-400 font-semibold">WAEF v2.0 Audit Dashboard</span>
            </div>
          </div>
        </div>

        {/* Global Audit Search Bar */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="search"
            name="q"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search WAEF parameters or rules..."
            aria-label="Search WAEF audit parameters"
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all font-mono"
          />
        </div>

        {/* Navigation Mode Bar */}
        <nav aria-label="Main Audit Navigation" className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("audit")}
            aria-label="Live AI Audit Tab"
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "audit"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Cpu className="h-4 w-4" />
            Live AI Audit
          </button>

          <button
            onClick={() => setActiveTab("manual")}
            aria-label="Blank Audit Sheet Tab"
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "manual"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <ClipboardList className="h-4 w-4" />
            Blank Audit Sheet
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            aria-label="Open Handbook Schema Modal"
            className="px-3.5 py-2 text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg flex items-center gap-1.5 transition-all"
          >
            <FileCode className="h-3.5 w-3.5 text-blue-400" />
            Handbook Schema
          </button>
        </div>
      </header>

      {/* Reference Modal */}
      <WafSchemaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
