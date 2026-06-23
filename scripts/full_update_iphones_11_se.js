require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  const updates = [
    {
      slug: "iphone-se-2020",
      updateData: {
        benchmark_highlight: "AnTuTu ~450,000 | Geekbench Single: ~1300",
        refresh_rate: "60 Hz",
        brightness: "625 nits typical",
        hdr: "HDR10, Dolby Vision",
        protection: "Ion-strengthened glass",
        pixel_density: "326 ppi",
        cooling_system: "Standard passive cooling",
        geekbench_score: "Single: ~1,300 / Multi: ~3,300 (Geekbench 5)",
        antutu_score: 450000,
        storage_type: "NVMe",
        fabrication: "7 nm+ (TSMC)",
        cam_count: "Single",
        cam_main_sensor: "12 MP, f/1.8, 28mm, PDAF",
        cam_ultrawide: "Not available",
        cam_telephoto: "Not available",
        cam_ois: "Yes (Main camera)",
        cam_flash: "Dual-LED dual-tone flash",
        cam_macro: "Not supported",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps",
        cam_front_resolution: "7 MP, f/2.2",
        cam_front_video: "1080p@30fps",
        sensor_fingerprint: "Touch ID (Home button)",
        has_face_unlock: false,
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        android_version: "iOS 13",
        ui_version: "iOS 13 (Upgradable to iOS 17)",
        ai_features: ["Smart HDR 2", "Portrait mode with depth control"],
        has_ai_assistant: true,
        battery_capacity: "1,821 mAh",
        charging_wired: "18W wired, 50% in 30 min",
        has_5g: false,
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.0"
      }
    },
    {
      slug: "iphone-se-2022",
      updateData: {
        benchmark_highlight: "AnTuTu ~700,000 | Geekbench Single: ~1700",
        refresh_rate: "60 Hz",
        brightness: "625 nits typical",
        hdr: "HDR10, Dolby Vision",
        protection: "Ion-strengthened glass",
        pixel_density: "326 ppi",
        cooling_system: "Standard passive cooling",
        geekbench_score: "Single: ~1,700 / Multi: ~4,200 (Geekbench 5)",
        antutu_score: 700000,
        storage_type: "NVMe",
        fabrication: "5 nm (TSMC)",
        cam_count: "Single",
        cam_main_sensor: "12 MP, f/1.8, PDAF",
        cam_ultrawide: "Not available",
        cam_telephoto: "Not available",
        cam_ois: "Yes",
        cam_flash: "Dual-LED dual-tone flash",
        cam_macro: "Not supported",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps",
        cam_front_resolution: "7 MP, f/2.2",
        cam_front_video: "1080p@30/120fps",
        sensor_fingerprint: "Touch ID (Home button)",
        has_face_unlock: false,
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        android_version: "iOS 15.4",
        ui_version: "iOS 15.4 (Upgradable)",
        ai_features: ["Smart HDR 4", "Photographic Styles", "Deep Fusion"],
        has_ai_assistant: true,
        battery_capacity: "2,018 mAh",
        charging_wired: "20W wired, 50% in 30 min",
        has_5g: true,
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.0"
      }
    },
    {
      slug: "iphone-11",
      updateData: {
        benchmark_highlight: "AnTuTu ~500,000 | Geekbench Single: ~1300",
        refresh_rate: "60 Hz",
        brightness: "625 nits typical",
        hdr: "No (Liquid Retina HD)",
        protection: "Scratch-resistant glass",
        pixel_density: "326 ppi",
        cooling_system: "Standard passive cooling",
        geekbench_score: "Single: ~1,300 / Multi: ~3,400 (Geekbench 5)",
        antutu_score: 500000,
        storage_type: "NVMe",
        fabrication: "7 nm+ (TSMC)",
        cam_count: "Dual",
        cam_main_sensor: "12 MP, f/1.8, 26mm, 1.4µm, dual pixel PDAF",
        cam_ultrawide: "12 MP, f/2.4, 13mm, 120°",
        cam_telephoto: "Not available",
        cam_ois: "Yes (Main camera)",
        cam_flash: "Dual-LED dual-tone flash",
        cam_macro: "Not supported",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps",
        cam_front_resolution: "12 MP, f/2.2, 23mm + SL 3D",
        cam_front_video: "4K@24/30/60fps, 1080p@30/60/120fps",
        sensor_fingerprint: "Face ID",
        has_face_unlock: true,
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        android_version: "iOS 13",
        ui_version: "iOS 13 (Upgradable to iOS 17)",
        ai_features: ["Night mode", "Deep Fusion", "Smart HDR"],
        has_ai_assistant: true,
        battery_capacity: "3,110 mAh",
        charging_wired: "18W wired",
        has_5g: false,
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.0"
      }
    },
    {
      slug: "iphone-11-pro",
      updateData: {
        benchmark_highlight: "AnTuTu ~520,000 | Geekbench Single: ~1350",
        refresh_rate: "60 Hz",
        brightness: "800 nits typical, 1200 nits peak (HDR)",
        hdr: "HDR10, Dolby Vision",
        protection: "Scratch-resistant glass",
        pixel_density: "458 ppi",
        cooling_system: "Standard passive cooling",
        geekbench_score: "Single: ~1,350 / Multi: ~3,500 (Geekbench 5)",
        antutu_score: 520000,
        storage_type: "NVMe",
        fabrication: "7 nm+ (TSMC)",
        cam_count: "Triple",
        cam_main_sensor: "12 MP, f/1.8, 26mm, 1.4µm, dual pixel PDAF",
        cam_ultrawide: "12 MP, f/2.4, 13mm, 120°",
        cam_telephoto: "12 MP, f/2.0, 52mm, PDAF, OIS, 2x optical zoom",
        cam_ois: "Dual OIS (Main + Telephoto)",
        cam_flash: "Dual-LED dual-tone flash",
        cam_macro: "Not supported",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps",
        cam_front_resolution: "12 MP, f/2.2, 23mm + SL 3D",
        cam_front_video: "4K@24/30/60fps, 1080p@30/60/120fps",
        sensor_fingerprint: "Face ID",
        has_face_unlock: true,
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        android_version: "iOS 13",
        ui_version: "iOS 13 (Upgradable to iOS 17)",
        ai_features: ["Night mode", "Deep Fusion", "Smart HDR"],
        has_ai_assistant: true,
        battery_capacity: "3,046 mAh",
        charging_wired: "18W wired",
        has_5g: false,
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.0"
      }
    },
    {
      slug: "iphone-11-pro-max",
      updateData: {
        benchmark_highlight: "AnTuTu ~530,000 | Geekbench Single: ~1350",
        refresh_rate: "60 Hz",
        brightness: "800 nits typical, 1200 nits peak (HDR)",
        hdr: "HDR10, Dolby Vision",
        protection: "Scratch-resistant glass",
        pixel_density: "458 ppi",
        cooling_system: "Standard passive cooling",
        geekbench_score: "Single: ~1,350 / Multi: ~3,550 (Geekbench 5)",
        antutu_score: 530000,
        storage_type: "NVMe",
        fabrication: "7 nm+ (TSMC)",
        cam_count: "Triple",
        cam_main_sensor: "12 MP, f/1.8, 26mm, 1.4µm, dual pixel PDAF",
        cam_ultrawide: "12 MP, f/2.4, 13mm, 120°",
        cam_telephoto: "12 MP, f/2.0, 52mm, PDAF, OIS, 2x optical zoom",
        cam_ois: "Dual OIS (Main + Telephoto)",
        cam_flash: "Dual-LED dual-tone flash",
        cam_macro: "Not supported",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps",
        cam_front_resolution: "12 MP, f/2.2, 23mm + SL 3D",
        cam_front_video: "4K@24/30/60fps, 1080p@30/60/120fps",
        sensor_fingerprint: "Face ID",
        has_face_unlock: true,
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        android_version: "iOS 13",
        ui_version: "iOS 13 (Upgradable to iOS 17)",
        ai_features: ["Night mode", "Deep Fusion", "Smart HDR"],
        has_ai_assistant: true,
        battery_capacity: "3,969 mAh",
        charging_wired: "18W wired",
        has_5g: false,
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.0"
      }
    }
  ];

  for (const item of updates) {
    const res = await Phone.updateOne({ slug: item.slug }, { $set: item.updateData });
    console.log(`Updated ${item.slug}: matched ${res.matchedCount}, modified ${res.modifiedCount}`);
  }

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

run().catch(e => { console.error(e); process.exit(1); });
