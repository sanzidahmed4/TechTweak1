"use server";

import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";

export async function searchPhonesForCompare(query: string) {
  await connectToDatabase();
  try {
    const rawPhones = await Phone.find({ name: { $regex: query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' } })
      .populate('brand_id', 'name')
      .sort({ release_date_parsed: -1, price_usd: -1, name: 1 })
      .limit(10)
      .lean();
      
    return rawPhones.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      brands: { name: p.brand_id?.name },
      images: p.images
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
