import connectToDatabase from '@/lib/mongodb/mongoose';
import Post from '@/lib/models/Post';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectToDatabase();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techtweak.tech';

  try {
    const rawPosts = await Post.find({ is_published: true })
      .sort({ published_at: -1, created_at: -1 })
      .limit(20)
      .lean();

    let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>TechTweak News</title>
    <link>${baseUrl}</link>
    <description>Latest smartphone news, reviews, and tech guides from TechTweak.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />`;

    for (const post of rawPosts as any[]) {
      const postUrl = `${baseUrl}/news/${post.slug}`;
      const pubDate = (post.published_at || post.created_at || new Date()).toUTCString();
      const excerpt = post.excerpt ? `<![CDATA[${post.excerpt}]]>` : '';
      
      rss += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${excerpt}</description>`;
      
      if (post.featured_image) {
        rss += `
      <media:content url="${post.featured_image}" medium="image" />`;
      }
      
      rss += `
    </item>`;
    }

    rss += `
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
