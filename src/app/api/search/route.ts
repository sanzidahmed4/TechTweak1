import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/mongoose';
import Phone from '@/lib/models/Phone';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 1) {
      return NextResponse.json({ phones: [] });
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

    // Fallback: Regex Prefix Search if text search yields no results
    if (phones.length === 0) {
      phones = await Phone.find({
        name: { $regex: new RegExp('^' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') },
        is_published: true
      })
      .select('name slug images release_date brand_id')
      .populate('brand_id', 'name slug')
      .sort({ release_date_parsed: -1, price_usd: 1, name: 1 })
      .limit(5)
      .lean();
    }

    return NextResponse.json({ phones });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
  }
}
