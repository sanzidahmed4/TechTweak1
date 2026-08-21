import connectToDatabase from "@/lib/mongodb/mongoose";
import AdvisorAnalytic from "@/lib/models/AdvisorAnalytic";
import * as Icons from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default async function AdminAdvisorPage() {
  await connectToDatabase();

  let topPriority, topBudget, topBrand;
  let recentSearches: any[] = [];
  let advisorStats = { priority: "N/A", budget: "N/A", brand: "N/A" };

  try {
    [topPriority, topBudget, topBrand, recentSearches] = await Promise.all([
      AdvisorAnalytic.aggregate([{ $group: { _id: "$priority", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 1 }]),
      AdvisorAnalytic.aggregate([{ $group: { _id: "$budget", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 1 }]),
      AdvisorAnalytic.aggregate([{ $group: { _id: "$brand", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 1 }]),
      AdvisorAnalytic.find().sort({ created_at: -1 }).limit(20).lean()
    ]);

    advisorStats = {
      priority: topPriority[0]?._id || "N/A",
      budget: topBudget[0]?._id || "N/A",
      brand: topBrand[0]?._id || "N/A",
    };
  } catch (err) {
    console.error("Failed to fetch Advisor Analytics", err);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
            <Icons.Sparkles size={28} />
          </div>
          AI Advisor Insights
        </h1>
        <p className="text-slate-500 mt-2">Track what your users are searching for and their current phone preferences.</p>
      </div>

      {/* AI Advisor Analytics Summary */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 p-8 rounded-[2rem] shadow-lg text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
              <Icons.Target size={100} />
            </div>
            <h4 className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-2 relative z-10">Most Requested Type</h4>
            <p className="text-3xl font-black capitalize relative z-10">{advisorStats?.priority}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
              <Icons.Wallet size={100} />
            </div>
            <h4 className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-2 relative z-10">Popular Budget</h4>
            <p className="text-3xl font-black capitalize relative z-10">{advisorStats?.budget?.replace('_', ' ')}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
              <Icons.Award size={100} />
            </div>
            <h4 className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-2 relative z-10">Top Brand Preference</h4>
            <p className="text-3xl font-black capitalize relative z-10">{advisorStats?.brand}</p>
          </div>
        </div>
      </div>

      {/* Recent Searches Table */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">Recent User Searches</h2>
          <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">Last 20 Searches</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold bg-white">
                <th className="p-6">Time</th>
                <th className="p-6">Priority</th>
                <th className="p-6">Budget</th>
                <th className="p-6">Brand</th>
                <th className="p-6">Search Query</th>
                <th className="p-6">Surprise Me?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-sm">
              {recentSearches.length > 0 ? (
                recentSearches.map((search, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 text-slate-500 font-medium whitespace-nowrap">
                      {formatDistanceToNow(new Date(search.created_at), { addSuffix: true })}
                    </td>
                    <td className="p-6 font-bold capitalize text-slate-900">
                      {search.priority}
                    </td>
                    <td className="p-6 text-slate-700 capitalize whitespace-nowrap">
                      {search.budget?.replace('_', ' ')}
                    </td>
                    <td className="p-6 text-slate-700 capitalize">
                      {search.brand}
                    </td>
                    <td className="p-6">
                      {search.search_query ? (
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">{search.search_query}</span>
                      ) : (
                        <span className="text-slate-400 text-xs italic">N/A</span>
                      )}
                    </td>
                    <td className="p-6">
                      {search.is_surprise_me ? (
                        <span className="flex items-center gap-1 text-purple-600 font-bold text-xs bg-purple-50 px-3 py-1 rounded-full w-max">
                          <Icons.Sparkles size={12} /> Yes
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs font-medium">No</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500">
                    No analytics data recorded yet. Wait for users to use the AI Advisor.
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
