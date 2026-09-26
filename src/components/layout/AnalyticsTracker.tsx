"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    if (typeof window !== "undefined" && navigator.webdriver) return;

    const fullPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Deduplicate within the current browser tab session
    try {
      const cacheKey = `tt_pv_${fullPath}`;
      if (sessionStorage.getItem(cacheKey)) return;
      sessionStorage.setItem(cacheKey, "1");
    } catch {
      // Ignore storage errors in private browsing
    }

    // Determine type and entity ID if possible from the URL
    // e.g. /phones/samsung/galaxy-s24-ultra
    let type = 'page_view';
    
    if (pathname.startsWith('/phones/') && pathname.split('/').length > 3) {
      type = 'phone_view';
    } else if (pathname.startsWith('/news/')) {
      type = 'article_view';
    }

    // Ping the tracking API
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: fullPath,
        type,
      }),
      keepalive: true,
    }).catch(() => {
      // Ignore errors silently for analytics
    });

  }, [pathname, searchParams]);

  return null;
}
