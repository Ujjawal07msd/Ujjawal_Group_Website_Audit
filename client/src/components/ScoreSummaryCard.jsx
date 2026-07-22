import React from "react";
import { Clock, Shield, FileText, Image, Globe, Search, Layers, Share2 } from "lucide-react";

export function ScoreSummaryCard({ summary }) {
  if (!summary) return null;

  const metrics = [
    {
      title: "Response Speed",
      value: `${summary.responseTimeMs} ms`,
      icon: Clock,
      status: summary.responseTimeMs < 2500 ? "Fast (<2.5s)" : summary.responseTimeMs < 4500 ? "Moderate" : "Slow (>4.5s)",
      color: summary.responseTimeMs < 2500 ? "text-emerald-400" : summary.responseTimeMs < 4500 ? "text-amber-400" : "text-rose-400"
    },
    {
      title: "HTTPS Security",
      value: summary.isHttps ? "Active SSL (https://)" : "Insecure (http://)",
      icon: Shield,
      status: summary.isHttps ? "Passed (+2)" : "Failed (-10 Penalty)",
      color: summary.isHttps ? "text-emerald-400" : "text-rose-400"
    },
    {
      title: "Image Alt Tags",
      value: `${summary.imagesTotal - summary.missingAltCount} / ${summary.imagesTotal} Valid`,
      icon: Image,
      status: summary.missingAltCount === 0 ? "100% Covered" : `${summary.missingAltCount} Missing Alt Tags`,
      color: summary.missingAltCount === 0 ? "text-emerald-400" : "text-amber-400"
    },
    {
      title: "Privacy Policy",
      value: summary.hasPrivacyPolicy ? "Found in Footer" : "Missing Footer Link",
      icon: FileText,
      status: summary.hasPrivacyPolicy ? "Compliant (+1)" : "Missing (-3 Penalty)",
      color: summary.hasPrivacyPolicy ? "text-emerald-400" : "text-rose-400"
    }
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="glass-panel p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-medium mb-0.5">{m.title}</div>
                <div className="text-sm font-bold text-white mb-1">{m.value}</div>
                <div className={`text-[11px] font-semibold ${m.color}`}>{m.status}</div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Raw Scraped DOM Evidence Record */}
      <div className="glass-panel p-5 bg-slate-950/60 border border-slate-800">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Globe className="h-4 w-4 text-blue-400" />
          <span>Scraped Website Raw Evidence Record</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Title & Meta Description */}
          <div className="space-y-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
            <div>
              <span className="text-slate-400 font-semibold">Scraped Title: </span>
              <span className="text-white font-mono">{summary.title || "No Title Found"}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Scraped Meta Description: </span>
              <span className="text-slate-300 italic">{summary.metaDescription || "No Meta Description Tag Scraped"}</span>
            </div>
          </div>

          {/* Scraped Structural Metrics */}
          <div className="space-y-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
            <div className="flex justify-between">
              <span className="text-slate-400 font-semibold">Headings Scraped:</span>
              <span className="text-blue-400 font-mono font-bold">H1: {summary.headings?.h1?.length || 0} | H2: {summary.headings?.h2?.length || 0} | H3: {summary.headings?.h3?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-semibold">Social Media Profiles Found:</span>
              <span className="text-emerald-400 font-mono font-bold">{summary.socialLinksCount || 0} Accounts Linked</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-semibold">HTTP Status Code:</span>
              <span className="text-emerald-400 font-mono font-bold">{summary.statusCode || 200} OK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
