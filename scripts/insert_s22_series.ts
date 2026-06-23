import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const s21FE = {
  name: "Samsung Galaxy S21 FE 5G",
  slug: "samsung-galaxy-s21-fe-5g",
  is_published: true,
  is_official: true,
  model_number: "SM-G990B, SM-G990B2, SM-G990U, SM-G990U1",
  colors: ["White", "Graphite", "Lavender", "Olive"],
  made_in: "Vietnam / India / South Korea",
  phone_variants: "6GB+128GB, 8GB+128GB, 8GB+256GB",
  release_date: "2022-01-07",
  
  price_usd: 699.99,
  
  chipset_highlight: "Snapdragon 888 5G / Exynos 2100",
  camera_highlight: "12 MP Triple Camera",
  display_highlight: "6.4\" Dynamic AMOLED 2X, 120Hz",
  battery_highlight: "4500 mAh, 25W Charging",
  benchmark_highlight: "AnTuTu: ~765,000",

  weight: "177 g",
  dimensions: "155.7 x 74.5 x 7.9 mm",
  build_material: "Glass front (Gorilla Glass Victus), plastic back, aluminum frame",
  sim_type: "Single SIM (Nano-SIM) or Dual SIM (Nano-SIM, dual stand-by)",
  water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 min)",

  display_type: "Dynamic AMOLED 2X",
  screen_size: "6.4 inches",
  resolution: "1080 x 2400 pixels (FHD+)",
  refresh_rate: "120Hz",
  brightness: "~1200 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus",
  pixel_density: "~411 ppi",

  processor: "Snapdragon 888 5G / Exynos 2100",
  cpu: "Octa-core (1x2.84 GHz Cortex-X1 & 3x2.42 GHz Cortex-A78 & 4x1.80 GHz Cortex-A55) - Snapdragon",
  gpu: "Adreno 660 / Mali-G78 MP14",
  fabrication: "5 nm",
  ram_variants: "6GB, 8GB (LPDDR5)",
  storage_variants: "128GB, 256GB",
  storage_type: "UFS 3.1",
  antutu_score: 765000,
  geekbench_score: "~3,100 (v5.1)",
  cooling_system: "Standard graphite cooling",

  cam_count: "3 (Rear) + 1 (Front)",
  cam_main_sensor: "12 MP, f/1.8, 26mm (wide), Dual Pixel PDAF, OIS",
  cam_ultrawide: "12 MP, f/2.2, 13mm, 123˚",
  cam_telephoto: "8 MP, f/2.4, 76mm (telephoto), PDAF, OIS, 3x optical zoom",
  cam_ois: "Yes (Main and Telephoto)",
  cam_flash: "LED flash, auto-HDR, panorama",
  cam_video: "4K@30/60fps, 1080p@30/60/240fps, 720p@960fps, HDR10+, gyro-EIS",

  cam_front_resolution: "32 MP, f/2.2, 26mm (wide)",
  cam_front_hdr: "HDR",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30/60fps, 1080p@30/60fps, gyro-EIS",

  battery_capacity: "Li-Ion 4500 mAh, non-removable",
  charging_wired: "25W wired, PD3.0 (50% in 30 min)",
  charging_wireless: "15W wireless",
  charging_reverse: "Reverse wireless charging",
  usb_type: "USB Type-C 3.2, OTG",
  charger_included: false,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
  bluetooth_version: "5.0, A2DP, LE",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
  usb_version: "USB Type-C 3.2",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display (Optical)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 12 (Upgradeable to Android 14+)",
  ui_version: "One UI 4.0 (Upgradeable to One UI 6.1+)",
  update_policy: "4 OS Upgrades, 5 Years Security Updates",
  ai_features: ["Basic AI (Added via One UI updates)", "Circle to Search (Added via update)"],
  has_circle_to_search: true,
  has_ai_editing: false,
  has_live_translation: false,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S21 FE 5G - Full Specifications & Price",
  meta_keywords: "s21 fe specs, galaxy s21 fe 5g price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S21 FE 5G.",
  
  updated_at: new Date()
};

