import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import Brand from "@/lib/models/Brand";
import Post from "@/lib/models/Post";
import PhonesClientPage from "@/components/phones/PhonesClientPage";

export const metadata = {
  title: "Explore Smartphones | TechTweak",
  description:
    "Browse smartphones by brand, price, specs, and features. Find your perfect device with TechTweak's advanced filter system.",
};

export const revalidate = 3600; // Enable ISR (1 hour caching)

export default async function PhonesPage() {
  await connectToDatabase();

  let phones: any[] = [];
  let brands: any[] = [];
  let latestNews: any[] = [];
  let totalCount = 0;

  try {
    // Fetch phones with brand info
    const rawPhones = await Phone.find({ is_published: true })
      .populate('brand_id', 'name slug')
      .sort({ release_date_parsed: -1, price_usd: -1, name: 1 })
      .lean();

    totalCount = await Phone.countDocuments({ is_published: true });

    phones = rawPhones.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      brand: { name: p.brand_id?.name || "Unknown", slug: p.brand_id?.slug || "" },
      display: p.display || null,
      processor: p.processor || null,
      ram: p.ram || null,
      storage: p.storage || null,
      camera_main: p.camera_main || null,
      battery: p.battery || null,
      network: p.network || null,
      price_usd: p.price_usd || null,
      images: p.images || [],
      is_featured: p.is_featured || false,
      release_date: p.release_date || null,
      antutu_score: p.antutu_score || null,
    }));

    // Fetch brands with phone count
    const rawBrands = await Brand.find().sort({ order: 1 }).lean();
    const brandCounts = await Phone.aggregate([
      { $match: { is_published: true } },
      { $group: { _id: "$brand_id", count: { $sum: 1 } } },
    ]);
    const countMap: Record<string, number> = {};
    brandCounts.forEach((b: any) => { countMap[b._id.toString()] = b.count; });

    brands = rawBrands.map((b: any) => ({
      id: b._id.toString(),
      name: b.name,
      slug: b.slug,
      logo_url: b.logo_url || null,
      count: countMap[b._id.toString()] || 0,
    }));

    // Fetch latest news
    const rawPosts = await Post.find({ is_published: true })
      .sort({ created_at: -1 })
      .limit(4)
      .select("title slug featured_image created_at")
      .lean();

    latestNews = rawPosts.map((p: any) => ({
      title: p.title,
      slug: p.slug,
      featured_image: p.featured_image || null,
      date: new Date(p.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));
  } catch (error) {
    console.error("Error fetching phones page data:", error);
  }



  return (
    <PhonesClientPage
      initialPhones={phones}
      brands={brands}
      totalCount={totalCount}
      latestNews={latestNews}
    />
  );
}
