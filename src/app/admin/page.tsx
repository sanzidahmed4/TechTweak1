import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import Brand from "@/lib/models/Brand";
import Post from "@/lib/models/Post";
import Link from "next/link";
import { Smartphone, Tags, FileText, ArrowRight, TrendingUp, Users, Activity, Battery, Cpu } from "lucide-react";

export default async function AdminDashboardPage() {
  await connectToDatabase();
  
  // Fetch real counts
  let phonesCount = 0, brandsCount = 0, postsCount = 0;
  try {
    [phonesCount, brandsCount, postsCount] = await Promise.all([
      Phone.countDocuments(),
      Brand.countDocuments(),
      Post.countDocuments(),
    ]);
  } catch (err) {
    console.error("MongoDB count failed", err);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h1>
        <p className="text-slate-500">Welcome back. Here's what's happening on your platform today.</p>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 smooth-transition">
              <Smartphone size={24} />
            </div>
            <span className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
              <TrendingUp size={14} /> +12%
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Total Devices</h3>
          <p className="text-4xl font-black text-slate-900">{phonesCount || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 smooth-transition">
              <FileText size={24} />
            </div>
            <span className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
              <TrendingUp size={14} /> +4%
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Published Articles</h3>
          <p className="text-4xl font-black text-slate-900">{postsCount || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:scale-110 smooth-transition">
              <Users size={24} />
            </div>
            <span className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
              <TrendingUp size={14} /> +28%
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Monthly Visitors</h3>
          <p className="text-4xl font-black text-slate-900">142.5K</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl group-hover:scale-110 smooth-transition">
              <Activity size={24} />
            </div>
            <span className="text-sm font-bold text-slate-400">Live</span>
          </div>
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">System Health</h3>
          <p className="text-2xl font-black text-green-500 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span> Operational
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">Traffic Overview</h2>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
            {[40, 60, 30, 80, 50, 90, 70].map((height, i) => (
              <div key={i} className="w-full bg-slate-100 rounded-t-xl relative group">
                <div 
                  className="absolute bottom-0 w-full bg-primary/20 rounded-t-xl group-hover:bg-primary smooth-transition" 
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-4 px-4 font-bold uppercase tracking-widest">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
          </div>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {[
              { title: "Published 'Galaxy S25 Ultra'", time: "2 hours ago", icon: Smartphone, color: "text-blue-500 bg-blue-50" },
              { title: "Updated SEO Schema", time: "5 hours ago", icon: FileText, color: "text-purple-500 bg-purple-50" },
              { title: "Added 'Snapdragon 8 Gen 4'", time: "1 day ago", icon: Cpu, color: "text-amber-500 bg-amber-50" },
              { title: "System Backup Completed", time: "2 days ago", icon: Activity, color: "text-green-500 bg-green-50" },
            ].map((log, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${log.color} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10`}>
                  <log.icon size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover:border-slate-300 smooth-transition">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-slate-900 text-sm">{log.title}</div>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
