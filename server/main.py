"""
FastAPI Server for Website Audit AI - WAEF v2.0 Platform
Author: Ujjawal Sharma (Ujjawal Groups)
"""

import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from waef_rules import WAEF_PARAMETERS, PENALTY_RULES, GRADE_SCALE
from crawler import crawl_website
from llm_evaluator import evaluate_with_llm
from audit_engine import calculate_audit

load_dotenv()

app = FastAPI(
    title="Ujjawal Groups Website Audit AI — WAEF v2.0",
    description="Official 5-Pass Empirical Website Quality Index (WQI) Audit Platform & API",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for frontend and browser extension
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AuditRequest(BaseModel):
    url: str = Field(..., description="Target website URL to audit", example="https://stripe.com")
    apiKey: str | None = Field(default=None, description="Optional Google Gemini API Key for AI evaluation")

@app.get("/")
def root():
    return {
        "message": "Ujjawal Groups Website Audit AI - WAEF v2.0 API is running",
        "docs": "/docs",
        "health": "/api/health",
        "schema": "/api/schema"
    }

@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "framework": "WAEF v2.0 (Website Quality Index)",
        "backend": "Python / FastAPI",
        "author": "Ujjawal Sharma (VIT Bhopal University)",
        "version": "2.0.0"
    }

@app.get("/api/schema")
def schema():
    return {
        "parameters": WAEF_PARAMETERS,
        "penalties": PENALTY_RULES,
        "grades": GRADE_SCALE
    }

@app.post("/api/audit")
async def audit_endpoint(payload: AuditRequest):
    url = payload.url.strip() if payload.url else ""
    if not url:
        raise HTTPException(status_code=400, detail="Please provide a valid website URL to audit.")

    try:
        print(f"[FASTAPI AUDIT REQUEST] Auditing website: {url}...")
        crawl_data = await crawl_website(url)
        eval_data = await evaluate_with_llm(crawl_data, payload.apiKey)
        report = calculate_audit(crawl_data, eval_data)
        return {"success": True, "report": report}
    except Exception as err:
        print(f"[AUDIT ERROR] {err}")
        raise HTTPException(status_code=500, detail=f"Audit failed: {str(err)}")

