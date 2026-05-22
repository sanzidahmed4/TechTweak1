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
    name: "Google Pixel 7a",
    slug: "google-pixel-7a",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 48000,
    price_official: null,
    price_unofficial: 48000,
    is_official: false,
    release_date: "2023-05-10",
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Charcoal", "Snow", "Sea", "Coral"],
    model_number: "GWKK3, GHL1X, G0DZQ, G82U8",
    made_in: "China/Vietnam/India",
    phone_variants: "8GB/128GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-7a-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor G2 (5 nm)",
    camera_highlight: "64MP OIS + 13MP Ultrawide",
    display_highlight: "6.1\" OLED, 90Hz",
    battery_highlight: "4385 mAh, 18W Fast Charging",
    benchmark_highlight: "AnTuTu: ~765,000",
    
    // General Info
    weight: "193.5 g (6.84 oz)",
    dimensions: "152 x 72.9 x 9 mm (5.98 x 2.87 x 0.35 in)",
    build_material: "Glass front (Gorilla Glass 3), aluminum frame, plastic back",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP67 dust/water resistant (up to 1m for 30 mins)",
    
    // Display Section
    display_type: "OLED, HDR, PWM dimming (~360Hz), Touch Sampling Rate ~180Hz",
    screen_size: "6.1 inches, 90.7 cm2 (~81.8% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels, 20:9 ratio",
    refresh_rate: "90Hz Smooth Display",
    brightness: "Peak brightness ~1000 nits",
    hdr: "HDR support",
    protection: "Corning Gorilla Glass 3",
    pixel_density: "~429 ppi",
    
    // Performance Section
    cpu: "Octa-core (2x2.85 GHz Cortex-X1 & 2x2.35 GHz Cortex-A78 & 4x1.80 GHz Cortex-A55)",
    gpu: "Mali-G710 MP7",
    fabrication: "5 nm",
    ram_variants: "8GB LPDDR5",
    storage_variants: "128GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3180 (v5.1)",
    cooling_system: "Graphite thermal pad",
    
    // Primary Camera
    cam_count: "Dual Camera Setup",
    cam_main_sensor: "64 MP, f/1.9, 26mm (wide), 1/1.73\", 0.8µm, Dual Pixel PDAF, OIS",
    cam_ultrawide: "13 MP, f/2.2, 120˚ (ultrawide), 1.12µm",
    cam_telephoto: "No dedicated telephoto",
    cam_macro: "No dedicated macro",
    cam_ois: "OIS + EIS support on main camera",
    cam_flash: "Dual-LED flash, Pixel Shift, Auto-HDR, panorama",
    cam_video: "4K@30/60fps, 1080p@30/60/120/240fps; gyro-EIS, OIS",
    
    // Front Camera
    cam_front_resolution: "13 MP, f/2.2, 20mm (ultrawide), 1.12µm",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Portrait mode supported via AI",
    cam_front_video: "4K@30fps, 1080p@30fps",
    
    // Battery & Charging
    battery_capacity: "4385 mAh, non-removable",
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
    android_version: "Android 13, upgradable to Android 15",
    ui_version: "Pixel UI",
    update_policy: "3 years of OS and 5 years of security updates",
    ai_features: ["Photo Unblur", "Magic Eraser", "Real Tone", "Call Screen", "Clear Calling"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Significant camera upgrade with a new 64MP sensor",
      "Addition of wireless charging to the A-series",
      "Display finally upgraded to 90Hz",
      "Uses the same Tensor G2 chip as the flagship Pixel 7 series",
      "Includes Face Unlock"
    ],
    cons: [
      "Thick display bezels compared to competitors",
      "Charging speed is still very slow at 18W",
      "Wireless charging is slow at 7.5W",
      "Battery life is relatively average",
      "No charger in the box"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "Does the Google Pixel 7a have a 90Hz display?",
        answer: "Yes, the Pixel 7a is the first A-series Pixel to feature a 90Hz Smooth Display, a significant upgrade over the 60Hz display of the Pixel 6a."
      },
      {
        question: "Does the Pixel 7a support wireless charging?",
        answer: "Yes, it supports 7.5W wireless charging, which is another first for the Pixel A-series."
      },
      {
        question: "Is the Pixel 7a waterproof?",
        answer: "It has an IP67 rating, meaning it is dust and water-resistant (up to 1m for 30 minutes)."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 7a Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 7a — Tensor G2 chip, 64MP OIS camera, 6.1\" 90Hz OLED display, Wireless Charging, and official price in Bangladesh.",
    meta_keywords: "Google Pixel 7a specs, Pixel 7a price in Bangladesh, Google Pixel 7a review, Google Tensor G2, 64MP camera, Pixel 7a battery, 90Hz OLED, wireless charging",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 7a");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 7a");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
