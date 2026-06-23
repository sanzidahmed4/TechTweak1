import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number | null) => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, samsung ${name.toLowerCase()} review, ${name.toLowerCase()} specs, samsung bangladesh`,
  meta_description: `Official and Unofficial Samsung ${name} price in Bangladesh. Read full specifications, features, in-depth review, gaming performance, and camera test.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} price in bd`,
  secondary_keywords: [`${name.toLowerCase()} price`, `samsung ${name.toLowerCase()} review`, `samsung ${name.toLowerCase()} specs`],
  question_keywords: [
    `what is the price of samsung ${name.toLowerCase()} in bangladesh?`,
    `is samsung ${name.toLowerCase()} good for gaming?`,
    `does samsung ${name.toLowerCase()} have an IP rating?`
  ],
  faq_schema: [
    { question: `What is the price of Samsung ${name} in Bangladesh?`, answer: `The official price of Samsung ${name} is expected to start around BDT ${price ? price * 120 : 'Not Announced'}.` },
    { question: `Does ${name} support 5G?`, answer: `Yes, the Samsung ${name} comes with 5G support.` },
    { question: `Is Samsung ${name} waterproof?`, answer: `Please refer to the IP rating section for water resistance details.` },
  ]
});

const galaxyA55 = {
  name: "Galaxy A55 5G",
  slug: "samsung-galaxy-a55-5g",
  is_published: true,
  is_official: true,
  model_number: "SM-A556E",
  colors: ["Awesome Iceblue", "Awesome Lilac", "Awesome Navy", "Awesome Lemon"],
  made_in: "Vietnam / India",
  phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB",
  release_date: "2024-03-15",
  
  price_usd: 480,
  price_bdt: 55000,
  price_display_text: "BDT 55,000",

  processor: "Exynos 1480 (4 nm)",
  cpu: "Octa-core (4x2.75 GHz Cortex-A78 & 4x2.0 GHz Cortex-A55)",
  gpu: "Xclipse 530",
  
  display_type: "Super AMOLED, 120Hz, HDR10+, 1000 nits (HBM)",
  screen_size: "6.6 inches",
  resolution: "1080 x 2340 pixels",
  refresh_rate: "120Hz",
  brightness: "1000 nits (HBM)",
  protection: "Corning Gorilla Glass Victus+",

  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  cam_ultrawide: "12 MP, f/2.2, 123˚",
  cam_telephoto: "5 MP Macro",
  cam_video: "4K@30fps, 1080p@30/60fps, gyro-EIS",
  
  cam_front_resolution: "32 MP, f/2.2",
  cam_front_video: "4K@30fps, 1080p@30/60fps",

  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",
  charging_wireless: "No",
  charger_included: false,

  water_resistance: "IP67 dust/water resistant (up to 1m for 30 min)",
  weight: "213 g",
  dimensions: "161.1 x 77.4 x 8.2 mm",
  build_material: "Glass front (Gorilla Glass Victus+), glass back (Gorilla Glass), aluminum frame",
  
  images: ["/placeholder.jpg"], // Admin Upload Placeholder
  
  android_version: "Android 14",
  ui_version: "One UI 6.1",
  update_policy: "4 major upgrades",
  
  wifi_version: "Wi-Fi 6, dual-band",
  bluetooth_version: "5.3",
  has_5g: true,
  has_nfc: true,
  has_audio_jack: false,
  sensor_fingerprint: "Under display (optical)",
  
  ...commonSeoFields("Galaxy A55 5G", 480),
  overview: "The Samsung Galaxy A55 5G is a premium mid-range smartphone featuring an aluminum frame, IP67 rating, and the efficient Exynos 1480 chipset with AMD's Xclipse 530 GPU. It offers a solid mix of performance, camera quality, and long-term software support.",
  highlights: ["Premium metal and glass build", "Excellent Super AMOLED display", "Solid battery life", "4 years of OS updates"],
  pros: ["IP67 water and dust resistance", "Gorilla Glass Victus+ protection", "Great main and ultrawide cameras", "Stellar software support"],
  cons: ["No charger in the box", "Thick bezels", "Slightly heavy at 213g", "25W charging is relatively slow"],
  verdict: "The Galaxy A55 5G is highly recommended for users seeking a reliable, long-lasting mid-range phone with Samsung's excellent One UI experience and premium build quality."
};

const galaxyA35 = {
  name: "Galaxy A35 5G",
  slug: "samsung-galaxy-a35-5g",
  is_published: true,
  is_official: true,
  model_number: "SM-A356E",
  colors: ["Awesome Iceblue", "Awesome Lilac", "Awesome Navy", "Awesome Lemon"],
  made_in: "Vietnam / India",
  phone_variants: "6GB/128GB, 8GB/128GB, 8GB/256GB",
  release_date: "2024-03-15",
  
  price_usd: 380,
  price_bdt: 45000,
  price_display_text: "BDT 45,000",

  processor: "Exynos 1380 (5 nm)",
  cpu: "Octa-core (4x2.4 GHz Cortex-A78 & 4x2.0 GHz Cortex-A55)",
  gpu: "Mali-G68 MP5",
  
  display_type: "Super AMOLED, 120Hz, 1000 nits (HBM)",
  screen_size: "6.6 inches",
  resolution: "1080 x 2340 pixels",
  refresh_rate: "120Hz",
  brightness: "1000 nits (HBM)",
  protection: "Corning Gorilla Glass Victus+",

  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  cam_ultrawide: "8 MP, f/2.2, 123˚",
  cam_telephoto: "5 MP Macro",
  cam_video: "4K@30fps, 1080p@30/60fps, gyro-EIS",
  
  cam_front_resolution: "13 MP, f/2.2",
  cam_front_video: "4K@30fps, 1080p@30fps",

  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",
  charging_wireless: "No",
  charger_included: false,

  water_resistance: "IP67 dust/water resistant",
  weight: "209 g",
  dimensions: "161.7 x 78 x 8.2 mm",
  build_material: "Glass front (Gorilla Glass Victus+), plastic frame, glass back",
  
  images: ["/placeholder.jpg"],
  
  android_version: "Android 14",
  ui_version: "One UI 6.1",
  update_policy: "4 major upgrades",
  
  wifi_version: "Wi-Fi 6, dual-band",
  bluetooth_version: "5.3",
  has_5g: true,
  has_nfc: true,
  has_audio_jack: false,
  sensor_fingerprint: "Under display (optical)",
  
  ...commonSeoFields("Galaxy A35 5G", 380),
  overview: "The Samsung Galaxy A35 5G brings flagship-tier design elements like a glass back and IP67 rating to a more affordable price point. Powered by the Exynos 1380, it delivers capable performance for everyday tasks.",
  highlights: ["Premium glass design", "IP67 rating", "Vibrant 120Hz display", "Reliable main camera"],
  pros: ["Great battery life", "Long software support", "Solid display quality", "OIS on main camera"],
  cons: ["No charger in the box", "Plastic frame", "Ultrawide camera is average", "Slow 25W charging"],
  verdict: "A superb value-for-money option for those who want Samsung's software experience and reliable build quality without paying premium prices."
};

const galaxyA25 = {
  name: "Galaxy A25 5G",
  slug: "samsung-galaxy-a25-5g",
  is_published: true,
  is_official: true,
  model_number: "SM-A256E",
  colors: ["Brave Black", "Personality Yellow", "Fantasy Blue", "Optimistic Blue"],
  made_in: "Vietnam",
  phone_variants: "6GB/128GB, 8GB/128GB, 8GB/256GB",
  release_date: "2023-12-11",
  
  price_usd: 300,
  price_bdt: 32000,
  price_display_text: "BDT 32,000",

  processor: "Exynos 1280 (5 nm)",
  cpu: "Octa-core",
  gpu: "Mali-G68",
  
  display_type: "Super AMOLED, 120Hz, 1000 nits (HBM)",
  screen_size: "6.5 inches",
  resolution: "1080 x 2340 pixels",
  refresh_rate: "120Hz",
  brightness: "1000 nits (HBM)",
  protection: "Glass front",

  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  cam_ultrawide: "8 MP, f/2.2, 120˚",
  cam_telephoto: "2 MP Macro",
  cam_video: "4K@30fps, 1080p@30fps, gyro-EIS",
  
  cam_front_resolution: "13 MP, f/2.2",
  cam_front_video: "1080p@30fps",

  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",
  charging_wireless: "No",
  charger_included: false,

  water_resistance: "No",
  weight: "197 g",
  dimensions: "161 x 76.5 x 8.3 mm",
  build_material: "Glass front, plastic frame, plastic back",
  
  images: ["/placeholder.jpg"],
  
  android_version: "Android 14",
  ui_version: "One UI 6.0",
  update_policy: "4 major upgrades",
  
  wifi_version: "Wi-Fi 5, dual-band",
  bluetooth_version: "5.3",
  has_5g: true,
  has_nfc: true,
  has_audio_jack: true,
  sensor_fingerprint: "Side-mounted",
  
  ...commonSeoFields("Galaxy A25 5G", 300),
  overview: "The Galaxy A25 5G upgrades Samsung's entry-mid range with a 120Hz Super AMOLED display and the Exynos 1280 chipset, offering a well-rounded package for media consumption and casual gaming.",
  highlights: ["120Hz Super AMOLED display", "Stereo speakers", "OIS on main camera", "3.5mm headphone jack"],
  pros: ["Excellent screen for the price", "Good battery life", "Long software support", "Has a headphone jack"],
  cons: ["Water-drop notch feels outdated", "No IP rating", "Plastic build", "Slow charging"],
  verdict: "A strong contender in the budget-mid range segment, especially for users who value display quality and software longevity."
};

const galaxyA15 = {
  name: "Galaxy A15 5G",
  slug: "samsung-galaxy-a15-5g",
  is_published: true,
  is_official: true,
  model_number: "SM-A156E",
  colors: ["Brave Black", "Optimistic Blue", "Magical Blue", "Personality Yellow"],
  made_in: "Vietnam",
  phone_variants: "4GB/128GB, 6GB/128GB, 8GB/128GB, 8GB/256GB",
  release_date: "2023-12-11",
  
  price_usd: 200,
  price_bdt: 24000,
  price_display_text: "BDT 24,000",

  processor: "Mediatek Dimensity 6100+ (6 nm)",
  cpu: "Octa-core",
  gpu: "Mali-G57 MC2",
  
  display_type: "Super AMOLED, 90Hz, 800 nits (HBM)",
  screen_size: "6.5 inches",
  resolution: "1080 x 2340 pixels",
  refresh_rate: "90Hz",
  brightness: "800 nits (HBM)",
  protection: "Glass front",

  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, AF",
  cam_ultrawide: "5 MP, f/2.2",
  cam_telephoto: "2 MP Macro",
  cam_video: "1080p@30fps",
  
  cam_front_resolution: "13 MP, f/2.0",
  cam_front_video: "1080p@30fps",

  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",
  charging_wireless: "No",
  charger_included: false,

  water_resistance: "No",
  weight: "200 g",
  dimensions: "160.1 x 76.8 x 8.4 mm",
  build_material: "Glass front, plastic frame, plastic back",
  
  images: ["/placeholder.jpg"],
  
  android_version: "Android 14",
  ui_version: "One UI 6.0",
  update_policy: "4 major upgrades",
  
  wifi_version: "Wi-Fi 5, dual-band",
  bluetooth_version: "5.3",
  has_5g: true,
  has_nfc: true,
  has_audio_jack: true,
  sensor_fingerprint: "Side-mounted",
  
  ...commonSeoFields("Galaxy A15 5G", 200),
  overview: "Samsung's Galaxy A15 5G is a budget-friendly 5G device that impressively includes a 90Hz Super AMOLED display and the reliable Dimensity 6100+ chipset, making it a great value proposition.",
  highlights: ["Super AMOLED screen", "5G connectivity on a budget", "5000mAh battery", "4 years of software updates"],
  pros: ["Vibrant AMOLED display", "Great battery life", "Long update policy for a budget phone", "Solid main camera performance"],
  cons: ["No OIS on camera", "Outdated notch design", "Thick bottom bezel", "Mono speaker"],
  verdict: "An excellent entry-level 5G smartphone that doesn't compromise on display quality and software longevity."
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const BrandSchema = new mongoose.Schema({}, { strict: false });
    const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
    
    const samsungBrand = await Brand.findOne({ name: /Samsung/i });
    let brandId = null;
    if (!samsungBrand) {
      console.log("⚠️ Samsung brand not found in DB! Proceeding without brand_id.");
    } else {
      brandId = samsungBrand._id;
    }

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    const phones = [galaxyA55, galaxyA35, galaxyA25, galaxyA15];

    for (const phone of phones) {
      if (brandId) {
        (phone as any).brand_id = brandId;
      }
      phone.updated_at = new Date() as any;
      
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("🎉 Batch 1 (Released A Series) phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
