"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FALLBACK_IMAGE, getCloudinaryBlurUrl, defaultBlurDataURL } from '@/lib/utils/image';
import { useRouter } from "next/navigation";
import { Heart, GitCompare, Zap, Eye } from "lucide-react";
import type { PhoneData } from "./PhonesClientPage";

interface Props {
  phone: PhoneData;
  isListView?: boolean;
  isComparing: boolean;
  onCompareToggle: (id: string) => void;
  canAddToCompare: boolean;
}

export default function PhoneCard({ phone, isListView, isComparing, onCompareToggle, canAddToCompare }: Props) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const is5G = phone.network?.toLowerCase().includes("5g");
  const discount = phone.price_usd && phone.price_usd > 500
    ? Math.floor(((phone.price_usd * 3) % 15)) + 5
    : null;

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) {
      return;
    }
    router.push(`/phones/${phone.brand.slug}/${phone.slug}`);
  };

  /* ─── LIST VIEW ─── */
  if (isListView) {
    return (
      <div
        onClick={handleCardClick}
        className="group flex bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 overflow-hidden cursor-pointer"
      >
        {/* Image */}
        <div className="relative w-32 sm:w-40 shrink-0 bg-slate-50 overflow-hidden">
          {phone.images[0] && !imageError ? (
            <Image
              src={phone.images[0] || FALLBACK_IMAGE}
              alt={`${phone.name} smartphone details`}
              fill
              onError={() => setImageError(true)}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 30vw, 20vw"
              placeholder={getCloudinaryBlurUrl(phone.images[0]) ? "blur" : "empty"}
              blurDataURL={getCloudinaryBlurUrl(phone.images[0]) || defaultBlurDataURL}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center min-h-[120px]">
              <PhoneIllustration />
            </div>
          )}
          {/* Overlaid badges */}
          {discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
          {is5G && (
            <span className="absolute bottom-2 left-2 flex items-center gap-0.5 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              <Zap size={8} fill="currentColor" /> 5G
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between p-4">
          <div>
            <p className="text-[11px] text-blue-600 font-semibold mb-0.5">{phone.brand.name}</p>
            <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">{phone.name}</h3>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-col">
              <span className="text-base font-black text-slate-900">
                {phone.price_display_text || (phone.price_usd ? `$${phone.price_usd.toLocaleString()}` : "Not Announced Yet")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onCompareToggle(phone.id)}
                disabled={!canAddToCompare}
                className={`p-2 rounded-xl border text-xs transition-colors ${isComparing ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 disabled:opacity-40 disabled:cursor-not-allowed"}`}
              >
                <GitCompare size={13} />
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-2 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50 transition-colors"
              >
                <Heart size={13} className={isWishlisted ? "fill-red-500 text-red-500" : "text-slate-400"} />
              </button>
              <Link
                href={`/phones/${phone.brand.slug}/${phone.slug}`}
                className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                <Eye size={12} /> View
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── GRID VIEW ─── */
  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/70 hover:-translate-y-1 hover:border-slate-200 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >

      {/* ── Image Area — full bleed, no padding ── */}
      <div className="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden">
        {phone.images[0] && !imageError ? (
          <Image
            src={phone.images[0] || FALLBACK_IMAGE}
            alt={`${phone.name} grid view image`}
            fill
            onError={() => setImageError(true)}
            className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            placeholder={getCloudinaryBlurUrl(phone.images[0]) ? "blur" : "empty"}
            blurDataURL={getCloudinaryBlurUrl(phone.images[0]) || defaultBlurDataURL}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <PhoneIllustration />
          </div>
        )}

        {/* Overlay — top row of badges inside image */}
        <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-2.5">
          {/* Left: discount */}
          <div className="flex flex-col gap-1.5">
            {discount && (
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                -{discount}%
              </span>
            )}
            {phone.phone_status && ['upcoming', 'rumored'].includes(phone.phone_status) && (
              <span className="bg-purple-100 text-purple-600 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm capitalize">
                {phone.phone_status}
              </span>
            )}
            {phone.is_featured && (
              <span className="bg-amber-400 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                HOT
              </span>
            )}
          </div>

          {/* Right: wishlist + compare */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="w-[44px] h-[44px] rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center hover:bg-red-50 transition-colors"
            >
              <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500" : "text-slate-400"} />
            </button>
            <button
              onClick={() => onCompareToggle(phone.id)}
              disabled={!canAddToCompare}
              className={`w-[44px] h-[44px] rounded-full backdrop-blur-sm shadow flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${isComparing ? "bg-blue-600 text-white" : "bg-white/90 text-slate-400 hover:bg-blue-50 hover:text-blue-600"}`}
            >
              <GitCompare size={16} />
            </button>
          </div>
        </div>

        {/* Bottom: 5G badge inside image */}
        {is5G && (
          <div className="absolute bottom-2 left-2 flex items-center gap-0.5 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
            <Zap size={8} fill="currentColor" /> 5G
          </div>
        )}
      </div>

      {/* ── Info Area — minimal ── */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wide mb-0.5">{phone.brand.name}</p>
        <h3 className="font-bold text-slate-900 text-[13px] sm:text-sm leading-snug line-clamp-2 flex-1 group-hover:text-blue-700 transition-colors" title={phone.name}>
          {phone.name}
        </h3>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black text-slate-900 truncate max-w-[120px] sm:max-w-full">
              {phone.price_display_text || (phone.price_usd ? `$${phone.price_usd.toLocaleString()}` : "Price TBA")}
            </span>
          </div>
          <Link
            href={`/phones/${phone.brand.slug}/${phone.slug}`}
            className="hidden sm:flex px-4 py-2 min-h-[44px] items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-bold rounded-xl transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Fallback SVG Phone Illustration ── */
function PhoneIllustration() {
  return (
    <svg width="56" height="96" viewBox="0 0 56 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="2" width="50" height="92" rx="10" fill="url(#pg2)" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="8" y="12" width="40" height="62" rx="3" fill="#f8faff" />
      <rect x="20" y="6" width="16" height="3.5" rx="1.5" fill="#cbd5e1" />
      <circle cx="28" cy="85" r="3.5" fill="#cbd5e1" />
      <rect x="14" y="22" width="28" height="18" rx="3" fill="#dbeafe" />
      <rect x="12" y="46" width="32" height="2.5" rx="1.25" fill="#e2e8f0" />
      <rect x="12" y="52" width="22" height="2.5" rx="1.25" fill="#e2e8f0" />
      <defs>
        <linearGradient id="pg2" x1="3" y1="2" x2="53" y2="94" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f1f5f9" /><stop offset="1" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
