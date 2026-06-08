import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import Brand from "@/lib/models/Brand";
import Post from "@/lib/models/Post";
import Link from "next/link";
import { Activity, AlertTriangle, CheckCircle, Smartphone, Building2, FileText, Settings, BarChart2, LineChart } from "lucide-react";

export const revalidate = 0; // Always fetch fresh data for admin

export default async function SEOHealthDashboard() {
  await connectToDatabase();

  // Aggregate Data
  const totalPhones = await Phone.countDocuments();
  const totalBrands = await Brand.countDocuments();
  const totalPosts = await Post.countDocuments();
  
  // Infrastructure Metrics
  const phonesWithCanonical = await Phone.countDocuments({ canonical_url: { $exists: true, $ne: "" } });
  const phonesWithOgImage = await Phone.countDocuments({ og_image: { $exists: true, $ne: "" } });
  const phonesWithContent = await Phone.countDocuments({ seo_overview: { $exists: true, $ne: "" } });
  const orphanPhones = await Phone.countDocuments({ $or: [{ internal_link_count: 0 }, { internal_link_count: { $exists: false } }] });
  
  // Performance Metrics (from Phase E Mock/Live GSC Engine)
  const allPhones = await Phone.find({}, 'gsc_impressions gsc_clicks').lean() as any[];
  const totalImpressions = allPhones.reduce((acc, p) => acc + (p.gsc_impressions || 0), 0);
  const totalClicks = allPhones.reduce((acc, p) => acc + (p.gsc_clicks || 0), 0);
  const averageCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0;
  const hasGscData = totalImpressions > 0;

  // Critical Action List (Orphans, Missing Content, NoIndex)
  const criticalPhones = await Phone.find({ 
    $or: [
      { internal_link_count: 0 },
      { internal_link_count: { $exists: false } },
      { seo_overview: { $exists: false } },
      { seo_overview: "" },
      { index_status: "noindex" },
      { canonical_url: { $exists: false } },
      { canonical_url: "" }
    ]
  })
    .select('name slug seo_overview internal_link_count index_status canonical_url')
    .limit(10)
    .lean() as any[];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="text-primary" size={28} />
            SEO Command Center
          </h1>
          <p className="text-slate-500 mt-1">Focusing on traffic growth, indexation readiness, and real performance.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/seo/keywords" className="btn-primary">
            Keyword Strategy
          </Link>
          <Link href="/admin/seo/technical" className="btn-secondary">
            Technical Audit
          </Link>
        </div>
      </div>

      {/* SECTION B: SEO PERFORMANCE (GSC DATA) */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <BarChart2 className="text-purple-600" size={24} /> Section A: Real Search Performance
        </h2>
        {hasGscData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-blue-500">
              <h3 className="font-semibold text-slate-500 mb-2 uppercase tracking-wider text-xs">Total Impressions</h3>
              <p className="text-4xl font-black text-slate-900">{totalImpressions.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-emerald-500">
              <h3 className="font-semibold text-slate-500 mb-2 uppercase tracking-wider text-xs">Total Clicks</h3>
              <p className="text-4xl font-black text-slate-900">{totalClicks.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-indigo-500">
              <h3 className="font-semibold text-slate-500 mb-2 uppercase tracking-wider text-xs">Average CTR</h3>
              <p className="text-4xl font-black text-slate-900">{averageCtr}%</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm text-white">
               <h3 className="font-semibold text-slate-300 mb-4 uppercase tracking-wider text-xs">Total Indexed Entities</h3>
               <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><Smartphone size={16}/> Phones</span>
                    <span className="font-bold">{totalPhones}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><Building2 size={16}/> Brands</span>
                    <span className="font-bold">{totalBrands}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><FileText size={16}/> Posts</span>
                    <span className="font-bold">{totalPosts}</span>
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-500 flex flex-col items-center justify-center">
            <LineChart className="text-slate-300 mb-2" size={48} />
            <p className="text-lg font-bold text-slate-700">Awaiting GSC Integration</p>
            <p className="text-sm">Connect your Google Search Console API keys in Phase E to unlock real-time traffic data here.</p>
          </div>
        )}
      </div>

      {/* SECTION A: SEO INFRASTRUCTURE */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Settings className="text-slate-600" size={24} /> Section B: Infrastructure Readiness
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Canonical Coverage</p>
            <p className="text-2xl font-bold text-slate-900">{Math.round((phonesWithCanonical/Math.max(1, totalPhones))*100)}% <span className="text-sm font-medium text-slate-400">({phonesWithCanonical}/{totalPhones})</span></p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">OG Image Coverage</p>
            <p className="text-2xl font-bold text-slate-900">{Math.round((phonesWithOgImage/Math.max(1, totalPhones))*100)}% <span className="text-sm font-medium text-slate-400">({phonesWithOgImage}/{totalPhones})</span></p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Content Coverage</p>
            <p className="text-2xl font-bold text-slate-900">{Math.round((phonesWithContent/Math.max(1, totalPhones))*100)}% <span className="text-sm font-medium text-slate-400">({phonesWithContent}/{totalPhones})</span></p>
          </div>
          <div className="bg-red-50 p-5 rounded-2xl border border-red-100 shadow-sm">
            <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Orphan Pages Detected</p>
            <p className="text-2xl font-black text-red-700">{orphanPhones}</p>
          </div>
        </div>
      </div>

      {/* Critical Issues Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="text-red-500" />
            Priority Action List
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Page Entity</th>
                <th className="text-left py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Missing Fields / Index Blockers</th>
                <th className="text-right py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {criticalPhones.map(phone => {
                const missing = [];
                if (!phone.canonical_url) missing.push('Missing Canonical URL');
                if (!phone.seo_overview) missing.push('Missing SEO Content');
                if ((phone.internal_link_count || 0) === 0) missing.push('Orphan Page (0 Internal Links)');
                if (phone.index_status === "noindex") missing.push('NoIndex Tag Applied');

                return (
                  <tr key={phone._id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-900">{phone.name}</div>
                      <div className="text-xs text-slate-500">/phones/[brand]/{phone.slug}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-2">
                        {missing.map((m, i) => (
                          <span key={i} className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-1 rounded border border-red-100 uppercase tracking-wider">
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link href={`/admin/seo/technical`} className="text-sm font-medium text-primary hover:text-primary-dark">
                        Open Technical Audit
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {criticalPhones.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-slate-500">
                    <CheckCircle className="mx-auto text-emerald-500 mb-2" size={32} />
                    No critical issues found! Great job!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
