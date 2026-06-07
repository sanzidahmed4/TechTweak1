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
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4 lg:gap-8">
            <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
              <div className="relative w-8 h-8 md:w-10 md:h-10">
                <Image src="/sitelogo.svg" alt="TechTweak Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-xl md:text-2xl tracking-tight text-slate-900 hidden sm:block">
                Tech<span className="text-primary">Tweak</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center gap-1 flex-1 px-4 max-w-2xl">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 lg:px-5 py-2.5 rounded-full text-sm lg:text-base font-semibold transition-all smooth-transition ${
                      active
                        ? "text-primary bg-primary/10 shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <CategoriesDropdown />
            </nav>

            <div className="flex items-center gap-3 lg:gap-4 shrink-0">
              <NavbarSearch />
            </div>
          </div>
        </div>

        {/* Top Mobile Dropdown Menu (Overlay) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100 overflow-hidden bg-white/95 backdrop-blur-xl absolute top-full left-0 w-full shadow-xl"
            >
              <div className="p-4 flex flex-col gap-2 max-h-[calc(100vh-64px)] overflow-y-auto">
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
    </>
  );
}
