"use client";

import Link from "next/link";
import Image from "next/image";
import { TrendingUp, GitCompare, Newspaper, Trophy, Smartphone } from "lucide-react";
import { FALLBACK_IMAGE, getCloudinaryBlurUrl, defaultBlurDataURL } from '@/lib/utils/image';
import type { PhoneData } from "./PhonesClientPage";

interface Props {
  latestNews: { title: string; slug: string; featured_image: string | null; date: string }[];
  trendingPhones: PhoneData[];
}

const TRENDING_SEARCHES = [
  "Samsung Galaxy S25 Ultra",
  "iPhone 16 Pro Max",
  "Xiaomi 15 Ultra",
  "OnePlus 13",
  "Google Pixel 9 Pro",
  "Realme GT 7 Pro",
];

const POPULAR_COMPARISONS = [
  { a: "S25 Ultra", b: "iPhone 16 Pro", href: "/compare" },
  { a: "Pixel 9 Pro", b: "OnePlus 13", href: "/compare" },
  { a: "Xiaomi 15", b: "Realme GT7", href: "/compare" },
];

const BEST_PHONES = [
  { category: "Best Camera", name: "Samsung S25 Ultra", tag: "200MP" },
  { category: "Best Battery", name: "Xiaomi 15 Pro", tag: "6000mAh" },
  { category: "Best Gaming", name: "ROG Phone 8", tag: "AnTuTu 2.1M" },
  { category: "Best Budget", name: "Redmi Note 14", tag: "Under $200" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function RightSidebar({ latestNews, trendingPhones }: Props) {
  return (
    <div className="space-y-5 sticky top-24">

      {/* Trending Searches */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3.5 border-b border-slate-100 bg-gradient-to-r from-orange-50 to-amber-50 flex items-center gap-2">
          <TrendingUp size={15} className="text-orange-500" />
          <span className="font-bold text-slate-800 text-sm">Trending Searches</span>
        </div>
        <div className="p-4 space-y-2">
          {TRENDING_SEARCHES.map((term, i) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 group transition-colors"
            >
              <span className={`text-xs font-black w-5 text-center ${i < 3 ? "text-orange-500" : "text-slate-400"}`}>
                {i + 1}
              </span>
              <span className="text-sm text-slate-700 group-hover:text-blue-600 font-medium transition-colors line-clamp-1 flex-1">
                {term}
              </span>
              <span className="text-[10px] text-slate-400">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Comparisons */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3.5 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center gap-2">
          <GitCompare size={15} className="text-blue-600" />
          <span className="font-bold text-slate-800 text-sm">Popular Comparisons</span>
        </div>
        <div className="p-4 space-y-2.5">
          {POPULAR_COMPARISONS.map((comp, i) => (
            <Link
              key={i}
              href={comp.href}
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-50 group transition-colors"
            >
              <div className="flex-1 flex items-center gap-1.5 min-w-0">
                <span className="text-xs font-semibold text-slate-700 truncate">{comp.a}</span>
                <span className="text-[10px] text-slate-400 shrink-0">vs</span>
                <span className="text-xs font-semibold text-slate-700 truncate">{comp.b}</span>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full shrink-0 group-hover:bg-blue-100 transition-colors">
                Compare
              </span>
            </Link>
          ))}
          <Link href="/compare" className="block text-center text-xs font-semibold text-blue-600 hover:text-blue-700 pt-1 transition-colors">
            Start Custom Comparison →
          </Link>
        </div>
      </div>

      {/* Best Phones This Week */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3.5 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-yellow-50 flex items-center gap-2">
          <Trophy size={15} className="text-amber-500" />
          <span className="font-bold text-slate-800 text-sm">Best This Week</span>
        </div>
        <div className="p-4 space-y-3">
          {BEST_PHONES.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-black text-amber-600">{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-400 font-semibold">{item.category}</p>
                <p className="text-xs font-bold text-slate-800 truncate">{item.name}</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full shrink-0">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Latest News */}
      {latestNews.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3.5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Newspaper size={15} className="text-slate-500" />
              <span className="font-bold text-slate-800 text-sm">Latest News</span>
            </div>
            <Link href="/news" className="text-[11px] font-semibold text-blue-600 hover:text-blue-700">
              All →
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {latestNews.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/news/${post.slug}`} className="flex gap-3 group">
                <div className="w-14 h-14 rounded-xl bg-slate-100 shrink-0 overflow-hidden flex items-center justify-center relative">
                  {post.featured_image ? (
                    <Image
                      src={post.featured_image || FALLBACK_IMAGE}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="56px"
                      placeholder={getCloudinaryBlurUrl(post.featured_image) ? "blur" : "empty"}
                      blurDataURL={getCloudinaryBlurUrl(post.featured_image) || defaultBlurDataURL}
                    />
                  ) : (
                    <Smartphone size={20} className="text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
