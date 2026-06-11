"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAdvisorRecommendations, QuizAnswers, RecommendedPhone, getAdvisorBrands } from "@/app/actions/advisor";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight, Search, Zap, CheckCircle2, RefreshCw, ArrowLeft } from "lucide-react"; // Keeping minimal functional icons

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { id: "priority", title: "What matters most to you?", options: [
    { value: "gaming", label: "Gaming & Performance", desc: "High frame rates and zero lag" },
    { value: "camera", label: "Photography & Video", desc: "Crisp shots and great zoom" },
    { value: "battery", label: "Battery Life", desc: "Lasts all day or more" },
    { value: "balanced", label: "Balanced Daily Use", desc: "Good at everything" }
  ]},
  { id: "budget", title: "What's your maximum budget?", options: [
    { value: "under_300", label: "Under $300", desc: "Best value essentials" },
    { value: "300_600", label: "$300 - $600", desc: "Mid-range sweet spot" },
    { value: "600_1000", label: "$600 - $1000", desc: "Premium flagship killers" },
    { value: "premium", label: "No Limit", desc: "The absolute best" },
    { value: "custom", label: "Custom Budget", desc: "Enter your exact limit" }
  ]},
  { id: "brand_and_search", title: "Search or Select Brand", options: [] }, // Handled dynamically
  { id: "screenSize", title: "Preferred Screen Size?", options: [
    { value: "compact", label: "Compact", desc: "Under 6.2 inches" },
    { value: "large", label: "Large", desc: "6.5 inches and above" },
    { value: "any", label: "Any Size", desc: "Whatever fits best" }
  ]},
  { id: "upgradeCycle", title: "How often do you upgrade?", options: [
    { value: "yearly", label: "1-2 Years", desc: "I like having the latest tech" },
    { value: "keep", label: "3+ Years", desc: "I keep it until it breaks" }
  ]}
];

