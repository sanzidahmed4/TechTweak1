"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { createInlineCategory } from "@/app/admin/blogs/actions";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectProps {
  initialCategories: Category[];
  defaultValue?: string;
}

export default function CategorySelect({ initialCategories, defaultValue = "" }: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddCategory = async () => {
    if (!newCatName.trim()) {
      setIsAdding(false);
      return;
    }

    setIsSubmitting(true);
    try {
      const newCat = await createInlineCategory(newCatName.trim());
      setCategories((prev) => [...prev, newCat].sort((a, b) => a.name.localeCompare(b.name)));
      setSelectedValue(newCat.id);
      setNewCatName("");
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to add category", error);
      alert("Failed to add category. It might already exist.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCategory();
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setNewCatName("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-slate-700">Category</label>
        {!isAdding && (
          <button 
            type="button" 
            onClick={() => setIsAdding(true)} 
            className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
          >
            <Plus size={12} /> Add New
          </button>
        )}
      </div>
      
      {isAdding ? (
        <div className="flex gap-2">
          <input 
            type="text" 
            autoFocus
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Category Name... (Press Enter)"
            className="w-full px-4 py-2 bg-white border border-primary/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm shadow-[0_0_0_2px_rgba(var(--primary),0.1)]"
            disabled={isSubmitting}
          />
          <button 
            type="button" 
            onClick={handleAddCategory}
            disabled={isSubmitting || !newCatName.trim()}
            className="bg-primary text-white px-3 py-2 rounded-xl text-sm font-semibold disabled:opacity-50"
          >
            {isSubmitting ? "..." : "Add"}
          </button>
          <button 
            type="button" 
            onClick={() => setIsAdding(false)}
            className="px-3 py-2 text-slate-500 hover:bg-slate-100 rounded-xl text-sm font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <select 
          name="category_id" 
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      )}
    </div>
  );
}
