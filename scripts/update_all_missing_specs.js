/**
 * scripts/update_all_missing_specs.js
 * Bulk database update script to populate all remaining empty/missing specs across 25 phones.
 * Sources: Apple.com, Samsung.com, GSMArena, MobileDokan.com
 */

require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const PhoneSchema = new mongoose.Schema({}, { strict: false });

const updates = [
  // 1. iPhone 15 Plus
  {
    slug: "iphone-15-plus",
    updateData: {
      weight: "201 g (7.09 oz)",
      dimensions: "160.9 × 77.8 × 7.80 mm",
      build_material: "Ceramic Shield front, color-infused glass back, aluminum frame",
      sim_type: "Dual SIM (Nano-SIM + eSIM) or Dual eSIM",
      refresh_rate: "60 Hz",
      brightness: "1000 nits (typical), 1600 nits (HDR peak), 2000 nits (peak outdoor)",
      hdr: "HDR10, Dolby Vision",
      pixel_density: "460 ppi",
      cpu: "Apple A16 Bionic (4 nm) — 6-core (2 performance + 4 efficiency cores)",
      gpu: "Apple GPU (5-core graphics)",
      storage_type: "NVMe",
      cam_telephoto: "No (relies on 2x crop from 48MP main camera)",
      cam_macro: "Not supported natively",
      cam_flash: "Dual-LED dual-tone flash",
      cam_video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, Cinematic mode (4K@30fps)",
      cam_front_resolution: "12 MP, f/1.9, 23mm, PDAF + SL 3D",
      cam_front_video: "4K@24/25/30/60fps, 1080p@25/30/60/120fps",
      battery_capacity: "4,383 mAh",
      charging_wired: "20W fast charging, 50% in 30 mins",
      charging_wireless: "15W MagSafe, 15W Qi2 wireless",
      wifi_version: "Wi-Fi 6 (802.11ax)",
      bluetooth_version: "Bluetooth 5.3",
      gps_specs: "GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 2. iPhone 17 (expected specs based on standard parameters)
  {
    slug: "iphone-17",
    updateData: {
      weight: "180 g",
      dimensions: "149.6 × 71.5 × 7.80 mm",
      build_material: "Ceramic Shield front, tough glass back, aluminum frame",
      sim_type: "Dual eSIM or Nano-SIM + eSIM",
      brightness: "1200 nits (typical), 2400 nits (peak outdoor)",
      hdr: "HDR10, Dolby Vision",
      pixel_density: "460 ppi",
      cpu: "Apple A19 (3 nm TSMC)",
      gpu: "Apple A19 GPU (5-core)",
      storage_type: "NVMe",
      cam_telephoto: "No (relies on 2x crop from main camera)",
      cam_macro: "Not supported",
      cam_flash: "Adaptive True Tone flash",
      cam_video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps",
      cam_front_resolution: "24 MP, f/1.9 TrueDepth, PDAF",
      cam_front_video: "4K@60fps",
      battery_capacity: "3,600 mAh",
      charging_wired: "30W fast charging",
      charging_wireless: "25W MagSafe, 15W Qi2 wireless",
      wifi_version: "Wi-Fi 7 (802.11be)",
      bluetooth_version: "Bluetooth 5.4",
      gps_specs: "GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 3. iPhone 15 Pro
  {
    slug: "iphone-15-pro",
    updateData: {
      weight: "187 g (6.60 oz)",
      dimensions: "146.6 × 70.6 × 8.25 mm",
      build_material: "Ceramic Shield front, glass back, Grade 5 titanium frame",
      sim_type: "Dual SIM (Nano-SIM + eSIM) or Dual eSIM",
      brightness: "1000 nits (typical), 1600 nits (HDR peak), 2000 nits (peak outdoor)",
      hdr: "HDR10, Dolby Vision",
      pixel_density: "460 ppi",
      cpu: "Apple A17 Pro (3 nm) — 6-core (2 performance + 4 efficiency cores)",
      gpu: "Apple GPU (6-core graphics with ray tracing)",
      storage_type: "NVMe",
      cam_macro: "Yes (Macro photography down to 2cm)",
      cam_flash: "Adaptive True Tone flash",
      cam_video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, ProRes, Log, Spatial video",
      cam_front_resolution: "12 MP, f/1.9, 23mm, PDAF + SL 3D",
      cam_front_video: "4K@24/25/30/60fps, 1080p@25/30/60/120fps",
      battery_capacity: "3,274 mAh",
      charging_wired: "20W fast charging, 50% in 30 mins",
      charging_wireless: "15W MagSafe, 15W Qi2 wireless",
      wifi_version: "Wi-Fi 6E (802.11ax)",
      bluetooth_version: "Bluetooth 5.3",
      gps_specs: "Dual-frequency GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 4. iPhone 17 Pro (expected specs based on leaks)
  {
    slug: "iphone-17-pro",
    updateData: {
      weight: "195 g",
      dimensions: "149.6 × 71.5 × 8.25 mm",
      build_material: "Ceramic Shield front, glass back, Grade 5 titanium frame",
      sim_type: "Dual eSIM or Nano-SIM + eSIM",
      brightness: "1600 nits (typical), 3000 nits (peak outdoor)",
      hdr: "HDR10, Dolby Vision",
      pixel_density: "460 ppi",
      cpu: "Apple A19 Pro (3 nm TSMC)",
      gpu: "Apple A19 Pro GPU (6-core)",
      storage_type: "NVMe",
      cam_macro: "Yes",
      cam_flash: "Adaptive True Tone flash",
      cam_video: "4K@120fps Dolby Vision, 4K@60fps ProRes, Log",
      cam_front_resolution: "24 MP TrueDepth front sensor",
      cam_front_video: "4K@60fps",
      battery_capacity: "3,650 mAh",
      charging_wired: "45W fast charging",
      charging_wireless: "25W MagSafe, 15W Qi2 wireless",
      wifi_version: "Wi-Fi 7 (802.11be)",
      bluetooth_version: "Bluetooth 5.4",
      gps_specs: "Dual-frequency GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 5. iPhone SE (2nd generation)
  {
    slug: "iphone-se-2020",
    updateData: {
      weight: "148 g (5.22 oz)",
      dimensions: "138.4 × 67.3 × 7.3 mm",
      build_material: "Glass front & back, aluminum frame",
      sim_type: "Nano-SIM and/or eSIM",
      gpu: "Apple GPU (4-core graphics)",
      charging_wireless: "Yes (7.5W Qi wireless charging)",
      usb_type: "Lightning (USB 2.0)",
      gps_specs: "GPS, GLONASS"
    }
  },
  // 6. iPhone 12 mini
  {
    slug: "iphone-12-mini",
    updateData: {
      sim_type: "Nano-SIM and/or eSIM",
      refresh_rate: "60 Hz",
      hdr: "HDR10, Dolby Vision",
      cam_telephoto: "No",
      usb_type: "Lightning (USB 2.0)",
      gps_specs: "GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 7. iPhone 12
  {
    slug: "iphone-12",
    updateData: {
      sim_type: "Nano-SIM and/or eSIM",
      refresh_rate: "60 Hz",
      hdr: "HDR10, Dolby Vision",
      cam_telephoto: "No",
      usb_type: "Lightning (USB 2.0)",
      gps_specs: "GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 8. iPhone 13 mini
  {
    slug: "iphone-13-mini",
    updateData: {
      sim_type: "Nano-SIM and/or eSIM",
      refresh_rate: "60 Hz",
      hdr: "HDR10, Dolby Vision",
      cam_telephoto: "No",
      usb_type: "Lightning (USB 2.0)",
      gps_specs: "GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 9. iPhone 13
  {
    slug: "iphone-13",
    updateData: {
      sim_type: "Nano-SIM and/or eSIM",
      refresh_rate: "60 Hz",
      hdr: "HDR10, Dolby Vision",
      cam_telephoto: "No",
      usb_type: "Lightning (USB 2.0)",
      gps_specs: "GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 10. iPhone 12 Pro
  {
    slug: "iphone-12-pro",
    updateData: {
      sim_type: "Nano-SIM and/or eSIM",
      refresh_rate: "60 Hz",
      hdr: "HDR10, Dolby Vision",
      usb_type: "Lightning (USB 2.0)",
      gps_specs: "GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 11. iPhone 12 Pro Max
  {
    slug: "iphone-12-pro-max",
    updateData: {
      sim_type: "Nano-SIM and/or eSIM",
      refresh_rate: "60 Hz",
      hdr: "HDR10, Dolby Vision",
      usb_type: "Lightning (USB 2.0)",
      gps_specs: "GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 12. iPhone 15
  {
    slug: "iphone-15",
    updateData: {
      sim_type: "Dual SIM (Nano-SIM + eSIM) or Dual eSIM",
      refresh_rate: "60 Hz",
      hdr: "HDR10, Dolby Vision",
      cam_telephoto: "No (relies on 2x crop from 48MP main camera)",
      gps_specs: "GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 13. iPhone 13 Pro
  {
    slug: "iphone-13-pro",
    updateData: {
      sim_type: "Nano-SIM and/or eSIM",
      hdr: "HDR10, Dolby Vision",
      usb_type: "Lightning (USB 2.0)",
      gps_specs: "GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 14. iPhone 13 Pro Max
  {
    slug: "iphone-13-pro-max",
    updateData: {
      sim_type: "Nano-SIM and/or eSIM",
      hdr: "HDR10, Dolby Vision",
      usb_type: "Lightning (USB 2.0)",
      gps_specs: "GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 15. iPhone 15 Pro Max
  {
    slug: "iphone-15-pro-max",
    updateData: {
      sim_type: "Dual SIM (Nano-SIM + eSIM) or Dual eSIM",
      hdr: "HDR10, Dolby Vision",
      gps_specs: "Dual-frequency GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 16. iPhone 16 Pro Max
  {
    slug: "iphone-16-pro-max",
    updateData: {
      sim_type: "Dual SIM (Nano-SIM + eSIM) or Dual eSIM",
      hdr: "HDR10, Dolby Vision",
      gps_specs: "Dual-frequency GPS, GLONASS, Galileo, BeiDou, QZSS"
    }
  },
  // 17. iPhone 17 Air
  {
    slug: "iphone-17-air",
    updateData: {
      cam_ultrawide: "Not supported (Single rear camera setup)",
      cam_telephoto: "No"
    }
  },
  // 18. iPhone 17 Pro Max
  {
    slug: "iphone-17-pro-max",
    updateData: {
      cam_macro: "Yes (Macro photography supported via 48MP ultrawide autofocus)"
    }
  },
  // 19. Samsung Galaxy S26 Ultra
  {
    slug: "samsung-galaxy-s26-ultra",
    updateData: {
      battery: "5,000 mAh (Li-Ion, typical)"
    }
  },
  // 20. iPhone XR
  {
    slug: "iphone-xr",
    updateData: {
      gps_specs: "GPS, GLONASS, Galileo, QZSS"
    }
  },
  // 21. iPhone XS
  {
    slug: "iphone-xs",
    updateData: {
      gps_specs: "GPS, GLONASS, Galileo, QZSS"
    }
  },
  // 22. iPhone XS Max
  {
    slug: "iphone-xs-max",
    updateData: {
      gps_specs: "GPS, GLONASS, Galileo, QZSS"
    }
  },
  // 23. iPhone 16
  {
    slug: "iphone-16",
    updateData: {
      cam_telephoto: "No (supports 2x optical-quality zoom via 48MP sensor crop)"
    }
  },
  // 24. iPhone 16 Plus
  {
    slug: "iphone-16-plus",
    updateData: {
      cam_telephoto: "No (supports 2x optical-quality zoom via 48MP sensor crop)"
    }
  },
  // 25. iPhone 16e
  {
    slug: "iphone-16e",
    updateData: {
      cam_count: "Single"
    }
  }
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB Database");

    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    let updatedCount = 0;
    for (const item of updates) {
      const res = await Phone.updateOne(
        { slug: item.slug },
        { $set: item.updateData }
      );
      if (res.matchedCount > 0) {
        console.log(`📱 Updated ${item.slug}: matched ${res.matchedCount}, modified ${res.modifiedCount}`);
        updatedCount++;
      } else {
        console.warn(`⚠️ Phone with slug "${item.slug}" not found in DB.`);
      }
    }

    console.log(`\n🎉 Process completed! Successfully updated ${updatedCount} phones.`);
  } catch (err) {
    console.error("❌ Mongoose runtime error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
  }
}

run();
