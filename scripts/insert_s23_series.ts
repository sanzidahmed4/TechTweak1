import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

// -------------------------------------------------------------------
// 1. Define Mongoose Schemas (matching the app's models)
// -------------------------------------------------------------------

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
}, { strict: false });

const PhoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  is_published: { type: Boolean, default: false },
  is_featured: { type: Boolean, default: false },
  is_upcoming: { type: Boolean, default: false },
  price_usd: { type: Number },
  release_date: { type: String },
  colors: [{ type: String }],
  models: [{ type: String }],
  variants: [{ type: String }],
  made_in: { type: String },
  processor: { type: String },
  main_camera_highlight: { type: String },
  display_highlight: { type: String },
  battery_highlight: { type: String },
  antutu_score: { type: String },
  general_specs: {
    weight: { type: String },
    dimensions: { type: String },
    build_material: { type: String },
    sim_type: { type: String },
    water_resistance: { type: String },
  },
  display_specs: {
    type: { type: String },
    size: { type: String },
    resolution: { type: String },
    refresh_rate: { type: String },
    brightness: { type: String },
    hdr_support: { type: String },
    protection: { type: String },
    pixel_density: { type: String },
  },
  performance_specs: {
    cpu: { type: String },
    gpu: { type: String },
    fabrication: { type: String },
    ram_variants: [{ type: String }],
    storage_variants: [{ type: String }],
    storage_type: { type: String },
    geekbench_score: { type: String },
    cooling_system: { type: String },
  },
  camera_specs: {
    rear_setup: { type: String },
    total_cameras: { type: String },
    main_sensor: { type: String },
    ultrawide_sensor: { type: String },
    telephoto_sensor: { type: String },
    macro_depth_sensor: { type: String },
    ois_support: { type: String },
    flash_type: { type: String },
    video_recording: { type: String },
    front_camera: { type: String },
    front_resolution: { type: String },
    hdr_features: { type: String },
  },
  battery_specs: {
    capacity: { type: String },
    wired_charging: { type: String },
    wireless_charging: { type: String },
    reverse_charging: { type: String },
    usb_type: { type: String },
    charger_in_box: { type: String },
  },
  connectivity_specs: {
    wifi: { type: String },
    bluetooth: { type: String },
    gps: { type: String },
    usb_version: { type: String },
    network_5g: { type: String },
    nfc: { type: String },
    ir_blaster: { type: String },
    headphone_jack: { type: String },
  },
  sensor_specs: {
    fingerprint: { type: String },
    gyroscope: { type: String },
    compass: { type: String },
    accelerometer: { type: String },
    face_unlock: { type: String },
  },
  software_specs: {
    os_version: { type: String },
    ui_version: { type: String },
    update_policy: { type: String },
    ai_features: { type: String },
    circle_to_search: { type: String },
    generative_edit: { type: String },
    live_translate: { type: String },
    ai_assistant: { type: String },
  },
  images: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, { strict: false });

const Brand = mongoose.models.Brand || mongoose.model('Brand', BrandSchema);
const Phone = mongoose.models.Phone || mongoose.model('Phone', PhoneSchema);

// -------------------------------------------------------------------
// 2. Data Objects
// -------------------------------------------------------------------

