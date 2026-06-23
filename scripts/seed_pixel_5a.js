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
    name: "Google Pixel 5a 5G",
    slug: "google-pixel-5a-5g",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 45000,
    price_official: null,
    price_unofficial: 45000,
    is_official: false,
    release_date: "2021-08-26",
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Mostly Black"],
    model_number: "G4S1M",
    made_in: "China/Vietnam",
    phone_variants: "6GB/128GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-5a-5g-1.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Snapdragon 765G 5G (7 nm)",
    camera_highlight: "12.2MP OIS + 16MP Ultrawide",
    display_highlight: "6.34\" OLED, 60Hz",
    battery_highlight: "4680 mAh, 18W Fast Charging",
    benchmark_highlight: "AnTuTu: ~322,000",
    
    // General Info
    weight: "183 g (6.46 oz)",
    dimensions: "154.9 x 73.7 x 7.6 mm (6.10 x 2.90 x 0.30 in)",
    build_material: "Glass front (Gorilla Glass 3), aluminum/plastic unibody",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP67 dust/water resistant (up to 1m for 30 mins)",
    
    // Display Section
    display_type: "OLED, HDR, PWM dimming (~240Hz), ~120Hz Touch Sampling Rate",
    screen_size: "6.34 inches, 97.0 cm2 (~85.0% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels, 20:9 ratio",
    refresh_rate: "60Hz Standard Refresh Rate",
    brightness: "Peak brightness ~600-700 nits (HBM), 400 nits (typical)",
    hdr: "HDR support",
    protection: "Corning Gorilla Glass 3",
    pixel_density: "~415 ppi",
    
    // Performance Section
    cpu: "Octa-core (1x2.4 GHz Kryo 475 Prime & 1x2.2 GHz Kryo 475 Gold & 6x1.8 GHz Kryo 475 Silver)",
    gpu: "Adreno 620",
    fabrication: "7 nm",
    ram_variants: "6GB LPDDR4x",
    storage_variants: "128GB",
    storage_type: "UFS 2.1",
    geekbench_score: "1610 (v5.1)",
    cooling_system: "Standard graphite thermal pad",
    
    // Primary Camera
    cam_count: "Dual Camera Setup",
    cam_main_sensor: "12.2 MP, f/1.7, 27mm (wide), 1/2.55\", 1.4µm, dual pixel PDAF, OIS",
    cam_ultrawide: "16 MP, f/2.2, 119˚ (ultrawide), 1.0µm",
    cam_telephoto: "No dedicated telephoto",
    cam_macro: "No dedicated macro",
    cam_ois: "OIS + EIS support on main camera",
    cam_flash: "LED flash, Auto-HDR, panorama",
    cam_video: "4K@30/60fps, 1080p@30/60/120/240fps; gyro-EIS",
    
    // Front Camera
    cam_front_resolution: "8 MP, f/2.0, 24mm (wide), 1/4.0\", 1.12µm",
    cam_front_hdr: "Auto-HDR",
    cam_front_portrait: "Portrait mode supported via AI",
    cam_front_video: "1080p@30fps",
    
    // Battery & Charging
    battery_capacity: "4680 mAh, non-removable",
    charging_wired: "18W wired, USB Power Delivery 2.0",
    charging_wireless: "No wireless charging",
    charging_reverse: "No reverse wireless charging",
    charger_included: true,
    usb_type: "USB Type-C 3.1 Gen 1",
    
    // Network & Connectivity
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, hotspot",
    bluetooth_version: "5.0, A2DP, LE, aptX HD",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, QZSS, BDS",
    has_ir_blaster: false,
    has_audio_jack: true,
    usb_version: "USB Type-C 3.1 Gen 1",
    
    // Sensors & Audio
    sensor_fingerprint: "Rear-mounted",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: false,
    
    // Software & AI Features
    android_version: "Android 11, upgradable to Android 14",
    ui_version: "Pixel UI",
    update_policy: "3 years of OS and security updates (Reached End of Life)",
    ai_features: ["Hold for Me", "Call Screen", "Magic Eraser (via Google Photos)"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Excellent battery life with a large 4680 mAh capacity",
      "IP67 water and dust resistance",
      "Includes a 3.5mm headphone jack",
      "Great camera performance for the price",
      "Clean Android experience with prompt updates"
    ],
    cons: [
      "Only 60Hz display refresh rate",
      "No wireless charging",
      "Availability limited to US and Japan mostly",
      "Display protection is only Gorilla Glass 3",
      "Reached end of official software support"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "Does the Google Pixel 5a 5G have a headphone jack?",
        answer: "Yes, unlike the Pixel 5, the Pixel 5a 5G retains the 3.5mm headphone jack for wired audio."
      },
      {
        question: "Is the Pixel 5a waterproof?",
        answer: "It has an IP67 rating, meaning it is dust and water-resistant (up to 1m for 30 minutes)."
      },
      {
        question: "Does the Pixel 5a support wireless charging?",
        answer: "No, the Pixel 5a 5G does not support wireless charging or reverse wireless charging."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 5a 5G Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 5a 5G — 6.34\" OLED display, Snapdragon 765G, 12.2MP OIS camera, 4680mAh battery, IP67 rating, and price in Bangladesh.",
    meta_keywords: "Google Pixel 5a 5G specs, Pixel 5a price in Bangladesh, Google Pixel 5a review, Snapdragon 765G, Pixel 5a camera, Pixel 5a battery life",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 5a 5G");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 5a 5G");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
