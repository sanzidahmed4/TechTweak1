import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// VERIFIED DATA SOURCES: Samsung Official Sites & GSMArena
// BATCH 5: Remaining A-Series Budget and Legacy Devices

const verifiedSpecs: Record<string, any> = {
  "samsung-galaxy-a51-5g": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 3), plastic back, aluminum frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 2.1",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB",
    weight: "187 g",
    dimensions: "158.9 x 73.6 x 8.7 mm",
    video_recording: "4K@30fps, 1080p@30/120fps; gyro-EIS"
  },
  "samsung-galaxy-a51": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 3), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 2.0",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "64GB, 128GB, 256GB",
    weight: "172 g",
    dimensions: "158.5 x 73.6 x 7.9 mm",
    video_recording: "4K@30fps, 1080p@30/120fps; gyro-EIS"
  },
  "samsung-galaxy-a50s": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 3), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 2.1",
    ram_variants: "4GB, 6GB",
    storage_variants: "64GB, 128GB",
    weight: "169 g",
    dimensions: "158.5 x 74.5 x 7.7 mm",
    video_recording: "4K@30fps, 1080p@30fps, gyro-EIS"
  },
  "samsung-galaxy-a50": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 3), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 2.1",
    ram_variants: "4GB, 6GB",
    storage_variants: "64GB, 128GB",
    weight: "166 g",
    dimensions: "158.5 x 74.7 x 7.7 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a31": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "64GB, 128GB",
    weight: "185 g",
    dimensions: "159.3 x 73.1 x 8.6 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a30s": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "3GB, 4GB",
    storage_variants: "32GB, 64GB, 128GB",
    weight: "169 g",
    dimensions: "158.5 x 74.7 x 7.8 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a30": {
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
    storage_type: "eMMC 5.1",
    ram_variants: "3GB, 4GB",
    storage_variants: "32GB, 64GB",
    weight: "165 g",
    dimensions: "158.5 x 74.7 x 7.7 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a20s": {
    bluetooth_version: "4.2, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 b/g/n, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: false,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (rear-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "3GB, 4GB",
    storage_variants: "32GB, 64GB",
    weight: "183 g",
    dimensions: "163.3 x 77.5 x 8 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a20": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 b/g/n, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 3), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (rear-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "3GB",
    storage_variants: "32GB",
    weight: "169 g",
    dimensions: "158.4 x 74.7 x 7.8 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a12": {
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
    ram_variants: "2GB, 3GB, 4GB, 6GB",
    storage_variants: "32GB, 64GB, 128GB",
    weight: "205 g",
    dimensions: "164 x 75.8 x 8.9 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a10s": {
    bluetooth_version: "4.2, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 b/g/n, Wi-Fi Direct",
    usb_type: "microUSB 2.0, OTG",
    usb_version: "2.0",
    has_nfc: false,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (rear-mounted)",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "2GB, 3GB",
    storage_variants: "32GB",
    weight: "168 g",
    dimensions: "156.9 x 75.8 x 7.8 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a10": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 b/g/n, Wi-Fi Direct",
    usb_type: "microUSB 2.0, OTG",
    usb_version: "2.0",
    has_nfc: false,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "No",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "2GB, 4GB",
    storage_variants: "32GB",
    weight: "168 g",
    dimensions: "155.6 x 75.6 x 7.9 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a05": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: false,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "No",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "4GB, 6GB",
    storage_variants: "64GB, 128GB",
    weight: "195 g",
    dimensions: "168.8 x 78.2 x 8.8 mm",
    video_recording: "1080p@30/60fps"
  },
  "samsung-galaxy-a04s": {
    bluetooth_version: "5.0, A2DP, LE",
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
    storage_type: "eMMC 5.1",
    ram_variants: "3GB, 4GB",
    storage_variants: "32GB, 64GB, 128GB",
    weight: "195 g",
    dimensions: "164.7 x 76.7 x 9.1 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a04e": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 b/g/n, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: false,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "No",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "3GB, 4GB",
    storage_variants: "32GB, 64GB, 128GB",
    weight: "188 g",
    dimensions: "164.2 x 75.9 x 9.1 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a04": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: false,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "No",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "3GB, 4GB, 6GB, 8GB",
    storage_variants: "32GB, 64GB, 128GB",
    weight: "192 g",
    dimensions: "164.4 x 76.3 x 9.1 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a03s": {
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
    ram_variants: "2GB, 3GB, 4GB",
    storage_variants: "32GB, 64GB",
    weight: "196 g",
    dimensions: "164.2 x 75.9 x 9.1 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a03-core": {
    bluetooth_version: "4.2, A2DP",
    wifi_version: "Wi-Fi 802.11 b/g/n, Wi-Fi Direct",
    usb_type: "microUSB 2.0, OTG",
    usb_version: "2.0",
    has_nfc: false,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "No",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "2GB",
    storage_variants: "32GB",
    weight: "211 g",
    dimensions: "164.2 x 75.9 x 9.1 mm",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a03": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "microUSB 2.0",
    usb_version: "2.0",
    has_nfc: false,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "No",
    cam_ois: "No",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "3GB, 4GB",
    storage_variants: "32GB, 64GB, 128GB",
    weight: "196 g",
    dimensions: "164.2 x 75.9 x 9.1 mm",
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
    
    console.log("\\n=== SEEDING BATCH 5 (Remaining A-Series) ===");
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
    }
    
    console.log("✅ Batch 5 Successfully Injected");
  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
