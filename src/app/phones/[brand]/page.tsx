import connectToDatabase from "@/lib/mongodb/mongoose";
import Brand from "@/lib/models/Brand";
import Phone from "@/lib/models/Phone";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FALLBACK_IMAGE, getCloudinaryBlurUrl, defaultBlurDataURL } from '@/lib/utils/image';
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ArrowRight, Smartphone } from "lucide-react";

export const revalidate = 21600; // Enable ISR (6 hour caching)

export async function generateMetadata({ params, searchParams }: { params: Promise<{ brand: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { brand } = await params;
  const sParams = await searchParams;
  const pageParam = sParams.page;
  const page = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  await connectToDatabase();
  
  const data = await Brand.findOne({ slug: brand })
    .select("name description logo_url meta_title meta_description canonical_url og_image primary_keyword")
    .lean() as any /* eslint-disable-line @typescript-eslint/no-explicit-any */;
  
  if (!data) return { title: "Brand Not Found" };
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techtweak.tech';
  let url = data.canonical_url || `${baseUrl}/phones/${brand}`;
  if (page > 1) {
    url = `${url}?page=${page}`;
  }
  
  const title = page > 1 
    ? `${data.meta_title || `${data.name} Phones`} (Page ${page}) | TechTweak` 
    : `${data.meta_title || `${data.name} Phones | TechTweak`}`;
    
  const description = data.meta_description || data.description || `Browse all the latest ${data.name} smartphones, specifications, and prices.`;
  const finalOgImage = data.og_image || data.logo_url;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: url,
      languages: {
        'en': url,
        'x-default': url,
      },
    },
    openGraph: {
      title: title,
      description: description,
      url,
      images: finalOgImage ? [{ url: finalOgImage }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: finalOgImage ? [finalOgImage] : [],
    }
  };
}

export default async function BrandPage({ params, searchParams }: { params: Promise<{ brand: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { brand } = await params;
  const sParams = await searchParams;
  const pageParam = sParams.page;
  const page = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  const limit = 20;
  const skip = (page > 0 ? page - 1 : 0) * limit;

  await connectToDatabase();
  
  // Fetch Brand Info
  let brandData: any   /* eslint-disable-line @typescript-eslint/no-explicit-any */ = null;
  let phones: any   /* eslint-disable-line @typescript-eslint/no-explicit-any */[] = [];

  try {
    const bData = await Brand.findOne({ slug: brand }).lean() as any /* eslint-disable-line @typescript-eslint/no-explicit-any */;
    if (bData) {
      brandData = bData;
      // Fetch Phones for this brand
      const rawPhones = await Phone.find({ brand_id: bData._id, is_published: true })
        .select('name slug images price_usd price_display_text release_date_parsed phone_status processor chipset_highlight')
        .sort({ release_date_parsed: -1, price_usd: 1, name: 1 })
        .skip(skip)
        .limit(limit)
        .lean();
        
      phones = rawPhones.map((p: any   /* eslint-disable-line @typescript-eslint/no-explicit-any */) => ({
        id: p._id.toString(),
        name: p.name,
        slug: p.slug,
        price_usd: p.price_usd,
        price_display_text: p.price_display_text,
        images: p.images,
        processor: p.processor,
        chipset_highlight: p.chipset_highlight
      }));
    }
  } catch (err) {
    console.error(err);
  }

  // If brand is not found, throw 404
  if (!brandData) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techtweak.tech';
  const currentUrl = `${baseUrl}/phones/${brand}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Phones", item: `${baseUrl}/phones` },
      { "@type": "ListItem", position: 3, name: brandData.name, item: currentUrl }
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 lg:mb-10 pb-8 border-b border-slate-200 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0">
            {brandData.logo_url ? (
              <Image 
                src={brandData.logo_url} 
                alt={`${brandData.name} logo`} 
                fill
                sizes="96px"
                className="object-contain p-3" 
              />
            ) : (
              <Smartphone size={32} className="text-slate-300" />
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 capitalize">{brandData.name} Phones</h1>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed">
              {brandData.description || `Explore our comprehensive catalog of ${brandData.name} smartphones. Compare specifications, features, and find the perfect device for your needs.`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {phones.map((phone: any   /* eslint-disable-line @typescript-eslint/no-explicit-any */) => (
            <Link href={`/phones/${brand}/${phone.slug}`} key={phone.id} className="glass-card rounded-3xl p-6 hover-card block bg-white">
              <div className="relative w-full aspect-[4/5] bg-slate-50 flex items-center justify-center p-4">
                {phone.images && phone.images[0] ? (
                  <Image 
                    src={phone.images[0] || FALLBACK_IMAGE} 
                    alt={phone.name} 
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    placeholder={getCloudinaryBlurUrl(phone.images[0]) ? "blur" : "empty"}
                    blurDataURL={getCloudinaryBlurUrl(phone.images[0]) || defaultBlurDataURL}
                  />
                ) : (
                  <div className="text-slate-400 font-medium">No Image</div>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{phone.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-1 mt-2">
                  {phone.processor}
                </p>
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">{phone.price_usd ? `$${phone.price_usd.toLocaleString()}` : 'N/A'}</span>
                  <button className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination UI */}
        <div className="mt-12 flex justify-center gap-2">
          {page > 1 && (
            <Link 
              href={`/phones/${brand}?page=${page - 1}`} 
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
            >
              Previous
            </Link>
          )}
          {phones.length === 20 && (
            <Link 
              href={`/phones/${brand}?page=${page + 1}`} 
              className="px-4 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90"
            >
              Next Page
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
