"use client";

import { useState } from "react";
import { updateBulkKeywords } from "@/app/actions/seo";
import { Save, AlertCircle, Check, Loader2 } from "lucide-react";

type PhoneRow = {
  _id: string;
  name: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  primary_keyword: string;
  canonical_url: string;
  seo_status: string;
};

export default function KeywordManagerClient({ initialData }: { initialData: PhoneRow[] }) {
  const [data, setData] = useState<PhoneRow[]>(initialData);
  const [editedIds, setEditedIds] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleEdit = (id: string, field: keyof PhoneRow, value: string) => {
    setData((prev) =>
      prev.map((row) => (row._id === id ? { ...row, [field]: value } : row))
    );
    setEditedIds((prev) => new Set(prev).add(id));
  };

  const handleSave = async () => {
    if (editedIds.size === 0) return;
    setIsSaving(true);
    setMessage(null);

    const updates = data
      .filter((row) => editedIds.has(row._id))
      .map((row) => ({
        _id: row._id,
        meta_title: row.meta_title,
        meta_description: row.meta_description,
        primary_keyword: row.primary_keyword,
        canonical_url: row.canonical_url,
      }));

    const result = await updateBulkKeywords(updates);

    if (result.success) {
      setMessage({ type: "success", text: `Successfully updated ${editedIds.size} records.` });
      setEditedIds(new Set());
    } else {
      setMessage({ type: "error", text: result.error || "Failed to update." });
    }
    
    setIsSaving(false);
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Bulk Keyword Editor</h2>
          <p className="text-sm text-slate-500">Unsaved changes: {editedIds.size}</p>
        </div>
        <div className="flex items-center gap-4">
          {message && (
            <span className={`text-sm flex items-center gap-1 ${message.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
              {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
              {message.text}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={editedIds.size === 0 || isSaving}
            className="btn-primary flex items-center gap-2"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save {editedIds.size > 0 && `(${editedIds.size})`}
          </button>
        </div>
      </div>

      {/* Spreadsheet View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="py-3 px-4 font-semibold w-48">Phone</th>
              <th className="py-3 px-4 font-semibold">Primary Keyword</th>
              <th className="py-3 px-4 font-semibold">Meta Title (Max 60)</th>
              <th className="py-3 px-4 font-semibold">Meta Description (Max 160)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row) => {
              const isEdited = editedIds.has(row._id);
              return (
                <tr key={row._id} className={`${isEdited ? 'bg-amber-50/30' : 'hover:bg-slate-50'}`}>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-900 truncate w-40" title={row.name}>{row.name}</div>
                    <div className="text-[11px] text-slate-400 truncate w-40">{row.slug}</div>
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="text"
                      className="w-full bg-transparent border border-transparent hover:border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary rounded px-2 py-1.5 transition-colors outline-none"
                      value={row.primary_keyword || ""}
                      onChange={(e) => handleEdit(row._id, "primary_keyword", e.target.value)}
                      placeholder="e.g. samsung s24 price bd"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <div className="relative group">
                      <input
                        type="text"
                        className={`w-full bg-transparent border border-transparent hover:border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary rounded px-2 py-1.5 transition-colors outline-none ${
                          (row.meta_title?.length || 0) > 60 ? 'text-red-600' : ''
                        }`}
                        value={row.meta_title || ""}
                        onChange={(e) => handleEdit(row._id, "meta_title", e.target.value)}
                        placeholder="Page Title..."
                      />
                      <span className={`absolute right-2 top-1.5 text-[10px] ${(row.meta_title?.length || 0) > 60 ? 'text-red-500 font-bold' : 'text-slate-300'} opacity-0 group-focus-within:opacity-100`}>
                        {row.meta_title?.length || 0}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-2 min-w-[300px]">
                    <div className="relative group">
                      <textarea
                        className={`w-full bg-transparent border border-transparent hover:border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary rounded px-2 py-1.5 transition-colors outline-none resize-none h-10 ${
                          (row.meta_description?.length || 0) > 160 ? 'text-red-600' : ''
                        }`}
                        value={row.meta_description || ""}
                        onChange={(e) => handleEdit(row._id, "meta_description", e.target.value)}
                        placeholder="Description..."
                      />
                      <span className={`absolute right-2 bottom-1 text-[10px] ${(row.meta_description?.length || 0) > 160 ? 'text-red-500 font-bold' : 'text-slate-300'} opacity-0 group-focus-within:opacity-100`}>
                        {row.meta_description?.length || 0}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
