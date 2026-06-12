import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// EXPECTED / RUMORED DATA SOURCES:
// Using GSMArena, 91Mobiles, PhoneArena leaks for upcoming 2026 devices

const expectedSpecs: Record<string, any> = {
  "samsung-galaxy-z-fold-7": {
    bluetooth_version: "5.4, A2DP, LE, aptX HD",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band",
    usb_type: "USB Type-C 3.2, OTG",
    usb_version: "3.2",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front (Gorilla Armor), plastic front (unfolded), glass back (Gorilla Armor), titanium frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "Yes",
    cam_ultrawide: "12 MP, f/2.2, 123˚, 12mm",
    cam_telephoto: "10 MP, f/2.4, 66mm (telephoto), OIS, 3x optical zoom",
    cam_macro: null,
    cam_front_resolution: "10 MP, f/2.2 (cover) / 4 MP under-display",
    cam_front_video: "4K@30/60fps",
    charging_wireless: "Yes, 15W",
    charging_reverse: "Yes, 4.5W",
    storage_type: "UFS 4.0",
    ram_variants: "12GB, 16GB",
    storage_variants: "256GB, 512GB, 1TB",
    weight: "215 g",
    dimensions: "158.4 x 72.8 x 8.9 mm (Folded)",
    brightness: "2600 nits (peak)",
    video_recording: "8K@30fps, 4K@60fps"
  },
  "samsung-galaxy-a56-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    usb_type: "USB Type-C 2.0, OTG",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front (Gorilla Glass Victus+), glass back, aluminum frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    cam_ultrawide: "12 MP, f/2.2, 123˚",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "12 MP, f/2.2",
    cam_front_video: "4K@30/60fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 3.1",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    weight: "210 g",
    dimensions: "161 x 77.5 x 8.1 mm (Expected)",
    brightness: "1900 nits (peak)",
    video_recording: "4K@30/60fps"
  },
  "samsung-galaxy-s26-edge": {
    bluetooth_version: "5.4, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band",
    usb_type: "USB Type-C 3.2",
    usb_version: "3.2",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front (Gorilla Armor), glass back, titanium frame",
    sensor_fingerprint: "Fingerprint (under display, ultrasonic)",
    cam_ois: "Yes",
    cam_ultrawide: "50 MP, f/2.0, 120˚",
    cam_telephoto: "50 MP, f/2.4, OIS, 3x optical zoom",
    cam_macro: null,
    cam_front_resolution: "12 MP, f/2.2, Dual Pixel PDAF",
    cam_front_video: "4K@30/60fps",
    charging_wireless: "Yes, 15W",
    charging_reverse: "Yes, 4.5W",
    storage_type: "UFS 4.0",
    ram_variants: "12GB, 16GB",
    storage_variants: "256GB, 512GB, 1TB",
    weight: "Unspecified",
    dimensions: "Unspecified",
    brightness: "3000 nits (Expected peak)",
    video_recording: "8K@30fps, 4K@60fps"
  },
  "samsung-galaxy-z-flip-7": {
    bluetooth_version: "5.4, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band",
    usb_type: "USB Type-C 3.2",
    usb_version: "3.2",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Plastic front, glass back (Gorilla Armor), aluminum frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "Yes",
    cam_ultrawide: "12 MP, f/2.2, 123˚",
    cam_telephoto: null,
    cam_macro: null,
    cam_front_resolution: "10 MP, f/2.2",
    cam_front_video: "4K@30/60fps",
    charging_wireless: "Yes, 15W",
    charging_reverse: "Yes, 4.5W",
    storage_type: "UFS 4.0",
    ram_variants: "8GB, 12GB",
    storage_variants: "256GB, 512GB",
    weight: "187 g (Expected)",
    dimensions: "Unspecified",
    brightness: "2600 nits (peak)",
    video_recording: "4K@60fps"
  },
  "samsung-galaxy-z-flip-fe": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Plastic front, glass back, aluminum frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "Yes",
    cam_ultrawide: "12 MP, f/2.2",
    cam_telephoto: null,
    cam_macro: null,
    cam_front_resolution: "10 MP, f/2.4",
    cam_front_video: "4K@30fps",
    charging_wireless: "Yes, 15W",
    charging_reverse: "No",
    storage_type: "UFS 3.1",
    ram_variants: "8GB",
    storage_variants: "128GB, 256GB",
    weight: "Unspecified",
    dimensions: "Unspecified",
    brightness: "1200 nits (peak)",
    video_recording: "4K@30fps"
  },
  "samsung-galaxy-a36-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    cam_ultrawide: "8 MP, f/2.2",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "12 MP, f/2.2",
    cam_front_video: "4K@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 2.2",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "Unspecified",
    dimensions: "Unspecified",
    brightness: "1000 nits",
    video_recording: "4K@30fps"
  },
  "samsung-galaxy-a26-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: true,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "Yes",
    cam_ultrawide: "8 MP, f/2.2",
    cam_telephoto: null,
    cam_macro: "2 MP, f/2.4",
    cam_front_resolution: "13 MP, f/2.0",
    cam_front_video: "1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 2.2",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB",
    weight: "Unspecified",
    dimensions: "Unspecified",
    brightness: "1000 nits",
    video_recording: "4K@30fps"
  },
  "samsung-galaxy-a16-5g": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
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
    cam_front_resolution: "13 MP, f/2.0",
    cam_front_video: "1080p@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 2.2",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "200 g",
    dimensions: "164.4 x 77.9 x 7.9 mm",
    brightness: "800 nits",
    video_recording: "1080p@30fps"
  },
  "samsung-galaxy-a57": {
    bluetooth_version: "5.4, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front, glass back, aluminum frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    cam_ultrawide: "12 MP, f/2.2",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "12 MP, f/2.2",
    cam_front_video: "4K@30/60fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 3.1",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    weight: "Unspecified",
    dimensions: "Unspecified",
    brightness: "2000 nits (Expected)",
    video_recording: "4K@60fps"
  },
  "samsung-galaxy-a37": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6",
    usb_type: "USB Type-C 2.0",
    usb_version: "2.0",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front, plastic back, plastic frame",
    sensor_fingerprint: "Fingerprint (under display, optical)",
    cam_ois: "Yes",
    cam_ultrawide: "8 MP, f/2.2",
    cam_telephoto: null,
    cam_macro: "5 MP, f/2.4",
    cam_front_resolution: "12 MP, f/2.2",
    cam_front_video: "4K@30fps",
    charging_wireless: "No",
    charging_reverse: "No",
    storage_type: "UFS 2.2",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB, 256GB",
    weight: "Unspecified",
    dimensions: "Unspecified",
    brightness: "1000 nits",
    video_recording: "4K@30fps"
  },
  "samsung-galaxy-z-fold-6-slim": {
    bluetooth_version: "5.3, A2DP, LE",
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band",
    usb_type: "USB Type-C 3.2",
    usb_version: "3.2",
    has_nfc: true,
    has_audio_jack: false,
    build_material: "Glass front, titanium frame",
    sensor_fingerprint: "Fingerprint (side-mounted)",
    cam_ois: "Yes",
    cam_ultrawide: "12 MP, f/2.2",
    cam_telephoto: "10 MP, f/2.4, OIS, 3x optical zoom",
    cam_macro: null,
    cam_front_resolution: "10 MP, f/2.2 (cover) / 4 MP under-display",
    cam_front_video: "4K@60fps",
    charging_wireless: "Yes",
    charging_reverse: "Yes",
    storage_type: "UFS 4.0",
    ram_variants: "12GB",
    storage_variants: "512GB, 1TB",
    weight: "Unspecified",
    dimensions: "Unspecified",
    brightness: "2600 nits",
    video_recording: "8K@30fps"
  }
};

async function run() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error("MONGODB_URI not found.");

    await mongoose.connect(MONGODB_URI);
    const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

    const modelsToUpdate = Object.keys(expectedSpecs);
    let updatedCount = 0;
    
    console.log("\\n=== SEEDING EXPECTED/RUMORED DEVICES ===");
    for (const slug of modelsToUpdate) {
      const phone = await Phone.findOne({ slug });
      if (!phone) {
        console.log(`⚠️ Unreleased ${slug} not found in DB.`);
        continue;
      }

      const verifiedData = expectedSpecs[slug];
      const updatePayload: Record<string, any> = {};

      for (const [key, value] of Object.entries(verifiedData)) {
        if (value !== null && value !== undefined) {
          updatePayload[key] = value;
        }
      }
      await Phone.updateOne({ _id: phone._id }, { $set: updatePayload });
      updatedCount++;
    }
    
    console.log(`✅ Expected Devices Successfully Injected. Processed ${updatedCount} upcoming phones.`);
    
  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
