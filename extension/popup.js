// Ujjawal Groups Extension Popup Controller
document.addEventListener("DOMContentLoaded", () => {
  const activeUrlEl = document.getElementById("activeUrl");
  const auditBtn = document.getElementById("auditBtn");
  const auditFrame = document.getElementById("auditFrame");

  let currentTabUrl = "https://ujjawal-group-website-audit.vercel.app/";

  // Query active tab URL across Edge, Firefox, and Chrome APIs
  if (typeof chrome !== "undefined" && chrome.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0] && tabs[0].url) {
        currentTabUrl = tabs[0].url;
        activeUrlEl.textContent = currentTabUrl;
      } else {
        activeUrlEl.textContent = "https://ujjawal-group-website-audit.vercel.app/";
      }
    });
  } else if (typeof browser !== "undefined" && browser.tabs) {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs && tabs[0] && tabs[0].url) {
        currentTabUrl = tabs[0].url;
        activeUrlEl.textContent = currentTabUrl;
      }
    });
  } else {
    activeUrlEl.textContent = "https://ujjawal-group-website-audit.vercel.app/";
  }

  // 1-Click Audit Button Click
  auditBtn.addEventListener("click", () => {
    if (currentTabUrl && currentTabUrl.startsWith("http")) {
      const targetAuditUrl = `https://ujjawal-group-website-audit.vercel.app/?url=${encodeURIComponent(currentTabUrl)}`;
      auditFrame.src = targetAuditUrl;
      auditBtn.textContent = "⚡ Running 5-Pass WAEF Audit...";
      setTimeout(() => {
        auditBtn.textContent = "🚀 Audit Current Active Website Now";
      }, 3000);
    } else {
      alert("Please navigate to a valid web page (http:// or https://) to run an empirical audit.");
    }
  });
});
