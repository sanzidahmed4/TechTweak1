"use client";

import { useState, useCallback, useEffect } from "react";
import { Smartphone, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhoneGallery({ images, name }: { images: string[], name: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Embla for main carousel
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true, align: "center" });
  // Embla for thumbnails (so they can sync)
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true
  });
  // Embla for fullscreen
  const [fsRef, fsApi] = useEmblaCarousel({ loop: true, align: "center" });

  const scrollPrev = useCallback(() => mainApi && mainApi.scrollPrev(), [mainApi]);
  const scrollNext = useCallback(() => mainApi && mainApi.scrollNext(), [mainApi]);

  const onSelectMain = useCallback(() => {
    if (!mainApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    if (thumbApi) thumbApi.scrollTo(index);
    if (fsApi) fsApi.scrollTo(index, true); // Sync fullscreen if open
  }, [mainApi, thumbApi, fsApi]);

  const onSelectThumb = useCallback((index: number) => {
    if (!mainApi) return;
    mainApi.scrollTo(index);
  }, [mainApi]);

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on("select", onSelectMain);
    return () => { mainApi.off("select", onSelectMain); };
  }, [mainApi, onSelectMain]);

  // Sync fullscreen selections back to main if closed
  const onSelectFs = useCallback(() => {
    if (!fsApi) return;
    const index = fsApi.selectedScrollSnap();
    setSelectedIndex(index);
    if (mainApi) mainApi.scrollTo(index, true);
    if (thumbApi) thumbApi.scrollTo(index);
  }, [fsApi, mainApi, thumbApi]);

  useEffect(() => {
    if (!fsApi) return;
    fsApi.on("select", onSelectFs);
    return () => { fsApi.off("select", onSelectFs); };
  }, [fsApi, onSelectFs]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only navigate if we're not inside an input
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      if (e.key === 'ArrowLeft') scrollPrev();
      if (e.key === 'ArrowRight') scrollNext();
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext, isFullscreen]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full relative flex justify-center items-center bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mb-4">
        <Smartphone size={80} className="text-slate-300" strokeWidth={1} />
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-24 z-10 max-w-[400px] mx-auto w-full">
        {/* Main Image View */}
        <div className="w-full relative bg-white rounded-[2rem] border border-slate-200 overflow-hidden mb-4 shadow-sm group">
          <div className="overflow-hidden" ref={mainRef}>
            <div className="flex touch-pan-y">
              {images.map((img, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0 aspect-square sm:aspect-[4/5] relative flex items-center justify-center bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={img} 
                    alt={`${name} - View ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows (Always visible on touch, elegant hover on desktop) */}
          {images.length > 1 && (
            <>
              <button 
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur text-slate-700 p-3 rounded-full shadow-lg opacity-100 md:opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:text-primary z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur text-slate-700 p-3 rounded-full shadow-lg opacity-100 md:opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:text-primary z-10"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <button 
            onClick={() => { setIsFullscreen(true); setTimeout(() => fsApi?.scrollTo(selectedIndex, true), 50); }}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur text-slate-700 p-2.5 rounded-full shadow-lg opacity-100 md:opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:text-primary z-10"
            aria-label="View fullscreen"
          >
            <Maximize2 size={18} />
          </button>
        </div>
        
        {/* Thumbnails Section */}
        {images.length > 1 && (
          <div className="mt-4">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block px-1">More Photos</span>
            <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={thumbRef}>
              <div className="flex gap-3 pb-2 px-1">
                {images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => onSelectThumb(i)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all bg-slate-50 ${
                      selectedIndex === i ? "border-primary scale-105 shadow-md shadow-primary/20" : "border-transparent opacity-60 hover:opacity-100 border-slate-200"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover drop-shadow-sm" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/98 backdrop-blur-3xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 relative z-20">
              <span className="text-white font-bold tracking-wide">{name}</span>
              <button 
                onClick={() => setIsFullscreen(false)}
                className="bg-white/10 text-white hover:bg-white hover:text-slate-900 p-3 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden relative z-10">
              {images.length > 1 && (
                <button 
                  onClick={() => fsApi?.scrollPrev()}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all hover:scale-110 z-20 hidden sm:block"
                >
                  <ChevronLeft size={32} />
                </button>
              )}
              
              <div className="overflow-hidden w-full h-full cursor-grab active:cursor-grabbing" ref={fsRef}>
                <div className="flex h-full items-center">
                  {images.map((img, idx) => (
                    <div key={idx} className="flex-[0_0_100%] min-w-0 h-full flex items-center justify-center relative p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`Fullscreen ${idx}`} className="max-w-full max-h-[85vh] object-contain drop-shadow-2xl" />
                    </div>
                  ))}
                </div>
              </div>

              {images.length > 1 && (
                <button 
                  onClick={() => fsApi?.scrollNext()}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all hover:scale-110 z-20 hidden sm:block"
                >
                  <ChevronRight size={32} />
                </button>
              )}
              <p className="absolute bottom-8 text-slate-400 text-sm tracking-widest uppercase">Swipe or use arrows</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
