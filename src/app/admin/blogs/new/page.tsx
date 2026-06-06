import { addBlogPost } from "../actions";
import connectToDatabase from "@/lib/mongodb/mongoose";
import Category from "@/lib/models/Category";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import SingleImageUploader from "@/components/admin/SingleImageUploader";
import CategorySelect from "@/components/admin/CategorySelect";
import TagInput from "@/components/admin/TagInput";

export default async function AddBlogPostPage() {
  await connectToDatabase();
  
  // Fetch Categories for dropdown
  let categories: { id: string, name: string }[] = [];
  try {
    const rawCategories = await Category.find().sort({ name: 1 }).lean();
    categories = rawCategories.map((c: unknown) => ({
      id: c._id.toString(),
      name: c.name
    }));
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blogs" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-primary transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add New Post</h1>
          <p className="text-slate-500">Create a new blog article or news piece.</p>
        </div>
      </div>

      <form action={addBlogPost} className="space-y-8">
        
        {/* Core Content */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Article Content</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Article Title <span className="text-red-500">*</span></label>
              <input required type="text" name="title" placeholder="e.g. The Future of AI in Smartphones" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CategorySelect initialCategories={categories} />
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Custom Slug (Optional)</label>
                <input type="text" name="slug" placeholder="e.g. future-ai-smartphones" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Tags</label>
              <TagInput name="tags" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Short Excerpt</label>
              <textarea name="excerpt" rows={2} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Full Content (Markdown Supported) <span className="text-red-500">*</span></label>
              <RichTextEditor name="content" required={true} />
            </div>
          </div>
        </div>

        {/* Media & SEO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Media</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Featured Image</label>
                <SingleImageUploader name="featured_image" label="Upload Featured Image" folder="tech_tweak/blogs" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">SEO Metadata</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Meta Title</label>
                <input type="text" name="meta_title" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Meta Description</label>
                <textarea name="meta_description" rows={3} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_published" defaultChecked className="w-5 h-5 accent-primary rounded cursor-pointer" />
            <span className="font-medium text-slate-700">Publish Immediately</span>
          </label>
          <button 
            type="submit"
            className="bg-primary text-white font-medium px-8 py-3.5 rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <Save size={20} />
            Save Post
          </button>
        </div>
      </form>
    </div>
  );
}
