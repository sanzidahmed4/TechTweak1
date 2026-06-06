import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb/mongoose';
import Phone from '@/lib/models/Phone';
import Brand from '@/lib/models/Brand';

export const dynamic = 'force-dynamic';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const brand = await Brand.findOne({ slug: 'motorola' });
    if (!brand) return NextResponse.json({ success: false, error: "Brand not found" });

    const phones = await Phone.find({ brand_id: brand._id }).sort({ release_date_parsed: -1, price_usd: -1, name: 1 });

    // Revalidate main routes
    revalidatePath('/', 'page');
    revalidatePath('/phones', 'page');
    revalidatePath('/phones/motorola', 'page');
    
    // Revalidate sitemap and RSS (if they exist)
    revalidatePath('/sitemap.xml');
    revalidatePath('/sitemap-phones.xml');
    revalidatePath('/feed.xml');

    // Revalidate each phone detail page
    for (const phone of phones) {
      revalidatePath(`/phones/motorola/${phone.slug}`, 'page');
    }
    
    return NextResponse.json({ success: true, count: phones.length });
  } catch (err: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
