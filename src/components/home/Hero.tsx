"use client";

import { motion } from "framer-motion";
import { Search, Star, Smartphone, User } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-8 lg:pt-32 lg:pb-16 overflow-hidden">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Find Your Perfect <br className="hidden lg:block" />
              <span className="text-gradient">Smartphone.</span>
            </h1>
            
            <p className="text-[13px] sm:text-sm text-slate-600 mb-4 leading-relaxed max-w-xl">
              Compare specs, read in-depth reviews, and discover the latest technology trends with the most comprehensive smartphone platform.
            </p>
          </motion.div>

          {/* Featured Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:h-[600px] hidden lg:flex justify-center items-center"
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
