"use client";

import { useState } from "react";
import { Filter, CheckCircle2, XCircle, FileEdit, Sparkles } from "lucide-react";
import Link from "next/link";

type ContentRow = {
  _id: string;
  name: string;
  slug: string;
  content_status: string;
  seo_score: number;
  hasOverview: boolean;
  hasVerdict: boolean;
  hasProsCons: boolean;
  hasFaqs: boolean;
};

export default function ContentManagerClient({ initialData }: { initialData: ContentRow[] }) {
  const [data] = useState<ContentRow[]>(initialData);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredData = data.filter(item => {
    if (activeFilter === "missing_overview") return !item.hasOverview;
    if (activeFilter === "missing_verdict") return !item.hasVerdict;
    if (activeFilter === "missing_faqs") return !item.hasFaqs;
    if (activeFilter === "missing_pros_cons") return !item.hasProsCons;
    if (activeFilter === "status_missing") return item.content_status === "Missing";
    if (activeFilter === "status_draft") return item.content_status === "Draft";
    if (activeFilter === "status_published") return item.content_status === "Published";
    return true;
  });

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Published": return <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">Published</span>;
      case "Draft": return <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">Draft</span>;
      default: return <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-xs font-bold">Missing</span>;
    }
  };

  const renderCheck = (hasFeature: boolean) => {
    return hasFeature 
      ? <CheckCircle2 size={16} className="text-emerald-500 mx-auto" /> 
      : <XCircle size={16} className="text-slate-300 mx-auto" />;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-700">
          <Filter size={16} /> Filters
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveFilter("all")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeFilter === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>All Pages</button>
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
          <button onClick={() => setActiveFilter("status_missing")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeFilter === "status_missing" ? "bg-red-500 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"}`}>Status: Missing</button>
          <button onClick={() => setActiveFilter("status_draft")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeFilter === "status_draft" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-600 hover:bg-amber-100"}`}>Status: Draft</button>
          <button onClick={() => setActiveFilter("status_published")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeFilter === "status_published" ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}>Status: Published</button>
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
          <button onClick={() => setActiveFilter("missing_overview")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeFilter === "missing_overview" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>Missing Overview</button>
          <button onClick={() => setActiveFilter("missing_verdict")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeFilter === "missing_verdict" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>Missing Verdict</button>
          <button onClick={() => setActiveFilter("missing_pros_cons")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeFilter === "missing_pros_cons" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>Missing Pros/Cons</button>
          <button onClick={() => setActiveFilter("missing_faqs")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeFilter === "missing_faqs" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>Missing FAQs</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="py-3 px-4 font-semibold">Phone</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-center">Overview</th>
                <th className="py-3 px-4 font-semibold text-center">Pros/Cons</th>
                <th className="py-3 px-4 font-semibold text-center">Verdict</th>
                <th className="py-3 px-4 font-semibold text-center">FAQs</th>
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
                  <td className="py-3 px-4 text-center">{renderStatusBadge(row.content_status)}</td>
                  <td className="py-3 px-4 text-center">{renderCheck(row.hasOverview)}</td>
                  <td className="py-3 px-4 text-center">{renderCheck(row.hasProsCons)}</td>
                  <td className="py-3 px-4 text-center">{renderCheck(row.hasVerdict)}</td>
                  <td className="py-3 px-4 text-center">{renderCheck(row.hasFaqs)}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-2 py-1 rounded flex items-center gap-1 font-medium transition-colors">
                        <Sparkles size={12} /> AI Draft
                      </button>
                      <Link href={`/admin/phones/edit/${row._id}`} className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 px-2 py-1 rounded flex items-center gap-1 font-medium transition-colors">
                        <FileEdit size={12} /> Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
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
