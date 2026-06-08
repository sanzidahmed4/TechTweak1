"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Smartphone, Building2, FileText, Image as ImageIcon, Settings, FolderTree, Sparkles, LineChart, Share2 } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "AI Advisor", href: "/admin/advisor", icon: Sparkles },
    { name: "Phones", href: "/admin/phones", icon: Smartphone },
    { name: "Brands", href: "/admin/brands", icon: Building2 },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
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

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 md:h-screen md:overflow-y-auto flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <Link href="/admin" className="text-xl font-bold text-white flex items-center gap-2">
          <div className="bg-primary/20 p-1.5 rounded-lg text-primary">
            <Settings size={20} />
          </div>
          TechTweak Admin
        </Link>
      </div>
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          // Check if current path matches item.href exactly, or starts with item.href/ (for subpages)
          // Exception: Dashboard is just /admin, so we need exact match for it to avoid highlighting Dashboard on every /admin/something page
          const isActive = item.href === "/admin" 
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
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
    </aside>
  );
}
