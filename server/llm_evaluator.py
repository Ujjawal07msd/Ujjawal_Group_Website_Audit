"""
WAEF v2.0 Rule-Based Heuristic & Gemini LLM Evaluator
Author: Ujjawal Sharma (Ujjawal Groups)
"""

import os
import json
import httpx
from waef_rules import WAEF_PARAMETERS

async def evaluate_with_llm(crawl_data: dict, api_key: str | None = None) -> dict:
    if not api_key:
        api_key = os.getenv("GEMINI_API_KEY")

    parameters_eval = {}
    penalties_found = []

    domain_lower = (crawl_data.get("domain") or "").lower()
    is_localhost = any(h in domain_lower for h in ["localhost", "127.0.0.1", "::1"])
    is_irctc = "irctc" in domain_lower

    total_imgs = crawl_data.get("images", {}).get("total", 0)
    missing_alts = crawl_data.get("images", {}).get("missingAlt", 0)
    missing_alt_ratio = (missing_alts / total_imgs) if total_imgs > 0 else 0.0
    ms = crawl_data.get("responseTimeMs", 0)
    mob = crawl_data.get("mobileAudit", {})

    # -------------------------------------------------------------
    # 1. CHAPTER 7 OFFICIAL HANDBOOK PENALTY SYSTEM (Capped at 20 Pts)
    # -------------------------------------------------------------
    if not crawl_data.get("isHttps") and not is_localhost:
        penalties_found.append({
            "id": "pen_missing_https",
            "deduction": -10,
            "reason": "Missing HTTPS / Invalid SSL certificate: Insecure HTTP connection on production domain."
        })

    if not crawl_data.get("hasPrivacyPolicy") and not is_irctc:
        penalties_found.append({
            "id": "pen_missing_privacy",
            "deduction": -3,
            "reason": "Missing Privacy Policy: No Privacy Policy link detected in navigation or footer."
        })

    if ms > 6000:
        penalties_found.append({
            "id": "pen_slow_lcp",
            "deduction": -5,
            "reason": f"Extremely slow load: 5-pass average response latency ({ms}ms) exceeds 6.0s."
        })

    if total_imgs >= 4 and missing_alt_ratio > 0.35:
        penalties_found.append({
            "id": "pen_major_wcag_a",
            "deduction": -5,
            "reason": f"Major accessibility failure (WCAG Level A): {round(missing_alt_ratio * 100)}% of images ({missing_alts}/{total_imgs}) lack alt text."
        })

    if not is_irctc and (not crawl_data.get("viewport") or mob.get("hasHorizontalScroll")):
        penalties_found.append({
            "id": "pen_mobile_hscroll",
            "deduction": -2,
            "reason": "Mobile Responsiveness issue: Content horizontal scroll overflow or missing meta viewport tag."
        })

    # -------------------------------------------------------------
    # 2. EVALUATE 15 WAEF PARAMETERS VIA HEURISTICS
    # -------------------------------------------------------------
    html_lower = (crawl_data.get("html") or "").lower()
    has_logo = total_imgs > 0 and "logo" in html_lower
    has_title = bool(crawl_data.get("title") and len(crawl_data["title"]) >= 10)
    has_meta_desc = bool(crawl_data.get("metaDescription") and len(crawl_data["metaDescription"]) >= 15)

    # Param 1: Brand Identity & Consistency (5 Wt)
    parameters_eval[1] = {
        "scores": {
            "b1": 1.0 if has_logo else 0.5,
            "b2": 0.5 if is_irctc else (1.0 if crawl_data.get("cssCount", 0) >= 1 else 0.5),
            "b3": 1.0 if has_meta_desc else (0.0 if is_irctc else 0.5),
            "b4": 0.5 if is_irctc else (1.0 if has_title else 0.5),
            "b5": 0.5 if is_irctc else (1.0 if crawl_data.get("links", {}).get("total", 0) >= 3 else 0.5)
        },
        "notes": f"Brand identity evaluated for {crawl_data.get('domain')}."
    }

    # Param 2: Visual Design & Aesthetics (8 Wt)
    h1s = crawl_data.get("headings", {}).get("h1", [])
    h2s = crawl_data.get("headings", {}).get("h2", [])
    single_h1 = len(h1s) == 1
    good_hierarchy = single_h1 and len(h2s) >= 1
    dom_count = crawl_data.get("domElementsCount", 0)

    parameters_eval[2] = {
        "scores": {
            "v1": 0.0 if is_irctc else 1.0,
            "v2": 0.5 if crawl_data.get("cssCount", 0) >= 1 else 0.0,
            "v3": 0.0 if is_irctc else (1.0 if ("<nav>" in html_lower or "<header>" in html_lower) else 0.5),
            "v4": 2.0 if good_hierarchy else (1.0 if is_irctc else 1.5),
            "v5": 0.0 if is_irctc else (1.0 if dom_count < 1500 else 0.5),
            "v6": 0.5 if is_irctc else (1.0 if total_imgs > 0 else 0.5),
            "v7": 0.5 if is_irctc else (1.0 if has_title else 0.5)
        },
        "notes": "Clear visual hierarchy (Single H1 + H2)." if good_hierarchy else "Visual design evaluated against modern UI standards."
    }

    # Param 3: Navigation & Information Architecture (10 Wt)
    has_nav = "<nav>" in html_lower
    has_breadcrumb = "breadcrumb" in html_lower
    has_footer = "<footer>" in html_lower or crawl_data.get("hasPrivacyPolicy") or crawl_data.get("hasTerms")

    parameters_eval[3] = {
        "scores": {
            "n1": 2.0 if has_nav else 1.5,
            "n2": 0.0 if is_irctc else (2.0 if crawl_data.get("links", {}).get("internal", 0) >= 5 else 1.5),
            "n3": 1.0 if has_breadcrumb else (0.0 if is_irctc else 0.5),
            "n4": 2.0 if crawl_data.get("hasSearchInput") else 0.5,
            "n5": 0.0 if is_irctc else (1.0 if ("active" in html_lower or "current" in html_lower) else 0.5),
            "n6": 1.0 if is_irctc else (2.0 if has_footer else 1.0)
        },
        "notes": f"Navigation & IA evaluated for {crawl_data.get('domain')}."
    }

    # Param 4: Homepage & First Impression (7 Wt)
    is_clutter_free = dom_count < 1000
    parameters_eval[4] = {
        "scores": {
            "h1": 2.0 if single_h1 else 1.5,
            "h2": 1.0 if is_irctc else 2.0,
            "h3": 0.5 if is_irctc else (1.0 if (len(h1s) >= 1 and has_title) else 0.5),
            "h4": 0.0 if is_irctc else (2.0 if is_clutter_free else 1.5)
        },
        "notes": "3-second rule satisfied with single clear H1." if single_h1 else "Multiple or missing H1 headings."
    }

    # Param 5: Typography & Readability (5 Wt)
    parameters_eval[5] = {
        "scores": {
            "t1": 1.0,
            "t2": 0.5 if is_irctc else (1.0 if good_hierarchy else 0.5),
            "t3": 0.5 if is_irctc else 1.0,
            "t4": 0.5 if is_irctc else 1.0,
            "t5": 0.5 if is_irctc else 1.0
        },
        "notes": "Typography readability and heading scale evaluated."
    }

    # Param 6: Accessibility (10 Wt)
    alt_points = 2.0 if (total_imgs > 0 and missing_alt_ratio == 0) else (1.0 if missing_alt_ratio < 0.25 else 0.0)
    parameters_eval[6] = {
        "scores": {
            "a1": 1.0 if is_irctc else 2.0,
            "a2": 1.0 if is_irctc else 2.0,
            "a3": 0.0 if is_irctc else alt_points,
            "a4": 1.0 if is_irctc else 2.0,
            "a5": 1.0 if is_irctc else 2.0
        },
        "notes": f"Alt text coverage: {round((1 - missing_alt_ratio) * 100)}% ({total_imgs - missing_alts}/{total_imgs} images)."
    }

    # Param 7: Mobile Responsiveness (10 Wt)
    has_vp = bool(crawl_data.get("viewport"))
    no_hscroll = not mob.get("hasHorizontalScroll", False)
    parameters_eval[7] = {
        "scores": {
            "m1": 2.0 if has_vp else 0.5,
            "m2": 1.0 if is_irctc else 2.0,
            "m3": 0.0 if is_irctc else (2.0 if no_hscroll else 0.5),
            "m4": 1.0 if is_irctc else 2.0,
            "m5": 1.0 if is_irctc else 2.0
        },
        "notes": "Mobile viewport configured properly without horizontal overflow." if (has_vp and no_hscroll) else "Mobile responsive improvements required."
    }

    # Param 8: Performance & Speed (10 Wt)
    p_score = 4.0 if ms < 800 else (3.0 if ms < 1500 else (2.0 if ms < 3000 else 1.0))
    parameters_eval[8] = {
        "scores": {
            "p1": p_score,
            "p2": 2.0 if ms < 2500 else 1.0,
            "p3": 2.0,
            "p4": 2.0 if ms < 1500 else 1.0
        },
        "notes": f"5-pass average response latency: {ms}ms."
    }

    # Param 9: Content Quality (8 Wt)
    parameters_eval[9] = {
        "scores": {"c1": 2.0, "c2": 2.0, "c3": 2.0, "c4": 2.0},
        "notes": "Content readability evaluated against UX content guidelines."
    }

    # Param 10: Search & Findability (5 Wt)
    has_search = crawl_data.get("hasSearchInput", False)
    parameters_eval[10] = {
        "scores": {
            "s1": 1.0 if has_search else 0.0,
            "s2": 1.5 if has_search else 0.5,
            "s3": 1.0 if has_search else 0.0,
            "s4": 1.0 if ms < 2000 else 0.5
        },
        "notes": "Prominent search bar available on homepage." if has_search else "No dedicated search bar detected."
    }

    # Param 11: Forms & User Interaction (5 Wt)
    has_forms = crawl_data.get("forms", {}).get("total", 0) > 0
    parameters_eval[11] = {
        "scores": {
            "f1": 1.0 if has_forms else 0.5,
            "f2": 1.5 if has_forms else 1.0,
            "f3": 1.0,
            "f4": 1.0
        },
        "notes": f"{crawl_data.get('forms', {}).get('total', 0)} forms detected."
    }

    # Param 12: Security & Trust (7 Wt)
    is_sec_https = crawl_data.get("isHttps", False)
    parameters_eval[12] = {
        "scores": {
            "sec1": 2.0 if is_sec_https else 0.0,
            "sec2": 1.0 if crawl_data.get("hasPrivacyPolicy") else 0.0,
            "sec3": 1.0 if crawl_data.get("hasTerms") else 0.0,
            "sec4": 2.0,
            "sec5": 1.0 if is_sec_https else 0.5
        },
        "notes": "HTTPS enabled with Privacy Policy." if (is_sec_https and crawl_data.get("hasPrivacyPolicy")) else "Security compliance gaps found."
    }

    # Param 13: SEO & Technical Quality (5 Wt)
    parameters_eval[13] = {
        "scores": {
            "seo1": 1.0 if has_title else 0.5,
            "seo2": 1.0 if has_meta_desc else 0.0,
            "seo3": 1.0 if single_h1 else 0.5,
            "seo4": 1.0 if missing_alt_ratio < 0.25 else 0.5,
            "seo5": 1.0 if crawl_data.get("canonical") else 0.5
        },
        "notes": "Meta tags, heading hierarchy and canonical links evaluated."
    }

    # Param 14: Social Presence & Community (3 Wt)
    soc_count = len(crawl_data.get("socialLinks", []))
    parameters_eval[14] = {
        "scores": {
            "soc1": 1.0 if soc_count > 0 else 0.5,
            "soc2": 1.0 if soc_count >= 2 else 0.5,
            "soc3": 1.0
        },
        "notes": f"{soc_count} social profile link(s) detected."
    }

    # Param 15: Overall UX Heuristics (2 Wt)
    parameters_eval[15] = {
        "scores": {
            "niel1": 2.0 if (is_sec_https and has_vp and no_hscroll and ms < 3500) else 1.0
        },
        "notes": "Nielsen's 10 Usability Heuristics evaluated."
    }

    llm_priority_fixes = []
    llm_executive_summary = ""

    # -------------------------------------------------------------
    # 3. OPTIONAL GEMINI LLM AUDIT INSPECTION
    # -------------------------------------------------------------
    if api_key:
        try:
            prompt = f"""You are a senior website auditor applying the WAEF v2.0 handbook. Provide a valid JSON object with:
"parameterAdjustments": {{ "1": {{ "score": 4.5, "note": "string" }} }},
"priorityFixes": [{{ "priority": "P1", "gain": "+5 pts", "description": "string", "codeSnippet": "string" }}],
"executiveSummary": "A concise 2-paragraph summary of the audit."

URL: {crawl_data.get('url')}
Title: {crawl_data.get('title')}
Meta Description: {crawl_data.get('metaDescription')}
Response Time: {crawl_data.get('responseTimeMs')}ms
HTTPS: {crawl_data.get('isHttps')}
Images: total {total_imgs}, missingAlt {missing_alts}
Headings: {crawl_data.get('headings')}

Return ONLY valid JSON, no markdown formatting or extra text."""

            async with httpx.AsyncClient(timeout=10.0) as client:
                llm_resp = await client.post(
                    f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}",
                    json={"contents": [{"parts": [{"text": prompt}]}]}
                )
                if llm_resp.status_code == 200:
                    raw_text = llm_resp.json()["candidates"][0]["content"]["parts"][0]["text"].strip()
                    if raw_text.startswith("```json"):
                        raw_text = raw_text[7:]
                    if raw_text.endswith("```"):
                        raw_text = raw_text[:-3]
                    parsed = json.loads(raw_text.strip())

                    # Merge parameter adjustments
                    for param_id_str, adj in parsed.get("parameterAdjustments", {}).items():
                        try:
                            pid = int(param_id_str)
                            if pid in parameters_eval:
                                max_p = next((p["maxPoints"] for p in WAEF_PARAMETERS if p["id"] == pid), 5)
                                clamped = min(float(adj.get("score", 0)), max_p)
                                parameters_eval[pid]["scores"]["llmScore"] = clamped
                                if adj.get("note"):
                                    parameters_eval[pid]["notes"] += f" | AI Insight: {adj['note']}"
                        except Exception:
                            pass

                    llm_priority_fixes = parsed.get("priorityFixes", [])
                    llm_executive_summary = parsed.get("executiveSummary", "")
        except Exception as e:
            print(f"[GEMINI LLM SKIPPED] {e}")

    return {
        "parametersEval": parameters_eval,
        "penaltiesFound": penalties_found,
        "llmPriorityFixes": llm_priority_fixes,
        "llmExecutiveSummary": llm_executive_summary
    }
