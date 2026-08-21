import connectToDatabase from "@/lib/mongodb/mongoose";
import Subscriber from "@/lib/models/Subscriber";
import { Mail, Users, Download, Calendar, CheckCircle2, UserX } from "lucide-react";
import SubscribersClient from "./SubscribersClient";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  await connectToDatabase();
  const rawSubscribers = await Subscriber.find().sort({ created_at: -1 }).lean();
  
  const subscribers = rawSubscribers.map((s: any) => ({
    _id: s._id.toString(),
    email: s.email,
    status: s.status || "active",
    source: s.source || "footer_newsletter",
    created_at: s.created_at ? new Date(s.created_at).toISOString() : new Date().toISOString(),
  }));

  const activeCount = subscribers.filter((s) => s.status === "active").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
            <Mail size={14} /> Newsletter Community
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Email Subscribers
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your audience, view subscriber growth, and export email lists for campaigns.
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Audience</p>
            <h3 className="text-2xl font-black text-slate-900">{subscribers.length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Subscribers</p>
            <h3 className="text-2xl font-black text-slate-900">{activeCount}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Mail size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Default Sender</p>
            <p className="text-xs font-bold text-slate-800 truncate max-w-[180px]">
              {process.env.SMTP_USER || "affilancersanzid@gmail.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Client Table with CSV Export and Search */}
      <SubscribersClient initialSubscribers={subscribers} />
    </div>
  );
}
