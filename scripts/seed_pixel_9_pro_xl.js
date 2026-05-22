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
    name: "Google Pixel 9 Pro XL",
    slug: "google-pixel-9-pro-xl",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 135000,
    price_official: null,
    price_unofficial: 135000,
    is_official: false,
    release_date: "2024-08-22",
    is_published: true,
    is_featured: true,
    upcoming: false,
    colors: ["Porcelain", "Rose Quartz", "Hazel", "Obsidian"],
    model_number: "GZC4K, GQ57S",
    made_in: "China/Vietnam/India",
    phone_variants: "16GB/128GB, 16GB/256GB, 16GB/512GB, 16GB/1TB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-xl-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor G4 (4 nm)",
    camera_highlight: "50MP OIS + 48MP Periscope + 48MP UW",
    display_highlight: "6.8\" Super Actua LTPO OLED, 120Hz",
    battery_highlight: "5060 mAh, 37W Fast Charging",
    benchmark_highlight: "AnTuTu: ~1,180,000",
    
    // General Info
    weight: "221 g (7.80 oz)",
    dimensions: "162.8 x 76.6 x 8.5 mm (6.41 x 3.02 x 0.33 in)",
    build_material: "Glass front (Gorilla Glass Victus 2), glass back (Gorilla Glass Victus 2), polished aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 mins)",
    
    // Display Section
    display_type: "LTPO OLED (Super Actua display), 120Hz, HDR10+, PWM dimming (~240Hz)",
    screen_size: "6.8 inches, 109.7 cm2 (~88.0% screen-to-body ratio)",
    resolution: "1344 x 2992 pixels, 20:9 ratio",
    refresh_rate: "120Hz LTPO Adaptive (1-120Hz)",
    brightness: "Peak brightness 3000 nits, HBM 2000 nits",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass Victus 2",
    pixel_density: "~486 ppi",
    
    // Performance Section
    cpu: "Octa-core (1x3.1 GHz Cortex-X4 & 3x2.6 GHz Cortex-A720 & 4x1.92 GHz Cortex-A520)",
    gpu: "Mali-G715 MC7",
    fabrication: "4 nm",
    ram_variants: "16GB",
    storage_variants: "128GB, 256GB, 512GB, 1TB",
    storage_type: "UFS 3.1",
    geekbench_score: "4770 (v6)",
    cooling_system: "Advanced vapor chamber",
    
    // Primary Camera
    cam_count: "Triple Camera Setup",
    cam_main_sensor: "50 MP, f/1.68, 25mm (wide), 1/1.31\", 1.2µm, dual pixel PDAF, multi-zone Laser AF, OIS",
    cam_ultrawide: "48 MP, f/1.7, 123˚ (ultrawide), 1/2.55\", dual pixel PDAF",
    cam_telephoto: "48 MP, f/2.8, 113mm (telephoto), 1/2.55\", dual pixel PDAF, OIS, 5x optical zoom",
    cam_macro: "Upgraded Macro Focus",
    cam_ois: "OIS + EIS support on main and telephoto cameras",
    cam_flash: "LED flash, Pixel Shift, Ultra-HDR, panorama",
    cam_video: "8K@30fps (via Video Boost), 4K@24/30/60fps, 1080p@24/30/60/120/240fps; gyro-EIS, OIS, 10-bit HDR",
    
    // Front Camera
    cam_front_resolution: "42 MP, f/2.2, 17mm (ultrawide), 1/3.95\", PDAF",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Portrait mode supported via AI",
    cam_front_video: "4K@30/60fps, 1080p@30/60fps",
    
    // Battery & Charging
    battery_capacity: "5060 mAh, non-removable",
    charging_wired: "37W wired, PD3.0, PPS, 70% in 30 min (advertised with 45W charger)",
    charging_wireless: "23W wireless",
    charging_reverse: "Reverse wireless charging",
    charger_included: false,
    usb_type: "USB Type-C 3.2",
    
    // Network & Connectivity
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band",
    bluetooth_version: "5.3, A2DP, LE, aptX HD",
    has_nfc: true,
    gps_specs: "GPS (L1+L5), GLONASS, GALILEO, BDS, QZSS, NavIC",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "USB Type-C 3.2",
    
    // Sensors & Audio
    sensor_fingerprint: "Under-display (ultrasonic)",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true, // Secure enough for payments
    
    // Software & AI Features
    android_version: "Android 14, upgradable to Android 15",
    ui_version: "Pixel UI",
    update_policy: "7 years of OS, security, and feature drop updates",
    ai_features: ["Gemini Advanced", "Video Boost (up to 8K)", "Add Me", "Magic Editor", "Auto Frame", "Reimagine", "Satellite SOS", "Thermometer App"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Massive 6.8\" Super Actua display with 3000 nits peak brightness",
      "Huge 5060 mAh battery with faster 37W wired charging",
      "Incredible 16GB RAM ensures long-term smooth performance for AI",
      "Pro-level camera system with class-leading computational photography",
      "Ultra-fast and reliable ultrasonic fingerprint sensor"
    ],
    cons: [
      "Quite heavy at 221g",
      "Tensor G4 still cannot match Snapdragon 8 Gen 3 in raw CPU/GPU benchmarks",
      "Still using UFS 3.1 storage when competitors use UFS 4.0",
      "Maximum charging speed (37W) requires Google's new 45W charger",
      "Very expensive flagship price tag"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "What is the charging speed of the Google Pixel 9 Pro XL?",
        answer: "The Pixel 9 Pro XL supports up to 37W wired charging, which can charge the phone to 70% in about 30 minutes. However, you need a charger capable of at least 45W to achieve these speeds, and it is not included in the box."
      },
      {
        question: "Does the Pixel 9 Pro XL have the same cameras as the regular Pro?",
        answer: "Yes, the camera hardware is identical between the Pixel 9 Pro and the Pixel 9 Pro XL. The main difference between the two is screen size and battery capacity."
      },
      {
        question: "Is the fingerprint sensor better on the Pixel 9 series?",
        answer: "Yes, Google has finally replaced the optical fingerprint sensor with a much faster and more reliable ultrasonic sensor on the entire Pixel 9 lineup."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 9 Pro XL Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 9 Pro XL — 6.8\" Super Actua display, 5060 mAh battery, 37W fast charging, 16GB RAM, Tensor G4, and price in Bangladesh.",
    meta_keywords: "Google Pixel 9 Pro XL specs, Pixel 9 Pro XL price in Bangladesh, Google Pixel 9 Pro XL review, Google Tensor G4, 16GB RAM, Ultrasonic fingerprint, Video Boost, fast charging",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 9 Pro XL");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 9 Pro XL");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
