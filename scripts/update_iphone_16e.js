require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  const updatedData = {
    price_bdt: 85000,
    price_official: 85000,
    price_unofficial: 70000,
    is_official: true,
    release_date: "2025-02-28",
    colors: ["Black", "White", "Blue"],
    phone_variants: "128GB/8GB, 256GB/8GB, 512GB/8GB",
    chipset_highlight: "Apple A18 (3nm)",
    camera_highlight: "48MP Fusion Camera with OIS",
    display_highlight: "6.1\" Super Retina XDR OLED, Dolby Vision",
    battery_highlight: "4005 mAh Battery with USB-C",
    benchmark_highlight: "AnTuTu: ~1.6M / Geekbench Single: ~3,100, Multi: ~7,400",
    
    // Fallbacks
    display: "6.1 inches Super Retina XDR OLED, 60Hz, Dolby Vision",
    processor: "Apple A18 (3nm) Hexa-core",
    ram: "8 GB",
    storage: "128 GB, 256 GB, 512 GB",
    camera_main: "48 MP, f/1.6, OIS, dual pixel PDAF",
    camera_front: "12 MP, f/1.9, PDAF, HDR",
    camera_video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps",
    battery: "4005 mAh Lithium-Ion",
    charging: "PD2.0 Wired (50% in 30 mins) / 15W Wireless (Qi2)",
    network: "5G, 4G LTE, 3G, 2G",
    antutu_score: 1600000,

    // General Information
    weight: "167 g (5.89 oz)",
    dimensions: "146.7 x 71.5 x 7.8 mm (5.78 x 2.81 x 0.31 in)",
    build_material: "Glass front (Ceramic Shield), glass back, aluminum frame",
    sim_type: "eSIM / Nano-SIM (Dual eSIM or Nano-SIM with eSIM)",
    water_resistance: "IP68 dust/water resistant (up to 6m for 30 mins)",

    // Display Section
    display_type: "Super Retina XDR OLED, HDR10, Dolby Vision",
    screen_size: "6.1 inches, ~86.0% screen-to-body ratio",
    resolution: "1170 x 2532 pixels, 19.5:9 ratio (~460 ppi density)",
    refresh_rate: "60 Hz",
    brightness: "800 nits (typical), 1200 nits (peak brightness)",
    hdr: "HDR10, Dolby Vision",
    protection: "Ceramic Shield glass (latest generation)",
    pixel_density: "~460 ppi",

    // Performance Section
    cpu: "Hexa-core (2x3.89 GHz + 4x2.11 GHz)",
    gpu: "Apple GPU (4-core graphics)",
    fabrication: "3 nm",
    ram_variants: "8 GB LPDDR5X",
    storage_variants: "128 GB, 256 GB, 512 GB",
    storage_type: "NVMe",
    geekbench_score: "Single-Core: ~3,100 / Multi-Core: ~7,400 (Geekbench 6)",
    cooling_system: "Graphene-based thermal structure",

    // Primary Camera
    cam_count: "Single Camera",
    cam_main_sensor: "48 MP, f/1.6, 26mm (wide), 1/1.56\", 1.0µm, dual pixel PDAF, sensor-shift OIS",
    cam_ultrawide: "None",
    cam_telephoto: "12 MP (2x digital zoom crop from main 48MP sensor)",
    cam_macro: "None",
    cam_ois: "Yes (Sensor-shift OIS)",
    cam_flash: "Dual-LED dual-tone flash",
    cam_video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, HDR, Dolby Vision HDR (up to 60fps), stereo sound rec.",

    // Front Camera
    cam_front_resolution: "12 MP, f/1.9, 23mm (wide), 1/3.6\", PDAF",
    cam_front_hdr: "HDR, Cinematic mode (4K@30fps)",
    cam_front_portrait: "Yes (with advanced bokeh and Depth Control)",
    cam_front_video: "4K@24/25/30/60fps, 1080p@25/30/60/120fps, gyro-EIS",

    // Battery & Charging
    battery_capacity: "4005 mAh",
    charging_wired: "PD2.0 fast charging, 50% in 30 min (advertised)",
    charging_wireless: "15W wireless (Qi2) / 7.5W wireless (Qi)",
    charging_reverse: "None",
    charger_included: false,
    usb_type: "Type-C (USB 2.0)",

    // Network & Connectivity
    has_5g: true,
    wifi_version: "Wi-Fi 6 (802.11 ax) with 2x2 MIMO",
    bluetooth_version: "5.3, A2DP, LE",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "USB 2.0 (up to 480 Mb/s)",

    // Sensors
    sensor_fingerprint: "Face ID (notch-based)",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,

    // Software & AI Features
    android_version: "iOS 18.3 (upgradable to iOS 19+)",
    ui_version: "iOS 18",
    update_policy: "Minimum 5-7 years of software updates",
    ai_features: [
      "Apple Intelligence (System-wide Writing Tools)",
      "Siri with rich language understanding and on-screen awareness",
      "Image Playground and Genmoji generation",
      "Clean Up tool in Photos app",
      "Notification Summaries and Priority Messages"
    ],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,

    // Pros & Cons
    pros: [
      "Ultra-powerful Apple A18 (3nm) chipset",
      "Full support for Apple Intelligence AI features with 8GB RAM",
      "IP68 dust and water resistance (up to 6m for 30 mins)",
      "Vibrant 6.1-inch Super Retina XDR OLED screen",
      "Excellent 48MP main camera with sensor-shift OIS",
      "Premium Ceramic Shield front and aluminum build quality"
    ],
    cons: [
      "Screen is limited to a 60Hz refresh rate",
      "Lacks an ultra-wide camera and dedicated telephoto lens",
      "Does not support Apple MagSafe magnetic accessories",
      "Wired charger adapter is not included in the box"
    ],

    // FAQs
    faqs: [
      {
        question: "Does the iPhone 16e support Apple Intelligence?",
        answer: "Yes, fully! The iPhone 16e features 8GB of RAM and the advanced Apple A18 (3nm) chip, allowing it to run all Apple Intelligence generative AI features locally and smoothly."
      },
      {
        question: "Does it support MagSafe?",
        answer: "No, the iPhone 16e does not feature MagSafe magnetic charging. However, it still supports standard Qi and Qi2 wireless charging up to 15W."
      },
      {
        question: "What is the screen refresh rate of the iPhone 16e?",
        answer: "The iPhone 16e has a standard 60Hz screen refresh rate."
      },
      {
        question: "Is the charging adapter included in the retail box?",
        answer: "No, the retail box only contains the iPhone 16e and a USB-C charging cable. The wall charger is sold separately."
      }
    ],

    // SEO
    meta_title: "Apple iPhone 16e Price in Bangladesh & Full Specifications",
    meta_description: "Get the full specifications of Apple iPhone 16e including price in Bangladesh, A18 3nm chipset, 48MP camera, OLED display, 8GB RAM, and Apple Intelligence features.",
    meta_keywords: "iPhone 16e, iPhone 16e specs, iPhone 16e price in Bangladesh, Apple 16e specifications, A18 iPhone, budget iPhone 16"
  };

  const result = await Phone.findOneAndUpdate(
    { slug: "iphone-16e" },
    { $set: updatedData },
    { new: true }
  );

  if (result) {
    console.log("Successfully updated iPhone 16e specifications!");
    console.log(`Updated phone name: ${result.name}`);
  } else {
    console.log("Failed to find and update iPhone 16e!");
  }

  await mongoose.disconnect();
}

run().catch(e => console.error(e));
