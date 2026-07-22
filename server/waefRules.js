/**
 * Website Quality Index (WQI) - WAEF v2.0 Official Handbook Model Specification
 * Author: Ujjawal Sharma (VIT Bhopal University, 2026)
 */

export const WAEF_PARAMETERS = [
  {
    id: 1,
    name: "Brand Identity & Consistency",
    weight: 5,
    maxPoints: 5,
    standard: "Brand Guidelines",
    description: "Evaluates logo visibility, color consistency, value proposition clarity, tone of voice, and CTA brand match.",
    checklist: [
      { id: "b1", text: "Brand logo is clearly visible on every page", max: 1 },
      { id: "b2", text: "Brand colours are consistent throughout", max: 1 },
      { id: "b3", text: "Mission / value proposition is clearly stated", max: 1 },
      { id: "b4", text: "Tone of voice is consistent throughout", max: 1 },
      { id: "b5", text: "CTA design matches brand identity", max: 1 }
    ]
  },
  {
    id: 2,
    name: "Visual Design & Aesthetics",
    weight: 8,
    maxPoints: 8,
    standard: "Visual Design Principles",
    description: "Evaluates white space, color palette, modern UI, visual hierarchy, layout structure, icon style, and overall look.",
    checklist: [
      { id: "v1", text: "Good use of white space / spacing", max: 1 },
      { id: "v2", text: "Consistent colour palette", max: 1 },
      { id: "v3", text: "Modern, professional UI appearance", max: 1 },
      { id: "v4", text: "Clear visual hierarchy", max: 2 },
      { id: "v5", text: "Balanced, structured layout", max: 1 },
      { id: "v6", text: "Consistent icon style", max: 1 },
      { id: "v7", text: "Professional overall appearance", max: 1 }
    ]
  },
  {
    id: 3,
    name: "Navigation & Information Architecture",
    weight: 10,
    maxPoints: 10,
    standard: "Jakob's Law, 3-Click Rule",
    description: "Evaluates main menu visibility, 3-click page reachability, breadcrumbs, search bar placement, active nav indicator, and footer.",
    checklist: [
      { id: "n1", text: "Main menu is clearly visible", max: 2 },
      { id: "n2", text: "Key pages reachable within 3 clicks", max: 2 },
      { id: "n3", text: "Breadcrumbs available where needed", max: 1 },
      { id: "n4", text: "Search bar prominently placed", max: 2 },
      { id: "n5", text: "Current page is highlighted in menu", max: 1 },
      { id: "n6", text: "Footer navigation is useful & organised", max: 2 }
    ]
  },
  {
    id: 4,
    name: "Homepage & First Impression",
    weight: 7,
    maxPoints: 7,
    standard: "3-Second Rule",
    description: "Evaluates 3-second website purpose clarity, primary CTA above fold, key content visibility, and homepage clutter control.",
    checklist: [
      { id: "h1", text: "Website purpose clear within 3 seconds", max: 2 },
      { id: "h2", text: "Primary CTA visible above the fold", max: 2 },
      { id: "h3", text: "Important content visible without scrolling", max: 1 },
      { id: "h4", text: "No unnecessary clutter on homepage", max: 2 }
    ]
  },
  {
    id: 5,
    name: "Typography & Readability",
    weight: 5,
    maxPoints: 5,
    standard: "WCAG 2.2",
    description: "Evaluates font readability, heading scale hierarchy, line spacing leading, contrast ratio, and font consistency.",
    checklist: [
      { id: "t1", text: "Font is readable at standard size", max: 1 },
      { id: "t2", text: "Clear heading / subheading hierarchy", max: 1 },
      { id: "t3", text: "Good line spacing (leading)", max: 1 },
      { id: "t4", text: "Sufficient colour contrast for body text", max: 1 },
      { id: "t5", text: "Consistent font usage across pages", max: 1 }
    ]
  },
  {
    id: 6,
    name: "Accessibility",
    weight: 10,
    maxPoints: 10,
    standard: "WCAG 2.2 Level AA",
    description: "Evaluates contrast ratio (>= 4.5:1), keyboard navigation, image alt text, focus indicators, and 200% text scalability.",
    checklist: [
      { id: "a1", text: "Contrast ratio meets WCAG 2.2 (>= 4.5:1)", max: 2 },
      { id: "a2", text: "Full keyboard navigation supported", max: 2 },
      { id: "a3", text: "All images have descriptive alt text", max: 2 },
      { id: "a4", text: "Focus indicators are visible", max: 2 },
      { id: "a5", text: "Text is scalable up to 200% without loss of content", max: 2 }
    ]
  },
  {
    id: 7,
    name: "Mobile Responsiveness",
    weight: 10,
    maxPoints: 10,
    standard: "Google Mobile-Friendly Guidelines",
    description: "Evaluates responsive layouts, touch target size (>= 48x48px), absence of horizontal scrolling, image scaling, and touch menus.",
    checklist: [
      { id: "m1", text: "Responsive layout on all screen sizes", max: 2 },
      { id: "m2", text: "Touch targets >= 48 x 48 px", max: 2 },
      { id: "m3", text: "No horizontal scrolling on mobile", max: 2 },
      { id: "m4", text: "Images scale correctly on mobile", max: 2 },
      { id: "m5", text: "Touch-friendly navigation & interactions", max: 2 }
    ]
  },
  {
    id: 8,
    name: "Performance & Loading Speed",
    weight: 10,
    maxPoints: 10,
    standard: "Google Lighthouse / Core Web Vitals",
    description: "Evaluates Lighthouse Score (>=90), LCP (<=2.5s), CLS (<=0.1), and INP (<=200ms).",
    checklist: [
      { id: "p1", text: "Google Lighthouse Performance Score >= 90", max: 4 },
      { id: "p2", text: "Largest Contentful Paint (LCP) <= 2.5 s", max: 2 },
      { id: "p3", text: "Cumulative Layout Shift (CLS) <= 0.1", max: 2 },
      { id: "p4", text: "Interaction to Next Paint (INP) <= 200 ms", max: 2 }
    ]
  },
  {
    id: 9,
    name: "Content Quality",
    weight: 8,
    maxPoints: 8,
    standard: "Content UX Principles",
    description: "Evaluates content clarity, audience relevance, grammatical accuracy, and currency of information.",
    checklist: [
      { id: "c1", text: "Content is easy to understand", max: 2 },
      { id: "c2", text: "Content is relevant to the audience", max: 2 },
      { id: "c3", text: "No grammatical / spelling errors", max: 2 },
      { id: "c4", text: "Information is current and up-to-date", max: 2 }
    ]
  },
  {
    id: 10,
    name: "Search & Findability",
    weight: 5,
    maxPoints: 5,
    standard: "Information Retrieval Principles",
    description: "Evaluates search bar location, accuracy of search results, filters availability, and response speed (<1s).",
    checklist: [
      { id: "s1", text: "Search is easy to locate", max: 1 },
      { id: "s2", text: "Search results are accurate", max: 2 },
      { id: "s3", text: "Filters / facets available", max: 1 },
      { id: "s4", text: "Search response is fast", max: 1 }
    ]
  },
  {
    id: 11,
    name: "Forms & User Interaction",
    weight: 5,
    maxPoints: 5,
    standard: "Baymard Institute",
    description: "Evaluates form simplicity/minimal fields, real-time inline validation, specific error messages, and submission clarity.",
    checklist: [
      { id: "f1", text: "Forms are simple with minimal fields", max: 1 },
      { id: "f2", text: "Inline validation provided", max: 2 },
      { id: "f3", text: "Error messages are helpful & specific", max: 1 },
      { id: "f4", text: "Submission process is straightforward", max: 1 }
    ]
  },
  {
    id: 12,
    name: "Security & Trust",
    weight: 7,
    maxPoints: 7,
    standard: "HTTPS, OWASP",
    description: "Evaluates HTTPS/SSL, Privacy Policy footer link, Terms & Conditions link, secure login/CAPTCHA, and trust badges.",
    checklist: [
      { id: "sec1", text: "HTTPS enabled with valid certificate", max: 2 },
      { id: "sec2", text: "Privacy Policy clearly linked", max: 1 },
      { id: "sec3", text: "Terms & Conditions available", max: 1 },
      { id: "sec4", text: "Secure login (MFA / CAPTCHA where needed)", max: 2 },
      { id: "sec5", text: "Trust indicators present (badges, seals)", max: 1 }
    ]
  },
  {
    id: 13,
    name: "SEO & Technical Quality",
    weight: 5,
    maxPoints: 5,
    standard: "Google SEO Guidelines",
    description: "Evaluates descriptive title tags, meta descriptions, H1-H3 hierarchy, image alt text, canonical URLs, and sitemaps.",
    checklist: [
      { id: "seo1", text: "Title tag is descriptive & unique", max: 1 },
      { id: "seo2", text: "Meta description present", max: 1 },
      { id: "seo3", text: "Proper heading hierarchy (H1 -> H2 -> H3)", max: 1 },
      { id: "seo4", text: "All images have alt text", max: 1 },
      { id: "seo5", text: "Canonical URLs / Sitemap present", max: 1 }
    ]
  },
  {
    id: 14,
    name: "Social Presence & Community",
    weight: 3,
    maxPoints: 3,
    standard: "Social Engagement Best Practices",
    description: "Evaluates social media links, active community/social proof, and testimonials/reviews.",
    checklist: [
      { id: "soc1", text: "Social media links available & working", max: 1 },
      { id: "soc2", text: "Active community / social proof visible", max: 1 },
      { id: "soc3", text: "Testimonials / reviews displayed", max: 1 }
    ]
  },
  {
    id: 15,
    name: "Overall User Experience",
    weight: 2,
    maxPoints: 2,
    standard: "Nielsen's 10 Heuristics",
    description: "Evaluates compliance across Nielsen's 10 Usability Heuristics without major usability violations.",
    checklist: [
      { id: "niel1", text: "No major usability violations found", max: 2 }
    ]
  }
];

