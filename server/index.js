import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { crawlWebsite } from "./crawler.js";
import { evaluateWithLLM } from "./llmEvaluator.js";
import { calculateAudit } from "./auditEngine.js";
import { WAEF_PARAMETERS, PENALTY_RULES, GRADE_SCALE, getGrade } from "./waefRules.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    framework: "WAEF v1.0 (Website Quality Index)",
    author: "Ujjawal Sharma (VIT Bhopal University)",
    version: "1.0.0"
  });
});

// Endpoint: WAEF Metadata & Schema
app.get("/api/schema", (req, res) => {
  res.json({
    parameters: WAEF_PARAMETERS,
    penalties: PENALTY_RULES,
    grades: GRADE_SCALE
  });
});

// Endpoint: Live Audit any URL
app.post("/api/audit", async (req, res) => {
  const { url, apiKey } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Please provide a valid website URL to audit." });
  }

  try {
    console.log(`[AUDIT REQUEST] Auditing website: ${url}...`);
    const crawlData = await crawlWebsite(url);
    const evalData = await evaluateWithLLM(crawlData, apiKey);
    const auditReport = calculateAudit(crawlData, evalData);

    res.json({ success: true, report: auditReport });
  } catch (err) {
    console.error("[AUDIT ERROR]", err);
    res.status(500).json({ error: `Audit failed: ${err.message}` });
  }
});

