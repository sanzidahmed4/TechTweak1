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
    name: "Google Pixel 10 Pro",
    slug: "google-pixel-10-pro",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 125000,
    price_official: null,
    price_unofficial: 125000,
    is_official: false,
    release_date: "2025-08-28", // Based on 2026 current time
    is_published: true,
    is_featured: true,
    upcoming: false,
    colors: ["Obsidian", "Porcelain", "Hazel", "Rose Quartz"],
    model_number: "G10P",
    made_in: "China/Vietnam/India",
    phone_variants: "16GB/128GB, 16GB/256GB, 16GB/512GB, 16GB/1TB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-10-pro-1.jpg" // placeholder
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor G5 (3 nm)",
    camera_highlight: "50MP OIS + 48MP Periscope + 48MP UW",
    display_highlight: "6.3\" LTPO OLED, 120Hz",
    battery_highlight: "4870 mAh, 30W Fast Charging",
    benchmark_highlight: "AnTuTu: ~1,380,000",
    
    // General Info
    weight: "199 g",
    dimensions: "152.8 x 72.0 x 8.5 mm",
    build_material: "Glass front (Gorilla Glass Victus 2), glass back, polished aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 dust/water resistant",
    
    // Display Section
    display_type: "LTPO OLED, 120Hz, HDR10+, PWM dimming (up to 480Hz option)",
    screen_size: "6.3 inches",
    resolution: "1280 x 2856 pixels",
    refresh_rate: "120Hz LTPO Adaptive (1-120Hz)",
    brightness: "Peak brightness 3300 nits, HBM 2200 nits",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass Victus 2",
    pixel_density: "~495 ppi",
    
    // Performance Section
    cpu: "Octa-core Tensor G5",
    gpu: "Immortalis (Custom Google integration)",
    fabrication: "3 nm (TSMC)",
    ram_variants: "16GB",
    storage_variants: "128GB, 256GB, 512GB, 1TB",
    storage_type: "UFS 4.0",
    geekbench_score: "5300 (v6)",
    cooling_system: "Advanced vapor chamber",
    
    // Primary Camera
    cam_count: "Triple Camera",
    cam_main_sensor: "50 MP, f/1.7, OIS, dual pixel PDAF",
    cam_ultrawide: "48 MP, f/1.7, 123˚ (ultrawide)",
    cam_telephoto: "48 MP, f/2.8, 5x optical zoom, OIS",
    cam_macro: "Upgraded Macro Focus",
    cam_ois: "OIS support on main and telephoto cameras",
    cam_flash: "LED flash",
    cam_video: "8K@30fps, 4K@60fps",
    
    // Front Camera
    cam_front_resolution: "42 MP, f/2.2",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "4K@60fps",
    
    // Battery & Charging
    battery_capacity: "4870 mAh",
    charging_wired: "30W wired",
    charging_wireless: "21W wireless",
    charging_reverse: "Reverse wireless charging",
    charger_included: false,
    usb_type: "USB Type-C 3.2",
    
    // Network & Connectivity
    has_5g: true,
    wifi_version: "Wi-Fi 7",
    bluetooth_version: "6.0",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, BDS",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "USB Type-C 3.2",
    
    // Sensors & Audio
    sensor_fingerprint: "Under-display (ultrasonic)",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    // Software & AI Features
    android_version: "Android 16",
    ui_version: "Pixel UI",
    update_policy: "7 years of OS updates",
    ai_features: ["Gemini Advanced", "Video Boost 8K", "Magic Editor", "Add Me", "Satellite SOS"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Incredible 3300-nit display",
      "TSMC-built Tensor G5 is a massive leap in efficiency",
      "480Hz PWM dimming option for sensitive eyes",
      "Massive 16GB RAM"
    ],
    cons: [
      "Still limited to 30W charging",
      "UFS storage speeds may not match competitors",
      "Very expensive"
    ],
    
    faqs: [
      {
        question: "Does Pixel 10 Pro have 480Hz PWM dimming?",
        answer: "Yes, the Pixel 10 Pro includes a setting to adjust brightness for sensitive eyes, which increases the PWM frequency to 480Hz."
      }
    ],
    
    meta_title: "Google Pixel 10 Pro Full Specifications, Price & Review | TechTweak",
    meta_description: "Google Pixel 10 Pro features the TSMC Tensor G5, 3300 nits display, 16GB RAM, 480Hz PWM dimming, and an ultrasonic fingerprint sensor.",
    meta_keywords: "Google Pixel 10 Pro, Pixel 10 Pro specs, Tensor G5, TSMC, 480Hz PWM"
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 10 Pro");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 10 Pro");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
