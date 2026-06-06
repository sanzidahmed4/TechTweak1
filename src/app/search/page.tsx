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
  
  const mongoQuery: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ = { is_published: true };
  
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

  const allBrands = await Brand.find({}).sort({ name: 1 }).lean();
  
  const dates = await Phone.find({ is_published: true, release_date: { $exists: true, $ne: "" } }).select("release_date").lean();
  const uniqueYears = Array.from(new Set(dates.map((d: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
    const dateStr = d.release_date;
    if (!dateStr) return null;
    const yr = new Date(dateStr).getFullYear();
    return isNaN(yr) ? null : yr;
  }).filter(Boolean))).sort((a: any /* eslint-disable-line @typescript-eslint/no-explicit-any */, b: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => b - a);

  let sortQuery: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ = {};
  if (sort === "newest") sortQuery = { release_date: -1, price_usd: -1, name: 1 };
  if (sort === "price_high") sortQuery = { price_usd: -1, release_date: -1, name: 1 };
  if (sort === "price_low") sortQuery = { price_usd: 1, release_date: -1, name: 1 };

  let phones: any /* eslint-disable-line @typescript-eslint/no-explicit-any */[] = [];
  try {
    const rawPhones = await Phone.find(mongoQuery)
      .populate('brand_id', 'name slug')
      .sort(sortQuery)
      .lean();
      
    phones = rawPhones.map((p: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => ({
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
    <div className="bg-slate-50 min-h-screen pt-24 lg:pt-32 pb-12 lg:pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-2 tracking-tight">Advanced Search Engine</h1>
            <p className="text-slate-500 text-sm md:text-base">Filter through thousands of devices instantly.</p>
          </div>
          
          <form action="/search" method="GET" className="bg-white p-5 lg:p-6 rounded-[1.5rem] shadow-sm border border-slate-200">
            <div className="mb-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <SearchIcon size={20} />
                </div>
                <input
                  type="text"
                  name="q"
                  defaultValue={q}
                  placeholder="Search by phone name, e.g. Galaxy S24..."
                  className="w-full py-4 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Brand</label>
                <select name="brand" defaultValue={brand} className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-primary transition-all text-xs font-medium">
                  <option value="">Any Brand</option>
                  {allBrands.map((b: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => (
                    <option key={b._id.toString()} value={b.slug}>{b.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Release Year</label>
                <select name="year" defaultValue={year} className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-primary transition-all text-xs font-medium">
                  <option value="">Any Year</option>
                  {uniqueYears.map((y: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => (
                    <option key={y} value={y.toString()}>{y}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Chipset Family</label>
                <select name="chipset" defaultValue={chipset} className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-primary transition-all text-xs font-medium">
                  <option value="">Any Chipset</option>
                  <option value="Snapdragon">Snapdragon</option>
                  <option value="Apple A">Apple Bionic/A-Series</option>
                  <option value="Exynos">Exynos</option>
                  <option value="Dimensity">MediaTek Dimensity</option>
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Sort By</label>
                <select name="sort" defaultValue={sort} className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-primary transition-all text-xs font-medium">
                  <option value="newest">Newest First</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="price_low">Price: Low to High</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold shadow-md shadow-slate-900/20 hover:bg-slate-800 transition-all text-sm min-h-[44px]">
              Search
            </button>
          </form>
        </div>

        {phones.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {phones.map((phone: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => (
              <Link href={`/phones/${phone.brands?.slug || 'unknown'}/${phone.slug}`} key={phone.id} className="glass-card rounded-[1.25rem] p-3 sm:p-4 hover:shadow-lg transition-all block bg-white border border-slate-100 flex flex-col group">
                <div className="w-full aspect-square sm:aspect-[4/5] bg-slate-50 rounded-xl mb-3 relative overflow-hidden flex items-center justify-center p-4">
                  {phone.images && phone.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={phone.images[0]} alt={phone.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <Smartphone size={32} className="text-slate-300" />
                  )}
                </div>
                <div className="flex flex-col flex-1">
                  <div className="text-[10px] font-bold text-blue-600 tracking-wide uppercase mb-1">{phone.brands?.name}</div>
                  <h3 className="text-[13px] sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 flex-1 group-hover:text-blue-700 transition-colors" title={phone.name}>{phone.name}</h3>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className="text-sm sm:text-base font-black text-slate-900 truncate max-w-full block">
                      {phone.price_usd ? `$${phone.price_usd.toLocaleString()}` : 'Price TBA'}
                    </span>
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
