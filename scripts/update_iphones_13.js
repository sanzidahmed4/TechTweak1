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
      slug: "iphone-13-mini",
      updateData: {
        weight: "141 g",
        dimensions: "131.5 × 64.2 × 7.65 mm",
        build_material: "Ceramic Shield front, glass back, aluminum frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "Super Retina XDR OLED, HDR10, Dolby Vision",
        pixel_density: "476 ppi",
        brightness: "800 nits (typical), 1200 nits (peak)",
        protection: "Ceramic Shield glass",
        cpu: "Apple A15 Bionic (5 nm) — 6-core",
        gpu: "Apple GPU (4-core graphics)",
        fabrication: "5 nm",
        storage_type: "NVMe",
        cam_count: "Dual",
        cam_main_sensor: "12 MP, f/1.6, 26mm, Sensor-shift OIS",
        cam_ultrawide: "12 MP, f/2.4, 13mm, 120°",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps, Cinematic mode (1080p@30fps)",
        cam_front_resolution: "12 MP, f/2.2, 23mm + SL 3D",
        cam_front_video: "4K@24/30/60fps, 1080p@30/60/120fps",
        battery_capacity: "2,438 mAh",
        charging_wired: "20W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 7.5W Qi",
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.0",
        usb_version: "USB 2.0",
        android_version: "iOS 15",
        ui_version: "iOS 15 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        pros: ["Best small phone on the market", "Brighter display than 12 mini", "Improved battery life", "Sensor-shift OIS"],
        cons: ["Still small battery compared to regular phones", "Small screen not ideal for gaming", "No telephoto lens"],
        faqs: [
          { question: "Did Apple fix the battery in 13 mini?", answer: "Yes, it lasts about 1.5 hours longer than the 12 mini." }
        ]
      }
    },
    {
      slug: "iphone-13",
      updateData: {
        weight: "174 g",
        dimensions: "146.7 × 71.5 × 7.65 mm",
        build_material: "Ceramic Shield front, glass back, aluminum frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "Super Retina XDR OLED, HDR10, Dolby Vision",
        pixel_density: "460 ppi",
        brightness: "800 nits (typical), 1200 nits (peak)",
        protection: "Ceramic Shield glass",
        cpu: "Apple A15 Bionic (5 nm) — 6-core",
        gpu: "Apple GPU (4-core graphics)",
        fabrication: "5 nm",
        storage_type: "NVMe",
        cam_count: "Dual",
        cam_main_sensor: "12 MP, f/1.6, 26mm, Sensor-shift OIS",
        cam_ultrawide: "12 MP, f/2.4, 13mm, 120°",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps, Cinematic mode",
        cam_front_resolution: "12 MP, f/2.2, 23mm + SL 3D",
        cam_front_video: "4K@24/30/60fps, 1080p@30/60/120fps",
        battery_capacity: "3,227 mAh",
        charging_wired: "20W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 7.5W Qi",
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.0",
        usb_version: "USB 2.0",
        android_version: "iOS 15",
        ui_version: "iOS 15 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        pros: ["Great battery life", "Brilliant display", "Top tier video recording with Cinematic mode", "Sensor-shift OIS standard"],
        cons: ["Still 60Hz display", "Notch is smaller but still there", "Slow charging speed"],
        faqs: [
          { question: "What is Cinematic mode?", answer: "It holds focus on subjects and transitions smoothly, creating a movie-like depth effect." }
        ]
      }
    },
    {
      slug: "iphone-13-pro",
      updateData: {
        weight: "204 g",
        dimensions: "146.7 × 71.5 × 7.65 mm",
        build_material: "Ceramic Shield front, glass back, stainless steel frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "Super Retina XDR OLED with ProMotion",
        pixel_density: "460 ppi",
        brightness: "1000 nits (typical), 1200 nits (peak)",
        protection: "Ceramic Shield glass",
        cpu: "Apple A15 Bionic (5 nm) — 6-core",
        gpu: "Apple GPU (5-core graphics)",
        fabrication: "5 nm",
        storage_type: "NVMe",
        cam_count: "Triple",
        cam_main_sensor: "12 MP, f/1.5, Sensor-shift OIS",
        cam_ultrawide: "12 MP, f/1.8, PDAF, Macro photography",
        cam_telephoto: "12 MP, f/2.8, OIS, 3x optical zoom",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps, ProRes, Cinematic mode",
        cam_front_resolution: "12 MP, f/2.2, 23mm + SL 3D",
        cam_front_video: "4K@24/30/60fps, 1080p@30/60/120fps",
        battery_capacity: "3,095 mAh",
        charging_wired: "23W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 7.5W Qi",
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.0",
        usb_version: "USB 2.0",
        android_version: "iOS 15",
        ui_version: "iOS 15 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        pros: ["120Hz ProMotion display is incredibly smooth", "Massive camera upgrades", "Macro photography support", "Excellent build quality"],
        cons: ["Heavy phone for its size", "No charger in box", "Lightning port is slow for file transfer"],
        faqs: [
          { question: "Does it have 120Hz display?", answer: "Yes, it has ProMotion which scales from 10Hz to 120Hz." }
        ]
      }
    },
    {
      slug: "iphone-13-pro-max",
      updateData: {
        weight: "240 g",
        dimensions: "160.8 × 78.1 × 7.65 mm",
        build_material: "Ceramic Shield front, glass back, stainless steel frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "Super Retina XDR OLED with ProMotion",
        pixel_density: "458 ppi",
        brightness: "1000 nits (typical), 1200 nits (peak)",
        protection: "Ceramic Shield glass",
        cpu: "Apple A15 Bionic (5 nm) — 6-core",
        gpu: "Apple GPU (5-core graphics)",
        fabrication: "5 nm",
        storage_type: "NVMe",
        cam_count: "Triple",
        cam_main_sensor: "12 MP, f/1.5, Sensor-shift OIS",
        cam_ultrawide: "12 MP, f/1.8, PDAF, Macro photography",
        cam_telephoto: "12 MP, f/2.8, OIS, 3x optical zoom",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps, ProRes, Cinematic mode",
        cam_front_resolution: "12 MP, f/2.2, 23mm + SL 3D",
        cam_front_video: "4K@24/30/60fps, 1080p@30/60/120fps",
        battery_capacity: "4,352 mAh",
        charging_wired: "27W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 7.5W Qi",
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.0",
        usb_version: "USB 2.0",
        android_version: "iOS 15",
        ui_version: "iOS 15 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        pros: ["Legendary battery life", "Huge 120Hz display", "Exceptional camera system", "Top-tier performance"],
        cons: ["Very heavy at 240g", "Huge notch still present", "Takes long time to fully charge"],
        faqs: [
          { question: "How is the battery life?", answer: "It was rated as one of the best battery life phones ever released by Apple." }
        ]
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
