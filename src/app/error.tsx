"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2rem] p-8 text-center shadow-2xl border border-red-100">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={40} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">System Fault</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Our servers encountered an unexpected error while processing your request. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
          >
            <RefreshCw size={18} /> Retry
          </button>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 font-bold py-4 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Home size={18} /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}
