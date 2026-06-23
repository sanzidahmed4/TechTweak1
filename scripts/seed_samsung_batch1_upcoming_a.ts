import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFieldsUpcoming = (name: string) => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Launch Date`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} release date, samsung ${name.toLowerCase()} specs, ${name.toLowerCase()} rumors`,
  meta_description: `Latest news, rumors, expected specifications, and launch date of the upcoming Samsung ${name}. Check out what to expect from this device.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} specs`,
  secondary_keywords: [`${name.toLowerCase()} release date`, `samsung ${name.toLowerCase()} leaks`, `samsung ${name.toLowerCase()} price`],
  question_keywords: [
    `when is samsung ${name.toLowerCase()} releasing?`,
    `what are the expected specs of samsung ${name.toLowerCase()}?`,
    `will samsung ${name.toLowerCase()} support 5G?`
  ],
  faq_schema: [
    { question: `When will Samsung ${name} be released?`, answer: `The official release date of Samsung ${name} is not announced yet, but it is expected soon.` },
    { question: `What is the expected price of ${name}?`, answer: `Samsung has not announced the official pricing for the ${name} yet.` }
  ]
});

const galaxyA56 = {
  name: "Galaxy A56 5G",
  slug: "samsung-galaxy-a56-5g",
  is_published: true,
  is_official: false,
  upcoming: true,
  rumored: true,
  model_number: "SM-A566",
  colors: ["Awesome Black", "Awesome White", "Awesome Light Blue"],
  launch_year: "2026",
  launch_quarter: "Q1",
  expected_launch_date: "Expected Q1 2026",
  
  price_usd: null,
  price_bdt: null,
  price_display_text: "Not Announced Yet",

  processor: "Exynos 1580 (Rumored)",
  cpu: "Octa-core",
  gpu: "Xclipse 540",
  
  display_type: "Super AMOLED, 120Hz, HDR10+",
  screen_size: "6.6 inches",
  resolution: "1080 x 2340 pixels",
  refresh_rate: "120Hz",
  protection: "Corning Gorilla Glass Victus 2",

  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS (Expected)",
  cam_ultrawide: "12 MP, f/2.2",
  cam_telephoto: "5 MP Macro",
  cam_video: "4K@30/60fps, gyro-EIS",
  
  cam_front_resolution: "32 MP, f/2.2",

  battery_capacity: "5000 mAh",
  charging_wired: "45W wired (Rumored)",
  charging_wireless: "No",

  water_resistance: "IP67 dust/water resistant",
  
  images: ["/placeholder.jpg"], // Admin Upload Placeholder
  
  android_version: "Android 15 (Expected)",
  ui_version: "One UI 7",
  
  has_5g: true,
  has_nfc: true,
  has_audio_jack: false,
  sensor_fingerprint: "Under display (optical)",
  
  ...commonSeoFieldsUpcoming("Galaxy A56 5G"),
  overview: "The Samsung Galaxy A56 5G is an upcoming mid-range smartphone expected to feature the powerful new Exynos 1580 chipset, an upgraded Xclipse 540 GPU, and potentially 45W fast charging. It aims to build upon the massive success of its predecessor with improved AI capabilities and a refined design.",
  highlights: ["Expected Exynos 1580", "Upgraded 45W charging rumors", "One UI 7 and AI features", "Gorilla Glass Victus 2"],
  pros: ["Expected performance leap with new GPU", "Solid battery life and faster charging", "Premium build quality", "Long software support"],
  cons: ["Not officially released yet", "Pricing could be higher", "No headphone jack expected", "Charger likely won't be included"],
  verdict: "While still unannounced, the Galaxy A56 5G is shaping up to be one of the most anticipated mid-range phones of the year, bringing near-flagship performance features to the A-series."
};

const galaxyA36 = {
  name: "Galaxy A36 5G",
  slug: "samsung-galaxy-a36-5g",
  is_published: true,
  is_official: false,
  upcoming: true,
  rumored: true,
  model_number: "SM-A366",
  colors: ["Awesome Black", "Awesome Silver", "Awesome Blue"],
  launch_year: "2026",
  launch_quarter: "Q1",
  expected_launch_date: "Expected Q1 2026",
  
  price_usd: null,
  price_bdt: null,
  price_display_text: "Not Announced Yet",

  processor: "Snapdragon 6 Gen 3 (Expected)",
  cpu: "Octa-core",
  
  display_type: "Super AMOLED, 120Hz",
  screen_size: "6.6 inches",
  refresh_rate: "120Hz",

  cam_count: "Triple",
  cam_main_sensor: "50 MP, OIS (Expected)",
  cam_ultrawide: "8 MP",
  
  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",

  water_resistance: "IP67",
  images: ["/placeholder.jpg"],
  
  has_5g: true,
  has_nfc: true,
  has_audio_jack: false,
  
  ...commonSeoFieldsUpcoming("Galaxy A36 5G"),
  overview: "The Samsung Galaxy A36 5G is rumored to be the next staple in Samsung's lower-mid tier segment, bringing a responsive 120Hz AMOLED display and reliable cameras.",
  highlights: ["120Hz AMOLED display", "5000mAh battery", "IP67 rating"],
  pros: ["Expected to be great value for money", "Solid display", "Water resistant"],
  cons: ["Not officially released yet", "Relatively slow charging speed expected"],
  verdict: "Wait for official announcements, but the A36 5G looks like a solid upgrade for budget-conscious buyers."
};

