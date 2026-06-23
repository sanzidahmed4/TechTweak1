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
    name: "Google Pixel 9 Pro Fold",
    slug: "google-pixel-9-pro-fold",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 220000,
    price_official: null,
    price_unofficial: 220000,
    is_official: false,
    release_date: "2024-09-04",
    is_published: true,
    is_featured: true,
    upcoming: false,
    colors: ["Porcelain", "Obsidian"],
    model_number: "GC15S",
    made_in: "China/Vietnam/India",
    phone_variants: "16GB/256GB, 16GB/512GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-fold-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor G4 (4 nm)",
    camera_highlight: "48MP OIS + 10.8MP Periscope + 10.5MP UW",
    display_highlight: "8.0\" Super Actua Foldable OLED, 6.3\" Cover",
    battery_highlight: "4650 mAh, 21W Fast Charging",
    benchmark_highlight: "AnTuTu: ~1,140,000",
    
    // General Info
    weight: "257 g (9.07 oz)",
    dimensions: "Unfolded: 155.2 x 150.2 x 5.1 mm | Folded: 155.2 x 77.1 x 10.5 mm",
    build_material: "Glass front (Gorilla Glass Victus 2) - folded, plastic front - unfolded, glass back (Gorilla Glass Victus 2), aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IPX8 water resistant (up to 1.5m for 30 mins) - No dust resistance rating",
    
    // Display Section
    display_type: "Foldable LTPO OLED (Super Actua), 120Hz, HDR10+, PWM dimming (~240Hz) | Cover display: OLED (Actua), 120Hz, HDR",
    screen_size: "Inner: 8.0 inches, 207.4 cm2 (~89.0% ratio) | Cover: 6.3 inches, 1080 x 2424 pixels (20:9 ratio)",
    resolution: "Inner: 2076 x 2152 pixels (~373 ppi) | Cover: 1080 x 2424 pixels (~422 ppi)",
    refresh_rate: "Inner: 120Hz LTPO Adaptive (1-120Hz) | Cover: 120Hz (60-120Hz)",
    brightness: "Inner & Cover: Peak brightness 2700 nits, HBM 1600 nits",
    hdr: "HDR10+",
    protection: "Cover: Corning Gorilla Glass Victus 2 | Inner: Ultra Thin Glass with plastic layer",
    pixel_density: "Inner: ~373 ppi | Cover: ~422 ppi",
    
    // Performance Section
    cpu: "Octa-core (1x3.1 GHz Cortex-X4 & 3x2.6 GHz Cortex-A720 & 4x1.92 GHz Cortex-A520)",
    gpu: "Mali-G715 MC7",
    fabrication: "4 nm",
    ram_variants: "16GB",
    storage_variants: "256GB, 512GB",
    storage_type: "UFS 3.1",
    geekbench_score: "4600 (v6)",
    cooling_system: "Advanced thermal management (no vapor chamber)",
    
    // Primary Camera
    cam_count: "Triple Camera Setup",
    cam_main_sensor: "48 MP, f/1.7, 25mm (wide), 1/2.0\", 0.8µm, dual pixel PDAF, OIS",
    cam_ultrawide: "10.5 MP, f/2.2, 127˚ (ultrawide), 1/3.4\", 1.12µm, PDAF",
    cam_telephoto: "10.8 MP, f/3.1, 112mm (telephoto), 1/3.2\", 1.22µm, dual pixel PDAF, OIS, 5x optical zoom",
    cam_macro: "Macro Focus via Ultrawide lens",
    cam_ois: "OIS + EIS support on main and telephoto cameras",
    cam_flash: "LED flash, Pixel Shift, Ultra-HDR, panorama",
    cam_video: "4K@30/60fps, 1080p@30/60/120/240fps; gyro-EIS, OIS, 10-bit HDR, Video Boost",
    
    // Front Camera
    cam_front_resolution: "Cover: 10 MP, f/2.2, 23mm, 1/3.94\", PDAF | Inner: 10 MP, f/2.2, 23mm, 1/3.94\", PDAF",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Portrait mode supported via AI",
    cam_front_video: "4K@30/60fps, 1080p@30/60fps",
    
    // Battery & Charging
    battery_capacity: "4650 mAh, non-removable",
    charging_wired: "21W wired, PD3.0, PPS",
    charging_wireless: "7.5W wireless",
    charging_reverse: "No reverse wireless charging",
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
    sensor_fingerprint: "Side-mounted",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true, // Face unlock available on both screens
    
    // Software & AI Features
    android_version: "Android 14, upgradable to Android 15",
    ui_version: "Pixel UI (Fold optimized)",
    update_policy: "7 years of OS, security, and feature drop updates",
    ai_features: ["Gemini Advanced", "Dual Screen Interpreter", "Video Boost", "Add Me", "Magic Editor", "Auto Frame", "Satellite SOS"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Incredibly thin when folded (10.5mm) and unfolded (5.1mm)",
      "Massive 8-inch inner display and highly usable 6.3-inch cover display",
      "Both displays reach an impressive 2700 nits peak brightness",
      "16GB RAM and Tensor G4 provide smooth AI capabilities",
      "7 years of full software updates"
    ],
    cons: [
      "Cameras are slightly downgraded compared to the standard Pixel 9 Pro",
      "Very slow charging speeds (21W wired / 7.5W wireless)",
      "Still uses a side-mounted fingerprint sensor instead of the new ultrasonic one",
      "No stylus support",
      "Extremely expensive"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "How thin is the Google Pixel 9 Pro Fold?",
        answer: "The Pixel 9 Pro Fold is remarkably thin, measuring just 10.5mm when folded and 5.1mm when unfolded, making it one of the thinnest foldables on the market."
      },
      {
        question: "Does the Pixel 9 Pro Fold have the same cameras as the Pixel 9 Pro?",
        answer: "No, to maintain its incredibly thin profile, the Pixel 9 Pro Fold uses slightly smaller and lower-resolution camera sensors compared to the standard slab-style Pixel 9 Pro."
      },
      {
        question: "Does the Pixel 9 Pro Fold have an ultrasonic fingerprint sensor?",
        answer: "No, unlike the other Pixel 9 models which use a new under-display ultrasonic sensor, the Fold retains a side-mounted capacitive fingerprint sensor integrated into the power button."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 9 Pro Fold Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 9 Pro Fold — Ultra-thin foldable with 8.0\" inner display, Tensor G4, 16GB RAM, Gemini AI, and official price in Bangladesh.",
    meta_keywords: "Google Pixel 9 Pro Fold specs, Pixel 9 Pro Fold price in Bangladesh, Google Pixel 9 Pro Fold review, ultra-thin foldable, Tensor G4, 16GB RAM, Google foldable",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 9 Pro Fold");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 9 Pro Fold");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