const s23Ultra = {
  name: "Samsung Galaxy S23 Ultra",
  slug: "samsung-galaxy-s23-ultra",
  is_published: true,
  is_featured: true,
  is_upcoming: false,
  price_usd: 1199.00,
  release_date: "February 17, 2023",
  colors: ["Phantom Black", "Green", "Cream", "Lavender", "Graphite", "Sky Blue", "Lime", "Red"],
  models: ["SM-S918B", "SM-S918U"],
  variants: ["8GB/256GB", "12GB/256GB", "12GB/512GB", "12GB/1TB"],
  made_in: "Vietnam / India / South Korea",
  processor: "Snapdragon 8 Gen 2 for Galaxy (4 nm)",
  main_camera_highlight: "200MP Quad Camera, 10x Opt Zoom",
  display_highlight: "6.8\" Dynamic AMOLED 2X, 1750 nits",
  battery_highlight: "5000 mAh, 45W Charging",
  antutu_score: "~1,241,531",
  general_specs: {
    weight: "234 g",
    dimensions: "163.4 x 78.1 x 8.9 mm",
    build_material: "Gorilla Glass Victus 2 (Front/Back), Armor Aluminum",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 (1.5m for 30 min)"
  },
  display_specs: {
    type: "Dynamic AMOLED 2X",
    size: "6.8 inches",
    resolution: "1440 x 3088 pixels",
    refresh_rate: "1-120Hz",
    brightness: "1750 nits (peak)",
    hdr_support: "HDR10+",
    protection: "Corning Gorilla Glass Victus 2",
    pixel_density: "~500 ppi"
  },
  performance_specs: {
    cpu: "Octa-core Snapdragon 8 Gen 2",
    gpu: "Adreno 740",
    fabrication: "4 nm",
    ram_variants: ["8GB", "12GB"],
    storage_variants: ["256GB", "512GB", "1TB"],
    storage_type: "UFS 4.0",
    geekbench_score: "~5,179",
    cooling_system: "Vapor Chamber Cooling (Larger)"
  },
  camera_specs: {
    rear_setup: "Quad Setup",
    total_cameras: "4 Rear + 1 Front",
    main_sensor: "200 MP, f/1.7, OIS",
    ultrawide_sensor: "12 MP, f/2.2, 120°",
    telephoto_sensor: "10 MP Periscope (10x) + 10 MP Tele (3x)",
    macro_depth_sensor: "No dedicated sensor",
    ois_support: "Yes (Main, Tele, Periscope)",
    flash_type: "LED flash, auto-HDR, panorama",
    video_recording: "8K@24/30fps, 4K@30/60fps",
    front_camera: "Single",
    front_resolution: "12 MP, f/2.2",
    hdr_features: "Dual video call, Auto-HDR, HDR10+"
  },
  battery_specs: {
    capacity: "5000 mAh",
    wired_charging: "45W",
    wireless_charging: "15W (Qi/PMA)",
    reverse_charging: "4.5W Reverse Wireless",
    usb_type: "USB Type-C 3.2",
    charger_in_box: "No"
  },
  connectivity_specs: {
    wifi: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band",
    bluetooth: "5.3, A2DP, LE",
    gps: "GPS, GLONASS, BDS, GALILEO",
    usb_version: "USB Type-C 3.2, OTG",
    network_5g: "Yes (SA/NSA/Sub6/mmWave)",
    nfc: "Yes",
    ir_blaster: "No",
    headphone_jack: "No"
  },
  sensor_specs: {
    fingerprint: "Under display (Ultrasonic)",
    gyroscope: "Yes",
    compass: "Yes",
    accelerometer: "Yes",
    face_unlock: "Yes (2D)"
  },
  software_specs: {
    os_version: "Android 13 (Launch)",
    ui_version: "One UI 5.1 (Launch)",
    update_policy: "4 years major OS, 5 years security",
    ai_features: "Added via One UI 6.1 update",
    circle_to_search: "Yes (via update)",
    generative_edit: "Yes (via update)",
    live_translate: "Yes (via update)",
    ai_assistant: "Yes (via update)"
  },
  images: [
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Ultra_Front_Back_q8q3s9.png",
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Ultra_Colors_w5y2m0.png",
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Ultra_S_Pen_k7v4b1.png"
  ]
};

