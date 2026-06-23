import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const s24Ultra = {
  name: "Samsung Galaxy S24 Ultra",
  slug: "samsung-galaxy-s24-ultra",
  is_published: true,
  is_official: true,
  model_number: "SM-S928B, SM-S928U",
  colors: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow", "Titanium Blue", "Titanium Green", "Titanium Orange"],
  made_in: "Vietnam / India / South Korea",
  phone_variants: "12GB/256GB, 12GB/512GB, 12GB/1TB",
  release_date: "January 24, 2024",
  
  price_usd: 1299,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Snapdragon 8 Gen 3 for Galaxy",
  camera_highlight: "200MP Quad Camera, 5x Periscope",
  display_highlight: "6.8\" Dynamic LTPO AMOLED, 2600 nits",
  battery_highlight: "5000 mAh, 45W Charging",
  benchmark_highlight: "AnTuTu: ~1,823,822",

  weight: "232 g",
  dimensions: "162.3 x 79 x 8.6 mm",
  build_material: "Gorilla Armor (Front), Titanium Frame",
  sim_type: "Nano-SIM and eSIM",
  water_resistance: "IP68 (1.5m for 30 min)",

  display_type: "Dynamic LTPO AMOLED 2X",
  screen_size: "6.8 inches",
  resolution: "1440 x 3120 pixels",
  refresh_rate: "1-120Hz (Adaptive)",
  brightness: "2600 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Armor",
  pixel_density: "~505 ppi",

  processor: "Snapdragon 8 Gen 3",
  cpu: "Octa-core Snapdragon 8 Gen 3",
  gpu: "Adreno 750",
  fabrication: "4 nm",
  ram_variants: "12GB",
  storage_variants: "256GB, 512GB, 1TB",
  storage_type: "UFS 4.0",
  antutu_score: 1823822,
  geekbench_score: "~7,076",
  cooling_system: "Vapor Chamber (1.9x larger)",

  cam_count: "Quad Setup",
  cam_main_sensor: "200 MP, f/1.7, OIS",
  cam_ultrawide: "12 MP, f/2.2, 120˚",
  cam_telephoto: "50 MP Periscope (5x) + 10 MP Tele (3x)",
  cam_ois: "Yes (Main, Tele, Periscope)",
  cam_flash: "LED flash, auto-HDR, panorama",
  cam_video: "8K@24/30fps, 4K@30/60/120fps",

  cam_front_resolution: "12 MP, f/2.2",
  cam_front_hdr: "Dual video call, Auto-HDR, HDR10+",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30/60fps",

  battery_capacity: "5000 mAh",
  charging_wired: "45W",
  charging_wireless: "15W (Qi/PMA)",
  charging_reverse: "4.5W Reverse Wireless",
  usb_type: "USB Type-C 3.2",
  charger_included: false,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band",
  bluetooth_version: "5.3, A2DP, LE",
  gps_specs: "GPS, GLONASS, BDS, GALILEO, QZSS",
  usb_version: "USB Type-C 3.2, DisplayPort 1.2, OTG",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display (Ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 14",
  ui_version: "One UI 6.1",
  update_policy: "7 years of OS & security updates",
  ai_features: ["Galaxy AI", "Circle to Search", "Generative AI Image Editing", "Realtime Live Translation", "Next-Gen AI Assistant"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S24 Ultra - Full Specifications & Price",
  meta_keywords: "s24 ultra specs, galaxy s24 ultra price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S24 Ultra.",
  
  updated_at: new Date()
};

const s24Plus = {
  name: "Samsung Galaxy S24+",
  slug: "samsung-galaxy-s24-plus",
  is_published: true,
  is_official: true,
  model_number: "SM-S926B, SM-S926U",
  colors: ["Onyx Black", "Marble Grey", "Cobalt Violet", "Amber Yellow", "Jade Green", "Sandstone Orange", "Sapphire Blue"],
  made_in: "Vietnam / India / South Korea",
  phone_variants: "12GB/256GB, 12GB/512GB",
  release_date: "January 24, 2024",
  
  price_usd: 999,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Snapdragon 8 Gen 3 / Exynos 2400",
  camera_highlight: "50MP Triple Camera, 3x Opt Zoom",
  display_highlight: "6.7\" Dynamic LTPO AMOLED, 2600 nits",
  battery_highlight: "4900 mAh, 45W Charging",
  benchmark_highlight: "AnTuTu: ~1,746,864",

  weight: "196 g",
  dimensions: "158.5 x 75.9 x 7.7 mm",
  build_material: "Gorilla Glass Victus 2, Armor Aluminum 2",
  sim_type: "Nano-SIM and eSIM",
  water_resistance: "IP68 (1.5m for 30 min)",

  display_type: "Dynamic LTPO AMOLED 2X",
  screen_size: "6.7 inches",
  resolution: "1440 x 3120 pixels",
  refresh_rate: "1-120Hz (Adaptive)",
  brightness: "2600 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus 2",
  pixel_density: "~513 ppi",

  processor: "Snapdragon 8 Gen 3 / Exynos 2400",
  cpu: "Octa-core / Deca-core (Region dep.)",
  gpu: "Adreno 750 / Xclipse 940",
  fabrication: "4 nm",
  ram_variants: "12GB",
  storage_variants: "256GB, 512GB",
  storage_type: "UFS 4.0",
  antutu_score: 1746864,
  geekbench_score: "~7,000",
  cooling_system: "Vapor Chamber (1.6x larger)",

  cam_count: "Triple Setup",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  cam_ultrawide: "12 MP, f/2.2, 120˚",
  cam_telephoto: "10 MP Tele (3x)",
  cam_ois: "Yes (Main & Tele)",
  cam_flash: "LED flash, auto-HDR, panorama",
  cam_video: "8K@24/30fps, 4K@30/60fps",

  cam_front_resolution: "12 MP, f/2.2",
  cam_front_hdr: "Dual video call, Auto-HDR, HDR10+",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30/60fps",

  battery_capacity: "4900 mAh",
  charging_wired: "45W",
  charging_wireless: "15W (Qi/PMA)",
  charging_reverse: "4.5W Reverse Wireless",
  usb_type: "USB Type-C 3.2",
  charger_included: false,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band",
  bluetooth_version: "5.3, A2DP, LE",
  gps_specs: "GPS, GLONASS, BDS, GALILEO, QZSS",
  usb_version: "USB Type-C 3.2, OTG",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display (Ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 14",
  ui_version: "One UI 6.1",
  update_policy: "7 years of OS & security updates",
  ai_features: ["Galaxy AI", "Circle to Search", "Generative AI Image Editing", "Realtime Live Translation", "Next-Gen AI Assistant"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S24+ - Full Specifications & Price",
  meta_keywords: "s24 plus specs, galaxy s24+ price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S24+.",
  
  updated_at: new Date()
};

const s24Base = {
  name: "Samsung Galaxy S24",
  slug: "samsung-galaxy-s24",
  is_published: true,
  is_official: true,
  model_number: "SM-S921B, SM-S921U",
  colors: ["Onyx Black", "Marble Grey", "Cobalt Violet", "Amber Yellow", "Jade Green", "Sandstone Orange", "Sapphire Blue"],
  made_in: "Vietnam / India / South Korea",
  phone_variants: "8GB/128GB, 8GB/256GB, 8GB/512GB, 12GB/256GB",
  release_date: "January 24, 2024",
  
  price_usd: 799,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Snapdragon 8 Gen 3 / Exynos 2400",
  camera_highlight: "50MP Triple Camera, 3x Opt Zoom",
  display_highlight: "6.2\" Dynamic LTPO AMOLED, 2600 nits",
  battery_highlight: "4000 mAh, 25W Charging",
  benchmark_highlight: "AnTuTu: ~1,639,695",

  weight: "167 g",
  dimensions: "147 x 70.6 x 7.6 mm",
  build_material: "Gorilla Glass Victus 2, Armor Aluminum 2",
  sim_type: "Nano-SIM and eSIM",
  water_resistance: "IP68 (1.5m for 30 min)",

  display_type: "Dynamic LTPO AMOLED 2X",
  screen_size: "6.2 inches",
  resolution: "1080 x 2340 pixels",
  refresh_rate: "1-120Hz (Adaptive)",
  brightness: "2600 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus 2",
  pixel_density: "~416 ppi",

  processor: "Snapdragon 8 Gen 3 / Exynos 2400",
  cpu: "Octa-core / Deca-core (Region dep.)",
  gpu: "Adreno 750 / Xclipse 940",
  fabrication: "4 nm",
  ram_variants: "8GB, 12GB",
  storage_variants: "128GB, 256GB, 512GB",
  storage_type: "UFS 3.1 (128GB), UFS 4.0",
  antutu_score: 1639695,
  geekbench_score: "~6,750",
  cooling_system: "Vapor Chamber (1.5x larger than S23)",

  cam_count: "Triple Setup",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  cam_ultrawide: "12 MP, f/2.2, 120˚",
  cam_telephoto: "10 MP Tele (3x)",
  cam_ois: "Yes (Main & Tele)",
  cam_flash: "LED flash, auto-HDR, panorama",
  cam_video: "8K@24/30fps, 4K@30/60fps",

  cam_front_resolution: "12 MP, f/2.2",
  cam_front_hdr: "Dual video call, Auto-HDR, HDR10+",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30/60fps",

  battery_capacity: "4000 mAh",
  charging_wired: "25W",
  charging_wireless: "15W (Qi/PMA)",
  charging_reverse: "4.5W Reverse Wireless",
  usb_type: "USB Type-C 3.2",
  charger_included: false,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band",
  bluetooth_version: "5.3, A2DP, LE",
  gps_specs: "GPS, GLONASS, BDS, GALILEO, QZSS",
  usb_version: "USB Type-C 3.2, OTG",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display (Ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 14",
  ui_version: "One UI 6.1",
  update_policy: "7 years of OS & security updates",
  ai_features: ["Galaxy AI", "Circle to Search", "Generative AI Image Editing", "Realtime Live Translation", "Next-Gen AI Assistant"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S24 - Full Specifications & Price",
  meta_keywords: "s24 specs, galaxy s24 price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S24.",
  
  updated_at: new Date()
};

const s24FE = {
  name: "Samsung Galaxy S24 FE",
  slug: "samsung-galaxy-s24-fe",
  is_published: true,
  is_official: true,
  model_number: "SM-S721B, SM-S721U",
  colors: ["Blue", "Graphite", "Gray", "Mint", "Yellow"],
  made_in: "Vietnam / India",
  phone_variants: "8GB/128GB, 8GB/256GB, 8GB/512GB",
  release_date: "October 03, 2024",
  
  price_usd: 649,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Exynos 2400e (4 nm)",
  camera_highlight: "50MP Triple Camera, 3x Opt Zoom",
  display_highlight: "6.7\" Dynamic AMOLED 2X, 1900 nits",
  battery_highlight: "4700 mAh, 25W Charging",
  benchmark_highlight: "AnTuTu: ~1,600,000",

  weight: "213 g",
  dimensions: "162 x 77.3 x 8 mm",
  build_material: "Gorilla Glass Victus+, Aluminum Frame",
  sim_type: "Nano-SIM and eSIM",
  water_resistance: "IP68 (1.5m for 30 min)",

  display_type: "Dynamic AMOLED 2X",
  screen_size: "6.7 inches",
  resolution: "1080 x 2340 pixels",
  refresh_rate: "120Hz",
  brightness: "1900 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus+",
  pixel_density: "~385 ppi",

  processor: "Exynos 2400e",
  cpu: "Deca-core Exynos 2400e",
  gpu: "Xclipse 940",
  fabrication: "4 nm",
  ram_variants: "8GB",
  storage_variants: "128GB, 256GB, 512GB",
  storage_type: "UFS 3.1 (128GB), UFS 4.0",
  antutu_score: 1600000,
  geekbench_score: "~6,500",
  cooling_system: "Vapor Chamber (1.1x larger than S23 FE)",

  cam_count: "Triple Setup",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  cam_ultrawide: "12 MP, f/2.2, 123˚",
  cam_telephoto: "8 MP Tele (3x)",
  cam_ois: "Yes (Main & Tele)",
  cam_flash: "LED flash, HDR, panorama",
  cam_video: "8K@30fps, 4K@30/60fps",

  cam_front_resolution: "10 MP, f/2.4",
  cam_front_hdr: "HDR",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30/60fps",

  battery_capacity: "4700 mAh",
  charging_wired: "25W",
  charging_wireless: "15W",
  charging_reverse: "Reverse wireless supported",
  usb_type: "USB Type-C 3.2",
  charger_included: false,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band",
  bluetooth_version: "5.3, A2DP, LE",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
  usb_version: "USB Type-C 3.2, OTG",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display (Optical)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 14",
  ui_version: "One UI 6.1",
  update_policy: "7 years of OS & security updates",
  ai_features: ["Galaxy AI"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S24 FE - Full Specifications & Price",
  meta_keywords: "s24 fe specs, galaxy s24 fe price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S24 FE.",
  
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
      (s24Ultra as any).brand_id = brandId;
      (s24Plus as any).brand_id = brandId;
      (s24Base as any).brand_id = brandId;
      (s24FE as any).brand_id = brandId;
    }

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    const phones = [s24Ultra, s24Plus, s24Base, s24FE];

    for (const phone of phones) {
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("\n🎉 All 4 Samsung Galaxy S24 Series phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
