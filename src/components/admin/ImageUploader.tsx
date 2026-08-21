"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, X, FolderSync } from "lucide-react";
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploaderProps {
  initialImages?: string[];
  name: string; // The form name to submit
  folder?: string; // Target Cloudinary folder
}

export default function ImageUploader({ 
  initialImages = [], 
  name,
  folder = "tech_tweak" 
}: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [externalUrl, setExternalUrl] = useState("");

  const addExternalImage = () => {
    if (externalUrl.trim()) {
      // Split by comma if user pastes multiple
      const newUrls = externalUrl.split(',').map(u => u.trim()).filter(Boolean);
      setImages(prev => [...prev, ...newUrls]);
      setExternalUrl("");
    }
  };

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleCloudinarySuccess = (result: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
    if (result.info && result.info.secure_url) {
      const optimizedUrl = result.info.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
      setImages(prev => [...prev, optimizedUrl]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden input to pass to Server Actions */}
      <input type="hidden" name={name} value={images.join("|")} />

      {/* Cloudinary Upload Area */}
      <CldUploadWidget 
        signatureEndpoint="/api/cloudinary/sign"
        onSuccess={handleCloudinarySuccess}
        options={{ multiple: true, folder }}
      >
        {({ open }) => {
          return (
            <div 
              onClick={() => open()}
              className="border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-primary rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer"
            >
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-primary mb-4">
                <UploadCloud size={28} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">Click to Upload Media</h3>
              <p className="text-slate-500 text-sm mb-6 text-center max-w-sm">
                Upload images directly to Cloudinary.
              </p>
              <button type="button" className="bg-white border border-slate-200 text-slate-700 px-6 py-2 rounded-xl font-medium hover:border-primary transition-colors text-sm shadow-sm pointer-events-none">
                Browse Files
              </button>
            </div>
          );
        }}
      </CldUploadWidget>

      <div className="flex items-center gap-4">
        <div className="h-px bg-slate-200 flex-1"></div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">OR Add External Path</span>
        <div className="h-px bg-slate-200 flex-1"></div>
      </div>

      {/* External Mapping */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <FolderSync className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={externalUrl}
            onChange={e => setExternalUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addExternalImage())}
            placeholder="e.g. https://cdn..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
          />
        </div>
        <button 
          type="button" 
          onClick={addExternalImage}
          className="bg-slate-900 text-white px-6 rounded-xl font-medium hover:bg-slate-800 transition-colors text-sm"
        >
          Add Path
        </button>
      </div>

      {/* Preview Gallery */}
      {images.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Gallery Preview ({images.length})</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="aspect-[3/4] bg-slate-100 rounded-xl border border-slate-200 relative group overflow-hidden">
                <Image
                  src={img}
                  alt={`Preview ${idx}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover"
                />
                
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
