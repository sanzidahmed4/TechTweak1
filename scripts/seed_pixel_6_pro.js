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
    name: "Google Pixel 6 Pro",
    slug: "google-pixel-6-pro",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 85000,
    price_official: null,
    price_unofficial: 85000,
    is_official: false,
    release_date: "2021-10-28",
    is_published: true,
    is_featured: true,
    upcoming: false,
    colors: ["Cloudy White", "Sorta Sunny", "Stormy Black"],
    model_number: "GLU0G, G8VOU",
    made_in: "China/Vietnam",
    phone_variants: "12GB/128GB, 12GB/256GB, 12GB/512GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6-pro-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor (5 nm)",
    camera_highlight: "50MP OIS + 48MP Periscope + 12MP UW",
    display_highlight: "6.7\" LTPO AMOLED, 120Hz",
    battery_highlight: "5003 mAh, 30W Fast Charging",
    benchmark_highlight: "AnTuTu: ~716,000",
    
    // General Info
    weight: "210 g (7.41 oz)",
    dimensions: "163.9 x 75.9 x 8.9 mm (6.45 x 2.99 x 0.35 in)",
    build_material: "Glass front (Gorilla Glass Victus), glass back (Gorilla Glass Victus), aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 mins)",
    
    // Display Section
    display_type: "LTPO AMOLED, 120Hz, HDR10+, PWM dimming (~360Hz), ~240Hz Touch Sampling Rate",
    screen_size: "6.7 inches, 110.5 cm2 (~88.8% screen-to-body ratio)",
    resolution: "1440 x 3120 pixels, 19.5:9 ratio",
    refresh_rate: "120Hz LTPO Adaptive (10Hz-120Hz)",
    brightness: "Peak brightness ~860 nits (HBM), 500 nits (typical)",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass Victus",
    pixel_density: "~512 ppi",
    
    // Performance Section
    cpu: "Octa-core (2x2.80 GHz Cortex-X1 & 2x2.25 GHz Cortex-A76 & 4x1.80 GHz Cortex-A55)",
    gpu: "Mali-G78 MP20",
    fabrication: "5 nm",
    ram_variants: "12GB LPDDR5",
    storage_variants: "128GB, 256GB, 512GB",
    storage_type: "UFS 3.1",
    geekbench_score: "2830 (v5.1)",
    cooling_system: "Advanced graphite layers (No vapor chamber)",
    
    // Primary Camera
    cam_count: "Triple Camera Setup",
    cam_main_sensor: "50 MP, f/1.9, 25mm (wide), 1/1.31\", 1.2µm, Dual Pixel PDAF, Laser AF, OIS",
    cam_ultrawide: "12 MP, f/2.2, 114˚ (ultrawide), 1.25µm",
    cam_telephoto: "48 MP, f/3.5, 104mm (telephoto), 1/2.0\", 0.8µm, PDAF, OIS, 4x optical zoom",
    cam_macro: "No dedicated macro",
    cam_ois: "OIS + EIS support on main and telephoto cameras",
    cam_flash: "Dual-LED flash, Pixel Shift, Auto-HDR, panorama",
    cam_video: "4K@30/60fps, 1080p@30/60/120/240fps; gyro-EIS, OIS",
    
    // Front Camera
    cam_front_resolution: "11.1 MP, f/2.2, 20mm (ultrawide), 1.22µm",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Portrait mode supported via AI",
    cam_front_video: "4K@30fps, 1080p@30/60fps",
    
    // Battery & Charging
    battery_capacity: "5003 mAh, non-removable",
    charging_wired: "30W wired, PD3.0, 50% in 30 min (advertised)",
    charging_wireless: "23W wireless",
    charging_reverse: "Reverse wireless charging",
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
    android_version: "Android 12, upgradable to Android 15",
    ui_version: "Pixel UI",
    update_policy: "3 years of OS and 5 years of security updates",
    ai_features: ["Magic Eraser", "Real Tone", "Face Unblur", "Live Translate", "Call Screen"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Stunning 120Hz LTPO AMOLED curved display",
      "Incredible camera array with 4x optical periscope zoom",
      "Google Tensor chip with advanced AI and ML features",
      "Supports Ultra Wideband (UWB)",
      "Premium Gorilla Glass Victus build on front and back"
    ],
    cons: [
      "Under-display fingerprint sensor is a bit slow",
      "Quite large and heavy at 210g",
      "Charging speed peaks around 22W despite 30W adapter support",
      "Curved edges can cause accidental touches",
      "No charger included in the box"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "Does the Google Pixel 6 Pro have Ultra Wideband (UWB)?",
        answer: "Yes, unlike the standard Pixel 6, the Pixel 6 Pro includes an Ultra Wideband (UWB) chip for precise spatial awareness and sharing."
      },
      {
        question: "What is the optical zoom on the Pixel 6 Pro?",
        answer: "The Pixel 6 Pro features a dedicated 48MP telephoto lens with 4x optical zoom and up to 20x Super Res Zoom."
      },
      {
        question: "Is the display on the Pixel 6 Pro curved?",
        answer: "Yes, the Pixel 6 Pro has a curved edge display, while the standard Pixel 6 has a flat display."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 6 Pro Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 6 Pro — Tensor chip, 50MP + 48MP Telephoto camera, 6.7\" 120Hz LTPO AMOLED display, and official price in Bangladesh.",
    meta_keywords: "Google Pixel 6 Pro specs, Pixel 6 Pro price in Bangladesh, Google Pixel 6 Pro review, Google Tensor, 48MP Telephoto, Pixel 6 Pro battery life, LTPO 120Hz",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 6 Pro");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 6 Pro");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
