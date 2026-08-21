"use client";

import { useState, useEffect } from "react";
import { X, Mail, Send, CheckCircle2, User, Type, MessageSquare, Loader2, Sparkles } from "lucide-react";

export function openContactModal(initialSubject = "") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-contact-modal", { detail: { subject: initialSubject } })
    );
  }
}

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ subject?: string }>;
      if (customEvent.detail?.subject) {
        setSubject(customEvent.detail.subject);
      }
      setIsOpen(true);
      setSuccess(false);
      setError("");
    };

    window.addEventListener("open-contact-modal", handleOpen);
    return () => window.removeEventListener("open-contact-modal", handleOpen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSuccess(false);
      setError("");
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError("Please fill in all fields before sending.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send your message. Please try again.");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={closeModal}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header Header Pattern */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-primary px-6 sm:px-8 py-6 text-white relative">
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <Mail size={20} className="text-blue-300" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-blue-300 flex items-center gap-1">
                <Sparkles size={12} /> Contact TechTweak
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Send us a Message
              </h3>
            </div>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Have a question, feedback, or inquiry? Send us a message directly to our inbox.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {success ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Message Sent!</h4>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">
                Thank you for reaching out. Your message has been safely delivered to our team. We will respond to your email as soon as possible.
              </p>
              <div className="pt-4 flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Send Another
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/20 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
                  {error}
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <User size={13} className="text-slate-400" /> Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Mail size={13} className="text-slate-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Type size={13} className="text-slate-400" /> Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter subject"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <MessageSquare size={13} className="text-slate-400" /> Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-xl shadow-md shadow-primary/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
