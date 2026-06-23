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
    name: "Google Pixel 8",
    slug: "google-pixel-8",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 75000,
    price_official: null,
    price_unofficial: 75000,
    is_official: false,
    release_date: "2023-10-12",
    is_published: true,
    is_featured: true,
    upcoming: false,
    colors: ["Obsidian", "Hazel", "Rose", "Mint"],
    model_number: "G9BQD, GKWS6, GZPF0, GPJ41",
    made_in: "China/Vietnam/India",
    phone_variants: "8GB/128GB, 8GB/256GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor G3 (4 nm)",
    camera_highlight: "50MP OIS + 12MP Ultrawide",
    display_highlight: "6.2\" Actua OLED, 120Hz",
    battery_highlight: "4575 mAh, 27W Fast Charging",
    benchmark_highlight: "AnTuTu: ~1,100,000",
    
    // General Info
    weight: "187 g (6.60 oz)",
    dimensions: "150.5 x 70.8 x 8.9 mm (5.93 x 2.79 x 0.35 in)",
    build_material: "Glass front (Gorilla Glass Victus), glass back (Gorilla Glass Victus), aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 mins)",
    
    // Display Section
    display_type: "OLED (Actua display), 120Hz, HDR10+, PWM dimming (~240Hz)",
    screen_size: "6.2 inches, 91.1 cm2 (~85.5% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels, 20:9 ratio",
    refresh_rate: "120Hz (60-120Hz variable)",
    brightness: "Peak brightness 2000 nits, HBM 1400 nits",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass Victus",
    pixel_density: "~428 ppi",
    
    // Performance Section
    cpu: "Nona-core (1x3.0 GHz Cortex-X3 & 4x2.45 GHz Cortex-A715 & 4x2.15 GHz Cortex-A510)",
    gpu: "Immortalis-G715s MC10",
    fabrication: "4 nm",
    ram_variants: "8GB LPDDR5X",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "4442 (v6.1)",
    cooling_system: "Copper vapor chamber",
    
    // Primary Camera
    cam_count: "Dual Camera Setup",
    cam_main_sensor: "50 MP, f/1.68, 25mm (wide), 1/1.31\", 1.2µm, dual pixel PDAF, multi-zone Laser AF, OIS",
    cam_ultrawide: "12 MP, f/2.2, 126˚ (ultrawide), 1.25µm, AF",
    cam_telephoto: "No dedicated telephoto (2x optical quality crop)",
    cam_macro: "Dedicated Macro Focus (via Ultrawide AF)",
    cam_ois: "OIS + EIS support on main camera",
    cam_flash: "Dual-LED flash, Pixel Shift, Ultra-HDR, panorama",
    cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps; gyro-EIS, OIS, 10-bit HDR",
    
    // Front Camera
    cam_front_resolution: "10.5 MP, f/2.2, 20mm (ultrawide), 1/3.1\", 1.22µm",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Portrait mode supported via AI",
    cam_front_video: "4K@24/30/60fps, 1080p@30/60fps",
    
    // Battery & Charging
    battery_capacity: "4575 mAh, non-removable",
    charging_wired: "27W wired, PD3.0, PPS, 50% in 30 min (advertised)",
    charging_wireless: "18W wireless",
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
    ai_features: ["Best Take", "Magic Editor", "Audio Magic Eraser", "Video Boost (cloud-based)", "Live Translate", "Call Screen"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Incredible 7-year software update promise",
      "Display finally upgraded to 120Hz with high brightness (Actua Display)",
      "Compact and ergonomic design with rounded corners",
      "Class-leading camera performance with new AI features like Best Take",
      "Face unlock is now secure enough for banking apps"
    ],
    cons: [
      "Tensor G3 chip still trails behind Snapdragon competitors in raw performance",
      "Charging speed is relatively average",
      "Battery life could be better",
      "Price increase compared to previous generation",
      "No charger in the box"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "How long will the Google Pixel 8 receive updates?",
        answer: "Google promises an unprecedented 7 years of OS upgrades, security updates, and feature drops for the Pixel 8, supporting it until 2030."
      },
      {
        question: "Is the display on the Pixel 8 120Hz?",
        answer: "Yes, the Pixel 8 features a 120Hz \"Actua\" OLED display, an upgrade from the 90Hz display found on the Pixel 7."
      },
      {
        question: "What is Best Take on the Pixel 8?",
        answer: "Best Take is an AI feature that takes multiple group photos and lets you choose the best facial expression for each person, combining them into one perfect shot."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 8 Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 8 — Tensor G3 chip, 120Hz Actua OLED display, 7 years of updates, Best Take camera, and official price in Bangladesh.",
    meta_keywords: "Google Pixel 8 specs, Pixel 8 price in Bangladesh, Google Pixel 8 review, Google Tensor G3, 120Hz display, Best Take, 7 years updates",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 8");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 8");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
