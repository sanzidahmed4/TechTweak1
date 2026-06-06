import connectToDatabase from "@/lib/mongodb/mongoose";
import Category from "@/lib/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find().sort({ name: 1 }).lean();
    const data = categories.map((c: unknown) => ({
      id: c._id.toString(),
      name: c.name,
      slug: c.slug,
    }));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
