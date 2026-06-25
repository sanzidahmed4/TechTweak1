"use client";

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Smartphone } from 'lucide-react';
import { useCallback } from 'react';
import { FALLBACK_IMAGE, getCloudinaryBlurUrl, defaultBlurDataURL } from '@/lib/utils/image';

export default function UpcomingCarousel({ phones }: { phones: any /* eslint-disable-line @typescript-eslint/no-explicit-any */[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4500, stopOnMouseEnter: true, stopOnInteraction: false })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden py-4 -my-4" ref={emblaRef}>
        <div className="flex -ml-4">
          {phones.map((phone, idx) => (
            <div key={idx} className="flex-[0_0_50%] min-w-0 sm:flex-[0_0_33.33%] md:flex-[0_0_25%] lg:flex-[0_0_20%] pl-3 sm:pl-4">
              <Link href={`/phones/${phone.brands?.slug || 'brand'}/${phone.slug}`} className="glass-card rounded-3xl p-4 hover-card block bg-white h-full relative overflow-hidden group">
                <div className="absolute top-3 right-3 bg-purple-100 text-purple-600 text-[10px] font-bold px-2 py-1 rounded-full z-10 capitalize">
                  {phone.phone_status || 'Upcoming'}
                </div>
                <div className="w-full aspect-[4/5] bg-slate-50 rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center group-hover:scale-105 smooth-transition">
                  {phone.images && phone.images.length > 0 ? (
                    <Image 
                      src={phone.images[0] || FALLBACK_IMAGE} 
                      alt={`${phone.name} Upcoming Phone Design`}
                      fill
                      className="object-cover group-hover:scale-105 smooth-transition"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      priority={idx < 4}
                      placeholder={getCloudinaryBlurUrl(phone.images[0]) ? "blur" : "empty"}
                      blurDataURL={getCloudinaryBlurUrl(phone.images[0]) || defaultBlurDataURL}
                    />
                  ) : (
                    <Smartphone size={32} className="text-slate-300" />
                  )}
                </div>
                <div className="space-y-1.5 relative z-10">
                  <div className="text-[10px] font-bold text-purple-600 tracking-wider uppercase">{phone.brands?.name}</div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">{phone.name}</h3>
                  <div className="pt-3 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-slate-900">
                        {phone.price_usd ? `$${phone.price_usd.toLocaleString()}` : 'Not Announced Yet'}
                      </span>
                      {phone.expected_launch_date && (
                        <span className="text-xs text-slate-500 font-medium mt-1">
                          Exp: {phone.expected_launch_date}
                        </span>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-purple-600 group-hover:text-white smooth-transition">
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
      <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:-translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-purple-600 z-20">
        <ChevronRight size={20} className="rotate-180" />
      </button>
      <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 lg:translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-purple-600 z-20">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
