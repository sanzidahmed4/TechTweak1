import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const motoThinkPhone = {
  name: "ThinkPhone by Motorola",
  slug: "motorola-thinkphone",
  is_published: true,
  is_official: true,
  model_number: "XT2309-2, XT2309-3",
  colors: ["Carbon Black"],
  made_in: "China",
  phone_variants: "8GB+128GB, 8GB+256GB, 12GB+256GB, 12GB+512GB",
  release_date: "2023-01-05",
  
  price_usd: 699.99, // General Retail Price, B2B may vary
  
  chipset_highlight: "Snapdragon 8+ Gen 1 (4 nm)",
  camera_highlight: "50 MP Dual Camera + Depth",
  display_highlight: "6.6\" P-OLED, 144Hz",
  battery_highlight: "5000 mAh, 68W Fast Charging",
  benchmark_highlight: "AnTuTu: ~1,050,000",

  weight: "188.5 g",
  dimensions: "158.8 x 74.4 x 8.3 mm",
  build_material: "Glass front (Gorilla Glass Victus), aramid fiber back, aluminum frame",
  sim_type: "Nano-SIM and eSIM or Dual SIM (Nano-SIM, dual stand-by)",
  water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 min), MIL-STD-810H compliant",

  display_type: "P-OLED, 1B colors, 144Hz, HDR10+",
  screen_size: "6.6 inches",
  resolution: "1080 x 2400 pixels (~399 ppi density)",
  refresh_rate: "144Hz",
  brightness: "1200 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass Victus",
  pixel_density: "~399 ppi",

  processor: "Qualcomm SM8475 Snapdragon 8+ Gen 1",
  cpu: "Octa-core (1x3.19 GHz Cortex-X2 & 3x2.75 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510)",
  gpu: "Adreno 730",
  fabrication: "4 nm",
  ram_variants: "8GB, 12GB",
  storage_variants: "128GB, 256GB, 512GB",
  storage_type: "UFS 3.1",
  antutu_score: 1050000,
  geekbench_score: "~4,100 (v5.1)",
  cooling_system: "Advanced vapor chamber cooling",

  cam_count: "3 (Rear) + 1 (Front)",
  cam_main_sensor: "50 MP, f/1.8, (wide), 1/1.5\", 1.0µm, multi-directional PDAF, OIS",
  cam_ultrawide: "13 MP, f/2.2, 120˚ (ultrawide), 1/3.0\", 1.12µm, AF",
  cam_telephoto: "No dedicated telephoto",
  cam_ois: "Yes (Main)",
  cam_flash: "LED flash, panorama, HDR",
  cam_video: "8K@30fps, 4K@30/60fps, 1080p@30/60/120/240/960fps, gyro-EIS, HDR10+",

  cam_front_resolution: "32 MP, f/2.4, (wide), 0.7µm / 16 MP in some regions",
  cam_front_hdr: "HDR",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30fps, 1080p@30/60fps",

  battery_capacity: "5000 mAh, non-removable",
  charging_wired: "68W wired",
  charging_wireless: "15W wireless",
  charging_reverse: "No reverse wireless specified officially",
  usb_type: "USB Type-C 3.1, OTG, DisplayPort 1.4",
  charger_included: true,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band, Wi-Fi Direct",
  bluetooth_version: "5.2, A2DP, LE",
  gps_specs: "GPS, GLONASS, GALILEO, BDS",
  usb_version: "USB Type-C 3.1",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Under display, optical",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 13 (Upgradable to Android 15)",
  ui_version: "My UX",
  update_policy: "3 OS Upgrades, 4 Years Security Updates",
  ai_features: ["ThinkShield for mobile", "Moto KeySafe", "Think 2 Think integration with Lenovo ThinkPads"],
  has_circle_to_search: false,
  has_ai_editing: false,
  has_live_translation: false,
  has_ai_assistant: false,

  meta_title: "ThinkPhone by Motorola - Full Specifications, Features & Price",
  meta_keywords: "motorola thinkphone, thinkphone specs, business smartphone, lenovo thinkphone",
  meta_description: "Explore the full specifications of the ThinkPhone by Motorola, the ultimate business smartphone featuring military-grade durability, ThinkShield security, and Snapdragon 8+ Gen 1.",
  
  overview: "The ThinkPhone by Motorola is a business-centric smartphone designed to seamlessly integrate with Lenovo's ThinkPad laptops. It brings top-tier enterprise security via ThinkShield for mobile and Moto KeySafe. Built like a tank, it features a lightweight but incredibly strong aramid fiber back panel, an aluminum frame, and Gorilla Glass Victus, earning it a MIL-STD-810H military durability certification alongside an IP68 rating. Powered by the Snapdragon 8+ Gen 1 processor, it delivers flagship-level performance, and its iconic 'Red Key' can be customized to instantly launch business apps or sync with your PC.",
  
  pros: [
    "Incredible durability with aramid fiber and MIL-STD-810H rating",
    "Seamless 'Think 2 Think' integration with Lenovo PCs",
    "Top-tier enterprise-grade security (ThinkShield)",
    "Excellent battery life (5000 mAh) with fast 68W charging",
    "Customizable Red Key for quick app access"
  ],
  cons: [
    "Camera performance is average for its price point",
    "No dedicated telephoto lens",
    "Display peak brightness could be higher for outdoor use",
    "Primarily targeted at B2B rather than regular consumers"
  ],

  updated_at: new Date()
};


async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const BrandSchema = new mongoose.Schema({}, { strict: false });
    const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
    
    let brand = await Brand.findOne({ slug: 'motorola' });
    if (!brand) {
        console.error("❌ Brand 'motorola' not found. Please ensure it was created.");
        process.exit(1);
    }

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    (motoThinkPhone as any).brand_id = brand._id;
    await Phone.findOneAndUpdate({ slug: motoThinkPhone.slug }, { $set: motoThinkPhone }, { upsert: true, new: true });
    console.log(`✅ Successfully inserted: ${motoThinkPhone.name}`);

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
