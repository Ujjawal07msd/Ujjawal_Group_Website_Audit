import React, { useState } from "react";
import { X, Lock, Mail, User, ArrowRight, ShieldCheck, CheckCircle, Sparkles } from "lucide-react";

export function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: fullName || "Ujjawal Sharma",
        email: email || "user@ujjawalgroups.com",
        role: "Pro Auditor"
      };
      onLoginSuccess(user);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-3">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-black text-white font-heading">
            {isSignUp ? "Create Ujjawal Groups Account" : "Sign In to Website Audit AI"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isSignUp ? "Access pro 5-pass audit features & unlimited PDF exports" : "Enter your credentials to manage saved website audits"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 mb-6 font-mono text-xs">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 font-bold rounded-lg transition-all ${
              !isSignUp ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 font-bold rounded-lg transition-all ${
              isSignUp ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "text-slate-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isSignUp && (
            <div>
              <label className="block font-bold text-slate-300 mb-1 font-mono uppercase">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ujjawal Sharma"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-300 mb-1 font-mono uppercase">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@ujjawalgroups.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1 font-mono uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all mt-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {isSignUp ? "Create Free Account" : "Sign In to Account"}
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </button>
        </form>

        <div className="mt-5 text-center text-[11px] text-slate-500">
          Protected by Ujjawal Groups SSL &bull; WAEF v2.0 Enterprise Security
        </div>
      </div>
    </div>
  );
}
