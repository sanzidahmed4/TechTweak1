"use client";

import { useState } from "react";
import { Filter, ExternalLink, Plus } from "lucide-react";

type BacklinkRow = {
  _id: string;
  target_url: string;
  source_url: string;
  domain: string;
  domain_authority: number;
  anchor_text: string;
  is_dofollow: boolean;
  status: string;
  price: number;
};

export default function AuthorityClient({ initialData }: { initialData: BacklinkRow[] }) {
  const [data] = useState<BacklinkRow[]>(initialData);
  const [activeFilter, setActiveFilter] = useState<"all" | "live" | "outreach" | "lost">("all");

  const filteredData = data.filter(item => {
    if (activeFilter === "live") return item.status === "Live";
    if (activeFilter === "outreach") return item.status === "Outreach_Sent" || item.status === "Negotiating";
    if (activeFilter === "lost") return item.status === "Lost" || item.status === "Rejected";
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Live": return <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-md">Live</span>;
      case "Outreach_Sent": return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-md">Outreach</span>;
      case "Negotiating": return <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-md">Negotiating</span>;
      case "Lost": return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-md">Lost</span>;
      case "Rejected": return <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md">Rejected</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Filter size={16} /> Filters
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setActiveFilter("all")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>All</button>
            <button onClick={() => setActiveFilter("live")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "live" ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}>Live Links</button>
            <button onClick={() => setActiveFilter("outreach")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "outreach" ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}>Active Outreach</button>
            <button onClick={() => setActiveFilter("lost")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "lost" ? "bg-red-500 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"}`}>Lost/Rejected</button>
          </div>
        </div>
        <button 
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90"
          onClick={() => alert("Add Campaign modal coming soon...")}
        >
          <Plus size={16} /> Log Campaign
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="py-3 px-4 font-semibold">Source Domain</th>
                <th className="py-3 px-4 font-semibold text-center">DA</th>
                <th className="py-3 px-4 font-semibold">Target / Anchor</th>
                <th className="py-3 px-4 font-semibold text-center">Type</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((row) => (
                <tr key={row._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 flex items-center gap-1">
                      {row.domain}
                      <a href={row.source_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary">
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-black ${row.domain_authority >= 70 ? 'text-emerald-500' : row.domain_authority >= 40 ? 'text-indigo-500' : 'text-slate-600'}`}>
                      {row.domain_authority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-[11px] font-mono text-slate-500 truncate max-w-xs" title={row.target_url}>
                      {row.target_url.replace("https://www.techtweak.tech", "")}
                    </div>
                    {row.anchor_text && (
                      <div className="text-xs font-semibold text-slate-800 mt-0.5">"{row.anchor_text}"</div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.is_dofollow 
                      ? <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Dofollow</span>
                      : <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Nofollow</span>
                    }
                  </td>
                  <td className="py-3 px-4 text-center">
                    {getStatusBadge(row.status)}
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No outreach campaigns found for this filter. Start building links!
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
