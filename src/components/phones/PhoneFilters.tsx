"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

export default function PhoneFilters({ brands, categories }: { brands: any[], categories: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentBrand = searchParams.get("brand") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "newest";
  const currentSearch = searchParams.get("q") || "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (key: string, value: string) => {
    router.push(`${pathname}?${createQueryString(key, value)}`);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const hasFilters = currentBrand || currentCategory || currentSearch || currentSort !== "newest";

  return (
    <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row items-center gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-auto md:flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search phones..." 
            defaultValue={currentSearch}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFilterChange('q', e.currentTarget.value);
              }
            }}
            onBlur={(e) => handleFilterChange('q', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
          />
        </div>

        <div className="flex w-full md:w-auto gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {/* Brand Filter */}
          <div className="relative min-w-[140px]">
            <select 
              value={currentBrand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-700"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.slug}>{brand.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="relative min-w-[140px]">
            <select 
              value={currentCategory}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-700"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>

          {/* Sort By */}
          <div className="relative min-w-[150px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SlidersHorizontal size={14} className="text-slate-400" />
            </div>
            <select 
              value={currentSort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-2xl pl-9 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-700"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>
          
          {hasFilters && (
            <button 
              onClick={clearFilters}
              className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-2xl px-4 py-3 transition-colors shrink-0"
              title="Clear Filters"
            >
              <X size={18} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
