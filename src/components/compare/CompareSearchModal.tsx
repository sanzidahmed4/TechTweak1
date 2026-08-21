"use client";

import { useState, useEffect } from "react";
import { searchPhonesForCompare } from "@/app/compare/actions";
import { X, Search, Smartphone, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CompareSearchModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!query) {
      return;
    }
    
    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      const data = await searchPhonesForCompare(query);
      setResults(data || []);
      setIsLoading(false);
    }, 400); // 400ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (slug: string) => {
    const currentPhones = searchParams.get("phones") ? searchParams.get("phones")?.split(',') : [];
    if (currentPhones && currentPhones.length >= 4) {
      alert("You can only compare up to 4 phones.");
      return;
    }
    
    if (currentPhones?.includes(slug)) {
      onClose();
      return;
    }

    const newPhones = [...(currentPhones || []), slug].join(',');
    router.push(`/compare?phones=${newPhones}`);
    onClose();
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search size={20} className="text-slate-400 ml-2" />
          <input 
            autoFocus
            type="text" 
            placeholder="Type a phone model to add (e.g. Galaxy S24)" 
            className="flex-1 bg-transparent text-lg outline-none text-slate-900 placeholder:text-slate-400"
            value={query}
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              if (!val) setResults([]);
            }}
          />
          {isLoading && <Loader2 size={20} className="text-primary animate-spin" />}
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto">
          {query.length > 0 && results.length === 0 && !isLoading && (
            <div className="p-8 text-center text-slate-500">No phones found matching &quot;{query}&quot;</div>
          )}
          
          {results.length > 0 && (
            <ul className="divide-y divide-slate-100 p-2">
              {results.map((phone) => (
                <li key={phone.id}>
                  <button 
                    onClick={() => handleSelect(phone.slug)}
                    className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors text-left group"
                  >
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      {phone.images && phone.images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={phone.images[0]} alt={phone.name} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <Smartphone size={20} className="text-slate-300" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-primary uppercase mb-0.5">{phone.brands?.name}</div>
                      <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">{phone.name}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
          
          {query.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              <Smartphone size={40} className="mx-auto mb-4 text-slate-300" strokeWidth={1} />
              <p>Start typing to search our database of smartphones.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
