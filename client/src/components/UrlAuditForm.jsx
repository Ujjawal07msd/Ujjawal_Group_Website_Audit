import React, { useState } from "react";
import { Search, Loader2, Key, Globe, Compass, Shield } from "lucide-react";

export function UrlAuditForm({ onStartAudit, isLoading, auditStep }) {
  const [url, setUrl] = useState("https://stripe.com");
  const [apiKey, setApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    onStartAudit(url.trim(), apiKey.trim());
  };

  const sampleSites = [
    { name: "Stripe", url: "https://stripe.com", badge: "Financial Infra" },
    { name: "GitHub", url: "https://github.com", badge: "Developer UX" },
    { name: "Apple", url: "https://apple.com", badge: "Product Showcase" },
    { name: "Google", url: "https://google.com", badge: "Speed Leader" }
  ];

  return (
    <div className="glass-panel p-8 md:p-10 mb-8 text-center max-w-5xl mx-auto border-[#00d294]/20">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-4">
        <Shield className="h-3.5 w-3.5 text-[#00d294]" /> WAEF v2.0 Enterprise Audit Engine
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3 font-heading">
        Audit Any Website Quality in Real-Time
      </h2>
      <p className="text-slate-400 text-sm max-w-2xl mx-auto mb-8">
        Calculate the <strong>Website Quality Index (WQI Score)</strong> across 15 parameters and 10 penalty rules derived from Ujjawal Sharma's WAEF handbook.
      </p>

      {/* Input Bar Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Globe className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g. https://stripe.com)"
            disabled={isLoading}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00d294] text-sm font-medium transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3.5 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-extrabold rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50 shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 spinner" />
              Auditing Site...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Run Full Audit
            </>
          )}
        </button>
      </form>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
          <Compass className="h-3.5 w-3.5 text-[#00d294]" /> Sample Websites:
        </span>
        {sampleSites.map((site) => (
          <button
            key={site.url}
            type="button"
            onClick={() => {
              setUrl(site.url);
              onStartAudit(site.url, apiKey.trim());
            }}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-[#00d294] hover:text-[#00d294] text-slate-300 transition-all flex items-center gap-1.5 font-medium"
          >
            <span>{site.name}</span>
            <span className="text-[10px] text-slate-400 font-semibold px-1.5 py-0.2 bg-slate-950 rounded">
              {site.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Gemini Key Optional Toggle */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setShowKeyInput(!showKeyInput)}
          className="text-xs text-slate-400 hover:text-[#00d294] flex items-center gap-1.5 transition-all font-medium"
        >
          <Key className="h-3.5 w-3.5 text-[#00d294]" />
          {showKeyInput ? "Hide Gemini API Key input" : "Add optional Gemini API Key for deep AI observations"}
        </button>
      </div>

      {showKeyInput && (
        <div className="mt-3 max-w-md mx-auto animate-fadeIn">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste Google Gemini API Key (optional)"
            className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-[#00d294] font-mono"
          />
        </div>
      )}

      {/* Pipeline Progress */}
      {isLoading && (
        <div className="mt-6 pt-4 border-t border-slate-800 text-left animate-fadeIn">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 text-[#00d294] spinner" />
              <span className="text-xs font-bold text-white">WAEF Pipeline Active</span>
            </div>
            <span className="text-xs font-mono font-semibold text-[#00d294] bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              {auditStep}
            </span>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div className="bg-[#00d294] h-full rounded-full animate-pulse transition-all duration-500 w-4/5"></div>
          </div>
        </div>
      )}
    </div>
  );
}
