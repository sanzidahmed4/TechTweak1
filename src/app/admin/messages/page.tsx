import connectToDatabase from "@/lib/mongodb/mongoose";
import ContactMessage from "@/lib/models/ContactMessage";
import { MessageSquare, Mail, User, Calendar, Clock, Inbox } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  await connectToDatabase();
  const rawMessages = await ContactMessage.find().sort({ created_at: -1 }).lean();

  const messages = rawMessages.map((m: any) => ({
    _id: m._id.toString(),
    name: m.name,
    email: m.email,
    subject: m.subject,
    message: m.message,
    status: m.status || "unread",
    created_at: m.created_at ? new Date(m.created_at).toISOString() : new Date().toISOString(),
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
          <MessageSquare size={14} /> Visitor Inquiries
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Contact Messages
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Read inquiries, partnership requests, and feedback submitted through the contact popup and footer.
        </p>
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
          <Inbox size={48} className="mx-auto mb-3 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-700">Inbox is empty</h3>
          <p className="text-xs text-slate-400 mt-1">
            New contact inquiries will appear here when visitors reach out.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{msg.name}</h3>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-primary font-medium hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Mail size={12} /> {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock size={13} />
                  <span>
                    {new Date(msg.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Subject
                </span>
                <p className="font-bold text-slate-800 text-sm">{msg.subject}</p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Message
                </span>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Mail size={13} /> Direct Reply to {msg.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
