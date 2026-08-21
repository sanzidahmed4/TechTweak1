import connectToDatabase from '@/lib/mongodb/mongoose';
import Phone from '@/lib/models/Phone';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectToDatabase();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techtweak.tech';

  try {
    const rawPhones = await Phone.find({ is_published: true })
      .select('slug name images brand_id')
      .sort({ release_date_parsed: -1, price_usd: 1, name: 1 })
      .lean() as any /* eslint-disable-line @typescript-eslint/no-explicit-any */[];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

    for (const phone of rawPhones) {
      if (phone.images && phone.images.length > 0) {
        const url = `${baseUrl}/phones/${phone.brand_id?.slug || 'unknown'}/${phone.slug}`;
        
        xml += `
  <url>
    <loc>${url}</loc>`;
        
        // Add up to 10 images per phone per Google limits
        const imagesToInclude = phone.images.slice(0, 10);
        for (const img of imagesToInclude) {
          xml += `
    <image:image>
      <image:loc><![CDATA[${img}]]></image:loc>
      <image:title><![CDATA[${phone.name}]]></image:title>
    </image:image>`;
        }
        
        xml += `
  </url>`;
      }
    }

    xml += `
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating Image Sitemap:', error);
    return new NextResponse('Error generating Image Sitemap', { status: 500 });
  }
}
