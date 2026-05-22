/**
 * scripts/fix_iphone_17_pro.js
 * Full verified correction of iPhone 17 Pro specs
 * Sources: Apple.com, GSMArena, Wikipedia, Forbes, PhoneArena
 */

require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

const iphone17ProData = {
  // ─── General ───────────────────────────────────────────────────────────────
  release_date: "2025-09-19",
  model_number: "A3256 / A3522 / A3523 / A3524",
  colors: ["Cosmic Orange", "Deep Blue", "Silver"],
  made_in: "India / China",
  phone_variants: "256GB, 512GB, 1TB",

  // ─── Pricing ───────────────────────────────────────────────────────────────
  price_bdt: 165000,
  price_official: 165000,
  price_unofficial: 135000,

  // ─── Quick Highlights ──────────────────────────────────────────────────────
  chipset_highlight: "Apple A19 Pro (3 nm)",
  camera_highlight: "Triple 48MP Pro Fusion Camera System",
  display_highlight: "6.3\" Super Retina XDR OLED 120Hz ProMotion",
  battery_highlight: "4,252 mAh (eSIM model) with 40W fast charging",
  benchmark_highlight: "AnTuTu ~2,300,000 | Geekbench ~3,700 single-core",

  // ─── Build ─────────────────────────────────────────────────────────────────
  weight: "206 g (7.27 oz)",
  dimensions: "150.0 × 71.9 × 8.75 mm",
  build_material: "Aluminum unibody frame, Ceramic Shield 2 front & back, vapor chamber integrated",
  sim_type: "Dual SIM (Nano-SIM + eSIM) / Dual eSIM",
  water_resistance: "IP68 — Waterproof up to 6 meters for 30 minutes",

  // ─── Display ───────────────────────────────────────────────────────────────
  display_type: "Super Retina XDR OLED, ProMotion, Always-On",
  screen_size: "6.3 inches",
  resolution: "2622 × 1206 pixels",
  refresh_rate: "1–120 Hz ProMotion Adaptive (LTPO)",
  brightness: "1000 nits (typical), 1600 nits (HDR), 3000 nits (peak outdoor)",
  hdr: "HDR10, Dolby Vision",
  protection: "Ceramic Shield 2 (front & back)",
  pixel_density: "460 ppi",

  // ─── Performance ───────────────────────────────────────────────────────────
  processor: "Apple A19 Pro",
  cpu: "Apple A19 Pro (3 nm TSMC) — 6-core",
  gpu: "Apple A19 Pro GPU (6-core)",
  fabrication: "3 nm (TSMC)",
  ram_variants: "12 GB LPDDR5X",
  storage_variants: "256 GB, 512 GB, 1 TB (NVMe)",
  storage_type: "NVMe",
  antutu_score: 2300000,
  geekbench_score: "~3,700 (Single-core) / ~9,200 (Multi-core)",
  cooling_system: "Laser-welded vapor chamber for improved thermal management",

  // ─── Primary Camera ────────────────────────────────────────────────────────
  cam_count: "Triple",
  cam_main_sensor: "48 MP, f/1.78, 24mm (Fusion Main), OIS, PDAF",
  cam_ultrawide: "48 MP, f/2.2, 13mm, 120° FOV, autofocus",
  cam_telephoto: "48 MP, f/2.8, 100mm, 4x optical zoom (Tetraprism), OIS",
  cam_macro: "Yes (macro photography via ultrawide autofocus)",
  cam_ois: "Yes (Main + Telephoto)",
  cam_flash: "Adaptive True Tone Flash",
  cam_video: "4K@120fps Dolby Vision, 4K@60fps ProRes, ProRes RAW, Log encoding",

  // ─── Front Camera ──────────────────────────────────────────────────────────
  cam_front_resolution: "24 MP TrueDepth, f/1.9, autofocus, Center Stage",
  cam_front_hdr: "Smart HDR 7",
  cam_front_portrait: "Yes (Portrait mode with depth control, Night portraits, Photographic Styles)",
  cam_front_video: "4K@60fps Dolby Vision",

  // ─── Battery & Charging ────────────────────────────────────────────────────
  battery_capacity: "4,252 mAh (eSIM model) / 3,988 mAh (Nano-SIM model)",
  battery: "4,252 mAh — up to 28 hours video playback",
  charging_wired: "40W USB-PD 3.2 fast charging, 0–70% in 30 mins",
  charging_wireless: "25W MagSafe, 15W Qi2 wireless",
  charging_reverse: "No",
  charger_included: false,
  usb_type: "USB-C (USB 3.2 Gen 2 — up to 10 Gbps)",
  usb_version: "USB 3.2 Gen 2 (10 Gbps)",

  // ─── Connectivity ──────────────────────────────────────────────────────────
  has_5g: true,
  wifi_version: "Wi-Fi 7 (802.11be), 2.4GHz + 5GHz + 6GHz (Apple N1 chip)",
  bluetooth_version: "Bluetooth 6.0",
  has_nfc: true,
  gps_specs: "Dual-frequency GPS, GLONASS, Galileo, BeiDou, QZSS",
  has_ir_blaster: false,
  has_audio_jack: false,

  // ─── Sensors ───────────────────────────────────────────────────────────────
  sensor_fingerprint: "Face ID (3D Facial Recognition)",
  has_gyroscope: true,
  has_compass: true,
  has_accelerometer: true,
  has_face_unlock: true,

  // ─── Software ──────────────────────────────────────────────────────────────
  android_version: "iOS 26",
  ui_version: "iOS 26 (upgradable)",
  update_policy: "6+ years of iOS updates",
  has_ai_assistant: true,
  has_ai_editing: true,
  has_live_translation: true,
  has_circle_to_search: false,
  ai_features: [
    "Apple Intelligence (full support)",
    "Visual Intelligence via Camera",
    "Writing Tools",
    "Generative Clean Up in Photos",
    "Genmoji & Image Playground",
    "Priority Notifications",
    "Siri with on-screen awareness"
  ],

  // ─── SEO ───────────────────────────────────────────────────────────────────
  meta_title: "iPhone 17 Pro Full Specifications, Price & Review | TechTweak",
  meta_description: "Get full specifications of Apple iPhone 17 Pro — Triple 48MP Pro Fusion camera, A19 Pro chip, 6.3\" ProMotion OLED, 4252mAh battery, and official price in Bangladesh.",
  meta_keywords: "iPhone 17 Pro specs, iPhone 17 Pro price in Bangladesh, Apple iPhone 17 Pro review, A19 Pro chip, iPhone 17 Pro camera, iPhone 17 Pro ProMotion 120Hz, iPhone 17 Pro official price BDT, iPhone 17 Pro 4x zoom telephoto",

  // ─── Pros / Cons / FAQs ────────────────────────────────────────────────────
  pros: [
    "Powerful Apple A19 Pro chip (3nm) with exceptional multi-threaded performance",
    "Triple 48MP Pro Fusion camera system with Tetraprism 4x optical zoom",
    "Ceramic Shield 2 on front & back for superior drop and scratch resistance",
    "40W fast wired charging + 25W MagSafe wireless",
    "New aluminum unibody with laser-welded vapor chamber for thermal efficiency",
    "Wi-Fi 7 and Bluetooth 6.0 — future-ready wireless connectivity",
    "6.3\" ProMotion Always-On OLED with 3000 nit peak brightness",
    "iOS 26 with full Apple Intelligence support"
  ],
  cons: [
    "No charger included in the retail box",
    "No 3.5mm headphone jack",
    "No microSD card expansion slot",
    "Only 4x optical zoom (Pro Max offers 5x)",
    "Runs iOS — limited compared to Android customization"
  ],
  faqs: [
    {
      question: "What processor does the iPhone 17 Pro use?",
      answer: "It uses the Apple A19 Pro chip built on TSMC's 3nm process, delivering top-tier performance with an estimated AnTuTu score of approximately 2,300,000."
    },
    {
      question: "What is the official price of iPhone 17 Pro in Bangladesh?",
      answer: "The official price starts at BDT 165,000 for the 256GB model. Unofficial/grey market prices start from around BDT 135,000."
    },
    {
      question: "Does the iPhone 17 Pro support 5G?",
      answer: "Yes, it fully supports 5G along with Wi-Fi 7 (802.11be) and Bluetooth 6.0 for next-generation connectivity."
    },
    {
      question: "What is the camera setup on the iPhone 17 Pro?",
      answer: "It features a Triple 48MP Pro Fusion camera system: 48MP main (f/1.78, 24mm), 48MP ultrawide (f/2.2, 13mm), and 48MP telephoto (4x optical zoom via Tetraprism, 100mm equivalent)."
    },
    {
      question: "How fast does the iPhone 17 Pro charge?",
      answer: "It supports 40W USB-PD 3.2 fast wired charging, reaching 70% in about 30 minutes. It also supports 25W MagSafe and 15W Qi2 wireless charging."
    },
    {
      question: "Is the iPhone 17 Pro waterproof?",
      answer: "Yes, it carries an IP68 rating and is waterproof up to 6 meters for 30 minutes."
    },
    {
      question: "What operating system does it run?",
      answer: "It runs iOS 26, Apple's 2025 operating system featuring the new Liquid Glass design language and enhanced Apple Intelligence features."
    }
  ],

  updated_at: new Date()
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    const result = await Phone.findOneAndUpdate(
      { slug: "iphone-17-pro" },
      { $set: iphone17ProData },
      { new: true }
    );

    if (result) {
      console.log(`✅ iPhone 17 Pro updated successfully: ${result.name}`);
    } else {
      console.log("❌ iPhone 17 Pro not found in DB.");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
  }
}

run();
