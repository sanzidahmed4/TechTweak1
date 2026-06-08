import { CheckCircle2, XCircle, Gamepad2, Camera, Battery, ThumbsUp, HelpCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function EditorialContent({ phone }: { phone: any }) {
  const hasEditorial = phone.seo_overview || phone.verdict || phone.gaming_review || phone.camera_review || phone.battery_review || (phone.pros && phone.pros.length > 0) || (phone.cons && phone.cons.length > 0) || (phone.faqs && phone.faqs.length > 0);

  if (!hasEditorial) return null;

  return (
    <div className="space-y-8 mb-8">
      
      {/* Overview */}
      {phone.seo_overview && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-600">
          <h2 className="text-xl font-black text-slate-900 mt-0 mb-4 flex items-center gap-2">
            <ThumbsUp className="text-primary" size={20} />
            {phone.name} Overview
          </h2>
          <ReactMarkdown>{phone.seo_overview}</ReactMarkdown>
        </div>
      )}

      {/* Pros and Cons */}
      {((phone.pros && phone.pros.length > 0) || (phone.cons && phone.cons.length > 0)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phone.pros && phone.pros.length > 0 && (
            <div className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-100 shadow-sm">
              <h3 className="text-sm font-black text-emerald-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} /> Reasons to Buy
              </h3>
              <ul className="space-y-3">
                {phone.pros.map((pro: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-emerald-900 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {phone.cons && phone.cons.length > 0 && (
            <div className="bg-red-50/50 rounded-3xl p-6 border border-red-100 shadow-sm">
              <h3 className="text-sm font-black text-red-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <XCircle size={16} /> Reasons to Avoid
              </h3>
              <ul className="space-y-3">
                {phone.cons.map((con: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-red-900 font-medium">
                    <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Deep Dive Reviews */}
      {(phone.gaming_review || phone.camera_review || phone.battery_review) && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Deep Dive Review</h2>
          </div>
          <div className="p-6 space-y-8 prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-600 prose-headings:text-slate-800 prose-headings:font-bold">
            
            {phone.camera_review && (
              <div className="scroll-mt-24" id="camera-review">
                <h3 className="flex items-center gap-2 text-lg text-pink-600 mt-0">
                  <Camera size={20} /> Camera Performance
                </h3>
                <ReactMarkdown>{phone.camera_review}</ReactMarkdown>
              </div>
            )}

            {phone.gaming_review && (
              <div className="scroll-mt-24" id="gaming-review">
                <h3 className="flex items-center gap-2 text-lg text-indigo-600">
                  <Gamepad2 size={20} /> Gaming & Performance
                </h3>
                <ReactMarkdown>{phone.gaming_review}</ReactMarkdown>
              </div>
            )}

            {phone.battery_review && (
              <div className="scroll-mt-24" id="battery-review">
                <h3 className="flex items-center gap-2 text-lg text-emerald-600">
                  <Battery size={20} /> Battery Life & Charging
                </h3>
                <ReactMarkdown>{phone.battery_review}</ReactMarkdown>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Final Verdict */}
      {phone.verdict && (
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl text-white">
          <h2 className="text-xl font-black text-white mt-0 mb-4 flex items-center gap-2">
            Final Verdict
          </h2>
          <div className="prose prose-invert max-w-none prose-p:leading-relaxed text-slate-300">
            <ReactMarkdown>{phone.verdict}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* FAQs */}
      {phone.faqs && phone.faqs.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <HelpCircle size={16} />
            </div>
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {phone.faqs.map((faq: any, index: number) => (
              <div key={index} className="p-6">
                <h3 className="text-slate-900 font-bold mb-2 text-base">Q: {faq.question}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
