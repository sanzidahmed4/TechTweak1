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
      slug: "iphone-15",
      updateData: {
        weight: "171 g",
        dimensions: "147.6 × 71.6 × 7.8 mm",
        build_material: "Ceramic Shield front, color-infused glass back, aluminum frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "Super Retina XDR OLED, Dynamic Island",
        pixel_density: "461 ppi",
        brightness: "1000 nits (typical), 2000 nits (peak outdoor)",
        protection: "Ceramic Shield glass",
        cpu: "Apple A16 Bionic (4 nm) — 6-core",
        gpu: "Apple GPU (5-core graphics)",
        fabrication: "4 nm",
        storage_type: "NVMe",
        cam_count: "Dual",
        cam_main_sensor: "48 MP, f/1.6, 26mm, Sensor-shift OIS, support for 24MP and 48MP photos",
        cam_ultrawide: "12 MP, f/2.4, 13mm, 120°",
        cam_video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, Cinematic mode (4K@30fps)",
        cam_front_resolution: "12 MP, f/1.9, 23mm, PDAF + SL 3D",
        cam_front_video: "4K@24/25/30/60fps, 1080p@25/30/60/120fps",
        battery_capacity: "3,349 mAh",
        charging_wired: "20W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 7.5W Qi, 15W Qi2 (after update)",
        wifi_version: "Wi-Fi 6 (802.11ax)",
        bluetooth_version: "Bluetooth 5.3",
        usb_version: "USB-C (USB 2.0)",
        android_version: "iOS 17",
        ui_version: "iOS 17 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        pros: ["Dynamic Island on the base model", "New 48MP main camera is a huge upgrade", "Color-infused matte glass looks premium", "USB-C transition is finally here"],
        cons: ["USB 2.0 transfer speeds only", "Still 60Hz display", "No telephoto lens"],
        faqs: [
          { question: "Does iPhone 15 have USB-C?", answer: "Yes, all iPhone 15 models moved from Lightning to USB-C." }
        ]
      }
    },
    {
      slug: "iphone-15-pro-max",
      updateData: {
        weight: "221 g",
        dimensions: "159.9 × 76.7 × 8.25 mm",
        build_material: "Ceramic Shield front, glass back, Grade 5 titanium frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "LTPO Super Retina XDR OLED, 120Hz, Dynamic Island",
        pixel_density: "460 ppi",
        brightness: "1000 nits (typical), 2000 nits (peak outdoor)",
        protection: "Ceramic Shield glass",
        cpu: "Apple A17 Pro (3 nm) — 6-core",
        gpu: "Apple GPU (6-core graphics with ray tracing)",
        fabrication: "3 nm",
        storage_type: "NVMe",
        cam_count: "Triple",
        cam_main_sensor: "48 MP, f/1.78, 24mm, Sensor-shift OIS (2nd gen)",
        cam_ultrawide: "12 MP, f/2.2, 13mm, 120°, dual pixel PDAF",
        cam_telephoto: "12 MP, f/2.8, 120mm, 5x optical zoom (Tetraprism), 3D sensor‑shift OIS",
        cam_video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, ProRes, Cinematic mode, Log encoding",
        cam_front_resolution: "12 MP, f/1.9, 23mm, PDAF + SL 3D",
        cam_front_video: "4K@24/25/30/60fps, 1080p@25/30/60/120fps",
        battery_capacity: "4,441 mAh",
        charging_wired: "20W wired, 50% in 30 min",
        charging_wireless: "15W MagSafe, 15W Qi2",
        wifi_version: "Wi-Fi 6E (802.11ax)",
        bluetooth_version: "Bluetooth 5.3",
        usb_version: "USB-C (USB 3.2 Gen 2 - up to 10Gbps)",
        android_version: "iOS 17",
        ui_version: "iOS 17 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        pros: ["Lighter titanium build is much better in hand", "5x tetraprism zoom camera works excellently", "A17 Pro enables console-level gaming", "Fast USB 3.0 speeds"],
        cons: ["Very expensive", "Takes long time to fully charge", "Action button replaces convenient mute switch for some"],
        faqs: [
          { question: "What zoom does 15 Pro Max have?", answer: "It has a 12MP telephoto camera with 5x optical zoom." }
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
