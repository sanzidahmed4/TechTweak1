import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const s26Ultra = {
  name: "Samsung Galaxy S26 Ultra",
  slug: "samsung-galaxy-s26-ultra",
  is_published: true,
  is_official: true,
  model_number: "SM-S938B",
  colors: ["Titanium Black", "Titanium Gray", "Titanium Violet", "Titanium Yellow"],
  made_in: "Vietnam",
  phone_variants: "12GB/256GB, 12GB/512GB, 12GB/1TB",
  release_date: "2026-01-15",
  
  price_usd: 1399,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Snapdragon 8 Gen 5",
  camera_highlight: "200MP Quad Camera",
  display_highlight: "6.8\" Dynamic AMOLED 2X 120Hz",
  battery_highlight: "5000 mAh, 45W Wired",
  benchmark_highlight: "AnTuTu ~3,900,000",

  weight: "232 g",
  dimensions: "163.6 x 78.1 x 8.6 mm",
  build_material: "Titanium Frame, Glass front/back",
  sim_type: "Nano-SIM and eSIM",
  water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 min)",

  display_type: "Dynamic AMOLED 2X",
  screen_size: "6.8 inches",
  resolution: "1440 x 3120 pixels",
  refresh_rate: "1-120Hz Adaptive",
  brightness: "3000 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Armor",
  pixel_density: "505 ppi",

  processor: "Snapdragon 8 Gen 5",
  cpu: "Octa-core (Snapdragon 8 Gen 5)",
  gpu: "Adreno 830",
  fabrication: "3 nm",
  ram_variants: "12GB, 16GB",
  storage_variants: "256GB, 512GB, 1TB",
  storage_type: "UFS 4.1",
  antutu_score: 3900000,
  geekbench_score: "3100 / 9800",
  cooling_system: "Vapor chamber cooling system",

  cam_count: "Quad",
  cam_main_sensor: "200 MP, f/1.7, 24mm (wide), OIS",
  cam_ultrawide: "50 MP, f/1.9, 13mm, 120˚",
  cam_telephoto: "50 MP, f/2.4 (3x optical), OIS + 50 MP, f/3.4 (5x optical), OIS",
  cam_ois: "Yes (Main & Telephoto)",
  cam_flash: "LED flash, auto-HDR, panorama",
  cam_video: "8K@30fps, 4K@30/60/120fps",

  cam_front_resolution: "12 MP, f/2.2, 26mm (wide), Dual Pixel PDAF",
  cam_front_hdr: "Auto-HDR, HDR10+",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30/60fps",

  battery_capacity: "5000 mAh",
  charging_wired: "45W wired",
  charging_wireless: "15W wireless",
  charging_reverse: "4.5W reverse wireless",
  usb_type: "USB Type-C 3.2",
  charger_included: false,

  wifi_version: "Wi-Fi 7",
  bluetooth_version: "5.4, A2DP, LE",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
  usb_version: "USB Type-C 3.2, OTG",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under-display (ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 16",
  ui_version: "One UI 8",
  update_policy: "7 Major OS Updates, 7 Years Security",
  ai_features: ["Galaxy AI v3", "Circle to Search", "Live Translate", "Photo Assist"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S26 Ultra - Full Specifications & Price",
  meta_keywords: "s26 ultra specs, galaxy s26 ultra price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S26 Ultra.",
  
  updated_at: new Date()
};

const s26Plus = {
  name: "Samsung Galaxy S26+",
  slug: "samsung-galaxy-s26-plus",
  is_published: true,
  is_official: true,
  model_number: "SM-S936B",
  colors: ["Onyx Black", "Marble Grey", "Cobalt Violet", "Amber Yellow"],
  made_in: "Vietnam",
  phone_variants: "8GB/256GB, 12GB/256GB",
  release_date: "2026-01-15",
  
  price_usd: 1049,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Snapdragon 8 Gen 5 / Exynos 2600",
  camera_highlight: "50MP Triple Camera",
  display_highlight: "6.7\" Dynamic AMOLED 2X 120Hz",
  battery_highlight: "4900 mAh, 45W Wired",
  benchmark_highlight: "AnTuTu ~2,800,000",

  weight: "196 g",
  dimensions: "158.5 x 75.9 x 7.7 mm",
  build_material: "Armor Aluminum Frame, Glass front/back",
  sim_type: "Nano-SIM and eSIM",
  water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 min)",

  display_type: "Dynamic AMOLED 2X",
  screen_size: "6.7 inches",
  resolution: "1440 x 3120 pixels",
  refresh_rate: "1-120Hz Adaptive",
  brightness: "2800 nits (peak)",
  hdr: "HDR10+",
  protection: "Gorilla Glass Victus 3",
  pixel_density: "513 ppi",

  processor: "Snapdragon 8 Gen 5 / Exynos 2600",
  cpu: "Octa-core / Deca-core",
  gpu: "Adreno 830 / Xclipse 950",
  fabrication: "3 nm",
  ram_variants: "8GB, 12GB",
  storage_variants: "256GB, 512GB",
  storage_type: "UFS 4.0",
  antutu_score: 2800000,
  geekbench_score: "2800 / 8900",
  cooling_system: "Vapor chamber cooling system",

  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, 24mm (wide), OIS",
  cam_ultrawide: "12 MP, f/2.2, 13mm, 120˚",
  cam_telephoto: "10 MP, f/2.4 (3x optical), OIS",
  cam_ois: "Yes (Main & Telephoto)",
  cam_flash: "LED flash, auto-HDR, panorama",
  cam_video: "8K@30fps, 4K@30/60/120fps",

  cam_front_resolution: "12 MP, f/2.2, 26mm (wide), Dual Pixel PDAF",
  cam_front_hdr: "Auto-HDR, HDR10+",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30/60fps",

  battery_capacity: "4900 mAh",
  charging_wired: "45W wired",
  charging_wireless: "15W wireless",
  charging_reverse: "4.5W reverse wireless",
  usb_type: "USB Type-C 3.2",
  charger_included: false,

  wifi_version: "Wi-Fi 7",
  bluetooth_version: "5.4, A2DP, LE",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
  usb_version: "USB Type-C 3.2, OTG",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under-display (ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 16",
  ui_version: "One UI 8",
  update_policy: "7 Major OS Updates, 7 Years Security",
  ai_features: ["Galaxy AI v3", "Circle to Search", "Live Translate", "Photo Assist"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S26+ - Full Specifications & Price",
  meta_keywords: "s26 plus specs, galaxy s26+ price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S26+.",
  
  updated_at: new Date()
};

const s26Base = {
  name: "Samsung Galaxy S26",
  slug: "samsung-galaxy-s26",
  is_published: true,
  is_official: true,
  model_number: "SM-S931B",
  colors: ["Onyx Black", "Marble Grey", "Cobalt Violet", "Amber Yellow"],
  made_in: "Vietnam",
  phone_variants: "8GB/256GB, 12GB/256GB",
  release_date: "2026-01-15",
  
  price_usd: 849,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Snapdragon 8 Gen 5 / Exynos 2600",
  camera_highlight: "50MP Triple Camera",
  display_highlight: "6.2\" Dynamic AMOLED 2X 120Hz",
  battery_highlight: "4000 mAh, 25W Wired",
  benchmark_highlight: "AnTuTu ~2,800,000",

  weight: "168 g",
  dimensions: "147 x 70.6 x 7.6 mm",
  build_material: "Armor Aluminum Frame, Glass front/back",
  sim_type: "Nano-SIM and eSIM",
  water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 min)",

  display_type: "Dynamic AMOLED 2X",
  screen_size: "6.2 inches",
  resolution: "1080 x 2340 pixels",
  refresh_rate: "1-120Hz Adaptive",
  brightness: "2800 nits (peak)",
  hdr: "HDR10+",
  protection: "Gorilla Glass Victus 3",
  pixel_density: "416 ppi",

  processor: "Snapdragon 8 Gen 5 / Exynos 2600",
  cpu: "Octa-core / Deca-core",
  gpu: "Adreno 830 / Xclipse 950",
  fabrication: "3 nm",
  ram_variants: "8GB, 12GB",
  storage_variants: "128GB, 256GB, 512GB",
  storage_type: "UFS 4.0",
  antutu_score: 2800000,
  geekbench_score: "2800 / 8900",
  cooling_system: "Vapor chamber cooling system",

  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, 24mm (wide), OIS",
  cam_ultrawide: "12 MP, f/2.2, 13mm, 120˚",
  cam_telephoto: "10 MP, f/2.4 (3x optical), OIS",
  cam_ois: "Yes (Main & Telephoto)",
  cam_flash: "LED flash, auto-HDR, panorama",
  cam_video: "8K@30fps, 4K@30/60/120fps",

  cam_front_resolution: "12 MP, f/2.2, 26mm (wide), Dual Pixel PDAF",
  cam_front_hdr: "Auto-HDR, HDR10+",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30/60fps",

  battery_capacity: "4000 mAh",
  charging_wired: "25W wired",
  charging_wireless: "15W wireless",
  charging_reverse: "4.5W reverse wireless",
  usb_type: "USB Type-C 3.2",
  charger_included: false,

  wifi_version: "Wi-Fi 7",
  bluetooth_version: "5.4, A2DP, LE",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
  usb_version: "USB Type-C 3.2, OTG",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under-display (ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 16",
  ui_version: "One UI 8",
  update_policy: "7 Major OS Updates, 7 Years Security",
  ai_features: ["Galaxy AI v3", "Circle to Search", "Live Translate", "Photo Assist"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S26 - Full Specifications & Price",
  meta_keywords: "s26 specs, galaxy s26 price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S26.",
  
  updated_at: new Date()
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Get Brand Schema
    const BrandSchema = new mongoose.Schema({}, { strict: false });
    const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
    
    // Get Samsung Brand ID
    const samsungBrand = await Brand.findOne({ name: /Samsung/i });
    if (!samsungBrand) {
      console.log("⚠️ Samsung brand not found in DB! Proceeding without brand_id.");
    } else {
      s26Ultra.brand_id = samsungBrand._id;
      s26Plus.brand_id = samsungBrand._id;
      s26Base.brand_id = samsungBrand._id;
    }

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    // Insert or Update S26 Ultra
    await Phone.findOneAndUpdate({ slug: s26Ultra.slug }, { $set: s26Ultra }, { upsert: true, new: true });
    console.log("✅ Inserted/Updated: Samsung Galaxy S26 Ultra");

    // Insert or Update S26+
    await Phone.findOneAndUpdate({ slug: s26Plus.slug }, { $set: s26Plus }, { upsert: true, new: true });
    console.log("✅ Inserted/Updated: Samsung Galaxy S26+");

    // Insert or Update S26 Base
    await Phone.findOneAndUpdate({ slug: s26Base.slug }, { $set: s26Base }, { upsert: true, new: true });
    console.log("✅ Inserted/Updated: Samsung Galaxy S26");

    console.log("\n🎉 All 3 Samsung Galaxy S26 Series phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
