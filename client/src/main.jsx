import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Caught Exception:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", backgroundColor: "#070a12", color: "#f8fafc", padding: "40px 24px", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#0f172a", border: "1px solid #dc2626", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
            <h2 style={{ fontSize: "20px", color: "#ef4444", fontWeight: "800", marginBottom: "12px" }}>Application Render Error</h2>
            <p style={{ fontSize: "13px", color: "#cbd5e1", marginBottom: "20px" }}>
              An unexpected runtime error occurred while mounting Website Audit AI.
            </p>
            <div style={{ padding: "12px", backgroundColor: "#1e1b4b", borderRadius: "8px", color: "#fca5a5", fontSize: "11px", fontFamily: "monospace", textAlign: "left", wordBreak: "break-all", marginBottom: "20px" }}>
              {this.state.error && this.state.error.toString()}
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: "10px 20px", backgroundColor: "#2563eb", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
      <Analytics />
    </ErrorBoundary>
  </React.StrictMode>
);
