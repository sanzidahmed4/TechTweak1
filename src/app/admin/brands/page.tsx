import connectToDatabase from "@/lib/mongodb/mongoose";
import Brand from "@/lib/models/Brand";
import { addBrand } from "./actions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Building2, Save, Trash2, Edit } from "lucide-react";
import SingleImageUploader from "@/components/admin/SingleImageUploader";
import DraggableBrandList from "@/components/admin/DraggableBrandList";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminBrandsPage() {
  await connectToDatabase();
  
  let brands: any /* eslint-disable-line @typescript-eslint/no-explicit-any */[] = [];
  try {
    const rawBrands = await Brand.find().sort({ order: 1, name: 1 }).lean();
    brands = rawBrands.map((b: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => ({
      id: b._id.toString(),
      name: b.name,
      slug: b.slug,
      logo_url: b.logo_url,
      order: b.order || 0,
      created_at: b.created_at?.toISOString()
    }));
  } catch (error) {
    console.error(error);
  }

  // Dummy fallback

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Brands</h1>
        <p className="text-slate-500">Manage smartphone manufacturers and brands.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Brand Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Building2 size={20} className="text-primary" />
              Add New Brand
            </h2>
            <form action={addBrand} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Brand Name <span className="text-red-500">*</span></label>
                <input required type="text" name="name" placeholder="e.g. OnePlus" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Custom Slug (Optional)</label>
                <input type="text" name="slug" placeholder="e.g. oneplus" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Logo</label>
                <SingleImageUploader name="logo_url" label="Upload Brand Logo" folder="tech_tweak/brands" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Display Order</label>
                <input type="number" name="order" defaultValue={0} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" />
                <p className="text-xs text-slate-500">Lower numbers appear first (e.g., 0, 1, 2...)</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea name="description" rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-primary text-white font-medium px-4 py-2.5 rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-4 text-sm">
                <Save size={16} />
                Save Brand
              </button>
            </form>
          </div>
        </div>

        {/* Brands List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col sticky top-6 h-[calc(100vh-220px)]">
            <div className="p-6 border-b border-slate-200 bg-slate-50/50 shrink-0">
              <h2 className="text-lg font-bold text-slate-900">Existing Brands</h2>
            </div>
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              <DraggableBrandList initialBrands={brands} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
