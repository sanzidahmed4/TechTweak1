import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number) => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, budget samsung phone, ${name.toLowerCase()} specs, samsung bangladesh`,
  meta_description: `Official and Unofficial Samsung ${name} price in Bangladesh. Read full specifications, battery life, budget features, in-depth review, and camera test.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} price in bd`,
  secondary_keywords: [`${name.toLowerCase()} price`, `samsung ${name.toLowerCase()} review`, `samsung ${name.toLowerCase()} specs`],
  question_keywords: [
    `what is the price of samsung ${name.toLowerCase()} in bangladesh?`,
    `how long is the battery life on samsung ${name.toLowerCase()}?`,
    `is samsung ${name.toLowerCase()} a good budget phone?`
  ],
  faq_schema: [
    { question: `What is the price of Samsung ${name} in Bangladesh?`, answer: `The price of Samsung ${name} was around BDT ${price * 115} at launch.` },
  ]
});

const phonesData = [
  // A04 Series
  { name: "Galaxy A04", slug: "samsung-galaxy-a04", phone_status: "released", is_published: true, is_official: true, release_date: "2022-08-24", price_usd: 130, price_bdt: 15000, price_display_text: "BDT 15,000", processor: "Helio P35", display_type: "PLS LCD", screen_size: "6.5 inches", cam_count: "Dual", cam_main_sensor: "50 MP", battery_capacity: "5000 mAh", charging_wired: "15W wired", images: ["/placeholder.jpg"], price_segment: "Budget", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Endurance", internal_links: { same_brand: ["samsung-galaxy-a04s"] }, ...commonSeoFields("Galaxy A04", 130) },
  { name: "Galaxy A04s", slug: "samsung-galaxy-a04s", phone_status: "released", is_published: true, is_official: true, release_date: "2022-08-31", price_usd: 150, price_bdt: 17000, price_display_text: "BDT 17,000", processor: "Exynos 850", display_type: "PLS LCD, 90Hz", screen_size: "6.5 inches", cam_count: "Triple", cam_main_sensor: "50 MP", battery_capacity: "5000 mAh", charging_wired: "15W wired", images: ["/placeholder.jpg"], price_segment: "Budget", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Endurance", internal_links: { same_brand: ["samsung-galaxy-a04"] }, ...commonSeoFields("Galaxy A04s", 150) },
  { name: "Galaxy A04e", slug: "samsung-galaxy-a04e", phone_status: "released", is_published: true, is_official: true, release_date: "2022-10-21", price_usd: 110, price_bdt: 12500, price_display_text: "BDT 12,500", processor: "Helio P35", display_type: "PLS LCD", screen_size: "6.5 inches", cam_count: "Dual", cam_main_sensor: "13 MP", battery_capacity: "5000 mAh", charging_wired: "10W wired", images: ["/placeholder.jpg"], price_segment: "Entry-Level", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Endurance", internal_links: { same_brand: ["samsung-galaxy-a04"] }, ...commonSeoFields("Galaxy A04e", 110) },

  // A03 Series
  { name: "Galaxy A03", slug: "samsung-galaxy-a03", phone_status: "released", is_published: true, is_official: true, release_date: "2021-11-26", price_usd: 120, price_bdt: 14000, price_display_text: "BDT 14,000", processor: "Unisoc T606", display_type: "PLS LCD", screen_size: "6.5 inches", cam_count: "Dual", cam_main_sensor: "48 MP", battery_capacity: "5000 mAh", charging_wired: "10W wired", images: ["/placeholder.jpg"], price_segment: "Budget", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Endurance", internal_links: { same_brand: ["samsung-galaxy-a03s"] }, ...commonSeoFields("Galaxy A03", 120) },
  { name: "Galaxy A03s", slug: "samsung-galaxy-a03s", phone_status: "released", is_published: true, is_official: true, release_date: "2021-08-18", price_usd: 140, price_bdt: 16000, price_display_text: "BDT 16,000", processor: "Helio P35", display_type: "PLS LCD", screen_size: "6.5 inches", cam_count: "Triple", cam_main_sensor: "13 MP", battery_capacity: "5000 mAh", charging_wired: "15W wired", images: ["/placeholder.jpg"], price_segment: "Budget", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Endurance", internal_links: { same_brand: ["samsung-galaxy-a03"] }, ...commonSeoFields("Galaxy A03s", 140) },
  { name: "Galaxy A03 Core", slug: "samsung-galaxy-a03-core", phone_status: "released", is_published: true, is_official: true, release_date: "2021-11-15", price_usd: 90, price_bdt: 10500, price_display_text: "BDT 10,500", processor: "Unisoc SC9863A", display_type: "TFT LCD", screen_size: "6.5 inches", cam_count: "Single", cam_main_sensor: "8 MP", battery_capacity: "5000 mAh", charging_wired: "10W wired", images: ["/placeholder.jpg"], price_segment: "Entry-Level", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Endurance", internal_links: { same_brand: ["samsung-galaxy-a03"] }, ...commonSeoFields("Galaxy A03 Core", 90) },

  // M Series
  { name: "Galaxy M52 5G", slug: "samsung-galaxy-m52-5g", phone_status: "released", is_published: true, is_official: true, release_date: "2021-09-24", price_usd: 350, price_bdt: 40000, price_display_text: "BDT 40,000", processor: "Snapdragon 778G 5G", display_type: "Super AMOLED Plus, 120Hz", screen_size: "6.7 inches", cam_count: "Triple", cam_main_sensor: "64 MP", battery_capacity: "5000 mAh", charging_wired: "25W wired", images: ["/placeholder.jpg"], price_segment: "Mid-Range", performance_tier: "High-End", camera_tier: "Good", battery_tier: "Long-Lasting", internal_links: { same_brand: ["samsung-galaxy-m53-5g"] }, ...commonSeoFields("Galaxy M52 5G", 350) },
  { name: "Galaxy M32", slug: "samsung-galaxy-m32", phone_status: "released", is_published: true, is_official: true, release_date: "2021-06-21", price_usd: 220, price_bdt: 25000, price_display_text: "BDT 25,000", processor: "Helio G80", display_type: "Super AMOLED, 90Hz", screen_size: "6.4 inches", cam_count: "Quad", cam_main_sensor: "64 MP", battery_capacity: "6000 mAh", charging_wired: "25W wired", images: ["/placeholder.jpg"], price_segment: "Budget", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Endurance", internal_links: { same_brand: ["samsung-galaxy-m33-5g"] }, ...commonSeoFields("Galaxy M32", 220) },
  { name: "Galaxy M22", slug: "samsung-galaxy-m22", phone_status: "released", is_published: true, is_official: true, release_date: "2021-09-14", price_usd: 200, price_bdt: 23000, price_display_text: "BDT 23,000", processor: "Helio G80", display_type: "Super AMOLED, 90Hz", screen_size: "6.4 inches", cam_count: "Quad", cam_main_sensor: "48 MP, OIS", battery_capacity: "5000 mAh", charging_wired: "25W wired", images: ["/placeholder.jpg"], price_segment: "Budget", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Endurance", internal_links: { same_brand: ["samsung-galaxy-m32"] }, ...commonSeoFields("Galaxy M22", 200) },
  { name: "Galaxy M12", slug: "samsung-galaxy-m12", phone_status: "released", is_published: true, is_official: true, release_date: "2021-02-05", price_usd: 150, price_bdt: 17000, price_display_text: "BDT 17,000", processor: "Exynos 850", display_type: "PLS LCD, 90Hz", screen_size: "6.5 inches", cam_count: "Quad", cam_main_sensor: "48 MP", battery_capacity: "6000 mAh", charging_wired: "15W wired", images: ["/placeholder.jpg"], price_segment: "Budget", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Endurance", internal_links: { same_brand: ["samsung-galaxy-m22"] }, ...commonSeoFields("Galaxy M12", 150) },

  // F Series
  { name: "Galaxy F22", slug: "samsung-galaxy-f22", phone_status: "released", is_published: true, is_official: true, release_date: "2021-07-06", price_usd: 180, price_bdt: 20000, price_display_text: "BDT 20,000", processor: "Helio G80", display_type: "Super AMOLED, 90Hz", screen_size: "6.4 inches", cam_count: "Quad", cam_main_sensor: "48 MP", battery_capacity: "6000 mAh", charging_wired: "15W wired", images: ["/placeholder.jpg"], price_segment: "Budget", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Endurance", internal_links: { same_brand: ["samsung-galaxy-f12"] }, ...commonSeoFields("Galaxy F22", 180) },
  { name: "Galaxy F12", slug: "samsung-galaxy-f12", phone_status: "released", is_published: true, is_official: true, release_date: "2021-04-05", price_usd: 140, price_bdt: 16000, price_display_text: "BDT 16,000", processor: "Exynos 850", display_type: "PLS LCD, 90Hz", screen_size: "6.5 inches", cam_count: "Quad", cam_main_sensor: "48 MP", battery_capacity: "6000 mAh", charging_wired: "15W wired", images: ["/placeholder.jpg"], price_segment: "Budget", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Endurance", internal_links: { same_brand: ["samsung-galaxy-f22"] }, ...commonSeoFields("Galaxy F12", 140) },

  // Classics (A50/A70 etc)
  { name: "Galaxy A70", slug: "samsung-galaxy-a70", phone_status: "released", is_published: true, is_official: true, release_date: "2019-03-26", price_usd: 350, price_bdt: 40000, price_display_text: "BDT 40,000", processor: "Snapdragon 675", display_type: "Super AMOLED", screen_size: "6.7 inches", cam_count: "Triple", cam_main_sensor: "32 MP", battery_capacity: "4500 mAh", charging_wired: "25W wired", images: ["/placeholder.jpg"], price_segment: "Mid-Range", performance_tier: "Mainstream", camera_tier: "Basic", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-a50"] }, ...commonSeoFields("Galaxy A70", 350) },
  { name: "Galaxy A50", slug: "samsung-galaxy-a50", phone_status: "released", is_published: true, is_official: true, release_date: "2019-02-25", price_usd: 250, price_bdt: 28000, price_display_text: "BDT 28,000", processor: "Exynos 9610", display_type: "Super AMOLED", screen_size: "6.4 inches", cam_count: "Triple", cam_main_sensor: "25 MP", battery_capacity: "4000 mAh", charging_wired: "15W wired", images: ["/placeholder.jpg"], price_segment: "Budget", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-a70"] }, ...commonSeoFields("Galaxy A50", 250) },
  { name: "Galaxy A30", slug: "samsung-galaxy-a30", phone_status: "released", is_published: true, is_official: true, release_date: "2019-02-25", price_usd: 200, price_bdt: 23000, price_display_text: "BDT 23,000", processor: "Exynos 7904", display_type: "Super AMOLED", screen_size: "6.4 inches", cam_count: "Dual", cam_main_sensor: "16 MP", battery_capacity: "4000 mAh", charging_wired: "15W wired", images: ["/placeholder.jpg"], price_segment: "Budget", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-a50"] }, ...commonSeoFields("Galaxy A30", 200) },
  { name: "Galaxy A20", slug: "samsung-galaxy-a20", phone_status: "released", is_published: true, is_official: true, release_date: "2019-03-19", price_usd: 150, price_bdt: 17000, price_display_text: "BDT 17,000", processor: "Exynos 7884", display_type: "Super AMOLED", screen_size: "6.4 inches", cam_count: "Dual", cam_main_sensor: "13 MP", battery_capacity: "4000 mAh", charging_wired: "15W wired", images: ["/placeholder.jpg"], price_segment: "Budget", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-a30"] }, ...commonSeoFields("Galaxy A20", 150) },
  { name: "Galaxy A10", slug: "samsung-galaxy-a10", phone_status: "released", is_published: true, is_official: true, release_date: "2019-02-28", price_usd: 120, price_bdt: 14000, price_display_text: "BDT 14,000", processor: "Exynos 7884", display_type: "IPS LCD", screen_size: "6.2 inches", cam_count: "Single", cam_main_sensor: "13 MP", battery_capacity: "3400 mAh", charging_wired: "5W wired", images: ["/placeholder.jpg"], price_segment: "Budget", performance_tier: "Basic", camera_tier: "Basic", battery_tier: "Basic", internal_links: { same_brand: ["samsung-galaxy-a20"] }, ...commonSeoFields("Galaxy A10", 120) }
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

    console.log("🎉 Batch 6 (Budget Kings & Classics) phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
