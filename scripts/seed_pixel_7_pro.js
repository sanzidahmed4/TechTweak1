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
    name: "Google Pixel 7 Pro",
    slug: "google-pixel-7-pro",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 85000,
    price_official: null,
    price_unofficial: 85000,
    is_official: false,
    release_date: "2022-10-13",
    is_published: true,
    is_featured: true,
    upcoming: false,
    colors: ["Obsidian", "Snow", "Hazel"],
    model_number: "GE2AE, GFE4J",
    made_in: "China/Vietnam",
    phone_variants: "8GB/128GB, 12GB/128GB, 12GB/256GB, 12GB/512GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-7-pro-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor G2 (5 nm)",
    camera_highlight: "50MP OIS + 48MP Periscope + 12MP UW",
    display_highlight: "6.7\" LTPO AMOLED, 120Hz",
    battery_highlight: "5000 mAh, 23W Fast Charging",
    benchmark_highlight: "AnTuTu: ~814,000",
    
    // General Info
    weight: "212 g (7.48 oz)",
    dimensions: "162.9 x 76.6 x 8.9 mm (6.41 x 3.02 x 0.35 in)",
    build_material: "Glass front (Gorilla Glass Victus), glass back (Gorilla Glass Victus), polished aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 mins)",
    
    // Display Section
    display_type: "LTPO AMOLED, 120Hz, HDR10+, PWM dimming (~240Hz), ~180Hz Touch Sampling Rate",
    screen_size: "6.7 inches, 110.6 cm2 (~88.7% screen-to-body ratio)",
    resolution: "1440 x 3120 pixels, 19.5:9 ratio",
    refresh_rate: "120Hz LTPO Adaptive (10Hz-120Hz)",
    brightness: "Peak brightness ~1500 nits, 1000 nits (HBM)",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass Victus",
    pixel_density: "~512 ppi",
    
    // Performance Section
    cpu: "Octa-core (2x2.85 GHz Cortex-X1 & 2x2.35 GHz Cortex-A78 & 4x1.80 GHz Cortex-A55)",
    gpu: "Mali-G710 MP7",
    fabrication: "5 nm",
    ram_variants: "8GB, 12GB LPDDR5",
    storage_variants: "128GB, 256GB, 512GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3149 (v5.1)",
    cooling_system: "Advanced graphite layers",
    
    // Primary Camera
    cam_count: "Triple Camera Setup",
    cam_main_sensor: "50 MP, f/1.9, 25mm (wide), 1/1.31\", 1.2µm, multi-directional PDAF, Laser AF, OIS",
    cam_ultrawide: "12 MP, f/2.2, 126˚ (ultrawide), 1/2.9\", 1.25µm, AF",
    cam_telephoto: "48 MP, f/3.5, 120mm (telephoto), 1/2.55\", 0.7µm, multi-directional PDAF, OIS, 5x optical zoom",
    cam_macro: "Dedicated Macro Focus (via Ultrawide AF)",
    cam_ois: "OIS + EIS support on main and telephoto cameras",
    cam_flash: "Dual-LED flash, Pixel Shift, Auto-HDR, panorama",
    cam_video: "4K@30/60fps, 1080p@30/60/120/240fps; gyro-EIS, OIS, 10-bit HDR",
    
    // Front Camera
    cam_front_resolution: "10.8 MP, f/2.2, 21mm (ultrawide), 1/3.1\", 1.22µm",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Portrait mode supported via AI",
    cam_front_video: "4K@30/60fps, 1080p@30/60fps",
    
    // Battery & Charging
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "23W wired, PD3.0, 50% in 30 min (advertised)",
    charging_wireless: "23W wireless",
    charging_reverse: "Reverse wireless charging",
    charger_included: false,
    usb_type: "USB Type-C 3.2",
    
    // Network & Connectivity
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band, Wi-Fi Direct",
    bluetooth_version: "5.2, A2DP, LE, aptX HD",
    has_nfc: true,
    gps_specs: "GPS (L1+L5), GLONASS (G1), BDS (B1I+B1c+B2a), GALILEO (E1+E5a), QZSS (L1+L5)",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "USB Type-C 3.2",
    
    // Sensors & Audio
    sensor_fingerprint: "Under-display (optical)",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true, // Reintroduced in Pixel 7 series
    
    // Software & AI Features
    android_version: "Android 13, upgradable to Android 15",
    ui_version: "Pixel UI",
    update_policy: "3 years of OS and 5 years of security updates",
    ai_features: ["Photo Unblur", "Cinematic Blur", "Macro Focus", "Magic Eraser", "Real Tone", "Live Translate", "Clear Calling"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Exceptional camera system with 5x optical zoom and Macro Focus",
      "Stunning 120Hz LTPO AMOLED display with 1500 nits peak brightness",
      "Tensor G2 chip enables incredible AI features like Photo Unblur",
      "Premium polished aluminum and glass design",
      "Includes Ultra Wideband (UWB) support"
    ],
    cons: [
      "Large and relatively heavy at 212g",
      "Charging speed is capped at 23W, slower than most competitors",
      "Curved display might lead to accidental touches for some users",
      "No charger included in the box"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "Does the Google Pixel 7 Pro have Ultra Wideband (UWB)?",
        answer: "Yes, the Pixel 7 Pro includes an Ultra Wideband (UWB) chip, which the standard Pixel 7 does not have."
      },
      {
        question: "What is the optical zoom range on the Pixel 7 Pro?",
        answer: "The Pixel 7 Pro features a dedicated 48MP telephoto lens with 5x optical zoom and up to 30x Super Res Zoom."
      },
      {
        question: "Does the Pixel 7 Pro support Macro photography?",
        answer: "Yes, it uses the upgraded 12MP ultrawide camera with autofocus to enable a dedicated 'Macro Focus' mode for extreme close-up shots."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 7 Pro Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 7 Pro — Tensor G2 chip, 50MP + 48MP Telephoto camera, 6.7\" 120Hz LTPO AMOLED, UWB, and official price in Bangladesh.",
    meta_keywords: "Google Pixel 7 Pro specs, Pixel 7 Pro price in Bangladesh, Google Pixel 7 Pro review, Google Tensor G2, 5x optical zoom, Pixel 7 Pro battery, LTPO AMOLED",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 7 Pro");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 7 Pro");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
