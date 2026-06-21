"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterSidebar from "./FilterSidebar";
import PhoneCard from "./PhoneCard";
import BrandGrid from "./BrandGrid";
import RightSidebar from "./RightSidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  LayoutGrid,
  LayoutList,
  Smartphone,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

type SortOption = "latest" | "popular" | "price_asc" | "price_desc" | "camera" | "gaming";

export interface PhoneData {
  id: string;
  name: string;
  slug: string;
  brand: { name: string; slug: string };
  category: { name: string; slug: string };
  display: string | null;
  processor: string | null;
  ram: string | null;
  storage: string | null;
  camera_main: string | null;
  battery: string | null;
  network: string | null;
  price_usd: number | null;
  price_bdt: number | null;
  images: string[];
  is_featured: boolean;
  release_date: string | null;
  antutu_score: number | null;
  price_display_text?: string;
  phone_status?: string;
  expected_launch_date?: string;
  leak_confidence?: string;
}

export interface FilterState {
  search: string;
  brands: string[];
  category: string;
  priceMin: number;
  priceMax: number;
  ram: string[];
  storage: string[];
  battery: string[];
  camera: string[];
  is5G: boolean;
  isAMOLED: boolean;
  refreshRate: string[];
  processor: string[];
}

interface Props {
  initialPhones: PhoneData[];
  brands: { id: string; name: string; slug: string; logo_url: string | null; count: number }[];
  totalCount: number;
  latestNews: { title: string; slug: string; featured_image: string | null; date: string }[];
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "camera", label: "Best Camera" },
  { value: "gaming", label: "Gaming" },
];

const DEFAULT_FILTERS: FilterState = {
  search: "",
  brands: [],
  category: "",
  priceMin: 0,
  priceMax: 300000,
  ram: [],
  storage: [],
  battery: [],
  camera: [],
  is5G: false,
  isAMOLED: false,
  refreshRate: [],
  processor: [],
};

