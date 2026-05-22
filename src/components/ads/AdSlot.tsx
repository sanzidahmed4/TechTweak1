"use client";

import { Info } from "lucide-react";

interface AdSlotProps {
  type?: "leaderboard" | "rectangle" | "skyscraper";
  className?: string;
  isAffiliate?: boolean;
}

export default function AdSlot({ type = "leaderboard", className = "", isAffiliate = false }: AdSlotProps) {
  // Production Note: Replace this placeholder div with <ins className="adsbygoogle" ... /> script 
  // when deploying to live domains.

  const sizes = {
    leaderboard: "w-full h-[90px] max-w-[728px]", // Standard 728x90
    rectangle: "w-[300px] h-[250px]", // Standard 300x250
    skyscraper: "w-[160px] h-[600px]", // Standard 160x600
  };

  return (
    <div className={`mx-auto bg-slate-50 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group ${sizes[type]} ${className}`}>
      <div className="absolute top-2 right-2 text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 z-10">
        <Info size={12} /> {isAffiliate ? "Sponsored" : "Advertisement"}
      </div>
      <div className="text-slate-300 font-bold uppercase tracking-widest text-sm opacity-50 group-hover:opacity-100 transition-opacity">
        Ad Space ({type})
      </div>
    </div>
  );
}