const s22Base = {
  name: "Samsung Galaxy S22 5G",
  slug: "samsung-galaxy-s22",
  is_published: true,
  is_official: true,
  model_number: "SM-S901B, SM-S901U, SM-S901U1, SM-S901W, SM-S901E",
  colors: ["Phantom Black", "White", "Pink Gold", "Green", "Graphite", "Sky Blue", "Violet", "Cream"],
  made_in: "Vietnam / India / South Korea",
  phone_variants: "8GB+128GB, 8GB+256GB",
  release_date: "2022-02-25",
  
  price_usd: 799.99,

  chipset_highlight: "Snapdragon 8 Gen 1 / Exynos 2200",
  camera_highlight: "50 MP Triple Camera",
  display_highlight: "6.1\" Dynamic AMOLED 2X, 120Hz, 1300 nits",
  battery_highlight: "3700 mAh, 25W Charging",
  benchmark_highlight: "AnTuTu: ~889,000",

  weight: "167 g / 168 g",
  dimensions: "146 x 70.6 x 7.6 mm",
  build_material: "Glass front (Gorilla Glass Victus+), glass back (Gorilla Glass Victus+), aluminum frame",
  sim_type: "Nano-SIM and eSIM or Dual SIM (2 Nano-SIMs and eSIM, dual stand-by)",
  water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 min)",

  display_type: "Dynamic AMOLED 2X",
  screen_size: "6.1 inches",
  resolution: "1080 x 2340 pixels (FHD+)",
  refresh_rate: "120Hz (Variable 48-120Hz)",
  brightness: "1300 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus+",
  pixel_density: "~425 ppi",

  processor: "Snapdragon 8 Gen 1 / Exynos 2200",
  cpu: "Octa-core (1x3.00 GHz Cortex-X2 & 3x2.50 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510) - Snapdragon",
  gpu: "Adreno 730 / Xclipse 920",
  fabrication: "4 nm",
  ram_variants: "8GB (LPDDR5)",
  storage_variants: "128GB, 256GB",
  storage_type: "UFS 3.1",
  antutu_score: 889045,
  geekbench_score: "~3,351 (v5.1)",
  cooling_system: "Basic vapor chamber + graphite pads",

  cam_count: "3 (Rear) + 1 (Front)",
  cam_main_sensor: "50 MP, f/1.8, 23mm (wide), Dual Pixel PDAF, OIS",
  cam_ultrawide: "12 MP, f/2.2, 13mm, 120˚",
  cam_telephoto: "10 MP, f/2.4, 70mm (telephoto), PDAF, OIS, 3x optical zoom",
  cam_ois: "Yes (Main and Telephoto)",
  cam_flash: "LED flash, auto-HDR, panorama",
  cam_video: "8K@24fps, 4K@30/60fps, 1080p@30/60/240fps, 720p@960fps, HDR10+, stereo sound, gyro-EIS",

  cam_front_resolution: "10 MP, f/2.2, 26mm (wide), Dual Pixel PDAF",
  cam_front_hdr: "Auto-HDR",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30/60fps, 1080p@30/60fps",

  battery_capacity: "Li-Ion 3700 mAh, non-removable",
  charging_wired: "25W wired, PD3.0",
  charging_wireless: "15W wireless (Qi/PMA)",
  charging_reverse: "4.5W reverse wireless",
  usb_type: "USB Type-C 3.2, OTG",
  charger_included: false,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
  bluetooth_version: "5.2, A2DP, LE",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
  usb_version: "USB Type-C 3.2",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display (Ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 12 (Upgradeable to Android 14+)",
  ui_version: "One UI 4.1 (Upgradeable to One UI 6.1+)",
  update_policy: "4 OS Upgrades, 5 Years Security Updates",
  ai_features: ["Galaxy AI (Supported via One UI 6.1)", "Circle to Search (Added via update)", "Generative AI Image Editing (Via One UI 6.1 Update)", "Realtime Live Translation (Via One UI 6.1 Update)", "Next-Gen AI Assistant (Browsing Assist, Chat Assist via Update)"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S22 5G - Full Specifications & Price",
  meta_keywords: "s22 specs, galaxy s22 price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S22 5G.",
  
  updated_at: new Date()
};

const s22Plus = {
  name: "Samsung Galaxy S22+ 5G",
  slug: "samsung-galaxy-s22-plus",
  is_published: true,
  is_official: true,
  model_number: "SM-S906B, SM-S906U, SM-S906U1, SM-S906W, SM-S906E",
  colors: ["Phantom Black", "White", "Pink Gold", "Green", "Graphite", "Sky Blue", "Violet", "Cream"],
  made_in: "Vietnam / India / South Korea",
  phone_variants: "8GB+128GB, 8GB+256GB",
  release_date: "2022-02-25",
  
  price_usd: 999.99,

  chipset_highlight: "Snapdragon 8 Gen 1 / Exynos 2200",
  camera_highlight: "50 MP Triple Camera",
  display_highlight: "6.6\" Dynamic AMOLED 2X, 120Hz, 1750 nits",
  battery_highlight: "4500 mAh, 45W Charging",
  benchmark_highlight: "AnTuTu: ~897,000",

  weight: "195 g / 196 g",
  dimensions: "157.4 x 75.8 x 7.6 mm",
  build_material: "Glass front (Gorilla Glass Victus+), glass back (Gorilla Glass Victus+), aluminum frame",
  sim_type: "Nano-SIM and eSIM or Dual SIM (2 Nano-SIMs and eSIM, dual stand-by)",
  water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 min)",

  display_type: "Dynamic AMOLED 2X",
  screen_size: "6.6 inches",
  resolution: "1080 x 2340 pixels (FHD+)",
  refresh_rate: "120Hz (Variable 48-120Hz)",
  brightness: "1750 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus+",
  pixel_density: "~393 ppi",

  processor: "Snapdragon 8 Gen 1 / Exynos 2200",
  cpu: "Octa-core (1x3.00 GHz Cortex-X2 & 3x2.50 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510) - Snapdragon",
  gpu: "Adreno 730 / Xclipse 920",
  fabrication: "4 nm",
  ram_variants: "8GB (LPDDR5)",
  storage_variants: "128GB, 256GB",
  storage_type: "UFS 3.1",
  antutu_score: 897956,
  geekbench_score: "~3,528 (v5.1)",
  cooling_system: "Upgraded vapor chamber cooling",

  cam_count: "3 (Rear) + 1 (Front)",
  cam_main_sensor: "50 MP, f/1.8, 23mm (wide), Dual Pixel PDAF, OIS",
  cam_ultrawide: "12 MP, f/2.2, 13mm, 120˚",
  cam_telephoto: "10 MP, f/2.4, 70mm (telephoto), PDAF, OIS, 3x optical zoom",
  cam_ois: "Yes (Main and Telephoto)",
  cam_flash: "LED flash, auto-HDR, panorama",
  cam_video: "8K@24fps, 4K@30/60fps, 1080p@30/60/240fps, 720p@960fps, HDR10+, stereo sound, gyro-EIS",

  cam_front_resolution: "10 MP, f/2.2, 26mm (wide), Dual Pixel PDAF",
  cam_front_hdr: "Auto-HDR",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30/60fps, 1080p@30/60fps",

  battery_capacity: "Li-Ion 4500 mAh, non-removable",
  charging_wired: "45W wired, PD3.0",
  charging_wireless: "15W wireless (Qi/PMA)",
  charging_reverse: "4.5W reverse wireless",
  usb_type: "USB Type-C 3.2, OTG",
  charger_included: false,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band",
  bluetooth_version: "5.2, A2DP, LE",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
  usb_version: "USB Type-C 3.2",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display (Ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 12 (Upgradeable to Android 14+)",
  ui_version: "One UI 4.1 (Upgradeable to One UI 6.1+)",
  update_policy: "4 OS Upgrades, 5 Years Security Updates",
  ai_features: ["Galaxy AI (Supported via One UI 6.1)", "Circle to Search (Added via update)", "Generative AI Image Editing (Via One UI 6.1 Update)", "Realtime Live Translation (Via One UI 6.1 Update)", "Next-Gen AI Assistant (Browsing Assist, Chat Assist via Update)"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S22+ 5G - Full Specifications & Price",
  meta_keywords: "s22 plus specs, galaxy s22+ 5g price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S22+ 5G.",
  
  updated_at: new Date()
};

const s22Ultra = {
  name: "Samsung Galaxy S22 Ultra 5G",
  slug: "samsung-galaxy-s22-ultra",
  is_published: true,
  is_official: true,
  model_number: "SM-S908B, SM-S908U, SM-S908U1, SM-S908W, SM-S908E",
  colors: ["Phantom Black", "White", "Burgundy", "Green", "Graphite", "Red", "Sky Blue"],
  made_in: "Vietnam / India / South Korea",
  phone_variants: "8GB+128GB, 12GB+256GB, 12GB+512GB, 12GB+1TB",
  release_date: "2022-02-25",
  
  price_usd: 1199.99,

  chipset_highlight: "Snapdragon 8 Gen 1 / Exynos 2200",
  camera_highlight: "108 MP Quad Camera with 10x Optical",
  display_highlight: "6.8\" Dynamic AMOLED 2X, 120Hz, 1750 nits",
  battery_highlight: "5000 mAh, 45W Charging",
  benchmark_highlight: "AnTuTu: ~968,000",

  weight: "228 g / 229 g",
  dimensions: "163.3 x 77.9 x 8.9 mm",
  build_material: "Glass front (Gorilla Glass Victus+), glass back (Gorilla Glass Victus+), aluminum frame",
  sim_type: "Nano-SIM and eSIM or Dual SIM (2 Nano-SIMs and eSIM, dual stand-by)",
  water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 min)",

  display_type: "Dynamic AMOLED 2X",
  screen_size: "6.8 inches (Curved Edge)",
  resolution: "1440 x 3088 pixels (QHD+)",
  refresh_rate: "120Hz (Variable 1-120Hz LTPO)",
  brightness: "1750 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus+",
  pixel_density: "~500 ppi",

  processor: "Snapdragon 8 Gen 1 / Exynos 2200",
  cpu: "Octa-core (1x3.00 GHz Cortex-X2 & 3x2.50 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510) - Snapdragon",
  gpu: "Adreno 730 / Xclipse 920",
  fabrication: "4 nm",
  ram_variants: "8GB, 12GB (LPDDR5)",
  storage_variants: "128GB, 256GB, 512GB, 1TB",
  storage_type: "UFS 3.1",
  antutu_score: 968359,
  geekbench_score: "~3,657 (v5.1)",
  cooling_system: "Large vapor chamber + Gel TIM thermal paste",

  cam_count: "4 (Rear) + 1 (Front)",
  cam_main_sensor: "108 MP, f/1.8, 23mm (wide), PDAF, Laser AF, OIS",
  cam_ultrawide: "12 MP, f/2.2, 13mm, 120˚",
  cam_telephoto: "10 MP (Periscope, 10x optical) + 10 MP (Telephoto, 3x optical)",
  cam_ois: "Yes (Main, Telephoto, and Periscope)",
  cam_flash: "LED flash, auto-HDR, panorama",
  cam_video: "8K@24fps, 4K@30/60fps, 1080p@30/60/240fps, 720p@960fps, HDR10+, stereo sound, gyro-EIS",

  cam_front_resolution: "40 MP, f/2.2, 26mm (wide), PDAF",
  cam_front_hdr: "Auto-HDR",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30/60fps, 1080p@30/60fps",

  battery_capacity: "Li-Ion 5000 mAh, non-removable",
  charging_wired: "45W wired, PD3.0",
  charging_wireless: "15W wireless (Qi/PMA)",
  charging_reverse: "4.5W reverse wireless",
  usb_type: "USB Type-C 3.2, OTG",
  charger_included: false,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band",
  bluetooth_version: "5.2, A2DP, LE",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
  usb_version: "USB Type-C 3.2",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display (Ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 12 (Upgradeable to Android 14+)",
  ui_version: "One UI 4.1 (Upgradeable to One UI 6.1+)",
  update_policy: "4 OS Upgrades, 5 Years Security Updates",
  ai_features: ["Galaxy AI (Supported via One UI 6.1)", "Circle to Search (Added via update)", "Generative AI Image Editing (Via One UI 6.1 Update)", "Realtime Live Translation (Via One UI 6.1 Update)", "Next-Gen AI Assistant (Browsing Assist, Chat Assist, Note Assist via Update)"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S22 Ultra 5G - Full Specifications & Price",
  meta_keywords: "s22 ultra specs, galaxy s22 ultra price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S22 Ultra 5G.",
  
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
      (s21FE as any).brand_id = brandId;
      (s22Base as any).brand_id = brandId;
      (s22Plus as any).brand_id = brandId;
      (s22Ultra as any).brand_id = brandId;
    }

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    const phones = [s21FE, s22Base, s22Plus, s22Ultra];

    for (const phone of phones) {
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("\n🎉 All 4 Samsung Galaxy S22 Series phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
