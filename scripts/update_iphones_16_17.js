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
      slug: "iphone-16",
      updateData: {
        weight: "170 g",
        dimensions: "147.6 × 71.6 × 7.8 mm",
        build_material: "Ceramic Shield front, glass back, aluminum frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "Super Retina XDR OLED, Dynamic Island",
        pixel_density: "460 ppi",
        brightness: "1000 nits (typical), 2000 nits (peak outdoor)",
        protection: "Latest Ceramic Shield glass",
        cpu: "Apple A18 (3 nm) — 6-core",
        gpu: "Apple GPU (5-core graphics)",
        fabrication: "3 nm",
        storage_type: "NVMe",
        cam_count: "Dual",
        cam_main_sensor: "48 MP, f/1.6, 26mm, Sensor-shift OIS (supports Camera Control)",
        cam_ultrawide: "12 MP, f/2.2, 13mm, 120°, autofocus (Macro supported)",
        cam_video: "4K@24/30/60fps, 1080p@30/60/120/240fps, Spatial video",
        cam_front_resolution: "12 MP, f/1.9, 23mm, PDAF + SL 3D",
        cam_front_video: "4K@24/25/30/60fps, 1080p@25/30/60/120fps",
        battery_capacity: "3,561 mAh",
        charging_wired: "25W wired",
        charging_wireless: "25W MagSafe, 15W Qi2",
        wifi_version: "Wi-Fi 7 (802.11be)",
        bluetooth_version: "Bluetooth 5.3",
        usb_version: "USB-C (USB 2.0)",
        android_version: "iOS 18",
        ui_version: "iOS 18 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        ai_features: ["Apple Intelligence", "Writing Tools", "Clean Up in Photos", "Genmoji"],
        pros: ["Camera Control button is innovative", "Massive jump to A18 chip from base 15", "Apple Intelligence support with 8GB RAM", "Wi-Fi 7"],
        cons: ["Still 60Hz display", "USB 2.0 transfer speeds only", "No telephoto lens"],
        faqs: [
          { question: "What is Camera Control?", answer: "It's a dedicated capacitive button on the side to quickly take photos and adjust settings like zoom." }
        ]
      }
    },
    {
      slug: "iphone-16-pro-max",
      updateData: {
        weight: "227 g",
        dimensions: "163 × 77.6 × 8.25 mm",
        build_material: "Ceramic Shield front, glass back, Grade 5 titanium frame",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "LTPO Super Retina XDR OLED, 120Hz, Dynamic Island",
        pixel_density: "460 ppi",
        brightness: "1000 nits (typical), 2000 nits (peak outdoor)",
        protection: "Latest Ceramic Shield glass",
        cpu: "Apple A18 Pro (3 nm) — 6-core",
        gpu: "Apple GPU (6-core graphics)",
        fabrication: "3 nm",
        storage_type: "NVMe",
        cam_count: "Triple",
        cam_main_sensor: "48 MP, f/1.78, 24mm, Sensor-shift OIS",
        cam_ultrawide: "48 MP, f/2.2, 13mm, PDAF (Higher res macro)",
        cam_telephoto: "12 MP, f/2.8, 120mm, 5x optical zoom (Tetraprism)",
        cam_video: "4K@120fps Dolby Vision, 1080p@240fps, ProRes, Log",
        cam_front_resolution: "12 MP, f/1.9, 23mm, PDAF + SL 3D",
        cam_front_video: "4K@24/25/30/60fps, 1080p@25/30/60/120fps",
        battery_capacity: "4,685 mAh",
        charging_wired: "30W wired",
        charging_wireless: "25W MagSafe, 15W Qi2",
        charging_reverse: "Not specified",
        wifi_version: "Wi-Fi 7 (802.11be)",
        bluetooth_version: "Bluetooth 5.3",
        usb_version: "USB-C (USB 3.2 Gen 2)",
        android_version: "iOS 18",
        ui_version: "iOS 18 (upgradable)",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        cam_front_hdr: "N/A",
        cam_front_portrait: "N/A",
        has_live_translation: false,
        has_ai_editing: false,
        ai_features: [
          "Apple Intelligence fully supported",
          "Next-Gen AI Voice Assistant (Siri with Apple Intelligence)",
          "Visual Intelligence via Camera Control"
        ],
        pros: ["Huge 6.9-inch display is beautiful", "New 48MP Ultrawide camera is great for macro", "4K 120fps video recording is class-leading", "Excellent battery life"],
        cons: ["Very large and heavy", "Extremely expensive", "Camera control button takes time to get used to"],
        faqs: [
          { question: "Can it shoot 4K at 120fps?", answer: "Yes, it can shoot 4K at 120fps in Dolby Vision." }
        ]
      }
    },
    {
      slug: "iphone-17-air",
      updateData: {
        weight: "Ultra-light (approx 165g)",
        dimensions: "162 × 77 × 5.6 mm (Ultra-thin)",
        build_material: "Titanium chassis, Ceramic Shield front, glass back",
        water_resistance: "IP68 — up to 6m for 30 mins",
        display_type: "Super Retina XDR OLED with ProMotion",
        pixel_density: "460 ppi (approx)",
        refresh_rate: "120 Hz",
        cpu: "Apple A19 Pro (3 nm) — 6-core",
        gpu: "Apple GPU (5-core graphics)",
        fabrication: "3 nm (N3P)",
        storage_type: "NVMe",
        cam_count: "Single",
        cam_main_sensor: "48 MP, f/1.8, OIS",
        cam_video: "4K@60fps",
        cam_front_resolution: "18 MP, Center Stage",
        has_5g: true,
        usb_type: "USB-C",
        sensor_fingerprint: "Face ID",
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: true,
        ai_features: ["Apple Intelligence fully supported"],
        pros: ["Striking ultra-thin 5.6mm design", "120Hz ProMotion on a non-Pro tier", "Lightweight Titanium build", "Action and Camera Control buttons"],
        cons: ["Single rear camera only (to maintain slimness)", "Battery capacity might be limited by thickness", "Starts at a high price of $999"],
        faqs: [
          { question: "How thin is the iPhone 17 Air?", answer: "It is approximately 5.6mm thin, making it the thinnest iPhone ever." }
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