export default function PhoneAdvisorModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    priority: "", budget: "", brand: "", screenSize: "", upgradeCycle: ""
  });
  
  const [customBudgetValue, setCustomBudgetValue] = useState<string>("");
  const [showCustomBudgetInput, setShowCustomBudgetInput] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<RecommendedPhone[] | null>(null);

  // Dynamic Brands & Search
  const [brands, setBrands] = useState<{name: string, slug: string}[]>([]);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedSearches = localStorage.getItem("techtweak_recent_searches");
      if (savedSearches) return JSON.parse(savedSearches);
    }
    return [];
  });

  // Load state and brands
  useEffect(() => {
    if (isOpen) {

      // Fetch dynamic brands
      getAdvisorBrands().then(data => {
        if (data) setBrands(data);
      });
    }
  }, [isOpen]);

  const saveRecentSearch = (query: string) => {
    const term = query.trim();
    if (!term) return;
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("techtweak_recent_searches", JSON.stringify(updated));
  };

  const resetQuiz = () => {
    setAnswers({ priority: "", budget: "", brand: "", screenSize: "", upgradeCycle: "" });
    setStep(0);
    setResults(null);
    setCustomBudgetValue("");
    setShowCustomBudgetInput(false);
    setSearchQuery("");
  };

  const submitQuiz = async (finalAnswers: QuizAnswers) => {
    setIsLoading(true);
    setStep(STEPS.length); 
    
    try {
      const res = await getAdvisorRecommendations(finalAnswers);
      if (res.results) {
        setResults(res.results);
      }
    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (key: string, value: string) => {
    if (key === "budget" && value === "custom") {
      setShowCustomBudgetInput(true);
      return;
    }

    const updatedAnswers = { ...answers, [key]: value };
    setAnswers(updatedAnswers);

    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      submitQuiz(updatedAnswers);
    }
  };

  const handleCustomBudgetSubmit = () => {
    const num = parseInt(customBudgetValue);
    if (!isNaN(num) && num > 0) {
      const updated = { ...answers, budget: "custom", customBudget: num };
      setAnswers(updated);
      setStep(s => s + 1);
    }
  };

  const handleSpecificSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      saveRecentSearch(searchQuery);
      submitQuiz({ ...answers, searchQuery });
    }
  };

  const handleSurpriseMe = () => {
    submitQuiz({ ...answers, isSurpriseMe: true });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.98, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.98, opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 shrink-0">
            <div>
              <h2 className="font-bold text-slate-900 text-lg tracking-tight">Premium Advisor</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
            <AnimatePresence mode="wait">
              
              {/* QUIZ STEPS */}
              {step < STEPS.length && !isLoading && !results && (
                <motion.div 
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-xl mx-auto w-full"
                >
                  <div className="flex flex-col mb-10 text-center relative">
                    {step > 0 && (
                      <button 
                        onClick={() => setStep(s => s - 1)} 
                        className="absolute left-0 top-0 flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                    )}
                    <span className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Step {step + 1} of {STEPS.length}</span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-4">
                      {STEPS[step].title}
                    </h3>
                  </div>

                  {/* STANDARD STEPS (1, 2, 4, 5) */}
                  {step !== 2 && !showCustomBudgetInput && (
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                      {STEPS[step].options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSelect(STEPS[step].id, opt.value)}
                          className={`text-left p-6 rounded-xl border transition-all duration-200 ${
                            answers[STEPS[step].id as keyof QuizAnswers] === opt.value
                              ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900"
                              : "border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                          }`}
                        >
                          <span className="block font-bold text-slate-900 text-base mb-1">{opt.label}</span>
                          {opt.desc && <span className="block text-sm text-slate-500 leading-snug">{opt.desc}</span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* CUSTOM BUDGET INPUT UI */}
                  {step === 1 && showCustomBudgetInput && (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-full relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">$</span>
                        <input 
                          type="number" 
                          autoFocus
                          value={customBudgetValue}
                          onChange={(e) => setCustomBudgetValue(e.target.value)}
                          placeholder="e.g. 450"
                          className="w-full text-3xl font-black text-slate-900 py-6 pl-12 pr-6 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="flex w-full gap-3">
                        <button 
                          onClick={() => setShowCustomBudgetInput(false)}
                          className="flex-1 py-4 font-bold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                        >
                          Back
                        </button>
                        <button 
                          onClick={handleCustomBudgetSubmit}
                          disabled={!customBudgetValue}
                          className="flex-1 py-4 font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* BRAND & SEARCH STEP (Step 3) */}
                  {step === 2 && (
                    <div className="flex flex-col gap-8 w-full">
                      {/* Specific Phone Search */}
                      <form onSubmit={handleSpecificSearch} className="relative">
                        <input 
                          type="text" 
                          placeholder="Search for a specific phone..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full text-lg py-4 pl-5 pr-14 rounded-xl border border-slate-200 focus:border-slate-900 focus:outline-none transition-colors"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                          <Search size={18} />
                        </button>
                      </form>

                      {/* Recent Searches */}
                      {recentSearches.length > 0 && (
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Recent Searches</p>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.map(term => (
                              <button key={term} onClick={() => { setSearchQuery(term); submitQuiz({...answers, searchQuery: term}); }} className="text-sm px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="h-px bg-slate-100 w-full" />

                      {/* Dynamic Brands */}
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Or select a brand preference</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {brands.slice(0, showAllBrands ? brands.length : 6).map((brand) => (
                            <button
                              key={brand.slug}
                              onClick={() => handleSelect("brand", brand.name)}
                              className="py-4 px-3 text-center border border-slate-200 rounded-xl hover:border-slate-900 hover:bg-slate-50 transition-colors font-semibold text-slate-700"
                            >
                              {brand.name}
                            </button>
                          ))}
                          <button
                            onClick={() => handleSelect("brand", "any")}
                            className="py-4 px-3 text-center border border-slate-200 rounded-xl hover:border-slate-900 hover:bg-slate-50 transition-colors font-semibold text-slate-700"
                          >
                            Any Brand
                          </button>
                        </div>
                        
                        {!showAllBrands && brands.length > 6 && (
                          <button 
                            onClick={() => setShowAllBrands(true)}
                            className="mt-4 w-full py-3 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
                          >
                            View All Brands
                          </button>
                        )}
                      </div>

                      <div className="h-px bg-slate-100 w-full" />

                      {/* Surprise Me Action */}
                      <button 
                        onClick={handleSurpriseMe}
                        className="w-full py-5 rounded-xl border-2 border-slate-900 bg-slate-900 text-white font-bold hover:bg-slate-800 hover:border-slate-800 transition-colors flex items-center justify-center gap-2"
                      >
                        <Zap size={18} /> Surprise Me (Best Overall)
                      </button>

                    </div>
                  )}

                </motion.div>
              )}

              {/* LOADING STATE */}
              {isLoading && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <RefreshCw className="text-slate-900 animate-spin mb-6" size={32} />
                  <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Analyzing Data...</h3>
                  <p className="text-slate-500">Cross-referencing your criteria with our database.</p>
                </motion.div>
              )}

              {/* RESULTS STATE */}
              {results && !isLoading && (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="text-center mb-10">
                    <CheckCircle2 size={40} className="text-slate-900 mx-auto mb-4" />
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Your Recommendations</h3>
                  </div>

                  <div className="space-y-6">
                    {results.map((res, idx) => (
                      <Link href={`/phones/${res.brandSlug || 'unknown'}/${res.slug}`} key={res.id} onClick={onClose} className="block group">
                        <div className={`bg-white rounded-2xl p-6 border transition-all hover:shadow-lg ${idx === 0 ? 'border-slate-900 ring-1 ring-slate-900 shadow-md' : 'border-slate-200'}`}>
                          
                          <div className="flex flex-col sm:flex-row gap-6">
                            {/* Image Placeholder/Container */}
                            <div className="w-24 h-32 relative bg-slate-50 rounded-xl shrink-0 p-2 flex items-center justify-center border border-slate-100 overflow-hidden">
                              {res.image ? (
                                <Image src={res.image || "/phone-placeholder.webp"} alt={res.name} fill sizes="96px" className="object-contain mix-blend-multiply" />
                              ) : <span className="text-slate-300">No Img</span>}
                            </div>

                            <div className="flex-1 w-full">
                              <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                                <div>
                                  <div className="inline-block px-2.5 py-1 mb-2 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-md">
                                    {res.role}
                                  </div>
                                  <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{res.name}</h4>
                                  <p className="text-sm font-semibold text-slate-500 mt-1">{res.brand}</p>
                                </div>
                                <div className="text-right">
                                  <span className="block text-xl font-black text-slate-900">{res.price}</span>
                                  {res.score > 0 && <span className="block text-sm font-bold text-green-600">{res.score}% Match</span>}
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Why this phone?</p>
                                  <p className="text-sm text-slate-700 leading-relaxed">{res.reason}</p>
                                </div>
                                {res.comparisonReason && (
                                  <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Why it ranked here?</p>
                                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">{res.comparisonReason}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="hidden sm:flex items-center justify-center w-8 shrink-0 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all">
                              <ChevronRight size={24} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {results.length > 1 && (
                      <Link 
                        href={`/compare?phones=${results.map(r => r.id).join(",")}`}
                        onClick={onClose}
                        className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors text-center"
                      >
                        Compare Selected
                      </Link>
                    )}
                    <button 
                      onClick={resetQuiz}
                      className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors text-center"
                    >
                      Start Over
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
          
          {/* Progress Bar */}
          {!results && !isLoading && (
            <div className="h-1 w-full bg-slate-100 shrink-0">
              <div 
                className="h-full bg-slate-900 transition-all duration-300 ease-out"
                style={{ width: `${((step) / STEPS.length) * 100}%` }}
              />
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
