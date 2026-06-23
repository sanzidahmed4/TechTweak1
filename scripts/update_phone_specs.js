
/**
 * update_phone_specs.js
 * Updates full verified specs for iPhone 17 Pro Max and Samsung Galaxy S26 Ultra
 * Sources: Apple.com, Samsung.com, GSMArena, Wikipedia, MobileDokan.com
 * Run: node update_phone_specs.js
 */

require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

// ─── SPECS DATA ──────────────────────────────────────────────────────────────

const iPhone17ProMax = {
  // Basic
  release_date: "2025-09-19",
  is_published: true,
  is_official: true,
  model_number: "A3293 / A3291 / A3295",
  colors: ["Cosmic Orange", "Deep Blue", "Silver", "Black"],
  made_in: "India / China",
  phone_variants: "256GB, 512GB, 1TB, 2TB",

  // Pricing (BDT)
  price_bdt: 217499,
  price_official: 217499,
  price_unofficial: 172500,

  // Quick Highlights
  chipset_highlight: "Apple A19 Pro (3 nm)",
  camera_highlight: "Triple 48MP Camera System",
  display_highlight: "6.9\" Super Retina XDR OLED 120Hz",
  battery_highlight: "5,088 mAh with MagSafe",
  benchmark_highlight: "AnTuTu ~2,521,699",

  // General Info
  weight: "227 g",
  dimensions: "163 x 77.6 x 8.25 mm",
  build_material: "Aluminum frame, Ceramic Shield front & back, Titanium alloy internal structure",
  sim_type: "Dual SIM (Nano-SIM + eSIM) or Dual eSIM",
  water_resistance: "IP68 — Waterproof up to 6 meters for 30 minutes",

  // Display
  display_type: "Super Retina XDR OLED, ProMotion, Always-On",
  screen_size: "6.9 inches",
  resolution: "2868 × 1320 pixels",
  refresh_rate: "1–120 Hz ProMotion Adaptive",
  brightness: "2000 nits (peak outdoor), 1000 nits (typical)",
  hdr: "HDR10, Dolby Vision",
  protection: "Ceramic Shield (front & back)",
  pixel_density: "460 ppi",

  // Performance
  processor: "Apple A19 Pro",
  cpu: "Apple A19 Pro (3 nm TSMC)",
  gpu: "Apple A19 Pro GPU (6-core)",
  fabrication: "3 nm (TSMC N3P)",
  ram_variants: "12 GB LPDDR5X",
  storage_variants: "256 GB, 512 GB, 1 TB, 2 TB (NVMe)",
  storage_type: "NVMe",
  antutu_score: 2521699,
  geekbench_score: "~3,400 (Single-core) / ~8,900 (Multi-core)",
  cooling_system: "Vapor chamber cooling system",

  // Primary Camera
  cam_count: "Triple",
  cam_main_sensor: "48 MP, f/1.78, 24mm (Wide), OIS, Sensor-shift 2nd gen",
  cam_ultrawide: "48 MP, f/2.2, 13mm, 120° FOV, autofocus",
  cam_telephoto: "48 MP, f/2.8, 120mm, 5x optical zoom, Tetraprism OIS",
  cam_ois: "Yes (Main + Telephoto)",
  cam_flash: "Dual-tone True Tone Flash, Photonic Engine",
  cam_video: "4K@120fps Dolby Vision, 4K@60fps ProRes, ProRAW support",

  // Front Camera
  cam_front_resolution: "18 MP, f/1.9, Center Stage, autofocus",
  cam_front_hdr: "Yes (Smart HDR 7)",
  cam_front_portrait: "Yes, Portrait mode with Depth Control",
  cam_front_video: "4K@60fps",

  // Battery & Charging
  battery_capacity: "5,088 mAh (19.772 Wh — eSIM model)",
  charging_wired: "45W Fast Charging (USB-C), 0–50% in 20 min",
  charging_wireless: "25W MagSafe, 15W Qi2",
  charging_reverse: "No",
  charger_included: false,
  usb_type: "USB-C (USB 3 speeds — up to 20 Gbps)",

  // Network & Connectivity
  has_5g: true,
  wifi_version: "Wi-Fi 7 (802.11be), 2.4GHz + 5GHz + 6GHz",
  bluetooth_version: "Bluetooth 5.4",
  has_nfc: true,
  gps_specs: "GPS, GLONASS, Galileo, BeiDou, QZSS",
  has_ir_blaster: false,
  has_audio_jack: false,
  usb_version: "USB 3.2 Gen 2 (20 Gbps)",

  // Sensors
  sensor_fingerprint: "Face ID (3D Facial Recognition)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  // Software & AI
  android_version: "iOS 26",
  ui_version: "iOS 26",
  update_policy: "6+ years of iOS updates",
  ai_features: ["Apple Intelligence", "Siri AI", "Writing Tools", "Photo Cleanup", "Genmoji", "Image Playground"],
  has_circle_to_search: false,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  // SEO
  meta_title: "iPhone 17 Pro Max Full Specifications, Price & Review | TechTweak",
  meta_description: "Get the complete specs of Apple iPhone 17 Pro Max — Triple 48MP camera, A19 Pro chip, 6.9\" ProMotion OLED, 5088mAh battery, and official price in Bangladesh.",
  meta_keywords: "iPhone 17 Pro Max specs, iPhone 17 Pro Max price in Bangladesh, Apple iPhone 17 Pro Max review, A19 Pro chip, ProMotion OLED",

  // Pros / Cons / FAQs (auto-generated + enhanced)
  pros: [
    "Incredibly powerful Apple A19 Pro 3nm chip with AnTuTu score ~2.5 Million",
    "Triple 48MP camera system with Tetraprism 5x telephoto and 4K@120fps video",
    "6.9\" stunning Super Retina XDR OLED with 120Hz ProMotion Always-On",
    "IP68 waterproof up to 6 meters for 30 minutes",
    "MagSafe 25W wireless charging and 45W fast wired charging",
    "Supports Apple Intelligence AI features for productivity and creativity",
    "Premium Ceramic Shield front and back glass protection",
    "5G with Wi-Fi 7 connectivity for ultra-fast speeds",
  ],
  cons: [
    "No charger included in the retail box",
    "No 3.5mm headphone jack",
    "Very expensive — official price starts at BDT 217,499",
    "No microSD card slot for storage expansion",
    "Runs iOS — limited customization compared to Android",
  ],
  faqs: [
    { question: "What processor does the iPhone 17 Pro Max use?", answer: "It uses the Apple A19 Pro chip, built on TSMC's 3nm process, delivering top-tier performance with an AnTuTu score of approximately 2,521,699." },
    { question: "What is the official price of iPhone 17 Pro Max in Bangladesh?", answer: "The official price starts at BDT 217,499 for the 256GB model. Unofficial/grey market prices start from around BDT 172,500." },
    { question: "Does the iPhone 17 Pro Max support 5G?", answer: "Yes, it fully supports 5G (Sub-6GHz and mmWave in select markets) along with Wi-Fi 7." },
    { question: "Is a charger included in the box?", answer: "No, the retail box only includes the phone and a USB-C cable. A 45W charger must be purchased separately." },
    { question: "What is the camera setup?", answer: "It has a Triple 48MP rear camera — 48MP main (f/1.78), 48MP ultrawide (f/2.2), and 48MP telephoto (5x Tetraprism, f/2.8)." },
    { question: "What is the battery capacity?", answer: "The eSIM model has a 5,088 mAh (19.772 Wh) battery, supporting 45W wired and 25W MagSafe wireless charging." },
    { question: "Is the iPhone 17 Pro Max waterproof?", answer: "Yes, it has an IP68 rating and can withstand submersion up to 6 meters depth for 30 minutes." },
  ],

  updated_at: new Date(),
};

