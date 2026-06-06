"use client";

import { useState, useTransition } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteBlogPost } from "./actions";

export default function DeletePostButton({ id }: { id: string }) {
  const [showModal, setShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      try {
        await deleteBlogPost(id);
        setShowModal(false);
        router.refresh();
      } catch (e: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
        setError(e.message || "Failed to delete. Please try again.");
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        type="button"
        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        title="Delete Post"
      >
        <Trash2 size={16} />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !isPending && setShowModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full z-10">
            <button
              onClick={() => setShowModal(false)}
              disabled={isPending}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-5">
                <AlertTriangle size={28} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Post?</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                This action is permanent and cannot be undone. The post will be removed from the site immediately.
              </p>

              {error && (
                <p className="text-red-500 text-sm mb-4 bg-red-50 px-4 py-2 rounded-lg w-full">{error}</p>
              )}

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={isPending}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={14} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
