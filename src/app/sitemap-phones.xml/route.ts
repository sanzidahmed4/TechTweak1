import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/mongoose';
import Phone from '@/lib/models/Phone';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectToDatabase();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techtweak.tech';

  const phones = await Phone.find({ is_published: true })
    .select('slug updated_at brand_id')
    .populate('brand_id', 'slug')
    .sort({ created_at: -1 })
    .lean();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${phones.map((phone: any) => `
  <url>
    <loc>${baseUrl}/phones/${phone.brand_id?.slug || 'brand'}/${phone.slug}</loc>
    <lastmod>${new Date(phone.updated_at || new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
