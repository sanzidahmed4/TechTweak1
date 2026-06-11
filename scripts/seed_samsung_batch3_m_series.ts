import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number) => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, samsung battery monster, ${name.toLowerCase()} specs, samsung bangladesh`,
  meta_description: `Official and Unofficial Samsung ${name} price in Bangladesh. Read full specifications, battery life, features, in-depth review, and camera test.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} price in bd`,
  secondary_keywords: [`${name.toLowerCase()} price`, `samsung ${name.toLowerCase()} review`, `samsung ${name.toLowerCase()} specs`],
  question_keywords: [
    `what is the price of samsung ${name.toLowerCase()} in bangladesh?`,
    `how long does the battery last on samsung ${name.toLowerCase()}?`,
    `is samsung ${name.toLowerCase()} good for gaming?`
  ],
  faq_schema: [
    { question: `What is the price of Samsung ${name} in Bangladesh?`, answer: `The price of Samsung ${name} starts around BDT ${price * 115}.` },
  ]
});

const galaxyM55 = {
  name: "Galaxy M55 5G",
  slug: "samsung-galaxy-m55-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Light Green", "Dark Blue"],
  release_date: "2024-03-28",
  price_usd: 350,
  price_bdt: 40000,
  price_display_text: "BDT 40,000",
  processor: "Snapdragon 7 Gen 1 (4 nm)",
  display_type: "Super AMOLED Plus, 120Hz, 1000 nits",
  screen_size: "6.7 inches",
  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  cam_front_resolution: "50 MP",
  battery_capacity: "5000 mAh",
  charging_wired: "45W wired",
  water_resistance: "No",
  images: ["/placeholder.jpg"],
  price_segment: "Mid-Range",
  performance_tier: "Mainstream",
  camera_tier: "Good",
  battery_tier: "Long-Lasting",
  internal_links: { same_brand: ["samsung-galaxy-a55-5g", "samsung-galaxy-m54-5g"] },
  ...commonSeoFields("Galaxy M55 5G", 350),
  overview: "The Galaxy M55 5G stands out with its Snapdragon 7 Gen 1 processor, 45W fast charging, and an impressive 50MP front-facing camera, making it a great alternative to the A-series.",
  highlights: ["45W Fast Charging", "50MP Selfie Camera", "Snapdragon 7 Gen 1"],
  pros: ["Fastest charging in a mid-range Samsung", "Great selfie camera", "Sleek design"],
  cons: ["No IP rating", "Plastic build"],
  verdict: "A solid choice if you prioritize charging speed and selfies over a premium build."
};

const galaxyM35 = {
  name: "Galaxy M35 5G",
  slug: "samsung-galaxy-m35-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Light Blue", "Dark Blue", "Gray"],
  release_date: "2024-05-24",
  price_usd: 280,
  price_bdt: 32000,
  price_display_text: "BDT 32,000",
  processor: "Exynos 1380 (5 nm)",
  display_type: "Super AMOLED, 120Hz, 1000 nits",
  screen_size: "6.6 inches",
  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  battery_capacity: "6000 mAh",
  charging_wired: "25W wired",
  water_resistance: "No",
  images: ["/placeholder.jpg"],
  price_segment: "Mid-Range",
  performance_tier: "Mainstream",
  camera_tier: "Good",
  battery_tier: "Endurance",
  internal_links: { same_brand: ["samsung-galaxy-a35-5g", "samsung-galaxy-m15-5g"] },
  ...commonSeoFields("Galaxy M35 5G", 280),
  overview: "Continuing the M-series legacy, the M35 5G features a massive 6000mAh battery paired with the Exynos 1380 processor, ensuring two days of battery life.",
  highlights: ["Massive 6000mAh Battery", "Exynos 1380", "120Hz Super AMOLED"],
  pros: ["Incredible battery life", "Bright display", "OIS on main camera"],
  cons: ["Very heavy and thick", "Slow 25W charging for a 6000mAh battery"],
  verdict: "The perfect phone for power users who hate carrying a power bank."
};

const galaxyM15 = {
  name: "Galaxy M15 5G",
  slug: "samsung-galaxy-m15-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Light Blue", "Dark Blue", "Gray"],
  release_date: "2024-03-09",
  price_usd: 180,
  price_bdt: 20000,
  price_display_text: "BDT 20,000",
  processor: "Dimensity 6100+ (6 nm)",
  display_type: "Super AMOLED, 90Hz, 800 nits",
  screen_size: "6.5 inches",
  cam_count: "Triple",
  cam_main_sensor: "50 MP",
  battery_capacity: "6000 mAh",
  charging_wired: "25W wired",
  water_resistance: "No",
  images: ["/placeholder.jpg"],
  price_segment: "Budget",
  performance_tier: "Basic",
  camera_tier: "Basic",
  battery_tier: "Endurance",
  internal_links: { same_brand: ["samsung-galaxy-a15-5g", "samsung-galaxy-m35-5g"] },
  ...commonSeoFields("Galaxy M15 5G", 180),
  overview: "An ultra-budget battery monster, the M15 5G pairs a 6000mAh battery with a very power-efficient Dimensity processor and an AMOLED screen.",
  highlights: ["6000mAh Battery", "Dimensity 6100+", "90Hz AMOLED"],
  pros: ["Unbeatable battery life for the price", "Vibrant AMOLED screen", "Affordable 5G"],
  cons: ["Outdated waterdrop notch", "Mono speaker"],
  verdict: "The absolute best budget battery phone in Samsung's lineup."
};

const galaxyM54 = {
  name: "Galaxy M54 5G",
  slug: "samsung-galaxy-m54-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Dark Blue", "Silver"],
  release_date: "2023-03-22",
  price_usd: 400,
  price_bdt: 46000,
  price_display_text: "BDT 46,000",
  processor: "Exynos 1380",
  display_type: "Super AMOLED Plus, 120Hz",
  screen_size: "6.7 inches",
  cam_count: "Triple",
  cam_main_sensor: "108 MP, f/1.8, OIS",
  battery_capacity: "6000 mAh",
  charging_wired: "25W wired",
  water_resistance: "No",
  images: ["/placeholder.jpg"],
  price_segment: "Premium Mid-Range",
  performance_tier: "Mainstream",
  camera_tier: "Excellent",
  battery_tier: "Endurance",
  internal_links: { same_brand: ["samsung-galaxy-m55-5g", "samsung-galaxy-a54-5g"] },
  ...commonSeoFields("Galaxy M54 5G", 400),
  overview: "The M54 5G was a 2023 beast, featuring a 108MP camera and a 6000mAh battery, acting as the higher-end sibling to the popular M34.",
  highlights: ["108MP OIS Camera", "6000mAh Battery", "6.7-inch AMOLED Plus"],
  pros: ["Excellent camera resolution", "Endless battery", "Large, beautiful screen"],
  cons: ["No headphone jack", "Plastic build"],
  verdict: "Still a fantastic buy if you find it discounted."
};

const galaxyM34 = {
  name: "Galaxy M34 5G",
  slug: "samsung-galaxy-m34-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Midnight Blue", "Prism Silver", "Waterfall Blue"],
  release_date: "2023-07-07",
  price_usd: 250,
  price_bdt: 28000,
  price_display_text: "BDT 28,000",
  processor: "Exynos 1280",
  display_type: "Super AMOLED, 120Hz",
  screen_size: "6.5 inches",
  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  battery_capacity: "6000 mAh",
  charging_wired: "25W wired",
  water_resistance: "No",
  images: ["/placeholder.jpg"],
  price_segment: "Budget",
  performance_tier: "Mainstream",
  camera_tier: "Good",
  battery_tier: "Endurance",
  internal_links: { same_brand: ["samsung-galaxy-a34-5g", "samsung-galaxy-m35-5g"] },
  ...commonSeoFields("Galaxy M34 5G", 250),
  overview: "A highly popular mid-ranger offering OIS and a 6000mAh battery at an extremely competitive price.",
  highlights: ["50MP OIS Camera", "6000mAh Battery", "Exynos 1280"],
  pros: ["Great value for money", "Superb battery", "OIS on a budget"],
  cons: ["Outdated notch", "Thick and heavy"],
  verdict: "One of the best budget phones for those who need a phone to last all day and night."
};

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

    const phones = [galaxyM55, galaxyM35, galaxyM15, galaxyM54, galaxyM34];

    for (const phone of phones) {
      if (brandId) (phone as any).brand_id = brandId;
      phone.updated_at = new Date() as any;
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("🎉 Batch 3 (M Series) phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
