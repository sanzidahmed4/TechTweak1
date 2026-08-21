import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import SearchPerformanceClient from "@/components/admin/seo/SearchPerformanceClient";
import { BarChart3 } from "lucide-react";

export const revalidate = 0;

export default async function SearchPerformanceDashboard() {
  await connectToDatabase();

  const phones = await Phone.find({ gsc_impressions: { $exists: true } })
    .select("name slug gsc_impressions gsc_clicks gsc_ctr gsc_position gsc_last_sync")
    .sort({ gsc_clicks: -1 })
    .lean();

  const serializedPhones = phones.map(p => ({
    _id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    impressions: p.gsc_impressions || 0,
    clicks: p.gsc_clicks || 0,
    ctr: p.gsc_ctr || 0,
    position: p.gsc_position || 0,
    lastSync: p.gsc_last_sync ? p.gsc_last_sync.toISOString() : null,
  }));

  const totalClicks = serializedPhones.reduce((acc, p) => acc + p.clicks, 0);
  const totalImpressions = serializedPhones.reduce((acc, p) => acc + p.impressions, 0);
  const avgPosition = serializedPhones.length > 0 
    ? (serializedPhones.reduce((acc, p) => acc + p.position, 0) / serializedPhones.length).toFixed(1) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="text-primary" size={28} />
            Search Performance
          </h1>
          <p className="text-slate-500 mt-1">Live Google Search Console ranking data perfectly mapped to your database.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Total Web Clicks</h3>
          <p className="text-3xl font-bold text-slate-900">{totalClicks.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Total Impressions</h3>
          <p className="text-3xl font-bold text-slate-900">{totalImpressions.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 mb-1">Average Position</h3>
          <p className="text-3xl font-bold text-slate-900">{avgPosition}</p>
        </div>
      </div>

      <SearchPerformanceClient initialData={serializedPhones} />
    </div>
  );
}
