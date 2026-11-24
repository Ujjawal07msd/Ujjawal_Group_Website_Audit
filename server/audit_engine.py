"""
WAEF v2.0 Mathematical Scoring Engine
Author: Ujjawal Sharma (Ujjawal Groups)
"""

from datetime import datetime
from waef_rules import WAEF_PARAMETERS, get_grade

def calculate_audit(crawl_data: dict, eval_data: dict) -> dict:
    parameters_eval = eval_data.get("parametersEval", {})
    penalties_found = eval_data.get("penaltiesFound", [])

    parameter_results = []
    raw_wqi_total = 0.0

    for param in WAEF_PARAMETERS:
        p_eval = parameters_eval.get(param["id"], {"scores": {}, "notes": ""})
        points_obtained = 0.0
        checklist_results = []

        for item in param["checklist"]:
            obtained = p_eval["scores"].get(item["id"])
            if obtained is None:
                obtained = float(item["max"])
            obtained = min(float(item["max"]), max(0.0, float(obtained)))
            points_obtained += obtained

            checklist_results.append({
                "id": item["id"],
                "text": item["text"],
                "max": item["max"],
                "obtained": round(obtained, 1),
                "status": "Yes" if obtained == item["max"] else ("Partial" if obtained > 0 else "No")
            })

        # WAEF v2.0 Formula: Parameter Score = (Points Obtained / Max Points) * Weight
        norm_score = (points_obtained / param["maxPoints"]) * param["weight"]
        raw_wqi_total += norm_score

        parameter_results.append({
            "id": param["id"],
            "name": param["name"],
            "weight": param["weight"],
            "maxPoints": param["maxPoints"],
            "pointsObtained": round(points_obtained, 1),
            "parameterScore": round(norm_score, 1),
            "standard": param["standard"],
            "description": param["description"],
            "checklist": checklist_results,
            "notes": p_eval.get("notes", ""),
            "status": "Good" if norm_score >= param["weight"] * 0.8 else ("Average" if norm_score >= param["weight"] * 0.5 else "Poor")
        })

    # Calculate Penalties (strictly capped at 20 points per WAEF Chapter 7)
    penalty_sum = 0
    penalty_details = []

    for p in penalties_found:
        ded = abs(p.get("deduction", 0))
        penalty_sum += ded
        penalty_details.append({
            "id": p.get("id"),
            "deduction": -ded,
            "reason": p.get("reason", "")
        })

    capped_penalties = min(20, penalty_sum)
    raw_wqi = round(raw_wqi_total, 1)
    final_wqi = max(0.0, round(raw_wqi_total - capped_penalties, 1))
    grade_info = get_grade(final_wqi)

    # Decision Matrix Prioritized Recommendations (P1-P4)
    decision_matrix = []

    for p in parameter_results:
        if p["parameterScore"] < p["weight"] * 0.6:
            if p["id"] in [12, 6, 8, 3]:
                decision_matrix.append({
                    "parameter": p["name"],
                    "issue": f"{p['name']} scored {p['parameterScore']}/{p['weight']}. {p['notes']}",
                    "impact": "Critical / High",
                    "effort": "Low - Medium",
                    "priority": "P1 -- Fix Now"
                })
            elif p["id"] in [5, 13, 4]:
                decision_matrix.append({
                    "parameter": p["name"],
                    "issue": f"{p['name']} needs optimization ({p['parameterScore']}/{p['weight']}).",
                    "impact": "Medium",
                    "effort": "Low",
                    "priority": "P2 -- Fix Soon"
                })
            else:
                decision_matrix.append({
                    "parameter": p["name"],
                    "issue": f"Enhance {p['name']} ({p['parameterScore']}/{p['weight']}).",
                    "impact": "Medium",
                    "effort": "High",
                    "priority": "P4 -- Plan Redesign"
                })

    for pen in penalty_details:
        decision_matrix.insert(0, {
            "parameter": "Penalty Warning",
            "issue": pen["reason"],
            "impact": "Critical",
            "effort": "Low",
            "priority": "P1 -- Fix Now"
        })

    # Benchmark Comparison Targets
    perf_score = next((p["parameterScore"] for p in parameter_results if p["id"] == 8), 0.0)
    access_score = next((p["parameterScore"] for p in parameter_results if p["id"] == 6), 0.0)
    mobile_score = next((p["parameterScore"] for p in parameter_results if p["id"] == 7), 0.0)

    benchmark_comparison = [
        {"metric": "WQI Score", "targetSite": final_wqi, "targetA": 90.0, "targetB": 80.0, "targetC": 70.0, "minPass": 60.0},
        {"metric": "Performance (Out of 10)", "targetSite": perf_score, "targetA": 9.0, "targetB": 8.0, "targetC": 7.0, "minPass": 6.0},
        {"metric": "Accessibility (Out of 10)", "targetSite": access_score, "targetA": 9.0, "targetB": 8.0, "targetC": 7.0, "minPass": 6.0},
        {"metric": "Mobile UX (Out of 10)", "targetSite": mobile_score, "targetA": 9.0, "targetB": 8.0, "targetC": 7.0, "minPass": 6.0}
    ]

    return {
        "meta": {
            "auditedUrl": crawl_data.get("url"),
            "domain": crawl_data.get("domain"),
            "auditTimestamp": datetime.utcnow().isoformat() + "Z",
            "framework": "Website Quality Index (WQI) - WAEF v2.0 (FastAPI 5-Pass Engine)",
            "author": "Ujjawal Sharma (VIT Bhopal University, 2026)",
            "backend": "Python / FastAPI",
            "passCount": 5
        },
        "scores": {
            "rawWqi": raw_wqi,
            "totalPenalties": capped_penalties,
            "penaltySumUncapped": penalty_sum,
            "finalWqi": final_wqi,
            "grade": grade_info["grade"],
            "interpretation": grade_info["label"],
            "recommendedAction": grade_info["action"],
            "gradeColor": grade_info["color"]
        },
        "crawlSummary": {
            "statusCode": crawl_data.get("statusCode", 200),
            "responseTimeMs": crawl_data.get("responseTimeMs", 0),
            "latencySamples": crawl_data.get("latencySamples", []),
            "passCount": 5,
            "domElementsCount": crawl_data.get("domElementsCount", 0),
            "title": crawl_data.get("title", ""),
            "metaDescription": crawl_data.get("metaDescription", ""),
            "headings": crawl_data.get("headings", {}),
            "imagesTotal": crawl_data.get("images", {}).get("total", 0),
            "missingAltCount": crawl_data.get("images", {}).get("missingAlt", 0),
            "isHttps": crawl_data.get("isHttps", True),
            "hasPrivacyPolicy": crawl_data.get("hasPrivacyPolicy", False),
            "hasTerms": crawl_data.get("hasTerms", False),
            "socialLinksCount": len(crawl_data.get("socialLinks", [])),
            "mobileAudit": crawl_data.get("mobileAudit", {})
        },
        "parameters": parameter_results,
        "penalties": penalty_details,
        "decisionMatrix": decision_matrix,
        "benchmarkComparison": benchmark_comparison,
        "llmPriorityFixes": eval_data.get("llmPriorityFixes", []),
        "llmExecutiveSummary": eval_data.get("llmExecutiveSummary", "")
    }
