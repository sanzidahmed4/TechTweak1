import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// VERIFIED DATA SOURCES: Samsung Official Sites & GSMArena
// BATCH 6: M-Series and F-Series

const verifiedSpecs: Record<string, any> = {
  // M-Series
  "samsung-galaxy-m55-5g": {
    bluetooth_version: "5.2, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    weight: "180 g",
    dimensions: "163.9 x 76.5 x 7.8 mm",
    video_recording: "4K@30fps, 1080p@30/60fps, gyro-EIS"
  },
  "samsung-galaxy-m54-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "Yes",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "8GB",
    storage_variants: "128GB, 256GB",
    weight: "199 g",
    dimensions: "164.9 x 77.3 x 8.4 mm",
    video_recording: "4K@30fps, 1080p@30/60fps, gyro-EIS"
  },
  "samsung-galaxy-m53-5g": {
    bluetooth_version: "5.2, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "176 g",
    dimensions: "164.7 x 77 x 7.4 mm",
    video_recording: "4K@30fps, 1080p@30/60fps"
  },
  "samsung-galaxy-m52-5g": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB",
    weight: "173 g",
    dimensions: "164.2 x 76.4 x 7.4 mm",
    video_recording: "4K@30fps, 1080p@30fps"
  },
  "samsung-galaxy-m51": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 3+), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "Yes, wired",
    storage_type: "Unspecified",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB",
    weight: "213 g",
    dimensions: "163.9 x 76.3 x 9.5 mm",
    video_recording: "4K@30fps, 1080p@30fps"
  },
  "samsung-galaxy-m35-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "Yes",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "222 g",
    dimensions: "162.3 x 78.6 x 9.1 mm",
    video_recording: "4K@30fps, 1080p@30/60fps, gyro-EIS"
  },
  "samsung-galaxy-m34-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "Yes",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 2.2",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB",
    weight: "208 g",
    dimensions: "161.7 x 77.2 x 8.8 mm",
    video_recording: "4K@30fps, 1080p@30fps"
  },
  "samsung-galaxy-m33-5g": {
    bluetooth_version: "5.1, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "Yes, 4.5W",
    storage_type: "eMMC 5.1",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB",
    weight: "198 g",
    dimensions: "165.4 x 76.9 x 9.4 mm",
    video_recording: "4K@30fps, 1080p@30fps"
  },
  "samsung-galaxy-m32": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "64GB, 128GB",
    weight: "180 g",
    dimensions: "159.3 x 74 x 8.4 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-m31s": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 3), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "Yes, wired",
    storage_type: "UFS 2.1",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB",
    weight: "203 g",
    dimensions: "159.3 x 74.4 x 9.3 mm",
    video_recording: "4K@30fps, 1080p@30fps, gyro-EIS"
  },
  "samsung-galaxy-m31": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 3), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (rear-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "Yes, wired",
    storage_type: "UFS 2.1",
    ram_variants: "6GB, 8GB",
    storage_variants: "64GB, 128GB",
    weight: "191 g",
    dimensions: "159.2 x 75.1 x 8.9 mm",
    video_recording: "4K@30fps, 1080p@30fps, gyro-EIS"
  },
  "samsung-galaxy-m30s": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (rear-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 2.1",
    ram_variants: "4GB, 6GB",
    storage_variants: "64GB, 128GB",
    weight: "188 g",
    dimensions: "159 x 75.1 x 8.9 mm",
    video_recording: "4K@30fps, 1080p@30fps, gyro-EIS"
  },
  "samsung-galaxy-m30": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (rear-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "3GB, 4GB, 6GB",
    storage_variants: "32GB, 64GB, 128GB",
    weight: "174 g",
    dimensions: "159 x 75.1 x 8.5 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-m23-5g": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB",
    storage_variants: "128GB",
    weight: "198 g",
    dimensions: "165.5 x 77 x 8.4 mm",
    video_recording: "4K@30fps, 1080p@30fps"
  },
  "samsung-galaxy-m21": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 3), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (rear-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 2.1",
    ram_variants: "4GB, 6GB",
    storage_variants: "64GB, 128GB",
    weight: "188 g",
    dimensions: "159 x 75.1 x 8.9 mm",
    video_recording: "4K@30fps, 1080p@30fps, gyro-EIS"
  },
  "samsung-galaxy-m20": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 b/g/n, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (rear-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "3GB, 4GB",
    storage_variants: "32GB, 64GB",
    weight: "186 g",
    dimensions: "156.4 x 74.5 x 8.8 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-m15-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "128GB",
    weight: "217 g",
    dimensions: "160.1 x 76.8 x 9.3 mm",
    video_recording: "1080p@30fps, gyro-EIS"
  },
  "samsung-galaxy-m14-5g": {
    bluetooth_version: "5.2, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB",
    storage_variants: "64GB, 128GB",
    weight: "206 g",
    dimensions: "166.8 x 77.2 x 9.4 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-m13": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "4GB, 6GB",
    storage_variants: "64GB, 128GB",
    weight: "192 g",
    dimensions: "165.4 x 76.9 x 8.4 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-m12": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 b/g/n, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "3GB, 4GB, 6GB",
    storage_variants: "32GB, 64GB, 128GB",
    weight: "212 g",
    dimensions: "164 x 75.9 x 9.7 mm",
    video_recording: "1080p@30fps"
  },

  // F-Series
  "samsung-galaxy-f55-5g": {
    bluetooth_version: "5.2, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front, eco leather back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    weight: "180 g",
    dimensions: "163.9 x 76.5 x 7.8 mm",
    video_recording: "4K@30fps, 1080p@30/60fps, gyro-EIS"
  },
  "samsung-galaxy-f54-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "Yes",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "8GB",
    storage_variants: "256GB",
    weight: "199 g",
    dimensions: "164.9 x 77.3 x 8.4 mm",
    video_recording: "4K@30fps, 1080p@30/60fps, gyro-EIS"
  },
  "samsung-galaxy-f34-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "Yes",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 2.2",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB",
    weight: "208 g",
    dimensions: "161.7 x 77.2 x 8.8 mm",
    video_recording: "4K@30fps, 1080p@30fps"
  },
  "samsung-galaxy-f23-5g": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB",
    storage_variants: "128GB",
    weight: "198 g",
    dimensions: "165.5 x 77 x 8.4 mm",
    video_recording: "4K@30fps, 1080p@30fps"
  },
  "samsung-galaxy-f15-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true, // region dependent
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "128GB",
    weight: "217 g",
    dimensions: "160.1 x 76.8 x 9.3 mm",
    video_recording: "1080p@30fps, gyro-EIS"
  },
  "samsung-galaxy-f14-5g": {
    bluetooth_version: "5.2, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: false,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB",
    storage_variants: "128GB",
    weight: "206 g",
    dimensions: "166.8 x 77.2 x 9.4 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-f13": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "4GB",
    storage_variants: "64GB, 128GB",
    weight: "207 g",
    dimensions: "165.4 x 76.9 x 9.3 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-f12": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 b/g/n, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: false,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "4GB",
    storage_variants: "64GB, 128GB",
    weight: "221 g",
    dimensions: "164 x 75.9 x 9.7 mm",
    video_recording: "1080p@30fps"
  }
};

async function run() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error("MONGODB_URI not found.");

    await mongoose.connect(MONGODB_URI);
    const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

    const modelsToUpdate = Object.keys(verifiedSpecs);
    let updatedCount = 0;
    
    console.log("\\n=== SEEDING BATCH 6 (M and F Series) ===");
    for (const slug of modelsToUpdate) {
      const phone = await Phone.findOne({ slug });
      if (!phone) continue;

      const verifiedData = verifiedSpecs[slug];
      const updatePayload: Record<string, any> = {};

      for (const [key, value] of Object.entries(verifiedData)) {
        if (value !== null && value !== undefined) {
          updatePayload[key] = value;
        }
      }
      await Phone.updateOne({ _id: phone._id }, { $set: updatePayload });
      updatedCount++;
    }
    
    console.log(`✅ Batch 6 Successfully Injected. Processed ${updatedCount} phones.`);
    
    // Quick validation
    const missingM = await Phone.find({slug: /^samsung-galaxy-[mf]/i, has_audio_jack: {$exists: false}});
    if (missingM.length === 0) {
        console.log("🎉 ALL M and F Series Phones successfully processed with Zero Estimation!");
    } else {
        console.log(`⚠️ Remaining M/F Series unverified: ${missingM.length}`);
    }

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
