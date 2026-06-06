"use client";

import { useState } from "react";
import Link from "next/link";

interface Props {
  brands: { id: string; name: string; slug: string; logo_url: string | null; count: number }[];
  activeBrands: string[];
  onBrandClick: (slug: string) => void;
}

export default function BrandGrid({ brands, activeBrands, onBrandClick }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayBrands = isExpanded ? brands : brands.slice(0, 10);

  return (
    <section className="bg-white border-b border-slate-100 py-6">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Top Brands</h2>
          {brands.length > 10 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isExpanded ? "Show Less ↑" : "View All →"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-4">
          {displayBrands.map((brand) => {
            const isActive = activeBrands.includes(brand.slug);

            return (
              <button
                key={brand.id}
                onClick={() => onBrandClick(brand.slug)}
                className={`group flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 shadow-md shadow-blue-500/25"
                    : "hover:bg-slate-50"
                }`}
              >
                {/* Logo square */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                  isActive
                    ? "bg-white/15 border-white/20"
                    : "bg-white border-slate-200 group-hover:border-slate-300 shadow-sm"
                }`}>
                  {brand.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <span className={`text-xs font-black tracking-tight ${isActive ? "text-white" : "text-slate-600"}`}>
                      {brand.name.length > 4 ? brand.name.slice(0, 2).toUpperCase() : brand.name.slice(0, 3).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Name */}
                <p className={`text-[11px] font-semibold leading-tight ${isActive ? "text-white" : "text-slate-600"}`}>
                  {brand.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
