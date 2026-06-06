"use client";

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { ChevronRight, Smartphone } from 'lucide-react';
import { useCallback } from 'react';

export default function TrendingCarousel({ phones }: { phones: any /* eslint-disable-line @typescript-eslint/no-explicit-any */[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {phones.map((phone, idx) => (
            <div key={idx} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-4">
              <Link href={`/phones/${phone.brands?.slug || 'brand'}/${phone.slug}`} className="glass-card rounded-3xl p-6 hover-card block bg-white h-full relative overflow-hidden group">
                <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full z-10">
                  Trending
                </div>
                <div className="w-full aspect-[3/4] bg-slate-50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center group-hover:scale-105 smooth-transition">
                  {phone.images && phone.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={phone.images[0]} alt={phone.name} className="w-full h-full object-cover" />
                  ) : (
                    <Smartphone size={48} className="text-slate-300" />
                  )}
                </div>
                <div className="space-y-2 relative z-10">
                  <div className="text-xs font-bold text-primary tracking-wider uppercase">{phone.brands?.name}</div>
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{phone.name}</h3>
                  <div className="pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-slate-900">
                        {phone.price_usd ? `$${phone.price_usd.toLocaleString()}` : 'TBA'}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white smooth-transition">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:-translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-primary z-20">
        <ChevronRight size={20} className="rotate-180" />
      </button>
      <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 lg:translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-primary z-20">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
