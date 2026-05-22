import { Smartphone } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl">
      <div className="relative">
        <Smartphone size={64} className="text-slate-200 animate-pulse" strokeWidth={1} />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent animate-bounce opacity-80 mix-blend-overlay"></div>
      </div>
      <h2 className="mt-8 text-xl font-bold tracking-widest uppercase text-slate-400 animate-pulse">TechTweak</h2>
      <div className="mt-6 w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-[loading_1.5s_ease-in-out_infinite] rounded-full w-1/3"></div>
      </div>
    </div>
  );
}
