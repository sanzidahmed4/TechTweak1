require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  const updatedData = {
    price_bdt: 52000,
    price_official: 52000,
    price_unofficial: 45000,
    is_official: true,
    release_date: "2022-03-18",
    colors: ["Midnight", "Starlight", "Product Red"],
    phone_variants: "64GB/4GB, 128GB/4GB, 256GB/4GB",
    chipset_highlight: "Apple A15 Bionic (5nm)",
    camera_highlight: "12MP Camera with OIS",
    display_highlight: "4.7\" Retina HD IPS Display",
    battery_highlight: "2018 mAh Battery with Qi Wireless Charging",
    benchmark_highlight: "AnTuTu: ~700k / Geekbench Single: ~1,700, Multi: ~4,200",
    
    // Fallbacks
    display: "4.7 inches Retina IPS LCD, 60Hz, 625 nits typical",
    processor: "Apple A15 Bionic (5nm) Hexa-core",
    ram: "4 GB",
    storage: "64 GB, 128 GB, 256 GB",
    camera_main: "12 MP, f/1.8, OIS, PDAF",
    camera_front: "7 MP, f/2.2, HDR",
    camera_video: "4K@24/30/60fps, 1080p@30/60/120/240fps",
    battery: "2018 mAh Lithium-Ion",
    charging: "20W wired fast charging (50% in 30 mins) / 7.5W wireless (Qi)",
    network: "5G, 4G LTE, 3G, 2G",
    antutu_score: 700000,

    // General Information
    weight: "144 g (5.08 oz)",
    dimensions: "138.4 x 67.3 x 7.3 mm (5.45 x 2.65 x 0.29 in)",
    build_material: "Glass front, glass back, aluminum frame",
    sim_type: "Nano-SIM and eSIM or Dual eSIM",
    water_resistance: "IP67 dust/water resistant (up to 1m for 30 mins)",

    // Display Section
    display_type: "Retina IPS LCD, 625 nits (typical)",
    screen_size: "4.7 inches, ~65.4% screen-to-body ratio",
    resolution: "750 x 1334 pixels, 16:9 ratio (~326 ppi density)",
    refresh_rate: "60 Hz",
    brightness: "625 nits typical brightness",
    hdr: "HDR10, Dolby Vision",
    protection: "Ion-strengthened glass, oleophobic coating",
    pixel_density: "~326 ppi",

    // Performance Section
    cpu: "Hexa-core (2x3.23 GHz Avalanche + 4x1.82 GHz Blizzard)",
    gpu: "Apple GPU (4-core graphics)",
    fabrication: "5 nm (TSMC)",
    ram_variants: "4 GB LPDDR4X",
    storage_variants: "64 GB, 128 GB, 256 GB",
    storage_type: "NVMe",
    geekbench_score: "Single-Core: ~1,700 / Multi-Core: ~4,200 (Geekbench 5)",
    cooling_system: "Standard passive heat dissipation",

    // Primary Camera
    cam_count: "Single Camera",
    cam_main_sensor: "12 MP, f/1.8 (wide), PDAF, OIS",
    cam_ultrawide: "None",
    cam_telephoto: "None (Digital zoom up to 5x)",
    cam_macro: "None",
    cam_ois: "Yes (Optical Image Stabilization)",
    cam_flash: "Quad-LED dual-tone flash with Slow Sync",
    cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps, HDR, OIS, stereo sound rec.",

    // Front Camera
    cam_front_resolution: "7 MP, f/2.2",
    cam_front_hdr: "HDR, Portrait Lighting",
    cam_front_portrait: "Yes (with advanced bokeh and Depth Control)",
    cam_front_video: "1080p@30/120fps, gyro-EIS",

    // Battery & Charging
    battery_capacity: "2018 mAh",
    charging_wired: "20W wired fast charging, 50% in 30 min (advertised)",
    charging_wireless: "7.5W wireless (Qi)",
    charging_reverse: "None",
    charger_included: false,
    usb_type: "Lightning (USB 2.0)",

    // Network & Connectivity
    has_5g: true,
    wifi_version: "Wi-Fi 6 (802.11 ax) with 2x2 MIMO",
    bluetooth_version: "5.0, A2DP, LE",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "USB 2.0 (up to 480 Mb/s)",

    // Sensors
    sensor_fingerprint: "Touch ID (front-mounted fingerprint sensor inside Home button)",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: false,

    // Software & AI Features
    android_version: "iOS 15.4 (upgradable to latest iOS versions)",
    ui_version: "iOS 15",
    update_policy: "Minimum 5-7 years of software updates",
    ai_features: [
      "Siri (On-device dictation & smart suggestions)",
      "Live Text (Recognize text inside images)",
      "Visual Look Up (Identify plants, pets, and landmarks in Photos)",
      "Dictation & offline transcription"
    ],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: true,
    has_ai_assistant: true,

    // Pros & Cons
    pros: [
      "Extremely fast and powerful Apple A15 Bionic chip",
      "Very compact, lightweight, and easy to use one-handed",
      "Premium glass front/back and solid aluminum frame build",
      "5G network support makes it future-proof",
      "Reliable 12MP main camera with optical stabilization (OIS)",
      "IP67 water and dust resistance rating"
    ],
    cons: [
      "Outdated screen design with very thick top/bottom bezels",
      "4.7-inch display feels extremely small in modern standards",
      "Very small battery capacity (2018 mAh) limits heavy usage",
      "Does not support modern Apple Intelligence AI features"
    ],

    // FAQs
    faqs: [
      {
        question: "Does the iPhone SE (3rd Gen) support Apple Intelligence?",
        answer: "No, the iPhone SE (3rd generation) only has 4GB of RAM, which is below the 8GB minimum system requirement for Apple Intelligence. It supports standard iOS smart features like Live Text and offline Siri."
      },
      {
        question: "Does it support 5G network?",
        answer: "Yes, it is fully compatible with 5G networks, offering extremely high-speed connectivity."
      },
      {
        question: "Is there a headphone jack in the iPhone SE (2022)?",
        answer: "No, it does not have a 3.5mm headphone jack. You will need to use wireless Bluetooth headphones (like AirPods) or a Lightning-to-3.5mm adapter."
      },
      {
        question: "Does it support wireless charging?",
        answer: "Yes, it supports standard Qi wireless charging up to 7.5W. However, it does not support Apple's magnetic MagSafe charger."
      }
    ],

    // SEO
    meta_title: "Apple iPhone SE (3rd generation) Price in Bangladesh & Specs",
    meta_description: "Get the full specifications of Apple iPhone SE (3rd generation, 2022) including price in Bangladesh, A15 Bionic chip, 5G support, Retina display, and Touch ID.",
    meta_keywords: "iPhone SE 3rd gen, iPhone SE 2022, iPhone SE 3 price in Bangladesh, iPhone SE 3 specifications, A15 Bionic iPhone, compact iPhone"
  };

  const result = await Phone.findOneAndUpdate(
    { slug: "iphone-se-2022" },
    { $set: updatedData },
    { new: true }
  );

  if (result) {
    console.log("Successfully updated iPhone SE (3rd generation) specifications!");
    console.log(`Updated phone name: ${result.name}`);
  } else {
    console.log("Failed to find and update iPhone SE (3rd generation)!");
  }

  await mongoose.disconnect();
}

run().catch(e => console.error(e));
