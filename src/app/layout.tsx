import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import { GoogleAnalytics } from "@next/third-parties/google";
import AnalyticsTracker from "@/components/layout/AnalyticsTracker";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        url: "/sitelogo.svg",
        width: 1200,
        height: 630,
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
    images: ["/sitelogo.svg"],
  },
  appleWebApp: {
    capable: true,
    title: "TechTweak",
    statusBarStyle: "default",
  },
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
        <SpeedInsights />
      </body>
    </html>
  );
}
