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
    name: "Google Pixel 6",
    slug: "google-pixel-6",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 60000,
    price_official: null,
    price_unofficial: 60000,
    is_official: false,
    release_date: "2021-10-28",
    is_published: true,
    is_featured: true,
    upcoming: false,
    colors: ["Sorta Seafoam", "Kinda Coral", "Stormy Black"],
    model_number: "GR1YH, GB7N6",
    made_in: "China/Vietnam",
    phone_variants: "8GB/128GB, 8GB/256GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Google Tensor (5 nm)",
    camera_highlight: "50MP OIS + 12MP Ultrawide",
    display_highlight: "6.4\" AMOLED, 90Hz",
    battery_highlight: "4614 mAh, 30W Fast Charging",
    benchmark_highlight: "AnTuTu: ~723,000",
    
    // General Info
    weight: "207 g (7.30 oz)",
    dimensions: "158.6 x 74.8 x 8.9 mm (6.24 x 2.94 x 0.35 in)",
    build_material: "Glass front (Gorilla Glass Victus), glass back (Gorilla Glass 6), aluminum frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 mins)",
    
    // Display Section
    display_type: "AMOLED, HDR10+, PWM dimming (~360Hz), ~240Hz Touch Sampling Rate",
    screen_size: "6.4 inches, 98.9 cm2 (~83.4% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels, 20:9 ratio",
    refresh_rate: "90Hz Smooth Display",
    brightness: "Peak brightness ~850 nits (HBM), 470 nits (typical)",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass Victus",
    pixel_density: "~411 ppi",
    
    // Performance Section
    cpu: "Octa-core (2x2.80 GHz Cortex-X1 & 2x2.25 GHz Cortex-A76 & 4x1.80 GHz Cortex-A55)",
    gpu: "Mali-G78 MP20",
    fabrication: "5 nm",
    ram_variants: "8GB LPDDR5",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "2876 (v5.1)",
    cooling_system: "Advanced graphite layers (No vapor chamber)",
    
    // Primary Camera
    cam_count: "Dual Camera Setup",
    cam_main_sensor: "50 MP, f/1.9, 25mm (wide), 1/1.31\", 1.2µm, Dual Pixel PDAF, Laser AF, OIS",
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
    battery_capacity: "4614 mAh, non-removable",
    charging_wired: "30W wired, PD3.0, 50% in 30 min (advertised)",
    charging_wireless: "21W wireless",
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
      "Unique standout design with bold colors",
      "Google Tensor chip introduces incredible AI capabilities",
      "Massive camera upgrade to 50MP sensor",
      "Great battery life",
      "5 years of security updates"
    ],
    cons: [
      "Under-display fingerprint sensor is relatively slow",
      "No telephoto lens (exclusive to Pro model)",
      "Quite heavy at 207g",
      "Charging speed is slower than advertised 30W peak",
      "No charger included in the box"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "Does the Google Pixel 6 come with a charger in the box?",
        answer: "No, Google removed the charger from the box starting with the Pixel 6 series. You only get a USB-C to USB-C cable."
      },
      {
        question: "Is the Pixel 6 waterproof?",
        answer: "Yes, the Pixel 6 has an IP68 rating, making it dust and water-resistant (up to 1.5m for 30 minutes)."
      },
      {
        question: "What is the Magic Eraser feature?",
        answer: "Magic Eraser is an AI tool in Google Photos that lets you instantly remove photobombers and unwanted objects from the background of your pictures."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 6 Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 6 — Tensor chip, 50MP OIS camera, 6.4\" AMOLED 90Hz display, Magic Eraser, and official price in Bangladesh.",
    meta_keywords: "Google Pixel 6 specs, Pixel 6 price in Bangladesh, Google Pixel 6 review, Google Tensor, 50MP camera, Pixel 6 battery life, IP68",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 6");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 6");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
