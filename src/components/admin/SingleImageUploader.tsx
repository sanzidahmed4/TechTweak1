"use client";

import { useState } from "react";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";
import { CldUploadWidget } from 'next-cloudinary';

interface SingleImageUploaderProps {
  initialImage?: string;
  name: string; // The form name to submit
  label?: string;
  folder?: string; // Target Cloudinary folder
}

export default function SingleImageUploader({ 
  initialImage = "", 
  name, 
  label = "Upload Image",
  folder = "tech_tweak" 
}: SingleImageUploaderProps) {
  const [image, setImage] = useState<string>(initialImage);

  const handleCloudinarySuccess = (result: any) => {
    if (result.info && result.info.secure_url) {
      const optimizedUrl = result.info.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
      setImage(optimizedUrl);
    }
  };

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={image} />
      
      {image ? (
        <div className="relative w-full aspect-video sm:aspect-auto sm:h-32 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="Preview" className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              type="button"
              onClick={() => setImage("")}
              className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <CldUploadWidget 
          signatureEndpoint="/api/cloudinary/sign"
          onSuccess={handleCloudinarySuccess}
          options={{ multiple: false, maxFiles: 1, folder }}
        >
          {({ open }) => {
            return (
              <div 
                onClick={() => open()}
                className="w-full h-32 border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-primary rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary mb-2 transition-colors">
                  <ImageIcon size={20} />
                </div>
                <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700">{label}</span>
              </div>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
}