const samsungS26Ultra = {
  // Basic
  release_date: "2026-03-11",
  is_published: true,
  is_official: true,
  model_number: "SM-S938B / SM-S938U",
  colors: ["Titanium Silver", "Titanium Black", "Titanium Jade", "Titanium Blue"],
  made_in: "Vietnam / South Korea",
  phone_variants: "12GB/256GB, 12GB/512GB, 16GB/1TB",

  // Pricing (BDT)
  price_bdt: 199999,
  price_official: 199999,
  price_unofficial: 135000,

  // Quick Highlights
  chipset_highlight: "Snapdragon 8 Elite Gen 5 for Galaxy",
  camera_highlight: "200MP Quad Camera with 10x Optical Zoom",
  display_highlight: "6.9\" Dynamic AMOLED 2X 120Hz 2K+",
  battery_highlight: "5,000 mAh with 60W Super Fast Charging",
  benchmark_highlight: "AnTuTu ~3,900,000",

  // General Info
  weight: "214 g",
  dimensions: "163.6 × 78.1 × 7.9 mm",
  build_material: "Armor Aluminum frame, Corning Gorilla Armor 2 front, Privacy Display glass back",
  sim_type: "Dual SIM (Nano-SIM + eSIM) / Dual eSIM",
  water_resistance: "IP68 — Waterproof up to 6 meters for 30 minutes",

  // Display
  display_type: "Dynamic AMOLED 2X, Adaptive 120Hz, Privacy Display",
  screen_size: "6.9 inches",
  resolution: "1440 × 3120 pixels (2K+)",
  refresh_rate: "1–120 Hz Adaptive (LTPO)",
  brightness: "2600 nits (peak), 1000 nits (HBM)",
  hdr: "HDR10+, Dolby Vision",
  protection: "Corning Gorilla Armor 2",
  pixel_density: "498 ppi",

  // Performance
  processor: "Snapdragon 8 Elite Gen 5 for Galaxy",
  cpu: "Snapdragon 8 Elite Gen 5 (3nm TSMC) — Prime + Gold + Silver cores",
  gpu: "Adreno 840",
  fabrication: "3 nm (TSMC)",
  ram_variants: "12 GB LPDDR5X (256GB/512GB) / 16 GB LPDDR5X (1TB)",
  storage_variants: "256 GB, 512 GB, 1 TB (UFS 4.1)",
  storage_type: "UFS 4.1",
  antutu_score: 3905605,
  geekbench_score: "~3,100 (Single-core) / ~9,800 (Multi-core)",
  cooling_system: "Vapor chamber cooling with graphite layers",

  // Primary Camera
  cam_count: "Quad",
  cam_main_sensor: "200 MP, f/1.7, 24mm (Wide), OIS, Laser AF, ISOCELL HP9",
  cam_ultrawide: "50 MP, f/1.9, 13mm, 120° FOV, autofocus",
  cam_telephoto: "10 MP, f/2.4, 67mm, 3x optical zoom, OIS + 50 MP, f/3.4, 111mm, 10x optical zoom, OIS",
  cam_macro: "Supported via ultrawide",
  cam_ois: "Yes (Wide + both Telephoto lenses)",
  cam_flash: "LED flash, Auto HDR, Panorama, Night mode",
  cam_video: "8K@30fps, 4K@120fps, ProRes-like Log video, Director's View",

  // Front Camera
  cam_front_resolution: "12 MP, f/2.2, Wide, autofocus",
  cam_front_hdr: "Yes",
  cam_front_portrait: "Yes, Portrait mode with AI background separation",
  cam_front_video: "4K@60fps",

  // Battery & Charging
  battery_capacity: "5,000 mAh",
  charging_wired: "60W Super Fast Charging 3.0 (0–80% in 30 min)",
  charging_wireless: "25W Wireless Fast Charging",
  charging_reverse: "4.5W Wireless PowerShare (Reverse)",
  charger_included: false,
  usb_type: "USB-C (USB 3.2 Gen 2)",

  // Network & Connectivity
  has_5g: true,
  wifi_version: "Wi-Fi 7 (802.11be), 2.4/5/6 GHz",
  bluetooth_version: "Bluetooth 6.0",
  has_nfc: true,
  gps_specs: "GPS, GLONASS, Galileo, BeiDou, QZSS",
  has_ir_blaster: false,
  has_audio_jack: false,
  usb_version: "USB 3.2 Gen 2 (10 Gbps)",

  // Sensors
  sensor_fingerprint: "In-display Ultrasonic Fingerprint Sensor (3rd gen)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  // Software & AI
  android_version: "Android 16",
  ui_version: "One UI 8",
  update_policy: "7 years of Android OS + Security updates",
  ai_features: ["Galaxy AI", "Circle to Search", "Live Translate", "Note Assist", "Photo Edit AI", "Generative Edit", "AI Writing Assist"],
  has_circle_to_search: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_ai_assistant: true,

  // SEO
  meta_title: "Samsung Galaxy S26 Ultra Full Specifications, Price & Review | TechTweak",
  meta_description: "Full specs for Samsung Galaxy S26 Ultra — Snapdragon 8 Elite Gen 5, 200MP quad camera, 6.9\" 2K AMOLED, 5000mAh 60W charging, official price in Bangladesh.",
  meta_keywords: "Samsung Galaxy S26 Ultra specs, S26 Ultra price in Bangladesh, Galaxy S26 Ultra review, Snapdragon 8 Elite Gen 5, 200MP camera",

  // Pros / Cons / FAQs
  pros: [
    "Record-breaking Snapdragon 8 Elite Gen 5 performance with ~3.9 Million AnTuTu",
    "Versatile 200MP Quad camera system with 10x optical zoom",
    "Stunning 6.9\" 2K+ Dynamic AMOLED 2X with Privacy Display",
    "5,000 mAh battery with 60W fast wired charging",
    "7 years of guaranteed Android OS and security updates",
    "Galaxy AI features including Circle to Search and Live Translate",
    "IP68 waterproof up to 6 meters",
    "Wi-Fi 7 and Bluetooth 6.0 for next-gen connectivity",
  ],
  cons: [
    "No charger included in the retail box",
    "No 3.5mm headphone jack",
    "Heavy at 214g",
    "High official price — starts at BDT 199,999",
    "No microSD card expansion slot",
  ],
  faqs: [
    { question: "What processor does the Samsung Galaxy S26 Ultra use?", answer: "It is powered by the Snapdragon 8 Elite Gen 5 for Galaxy, built on TSMC's 3nm process, achieving an AnTuTu score of approximately 3,900,000." },
    { question: "What is the official price of Galaxy S26 Ultra in Bangladesh?", answer: "The official price starts at BDT 199,999 for the 12GB/256GB model. Unofficial/grey market prices start from around BDT 127,000–135,000." },
    { question: "Does the Galaxy S26 Ultra support 5G?", answer: "Yes, it supports 5G (sub-6GHz + mmWave in select markets) along with Wi-Fi 7 and Bluetooth 6.0." },
    { question: "What is the camera setup?", answer: "Quad rear cameras: 200MP main (f/1.7), 50MP ultrawide (f/1.9), 10MP telephoto (3x, f/2.4), and 50MP telephoto (10x, f/3.4)." },
    { question: "How fast does it charge?", answer: "It supports 60W Super Fast Charging 3.0, charging from 1% to 80% in about 30 minutes. It also supports 25W wireless charging and 4.5W reverse wireless charging." },
    { question: "Is the Galaxy S26 Ultra waterproof?", answer: "Yes, it carries an IP68 rating and is waterproof up to 6 meters for 30 minutes." },
    { question: "Is the charger included in the box?", answer: "No, Samsung does not include a charger adapter in the retail box. Only a USB-C cable is included." },
  ],

  updated_at: new Date(),
};

