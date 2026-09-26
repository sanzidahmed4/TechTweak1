"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Smartphone, 
  Building2, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  FolderTree, 
  Sparkles, 
  LineChart, 
  Share2, 
  Users, 
  MessageSquare,
  MoreVertical,
  X
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "AI Advisor", href: "/admin/advisor", icon: Sparkles },
    { name: "Phones", href: "/admin/phones", icon: Smartphone },
    { name: "Brands", href: "/admin/brands", icon: Building2 },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Subscribers", href: "/admin/subscribers", icon: Users },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Media", href: "/admin/media", icon: ImageIcon },
    { name: "SEO Hub", href: "/admin/seo", icon: LineChart },
    { name: "— Keywords", href: "/admin/seo/keywords", icon: FileText, isSubItem: true },
    { name: "— OG Manager", href: "/admin/seo/og-manager", icon: ImageIcon, isSubItem: true },
    { name: "— Content", href: "/admin/seo/content", icon: FileText, isSubItem: true },
    { name: "— Internal Links", href: "/admin/seo/internal-links", icon: FileText, isSubItem: true },
    { name: "— Technical", href: "/admin/seo/technical", icon: FileText, isSubItem: true },
    { name: "— Search Performance", href: "/admin/seo/performance", icon: LineChart, isSubItem: true },
    { name: "— Authority & Links", href: "/admin/seo/authority", icon: Share2, isSubItem: true },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const renderNavLinks = (onItemClick?: () => void) => (
    <nav className="p-4 space-y-1">
      {navItems.map((item) => {
        const isActive = item.href === "/admin" 
          ? pathname === "/admin"
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onItemClick}
            className={`flex items-center gap-3 py-3 rounded-xl transition-colors font-medium ${
              item.isSubItem ? "px-8 text-[13px]" : "px-4 text-sm"
            } ${
              isActive 
                ? (item.isSubItem ? "text-primary font-bold" : "bg-primary text-white shadow-md shadow-primary/20") 
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            {!item.isSubItem && <item.icon size={18} />}
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile Top Navbar (visible only on small screens < md) */}
      <header className="md:hidden sticky top-0 z-30 w-full bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between text-white shadow-md">
        <Link href="/admin" className="text-lg font-bold flex items-center gap-2">
          <div className="bg-primary/20 p-1.5 rounded-lg text-primary">
            <Settings size={18} />
          </div>
          <span>TechTweak Admin</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -mr-1 text-slate-300 hover:text-white hover:bg-slate-800 active:bg-slate-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 flex items-center gap-1.5"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <MoreVertical size={22} />
        </button>
      </header>

      {/* Mobile Backdrop & Slide-Over Drawer (< md) */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Menu */}
          <aside 
            role="dialog" 
            aria-modal="true" 
            aria-label="Admin Navigation"
            className="relative w-72 max-w-[85vw] bg-slate-900 text-slate-300 h-full flex flex-col shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <Link 
                href="/admin" 
                onClick={() => setIsOpen(false)}
                className="text-base font-bold text-white flex items-center gap-2"
              >
                <div className="bg-primary/20 p-1.5 rounded-lg text-primary">
                  <Settings size={18} />
                </div>
                <span>TechTweak Admin</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {renderNavLinks(() => setIsOpen(false))}
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Persistent Sidebar (>= md) */}
      <aside className="hidden md:flex md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 md:h-screen md:overflow-y-auto flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="text-xl font-bold text-white flex items-center gap-2">
            <div className="bg-primary/20 p-1.5 rounded-lg text-primary">
              <Settings size={20} />
            </div>
            TechTweak Admin
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          {renderNavLinks()}
        </div>
      </aside>
    </>
  );
}
