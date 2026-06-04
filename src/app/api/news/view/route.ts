import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/Post";

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    await connectToDatabase();

    // Increment view count asynchronously
    await Post.updateOne(
      { slug },
      { $inc: { views: 1 } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("News view tracking error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
