"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, Smartphone } from "lucide-react";
import BrandGrid from "@/components/phones/BrandGrid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UpcomingPhonesClient({ initialPhones, topBrands }: { initialPhones: any[], topBrands: any[] }) {
  const [activeBrands, setActiveBrands] = useState<string[]>([]);

  const handleBrandClick = (slug: string) => {
    setActiveBrands(prev => 
      prev.includes(slug) ? prev.filter(b => b !== slug) : [...prev, slug]
    );
  };

  const filteredPhones = useMemo(() => {
    if (activeBrands.length === 0) return initialPhones;
    return initialPhones.filter(phone => phone.brand_id && activeBrands.includes(phone.brand_id.slug));
  }, [initialPhones, activeBrands]);

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-slate-100 pt-20 pb-6">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-4">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-slate-700 font-semibold">Upcoming Phones</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Upcoming Phones</h1>
              <p className="text-slate-500 text-sm mt-1">Discover the next generation of smartphones. Leaks, rumors, and expected launch dates.</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              {filteredPhones.length} Upcoming
            </div>
          </div>
        </div>
      </div>

      <BrandGrid 
        brands={topBrands} 
        activeBrands={activeBrands} 
        onBrandClick={handleBrandClick} 
        title="Brands" 
      />

      <div className="container mx-auto px-4 lg:px-8 pt-10 pb-16">
        {/* Phone Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5">
          {filteredPhones.length > 0 ? (
            filteredPhones.map((phone: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => (
              <Link href={`/phones/${phone.brand_id?.slug || 'unknown'}/${phone.slug}`} key={phone._id} className="group bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 transition-all flex flex-col relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-purple-100 text-purple-700 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full z-10">
                  {phone.phone_status || 'Upcoming'}
                </div>
                
                <div className="w-full aspect-[4/3] bg-slate-50 rounded-xl sm:rounded-2xl mb-4 flex items-center justify-center p-2 relative overflow-hidden">
                  {phone.images && phone.images.length > 0 ? (
                    <Image src={phone.images[0] || "/phone-placeholder.webp"} alt={phone.name} fill sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw" className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <Smartphone className="w-10 h-10 sm:w-16 sm:h-16 text-slate-300" />
                  )}
                </div>
                
                <div className="space-y-1 flex-1">
                  <p className="text-[9px] sm:text-[10px] text-primary font-bold uppercase tracking-widest">{phone.brand_id?.name || 'Unknown'}</p>
                  <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-2">{phone.name}</h2>
                </div>
                
                <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 text-[10px] sm:text-xs font-semibold">
                    <Calendar size={12} className="text-primary shrink-0" />
                    <span className="truncate">{phone.expected_launch_date || phone.launch_quarter || phone.launch_year || 'Launch TBA'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-black text-slate-900 truncate pr-2">
                      {phone.price_usd ? `$${phone.price_usd.toLocaleString()}` : "Not Announced Yet"}
                    </span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
             <div className="col-span-full py-20 text-center text-slate-500">
               <Smartphone size={48} className="mx-auto mb-4 opacity-30" />
               <p className="text-lg">No upcoming phones found for selected brands.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
