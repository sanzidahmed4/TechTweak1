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
    name: "Google Pixel Fold",
    slug: "google-pixel-fold",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 185000,
    price_official: null,
    price_unofficial: 185000,
    is_official: false,
    release_date: "2023-06-27",
    is_published: true,
    is_featured: true,
    upcoming: false,
    colors: ["Porcelain", "Obsidian"],
    model_number: "G9FPL",
    made_in: "China/Vietnam",
    phone_variants: "12GB/256GB, 12GB/512GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-fold-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor G2 (5 nm)",
    camera_highlight: "48MP OIS + 10.8MP Periscope + 10.8MP UW",
    display_highlight: "7.6\" Foldable OLED (Inner), 5.8\" OLED (Cover)",
    battery_highlight: "4821 mAh, Wired & Wireless Charging",
    benchmark_highlight: "AnTuTu: ~800,000",
    
    // General Info
    weight: "283 g (9.98 oz)",
    dimensions: "Unfolded: 158.7 x 139.7 x 5.8 mm | Folded: 139.7 x 79.5 x 12.1 mm",
    build_material: "Glass front (Gorilla Glass Victus) - folded, plastic front - unfolded, glass back (Gorilla Glass Victus), aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IPX8 water resistant (up to 1.5m for 30 mins) - No dust resistance rating",
    
    // Display Section
    display_type: "Foldable OLED, 120Hz, HDR10+, PWM dimming (~240Hz) | Cover display: OLED, 120Hz, HDR, Gorilla Glass Victus",
    screen_size: "Inner: 7.6 inches, 183.3 cm2 (~82.7% ratio) | Cover: 5.8 inches, 82.9 cm2 (17.4:9 ratio)",
    resolution: "Inner: 1840 x 2208 pixels (~380 ppi) | Cover: 1080 x 2092 pixels (~408 ppi)",
    refresh_rate: "120Hz (Inner & Cover Displays)",
    brightness: "Inner: Peak ~1450 nits, HBM 1000 nits | Cover: Peak ~1550 nits, HBM 1200 nits",
    hdr: "HDR10+",
    protection: "Cover: Corning Gorilla Glass Victus | Inner: Ultra Thin Glass with plastic layer",
    pixel_density: "Inner: ~380 ppi | Cover: ~408 ppi",
    
    // Performance Section
    cpu: "Octa-core (2x2.85 GHz Cortex-X1 & 2x2.35 GHz Cortex-A78 & 4x1.80 GHz Cortex-A55)",
    gpu: "Mali-G710 MP7",
    fabrication: "5 nm",
    ram_variants: "12GB LPDDR5",
    storage_variants: "256GB, 512GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3235 (v5.1)",
    cooling_system: "Graphite cooling layers",
    
    // Primary Camera
    cam_count: "Triple Camera Setup",
    cam_main_sensor: "48 MP, f/1.7, 25mm (wide), 1/2\", 0.8µm, Dual Pixel PDAF, Laser AF, OIS",
    cam_ultrawide: "10.8 MP, f/2.2, 121˚ (ultrawide), 1/3\", 1.25µm",
    cam_telephoto: "10.8 MP, f/3.0, 112mm (telephoto), 1/3.1\", 1.22µm, Dual Pixel PDAF, OIS, 5x optical zoom",
    cam_macro: "No dedicated macro",
    cam_ois: "OIS + EIS support on main and telephoto cameras",
    cam_flash: "Dual-LED flash, HDR, panorama",
    cam_video: "4K@30/60fps, 1080p@30/60/120/240fps; gyro-EIS, 10-bit HDR",
    
    // Front Camera
    cam_front_resolution: "Cover: 9.5 MP, f/2.2, 24mm, 1.22µm | Inner: 8 MP, f/2.0, 24mm, 1.12µm",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Portrait mode supported via AI",
    cam_front_video: "4K@30/60fps, 1080p@30/60fps",
    
    // Battery & Charging
    battery_capacity: "4821 mAh, non-removable",
    charging_wired: "Wired PD3.0",
    charging_wireless: "Wireless charging supported",
    charging_reverse: "No reverse wireless charging",
    charger_included: false,
    usb_type: "USB Type-C 3.2",
    
    // Network & Connectivity
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band",
    bluetooth_version: "5.2, A2DP, LE, aptX HD",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "USB Type-C 3.2",
    
    // Sensors & Audio
    sensor_fingerprint: "Side-mounted",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true, // Face unlock available on outer screen
    
    // Software & AI Features
    android_version: "Android 13, upgradable to Android 15",
    ui_version: "Pixel UI (Fold optimized)",
    update_policy: "3 years of OS and 5 years of security updates",
    ai_features: ["Dual Screen Interpreter", "Tabletop mode", "Photo Unblur", "Magic Eraser"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Extremely thin profile when unfolded (5.8mm)",
      "Excellent passport-like aspect ratio makes the outer screen highly usable",
      "Flagship-tier camera system with 5x optical zoom",
      "Seamless software experience optimized for large screen",
      "IPX8 water resistance"
    ],
    cons: [
      "Very heavy at 283g",
      "Inner screen bezels are noticeably thick",
      "Tensor G2 can run warm under heavy load",
      "Inner display crease is quite visible",
      "Very expensive compared to traditional slab phones"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "Is the Google Pixel Fold waterproof?",
        answer: "The Pixel Fold has an IPX8 water resistance rating, meaning it can survive submersion in water up to 1.5m for 30 minutes, but it does not have an official dust resistance rating."
      },
      {
        question: "Does the Pixel Fold support a stylus?",
        answer: "No, the Google Pixel Fold does not support any kind of active stylus input on either of its screens."
      },
      {
        question: "Where is the fingerprint sensor on the Pixel Fold?",
        answer: "Unlike the standard Pixel 7 series which uses an under-display sensor, the Pixel Fold has its fingerprint sensor embedded in the power button on the side."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel Fold Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel Fold — Google's first foldable with 7.6\" inner display, Tensor G2 chip, 5x optical zoom camera, and official price in Bangladesh.",
    meta_keywords: "Google Pixel Fold specs, Pixel Fold price in Bangladesh, Google Pixel Fold review, foldable phone, Tensor G2, 5x optical zoom, Pixel Fold battery",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel Fold");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel Fold");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
