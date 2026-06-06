import connectToDatabase from "@/lib/mongodb/mongoose";
import Category from "@/lib/models/Category";
import { addCategory } from "./actions";
import { FolderTree, Save, Trash2, Edit } from "lucide-react";

export default async function AdminCategoriesPage() {
  await connectToDatabase();
  
  let categories: unknown[] = [];
  try {
    const rawCategories = await Category.find().sort({ name: 1 }).lean();
    categories = rawCategories.map((c: unknown) => ({
      id: c._id.toString(),
      name: c.name,
      slug: c.slug,
      created_at: c.created_at?.toISOString()
    }));
  } catch (error) {
    console.error(error);
  }

  // Dummy fallback

  return (
    <div className="pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Categories</h1>
        <p className="text-slate-500">Manage blog categories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Category Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FolderTree size={20} className="text-primary" />
              Add New Category
            </h2>
            <form action={addCategory} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Category Name <span className="text-red-500">*</span></label>
                <input required type="text" name="name" placeholder="e.g. Android Updates" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Custom Slug (Optional)</label>
                <input type="text" name="slug" placeholder="e.g. android-updates" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" />
              </div>
              <button type="submit" className="w-full bg-primary text-white font-medium px-4 py-2.5 rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-4 text-sm">
                <Save size={16} />
                Save Category
              </button>
            </form>
          </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">Existing Categories</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {categories.map((category) => (
                <div key={category.id} className="p-4 px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200">
                      <FolderTree size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{category.name}</h3>
                      <p className="text-xs text-slate-500">/{category.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
