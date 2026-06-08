"use client";

import { useState } from "react";
import { Filter, CheckCircle2, XCircle, AlertTriangle, Search } from "lucide-react";
import Link from "next/link";

type TechRow = {
  _id: string;
  name: string;
  slug: string;
  readiness: number;
  hasCanonical: boolean;
  hasOgImage: boolean;
  contentMissing: boolean;
  isNoIndex: boolean;
  isOrphan: boolean;
};

export default function TechnicalMonitorClient({ initialData }: { initialData: TechRow[] }) {
  const [data] = useState<TechRow[]>(initialData);
  const [activeFilter, setActiveFilter] = useState<"all" | "low_readiness" | "noindex" | "missing_canonical" | "orphan" | "missing_content">("all");

  const filteredData = data.filter(item => {
    if (activeFilter === "low_readiness") return item.readiness < 100;
    if (activeFilter === "noindex") return item.isNoIndex;
    if (activeFilter === "missing_canonical") return !item.hasCanonical;
    if (activeFilter === "orphan") return item.isOrphan;
    if (activeFilter === "missing_content") return item.contentMissing;
    return true;
  });

  const renderCheck = (condition: boolean, warningIfTrue: boolean = false) => {
    if (warningIfTrue) {
      return condition 
        ? <XCircle size={16} className="text-red-500 mx-auto" />
        : <CheckCircle2 size={16} className="text-emerald-500 mx-auto" />;
    } else {
      return condition 
        ? <CheckCircle2 size={16} className="text-emerald-500 mx-auto" />
        : <XCircle size={16} className="text-red-500 mx-auto" />;
    }
  };

  const criticalIssuesCount = data.filter(i => i.isNoIndex || i.isOrphan || i.contentMissing || !i.hasCanonical).length;

  return (
    <div className="space-y-6">
      
      {/* Top Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{criticalIssuesCount}</h3>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pages with Critical Issues</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{data.filter(i => i.readiness === 100).length} / {data.length}</h3>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">100% Ready Pages</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Search size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">4 / 4</h3>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sitemaps Active</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-700">
          <Filter size={16} /> Filters
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveFilter("all")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>All Pages</button>
          <button onClick={() => setActiveFilter("low_readiness")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "low_readiness" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-600 hover:bg-amber-100"}`}>Not 100% Ready</button>
          <button onClick={() => setActiveFilter("noindex")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "noindex" ? "bg-red-500 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"}`}>NoIndex Applied</button>
          <button onClick={() => setActiveFilter("missing_canonical")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "missing_canonical" ? "bg-red-500 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"}`}>Missing Canonical</button>
          <button onClick={() => setActiveFilter("orphan")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "orphan" ? "bg-red-500 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"}`}>Orphan Pages</button>
          <button onClick={() => setActiveFilter("missing_content")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "missing_content" ? "bg-red-500 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"}`}>Missing Content</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="py-3 px-4 font-semibold">Entity</th>
                <th className="py-3 px-4 font-semibold text-center">Readiness</th>
                <th className="py-3 px-4 font-semibold text-center">Indexable?</th>
                <th className="py-3 px-4 font-semibold text-center">Canonical</th>
                <th className="py-3 px-4 font-semibold text-center">Has Content</th>
                <th className="py-3 px-4 font-semibold text-right">Fix</th>
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
                    <span className={`font-bold ${row.readiness < 100 ? 'text-amber-500' : 'text-emerald-500'}`}>{row.readiness}%</span>
                  </td>
                  <td className="py-3 px-4 text-center">{renderCheck(row.isNoIndex, true)}</td>
                  <td className="py-3 px-4 text-center">{renderCheck(row.hasCanonical, false)}</td>
                  <td className="py-3 px-4 text-center">{renderCheck(!row.contentMissing, false)}</td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/admin/phones/edit/${row._id}#seo`} className="text-xs bg-slate-900 text-white hover:bg-primary px-3 py-1.5 rounded-md font-medium transition-colors inline-block">
                      Resolve
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Excellent! No issues found for this filter.
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
