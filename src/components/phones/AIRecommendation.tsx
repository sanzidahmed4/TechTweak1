"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Gamepad2, Camera, Battery, Wallet, ChevronRight, Zap, Search } from "lucide-react";
import type { PhoneData } from "./PhonesClientPage";
import PhoneAdvisorModal from "./PhoneAdvisorModal";

const CATEGORIES = [
  {
    key: "gaming",
    label: "Gaming",
    icon: Gamepad2,
    description: "High AnTuTu, 120Hz+, big battery",
    color: "from-red-500 to-purple-600",
    glow: "shadow-red-500/20",
    hoverBg: "group-hover:bg-red-50",
    activeBg: "bg-red-50 border-red-200",
    iconColor: "text-red-500",
    filter: (p: PhoneData) => (p.antutu_score || 0) > 500000 || (p.processor || "").toLowerCase().includes("snapdragon"),
  },
  {
    key: "camera",
    label: "Camera",
    icon: Camera,
    description: "50MP+ multi-lens, OIS, 8K video",
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/20",
    hoverBg: "group-hover:bg-blue-50",
    activeBg: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-500",
    filter: (p: PhoneData) => parseInt((p.camera_main || "0").replace(/\D/g, "") || "0") >= 50,
  },
  {
    key: "battery",
    label: "Battery",
    icon: Battery,
    description: "5000mAh+, 65W+ fast charging",
    color: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/20",
    hoverBg: "group-hover:bg-emerald-50",
    activeBg: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-500",
    filter: (p: PhoneData) => parseInt((p.battery || "0").replace(/\D/g, "") || "0") >= 5000,
  },
  {
    key: "budget",
    label: "Budget",
    icon: Wallet,
    description: "Best value under $300",
    color: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/20",
    hoverBg: "group-hover:bg-amber-50",
    activeBg: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-500",
    filter: (p: PhoneData) => (p.price_usd || 9999999) < 300,
  },
];


interface Props {
  phones: PhoneData[];
}

export default function AIRecommendation({ phones }: Props) {
  const [activeCategory, setActiveCategory] = useState("gaming");
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const cat = CATEGORIES.find((c) => c.key === activeCategory)!;

  // Filter real phones or fall back to demo
  const filtered = phones
    .filter(cat.filter)
    .slice(0, 3)
    .map((p) => ({
      name: p.name,
      tag: p.processor?.split(" ").slice(0, 3).join(" ") || cat.label,
      price: p.price_usd ? `$${p.price_usd.toLocaleString()}` : "N/A",
      slug: `/phones/${p.brand.slug}/${p.slug}`,
      brand: p.brand.slug,
    }));

  const displayPhones = filtered;
  if (displayPhones.length === 0) return null;

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden border-b border-white/10">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]" />
        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"
            style={{
              top: `${15 + i * 14}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container max-w-4xl mx-auto px-4 lg:px-8 relative z-10">
          {/* Title & Action */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] text-blue-400 font-semibold uppercase tracking-widest">Powered by AI</p>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    AI Recommended For You
                  </h2>
                </div>
              </div>
              <p className="text-blue-300/60 text-sm ml-[52px]">
                Smart picks based on your usage profile
              </p>
            </div>

            {/* Trigger Button for Quiz */}
            <button 
              onClick={() => setIsQuizOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all shrink-0 group"
            >
              <Search size={18} className="text-blue-600 group-hover:animate-pulse" />
              Find My Perfect Phone
            </button>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-8 w-full">
            {CATEGORIES.map((c) => {
              const isActive = activeCategory === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setActiveCategory(c.key)}
                  className={`flex items-center justify-center px-1 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-sm font-bold transition-all duration-300 border ${
                    isActive
                      ? `bg-gradient-to-r ${c.color} text-white border-transparent shadow-lg ${c.glow}`
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Recommended Phones */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {displayPhones.map((phone, i) => (
              <Link
                key={i}
                href={phone.slug}
                className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-4 transition-all duration-300"
              >
                {/* Rank */}
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shrink-0 shadow-md`}>
                  <span className="text-white text-xs font-black">#{i + 1}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm line-clamp-1">{phone.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-blue-400 font-medium">{phone.tag}</span>
                    <span className="text-[11px] text-emerald-400 font-bold">{phone.price}</span>
                  </div>
                </div>

                <ChevronRight size={14} className="text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>

          {/* Description */}
          <div className="mt-6 flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
            <Zap size={16} className="text-blue-400 shrink-0" />
            <p className="text-sm text-blue-200/70">
              <span className="font-semibold text-white">Why these?</span>{" "}
              {cat.description}. Updated daily based on market trends.
            </p>
          </div>
        </div>

      <PhoneAdvisorModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </section>
  );
}
