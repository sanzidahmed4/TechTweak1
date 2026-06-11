import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb/mongoose';
import Phone from '@/lib/models/Phone';
import { GSCService } from '@/lib/seo/GSCService';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await connectToDatabase();

    // 1. Fetch data from Google Search Console
    const gscData = await GSCService.fetchPerformanceData();

    // 2. Synchronize with Database
    let updatedCount = 0;
    for (const record of gscData) {
      const result = await Phone.updateOne(
        { slug: record.slug },
        { 
          $set: {
            gsc_impressions: record.impressions,
            gsc_clicks: record.clicks,
            gsc_ctr: record.ctr,
            gsc_position: record.position,
            gsc_last_sync: new Date(),
          }
        }
      );
      if (result.modifiedCount > 0) {
        updatedCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Synchronized ${updatedCount} URLs with Search Console data.`,
      timestamp: new Date()
    });

  } catch (error: any) {
    console.error("GSC Sync Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
