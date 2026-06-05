import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";
import Brand from "../src/lib/models/Brand";
import fs from "fs";

async function updateBatch6() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB.");

  const batchUpdates = [
    { 
      name: "Motorola Edge+ (2023)", 
      updates: { 
        price_usd: 799,
        brightness: "1300 nits (Peak)",
        gpu: "Adreno 740",
        fabrication: "4 nm",
        storage_type: "UFS 4.0"
      }
    },
    { 
      name: "Motorola Edge (2023)", 
      updates: { 
        price_usd: 599,
        brightness: "1200 nits (Peak)",
        geekbench_score: "2476 (Geekbench 6)",
        benchmark_highlight: "Geekbench 6: 2,476",
        gpu: "Mali-G610 MC3",
        fabrication: "6 nm",
        storage_type: "UFS 2.2"
      }
    },
    { 
      name: "Moto G Play (2024)", 
      updates: { 
        price_usd: 149,
        model_number: "PB0C0007US",
        brightness: "500 nits (Typical)",
        gpu: "Adreno 610",
        fabrication: "6 nm",
        storage_type: "UFS 2.2"
      }
    },
    { 
      name: "Moto G Power 5G (2024)", 
      updates: { 
        price_usd: 299,
        geekbench_score: "2005 (Geekbench 6)",
        benchmark_highlight: "Geekbench 6: 2,005",
        gpu: "IMG BXM-8-256",
        fabrication: "6 nm",
        storage_type: "UFS 2.2"
      }
    },
    { 
      name: "Moto G Stylus 5G (2024)", 
      updates: { 
        price_usd: 399,
        model_number: "PB1M0006US",
        brightness: "1200 nits (Peak)",
        gpu: "Adreno 710",
        fabrication: "4 nm"
      }
    }
  ];

  let report = "## Batch 6 Update Report\n\n";

  for (const item of batchUpdates) {
    if (Object.keys(item.updates).length > 0) {
      await Phone.updateOne({ name: item.name }, { $set: item.updates });
      report += `- **${item.name}**: Updated ${Object.keys(item.updates).join(', ')}\n`;
    } else {
      report += `- **${item.name}**: No updates made (kept [REQUIRES REVIEW])\n`;
    }
  }

  console.log("Batch 6 updated.");
  console.log(report);
  
  // Update Task MD
  let taskMd = fs.readFileSync("C:\\Users\\Sanzid\\.gemini\\antigravity\\brain\\631d2150-7436-4d52-90ff-1d84e00e169a\\task.md", "utf8");
  taskMd = taskMd.replace("- [ ] Motorola Edge+ (2023)", "- [x] Motorola Edge+ (2023)");
  taskMd = taskMd.replace("- [ ] Motorola Edge (2023)", "- [x] Motorola Edge (2023)");
  taskMd = taskMd.replace("- [ ] Moto G Play (2024)", "- [x] Moto G Play (2024)");
  taskMd = taskMd.replace("- [ ] Moto G Power 5G (2024)", "- [x] Moto G Power 5G (2024)");
  taskMd = taskMd.replace("- [ ] Moto G Stylus 5G (2024)", "- [x] Moto G Stylus 5G (2024)");
  fs.writeFileSync("C:\\Users\\Sanzid\\.gemini\\antigravity\\brain\\631d2150-7436-4d52-90ff-1d84e00e169a\\task.md", taskMd);


  // CALCULATE CLASSIFICATIONS AND PRODUCTION READINESS
  const brand = await Brand.findOne({ slug: "motorola" });
  const allPhones = await Phone.find({ brand_id: brand._id }).lean();

  const criticalFields = [
    "price_usd", "release_date", "model_number", "cpu", "gpu", 
    "display_type", "screen_size", "resolution", "battery_capacity"
  ];
  
  const reviewFields = [
    "geekbench_score", "brightness", "benchmark_highlight", "cooling_system"
  ];
  
  // All other schema fields fall into Optional
  const allExpectedFields = [
    "price_usd", "release_date", "colors", "model_number", "phone_variants", "made_in",
    "chipset_highlight", "camera_highlight", "display_highlight", "battery_highlight", "benchmark_highlight",
    "weight", "dimensions", "build_material", "sim_type", "water_resistance",
    "display_type", "screen_size", "resolution", "refresh_rate", "brightness", "hdr", "protection", "pixel_density",
    "cpu", "gpu", "fabrication", "ram_variants", "storage_variants", "storage_type", "geekbench_score", "cooling_system",
    "cam_count", "cam_main_sensor", "cam_ultrawide", "cam_telephoto", "cam_macro", "cam_depth", "cam_ois", "cam_flash", "cam_video",
    "cam_front_resolution", "cam_front_hdr", "cam_front_portrait", "cam_front_video",
    "battery_capacity", "charging_wired", "charging_wireless", "charging_reverse", "usb_type",
    "wifi_version", "bluetooth_version", "gps_specs", "usb_version",
    "sensor_fingerprint", "android_version", "ui_version", "update_policy"
  ];

  let totalProductionReady = 0;
  let totalPhonesStillRequiringReview = 0;
  let totalCriticalMissingRemaining = 0;

  for (const phone of allPhones) {
    let missingCritical = 0;
    let missingReview = 0;
    let missingOptional = 0;

    const isMissing = (val: any) => val === null || val === undefined || val === "" || (typeof val === "string" && val.includes("[REQUIRES REVIEW]"));

    for (const field of allExpectedFields) {
      if (isMissing((phone as any)[field])) {
        if (criticalFields.includes(field)) {
          missingCritical++;
          totalCriticalMissingRemaining++;
        } else if (reviewFields.includes(field)) {
          missingReview++;
        } else {
          missingOptional++;
        }
      }
    }

    // Check images separately (critical)
    if (!phone.images || phone.images.length === 0 || phone.images[0] === "" || phone.images[0].includes("[REQUIRES REVIEW]")) {
      missingCritical++;
      totalCriticalMissingRemaining++;
    }

    if (missingCritical === 0) {
      totalProductionReady++;
    }
    
    // A phone requires review if it has any missing critical or review fields
    if (missingCritical > 0 || missingReview > 0) {
      totalPhonesStillRequiringReview++;
    }
  }

  console.log("=== PRODUCTION READINESS SCORE ===");
  console.log(`Total Production Ready Phones: ${totalProductionReady}`);
  console.log(`Total Phones Still Requiring Review: ${totalPhonesStillRequiringReview}`);
  console.log(`Total Critical Missing Fields Remaining: ${totalCriticalMissingRemaining}`);

  process.exit(0);
}

updateBatch6();
