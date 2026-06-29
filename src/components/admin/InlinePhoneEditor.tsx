"use client";

import { useState, useTransition } from "react";
import {
  Check, X, Battery, Cpu, Smartphone, Wifi, Camera, ShieldCheck,
  Info, Save, Image as ImageIcon, Plus, Trash2, Fingerprint
} from "lucide-react";
import ImageUploader from "./ImageUploader";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AutoTextarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      {...props}
      rows={1}
      className={`${props.className} overflow-hidden resize-none`}
      onInput={(e) => {
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
        if (props.onInput) props.onInput(e);
      }}
      onFocus={(e) => {
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
      }}
    />
  );
};

export default function InlinePhoneEditor({ initialData, brands, action, returnUrl }: any) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("overview");

  // State for arrays
  const [pros, setPros] = useState(initialData?.pros || []);
  const [cons, setCons] = useState(initialData?.cons || []);
  const [faqs, setFaqs] = useState(initialData?.faqs || []);
  
  // Custom Dynamic Specs
  const [customSpecs, setCustomSpecs] = useState<{category: string, label: string, value: string}[]>(initialData?.custom_specs || []);

  const addCustomSpec = (category: string) => {
    setCustomSpecs([...customSpecs, { category, label: "", value: "" }]);
  };

  const updateCustomSpec = (index: number, field: "label" | "value", newValue: string) => {
    const newSpecs = [...customSpecs];
    newSpecs[index][field] = newValue;
    setCustomSpecs(newSpecs);
  };

  const removeCustomSpec = (index: number) => {
    setCustomSpecs(customSpecs.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Add arrays to formData
    formData.append("pros", JSON.stringify(pros));
    formData.append("cons", JSON.stringify(cons));
    formData.append("faqs", JSON.stringify(faqs));
    
    // Filter out empty custom specs before submitting
    const validCustomSpecs = customSpecs.filter(s => s.label.trim() !== "");
    formData.append("custom_specs", JSON.stringify(validCustomSpecs));

    startTransition(async () => {
      await action(formData);
      if (returnUrl) {
        router.push(returnUrl);
      } else {
        router.push("/admin/phones");
      }
    });
  };

  const inputClass = "w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-primary focus:bg-white focus:ring-0 px-1 py-0.5 rounded transition-colors text-inherit font-inherit outline-none";
  const labelClass = "text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5";

  const brandName = brands.find((b: any) => b.id === initialData?.brand_id)?.name || "Select Brand";

  const renderCustomSpecs = (category: string) => {
    return customSpecs.map((spec, index) => {
      if (spec.category !== category) return null;
      return (
        <div key={`custom-${index}`} className="flex flex-col sm:flex-row p-4 text-sm bg-blue-50/30 hover:bg-blue-50/60 transition-colors border-l-2 border-blue-400 group relative">
          <div className="w-full sm:w-1/3 self-center pr-2">
            <input 
              value={spec.label} 
              onChange={(e) => updateCustomSpec(index, "label", e.target.value)} 
              className={inputClass + " font-bold text-slate-800 uppercase tracking-wider text-[11px] placeholder:text-slate-400"} 
              placeholder="Custom Label..." 
            />
          </div>
          <div className="w-full sm:w-2/3 mt-1.5 sm:mt-0 relative">
            <AutoTextarea 
              value={spec.value} 
              onChange={(e) => updateCustomSpec(index, "value", e.target.value)} 
              className={inputClass + " text-slate-600 font-semibold placeholder:text-slate-400"} 
              placeholder="Custom Value..." 
            />
            <button 
              type="button" 
              onClick={() => removeCustomSpec(index)} 
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 sm:group-hover:opacity-100 transition-all"
              title="Remove Custom Spec"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative bg-slate-50 min-h-screen pb-24">

      <div className="container mx-auto px-4 lg:px-8 pt-8">
        {/* Top Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
          
          {/* Gallery / Image Uploader (Takes 5/12) */}
          <div className="lg:col-span-5 relative bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 w-full text-center">Phone Media</h3>
             <div className="w-full">
               <ImageUploader 
                 name="images"
                 initialImages={initialData?.images || []}
                 folder={`tech_tweak/phones/${initialData?.slug || 'temp'}`}
               />
             </div>
          </div>

          {/* Basic Info Details (Takes 7/12) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <select name="brand_id" defaultValue={initialData?.brand_id} className="text-xs font-black tracking-widest text-primary uppercase bg-blue-50 px-3 py-1 rounded-full outline-none cursor-pointer appearance-none">
                  <option value="">Select Brand</option>
                  {brands.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                <select name="phone_status" defaultValue={initialData?.phone_status || "released"} className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider outline-none cursor-pointer appearance-none">
                  <option value="released">Released</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="rumored">Rumored</option>
                  <option value="draft">Draft</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <input 
                name="name" 
                defaultValue={initialData?.name} 
                placeholder="Phone Name..."
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tight leading-tight w-full bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-primary outline-none transition-colors"
                required
              />

              {/* Price Section */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 mt-4">
                <div className="flex-1 bg-green-50 border border-green-200 rounded-2xl px-4 py-3 relative group">
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">✅ Official Price (USD)</p>
                  <div className="flex items-center text-2xl font-black text-green-800">
                    $ <input name="price_usd" type="number" defaultValue={initialData?.price_usd} placeholder="0" className="bg-transparent border-none outline-none w-full ml-1" />
                  </div>
                </div>
                <div className="flex-1 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 relative group">
                  <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">⚠️ Unofficial Price</p>
                  <div className="flex items-center text-xl font-black text-amber-800">
                    $ <input name="price_unofficial" type="number" defaultValue={initialData?.price_unofficial} placeholder="0" className="bg-transparent border-none outline-none w-full ml-1" />
                  </div>
                </div>
              </div>

              {/* Quick features highlight grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/60 flex items-center gap-3 hover:border-blue-300 transition-colors">
                  <div className="hidden sm:flex w-10 h-10 rounded-xl bg-blue-50 text-blue-600 items-center justify-center flex-shrink-0">
                    <Cpu size={20} />
                  </div>
                  <div className="flex-1">
                    <p className={labelClass}>Processor</p>
                    <input name="chipset_highlight" defaultValue={initialData?.chipset_highlight} placeholder="Processor highlight..." className={inputClass + " font-bold text-slate-800 text-xs sm:text-sm"} />
                  </div>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/60 flex items-center gap-3 hover:border-purple-300 transition-colors">
                  <div className="hidden sm:flex w-10 h-10 rounded-xl bg-purple-50 text-purple-600 items-center justify-center flex-shrink-0">
                    <Camera size={20} />
                  </div>
                  <div className="flex-1">
                    <p className={labelClass}>Main Camera</p>
                    <input name="camera_highlight" defaultValue={initialData?.camera_highlight} placeholder="Camera highlight..." className={inputClass + " font-bold text-slate-800 text-xs sm:text-sm"} />
                  </div>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/60 flex items-center gap-3 hover:border-orange-300 transition-colors">
                  <div className="hidden sm:flex w-10 h-10 rounded-xl bg-orange-50 text-orange-600 items-center justify-center flex-shrink-0">
                    <Smartphone size={20} />
                  </div>
                  <div className="flex-1">
                    <p className={labelClass}>Display</p>
                    <input name="display_highlight" defaultValue={initialData?.display_highlight} placeholder="Display highlight..." className={inputClass + " font-bold text-slate-800 text-xs sm:text-sm"} />
                  </div>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/60 flex items-center gap-3 hover:border-green-300 transition-colors">
                  <div className="hidden sm:flex w-10 h-10 rounded-xl bg-green-50 text-green-600 items-center justify-center flex-shrink-0">
                    <Battery size={20} />
                  </div>
                  <div className="flex-1">
                    <p className={labelClass}>Battery</p>
                    <input name="battery_highlight" defaultValue={initialData?.battery_highlight} placeholder="Battery highlight..." className={inputClass + " font-bold text-slate-800 text-xs sm:text-sm"} />
                  </div>
                </div>
              </div>

              {/* Boolean Toggles for Connectivity/Features */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 mb-6 shadow-sm">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-primary" /> Key Features & Connectivity
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 gap-x-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="has_5g" defaultChecked={initialData?.has_5g} className="w-4 h-4 accent-green-600 cursor-pointer" />
                    <span className="text-xs font-bold text-slate-700">5G Supported</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="has_nfc" defaultChecked={initialData?.has_nfc} className="w-4 h-4 accent-green-600 cursor-pointer" />
                    <span className="text-xs font-bold text-slate-700">NFC Enabled</span>
                  </label>
                  
                  {/* Derived Features (Read-only visually similar to frontend) */}
                  <div className="flex items-center gap-2 opacity-80 cursor-help" title="Auto-detected from SIM Layout text">
                    {initialData?.sim_type?.toLowerCase().includes("esim") ? (
                      <Check className="text-green-600 bg-green-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                    ) : (
                      <X className="text-red-500 bg-red-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                    )}
                    <span className="text-xs font-bold text-slate-700">eSIM Support</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-80 cursor-help" title="Auto-detected from WLAN text">
                    {initialData?.wlan?.toLowerCase().includes("wi-fi 7") || initialData?.wlan?.toLowerCase().includes("wi-fi 6") || initialData?.wifi_version?.toLowerCase().includes("wi-fi 6") ? (
                      <Check className="text-green-600 bg-green-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                    ) : (
                      <X className="text-red-500 bg-red-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                    )}
                    <span className="text-xs font-bold text-slate-700">Wi-Fi 6/7 Ready</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-80 cursor-help" title="Auto-detected from Water Resistance text">
                    {(initialData?.water_resistance || initialData?.ip_rating) ? (
                      <Check className="text-green-600 bg-green-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                    ) : (
                      <X className="text-red-500 bg-red-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                    )}
                    <span className="text-xs font-bold text-slate-700">Water Resistant</span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="has_audio_jack" defaultChecked={initialData?.has_audio_jack} className="w-4 h-4 accent-green-600 cursor-pointer" />
                    <span className="text-xs font-bold text-slate-700">Headphone Jack</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Quick Info Grid */}
            <div className={`bg-white rounded-3xl border border-slate-200 p-5 grid grid-cols-2 md:grid-cols-5 gap-4 text-left md:text-center`}>
              <div>
                <span className={labelClass}>Colors (Comma separated)</span>
                <input name="colors" defaultValue={Array.isArray(initialData?.colors) ? initialData.colors.join(", ") : initialData?.colors} className={inputClass + " text-xs font-semibold text-slate-700 md:text-center"} placeholder="e.g. Black, White" />
              </div>
              <div>
                <span className={labelClass}>Water Rating (Auto)</span>
                <span className="text-xs font-semibold text-slate-500 md:text-center block mt-1 opacity-80 cursor-help" title="Auto-detected from Water Resistance field below">
                  {(initialData?.water_resistance || initialData?.ip_rating) ? (
                    (initialData?.water_resistance || initialData?.ip_rating).includes("IP68") ? "IP68 Certified" :
                    (initialData?.water_resistance || initialData?.ip_rating).includes("IP67") ? "IP67 Certified" :
                    (initialData?.water_resistance || initialData?.ip_rating).includes("IP54") ? "IP54 Splash-proof" :
                    (initialData?.water_resistance || initialData?.ip_rating).includes("IP53") ? "IP53 Splash-proof" :
                    (initialData?.water_resistance || initialData?.ip_rating).split(" — ")[0] || (initialData?.water_resistance || initialData?.ip_rating).split("-")[0] || (initialData?.water_resistance || initialData?.ip_rating)
                  ) : "N/A"}
                </span>
              </div>
              <div>
                <span className={labelClass}>Release Date</span>
                <input name="release_date" defaultValue={initialData?.release_date} className={inputClass + " text-xs font-semibold text-slate-700 md:text-center"} placeholder="e.g. Jan 2024" />
              </div>
              <div>
                <span className={labelClass}>OS Support</span>
                <input name="update_policy" defaultValue={initialData?.update_policy} className={inputClass + " text-xs font-semibold text-slate-700 md:text-center"} placeholder="e.g. 4 Years" />
              </div>
              <div>
                <span className={labelClass}>Made In</span>
                <input name="made_in" defaultValue={initialData?.made_in} className={inputClass + " text-xs font-semibold text-slate-700 md:text-center"} placeholder="e.g. China" />
              </div>
            </div>
          </div>
        </div>

        {/* DETAILED SPECS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start mt-8">
          <div className="lg:col-span-8 space-y-5 lg:space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-200">
                
                {/* General Info */}
                <div>
                  <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Info size={16} />
                      </div>
                      <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">General Information</h2>
                    </div>
                    <button type="button" onClick={() => addCustomSpec("General")} className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" title="Add Custom Spec">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {[
                      { label: "Phone Weight", name: "weight" },
                      { label: "Physical Dimensions", name: "dimensions" },
                      { label: "Build Material", name: "build_material" },
                      { label: "SIM Layout", name: "sim_type" },
                      { label: "Water & Dust Rating", name: "water_resistance" },
                      { label: "Phone Variants", name: "phone_variants" }
                    ].map((spec, i) => (
                      <div key={i} className="flex flex-col sm:flex-row p-4 text-sm hover:bg-slate-50/50 transition-colors">
                        <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">{spec.label}</div>
                        <div className="w-full sm:w-2/3 mt-1.5 sm:mt-0">
                          <AutoTextarea name={spec.name} defaultValue={initialData?.[spec.name]} className={inputClass + " text-slate-600 font-semibold"} placeholder={`Enter ${spec.label}...`} />
                        </div>
                      </div>
                    ))}
                    {renderCustomSpecs("General")}
                  </div>
                </div>

                {/* Display Details */}
                <div>
                  <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                        <Smartphone size={16} />
                      </div>
                      <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Display Specs</h2>
                    </div>
                    <button type="button" onClick={() => addCustomSpec("Display")} className="p-1.5 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors" title="Add Custom Spec">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {[
                      { label: "Display Architecture", name: "display_type" },
                      { label: "Screen Estate", name: "screen_size" },
                      { label: "Resolution Metric", name: "resolution" },
                      { label: "Refresh Rate", name: "refresh_rate" },
                      { label: "Peak Brightness", name: "brightness" },
                      { label: "HDR Technology", name: "hdr" },
                      { label: "Glass Protection", name: "protection" },
                      { label: "Pixel Density", name: "pixel_density" },
                    ].map((spec, i) => (
                      <div key={i} className="flex flex-col sm:flex-row p-4 text-sm hover:bg-slate-50/50 transition-colors">
                        <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">{spec.label}</div>
                        <div className="w-full sm:w-2/3 mt-1.5 sm:mt-0">
                          <AutoTextarea name={spec.name} defaultValue={initialData?.[spec.name]} className={inputClass + " text-slate-600 font-semibold"} placeholder={`Enter ${spec.label}...`} />
                        </div>
                      </div>
                    ))}
                    {renderCustomSpecs("Display")}
                  </div>
                </div>

                {/* Hardware & Performance */}
                <div>
                  <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Cpu size={16} />
                      </div>
                      <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Hardware & Performance</h2>
                    </div>
                    <button type="button" onClick={() => addCustomSpec("Hardware")} className="p-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors" title="Add Custom Spec">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {[
                      { label: "Processor (CPU)", name: "cpu" },
                      { label: "Graphics (GPU)", name: "gpu" },
                      { label: "Fabrication Process", name: "fabrication" },
                      { label: "RAM Capabilities", name: "ram_variants" },
                      { label: "Storage Capabilities", name: "storage_variants" },
                      { label: "Storage Tech", name: "storage_type" },
                      { label: "Cooling System", name: "cooling_system" },
                      { label: "AnTuTu Benchmark", name: "antutu_score", type: "number" },
                      { label: "Geekbench Score", name: "geekbench_score" },
                    ].map((spec, i) => (
                      <div key={i} className="flex flex-col sm:flex-row p-4 text-sm hover:bg-slate-50/50 transition-colors">
                        <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">{spec.label}</div>
                        <div className="w-full sm:w-2/3 mt-1.5 sm:mt-0">
                          {spec.type === "number" ? (
                            <input type="number" name={spec.name} defaultValue={initialData?.[spec.name]} className={inputClass + " text-slate-600 font-semibold"} placeholder={`Enter ${spec.label}...`} />
                          ) : (
                            <AutoTextarea name={spec.name} defaultValue={initialData?.[spec.name]} className={inputClass + " text-slate-600 font-semibold"} placeholder={`Enter ${spec.label}...`} />
                          )}
                        </div>
                      </div>
                    ))}
                    {renderCustomSpecs("Hardware")}
                  </div>
                </div>

                {/* Side-by-side Camera Cards */}
                <div id="camera" className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 border-t border-slate-100">

                  {/* Primary camera card */}
                  <div className="transition-colors hover:bg-slate-50/30 flex flex-col justify-between">
                    <div>
                      <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                            <Camera size={16} />
                          </div>
                          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Primary Camera System</h2>
                        </div>
                        <button type="button" onClick={() => addCustomSpec("Camera")} className="p-1.5 text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors" title="Add Custom Spec">
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="p-4 space-y-4">
                        {[
                          { label: "Total Cameras", name: "cam_count", isSelect: true },
                          { label: "Main Sensor", name: "cam_main_sensor" },
                          { label: "Ultrawide Lens", name: "cam_ultrawide" },
                          { label: "Telephoto Zoom", name: "cam_telephoto" },
                          { label: "Macro Capture", name: "cam_macro" },
                          { label: "Image Stabilization", name: "cam_ois" },
                          { label: "Camera Flash", name: "cam_flash" },
                          { label: "Video Recording", name: "cam_video" }
                        ].map((spec, i) => (
                          <div key={i} className="p-3 bg-slate-50/40 rounded-xl text-xs flex flex-col hover:bg-slate-100/50 transition-colors">
                            <span className="font-bold text-slate-500 uppercase tracking-wider mb-1 text-[10px]">{spec.label}</span>
                            {spec.isSelect ? (
                              <select name={spec.name} defaultValue={initialData?.[spec.name]} className={inputClass + " text-slate-700 font-semibold cursor-pointer appearance-none"}>
                                <option value="">Select Count</option>
                                <option value="Single">Single Camera</option>
                                <option value="Dual">Dual Cameras</option>
                                <option value="Triple">Triple Cameras</option>
                                <option value="Quad">Quad Cameras</option>
                                <option value="Penta">Penta Cameras</option>
                              </select>
                            ) : (
                              <AutoTextarea name={spec.name} defaultValue={initialData?.[spec.name]} className={inputClass + " text-slate-700 font-semibold"} placeholder={`Enter ${spec.label}...`} />
                            )}
                          </div>
                        ))}
                        {renderCustomSpecs("Camera")}
                      </div>
                    </div>
                  </div>

                  {/* Selfie camera card */}
                  <div className="transition-colors hover:bg-slate-50/30 flex flex-col justify-between">
                    <div>
                      <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Camera size={16} />
                          </div>
                          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Front Selfie Camera</h2>
                        </div>
                        <button type="button" onClick={() => addCustomSpec("Selfie")} className="p-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors" title="Add Custom Spec">
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="p-4 space-y-4">
                        {[
                          { label: "Front Resolution", name: "cam_front_resolution" },
                          { label: "Selfie HDR Mode", name: "cam_front_hdr" },
                          { label: "Portrait Features", name: "cam_front_portrait" },
                          { label: "Video Capabilities", name: "cam_front_video" }
                        ].map((spec, i) => (
                          <div key={i} className="p-3 bg-slate-50/40 rounded-xl text-xs flex flex-col hover:bg-slate-100/50 transition-colors">
                            <span className="font-bold text-slate-500 uppercase tracking-wider mb-1 text-[10px]">{spec.label}</span>
                            <AutoTextarea name={spec.name} defaultValue={initialData?.[spec.name]} className={inputClass + " text-slate-700 font-semibold"} placeholder={`Enter ${spec.label}...`} />
                          </div>
                        ))}
                        {renderCustomSpecs("Selfie")}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Battery & Charging */}
                <div>
                  <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                        <Battery size={16} />
                      </div>
                      <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Battery & Charging</h2>
                    </div>
                    <button type="button" onClick={() => addCustomSpec("Battery")} className="p-1.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors" title="Add Custom Spec">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {[
                      { label: "Total Capacity", name: "battery_capacity" },
                      { label: "Wired Charging", name: "charging_wired" },
                      { label: "Wireless Charging", name: "charging_wireless" },
                      { label: "Reverse Charging", name: "charging_reverse" },
                    ].map((spec, i) => (
                      <div key={i} className="flex flex-col sm:flex-row p-4 text-sm hover:bg-slate-50/50 transition-colors">
                        <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">{spec.label}</div>
                        <div className="w-full sm:w-2/3 mt-1.5 sm:mt-0">
                          <AutoTextarea name={spec.name} defaultValue={initialData?.[spec.name]} className={inputClass + " text-slate-600 font-semibold"} placeholder={`Enter ${spec.label}...`} />
                        </div>
                      </div>
                    ))}
                    {renderCustomSpecs("Battery")}
                  </div>
                </div>

                {/* Connectivity */}
                <div>
                  <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                        <Wifi size={16} />
                      </div>
                      <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Connectivity & Comm</h2>
                    </div>
                    <button type="button" onClick={() => addCustomSpec("Connectivity")} className="p-1.5 text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors" title="Add Custom Spec">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {[
                      { label: "WLAN", name: "wlan" },
                      { label: "Bluetooth", name: "bluetooth" },
                      { label: "Positioning (GPS)", name: "positioning" },
                      { label: "NFC", name: "nfc" },
                      { label: "Radio", name: "radio" },
                      { label: "USB", name: "usb" },
                    ].map((spec, i) => (
                      <div key={i} className="flex flex-col sm:flex-row p-4 text-sm hover:bg-slate-50/50 transition-colors">
                        <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">{spec.label}</div>
                        <div className="w-full sm:w-2/3 mt-1.5 sm:mt-0">
                          <AutoTextarea name={spec.name} defaultValue={initialData?.[spec.name]} className={inputClass + " text-slate-600 font-semibold"} placeholder={`Enter ${spec.label}...`} />
                        </div>
                      </div>
                    ))}
                    {renderCustomSpecs("Connectivity")}
                  </div>
                </div>

                {/* Sensors */}
                <div>
                  <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                        <Fingerprint size={16} />
                      </div>
                      <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Sensors & Security</h2>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    <div className="flex flex-col sm:flex-row p-4 text-sm hover:bg-slate-50/50 transition-colors">
                      <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">Fingerprint</div>
                      <div className="w-full sm:w-2/3 mt-1.5 sm:mt-0">
                        <AutoTextarea name="sensor_fingerprint" defaultValue={initialData?.sensor_fingerprint} className={inputClass + " text-slate-600 font-semibold"} placeholder="Under display, optical..." />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-6">
                        {[
                          { label: "Gyroscope", name: "has_gyroscope" },
                          { label: "Compass", name: "has_compass" },
                          { label: "Accelerometer", name: "has_accelerometer" },
                          { label: "Face Unlock", name: "has_face_unlock" },
                          { label: "IR Blaster", name: "has_ir_blaster" }
                        ].map((sensor, i) => (
                          <label key={i} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name={sensor.name} defaultChecked={initialData?.[sensor.name]} className="w-4 h-4 accent-blue-600 rounded cursor-pointer" />
                            <span className="text-sm font-bold text-slate-700">{sensor.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Software & AI */}
                <div>
                  <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Cpu size={16} />
                      </div>
                      <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Software & AI</h2>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    <div className="flex flex-col sm:flex-row p-4 text-sm hover:bg-slate-50/50 transition-colors">
                      <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">Update Policy</div>
                      <div className="w-full sm:w-2/3 mt-1.5 sm:mt-0">
                        <AutoTextarea name="update_policy" defaultValue={initialData?.update_policy} className={inputClass + " text-slate-600 font-semibold"} placeholder="3 Years OS..." />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-6">
                        {[
                          { label: "Circle to Search", name: "has_circle_to_search" },
                          { label: "AI Editing", name: "has_ai_editing" },
                          { label: "Live Translation", name: "has_live_translation" },
                          { label: "AI Assistant", name: "has_ai_assistant" }
                        ].map((ai, i) => (
                          <label key={i} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name={ai.name} defaultChecked={initialData?.[ai.name]} className="w-4 h-4 accent-blue-600 rounded cursor-pointer" />
                            <span className="text-sm font-bold text-slate-700">{ai.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Pros and Cons Edit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2"><Check className="text-green-500" /> Pros</h3>
                <div className="space-y-2">
                  {pros.map((pro: any, index: number) => (
                    <div key={index} className="flex gap-2">
                      <input value={pro.text} onChange={(e) => {
                        const newPros = [...pros];
                        newPros[index].text = e.target.value;
                        setPros(newPros);
                      }} className={inputClass + " flex-1 bg-slate-50 border-slate-200"} placeholder="Enter pro..." />
                      <button type="button" onClick={() => setPros(pros.filter((_: any, i: number) => i !== index))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setPros([...pros, { text: "" }])} className="w-full py-2 flex items-center justify-center gap-2 text-sm font-bold text-slate-500 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <Plus size={16} /> Add Pro
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2"><X className="text-red-500" /> Cons</h3>
                <div className="space-y-2">
                  {cons.map((con: any, index: number) => (
                    <div key={index} className="flex gap-2">
                      <input value={con.text} onChange={(e) => {
                        const newCons = [...cons];
                        newCons[index].text = e.target.value;
                        setCons(newCons);
                      }} className={inputClass + " flex-1 bg-slate-50 border-slate-200"} placeholder="Enter con..." />
                      <button type="button" onClick={() => setCons(cons.filter((_: any, i: number) => i !== index))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setCons([...cons, { text: "" }])} className="w-full py-2 flex items-center justify-center gap-2 text-sm font-bold text-slate-500 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <Plus size={16} /> Add Con
                  </button>
                </div>
              </div>
            </div>

            {/* FAQs Edit */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-4">FAQs</h3>
              <div className="space-y-4">
                {faqs.map((faq: any, index: number) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-2xl relative group">
                    <input value={faq.question} onChange={(e) => {
                      const newFaqs = [...faqs];
                      newFaqs[index].question = e.target.value;
                      setFaqs(newFaqs);
                    }} className={inputClass + " font-bold mb-2"} placeholder="Question..." />
                    <textarea value={faq.answer} onChange={(e) => {
                      const newFaqs = [...faqs];
                      newFaqs[index].answer = e.target.value;
                      setFaqs(newFaqs);
                    }} className={inputClass + " resize-y min-h-[60px]"} placeholder="Answer..." />
                    <button type="button" onClick={() => setFaqs(faqs.filter((_: any, i: number) => i !== index))} className="absolute top-4 right-4 p-2 text-red-500 bg-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                  </div>
                ))}
                <button type="button" onClick={() => setFaqs([...faqs, { question: "", answer: "" }])} className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <Plus size={16} /> Add FAQ
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar (SEO & Backend Settings) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                ⚙️ Backend & SEO
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Custom Slug</label>
                  <input name="slug" defaultValue={initialData?.slug} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors" placeholder="Auto-generated if empty" />
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Meta Title</label>
                  <input name="meta_title" defaultValue={initialData?.meta_title} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors" placeholder="SEO Title" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Meta Description</label>
                  <textarea name="meta_description" defaultValue={initialData?.meta_description} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors min-h-[80px]" placeholder="SEO Description" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Meta Keywords</label>
                  <input name="meta_keywords" defaultValue={initialData?.meta_keywords} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors" placeholder="Comma separated keywords" />
                </div>
                
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="is_published" defaultChecked={initialData?.is_published !== false} className="w-4 h-4 accent-blue-600 rounded cursor-pointer" />
                    <span className="text-sm font-bold text-slate-700">Publish Listing</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="is_featured" defaultChecked={initialData?.is_featured} className="w-4 h-4 accent-blue-600 rounded cursor-pointer" />
                    <span className="text-sm font-bold text-slate-700">Featured (Hot)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="is_official" defaultChecked={initialData?.is_official !== false} className="w-4 h-4 accent-blue-600 rounded cursor-pointer" />
                    <span className="text-sm font-bold text-slate-700">Official Release</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FLOATING BOTTOM RIGHT SAVE BUTTON */}
      <button 
        type="submit" 
        disabled={isPending} 
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transition-all disabled:opacity-70 hover:scale-105 active:scale-95 group"
        title="Save Changes"
      >
        {isPending ? (
          <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Save size={28} className="group-hover:scale-110 transition-transform" />
        )}
      </button>
    </form>
  );
}
