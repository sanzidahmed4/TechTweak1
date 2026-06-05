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

    const phones = await Phone.find({
      name: { $regex: query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' },
      is_published: true
    })
    .select('name slug images release_date brand_id')
    .populate('brand_id', 'name slug')
    .limit(5)
    .lean();

    return NextResponse.json({ phones });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
  }
}
