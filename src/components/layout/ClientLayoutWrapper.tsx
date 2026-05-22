"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthOrAdmin = pathname?.startsWith("/login") || pathname?.startsWith("/admin");

  return (
    <>
      {!isAuthOrAdmin && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAuthOrAdmin && <Footer />}
      {!isAuthOrAdmin && <MobileNav />}
    </>
  );
}
