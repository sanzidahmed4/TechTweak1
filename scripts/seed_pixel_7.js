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
    name: "Google Pixel 7",
    slug: "google-pixel-7",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 58000,
    price_official: null,
    price_unofficial: 58000,
    is_official: false,
    release_date: "2022-10-13",
    is_published: true,
    is_featured: true,
    upcoming: false,
    colors: ["Obsidian", "Lemongrass", "Snow"],
    model_number: "GVU6C, GQML3",
    made_in: "China/Vietnam",
    phone_variants: "8GB/128GB, 8GB/256GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-7-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor G2 (5 nm)",
    camera_highlight: "50MP OIS + 12MP Ultrawide",
    display_highlight: "6.3\" AMOLED, 90Hz",
    battery_highlight: "4355 mAh, 20W Fast Charging",
    benchmark_highlight: "AnTuTu: ~810,000",
    
    // General Info
    weight: "197 g (6.95 oz)",
    dimensions: "155.6 x 73.2 x 8.7 mm (6.13 x 2.88 x 0.34 in)",
    build_material: "Glass front (Gorilla Glass Victus), glass back (Gorilla Glass Victus), matte aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 mins)",
    
    // Display Section
    display_type: "AMOLED, HDR10+, PWM dimming (~360Hz), ~180Hz Touch Sampling Rate",
    screen_size: "6.3 inches, 96.7 cm2 (~84.9% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels, 20:9 ratio",
    refresh_rate: "90Hz Smooth Display",
    brightness: "Peak brightness ~1400 nits, 1000 nits (HBM)",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass Victus",
    pixel_density: "~416 ppi",
    
    // Performance Section
    cpu: "Octa-core (2x2.85 GHz Cortex-X1 & 2x2.35 GHz Cortex-A78 & 4x1.80 GHz Cortex-A55)",
    gpu: "Mali-G710 MP7",
    fabrication: "5 nm",
    ram_variants: "8GB LPDDR5",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3187 (v5.1)",
    cooling_system: "Advanced graphite layers",
    
    // Primary Camera
    cam_count: "Dual Camera Setup",
    cam_main_sensor: "50 MP, f/1.9, 25mm (wide), 1/1.31\", 1.2µm, multi-directional PDAF, Laser AF, OIS",
    cam_ultrawide: "12 MP, f/2.2, 114˚ (ultrawide), 1/2.9\", 1.25µm",
    cam_telephoto: "No dedicated telephoto",
    cam_macro: "No dedicated macro",
    cam_ois: "OIS + EIS support on main camera",
    cam_flash: "Dual-LED flash, Pixel Shift, Auto-HDR, panorama",
    cam_video: "4K@30/60fps, 1080p@30/60/120/240fps; gyro-EIS, OIS, 10-bit HDR",
    
    // Front Camera
    cam_front_resolution: "10.8 MP, f/2.2, 21mm (ultrawide), 1/3.1\", 1.22µm",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Portrait mode supported via AI",
    cam_front_video: "4K@30/60fps, 1080p@30/60fps",
    
    // Battery & Charging
    battery_capacity: "4355 mAh, non-removable",
    charging_wired: "20W wired, PD3.0, 50% in 30 min (advertised)",
    charging_wireless: "20W wireless",
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
    has_face_unlock: true, // Reintroduced in Pixel 7
    
    // Software & AI Features
    android_version: "Android 13, upgradable to Android 15",
    ui_version: "Pixel UI",
    update_policy: "3 years of OS and 5 years of security updates",
    ai_features: ["Photo Unblur", "Cinematic Blur", "Magic Eraser", "Real Tone", "Live Translate"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Refined and premium design with matte aluminum frame",
      "Face Unlock makes a welcome return",
      "Google Tensor G2 chip improves AI processing and thermal management",
      "Excellent point-and-shoot camera capabilities with Photo Unblur",
      "Bright 1400-nit OLED display"
    ],
    cons: [
      "Display is still 90Hz, not 120Hz like competitors",
      "Charging speed is relatively slow (20W)",
      "No dedicated telephoto lens (exclusive to Pro model)",
      "Battery life is average due to smaller capacity (4355 mAh)",
      "No charger in the box"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "Does the Google Pixel 7 have Face Unlock?",
        answer: "Yes, the Google Pixel 7 reintroduces Face Unlock alongside the under-display fingerprint sensor."
      },
      {
        question: "Is the Pixel 7 display 120Hz?",
        answer: "No, the Pixel 7 has a 90Hz AMOLED display. Only the Pixel 7 Pro features a 120Hz display."
      },
      {
        question: "What is Photo Unblur on the Pixel 7?",
        answer: "Photo Unblur is an AI feature exclusive to the Tensor G2 chip that can sharpen blurry faces and images, even older photos taken on other devices."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 7 Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 7 — Tensor G2 chip, 50MP camera, 6.3\" 90Hz AMOLED display, Photo Unblur, and official price in Bangladesh.",
    meta_keywords: "Google Pixel 7 specs, Pixel 7 price in Bangladesh, Google Pixel 7 review, Google Tensor G2, 50MP camera, Photo Unblur, IP68",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 7");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 7");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