@app.get("/api/gold-benchmark")
def gold_benchmark():
    return {
        "success": True,
        "report": {
            "meta": {
                "auditedUrl": "https://stripe.com",
                "domain": "stripe.com",
                "auditTimestamp": "2026-07-22T00:00:00Z",
                "framework": "Website Quality Index (WQI) - WAEF v2.0",
                "author": "Ujjawal Sharma (VIT Bhopal University)",
                "backend": "Python / FastAPI",
                "caseStudyTitle": "Stripe.com — Gold Standard Industry Benchmark (Grade A+)"
            },
            "scores": {
                "rawWqi": 96.0,
                "totalPenalties": 0,
                "penaltySumUncapped": 0,
                "finalWqi": 96.0,
                "grade": "A+",
                "interpretation": "Excellent / Industry Benchmark",
                "recommendedAction": "Maintain & iterate",
                "gradeColor": "#10b981"
            },
            "crawlSummary": {
                "statusCode": 200,
                "responseTimeMs": 340,
                "latencySamples": [340, 310, 350, 330, 320],
                "passCount": 5,
                "domElementsCount": 850,
                "title": "Stripe | Financial Infrastructure for the Internet",
                "metaDescription": "Stripe is a suite of APIs powering online payment processing and financial infrastructure for Internet businesses.",
                "headings": {
                    "h1": ["Financial infrastructure for the internet"],
                    "h2": ["Modular solutions", "Global scale", "Developer tools"],
                    "h3": [],
                    "total": 12
                },
                "imagesTotal": 24,
                "missingAltCount": 0,
                "isHttps": True,
                "hasPrivacyPolicy": True,
                "hasTerms": True,
                "socialLinksCount": 5,
                "mobileAudit": {
                    "hasViewport": True,
                    "hasHorizontalScroll": False,
                    "smallTouchTargetsCount": 0,
                    "hasMobileNav": True,
                    "responsiveImagesRatio": 1.0,
                    "scrollWidth": 375,
                    "viewportWidth": 375
                }
            },
            "parameters": [
                {"id": 1, "name": "Brand Identity & Consistency", "weight": 5, "maxPoints": 5, "pointsObtained": 5.0, "parameterScore": 5.0, "status": "Good", "standard": "Brand Guidelines", "notes": "Flawless brand identity, logo, and typography."},
                {"id": 2, "name": "Visual Design & Aesthetics", "weight": 8, "maxPoints": 8, "pointsObtained": 8.0, "parameterScore": 8.0, "status": "Good", "standard": "Visual Design Principles", "notes": "World-class whitespace and visual hierarchy."},
                {"id": 3, "name": "Navigation & Information Architecture", "weight": 10, "maxPoints": 10, "pointsObtained": 10.0, "parameterScore": 10.0, "status": "Good", "standard": "Jakob's Law, 3-Click Rule", "notes": "Mega menu and intuitive page hierarchy."},
                {"id": 4, "name": "Homepage & First Impression", "weight": 7, "maxPoints": 7, "pointsObtained": 7.0, "parameterScore": 7.0, "status": "Good", "standard": "3-Second Rule", "notes": "Hero proposition immediately understood."},
                {"id": 5, "name": "Typography & Readability", "weight": 5, "maxPoints": 5, "pointsObtained": 5.0, "parameterScore": 5.0, "status": "Good", "standard": "WCAG 2.2", "notes": "Custom Stripe Sans with optimal leading."},
                {"id": 6, "name": "Accessibility", "weight": 10, "maxPoints": 10, "pointsObtained": 9.5, "parameterScore": 9.5, "status": "Good", "standard": "WCAG 2.2 Level AA", "notes": "Full keyboard focus rings, 100% ALT text coverage."},
                {"id": 7, "name": "Mobile Responsiveness", "weight": 10, "maxPoints": 10, "pointsObtained": 10.0, "parameterScore": 10.0, "status": "Good", "standard": "Google Mobile-Friendly", "notes": "Zero horizontal overflow."},
                {"id": 8, "name": "Performance & Loading Speed", "weight": 10, "maxPoints": 10, "pointsObtained": 9.5, "parameterScore": 9.5, "status": "Good", "standard": "Google Lighthouse", "notes": "Avg latency < 350ms."},
                {"id": 9, "name": "Content Quality", "weight": 8, "maxPoints": 8, "pointsObtained": 8.0, "parameterScore": 8.0, "status": "Good", "standard": "Content UX Principles", "notes": "High clarity, developer-friendly."},
                {"id": 10, "name": "Search & Findability", "weight": 5, "maxPoints": 5, "pointsObtained": 4.5, "parameterScore": 4.5, "status": "Good", "standard": "IR Principles", "notes": "Fast docs search."},
                {"id": 11, "name": "Forms & User Interaction", "weight": 5, "maxPoints": 5, "pointsObtained": 5.0, "parameterScore": 5.0, "status": "Good", "standard": "Baymard Institute", "notes": "Stripe Elements checkout."},
                {"id": 12, "name": "Security & Trust", "weight": 7, "maxPoints": 7, "pointsObtained": 7.0, "parameterScore": 7.0, "status": "Good", "standard": "HTTPS, OWASP", "notes": "PCI DSS Level 1, active SSL."},
                {"id": 13, "name": "SEO & Technical Quality", "weight": 5, "maxPoints": 5, "pointsObtained": 5.0, "parameterScore": 5.0, "status": "Good", "standard": "Google SEO Guidelines", "notes": "Comprehensive schema metadata."},
                {"id": 14, "name": "Social Presence & Community", "weight": 3, "maxPoints": 3, "pointsObtained": 3.0, "parameterScore": 3.0, "status": "Good", "standard": "Social Engagement", "notes": "Active GitHub, Twitter, LinkedIn."},
                {"id": 15, "name": "Overall User Experience", "weight": 2, "maxPoints": 2, "pointsObtained": 2.0, "parameterScore": 2.0, "status": "Good", "standard": "Nielsen's 10 Heuristics", "notes": "Zero usability heuristic violations."}
            ],
            "penalties": [],
            "decisionMatrix": [],
            "benchmarkComparison": [
                {"metric": "WQI Score", "targetSite": 96.0, "targetA": 90.0, "targetB": 80.0, "targetC": 70.0, "minPass": 60.0},
                {"metric": "Performance (Out of 10)", "targetSite": 9.5, "targetA": 9.0, "targetB": 8.0, "targetC": 7.0, "minPass": 6.0},
                {"metric": "Accessibility (Out of 10)", "targetSite": 9.5, "targetA": 9.0, "targetB": 8.0, "targetC": 7.0, "minPass": 6.0},
                {"metric": "Mobile UX (Out of 10)", "targetSite": 10.0, "targetA": 9.0, "targetB": 8.0, "targetC": 7.0, "minPass": 6.0}
            ]
        }
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting FastAPI WAEF v2.0 server on port {port}...")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
