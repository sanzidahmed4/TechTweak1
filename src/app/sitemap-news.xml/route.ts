import connectToDatabase from '@/lib/mongodb/mongoose';
import Post from '@/lib/models/Post';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectToDatabase();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techtweak.com';

  try {
    // Google News Sitemap should only contain articles published in the last 48 hours
    const twoDaysAgo = new Date();
    twoDaysAgo.setHours(twoDaysAgo.getHours() - 48);

    const rawPosts = await Post.find({
      is_published: true,
      $or: [
        { published_at: { $gte: twoDaysAgo } },
        { created_at: { $gte: twoDaysAgo } }
      ]
    })
      .select('slug title published_at created_at')
      .sort({ published_at: -1, created_at: -1 })
      .lean() as any[];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

    for (const post of rawPosts) {
      const url = `${baseUrl}/news/${post.slug}`;
      const pubDate = new Date(post.published_at || post.created_at || new Date()).toISOString();
      
      xml += `
  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>TechTweak</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title><![CDATA[${post.title}]]></news:title>
    </news:news>
  </url>`;
    }

    xml += `
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating News Sitemap:', error);
    return new NextResponse('Error generating News Sitemap', { status: 500 });
  }
}
