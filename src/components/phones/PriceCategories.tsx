"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Smartphone } from "lucide-react";

const CATEGORIES = [
  {
    label: "Under ৳10,000",
    sublabel: "Budget Picks",
    count: "120+ phones",
    href: "/phones?maxPrice=90",
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/30",
    icon: "💚",
  },
  {
    label: "৳10,000 – ৳15,000",
    sublabel: "Entry Level",
    count: "85+ phones",
    href: "/phones?minPrice=90&maxPrice=135",
    gradient: "from-blue-500 to-cyan-600",
    glow: "shadow-blue-500/30",
    icon: "📱",
  },
  {
    label: "৳15,000 – ৳20,000",
    sublabel: "Mid Range",
    count: "100+ phones",
    href: "/phones?minPrice=135&maxPrice=180",
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/30",
    icon: "🔮",
  },
  {
    label: "৳20,000 – ৳25,000",
    sublabel: "Upper Mid",
    count: "74+ phones",
    href: "/phones?minPrice=180&maxPrice=225",
    gradient: "from-orange-500 to-pink-600",
    glow: "shadow-orange-500/30",
    icon: "🚀",
  },
  {
    label: "৳25,000 – ৳35,000",
    sublabel: "Premium Mid",
    count: "60+ phones",
    href: "/phones?minPrice=225&maxPrice=315",
    gradient: "from-rose-500 to-red-600",
    glow: "shadow-rose-500/30",
    icon: "💎",
  },
  {
    label: "Flagship Phones",
    sublabel: "Best of Best",
    count: "45+ phones",
    href: "/phones?minPrice=900",
    gradient: "from-amber-500 to-yellow-600",
    glow: "shadow-amber-500/30",
    icon: "👑",
  },
  {
    label: "Gaming Phones",
    sublabel: "High Performance",
    count: "30+ phones",
    href: "/phones?sort=gaming",
    gradient: "from-red-600 to-purple-700",
    glow: "shadow-red-500/30",
    icon: "🎮",
  },
  {
    label: "Camera Phones",
    sublabel: "Photography First",
    count: "55+ phones",
    href: "/phones?sort=camera",
    gradient: "from-sky-500 to-indigo-600",
    glow: "shadow-sky-500/30",
    icon: "📸",
  },
];

export default function PriceCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  };

  return (
    <section className="bg-white border-b border-slate-100 py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-black text-slate-900">Shop by Budget</h2>
            <p className="text-xs text-slate-500 mt-0.5">Find phones within your price range</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 flex items-center justify-center transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 flex items-center justify-center transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className={`group relative flex-shrink-0 w-44 rounded-2xl bg-gradient-to-br ${cat.gradient} p-5 text-white shadow-lg ${cat.glow} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
            >
              {/* Glow blob */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute -bottom-6 -left-4 w-24 h-24 bg-black/10 rounded-full blur-2xl" />

              {/* Phone mockup decoration */}
              <div className="absolute right-3 bottom-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Smartphone size={48} strokeWidth={1} />
              </div>

              <div className="relative z-10">
                <div className="text-2xl mb-2">{cat.icon}</div>
                <p className="text-[10px] font-semibold text-white/70 uppercase tracking-wider mb-1">
                  {cat.sublabel}
                </p>
                <h3 className="font-black text-sm leading-tight mb-2">{cat.label}</h3>
                <span className="inline-block text-[11px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full font-semibold">
                  {cat.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
