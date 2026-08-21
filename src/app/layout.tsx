import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import { GoogleAnalytics } from "@next/third-parties/google";
import AnalyticsTracker from "@/components/layout/AnalyticsTracker";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TechTweak | Premium Smartphone Reviews & Comparisons",
  description: "Discover the ultimate tech resource for smartphone reviews, detailed specifications, and side-by-side comparisons.",
  keywords: "smartphones, tech reviews, phone comparisons, specifications, tech news",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.techtweak.tech"),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: "TechTweak | The Future of Tech Media",
    description: "In-depth smartphone analysis, news, and guides.",
    url: "/",
    siteName: "TechTweak",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "TechTweak Logo",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechTweak | Premium Smartphone Reviews",
    description: "Discover the ultimate tech resource for smartphone reviews and side-by-side comparisons.",
    images: ["/icon-512x512.png"],
  },
  appleWebApp: {
    capable: true,
    title: "TechTweak",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/sitelogo.svg", type: "image/svg+xml" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col font-sans pb-[70px] sm:pb-0`}>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
      </body>
    </html>
  );
}
