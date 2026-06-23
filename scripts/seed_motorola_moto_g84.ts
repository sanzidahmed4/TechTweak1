import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const motoG84 = {
  name: "Motorola Moto G84 5G",
  slug: "motorola-moto-g84-5g",
  is_published: true,
  is_official: true,
  model_number: "XT2347-2",
  colors: ["Marshmallow Blue", "Viva Magenta", "Midnight Blue"],
  made_in: "China / India",
  phone_variants: "8GB+256GB, 12GB+256GB",
  release_date: "2023-09-08",
  
  price_usd: 299.99, // Approximate launch price
  
  chipset_highlight: "Snapdragon 695 5G (6 nm)",
  camera_highlight: "50 MP Dual Camera with OIS",
  display_highlight: "6.5\" pOLED, 120Hz, 1300 nits",
  battery_highlight: "5000 mAh, 30W Fast Charging",
  benchmark_highlight: "AnTuTu: ~415,000",

  weight: "166.8 g",
  dimensions: "160 x 74.4 x 7.6 mm",
  build_material: "Glass front, silicone polymer (vegan leather) or PMMA (plastic) back, plastic frame",
  sim_type: "Nano-SIM and eSIM or Dual SIM (Nano-SIM, dual stand-by)",
  water_resistance: "IP54, dust and splash resistant (water-repellent design)",

  display_type: "pOLED, 1B colors, 120Hz, 1300 nits (peak)",
  screen_size: "6.5 inches",
  resolution: "1080 x 2400 pixels (~405 ppi density)",
  refresh_rate: "120Hz",
  brightness: "1300 nits (peak)",
  hdr: "No official HDR10+ certification",
  protection: "Panda Glass",
  pixel_density: "~405 ppi",

  processor: "Qualcomm SM6375 Snapdragon 695 5G",
  cpu: "Octa-core (2x2.2 GHz Kryo 660 Gold & 6x1.7 GHz Kryo 660 Silver)",
  gpu: "Adreno 619",
  fabrication: "6 nm",
  ram_variants: "8GB, 12GB",
  storage_variants: "256GB",
  storage_type: "UFS 2.2",
  antutu_score: 415000,
  geekbench_score: "~2,020 (v6)",
  cooling_system: "Basic graphite cooling",

  cam_count: "2 (Rear) + 1 (Front)",
  cam_main_sensor: "50 MP, f/1.9, (wide), 1/1.5\", 1.0µm, PDAF, OIS",
  cam_ultrawide: "8 MP, f/2.2, 120˚ (ultrawide/macro), 1/4.0\", 1.12µm, AF",
  cam_telephoto: "No dedicated telephoto",
  cam_ois: "Yes (Main)",
  cam_flash: "LED flash, HDR, panorama",
  cam_video: "1080p@30/60fps",

  cam_front_resolution: "16 MP, f/2.5, (wide), 1.0µm",
  cam_front_hdr: "No dedicated HDR noted",
  cam_front_portrait: "Yes",
  cam_front_video: "1080p@30fps",

  battery_capacity: "5000 mAh, non-removable",
  charging_wired: "30W wired",
  charging_wireless: "No wireless charging",
  charging_reverse: "No reverse charging",
  usb_type: "USB Type-C 2.0",
  charger_included: true,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
  bluetooth_version: "5.1, A2DP, LE",
  gps_specs: "GPS, GLONASS, GALILEO",
  usb_version: "USB Type-C 2.0",
  has_5g: true,
  has_nfc: true,
  has_ir_blaster: false,
  has_audio_jack: true,

  sensor_fingerprint: "Under display, optical",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 13 (Upgradable to Android 14)",
  ui_version: "My UX",
  update_policy: "1 OS Upgrade, 3 Years Security Updates",
  ai_features: ["Moto Spatial Sound", "Basic camera AI scene detection"],
  has_circle_to_search: false,
  has_ai_editing: false,
  has_live_translation: false,
  has_ai_assistant: false,

  meta_title: "Motorola Moto G84 5G - Full Specifications & Price",
  meta_keywords: "motorola moto g84 5g, moto g84 specs, moto g series, budget motorola 5g",
  meta_description: "Check out the detailed specifications of the Motorola Moto G84 5G. It features a 120Hz pOLED display, Snapdragon 695, 50MP OIS camera, and premium vegan leather design.",
  
  overview: "The Motorola Moto G84 5G is a stellar mid-range smartphone that punches above its weight in terms of design and display quality. Bringing premium aesthetics to a budget price point, it features a stunning 6.5-inch 120Hz pOLED display and is available in eye-catching vegan leather finishes like the Pantone Color of the Year, Viva Magenta. While it utilizes the slightly older Snapdragon 695 5G processor, it offers highly stable performance paired with an impressive 12GB of RAM and 256GB of storage out of the box. The 50MP main camera with OIS takes solid photos, making it a great overall package.",
  
  pros: [
    "Vibrant and bright 120Hz pOLED display",
    "Premium feeling vegan leather design options",
    "Excellent battery life (5000 mAh)",
    "Generous 12GB RAM and 256GB storage in base model",
    "Retains the 3.5mm headphone jack"
  ],
  cons: [
    "Snapdragon 695 chipset is aging and limits video to 1080p",
    "Only 1 major Android OS upgrade promised",
    "No 4K video recording capability",
    "Lots of pre-installed bloatware depending on the region"
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

    (motoG84 as any).brand_id = brand._id;
    await Phone.findOneAndUpdate({ slug: motoG84.slug }, { $set: motoG84 }, { upsert: true, new: true });
    console.log(`✅ Successfully inserted: ${motoG84.name}`);

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
