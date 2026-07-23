// Ujjawal Groups Website Audit AI Extension Background Service Worker
console.log("Ujjawal Groups Website Audit Extension background service worker active.");

if (typeof chrome !== "undefined" && chrome.runtime) {
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Ujjawal Groups Website Audit AI Extension installed successfully.");
  });
}
