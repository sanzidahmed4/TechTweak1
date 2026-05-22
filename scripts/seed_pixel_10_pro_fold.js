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
    name: "Google Pixel 10 Pro Fold",
    slug: "google-pixel-10-pro-fold",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 250000,
    price_official: null,
    price_unofficial: 250000,
    is_official: false,
    release_date: "2025-08-28", // Based on expected Pixel release cycle
    is_published: true,
    is_featured: true,
    upcoming: true,
    colors: ["Obsidian", "Porcelain"],
    model_number: "G10PFOLD",
    made_in: "China/Vietnam/India",
    phone_variants: "16GB/256GB, 16GB/512GB, 16GB/1TB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-fold-1.jpg" // placeholder, maybe reuse 9 pro fold
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor G5 (3 nm)",
    camera_highlight: "48MP OIS + 10.5MP UW + 10.8MP Telephoto",
    display_highlight: "8.0\" Foldable LTPO OLED, 120Hz",
    battery_highlight: "4800 mAh, 45W Fast Charging",
    benchmark_highlight: "AnTuTu: ~1,390,000",
    
    // General Info
    weight: "250 g",
    dimensions: "Unfolded: 155.2 x 150.2 x 5.1 mm | Folded: 155.2 x 77.1 x 10.5 mm",
    build_material: "Glass front (Gorilla Glass Victus 2), plastic front (unfolded), aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IPX8 water resistant (up to 1.5m for 30 min)",
    
    // Display Section
    display_type: "Foldable LTPO OLED, 120Hz, HDR10+, peak brightness 3000 nits",
    screen_size: "8.0 inches",
    resolution: "2076 x 2152 pixels",
    refresh_rate: "120Hz LTPO Adaptive (1-120Hz)",
    brightness: "Peak brightness 3000 nits",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass Victus 2 (cover display)",
    pixel_density: "~373 ppi",
    
    // Performance Section
    cpu: "Octa-core Tensor G5",
    gpu: "Immortalis (Custom Google integration)",
    fabrication: "3 nm (TSMC)",
    ram_variants: "16GB",
    storage_variants: "256GB, 512GB, 1TB",
    storage_type: "UFS 4.0",
    geekbench_score: "5350 (v6)",
    cooling_system: "Advanced vapor chamber",
    
    // Primary Camera
    cam_count: "Triple Camera",
    cam_main_sensor: "48 MP, f/1.7, OIS, dual pixel PDAF",
    cam_ultrawide: "10.5 MP, f/2.2, 127˚ (ultrawide)",
    cam_telephoto: "10.8 MP, f/3.1, 5x optical zoom, OIS",
    cam_macro: "Macro Focus",
    cam_ois: "OIS support on main and telephoto cameras",
    cam_flash: "LED flash",
    cam_video: "4K@30/60fps, 1080p@30/60/120/240fps",
    
    // Front Camera
    cam_front_resolution: "10 MP, f/2.2 (Cover display) & 10 MP, f/2.2 (Inner display)",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "4K@30/60fps",
    
    // Battery & Charging
    battery_capacity: "4800 mAh",
    charging_wired: "45W wired",
    charging_wireless: "15W wireless",
    charging_reverse: "Reverse wireless charging",
    charger_included: false,
    usb_type: "USB Type-C 3.2",
    
    // Network & Connectivity
    has_5g: true,
    wifi_version: "Wi-Fi 7",
    bluetooth_version: "6.0",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, BDS, NavIC",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "USB Type-C 3.2",
    
    // Sensors & Audio
    sensor_fingerprint: "Side-mounted",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    // Software & AI Features
    android_version: "Android 16",
    ui_version: "Pixel UI",
    update_policy: "7 years of OS updates",
    ai_features: ["Gemini Advanced", "Magic Editor", "Add Me", "Satellite SOS"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "TSMC-built Tensor G5 is highly efficient",
      "Massive 8.0\" Foldable Display with 3000 nits peak brightness",
      "Super thin folding design",
      "7 Years of OS Updates",
      "Advanced AI capabilities"
    ],
    cons: [
      "Extremely expensive",
      "Cover display aspect ratio might feel weird",
      "Smaller battery compared to standard Pro XL"
    ],
    
    faqs: [
      {
        question: "Does Pixel 10 Pro Fold support an active stylus?",
        answer: "No, currently the Pixel 10 Pro Fold does not officially support stylus input like the Galaxy Z Fold series."
      }
    ],
    
    meta_title: "Google Pixel 10 Pro Fold Full Specifications, Price & Review | TechTweak",
    meta_description: "Google Pixel 10 Pro Fold features the TSMC Tensor G5, 8.0-inch foldable display, 16GB RAM, advanced triple camera system and super thin design.",
    meta_keywords: "Google Pixel 10 Pro Fold, Pixel 10 Fold specs, Tensor G5, Foldable Phone, TSMC"
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 10 Pro Fold");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 10 Pro Fold");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
