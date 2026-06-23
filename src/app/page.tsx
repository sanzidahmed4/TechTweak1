import Hero from "@/components/home/Hero";
import AdSlot from "@/components/ads/AdSlot";
import Link from "next/link";
import Image from "next/image";
import { FALLBACK_IMAGE, getCloudinaryBlurUrl, defaultBlurDataURL } from '@/lib/utils/image';
import { ArrowRight, Cpu, Battery, Camera, Zap, CheckCircle2, Smartphone, FileText } from "lucide-react";
import connectToDatabase from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/Post";
import "@/lib/models/Category";
import dynamic from 'next/dynamic';

import AIRecommendation from "@/components/phones/AIRecommendation";
import type { PhoneData } from "@/components/phones/PhonesClientPage";
import { getFeaturedPhones, getUpcomingPhones } from "@/lib/services/phoneService";

// Dynamic imports for heavy components
const TrendingCarousel = dynamic(() => import('@/components/home/TrendingCarousel'), { ssr: true });
const UpcomingCarousel = dynamic(() => import('@/components/home/UpcomingCarousel'), { ssr: true });

export const revalidate = 1800; // ISR (30 minutes)

// --- DTO Interfaces ---
interface IBrandSummary {
  name: string;
  slug: string;
}

export interface IPhoneSummary {
  id: string;
  name: string;
  slug: string;
  brands: IBrandSummary;
  price_usd: number;
  images: string[];
  price_display_text?: string;
  phone_status?: string;
  expected_launch_date?: string;
  leak_confidence?: string;
}

interface ICategorySummary {
  name: string;
}

export interface IArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  categories: ICategorySummary;
}

// --- Raw DB Types ---
type RawPhone = {
  _id: { toString(): string };
  name: string;
  slug: string;
  brand_id?: IBrandSummary;
  price_usd: number;
  price_bdt?: number;
  images: string[];
  price_display_text?: string;
  phone_status?: string;
  expected_launch_date?: string;
  leak_confidence?: string;
  display?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  camera_main?: string;
  battery?: string;
  network?: string;
  is_featured?: boolean;
  release_date?: string;
  antutu_score?: number;
};

type RawPost = {
  _id: { toString(): string };
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  category_id?: ICategorySummary;
};

