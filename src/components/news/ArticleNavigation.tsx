import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PostNode {
  title: string;
  slug: string;
}

interface Props {
  prevPost: PostNode | null;
  nextPost: PostNode | null;
}

export default function ArticleNavigation({ prevPost, nextPost }: Props) {
  if (!prevPost && !nextPost) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 mb-8 pt-8 border-t border-slate-200">
      {prevPost ? (
        <Link 
          href={`/news/${prevPost.slug}`}
          className="group flex flex-col p-5 bg-white rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2 group-hover:text-primary transition-colors">
            <ArrowLeft size={14} />
            Previous Article
          </div>
          <h4 className="font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {prevPost.title}
          </h4>
        </Link>
      ) : (
        <div /> // Empty div for grid alignment if no prev post
      )}

      {nextPost ? (
        <Link 
          href={`/news/${nextPost.slug}`}
          className="group flex flex-col p-5 bg-white rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all text-right items-end"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2 group-hover:text-primary transition-colors">
            Next Article
            <ArrowRight size={14} />
          </div>
          <h4 className="font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {nextPost.title}
          </h4>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
