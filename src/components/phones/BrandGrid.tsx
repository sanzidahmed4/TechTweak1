"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  count: number;
}

interface Props {
  brands: Brand[];
  activeBrands?: string[];
  onBrandClick?: (slug: string) => void;
  baseUrl?: string;
  title?: string;
}

export default function BrandGrid({ brands, activeBrands = [], onBrandClick, baseUrl, title = "Top Brands" }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderBrand = (brand: Brand) => {
    const isActive = activeBrands.includes(brand.slug);
    const innerContent = (
      <>
        {/* Logo square */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
          isActive
            ? "bg-white/15 border-white/20"
            : "bg-white border-slate-200 group-hover:border-slate-300 shadow-sm"
        }`}>
          {brand.logo_url ? (
            <Image
              src={brand.logo_url}
              alt={brand.name}
              width={48}
              height={48}
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
      </>
    );

    const className = `group flex flex-col items-center gap-1.5 p-3 lg:p-2 rounded-2xl transition-all duration-200 ${
      isActive
        ? "bg-blue-600 shadow-md shadow-blue-500/25"
        : "hover:bg-slate-50"
    }`;

    if (baseUrl) {
      return (
        <Link key={brand.id} href={`${baseUrl}${brand.slug}`} className={className}>
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        key={brand.id}
        onClick={() => onBrandClick?.(brand.slug)}
        className={className}
      >
        {innerContent}
      </button>
    );
  };

  return (
    <section className="bg-white border-b border-slate-100 py-6">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Mobile / Tablet Version (Default 10 items) */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</h2>
            {brands.length > 10 && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {isExpanded ? "Show Less ↑" : "View All →"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-4">
            {brands.slice(0, 10).map(renderBrand)}
          </div>

          <AnimatePresence>
            {isExpanded && brands.length > 10 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-4 pt-2 sm:pt-4">
                  {brands.slice(10).map(renderBrand)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Version (Default 16 items) */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</h2>
            {brands.length > 16 && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {isExpanded ? "Show Less ↑" : "View All →"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-2">
            {brands.slice(0, 16).map(renderBrand)}
          </div>

          <AnimatePresence>
            {isExpanded && brands.length > 16 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-2 pt-2">
                  {brands.slice(16).map(renderBrand)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
