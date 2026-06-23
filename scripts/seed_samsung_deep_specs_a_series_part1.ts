import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// VERIFIED GSMARENA DATA SOURCES (Part 1 - Top Volume A Series):
// A55 5G: https://www.gsmarena.com/samsung_galaxy_a55-12824.php
// A35 5G: https://www.gsmarena.com/samsung_galaxy_a35-12705.php
// A25 5G: https://www.gsmarena.com/samsung_galaxy_a25-12555.php
// A15 5G: https://www.gsmarena.com/samsung_galaxy_a15_5g-12638.php
// A15: https://www.gsmarena.com/samsung_galaxy_a15-12637.php
// A54 5G: https://www.gsmarena.com/samsung_galaxy_a54-12070.php
// A34 5G: https://www.gsmarena.com/samsung_galaxy_a34-12074.php
// A24 4G: https://www.gsmarena.com/samsung_galaxy_a24_4g-12176.php
// A14 5G: https://www.gsmarena.com/samsung_galaxy_a14_5g-12004.php
// A14: https://www.gsmarena.com/samsung_galaxy_a14-12151.php

const verifiedSpecs: Record<string, any> = {
  "samsung-galaxy-a55-5g": {
    bluetooth_version: "5.3, A2DP, LE, aptX",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front (Gorilla Glass Victus+), glass back (Gorilla Glass), aluminum frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes (OIS on main camera)",
    cam_ultrawide: "12 MP, f/2.2, 123˚, 1/3.06\", 1.12µm",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "32 MP, f/2.2, 26mm (wide), 1/2.74\", 0.8µm",
    cam_front_video: "4K@30fps, 1080p@30/60fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS", // Exact UFS version unspecified on GSMArena
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    weight: "213 g",
    dimensions: "161.1 x 77.4 x 8.2 mm",
    brightness: "1000 nits (HBM)",
    video_recording: "4K@30fps, 1080p@30/60fps, gyro-EIS"
  },
  "samsung-galaxy-a35-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front (Gorilla Glass Victus+), glass back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    cam_ultrawide: "8 MP, f/2.2, 123˚, 1/4.0\", 1.12µm",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "13 MP, f/2.2, (wide), 1/3.06\", 1.12µm",
    cam_front_video: "4K@30fps, 1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "209 g",
    dimensions: "161.7 x 78 x 8.2 mm",
    brightness: "1000 nits (HBM)",
    video_recording: "4K@30fps, 1080p@30/60fps, gyro-EIS"
  },
  "samsung-galaxy-a25-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "Yes",
    cam_ultrawide: "8 MP, f/2.2, 120˚",
    cam_telephoto: null,
    cam_macro: "2 MP, f/2.4",
    cam_front_resolution: "13 MP, f/2.2, (wide)",
    cam_front_video: "1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "197 g",
    dimensions: "161 x 76.5 x 8.3 mm",
    brightness: "1000 nits (HBM)",
    video_recording: "4K@30fps, 1080p@30fps, gyro-EIS"
  },
  "samsung-galaxy-a15-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true, // region dependent
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    cam_ultrawide: "5 MP, f/2.2",
    cam_telephoto: null,
    cam_macro: "2 MP, f/2.4",
    cam_front_resolution: "13 MP, f/2.0, (wide)",
    cam_front_video: "1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "200 g",
    dimensions: "160.1 x 76.8 x 8.4 mm",
    brightness: "800 nits (HBM)",
    video_recording: "1080p@30fps, gyro-EIS"
  },
  "samsung-galaxy-a15": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    cam_ultrawide: "5 MP, f/2.2",
    cam_telephoto: null,
    cam_macro: "2 MP, f/2.4",
    cam_front_resolution: "13 MP, f/2.0, (wide)",
    cam_front_video: "1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "200 g",
    dimensions: "160.1 x 76.8 x 8.4 mm",
    brightness: "800 nits (HBM)",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a54-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front (Gorilla Glass 5), glass back (Gorilla Glass 5), plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    cam_ultrawide: "12 MP, f/2.2, 123˚, 1.12µm",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "32 MP, f/2.2, 26mm (wide), 1/2.8\", 0.8µm",
    cam_front_video: "4K@30fps, 1080p@30/60fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "202 g",
    dimensions: "158.2 x 76.7 x 8.2 mm",
    brightness: "1000 nits (HBM)",
    video_recording: "4K@30fps, 1080p@30/60fps, 720p@480fps"
  },
  "samsung-galaxy-a34-5g": {
    bluetooth_version: "5.3, A2DP, LE",
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
    weight: "199 g",
    dimensions: "161.3 x 78.1 x 8.2 mm",
    brightness: "1000 nits (HBM)",
    video_recording: "4K@30fps, 1080p@30/60fps, 720p@480fps"
  },
  "samsung-galaxy-a24-4g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true, // region dependent
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "Yes",
    cam_ultrawide: "5 MP, f/2.2, 123˚, 1/5.0\", 1.12µm",
    cam_telephoto: null,
    cam_macro: "2 MP, f/2.4",
    cam_front_resolution: "13 MP, f/2.2, (wide)",
    cam_front_video: "1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "128GB",
    weight: "195 g",
    dimensions: "162.1 x 77.6 x 8.3 mm",
    brightness: "1000 nits (HBM)",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a14-5g": {
    bluetooth_version: "5.2, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    cam_ultrawide: null, // Depth and macro only
    cam_telephoto: null,
    cam_macro: "2 MP, f/2.4",
    cam_front_resolution: "13 MP, f/2.0, (wide)",
    cam_front_video: "1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "64GB, 128GB",
    weight: "202 g",
    dimensions: "167.7 x 78 x 9.1 mm",
    brightness: null,
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a14": {
    bluetooth_version: "5.1, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "No",
    cam_ultrawide: "5 MP, f/2.2",
    cam_telephoto: null,
    cam_macro: "2 MP, f/2.4",
    cam_front_resolution: "13 MP, f/2.0, (wide)",
    cam_front_video: "1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "Unspecified",
    ram_variants: "4GB, 6GB",
    storage_variants: "64GB, 128GB",
    weight: "201 g",
    dimensions: "167.7 x 78 x 9.1 mm",
    brightness: null,
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
    
    console.log("\\n=== VERIFICATION REPORT: BATCH A-SERIES (PART 1) ===");

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
