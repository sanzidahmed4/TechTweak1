import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/mongoose';
import Phone from '@/lib/models/Phone';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get('q') || '';
    const query = rawQuery.trim();

    if (query.length < 2) {
      return NextResponse.json({ phones: [] }, {
        headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' }
      });
    }

    await connectToDatabase();

    // Primary: Text Search
    let phones = await Phone.find({
      $text: { $search: query },
      is_published: true
    }, { score: { $meta: "textScore" } })
    .select('name slug images release_date brand_id')
    .populate('brand_id', 'name slug')
    .sort({ score: { $meta: "textScore" } })
    .limit(5)
    .lean();

    // Fallback: Regex Search matching terms anywhere in name
    if (phones.length === 0) {
      const words = query.split(/\s+/).filter(Boolean).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      const regexPattern = words.map(w => `(?=.*${w})`).join('');
      phones = await Phone.find({
        name: { $regex: new RegExp(regexPattern, 'i') },
        is_published: true
      })
      .select('name slug images release_date brand_id')
      .populate('brand_id', 'name slug')
      .sort({ release_date_parsed: -1, price_usd: 1, name: 1 })
      .limit(8)
      .lean();
    }

    return NextResponse.json({ phones }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      }
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
  }
}
