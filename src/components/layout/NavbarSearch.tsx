"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, ChevronRight, Smartphone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavbarSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch logic
  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length < 2) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.phones || []);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter" && query.trim().length > 0) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Search Input */}
      <div 
        className="flex items-center bg-slate-100/80 rounded-full border border-slate-200/80 shadow-inner focus-within:bg-slate-100 focus-within:border-slate-300 transition-all duration-300 w-[200px] sm:w-72 md:w-96"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-xs sm:text-sm text-slate-900 py-2 sm:py-2.5 pl-3 sm:pl-4 pr-1 transition-all duration-300 w-full"
        />
        <div className="flex items-center pr-2 sm:pr-3">
          {query && isOpen && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }} 
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={14} />
            </button>
          )}
          <button 
            onClick={() => {
              if (query.trim().length > 0) {
                setIsOpen(false);
                router.push(`/search?q=${encodeURIComponent(query)}`);
              }
            }}
            className="p-1.5 sm:p-2 text-slate-500 hover:text-primary transition-colors cursor-pointer"
          >
            <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>
      </div>

      {/* Dropdown Results */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full right-0 mt-2 w-[calc(100vw-32px)] sm:w-[400px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-50">
          {isSearching ? (
            <div className="flex items-center justify-center py-10 text-slate-500">
              <Loader2 className="animate-spin mr-2" size={20} />
              <span className="text-sm font-medium">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Devices ({results.length})
              </div>
              <ul className="max-h-[350px] overflow-y-auto custom-scrollbar">
                {results.map((phone) => (
                  <li key={phone._id}>
                    <Link 
                      href={`/phones/${phone.brands?.slug || 'brand'}/${phone.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-10 h-14 bg-white border border-slate-100 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                        {phone.images && phone.images[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={phone.images[0]} alt={phone.name} className="w-full h-full object-cover" />
                        ) : (
                          <Smartphone size={16} className="text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-primary transition-colors">
                          {phone.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-semibold text-primary/80 uppercase">
                            {phone.brands?.name}
                          </span>
                          {phone.release_date && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                              <span className="text-xs text-slate-500">
                                {new Date(phone.release_date).getFullYear()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="p-3 border-t border-slate-50 bg-slate-50/50">
                <Link 
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-sm font-bold text-primary hover:text-blue-700 transition-colors"
                >
                  View all results
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-10 px-6 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={24} />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">No exact match found</h4>
              <p className="text-sm text-slate-500 mb-6">We couldn&apos;t find any phone matching &quot;{query}&quot;.</p>
              <Link 
                href="/search"
                onClick={() => setIsOpen(false)}
                className="inline-block bg-slate-900 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-slate-800 transition-colors shadow-md"
              >
                Open Advanced Search
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
