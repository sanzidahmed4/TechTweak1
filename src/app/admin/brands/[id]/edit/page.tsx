import connectToDatabase from "@/lib/mongodb/mongoose";
import Brand from "@/lib/models/Brand";
import { editBrand } from "../../actions";
import { Building2, Save, ArrowLeft } from "lucide-react";
import SingleImageUploader from "@/components/admin/SingleImageUploader";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectToDatabase();

  const brand = await Brand.findById(id).lean() as unknown;

  if (!brand) {
    redirect("/admin/brands");
  }

  const updateAction = editBrand.bind(null, id);

  return (
    <div className="pb-20 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/brands" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Brands
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Edit Brand</h1>
        <p className="text-slate-500">Update details for {brand.name}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Building2 size={20} className="text-primary" />
          Brand Information
        </h2>
        
        <form action={updateAction} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Brand Name <span className="text-red-500">*</span></label>
            <input required type="text" name="name" defaultValue={brand.name} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Custom Slug</label>
            <input type="text" name="slug" defaultValue={brand.slug} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Logo</label>
            <SingleImageUploader name="logo_url" label="Upload Brand Logo" initialImage={brand.logo_url} />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Display Order</label>
            <input type="number" name="order" defaultValue={brand.order || 0} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" />
            <p className="text-xs text-slate-500">Lower numbers appear first (e.g., 0, 1, 2...)</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea name="description" defaultValue={brand.description} rows={4} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"></textarea>
          </div>
          
          <div className="pt-4 flex items-center justify-end gap-3">
            <Link href="/admin/brands" className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors text-sm">
              Cancel
            </Link>
            <button type="submit" className="bg-primary text-white font-medium px-5 py-2.5 rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2 text-sm">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
