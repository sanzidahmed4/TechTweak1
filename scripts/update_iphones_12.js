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
      slug: "iphone-12-mini",
      updateData: {
        // Design & Build
        weight: "135 g",
        dimensions: "131.5 × 64.2 × 7.4 mm",
        build_material: "Ceramic Shield front, glass back, aluminum frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        // Display
        display_type: "Super Retina XDR OLED, HDR10, Dolby Vision",
        pixel_density: "476 ppi",
        brightness: "625 nits (typical), 1200 nits (peak)",
        protection: "Ceramic Shield glass",
        // Performance
        cpu: "Apple A14 Bionic (5 nm) — 6-core",
        gpu: "Apple GPU (4-core graphics)",
        fabrication: "5 nm",
        storage_type: "NVMe",
        // Camera
        cam_count: "Dual",
        cam_main_sensor: "12 MP, f/1.6, 26mm, OIS, dual pixel PDAF",
        cam_ultrawide: "12 MP, f/2.4, 13mm, 120°",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps, HDR, Dolby Vision HDR",
        cam_front_resolution: "12 MP, f/2.2, 23mm + SL 3D (depth/biometrics sensor)",
        cam_front_video: "4K@24/30/60fps, 1080p@30/60/120fps",
        // Battery & Charging
        battery_capacity: "2,227 mAh",
        charging_wired: "20W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 7.5W Qi",
        // Connectivity
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.0",
        usb_version: "USB 2.0",
        // Software & Sensors
        android_version: "iOS 14.1",
        ui_version: "iOS 14.1 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        // Pros & Cons
        pros: ["Extremely compact and lightweight", "Stunning OLED display", "Flagship performance with A14", "MagSafe support"],
        cons: ["Battery life is on the shorter side", "60Hz display only", "No charger in box"],
        faqs: [
          { question: "Is iPhone 12 mini battery good?", answer: "It is decent for a small phone but power users may need to charge it during the day." },
          { question: "Does it support MagSafe?", answer: "Yes, it supports up to 15W MagSafe charging." }
        ]
      }
    },
    {
      slug: "iphone-12",
      updateData: {
        weight: "164 g",
        dimensions: "146.7 × 71.5 × 7.4 mm",
        build_material: "Ceramic Shield front, glass back, aluminum frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "Super Retina XDR OLED, HDR10, Dolby Vision",
        pixel_density: "460 ppi",
        brightness: "625 nits (typical), 1200 nits (peak)",
        protection: "Ceramic Shield glass",
        cpu: "Apple A14 Bionic (5 nm) — 6-core",
        gpu: "Apple GPU (4-core graphics)",
        fabrication: "5 nm",
        storage_type: "NVMe",
        cam_count: "Dual",
        cam_main_sensor: "12 MP, f/1.6, 26mm, OIS, dual pixel PDAF",
        cam_ultrawide: "12 MP, f/2.4, 13mm, 120°",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps, HDR, Dolby Vision HDR",
        cam_front_resolution: "12 MP, f/2.2, 23mm + SL 3D",
        cam_front_video: "4K@24/30/60fps, 1080p@30/60/120fps",
        battery_capacity: "2,815 mAh",
        charging_wired: "20W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 7.5W Qi",
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.0",
        usb_version: "USB 2.0",
        android_version: "iOS 14.1",
        ui_version: "iOS 14.1 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        pros: ["Brilliant OLED display", "A14 Bionic is still very fast", "MagSafe is convenient", "Great video recording"],
        cons: ["Still 60Hz refresh rate", "Battery life is just average", "No telephoto lens"],
        faqs: [
          { question: "Does iPhone 12 have OLED?", answer: "Yes, it moved to a Super Retina XDR OLED display from the LCD on iPhone 11." }
        ]
      }
    },
    {
      slug: "iphone-12-pro",
      updateData: {
        weight: "189 g",
        dimensions: "146.7 × 71.5 × 7.4 mm",
        build_material: "Ceramic Shield front, glass back, stainless steel frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "Super Retina XDR OLED, HDR10, Dolby Vision",
        pixel_density: "460 ppi",
        brightness: "800 nits (typical), 1200 nits (peak)",
        protection: "Ceramic Shield glass",
        cpu: "Apple A14 Bionic (5 nm) — 6-core",
        gpu: "Apple GPU (4-core graphics)",
        fabrication: "5 nm",
        storage_type: "NVMe",
        cam_count: "Triple",
        cam_main_sensor: "12 MP, f/1.6, 26mm, OIS, dual pixel PDAF",
        cam_ultrawide: "12 MP, f/2.4, 13mm, 120°",
        cam_telephoto: "12 MP, f/2.0, 52mm, OIS, 2x optical zoom",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps, 10-bit HDR, Dolby Vision HDR",
        cam_front_resolution: "12 MP, f/2.2, 23mm + SL 3D",
        cam_front_video: "4K@24/30/60fps, 1080p@30/60/120fps",
        battery_capacity: "2,815 mAh",
        charging_wired: "20W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 7.5W Qi",
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.0",
        usb_version: "USB 2.0",
        android_version: "iOS 14.1",
        ui_version: "iOS 14.1 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        pros: ["Premium stainless steel build", "LiDAR scanner for better low-light focus", "ProRAW support for photos", "Versatile triple camera"],
        cons: ["Battery life could be better", "No high refresh rate", "Heavy due to stainless steel"],
        faqs: [
          { question: "What does the LiDAR scanner do?", answer: "It measures depth for better AR experiences and improves camera autofocus in low light." }
        ]
      }
    },
    {
      slug: "iphone-12-pro-max",
      updateData: {
        weight: "228 g",
        dimensions: "160.8 × 78.1 × 7.4 mm",
        build_material: "Ceramic Shield front, glass back, stainless steel frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "Super Retina XDR OLED, HDR10, Dolby Vision",
        pixel_density: "458 ppi",
        brightness: "800 nits (typical), 1200 nits (peak)",
        protection: "Ceramic Shield glass",
        cpu: "Apple A14 Bionic (5 nm) — 6-core",
        gpu: "Apple GPU (4-core graphics)",
        fabrication: "5 nm",
        storage_type: "NVMe",
        cam_count: "Triple",
        cam_main_sensor: "12 MP, f/1.6, 26mm, Sensor-shift OIS",
        cam_ultrawide: "12 MP, f/2.4, 13mm, 120°",
        cam_telephoto: "12 MP, f/2.2, 65mm, OIS, 2.5x optical zoom",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps, 10-bit HDR, Dolby Vision HDR",
        cam_front_resolution: "12 MP, f/2.2, 23mm + SL 3D",
        cam_front_video: "4K@24/30/60fps, 1080p@30/60/120fps",
        battery_capacity: "3,687 mAh",
        charging_wired: "20W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 7.5W Qi",
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.0",
        usb_version: "USB 2.0",
        android_version: "iOS 14.1",
        ui_version: "iOS 14.1 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        pros: ["Massive, gorgeous display", "Sensor-shift OIS is incredible for video", "Longest battery life in the 12 series", "2.5x optical zoom"],
        cons: ["Very large and heavy", "Slower charging than competitors", "No 120Hz display"],
        faqs: [
          { question: "What is Sensor-shift OIS?", answer: "It stabilizes the camera sensor instead of the lens, providing superior image stabilization." }
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
