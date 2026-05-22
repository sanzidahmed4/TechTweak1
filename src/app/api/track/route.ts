import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb/mongoose";
import AnalyticsEvent from "@/lib/models/AnalyticsEvent";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { path, type, entity_id } = body;

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // Get IP and User-Agent to create a daily session hash (privacy friendly, no cookies needed)
    // In Vercel, IP is in x-real-ip or x-forwarded-for
    const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";
    
    // Create a daily hash (changes every day, respects privacy)
    const today = new Date().toISOString().split('T')[0];
    const rawString = `${ip}-${userAgent}-${today}`;
    const session_id = crypto.createHash('sha256').update(rawString).digest('hex').substring(0, 16);

    await connectToDatabase();

    await AnalyticsEvent.create({
      path,
      type: type || 'page_view',
      entity_id: entity_id || undefined,
      user_agent: userAgent,
      session_id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking error:", error);
    // Don't fail the client request if tracking fails
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
