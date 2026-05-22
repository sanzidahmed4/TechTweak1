"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  initialTags?: string[];
  name?: string;
}

export default function TagInput({ initialTags = [], name = "tags" }: TagInputProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const newTag = inputValue.trim().replace(/^,+|,+$/g, ""); // Remove trailing/leading commas
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      {/* Hidden input to store tags as a JSON string so it submits with FormData */}
      <input type="hidden" name={name} value={JSON.stringify(tags)} />

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-lg"
          >
            {tag}
            <button 
              type="button" 
              onClick={() => removeTag(tag)}
              className="text-primary/60 hover:text-primary transition-colors focus:outline-none"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder="Add tags... (Press Enter to add)"
        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
      />
      <p className="text-xs text-slate-500">Press Enter or comma to add a tag. Click X to remove.</p>
    </div>
  );
}
