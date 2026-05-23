import connectToDatabase from "@/lib/mongodb/mongoose";
import Brand from "@/lib/models/Brand";
import Phone from "@/lib/models/Phone";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  await connectToDatabase();
  
  const data = await Brand.findOne({ slug: brand }).lean() as any;
  
  if (!data) return { title: "Brand Not Found" };
  
  return {
    title: `${data.name} Phones | TechTweak`,
    description: data.description || `Browse all the latest ${data.name} smartphones, specifications, and prices.`,
  };
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  await connectToDatabase();
  
  // Fetch Brand Info
  let brandData: any = null;
  let phones: any[] = [];

  try {
    const bData = await Brand.findOne({ slug: brand }).lean() as any;
    if (bData) {
      brandData = bData;
      // Fetch Phones for this brand
      const rawPhones = await Phone.find({ brand_id: bData._id, is_published: true })
        .sort({ release_date: -1 })
        .lean();
        
      phones = rawPhones.map((p: any) => ({
        id: p._id.toString(),
        name: p.name,
        slug: p.slug,
        price_usd: p.price_usd,
        images: p.images
      }));
    }
  } catch (err) {
    console.error(err);
  }

  // Fallback for demonstration
  if (!brandData) {
    brandData = { name: brand.charAt(0).toUpperCase() + brand.slice(1), description: `Discover the latest innovations from ${brand}.` };
    phones = [1, 2, 3, 4, 5, 6].map(i => ({
      id: i,
      name: `${brandData.name} Model ${i}`,
      slug: `${brand}-model-${i}`,
      price_usd: 1250,
      images: []
    }));
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-slate-200 mb-12 text-center max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-6 overflow-hidden border border-slate-200/50 shadow-sm">
            {brandData.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={brandData.logo_url} alt={`${brandData.name} logo`} className="w-full h-full object-contain p-2" />
            ) : (
              <Smartphone size={32} />
            )}
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 capitalize">{brandData.name} Phones</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            {brandData.description || `Explore our comprehensive catalog of ${brandData.name} smartphones. Compare specifications, features, and find the perfect device for your needs.`}
          </p>
        </div>

        {/* Phones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {phones.map((phone: any) => (
            <Link href={`/phones/${brand}/${phone.slug}`} key={phone.id} className="glass-card rounded-3xl p-6 hover-card block bg-white">
              <div className="w-full aspect-[3/4] bg-slate-100 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
                {phone.images && phone.images.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={phone.images[0]} alt={phone.name} className="w-full h-full object-cover" />
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

      </div>
    </div>
  );
}
