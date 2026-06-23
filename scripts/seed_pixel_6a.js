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
    name: "Google Pixel 6a",
    slug: "google-pixel-6a",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 42000,
    price_official: null,
    price_unofficial: 42000,
    is_official: false,
    release_date: "2022-07-21",
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Chalk", "Charcoal", "Sage"],
    model_number: "GX7AS, GB62Z, G1AZG",
    made_in: "China/Vietnam",
    phone_variants: "6GB/128GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6a-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor (5 nm)",
    camera_highlight: "12.2MP OIS + 12MP Ultrawide",
    display_highlight: "6.1\" OLED, 60Hz",
    battery_highlight: "4410 mAh, 18W Fast Charging",
    benchmark_highlight: "AnTuTu: ~713,000",
    
    // General Info
    weight: "178 g (6.28 oz)",
    dimensions: "152.2 x 71.8 x 8.9 mm (5.99 x 2.83 x 0.35 in)",
    build_material: "Glass front (Gorilla Glass 3), 3D thermoformed composite back (plastic), aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP67 dust/water resistant (up to 1m for 30 mins)",
    
    // Display Section
    display_type: "OLED, HDR, PWM dimming (~240Hz), ~240Hz Touch Sampling Rate",
    screen_size: "6.1 inches, 90.7 cm2 (~83.0% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels, 20:9 ratio",
    refresh_rate: "60Hz Standard Refresh Rate",
    brightness: "Peak brightness ~876 nits (HBM), 500 nits (typical)",
    hdr: "HDR support",
    protection: "Corning Gorilla Glass 3",
    pixel_density: "~429 ppi",
    
    // Performance Section
    cpu: "Octa-core (2x2.80 GHz Cortex-X1 & 2x2.25 GHz Cortex-A76 & 4x1.80 GHz Cortex-A55)",
    gpu: "Mali-G78 MP20",
    fabrication: "5 nm",
    ram_variants: "6GB LPDDR5",
    storage_variants: "128GB",
    storage_type: "UFS 3.1",
    geekbench_score: "2870 (v5.1)",
    cooling_system: "Graphite thermal pad",
    
    // Primary Camera
    cam_count: "Dual Camera Setup",
    cam_main_sensor: "12.2 MP, f/1.7, 27mm (wide), 1/2.55\", 1.4µm, dual pixel PDAF, OIS",
    cam_ultrawide: "12 MP, f/2.2, 114˚ (ultrawide), 1.25µm",
    cam_telephoto: "No dedicated telephoto",
    cam_macro: "No dedicated macro",
    cam_ois: "OIS + EIS support on main camera",
    cam_flash: "Dual-LED flash, Pixel Shift, Auto-HDR, panorama",
    cam_video: "4K@30/60fps, 1080p@30/60/120/240fps; gyro-EIS, OIS",
    
    // Front Camera
    cam_front_resolution: "8 MP, f/2.0, 24mm (wide), 1.12µm",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Portrait mode supported via AI",
    cam_front_video: "1080p@30fps",
    
    // Battery & Charging
    battery_capacity: "4410 mAh, non-removable",
    charging_wired: "18W wired, PD3.0",
    charging_wireless: "No wireless charging",
    charging_reverse: "No reverse wireless charging",
    charger_included: false,
    usb_type: "USB Type-C 3.1",
    
    // Network & Connectivity
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, dual-band, Wi-Fi Direct",
    bluetooth_version: "5.2, A2DP, LE, aptX HD",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, QZSS, BDS",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "USB Type-C 3.1",
    
    // Sensors & Audio
    sensor_fingerprint: "Under-display (optical)",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: false,
    
    // Software & AI Features
    android_version: "Android 12, upgradable to Android 14",
    ui_version: "Pixel UI",
    update_policy: "3 years of OS and 5 years of security updates",
    ai_features: ["Magic Eraser", "Real Tone", "Face Unblur", "Live Translate", "Call Screen"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Flagship-level Google Tensor chip in a mid-range phone",
      "Excellent point-and-shoot camera quality with Real Tone",
      "Compact and comfortable to hold",
      "IP67 water and dust resistance",
      "Long-term software support (5 years of security updates)"
    ],
    cons: [
      "Display is limited to 60Hz",
      "No wireless charging",
      "Slow 18W charging speed",
      "Plastic back is prone to scratches",
      "No headphone jack or charger in the box"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "Does the Google Pixel 6a have a 120Hz display?",
        answer: "No, the Pixel 6a features a standard 60Hz OLED display, unlike the 90Hz and 120Hz panels on the Pixel 6 and 6 Pro."
      },
      {
        question: "Is the Pixel 6a waterproof?",
        answer: "Yes, it has an IP67 rating, which means it is dust and water-resistant (up to 1m for 30 minutes)."
      },
      {
        question: "Does the Pixel 6a support wireless charging?",
        answer: "No, the Google Pixel 6a does not support wireless charging. It only supports 18W wired charging."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 6a Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 6a — Tensor chip, 12.2MP OIS camera, 6.1\" OLED display, IP67, Magic Eraser, and official price in Bangladesh.",
    meta_keywords: "Google Pixel 6a specs, Pixel 6a price in Bangladesh, Google Pixel 6a review, Google Tensor, 12.2MP camera, Pixel 6a battery life, IP67",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 6a");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 6a");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
