"use client";

import { login } from "./actions";
import { Lock, Mail, ShieldCheck, Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-primary/10 p-2 rounded-xl text-primary">
              <ShieldCheck size={28} />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">Tech<span className="text-primary">Tweak</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Portal</h1>
          <p className="text-slate-500 text-sm">Sign in to manage the TechTweak platform.</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  required 
                  type="email" 
                  name="email"
                  placeholder="Enter your email" 
                  className="w-full py-3 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Password</label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  placeholder="••••••••" 
                  className="w-full py-3 pl-11 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-600 text-white font-medium py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isLoading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          &copy; {new Date().getFullYear()} TechTweak Platform. Secure Area.
        </p>
      </div>
    </div>
  );
}
