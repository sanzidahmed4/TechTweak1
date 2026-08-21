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

  const serializedPhones = phones.map(p => {
    const hasOverview = !!p.seo_overview;
    const hasVerdict = !!p.verdict;
    const hasProsCons = !!(p.pros?.length || p.cons?.length);
    const hasFaqs = !!(p.faqs && p.faqs.length > 0);

    let status = p.content_status;
    if (!status || status === "Missing") {
      if (hasOverview && hasVerdict && hasProsCons && hasFaqs) {
        status = "Published";
      } else if (hasOverview || hasVerdict || hasProsCons || hasFaqs) {
        status = "Draft";
      } else {
        status = "Missing";
      }
    }

    return {
      _id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      content_status: status,
      seo_score: p.seo_score || 0,
      hasOverview,
      hasVerdict,
      hasProsCons,
      hasFaqs
    };
  });

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
