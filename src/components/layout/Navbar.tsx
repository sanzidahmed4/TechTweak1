"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Smartphone, Home, Scale, Search } from "lucide-react";
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
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Active check: exact match for "/", startsWith for others
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isCategoryOpen
            ? isScrolled
              ? "bg-white border-b border-slate-200/50 shadow-sm py-3"
              : "bg-white py-5"
            : isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm py-3"
            : "bg-white/95 backdrop-blur-md py-5"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image src="/sitelogo.svg" alt="TechTweak Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-xl md:text-2xl tracking-tight text-slate-900 hidden sm:block">
              Tech<span className="text-primary">Tweak</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    active ? "text-primary" : "text-slate-600 hover:text-primary"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}

            {/* Categories Dropdown */}
            <CategoriesDropdown isScrolled={isScrolled} onOpenChange={setIsCategoryOpen} />
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <NavbarSearch />
            <Link
              href="/compare"
              className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
            >
              Compare Phones
            </Link>
          </div>
          
          {/* Mobile Right Spacer (to balance logo when centered) or empty block */}
          <div className="md:hidden w-8 h-8"></div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl overflow-hidden absolute top-full left-0 w-full"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
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
                <div className="h-px bg-slate-100 my-2" />
                <div className="px-2">
                  <NavbarSearch />
                </div>
                <Link
                  href="/compare"
                  className="bg-primary text-white font-medium text-center py-4 rounded-xl mt-2 shadow-md shadow-primary/20 min-h-[44px]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Compare Phones
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Sticky Bottom Nav Bar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 safe-area-pb">
        <div className="flex items-center justify-around px-2 py-2">
          {[
            { name: "Home", href: "/", icon: Home },
            { name: "Phones", href: "/phones", icon: Smartphone },
            { name: "Compare", href: "/compare", icon: Scale },
            { name: "Search", href: "/search", icon: Search },
          ].map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 p-2 w-full min-h-[44px] transition-colors ${
                  active ? "text-primary" : "text-slate-500 hover:text-slate-800"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={22} strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex flex-col items-center justify-center gap-1 p-2 w-full min-h-[44px] transition-colors ${
              mobileMenuOpen ? "text-primary" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2} />}
            <span className="text-[10px] font-medium">Menu</span>
          </button>
        </div>
      </nav>
    </>
  );
}
