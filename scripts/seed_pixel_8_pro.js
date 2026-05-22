require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");
const PhoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);
const BrandSchema = new mongoose.Schema({}, { strict: false });
const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  await mongoose.connect(MONGODB_URI);
  
  const googleBrand = await Brand.findOne({ slug: "google" });
  if (!googleBrand) {
    console.error("Google brand not found!");
    process.exit(1);
  }

  const phoneData = {
    name: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 110000,
    price_official: null,
    price_unofficial: 110000,
    is_official: false,
    release_date: "2023-10-12",
    is_published: true,
    is_featured: true,
    upcoming: false,
    colors: ["Obsidian", "Porcelain", "Bay", "Mint"],
    model_number: "G1MNW, GC3VE, GZPFO",
    made_in: "China/Vietnam/India",
    phone_variants: "12GB/128GB, 12GB/256GB, 12GB/512GB, 12GB/1TB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor G3 (4 nm)",
    camera_highlight: "50MP OIS + 48MP Periscope + 48MP UW",
    display_highlight: "6.7\" Super Actua LTPO OLED, 120Hz",
    battery_highlight: "5050 mAh, 30W Fast Charging",
    benchmark_highlight: "AnTuTu: ~1,140,000",
    
    // General Info
    weight: "213 g (7.51 oz)",
    dimensions: "162.6 x 76.5 x 8.8 mm (6.40 x 3.01 x 0.35 in)",
    build_material: "Glass front (Gorilla Glass Victus 2), glass back (Gorilla Glass Victus 2), polished aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 mins)",
    
    // Display Section
    display_type: "LTPO OLED (Super Actua display), 120Hz, HDR10+, PWM dimming (~240Hz)",
    screen_size: "6.7 inches, 108.7 cm2 (~87.4% screen-to-body ratio)",
    resolution: "1344 x 2992 pixels, 20:9 ratio",
    refresh_rate: "120Hz LTPO Adaptive (1-120Hz)",
    brightness: "Peak brightness ~2400 nits, HBM 1600 nits",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass Victus 2",
    pixel_density: "~489 ppi",
    
    // Performance Section
    cpu: "Nona-core (1x3.0 GHz Cortex-X3 & 4x2.45 GHz Cortex-A715 & 4x2.15 GHz Cortex-A510)",
    gpu: "Immortalis-G715s MC10",
    fabrication: "4 nm",
    ram_variants: "12GB LPDDR5X",
    storage_variants: "128GB, 256GB, 512GB, 1TB",
    storage_type: "UFS 3.1",
    geekbench_score: "4450 (v6.1)",
    cooling_system: "Copper vapor chamber",
    
    // Primary Camera
    cam_count: "Triple Camera Setup",
    cam_main_sensor: "50 MP, f/1.68, 25mm (wide), 1/1.31\", 1.2µm, dual pixel PDAF, multi-zone Laser AF, OIS",
    cam_ultrawide: "48 MP, f/1.95, 126˚ (ultrawide), 0.8µm, dual pixel PDAF",
    cam_telephoto: "48 MP, f/2.8, 113mm (telephoto), 1/2.55\", 0.7µm, dual pixel PDAF, OIS, 5x optical zoom",
    cam_macro: "Upgraded Macro Focus (focuses as close as 2cm)",
    cam_ois: "OIS + EIS support on main and telephoto cameras",
    cam_flash: "Dual-LED flash, Pixel Shift, Ultra-HDR, panorama",
    cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps; gyro-EIS, OIS, 10-bit HDR",
    
    // Front Camera
    cam_front_resolution: "10.5 MP, f/2.2, 20mm (ultrawide), 1/3.1\", 1.22µm, PDAF",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Portrait mode supported via AI",
    cam_front_video: "4K@24/30/60fps, 1080p@30/60fps",
    
    // Battery & Charging
    battery_capacity: "5050 mAh, non-removable",
    charging_wired: "30W wired, PD3.0, PPS, 50% in 30 min (advertised)",
    charging_wireless: "23W wireless",
    charging_reverse: "Reverse wireless charging",
    charger_included: false,
    usb_type: "USB Type-C 3.2",
    
    // Network & Connectivity
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, Wi-Fi Direct",
    bluetooth_version: "5.3, A2DP, LE, aptX HD",
    has_nfc: true,
    gps_specs: "GPS (L1+L5), GLONASS (G1), GALILEO (E1+E5a), QZSS (L1+L5), NavIC",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "USB Type-C 3.2",
    
    // Sensors & Audio
    sensor_fingerprint: "Under-display (optical)",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true, // Secure enough for payments
    
    // Software & AI Features
    android_version: "Android 14",
    ui_version: "Pixel UI",
    update_policy: "7 years of OS, security, and feature drop updates",
    ai_features: ["Video Boost", "Night Sight Video", "Best Take", "Magic Editor", "Audio Magic Eraser", "Zoom Enhance", "Thermometer App"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Unprecedented 7-year software update promise",
      "Stunning Super Actua display with 2400 nits peak brightness",
      "Pro-level camera controls and exclusive AI features like Video Boost",
      "Upgraded 48MP ultrawide camera with improved macro focus",
      "Includes a unique built-in temperature sensor"
    ],
    cons: [
      "Tensor G3 chip trails behind Snapdragon 8 Gen 2/3 competitors in raw performance",
      "Expensive price tag compared to previous generation",
      "Charging speed is still capped at 30W",
      "Temperature sensor feels like a gimmick to some",
      "No charger in the box"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "Does the Google Pixel 8 Pro have a temperature sensor?",
        answer: "Yes, the Pixel 8 Pro includes a unique built-in temperature sensor below the camera flash that can measure the temperature of objects, and (with FDA approval in some regions) body temperature."
      },
      {
        question: "What is Video Boost on the Pixel 8 Pro?",
        answer: "Video Boost is an exclusive feature that uploads your videos to Google's servers to process them with advanced AI, improving HDR, stabilization, and enabling Night Sight for video."
      },
      {
        question: "How long will the Pixel 8 Pro receive updates?",
        answer: "Google guarantees an incredible 7 years of OS upgrades, security patches, and feature drops for the Pixel 8 Pro."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 8 Pro Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 8 Pro — Tensor G3, 5x Telephoto, 6.7\" Super Actua Display, built-in thermometer, 7 years updates, and price in Bangladesh.",
    meta_keywords: "Google Pixel 8 Pro specs, Pixel 8 Pro price in Bangladesh, Google Pixel 8 Pro review, Google Tensor G3, Video Boost, temperature sensor, 7 years updates",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 8 Pro");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 8 Pro");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
