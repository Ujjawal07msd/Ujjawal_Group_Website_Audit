import html2pdf from "html2pdf.js";

export function generateAuditPdf(reportData, auditorName = "Ujjawal Sharma") {
  const { meta, scores, crawlSummary, parameters, penalties, decisionMatrix } = reportData;

  const container = document.createElement("div");
  container.style.padding = "24px";
  container.style.fontFamily = "'Plus Jakarta Sans', Arial, sans-serif";
  container.style.color = "#0f172a";
  container.style.backgroundColor = "#ffffff";
  container.style.fontSize = "12px";
  container.style.lineHeight = "1.5";

  container.innerHTML = `
    <!-- PDF Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <h1 style="font-size: 20px; margin: 0; color: #1e293b; font-weight: 800; text-transform: uppercase;">5-STEP WEB SCRAPING AUDIT REPORT</h1>
        <p style="margin: 2px 0 0 0; color: #64748b; font-size: 11px;">
          Empirical 5-Step DOM Scrape & Itemized Handbook Parameter Evaluation
        </p>
        <p style="margin: 2px 0 0 0; color: #2563eb; font-size: 10px; font-weight: 700;">
          Report Prepared By: ${auditorName} (Ujjawal Groups)
        </p>
      </div>
      <div style="text-align: right; font-size: 10px; color: #64748b;">
        <div><strong>Date:</strong> ${new Date(meta.auditTimestamp || Date.now()).toLocaleDateString()}</div>
        <div><strong>Audited URL:</strong> ${meta.auditedUrl}</div>
        <div><strong>Framework:</strong> WAEF v2.0 (100 Marks)</div>
      </div>
    </div>

    <!-- Executive Score Summary Box -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="width: 33%; text-align: center; border-right: 1px solid #cbd5e1; padding-right: 12px;">
            <div style="font-size: 10px; color: #64748b; font-weight: 700; text-transform: uppercase;">Final WQI Score</div>
            <div style="font-size: 32px; font-weight: 900; color: ${scores.gradeColor || '#2563eb'}; margin: 4px 0;">${scores.finalWqi} <span style="font-size: 16px; color: #64748b;">/ 100</span></div>
            <div style="font-size: 11px; font-weight: 700; color: #334155;">Raw WQI: ${scores.rawWqi} | Penalties: -${scores.totalPenalties}</div>
          </td>
          <td style="width: 33%; text-align: center; border-right: 1px solid #cbd5e1; padding: 0 12px;">
            <div style="font-size: 10px; color: #64748b; font-weight: 700; text-transform: uppercase;">Handbook Grade</div>
            <div style="font-size: 28px; font-weight: 900; color: ${scores.gradeColor || '#2563eb'}; margin: 4px 0;">Grade ${scores.grade}</div>
            <div style="font-size: 11px; font-weight: 600; color: #475569;">${scores.interpretation}</div>
          </td>
          <td style="width: 33%; text-align: center; padding-left: 12px;">
            <div style="font-size: 10px; color: #64748b; font-weight: 700; text-transform: uppercase;">Recommended Action</div>
            <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-top: 8px;">${scores.recommendedAction}</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- 5-Step Web Scraping Execution Record -->
    <div style="margin-bottom: 20px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px;">
      <h3 style="font-size: 12px; margin: 0 0 8px 0; color: #1e293b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">5-Step Web Scraping Execution Record</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
        <tr>
          <td style="padding: 4px; border-bottom: 1px solid #f1f5f9;"><strong>Step 1 (Desktop DOM):</strong> Title: "${(crawlSummary.title || '').substring(0, 30)}...", H1: ${crawlSummary.h1Count || 0}, DOM Elements: ${crawlSummary.domElementsCount || 0}</td>
          <td style="padding: 4px; border-bottom: 1px solid #f1f5f9;"><strong>Step 4 (Security & Privacy):</strong> HTTPS: ${crawlSummary.isHttps ? 'Active SSL (+2)' : 'Insecure (0)'}, Privacy Link: ${crawlSummary.hasPrivacyPolicy ? 'Found (+1)' : 'Missing'}</td>
        </tr>
        <tr>
          <td style="padding: 4px; border-bottom: 1px solid #f1f5f9;"><strong>Step 2 (Mobile 375px):</strong> HScroll: ${crawlSummary.mobileAudit?.hasHorizontalScroll ? 'FAIL (Overflow)' : 'PASS (Clean)'}, Small Tap Targets: ${crawlSummary.mobileAudit?.smallTouchTargetsCount || 0}</td>
          <td style="padding: 4px; border-bottom: 1px solid #f1f5f9;"><strong>Step 5 (5-Sample Latency Avg):</strong> ${crawlSummary.responseTimeMs} ms (Samples: ${crawlSummary.latencySamples ? crawlSummary.latencySamples.join(', ') + ' ms' : ''})</td>
        </tr>
      </table>
    </div>

    <!-- Penalties Section (If Any) -->
    ${penalties && penalties.length > 0 ? `
      <div style="margin-bottom: 20px; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 6px; padding: 12px;">
        <h3 style="font-size: 12px; margin: 0 0 8px 0; color: #991b1b; text-transform: uppercase;">Applied Handbook Penalty Deductions (Capped at -20 pts)</h3>
        <ul style="margin: 0; padding-left: 16px; color: #991b1b; font-size: 10px;">
          ${penalties.map(p => `<li style="margin-bottom: 4px;"><strong>${p.deduction} pts:</strong> ${p.reason}</li>`).join("")}
        </ul>
      </div>
    ` : ""}

    <!-- Itemized Handbook Parameter Evaluation Breakdown -->
    <div style="margin-bottom: 20px;">
      <h2 style="font-size: 13px; margin: 0 0 10px 0; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">Itemized Handbook Parameter Evaluation Breakdown (15 Parameters - 100 Marks)</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
        <thead>
          <tr style="background: #f1f5f9; text-align: left; font-weight: 700; color: #334155;">
            <th style="padding: 6px; border: 1px solid #cbd5e1;">#</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1;">Parameter Name</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1;">Weight</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1;">Score</th>
            <th style="padding: 6px; border: 1px solid #cbd5e1;">Standard</th>
          </tr>
        </thead>
        <tbody>
          ${parameters.map(p => `
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: 700;">${p.id}</td>
              <td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: 600; color: #0f172a;">${p.name}</td>
              <td style="padding: 6px; border: 1px solid #e2e8f0; text-align: center;">${p.weight}</td>
              <td style="padding: 6px; border: 1px solid #e2e8f0; text-align: center; font-weight: 700; color: ${p.parameterScore >= p.weight * 0.8 ? '#16a34a' : p.parameterScore >= p.weight * 0.5 ? '#d97706' : '#dc2626'};">${p.parameterScore}</td>
              <td style="padding: 6px; border: 1px solid #e2e8f0; color: #475569;">${p.standard}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <!-- PDF Footer -->
    <div style="border-top: 2px solid #e2e8f0; padding-top: 12px; margin-top: 24px; text-align: center; font-size: 10px; color: #64748b;">
      <p style="margin: 0 0 2px 0;"><strong>Report Prepared By: ${auditorName}</strong> (Ujjawal Groups)</p>
      <p style="margin: 0; color: #94a3b8;">Website Audit & Evaluation Framework (WAEF v2.0) • © 2026 Ujjawal Groups. All Rights Reserved.</p>
    </div>
  `;

  const opt = {
    margin: [10, 10, 10, 10],
    filename: `5Step_WebScraping_Audit_Report_${meta.domain || 'website'}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(opt).from(container).save();
}

