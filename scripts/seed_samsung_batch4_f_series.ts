import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number) => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, samsung flipkart series, ${name.toLowerCase()} specs, samsung bangladesh`,
  meta_description: `Official and Unofficial Samsung ${name} price in Bangladesh. Read full specifications, design features, in-depth review, and camera test.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} price in bd`,
  secondary_keywords: [`${name.toLowerCase()} price`, `samsung ${name.toLowerCase()} review`, `samsung ${name.toLowerCase()} specs`],
  question_keywords: [
    `what is the price of samsung ${name.toLowerCase()} in bangladesh?`,
    `how is the camera on samsung ${name.toLowerCase()}?`,
    `is samsung ${name.toLowerCase()} good for gaming?`
  ],
  faq_schema: [
    { question: `What is the price of Samsung ${name} in Bangladesh?`, answer: `The price of Samsung ${name} starts around BDT ${price * 115}.` },
  ]
});

const galaxyF55 = {
  name: "Galaxy F55 5G",
  slug: "samsung-galaxy-f55-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Apricot Crush", "Raisin Black"],
  release_date: "2024-05-27",
  price_usd: 330,
  price_bdt: 38000,
  price_display_text: "BDT 38,000",
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
  internal_links: { same_brand: ["samsung-galaxy-m55-5g", "samsung-galaxy-f54-5g"] },
  ...commonSeoFields("Galaxy F55 5G", 330),
  overview: "The Galaxy F55 5G introduces a premium vegan leather back to Samsung's mid-range, offering a unique aesthetic alongside the Snapdragon 7 Gen 1 and 45W charging.",
  highlights: ["Vegan Leather Back", "45W Fast Charging", "Snapdragon 7 Gen 1"],
  pros: ["Unique and premium design", "Fastest charging in a mid-range Samsung", "Great selfie camera"],
  cons: ["No IP rating", "Pricey compared to M55"],
  verdict: "A stylish alternative to the M55 for those who prefer a vegan leather finish."
};

const galaxyF15 = {
  name: "Galaxy F15 5G",
  slug: "samsung-galaxy-f15-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Ash Black", "Groovy Violet", "Jazzy Green"],
  release_date: "2024-03-11",
  price_usd: 160,
  price_bdt: 18500,
  price_display_text: "BDT 18,500",
  processor: "Dimensity 6100+ (6 nm)",
  display_type: "Super AMOLED, 90Hz",
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
  internal_links: { same_brand: ["samsung-galaxy-m15-5g", "samsung-galaxy-a15-5g"] },
  ...commonSeoFields("Galaxy F15 5G", 160),
  overview: "The F15 5G is essentially identical to the M15 5G, designed primarily for the Indian market through Flipkart, offering a massive 6000mAh battery and a Dimensity 6100+ chip.",
  highlights: ["6000mAh Battery", "Dimensity 6100+", "4 generations of OS upgrades"],
  pros: ["Incredible battery life", "Longest software support in this budget segment", "AMOLED screen"],
  cons: ["Slow 25W charging for a 6000mAh battery", "Waterdrop notch"],
  verdict: "A fantastic budget device if you prioritize software longevity and battery life."
};

const galaxyF54 = {
  name: "Galaxy F54 5G",
  slug: "samsung-galaxy-f54-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Meteor Blue", "Stardust Silver"],
  release_date: "2023-06-06",
  price_usd: 350,
  price_bdt: 40000,
  price_display_text: "BDT 40,000",
  processor: "Exynos 1380",
  display_type: "Super AMOLED Plus, 120Hz",
  screen_size: "6.7 inches",
  cam_count: "Triple",
  cam_main_sensor: "108 MP, f/1.8, OIS",
  battery_capacity: "6000 mAh",
  charging_wired: "25W wired",
  water_resistance: "No",
  images: ["/placeholder.jpg"],
  price_segment: "Mid-Range",
  performance_tier: "Mainstream",
  camera_tier: "Excellent",
  battery_tier: "Endurance",
  internal_links: { same_brand: ["samsung-galaxy-m54-5g", "samsung-galaxy-f55-5g"] },
  ...commonSeoFields("Galaxy F54 5G", 350),
  overview: "The Galaxy F54 5G brings a 108MP camera and a massive 6000mAh battery, directly paralleling the M54 with a slightly different design language.",
  highlights: ["108MP OIS Camera", "6000mAh Battery", "Exynos 1380"],
  pros: ["Huge battery", "Great main camera", "Large display"],
  cons: ["No IP rating", "Plastic build feels slightly cheap"],
  verdict: "A solid alternative to the A54 if you care more about battery size than premium materials."
};

const galaxyF34 = {
  name: "Galaxy F34 5G",
  slug: "samsung-galaxy-f34-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Electric Black", "Mystic Green", "Orchid Violet"],
  release_date: "2023-08-12",
  price_usd: 230,
  price_bdt: 26500,
  price_display_text: "BDT 26,500",
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
  internal_links: { same_brand: ["samsung-galaxy-m34-5g"] },
  ...commonSeoFields("Galaxy F34 5G", 230),
  overview: "Like most F-series phones, the F34 is a rebranded M34 for specific markets, offering identical excellent battery life and OIS camera specs.",
  highlights: ["6000mAh Battery", "OIS Camera", "120Hz AMOLED"],
  pros: ["Great battery", "OIS on a budget", "4 years of OS updates"],
  cons: ["Thick bezels", "Exynos 1280 can stutter occasionally"],
  verdict: "An amazing budget device for battery-conscious users."
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

    const phones = [galaxyF55, galaxyF15, galaxyF54, galaxyF34];

    for (const phone of phones) {
      if (brandId) (phone as any).brand_id = brandId;
      phone.updated_at = new Date() as any;
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("🎉 Batch 4 (F Series) phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
