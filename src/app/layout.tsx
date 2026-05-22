import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TechTweak | Premium Smartphone Reviews & Comparisons",
  description: "Discover the ultimate tech resource for smartphone reviews, detailed specifications, and side-by-side comparisons.",
  keywords: "smartphones, tech reviews, phone comparisons, specifications, tech news",
  manifest: "/manifest.json",
  openGraph: {
    title: "TechTweak | The Future of Tech Media",
    description: "In-depth smartphone analysis, news, and guides.",
    type: "website",
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
      </body>
    </html>
  );
}
