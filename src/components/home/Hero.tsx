"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Trophy, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-2 lg:pt-28 lg:pb-4 overflow-hidden">
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-3 leading-[1.1]">
              Find Your Perfect <br className="hidden lg:block" />
              <span className="text-gradient">Smartphone.</span>
            </h1>
            
            <p className="text-[13px] sm:text-sm text-slate-600 mb-4 leading-relaxed max-w-xl">
              Compare specs, read in-depth reviews, and discover the latest technology trends with the most comprehensive smartphone platform.
            </p>
          </motion.div>


        </div>
      </div>
    </section>
  );
}
