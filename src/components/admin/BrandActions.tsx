"use client";

import { Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { deleteBrand } from "@/app/admin/brands/actions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useTransition } from "react";

export default function BrandActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this brand? This action cannot be undone.")) {
      startTransition(async () => {
        await deleteBrand(id);
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link 
        href={`/admin/brands/${id}/edit`}
        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center justify-center"
      >
        <Edit size={16} />
      </Link>
      <button 
        onClick={handleDelete}
        disabled={isPending}
        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
      >
        {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
      </button>
    </div>
  );
}
