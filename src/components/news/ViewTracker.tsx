"use client";

import { useEffect } from "react";

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // Fire and forget view increment
    if (slug) {
      fetch('/api/news/view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      }).catch(err => console.error("View tracking failed", err));
    }
  }, [slug]);

  return null;
}
