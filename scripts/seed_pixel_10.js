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
    name: "Google Pixel 10",
    slug: "google-pixel-10",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 105000,
    price_official: null,
    price_unofficial: 105000,
    is_official: false,
    release_date: "2025-08-28", // Based on 2026 current time
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Obsidian", "Porcelain", "Wintergreen", "Peony"],
    model_number: "G10A",
    made_in: "China/Vietnam/India",
    phone_variants: "12GB/128GB, 12GB/256GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-10-1.jpg" // placeholder
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor G5 (3 nm)",
    camera_highlight: "50MP OIS + 48MP Ultrawide",
    display_highlight: "6.3\" OLED, 120Hz",
    battery_highlight: "4800 mAh, 30W Fast Charging",
    benchmark_highlight: "AnTuTu: ~1,350,000",
    
    // General Info
    weight: "195 g",
    dimensions: "152.8 x 72 x 8.5 mm",
    build_material: "Glass front (Gorilla Glass Victus 2), glass back, aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 dust/water resistant",
    
    // Display Section
    display_type: "OLED, 120Hz, HDR10+, PWM dimming (~240Hz)",
    screen_size: "6.3 inches",
    resolution: "1080 x 2424 pixels",
    refresh_rate: "120Hz",
    brightness: "Peak brightness 3000 nits",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass Victus 2",
    pixel_density: "~422 ppi",
    
    // Performance Section
    cpu: "Octa-core Tensor G5",
    gpu: "Immortalis (Custom Google integration)",
    fabrication: "3 nm (TSMC)",
    ram_variants: "12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 4.0",
    geekbench_score: "5200 (v6)",
    cooling_system: "Vapor chamber",
    
    // Primary Camera
    cam_count: "Dual Camera",
    cam_main_sensor: "50 MP, f/1.7, OIS, dual pixel PDAF",
    cam_ultrawide: "48 MP, f/1.7, 123˚ (ultrawide)",
    cam_telephoto: "No dedicated telephoto",
    cam_macro: "Macro Focus",
    cam_ois: "OIS support on main camera",
    cam_flash: "LED flash",
    cam_video: "4K@60fps, 1080p@240fps",
    
    // Front Camera
    cam_front_resolution: "10.5 MP, f/2.2",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "4K@60fps",
    
    // Battery & Charging
    battery_capacity: "4800 mAh",
    charging_wired: "30W wired",
    charging_wireless: "15W wireless",
    charging_reverse: "Reverse wireless charging",
    charger_included: false,
    usb_type: "USB Type-C 3.2",
    
    // Network & Connectivity
    has_5g: true,
    wifi_version: "Wi-Fi 7",
    bluetooth_version: "5.4",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO",
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
    android_version: "Android 15",
    ui_version: "Pixel UI",
    update_policy: "7 years of OS updates",
    ai_features: ["Gemini Nano", "Magic Editor", "Add Me", "Satellite SOS"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Upgraded 3000-nit display",
      "New Tensor G5 built on TSMC 3nm process runs much cooler",
      "Ultrasonic fingerprint sensor",
      "7-year update guarantee"
    ],
    cons: [
      "Still 240Hz PWM dimming on the base model",
      "No telephoto lens",
      "Charging speed is still slow"
    ],
    
    faqs: [
      {
        question: "Does Pixel 10 have TSMC chip?",
        answer: "Yes, the Tensor G5 in the Pixel 10 series is built by TSMC on a 3nm process, improving efficiency and thermal performance."
      }
    ],
    
    meta_title: "Google Pixel 10 Full Specifications, Price & Review | TechTweak",
    meta_description: "Google Pixel 10 features the TSMC-built Tensor G5, 3000 nits display, 12GB RAM, and ultrasonic fingerprint sensor.",
    meta_keywords: "Google Pixel 10, Pixel 10 specs, Tensor G5, TSMC"
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 10");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 10");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
