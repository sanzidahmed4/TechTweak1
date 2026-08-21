"use server";

import { requireAdmin } from "@/lib/auth/requireAdmin";
import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import { revalidatePath } from "next/cache";
import { SEOEngine } from "@/lib/seo/SEOEngine";

export async function updateBulkKeywords(updates: Array<{
  _id: string;
  meta_title?: string;
  meta_description?: string;
  primary_keyword?: string;
  canonical_url?: string;
  og_image?: string;
  content_status?: string;
}>) {
  await requireAdmin();
  try {
    await connectToDatabase();
    
    for (const update of updates) {
      const { _id, ...fields } = update;
      
      // We also want to trigger an SEO audit immediately when fields are updated
      // so the dashboard numbers stay fresh without needing a cron job.
      
      const phone = await Phone.findById(_id) as any;
      if (phone) {
        // Apply the new manual fields
        Object.assign(phone, fields);
        
        // Recalculate SEO Score dynamically on save
        const newScore = SEOEngine.calculateScore(phone, 'phone');
        phone.seo_score = newScore;
        phone.seo_status = SEOEngine.getStatus(newScore);
        phone.last_seo_audit = new Date();
        
        await phone.save();
      }
    }

    // Revalidate necessary paths so changes go live instantly
    revalidatePath("/admin/seo", "page");
    revalidatePath("/admin/seo/keywords", "page");
    // Ideally we would also revalidate the specific phone pages, but Next.js
    // has a limit on how many paths you should revalidate in a loop.
    
    return { success: true };
  } catch (error: any) {
    console.error("Bulk update failed:", error);
    return { success: false, error: error.message };
  }
}