const s23Plus = {
  name: "Samsung Galaxy S23+",
  slug: "samsung-galaxy-s23-plus",
  is_published: true,
  is_featured: true,
  is_upcoming: false,
  price_usd: 999.00,
  release_date: "February 17, 2023",
  colors: ["Phantom Black", "Cream", "Green", "Lavender", "Graphite", "Lime"],
  models: ["SM-S916B", "SM-S916U"],
  variants: ["8GB/256GB", "8GB/512GB"],
  made_in: "Vietnam / India / South Korea",
  processor: "Snapdragon 8 Gen 2 for Galaxy (4 nm)",
  main_camera_highlight: "50MP Triple Camera, 3x Opt Zoom",
  display_highlight: "6.6\" Dynamic AMOLED 2X, 1750 nits",
  battery_highlight: "4700 mAh, 45W Charging",
  antutu_score: "~1,221,731",
  general_specs: {
    weight: "196 g",
    dimensions: "157.8 x 76.2 x 7.6 mm",
    build_material: "Gorilla Glass Victus 2 (Front/Back), Armor Aluminum",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 (1.5m for 30 min)"
  },
  display_specs: {
    type: "Dynamic AMOLED 2X",
    size: "6.6 inches",
    resolution: "1080 x 2340 pixels",
    refresh_rate: "48-120Hz",
    brightness: "1750 nits (peak)",
    hdr_support: "HDR10+",
    protection: "Corning Gorilla Glass Victus 2",
    pixel_density: "~393 ppi"
  },
  performance_specs: {
    cpu: "Octa-core Snapdragon 8 Gen 2",
    gpu: "Adreno 740",
    fabrication: "4 nm",
    ram_variants: ["8GB"],
    storage_variants: ["256GB", "512GB"],
    storage_type: "UFS 4.0",
    geekbench_score: "~5,073",
    cooling_system: "Vapor Chamber Cooling"
  },
  camera_specs: {
    rear_setup: "Triple Setup",
    total_cameras: "3 Rear + 1 Front",
    main_sensor: "50 MP, f/1.8, OIS",
    ultrawide_sensor: "12 MP, f/2.2, 120°",
    telephoto_sensor: "10 MP Tele (3x)",
    macro_depth_sensor: "No dedicated sensor",
    ois_support: "Yes (Main & Tele)",
    flash_type: "LED flash, auto-HDR, panorama",
    video_recording: "8K@24/30fps, 4K@30/60fps",
    front_camera: "Single",
    front_resolution: "12 MP, f/2.2",
    hdr_features: "Dual video call, Auto-HDR, HDR10+"
  },
  battery_specs: {
    capacity: "4700 mAh",
    wired_charging: "45W",
    wireless_charging: "15W (Qi/PMA)",
    reverse_charging: "4.5W Reverse Wireless",
    usb_type: "USB Type-C 3.2",
    charger_in_box: "No"
  },
  connectivity_specs: {
    wifi: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band",
    bluetooth: "5.3, A2DP, LE",
    gps: "GPS, GLONASS, BDS, GALILEO",
    usb_version: "USB Type-C 3.2, OTG",
    network_5g: "Yes (SA/NSA/Sub6/mmWave)",
    nfc: "Yes",
    ir_blaster: "No",
    headphone_jack: "No"
  },
  sensor_specs: {
    fingerprint: "Under display (Ultrasonic)",
    gyroscope: "Yes",
    compass: "Yes",
    accelerometer: "Yes",
    face_unlock: "Yes (2D)"
  },
  software_specs: {
    os_version: "Android 13 (Launch)",
    ui_version: "One UI 5.1 (Launch)",
    update_policy: "4 years major OS, 5 years security",
    ai_features: "Added via One UI 6.1 update",
    circle_to_search: "Yes (via update)",
    generative_edit: "Yes (via update)",
    live_translate: "Yes (via update)",
    ai_assistant: "Yes (via update)"
  },
  images: [
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Plus_Front_Back_l9m2x4.png",
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Plus_Colors_p8q1v5.png"
  ]
};

