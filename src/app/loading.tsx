import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl">
      <div className="relative w-20 h-20 animate-pulse">
        <Image src="/sitelogo.svg" alt="TechTweak Logo" fill className="object-contain" />
      </div>
      <h2 className="mt-8 text-xl font-bold tracking-widest uppercase text-slate-400 animate-pulse">TechTweak</h2>
      <div className="mt-6 w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-[loading_1.5s_ease-in-out_infinite] rounded-full w-1/3"></div>
      </div>
    </div>
  );
}