export function generateComparativePdfReport(reportA, reportB, auditorName = "Ujjawal Sharma") {
  const domA = reportA.meta.domain;
  const domB = reportB.meta.domain;

  const scoreA = reportA.scores.finalWqi;
  const scoreB = reportB.scores.finalWqi;

  const winner = scoreA > scoreB ? domA : scoreB > scoreA ? domB : "Tie";
  const diff = Math.abs(Math.round((scoreA - scoreB) * 10) / 10);

  const container = document.createElement("div");
  container.style.padding = "24px";
  container.style.fontFamily = "'Plus Jakarta Sans', Arial, sans-serif";
  container.style.color = "#0f172a";
  container.style.backgroundColor = "#ffffff";
  container.style.fontSize = "11px";
  container.style.lineHeight = "1.5";

  container.innerHTML = `
    <!-- PDF Header -->
    <div style="border-bottom: 2px solid #4f46e5; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <h1 style="font-size: 18px; margin: 0; color: #1e293b; font-weight: 800; text-transform: uppercase;">WAEF v2.0 SIDE-BY-SIDE COMPARATIVE AUDIT REPORT</h1>
        <p style="margin: 2px 0 0 0; color: #4338ca; font-size: 11px; font-weight: 700;">
          Comparative Analysis: ${domA} vs ${domB}
        </p>
        <p style="margin: 2px 0 0 0; color: #64748b; font-size: 9px;">
          Engineered by Ujjawal Sharma &bull; Ujjawal Groups
        </p>
      </div>
      <div style="text-align: right; font-size: 10px; color: #64748b;">
        <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
        <div><strong>Benchmark Winner:</strong> <span style="color: #16a34a; font-weight: 800;">${winner} (+${diff} pts)</span></div>
      </div>
    </div>

    <!-- Comparative Score Summary Cards -->
    <div style="display: flex; gap: 16px; margin-bottom: 20px;">
      <div style="flex: 1; background: #f8fafc; border: 2px solid #2563eb; border-radius: 8px; padding: 12px; text-align: center;">
        <div style="font-size: 10px; color: #2563eb; font-weight: 800; text-transform: uppercase;">SITE A: ${domA}</div>
        <div style="font-size: 28px; font-weight: 900; color: #2563eb; margin: 4px 0;">${scoreA} <span style="font-size: 14px; color: #64748b;">/ 100</span></div>
        <div style="font-size: 11px; font-weight: 700; color: #1e293b;">Grade ${reportA.scores.grade} &bull; Penalties: -${reportA.scores.totalPenalties}</div>
        <div style="font-size: 9px; color: #64748b; margin-top: 4px;">Latency: ${reportA.crawlSummary.responseTimeMs}ms</div>
      </div>

      <div style="flex: 1; background: #f8fafc; border: 2px solid #4f46e5; border-radius: 8px; padding: 12px; text-align: center;">
        <div style="font-size: 10px; color: #4f46e5; font-weight: 800; text-transform: uppercase;">SITE B: ${domB}</div>
        <div style="font-size: 28px; font-weight: 900; color: #4f46e5; margin: 4px 0;">${scoreB} <span style="font-size: 14px; color: #64748b;">/ 100</span></div>
        <div style="font-size: 11px; font-weight: 700; color: #1e293b;">Grade ${reportB.scores.grade} &bull; Penalties: -${reportB.scores.totalPenalties}</div>
        <div style="font-size: 9px; color: #64748b; margin-top: 4px;">Latency: ${reportB.crawlSummary.responseTimeMs}ms</div>
      </div>
    </div>

    <!-- 15-Parameter Side-by-Side Breakdown -->
    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 12px; margin: 0 0 8px 0; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">15-Parameter Side-by-Side WQI Comparison Table</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
        <thead>
          <tr style="background: #f1f5f9; text-align: left; font-weight: 700; color: #334155;">
            <th style="padding: 5px; border: 1px solid #cbd5e1;">#</th>
            <th style="padding: 5px; border: 1px solid #cbd5e1;">Parameter Name</th>
            <th style="padding: 5px; border: 1px solid #cbd5e1; text-align: center;">Weight</th>
            <th style="padding: 5px; border: 1px solid #cbd5e1; text-align: center;">${domA}</th>
            <th style="padding: 5px; border: 1px solid #cbd5e1; text-align: center;">${domB}</th>
            <th style="padding: 5px; border: 1px solid #cbd5e1; text-align: center;">Lead / Advantage</th>
          </tr>
        </thead>
        <tbody>
          ${reportA.parameters.map((pA, idx) => {
            const pB = reportB.parameters[idx] || { parameterScore: 0 };
            const pDiff = Math.round((pA.parameterScore - pB.parameterScore) * 10) / 10;
            const leadText = pDiff > 0 ? `${domA} (+${pDiff})` : pDiff < 0 ? `${domB} (+${Math.abs(pDiff)})` : "Equal";
            const leadColor = pDiff > 0 ? "#16a34a" : pDiff < 0 ? "#4338ca" : "#64748b";

            return `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 5px; border: 1px solid #e2e8f0; font-weight: 700;">${pA.id}</td>
                <td style="padding: 5px; border: 1px solid #e2e8f0; font-weight: 600;">${pA.name}</td>
                <td style="padding: 5px; border: 1px solid #e2e8f0; text-align: center;">${pA.weight}</td>
                <td style="padding: 5px; border: 1px solid #e2e8f0; text-align: center; font-weight: 700; color: #2563eb;">${pA.parameterScore}</td>
                <td style="padding: 5px; border: 1px solid #e2e8f0; text-align: center; font-weight: 700; color: #4f46e5;">${pB.parameterScore}</td>
                <td style="padding: 5px; border: 1px solid #e2e8f0; text-align: center; font-weight: 700; color: ${leadColor};">${leadText}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>

    <!-- Comparative Crawl Metrics -->
    <div style="margin-bottom: 20px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px;">
      <h3 style="font-size: 11px; margin: 0 0 6px 0; color: #1e293b; text-transform: uppercase;">Empirical Crawl Metrics Comparison</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 9px;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 4px;"><strong>HTTPS SSL Encryption:</strong></td>
          <td style="padding: 4px;">${domA}: ${reportA.crawlSummary.isHttps ? 'Yes (Active SSL)' : 'No'}</td>
          <td style="padding: 4px;">${domB}: ${reportB.crawlSummary.isHttps ? 'Yes (Active SSL)' : 'No'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 4px;"><strong>Mobile 375px Horizontal Overflow:</strong></td>
          <td style="padding: 4px;">${domA}: ${reportA.crawlSummary.mobileAudit?.hasHorizontalScroll ? 'Overflow FAIL' : 'Clean PASS'}</td>
          <td style="padding: 4px;">${domB}: ${reportB.crawlSummary.mobileAudit?.hasHorizontalScroll ? 'Overflow FAIL' : 'Clean PASS'}</td>
        </tr>
        <tr>
          <td style="padding: 4px;"><strong>Missing Alt Text Count:</strong></td>
          <td style="padding: 4px;">${domA}: ${reportA.crawlSummary.missingAltCount || 0} missing</td>
          <td style="padding: 4px;">${domB}: ${reportB.crawlSummary.missingAltCount || 0} missing</td>
        </tr>
      </table>
    </div>

    <!-- PDF Footer -->
    <div style="border-top: 2px solid #e2e8f0; padding-top: 10px; text-align: center; font-size: 9px; color: #64748b;">
      <p style="margin: 0;"><strong>Report Prepared By: ${auditorName}</strong> (Ujjawal Groups)</p>
      <p style="margin: 2px 0 0 0;">Website Audit & Evaluation Framework (WAEF v2.0) &bull; © 2026 Ujjawal Groups. All Rights Reserved.</p>
    </div>
  `;

  const opt = {
    margin: [8, 8, 8, 8],
    filename: `WAEF_Comparative_Audit_${domA}_vs_${domB}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(opt).from(container).save();
}

export const generateDetailedPdfReport = generateAuditPdf;
