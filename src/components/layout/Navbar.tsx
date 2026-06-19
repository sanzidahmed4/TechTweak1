"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import NavbarSearch from "./NavbarSearch";
import CategoriesDropdown from "./CategoriesDropdown";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Phones", href: "/phones" },
  { name: "Compare", href: "/compare" },
  { name: "News", href: "/news" },
];

const mobileNavLinks = [
  { name: "Home", href: "/" },
  { name: "Phones", href: "/phones" },
  { name: "Compare", href: "/compare" },
  { name: "News", href: "/news" },
  { name: "Categories", href: "/phones" },
  { name: "Advanced Search", href: "/search" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync mobile menu state changes with other components (like MobileNav)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("mobile-menu-state-change", { detail: mobileMenuOpen }));
  }, [mobileMenuOpen]);

  // Listen for toggle commands from other components
  useEffect(() => {
    const handleToggle = () => setMobileMenuOpen((prev) => !prev);
    window.addEventListener("toggle-mobile-menu", handleToggle);
    return () => window.removeEventListener("toggle-mobile-menu", handleToggle);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-slate-200" : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-4 lg:gap-8">
            <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
              <div className="relative w-8 h-8 md:w-10 md:h-10">
                <Image src="/sitelogo.svg" alt="TechTweak Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-xl md:text-2xl tracking-tight text-slate-900 hidden sm:block">
                Tech<span className="text-primary">Tweak</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-8 px-2 lg:px-4 flex-1 justify-center max-w-2xl">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm lg:text-base font-medium transition-colors relative group ${
                      active ? "text-primary font-semibold" : "text-slate-600 hover:text-primary"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
              <CategoriesDropdown />
            </nav>

            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
              <NavbarSearch />
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right-Side Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] md:hidden"
              />
              
              {/* Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-[100dvh] w-4/5 max-w-[320px] bg-white z-[70] shadow-2xl flex flex-col md:hidden"
              >
                {/* Drawer Header */}
                <div className="p-4 flex items-center justify-between border-b border-slate-100">
                  <span className="font-bold text-lg text-slate-900">Menu</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 -mr-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="p-4 flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar">
                  {mobileNavLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`text-lg font-medium p-3 rounded-xl transition-colors ${
                          active
                            ? "text-primary bg-primary/5 font-semibold"
                            : "text-slate-700 hover:text-primary hover:bg-slate-50"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