const galaxyA26 = {
  name: "Galaxy A26 5G",
  slug: "samsung-galaxy-a26-5g",
  is_published: true,
  is_official: false,
  upcoming: true,
  rumored: true,
  model_number: "SM-A266",
  colors: ["Awesome Black", "Awesome Light Blue"],
  launch_year: "2026",
  launch_quarter: "Q1",
  expected_launch_date: "Expected Q1 2026",
  
  price_usd: null,
  price_bdt: null,
  price_display_text: "Not Announced Yet",

  processor: "Exynos 1380 (Rumored)",
  display_type: "Super AMOLED, 120Hz",
  screen_size: "6.5 inches",
  refresh_rate: "120Hz",

  cam_count: "Triple",
  cam_main_sensor: "50 MP, OIS (Expected)",
  
  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",

  images: ["/placeholder.jpg"],
  
  has_5g: true,
  has_nfc: true,
  
  ...commonSeoFieldsUpcoming("Galaxy A26 5G"),
  overview: "The Galaxy A26 5G is anticipated to democratize features like OIS and 120Hz AMOLED screens even further down Samsung's lineup.",
  highlights: ["Rumored Exynos 1380", "50MP OIS camera", "5000mAh battery"],
  pros: ["Great display specs for the tier", "OIS included", "5G ready"],
  cons: ["Not yet announced", "Plastic build expected"],
  verdict: "A promising budget device for the upcoming year."
};

const galaxyA16 = {
  name: "Galaxy A16 5G",
  slug: "samsung-galaxy-a16-5g",
  is_published: true,
  is_official: false,
  upcoming: true,
  rumored: true,
  model_number: "SM-A166",
  colors: ["Black", "Light Blue", "Light Green"],
  launch_year: "2026",
  launch_quarter: "Q1",
  expected_launch_date: "Expected Late 2025/Early 2026",
  
  price_usd: null,
  price_bdt: null,
  price_display_text: "Not Announced Yet",

  processor: "Dimensity 6300 (Expected)",
  display_type: "Super AMOLED, 90Hz",
  screen_size: "6.5 inches",
  refresh_rate: "90Hz",

  cam_count: "Triple",
  cam_main_sensor: "50 MP",
  
  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",

  images: ["/placeholder.jpg"],
  
  has_5g: true,
  has_nfc: true,
  has_audio_jack: true,
  
  ...commonSeoFieldsUpcoming("Galaxy A16 5G"),
  overview: "The Galaxy A16 5G is expected to be Samsung's entry-level 5G champion, offering an AMOLED display and a large battery at a highly accessible price point.",
  highlights: ["Entry-level 5G", "90Hz AMOLED display", "Large battery"],
  pros: ["Very affordable", "Great battery life", "Has 3.5mm jack"],
  cons: ["Not officially released yet", "No OIS"],
  verdict: "An ideal starter 5G phone if the rumors hold true."
};

const galaxyA06 = {
  name: "Galaxy A06",
  slug: "samsung-galaxy-a06",
  is_published: true,
  is_official: false,
  upcoming: true,
  rumored: true,
  model_number: "SM-A065",
  colors: ["Black", "Light Green"],
  launch_year: "2026",
  launch_quarter: "Q1",
  expected_launch_date: "Expected Late 2025",
  
  price_usd: null,
  price_bdt: null,
  price_display_text: "Not Announced Yet",

  processor: "Helio G85 (Expected)",
  display_type: "PLS LCD, 90Hz",
  screen_size: "6.7 inches",
  refresh_rate: "90Hz",

  cam_count: "Dual",
  cam_main_sensor: "50 MP",
  
  battery_capacity: "5000 mAh",
  charging_wired: "25W wired",

  images: ["/placeholder.jpg"],
  
  has_5g: false,
  has_audio_jack: true,
  
  ...commonSeoFieldsUpcoming("Galaxy A06"),
  overview: "The Galaxy A06 is rumored to be Samsung's most basic smartphone offering, focusing purely on essential communication and long battery life.",
  highlights: ["Massive 6.7-inch display", "5000mAh battery", "Dual camera setup"],
  pros: ["Large screen for media", "Excellent battery life", "Very low expected cost"],
  cons: ["Not yet announced", "Only 4G support", "LCD screen"],
  verdict: "Perfect as a secondary device or for basic users once released."
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

    const phones = [galaxyA56, galaxyA36, galaxyA26, galaxyA16, galaxyA06];

    for (const phone of phones) {
      if (brandId) {
        (phone as any).brand_id = brandId;
      }
      phone.updated_at = new Date() as any;
      
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("🎉 Batch 1 (Upcoming A Series) phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
