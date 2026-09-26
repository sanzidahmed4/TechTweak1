"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, LayoutDashboard } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Page Error:", error);
  }, [error]);

  return (
    <div className="py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-lg border border-red-100">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Unable to Load Admin Section</h2>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          {error.message || "An unexpected error occurred while loading this administrative view."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white font-medium py-3 px-4 rounded-xl hover:bg-slate-800 transition-colors text-sm shadow-md"
          >
            <RefreshCw size={16} /> Try Again
          </button>
          <Link
            href="/admin"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-medium py-3 px-4 rounded-xl hover:bg-slate-200 transition-colors text-sm"
          >
            <LayoutDashboard size={16} /> Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
