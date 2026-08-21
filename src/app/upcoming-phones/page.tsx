import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import UpcomingPhonesClient from "@/components/upcoming/UpcomingPhonesClient";

export const metadata = {
  title: 'Upcoming & Rumored Smartphones | TechTweak',
  description: 'Explore the latest upcoming and rumored smartphones. Get launch dates, leaked specifications, and the latest news before they officially release.',
  alternates: {
    canonical: 'https://www.techtweak.tech/upcoming-phones',
  }
};

export default async function UpcomingPhonesPage() {
  await connectToDatabase();
  
  const phones = await Phone.find({
    is_published: true,
    phone_status: { $in: ['upcoming', 'rumored'] }
  })
    .select('name slug brand_id price_usd images phone_status expected_launch_date leak_confidence display processor ram storage camera_main battery network is_featured release_date antutu_score')
    .populate('brand_id', 'name slug logo_url')
    .sort({ expected_launch_date: 1, name: 1 })
    .lean();

  const brandCounts = phones.reduce((acc: any, phone: any) => {
    const brand = phone.brand_id;
    if (brand && brand.slug) {
      if (!acc[brand.slug]) {
        acc[brand.slug] = { id: brand._id?.toString() || brand.slug, name: brand.name, slug: brand.slug, logo_url: brand.logo_url, count: 0 };
      }
      acc[brand.slug].count++;
    }
    return acc;
  }, {});

  const topBrands = JSON.parse(JSON.stringify(Object.values(brandCounts).sort((a: any, b: any) => b.count - a.count)));

  const serializedPhones = JSON.parse(JSON.stringify(phones));

  return <UpcomingPhonesClient initialPhones={serializedPhones} topBrands={topBrands} />;
}
