import connectToDatabase from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/Post";
import Link from "next/link";
import { Plus, Search, Edit, Eye, EyeOff } from "lucide-react";
import DeletePostButton from "./DeletePostButton";

export default async function AdminBlogsPage() {
  await connectToDatabase();
  
  let posts: any[] = [];
  try {
    const rawPosts = await Post.find().populate('category_id', 'name').sort({ created_at: -1 }).lean();
    posts = rawPosts.map((p: any) => ({
      id: p._id.toString(),
      title: p.title,
      slug: p.slug,
      categories: { name: p.category_id?.name || "Uncategorized" },
      is_published: p.is_published,
      created_at: p.created_at?.toISOString()
    }));
  } catch (error) {
    console.error(error);
  }

  // Dummy fallback

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Blog Posts</h1>
          <p className="text-slate-500">Manage your articles, news, and guides.</p>
        </div>
        <Link 
          href="/admin/blogs/new" 
          className="bg-primary text-white font-medium px-5 py-2.5 rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search posts..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold">Post Title</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date Created</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-slate-900 line-clamp-1">{post.title}</div>
                    <div className="text-xs text-slate-500">/{post.slug}</div>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-700">
                    {post.categories?.name || 'Uncategorized'}
                  </td>
                  <td className="p-4">
                    {post.is_published ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                        <Eye size={12} /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-600 rounded-full">
                        <EyeOff size={12} /> Draft
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-slate-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/blogs/${post.id}/edit`}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeletePostButton id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
