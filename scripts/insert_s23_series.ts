import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const s23Ultra = {
  name: "Samsung Galaxy S23 Ultra",
  slug: "samsung-galaxy-s23-ultra",
  is_published: true,
  is_official: true,
  model_number: "SM-S918B, SM-S918U",
  colors: ["Phantom Black", "Green", "Cream", "Lavender", "Graphite", "Sky Blue", "Lime", "Red"],
  made_in: "Vietnam / India / South Korea",
  phone_variants: "8GB/256GB, 12GB/256GB, 12GB/512GB, 12GB/1TB",
  release_date: "February 17, 2023",
  
  price_usd: 1199,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Snapdragon 8 Gen 2 for Galaxy",
  camera_highlight: "200MP Quad Camera, 10x Opt Zoom",
  display_highlight: "6.8\" Dynamic AMOLED 2X, 1750 nits",
  battery_highlight: "5000 mAh, 45W Charging",
  benchmark_highlight: "AnTuTu: ~1,241,531",

  weight: "234 g",
  dimensions: "163.4 x 78.1 x 8.9 mm",
  build_material: "Gorilla Glass Victus 2 (Front/Back), Armor Aluminum",
  sim_type: "Nano-SIM and eSIM",
  water_resistance: "IP68 (1.5m for 30 min)",

  display_type: "Dynamic AMOLED 2X",
  screen_size: "6.8 inches",
  resolution: "1440 x 3088 pixels",
  refresh_rate: "1-120Hz",
  brightness: "1750 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus 2",
  pixel_density: "~500 ppi",

  processor: "Snapdragon 8 Gen 2 for Galaxy (4 nm)",
  cpu: "Octa-core Snapdragon 8 Gen 2",
  gpu: "Adreno 740",
  fabrication: "4 nm",
  ram_variants: "8GB, 12GB",
  storage_variants: "256GB, 512GB, 1TB",
  storage_type: "UFS 4.0",
  antutu_score: 1241531,
  geekbench_score: "~5,179",
  cooling_system: "Vapor Chamber Cooling (Larger)",

  cam_count: "Quad Setup",
  cam_main_sensor: "200 MP, f/1.7, OIS",
  cam_ultrawide: "12 MP, f/2.2, 120˚",
  cam_telephoto: "10 MP Periscope (10x) + 10 MP Tele (3x)",
  cam_ois: "Yes (Main, Tele, Periscope)",
  cam_flash: "LED flash, auto-HDR, panorama",
  cam_video: "8K@24/30fps, 4K@30/60fps",

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

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band",
  bluetooth_version: "5.3, A2DP, LE",
  gps_specs: "GPS, GLONASS, BDS, GALILEO",
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

  android_version: "Android 13 (Launch)",
  ui_version: "One UI 5.1 (Launch)",
  update_policy: "4 years major OS, 5 years security",
  ai_features: ["Added via One UI 6.1 update", "Circle to Search", "Generative AI Image Editing", "Realtime Live Translation", "Next-Gen AI Assistant"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S23 Ultra - Full Specifications & Price",
  meta_keywords: "s23 ultra specs, galaxy s23 ultra price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S23 Ultra.",
  
  images: [
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Ultra_Front_Back_q8q3s9.png",
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Ultra_Colors_w5y2m0.png",
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Ultra_S_Pen_k7v4b1.png"
  ],
  updated_at: new Date()
};

const s23Plus = {
  name: "Samsung Galaxy S23+",
  slug: "samsung-galaxy-s23-plus",
  is_published: true,
  is_official: true,
  model_number: "SM-S916B, SM-S916U",
  colors: ["Phantom Black", "Cream", "Green", "Lavender", "Graphite", "Lime"],
  made_in: "Vietnam / India / South Korea",
  phone_variants: "8GB/256GB, 8GB/512GB",
  release_date: "February 17, 2023",
  
  price_usd: 999,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Snapdragon 8 Gen 2 for Galaxy",
  camera_highlight: "50MP Triple Camera, 3x Opt Zoom",
  display_highlight: "6.6\" Dynamic AMOLED 2X, 1750 nits",
  battery_highlight: "4700 mAh, 45W Charging",
  benchmark_highlight: "AnTuTu: ~1,221,731",

  weight: "196 g",
  dimensions: "157.8 x 76.2 x 7.6 mm",
  build_material: "Gorilla Glass Victus 2 (Front/Back), Armor Aluminum",
  sim_type: "Nano-SIM and eSIM",
  water_resistance: "IP68 (1.5m for 30 min)",

  display_type: "Dynamic AMOLED 2X",
  screen_size: "6.6 inches",
  resolution: "1080 x 2340 pixels",
  refresh_rate: "48-120Hz",
  brightness: "1750 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus 2",
  pixel_density: "~393 ppi",

  processor: "Snapdragon 8 Gen 2 for Galaxy (4 nm)",
  cpu: "Octa-core Snapdragon 8 Gen 2",
  gpu: "Adreno 740",
  fabrication: "4 nm",
  ram_variants: "8GB",
  storage_variants: "256GB, 512GB",
  storage_type: "UFS 4.0",
  antutu_score: 1221731,
  geekbench_score: "~5,073",
  cooling_system: "Vapor Chamber Cooling",

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

  battery_capacity: "4700 mAh",
  charging_wired: "45W",
  charging_wireless: "15W (Qi/PMA)",
  charging_reverse: "4.5W Reverse Wireless",
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

  sensor_fingerprint: "Under display (Ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 13 (Launch)",
  ui_version: "One UI 5.1 (Launch)",
  update_policy: "4 years major OS, 5 years security",
  ai_features: ["Added via One UI 6.1 update", "Circle to Search", "Generative AI Image Editing", "Realtime Live Translation", "Next-Gen AI Assistant"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S23+ - Full Specifications & Price",
  meta_keywords: "s23 plus specs, galaxy s23+ price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S23+.",
  
  images: [
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Plus_Front_Back_l9m2x4.png",
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Plus_Colors_p8q1v5.png"
  ],
  updated_at: new Date()
};

const s23Base = {
  name: "Samsung Galaxy S23",
  slug: "samsung-galaxy-s23",
  is_published: true,
  is_official: true,
  model_number: "SM-S911B, SM-S911U",
  colors: ["Phantom Black", "Cream", "Green", "Lavender", "Graphite", "Lime"],
  made_in: "Vietnam / India / South Korea",
  phone_variants: "8GB/128GB, 8GB/256GB, 8GB/512GB",
  release_date: "February 17, 2023",
  
  price_usd: 799,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Snapdragon 8 Gen 2 for Galaxy",
  camera_highlight: "50MP Triple Camera, 3x Opt Zoom",
  display_highlight: "6.1\" Dynamic AMOLED 2X, 1750 nits",
  battery_highlight: "3900 mAh, 25W Charging",
  benchmark_highlight: "AnTuTu: ~1,187,713",

  weight: "168 g",
  dimensions: "146.3 x 70.9 x 7.6 mm",
  build_material: "Gorilla Glass Victus 2 (Front/Back), Armor Aluminum",
  sim_type: "Nano-SIM and eSIM",
  water_resistance: "IP68 (1.5m for 30 min)",

  display_type: "Dynamic AMOLED 2X",
  screen_size: "6.1 inches",
  resolution: "1080 x 2340 pixels",
  refresh_rate: "48-120Hz",
  brightness: "1750 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus 2",
  pixel_density: "~425 ppi",

  processor: "Snapdragon 8 Gen 2 for Galaxy (4 nm)",
  cpu: "Octa-core Snapdragon 8 Gen 2",
  gpu: "Adreno 740",
  fabrication: "4 nm",
  ram_variants: "8GB",
  storage_variants: "128GB, 256GB, 512GB",
  storage_type: "UFS 3.1 (128GB), UFS 4.0",
  antutu_score: 1187713,
  geekbench_score: "~4,982",
  cooling_system: "Vapor Chamber Cooling",

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

  battery_capacity: "3900 mAh",
  charging_wired: "25W",
  charging_wireless: "15W (Qi/PMA)",
  charging_reverse: "4.5W Reverse Wireless",
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

  sensor_fingerprint: "Under display (Ultrasonic)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 13 (Launch)",
  ui_version: "One UI 5.1 (Launch)",
  update_policy: "4 years major OS, 5 years security",
  ai_features: ["Added via One UI 6.1 update", "Circle to Search", "Generative AI Image Editing", "Realtime Live Translation", "Next-Gen AI Assistant"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S23 - Full Specifications & Price",
  meta_keywords: "s23 specs, galaxy s23 price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S23.",
  
  images: [
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Front_Back_k8x5n2.png",
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Colors_q1v9b4.png"
  ],
  updated_at: new Date()
};

const s23FE = {
  name: "Samsung Galaxy S23 FE",
  slug: "samsung-galaxy-s23-fe",
  is_published: true,
  is_official: true,
  model_number: "SM-S711B, SM-S711U",
  colors: ["Mint", "Cream", "Graphite", "Purple", "Indigo", "Tangerine"],
  made_in: "Vietnam / India",
  phone_variants: "8GB/128GB, 8GB/256GB",
  release_date: "October 26, 2023",
  
  price_usd: 599,
  price_bdt: null,
  price_official: null,
  price_unofficial: null,

  chipset_highlight: "Exynos 2200 / Snapdragon 8 Gen 1",
  camera_highlight: "50MP Triple Camera, 3x Opt Zoom",
  display_highlight: "6.4\" Dynamic AMOLED 2X, 1450 nits",
  battery_highlight: "4500 mAh, 25W Charging",
  benchmark_highlight: "AnTuTu: ~1,185,588",

  weight: "209 g",
  dimensions: "158 x 76.5 x 8.2 mm",
  build_material: "Gorilla Glass 5 (Front/Back), Aluminum Frame",
  sim_type: "Nano-SIM and eSIM",
  water_resistance: "IP68 (1.5m for 30 min)",

  display_type: "Dynamic AMOLED 2X",
  screen_size: "6.4 inches",
  resolution: "1080 x 2340 pixels",
  refresh_rate: "60-120Hz",
  brightness: "1450 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass 5",
  pixel_density: "~403 ppi",

  processor: "Exynos 2200 / Snapdragon 8 Gen 1",
  cpu: "Octa-core Exynos 2200 / SD 8 Gen 1",
  gpu: "Xclipse 920 / Adreno 730",
  fabrication: "4 nm",
  ram_variants: "8GB",
  storage_variants: "128GB, 256GB",
  storage_type: "UFS 3.1",
  antutu_score: 1185588,
  geekbench_score: "~3,900",
  cooling_system: "Vapor Chamber Cooling",

  cam_count: "Triple Setup",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  cam_ultrawide: "12 MP, f/2.2, 123˚",
  cam_telephoto: "8 MP Tele (3x)",
  cam_ois: "Yes (Main & Tele)",
  cam_flash: "LED flash, HDR, panorama",
  cam_video: "8K@24fps, 4K@30/60fps",

  cam_front_resolution: "10 MP, f/2.4",
  cam_front_hdr: "HDR",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30/60fps",

  battery_capacity: "4500 mAh",
  charging_wired: "25W",
  charging_wireless: "15W",
  charging_reverse: "Reverse wireless supported",
  usb_type: "USB Type-C 3.2",
  charger_included: false,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, dual/tri-band",
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

  android_version: "Android 13 (Launch)",
  ui_version: "One UI 5.1 (Launch)",
  update_policy: "4 years major OS, 5 years security",
  ai_features: ["Added via One UI 6.1 update", "Circle to Search", "Generative AI Image Editing", "Realtime Live Translation", "Next-Gen AI Assistant"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  meta_title: "Samsung Galaxy S23 FE - Full Specifications & Price",
  meta_keywords: "s23 fe specs, galaxy s23 fe price, samsung phone specs",
  meta_description: "Explore the full features, detailed specifications, and official USA price of Samsung Galaxy S23 FE.",
  
  images: [
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_FE_Front_Back_u4m6c8.png",
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_FE_Colors_x2n9p1.png"
  ],
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
      (s23Ultra as any).brand_id = brandId;
      (s23Plus as any).brand_id = brandId;
      (s23Base as any).brand_id = brandId;
      (s23FE as any).brand_id = brandId;
    }

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    const phones = [s23Ultra, s23Plus, s23Base, s23FE];

    for (const phone of phones) {
      // Use $set to overwrite existing fields, but wait!
      // If we use $set, the old nested fields like `display_specs` will STILL be there taking up space.
      // But more importantly, the new flat fields WILL be added, which is what the frontend needs!
      await Phone.findOneAndUpdate(
        { slug: phone.slug }, 
        { 
          $set: phone,
          // Unset the old nested objects
          $unset: {
            general_specs: 1,
            display_specs: 1,
            performance_specs: 1,
            camera_specs: 1,
            battery_specs: 1,
            connectivity_specs: 1,
            sensor_specs: 1,
            software_specs: 1
          }
        }, 
        { upsert: true, new: true }
      );
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("\n🎉 All 4 Samsung Galaxy S23 Series phones updated successfully with Flat properties!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
