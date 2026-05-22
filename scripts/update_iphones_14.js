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
      slug: "iphone-14",
      updateData: {
        weight: "172 g",
        dimensions: "146.7 × 71.5 × 7.8 mm",
        build_material: "Ceramic Shield front, glass back, aluminum frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "Super Retina XDR OLED, HDR10, Dolby Vision",
        pixel_density: "460 ppi",
        brightness: "800 nits (typical), 1200 nits (peak)",
        protection: "Ceramic Shield glass",
        cpu: "Apple A15 Bionic (5 nm) — 6-core (5-core GPU variant)",
        gpu: "Apple GPU (5-core graphics)",
        fabrication: "5 nm",
        storage_type: "NVMe",
        cam_count: "Dual",
        cam_main_sensor: "12 MP, f/1.5, 26mm, Sensor-shift OIS",
        cam_ultrawide: "12 MP, f/2.4, 13mm, 120°",
        cam_video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, Cinematic mode (4K@30fps)",
        cam_front_resolution: "12 MP, f/1.9, 23mm, PDAF (Autofocus)",
        cam_front_video: "4K@24/25/30/60fps, 1080p@25/30/60/120fps",
        battery_capacity: "3,279 mAh",
        charging_wired: "20W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 7.5W Qi",
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.3",
        usb_version: "USB 2.0",
        android_version: "iOS 16",
        ui_version: "iOS 16 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        pros: ["Upgraded front camera with autofocus", "Action mode for super steady video", "Crash Detection and Satellite SOS", "Good battery life"],
        cons: ["Very minor upgrade over iPhone 13", "Still uses A15 chip (though with 5-core GPU)", "Still 60Hz display"],
        faqs: [
          { question: "What chip does iPhone 14 use?", answer: "It uses the A15 Bionic with a 5-core GPU, which was used in the 13 Pro models." }
        ]
      }
    },
    {
      slug: "iphone-14-plus",
      updateData: {
        weight: "203 g",
        dimensions: "160.8 × 78.1 × 7.8 mm",
        build_material: "Ceramic Shield front, glass back, aluminum frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "Super Retina XDR OLED, HDR10, Dolby Vision",
        pixel_density: "458 ppi",
        brightness: "800 nits (typical), 1200 nits (peak)",
        protection: "Ceramic Shield glass",
        cpu: "Apple A15 Bionic (5 nm) — 6-core (5-core GPU)",
        gpu: "Apple GPU (5-core graphics)",
        fabrication: "5 nm",
        storage_type: "NVMe",
        cam_count: "Dual",
        cam_main_sensor: "12 MP, f/1.5, 26mm, Sensor-shift OIS",
        cam_ultrawide: "12 MP, f/2.4, 13mm, 120°",
        cam_video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, Cinematic mode (4K@30fps)",
        cam_front_resolution: "12 MP, f/1.9, 23mm, PDAF",
        cam_front_video: "4K@24/25/30/60fps, 1080p@25/30/60/120fps",
        battery_capacity: "4,325 mAh",
        charging_wired: "20W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 7.5W Qi",
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.3",
        usb_version: "USB 2.0",
        android_version: "iOS 16",
        ui_version: "iOS 16 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        pros: ["Massive display for non-Pro price", "Incredible battery life", "Lighter than Pro Max", "Great video stabilization"],
        cons: ["Still 60Hz display", "No telephoto camera", "A15 chip from last year"],
        faqs: [
          { question: "How is the battery on 14 Plus?", answer: "It has one of the best battery lives in iPhone history, matching or beating the Pro Max in some tests." }
        ]
      }
    },
    {
      slug: "iphone-14-pro",
      updateData: {
        weight: "206 g",
        dimensions: "147.5 × 71.5 × 7.85 mm",
        build_material: "Ceramic Shield front, glass back, stainless steel frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "LTPO Super Retina XDR OLED, 120Hz, Dynamic Island",
        pixel_density: "460 ppi",
        brightness: "1000 nits (typical), 2000 nits (peak outdoor)",
        protection: "Ceramic Shield glass",
        cpu: "Apple A16 Bionic (4 nm) — 6-core",
        gpu: "Apple GPU (5-core graphics)",
        fabrication: "4 nm",
        storage_type: "NVMe",
        cam_count: "Triple",
        cam_main_sensor: "48 MP, f/1.78, 24mm, Sensor-shift OIS (2nd gen)",
        cam_ultrawide: "12 MP, f/2.2, 13mm, 120°, dual pixel PDAF",
        cam_telephoto: "12 MP, f/2.8, 77mm, OIS, 3x optical zoom",
        cam_video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, 10-bit HDR, ProRes, Cinematic mode",
        cam_front_resolution: "12 MP, f/1.9, 23mm, PDAF + SL 3D",
        cam_front_video: "4K@24/25/30/60fps, 1080p@25/30/60/120fps",
        battery_capacity: "3,200 mAh",
        charging_wired: "20W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 7.5W Qi",
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.3",
        usb_version: "USB 2.0",
        android_version: "iOS 16",
        ui_version: "iOS 16 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        pros: ["Dynamic Island is a great software interaction", "New 48MP main camera is a huge leap", "Always-On display", "Stunning outdoor brightness"],
        cons: ["Battery life slightly worse than 13 Pro", "Lightning port still at USB 2.0 speeds", "Heavy phone"],
        faqs: [
          { question: "What is Dynamic Island?", answer: "It's a pill-shaped cutout that expands interactively to show notifications and background activity." }
        ]
      }
    },
    {
      slug: "iphone-14-pro-max",
      updateData: {
        weight: "240 g",
        dimensions: "160.7 × 77.6 × 7.85 mm",
        build_material: "Ceramic Shield front, glass back, stainless steel frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "LTPO Super Retina XDR OLED, 120Hz, Dynamic Island",
        pixel_density: "460 ppi",
        brightness: "1000 nits (typical), 2000 nits (peak outdoor)",
        protection: "Ceramic Shield glass",
        cpu: "Apple A16 Bionic (4 nm) — 6-core",
        gpu: "Apple GPU (5-core graphics)",
        fabrication: "4 nm",
        storage_type: "NVMe",
        cam_count: "Triple",
        cam_main_sensor: "48 MP, f/1.78, 24mm, Sensor-shift OIS (2nd gen)",
        cam_ultrawide: "12 MP, f/2.2, 13mm, 120°",
        cam_telephoto: "12 MP, f/2.8, 77mm, OIS, 3x optical zoom",
        cam_video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, 10-bit HDR, ProRes, Cinematic mode",
        cam_front_resolution: "12 MP, f/1.9, 23mm, PDAF + SL 3D",
        cam_front_video: "4K@24/25/30/60fps, 1080p@25/30/60/120fps",
        battery_capacity: "4,323 mAh",
        charging_wired: "20W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 7.5W Qi",
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.3",
        usb_version: "USB 2.0",
        android_version: "iOS 16",
        ui_version: "iOS 16 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        pros: ["Huge immersive display", "Dynamic Island integration", "Incredible 48MP photos", "Superb battery life"],
        cons: ["Extremely heavy at 240g", "Very expensive", "No faster charging"],
        faqs: [
          { question: "Does it have Always-On display?", answer: "Yes, it introduced Apple's implementation of the Always-On display." }
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
