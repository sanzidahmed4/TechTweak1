"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Smartphone size={24} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
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

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {mobileNavLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-base font-medium p-2 rounded-lg transition-colors ${
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
              <NavbarSearch />
              <Link
                href="/compare"
                className="bg-primary/10 text-primary font-medium text-center py-3 rounded-xl mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Compare Phones
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
