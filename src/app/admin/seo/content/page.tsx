import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import ContentManagerClient from "@/components/admin/seo/ContentManagerClient";
import { FileText } from "lucide-react";

export const revalidate = 0; // Disable caching

export default async function ContentManagerPage() {
  await connectToDatabase();

  const phones = await Phone.find({})
    .select("name slug seo_overview pros cons key_highlights verdict faqs content_status seo_score")
    .sort({ release_date_parsed: -1, name: 1 })
    .lean();

  const serializedPhones = phones.map(p => ({
    _id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    content_status: p.content_status || "Missing",
    seo_score: p.seo_score || 0,
    hasOverview: !!p.seo_overview,
    hasVerdict: !!p.verdict,
    hasProsCons: !!(p.pros?.length || p.cons?.length),
    hasFaqs: !!(p.faqs && p.faqs.length > 0)
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="text-primary" size={28} />
          Content SEO Manager
        </h1>
        <p className="text-slate-500 mt-1">Track and manage programmatic long-tail content generation across all phones.</p>
      </div>

      <ContentManagerClient initialData={serializedPhones} />
    </div>
  );
}
