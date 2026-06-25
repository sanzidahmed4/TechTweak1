import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import Brand from "@/lib/models/Brand";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import AdminPhoneList from "./AdminPhoneList";

export default async function AdminPhonesPage(props: {
  searchParams: Promise<{ q?: string; brand?: string; status?: string }>;
}) {
  await connectToDatabase();
  
  const { q: searchQuery = "", brand: brandFilter = "", status: statusFilter = "" } = await props.searchParams;

  let brands: any /* eslint-disable-line @typescript-eslint/no-explicit-any */[] = [];
  try {
    brands = await Brand.find().sort({ name: 1 }).lean();
  } catch (err) {
    console.error("Failed to fetch brands for filter list", err);
  }

  let phones: any /* eslint-disable-line @typescript-eslint/no-explicit-any */[] = [];
  try {
    const queryObj: any /* eslint-disable-line @typescript-eslint/no-explicit-any */ = {};
    if (searchQuery) {
      const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      queryObj.name = { $regex: escapedQuery, $options: "i" };
    }
    if (brandFilter) {
      queryObj.brand_id = brandFilter;
    }
    if (statusFilter === "published") {
      queryObj.is_published = true;
    } else if (statusFilter === "draft") {
      queryObj.is_published = false;
    }

    const rawPhones = await Phone.find(queryObj)
      .populate('brand_id', 'name')
      .sort({ release_date_parsed: -1, price_usd: 1, name: 1 })
      .lean();
      
    phones = rawPhones.map((p: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => ({
      id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      brands: { name: p.brand_id?.name || "Unknown" },
      is_published: p.is_published,
      price_usd: p.price_usd,
      created_at: p.created_at?.toISOString()
    }));
  } catch (err) {
    console.error("MongoDB connection failed", err);
  }

  // If no phones found, we just pass an empty array instead of dummy data.
  // The table should handle empty states natively.

  const currentQuery = new URLSearchParams();
  if (searchQuery) currentQuery.set("q", searchQuery);
  if (brandFilter) currentQuery.set("brand", brandFilter);
  if (statusFilter) currentQuery.set("status", statusFilter);
  const queryString = currentQuery.toString();
  const returnUrl = queryString ? `/admin/phones?${queryString}` : `/admin/phones`;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Phones</h1>
          <p className="text-slate-500">Manage all smartphone listings across the platform.</p>
        </div>
        <Link 
          href="/admin/phones/new" 
          className="bg-primary text-white font-medium px-5 py-2.5 rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Phone
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <form method="GET" className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                name="q"
                defaultValue={searchQuery}
                placeholder="Search phones by model..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
            {/* Bulk Actions Dropdown Trigger (UI Only) */}
            <select className="bg-white border border-slate-200 rounded-xl text-sm px-4 py-2 outline-none focus:border-primary shadow-sm hidden sm:block">
              <option>Bulk Actions</option>
              <option>Publish Selected</option>
              <option>Draft Selected</option>
              <option>Delete Selected</option>
            </select>
          </div>
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <select 
              name="brand" 
              defaultValue={brandFilter}
              className="bg-white border border-slate-200 rounded-xl text-sm px-4 py-2 outline-none focus:border-primary shadow-sm"
            >
              <option value="">All Brands</option>
              {brands.map((brand: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => (
                <option key={brand._id.toString()} value={brand._id.toString()}>
                  {brand.name}
                </option>
              ))}
            </select>
            <select 
              name="status" 
              defaultValue={statusFilter}
              className="bg-white border border-slate-200 rounded-xl text-sm px-4 py-2 outline-none focus:border-primary shadow-sm"
            >
              <option value="">Status: All</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <button 
              type="submit" 
              className="bg-primary text-white font-medium text-sm px-5 py-2 rounded-xl shadow-md shadow-primary/10 hover:bg-primary/90 transition-all cursor-pointer"
            >
              Filter
            </button>
            {(searchQuery || brandFilter || statusFilter) && (
              <Link 
                href="/admin/phones" 
                className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-slate-600"
              >
                Clear
              </Link>
            )}
          </div>
        </form>

        {/* Admin Phone List Folders */}
        <div className="bg-white min-h-[400px]">
          <AdminPhoneList phones={phones} returnUrl={returnUrl} />
        </div>
      </div>
    </div>
  );
}
