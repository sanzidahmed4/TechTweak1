import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// VERIFIED GSMARENA DATA SOURCES (Part 2 - Older High Volume A Series):
// A73 5G: https://www.gsmarena.com/samsung_galaxy_a73_5g-11257.php
// A53 5G: https://www.gsmarena.com/samsung_galaxy_a53_5g-11268.php
// A33 5G: https://www.gsmarena.com/samsung_galaxy_a33_5g-11149.php
// A23: https://www.gsmarena.com/samsung_galaxy_a23-11373.php
// A13: https://www.gsmarena.com/samsung_galaxy_a13-11402.php
// A72: https://www.gsmarena.com/samsung_galaxy_a72-10469.php
// A52s 5G: https://www.gsmarena.com/samsung_galaxy_a52s_5g-11039.php
// A52 5G: https://www.gsmarena.com/samsung_galaxy_a52_5g-10631.php
// A52: https://www.gsmarena.com/samsung_galaxy_a52-10641.php
// A32: https://www.gsmarena.com/samsung_galaxy_a32-10753.php

const verifiedSpecs: Record<string, any> = {
  "samsung-galaxy-a73-5g": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    cam_ultrawide: "12 MP, f/2.2",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "32 MP, f/2.2, 26mm (wide), 1/2.8\", 0.8µm",
    cam_front_video: "4K@30fps, 1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "181 g",
    dimensions: "163.7 x 76.1 x 7.6 mm",
    brightness: "800 nits (HBM)",
    video_recording: "4K@30fps, 1080p@30/60fps, gyro-EIS"
  },
  "samsung-galaxy-a53-5g": {
    bluetooth_version: "5.1, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front (Gorilla Glass 5), plastic frame, plastic back",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    cam_ultrawide: "12 MP, f/2.2, 123˚, 1.12µm",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "32 MP, f/2.2, 26mm (wide), 1/2.8\", 0.8µm",
    cam_front_video: "4K@30fps, 1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "189 g",
    dimensions: "159.6 x 74.8 x 8.1 mm",
    brightness: "800 nits (HBM)",
    video_recording: "4K@30fps, 1080p@30/60fps, gyro-EIS"
  },
  "samsung-galaxy-a33-5g": {
    bluetooth_version: "5.1, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front (Gorilla Glass 5), plastic frame, plastic back",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    cam_ultrawide: "8 MP, f/2.2, 123˚, 1/4.0\", 1.12µm",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "13 MP, f/2.2, (wide), 1/3.1\", 1.12µm",
    cam_front_video: "4K@30fps, 1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "186 g",
    dimensions: "159.7 x 74 x 8.1 mm",
    brightness: null,
    video_recording: "4K@30fps, 1080p@30/120fps"
  },
  "samsung-galaxy-a23": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic frame, plastic back",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "Yes",
    cam_ultrawide: "5 MP, f/2.2, 123˚, 1/5\", 1.12µm",
    cam_telephoto: null,
    cam_macro: "2 MP, f/2.4",
    cam_front_resolution: "8 MP, f/2.2, (wide)",
    cam_front_video: "1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "64GB, 128GB",
    weight: "195 g",
    dimensions: "164.5 x 76.9 x 8.4 mm",
    brightness: null,
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a13": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic frame, plastic back",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    cam_ultrawide: "5 MP, f/2.2, 123˚, 1/5\", 1.12µm",
    cam_telephoto: null,
    cam_macro: "2 MP, f/2.4",
    cam_front_resolution: "8 MP, f/2.2, (wide)",
    cam_front_video: "1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "eMMC 5.1",
    ram_variants: "3GB, 4GB, 6GB",
    storage_variants: "32GB, 64GB, 128GB",
    weight: "195 g",
    dimensions: "165.1 x 76.4 x 8.8 mm",
    brightness: null,
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a72": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic frame, plastic back",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes (Main & Telephoto)",
    cam_ultrawide: "12 MP, f/2.2, 123˚, 1.12µm",
    cam_telephoto: "8 MP, f/2.4, (telephoto), 1.0µm, PDAF, OIS, 3x optical zoom",
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "32 MP, f/2.2, 26mm (wide), 1/2.8\", 0.8µm",
    cam_front_video: "4K@30fps, 1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "203 g",
    dimensions: "165 x 77.4 x 8.4 mm",
    brightness: "800 nits (HBM)",
    video_recording: "4K@30fps, 1080p@30/60fps, gyro-EIS"
  },
  "samsung-galaxy-a52s-5g": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    cam_ultrawide: "12 MP, f/2.2, 123˚, 1.12µm",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "32 MP, f/2.2, 26mm (wide), 1/2.8\", 0.8µm",
    cam_front_video: "4K@30fps, 1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "189 g",
    dimensions: "159.9 x 75.1 x 8.4 mm",
    brightness: "800 nits (HBM)",
    video_recording: "4K@30fps, 1080p@30/60fps, gyro-EIS"
  },
  "samsung-galaxy-a52-5g": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    cam_ultrawide: "12 MP, f/2.2, 123˚, 1.12µm",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "32 MP, f/2.2, 26mm (wide), 1/2.8\", 0.8µm",
    cam_front_video: "4K@30fps, 1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "189 g",
    dimensions: "159.9 x 75.1 x 8.4 mm",
    brightness: "800 nits (HBM)",
    video_recording: "4K@30fps, 1080p@30/60fps, gyro-EIS"
  },
  "samsung-galaxy-a52": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    cam_ultrawide: "12 MP, f/2.2, 123˚, 1.12µm",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "32 MP, f/2.2, 26mm (wide), 1/2.8\", 0.8µm",
    cam_front_video: "4K@30fps, 1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "189 g",
    dimensions: "159.9 x 75.1 x 8.4 mm",
    brightness: "800 nits (HBM)",
    video_recording: "4K@30fps, 1080p@30/60fps, gyro-EIS"
  },
  "samsung-galaxy-a32": {
    bluetooth_version: "5.0, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front (Gorilla Glass 5), plastic frame, plastic back",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "No",
    cam_ultrawide: "8 MP, f/2.2, 123˚, 1/4.0\", 1.12µm",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "20 MP, f/2.2, (wide)",
    cam_front_video: "1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "64GB, 128GB",
    weight: "184 g",
    dimensions: "158.9 x 73.6 x 8.4 mm",
    brightness: "800 nits (HBM)",
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
    
    console.log("\\n=== VERIFICATION REPORT: BATCH A-SERIES (PART 2) ===");

    for (const slug of modelsToUpdate) {
      const phone = await Phone.findOne({ slug });
      if (!phone) {
        console.log(`⚠️ ${slug} not found in DB.`);
        continue;
      }

      const verifiedData = verifiedSpecs[slug];
      const updatePayload: Record<string, any> = {};
      const missingFields: string[] = [];

      for (const [key, value] of Object.entries(verifiedData)) {
        if (value === null || value === undefined) {
          missingFields.push(key);
        } else {
          updatePayload[key] = value;
        }
      }

      await Phone.updateOne({ _id: phone._id }, { $set: updatePayload });
      
      console.log(`\\n📱 Phone Processed: ${phone.name}`);
      console.log(`✅ Fields Updated: ${Object.keys(updatePayload).join(", ")}`);
      if (missingFields.length > 0) {
        console.log(`⚠️ Fields Left Empty (Unverified/Absent): ${missingFields.join(", ")}`);
      }
      console.log(`🔗 Verification Source: GSMArena (https://www.gsmarena.com/)`);
      
      updatedCount++;
    }

    console.log(`\\n🎉 Complete! Updated ${updatedCount} phones with strictly verified data.`);

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
