import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number) => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, samsung battery, ${name.toLowerCase()} specs, samsung bangladesh`,
  meta_description: `Official and Unofficial Samsung ${name} price in Bangladesh. Read full specifications, battery life details, in-depth review, and camera test.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} price in bd`,
  secondary_keywords: [`${name.toLowerCase()} price`, `samsung ${name.toLowerCase()} review`, `samsung ${name.toLowerCase()} specs`],
  question_keywords: [
    `what is the price of samsung ${name.toLowerCase()} in bangladesh?`,
    `how long is the battery life on samsung ${name.toLowerCase()}?`,
    `is samsung ${name.toLowerCase()} good for gaming?`
  ],
  faq_schema: [
    { question: `What is the price of Samsung ${name} in Bangladesh?`, answer: `The price of Samsung ${name} was around BDT ${price * 115} at launch.` },
  ]
});

const phonesData = [
  {
    name: "Galaxy M53 5G",
    slug: "samsung-galaxy-m53-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Green", "Blue", "Brown"],
    release_date: "2022-04-07",
    price_usd: 380,
    price_bdt: 44000,
    price_display_text: "BDT 44,000",
    processor: "Dimensity 900",
    display_type: "Super AMOLED Plus, 120Hz",
    screen_size: "6.7 inches",
    cam_count: "Quad",
    cam_main_sensor: "108 MP, f/1.8",
    battery_capacity: "5000 mAh",
    charging_wired: "25W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Long-Lasting",
    internal_links: { same_brand: ["samsung-galaxy-a53-5g", "samsung-galaxy-m54-5g"] },
    ...commonSeoFields("Galaxy M53 5G", 380),
    overview: "The Galaxy M53 5G brought a 108MP camera to the M-series lineup, offering a surprisingly slim and light body for a 5000mAh phone.",
    highlights: ["108MP Main Camera", "120Hz Super AMOLED Plus", "Dimensity 900"],
    pros: ["Very thin and lightweight", "Great display", "High-res camera"],
    cons: ["No OIS on the camera", "No headphone jack"],
    verdict: "A solid alternative to the A53 for those who prefer a lighter device."
  },
  {
    name: "Galaxy M33 5G",
    slug: "samsung-galaxy-m33-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Green", "Blue", "Brown"],
    release_date: "2022-04-08",
    price_usd: 250,
    price_bdt: 28000,
    price_display_text: "BDT 28,000",
    processor: "Exynos 1280",
    display_type: "TFT LCD, 120Hz",
    screen_size: "6.6 inches",
    cam_count: "Quad",
    cam_main_sensor: "50 MP, f/1.8",
    battery_capacity: "6000 mAh", // Note: India got 6000mAh, Global got 5000mAh. Targeting BD/India market.
    charging_wired: "25W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Mainstream",
    camera_tier: "Basic",
    battery_tier: "Endurance",
    internal_links: { same_brand: ["samsung-galaxy-a33-5g", "samsung-galaxy-m34-5g"] },
    ...commonSeoFields("Galaxy M33 5G", 250),
    overview: "The M33 5G was an absolute battery beast, featuring the efficient Exynos 1280 and a massive 6000mAh cell (in the Indian/BD region).",
    highlights: ["6000mAh Battery", "120Hz Display", "Exynos 1280"],
    pros: ["Unkillable battery life", "120Hz refresh rate on a budget"],
    cons: ["TFT LCD screen instead of AMOLED", "Heavy and thick"],
    verdict: "Perfect for users who need days of battery life and don't mind an LCD screen."
  },
  {
    name: "Galaxy M23 5G",
    slug: "samsung-galaxy-m23-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Deep Green", "Light Blue", "Orange Copper"],
    release_date: "2022-03-04",
    price_usd: 230,
    price_bdt: 26000,
    price_display_text: "BDT 26,000",
    processor: "Snapdragon 750G 5G",
    display_type: "TFT LCD, 120Hz",
    screen_size: "6.6 inches",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8",
    battery_capacity: "5000 mAh",
    charging_wired: "25W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Mainstream",
    camera_tier: "Basic",
    battery_tier: "Long-Lasting",
    internal_links: { same_brand: ["samsung-galaxy-a23"] },
    ...commonSeoFields("Galaxy M23 5G", 230),
    overview: "Powered by the reliable Snapdragon 750G, the M23 5G offered solid performance and 5G connectivity on a budget.",
    highlights: ["Snapdragon 750G", "120Hz Display", "5G Support"],
    pros: ["Stable Snapdragon performance", "Smooth 120Hz UI"],
    cons: ["LCD screen lacks vibrancy", "Average cameras"],
    verdict: "A practical budget 5G phone for daily tasks."
  },
  {
    name: "Galaxy M13",
    slug: "samsung-galaxy-m13",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Deep Green", "Light Blue", "Orange Copper"],
    release_date: "2022-05-27",
    price_usd: 150,
    price_bdt: 17000,
    price_display_text: "BDT 17,000",
    processor: "Exynos 850",
    display_type: "PLS LCD",
    screen_size: "6.6 inches",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8",
    battery_capacity: "5000 mAh",
    charging_wired: "15W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Long-Lasting",
    internal_links: { same_brand: ["samsung-galaxy-a13"] },
    ...commonSeoFields("Galaxy M13", 150),
    overview: "An entry-level device that closely mirrored the Galaxy A13, offering basic smartphone functionality and a large battery.",
    highlights: ["5000mAh Battery", "50MP Main Camera"],
    pros: ["Very affordable", "Reliable battery"],
    cons: ["Exynos 850 is quite slow", "Slow 15W charging"],
    verdict: "Only recommended for the most basic use cases."
  },
  {
    name: "Galaxy F23 5G",
    slug: "samsung-galaxy-f23-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Aqua Blue", "Forest Green", "Copper Blush"],
    release_date: "2022-03-08",
    price_usd: 220,
    price_bdt: 25000,
    price_display_text: "BDT 25,000",
    processor: "Snapdragon 750G 5G",
    display_type: "TFT LCD, 120Hz",
    screen_size: "6.6 inches",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8",
    battery_capacity: "5000 mAh",
    charging_wired: "25W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Mainstream",
    camera_tier: "Basic",
    battery_tier: "Long-Lasting",
    internal_links: { same_brand: ["samsung-galaxy-m23-5g"] },
    ...commonSeoFields("Galaxy F23 5G", 220),
    overview: "The Flipkart counterpart to the M23, the F23 5G offered the exact same Snapdragon 750G performance and 120Hz LCD screen in slightly different colors.",
    highlights: ["Snapdragon 750G", "120Hz Refresh Rate", "50MP Camera"],
    pros: ["Good performance for the price", "Smooth display"],
    cons: ["LCD instead of AMOLED", "No charger in box in some regions"],
    verdict: "A solid budget performer depending on regional pricing."
  },
  {
    name: "Galaxy F13",
    slug: "samsung-galaxy-f13",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Waterfall Blue", "Sunrise Copper", "Nightsky Green"],
    release_date: "2022-06-22",
    price_usd: 140,
    price_bdt: 16000,
    price_display_text: "BDT 16,000",
    processor: "Exynos 850",
    display_type: "PLS LCD",
    screen_size: "6.6 inches",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8",
    battery_capacity: "6000 mAh",
    charging_wired: "15W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Endurance",
    internal_links: { same_brand: ["samsung-galaxy-m13"] },
    ...commonSeoFields("Galaxy F13", 140),
    overview: "The F13 differentiated itself from the M13 and A13 by offering a larger 6000mAh battery for the Indian subcontinent market.",
    highlights: ["6000mAh Battery", "50MP Camera", "Affordable"],
    pros: ["Outstanding battery life", "Cheap"],
    cons: ["Heavy and bulky", "Exynos 850 is very slow"],
    verdict: "A pure battery workhorse for users on a strict budget."
  }
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const BrandSchema = new mongoose.Schema({}, { strict: false });
    const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
    
    const samsungBrand = await Brand.findOne({ name: /Samsung/i });
    let brandId = null;
    if (samsungBrand) brandId = samsungBrand._id;

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    for (const phone of phonesData) {
      if (brandId) (phone as any).brand_id = brandId;
      phone.updated_at = new Date() as any;
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("🎉 Batch 5 Part 3 (Older M & F Series) phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
