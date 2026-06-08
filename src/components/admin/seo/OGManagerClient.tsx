"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Image as ImageIcon, Search, Share2, MessageSquare, Upload, Check, AlertCircle } from "lucide-react";
import { updateBulkKeywords } from "@/app/actions/seo";

type PhoneRow = {
  _id: string;
  name: string;
  slug: string;
  og_image: string;
  fallback_image: string;
  meta_title: string;
  meta_description: string;
  seo_status: string;
  updated_at: string;
};

export default function OGManagerClient({ initialData }: { initialData: PhoneRow[] }) {
  const [data, setData] = useState<PhoneRow[]>(initialData);
  const [filter, setFilter] = useState<"all" | "missing">("all");
  const [previewMode, setPreviewMode] = useState<"google" | "facebook" | "twitter">("facebook");
  const [savingId, setSavingId] = useState<string | null>(null);

  const filteredData = data.filter(item => {
    if (filter === "missing") return !item.og_image;
    return true;
  });

  const handleCloudinarySuccess = async (id: string, result: any) => {
    if (result?.info?.secure_url) {
      setSavingId(id);
      try {
        // Save to backend via fetch API since we don't have a specific bulk-update for single fields 
        // For now we will rely on a new server action to handle the bulk save of OG images
        await updateBulkKeywords([{ _id: id, og_image: result.info.secure_url }]);
        
        // Update local state instantly to reflect the uploaded image
        setData((prev) => prev.map(p => p._id === id ? { ...p, og_image: result.info.secure_url } : p));
      } catch (e) {
        console.error(e);
      } finally {
        setSavingId(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            All Pages ({data.length})
          </button>
          <button 
            onClick={() => setFilter("missing")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "missing" ? "bg-red-500 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"}`}
          >
            Missing OG Images ({data.filter(d => !d.og_image).length})
          </button>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setPreviewMode("google")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${previewMode === "google" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Search size={16} /> Google
          </button>
          <button 
            onClick={() => setPreviewMode("facebook")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${previewMode === "facebook" ? "bg-[#1877F2] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Share2 size={16} /> Facebook
          </button>
          <button 
            onClick={() => setPreviewMode("twitter")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${previewMode === "twitter" ? "bg-black text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <MessageSquare size={16} /> X (Twitter)
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredData.map(item => {
          const displayImage = item.og_image || item.fallback_image;
          const displayTitle = item.meta_title || `${item.name} Price, Specs, Review | TechTweak`;
          const displayDesc = item.meta_description || `Full specifications, features, and price for the ${item.name}.`;

          return (
            <div key={item._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              
              {/* Preview Container */}
              <div className="bg-slate-100 p-4 border-b border-slate-200 flex items-center justify-center min-h-[280px]">
                {previewMode === "facebook" && (
                  <div className="w-full max-w-[500px] bg-white border border-slate-200 overflow-hidden text-left shadow-sm">
                    <div className="w-full aspect-[1.91/1] bg-slate-200 relative">
                      {displayImage ? (
                        <img src={displayImage.replace('/upload/', '/upload/w_1200,h_630,c_pad,b_white/')} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                          <ImageIcon size={48} className="mb-2 opacity-50" />
                          <span className="text-sm font-medium">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-[#f2f3f5]">
                      <div className="text-[12px] text-slate-500 uppercase tracking-wide mb-1">TECHTWEAK.TECH</div>
                      <div className="text-[16px] font-semibold text-slate-900 leading-tight line-clamp-1">{displayTitle}</div>
                      <div className="text-[14px] text-slate-500 line-clamp-1 mt-1">{displayDesc}</div>
                    </div>
                  </div>
                )}
                {/* ... other previews ... */}
                {previewMode === "twitter" && (
                  <div className="w-full max-w-[500px] bg-white border border-slate-200 rounded-2xl overflow-hidden text-left shadow-sm">
                    <div className="w-full aspect-[1.91/1] bg-slate-200 relative border-b border-slate-200">
                      {displayImage ? (
                         <img src={displayImage.replace('/upload/', '/upload/w_1200,h_630,c_pad,b_white/')} alt="" className="w-full h-full object-cover" />
                      ) : (
                         <div className="absolute inset-0 flex items-center justify-center text-slate-400"><ImageIcon size={48} className="opacity-50" /></div>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="text-[15px] text-slate-500 mb-0.5">techtweak.tech</div>
                      <div className="text-[15px] font-medium text-slate-900 line-clamp-1">{displayTitle}</div>
                      <div className="text-[15px] text-slate-500 line-clamp-1 mt-0.5">{displayDesc}</div>
                    </div>
                  </div>
                )}
                {previewMode === "google" && (
                  <div className="w-full bg-white p-4 text-left font-sans">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center"><ImageIcon size={14}/></div>
                      <div>
                        <div className="text-[14px] text-slate-900 leading-tight">TechTweak</div>
                        <div className="text-[12px] text-slate-500 leading-tight">https://www.techtweak.tech &gt; phones &gt; {item.slug}</div>
                      </div>
                    </div>
                    <div className="text-[20px] text-[#1a0dab] font-medium hover:underline cursor-pointer line-clamp-1 leading-snug mb-1">{displayTitle}</div>
                    <div className="text-[14px] text-[#4d5156] line-clamp-2 leading-snug">{displayDesc}</div>
                  </div>
                )}
              </div>

              {/* Status & Upload */}
              <div className="p-4 flex items-center justify-between mt-auto">
                <div>
                  <h3 className="font-bold text-slate-900 truncate w-48" title={item.name}>{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {!item.og_image ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                        <AlertCircle size={12} /> Missing Custom OG
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        <Check size={12} /> Custom OG Set
                      </span>
                    )}
                  </div>
                </div>

                <CldUploadWidget 
                  uploadPreset="techtweak_preset"
                  signatureEndpoint="/api/cloudinary/sign"
                  onSuccess={(res) => handleCloudinarySuccess(item._id, res)}
                >
                  {({ open }) => {
                    return (
                      <button 
                        onClick={(e) => { e.preventDefault(); open(); }}
                        disabled={savingId === item._id}
                        className="btn-primary py-1.5 px-3 text-sm flex items-center gap-2"
                      >
                        {savingId === item._id ? "Saving..." : <><Upload size={14} /> Upload</>}
                      </button>
                    );
                  }}
                </CldUploadWidget>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
