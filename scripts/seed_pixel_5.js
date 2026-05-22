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
    name: "Google Pixel 5",
    slug: "google-pixel-5",
    brand_id: googleBrand._id,
    
    // Basic Info
    price_bdt: 42000,
    price_official: null,
    price_unofficial: 42000,
    is_official: false,
    release_date: "2020-10-15",
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Just Black", "Sorta Sage"],
    model_number: "GD1YQ, GTT9Q",
    made_in: "China/Vietnam",
    phone_variants: "8GB/128GB",
    
    // Media
    images: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-5-5g-1.jpg",
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-5-5g-2.jpg"
    ],
    
    // Quick Highlights
    chipset_highlight: "Snapdragon 765G 5G (7 nm)",
    camera_highlight: "12.2MP OIS + 16MP Ultrawide",
    display_highlight: "6.0\" Flexible OLED, 90Hz",
    battery_highlight: "4080 mAh, 18W Fast Charging",
    benchmark_highlight: "AnTuTu: ~319,733",
    
    // General Info
    weight: "151 g (5.33 oz)",
    dimensions: "144.7 x 70.4 x 8.0 mm (5.70 x 2.77 x 0.31 in)",
    build_material: "Glass front (Gorilla Glass 6), 100% recycled aluminum enclosure (frame & back)",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 dust/water resistant (up to 1.5m for 30 mins)",
    
    // Display Section
    display_type: "Flexible OLED, 90Hz, HDR10+, PWM dimming (~387.6 Hz), ~180Hz Touch Sampling Rate",
    screen_size: "6.0 inches, 87.6 cm2 (~85.9% screen-to-body ratio)",
    resolution: "1080 x 2340 pixels, 19.5:9 ratio",
    refresh_rate: "90Hz Smooth Display",
    brightness: "485 nits (typical), up to 700 nits (peak)",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass 6",
    pixel_density: "~432 ppi",
    
    // Performance Section
    cpu: "Octa-core (1x2.4 GHz Kryo 475 Prime & 1x2.2 GHz Kryo 475 Gold & 6x1.8 GHz Kryo 475 Silver)",
    gpu: "Adreno 620",
    fabrication: "7 nm",
    ram_variants: "8GB LPDDR4x",
    storage_variants: "128GB",
    storage_type: "UFS 2.1",
    geekbench_score: "1617 (v5.1)",
    cooling_system: "Standard graphite thermal pad (No vapor chamber)",
    
    // Primary Camera
    cam_count: "Dual Camera Setup",
    cam_main_sensor: "12.2 MP, f/1.7, 27mm (wide), 1/2.55\", 1.4µm, dual pixel PDAF, OIS",
    cam_ultrawide: "16 MP, f/2.2, 107˚ (ultrawide), 1.0µm",
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
    battery_capacity: "4080 mAh, non-removable",
    charging_wired: "18W wired, USB Power Delivery 2.0",
    charging_wireless: "12W wireless (Qi-certified)",
    charging_reverse: "5W reverse wireless charging",
    charger_included: true,
    usb_type: "USB Type-C 3.1 Gen 1",
    
    // Network & Connectivity
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, hotspot",
    bluetooth_version: "5.0, A2DP, LE, aptX HD",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, QZSS, BDS (No UWB support, No Satellite SOS)",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "USB Type-C 3.1 Gen 1 (up to 5Gbps), DisplayPort support not officially enabled",
    
    // Sensors & Audio
    sensor_fingerprint: "Rear-mounted (Pixel Imprint)",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: false,
    // (Stereo speaker tuning noted in Pros/Cons below, schema doesn't have a specific field for it, though I'll add haptic engine to sensors if possible - wait, the schema doesn't have a haptic_engine field, so I'll add it to fingerprint or pros)
    
    // Software & AI Features
    android_version: "Android 11, upgradable to Android 14",
    ui_version: "Pixel UI",
    update_policy: "3 years of OS and security updates (Reached End of Life)",
    ai_features: ["Hold for Me", "Call Screen", "Magic Eraser (via Google Photos)", "Now Playing", "Live Caption", "Smart Reply"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    // Pros & Cons
    pros: [
      "Compact and lightweight 100% recycled aluminum design",
      "90Hz OLED display is smooth and vibrant",
      "Excellent battery life (4080 mAh)",
      "Flagship-tier camera performance with excellent astrophotography",
      "IP68 water and dust resistance",
      "Stereo speakers with tuned haptic engine (Pixel Imprint)",
      "Symmetrical bezels"
    ],
    cons: [
      "Snapdragon 765G is a mid-range chipset, not a true flagship tier",
      "No telephoto camera",
      "Slow 18W wired charging by modern standards",
      "Under-display earpiece speaker can sound muffled",
      "Reached end of official software support"
    ],
    
    // FAQ System
    faqs: [
      {
        question: "Does the Google Pixel 5 have a headphone jack?",
        answer: "No, the Google Pixel 5 does not come with a 3.5mm headphone jack. You will need to use USB-C headphones or wireless Bluetooth earbuds."
      },
      {
        question: "Is the Pixel 5 waterproof?",
        answer: "Yes, it has an IP68 rating, meaning it is dust and water-resistant (up to 1.5m for 30 minutes)."
      },
      {
        question: "Does the Pixel 5 support wireless charging?",
        answer: "Yes, it supports 12W Qi wireless charging and 5W reverse wireless charging to charge other devices like earbuds."
      },
      {
        question: "What material is the Pixel 5 made of?",
        answer: "The Pixel 5 features a Corning Gorilla Glass 6 front and a back/frame made entirely of 100% recycled aluminum, coated with a bio-resin."
      }
    ],
    
    // SEO Section
    meta_title: "Google Pixel 5 Full Specifications, Price & Review | TechTweak",
    meta_description: "Get full specifications of Google Pixel 5 — 90Hz OLED display, Snapdragon 765G, 12.2MP OIS camera, 4080mAh battery, IP68 water resistance, and price in Bangladesh.",
    meta_keywords: "Google Pixel 5 specs, Pixel 5 price in Bangladesh, Google Pixel 5 review, Snapdragon 765G, Pixel 5 camera, Pixel 5 battery life, IP68, 90Hz OLED",
  };

  try {
    const existing = await Phone.findOne({ slug: phoneData.slug });
    if (existing) {
      await Phone.updateOne({ slug: phoneData.slug }, phoneData);
      console.log("Updated Google Pixel 5");
    } else {
      await Phone.create(phoneData);
      console.log("Created Google Pixel 5");
    }
  } catch (err) {
    console.error("Error saving phone:", err);
  }
  
  await mongoose.disconnect();
}

run().catch(console.error);
