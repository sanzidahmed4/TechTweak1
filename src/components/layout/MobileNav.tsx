"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Smartphone, Search, Scale, UserCircle } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Phones", href: "/phones", icon: Smartphone },
    { name: "Search", href: "/search", icon: Search },
    { name: "Compare", href: "/compare", icon: Scale },
    { name: "Admin", href: "/admin", icon: UserCircle },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/50 flex justify-around items-center p-3 sm:hidden z-50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link 
            key={item.name} 
            href={item.href}
            className={`flex flex-col items-center gap-1 min-w-[60px] ${isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"}`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${isActive ? "bg-primary/10" : ""}`}>
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] font-bold ${isActive ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
