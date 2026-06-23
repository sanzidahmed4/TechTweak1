import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";
import Brand from "../src/lib/models/Brand";
import fs from "fs";

async function updateBatch7() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB.");

  // Delete non-existent USA models
  const nonExistent = ["Moto G Play (2025)", "Motorola Edge+ (2025)"];
  for (const name of nonExistent) {
    const res = await Phone.deleteOne({ name: name });
    if (res.deletedCount > 0) {
      console.log(`Deleted non-existent model: ${name}`);
    }
  }

  const batchUpdates = [
    { 
      name: "Moto G Power 5G (2025)", 
      updates: { 
        price_usd: 299,
        model_number: "PB640006US",
        brightness: "1000 nits (Peak)",
        geekbench_score: "2106 (Geekbench 6)",
        benchmark_highlight: "Geekbench 6: 2,106",
        gpu: "Mali-G57 MC2",
        fabrication: "6 nm",
        storage_type: "UFS 2.2"
      }
    },
    { 
      name: "Motorola Edge (2025)", 
      updates: { 
        price_usd: 549,
        model_number: "PB7A0004US",
        brightness: "4500 nits (Peak)",
        geekbench_score: "3056 (Geekbench 6)",
        benchmark_highlight: "Geekbench 6: 3,056",
        gpu: "Mali-G615 MC2",
        fabrication: "4 nm",
        storage_type: "UFS 2.2"
      }
    },
    { 
      name: "Motorola Razr (2025)", 
      updates: { 
        price_usd: 699,
        brightness: "3000 nits (Peak)",
        geekbench_score: "1083 (Single-Core, Geekbench 6)",
        gpu: "Mali-G615 MC2",
        fabrication: "4 nm",
        storage_type: "UFS"
      }
    }
  ];

  let report = "## Batch 7 Update Report\n\n";
  report += `- **Moto G Play (2025)**: Deleted (Model never officially released in USA)\n`;
  report += `- **Motorola Edge+ (2025)**: Deleted (Model never officially released in USA)\n`;

  for (const item of batchUpdates) {
    if (Object.keys(item.updates).length > 0) {
      await Phone.updateOne({ name: item.name }, { $set: item.updates });
      report += `- **${item.name}**: Updated ${Object.keys(item.updates).join(', ')}\n`;
    }
  }

  console.log("Batch 7 updated.");
  console.log(report);
  
  // Update Task MD
  let taskMd = fs.readFileSync("C:\\Users\\Sanzid\\.gemini\\antigravity\\brain\\631d2150-7436-4d52-90ff-1d84e00e169a\\task.md", "utf8");
  taskMd = taskMd.replace("- [ ] Moto G Power 5G (2025)", "- [x] Moto G Power 5G (2025)");
  taskMd = taskMd.replace("- [ ] Moto G Play (2025)", "- [x] Moto G Play (2025)");
  taskMd = taskMd.replace("- [ ] Motorola Edge (2025)", "- [x] Motorola Edge (2025)");
  taskMd = taskMd.replace("- [ ] Motorola Edge+ (2025)", "- [x] Motorola Edge+ (2025)");
  taskMd = taskMd.replace("- [ ] Motorola Razr (2025)", "- [x] Motorola Razr (2025)");
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

  const totalPhones = allPhones.length;
  let totalProductionReady = 0;
  let phonesWithReviewFields = 0;
  let phonesWithCriticalFields = 0;

  let totalCriticalRemaining = 0;
  let totalReviewRemaining = 0;
  let totalOptionalRemaining = 0;

  for (const phone of allPhones) {
    let missingCritical = 0;
    let missingReview = 0;
    let missingOptional = 0;

    const isMissing = (val: any) => val === null || val === undefined || val === "" || (typeof val === "string" && val.includes("[REQUIRES REVIEW]"));

    for (const field of allExpectedFields) {
      if (isMissing((phone as any)[field])) {
        if (criticalFields.includes(field)) {
          missingCritical++;
          totalCriticalRemaining++;
        } else if (reviewFields.includes(field)) {
          missingReview++;
          totalReviewRemaining++;
        } else {
          missingOptional++;
          totalOptionalRemaining++;
        }
      }
    }

    // Check images separately (critical)
    if (!phone.images || phone.images.length === 0 || phone.images[0] === "" || phone.images[0].includes("[REQUIRES REVIEW]")) {
      missingCritical++;
      totalCriticalRemaining++;
    }

    if (missingCritical === 0) totalProductionReady++;
    if (missingCritical > 0) phonesWithCriticalFields++;
    if (missingReview > 0) phonesWithReviewFields++;
  }

  console.log("=== PRODUCTION READINESS SCORE ===");
  console.log(`Total Phones: ${totalPhones}`);
  console.log(`Production Ready Phones: ${totalProductionReady}`);
  console.log(`Phones With Review Fields: ${phonesWithReviewFields}`);
  console.log(`Phones With Critical Missing Fields: ${phonesWithCriticalFields}`);
  console.log("---");
  console.log(`Total Critical Fields Remaining: ${totalCriticalRemaining}`);
  console.log(`Total Review Fields Remaining: ${totalReviewRemaining}`);
  console.log(`Total Optional Fields Remaining: ${totalOptionalRemaining}`);

  process.exit(0);
}

updateBatch7();
