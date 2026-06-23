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
      slug: "iphone-x",
      updateData: {
        // Highlights
        benchmark_highlight: "AnTuTu ~220,000 | Geekbench Single: ~1000",
        
        // Display Specs
        refresh_rate: "60 Hz",
        brightness: "625 nits typical",
        hdr: "HDR10, Dolby Vision",
        protection: "Scratch-resistant glass, oleophobic coating",
        pixel_density: "458 ppi",
        
        // Performance Specs
        cooling_system: "Standard passive cooling with graphite sheets",
        geekbench_score: "Single: ~1,000 / Multi: ~2,400 (Geekbench 5)",
        antutu_score: 220000,
        storage_type: "NVMe",
        fabrication: "10 nm (TSMC)",
        
        // Camera Specs
        cam_count: "Dual",
        cam_main_sensor: "12 MP, f/1.8, 28mm, 1.22µm, dual pixel PDAF",
        cam_ultrawide: "Not available",
        cam_telephoto: "12 MP, f/2.4, 52mm, PDAF, 2x optical zoom",
        cam_ois: "Dual OIS (Main + Telephoto)",
        cam_flash: "Quad-LED dual-tone flash, Slow Sync",
        cam_macro: "Not supported",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps",
        
        // Front Camera
        cam_front_resolution: "7 MP, f/2.2, 32mm + SL 3D (depth/biometrics)",
        cam_front_video: "1080p@30fps",
        
        // Sensors
        sensor_fingerprint: "Face ID (3D Infrared Facial Recognition)",
        has_face_unlock: true,
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        
        // Software & AI
        android_version: "iOS 11",
        ui_version: "iOS 11 (Upgradable to iOS 16.7)",
        ai_features: ["Core ML support", "Animoji and Memoji powered by TrueDepth"],
        has_ai_assistant: true,
        
        // Battery & Network
        battery_capacity: "2,716 mAh",
        charging_wired: "15W wired, 50% in 30 min",
        has_5g: false,
        wifi_version: "Wi-Fi 5 (802.11ac)",
        bluetooth_version: "Bluetooth 5.0"
      }
    },
    {
      slug: "iphone-xr",
      updateData: {
        benchmark_highlight: "AnTuTu ~350,000 | Geekbench Single: ~1100",
        refresh_rate: "60 Hz",
        brightness: "625 nits typical",
        hdr: "No (Standard Dynamic Range)",
        protection: "Scratch-resistant glass",
        pixel_density: "326 ppi",
        cooling_system: "Standard passive cooling",
        geekbench_score: "Single: ~1,100 / Multi: ~2,800 (Geekbench 5)",
        antutu_score: 350000,
        storage_type: "NVMe",
        fabrication: "7 nm (TSMC)",
        cam_count: "Single",
        cam_main_sensor: "12 MP, f/1.8, 26mm, 1.4µm, PDAF",
        cam_ultrawide: "Not available",
        cam_telephoto: "Not available",
        cam_ois: "Yes (Main camera)",
        cam_flash: "Quad-LED dual-tone flash",
        cam_macro: "Not supported",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps",
        cam_front_resolution: "7 MP, f/2.2, 32mm + SL 3D",
        cam_front_video: "1080p@60fps",
        sensor_fingerprint: "Face ID",
        has_face_unlock: true,
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        android_version: "iOS 12",
        ui_version: "iOS 12 (Upgradable to iOS 17)",
        ai_features: ["Smart HDR", "Memoji"],
        has_ai_assistant: true,
        battery_capacity: "2,942 mAh",
        charging_wired: "15W wired",
        has_5g: false,
        wifi_version: "Wi-Fi 5 (802.11ac)",
        bluetooth_version: "Bluetooth 5.0"
      }
    },
    {
      slug: "iphone-xs",
      updateData: {
        benchmark_highlight: "AnTuTu ~350,000 | Geekbench Single: ~1100",
        refresh_rate: "60 Hz",
        brightness: "625 nits typical",
        hdr: "HDR10, Dolby Vision",
        protection: "Scratch-resistant glass",
        pixel_density: "458 ppi",
        cooling_system: "Standard passive cooling",
        geekbench_score: "Single: ~1,100 / Multi: ~2,900 (Geekbench 5)",
        antutu_score: 350000,
        storage_type: "NVMe",
        fabrication: "7 nm (TSMC)",
        cam_count: "Dual",
        cam_main_sensor: "12 MP, f/1.8, 26mm, 1.4µm, dual pixel PDAF",
        cam_ultrawide: "Not available",
        cam_telephoto: "12 MP, f/2.4, 52mm, PDAF, 2x optical zoom",
        cam_ois: "Dual OIS",
        cam_flash: "Quad-LED dual-tone flash",
        cam_macro: "Not supported",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps",
        cam_front_resolution: "7 MP, f/2.2, 32mm + SL 3D",
        cam_front_video: "1080p@60fps",
        sensor_fingerprint: "Face ID",
        has_face_unlock: true,
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        android_version: "iOS 12",
        ui_version: "iOS 12 (Upgradable to iOS 17)",
        ai_features: ["Smart HDR", "Neural Engine tasks"],
        has_ai_assistant: true,
        battery_capacity: "2,658 mAh",
        charging_wired: "15W wired",
        has_5g: false,
        wifi_version: "Wi-Fi 5 (802.11ac)",
        bluetooth_version: "Bluetooth 5.0"
      }
    },
    {
      slug: "iphone-xs-max",
      updateData: {
        benchmark_highlight: "AnTuTu ~360,000 | Geekbench Single: ~1100",
        refresh_rate: "60 Hz",
        brightness: "625 nits typical",
        hdr: "HDR10, Dolby Vision",
        protection: "Scratch-resistant glass",
        pixel_density: "458 ppi",
        cooling_system: "Standard passive cooling",
        geekbench_score: "Single: ~1,100 / Multi: ~2,950 (Geekbench 5)",
        antutu_score: 360000,
        storage_type: "NVMe",
        fabrication: "7 nm (TSMC)",
        cam_count: "Dual",
        cam_main_sensor: "12 MP, f/1.8, 26mm, 1.4µm, dual pixel PDAF",
        cam_ultrawide: "Not available",
        cam_telephoto: "12 MP, f/2.4, 52mm, PDAF, 2x optical zoom",
        cam_ois: "Dual OIS",
        cam_flash: "Quad-LED dual-tone flash",
        cam_macro: "Not supported",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps",
        cam_front_resolution: "7 MP, f/2.2, 32mm + SL 3D",
        cam_front_video: "1080p@60fps",
        sensor_fingerprint: "Face ID",
        has_face_unlock: true,
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        android_version: "iOS 12",
        ui_version: "iOS 12 (Upgradable to iOS 17)",
        ai_features: ["Smart HDR", "Neural Engine tasks"],
        has_ai_assistant: true,
        battery_capacity: "3,174 mAh",
        charging_wired: "15W wired",
        has_5g: false,
        wifi_version: "Wi-Fi 5 (802.11ac)",
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