// CHAPTER 7 OFFICIAL HANDBOOK PENALTY SYSTEM (Capped at 20 Points)
export const PENALTY_RULES = [
  { id: "pen_missing_https", name: "Missing HTTPS / Invalid SSL certificate", deduction: -10, description: "-10 pts for missing HTTPS encryption on production domain" },
  { id: "pen_missing_privacy", name: "Missing Privacy Policy link", deduction: -3, description: "-3 pts for missing Privacy Policy link in navigation or footer" },
  { id: "pen_slow_lcp", name: "Extremely slow load (LCP > 6 s)", deduction: -5, description: "-5 pts for server average response latency exceeding 6,000ms" },
  { id: "pen_major_wcag_a", name: "Major accessibility failure (WCAG Level A)", deduction: -5, description: "-5 pts if >35% of images lack descriptive alt text" },
  { id: "pen_mobile_hscroll", name: "Horizontal scroll on mobile", deduction: -2, description: "-2 pts if mobile layout overflows 375px viewport width" }
];

export const GRADE_SCALE = [
  { min: 90, max: 100, grade: "A+", label: "Excellent / Industry Benchmark", action: "Maintain & iterate", color: "#10b981" },
  { min: 80, max: 89.9, grade: "A", label: "Very Good", action: "Minor tweaks only", color: "#3b82f6" },
  { min: 70, max: 79.9, grade: "B", label: "Good", action: "Address P2 issues", color: "#6366f1" },
  { min: 60, max: 69.9, grade: "C", label: "Average", action: "Significant UX improvements needed", color: "#f59e0b" },
  { min: 50, max: 59.9, grade: "D", label: "Needs Improvement", action: "Redesign key sections", color: "#f97316" },
  { min: 0, max: 49.9, grade: "F", label: "Major Redesign Required", action: "Full audit & rebuild", color: "#ef4444" }
];

export function getGrade(wqi) {
  const rounded = Math.round(wqi * 10) / 10;
  for (const g of GRADE_SCALE) {
    if (rounded >= g.min && rounded <= g.max) return { ...g, wqi: rounded };
  }
  return rounded >= 90 ? { ...GRADE_SCALE[0], wqi: rounded } : { ...GRADE_SCALE[GRADE_SCALE.length - 1], wqi: rounded };
}
