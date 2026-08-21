import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/mongoose';
import Post from '@/lib/models/Post';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectToDatabase();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techtweak.tech';

  const posts = await Post.find({ is_published: true })
    .select('slug published_at')
    .sort({ published_at: -1 })
    .lean();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts.map((post: any) => `
  <url>
    <loc>${baseUrl}/news/${post.slug}</loc>
    <lastmod>${new Date(post.published_at || new Date()).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
