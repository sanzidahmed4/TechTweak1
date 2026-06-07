"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Smartphone, Search, Scale, Menu, X } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Listen for state changes from the main Navbar to sync the Menu/X icon
    const handleMenuState = (e: any) => setIsMenuOpen(e.detail);
    window.addEventListener("mobile-menu-state-change", handleMenuState);
    return () => window.removeEventListener("mobile-menu-state-change", handleMenuState);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Phones", href: "/phones", icon: Smartphone },
    { name: "Compare", href: "/compare", icon: Scale },
  ];

  return (
    <div 
      className={`fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-200 z-50 safe-area-pb shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-transform duration-300 ease-in-out sm:hidden ${
        isVisible ? "translate-y-0" : "translate-y-[150%]"
      }`}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 p-2 w-full min-h-[44px] transition-colors ${
                active ? "text-primary" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <item.icon size={22} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
        
        {/* Menu Toggle Button */}
        <button
          onClick={() => window.dispatchEvent(new Event("toggle-mobile-menu"))}
          className={`flex flex-col items-center justify-center gap-1 p-2 w-full min-h-[44px] transition-colors ${
            isMenuOpen ? "text-primary" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          {isMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2} />}
          <span className="text-[10px] font-medium">Menu</span>
        </button>
      </div>
    </div>
  );
}
