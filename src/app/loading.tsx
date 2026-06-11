import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl">
      <div className="relative w-20 h-20 animate-pulse">
        <Image src="/sitelogo.svg" alt="TechTweak Logo" fill className="object-contain" />
      </div>
      <div className="mt-6 flex items-center justify-center animate-pulse">
        <span className="font-bold text-3xl tracking-tight text-slate-900">
          Tech<span className="text-primary">Tweak</span>
        </span>
      </div>
      <div className="mt-6 w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-[loading_1.5s_ease-in-out_infinite] rounded-full w-1/3"></div>
      </div>
    </div>
  );
}