// Endpoint: Gold Standard Benchmark Case Study (Stripe.com - Grade A+ 96/100)
app.get("/api/gold-benchmark", (req, res) => {
  res.json({
    success: true,
    report: {
      meta: {
        auditedUrl: "https://stripe.com",
        domain: "stripe.com",
        auditTimestamp: "2026-07-22",
        framework: "Website Quality Index (WQI) - WAEF v1.0",
        author: "Ujjawal Sharma (VIT Bhopal University)",
        caseStudyTitle: "Stripe.com — Gold Standard Industry Benchmark (Grade A+)"
      },
      scores: {
        rawWqi: 96.0,
        totalPenalties: 0,
        penaltySumUncapped: 0,
        finalWqi: 96.0,
        grade: "A+",
        interpretation: "Excellent / Industry Benchmark",
        recommendedAction: "Maintain & iterate",
        gradeColor: "#10b981"
      },
      crawlSummary: {
        statusCode: 200,
        responseTimeMs: 840,
        title: "Stripe | Financial Infrastructure for the Internet",
        metaDescription: "Stripe is a suite of APIs powering online payment processing and financial infrastructure for Internet businesses.",
        headings: { h1: ["Financial infrastructure for the internet"], h2: ["Modular solutions", "Global scale", "Developer tools"], h3: [], total: 12 },
        imagesTotal: 24,
        missingAltCount: 0,
        isHttps: true,
        hasPrivacyPolicy: true,
        hasTerms: true,
        socialLinksCount: 5
      },
      parameters: [
        { id: 1, name: "Brand Identity & Consistency", weight: 5, maxPoints: 5, pointsObtained: 5.0, parameterScore: 5.0, status: "Good", standard: "Brand Guidelines", notes: "Flawless brand identity, logo, typography, and cohesive gradient design language." },
        { id: 2, name: "Visual Design & Aesthetics", weight: 8, maxPoints: 8, pointsObtained: 8.0, parameterScore: 8.0, status: "Good", standard: "Visual Design Principles", notes: "World-class whitespace, visual hierarchy, micro-animations, and glassmorphism." },
        { id: 3, name: "Navigation & Information Architecture", weight: 10, maxPoints: 10, pointsObtained: 10.0, parameterScore: 10.0, status: "Good", standard: "Jakob's Law, 3-Click Rule", notes: "Mega menu with rich visual cards, instant search, and intuitive page hierarchy." },
        { id: 4, name: "Homepage & First Impression", weight: 7, maxPoints: 7, pointsObtained: 7.0, parameterScore: 7.0, status: "Good", standard: "3-Second Rule", notes: "Hero value proposition immediately understood within 1 second." },
        { id: 5, name: "Typography & Readability", weight: 5, maxPoints: 5, pointsObtained: 5.0, parameterScore: 5.0, status: "Good", standard: "WCAG 2.2", notes: "Custom Stripe Sans typography with optimal leading and high contrast ratios." },
        { id: 6, name: "Accessibility", weight: 10, maxPoints: 10, pointsObtained: 9.5, parameterScore: 9.5, status: "Good", standard: "WCAG 2.2 Level AA", notes: "Full keyboard focus ring support, 100% ALT text coverage." },
        { id: 7, name: "Mobile Responsiveness", weight: 10, maxPoints: 10, pointsObtained: 10.0, parameterScore: 10.0, status: "Good", standard: "Google Mobile-Friendly", notes: "Fluid mobile layout, touch targets >= 48px, zero horizontal overflow." },
        { id: 8, name: "Performance & Loading Speed", weight: 10, maxPoints: 10, pointsObtained: 9.0, parameterScore: 9.0, status: "Good", standard: "Core Web Vitals", notes: "Sub-second LCP (840ms), minimal layout shift (CLS < 0.05)." },
        { id: 9, name: "Content Quality", weight: 8, maxPoints: 8, pointsObtained: 8.0, parameterScore: 8.0, status: "Good", standard: "Content UX Principles", notes: "Concise, compelling copy targeting developers and business leaders." },
        { id: 10, name: "Search & Findability", weight: 5, maxPoints: 5, pointsObtained: 4.5, parameterScore: 4.5, status: "Good", standard: "Information Retrieval", notes: "Fast search modal across documentation and product pages." },
        { id: 11, name: "Forms & User Interaction", weight: 5, maxPoints: 5, pointsObtained: 5.0, parameterScore: 5.0, status: "Good", standard: "Baymard Institute", notes: "Real-time inline validation, minimalist input fields, instant error resolution." },
        { id: 12, name: "Security & Trust", weight: 7, maxPoints: 7, pointsObtained: 7.0, parameterScore: 7.0, status: "Good", standard: "HTTPS, OWASP", notes: "Bank-grade SSL encryption, SOC 2 compliance badges, privacy policy." },
        { id: 13, name: "SEO & Technical Quality", weight: 5, maxPoints: 5, pointsObtained: 5.0, parameterScore: 5.0, status: "Good", standard: "Google SEO", notes: "Perfect title tags, meta descriptions, canonical URLs, and XML sitemaps." },
        { id: 14, name: "Social Presence & Community", weight: 3, maxPoints: 3, pointsObtained: 3.0, parameterScore: 3.0, status: "Good", standard: "Social Engagement", notes: "Active developer community, GitHub, X/Twitter, and Discord links." },
        { id: 15, name: "Overall UX (Nielsen's Heuristics)", weight: 2, maxPoints: 2, pointsObtained: 2.0, parameterScore: 2.0, status: "Good", standard: "Nielsen's 10 Heuristics", notes: "Zero usability violations found across all 10 Nielsen heuristics." }
      ],
      penalties: [],
      decisionMatrix: [
        { parameter: "Iterative Enhancement", issue: "Maintain sub-second page performance across global CDN edges.", impact: "Low", effort: "Low", priority: "P3 -- Backlog" }
      ],
      benchmarkComparison: [
        { metric: "WQI Score", targetSite: 96.0, stripe: 96, apple: 94, google: 98, github: 90 },
        { metric: "Performance", targetSite: 9.0, stripe: 9.0, apple: 9.5, google: 10.0, github: 9.2 },
        { metric: "Accessibility", targetSite: 9.5, stripe: 9.5, apple: 9.8, google: 9.6, github: 9.0 },
        { metric: "Mobile UX", targetSite: 10.0, stripe: 10.0, apple: 10.0, google: 10.0, github: 9.5 }
      ]
    }
  });
});

app.listen(PORT, () => {
  console.log(`[WAEF AUDIT SERVER] Running on port ${PORT}`);
  console.log(`[FRAMEWORK] WAEF v1.0 (15 Parameters, 100 Marks) by Ujjawal Sharma`);
});
