import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  let comparedPhones: any /* eslint-disable-line @typescript-eslint/no-explicit-any */[] = [];
  
  if (slugs.length > 0) {
    try {
      const rawPhones = await Phone.find({ slug: { $in: slugs } })
        .populate('brand_id', 'name slug')
        .lean();
        
      if (rawPhones) {
        // Maintain order of slugs
        comparedPhones = slugs.map(slug => {
          const p: any   = rawPhones.find((rp: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => rp.slug === slug);
          if (!p) return null;
          return {
            id: p._id.toString(),
            name: p.name,
            slug: p.slug,
            brands: { name: p.brand_id?.name },
            processor: p.processor || p.cpu,
            ram: p.ram || p.ram_variants,
            storage: p.storage || p.storage_variants,
            display: p.display || p.screen_size,
            camera_main: p.camera_main || p.cam_main_sensor,
            camera_front: p.camera_front || p.cam_front_resolution,
            battery: p.battery || p.battery_capacity,
            charging: p.charging || p.charging_wired,
            os: (p.android_version || p.os) ? `${p.android_version || p.os} (Upgradable)` : undefined,
            price_usd: p.price_usd,
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
    { label: "Price (USD)", key: "price_usd", prefix: "$", invertHighlight: true }, // lower is better
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
      {/* =========================================
          EMPTY STATE HEADER (When 0 phones selected)
          ========================================= */}
      {comparedPhones.length === 0 && (
        <div className="pt-2 pb-6 lg:pt-16 lg:pb-12">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            {/* Mobile Title (Hidden on Desktop) */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Compare</h1>
              <p className="text-slate-500 text-sm">Select up to 4 devices to map their specifications.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 items-end max-w-4xl lg:max-w-none mx-auto">
              {/* Desktop Title (Hidden on Mobile) */}
              <div className="hidden lg:block col-span-1">
                <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Compare</h1>
                <p className="text-slate-500 text-sm pr-4">Select up to 4 devices to map their specifications.</p>
              </div>

              {/* Empty Slots */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <CompareAddButton key={`empty-${idx}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          DESKTOP STICKY HEADER (Original UI)
          ========================================= */}
      {comparedPhones.length > 0 && (
        <div className="hidden lg:block transition-all bg-white border-b border-slate-200 sticky top-[72px] z-40 shadow-sm py-6">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-5 gap-4 items-end">
              <div className="col-span-1">
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
      )}

      {/* =========================================
          MOBILE STICKY HEADER (New UI)
          ========================================= */}
      {comparedPhones.length > 0 && (
        <div className="lg:hidden bg-white sticky top-[60px] sm:top-[76px] z-40 shadow-sm border-b border-slate-200 py-3 transition-all">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
              <div className="shrink-0 mr-2">
                <h2 className="text-xl font-black text-slate-900">Compare</h2>
              </div>
              
              {/* Render selected phones horizontally */}
              {comparedPhones.map((phone) => (
                <div key={phone.slug} className="shrink-0 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2 pr-4 relative min-w-[160px] group hover:border-primary/30 transition-colors">
                  <Link 
                    href={`/compare?phones=${slugs.filter((s) => s !== phone.slug).join(',')}`}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-white border border-slate-200 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors shadow-sm z-10"
                    title="Remove"
                  >
                    <X size={12} />
                  </Link>
                  <div className="w-10 h-10 shrink-0 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-100 p-1">
                    {phone.images && phone.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={phone.images[0]} alt={phone.name} className="w-full h-full object-contain" />
                    ) : (
                      <Smartphone size={16} className="text-slate-300" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[9px] font-bold text-primary uppercase leading-tight">{phone.brands?.name}</span>
                    <span className="text-xs font-bold text-slate-900 line-clamp-1 leading-tight">{phone.name}</span>
                  </div>
                </div>
              ))}

              {/* Add Device Button (Compact) */}
              {comparedPhones.length < 4 && (
                <div className="shrink-0 h-[58px]">
                  <CompareAddButton compact={true} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={`max-w-6xl mx-auto px-4 lg:px-8 ${comparedPhones.length > 0 ? "pt-8 lg:pt-12" : "pt-4"}`}>
        {/* Comparison Table */}
        {comparedPhones.length > 0 ? (
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className={`w-full text-left border-collapse table-fixed lg:min-w-[800px] ${comparedPhones.length > 2 ? 'min-w-[800px]' : 'min-w-full'}`}>
                
                {/* Mobile Thead (Hidden on Desktop) */}
                <thead className="lg:hidden bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="p-3 w-[28%] text-xs font-bold text-slate-900 uppercase tracking-wider border-r border-slate-100 align-bottom">
                      Specs
                    </th>
                    {comparedPhones.map((phone, idx) => (
                      <th key={idx} className={`p-3 text-center align-bottom border-slate-100 ${idx < comparedPhones.length - 1 ? 'border-r' : ''}`}>
                        <div className="w-16 h-20 mx-auto bg-white rounded-xl mb-3 flex items-center justify-center overflow-hidden border border-slate-100 p-1 shadow-sm">
                          {phone.images && phone.images[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={phone.images[0]} alt={phone.name} className="w-full h-full object-contain" />
                          ) : (
                            <Smartphone size={24} className="text-slate-300" />
                          )}
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm leading-tight">{phone.name}</h3>
                      </th>
                    ))}
                  </tr>
                </thead>

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
                        <th className="p-3 lg:p-6 w-[28%] lg:w-[20%] bg-slate-50/50 text-xs lg:text-sm font-bold text-slate-900 uppercase tracking-wider border-r border-slate-100 align-top">
                          {spec.label}
                        </th>
                        {comparedPhones.map((phone, idx) => {
                          const value = phone[spec.key];
                          const isBest = idx === bestValueIdx;
                          
                          return (
                            <td key={idx} className="p-3 lg:p-6 lg:w-[20%] align-top border-r border-slate-100 last:border-r-0">
                              {value ? (
                                <div className={`flex flex-col gap-1.5 lg:gap-2 ${isBest ? "text-green-700" : "text-slate-600"}`}>
                                  <span className={`text-sm lg:text-base font-medium ${isBest ? "font-bold" : ""}`}>
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
                        {/* Desktop Empty Columns (Hidden on Mobile) */}
                        {Array.from({ length: 4 - comparedPhones.length }).map((_, idx) => (
                          <td key={`empty-td-${idx}`} className="hidden lg:table-cell p-3 lg:p-6 lg:w-[20%] bg-slate-50/30 border-r border-slate-100 last:border-r-0"></td>
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
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-10">
              <div className="hidden lg:block lg:col-span-1"></div>
              <div className="lg:col-span-4">
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 lg:p-10 text-center">
                  <Smartphone size={48} className="text-slate-300 mx-auto mb-4" strokeWidth={1} />
                  <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2 lg:mb-4 tracking-tight">Ready to Compare?</h3>
                  <p className="text-slate-500 text-base lg:text-lg max-w-lg mx-auto">Click the &apos;Add Device&apos; slots in the header above to start mapping specifications side-by-side.</p>
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
