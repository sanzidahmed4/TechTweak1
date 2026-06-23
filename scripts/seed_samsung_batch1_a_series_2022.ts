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

const galaxyA73 = {
  name: "Galaxy A73 5G",
  slug: "samsung-galaxy-a73-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Awesome Gray", "Awesome Mint", "Awesome White"],
  release_date: "2022-04-22",
  price_usd: 500,
  price_bdt: 57500,
  price_display_text: "BDT 57,500",
  processor: "Snapdragon 778G 5G",
  display_type: "Super AMOLED Plus, 120Hz",
  screen_size: "6.7 inches",
  cam_count: "Quad",
  cam_main_sensor: "108 MP, f/1.8, OIS",
  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",
  water_resistance: "IP67 dust/water resistant",
  images: ["/placeholder.jpg"],
  price_segment: "Premium Mid-Range",
  performance_tier: "High-End",
  camera_tier: "Excellent",
  battery_tier: "Long-Lasting",
  internal_links: { same_brand: ["samsung-galaxy-a53-5g"] },
  ...commonSeoFields("Galaxy A73 5G", 500),
  overview: "The Galaxy A73 5G is the last of the A7x series, bringing a massive 108MP camera and a very capable Snapdragon 778G to the mid-range.",
  highlights: ["108MP Camera", "Snapdragon 778G", "6.7-inch Super AMOLED Plus"],
  pros: ["Incredibly thin and light", "Great performance", "Excellent main camera"],
  cons: ["No charger in box", "No telephoto lens"],
  verdict: "A superb premium mid-ranger that still holds up exceptionally well."
};

const galaxyA53 = {
  name: "Galaxy A53 5G",
  slug: "samsung-galaxy-a53-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Awesome Black", "Awesome White", "Awesome Blue", "Awesome Peach"],
  release_date: "2022-03-24",
  price_usd: 450,
  price_bdt: 51000,
  price_display_text: "BDT 51,000",
  processor: "Exynos 1280",
  display_type: "Super AMOLED, 120Hz",
  screen_size: "6.5 inches",
  cam_count: "Quad",
  cam_main_sensor: "64 MP, f/1.8, OIS",
  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",
  water_resistance: "IP67 dust/water resistant",
  images: ["/placeholder.jpg"],
  price_segment: "Premium Mid-Range",
  performance_tier: "Mainstream",
  camera_tier: "Good",
  battery_tier: "Long-Lasting",
  internal_links: { same_brand: ["samsung-galaxy-a54-5g", "samsung-galaxy-a33-5g"] },
  ...commonSeoFields("Galaxy A53 5G", 450),
  overview: "The A53 5G continues Samsung's popular A5x line with a gorgeous 120Hz display and reliable battery life.",
  highlights: ["120Hz Super AMOLED", "IP67 rating", "5000mAh battery"],
  pros: ["Great screen", "Long software support"],
  cons: ["Exynos 1280 can be sluggish", "No headphone jack"],
  verdict: "A reliable daily driver for most users."
};

const galaxyA33 = {
  name: "Galaxy A33 5G",
  slug: "samsung-galaxy-a33-5g",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Awesome Black", "Awesome White", "Awesome Blue", "Awesome Peach"],
  release_date: "2022-04-20",
  price_usd: 350,
  price_bdt: 40000,
  price_display_text: "BDT 40,000",
  processor: "Exynos 1280",
  display_type: "Super AMOLED, 90Hz",
  screen_size: "6.4 inches",
  cam_count: "Quad",
  cam_main_sensor: "48 MP, f/1.8, OIS",
  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",
  water_resistance: "IP67 dust/water resistant",
  images: ["/placeholder.jpg"],
  price_segment: "Mid-Range",
  performance_tier: "Mainstream",
  camera_tier: "Good",
  battery_tier: "Long-Lasting",
  internal_links: { same_brand: ["samsung-galaxy-a34-5g", "samsung-galaxy-a53-5g"] },
  ...commonSeoFields("Galaxy A33 5G", 350),
  overview: "A massive upgrade over the A32, the A33 brings OIS, 5G, and water resistance to a lower price point.",
  highlights: ["IP67 rating", "90Hz Super AMOLED", "OIS Camera"],
  pros: ["Excellent value", "Water resistant", "OIS"],
  cons: ["U-shaped notch", "No charger in box"],
  verdict: "One of the best value Samsung phones of 2022."
};

const galaxyA23 = {
  name: "Galaxy A23",
  slug: "samsung-galaxy-a23",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Black", "White", "Peach", "Blue"],
  release_date: "2022-03-25",
  price_usd: 250,
  price_bdt: 28000,
  price_display_text: "BDT 28,000",
  processor: "Snapdragon 680 4G",
  display_type: "PLS LCD, 90Hz",
  screen_size: "6.6 inches",
  cam_count: "Quad",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",
  images: ["/placeholder.jpg"],
  price_segment: "Budget",
  performance_tier: "Basic",
  camera_tier: "Basic",
  battery_tier: "Endurance",
  internal_links: { same_brand: ["samsung-galaxy-a24-4g", "samsung-galaxy-a13"] },
  ...commonSeoFields("Galaxy A23", 250),
  overview: "The Galaxy A23 is a solid budget phone that surprisingly includes OIS on its main camera.",
  highlights: ["50MP OIS Camera", "Snapdragon 680", "5000mAh battery"],
  pros: ["OIS is rare in this tier", "Great battery life"],
  cons: ["LCD display", "Slow UI at times"],
  verdict: "Good budget option if camera stability is a priority."
};

const galaxyA13 = {
  name: "Galaxy A13",
  slug: "samsung-galaxy-a13",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Black", "White", "Peach", "Blue"],
  release_date: "2022-03-23",
  price_usd: 180,
  price_bdt: 20000,
  price_display_text: "BDT 20,000",
  processor: "Exynos 850",
  display_type: "PLS LCD",
  screen_size: "6.6 inches",
  cam_count: "Quad",
  cam_main_sensor: "50 MP, f/1.8",
  battery_capacity: "5000 mAh",
  charging_wired: "15W wired",
  images: ["/placeholder.jpg"],
  price_segment: "Budget",
  performance_tier: "Basic",
  camera_tier: "Basic",
  battery_tier: "Endurance",
  internal_links: { same_brand: ["samsung-galaxy-a14-5g"] },
  ...commonSeoFields("Galaxy A13", 180),
  overview: "Samsung's entry-level workhorse for 2022, offering a large screen and battery.",
  highlights: ["6.6-inch display", "5000mAh battery", "50MP camera"],
  pros: ["Long battery life", "Decent main camera"],
  cons: ["Sluggish Exynos 850", "Slow 15W charging"],
  verdict: "Strictly for light users on a budget."
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

    const phones = [galaxyA73, galaxyA53, galaxyA33, galaxyA23, galaxyA13];

    for (const phone of phones) {
      if (brandId) (phone as any).brand_id = brandId;
      phone.updated_at = new Date() as any;
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("🎉 Batch 1.3 (2022 A Series) phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
