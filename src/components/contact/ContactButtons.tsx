"use client";

import { openContactModal } from "@/components/layout/ContactModal";
import { Mail, MessageCircle } from "lucide-react";

export function OpenEmailModalButton({
  subject = "General Inquiry",
  label = "Send Message to contact@techtweak.tech",
  className = "",
}: {
  subject?: string;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => openContactModal(subject)}
      className={`inline-flex items-center gap-2 font-semibold text-primary hover:underline cursor-pointer ${className}`}
    >
      <Mail size={16} />
      {label}
    </button>
  );
}

export function BusinessContactButton() {
  return (
    <button
      type="button"
      onClick={() => openContactModal("Business & Advertising Proposal")}
      className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3.5 px-8 rounded-2xl hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 hover:shadow-lg cursor-pointer"
    >
      <Mail size={18} />
      Send Business Proposal
    </button>
  );
}
