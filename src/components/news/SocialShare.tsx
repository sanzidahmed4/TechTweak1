"use client";

import { Link2 } from "lucide-react";
import { useState } from "react";

interface Props {
  url: string;
  title: string;
}

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function SocialShare({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:bg-blue-600 hover:text-white text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      name: "X",
      icon: <XIcon />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "hover:bg-slate-900 hover:text-white text-slate-900 bg-slate-100 border-slate-200",
    },
    {
      name: "LinkedIn",
      icon: <LinkedinIcon />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:bg-blue-700 hover:text-white text-blue-700 bg-blue-50 border-blue-200",
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-500 mr-1 uppercase tracking-wider">Share</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.name}`}
          className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${link.color}`}
        >
          {link.icon}
        </a>
      ))}
      <button
        onClick={handleCopyLink}
        aria-label="Copy link"
        className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-300 relative"
      >
        <Link2 size={14} />
        {copied && (
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded font-medium whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
