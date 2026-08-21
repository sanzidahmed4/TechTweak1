import connectToDatabase from "@/lib/mongodb/mongoose";
import Backlink from "@/lib/models/Backlink";
import AuthorityClient from "@/components/admin/seo/AuthorityClient";
import { Link as LinkIcon } from "lucide-react";

export const revalidate = 0;

export default async function AuthorityDashboard() {
  await connectToDatabase();

  const backlinks = await Backlink.find({})
    .sort({ created_at: -1 })
    .lean();

  const serializedBacklinks = backlinks.map((b: any) => ({
    _id: b._id.toString(),
    target_url: b.target_url,
    source_url: b.source_url,
    domain: b.domain,
    domain_authority: b.domain_authority || 0,
    anchor_text: b.anchor_text || "",
    is_dofollow: b.is_dofollow,
    status: b.status,
    price: b.price || 0,
    date_acquired: b.date_acquired ? b.date_acquired.toISOString() : null,
  }));

  const liveLinks = serializedBacklinks.filter((b) => b.status === "Live");
  const totalDA = liveLinks.reduce((acc, b) => acc + b.domain_authority, 0);
  const avgDA = liveLinks.length > 0 ? Math.round(totalDA / liveLinks.length) : 0;
  
  const inProgress = serializedBacklinks.filter((b) => b.status === "Outreach_Sent" || b.status === "Negotiating").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <LinkIcon className="text-primary" size={28} />
          Authority & Outreach
        </h1>
        <p className="text-slate-500 mt-1">Manage your off-page SEO, track domain authority growth, and monitor link-building campaigns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Live Backlinks</h3>
          <p className="text-3xl font-bold text-slate-900">{liveLinks.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Avg. Domain Authority</h3>
          <p className="text-3xl font-bold text-slate-900">{avgDA} <span className="text-sm text-slate-400 font-medium">/ 100</span></p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Active Outreach</h3>
          <p className="text-3xl font-bold text-slate-900">{inProgress} <span className="text-sm text-slate-400 font-medium">campaigns</span></p>
        </div>
      </div>

      <AuthorityClient initialData={serializedBacklinks} />
    </div>
  );
}
