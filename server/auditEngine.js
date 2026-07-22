import { WAEF_PARAMETERS, PENALTY_RULES, getGrade } from "./waefRules.js";

export function calculateAudit(crawlData, evalData) {
  const { parametersEval, penaltiesFound } = evalData;

  const parameterResults = [];
  let rawWqiTotal = 0;

  WAEF_PARAMETERS.forEach(param => {
    const pEval = parametersEval[param.id] || { scores: {}, notes: "" };
    let pointsObtained = 0;
    const checklistResults = [];

    param.checklist.forEach(item => {
      let obtained = pEval.scores[item.id];
      if (obtained === undefined) {
        obtained = item.max; // Default full marks
      }
      obtained = Math.min(item.max, Math.max(0, obtained));
      pointsObtained += obtained;

      checklistResults.push({
        id: item.id,
        text: item.text,
        max: item.max,
        obtained: Math.round(obtained * 10) / 10,
        status: obtained === item.max ? "Yes" : obtained > 0 ? "Partial" : "No"
      });
    });

    // WAEF v2.0 Formula: Parameter Score = (Points Obtained / Max Points) * Weight
    const normScore = (pointsObtained / param.maxPoints) * param.weight;
    rawWqiTotal += normScore;

    parameterResults.push({
      id: param.id,
      name: param.name,
      weight: param.weight,
      maxPoints: param.maxPoints,
      pointsObtained: Math.round(pointsObtained * 10) / 10,
      parameterScore: Math.round(normScore * 10) / 10,
      standard: param.standard,
      description: param.description,
      checklist: checklistResults,
      notes: pEval.notes || "",
      status: normScore >= param.weight * 0.8 ? "Good" : normScore >= param.weight * 0.5 ? "Average" : "Poor"
    });
  });

  // Calculate Penalties (strictly capped at 20 points per WAEF Chapter 7)
  let penaltySum = 0;
  const penaltyDetails = [];

  penaltiesFound.forEach(p => {
    const ded = Math.abs(p.deduction);
    penaltySum += ded;
    penaltyDetails.push({
      id: p.id,
      deduction: -ded,
      reason: p.reason
    });
  });

  const cappedPenalties = Math.min(20, penaltySum);
  const rawWqi = Math.round(rawWqiTotal * 10) / 10;
  const finalWqi = Math.max(0, Math.round((rawWqiTotal - cappedPenalties) * 10) / 10);
  const gradeInfo = getGrade(finalWqi);

  // Generate Prioritised Decision Matrix (P1-P4)
  const decisionMatrix = [];

  parameterResults.forEach(p => {
    if (p.parameterScore < p.weight * 0.6) {
      if (p.id === 12 || p.id === 6 || p.id === 8 || p.id === 3) {
        decisionMatrix.push({
          parameter: p.name,
          issue: `${p.name} scored ${p.parameterScore}/${p.weight}. ${p.notes}`,
          impact: "Critical / High",
          effort: "Low - Medium",
          priority: "P1 -- Fix Now"
        });
      } else if (p.id === 5 || p.id === 13 || p.id === 4) {
        decisionMatrix.push({
          parameter: p.name,
          issue: `${p.name} needs optimization (${p.parameterScore}/${p.weight}).`,
          impact: "Medium",
          effort: "Low",
          priority: "P2 -- Fix Soon"
        });
      } else {
        decisionMatrix.push({
          parameter: p.name,
          issue: `Enhance ${p.name} (${p.parameterScore}/${p.weight}).`,
          impact: "Medium",
          effort: "High",
          priority: "P4 -- Plan Redesign"
        });
      }
    }
  });

  if (penaltyDetails.length > 0) {
    penaltyDetails.forEach(pen => {
      decisionMatrix.unshift({
        parameter: "Penalty Warning",
        issue: pen.reason,
        impact: "Critical",
        effort: "Low",
        priority: "P1 -- Fix Now"
      });
    });
  }

  // WAEF v2.0 5-Pass Industry Target Benchmarks
  const benchmarkComparison = [
    { metric: "WQI Score", targetSite: finalWqi, targetA: 90.0, targetB: 80.0, targetC: 70.0, minPass: 60.0 },
    { metric: "Performance (Out of 10)", targetSite: parameterResults.find(p => p.id === 8)?.parameterScore || 0, targetA: 9.0, targetB: 8.0, targetC: 7.0, minPass: 6.0 },
    { metric: "Accessibility (Out of 10)", targetSite: parameterResults.find(p => p.id === 6)?.parameterScore || 0, targetA: 9.0, targetB: 8.0, targetC: 7.0, minPass: 6.0 },
    { metric: "Mobile UX (Out of 10)", targetSite: parameterResults.find(p => p.id === 7)?.parameterScore || 0, targetA: 9.0, targetB: 8.0, targetC: 7.0, minPass: 6.0 }
  ];

  return {
    meta: {
      auditedUrl: crawlData.url,
      domain: crawlData.domain,
      auditTimestamp: new Date().toISOString(),
      framework: "Website Quality Index (WQI) - WAEF v2.0 (5-Pass Deep Audit)",
      author: "Ujjawal Sharma (VIT Bhopal University, 2026)",
      passCount: 5
    },
    scores: {
      rawWqi,
      totalPenalties: cappedPenalties,
      penaltySumUncapped: penaltySum,
      finalWqi,
      grade: gradeInfo.grade,
      interpretation: gradeInfo.label,
      recommendedAction: gradeInfo.action,
      gradeColor: gradeInfo.color
    },
    crawlSummary: {
      statusCode: crawlData.statusCode,
      responseTimeMs: crawlData.responseTimeMs,
      latencySamples: crawlData.latencySamples,
      passCount: 5,
      domElementsCount: crawlData.domElementsCount,
      title: crawlData.title,
      metaDescription: crawlData.metaDescription,
      headings: crawlData.headings,
      imagesTotal: crawlData.images.total,
      missingAltCount: crawlData.images.missingAlt,
      isHttps: crawlData.isHttps,
      hasPrivacyPolicy: crawlData.hasPrivacyPolicy,
      hasTerms: crawlData.hasTerms,
      socialLinksCount: crawlData.socialLinks.length,
      mobileAudit: crawlData.mobileAudit
    },
    parameters: parameterResults,
    penalties: penaltyDetails,
    decisionMatrix,
    benchmarkComparison
  };
}