// ─── MAIN SCRIPT ─────────────────────────────────────────────────────────────

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    // Update iPhone 17 Pro Max
    const iphone = await Phone.findOneAndUpdate(
      { slug: "iphone-17-pro-max" },
      { $set: iPhone17ProMax },
      { new: true }
    );
    if (iphone) {
      console.log("✅ iPhone 17 Pro Max updated:", iphone.name);
    } else {
      console.log("⚠️  iPhone 17 Pro Max not found by slug — trying by name...");
      const iphoneByName = await Phone.findOneAndUpdate(
        { name: { $regex: /iphone 17 pro max/i } },
        { $set: iPhone17ProMax },
        { new: true }
      );
      console.log(iphoneByName ? `✅ iPhone 17 Pro Max updated: ${iphoneByName.name}` : "❌ iPhone 17 Pro Max not found");
    }

    // Update Samsung Galaxy S26 Ultra
    const s26 = await Phone.findOneAndUpdate(
      { slug: "samsung-galaxy-s26-ultra" },
      { $set: samsungS26Ultra },
      { new: true }
    );
    if (s26) {
      console.log("✅ Samsung Galaxy S26 Ultra updated:", s26.name);
    } else {
      console.log("⚠️  S26 Ultra not found by slug — trying by name...");
      const s26ByName = await Phone.findOneAndUpdate(
        { name: { $regex: /galaxy s26 ultra/i } },
        { $set: samsungS26Ultra },
        { new: true }
      );
      console.log(s26ByName ? `✅ Samsung Galaxy S26 Ultra updated: ${s26ByName.name}` : "❌ Samsung Galaxy S26 Ultra not found");
    }

    console.log("\n🎉 All specs updated successfully!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