export default function PhonesClientPage({ initialPhones, brands, totalCount, latestNews }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>(() => {
    const brandParams = searchParams.get("brands");
    return {
      ...DEFAULT_FILTERS,
      brands: brandParams ? brandParams.split(",").filter(Boolean) : [],
      category: searchParams.get("category") || "",
    };
  });
  
  const [sort, setSort] = useState<SortOption>("latest");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridView, setGridView] = useState<"grid" | "list">("grid");
  const [compareList, setCompareList] = useState<string[]>([]);
  
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(searchParams.get("page") || "1", 10);
  });
  const itemsPerPage = 24;

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (filters.brands.length > 0) {
      params.set("brands", filters.brands.join(","));
    } else {
      params.delete("brands");
    }

    if (filters.category) {
      params.set("category", filters.category);
    } else {
      params.delete("category");
    }

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }

    const newQuery = params.toString();
    const currentQuery = searchParams.toString();
    
    if (newQuery !== currentQuery) {
      router.replace(`?${newQuery}`, { scroll: false });
    }
  }, [filters.brands, filters.category, currentPage, searchParams, router]);

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to page 1 on filter change
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.brands.length) count++;
    if (filters.category) count++;
    if (filters.priceMin > 0 || filters.priceMax < 300000) count++;
    if (filters.ram.length) count++;
    if (filters.storage.length) count++;
    if (filters.battery.length) count++;
    if (filters.camera.length) count++;
    if (filters.is5G) count++;
    if (filters.isAMOLED) count++;
    if (filters.refreshRate.length) count++;
    if (filters.processor.length) count++;
    return count;
  }, [filters]);

  const filteredPhones = useMemo(() => {
    let result = [...initialPhones];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.name.toLowerCase().includes(q) || (p.processor || "").toLowerCase().includes(q)
      );
    }
    if (filters.brands.length) {
      result = result.filter((p) => filters.brands.includes(p.brand.slug));
    }
    if (filters.category) {
      result = result.filter((p) => p.category?.slug === filters.category);
    }
    if (filters.priceMin > 0 || filters.priceMax < 300000) {
      result = result.filter(
        (p) => p.price_usd !== null && p.price_usd >= filters.priceMin && p.price_usd <= filters.priceMax
      );
    }
    if (filters.is5G) {
      result = result.filter((p) => p.network?.toLowerCase().includes("5g"));
    }
    if (filters.isAMOLED) {
      result = result.filter((p) => p.display?.toLowerCase().includes("amoled") || p.display?.toLowerCase().includes("oled"));
    }
    if (filters.ram.length) {
      result = result.filter((p) => filters.ram.some((r) => (p.ram || "").includes(r)));
    }
    if (filters.storage.length) {
      result = result.filter((p) => filters.storage.some((s) => (p.storage || "").includes(s)));
    }
    if (filters.battery.length) {
      result = result.filter((p) => filters.battery.some((b) => (p.battery || "").includes(b)));
    }
    if (filters.processor.length) {
      result = result.filter((p) =>
        filters.processor.some((proc) => (p.processor || "").toLowerCase().includes(proc.toLowerCase()))
      );
    }

    switch (sort) {
      case "price_asc":
        result.sort((a, b) => (a.price_usd || 9999999) - (b.price_usd || 9999999));
        break;
      case "price_desc":
        result.sort((a, b) => (b.price_usd || 0) - (a.price_usd || 0));
        break;
      case "gaming":
        result.sort((a, b) => (b.antutu_score || 0) - (a.antutu_score || 0));
        break;
      case "camera":
        result.sort((a, b) => {
          const camA = parseInt((a.camera_main || "0").replace(/\D/g, "")) || 0;
          const camB = parseInt((b.camera_main || "0").replace(/\D/g, "")) || 0;
          return camB - camA;
        });
        break;
      default:
        break;
    }

    return result;
  }, [initialPhones, filters, sort]);

  const paginatedPhones = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPhones.slice(start, start + itemsPerPage);
  }, [filteredPhones, currentPage]);

  const totalPages = Math.ceil(filteredPhones.length / itemsPerPage);

  const toggleCompare = useCallback((id: string) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#f8faff]">
      {/* ── Page Header — Clean, compact, no dark bg ── */}
      <div className="bg-white border-b border-slate-100 pt-20 pb-6">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-4">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-slate-700 font-semibold">Phones</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 pr-2">
              <h1 className="text-[18px] sm:text-xl md:text-3xl font-black text-slate-900 tracking-tight truncate">Explore Smartphones</h1>
              <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 mt-0.5 md:mt-1 truncate">Browse by brand, price, specs, and features.</p>
            </div>
            <div className="shrink-0 inline-flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] md:text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>{totalCount.toLocaleString()} <span className="hidden sm:inline">Smartphones</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Top Brands ── */}
      <BrandGrid brands={brands} activeBrands={filters.brands} onBrandClick={(slug) => {
        updateFilter("brands", filters.brands.includes(slug) ? filters.brands.filter(b => b !== slug) : [...filters.brands, slug]);
      }} />

      {/* ── Main 3-column Layout ── */}
      <div className="container mx-auto px-4 lg:px-8 py-10">

        {/* ── Toolbar Row ── */}
        <div className="relative z-40">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 flex-wrap">
            <p className="text-slate-500 text-sm">
              Showing <span className="font-bold text-slate-900">{filteredPhones.length}</span> of {totalCount.toLocaleString()} smartphones
            </p>
            {filters.category && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                <span className="capitalize">{filters.category.replace("-", " ")}</span>
                <button onClick={() => updateFilter("category", "")} className="hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                  <X size={12} />
                </button>
              </div>
            )}
            {activeFilterCount > 0 && (
              <button onClick={resetFilters} className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors">
                <X size={12} /> Clear {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 transition-all shadow-sm"
              >
                <span>{SORT_OPTIONS.find(o => o.value === sort)?.label}</span>
                <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              {sortOpen && (
                <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 z-30 py-2 overflow-hidden">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setSortOpen(false); setCurrentPage(1); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sort === opt.value ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-700 hover:bg-slate-50"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid/List Toggle */}
            <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-xl shadow-sm p-1">
              <button onClick={() => setGridView("grid")} className={`p-2 rounded-lg transition-colors ${gridView === "grid" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-700"}`}>
                <LayoutGrid size={16} />
              </button>
              <button onClick={() => setGridView("list")} className={`p-2 rounded-lg transition-colors ${gridView === "list" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-700"}`}>
                <LayoutList size={16} />
              </button>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20"
            >
              <SlidersHorizontal size={16} />
              Filters {activeFilterCount > 0 && <span className="bg-white text-blue-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{activeFilterCount}</span>}
            </button>
          </div>

        </div>
        </div>

        {/* ── 3 Column Layout ── */}
        <div className="flex gap-8">

          {/* Left Filter Sidebar — Desktop */}
          <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
            <FilterSidebar filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} brands={brands} activeFilterCount={activeFilterCount} />
          </aside>

          {/* Center: Phone Grid */}
          <main className="flex-1 min-w-0">
            {filteredPhones.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-slate-200">
                <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6">
                  <Smartphone size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No phones found</h3>
                <p className="text-slate-500 text-sm mb-6">Try adjusting your filters or search query.</p>
                <button onClick={resetFilters} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className={gridView === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5"
                  : "flex flex-col gap-4"
                }>
                  {paginatedPhones.map((phone) => (
                    <PhoneCard
                      key={phone.id}
                      phone={phone}
                      isListView={gridView === "list"}
                      isComparing={compareList.includes(phone.id)}
                      onCompareToggle={toggleCompare}
                      canAddToCompare={compareList.length < 3 || compareList.includes(phone.id)}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10">
                    <button
                      onClick={() => {
                        setCurrentPage(p => Math.max(1, p - 1));
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      Prev
                    </button>
                    <div className="flex items-center gap-1.5 overflow-x-auto px-1 scrollbar-none">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                          className={`min-w-[40px] h-10 px-2 rounded-xl text-sm font-bold transition-all ${
                            currentPage === pageNum 
                              ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105" 
                              : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 shadow-sm"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setCurrentPage(p => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>

          {/* Right Sidebar — Desktop */}
          <aside className="hidden xl:block w-64 shrink-0">
            <RightSidebar latestNews={latestNews} trendingPhones={initialPhones.filter(p => p.is_featured).slice(0, 4)} />
          </aside>
        </div>
      </div>

      {/* ── Mobile Filter Overlay (Slide from right) ── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
              onClick={() => setMobileFilterOpen(false)} 
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative h-full w-[85vw] max-w-sm bg-white shadow-2xl overflow-y-auto flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100 shrink-0 bg-white sticky top-0 z-10">
                <h3 className="font-bold text-slate-900 text-lg">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500">
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 flex-1">
                <FilterSidebar filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} brands={brands} activeFilterCount={activeFilterCount} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Compare Bar ── */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <div className="flex items-center gap-4 bg-slate-900/95 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/10">
            <span className="text-sm font-medium text-slate-300">
              {compareList.length}/3 selected
            </span>
            <div className="flex gap-2">
              {compareList.map((id) => {
                const phone = initialPhones.find(p => p.id === id);
                return phone ? (
                  <span key={id} className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full max-w-[120px] truncate">
                    {phone.name}
                  </span>
                ) : null;
              })}
            </div>
            <Link href={`/compare?phones=${compareList.join(",")}`} className="bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-xl hover:bg-blue-500 transition-colors">
              Compare
            </Link>
            <button onClick={() => setCompareList([])} className="text-slate-400 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
