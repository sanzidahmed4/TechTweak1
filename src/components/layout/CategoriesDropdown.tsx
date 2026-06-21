"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CategoriesDropdown({
  isScrolled,
  onOpenChange,
}: {
  isScrolled?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => { });
  }, []);

  const open = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const scheduleClose = useCallback(() => {
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
      onOpenChange?.(false);
    }, 150);
  }, [onOpenChange]);

  // navbar height: scrolled = ~52px, default = ~68px
  const menuTop = isScrolled ? "52px" : "68px";

  return (
    <>
      {/* Trigger */}
      <div onMouseEnter={open} onMouseLeave={scheduleClose} className="relative">
        <button
          className={`flex items-center gap-0.5 text-sm font-medium transition-colors ${isOpen ? "text-primary" : "text-slate-600 hover:text-primary"
            }`}
        >
          Categories
          <ChevronDown
            size={13}
            className={`mt-px transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Invisible bridge to prevent gap between trigger and panel */}
        {isOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 w-[300px] h-[16px]" style={{ top: "100%" }} />
        )}
      </div>

      {/* Mega Menu Panel — no backdrop, no black line */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ top: menuTop }}
            className="fixed left-0 right-0 z-50"
            onMouseEnter={open}
            onMouseLeave={scheduleClose}
          >
            {/* The panel — no top border, shadow only on bottom/sides */}
            <div className="bg-white shadow-[0_8px_24px_rgba(0,0,0,0.07)] border-b border-slate-200/50">
              <div className="container mx-auto px-4 lg:px-8 py-8">
                <div className="flex gap-16">

                  {/* Left label */}
                  <div className="w-44 shrink-0">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">
                      Browse by Category
                    </p>
                    <Link
                      href="/phones"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline underline-offset-4 mt-1"
                    >
                      View All Phones <span>→</span>
                    </Link>
                  </div>

                  {/* Category grid */}
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-1">
                    {categories.map((cat) => (
                      <React.Fragment key={cat.id}>
                        <Link
                          href={cat.slug === "news" ? "/news" : `/phones?category=${cat.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="group flex flex-col py-3 border-b border-slate-100 hover:border-transparent transition-all"
                        >
                          <span className="text-[15px] font-medium text-slate-800 group-hover:text-primary transition-colors">
                            {cat.name}
                          </span>
                          <span className="text-[12px] text-slate-400 mt-0.5 group-hover:text-primary/60 transition-colors">
                            {cat.slug === "news" ? "Explore latest tech news →" : "Explore phones →"}
                          </span>
                        </Link>
                        {cat.slug === "announcements" && (
                          <Link
                            href="/upcoming-phones"
                            onClick={() => setIsOpen(false)}
                            className="group flex flex-col py-3 border-b border-slate-100 hover:border-transparent transition-all"
                          >
                            <span className="text-[15px] font-medium text-slate-800 group-hover:text-primary transition-colors">
                              Upcoming Phones
                            </span>
                            <span className="text-[12px] text-slate-400 mt-0.5 group-hover:text-primary/60 transition-colors">
                              Explore phones →
                            </span>
                          </Link>
                        )}
                      </React.Fragment>
                    ))}
                    {categories.length === 0 && (
                      <p className="text-sm text-slate-400 col-span-4">Loading…</p>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
