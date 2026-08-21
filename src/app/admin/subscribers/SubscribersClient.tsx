"use client";

import { useState } from "react";
import { Download, Search, Trash2, Mail, Calendar, UserCheck } from "lucide-react";

interface SubscriberItem {
  _id: string;
  email: string;
  status: string;
  source: string;
  created_at: string;
}

export default function SubscribersClient({ initialSubscribers }: { initialSubscribers: SubscriberItem[] }) {
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>(initialSubscribers);
  const [search, setSearch] = useState("");

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const exportToCSV = () => {
    if (subscribers.length === 0) {
      alert("No subscribers to export!");
      return;
    }

    const headers = "Email,Status,Source,Date Subscribed\n";
    const rows = subscribers
      .map(
        (s) =>
          `"${s.email}","${s.status}","${s.source}","${new Date(s.created_at).toLocaleDateString()}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `techtweak_subscribers_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800"
          />
        </div>

        <button
          onClick={exportToCSV}
          className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Download size={16} />
          Export to CSV ({subscribers.length})
        </button>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center text-slate-400">
          <Mail size={40} className="mx-auto mb-3 text-slate-300" />
          <p className="text-base font-semibold text-slate-700">No subscribers found</p>
          <p className="text-xs text-slate-400 mt-1">
            {search ? "Try searching for another keyword" : "Subscribers will appear here when visitors join your newsletter."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Subscriber Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Subscribed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((item, idx) => (
                <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 text-slate-400 text-xs">{idx + 1}</td>
                  <td className="px-6 py-4 text-slate-900 font-semibold flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-primary flex items-center justify-center shrink-0">
                      <Mail size={14} />
                    </div>
                    <span>{item.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs capitalize">
                    {item.source.replace("_", " ")}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {new Date(item.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
