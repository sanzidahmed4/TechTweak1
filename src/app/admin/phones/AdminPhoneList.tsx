"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Eye, EyeOff, Folder, FolderOpen, Smartphone } from "lucide-react";
import DeletePhoneButton from "./DeletePhoneButton";
import { getSeriesName } from "@/lib/utils/series";

export default function AdminPhoneList({ phones, returnUrl }: { phones: any[], returnUrl: string }) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (series: string) => {
    setOpenFolders(prev => ({ ...prev, [series]: !prev[series] }));
  };

  // Group by series
  const groupedPhones: Record<string, any[]> = {};
  phones.forEach(phone => {
    const series = getSeriesName(phone.name, phone.brands?.name);
    if (!groupedPhones[series]) groupedPhones[series] = [];
    groupedPhones[series].push(phone);
  });

  const seriesList = Object.entries(groupedPhones).sort((a, b) => a[0].localeCompare(b[0]));

  if (phones.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500">
        No phones found matching your criteria.
      </div>
    );
  }

  return (
    <div className="w-full">
      {seriesList.map(([series, seriesPhones]) => {
        const isOpen = openFolders[series] || false;
        
        return (
          <div key={series} className="border-b border-slate-200 last:border-b-0">
            {/* Folder Header */}
            <div 
              className={`flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors ${isOpen ? 'bg-slate-50 border-b border-slate-100' : ''}`}
              onClick={() => toggleFolder(series)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  {isOpen ? <FolderOpen size={20} /> : <Folder size={20} />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">{series}</h3>
                  <p className="text-xs text-slate-500">{seriesPhones.length} device{seriesPhones.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            {/* Folder Contents (Table) */}
            {isOpen && (
              <div className="bg-white overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest border-b border-slate-200">
                      <th className="p-4 w-12 text-center">#</th>
                      <th className="p-4 font-bold">Device Model</th>
                      <th className="p-4 font-bold">Brand</th>
                      <th className="p-4 font-bold">Price (USD)</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {seriesPhones.map((phone, idx) => (
                      <tr key={phone.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="p-4 text-center text-slate-400 text-sm font-medium">
                          {idx + 1}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 border border-slate-200">
                              <Smartphone size={14} />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">{phone.name}</div>
                              <div className="text-xs text-slate-500 font-mono mt-0.5">/{phone.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-semibold text-slate-700">
                          <span className="bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">{phone.brands?.name}</span>
                        </td>
                        <td className="p-4 text-sm font-bold text-slate-900">
                          {phone.price_usd ? `$${phone.price_usd.toLocaleString()}` : <span className="text-slate-400 font-normal">N/A</span>}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            {phone.is_published ? (
                              <span className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 text-xs font-bold rounded-full">
                                <Eye size={12} strokeWidth={3} /> Published
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1 text-xs font-bold rounded-full border border-slate-200">
                                <EyeOff size={12} /> Draft
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link 
                              href={`/admin/phones/${phone.id}/edit?returnUrl=${encodeURIComponent(returnUrl)}`}
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm"
                              title="Edit Phone"
                            >
                              <Edit size={16} />
                            </Link>
                            <DeletePhoneButton id={phone.id} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
