import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import Brand from "@/lib/models/Brand";
import { notFound } from "next/navigation";
import {
  Check, X, Battery, Cpu, Smartphone, Wifi, Camera, ShieldCheck,
  ChevronDown, Layers, Zap, Info, ShieldAlert, HelpCircle,
  Sparkles, Award, Eye, GitCompare, HardDrive
} from "lucide-react";
import PhoneGallery from "@/components/phones/PhoneGallery";
import SpecNavigation from "@/components/phones/SpecNavigation";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ brand: string, model: string }> }) {
  const { brand, model } = await params;
  await connectToDatabase();

  const data = await Phone.findOne({ slug: model }).select("name meta_title meta_description images updated_at").lean() as any;

  if (!data) return { title: "Phone Not Found" };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techtweak.tech';
  const url = `${baseUrl}/phones/${brand}/${model}`;

  return {
    title: data.meta_title || `${data.name} Specs, Review, and Price | TechTweak`,
    description: data.meta_description || `Full specifications, features, and price for the ${data.name}.`,
    alternates: {
      canonical: url,
      languages: {
        'en': url,
        'x-default': url,
      },
    },
    openGraph: {
      title: data.name,
      description: data.meta_description || `Full specifications, features, and price for the ${data.name}.`,
      url,
      images: data.images && data.images.length > 0 ? [{ url: data.images[0] }] : [],
      type: 'article',
      modifiedTime: data.updated_at ? new Date(data.updated_at).toISOString() : new Date().toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: data.name,
      description: data.meta_description || `Full specifications, features, and price for the ${data.name}.`,
      images: data.images && data.images.length > 0 ? [data.images[0]] : [],
    }
  };
}