const s23Base = {
  name: "Samsung Galaxy S23",
  slug: "samsung-galaxy-s23",
  is_published: true,
  is_featured: true,
  is_upcoming: false,
  price_usd: 799.00,
  release_date: "February 17, 2023",
  colors: ["Phantom Black", "Cream", "Green", "Lavender", "Graphite", "Lime"],
  models: ["SM-S911B", "SM-S911U"],
  variants: ["8GB/128GB", "8GB/256GB", "8GB/512GB"],
  made_in: "Vietnam / India / South Korea",
  processor: "Snapdragon 8 Gen 2 for Galaxy (4 nm)",
  main_camera_highlight: "50MP Triple Camera, 3x Opt Zoom",
  display_highlight: "6.1\" Dynamic AMOLED 2X, 1750 nits",
  battery_highlight: "3900 mAh, 25W Charging",
  antutu_score: "~1,187,713",
  general_specs: {
    weight: "168 g",
    dimensions: "146.3 x 70.9 x 7.6 mm",
    build_material: "Gorilla Glass Victus 2 (Front/Back), Armor Aluminum",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 (1.5m for 30 min)"
  },
  display_specs: {
    type: "Dynamic AMOLED 2X",
    size: "6.1 inches",
    resolution: "1080 x 2340 pixels",
    refresh_rate: "48-120Hz",
    brightness: "1750 nits (peak)",
    hdr_support: "HDR10+",
    protection: "Corning Gorilla Glass Victus 2",
    pixel_density: "~425 ppi"
  },
  performance_specs: {
    cpu: "Octa-core Snapdragon 8 Gen 2",
    gpu: "Adreno 740",
    fabrication: "4 nm",
    ram_variants: ["8GB"],
    storage_variants: ["128GB", "256GB", "512GB"],
    storage_type: "UFS 3.1 (128GB), UFS 4.0",
    geekbench_score: "~4,982",
    cooling_system: "Vapor Chamber Cooling"
  },
  camera_specs: {
    rear_setup: "Triple Setup",
    total_cameras: "3 Rear + 1 Front",
    main_sensor: "50 MP, f/1.8, OIS",
    ultrawide_sensor: "12 MP, f/2.2, 120°",
    telephoto_sensor: "10 MP Tele (3x)",
    macro_depth_sensor: "No dedicated sensor",
    ois_support: "Yes (Main & Tele)",
    flash_type: "LED flash, auto-HDR, panorama",
    video_recording: "8K@24/30fps, 4K@30/60fps",
    front_camera: "Single",
    front_resolution: "12 MP, f/2.2",
    hdr_features: "Dual video call, Auto-HDR, HDR10+"
  },
  battery_specs: {
    capacity: "3900 mAh",
    wired_charging: "25W",
    wireless_charging: "15W (Qi/PMA)",
    reverse_charging: "4.5W Reverse Wireless",
    usb_type: "USB Type-C 3.2",
    charger_in_box: "No"
  },
  connectivity_specs: {
    wifi: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band",
    bluetooth: "5.3, A2DP, LE",
    gps: "GPS, GLONASS, BDS, GALILEO",
    usb_version: "USB Type-C 3.2, OTG",
    network_5g: "Yes (SA/NSA/Sub6/mmWave)",
    nfc: "Yes",
    ir_blaster: "No",
    headphone_jack: "No"
  },
  sensor_specs: {
    fingerprint: "Under display (Ultrasonic)",
    gyroscope: "Yes",
    compass: "Yes",
    accelerometer: "Yes",
    face_unlock: "Yes (2D)"
  },
  software_specs: {
    os_version: "Android 13 (Launch)",
    ui_version: "One UI 5.1 (Launch)",
    update_policy: "4 years major OS, 5 years security",
    ai_features: "Added via One UI 6.1 update",
    circle_to_search: "Yes (via update)",
    generative_edit: "Yes (via update)",
    live_translate: "Yes (via update)",
    ai_assistant: "Yes (via update)"
  },
  images: [
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Front_Back_k8x5n2.png",
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_Colors_q1v9b4.png"
  ]
};

