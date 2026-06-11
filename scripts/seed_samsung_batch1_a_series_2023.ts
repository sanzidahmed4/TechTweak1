import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number) => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, samsung ${name.toLowerCase()} review, ${name.toLowerCase()} specs, samsung bangladesh`,
  meta_description: `Official and Unofficial Samsung ${name} price in Bangladesh. Read full specifications, features, in-depth review, and camera test.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} price in bd`,
  secondary_keywords: [`${name.toLowerCase()} price`, `samsung ${name.toLowerCase()} review`, `samsung ${name.toLowerCase()} specs`],
  question_keywords: [
    `what is the price of samsung ${name.toLowerCase()} in bangladesh?`,
    `is samsung ${name.toLowerCase()} good for gaming?`,
    `does samsung ${name.toLowerCase()} have an IP rating?`
  ],
  faq_schema: [
    { question: `What is the price of Samsung ${name} in Bangladesh?`, answer: `The price of Samsung ${name} starts around BDT ${price * 115}.` },
  ]
});

const galaxyA54 = {
  name: "Galaxy A54 5G",
  slug: "samsung-galaxy-a54-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  model_number: "SM-A546E",
  colors: ["Lime", "Graphite", "Violet", "White"],
  release_date: "2023-03-24",
  price_usd: 400,
  price_bdt: 46000,
  price_display_text: "BDT 46,000",
  processor: "Exynos 1380 (5 nm)",
  display_type: "Super AMOLED, 120Hz, 1000 nits (HBM)",
  screen_size: "6.4 inches",
  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",
  water_resistance: "IP67 dust/water resistant",
  images: ["/placeholder.jpg"],
  price_segment: "Premium Mid-Range",
  performance_tier: "High-End",
  camera_tier: "Good",
  battery_tier: "Long-Lasting",
  internal_links: { same_brand: ["samsung-galaxy-a55-5g", "samsung-galaxy-a34-5g"], upcoming: ["samsung-galaxy-a56-5g"] },
  ...commonSeoFields("Galaxy A54 5G", 400),
  overview: "The Galaxy A54 5G was Samsung's premium mid-ranger for 2023, offering a glass back and reliable Exynos 1380.",
  highlights: ["120Hz Super AMOLED", "IP67 rating", "5000mAh battery"],
  pros: ["Premium glass design", "Great screen", "Long software support"],
  cons: ["Thick bezels", "No charger in box"],
  verdict: "Still a very solid option if found at a discount."
};

const galaxyA34 = {
  name: "Galaxy A34 5G",
  slug: "samsung-galaxy-a34-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  model_number: "SM-A346E",
  colors: ["Lime", "Graphite", "Violet", "Silver"],
  release_date: "2023-03-24",
  price_usd: 300,
  price_bdt: 34500,
  price_display_text: "BDT 34,500",
  processor: "Dimensity 1080 (6 nm)",
  display_type: "Super AMOLED, 120Hz",
  screen_size: "6.6 inches",
  cam_count: "Triple",
  cam_main_sensor: "48 MP, f/1.8, OIS",
  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",
  water_resistance: "IP67 dust/water resistant",
  images: ["/placeholder.jpg"],
  price_segment: "Mid-Range",
  performance_tier: "Mainstream",
  camera_tier: "Good",
  battery_tier: "Long-Lasting",
  internal_links: { same_brand: ["samsung-galaxy-a35-5g", "samsung-galaxy-a54-5g"], upcoming: ["samsung-galaxy-a36-5g"] },
  ...commonSeoFields("Galaxy A34 5G", 300),
  overview: "Powered by the Dimensity 1080, the A34 5G offered fantastic battery life and performance for its tier.",
  highlights: ["Dimensity 1080", "IP67 rating", "120Hz AMOLED"],
  pros: ["Excellent battery life", "Fluid performance", "Water resistance"],
  cons: ["Waterdrop notch", "Slow charging"],
  verdict: "A great all-rounder from 2023."
};

const galaxyA24 = {
  name: "Galaxy A24 4G",
  slug: "samsung-galaxy-a24-4g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  model_number: "SM-A245F",
  colors: ["Black", "Lime Green", "Blue gradient", "Dark red"],
  release_date: "2023-05-05",
  price_usd: 200,
  price_bdt: 23000,
  price_display_text: "BDT 23,000",
  processor: "Helio G99 (6nm)",
  display_type: "Super AMOLED, 90Hz",
  screen_size: "6.5 inches",
  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",
  images: ["/placeholder.jpg"],
  price_segment: "Budget",
  performance_tier: "Mainstream",
  camera_tier: "Basic",
  battery_tier: "Endurance",
  internal_links: { same_brand: ["samsung-galaxy-a25-5g", "samsung-galaxy-a14-4g"] },
  ...commonSeoFields("Galaxy A24 4G", 200),
  overview: "A very solid 4G option featuring a Super AMOLED screen and the highly efficient Helio G99 chipset.",
  highlights: ["Helio G99", "90Hz AMOLED", "OIS Camera"],
  pros: ["Great battery life", "Bright screen", "OIS on a budget"],
  cons: ["No 5G", "U-shaped notch"],
  verdict: "One of the best 4G budget phones from Samsung."
};

const galaxyA14_5g = {
  name: "Galaxy A14 5G",
  slug: "samsung-galaxy-a14-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Black", "Light Green", "Dark Red", "Silver"],
  release_date: "2023-01-12",
  price_usd: 190,
  price_bdt: 21000,
  price_display_text: "BDT 21,000",
  processor: "Exynos 1330 / Dimensity 700",
  display_type: "PLS LCD, 90Hz",
  screen_size: "6.6 inches",
  cam_count: "Triple",
  cam_main_sensor: "50 MP",
  battery_capacity: "5000 mAh",
  charging_wired: "15W wired",
  images: ["/placeholder.jpg"],
  price_segment: "Budget",
  performance_tier: "Basic",
  camera_tier: "Basic",
  battery_tier: "Endurance",
  internal_links: { same_brand: ["samsung-galaxy-a15-5g"] },
  ...commonSeoFields("Galaxy A14 5G", 190),
  overview: "An entry-level 5G phone offering Samsung's ecosystem on a tight budget.",
  highlights: ["5G on a budget", "5000mAh battery", "90Hz display"],
  pros: ["Affordable 5G", "Good battery life"],
  cons: ["Slow 15W charging", "LCD instead of AMOLED"],
  verdict: "Good for basic 5G connectivity."
};

const galaxyA05s = {
  name: "Galaxy A05s",
  slug: "samsung-galaxy-a05s",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Black", "Silver", "Light Green", "Violet"],
  release_date: "2023-10-18",
  price_usd: 150,
  price_bdt: 17500,
  price_display_text: "BDT 17,500",
  processor: "Snapdragon 680 4G (6 nm)",
  display_type: "PLS LCD, 90Hz",
  screen_size: "6.7 inches",
  cam_count: "Triple",
  cam_main_sensor: "50 MP",
  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",
  images: ["/placeholder.jpg"],
  price_segment: "Budget",
  performance_tier: "Basic",
  camera_tier: "Basic",
  battery_tier: "Endurance",
  internal_links: { same_brand: ["samsung-galaxy-a05"] },
  ...commonSeoFields("Galaxy A05s", 150),
  overview: "A great starter phone featuring a large 6.7-inch display and a power-efficient Snapdragon 680 processor.",
  highlights: ["Snapdragon 680", "6.7-inch screen", "25W charging"],
  pros: ["Large screen", "Good battery life", "Decent processor for the price"],
  cons: ["No 5G", "Only LCD"],
  verdict: "A massive step up from previous A0x series phones."
};

const galaxyA05 = {
  name: "Galaxy A05",
  slug: "samsung-galaxy-a05",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Black", "Silver", "Light Green"],
  release_date: "2023-10-15",
  price_usd: 120,
  price_bdt: 14000,
  price_display_text: "BDT 14,000",
  processor: "Helio G85 (12nm)",
  display_type: "PLS LCD",
  screen_size: "6.7 inches",
  cam_count: "Dual",
  cam_main_sensor: "50 MP",
  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",
  images: ["/placeholder.jpg"],
  price_segment: "Budget",
  performance_tier: "Basic",
  camera_tier: "Basic",
  battery_tier: "Endurance",
  internal_links: { same_brand: ["samsung-galaxy-a05s"] },
  ...commonSeoFields("Galaxy A05", 120),
  overview: "Samsung's most basic 2023 smartphone, focusing purely on essentials like battery and screen size.",
  highlights: ["6.7-inch screen", "25W charging", "Helio G85"],
  pros: ["Very cheap", "Big screen"],
  cons: ["Low resolution", "Outdated processor"],
  verdict: "Only for the most basic users."
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

    const phones = [galaxyA54, galaxyA34, galaxyA24, galaxyA14_5g, galaxyA05s, galaxyA05];

    for (const phone of phones) {
      if (brandId) (phone as any).brand_id = brandId;
      phone.updated_at = new Date() as any;
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("🎉 Batch 1.2 (2023 A Series) phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
