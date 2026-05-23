import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const s25Ultra = {
  name: "Samsung Galaxy S25 Ultra",
  slug: "samsung-galaxy-s25-ultra",
  is_published: true,
  is_official: true,
  model_number: "SM-S938B",
  colors: ["Titanium Silver", "Titanium Blue", "Titanium Black", "Titanium White Silver", "Titanium Gray", "Titanium Jade Green", "Titanium Jet Black", "Titanium Pink Gold"],
  made_in: "Vietnam",
  phone_variants: "12GB/256GB, 12GB/512GB, 12GB/1TB, 16GB/1TB",
  release_date: "2025-02-03",
  
  price_usd: 1299,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Snapdragon 8 Elite (3 nm)",
  camera_highlight: "200MP Quad Camera, 5x Periscope",
  display_highlight: "6.9\" Dynamic LTPO AMOLED, 2600 nits",
  battery_highlight: "5000 mAh, 45W Charging",
  benchmark_highlight: "AnTuTu: ~2,200,000+",

  weight: "218 g",
  dimensions: "162.8 x 77.6 x 8.2 mm",
  build_material: "Gorilla Armor 2 (Front), Victus 2 (Back), Titanium Frame (Grade 5)",
  sim_type: "Nano-SIM + eSIM (Dual Standby)",
  water_resistance: "IP68 (1.5m for 30 min)",

  display_type: "Dynamic LTPO AMOLED 2X",
  screen_size: "6.9 inches",
  resolution: "1440 x 3120 pixels",
  refresh_rate: "120Hz (Adaptive)",
  brightness: "2600 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Armor 2",
  pixel_density: "498 ppi",

  processor: "Snapdragon 8 Elite",
  cpu: "Octa-core Snapdragon 8 Elite",
  gpu: "Adreno 830",
  fabrication: "3 nm",
  ram_variants: "12GB, 16GB",
  storage_variants: "256GB, 512GB, 1TB",
  storage_type: "UFS 4.0",
  antutu_score: 2200000,
  geekbench_score: "10000+",
  cooling_system: "Advanced Vapor Chamber Cooling",

  cam_count: "Quad",
  cam_main_sensor: "200 MP, f/1.7, OIS",
  cam_ultrawide: "50 MP, f/1.9, 120˚",
  cam_telephoto: "50 MP Periscope (5x) + 10 MP Tele (3x)",
  cam_ois: "Yes (Main & Tele & Periscope)",
  cam_flash: "Laser AF, LED flash, auto-HDR, Best Face",
  cam_video: "8K@30fps, 4K@120fps",

  cam_front_resolution: "12 MP, f/2.2",
  cam_front_hdr: "HDR, HDR10+",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@60fps",

  battery_capacity: "5000 mAh",
  charging_wired: "45W",
  charging_wireless: "25W (Qi2 Ready)",
  charging_reverse: "4.5W Reverse Wireless",
  usb_type: "USB Type-C 3.2",
  charger_included: false,

  wifi_version: "Wi-Fi 7, tri-band",
  bluetooth_version: "5.4",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
  usb_version: "USB 3.2, DisplayPort 1.2",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display (Ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 15",
  ui_version: "One UI 7 / 8",
  update_policy: "7 major upgrades",
  ai_features: ["Galaxy AI", "Circle to Search", "Generative AI Image Editing", "Realtime Live Translation", "Next-Gen AI Assistant"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S25 Ultra - Full Specifications & Price",
  meta_keywords: "s25 ultra specs, galaxy s25 ultra price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S25 Ultra.",
  
  updated_at: new Date()
};

const s25Plus = {
  name: "Samsung Galaxy S25+",
  slug: "samsung-galaxy-s25-plus",
  is_published: true,
  is_official: true,
  model_number: "SM-S936B",
  colors: ["Icy Blue", "Mint", "Navy", "Silver Shadow", "Pink Gold", "Coral Red", "Blue Black"],
  made_in: "Vietnam",
  phone_variants: "12GB/256GB, 12GB/512GB",
  release_date: "2025-02-03",
  
  price_usd: 999,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Snapdragon 8 Elite (3 nm)",
  camera_highlight: "50MP Triple Camera, 3x Opt Zoom",
  display_highlight: "6.7\" Dynamic LTPO AMOLED, 2600 nits",
  battery_highlight: "4900 mAh, 45W Charging",
  benchmark_highlight: "AnTuTu: ~2,147,084",

  weight: "190 g",
  dimensions: "158.4 x 75.8 x 7.3 mm",
  build_material: "Gorilla Glass Victus 2 (Front/Back), Aluminum Frame",
  sim_type: "Nano-SIM + eSIM (Dual Standby)",
  water_resistance: "IP68 (1.5m for 30 min)",

  display_type: "Dynamic LTPO AMOLED 2X",
  screen_size: "6.7 inches",
  resolution: "1440 x 3120 pixels",
  refresh_rate: "120Hz (Adaptive)",
  brightness: "2600 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus 2",
  pixel_density: "513 ppi",

  processor: "Snapdragon 8 Elite",
  cpu: "Octa-core Snapdragon 8 Elite",
  gpu: "Adreno 830",
  fabrication: "3 nm",
  ram_variants: "12GB",
  storage_variants: "256GB, 512GB",
  storage_type: "UFS 4.0",
  antutu_score: 2147084,
  geekbench_score: "9391",
  cooling_system: "Vapor Chamber Cooling",

  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  cam_ultrawide: "12 MP, f/2.2, 120˚",
  cam_telephoto: "10 MP Tele (3x)",
  cam_ois: "Yes (Main & Tele)",
  cam_flash: "LED flash, auto-HDR, Best Face",
  cam_video: "8K@30fps, 4K@60fps",

  cam_front_resolution: "12 MP, f/2.2",
  cam_front_hdr: "HDR, HDR10+",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@60fps",

  battery_capacity: "4900 mAh",
  charging_wired: "45W",
  charging_wireless: "15W (Qi2 Ready)",
  charging_reverse: "4.5W Reverse Wireless",
  usb_type: "USB Type-C 3.2",
  charger_included: false,

  wifi_version: "Wi-Fi 7, tri-band",
  bluetooth_version: "5.4",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
  usb_version: "USB 3.2, DisplayPort 1.2",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display (Ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 15",
  ui_version: "One UI 8 (Upgradable)",
  update_policy: "7 major upgrades",
  ai_features: ["Galaxy AI", "Circle to Search", "Generative AI Image Editing", "Realtime Live Translation", "Next-Gen AI Assistant"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S25+ - Full Specifications & Price",
  meta_keywords: "s25 plus specs, galaxy s25+ price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S25+.",
  
  updated_at: new Date()
};

const s25Base = {
  name: "Samsung Galaxy S25",
  slug: "samsung-galaxy-s25",
  is_published: true,
  is_official: true,
  model_number: "SM-S931B",
  colors: ["Icy Blue", "Mint", "Navy", "Silver Shadow", "Pink Gold", "Coral Red", "Blue Black"],
  made_in: "Vietnam",
  phone_variants: "12GB/128GB, 12GB/256GB, 12GB/512GB",
  release_date: "2025-02-03",
  
  price_usd: 799,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Snapdragon 8 Elite (3 nm)",
  camera_highlight: "50MP Triple Camera, 3x Opt Zoom",
  display_highlight: "6.2\" Dynamic LTPO AMOLED, 2600 nits",
  battery_highlight: "4000 mAh, 25W Charging",
  benchmark_highlight: "AnTuTu: ~2,193,701",

  weight: "162 g",
  dimensions: "146.9 x 70.5 x 7.2 mm",
  build_material: "Gorilla Glass Victus 2 (Front/Back), Aluminum Frame",
  sim_type: "Nano-SIM + eSIM (Dual Standby)",
  water_resistance: "IP68 (1.5m for 30 min)",

  display_type: "Dynamic LTPO AMOLED 2X",
  screen_size: "6.2 inches",
  resolution: "1080 x 2340 pixels",
  refresh_rate: "120Hz (Adaptive)",
  brightness: "2600 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus 2",
  pixel_density: "416 ppi",

  processor: "Snapdragon 8 Elite",
  cpu: "Octa-core Snapdragon 8 Elite",
  gpu: "Adreno 830",
  fabrication: "3 nm",
  ram_variants: "12GB",
  storage_variants: "128GB, 256GB, 512GB",
  storage_type: "UFS 4.0",
  antutu_score: 2193701,
  geekbench_score: "10050",
  cooling_system: "Vapor Chamber Cooling",

  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  cam_ultrawide: "12 MP, f/2.2, 120˚",
  cam_telephoto: "10 MP Tele (3x)",
  cam_ois: "Yes (Main & Tele)",
  cam_flash: "LED flash, auto-HDR, Best Face",
  cam_video: "8K@30fps, 4K@60fps",

  cam_front_resolution: "12 MP, f/2.2",
  cam_front_hdr: "HDR, HDR10+",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@60fps",

  battery_capacity: "4000 mAh",
  charging_wired: "25W",
  charging_wireless: "15W (Qi2 Ready)",
  charging_reverse: "4.5W Reverse Wireless",
  usb_type: "USB Type-C 3.2",
  charger_included: false,

  wifi_version: "Wi-Fi 7, tri-band",
  bluetooth_version: "5.4",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
  usb_version: "USB 3.2, DisplayPort 1.2",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display (Ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 15",
  ui_version: "One UI 8",
  update_policy: "7 major upgrades",
  ai_features: ["Galaxy AI", "Circle to Search", "Generative AI Image Editing", "Realtime Live Translation", "Next-Gen AI Assistant"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S25 - Full Specifications & Price",
  meta_keywords: "s25 specs, galaxy s25 price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S25.",
  
  updated_at: new Date()
};

const s25Edge = {
  name: "Samsung Galaxy S25 Edge",
  slug: "samsung-galaxy-s25-edge",
  is_published: true,
  is_official: true,
  model_number: "SM-S937U",
  colors: ["Titanium Icyblue", "Titanium Silver", "Titanium Jetblack"],
  made_in: "Vietnam",
  phone_variants: "12GB/256GB, 12GB/512GB",
  release_date: "2025-05-30",
  
  price_usd: 899,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Snapdragon 8 Elite",
  camera_highlight: "200MP Dual Camera",
  display_highlight: "6.7\" LTPO AMOLED 2X, 120Hz",
  battery_highlight: "3900 mAh, 25W Charging",
  benchmark_highlight: "AnTuTu: ~2,147,084",

  weight: "163 g",
  dimensions: "158.2 x 75.6 x 5.8 mm",
  build_material: "Gorilla Ceramic 2 (Front), Victus 2 (Back), Titanium Frame",
  sim_type: "Nano-SIM + eSIM",
  water_resistance: "IP68 (1.5m for 30 min)",

  display_type: "LTPO AMOLED 2X",
  screen_size: "6.7 inches",
  resolution: "1440 x 3120 pixels",
  refresh_rate: "120Hz (Adaptive)",
  brightness: "1416 nits (measured peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Ceramic 2",
  pixel_density: "513 ppi",

  processor: "Snapdragon 8 Elite",
  cpu: "Octa-core Snapdragon 8 Elite",
  gpu: "Adreno 830",
  fabrication: "3 nm",
  ram_variants: "12GB",
  storage_variants: "256GB, 512GB",
  storage_type: "UFS 4.0",
  antutu_score: 2147084,
  geekbench_score: "9391",
  cooling_system: "Vapor Chamber Cooling",

  cam_count: "Dual",
  cam_main_sensor: "200 MP, f/1.7, OIS",
  cam_ultrawide: "12 MP, f/2.2",
  cam_telephoto: "",
  cam_ois: "Yes (Main)",
  cam_flash: "LED flash, HDR",
  cam_video: "8K@30fps, 4K@120fps",

  cam_front_resolution: "12 MP, f/2.2",
  cam_front_hdr: "HDR, HDR10+",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@60fps",

  battery_capacity: "3900 mAh",
  charging_wired: "25W",
  charging_wireless: "15W (Qi2 Ready)",
  charging_reverse: "Not specified",
  usb_type: "USB Type-C 3.2",
  charger_included: false,

  wifi_version: "Wi-Fi 7, tri-band",
  bluetooth_version: "5.4",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
  usb_version: "USB 3.2",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display (Ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 15",
  ui_version: "One UI 7",
  update_policy: "7 major upgrades",
  ai_features: ["Galaxy AI", "Circle to Search", "Generative AI Image Editing", "Realtime Live Translation", "Next-Gen AI Assistant"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S25 Edge - Full Specifications & Price",
  meta_keywords: "s25 edge specs, galaxy s25 edge price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S25 Edge.",
  
  updated_at: new Date()
};

const s25FE = {
  name: "Samsung Galaxy S25 FE",
  slug: "samsung-galaxy-s25-fe",
  is_published: true,
  is_official: true,
  model_number: "SM-S731B",
  colors: ["Icyblue", "Jetblack", "Navy", "White"],
  made_in: "Vietnam",
  phone_variants: "8GB/128GB, 8GB/256GB, 8GB/512GB",
  release_date: "2025-09-19",
  
  price_usd: 649,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Exynos 2400 (4 nm)",
  camera_highlight: "50MP Triple Camera, 3x Opt Zoom",
  display_highlight: "6.7\" Dynamic LTPO AMOLED, 120Hz",
  battery_highlight: "4900 mAh, 45W Charging",
  benchmark_highlight: "AnTuTu: ~1,521,140",

  weight: "190 g",
  dimensions: "161.3 x 76.6 x 7.4 mm",
  build_material: "Gorilla Glass Victus+ (Front/Back), Aluminum Frame",
  sim_type: "Nano-SIM + eSIM",
  water_resistance: "IP68 (1.5m for 30 min)",

  display_type: "Dynamic LTPO AMOLED 2X",
  screen_size: "6.7 inches",
  resolution: "1080 x 2340 pixels",
  refresh_rate: "120Hz (Adaptive)",
  brightness: "1900 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus+",
  pixel_density: "385 ppi",

  processor: "Exynos 2400",
  cpu: "10-core Exynos 2400",
  gpu: "Xclipse 940",
  fabrication: "4 nm",
  ram_variants: "8GB",
  storage_variants: "128GB, 256GB, 512GB",
  storage_type: "UFS 4.0",
  antutu_score: 1521140,
  geekbench_score: "6948",
  cooling_system: "Vapor Chamber Cooling",

  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  cam_ultrawide: "12 MP, f/2.2, 123˚",
  cam_telephoto: "8 MP Tele (3x)",
  cam_ois: "Yes (Main & Tele)",
  cam_flash: "LED flash, HDR, Best Face",
  cam_video: "8K@30fps, 4K@120fps",

  cam_front_resolution: "12 MP, f/2.2",
  cam_front_hdr: "HDR, HDR10+",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@60fps",

  battery_capacity: "4900 mAh",
  charging_wired: "45W",
  charging_wireless: "15W (Qi2 Compatible)",
  charging_reverse: "Supported",
  usb_type: "USB Type-C 3.2",
  charger_included: false,

  wifi_version: "Wi-Fi 6e, dual/tri-band",
  bluetooth_version: "5.4",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
  usb_version: "USB 3.2, OTG",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display (Optical)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 16",
  ui_version: "One UI 8",
  update_policy: "7 major upgrades",
  ai_features: ["Galaxy AI (including Gemini Live)", "Circle to Search", "Generative AI Image Editing", "Realtime Live Translation", "Next-Gen AI Assistant"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S25 FE - Full Specifications & Price",
  meta_keywords: "s25 fe specs, galaxy s25 fe price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S25 FE.",
  
  updated_at: new Date()
};


async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const BrandSchema = new mongoose.Schema({}, { strict: false });
    const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
    
    const samsungBrand = await Brand.findOne({ name: /Samsung/i });
    if (!samsungBrand) {
      console.log("⚠️ Samsung brand not found in DB! Proceeding without brand_id.");
    } else {
      const brandId = samsungBrand._id;
      s25Ultra.brand_id = brandId;
      s25Plus.brand_id = brandId;
      s25Base.brand_id = brandId;
      s25Edge.brand_id = brandId;
      s25FE.brand_id = brandId;
    }

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    const phones = [s25Ultra, s25Plus, s25Base, s25Edge, s25FE];

    for (const phone of phones) {
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("\n🎉 All 5 Samsung Galaxy S25 Series phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
