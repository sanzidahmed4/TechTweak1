import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle, Share2 } from "lucide-react";

const FacebookIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 lg:gap-12">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image src="/sitelogo.svg" alt="TechTweak Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900">
                Tech<span className="text-primary">Tweak</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your ultimate destination for premium smartphone reviews, detailed specifications, and the latest technology news. We help you make the right choice.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { Icon: FacebookIcon, href: "https://www.facebook.com/profile.php?id=61590823097198", target: "_blank", rel: "noopener noreferrer" },
                { Icon: Mail, href: "mailto:contact@techtweak.tech" },
                { Icon: MessageCircle, href: "#" },
                { Icon: Share2, href: "#" }
              ].map(({ Icon, href, target, rel }, i) => (
                <a key={i} href={href} target={target} rel={rel} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1877F2] hover:border-[#1877F2]/30 hover:shadow-md transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 border-r border-slate-200/80 pr-4 lg:border-none lg:pr-0">
            <h3 className="font-semibold text-slate-900 mb-6 uppercase tracking-wider text-sm">Explore</h3>
            <ul className="space-y-4">
              {[
                { name: "All Phones", href: "/phones" },
                { name: "Compare Devices", href: "/compare" },
                { name: "Upcoming Phones", href: "/upcoming-phones" },
                { name: "Tech News", href: "/news" },
                { name: "Best Phones 2026", href: "/best" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-500 hover:text-primary text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Brands */}
          <div className="col-span-1 pl-2 lg:pl-0">
            <h3 className="font-semibold text-slate-900 mb-6 uppercase tracking-wider text-sm">Top Brands</h3>
            <ul className="space-y-4">
              {["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"].map((brand) => (
                <li key={brand}>
                  <Link href={`/phones/${brand.toLowerCase()}`} className="text-slate-500 hover:text-primary text-sm transition-colors">
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-slate-900 mb-6 uppercase tracking-wider text-sm">Stay Updated</h3>
            <p className="text-slate-500 text-sm mb-4">
              Get the latest tech news and smartphone reviews delivered to your inbox.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button type="button" className="w-full bg-primary text-white font-medium py-3 rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:bg-primary/90 transition-all text-sm">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} TechTweak. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-slate-400 hover:text-slate-600 text-sm">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-slate-400 hover:text-slate-600 text-sm">Terms of Service</Link>
            <Link href="/contact" className="text-slate-400 hover:text-slate-600 text-sm">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