export default async function PhoneDetailsPage({ params }: { params: Promise<{ brand: string, model: string }> }) {
  const { brand, model } = await params;
  await connectToDatabase();

  // Fetch real phone data
  let rawPhone = null;
  try {
    rawPhone = await Phone.findOne({ slug: model })
      .populate("brand_id", "name slug")
      .populate("related_similar_ids", "name slug price_usd price_bdt images brand_id")
      .populate("related_compare_ids", "name slug price_usd price_bdt images brand_id")
      .populate("related_better_ids", "name slug price_usd price_bdt images brand_id")
      .lean();
  } catch (err) {
    console.error(err);
  }

  // Fallback demo object if not found in db
  if (!rawPhone) {
    rawPhone = {
      _id: "demo",
      name: "Galaxy S26 Ultra (Demo)",
      slug: model,
      brand_id: { name: "Samsung", slug: "samsung" },
      processor: "Snapdragon 8 Gen 4",
      ram: "12GB / 16GB LPDDR5X",
      storage: "256GB / 512GB / 1TB UFS 4.0",
      display: "6.8 inch Dynamic AMOLED 2X, 144Hz",
      battery: "5000 mAh",
      charging: "45W Wired, 15W Wireless",
      camera_main: "200MP + 50MP + 12MP + 10MP",
      camera_front: "12MP",
      os: "Android 16, One UI 8",
      price_usd: 1250,
      antutu_score: 2450000,
      images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000"],
      is_published: true,
      is_official: true,
      upcoming: false,
      colors: ["Titanium Gray", "Titanium Black", "Titanium Yellow"],
      model_number: "SM-S928B",

      // Structured specs fallback
      weight: "232 g (8.18 oz)",
      dimensions: "162.3 x 79 x 8.6 mm",
      build_material: "Glass front, titanium frame, glass back",
      sim_type: "Nano-SIM and eSIM",
      water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 min)",

      display_type: "Dynamic LTPO AMOLED 2X, 120Hz, HDR10+",
      screen_size: "6.8 inches",
      resolution: "1440 x 3120 pixels",
      refresh_rate: "120Hz",
      brightness: "2600 nits (peak)",
      hdr: "HDR10+",
      protection: "Corning Gorilla Armor",
      pixel_density: "505 ppi",

      cpu: "Octa-core (1x3.39GHz + 3x3.1GHz + 2x2.9GHz + 2x2.2GHz)",
      gpu: "Adreno 750",
      fabrication: "4 nm",
      ram_variants: "12GB, 16GB LPDDR5X",
      storage_variants: "256GB, 512GB, 1TB",
      storage_type: "UFS 4.0",
      geekbench_score: "2300 / 7200",
      cooling_system: "Vapor chamber liquid cooling",

      cam_main_sensor: "200 MP, f/1.7, 24mm (wide), Multi-directional PDAF, Laser AF, OIS",
      cam_ultrawide: "12 MP, f/2.2, 13mm, 120˚ (ultrawide)",
      cam_telephoto: "50 MP, f/3.4, 111mm (periscope telephoto), 5x optical zoom, OIS",
      cam_macro: "10 MP, f/2.4, 67mm (telephoto), 3x optical zoom, OIS",
      cam_ois: "Dual OIS Support",
      cam_flash: "LED flash, auto-HDR, panorama",
      cam_video: "8K@24/30fps, 4K@30/60/120fps, 1080p@30/60/240fps, HDR10+",

      cam_front_resolution: "12 MP, f/2.2, 26mm (wide), Dual Pixel PDAF",
      cam_front_hdr: "Auto-HDR, HDR10+",
      cam_front_portrait: "Smart HDR, Portrait lighting",
      cam_front_video: "4K@30/60fps, 1080p@30fps",

      battery_capacity: "5000 mAh",
      charging_wired: "45W wired, PD3.0, 65% in 30 min",
      charging_wireless: "15W wireless (Qi/PMA)",
      charging_reverse: "4.5W reverse wireless",
      charger_included: false,
      usb_type: "USB Type-C 3.2, OTG",

      has_5g: true,
      wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band",
      bluetooth_version: "5.3, A2DP, LE",
      has_nfc: true,
      gps_specs: "GPS, GLONASS, BDS, GALILEO, QZSS",
      has_ir_blaster: false,
      has_audio_jack: false,
      usb_version: "USB Type-C 3.2 Gen 2",

      sensor_fingerprint: "Under-display (ultrasonic)",
      has_gyroscope: true,
      has_compass: true,
      has_accelerometer: true,
      has_face_unlock: true,

      android_version: "Android 15",
      ui_version: "One UI 7.1",
      update_policy: "7 Years of Major OS Updates",
      ai_features: ["Circle to Search", "Live Translate", "Generative Edit", "Note Assist", "Chat Assist"],
      has_circle_to_search: true,
      has_ai_editing: true,
      has_live_translation: true,
      has_ai_assistant: true,

      pros: [
        "Incredible Snapdragon 8 Gen 4 peak performance",
        "Corning Gorilla Armor highly reduces reflections",
        "Exceptional battery life and 5x optical telephoto camera",
        "7 full years of Android software updates"
      ],
      cons: [
        "Expensive launch price tag",
        "No dedicated wall charging brick in the retail box",
        "Heavy weight in hand during extended usage"
      ],
      faqs: [
        { question: "Is the charger included in the box?", answer: "No, the retail box only contains the phone and a USB-C to USB-C cable. You need to purchase a 45W PPS charger separately." },
        { question: "Does it support eSIM technology?", answer: "Yes, it supports dual eSIM or one physical nano-SIM card along with an eSIM." }
      ]
    };
  }

  // Brand and model resolution
  // Try to get brand name from populated brand_id first,
  // then fall back to fetching from DB by slug, then title-case the URL param
  let brandName: string = rawPhone.brand_id?.name || "";
  let brandSlug: string = rawPhone.brand_id?.slug || brand;

  if (!brandName) {
    try {
      const brandDoc = await Brand.findOne({ slug: brand }).select("name slug").lean() as any;
      if (brandDoc) {
        brandName = brandDoc.name;
        brandSlug = brandDoc.slug;
      }
    } catch (_) { /* ignore */ }
  }

  // Final fallback: convert slug to title case (e.g. "apple" → "Apple", "samsung" → "Samsung")
  if (!brandName) {
    brandName = brand
      .split("-")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  // Load suggested items from database
  let dbSimilarPhones: any[] = [];
  let dbSamePricePhones: any[] = [];
  let dbComparePhones: any[] = [];

  try {
    // 1. Similar Phones query
    dbSimilarPhones = await Phone.find({
      brand_id: rawPhone.brand_id?._id || rawPhone.brand_id,
      _id: { $ne: rawPhone._id },
      is_published: true
    })
      .populate("brand_id", "name slug")
      .limit(4)
      .lean();

    // 2. Price Match query
    if (rawPhone.price_usd) {
      dbSamePricePhones = await Phone.find({
        price_usd: { $gte: rawPhone.price_usd * 0.8, $lte: rawPhone.price_usd * 1.2 },
        _id: { $ne: rawPhone._id },
        is_published: true
      })
        .populate("brand_id", "name slug")
        .limit(4)
        .lean();
    }

    // 3. Alternatives/Compare suggestions query
    dbComparePhones = await Phone.find({
      is_featured: true,
      _id: { $ne: rawPhone._id },
      is_published: true
    })
      .populate("brand_id", "name slug")
      .limit(6)
      .lean();
  } catch (err) {
    console.error("Error querying recommendations:", err);
  }

  // Consolidate suggestions
  const similarSection = rawPhone.related_similar_ids?.length > 0 ? rawPhone.related_similar_ids : dbSimilarPhones.slice(0, 4);
  const betterSection = rawPhone.related_better_ids?.length > 0 ? rawPhone.related_better_ids : dbComparePhones.slice(0, 4);
  const compareSection = rawPhone.related_compare_ids?.length > 0 ? rawPhone.related_compare_ids : dbComparePhones.slice(2, 6);

  // Schema data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.techtweak.tech";
  const currentUrl = `${baseUrl}/phones/${brand}/${model}`;

  const jsonLd: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: rawPhone.name,
      image: rawPhone.images && rawPhone.images.length > 0 ? rawPhone.images[0] : undefined,
      description: rawPhone.meta_description || `Full specifications, features, and price for the ${rawPhone.name}.`,
      brand: {
        "@type": "Brand",
        name: brandName
      },
      offers: {
        "@type": "Offer",
        url: currentUrl,
        price: rawPhone.price_usd || "0.00",
        priceCurrency: "USD",
        availability: rawPhone.is_published ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Phones", item: `${baseUrl}/phones` },
        { "@type": "ListItem", position: 3, name: brandName, item: `${baseUrl}/phones/${brand}` },
        { "@type": "ListItem", position: 4, name: rawPhone.name, item: currentUrl }
      ]
    }
  ];

  if (rawPhone.faqs && rawPhone.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: rawPhone.faqs.map((faq: any) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    });
  }
  return (
    <>
      {/* Inject SEO Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-slate-50 min-h-screen pt-[86px] pb-8 lg:pt-[102px] lg:pb-16">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/phones" className="hover:text-primary transition-colors">Phones</Link>
            <span>/</span>
            <Link href={`/phones?brand=${brandSlug}`} className="hover:text-primary transition-colors uppercase tracking-wider">{brandName}</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{rawPhone.name}</span>
          </nav>

          {/* Overview top header */}
          <div id="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10">

            {/* Gallery Section */}
            <div className="lg:col-span-5 relative">
              <PhoneGallery images={rawPhone.images || []} name={rawPhone.name} />
            </div>

            {/* Basic Info details */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-black tracking-widest text-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
                    {brandName}
                  </span>
                  {rawPhone.upcoming ? (
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
                      Upcoming
                    </span>
                  ) : rawPhone.is_published ? (
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck size={12} /> Available
                    </span>
                  ) : null}
                </div>

                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                  {rawPhone.name}
                </h1>

                {/* Price Section - Official / Unofficial */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  {rawPhone.price_usd ? (
                    <div className="flex-1 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
                      <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">✅ Official Price</p>
                      <p className="text-2xl font-black text-green-800">${rawPhone.price_usd.toLocaleString()}</p>
                      <p className="text-xs text-green-600 mt-0.5">Authorized Dealer</p>
                    </div>
                  ) : (
                    <div className="flex-1 bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">✅ Official Price</p>
                      <p className="text-xl font-bold text-slate-400">TBA</p>
                    </div>
                  )}

                </div>

                {/* Quick features highlight grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Cpu size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Processor</p>
                      <p className="font-bold text-slate-800 text-sm leading-tight line-clamp-1">{rawPhone.chipset_highlight || rawPhone.processor || "N/A"}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <Camera size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Main Camera</p>
                      <p className="font-bold text-slate-800 text-sm leading-tight line-clamp-1">{rawPhone.camera_highlight || rawPhone.camera_main?.split("+")[0] || "N/A"}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Display</p>
                      <p className="font-bold text-slate-800 text-sm leading-tight line-clamp-1">{rawPhone.display_highlight || rawPhone.display?.split(",")[0] || "N/A"}</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                      <Battery size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Battery</p>
                      <p className="font-bold text-slate-800 text-sm leading-tight line-clamp-1">{rawPhone.battery_highlight || rawPhone.battery || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Key Features & Connectivity Checklist */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 mb-6 shadow-sm">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-primary" /> Key Features & Connectivity
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 gap-x-2">
                    <div className="flex items-center gap-2">
                      {rawPhone.has_5g ? (
                        <Check className="text-green-600 bg-green-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                      ) : (
                        <X className="text-red-500 bg-red-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                      )}
                      <span className="text-xs font-bold text-slate-700">5G Supported</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {rawPhone.has_nfc ? (
                        <Check className="text-green-600 bg-green-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                      ) : (
                        <X className="text-red-500 bg-red-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                      )}
                      <span className="text-xs font-bold text-slate-700">NFC Enabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {rawPhone.sim_type?.toLowerCase().includes("esim") ? (
                        <Check className="text-green-600 bg-green-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                      ) : (
                        <X className="text-red-500 bg-red-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                      )}
                      <span className="text-xs font-bold text-slate-700">eSIM Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {rawPhone.wifi_version?.toLowerCase().includes("wi-fi 7") || rawPhone.wifi_version?.toLowerCase().includes("wi-fi 6e") || rawPhone.wifi_version?.toLowerCase().includes("wifi 7") || rawPhone.wifi_version?.toLowerCase().includes("wifi 6") ? (
                        <Check className="text-green-600 bg-green-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                      ) : (
                        <X className="text-red-500 bg-red-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                      )}
                      <span className="text-xs font-bold text-slate-700">Wi-Fi 6/7 Ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {rawPhone.water_resistance ? (
                        <Check className="text-green-600 bg-green-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                      ) : (
                        <X className="text-red-500 bg-red-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                      )}
                      <span className="text-xs font-bold text-slate-700">Water Resistant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {rawPhone.has_audio_jack ? (
                        <Check className="text-green-600 bg-green-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                      ) : (
                        <X className="text-red-500 bg-red-50 p-0.5 rounded-full flex-shrink-0" size={16} />
                      )}
                      <span className="text-xs font-bold text-slate-700">Headphone Jack</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider mb-0.5">Colors</span>
                  <span className="text-xs font-semibold text-slate-700 line-clamp-1">{rawPhone.colors?.length > 0 ? rawPhone.colors.join(", ") : "N/A"}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider mb-0.5">Water Rating</span>
                  <span className="text-xs font-semibold text-slate-700 line-clamp-1">
                    {rawPhone.water_resistance ? (
                      rawPhone.water_resistance.includes("IP68") ? "IP68 Certified" :
                      rawPhone.water_resistance.includes("IP67") ? "IP67 Certified" :
                      rawPhone.water_resistance.includes("IP54") ? "IP54 Splash-proof" :
                      rawPhone.water_resistance.includes("IP53") ? "IP53 Splash-proof" :
                      rawPhone.water_resistance.split(" — ")[0] || rawPhone.water_resistance.split("-")[0] || rawPhone.water_resistance
                    ) : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider mb-0.5">Release Date</span>
                  <span className="text-xs font-semibold text-slate-700 block line-clamp-1">{rawPhone.release_date || "N/A"}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider mb-0.5">OS Support</span>
                  <span className="text-xs font-semibold text-slate-700 line-clamp-1">{rawPhone.update_policy || "Standard"}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Sticky spec tab navigation */}
          <SpecNavigation />

          {/* 2-COLUMN MAIN CONTENT & SIDEBAR GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Main Content Column (Takes 8/12 of space) */}
            <div className="lg:col-span-8 space-y-8">

              {/* General Info */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
                <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Info size={16} />
                  </div>
                  <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">General Information</h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {/* Price rows with special styling */}
                  <div className="flex flex-col sm:flex-row p-5 text-sm">
                    <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">Official Price</div>
                    <div className="w-full sm:w-2/3 mt-1.5 sm:mt-0">
                      {rawPhone.price_usd ? (
                        <span className="font-black text-green-700 text-base">${rawPhone.price_usd.toLocaleString()} <span className="text-xs font-semibold text-green-500">(Official)</span></span>
                      ) : (
                        <span className="text-slate-400 font-semibold">Not specified</span>
                      )}
                    </div>
                  </div>

                  {[
                    { label: "Phone Weight", value: rawPhone.weight },
                    { label: "Physical Dimensions", value: rawPhone.dimensions },
                    { label: "Build Material", value: rawPhone.build_material },
                    { label: "SIM Layout", value: rawPhone.sim_type },
                    { label: "Water & Dust Rating", value: rawPhone.water_resistance },
                    { label: "Manufactured In", value: rawPhone.made_in },
                    { label: "Phone Variants", value: rawPhone.phone_variants }
                  ].map((spec, i) => (
                    <div key={i} className="flex flex-col sm:flex-row p-5 text-sm">
                      <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">{spec.label}</div>
                      <div className="w-full sm:w-2/3 text-slate-600 font-semibold mt-1.5 sm:mt-0 leading-relaxed">{spec.value || "Not specified"}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Display details */}
              <div id="display" className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
                <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                    <Smartphone size={16} />
                  </div>
                  <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Display Specs</h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { label: "Display Architecture", value: rawPhone.display_type || rawPhone.display },
                    { label: "Screen Estate", value: rawPhone.screen_size },
                    { label: "Resolution Metric", value: rawPhone.resolution },
                    { label: "Screen Refresh Rate", value: rawPhone.refresh_rate },
                    { label: "Peak Brightness", value: rawPhone.brightness },
                    { label: "HDR Protocol", value: rawPhone.hdr },
                    { label: "Scratch Protection", value: rawPhone.protection },
                    { label: "Pixel Density", value: rawPhone.pixel_density }
                  ].map((spec, i) => (
                    <div key={i} className="flex flex-col sm:flex-row p-5 text-sm">
                      <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">{spec.label}</div>
                      <div className="w-full sm:w-2/3 text-slate-600 font-semibold mt-1.5 sm:mt-0 leading-relaxed">{spec.value || "Not specified"}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance details */}
              <div id="performance" className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
                <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Cpu size={16} />
                  </div>
                  <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Performance Specifications</h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { label: "System on Chip (SoC)", value: rawPhone.processor },
                    { label: "Central Processing Unit (CPU)", value: rawPhone.cpu },
                    { label: "Graphics Processing Unit (GPU)", value: rawPhone.gpu },
                    { label: "Silicon Fabrication", value: rawPhone.fabrication },
                    { label: "System Memory (RAM)", value: rawPhone.ram_variants || rawPhone.ram },
                    { label: "Internal Storage", value: rawPhone.storage_variants || rawPhone.storage },
                    { label: "Flash Storage Standard", value: rawPhone.storage_type },
                    { label: "Geekbench Benchmark", value: rawPhone.geekbench_score },
                    { label: "Vapor Cooling System", value: rawPhone.cooling_system }
                  ].map((spec, i) => (
                    <div key={i} className="flex flex-col sm:flex-row p-5 text-sm">
                      <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">{spec.label}</div>
                      <div className="w-full sm:w-2/3 text-slate-600 font-semibold mt-1.5 sm:mt-0 leading-relaxed">{spec.value || "Not specified"}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side-by-side Camera Cards */}
              <div id="camera" className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Primary camera card */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                        <Camera size={16} />
                      </div>
                      <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Primary Camera System</h2>
                    </div>
                    <div className="p-4 space-y-4">
                      {[
                        { label: "Total Cameras", value: rawPhone.cam_count },
                        { label: "Main Sensor", value: rawPhone.cam_main_sensor || rawPhone.camera_main },
                        { label: "Ultrawide Lens", value: rawPhone.cam_ultrawide },
                        { label: "Telephoto Zoom", value: rawPhone.cam_telephoto },
                        { label: "Macro Capture", value: rawPhone.cam_macro },
                        { label: "Image Stabilization", value: rawPhone.cam_ois },
                        { label: "Camera Flash", value: rawPhone.cam_flash },
                        { label: "Video Recording", value: rawPhone.cam_video || rawPhone.camera_video }
                      ].map((spec, i) => (
                        <div key={i} className="p-3 bg-slate-50/40 rounded-xl text-xs flex flex-col">
                          <span className="font-bold text-slate-500 uppercase tracking-wider mb-1 text-[10px]">{spec.label}</span>
                          <span className="text-slate-700 font-semibold leading-relaxed">{spec.value || "N/A"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selfie camera card */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Camera size={16} />
                      </div>
                      <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">Front Selfie Camera</h2>
                    </div>
                    <div className="p-4 space-y-4">
                      {[
                        { label: "Front Resolution", value: rawPhone.cam_front_resolution || rawPhone.camera_front },
                        { label: "Selfie HDR Mode", value: rawPhone.cam_front_hdr },
                        { label: "Portrait Features", value: rawPhone.cam_front_portrait },
                        { label: "Video Capabilities", value: rawPhone.cam_front_video }
                      ].map((spec, i) => (
                        <div key={i} className="p-3 bg-slate-50/40 rounded-xl text-xs flex flex-col">
                          <span className="font-bold text-slate-500 uppercase tracking-wider mb-1 text-[10px]">{spec.label}</span>
                          <span className="text-slate-700 font-semibold leading-relaxed">{spec.value || "N/A"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Battery & Charging details */}
              <div id="battery" className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
                <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                    <Battery size={16} />
                  </div>
                  <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Battery & Storage System</h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { label: "Cell Battery Capacity", value: rawPhone.battery_capacity || rawPhone.battery },
                    { label: "Wired Charging Speed", value: rawPhone.charging_wired || rawPhone.charging },
                    { label: "Wireless Charging", value: rawPhone.charging_wireless },
                    { label: "Reverse Wireless", value: rawPhone.charging_reverse },
                    { label: "In-box Charger Brick", value: rawPhone.charger_included ? "Yes (Included in retail box)" : "No (Charging block sold separately)" },
                    { label: "Port Type & USB Version", value: rawPhone.usb_type }
                  ].map((spec, i) => (
                    <div key={i} className="flex flex-col sm:flex-row p-5 text-sm">
                      <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">{spec.label}</div>
                      <div className="w-full sm:w-2/3 text-slate-600 font-semibold mt-1.5 sm:mt-0 leading-relaxed">{spec.value || "Not specified"}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Network & Connectivity */}
              <div id="connectivity" className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
                <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                    <Wifi size={16} />
                  </div>
                  <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Network & Connectivity</h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { label: "5G Band Connectivity", value: rawPhone.has_5g ? "Supported (Full 5G compatibility)" : "4G LTE Bands only" },
                    { label: "Wireless LAN (WiFi)", value: rawPhone.wifi_version },
                    { label: "Bluetooth Protocol", value: rawPhone.bluetooth_version },
                    { label: "NFC Capability", value: rawPhone.has_nfc ? "Yes (Supports contact payments)" : "No" },
                    { label: "Satelite Navigation (GPS)", value: rawPhone.gps_specs },
                    { label: "Infrared Blaster", value: rawPhone.has_ir_blaster ? "Yes (Built-in IR transceiver)" : "No" },
                    { label: "3.5mm Headphone Jack", value: rawPhone.has_audio_jack ? "Yes (Supports legacy analog jacks)" : "No (Relies on USB-C or Bluetooth)" },
                    { label: "USB Protocol Version", value: rawPhone.usb_version }
                  ].map((spec, i) => (
                    <div key={i} className="flex flex-col sm:flex-row p-5 text-sm">
                      <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">{spec.label}</div>
                      <div className="w-full sm:w-2/3 text-slate-600 font-semibold mt-1.5 sm:mt-0 leading-relaxed">{spec.value || "Not specified"}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sensors */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
                <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Layers size={16} />
                  </div>
                  <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Sensors</h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { label: "Fingerprint Scanner", value: rawPhone.sensor_fingerprint },
                    { label: "Gyroscope", value: rawPhone.has_gyroscope ? "Yes (3-axis gyroscope)" : "No" },
                    { label: "Compass / Magnetometer", value: rawPhone.has_compass ? "Yes (Supports compass apps)" : "No" },
                    { label: "Accelerometer", value: rawPhone.has_accelerometer ? "Yes (Motion detection)" : "No" },
                    { label: "Face Unlock Support", value: rawPhone.has_face_unlock ? "Yes (Secure Face ID mapping)" : "No" }
                  ].map((spec, i) => (
                    <div key={i} className="flex flex-col sm:flex-row p-5 text-sm">
                      <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">{spec.label}</div>
                      <div className="w-full sm:w-2/3 text-slate-600 font-semibold mt-1.5 sm:mt-0 leading-relaxed">{spec.value || "Not specified"}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Software & AI */}
              <div id="features" className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
                <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Sparkles size={16} />
                  </div>
                  <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider">Software & AI Ecosystem</h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { label: "Operating System (OS)", value: (rawPhone.android_version || rawPhone.os) ? `${rawPhone.android_version || rawPhone.os} (Upgradable)` : "Not specified" },
                    { label: "Long Term Update Promise", value: rawPhone.update_policy },
                    { label: "Suite of AI Tooling", value: rawPhone.ai_features?.join(", ") },
                    { label: "Circle to Search support", value: rawPhone.has_circle_to_search ? "Supported (System-wide search gesture)" : "No" },
                    { label: "Generative AI Image Editor", value: rawPhone.has_ai_editing ? "Supported (Expand and erase details)" : "No" },
                    { label: "Realtime Live Interpreter", value: rawPhone.has_live_translation ? "Supported (Calls & face-to-face translation)" : "No" },
                    { label: "Next-Gen AI Voice assistant", value: rawPhone.has_ai_assistant ? "Supported (Intelligent voice assist)" : "No" }
                  ].map((spec, i) => (
                    <div key={i} className="flex flex-col sm:flex-row p-5 text-sm">
                      <div className="w-full sm:w-1/3 font-bold text-slate-800 uppercase tracking-wider text-[11px] self-center">{spec.label}</div>
                      <div className="w-full sm:w-2/3 text-slate-600 font-semibold mt-1.5 sm:mt-0 leading-relaxed">{spec.value || "Not specified"}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROS & CONS (Moved to the bottom, right above FAQ) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50/40 rounded-3xl p-6 sm:p-8 border border-green-100 flex flex-col justify-between">
                  <div>
                    <h3 className="text-green-800 font-extrabold flex items-center gap-2 mb-4 text-lg uppercase tracking-wider">
                      <Check className="bg-green-100 text-green-700 p-1 rounded-full" size={22} /> Pros
                    </h3>
                    <ul className="space-y-3.5">
                      {rawPhone.pros?.map((pro: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-700 font-medium text-sm leading-relaxed">
                          <span className="text-green-500 mt-1 font-bold">•</span> {pro}
                        </li>
                      )) || (
                          <li className="text-slate-400 text-xs italic">No pros available for this device.</li>
                        )}
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50/40 rounded-3xl p-6 sm:p-8 border border-red-100 flex flex-col justify-between">
                  <div>
                    <h3 className="text-red-800 font-extrabold flex items-center gap-2 mb-4 text-lg uppercase tracking-wider">
                      <X className="bg-red-100 text-red-700 p-1 rounded-full" size={22} /> Cons
                    </h3>
                    <ul className="space-y-3.5">
                      {rawPhone.cons?.map((con: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-700 font-medium text-sm leading-relaxed">
                          <span className="text-red-500 mt-1 font-bold">•</span> {con}
                        </li>
                      )) || (
                          <li className="text-slate-400 text-xs italic">No cons available for this device.</li>
                        )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* DYNAMIC FAQ ACCORDION */}
              <div id="faq" className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-6 md:p-8">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {rawPhone.faqs && rawPhone.faqs.length > 0 ? (
                    rawPhone.faqs.map((faq: any, i: number) => (
                      <details key={i} className="group border-b border-slate-100 pb-4 last:border-none">
                        <summary className="flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none text-base sm:text-lg">
                          {faq.question}
                          <span className="transition group-open:rotate-180">
                            <ChevronDown size={20} className="text-slate-400" />
                          </span>
                        </summary>
                        <p className="text-slate-600 mt-4 leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </details>
                    ))
                  ) : (
                    <p className="text-slate-500 italic">No FAQs available for this phone yet.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Right Sidebar Column (Takes 4/12 of space - filling the red marked empty space) */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">

              {/* 1. Suggested Smartphones */}
              {similarSection.length > 0 && (
                <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 mb-4 tracking-wider uppercase flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Smartphone size={16} className="text-primary" /> Suggested Phones
                  </h3>
                  <div className="space-y-4">
                    {similarSection.map((p: any) => (
                      <SidebarPhoneRow key={p._id} phone={p} />
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Best Alternatives (Best Mobile) */}
              {betterSection.length > 0 && (
                <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 mb-4 tracking-wider uppercase flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Sparkles size={16} className="text-purple-600" /> Best Flagships
                  </h3>
                  <div className="space-y-4">
                    {betterSection.map((p: any) => (
                      <SidebarPhoneRow key={p._id} phone={p} />
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Compared Smartphones */}
              {compareSection.length > 0 && (
                <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 mb-4 tracking-wider uppercase flex items-center gap-2 pb-2 border-b border-slate-100">
                    <GitCompare size={16} className="text-cyan-600" /> Compared Mobile
                  </h3>
                  <div className="space-y-4">
                    {compareSection.map((p: any) => (
                      <SidebarPhoneRow key={p._id} phone={p} />
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

// Minimalist list item row for the sidebar
function SidebarPhoneRow({ phone }: { phone: any }) {
  const brandSlug = phone.brand_id?.slug || "brand";
  const brandName = phone.brand_id?.name || "Brand";

  return (
    <Link
      href={`/phones/${brandSlug}/${phone.slug}`}
      className="group flex gap-3.5 items-center p-2 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-150 transition-all duration-200"
    >
      <div className="w-14 h-14 bg-white border border-slate-200/80 rounded-xl p-1 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
        {phone.images && phone.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={phone.images[0]}
            alt={phone.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Smartphone className="text-slate-300" size={20} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[9px] font-bold text-primary uppercase tracking-wider block mb-0.5">{brandName}</span>
        <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm leading-tight line-clamp-1 group-hover:text-primary transition-colors">
          {phone.name}
        </h4>
        <span className="text-xs font-black text-slate-900 mt-1 block">
          {phone.price_usd ? `$${phone.price_usd.toLocaleString()}` : "TBA"}
        </span>
      </div>
    </Link>
  );
}