const s23FE = {
  name: "Samsung Galaxy S23 FE",
  slug: "samsung-galaxy-s23-fe",
  is_published: true,
  is_featured: true,
  is_upcoming: false,
  price_usd: 599.00,
  release_date: "October 26, 2023",
  colors: ["Mint", "Cream", "Graphite", "Purple", "Indigo", "Tangerine"],
  models: ["SM-S711B", "SM-S711U"],
  variants: ["8GB/128GB", "8GB/256GB"],
  made_in: "Vietnam / India",
  processor: "Exynos 2200 / Snapdragon 8 Gen 1 (4 nm)",
  main_camera_highlight: "50MP Triple Camera, 3x Opt Zoom",
  display_highlight: "6.4\" Dynamic AMOLED 2X, 1450 nits",
  battery_highlight: "4500 mAh, 25W Charging",
  antutu_score: "~1,185,588",
  general_specs: {
    weight: "209 g",
    dimensions: "158 x 76.5 x 8.2 mm",
    build_material: "Gorilla Glass 5 (Front/Back), Aluminum Frame",
    sim_type: "Nano-SIM and eSIM",
    water_resistance: "IP68 (1.5m for 30 min)"
  },
  display_specs: {
    type: "Dynamic AMOLED 2X",
    size: "6.4 inches",
    resolution: "1080 x 2340 pixels",
    refresh_rate: "60-120Hz",
    brightness: "1450 nits (peak)",
    hdr_support: "HDR10+",
    protection: "Corning Gorilla Glass 5",
    pixel_density: "~403 ppi"
  },
  performance_specs: {
    cpu: "Octa-core Exynos 2200 / SD 8 Gen 1",
    gpu: "Xclipse 920 / Adreno 730",
    fabrication: "4 nm",
    ram_variants: ["8GB"],
    storage_variants: ["128GB", "256GB"],
    storage_type: "UFS 3.1",
    geekbench_score: "~3,900",
    cooling_system: "Vapor Chamber Cooling"
  },
  camera_specs: {
    rear_setup: "Triple Setup",
    total_cameras: "3 Rear + 1 Front",
    main_sensor: "50 MP, f/1.8, OIS",
    ultrawide_sensor: "12 MP, f/2.2, 123°",
    telephoto_sensor: "8 MP Tele (3x)",
    macro_depth_sensor: "No dedicated sensor",
    ois_support: "Yes (Main & Tele)",
    flash_type: "LED flash, HDR, panorama",
    video_recording: "8K@24fps, 4K@30/60fps",
    front_camera: "Single",
    front_resolution: "10 MP, f/2.4",
    hdr_features: "HDR"
  },
  battery_specs: {
    capacity: "4500 mAh",
    wired_charging: "25W",
    wireless_charging: "15W",
    reverse_charging: "Reverse wireless supported",
    usb_type: "USB Type-C 3.2",
    charger_in_box: "No"
  },
  connectivity_specs: {
    wifi: "Wi-Fi 802.11 a/b/g/n/ac/6e, dual/tri-band",
    bluetooth: "5.3, A2DP, LE",
    gps: "GPS, GLONASS, BDS, GALILEO",
    usb_version: "USB Type-C 3.2, OTG",
    network_5g: "Yes (SA/NSA/Sub6)",
    nfc: "Yes",
    ir_blaster: "No",
    headphone_jack: "No"
  },
  sensor_specs: {
    fingerprint: "Under display (Optical)",
    gyroscope: "Yes",
    compass: "Yes",
    accelerometer: "Yes",
    face_unlock: "Yes (2D)"
  },
  software_specs: {
    os_version: "Android 13 (Launch)",
    ui_version: "One UI 5.1 (Launch)",
    update_policy: "4 years major OS, 5 years security",
    ai_features: "Added via One UI 6.1 update",
    circle_to_search: "Yes (via update)",
    generative_edit: "Yes (via update)",
    live_translate: "Yes (via update)",
    ai_assistant: "Yes (via update)"
  },
  images: [
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_FE_Front_Back_u4m6c8.png",
    "https://res.cloudinary.com/dcb4ilgpy/image/upload/v1740263625/Samsung_Galaxy_S23_FE_Colors_x2n9p1.png"
  ]
};

// -------------------------------------------------------------------
// 3. Main Script
// -------------------------------------------------------------------

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    // Ensure Samsung brand exists
    let samsungBrand = await Brand.findOne({ slug: "samsung" });
    if (!samsungBrand) {
      samsungBrand = await Brand.create({ name: "Samsung", slug: "samsung" });
      console.log("Created Samsung Brand");
    }

    const brandId = samsungBrand._id;
    (s23Ultra as any).brand_id = brandId;
    (s23Plus as any).brand_id = brandId;
    (s23Base as any).brand_id = brandId;
    (s23FE as any).brand_id = brandId;

    const phones = [s23Ultra, s23Plus, s23Base, s23FE];

    for (const pData of phones) {
      await Phone.findOneAndUpdate(
        { slug: pData.slug },
        { $set: pData },
        { upsert: true, returnDocument: 'after' }
      );
      console.log(`✅ Inserted/Updated: ${pData.name}`);
    }

    console.log("\n🎉 All 4 Samsung Galaxy S23 Series phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
