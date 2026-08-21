import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import InternalLinkClient from "@/components/admin/seo/InternalLinkClient";
import { Link2 } from "lucide-react";

export const revalidate = 0;

export default async function InternalLinksDashboard() {
  await connectToDatabase();

  const phones = await Phone.find({})
    .select("name slug internal_link_count internal_link_score")
    .sort({ internal_link_score: 1, name: 1 })
    .lean();

  const serializedPhones = phones.map(p => ({
    _id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    count: p.internal_link_count || 0,
    score: p.internal_link_score || 0,
  }));

  const totalLinks = serializedPhones.reduce((acc, p) => acc + p.count, 0);
  const orphans = serializedPhones.filter(p => p.count === 0);
  const weak = serializedPhones.filter(p => p.count > 0 && p.count < 3);
  const strong = serializedPhones.filter(p => p.count >= 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Link2 className="text-primary" size={28} />
          Internal Linking Dashboard
        </h1>
        <p className="text-slate-500 mt-1">Monitor the semantic graph strength, fix orphan pages, and maximize crawl depth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-primary">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Total Graph Edges</h3>
          <p className="text-3xl font-bold text-slate-900">{totalLinks}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-red-500">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Orphan Pages</h3>
          <p className="text-3xl font-bold text-red-600">{orphans.length}</p>
          <p className="text-xs text-red-500 mt-1">0 incoming links</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-amber-500">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Weakly Linked</h3>
          <p className="text-3xl font-bold text-amber-600">{weak.length}</p>
          <p className="text-xs text-amber-500 mt-1">&lt; 3 incoming links</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Strongly Linked</h3>
          <p className="text-3xl font-bold text-emerald-600">{strong.length}</p>
          <p className="text-xs text-emerald-500 mt-1">3+ incoming links</p>
        </div>
      </div>

      <InternalLinkClient initialData={serializedPhones} />
    </div>
  );
}
