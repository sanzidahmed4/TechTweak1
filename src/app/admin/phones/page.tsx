import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import Brand from "@/lib/models/Brand";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from "lucide-react";

export default async function AdminPhonesPage(props: {
  searchParams: Promise<{ q?: string; brand?: string; status?: string }>;
}) {
  await connectToDatabase();
  
  const { q: searchQuery = "", brand: brandFilter = "", status: statusFilter = "" } = await props.searchParams;

  let brands: any[] = [];
  try {
    brands = await Brand.find().sort({ name: 1 }).lean();
  } catch (err) {
    console.error("Failed to fetch brands for filter list", err);
  }

  let phones: any[] = [];
  try {
    const queryObj: any = {};
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
      .sort({ release_date_parsed: -1, price_usd: -1, name: 1 })
      .lean();
      
    phones = rawPhones.map((p: any) => ({
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
              {brands.map((brand: any) => (
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

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest border-b border-slate-200">
                <th className="p-4 w-12">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer" />
                </th>
                <th className="p-4 font-bold">Device Model</th>
                <th className="p-4 font-bold">Brand</th>
                <th className="p-4 font-bold">Price (USD)</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {phones.map((phone) => (
                <tr key={phone.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="p-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer" />
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">{phone.name}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">/{phone.slug}</div>
                  </td>
                  <td className="p-4 text-sm font-semibold text-slate-700">
                    <span className="bg-slate-100 px-2.5 py-1 rounded-md">{phone.brands?.name}</span>
                  </td>
                  <td className="p-4 text-sm font-bold text-slate-900">
                    {phone.price_usd ? `$${phone.price_usd.toLocaleString()}` : <span className="text-slate-400 font-normal">N/A</span>}
                  </td>
                  <td className="p-4">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full hover:opacity-80 transition-opacity" title="Toggle Status">
                      {phone.is_published ? (
                        <span className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          <Eye size={12} strokeWidth={3} /> Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">
                          <EyeOff size={12} /> Draft
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1 transition-opacity">
                      <Link 
                        href={`/admin/phones/${phone.id}/edit?returnUrl=${encodeURIComponent(returnUrl)}`}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm"
                        title="Edit Phone"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shadow-sm"
                        title="Delete Phone"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between text-sm text-slate-500">
          <div>Showing 1 to {phones.length} of {phones.length} entries</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-4 py-2 border border-slate-200 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors">1</button>
            <button className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
