import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const motorolaBrand = {
  name: "Motorola",
  slug: "motorola",
  description: "Motorola Mobility LLC, marketed as Motorola, is an American consumer electronics and telecommunications company, and a subsidiary of Chinese multinational technology company Lenovo.",
  logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/Motorola_logo_black.svg"
};

const motoEdge50Pro = {
  name: "Motorola Edge 50 Pro",
  slug: "motorola-edge-50-pro",
  is_published: true,
  is_official: true,
  model_number: "XT2403-1, XT2403-2",
  colors: ["Black Beauty", "Luxe Lavender", "Moonlight Pearl", "Vanilla Cream"],
  made_in: "China / India",
  phone_variants: "8GB+128GB, 8GB+256GB, 12GB+256GB, 12GB+512GB",
  release_date: "2024-04-03",
  
  price_usd: 540.00, // Approximate starting price
  price_official: 0,
  
  chipset_highlight: "Snapdragon 7 Gen 3 (4 nm)",
  camera_highlight: "50 MP Triple Camera (Pantone Validated)",
  display_highlight: "6.7\" pOLED, 144Hz, 2000 nits",
  battery_highlight: "4500 mAh, 125W Fast Charging",
  benchmark_highlight: "AnTuTu: ~830,000",

  weight: "186 g",
  dimensions: "161.2 x 72.4 x 8.2 mm",
  build_material: "Glass front, silicone polymer (vegan leather/suede) back, aluminum frame",
  sim_type: "Nano-SIM and eSIM or Dual SIM (Nano-SIM, dual stand-by)",
  water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 min)",

  display_type: "pOLED, 1B colors, 144Hz, HDR10+, 2000 nits (peak)",
  screen_size: "6.7 inches",
  resolution: "1220 x 2712 pixels (~446 ppi density)",
  refresh_rate: "144Hz",
  brightness: "2000 nits (peak)",
  hdr: "HDR10+",
  protection: "Corning Gorilla Glass (Unspecified version)",
  pixel_density: "~446 ppi",

  processor: "Qualcomm Snapdragon 7 Gen 3",
  cpu: "Octa-core (1x2.63 GHz Cortex-A715 & 4x2.4 GHz Cortex-A715 & 3x1.8 GHz Cortex-A510)",
  gpu: "Adreno 720",
  fabrication: "4 nm",
  ram_variants: "8GB, 12GB",
  storage_variants: "128GB, 256GB, 512GB",
  storage_type: "UFS 2.2 / UFS 2.2C",
  antutu_score: 830000,
  geekbench_score: "~3,141 (v6)",
  cooling_system: "Advanced VC Cooling System",

  cam_count: "3 (Rear) + 1 (Front)",
  cam_main_sensor: "50 MP, f/1.4, 25mm (wide), 1/1.55\", 1.0µm, multi-directional PDAF, Laser AF, OIS",
  cam_ultrawide: "13 MP, f/2.2, 120˚, 16mm, 1.12µm, AF",
  cam_telephoto: "10 MP, f/2.0, 73mm, 1.0µm, PDAF, OIS, 3x optical zoom",
  cam_ois: "Yes (Main and Telephoto)",
  cam_flash: "LED flash, panorama, HDR",
  cam_video: "4K@30fps, 1080p@30/60/120/240fps, 10-bit HDR10+, gyro-EIS",

  cam_front_resolution: "50 MP, f/1.9, 21mm (wide), 0.64µm, AF",
  cam_front_hdr: "HDR",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30fps, 1080p@30/60fps",

  battery_capacity: "4500 mAh, non-removable",
  charging_wired: "125W wired, 100% in 18 min (advertised)",
  charging_wireless: "50W wireless",
  charging_reverse: "10W reverse wired",
  usb_type: "USB Type-C 3.1, OTG, DisplayPort 1.4",
  charger_included: true,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band, Wi-Fi Direct",
  bluetooth_version: "5.4, A2DP, LE",
  gps_specs: "GPS, GLONASS, GALILEO, BDS, NavIC",
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

  android_version: "Android 14 (Hello UI)",
  ui_version: "Hello UI",
  update_policy: "3 OS Upgrades, 4 Years Security Updates",
  ai_features: ["Moto AI", "Generative AI wallpapers (Style Sync)", "Adobe Scan integration", "Pantone Validated camera & display"],
  has_circle_to_search: false,
  has_ai_editing: true,
  has_live_translation: false,
  has_ai_assistant: true,

  meta_title: "Motorola Edge 50 Pro - Full Specifications, Features & Price",
  meta_keywords: "motorola edge 50 pro, moto edge 50 pro specs, motorola phone price",
  meta_description: "Check out the official specifications, key features, camera quality, battery life, and price of the Motorola Edge 50 Pro.",
  
  overview: "The Motorola Edge 50 Pro is a beautifully crafted premium mid-range smartphone. It stands out as the world's first smartphone with a Pantone Validated display and camera, ensuring true-to-life colors and authentic skin tones. Featuring a luxurious vegan leather finish, it feels great in the hand while offering robust IP68 protection. Under the hood, the Snapdragon 7 Gen 3 provides reliable performance, complemented by insanely fast 125W wired and 50W wireless charging for its 4500 mAh battery.",
  
  pros: [
    "Stunning Pantone Validated 144Hz pOLED display",
    "Incredibly fast 125W wired & 50W wireless charging",
    "Premium design with vegan leather and IP68 rating",
    "Capable 50MP triple camera system with 3x optical zoom",
    "Clean Android 14 experience with Hello UI"
  ],
  cons: [
    "Snapdragon 7 Gen 3 isn't a flagship-tier processor",
    "Average battery capacity (4500 mAh)",
    "UFS 2.2 storage is slower compared to competitors",
    "A bit much bloatware in some regions compared to older Moto phones"
  ],

  updated_at: new Date()
};


async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const BrandSchema = new mongoose.Schema({}, { strict: false });
    const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
    
    // 1. Ensure Brand exists
    let brand = await Brand.findOne({ slug: motorolaBrand.slug });
    if (!brand) {
      brand = await Brand.create(motorolaBrand);
      console.log(`✅ Created Brand: ${brand.name}`);
    } else {
      console.log(`ℹ️ Brand already exists: ${brand.name}`);
    }

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    // 2. Insert/Update Phone
    (motoEdge50Pro as any).brand_id = brand._id;
    await Phone.findOneAndUpdate({ slug: motoEdge50Pro.slug }, { $set: motoEdge50Pro }, { upsert: true, new: true });
    console.log(`✅ Successfully inserted: ${motoEdge50Pro.name}`);

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
