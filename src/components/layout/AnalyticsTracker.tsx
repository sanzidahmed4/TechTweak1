"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

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
        path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
        type,
      }),
      // Use keepalive so the request completes even if the user navigates away
      keepalive: true,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    }).catch(e => {
      // Ignore errors silently for analytics
    });

  }, [pathname, searchParams]);

  return null;
}
