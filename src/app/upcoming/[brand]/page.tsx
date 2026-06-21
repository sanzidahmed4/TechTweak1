import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import Brand from "@/lib/models/Brand";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Smartphone } from "lucide-react";
import { FALLBACK_IMAGE, getCloudinaryBlurUrl, defaultBlurDataURL } from '@/lib/utils/image';

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  await connectToDatabase();
  const brandDoc = await Brand.findOne({ slug: brand }).select('name').lean() as any;
  const brandName = brandDoc ? brandDoc.name : brand.charAt(0).toUpperCase() + brand.slice(1);

  return {
    title: `Upcoming ${brandName} Phones 2026 | TechTweak`,
    description: `Explore the latest upcoming and rumored ${brandName} smartphones. Get launch dates, leaked specifications, and news before they officially release.`,
    alternates: {
      canonical: `https://www.techtweak.tech/upcoming/${brand}`,
    }
  };
}

export default async function BrandUpcomingPhonesPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  await connectToDatabase();
  
  const brandDoc = await Brand.findOne({ slug: brand }).select('_id name').lean() as any;
  if (!brandDoc) {
    notFound();
  }

  // Get all upcoming to render tabs
  const allUpcoming = await Phone.find({
    is_published: true,
    phone_status: { $in: ['upcoming', 'rumored'] }
  })
    .select('brand_id')
    .populate('brand_id', 'name slug')
    .lean();

  const brandCounts = allUpcoming.reduce((acc: any, phone: any) => {
    const slug = phone.brand_id?.slug;
    if (slug) {
      if (!acc[slug]) {
        acc[slug] = { name: phone.brand_id.name, slug, count: 0 };
      }
      acc[slug].count++;
    }
    return acc;
  }, {});

  const topBrands = Object.values(brandCounts).sort((a: any, b: any) => b.count - a.count);

  const phones = await Phone.find({
    is_published: true,
    phone_status: { $in: ['upcoming', 'rumored'] },
    brand_id: brandDoc._id
  })
    .select('name slug brand_id price_usd images price_display_text phone_status expected_launch_date leak_confidence display processor ram storage camera_main battery network is_featured release_date antutu_score')
    .populate('brand_id', 'name slug')
    .sort({ expected_launch_date: 1, name: 1 })
    .lean();

  return (
    <div className="bg-[#f8faff] min-h-screen pt-[78px] lg:pt-[86px] pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto pt-8">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Upcoming {brandDoc.name} Phones</h1>
          <p className="text-sm sm:text-lg text-slate-500">Discover the next generation of {brandDoc.name} smartphones. Leaks, rumors, and expected launch dates.</p>
        </div>

        {/* Brand Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          <Link href="/upcoming-phones" className="px-4 py-2 text-xs sm:text-sm rounded-full bg-white text-slate-600 font-semibold border border-slate-200 hover:border-primary hover:text-primary transition-colors">All Brands</Link>
          {topBrands.map((b: any) => (
            <Link key={b.slug} href={`/upcoming/${b.slug}`} className={`px-4 py-2 text-xs sm:text-sm rounded-full font-semibold transition-colors ${
              b.slug === brand 
                ? "bg-primary text-white border border-transparent shadow-md shadow-primary/20" 
                : "bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary"
            }`}>
              {b.name} <span className="ml-1 text-[10px] sm:text-xs opacity-60">({b.count})</span>
            </Link>
          ))}
        </div>

        {/* Phone Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {phones.length > 0 ? (
            phones.map((phone: any) => (
              <Link href={`/phones/${phone.brand_id?.slug || 'unknown'}/${phone.slug}`} key={phone._id.toString()} className="group bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 transition-all flex flex-col relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-purple-100 text-purple-700 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full z-10">
                  {phone.phone_status || 'Upcoming'}
                </div>
                
                <div className="relative w-full aspect-[4/5] bg-slate-50 rounded-xl sm:rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                    {phone.images && phone.images[0] ? (
                      <Image 
                        src={phone.images[0] || FALLBACK_IMAGE} 
                        alt={phone.name} 
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                        placeholder={getCloudinaryBlurUrl(phone.images[0]) ? "blur" : "empty"}
                        blurDataURL={getCloudinaryBlurUrl(phone.images[0]) || defaultBlurDataURL}
                      />
                    ) : (
                    <Smartphone className="w-10 h-10 sm:w-16 sm:h-16 text-slate-300" />
                  )}
                </div>
                
                <div className="space-y-1 flex-1">
                  <p className="text-[9px] sm:text-[10px] text-primary font-bold uppercase tracking-widest">{phone.brand_id?.name || 'Unknown'}</p>
                  <h2 className="text-sm sm:text-lg font-black text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-2">{phone.name}</h2>
                </div>
                
                <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 text-[10px] sm:text-xs font-semibold">
                    <Calendar size={12} className="text-primary shrink-0" />
                    <span className="truncate">{phone.expected_launch_date || phone.launch_quarter || phone.launch_year || 'Launch TBA'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base font-black text-slate-900 truncate pr-2">
                      {phone.price_display_text || (phone.price_usd ? `$${phone.price_usd.toLocaleString()}` : "Not Announced Yet")}
                    </span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
             <div className="col-span-full py-20 text-center text-slate-500">
               <Smartphone size={48} className="mx-auto mb-4 opacity-30" />
               <p className="text-lg">No upcoming {brandDoc.name} phones found right now.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
