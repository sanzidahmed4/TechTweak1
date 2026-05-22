"use client";

import { useState } from "react";
import { Bold, Italic, Link as LinkIcon, List, Heading, Image as ImageIcon } from "lucide-react";

export default function RichTextEditor({ name, required = false, defaultValue = "" }: { name: string, required?: boolean, defaultValue?: string }) {
  const [content, setContent] = useState(defaultValue);

  const insertText = (before: string, after: string = "") => {
    const textarea = document.getElementById("md-editor") as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const newText = content.substring(0, start) + before + selected + after + content.substring(end);
    
    setContent(newText);
    
    // Reset focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-slate-200 bg-white">
        <button type="button" onClick={() => insertText("**", "**")} className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg" title="Bold">
          <Bold size={16} />
        </button>
        <button type="button" onClick={() => insertText("*", "*")} className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg" title="Italic">
          <Italic size={16} />
        </button>
        <div className="w-px h-4 bg-slate-200 mx-1"></div>
        <button type="button" onClick={() => insertText("### ")} className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg" title="Heading">
          <Heading size={16} />
        </button>
        <button type="button" onClick={() => insertText("- ")} className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg" title="List">
          <List size={16} />
        </button>
        <div className="w-px h-4 bg-slate-200 mx-1"></div>
        <button type="button" onClick={() => insertText("[", "](url)")} className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg" title="Link">
          <LinkIcon size={16} />
        </button>
        <button type="button" onClick={() => insertText("![alt](", ")")} className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg" title="Image">
          <ImageIcon size={16} />
        </button>
      </div>

      <textarea 
        id="md-editor"
        name={name}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required={required}
        rows={12} 
        className="w-full p-4 bg-transparent focus:outline-none font-mono text-sm leading-relaxed resize-y"
        placeholder="Write your article content here using Markdown..."
      ></textarea>
      
      <div className="bg-slate-100/50 p-2 text-xs text-slate-400 font-mono border-t border-slate-200 flex justify-between">
        <span>Markdown Supported</span>
        <span>{content.length} characters</span>
      </div>
    </div>
  );
}
