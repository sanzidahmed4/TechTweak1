import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import TechnicalMonitorClient from "@/components/admin/seo/TechnicalMonitorClient";
import { Activity } from "lucide-react";

export const revalidate = 0;

export default async function TechnicalMonitoringDashboard() {
  await connectToDatabase();

  const phones = await Phone.find({})
    .select("name slug canonical_url og_image content_status index_status internal_link_count")
    .sort({ name: 1 })
    .lean() as any[];

  const serializedPhones = phones.map(p => {
    const hasCanonical = !!p.canonical_url;
    const hasOgImage = !!p.og_image;
    const contentMissing = p.content_status === "Missing" || !p.content_status;
    const isNoIndex = p.index_status === "noindex";
    const isOrphan = (p.internal_link_count || 0) === 0;

    let readiness = 0;
    if (hasCanonical) readiness += 20;
    if (hasOgImage) readiness += 20;
    if (!contentMissing) readiness += 20;
    if (!isNoIndex) readiness += 20;
    if (!isOrphan) readiness += 20;

    return {
      _id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      readiness,
      hasCanonical,
      hasOgImage,
      contentMissing,
      isNoIndex,
      isOrphan
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Activity className="text-primary" size={28} />
          Technical SEO Monitor
        </h1>
        <p className="text-slate-500 mt-1">Audit crawlability, indexation rules, and enterprise page quality at scale.</p>
      </div>

      <TechnicalMonitorClient initialData={serializedPhones} />
    </div>
  );
}
