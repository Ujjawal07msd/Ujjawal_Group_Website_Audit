import React from "react";
import { Activity, ShieldCheck, Zap, Search, Layout } from "lucide-react";

export function WqiRadarChart({ report }) {
  if (!report || !report.parameters) return null;

  // Calculate 5 core category axis scores from 15 parameters
  const params = report.parameters;
  
  // Category 1: Design & UX (Params 1, 2, 3, 4, 5, 9, 15)
  const uxParams = params.filter(p => [1, 2, 3, 4, 5, 9, 15].includes(p.id));
  const uxScore = Math.round((uxParams.reduce((a, b) => a + b.parameterScore, 0) / uxParams.reduce((a, b) => a + b.weight, 0)) * 100);

  // Category 2: Accessibility (Param 6)
  const accParam = params.find(p => p.id === 6);
  const accScore = accParam ? Math.round((accParam.parameterScore / accParam.weight) * 100) : 85;

  // Category 3: Performance & Speed (Params 7, 8)
  const perfParams = params.filter(p => [7, 8].includes(p.id));
  const perfScore = Math.round((perfParams.reduce((a, b) => a + b.parameterScore, 0) / perfParams.reduce((a, b) => a + b.weight, 0)) * 100);

  // Category 4: Security & Trust (Params 11, 12)
  const secParams = params.filter(p => [11, 12].includes(p.id));
  const secScore = Math.round((secParams.reduce((a, b) => a + b.parameterScore, 0) / secParams.reduce((a, b) => a + b.weight, 0)) * 100);

  // Category 5: SEO & Tech Quality (Params 10, 13, 14)
  const seoParams = params.filter(p => [10, 13, 14].includes(p.id));
  const seoScore = Math.round((seoParams.reduce((a, b) => a + b.parameterScore, 0) / seoParams.reduce((a, b) => a + b.weight, 0)) * 100);

  const axes = [
    { label: "Design & UX", value: uxScore, icon: Layout, color: "#00d294" },
    { label: "Accessibility", value: accScore, icon: ShieldCheck, color: "#38bdf8" },
    { label: "Performance", value: perfScore, icon: Zap, color: "#ff6b00" },
    { label: "Security & Trust", value: secScore, icon: Activity, color: "#a855f7" },
    { label: "SEO & Tech Quality", value: seoScore, icon: Search, color: "#f59e0b" }
  ];

  // SVG Radar Geometry Calculations (Center 150, 150; Radius 100)
  const cx = 150;
  const cy = 150;
  const r = 100;
  const numAxes = axes.length;

  const getCoordinates = (index, valuePct) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const distance = (r * valuePct) / 100;
    const x = cx + distance * Math.cos(angle);
    const y = cy + distance * Math.sin(angle);
    return { x, y };
  };

  // Polygon points for 100% outer grid & user data polygon
  const outerPolygonPoints = axes.map((_, i) => {
    const { x, y } = getCoordinates(i, 100);
    return `${x},${y}`;
  }).join(" ");

  const mid75PolygonPoints = axes.map((_, i) => {
    const { x, y } = getCoordinates(i, 75);
    return `${x},${y}`;
  }).join(" ");

  const mid50PolygonPoints = axes.map((_, i) => {
    const { x, y } = getCoordinates(i, 50);
    return `${x},${y}`;
  }).join(" ");

  const dataPolygonPoints = axes.map((a, i) => {
    const { x, y } = getCoordinates(i, a.value);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="glass-panel p-6 md:p-8 mb-8 border-slate-800 bg-slate-950/90 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-extrabold text-white font-heading flex items-center gap-2">
            WAEF 5-Axis Quality Radar Graph
            <span className="text-xs px-2.5 py-0.5 font-mono font-bold bg-[#00d294]/20 text-[#00d294] rounded-md border border-[#00d294]/30">
              Interactive Visualization
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Empirical multi-dimensional performance breakdown across all 5 core WAEF evaluation axes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Interactive SVG Spider / Radar Chart */}
        <div className="lg:col-span-6 flex justify-center items-center py-4">
          <div className="relative w-[320px] h-[320px]">
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl">
              
              {/* Outer Grid Polygons */}
              <polygon points={outerPolygonPoints} fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              <polygon points={mid75PolygonPoints} fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="2,2" />
              <polygon points={mid50PolygonPoints} fill="none" stroke="#0f172a" strokeWidth="1" strokeDasharray="2,2" />

              {/* Axis Spoke Lines */}
              {axes.map((_, i) => {
                const { x, y } = getCoordinates(i, 100);
                return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#334155" strokeWidth="1" />;
              })}

              {/* User Data Polygon Area */}
              <polygon
                points={dataPolygonPoints}
                fill="url(#radarGradient)"
                fillOpacity="0.45"
                stroke="#00d294"
                strokeWidth="2.5"
                className="transition-all duration-700 ease-out"
              />

              {/* Gradient Definition */}
              <defs>
                <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00d294" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                </radialGradient>
              </defs>

              {/* Data Node Dots */}
              {axes.map((a, i) => {
                const { x, y } = getCoordinates(i, a.value);
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="5" fill="#00d294" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
                    <text
                      x={x + (x > cx ? 10 : x < cx ? -10 : 0)}
                      y={y + (y > cy ? 12 : y < cy ? -10 : 0)}
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor={x > cx ? "start" : x < cx ? "end" : "middle"}
                    >
                      {a.value}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Column: Axis Bar Scores Breakdown */}
        <div className="lg:col-span-6 space-y-3.5">
          {axes.map((axis, idx) => {
            const IconComp = axis.icon;
            return (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0" style={{ color: axis.color }}>
                    <IconComp className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                      <span>{axis.label}</span>
                      <span className="font-mono text-xs" style={{ color: axis.color }}>{axis.value}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${axis.value}%`, backgroundColor: axis.color }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
