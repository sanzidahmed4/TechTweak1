import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import Brand from "@/lib/models/Brand";
import Link from "next/link";
import { Search as SearchIcon, Smartphone } from "lucide-react";

export const metadata = {
  title: "Search Smartphones | TechTweak",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string, brand?: string, sort?: string, year?: string, chipset?: string }> }) {
  const { q = "", brand = "", sort = "newest", year = "", chipset = "" } = await searchParams;
  await connectToDatabase();
  
  const mongoQuery: any = { is_published: true };
  
  if (q) {
    mongoQuery.name = { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
  }
  
  if (year) {
    mongoQuery.release_date = { 
      $gte: `${year}-01-01`,
      $lte: `${year}-12-31`
    };
  }

  if (chipset) {
    mongoQuery.processor = { $regex: chipset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
  }

  // Filter by brand slug (requires finding brand ID first if we want to query by ID)
  if (brand) {
    const brandDoc = await Brand.findOne({ slug: brand.toLowerCase() });
    if (brandDoc) {
      mongoQuery.brand_id = brandDoc._id;
    } else {
      // If brand not found, ensure no phones match
      mongoQuery.brand_id = null;
    }
  }

  let sortQuery: any = {};
  if (sort === "newest") sortQuery = { release_date_parsed: -1, price_usd: -1, name: 1 };
  if (sort === "price_high") sortQuery = { price_usd: -1, release_date_parsed: -1, name: 1 };
  if (sort === "price_low") sortQuery = { price_usd: 1, release_date_parsed: -1, name: 1 };

  let phones: any[] = [];
  try {
    const rawPhones = await Phone.find(mongoQuery)
      .populate('brand_id', 'name slug')
      .sort(sortQuery)
      .lean();
      
    phones = rawPhones.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      brands: { name: p.brand_id?.name, slug: p.brand_id?.slug },
      price_usd: p.price_usd,
      images: p.images
    }));
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">Advanced Search Engine</h1>
            <p className="text-slate-500 text-lg">Filter through thousands of devices instantly.</p>
          </div>
          
          <form action="/search" method="GET" className="bg-white p-6 lg:p-8 rounded-[2rem] shadow-sm border border-slate-200">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <SearchIcon size={24} />
                </div>
                <input
                  type="text"
                  name="q"
                  defaultValue={q}
                  placeholder="Search by phone name, e.g. Galaxy S24..."
                  className="w-full py-5 pl-16 pr-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-lg font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
              <button type="submit" className="px-10 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all text-lg">
                Search
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Brand</label>
                <select name="brand" defaultValue={brand} className="w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium">
                  <option value="">Any Brand</option>
                  <option value="samsung">Samsung</option>
                  <option value="apple">Apple</option>
                  <option value="google">Google</option>
                  <option value="xiaomi">Xiaomi</option>
                  <option value="oneplus">OnePlus</option>
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Release Year</label>
                <select name="year" defaultValue={year} className="w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium">
                  <option value="">Any Year</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Chipset Family</label>
                <select name="chipset" defaultValue={chipset} className="w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium">
                  <option value="">Any Chipset</option>
                  <option value="Snapdragon">Snapdragon</option>
                  <option value="Apple A">Apple Bionic/A-Series</option>
                  <option value="Exynos">Exynos</option>
                  <option value="Dimensity">MediaTek Dimensity</option>
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Sort By</label>
                <select name="sort" defaultValue={sort} className="w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium">
                  <option value="newest">Newest First</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="price_low">Price: Low to High</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {phones.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {phones.map((phone: any) => (
              <Link href={`/phones/${phone.brands?.slug || 'unknown'}/${phone.slug}`} key={phone.id} className="glass-card rounded-3xl p-6 hover-card block bg-white">
                <div className="w-full aspect-[3/4] bg-slate-100 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
                  {phone.images && phone.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={phone.images[0]} alt={phone.name} className="w-full h-full object-cover" />
                  ) : (
                    <Smartphone size={40} className="text-slate-300" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-bold text-primary tracking-wider uppercase">{phone.brands?.name}</div>
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{phone.name}</h3>
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900">{phone.price_usd ? `$${phone.price_usd.toLocaleString()}` : 'N/A'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-16 text-center max-w-2xl mx-auto mt-12">
            <SearchIcon size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
            <p className="text-slate-500">We couldn&apos;t find any phones matching your search criteria. Try adjusting your filters.</p>
          </div>
        )}

      </div>
    </div>
  );
}
