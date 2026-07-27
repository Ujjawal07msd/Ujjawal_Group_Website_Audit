// Ujjawal Groups Extension Popup Controller
document.addEventListener("DOMContentLoaded", () => {
  const activeUrlEl = document.getElementById("activeUrl");
  const auditBtn = document.getElementById("auditBtn");
  const auditFrame = document.getElementById("auditFrame");
  const openWebAppBtn = document.getElementById("openWebAppBtn");

  let currentTabUrl = "";

  const runAuditForUrl = (urlToAudit) => {
    if (!urlToAudit) return;
    const cleanUrl = urlToAudit.trim();
    if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
      const targetAuditUrl = `https://ujjawal-group-website-audit.vercel.app/?url=${encodeURIComponent(cleanUrl)}`;
      auditFrame.src = targetAuditUrl;
      if (openWebAppBtn) {
        openWebAppBtn.href = targetAuditUrl;
      }
      auditBtn.textContent = "⚡ Running 5-Pass WAEF Audit...";
      setTimeout(() => {
        auditBtn.textContent = "🚀 Audit Current Active Website Now";
      }, 3000);
    } else {
      activeUrlEl.textContent = cleanUrl || "Browser internal page";
      auditBtn.textContent = "⚠️ Invalid Website (Must be http/https)";
    }
  };

  const processTabs = (tabs) => {
    if (tabs && tabs.length > 0 && tabs[0]) {
      const foundUrl = tabs[0].url || tabs[0].pendingUrl;
      if (foundUrl && (foundUrl.startsWith("http://") || foundUrl.startsWith("https://"))) {
        currentTabUrl = foundUrl;
        activeUrlEl.textContent = currentTabUrl;
        // DIRECTLY FETCH & RUN AUDIT IMMEDIATELY ON POPUP OPENING
        runAuditForUrl(currentTabUrl);
        return true;
      }
    }
    return false;
  };

  // Query active tab across Chrome, Edge, and Firefox APIs
  if (typeof chrome !== "undefined" && chrome.tabs) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      if (!processTabs(tabs)) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabsFallback) => {
          if (!processTabs(tabsFallback)) {
            activeUrlEl.textContent = "No active website tab detected. Open a website tab to audit.";
          }
        });
      }
    });
  } else if (typeof browser !== "undefined" && browser.tabs) {
    browser.tabs.query({ active: true, lastFocusedWindow: true }).then((tabs) => {
      if (!processTabs(tabs)) {
        browser.tabs.query({ active: true, currentWindow: true }).then((tabsFallback) => {
          if (!processTabs(tabsFallback)) {
            activeUrlEl.textContent = "No active website tab detected. Open a website tab to audit.";
          }
        });
      }
    });
  } else {
    activeUrlEl.textContent = "Extension environment error.";
  }

  // 1-Click Manual Audit Refresh Button Click
  auditBtn.addEventListener("click", () => {
    if (currentTabUrl && (currentTabUrl.startsWith("http://") || currentTabUrl.startsWith("https://"))) {
      runAuditForUrl(currentTabUrl);
    } else {
      alert("Please navigate to a valid web page (http:// or https://) to run an empirical audit.");
    }
  });
});
