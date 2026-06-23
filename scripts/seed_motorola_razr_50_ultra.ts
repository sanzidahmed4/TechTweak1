import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const motoRazr50Ultra = {
  name: "Motorola Razr 50 Ultra",
  slug: "motorola-razr-50-ultra",
  is_published: true,
  is_official: true,
  model_number: "XT2451-1, XT2451-2, XT2451-3",
  colors: ["Midnight Blue", "Spring Green", "Peach Fuzz", "Hot Pink"],
  made_in: "China / India",
  phone_variants: "8GB+256GB, 12GB+256GB, 12GB+512GB",
  release_date: "2024-06-25",
  
  price_usd: 999.99, // Official US Launch Price
  
  chipset_highlight: "Snapdragon 8s Gen 3 (4 nm)",
  camera_highlight: "50 MP Dual Camera",
  display_highlight: "6.9\" Foldable LTPO AMOLED, 165Hz",
  battery_highlight: "4000 mAh, 45W Fast Charging",
  benchmark_highlight: "AnTuTu: ~1,500,000",

  weight: "189 g",
  dimensions: "Unfolded: 171.4 x 74 x 7.1 mm | Folded: 88.1 x 74 x 15.3 mm",
  build_material: "Glass front (unfolded), glass back or silicone polymer back (vegan leather), aluminum frame (7000 series), stainless steel hinge",
  sim_type: "Nano-SIM and eSIM or Dual SIM (Nano-SIM, dual stand-by)",
  water_resistance: "IPX8 water resistant (up to 1.5m for 30 min)",

  display_type: "Foldable LTPO AMOLED, 1B colors, 165Hz, HDR10+, Dolby Vision, 3000 nits (peak)",
  screen_size: "6.9 inches (Main), 4.0 inches (Cover)",
  resolution: "1080 x 2640 pixels (Main), 1272 x 1080 pixels (Cover)",
  refresh_rate: "165Hz (Main), 165Hz (Cover)",
  brightness: "3000 nits (peak) (Main), 2400 nits (peak) (Cover)",
  hdr: "HDR10+, Dolby Vision",
  protection: "Corning Gorilla Glass Victus (Cover display)",
  pixel_density: "~413 ppi (Main), ~417 ppi (Cover)",

  processor: "Qualcomm Snapdragon 8s Gen 3",
  cpu: "Octa-core (1x3.0 GHz Cortex-X4 & 4x2.8 GHz Cortex-A720 & 3x2.0 GHz Cortex-A520)",
  gpu: "Adreno 735",
  fabrication: "4 nm",
  ram_variants: "8GB, 12GB",
  storage_variants: "256GB, 512GB",
  storage_type: "UFS 4.0",
  antutu_score: 1500000,
  geekbench_score: "~4,850 (v6)",
  cooling_system: "Vapor Chamber cooling",

  cam_count: "2 (Rear) + 1 (Front)",
  cam_main_sensor: "50 MP, f/1.7, 24mm (wide), 1/1.95\", 0.8µm, dual pixel PDAF, OIS",
  cam_ultrawide: "No dedicated Ultrawide sensor",
  cam_telephoto: "50 MP, f/2.0, 47mm (telephoto), 1/2.76\", 0.64µm, PDAF, 2x optical zoom",
  cam_ois: "Yes (Main)",
  cam_flash: "LED flash, panorama, HDR",
  cam_video: "4K@30/60fps, 1080p@30/60/120/240/960fps, HDR10+, gyro-EIS",

  cam_front_resolution: "32 MP, f/2.4, 8mm (wide), 0.7µm",
  cam_front_hdr: "HDR",
  cam_front_portrait: "Yes",
  cam_front_video: "4K@30/60fps, 1080p@30/60fps",

  battery_capacity: "4000 mAh, non-removable",
  charging_wired: "45W wired",
  charging_wireless: "15W wireless",
  charging_reverse: "5W reverse wired",
  usb_type: "USB Type-C 2.0, OTG",
  charger_included: true,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band or dual-band (region dependent)",
  bluetooth_version: "5.4, A2DP, LE, aptX HD, aptX Adaptive, aptX Lossless",
  gps_specs: "GPS (L1+L5), GLONASS (L1), BDS (B1I+B1c+B2a), GALILEO (E1+E5a), QZSS (L1+L5)",
  usb_version: "USB Type-C 2.0",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: false,

  sensor_fingerprint: "Side-mounted",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 14",
  ui_version: "Hello UI",
  update_policy: "3 OS Upgrades, 4 Years Security Updates",
  ai_features: ["Moto AI", "Google Gemini integrated in cover display", "Magic Canvas (Generative AI images)", "AI camera enhancements"],
  has_circle_to_search: false,
  has_ai_editing: true,
  has_live_translation: false,
  has_ai_assistant: true,

  meta_title: "Motorola Razr 50 Ultra - Full Specifications, Features & Price",
  meta_keywords: "motorola razr 50 ultra, moto razr+ 2024 specs, motorola foldable phone",
  meta_description: "Explore the full specifications of the Motorola Razr 50 Ultra (Razr+ 2024), featuring a massive 4.0-inch cover display, Snapdragon 8s Gen 3, and 50MP dual cameras.",
  
  overview: "The Motorola Razr 50 Ultra (sold as the Razr+ 2024 in North America) sets a new standard for flip foldables with its massive, edge-to-edge 4.0-inch LTPO AMOLED cover display that lets you do almost everything without opening the phone. Powered by the Snapdragon 8s Gen 3 processor, it offers flagship-level performance. The phone also ditches the traditional ultrawide camera in favor of a 50MP 2x optical telephoto lens, making it an excellent device for portraits. Add in IPX8 water resistance, robust vegan leather finishes, and direct Google Gemini integration, and it stands out as one of the most practical and stylish foldables available.",
  
  pros: [
    "Class-leading 4.0-inch functional cover display",
    "Gorgeous, durable vegan leather design",
    "IPX8 water resistance rating",
    "Excellent 50MP 2x telephoto camera for portraits",
    "Clean software experience with highly customizable cover screen"
  ],
  cons: [
    "No dedicated ultrawide camera",
    "USB Type-C port is only USB 2.0 speeds",
    "Battery life is adequate but not exceptional (4000 mAh)",
    "Thermal throttling under sustained heavy gaming workloads"
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

    (motoRazr50Ultra as any).brand_id = brand._id;
    await Phone.findOneAndUpdate({ slug: motoRazr50Ultra.slug }, { $set: motoRazr50Ultra }, { upsert: true, new: true });
    console.log(`✅ Successfully inserted: ${motoRazr50Ultra.name}`);

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
