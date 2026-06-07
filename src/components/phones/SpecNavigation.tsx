"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "display", label: "Display" },
  { id: "performance", label: "Performance" },
  { id: "camera", label: "Camera" },
  { id: "battery", label: "Battery & Storage" },
  { id: "connectivity", label: "Connectivity" },
  { id: "features", label: "Features" },
  { id: "faq", label: "FAQ" }
];

export default function SpecNavigation() {
  const [activeSection, setActiveSection] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 120;
      window.scrollTo({
        top,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Search for the text within leaf elements (divs, spans, etc.)
    const elements = document.querySelectorAll("div, span, p, h2, h3, h4, li, td, th");
    let found = false;

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      // Check elements with text and minimal children to avoid large parent containers
      if (
        el.children.length === 0 && 
        el.textContent?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        // Exclude the search input itself or navbar elements if needed, but leaf nodes are usually safe
        if (el.tagName.toLowerCase() !== "script" && el.tagName.toLowerCase() !== "style") {
          const top = el.getBoundingClientRect().top + window.scrollY - 160; // offset for sticky nav
          window.scrollTo({ top, behavior: "smooth" });
          
          // Temporary highlight effect
          (el as HTMLElement).style.backgroundColor = "#fef08a"; // bg-yellow-200
          (el as HTMLElement).style.transition = "background-color 0.5s";
          (el as HTMLElement).style.borderRadius = "4px";
          (el as HTMLElement).style.padding = "2px 4px";
          (el as HTMLElement).style.margin = "-2px -4px";
          
          setTimeout(() => {
            (el as HTMLElement).style.backgroundColor = "transparent";
          }, 2000);
          
          found = true;
          break;
        }
      }
    }

    if (!found) {
      alert("Specification not found. Try a different keyword.");
    }
  };

  return (
    <div className="hidden md:block sticky top-[73px] z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm py-3 mb-10 overflow-x-auto scrollbar-none">
      <div className="container mx-auto px-4 lg:px-8 flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
        {/* Navigation Links */}
        <div className="flex justify-start items-center gap-1 sm:gap-2 min-w-max">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-white shadow-sm shadow-primary/25 scale-105"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="relative flex-1 w-full md:w-auto min-w-[200px] max-w-md md:ml-auto flex items-center">
          <input
            type="text"
            placeholder="Search specs (e.g. Battery, Storage)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-5 pr-12 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-slate-700 placeholder-slate-400"
          />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors p-1 cursor-pointer"
          >
            <Search size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
