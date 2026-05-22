"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import CompareSearchModal from "./CompareSearchModal";

export default function CompareAddButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full h-full bg-slate-50 border-2 border-dashed border-slate-200 p-3 rounded-2xl flex flex-col items-center justify-center min-h-[140px] text-center hover:bg-slate-100 smooth-transition hover:border-primary/50 group"
      >
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm mb-2 group-hover:text-primary group-hover:scale-110 smooth-transition">
          <Plus size={16} />
        </div>
        <h3 className="font-semibold text-slate-500 text-xs group-hover:text-primary transition-colors">Add Device</h3>
      </button>

      <CompareSearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
