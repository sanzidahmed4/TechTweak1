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
    name: "Google Pixel 8a",
    slug: "google-pixel-8a",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 55000,
    price_official: null,
    price_unofficial: 55000,
    is_official: false,
    release_date: "2024-05-14",
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Obsidian", "Porcelain", "Bay", "Aloe"],
    model_number: "GKV4X, G8HHN, G6GPR",
    made_in: "China/Vietnam/India",
    phone_variants: "8GB/128GB, 8GB/256GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8a-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor G3 (4 nm)",
    camera_highlight: "64MP OIS + 13MP Ultrawide",
    display_highlight: "6.1\" Actua OLED, 120Hz",
    battery_highlight: "4492 mAh, 18W Fast Charging",
    benchmark_highlight: "AnTuTu: ~1,050,000",
    
    // General Info
    weight: "188 g (6.63 oz)",
    dimensions: "152.1 x 72.7 x 8.9 mm (5.99 x 2.86 x 0.35 in)",
    build_material: "Glass front (Gorilla Glass 3), aluminum frame, plastic back",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP67 dust/water resistant (up to 1m for 30 mins)",
    
    // Display Section
    display_type: "OLED (Actua display), HDR, PWM dimming (~240Hz)",
    screen_size: "6.1 inches, 90.3 cm2 (~81.6% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels, 20:9 ratio",
    refresh_rate: "120Hz Smooth Display",
    brightness: "Peak brightness 2000 nits, HDR 1400 nits",
    hdr: "HDR support",
    protection: "Corning Gorilla Glass 3",
    pixel_density: "~430 ppi",
    
    // Performance Section
    cpu: "Nona-core (1x3.0 GHz Cortex-X3 & 4x2.45 GHz Cortex-A715 & 4x2.15 GHz Cortex-A510)",
    gpu: "Immortalis-G715s MC10",
    fabrication: "4 nm",
    ram_variants: "8GB LPDDR5X",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "4200 (v6)",
    cooling_system: "Graphite thermal pad",
    
    // Primary Camera
    cam_count: "Dual Camera Setup",
    cam_main_sensor: "64 MP, f/1.89, 26mm (wide), 1/1.73\", 0.8µm, dual pixel PDAF, OIS",
    cam_ultrawide: "13 MP, f/2.2, 120˚ (ultrawide), 1.12µm, dual pixel PDAF",
    cam_telephoto: "No dedicated telephoto",
    cam_macro: "No dedicated macro",
    cam_ois: "OIS + EIS support on main camera",
    cam_flash: "Dual-LED flash, Pixel Shift, Ultra-HDR, panorama",
    cam_video: "4K@30/60fps, 1080p@30/60/120/240fps; gyro-EIS, OIS",
    
    // Front Camera
    cam_front_resolution: "13 MP, f/2.2, 20mm (ultrawide), 1.12µm",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Portrait mode supported via AI",
    cam_front_video: "4K@30fps, 1080p@30fps",
    
    // Battery & Charging
    battery_capacity: "4492 mAh, non-removable",
    charging_wired: "18W wired, PD3.0",
    charging_wireless: "7.5W wireless",
    charging_reverse: "No reverse wireless charging",
    charger_included: false,
    usb_type: "USB Type-C 3.2",
    
    // Network & Connectivity
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band, Wi-Fi Direct",
    bluetooth_version: "5.3, A2DP, LE",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS, NavIC",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "USB Type-C 3.2",
    
    // Sensors & Audio
    sensor_fingerprint: "Under-display (optical)",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true, // Face unlock available
    
    // Software & AI Features
    android_version: "Android 14",
    ui_version: "Pixel UI",
    update_policy: "7 years of OS, security, and feature drop updates",
    ai_features: ["Best Take", "Audio Magic Eraser", "Magic Editor", "Real Tone", "Circle to Search"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Incredible 7-year software update promise, unmatched in this price range",
      "Display finally upgraded to a bright 120Hz Actua OLED panel",
      "Flagship Tensor G3 chip brings premium AI features to the A-series",
      "Excellent point-and-shoot camera capabilities",
      "Fun and vibrant color options with a matte finish"
    ],
    cons: [
      "Thick display bezels look slightly dated",
      "Slow 18W wired charging speed",
      "Wireless charging is very slow at 7.5W",
      "Tensor G3 can still run warm during intensive gaming",
      "No charger in the box"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "Does the Google Pixel 8a have a 120Hz display?",
        answer: "Yes, the Pixel 8a is the first A-series phone from Google to feature a 120Hz \"Actua\" display, upgrading from the 90Hz display on the Pixel 7a."
      },
      {
        question: "How many years of updates will the Pixel 8a get?",
        answer: "Google promises an impressive 7 years of OS upgrades, security patches, and feature drops for the Pixel 8a."
      },
      {
        question: "Does the Pixel 8a support wireless charging?",
        answer: "Yes, like its predecessor, the Pixel 8a supports basic 7.5W wireless charging."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 8a Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 8a — Tensor G3 chip, 120Hz Actua display, 64MP camera, 7 years updates, and official price in Bangladesh.",
    meta_keywords: "Google Pixel 8a specs, Pixel 8a price in Bangladesh, Google Pixel 8a review, Google Tensor G3, 120Hz Actua display, 7 years updates, Pixel 8a battery",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 8a");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 8a");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
