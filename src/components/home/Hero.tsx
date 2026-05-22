"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Star, Smartphone, User } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-sm font-medium text-slate-600 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Discover the Future of Mobile
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Find Your Perfect <br className="hidden lg:block" />
              <span className="text-gradient">Smartphone.</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              Compare specs, read in-depth reviews, and discover the latest technology trends with the most comprehensive smartphone platform.
            </p>

            {/* Search Bar */}
            <form action="/search" className="relative max-w-xl group mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Search size={20} />
              </div>
              <input
                type="text"
                name="q"
                placeholder="Search phones, brands, processors..."
                className="w-full py-4 pl-12 pr-32 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-slate-700 placeholder:text-slate-400"
              />
              <button type="submit" className="absolute inset-y-2 right-2 px-6 bg-primary text-white rounded-xl font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:bg-primary/90 transition-all text-sm flex items-center gap-2">
                Search
              </button>
            </form>

            <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden text-slate-400">
                      <User size={16} />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col ml-2">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs mt-0.5">Trusted by 10M+ users</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:h-[600px] flex justify-center items-center"
          >
            {/* Abstract representations of phones if images are missing */}
            <div className="relative w-full max-w-sm aspect-[1/2] glass-card rounded-[2.5rem] border-8 border-slate-900 shadow-2xl overflow-hidden flex flex-col z-20">
              <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-30">
                <div className="w-1/3 h-full bg-slate-900 rounded-b-2xl"></div>
              </div>
              <div className="flex-1 bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-6 relative">
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-48 h-48 rounded-full bg-primary/20 blur-3xl absolute top-1/4"
                ></motion.div>
                <Smartphone size={80} className="text-primary/50 z-10" strokeWidth={1} />
                <div className="mt-8 space-y-3 w-full z-10">
                  <div className="h-2 w-3/4 bg-slate-200 rounded-full mx-auto"></div>
                  <div className="h-2 w-1/2 bg-slate-200 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>

            {/* Behind Phone */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-12 w-64 aspect-[1/2] glass-card rounded-[2rem] border-4 border-slate-800 shadow-xl opacity-60 scale-90 -rotate-6 z-10 hidden sm:block"></div>
            
            <div className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-12 w-64 aspect-[1/2] glass-card rounded-[2rem] border-4 border-slate-800 shadow-xl opacity-40 scale-80 rotate-6 z-0 hidden sm:block"></div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-20 right-10 lg:-right-4 glass-card px-4 py-3 rounded-2xl shadow-lg z-30 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <span className="font-bold text-sm">99</span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Antutu Score</p>
                <p className="text-sm font-bold text-slate-900">2.1M+</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
