import Link from "next/link";
import { Search, Home, Map } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-400 mb-8 shadow-inner shadow-slate-200/50">
        <Map size={48} strokeWidth={1.5} />
      </div>
      <h1 className="text-8xl font-black text-slate-900 tracking-tighter mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-700 mb-4 tracking-tight">Dead End Reached</h2>
      <p className="text-slate-500 max-w-md text-center mb-10 text-lg leading-relaxed">
        The device, article, or page you're searching for has been discontinued or moved to a different url.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link 
          href="/" 
          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 hover:scale-105"
        >
          <Home size={18} /> Return Home
        </Link>
        <Link 
          href="/search" 
          className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-900 border border-slate-200 font-bold py-4 rounded-2xl hover:bg-slate-50 transition-all shadow-sm hover:border-primary/50"
        >
          <Search size={18} /> Advanced Search
        </Link>
      </div>
    </div>
  );
}
