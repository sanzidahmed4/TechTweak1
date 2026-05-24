"use client";

import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
          <Mail className="text-blue-400" size={24} />
        </div>
        
        <h3 className="text-xl font-bold mb-2 tracking-tight">Stay Updated</h3>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Get the latest smartphone news, reviews, and leaks delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={status === "loading" || status === "success"}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
              required
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="absolute right-1.5 top-1.5 bottom-1.5 bg-primary hover:bg-blue-600 text-white rounded-lg px-3 flex items-center justify-center transition-colors disabled:opacity-50"
            >
              {status === "loading" ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <ArrowRight size={16} />
              )}
            </button>
          </div>
          
          {status === "success" && (
            <p className="text-xs text-emerald-400 font-medium animate-pulse">
              ✓ Successfully subscribed!
            </p>
          )}
          {status === "error" && (
            <p className="text-xs text-rose-400 font-medium">
              Something went wrong. Try again.
            </p>
          )}
        </form>
        <p className="text-[10px] text-slate-400 mt-4 text-center">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
