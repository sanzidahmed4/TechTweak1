import connectToDatabase from "@/lib/mongodb/mongoose";
import Category from "@/lib/models/Category";
import { NextResponse } from "next/server";

export const revalidate = 86400; // 24 hours ISR

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find().select('name slug').sort({ name: 1 }).lean();
    const data = categories.map((c: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => ({
      id: c._id.toString(),
      name: c.name,
      slug: c.slug,
    }));
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch {
    return NextResponse.json([]);
  }
}
