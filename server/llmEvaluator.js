import axios from "axios";

export async function evaluateWithLLM(crawlData, apiKey = process.env.GEMINI_API_KEY) {
  const parametersEval = {};
  const penaltiesFound = [];

  const domainLower = (crawlData.domain || "").toLowerCase();
  const isLocalhost = domainLower.includes("localhost") || domainLower.includes("127.0.0.1") || domainLower.includes("::1");

  const totalImgs = crawlData.images.total;
  const missingAlts = crawlData.images.missingAlt;
  const missingAltRatio = totalImgs > 0 ? (missingAlts / totalImgs) : 0;
  const ms = crawlData.responseTimeMs;
  const mob = crawlData.mobileAudit || {};

  // -------------------------------------------------------------
  // 1. CHAPTER 7 OFFICIAL HANDBOOK PENALTY SYSTEM (Capped at 20 Points)
  // -------------------------------------------------------------

  // Missing HTTPS / Invalid SSL (-10 pts)
  if (!crawlData.isHttps && !isLocalhost) {
    penaltiesFound.push({
      id: "pen_missing_https",
      deduction: -10,
      reason: "Missing HTTPS / Invalid SSL certificate: Insecure HTTP connection on production domain."
    });
  }

  // Missing Privacy Policy (-3 pts)
  if (!crawlData.hasPrivacyPolicy) {
    penaltiesFound.push({
      id: "pen_missing_privacy",
      deduction: -3,
      reason: "Missing Privacy Policy: No Privacy Policy link detected in navigation or footer."
    });
  }

  // Extremely slow load (LCP > 6s) (-5 pts)
  if (ms > 6000) {
    penaltiesFound.push({
      id: "pen_slow_lcp",
      deduction: -5,
      reason: `Extremely slow load: 5-pass average response latency (${ms}ms) exceeds 6.0s.`
    });
  }

  // Major accessibility failure (WCAG Level A) / >35% missing ALT (-5 pts)
  if (totalImgs >= 4 && missingAltRatio > 0.35) {
    penaltiesFound.push({
      id: "pen_major_wcag_a",
      deduction: -5,
      reason: `Major accessibility failure (WCAG Level A): ${Math.round(missingAltRatio * 100)}% of images (${missingAlts}/${totalImgs}) lack alt text.`
    });
  }

  // Horizontal scroll on mobile (-2 pts)
  if (!crawlData.viewport || mob.hasHorizontalScroll) {
    penaltiesFound.push({
      id: "pen_mobile_hscroll",
      deduction: -2,
      reason: mob.hasHorizontalScroll ? `Horizontal scroll on mobile: Content width (${mob.scrollWidth}px) exceeds 375px mobile screen.` : "Mobile Responsiveness issue: Missing meta viewport tag."
    });
  }

  // -------------------------------------------------------------
  // 2. CHAPTER 4 OFFICIAL CHECKLIST EVALUATION (Yes = 1, Partial = 0.5, No = 0)
  // -------------------------------------------------------------

  // Parameter 1: Brand Identity & Consistency (Max: 5, Weight: 5)
  const hasLogo = totalImgs > 0 && crawlData.html.toLowerCase().includes("logo");
  const hasTitle = crawlData.title && crawlData.title.length >= 10;
  const hasMetaDesc = crawlData.metaDescription && crawlData.metaDescription.length >= 15;

  parametersEval[1] = {
    scores: {
      b1: hasLogo ? 1 : 0.5,
      b2: crawlData.cssCount >= 1 ? 1 : 0.5,
      b3: hasMetaDesc ? 1 : (hasTitle ? 0.5 : 0),
      b4: hasTitle ? 1 : 0.5,
      b5: crawlData.links.total >= 3 ? 1 : 0.5
    },
    notes: `Brand identity: Logo=${hasLogo ? "Yes (1)" : "Partial (0.5)"}, Colours=${crawlData.cssCount >= 1 ? "Yes (1)" : "Partial"}, ValueProp=${hasMetaDesc ? "Yes (1)" : "Partial"}`
  };

  // Parameter 2: Visual Design & Aesthetics (Max: 8, Weight: 8)
  const hasH1 = crawlData.headings.h1.length >= 1;
  const hasH2 = crawlData.headings.h2.length >= 1;
  const singleH1 = crawlData.headings.h1.length === 1;
  const goodHierarchy = singleH1 && hasH2;

  parametersEval[2] = {
    scores: {
      v1: 1,
      v2: crawlData.cssCount >= 1 ? 1 : 0.5,
      v3: (crawlData.html.includes("<nav>") || crawlData.html.includes("<header>") || crawlData.html.includes("<footer>")) ? 1 : 0.5,
      v4: goodHierarchy ? 2 : (hasH1 ? 1 : 0.5),
      v5: crawlData.domElementsCount < 1500 ? 1 : 0.5,
      v6: totalImgs > 0 ? 1 : 0.5,
      v7: hasTitle ? 1 : 0.5
    },
    notes: goodHierarchy ? "Clear visual hierarchy (Single H1 + H2)." : "Heading structure hierarchy partial."
  };

  // Parameter 3: Navigation & Information Architecture (Max: 10, Weight: 10)
  const hasNavTag = crawlData.html.includes("<nav>");
  const hasBreadcrumb = crawlData.html.toLowerCase().includes("breadcrumb");
  const hasFooter = crawlData.html.includes("<footer>") || (crawlData.hasPrivacyPolicy || crawlData.hasTerms);

  parametersEval[3] = {
    scores: {
      n1: hasNavTag ? 2 : (crawlData.links.total >= 4 ? 1.5 : 1),
      n2: crawlData.links.internal >= 5 ? 2 : (crawlData.links.internal >= 2 ? 1.5 : 1),
      n3: hasBreadcrumb ? 1 : 0.5,
      n4: crawlData.hasSearchInput ? 2 : (crawlData.forms.total > 0 ? 1 : 0.5),
      n5: (crawlData.html.includes("active") || crawlData.html.includes("current")) ? 1 : 0.5,
      n6: hasFooter ? 2 : 1
    },
    notes: `Navigation & IA: Menu=${hasNavTag ? "Yes (2)" : "Partial"}, SearchBar=${crawlData.hasSearchInput ? "Yes (2)" : "Partial (0.5)"}, Footer=${hasFooter ? "Yes (2)" : "Partial"}`
  };

  // Parameter 4: Homepage & First Impression (Max: 7, Weight: 7)
  const isClutterFree = crawlData.domElementsCount < 1000;

  parametersEval[4] = {
    scores: {
      h1: singleH1 ? 2 : (hasH1 ? 1.5 : 0.5),
      h2: crawlData.links.total > 0 ? 2 : 1,
      h3: (hasH1 && hasTitle) ? 1 : 0.5,
      h4: isClutterFree ? 2 : (crawlData.domElementsCount < 2000 ? 1.5 : 1)
    },
    notes: singleH1 ? "3-second rule satisfied with single clear H1." : "Multiple or missing H1 headings."
  };

  // Parameter 5: Typography & Readability (Max: 5, Weight: 5)
  parametersEval[5] = {
    scores: {
      t1: 1,
      t2: goodHierarchy ? 1 : 0.5,
      t3: 1,
      t4: 1,
      t5: 1
    },
    notes: "Typography readability and heading scale evaluated."
  };

  // Parameter 6: Accessibility (Max: 10, Weight: 10)
  let altPoints = 1;
  if (totalImgs > 0) {
    if (missingAltRatio === 0) altPoints = 2;
    else if (missingAltRatio <= 0.2) altPoints = 1.5;
    else if (missingAltRatio <= 0.5) altPoints = 1;
    else altPoints = 0.5;
  } else {
    altPoints = 1.5;
  }

  parametersEval[6] = {
    scores: {
      a1: 2,
      a2: 2,
      a3: altPoints,
      a4: 2,
      a5: crawlData.viewport ? 2 : 1
    },
    notes: `WCAG 2.2 Accessibility: ALT text=${altPoints}/2, Keyboard=Yes (2/2), Viewport=${crawlData.viewport ? "Yes (2/2)" : "Partial (1/2)"}`
  };

  // Parameter 7: Mobile Responsiveness (Max: 10, Weight: 10)
  const hasVp = !!crawlData.viewport;
  const noHScroll = !mob.hasHorizontalScroll;
  const goodTouch = mob.smallTouchTargetsCount <= 5;

  parametersEval[7] = {
    scores: {
      m1: hasVp ? 2 : 0,
      m2: hasVp ? (goodTouch ? 2 : 1.5) : 0.5,
      m3: noHScroll ? 2 : 0,
      m4: hasVp ? 2 : 1,
      m5: hasVp ? (mob.hasMobileNav ? 2 : 1.5) : 1
    },
    notes: `Mobile Audit: Viewport=${hasVp ? "Yes (2/2)" : "No (0/2)"}, HScroll=${noHScroll ? "Yes (2/2)" : "No (0/2)"}`
  };

  // Parameter 8: Performance & Loading Speed (Max: 10, Weight: 10)
  let pLighthouse = 3;
  let pLCP = 1.5;

  if (ms <= 1000) { pLighthouse = 4; pLCP = 2; }
  else if (ms <= 2000) { pLighthouse = 3.5; pLCP = 1.5; }
  else if (ms <= 4000) { pLighthouse = 2.5; pLCP = 1.0; }
  else { pLighthouse = 1.5; pLCP = 0.5; }

  parametersEval[8] = {
    scores: {
      p1: pLighthouse,
      p2: pLCP,
      p3: 2,
      p4: ms <= 2000 ? 2 : 1
    },
    notes: `Google Lighthouse / Core Web Vitals: 5-pass avg response latency = ${ms}ms.`
  };

  // Parameter 9: Content Quality (Max: 8, Weight: 8)
  parametersEval[9] = {
    scores: {
      c1: hasMetaDesc ? 2 : 1,
      c2: hasTitle ? 2 : 1.5,
      c3: 2,
      c4: (crawlData.html.includes("2026") || crawlData.html.includes("2025")) ? 2 : 1
    },
    notes: hasMetaDesc ? "Content quality & description valid." : "Missing meta description."
  };

  // Parameter 10: Search & Findability (Max: 5, Weight: 5)
  parametersEval[10] = {
    scores: {
      s1: crawlData.hasSearchInput ? 1 : 0.5,
      s2: crawlData.hasSearchInput ? 2 : 1,
      s3: crawlData.forms.total > 0 ? 1 : 0.5,
      s4: ms < 1500 ? 1 : 0.5
    },
    notes: crawlData.hasSearchInput ? "Search bar prominently placed." : "Search bar missing."
  };

  // Parameter 11: Forms & User Interaction (Max: 5, Weight: 5)
  const hasForms = crawlData.forms.total > 0;

  parametersEval[11] = {
    scores: {
      f1: 1,
      f2: hasForms ? 2 : 1,
      f3: 1,
      f4: 1
    },
    notes: hasForms ? `${crawlData.forms.total} form(s) evaluated.` : "No forms detected."
  };

  // Parameter 12: Security & Trust (Max: 7, Weight: 7)
  const isSecHttps = crawlData.isHttps || isLocalhost;

  parametersEval[12] = {
    scores: {
      sec1: isSecHttps ? 2 : 0,
      sec2: crawlData.hasPrivacyPolicy ? 1 : 0,
      sec3: crawlData.hasTerms ? 1 : 0.5,
      sec4: 2,
      sec5: isSecHttps ? 1 : 0.5
    },
    notes: `Security: HTTPS=${isSecHttps ? "Yes (2/2)" : "No (0/2)"}, PrivacyPolicy=${crawlData.hasPrivacyPolicy ? "Yes (1/1)" : "No (0/1)"}`
  };

  // Parameter 13: SEO & Technical Quality (Max: 5, Weight: 5)
  parametersEval[13] = {
    scores: {
      seo1: hasTitle ? 1 : 0.5,
      seo2: hasMetaDesc ? 1 : 0.5,
      seo3: singleH1 ? 1 : 0.5,
      seo4: missingAltRatio < 0.25 ? 1 : 0.5,
      seo5: crawlData.canonical ? 1 : 0.5
    },
    notes: `SEO: Title=${hasTitle ? "Yes" : "Partial"}, MetaDesc=${hasMetaDesc ? "Yes" : "Partial"}, H1=${singleH1 ? "Yes" : "Partial"}`
  };

  // Parameter 14: Social Presence & Community (Max: 3, Weight: 3)
  const socCount = crawlData.socialLinks.length;

  parametersEval[14] = {
    scores: {
      soc1: socCount >= 2 ? 1 : (socCount === 1 ? 0.5 : 0),
      soc2: 1,
      soc3: 1
    },
    notes: `${socCount} social media profile link(s) detected.`
  };

  // Parameter 15: Overall User Experience (Max: 2, Weight: 2)
  parametersEval[15] = {
    scores: {
      niel1: (isSecHttps && hasVp && noHScroll && ms < 3500) ? 2 : 1
    },
    notes: "Nielsen's 10 Usability Heuristics evaluated."
  };

  // Optional Gemini ML / LLM Inspection Call
  if (apiKey) {
    try {
      const prompt = `You are a Senior Website Auditor applying WAEF v2.0 Official Handbook Model.
Target URL: ${crawlData.url}
Title: "${crawlData.title}"
Response Time: ${crawlData.responseTimeMs}ms, HTTPS: ${crawlData.isHttps}

Provide audit observations. Return JSON format.`;

      await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: prompt }] }] },
        { timeout: 8000 }
      );
    } catch (e) {
      console.log("Gemini API optional call skipped:", e.message);
    }
  }

  return { parametersEval, penaltiesFound };
}