export default async function Home() {
  await connectToDatabase();
  
  let featuredPhones: IPhoneSummary[] = [];
  let upcomingPhones: IPhoneSummary[] = [];
  let latestArticles: IArticleSummary[] = [];
  let aiPhones: PhoneData[] = [];
  
  try {
    const rawPhones = await getFeaturedPhones(50) as RawPhone[];
      
    featuredPhones = rawPhones.slice(0, 10).map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      brands: { name: p.brand_id?.name || 'Unknown', slug: p.brand_id?.slug || 'unknown' },
      price_usd: p.price_usd || 0,
      images: p.images || [],
      price_display_text: p.price_display_text,
      phone_status: p.phone_status,
      expected_launch_date: p.expected_launch_date,
      leak_confidence: p.leak_confidence
    }));

    const rawUpcoming = await getUpcomingPhones(10) as RawPhone[];
      
    aiPhones = [...rawPhones, ...rawUpcoming].map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      brand: { name: p.brand_id?.name || "Unknown", slug: p.brand_id?.slug || "" },
      category: { name: p.category_id?.name || "", slug: p.category_id?.slug || "" },
      display: p.display || null,
      processor: p.processor || null,
      ram: p.ram || null,
      storage: p.storage || null,
      camera_main: p.camera_main || null,
      battery: p.battery || null,
      network: p.network || null,
      price_usd: p.price_usd || null,
      price_bdt: p.price_bdt || null,
      images: p.images || [],
      is_featured: p.is_featured || false,
      release_date: p.release_date || null,
      antutu_score: p.antutu_score || null,
      phone_status: p.phone_status || 'released'
    }));
      
    upcomingPhones = rawUpcoming.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      brands: { name: p.brand_id?.name || 'Unknown', slug: p.brand_id?.slug || 'unknown' },
      price_usd: p.price_usd || 0,
      images: p.images || [],
      price_display_text: p.price_display_text,
      phone_status: p.phone_status,
      expected_launch_date: p.expected_launch_date,
      leak_confidence: p.leak_confidence
    }));

    const rawPosts = (await Post.find({ is_published: true })
      .populate('category_id', 'name')
      .sort({ created_at: -1 })
      .limit(3)
      .lean()) as any /* eslint-disable-line @typescript-eslint/no-explicit-any */ as RawPost[];
      
    latestArticles = rawPosts.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      featured_image: p.featured_image || "",
      categories: { name: p.category_id?.name || 'Uncategorized' }
    }));
  } catch (error) {
    console.error("MongoDB not connected or error fetching", error);
  }

  // Remove demo content fallbacks

  return (
    <>
      <Hero />
      
      {/* Global JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://www.techtweak.tech/#organization",
                "name": "TechTweak",
                "url": "https://www.techtweak.tech",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.techtweak.tech/icon.png"
                },
                "sameAs": [
                  "https://www.facebook.com/profile.php?id=61590823097198",
                  "https://twitter.com/techtweak",
                  "https://youtube.com/techtweak"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.techtweak.tech/#website",
                "url": "https://www.techtweak.tech",
                "name": "TechTweak",
                "publisher": {
                  "@id": "https://www.techtweak.tech/#organization"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "SearchAction",
                "target": "https://www.techtweak.tech/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            ]
          })
        }}
      />

      {/* Upcoming Phones Section */}
      {upcomingPhones.length > 0 && (
        <section className="pt-8 pb-16 bg-white border-b border-slate-200/60 overflow-hidden relative">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-10 sm:mb-14">
              <div className="flex items-center justify-between gap-4 mb-2 sm:mb-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Upcoming Phones</h2>
                <Link href="/upcoming-phones" className="text-xs sm:text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors whitespace-nowrap shrink-0">
                  View All →
                </Link>
              </div>
              <p className="text-slate-500 text-sm sm:text-base lg:text-lg max-w-2xl">Get an exclusive look at the future of mobile technology before it launches.</p>
            </div>
            
            <UpcomingCarousel phones={upcomingPhones} />
          </div>
        </section>
      )}

      {/* Animated Trending Phones Carousel */}
      <section className="pt-12 pb-20 bg-slate-50 border-b border-slate-200/60 overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 sm:mb-14">
            <div className="flex items-center justify-between gap-4 mb-2 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Trending Right Now</h2>
              <Link href="/phones" className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0">
                View All →
              </Link>
            </div>
            <p className="text-slate-500 text-sm sm:text-base lg:text-lg max-w-2xl">Discover the most sought-after devices currently dominating the market charts.</p>
          </div>
          
          {featuredPhones.length > 0 ? (
            <TrendingCarousel phones={featuredPhones} />
          ) : (
            <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 shadow-sm">
              <Smartphone size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Phones Available</h3>
              <p className="text-slate-500">We are updating our catalog. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Recommendation Section */}
      <AIRecommendation phones={aiPhones} />

      {/* Premium Comparison CTA */}
      <section className="py-12 lg:py-24 relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2000')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-bold tracking-widest uppercase text-xs lg:text-sm mb-3 lg:mb-4 block">Ultimate Tech Engine</span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-4 lg:mb-6 tracking-tight text-white">Torn Between Flagships?</h2>
            <p className="text-sm sm:text-base lg:text-xl text-slate-300 mb-8 lg:mb-10 leading-relaxed">
              Use our advanced comparison engine to map over 50 data points side-by-side. From sensor sizes to AnTuTu benchmarks, make the right choice instantly.
            </p>
            <Link href="/compare" className="inline-flex items-center gap-2 lg:gap-3 bg-white text-slate-900 font-bold px-6 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] smooth-transition text-sm sm:text-base lg:text-lg">
              Start Comparing <Zap size={20} className="text-primary w-4 h-4 lg:w-5 lg:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Chipset / Specs Showcase */}
      <section className="py-12 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-2 lg:mb-4 tracking-tight">The Anatomy of a Flagship</h2>
            <p className="text-slate-500 text-sm sm:text-base lg:text-lg">What makes a phone truly premium? We analyze every critical component.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            <div className="bg-slate-50 p-5 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-100 hover:border-primary/30 hover:shadow-xl smooth-transition group flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="w-12 h-12 lg:w-16 lg:h-16 shrink-0 bg-blue-100 text-blue-600 rounded-xl lg:rounded-2xl flex items-center justify-center lg:mb-6 group-hover:scale-110 smooth-transition">
                <Cpu className="w-6 h-6 lg:w-8 lg:h-8" />
              </div>
              <div className="text-left">
                <h3 className="text-base lg:text-xl font-bold text-slate-900 mb-1 lg:mb-3 leading-tight">Next-Gen Silicon</h3>
                <p className="text-xs lg:text-base text-slate-500 leading-snug lg:leading-normal">We track the latest 3nm architectures from Snapdragon, Apple Silicon, and MediaTek.</p>
              </div>
            </div>
            
            <div className="bg-slate-50 p-5 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-100 hover:border-primary/30 hover:shadow-xl smooth-transition group flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="w-12 h-12 lg:w-16 lg:h-16 shrink-0 bg-purple-100 text-purple-600 rounded-xl lg:rounded-2xl flex items-center justify-center lg:mb-6 group-hover:scale-110 smooth-transition">
                <Camera className="w-6 h-6 lg:w-8 lg:h-8" />
              </div>
              <div className="text-left">
                <h3 className="text-base lg:text-xl font-bold text-slate-900 mb-1 lg:mb-3 leading-tight">Computational Photo</h3>
                <p className="text-xs lg:text-base text-slate-500 leading-snug lg:leading-normal">In-depth sensor analysis, 1-inch optics, and periscope zoom capabilities.</p>
              </div>
            </div>
            
            <div className="bg-slate-50 p-5 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-100 hover:border-primary/30 hover:shadow-xl smooth-transition group flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="w-12 h-12 lg:w-16 lg:h-16 shrink-0 bg-green-100 text-green-600 rounded-xl lg:rounded-2xl flex items-center justify-center lg:mb-6 group-hover:scale-110 smooth-transition">
                <Battery className="w-6 h-6 lg:w-8 lg:h-8" />
              </div>
              <div className="text-left">
                <h3 className="text-base lg:text-xl font-bold text-slate-900 mb-1 lg:mb-3 leading-tight">Endurance Metrics</h3>
                <p className="text-xs lg:text-base text-slate-500 leading-snug lg:leading-normal">Real-world active use tests, screen-on times, and ultra-fast charging speeds.</p>
              </div>
            </div>
            
            <div className="bg-slate-50 p-5 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-100 hover:border-primary/30 hover:shadow-xl smooth-transition group flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="w-12 h-12 lg:w-16 lg:h-16 shrink-0 bg-orange-100 text-orange-600 rounded-xl lg:rounded-2xl flex items-center justify-center lg:mb-6 group-hover:scale-110 smooth-transition">
                <CheckCircle2 className="w-6 h-6 lg:w-8 lg:h-8" />
              </div>
              <div className="text-left">
                <h3 className="text-base lg:text-xl font-bold text-slate-900 mb-1 lg:mb-3 leading-tight">Editor&apos;s Verification</h3>
                <p className="text-xs lg:text-base text-slate-500 leading-snug lg:leading-normal">Independent expert reviews scoring UI fluidity, haptics, and daily reliability.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="py-12 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-8 lg:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-2 lg:mb-4 tracking-tight">Editorial Insights</h2>
              <p className="text-slate-500 text-sm sm:text-base lg:text-lg">In-depth reviews, leaks, and technology breakdowns.</p>
            </div>
            <Link href="/news" className="hidden sm:flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors">
              View All Articles <ArrowRight size={18} />
            </Link>
          </div>
          
          {latestArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestArticles.map((article) => (
                <Link href={`/news/${article.slug}`} key={article.id} className="group block">
                  <div className="w-full aspect-video bg-slate-200 rounded-3xl mb-6 overflow-hidden relative">
                    {article.featured_image ? (
                      <Image 
                        src={article.featured_image || FALLBACK_IMAGE} 
                        alt={article.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 smooth-transition" 
                        placeholder={getCloudinaryBlurUrl(article.featured_image) ? "blur" : "empty"}
                        blurDataURL={getCloudinaryBlurUrl(article.featured_image) || defaultBlurDataURL}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400">Image</div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full">
                      {article.categories?.name}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary smooth-transition line-clamp-2 leading-tight">{article.title}</h3>
                  <p className="text-slate-500 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 shadow-sm">
              <FileText size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Articles Published</h3>
              <p className="text-slate-500">We are working on some great content. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

    </>
  );
}
