"use client";

import { useState } from "react";
import { 
  Smartphone, Image as ImageIcon, Zap, Info, Tv, Cpu, Camera, 
  Battery, Wifi, Activity, Terminal, Search, Save 
} from "lucide-react";
import ImageUploader from "./ImageUploader";
import Link from "next/link";

interface BrandItem {
  id: string;
  name: string;
}

interface PhoneFormProps {
  initialData?: any /* eslint-disable-line @typescript-eslint/no-explicit-any */;
  brands: BrandItem[];
  action: (formData: FormData) => Promise<void>;
  title: string;
  description: string;
  returnUrl?: string;
}

export default function PhoneForm({ initialData, brands, action, title, description, returnUrl }: PhoneFormProps) {
  const [phoneName, setPhoneName] = useState(initialData?.name || "");
  const [phoneSlug, setPhoneSlug] = useState(initialData?.slug || "");

  const slugifiedName = (phoneSlug || phoneName || "temp-phone")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const uploadFolder = `tech_tweak/phones/${slugifiedName}`;

  const sections = [
    {
      title: "1. BASIC INFORMATION",
      icon: Smartphone,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {returnUrl && <input type="hidden" name="returnUrl" value={returnUrl} />}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Phone Name <span className="text-red-500">*</span></label>
            <input required type="text" name="name" value={phoneName} onChange={(e) => setPhoneName(e.target.value)} placeholder="e.g. Galaxy S24 Ultra" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Brand <span className="text-red-500">*</span></label>
            <select required name="brand_id" defaultValue={initialData?.brand_id} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
              <option value="">Select Brand</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Custom Slug (Optional)</label>
            <input type="text" name="slug" value={phoneSlug} onChange={(e) => setPhoneSlug(e.target.value)} placeholder="e.g. galaxy-s24-ultra" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
            <p className="text-xs text-slate-500">Leave blank to auto-generate from name.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Phone Status <span className="text-red-500">*</span></label>
            <select required name="phone_status" defaultValue={initialData?.phone_status || "released"} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
              <option value="released">Released</option>
              <option value="upcoming">Upcoming</option>
              <option value="rumored">Rumored</option>
              <option value="draft">Draft</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Leak Confidence (For unreleased)</label>
            <select name="leak_confidence" defaultValue={initialData?.leak_confidence || ""} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
              <option value="">Select Confidence</option>
              <option value="low">Low (Rumor)</option>
              <option value="moderate">Moderate (Leaks)</option>
              <option value="high">High (Reliable Leaks)</option>
              <option value="officially_confirmed">Officially Confirmed</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Official Price (USD) <span className="text-xs font-normal text-green-600">✅ Authorized</span></label>
            <input type="number" name="price_usd" defaultValue={initialData?.price_usd ?? (initialData?.price_official ? Math.round(initialData.price_official / 120) : '')} placeholder="e.g. 1000" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
            <p className="text-xs text-slate-500">Official / authorized dealer price in USD.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Price Status</label>
            <select name="price_status" defaultValue={initialData?.price_status || "official"} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
              <option value="official">Official</option>
              <option value="expected">Expected</option>
              <option value="rumored">Rumored</option>
              <option value="unannounced">Unannounced</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Unofficial Price (USD) <span className="text-xs font-normal text-orange-500">⚠️ Grey Market</span></label>
            <input type="number" name="price_unofficial" defaultValue={initialData?.price_unofficial ? Math.round(initialData.price_unofficial / 120) : ''} placeholder="e.g. 850" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
            <p className="text-xs text-slate-500">Unofficial / grey market price in USD.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Release Date (String)</label>
            <input type="text" name="release_date" defaultValue={initialData?.release_date || ""} placeholder="e.g. May 2023" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Expected Launch Date</label>
            <input type="text" name="expected_launch_date" defaultValue={initialData?.expected_launch_date || ""} placeholder="e.g. March 15, 2027" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Launch Quarter</label>
            <input type="text" name="launch_quarter" defaultValue={initialData?.launch_quarter || ""} placeholder="e.g. Q1 2027" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Launch Year</label>
            <input type="number" name="launch_year" defaultValue={initialData?.launch_year || ""} placeholder="e.g. 2027" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Colors (Comma separated)</label>
            <input type="text" name="colors" defaultValue={Array.isArray(initialData?.colors) ? initialData.colors.join(", ") : initialData?.colors || ""} placeholder="Titanium Gray, Titanium Black" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Model Number</label>
            <input type="text" name="model_number" defaultValue={initialData?.model_number} placeholder="SM-S928B" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Phone Variants</label>
            <input type="text" name="phone_variants" defaultValue={initialData?.phone_variants} placeholder="e.g. 8GB/128GB, 12GB/256GB" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Made In</label>
            <input type="text" name="made_in" defaultValue={initialData?.made_in} placeholder="e.g. Vietnam, India, China" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="flex flex-wrap gap-6 pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="is_published" defaultChecked={initialData ? initialData.is_published : true} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">Publish Listing</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="is_featured" defaultChecked={initialData?.is_featured} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">Featured (Hot)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="upcoming" defaultChecked={initialData?.upcoming} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">Mark as Upcoming</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="is_official" defaultChecked={initialData ? initialData.is_official : true} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">Official Release</span>
            </label>
          </div>
        </div>
      )
    },
    {
      title: "2. QUICK HIGHLIGHTS",
      icon: Zap,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Processor Highlight</label>
            <input type="text" name="chipset_highlight" defaultValue={initialData?.chipset_highlight} placeholder="e.g. Snapdragon 8 Gen 3" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Main Camera Highlight</label>
            <input type="text" name="camera_highlight" defaultValue={initialData?.camera_highlight} placeholder="e.g. 200MP Quad Camera" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Display Highlight</label>
            <input type="text" name="display_highlight" defaultValue={initialData?.display_highlight} placeholder="e.g. 6.8 inch 120Hz Dynamic AMOLED" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Battery Highlight</label>
            <input type="text" name="battery_highlight" defaultValue={initialData?.battery_highlight} placeholder="e.g. 5000 mAh, 45W Charging" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Benchmark Highlight</label>
            <input type="text" name="benchmark_highlight" defaultValue={initialData?.benchmark_highlight} placeholder="e.g. 2.1M+ AnTuTu v10" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
        </div>
      )
    },
    {
      title: "3. GENERAL INFORMATION",
      icon: Info,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Weight</label>
            <input type="text" name="weight" defaultValue={initialData?.weight} placeholder="e.g. 232 g (8.18 oz)" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Dimensions</label>
            <input type="text" name="dimensions" defaultValue={initialData?.dimensions} placeholder="e.g. 162.3 x 79 x 8.6 mm" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Build Material</label>
            <input type="text" name="build_material" defaultValue={initialData?.build_material} placeholder="e.g. Glass front/back, titanium frame" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">SIM Type</label>
            <input type="text" name="sim_type" defaultValue={initialData?.sim_type} placeholder="e.g. Nano-SIM and eSIM" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Water Resistance</label>
            <input type="text" name="water_resistance" defaultValue={initialData?.water_resistance} placeholder="e.g. IP68 dust/water resistant (up to 1.5m for 30 min)" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
        </div>
      )
    },
    {
      title: "4. DISPLAY SPECIFICATION",
      icon: Tv,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Display Type</label>
            <input type="text" name="display_type" defaultValue={initialData?.display_type} placeholder="e.g. Dynamic LTPO AMOLED 2X" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Screen Size</label>
            <input type="text" name="screen_size" defaultValue={initialData?.screen_size} placeholder="e.g. 6.8 inches" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Resolution</label>
            <input type="text" name="resolution" defaultValue={initialData?.resolution} placeholder="e.g. 1440 x 3120 pixels" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Refresh Rate</label>
            <input type="text" name="refresh_rate" defaultValue={initialData?.refresh_rate} placeholder="e.g. 120Hz" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Brightness</label>
            <input type="text" name="brightness" defaultValue={initialData?.brightness} placeholder="e.g. 2600 nits (peak)" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">HDR Support</label>
            <input type="text" name="hdr" defaultValue={initialData?.hdr} placeholder="e.g. HDR10+" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Glass Protection</label>
            <input type="text" name="protection" defaultValue={initialData?.protection} placeholder="e.g. Corning Gorilla Armor" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Pixel Density</label>
            <input type="text" name="pixel_density" defaultValue={initialData?.pixel_density} placeholder="e.g. 505 ppi" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
        </div>
      )
    },
    {
      title: "5. PERFORMANCE SPECIFICATION",
      icon: Cpu,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">CPU</label>
            <input type="text" name="cpu" defaultValue={initialData?.cpu} placeholder="e.g. Octa-core (1x3.39GHz + 3x3.1GHz + 2x2.9GHz + 2x2.2GHz)" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">GPU</label>
            <input type="text" name="gpu" defaultValue={initialData?.gpu} placeholder="e.g. Adreno 750 (1 GHz)" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Fabrication Process</label>
            <input type="text" name="fabrication" defaultValue={initialData?.fabrication} placeholder="e.g. 4 nm" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">RAM Variants</label>
            <input type="text" name="ram_variants" defaultValue={initialData?.ram_variants} placeholder="e.g. 12GB, 16GB LPDDR5X" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Storage Variants</label>
            <input type="text" name="storage_variants" defaultValue={initialData?.storage_variants} placeholder="e.g. 256GB, 512GB, 1TB" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Storage Type</label>
            <input type="text" name="storage_type" defaultValue={initialData?.storage_type} placeholder="e.g. UFS 4.0" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">AnTuTu Score (Numerical)</label>
            <input type="number" name="antutu_score" defaultValue={initialData?.antutu_score} placeholder="e.g. 2100000" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Geekbench Score (Single / Multi)</label>
            <input type="text" name="geekbench_score" defaultValue={initialData?.geekbench_score} placeholder="e.g. 2300 / 7200" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Cooling System Details</label>
            <input type="text" name="cooling_system" defaultValue={initialData?.cooling_system} placeholder="e.g. Vapor chamber cooling system" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
        </div>
      )
    },
    {
      title: "6. CAMERA SPECIFICATION",
      icon: Camera,
      content: (
        <div className="space-y-6">
          <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-4 tracking-wide border-b pb-2">PRIMARY CAMERA (REAR)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-slate-500">Total Cameras</label>
                <select name="cam_count" defaultValue={initialData?.cam_count} className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                  <option value="">Select Count</option>
                  <option value="Single">Single Camera</option>
                  <option value="Dual">Dual Cameras</option>
                  <option value="Triple">Triple Cameras</option>
                  <option value="Quad">Quad Cameras</option>
                  <option value="Penta">Penta Cameras</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Main Sensor</label>
                <input type="text" name="cam_main_sensor" defaultValue={initialData?.cam_main_sensor} placeholder="e.g. 200 MP, f/1.7, 24mm (wide), OIS" className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Ultrawide Sensor</label>
                <input type="text" name="cam_ultrawide" defaultValue={initialData?.cam_ultrawide} placeholder="e.g. 12 MP, f/2.2, 13mm, 120˚" className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Telephoto / Periscope</label>
                <input type="text" name="cam_telephoto" defaultValue={initialData?.cam_telephoto} placeholder="e.g. 50 MP, f/3.4, 5x zoom, OIS" className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Macro / Depth Sensor</label>
                <input type="text" name="cam_macro" defaultValue={initialData?.cam_macro} placeholder="e.g. 10 MP, f/2.4 (telephoto), 3x zoom" className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Optical Image Stabilization (OIS)</label>
                <input type="text" name="cam_ois" defaultValue={initialData?.cam_ois} placeholder="e.g. Dual OIS support" className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Flash & Extras</label>
                <input type="text" name="cam_flash" defaultValue={initialData?.cam_flash} placeholder="e.g. LED flash, auto-HDR, panorama" className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-slate-500">Video Recording Capability</label>
                <input type="text" name="cam_video" defaultValue={initialData?.cam_video} placeholder="e.g. 8K@24/30fps, 4K@30/60/120fps, HDR10+" className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-4 tracking-wide border-b pb-2">FRONT CAMERA (SELFIE)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Resolution</label>
                <input type="text" name="cam_front_resolution" defaultValue={initialData?.cam_front_resolution} placeholder="e.g. 12 MP, f/2.2, 26mm (wide)" className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">HDR Features</label>
                <input type="text" name="cam_front_hdr" defaultValue={initialData?.cam_front_hdr} placeholder="e.g. Dual video call, Auto-HDR, HDR10+" className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Portrait Features</label>
                <input type="text" name="cam_front_portrait" defaultValue={initialData?.cam_front_portrait} placeholder="e.g. Smart HDR, Portrait Lighting" className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Video Recording</label>
                <input type="text" name="cam_front_video" defaultValue={initialData?.cam_front_video} placeholder="e.g. 4K@30/60fps, 1080p@30fps" className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "7. BATTERY & CHARGING",
      icon: Battery,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Battery Capacity</label>
            <input type="text" name="battery_capacity" defaultValue={initialData?.battery_capacity} placeholder="e.g. 5000 mAh" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Wired Charging Speed</label>
            <input type="text" name="charging_wired" defaultValue={initialData?.charging_wired} placeholder="e.g. 45W wired, PD3.0, 65% in 30 min" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Wireless Charging Speed</label>
            <input type="text" name="charging_wireless" defaultValue={initialData?.charging_wireless} placeholder="e.g. 15W wireless (Qi/PMA)" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Reverse Charging</label>
            <input type="text" name="charging_reverse" defaultValue={initialData?.charging_reverse} placeholder="e.g. 4.5W reverse wireless" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">USB Type</label>
            <input type="text" name="usb_type" defaultValue={initialData?.usb_type} placeholder="e.g. USB Type-C 3.2" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="charger_included" defaultChecked={initialData ? initialData.charger_included : true} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">Charger In Box</span>
            </label>
          </div>
        </div>
      )
    },
    {
      title: "8. NETWORK & CONNECTIVITY",
      icon: Wifi,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">WiFi Support</label>
            <input type="text" name="wifi_version" defaultValue={initialData?.wifi_version} placeholder="e.g. Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Bluetooth Version</label>
            <input type="text" name="bluetooth_version" defaultValue={initialData?.bluetooth_version} placeholder="e.g. 5.3, A2DP, LE" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">GPS Specifications</label>
            <input type="text" name="gps_specs" defaultValue={initialData?.gps_specs} placeholder="e.g. GPS, GLONASS, BDS, GALILEO, QZSS" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">USB Version</label>
            <input type="text" name="usb_version" defaultValue={initialData?.usb_version} placeholder="e.g. USB Type-C 3.2 Gen 2, OTG, DisplayPort" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="flex flex-wrap gap-6 pt-4 md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="has_5g" defaultChecked={initialData?.has_5g} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">5G Network Support</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="has_nfc" defaultChecked={initialData?.has_nfc} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">NFC Support</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="has_ir_blaster" defaultChecked={initialData?.has_ir_blaster} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">IR Blaster</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="has_audio_jack" defaultChecked={initialData?.has_audio_jack} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">3.5mm Headphone Jack</span>
            </label>
          </div>
        </div>
      )
    },
    {
      title: "9. SENSORS",
      icon: Activity,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Fingerprint Sensor Location</label>
            <input type="text" name="sensor_fingerprint" defaultValue={initialData?.sensor_fingerprint} placeholder="e.g. Under-display (ultrasonic)" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="flex flex-wrap gap-6 pt-8 md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="has_gyroscope" defaultChecked={initialData ? initialData.has_gyroscope : true} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">Gyroscope</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="has_compass" defaultChecked={initialData ? initialData.has_compass : true} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">Compass / Magnetometer</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="has_accelerometer" defaultChecked={initialData ? initialData.has_accelerometer : true} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">Accelerometer</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="has_face_unlock" defaultChecked={initialData?.has_face_unlock} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">Secure Face Unlock</span>
            </label>
          </div>
        </div>
      )
    },
    {
      title: "10. SOFTWARE & AI FEATURES",
      icon: Terminal,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Android/iOS Version</label>
            <input type="text" name="android_version" defaultValue={initialData?.android_version} placeholder="e.g. Android 15" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">UI Skin Version</label>
            <input type="text" name="ui_version" defaultValue={initialData?.ui_version} placeholder="e.g. One UI 7.0" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">OS Update Policy</label>
            <input type="text" name="update_policy" defaultValue={initialData?.update_policy} placeholder="e.g. 7 Major OS Updates, 7 Years Security" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">AI Capabilities (Comma separated)</label>
            <input type="text" name="ai_features" defaultValue={Array.isArray(initialData?.ai_features) ? initialData.ai_features.join(", ") : initialData?.ai_features || ""} placeholder="Circle to Search, Live Translate, Photo Assist" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="flex flex-wrap gap-6 pt-4 md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="has_circle_to_search" defaultChecked={initialData?.has_circle_to_search} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">Circle to Search</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="has_ai_editing" defaultChecked={initialData?.has_ai_editing} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">Generative AI Image Editing</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="has_live_translation" defaultChecked={initialData?.has_live_translation} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">Realtime Live Translation</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="has_ai_assistant" defaultChecked={initialData?.has_ai_assistant} className="w-5 h-5 accent-primary rounded cursor-pointer" />
              <span className="text-sm font-semibold text-slate-700">Next-Gen AI Assistant</span>
            </label>
          </div>
        </div>
      )
    },

    {
      title: "11. SEO SETTINGS",
      icon: Search,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">SEO Custom Title</label>
            <input type="text" name="meta_title" defaultValue={initialData?.meta_title} placeholder="e.g. Samsung Galaxy S24 Ultra - Full Specifications & Price" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">OpenGraph Image (CDN URL)</label>
            <input type="text" name="og_image" defaultValue={initialData?.og_image} placeholder="https://cdn..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">SEO Keywords (Comma separated)</label>
            <input type="text" name="meta_keywords" defaultValue={initialData?.meta_keywords} placeholder="s24 ultra specs, galaxy s24 ultra price, samsung phone specs" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">SEO Meta Description</label>
            <textarea rows={3} name="meta_description" defaultValue={initialData?.meta_description} placeholder="Explore the full features, detailed specifications, benchmark scores, camera setup, and price of Samsung Galaxy S24 Ultra." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" />
          </div>
        </div>
      )
    },
    {
      title: "12. PHONE IMAGES",
      icon: ImageIcon,
      content: (
        <div className="space-y-2">
          <ImageUploader name="images" initialImages={initialData?.images || []} folder={uploadFolder} />
        </div>
      )
    }
  ];

  return (
    <div className="pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/phones" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-primary transition-colors">
          <Smartphone size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          <p className="text-slate-500">{description}</p>
        </div>
      </div>

      <form action={action} className="space-y-6">
        {/* Accordions */}
        <div className="space-y-4">
          {sections.map((section, idx) => {
            const Icon = section.icon;

            return (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="w-full px-6 py-5 flex items-center justify-between bg-slate-50/50 transition-colors border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-primary shadow-sm">
                      <Icon size={18} />
                    </div>
                    <span className="font-bold text-slate-800 tracking-wide text-sm">{section.title}</span>
                  </div>
                </div>

                <div className="p-6 md:p-8 bg-white">
                  {section.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-6">
          <button 
            type="submit"
            className="bg-primary text-white font-semibold px-10 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:bg-primary/95 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <Save size={20} />
            Save Smartphone Specs
          </button>
        </div>
      </form>
    </div>
  );
}
