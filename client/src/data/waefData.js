export const WAEF_PARAMETERS = [
  { id: 1, name: "Brand Identity & Consistency", weight: 5, maxPoints: 5, standard: "Brand Guidelines" },
  { id: 2, name: "Visual Design & Aesthetics", weight: 8, maxPoints: 8, standard: "Visual Design Principles" },
  { id: 3, name: "Navigation & Information Architecture", weight: 10, maxPoints: 10, standard: "Jakob's Law, 3-Click Rule" },
  { id: 4, name: "Homepage & First Impression", weight: 7, maxPoints: 7, standard: "3-Second Rule" },
  { id: 5, name: "Typography & Readability", weight: 5, maxPoints: 5, standard: "WCAG 2.2" },
  { id: 6, name: "Accessibility", weight: 10, maxPoints: 10, standard: "WCAG 2.2 Level AA" },
  { id: 7, name: "Mobile Responsiveness", weight: 10, maxPoints: 10, standard: "Google Mobile-Friendly" },
  { id: 8, name: "Performance & Loading Speed", weight: 10, maxPoints: 10, standard: "Core Web Vitals" },
  { id: 9, name: "Content Quality", weight: 8, maxPoints: 8, standard: "Content UX Principles" },
  { id: 10, name: "Search & Findability", weight: 5, maxPoints: 5, standard: "Information Retrieval" },
  { id: 11, name: "Forms & User Interaction", weight: 5, maxPoints: 5, standard: "Baymard Institute" },
  { id: 12, name: "Security & Trust", weight: 7, maxPoints: 7, standard: "HTTPS, OWASP" },
  { id: 13, name: "SEO & Technical Quality", weight: 5, maxPoints: 5, standard: "Google SEO Guidelines" },
  { id: 14, name: "Social Presence & Community", weight: 3, maxPoints: 3, standard: "Social Engagement" },
  { id: 15, name: "Overall UX (Nielsen's Heuristics)", weight: 2, maxPoints: 2, standard: "Nielsen's 10 Heuristics" }
];

export const PENALTY_RULES = [
  { id: "pen_broken_links", name: "Broken links found", deductionPerItem: -2, description: "-2 per broken link found" },
  { id: "pen_404_unhandled", name: "404 / Error pages not handled gracefully", deduction: -3, description: "Generic error page without navigation" },
  { id: "pen_mobile_hscroll", name: "Horizontal scroll on mobile devices", deduction: -2, description: "Content overflows viewport width" },
  { id: "pen_missing_https", name: "Missing HTTPS or invalid SSL certificate", deduction: -10, description: "Insecure connection" },
  { id: "pen_broken_forms", name: "Broken forms (cannot submit successfully)", deduction: -5, description: "Form submission failure" },
  { id: "pen_popup_overload", name: "Intrusive pop-up overload (3+ pop-ups)", deduction: -3, description: "Multiple popups obscuring content" },
  { id: "pen_autoplay_sound", name: "Auto-playing media with sound enabled", deduction: -2, description: "Audio/video auto plays" },
  { id: "pen_major_wcag_a", name: "Major accessibility failure (WCAG Level A)", deduction: -5, description: "Unreadable or focus missing" },
  { id: "pen_missing_privacy", name: "Missing Privacy Policy page", deduction: -3, description: "No Privacy Policy page" },
  { id: "pen_slow_lcp", name: "Extremely slow load time (LCP > 6s)", deduction: -5, description: "Response time > 6 seconds" }
];

export const GRADE_SCALE = [
  { min: 90, max: 100, grade: "A+", label: "Excellent / Industry Benchmark", action: "Maintain & iterate", color: "#10b981" },
  { min: 80, max: 89, grade: "A", label: "Very Good", action: "Minor tweaks only", color: "#3b82f6" },
  { min: 70, max: 79, grade: "B", label: "Good", action: "Address P2 priority issues", color: "#6366f1" },
  { min: 60, max: 69, grade: "C", label: "Average", action: "Significant UX improvements needed", color: "#f59e0b" },
  { min: 50, max: 59, grade: "D", label: "Needs Improvement", action: "Redesign key sections", color: "#f97316" },
  { min: 0, max: 49, grade: "F", label: "Major Redesign Required", action: "Full audit and rebuild required", color: "#ef4444" }
];

export function getGrade(wqi) {
  const rounded = Math.round(wqi * 10) / 10;
  for (const g of GRADE_SCALE) {
    if (rounded >= g.min) return { ...g, wqi: rounded };
  }
  return { ...GRADE_SCALE[GRADE_SCALE.length - 1], wqi: rounded };
}
