import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X, Smartphone, ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slugs: string }> }) {
  const { slugs } = await params;
  if (!slugs.includes('-vs-')) return { title: "Comparison Not Found" };

  const [slug1, slug2] = slugs.split('-vs-');

  await connectToDatabase();
  const phone1 = await Phone.findOne({ slug: slug1 }).select("name images price_usd brand_id").populate("brand_id", "name").lean() as any;
  const phone2 = await Phone.findOne({ slug: slug2 }).select("name images price_usd brand_id").populate("brand_id", "name").lean() as any;

  if (!phone1 || !phone2) return { title: "Comparison Not Found" };

  const title = `Compare ${phone1.name} vs ${phone2.name} | Specs, Price & Features`;
  const description = `In-depth comparison of ${phone1.name} vs ${phone2.name}. Compare battery, camera, processor, and price to see which smartphone is better.`;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techtweak.tech';
  const url = `${baseUrl}/compare/${slug1}-vs-${slug2}`;

  const image = phone1.images?.[0] || "";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    }
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slugs: string }> }) {
  const { slugs } = await params;
  if (!slugs.includes('-vs-')) notFound();

  const [slug1, slug2] = slugs.split('-vs-');

  await connectToDatabase();
  const phone1 = await Phone.findOne({ slug: slug1 }).populate("brand_id", "name slug").lean() as any;
  const phone2 = await Phone.findOne({ slug: slug2 }).populate("brand_id", "name slug").lean() as any;

  if (!phone1 || !phone2) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techtweak.tech';
  const currentUrl = `${baseUrl}/compare/${slug1}-vs-${slug2}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "name": `Compare ${phone1.name} vs ${phone2.name}`,
    "description": `Comparison between ${phone1.name} and ${phone2.name}`,
    "url": currentUrl,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Product",
            "name": phone1.name,
            "url": `${baseUrl}/phones/${phone1.brand_id?.slug || 'brand'}/${phone1.slug}`
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Product",
            "name": phone2.name,
            "url": `${baseUrl}/phones/${phone2.brand_id?.slug || 'brand'}/${phone2.slug}`
          }
        }
      ]
    }
  };

  const renderCheck = (val: any) => {
    if (val === true || val === "Yes" || val === "Yes (Supported)") return <Check className="text-emerald-500 mx-auto" size={18} />;
    if (val === false || val === "No") return <X className="text-red-500 mx-auto" size={18} />;
    return <span className="text-slate-700 font-medium">{val || "-"}</span>;
  };

  const SpecRow = ({ label, val1, val2 }: { label: string, val1: any, val2: any }) => (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
      <td className="py-3 px-4 font-bold text-[11px] uppercase tracking-wider text-slate-500 w-1/3 bg-slate-50/50">{label}</td>
      <td className="py-3 px-4 text-center w-1/3 border-l border-r border-slate-100">{renderCheck(val1)}</td>
      <td className="py-3 px-4 text-center w-1/3">{renderCheck(val2)}</td>
    </tr>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen bg-slate-50 pb-20 pt-8">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <Link href="/compare" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Compare Hub
          </Link>

          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              <span className="text-primary">{phone1.name}</span> vs <span className="text-purple-600">{phone2.name}</span>
            </h1>
            <p className="text-slate-600 font-medium max-w-2xl mx-auto text-lg">
              Detailed specifications comparison between the {phone1.brand_id?.name || ''} {phone1.name} and the {phone2.brand_id?.name || ''} {phone2.name}.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3">
              {/* Header col */}
              <div className="hidden md:flex flex-col justify-end p-6 border-r border-slate-100 bg-slate-50">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Device Comparison</div>
              </div>
              
              {/* Phone 1 Header */}
              <div className="flex flex-col items-center text-center p-6 border-r border-slate-100 relative group">
                <Link href={`/phones/${phone1.brand_id?.slug || 'brand'}/${phone1.slug}`} className="absolute inset-0 z-10" />
                <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-100 rounded-xl mb-4 flex items-center justify-center p-2">
                  {phone1.images?.[0] ? (
                    <img src={phone1.images[0].replace('/upload/', '/upload/w_200,h_200,c_pad,b_white/')} className="w-full h-full object-contain" alt={phone1.name} />
                  ) : (
                    <Smartphone size={32} className="text-slate-300" />
                  )}
                </div>
                <h2 className="font-bold text-lg md:text-xl text-slate-900 group-hover:text-primary transition-colors">{phone1.name}</h2>
                <div className="text-primary font-black mt-2">
                  {phone1.price_usd ? `$${phone1.price_usd}` : 'TBA'}
                </div>
              </div>

              {/* Phone 2 Header */}
              <div className="flex flex-col items-center text-center p-6 relative group">
                <Link href={`/phones/${phone2.brand_id?.slug || 'brand'}/${phone2.slug}`} className="absolute inset-0 z-10" />
                <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-100 rounded-xl mb-4 flex items-center justify-center p-2">
                  {phone2.images?.[0] ? (
                    <img src={phone2.images[0].replace('/upload/', '/upload/w_200,h_200,c_pad,b_white/')} className="w-full h-full object-contain" alt={phone2.name} />
                  ) : (
                    <Smartphone size={32} className="text-slate-300" />
                  )}
                </div>
                <h2 className="font-bold text-lg md:text-xl text-slate-900 group-hover:text-purple-600 transition-colors">{phone2.name}</h2>
                <div className="text-purple-600 font-black mt-2">
                  {phone2.price_usd ? `$${phone2.price_usd}` : 'TBA'}
                </div>
              </div>
            </div>

            {/* Specifications Table */}
            <table className="w-full text-left text-sm">
              <tbody>
                <SpecRow label="Release Date" val1={phone1.release_date} val2={phone2.release_date} />
                <SpecRow label="Operating System" val1={phone1.os} val2={phone2.os} />
                <SpecRow label="Display Size" val1={`${phone1.display_size} inches`} val2={`${phone2.display_size} inches`} />
                <SpecRow label="Display Type" val1={phone1.display_type} val2={phone2.display_type} />
                <SpecRow label="Resolution" val1={phone1.display_resolution} val2={phone2.display_resolution} />
                <SpecRow label="Refresh Rate" val1={`${phone1.refresh_rate}Hz`} val2={`${phone2.refresh_rate}Hz`} />
                <SpecRow label="Processor / Chipset" val1={phone1.processor} val2={phone2.processor} />
                <SpecRow label="RAM" val1={phone1.ram} val2={phone2.ram} />
                <SpecRow label="Internal Storage" val1={phone1.storage} val2={phone2.storage} />
                <SpecRow label="Main Camera" val1={phone1.main_camera_megapixels ? `${phone1.main_camera_megapixels} MP` : null} val2={phone2.main_camera_megapixels ? `${phone2.main_camera_megapixels} MP` : null} />
                <SpecRow label="Selfie Camera" val1={phone1.selfie_camera_megapixels ? `${phone1.selfie_camera_megapixels} MP` : null} val2={phone2.selfie_camera_megapixels ? `${phone2.selfie_camera_megapixels} MP` : null} />
                <SpecRow label="Battery Capacity" val1={phone1.battery_capacity ? `${phone1.battery_capacity} mAh` : null} val2={phone2.battery_capacity ? `${phone2.battery_capacity} mAh` : null} />
                <SpecRow label="Charging Speed" val1={phone1.charging_speed ? `${phone1.charging_speed}W` : null} val2={phone2.charging_speed ? `${phone2.charging_speed}W` : null} />
                <SpecRow label="5G Support" val1={phone1.has_5g} val2={phone2.has_5g} />
                <SpecRow label="NFC" val1={phone1.has_nfc} val2={phone2.has_nfc} />
                <SpecRow label="3.5mm Jack" val1={phone1.has_audio_jack} val2={phone2.has_audio_jack} />
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </>
  );
}
