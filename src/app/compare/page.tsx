import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import Link from "next/link";
import { Search, Plus, X, Smartphone, Check, Zap } from "lucide-react";
import CompareAddButton from "@/components/compare/CompareAddButton";

export const metadata = {
  title: "Compare Smartphones | TechTweak",
  description: "Compare specifications, features, and prices of the latest smartphones side-by-side.",
};

// Helper to extract numbers for comparison
const extractNumber = (str: string | null | undefined) => {
  if (!str) return 0;
  const match = str.toString().match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ phones?: string }> }) {
  const { phones: phonesQuery } = await searchParams;
  const slugs = phonesQuery ? phonesQuery.split(',').slice(0, 4) : []; // max 4 phones
  
  await connectToDatabase();
  let comparedPhones: any[] = [];
  
  if (slugs.length > 0) {
    try {
      const rawPhones = await Phone.find({ slug: { $in: slugs } })
        .populate('brand_id', 'name slug')
        .lean();
        
      if (rawPhones) {
        // Maintain order of slugs
        comparedPhones = slugs.map(slug => {
          const p: any = rawPhones.find((rp: any) => rp.slug === slug);
          if (!p) return null;
          return {
            id: p._id.toString(),
            name: p.name,
            slug: p.slug,
            brands: { name: p.brand_id?.name },
            processor: p.processor,
            ram: p.ram,
            storage: p.storage,
            display: p.display,
            camera_main: p.camera_main,
            camera_front: p.camera_front,
            battery: p.battery,
            charging: p.charging,
            os: (p.android_version || p.os) ? `${p.android_version || p.os} (Upgradable)` : undefined,
            price_bdt: p.price_bdt,
            antutu_score: p.antutu_score,
            images: p.images
          };
        }).filter(Boolean);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Define specs to compare with highlighting logic
  const specs = [
    { label: "Price (BDT)", key: "price_bdt", prefix: "৳", invertHighlight: true }, // lower is better
    { label: "Processor", key: "processor" },
    { label: "RAM", key: "ram", highlight: true }, // higher is better
    { label: "Storage", key: "storage", highlight: true },
    { label: "Display", key: "display", highlight: true },
    { label: "Main Camera", key: "camera_main" },
    { label: "Front Camera", key: "camera_front" },
    { label: "Battery", key: "battery", highlight: true },
    { label: "Charging", key: "charging", highlight: true },
    { label: "OS", key: "os" },
    { label: "AnTuTu Score", key: "antutu_score", highlight: true },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      {/* Sticky Header Section */}
      <div className={`transition-all ${comparedPhones.length > 0 ? "bg-white border-b border-slate-200 sticky top-[72px] sm:top-[76px] z-40 shadow-sm py-6" : "pt-12 pb-6"}`}>
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="hidden lg:block col-span-1">
              <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Compare</h1>
              <p className="text-slate-500 text-sm pr-4">Select up to 4 devices to map their specifications.</p>
            </div>

            {/* Render selected phones in Header */}
            {comparedPhones.map((phone, idx) => (
              <div key={idx} className="bg-white p-3 rounded-2xl border border-slate-200 relative text-center group smooth-transition hover:border-primary/30 shadow-sm">
                <Link 
                  href={`/compare?phones=${slugs.filter((s) => s !== phone.slug).join(',')}`}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors shadow-sm z-10"
                  title="Remove"
                >
                  <X size={14} />
                </Link>
                <div className="w-12 h-16 mx-auto bg-slate-50 rounded-lg mb-2 flex items-center justify-center overflow-hidden border border-slate-100">
                  {phone.images && phone.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={phone.images[0]} alt={phone.name} className="w-full h-full object-cover" />
                  ) : (
                    <Smartphone size={20} className="text-slate-300" />
                  )}
                </div>
                <p className="text-[10px] font-bold text-primary uppercase mb-0.5">{phone.brands?.name}</p>
                <h3 className="font-bold text-slate-900 line-clamp-1 text-xs">{phone.name}</h3>
              </div>
            ))}

            {/* Empty Slots */}
            {Array.from({ length: 4 - comparedPhones.length }).map((_, idx) => (
              <CompareAddButton key={`empty-${idx}`} />
            ))}
          </div>
        </div>
      </div>

      <div className={`max-w-6xl mx-auto px-4 lg:px-8 ${comparedPhones.length > 0 ? "pt-12" : "pt-4"}`}>
        {/* Comparison Table */}
        {comparedPhones.length > 0 ? (
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <tbody className="divide-y divide-slate-100">
                  {specs.map((spec) => {
                    // Find the best value for highlighting
                    let bestValueIdx = -1;
                    if (spec.highlight || spec.invertHighlight) {
                      let bestVal = spec.invertHighlight ? Infinity : -Infinity;
                      comparedPhones.forEach((p, idx) => {
                        const num = extractNumber(p[spec.key]);
                        if (num > 0) {
                          if (spec.invertHighlight && num < bestVal) { bestVal = num; bestValueIdx = idx; }
                          else if (!spec.invertHighlight && num > bestVal) { bestVal = num; bestValueIdx = idx; }
                        }
                      });
                    }

                    return (
                      <tr key={spec.key} className="hover:bg-slate-50/50 transition-colors">
                        <th className="p-5 lg:p-6 w-[20%] bg-slate-50/50 text-sm font-bold text-slate-900 uppercase tracking-wider border-r border-slate-100 align-top">
                          {spec.label}
                        </th>
                        {comparedPhones.map((phone, idx) => {
                          const value = phone[spec.key];
                          const isBest = idx === bestValueIdx;
                          
                          return (
                            <td key={idx} className={`p-5 lg:p-6 w-[20%] align-top ${idx < comparedPhones.length - 1 ? 'border-r border-slate-100' : ''}`}>
                              {value ? (
                                <div className={`flex flex-col gap-2 ${isBest ? "text-green-700" : "text-slate-600"}`}>
                                  <span className={`text-base font-medium ${isBest ? "font-bold" : ""}`}>
                                    {spec.prefix}{value}
                                  </span>
                                  {isBest && (
                                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full w-fit">
                                      <Zap size={10} /> Winner
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-slate-300">-</span>
                              )}
                            </td>
                          );
                        })}
                        {/* Fill empty columns */}
                        {Array.from({ length: 4 - comparedPhones.length }).map((_, idx) => (
                          <td key={`empty-td-${idx}`} className={`p-5 lg:p-6 w-[20%] bg-slate-50/30 ${idx < 3 - comparedPhones.length ? 'border-r border-slate-100' : ''}`}></td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-16">
              <div className="hidden lg:block lg:col-span-1"></div>
              <div className="lg:col-span-4">
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-12 lg:p-16 text-center">
                  <Smartphone size={64} className="text-slate-300 mx-auto mb-6" strokeWidth={1} />
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Ready to Compare?</h3>
                  <p className="text-slate-500 text-lg max-w-lg mx-auto">Click the 'Add Device' slots in the header above to start mapping specifications side-by-side.</p>
                </div>
              </div>
            </div>

            <div className="mb-8 max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Popular Comparisons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/compare?phones=iphone-16-pro-max,galaxy-s24-ultra" className="glass-card hover-card p-6 rounded-2xl flex items-center justify-between group">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">iPhone 16 Pro Max vs Galaxy S24 Ultra</h4>
                    <p className="text-sm text-slate-500">The Ultimate Flagship Battle</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white smooth-transition">
                    <Zap size={18} />
                  </div>
                </Link>
                <Link href="/compare?phones=pixel-9-pro,iphone-16-pro" className="glass-card hover-card p-6 rounded-2xl flex items-center justify-between group">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Pixel 9 Pro vs iPhone 16 Pro</h4>
                    <p className="text-sm text-slate-500">Compact Powerhouses</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white smooth-transition">
                    <Zap size={18} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
