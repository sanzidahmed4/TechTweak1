"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Cpu,
  Battery,
  Camera,
  HardDrive,
  MemoryStick,
  RefreshCw,
  Signal,
  Smartphone,
} from "lucide-react";
import type { FilterState } from "./PhonesClientPage";

interface Props {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  brands: { id: string; name: string; slug: string; count: number }[];
  activeFilterCount: number;
}

const RAM_OPTIONS = ["4GB", "6GB", "8GB", "12GB", "16GB", "18GB"];
const STORAGE_OPTIONS = ["64GB", "128GB", "256GB", "512GB", "1TB"];
const BATTERY_OPTIONS = ["4000", "4500", "5000", "5500", "6000"];
const CAMERA_OPTIONS = ["12MP", "48MP", "50MP", "64MP", "108MP", "200MP"];
const REFRESH_OPTIONS = ["60Hz", "90Hz", "120Hz", "144Hz", "165Hz"];
const PROCESSOR_OPTIONS = ["Snapdragon", "Dimensity", "Apple A", "Exynos", "Helio", "Kirin"];

function FilterSection({ title, icon: Icon, defaultOpen = true, children }: {
  title: string; icon: any   /* eslint-disable-line @typescript-eslint/no-explicit-any */; defaultOpen?: boolean; children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 last:border-0 py-4">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-3 group">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <Icon size={13} />
          </div>
          {title}
        </div>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="space-y-1.5">{children}</div>}
    </div>
  );
}

function CheckboxChip({
  label, checked, onChange
}: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
      <div className={`w-4 h-4 rounded border-2 transition-all flex items-center justify-center ${checked ? "bg-blue-600 border-blue-600" : "border-slate-300 group-hover:border-blue-400"}`}>
        {checked && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span className={`text-sm transition-colors ${checked ? "text-blue-700 font-semibold" : "text-slate-600 group-hover:text-slate-800"}`}>{label}</span>
    </label>
  );
}

function ToggleSwitch({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button onClick={onChange} className="flex items-center justify-between w-full group">
      <span className={`text-sm font-medium ${checked ? "text-blue-700" : "text-slate-600"}`}>{label}</span>
      <div className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-slate-200"}`}>
        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : ""}`} />
      </div>
    </button>
  );
}

export default function FilterSidebar({ filters, updateFilter, resetFilters, brands, activeFilterCount }: Props) {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const visibleBrands = showAllBrands ? brands : brands.slice(0, 7);

  const toggleArrayFilter = <K extends keyof FilterState>(
    key: K, value: string
  ) => {
    const current = filters[key] as string[];
    updateFilter(key, (current.includes(value) ? current.filter(v => v !== value) : [...current, value]) as any /* eslint-disable-line @typescript-eslint/no-explicit-any */);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden sticky top-24">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-blue-600" />
          <span className="font-bold text-slate-800 text-sm">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button onClick={resetFilters} className="text-xs text-red-500 font-semibold hover:text-red-600 flex items-center gap-1">
            <X size={11} /> Reset
          </button>
        )}
      </div>

      <div className="px-5 py-2 max-h-[calc(100vh-180px)] overflow-y-auto">
        {/* Price Range — top of filters */}
        <FilterSection title="Price Range" icon={SlidersHorizontal}>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">${filters.priceMin}</span>
              <span className="font-semibold text-slate-700">${filters.priceMax}</span>
            </div>
            <input
              type="range"
              min={0} max={2000} step={50}
              value={filters.priceMax}
              onChange={(e) => updateFilter("priceMax", Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none bg-slate-200 accent-blue-600 cursor-pointer"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceMin || ""}
                onChange={(e) => updateFilter("priceMin", Number(e.target.value))}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 outline-none focus:border-blue-400 transition-all"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceMax || ""}
                onChange={(e) => updateFilter("priceMax", Number(e.target.value))}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 outline-none focus:border-blue-400 transition-all"
              />
            </div>
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Brand" icon={Smartphone}>
          {visibleBrands.map((b) => (
            <CheckboxChip
              key={b.id}
              label={`${b.name} (${b.count})`}
              checked={filters.brands.includes(b.slug)}
              onChange={() => toggleArrayFilter("brands", b.slug)}
            />
          ))}
          {brands.length > 7 && (
            <button onClick={() => setShowAllBrands(!showAllBrands)} className="text-xs text-blue-600 font-semibold mt-1 hover:text-blue-700">
              {showAllBrands ? "Show less" : `+${brands.length - 7} more brands`}
            </button>
          )}
        </FilterSection>

        {/* Quick Toggles */}
        <FilterSection title="Connectivity" icon={Signal}>
          <div className="space-y-3">
            <ToggleSwitch checked={filters.is5G} onChange={() => updateFilter("is5G", !filters.is5G)} label="5G Network" />
            <ToggleSwitch checked={filters.isAMOLED} onChange={() => updateFilter("isAMOLED", !filters.isAMOLED)} label="AMOLED Display" />
          </div>
        </FilterSection>

        {/* RAM */}
        <FilterSection title="RAM" icon={MemoryStick} defaultOpen={false}>
          <div className="flex flex-wrap gap-2">
            {RAM_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() => toggleArrayFilter("ram", r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${filters.ram.includes(r) ? "bg-blue-600 border-blue-600 text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Storage */}
        <FilterSection title="Storage" icon={HardDrive} defaultOpen={false}>
          <div className="flex flex-wrap gap-2">
            {STORAGE_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => toggleArrayFilter("storage", s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${filters.storage.includes(s) ? "bg-blue-600 border-blue-600 text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Battery */}
        <FilterSection title="Battery" icon={Battery} defaultOpen={false}>
          <div className="flex flex-wrap gap-2">
            {BATTERY_OPTIONS.map((b) => (
              <button
                key={b}
                onClick={() => toggleArrayFilter("battery", b)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${filters.battery.includes(b) ? "bg-blue-600 border-blue-600 text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"}`}
              >
                {b}+mAh
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Camera */}
        <FilterSection title="Camera" icon={Camera} defaultOpen={false}>
          <div className="flex flex-wrap gap-2">
            {CAMERA_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => toggleArrayFilter("camera", c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${filters.camera.includes(c) ? "bg-blue-600 border-blue-600 text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Refresh Rate */}
        <FilterSection title="Refresh Rate" icon={RefreshCw} defaultOpen={false}>
          <div className="flex flex-wrap gap-2">
            {REFRESH_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() => toggleArrayFilter("refreshRate", r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${filters.refreshRate.includes(r) ? "bg-blue-600 border-blue-600 text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"}`}
              >
                {r}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Processor */}
        <FilterSection title="Processor" icon={Cpu} defaultOpen={false}>
          {PROCESSOR_OPTIONS.map((p) => (
            <CheckboxChip
              key={p}
              label={p}
              checked={filters.processor.includes(p)}
              onChange={() => toggleArrayFilter("processor", p)}
            />
          ))}
        </FilterSection>

        {/* Reset Button */}
        {activeFilterCount > 0 && (
          <div className="py-4">
            <button
              onClick={resetFilters}
              className="w-full py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm transition-colors border border-red-100 hover:border-red-200 flex items-center justify-center gap-2"
            >
              <X size={14} /> Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
