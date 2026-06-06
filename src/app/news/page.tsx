import connectToDatabase from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/Post";
import "@/lib/models/Category";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye } from "lucide-react";

export const metadata = {
  title: 'News & Articles | TechTweak',
  description: 'Explore the latest smartphone news, reviews, and tech guides on TechTweak.',
};

export const revalidate = 3600; // Enable ISR (1 hour caching)

export default async function NewsPage() {
  await connectToDatabase();
  
  let posts: any /* eslint-disable-line @typescript-eslint/no-explicit-any */[] = [];
  try {
    const rawPosts = await Post.find({ is_published: true })
      .populate('category_id', 'name slug')
      .sort({ published_at: -1, created_at: -1 })
      .lean();
      
    posts = rawPosts.map((p: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => ({
      id: p._id.toString(),
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      featured_image: p.featured_image || "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1716024976/tech_placeholder.jpg",
      category: p.category_id ? p.category_id.name : "Uncategorized",
      published_at: p.published_at ? new Date(p.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }) : new Date(p.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      views: p.views || 0
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4 lg:px-8 mt-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Latest Tech <span className="text-primary">News & Guides</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Stay updated with the latest smartphone releases, in-depth reviews, and comprehensive tech guides from our experts.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No articles found</h3>
            <p className="text-slate-500">Check back later for new content.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/news/${post.slug}`} className="group flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <Image 
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{post.published_at}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye size={14} />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.excerpt || "Click to read the full article..."}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center font-semibold text-sm text-primary">
                    Read Article <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
