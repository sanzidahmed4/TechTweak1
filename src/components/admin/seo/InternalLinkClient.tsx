"use client";

import { useState } from "react";
import { Filter, AlertTriangle, Link as LinkIcon, ShieldAlert, ShieldCheck } from "lucide-react";
import Link from "next/link";

type LinkRow = {
  _id: string;
  name: string;
  slug: string;
  count: number;
  score: number;
};

export default function InternalLinkClient({ initialData }: { initialData: LinkRow[] }) {
  const [activeFilter, setActiveFilter] = useState<"all" | "orphan" | "weak" | "strong">("orphan");

  const filteredData = initialData.filter(item => {
    if (activeFilter === "orphan") return item.count === 0;
    if (activeFilter === "weak") return item.count > 0 && item.count < 3;
    if (activeFilter === "strong") return item.count >= 3;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-700">
          <Filter size={16} /> Filters
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveFilter("all")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>All Pages</button>
          <button onClick={() => setActiveFilter("orphan")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "orphan" ? "bg-red-500 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"}`}>Orphans</button>
          <button onClick={() => setActiveFilter("weak")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "weak" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-600 hover:bg-amber-100"}`}>Weak</button>
          <button onClick={() => setActiveFilter("strong")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "strong" ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}>Strong</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="py-3 px-4 font-semibold">Entity Name</th>
                <th className="py-3 px-4 font-semibold text-center">Incoming Links</th>
                <th className="py-3 px-4 font-semibold text-center">Link Score (0-100)</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((row) => (
                <tr key={row._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-900">{row.name}</div>
                    <div className="text-[11px] text-slate-400">/phones/[brand]/{row.slug}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-bold text-slate-700">{row.count}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="w-full bg-slate-100 rounded-full h-2.5 max-w-[100px] mx-auto overflow-hidden">
                      <div className={`h-2.5 rounded-full ${row.score >= 80 ? 'bg-emerald-500' : row.score >= 50 ? 'bg-amber-400' : 'bg-red-500'}`} style={{ width: `${row.score}%` }}></div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.count === 0 ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded"><AlertTriangle size={12}/> Orphan</span>
                    ) : row.count < 3 ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded"><ShieldAlert size={12}/> Weak</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded"><ShieldCheck size={12}/> Strong</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/admin/seo/internal-links/build?target=${row._id}`} className="text-xs bg-slate-900 text-white hover:bg-primary px-3 py-1.5 rounded-md flex items-center gap-1 font-medium transition-colors inline-flex">
                      <LinkIcon size={12} /> Build Links
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No results found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
