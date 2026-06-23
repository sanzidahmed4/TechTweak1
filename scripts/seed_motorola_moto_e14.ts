import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const motoE14 = {
  name: "Motorola Moto E14",
  slug: "motorola-moto-e14",
  is_published: true,
  is_official: true,
  model_number: "XT2421-14",
  colors: ["Graphite Gray", "Pastel Green", "Pastel Purple"],
  made_in: "China",
  phone_variants: "2GB+64GB",
  release_date: "2024-06-05",
  
  price_usd: 80.00, // Approximate starting price converted from Euros
  
  chipset_highlight: "Unisoc T606 (12 nm)",
  camera_highlight: "13 MP Single Camera",
  display_highlight: "6.56\" HD+ IPS LCD, 90Hz",
  battery_highlight: "5000 mAh, 15W Charging",
  benchmark_highlight: "AnTuTu: ~245,000",

  weight: "178.8 g",
  dimensions: "163.5 x 74.5 x 8 mm",
  build_material: "Glass front (Gorilla Glass 3), plastic frame, plastic back",
  sim_type: "Nano-SIM or Dual SIM (Nano-SIM, dual stand-by)",
  water_resistance: "IP52 dust and splash resistant (water-repellent design)",

  display_type: "IPS LCD, 90Hz",
  screen_size: "6.56 inches",
  resolution: "720 x 1612 pixels (HD+)",
  refresh_rate: "90Hz",
  brightness: "Up to 500 nits",
  hdr: "No HDR",
  protection: "Corning Gorilla Glass 3",
  pixel_density: "~269 ppi",

  processor: "Unisoc T606",
  cpu: "Octa-core (2x1.6 GHz Cortex-A75 & 6x1.6 GHz Cortex-A55)",
  gpu: "Mali-G57 MP1",
  fabrication: "12 nm",
  ram_variants: "2GB (Expandable to 4GB via RAM Boost)",
  storage_variants: "64GB",
  storage_type: "UFS 2.2",
  antutu_score: 245000,
  geekbench_score: "~1,400 (v6)",
  cooling_system: "Basic cooling",

  cam_count: "1 (Rear) + 1 (Front)",
  cam_main_sensor: "13 MP, f/2.2, (wide), 1.12µm, PDAF",
  cam_ultrawide: "None",
  cam_telephoto: "None",
  cam_ois: "No OIS",
  cam_flash: "LED flash, HDR, panorama",
  cam_video: "1080p@30fps",

  cam_front_resolution: "5 MP, f/2.2, (wide)",
  cam_front_hdr: "No dedicated HDR noted",
  cam_front_portrait: "Yes",
  cam_front_video: "1080p@30fps",

  battery_capacity: "5000 mAh, non-removable",
  charging_wired: "15W wired (Often bundled with a 10W charger)",
  charging_wireless: "No wireless charging",
  charging_reverse: "No reverse charging",
  usb_type: "USB Type-C 2.0",
  charger_included: true,

  wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
  bluetooth_version: "5.0, A2DP, LE",
  gps_specs: "GPS, GLONASS, GALILEO",
  usb_version: "USB Type-C 2.0",
  has_5g: false,
  has_nfc: false,
  has_ir_blaster: false,
  has_audio_jack: true,

  sensor_fingerprint: "No Fingerprint Sensor",
  has_gyroscope: false,
  has_compass: false,
  has_accelerometer: true,
  has_face_unlock: true,

  android_version: "Android 14 (Go edition)",
  ui_version: "My UX (Go edition)",
  update_policy: "2 Years Security Updates",
  ai_features: ["Basic AI camera tuning"],
  has_circle_to_search: false,
  has_ai_editing: false,
  has_live_translation: false,
  has_ai_assistant: false,

  meta_title: "Motorola Moto E14 - Full Specifications & Price",
  meta_keywords: "motorola moto e14, moto e14 specs, moto e series, budget motorola phone, android go",
  meta_description: "Check out the detailed specifications of the Motorola Moto E14. A super affordable budget phone featuring a 90Hz display, 5000mAh battery, and Android 14 Go.",
  
  overview: "The Motorola Moto E14 is a highly affordable entry-level smartphone designed for users who need a reliable device for basic everyday tasks. Running on the streamlined Android 14 (Go edition), it ensures a smooth experience despite having 2GB of RAM. It features a surprisingly smooth 90Hz HD+ display protected by Gorilla Glass 3, and an IP52 water-repellent design that adds durability rare at this price point. The 5000mAh battery easily provides over a day of usage, making it an excellent backup phone or a primary device for light users on a strict budget.",
  
  pros: [
    "Extremely affordable price point",
    "Smooth 90Hz display with Gorilla Glass 3 protection",
    "Great battery life with a 5000 mAh capacity",
    "IP52 water-repellent design",
    "Clean and lightweight Android 14 (Go edition) experience"
  ],
  cons: [
    "Only 2GB of RAM makes heavy multitasking impossible",
    "Does not include a fingerprint scanner",
    "No 5G connectivity",
    "Basic camera performance, especially in low light"
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

    (motoE14 as any).brand_id = brand._id;
    await Phone.findOneAndUpdate({ slug: motoE14.slug }, { $set: motoE14 }, { upsert: true, new: true });
    console.log(`✅ Successfully inserted: ${motoE14.name}`);

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
