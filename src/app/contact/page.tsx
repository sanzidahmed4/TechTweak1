export const metadata = {
  title: 'Contact Us | TechTweak',
  description: 'Get in touch with the TechTweak team for inquiries, feedback, or support regarding our smartphone reviews and comparisons.',
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | TechTweak",
    description: "Get in touch with the TechTweak team for inquiries, feedback, or support regarding our smartphone reviews and comparisons.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | TechTweak",
    description: "Get in touch with the TechTweak team for inquiries, feedback, or support regarding our smartphone reviews and comparisons.",
  },
};

import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { OpenEmailModalButton, BusinessContactButton } from "@/components/contact/ContactButtons";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Contact Us
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Get in <span className="text-blue-600">Touch</span>.
          </h1>
          <p className="text-xl text-slate-600 mb-12">
            Have a question, feedback, or a partnership proposal? We would love to hear from you. Our team is always ready to assist you.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-start hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-600 mb-4">For general inquiries, support, or editorial questions.</p>
              <OpenEmailModalButton 
                subject="General Inquiry from Contact Page" 
                label="Send Direct Email to Team" 
                className="mt-auto text-blue-600 font-semibold hover:underline"
              />
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-start hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Social Media</h3>
              <p className="text-slate-600 mb-4">Follow us for the latest updates and send us a direct message.</p>
              <a href="https://www.facebook.com/profile.php?id=61590823097198" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline mt-auto">
                Visit our Facebook Page
              </a>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Business & Advertising</h3>
            <p className="text-slate-600 mb-4 max-w-lg mx-auto">
              Interested in advertising on TechTweak or exploring a business partnership? Contact our business team directly.
            </p>
            <div className="mt-2">
              <BusinessContactButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
