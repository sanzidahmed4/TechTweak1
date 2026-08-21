"use client";

import { useState } from "react";
import { Filter, ArrowUpRight, ArrowDownRight, Target, RefreshCw } from "lucide-react";

type PerformanceRow = {
  _id: string;
  name: string;
  slug: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  lastSync: string | null;
};

export default function SearchPerformanceClient({ initialData }: { initialData: PerformanceRow[] }) {
  const [data, setData] = useState<PerformanceRow[]>(initialData);
  const [activeFilter, setActiveFilter] = useState<"all" | "winners" | "losers" | "low_hanging">("all");
  const [isSyncing, setIsSyncing] = useState(false);

  const filteredData = data.filter(item => {
    if (activeFilter === "winners") return item.position <= 5 && item.clicks > 100;
    if (activeFilter === "losers") return item.position >= 30; // Using raw pos drop approximation
    if (activeFilter === "low_hanging") return item.position >= 11 && item.position <= 20; // Page 2
    return true;
  });

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/seo/sync-gsc", { method: "POST" });
      if (res.ok) {
        alert("Search Console sync complete. Refreshing page...");
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
      alert("Failed to sync GSC data.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Filter size={16} /> Filters
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveFilter("all")} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>All Pages</button>
          <button onClick={() => setActiveFilter("winners")} className={`flex items-center gap-1 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "winners" ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}>
            <ArrowUpRight size={14} /> Winning
          </button>
          <button onClick={() => setActiveFilter("losers")} className={`flex items-center gap-1 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "losers" ? "bg-red-500 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"}`}>
            <ArrowDownRight size={14} /> Declining
          </button>
          <button onClick={() => setActiveFilter("low_hanging")} className={`flex items-center gap-1 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeFilter === "low_hanging" ? "bg-indigo-500 text-white" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"}`}>
            <Target size={14} /> Low-Hanging Fruit (Pg 2)
          </button>
        </div>
        <button 
          onClick={handleSync} 
          disabled={isSyncing}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50"
        >
          <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />
          {isSyncing ? "Syncing..." : "Sync GSC Data"}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="py-3 px-4 font-semibold">URL Entity</th>
                <th className="py-3 px-4 font-semibold text-right">Clicks</th>
                <th className="py-3 px-4 font-semibold text-right">Impressions</th>
                <th className="py-3 px-4 font-semibold text-right">CTR</th>
                <th className="py-3 px-4 font-semibold text-right">Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((row) => (
                <tr key={row._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-900">{row.name}</div>
                    <div className="text-[11px] text-slate-400">/phones/[brand]/{row.slug}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-slate-800">{row.clicks.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-medium text-slate-600">{row.impressions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-bold ${row.ctr > 5 ? 'text-emerald-500' : 'text-slate-600'}`}>{row.ctr}%</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold ${row.position <= 10 ? 'text-emerald-500' : row.position > 30 ? 'text-red-500' : 'text-amber-500'}`}>
                      {row.position}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No GSC data available for this filter. Run a Sync.
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
