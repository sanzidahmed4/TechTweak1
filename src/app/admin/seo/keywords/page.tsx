import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import KeywordManagerClient from "@/components/admin/seo/KeywordManagerClient";
import { Key } from "lucide-react";

export const revalidate = 0; // Disable caching to always show the latest DB state

export default async function BulkKeywordManagerPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  await connectToDatabase();
  
  const { search } = await searchParams;

  // Build query
  const query: any = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { slug: { $regex: search, $options: "i" } },
    ];
  }

  // Fetch all phones (in a real app with 10k items, you'd paginate this, but since the user requested optimizing for the current 163 records, we load them all for maximum inline editing speed).
  const phones = await Phone.find(query)
    .select("name slug meta_title meta_description primary_keyword canonical_url seo_status")
    .sort({ release_date_parsed: -1, name: 1 })
    .lean();

  const serializedPhones = phones.map(p => ({
    _id: p._id.toString(),
    name: p.name,
    slug: p.slug,
    meta_title: p.meta_title || "",
    meta_description: p.meta_description || "",
    primary_keyword: p.primary_keyword || "",
    canonical_url: p.canonical_url || "",
    seo_status: p.seo_status || "Red",
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Key className="text-primary" size={28} />
          Bulk Keyword Manager
        </h1>
        <p className="text-slate-500 mt-1">Spreadsheet-style inline editor for rapid programmatic SEO scaling.</p>
      </div>

      <KeywordManagerClient initialData={serializedPhones} />
    </div>
  );
}
