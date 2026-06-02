import connectToDatabase from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/Post";
import "@/lib/models/Category";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Eye } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import SocialShare from "@/components/news/SocialShare";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  await connectToDatabase();
  const slug = (await params).slug;
  const decodedSlug = decodeURIComponent(slug);
  const post = await Post.findOne({ slug: decodedSlug }).lean() as any;

  if (!post) {
    return { title: 'Post Not Found | TechTweak' };
  }

  return {
    title: post.meta_title || `${post.title} | TechTweak`,
    description: post.meta_description || post.excerpt || `Read ${post.title} on TechTweak`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  await connectToDatabase();
  const slug = (await params).slug;
  const decodedSlug = decodeURIComponent(slug);
  
  let post: any = null;
  
  try {
    const rawPost = await Post.findOneAndUpdate(
      { slug: decodedSlug },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('category_id', 'name slug')
      .lean();
      
    if (rawPost) {
      post = {
        id: rawPost._id.toString(),
        title: rawPost.title,
        content: rawPost.content,
        featured_image: rawPost.featured_image || "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1716024976/tech_placeholder.jpg",
        category: rawPost.category_id ? rawPost.category_id.name : "Uncategorized",
        category_id: rawPost.category_id ? rawPost.category_id._id : null,
        tags: rawPost.tags || [],
        published_at: rawPost.published_at ? new Date(rawPost.published_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }) : new Date(rawPost.created_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        views: rawPost.views || 0
      };
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  if (!post) {
    notFound();
  }

  // Fetch related posts (same category or overlapping tags)
  let relatedPosts: any[] = [];
  try {
    const query: any = { _id: { $ne: post.id }, is_published: true };
    
    if (post.tags && post.tags.length > 0) {
      query.tags = { $in: post.tags };
    } else {
      query.category_id = post.category_id; // Fallback to category if no tags
    }

    let rawRelated = await Post.find(query)
      .limit(5)
      .select("title slug featured_image published_at created_at category_id")
      .populate('category_id', 'name')
      .sort({ published_at: -1, created_at: -1 })
      .lean();
      
    // Fallback: If no strictly related posts found, just show latest posts
    if (rawRelated.length === 0) {
      rawRelated = await Post.find({ _id: { $ne: post.id }, is_published: true })
        .limit(5)
        .select("title slug featured_image published_at created_at category_id")
        .populate('category_id', 'name')
        .sort({ published_at: -1, created_at: -1 })
        .lean();
    }
      
    relatedPosts = rawRelated.map((p: any) => ({
      title: p.title,
      slug: p.slug,
      category: p.category_id ? p.category_id.name : "NEWS",
      date: p.published_at ? new Date(p.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
                         : new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }));
  } catch (e) {
    console.error("Error fetching related posts:", e);
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.techtweak.tech";
  const currentUrl = `${baseUrl}/news/${decodedSlug}`;

  const jsonLd: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: post.title,
      image: [post.featured_image],
      datePublished: new Date(post.published_at || new Date()).toISOString(),
      dateModified: new Date(post.published_at || new Date()).toISOString(),
      author: [{
        "@type": "Organization",
        name: "TechTweak",
        url: baseUrl
      }]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "News", item: `${baseUrl}/news` },
        { "@type": "ListItem", position: 3, name: post.title, item: currentUrl }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="container mx-auto px-4 lg:px-8 mt-12 max-w-4xl">
          
          {/* Back Button */}
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to News
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar size={14} />
                {post.published_at}
                <span className="mx-2 text-slate-300">•</span>
                <span>5 min read</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
              {post.title}
            </h1>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <Tag size={16} className="text-slate-400 mr-1" />
                {post.tags.map((tag: string) => (
                  <Link key={tag} href={`/news/tags/${encodeURIComponent(tag.toLowerCase())}`} className="px-3 py-1 bg-slate-100 hover:bg-primary/10 text-slate-600 hover:text-primary text-xs font-semibold rounded-full transition-colors">
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full bg-slate-100 rounded-3xl overflow-hidden shadow-sm border border-slate-200 mb-12">
            <Image 
              src={post.featured_image}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>

          {/* Markdown Content */}
          <div>
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl prose-hr:my-6">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
            
            {/* Reads Counter & Minimal Right-Aligned Social Share */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-2 text-sm text-slate-500 font-semibold bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                <Eye size={16} className="text-primary" />
                <span>{post.views} reads</span>
              </div>
              <SocialShare url={currentUrl} title={post.title} />
            </div>
          </div>

          {/* Related Content - Screenshot Style */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-6 border-t border-slate-200">
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">Related News</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {relatedPosts.map((related: any) => (
                  <Link key={related.slug} href={`/news/${related.slug}`} className="group block pt-3 border-t border-slate-200">
                    <h4 className="font-serif text-xl text-slate-900 group-hover:text-primary transition-colors leading-snug mb-2">
                      {related.title}
                    </h4>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
                      {related.date} {related.category}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
