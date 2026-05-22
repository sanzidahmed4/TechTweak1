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
    name: "Google Pixel 9",
    slug: "google-pixel-9",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 95000,
    price_official: null,
    price_unofficial: 95000,
    is_official: false,
    release_date: "2024-08-22",
    is_published: true,
    is_featured: true,
    upcoming: false,
    colors: ["Peony", "Wintergreen", "Porcelain", "Obsidian"],
    model_number: "GUR25, GZC4K, GEC77",
    made_in: "China/Vietnam/India",
    phone_variants: "12GB/128GB, 12GB/256GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor G4 (4 nm)",
    camera_highlight: "50MP OIS + 48MP Ultrawide",
    display_highlight: "6.3\" Actua OLED, 120Hz",
    battery_highlight: "4700 mAh, 27W Fast Charging",
    benchmark_highlight: "AnTuTu: ~1,150,000",
    
    // General Info
    weight: "198 g (6.98 oz)",
    dimensions: "152.8 x 72 x 8.5 mm (6.02 x 2.83 x 0.33 in)",
    build_material: "Glass front (Gorilla Glass Victus 2), glass back (Gorilla Glass Victus 2), aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 mins)",
    
    // Display Section
    display_type: "OLED (Actua display), 120Hz, HDR10+, PWM dimming (~240Hz)",
    screen_size: "6.3 inches, 96.3 cm2 (~87.6% screen-to-body ratio)",
    resolution: "1080 x 2424 pixels, 20:9 ratio",
    refresh_rate: "120Hz Smooth Display (60-120Hz variable)",
    brightness: "Peak brightness 2700 nits, HDR 1800 nits",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass Victus 2",
    pixel_density: "~422 ppi",
    
    // Performance Section
    cpu: "Octa-core (1x3.1 GHz Cortex-X4 & 3x2.6 GHz Cortex-A720 & 4x1.92 GHz Cortex-A520)",
    gpu: "Mali-G715 MC7",
    fabrication: "4 nm",
    ram_variants: "12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "4750 (v6)",
    cooling_system: "Advanced vapor chamber",
    
    // Primary Camera
    cam_count: "Dual Camera Setup",
    cam_main_sensor: "50 MP, f/1.68, 25mm (wide), 1/1.31\", 1.2µm, dual pixel PDAF, single-zone Laser AF, OIS",
    cam_ultrawide: "48 MP, f/1.7, 123˚ (ultrawide), 1/2.55\", dual pixel PDAF",
    cam_telephoto: "No dedicated telephoto",
    cam_macro: "Dedicated Macro Focus (via Ultrawide AF)",
    cam_ois: "OIS + EIS support on main camera",
    cam_flash: "LED flash, Pixel Shift, Ultra-HDR, panorama",
    cam_video: "4K@24/30/60fps, 1080p@24/30/60/120/240fps; gyro-EIS, OIS, 10-bit HDR",
    
    // Front Camera
    cam_front_resolution: "10.5 MP, f/2.2, 20mm (ultrawide), 1/3.1\", 1.22µm, AF",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Portrait mode supported via AI",
    cam_front_video: "4K@30/60fps, 1080p@30/60fps",
    
    // Battery & Charging
    battery_capacity: "4700 mAh, non-removable",
    charging_wired: "27W wired, PD3.0, PPS, 55% in 30 min (advertised)",
    charging_wireless: "15W wireless",
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
    ai_features: ["Gemini Nano built-in", "Add Me", "Magic Editor", "Auto Frame", "Reimagine", "Pixel Studio", "Satellite SOS"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Stunning 2700-nit Actua OLED display with Gorilla Glass Victus 2",
      "Massive upgrade to 12GB RAM standard",
      "New Ultrasonic fingerprint sensor is incredibly fast and reliable",
      "Major camera upgrades, especially the new 48MP ultrawide with Macro Focus",
      "Packed with exclusive 'Gemini' AI features like Add Me and Pixel Studio"
    ],
    cons: [
      "No dedicated telephoto lens (exclusive to Pro models)",
      "Charging speed is still stuck at 27W",
      "Price increased from the previous generation",
      "UFS 3.1 storage feels slow compared to UFS 4.0 on rivals",
      "No charger in the box"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "Does the Google Pixel 9 have an ultrasonic fingerprint sensor?",
        answer: "Yes, the Pixel 9 series finally ditches the optical sensor for a much faster, more reliable ultrasonic under-display fingerprint sensor."
      },
      {
        question: "How much RAM does the Pixel 9 have?",
        answer: "The base Google Pixel 9 now comes with a massive 12GB of RAM to better handle on-device AI features like Gemini Nano."
      },
      {
        question: "What is the 'Add Me' feature on the Pixel 9?",
        answer: "'Add Me' is a new AI camera feature that lets the photographer take a group photo, then hand the phone to someone else and step into the frame. The AI merges the two photos so everyone is in the final shot."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 9 Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 9 — Tensor G4, 12GB RAM standard, 2700-nit Actua display, Ultrasonic fingerprint sensor, Gemini AI, and official price in Bangladesh.",
    meta_keywords: "Google Pixel 9 specs, Pixel 9 price in Bangladesh, Google Pixel 9 review, Google Tensor G4, 12GB RAM, Ultrasonic fingerprint, Gemini AI, Pixel 9 battery",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 9");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 9");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
