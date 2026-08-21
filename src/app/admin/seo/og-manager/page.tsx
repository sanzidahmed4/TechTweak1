import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import OGManagerClient from "@/components/admin/seo/OGManagerClient";
import { Image as ImageIcon } from "lucide-react";

export const revalidate = 0; // Disable caching for admin routes

export default async function OGManagerPage() {
  await connectToDatabase();

  // Fetch phones with necessary fields for OG management
  const phones = await Phone.find({})
    .select("name slug og_image images meta_title meta_description updated_at seo_status")
    .sort({ release_date_parsed: -1, name: 1 })
    .lean();

  const serializedPhones = phones.map(p => ({
    _id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    og_image: p.og_image || "",
    fallback_image: p.images && p.images.length > 0 ? p.images[0] : "",
    meta_title: p.meta_title || "",
    meta_description: p.meta_description || "",
    seo_status: p.seo_status || "Red",
    updated_at: p.updated_at ? new Date(p.updated_at).toISOString() : new Date().toISOString()
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <ImageIcon className="text-primary" size={28} />
          Visual OG Manager
        </h1>
        <p className="text-slate-500 mt-1">Manage Social Media OpenGraph graphics across the entire platform.</p>
      </div>

      <OGManagerClient initialData={serializedPhones} />
    </div>
  );
}
